import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
})
export class HotelDetailsComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  hotels: Hotel[] = [];

  hotelToShow: Hotel | undefined;

  ngOnInit(): void {
    let id = +this.router.snapshot.params['id'];

    this.hotels = this.hotelService.getHotels();

    this.hotelToShow = this.hotels.find((hotel) => hotel.id === id);
  }
}
