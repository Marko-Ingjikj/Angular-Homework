import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { HotelState } from 'src/app/interfaces/hotel-state.interface';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import {
  deleteHotel,
  getFilteredHotels,
  getHotels,
} from 'src/app/store/hotels/hotels.actions';
import { hotelsSelector } from 'src/app/store/hotels/hotels.selectors';
import { AuthService } from '../auth/auth.service';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { Room } from 'src/app/interfaces/room-interface';

defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-hotel-managment',
  templateUrl: './hotel-managment.component.html',
  styleUrls: ['./hotel-managment.component.css'],
})
export class HotelManagmentComponent implements OnInit, OnDestroy {
  hotels$: Observable<Hotel[]> = new Observable<Hotel[]>();
  subscription: Subscription = new Subscription();
  roomsAvaiable: Room[] = [];

  searchTerm: string = '';
  roomsAvailableFilter: boolean = false;

  isLoggedIn$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private store: Store<HotelState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this.hotels$ = this.store.select(hotelsSelector);

    this.store.dispatch(getHotels());
  }

  getAvailableRooms(rooms: Room[]): number {
    if (rooms.length === 0) {
      return 0;
    }

    return rooms.filter((room) => room.isAvailable).length;
  }

  onDelete(id: string) {
    this.store.dispatch(deleteHotel({ id }));
  }

  onKeyUp(e: any) {
    this.searchTerm = e.target.value;
    this.getFilteredHotels();
  }
  changeRoomsAvailableFilter(e: any) {
    this.roomsAvailableFilter = e.target.checked;
    this.getFilteredHotels();
  }

  getFilteredHotels() {
    this.store.dispatch(
      getFilteredHotels({
        filters: {
          searchTerm: this.searchTerm.toLowerCase(),
          roomsAvailable: this.roomsAvailableFilter,
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
