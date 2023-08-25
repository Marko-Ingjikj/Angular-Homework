import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map, mergeMap } from 'rxjs';
import { Hotel } from 'src/app/interfaces/hotel.interface';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
})
export class HotelDetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  hotelToShow: Hotel | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        map((params) => Number(params['id'])),
        mergeMap((id) =>
          this.hotelService.hotels$.pipe(
            map((hotels) => hotels.find((hotel) => hotel.id === id))
          )
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

  onDelete(roomId: number) {
    this.hotelService.deleteRoom(this.hotelToShow?.id, roomId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
