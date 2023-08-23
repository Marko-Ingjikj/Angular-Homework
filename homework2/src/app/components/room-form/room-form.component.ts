import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
})
export class RoomFormComponent implements OnInit {
  urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  isEditing: boolean = false;

  roomForm = new FormGroup({
    id: new FormControl<number>(Date.now()),
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    image: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(this.urlRegex),
    ]),
    price: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    persons: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
    ]),
    children: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
    ]),
    amenities: new FormControl<string[]>([]),
    isAvailable: new FormControl<boolean>(false),
  });

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const hotelId = this.route.snapshot.params['id'];
  }

  onSubmit() {}
}
