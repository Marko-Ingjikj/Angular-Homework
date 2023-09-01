import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-managment',
  templateUrl: './hotel-managment.component.html',
  styleUrls: ['./hotel-managment.component.css'],
})
export class HotelManagmentComponent implements OnInit {
  hotels$: Observable<Hotel[]> = new Observable<Hotel[]>();
  subscription: Subscription = new Subscription();

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotels$ = this.hotelService.hotels$.pipe();
  }

  onDelete(hotelId: number) {
    this.hotelService.deleteHotel(hotelId);
  }
}
