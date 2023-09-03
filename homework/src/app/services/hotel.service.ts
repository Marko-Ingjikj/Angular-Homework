import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel.interface';
import { Room } from '../interfaces/room-interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

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

  updateHotel(hotel: Hotel) {
    //  return from(this.firestore.collection('hotels').doc())
  }

  addNewHotel(hotel: Hotel) {
    return from(this.firestore.collection('hotels').add(hotel));
  }

  addNewRoom(hotelId: string, newRoom: Room) {
    // const hotels = this.hotelData.getValue();
    // const index = hotels.findIndex((hotel) => hotel.id == hotelId);
    // hotels[index].rooms.push(newRoom);
    // this.updateHotelData(hotels);
  }

  updateRoom(hotelId: string, roomId: Number, roomData: Room) {
    // const hotels = this.hotelData.getValue();
    // const hotelIndex = hotels.findIndex((hotel) => hotel.id === hotelId);
    // const roomIndex = hotels[hotelIndex].rooms.findIndex(
    //   (room) => room.id === roomId
    // );
    // hotels[hotelIndex].rooms[roomIndex] = {
    //   ...hotels[hotelIndex].rooms[roomIndex],
    //   ...roomData,
    // };
    // this.updateHotelData(hotels);
  }

  deleteRoom(hotelId: string | undefined, roomId: number) {
    // const hotels = this.hotelData.getValue();
    // const hotelIndex = hotels.findIndex((hotel) => hotel.id === hotelId);
    // const roomIndex = hotels[hotelIndex].rooms.findIndex(
    //   (room) => room.id === roomId
    // );
    // hotels[hotelIndex].rooms.splice(roomIndex, 1);
    // this.updateHotelData(hotels);
  }

  deleteHotel(hotelId: string): Observable<void> {
    return from(this.firestore.collection('hotels').doc(hotelId).delete());
  }
}
