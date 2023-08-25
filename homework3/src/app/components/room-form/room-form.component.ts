import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map, mergeMap } from 'rxjs';
import { Room } from 'src/app/interfaces/room-interface';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
})
export class RoomFormComponent implements OnInit {
  urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  isEditing: boolean = false;
  subscription: Subscription = new Subscription();

  roomForm = new FormGroup({
    id: new FormControl<number>(Date.now()),
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    image: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(this.urlRegex),
    ]),
    price: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    persons: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
    ]),
    children: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
    amenities: new FormControl<string>(''),
    isAvailable: new FormControl<boolean>(false),
  });

  get nameHasErrorRequired() {
    return this.roomForm.get('name')?.hasError('required');
  }

  get descriptionHasErrorRequired() {
    return this.roomForm.get('description')?.hasError('required');
  }

  get imageHasErrorRequired() {
    return this.roomForm.get('image')?.hasError('required');
  }

  get imageHasInvalidUrlError() {
    return this.roomForm.get('image')?.hasError('pattern');
  }

  get priceHasErrorRequired() {
    return this.roomForm.get('price')?.hasError('required');
  }

  get priceHasErrorMin() {
    return this.roomForm.get('price')?.hasError('min');
  }

  get personsHasErrorMin() {
    return this.roomForm.get('persons')?.hasError('min');
  }

  get personsHasErrorRequired() {
    return this.roomForm.get('persons')?.hasError('required');
  }

  get childrenHasErrorRequired() {
    return this.roomForm.get('children')?.hasError('required');
  }

  get childrenHasErrorMin() {
    return this.roomForm.get('children')?.hasError('min');
  }

  get amenitiesHasErrorRequired() {
    return this.roomForm.get('amenities')?.hasError('required');
  }

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (
      this.route.snapshot.params['hotel-id'] **
      this.route.snapshot.params['room-id']
    ) {
      this.subscription = this.route.params
        .pipe(
          map((params) => Number(params['hotel-id'])),
          mergeMap((id) =>
            this.hotelService.hotels$.pipe(
              map((hotels) => hotels.find((hotel) => hotel.id === id))
            )
          )
        )
        .subscribe((hotel) => {
          const room = hotel?.rooms.find(
            (room) => room.id === Number(this.route.snapshot.params['room-id'])
          );
          if (room) {
            this.isEditing = true;

            this.roomForm.patchValue({
              ...room,
              amenities: room?.amenities.join(','),
            });
          } else {
            this.router.navigate(['/not-found/room']);
          }
        });
    }
  }

  onSubmit() {
    const hotelId = this.route.snapshot.params['hotel-id'];
    const roomId = this.route.snapshot.params['room-id'];
    const roomData = {
      ...this.roomForm.value,
      amenities: this.roomForm.value.amenities
        ?.split(',')
        .map((amenity: string) => amenity.trim()),
    };

    if (this.isEditing) {
      this.hotelService.updateRoom(
        Number(hotelId),
        Number(roomId),
        roomData as Room
      );
    } else {
      this.hotelService.addNewRoom(Number(hotelId), roomData as Room);
    }

    this.router.navigate([`/hotel-details`, hotelId]);
  }
}
