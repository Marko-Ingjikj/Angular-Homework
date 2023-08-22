import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-managment',
  templateUrl: './hotel-managment.component.html',
  styleUrls: ['./hotel-managment.component.css'],
})
export class HotelManagmentComponent implements OnInit {
  constructor(private hotelService: HotelService) {}

  hotels: Hotel[] = [];

  ngOnInit(): void {
    this.hotels = this.hotelService.getHotels();
  }
}
