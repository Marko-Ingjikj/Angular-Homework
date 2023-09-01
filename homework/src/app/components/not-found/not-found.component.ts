import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  cameFromRoomUrl: boolean = false;
  cameFromHotelUrl: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params['from'];

    if (params == 'hotel') {
      this.cameFromHotelUrl = true;
    }

    if (params == 'room') {
      this.cameFromRoomUrl = true;
    }
  }
}
