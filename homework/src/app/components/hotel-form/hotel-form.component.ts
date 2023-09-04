import { HotelService } from '../../services/hotel.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hotel } from '../../interfaces/hotel.interface';
import { Room } from '../../interfaces/room-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map, mergeMap } from 'rxjs';
import { hotelsSelector } from 'src/app/store/hotels/hotels.selectors';
import { Store } from '@ngrx/store';
import { HotelState } from 'src/app/interfaces/hotel-state.interface';
import { addHotel, updateHotel } from 'src/app/store/hotels/hotels.actions';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css'],
})
export class HotelFormComponent implements OnInit, OnDestroy {
  urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  isEditing: boolean = false;
  subscription: Subscription = new Subscription();
  hotelId: string = '';

  hotelForm = new FormGroup({
    name: new FormControl<string>(
      '',
      Validators.compose([Validators.required])
    ),
    address: new FormControl<string>(
      '',
      Validators.compose([Validators.required])
    ),
    city: new FormControl<string>(
      '',
      Validators.compose([Validators.required])
    ),
    country: new FormControl<string>(
      '',
      Validators.compose([Validators.required])
    ),
    stars: new FormControl<number>(
      0,
      Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ])
    ),
    image: new FormControl<string>(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.urlRegex),
      ])
    ),
    rooms: new FormControl<Room[]>([]),
  });

  get nameHasErrorRequired() {
    return this.hotelForm.get('name')?.hasError('required');
  }

  get addressHasErrorRequired() {
    return this.hotelForm.get('address')?.hasError('required');
  }

  get cityHasErrorRequired() {
    return this.hotelForm.get('city')?.hasError('required');
  }

  get countryHasErrorRequired() {
    return this.hotelForm.get('country')?.hasError('required');
  }

  get starsHasErrorRequired() {
    return this.hotelForm.get('stars')?.hasError('required');
  }

  get starsHasMinError() {
    return this.hotelForm.get('stars')?.hasError('min');
  }

  get starsHasMaxError() {
    return this.hotelForm.get('stars')?.hasError('max');
  }

  get imageHasErrorRequired() {
    return this.hotelForm.get('image')?.hasError('required');
  }

  get imageHasInvalidUrlError() {
    return this.hotelForm.get('image')?.hasError('pattern');
  }

  constructor(
    private store: Store<HotelState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        map((params) => params['id']),
        mergeMap((id) =>
          this.store
            .select(hotelsSelector)
            .pipe(map((hotel) => hotel.find((s) => s.id === id) || null))
        )
      )
      .subscribe((hotel: Hotel | null) => {
        if (hotel) {
          this.hotelId = hotel.id;
          this.isEditing = true;
          this.hotelForm.patchValue(hotel);
        }
        if (!hotel && this.route.snapshot.params['id']) {
          this.router.navigate(['/not-found/hotel']);
        }
      });
  }

  onSubmit() {
    const hotel = {
      ...this.hotelForm.value,
      id: this.hotelId,
    };
    if (this.isEditing) {
      this.store.dispatch(updateHotel({ hotel: hotel as Hotel }));
    } else {
      this.store.dispatch(addHotel({ hotel: hotel as Hotel }));
    }
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
