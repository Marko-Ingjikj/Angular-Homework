import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map, mergeMap } from 'rxjs';
import { HotelState } from 'src/app/interfaces/hotel-state.interface';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { Room } from 'src/app/interfaces/room-interface';
import { HotelService } from 'src/app/services/hotel.service';
import { hotelsSelector } from 'src/app/store/hotels/hotels.selectors';

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
    this.subscription = this.route.params.pipe(
      map((params) => params['id']),
      mergeMap((id) =>
        this.store
          .select(hotelsSelector)
          .pipe(map((hotels) => hotels.find((hotel) => hotel.id == id || null)))
      ).subscribe((hotel: Hotel | null) => {
        if (hotel) {
          this.hotel;
        }
      })
    );
  }

  onSubmit() {
    // const hotelId = this.route.snapshot.params['hotel-id'];
    // const roomId = this.route.snapshot.params['room-id'];
    // const roomData = {
    //   ...this.roomForm.value,
    //   amenities: this.roomForm.value.amenities
    //     ?.split(',')
    //     .map((amenity: string) => amenity.trim()),
    // };
    // if (this.isEditing) {
    //   this.hotelService.updateRoom(
    //     Number(hotelId),
    //     Number(roomId),
    //     roomData as Room
    //   );
    // } else {
    //   this.hotelService.addNewRoom(Number(hotelId), roomData as Room);
    // }
    // this.router.navigate([`/hotel-details`, hotelId]);
  }
}
