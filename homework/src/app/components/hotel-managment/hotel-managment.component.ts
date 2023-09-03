import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HotelState } from 'src/app/interfaces/hotel-state.interface';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { deleteHotel, getHotels } from 'src/app/store/hotels/hotels.actions';
import { hotelsSelector } from 'src/app/store/hotels/hotels.selectors';

@Component({
  selector: 'app-hotel-managment',
  templateUrl: './hotel-managment.component.html',
  styleUrls: ['./hotel-managment.component.css'],
})
export class HotelManagmentComponent implements OnInit, OnDestroy {
  hotels$: Observable<Hotel[]> = new Observable<Hotel[]>();
  subscription: Subscription = new Subscription();

  constructor(private store: Store<HotelState>) {}

  ngOnInit(): void {
    this.hotels$ = this.store.select(hotelsSelector);

    this.store.dispatch(getHotels());
  }

  onDelete(id: string) {
    this.store.dispatch(deleteHotel({ id }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
