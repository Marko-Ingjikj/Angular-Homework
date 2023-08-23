import { HotelService } from '../../services/hotel.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Hotel } from '../../interfaces/hotel.interface';
import { Room } from '../../interfaces/room-interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css'],
})
export class HotelFormComponent implements OnInit {
  urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  isEditing: boolean = false;

  hotelForm = new FormGroup({
    id: new FormControl<number>(Date.now()),
    name: new FormControl<string>(
      '',
      Validators.compose([Validators.required])
    ),
    address: new FormControl<string>(
      '',
      Validators.compose([Validators.required])
    ),
    city: new FormControl<string>(
      '',
      Validators.compose([Validators.required])
    ),
    country: new FormControl<string>(
      '',
      Validators.compose([Validators.required])
    ),
    stars: new FormControl<number>(
      0,
      Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ])
    ),
    image: new FormControl<string>(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.urlRegex),
      ])
    ),
    rooms: new FormControl<Room[]>([]),
  });

  get nameHasErrorRequired() {
    return this.hotelForm.get('name')?.hasError('required');
  }

  get imageHasUrlError() {
    return this.hotelForm.get('image')?.hasError('pattern');
  }

  get addressHasErrorRequired() {
    return this.hotelForm.get('address')?.hasError('required');
  }

  get cityHasErrorRequired() {
    return this.hotelForm.get('city')?.hasError('required');
  }

  get countryHasErrorRequired() {
    return this.hotelForm.get('country')?.hasError('required');
  }

  get starsHasErrorRequired() {
    return this.hotelForm.get('stars')?.hasError('required');
  }

  get starsHasMinError() {
    return this.hotelForm.get('stars')?.hasError('min');
  }

  get starsHasMaxError() {
    return this.hotelForm.get('stars')?.hasError('max');
  }

  get imageHasErrorRequired() {
    return this.hotelForm.get('image')?.hasError('required');
  }

  get imageHasInvalidUrlError() {
    return this.hotelForm.get('image')?.hasError('pattern');
  }

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const hotelId = this.route.snapshot.params['id'];

    if (hotelId) {
      const hotel = this.hotelService.getHotelById(Number(hotelId));
      if (hotel) {
        this.isEditing = true;

        this.hotelForm.patchValue(hotel);
      }
    }
  }

  onSubmit() {
    const hotel = {
      ...this.hotelForm.value,
    };

    if (this.isEditing) {
      this.hotelService.updateHotel(hotel as Hotel);
    } else {
      this.hotelService.addNewHotel(hotel as Hotel);
    }
    this.router.navigate(['/']);
  }
}
