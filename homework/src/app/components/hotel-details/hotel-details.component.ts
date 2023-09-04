import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map, mergeMap } from 'rxjs';
import { HotelState } from 'src/app/interfaces/hotel-state.interface';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { deleteRoom } from 'src/app/store/hotels/hotels.actions';
import { hotelsSelector } from 'src/app/store/hotels/hotels.selectors';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
})
export class HotelDetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  hotelToShow: Hotel | undefined;
  hotels$: Observable<Hotel[]> = new Observable<Hotel[]>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<HotelState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        map((params) => params['id']),
        mergeMap((id) =>
          this.store
            .select(hotelsSelector)
            .pipe(map((hotel) => hotel.find((h) => h.id === id || null)))
        )
      )
      .subscribe((hotel) => {
        if (hotel) {
          this.hotelToShow = hotel;
        } else {
          this.router.navigate(['/**']);
        }
      });
  }

  onDelete(roomId: string) {
    if (this.hotelToShow) {
      const hotelId = this.hotelToShow.id;
      this.store.dispatch(deleteRoom({ hotelId, roomId }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
