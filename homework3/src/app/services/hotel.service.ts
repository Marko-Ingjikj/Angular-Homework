import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel.interface';
import { Room } from '../interfaces/room-interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private hotelsDefaultData: Hotel[] = [
    {
      id: 1,
      name: 'Kristal',
      address: 'Ploshtad Nova Jugoslavija',
      city: 'Kumanovo',
      country: 'Macedonia',
      stars: 5,
      image:
        'https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=',
      rooms: [
        {
          id: 1,
          name: 'Room One',
          description: 'Very good room.Excelent service',
          image:
            'https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg?w=2000',
          price: 100,
          persons: 2,
          children: 2,
          amenities: [
            'TV',
            'Air Conditioning',
            'Mini Bar',
            'Bathtub',
            'Free WiFi',
          ],
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Room Two',
          description: 'Very good room.Excelent service',
          image:
            'https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=',
          price: 200,
          persons: 4,
          children: 0,
          amenities: [
            'TV',
            'Air Conditioning',
            'Mini Bar',
            'Bathtub',
            'Free WiFi',
          ],
          isAvailable: false,
        },
      ],
    },
    {
      id: 2,
      name: 'Kumanovo Spa',
      address: 'Kumanovska Banja Kumanovo',
      city: 'Kumanovo',
      country: 'Macedonia',
      stars: 4.5,
      image: 'https://www.ahstatic.com/photos/c096_ho_00_p_1024x768.jpg',
      rooms: [
        {
          id: 1,
          name: 'Room One',
          description: 'Very good room.Excelent service',
          image:
            'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?cs=srgb&dl=pexels-pixabay-164595.jpg&fm=jpg',
          price: 100,
          persons: 2,
          children: 2,
          amenities: [
            'TV',
            'Air Conditioning',
            'Mini Bar',
            'Bathtub',
            'Free WiFi',
          ],
          isAvailable: true,
        },
        {
          id: 2,
          name: 'Room Two',
          description: 'Very good room.Excelent service',
          image:
            'https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg',
          price: 200,
          persons: 4,
          children: 0,
          amenities: [
            'TV',
            'Air Conditioning',
            'Mini Bar',
            'Bathtub',
            'Free WiFi',
          ],
          isAvailable: false,
        },
      ],
    },
  ];

  private hotelData: BehaviorSubject<Hotel[]> = new BehaviorSubject(
    this.hotelsDefaultData
  );

  hotels$: Observable<Hotel[]> = this.hotelData.asObservable();

  private updateHotelData(hotels: Hotel[]) {
    this.hotelData.next(hotels);
  }

  updateHotel(hotel: Hotel) {
    const hotels = this.hotelData.getValue();

    const index = hotels.findIndex((h) => h.id == hotel.id);
    hotels[index] = {
      ...hotels[index],
      ...hotel,
    };

    this.updateHotelData(hotels);
  }

  addNewHotel(hotel: Hotel) {
    const hotels = this.hotelData.getValue();
    hotels.push(hotel);

    this.updateHotelData(hotels);
  }

  addNewRoom(hotelId: number, newRoom: Room) {
    const hotels = this.hotelData.getValue();
    const index = hotels.findIndex((hotel) => hotel.id == hotelId);
    hotels[index].rooms.push(newRoom);

    this.updateHotelData(hotels);
  }

  updateRoom(hotelId: number, roomId: Number, roomData: Room) {
    const hotels = this.hotelData.getValue();
    const hotelIndex = hotels.findIndex((hotel) => hotel.id === hotelId);
    const roomIndex = hotels[hotelIndex].rooms.findIndex(
      (room) => room.id === roomId
    );
    hotels[hotelIndex].rooms[roomIndex] = {
      ...hotels[hotelIndex].rooms[roomIndex],
      ...roomData,
    };

    this.updateHotelData(hotels);
  }

  deleteRoom(hotelId: number | undefined, roomId: number) {
    const hotels = this.hotelData.getValue();
    const hotelIndex = hotels.findIndex((hotel) => hotel.id === hotelId);

    const roomIndex = hotels[hotelIndex].rooms.findIndex(
      (room) => room.id === roomId
    );

    hotels[hotelIndex].rooms.splice(roomIndex, 1);
    this.updateHotelData(hotels);
  }

  deleteHotel(hotelId: number) {
    let hotels = this.hotelData.getValue();

    hotels = hotels.filter((hotel) => hotel.id !== hotelId);

    this.updateHotelData(hotels);
  }
}
