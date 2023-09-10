import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel.interface';
import { Room } from '../interfaces/room-interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, mergeMap, of } from 'rxjs';
import { SearchFilters } from '../interfaces/search-filters.interface';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private firestore: AngularFirestore) {}

  getAllHotels(): Observable<Hotel[]> {
    return this.firestore
      .collection<Hotel>('hotels')
      .valueChanges({ idField: 'id' });
  }

  updateHotel(hotel: Hotel): Observable<void> {
    return from(
      this.firestore.collection('hotels').doc(hotel.id).update(hotel)
    );
  }

  addNewHotel(hotel: Hotel): Observable<Hotel | unknown> {
    return from(this.firestore.collection('hotels').add(hotel));
  }

  addNewRoom(hotelId: string, newRoom: Room): Observable<void | null> {
    return this.firestore
      .collection('hotels')
      .doc(hotelId)
      .get()
      .pipe(
        mergeMap((hotel) => {
          if (!hotel.exists) {
            return of(null);
          }
          const hotelData = hotel.data() as Hotel;

          const rooms = hotelData.rooms;

          rooms.push(newRoom);

          return from(
            this.firestore.collection('hotels').doc(hotelId).update({ rooms })
          );
        })
      );
  }

  updateRoom(
    hotelId: string,
    roomId: string,
    roomData: Room
  ): Observable<void | null> {
    return this.firestore
      .collection('hotels')
      .doc(hotelId)
      .get()
      .pipe(
        mergeMap((hotel) => {
          if (!hotel.exists) {
            return of(null);
          }

          const hotelData = hotel.data() as Hotel;

          const roomIndex = hotelData.rooms.findIndex((r) => r.id === roomId);

          if (roomIndex !== -1) {
            hotelData.rooms[roomIndex] = {
              ...hotelData.rooms[roomIndex],
              ...roomData,
            };
          }
          return from(
            this.firestore
              .collection('hotels')
              .doc(hotelId)
              .update({ rooms: hotelData.rooms })
          );
        })
      );
  }

  deleteRoom(
    hotelId: string | undefined,
    roomId: string
  ): Observable<void | null> {
    return this.firestore
      .collection('hotels')
      .doc(hotelId)
      .get()
      .pipe(
        mergeMap((hotel) => {
          if (!hotel.exists) {
            return of(null);
          }

          const hotelData = hotel.data() as Hotel;

          hotelData.rooms = hotelData.rooms.filter(
            (room) => room.id !== roomId
          );

          return from(
            this.firestore.collection('hotels').doc(hotelId).update(hotelData)
          );
        })
      );
  }

  searchHotels(searchFilters: SearchFilters): Observable<Hotel[]> {
    return this.firestore
      .collection<Hotel>('hotels')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((hotels) => {
          return hotels.filter((hotel) => {
            if (
              searchFilters.searchTerm &&
              !hotel.name.toLowerCase().includes(searchFilters.searchTerm)
            ) {
              return false;
            }

            if (
              searchFilters.from &&
              !hotel.country.includes(searchFilters.from)
            ) {
              return false;
            }

            if (
              searchFilters.roomsAvailable &&
              !hotel.rooms.some((room) => room.isAvailable)
            ) {
              return false;
            }

            return true;
          });
        })
      );
  }

  deleteHotel(hotelId: string): Observable<void> {
    return from(this.firestore.collection('hotels').doc(hotelId).delete());
  }
}
