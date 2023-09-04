import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map, mergeMap, take } from 'rxjs';
import { HotelState } from 'src/app/interfaces/hotel-state.interface';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { Room } from 'src/app/interfaces/room-interface';
import { addRoom, updateRoom } from 'src/app/store/hotels/hotels.actions';
import { hotelsSelector } from 'src/app/store/hotels/hotels.selectors';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
})
export class RoomFormComponent implements OnInit, OnDestroy {
  urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  isEditing: boolean = false;
  subscription: Subscription = new Subscription();

  roomForm = new FormGroup({
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
    private store: Store<HotelState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        map((params) => params['hotel-id']),
        mergeMap((id) =>
          this.store
            .select(hotelsSelector)
            .pipe(map((hotel) => hotel.find((s) => s.id === id) || null))
        )
      )
      .subscribe((hotel: Hotel | null) => {
        const room = hotel?.rooms.find(
          (room) => room.id === this.route.snapshot.params['room-id']
        );
        if (hotel && room) {
          this.isEditing = true;
          this.roomForm.patchValue({
            name: room?.name,
            description: room?.description,
            image: room?.image,
            price: room?.price,
            persons: room?.persons,
            children: room?.children,
            amenities: room?.amenities.join(', ') || '',
            isAvailable: room?.isAvailable || false,
          });
        }
        if (!hotel && this.route.snapshot.params['hotel-id']) {
          this.router.navigate(['/not-found/hotel']);
          return;
        }
        if (!room && this.route.snapshot.params['room-id']) {
          this.router.navigate(['/not-found/room']);
        }
      });
  }

  onSubmit() {
    const hotelId = this.route.snapshot.params['hotel-id'];
    const roomId = this.route.snapshot.params['room-id'];

    if (this.isEditing) {
      const roomData = {
        ...this.roomForm.value,
        id: roomId,
        amenities: this.roomForm.value.amenities
          ?.split(',')
          .map((amenity: string) => amenity.trim()),
      };
      this.store.dispatch(
        updateRoom({ hotelId, roomId, room: roomData as Room })
      );
    } else {
      const roomData = {
        ...this.roomForm.value,
        id: new Date().toISOString(),
        amenities: this.roomForm.value.amenities
          ?.split(',')
          .map((amenity: string) => amenity.trim()),
      };
      this.store.dispatch(addRoom({ hotelId, room: roomData as Room }));
    }
    this.router.navigate([`/hotel-details`, hotelId]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
