import { HotelService } from '../../services/hotel.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hotel } from '../../interfaces/hotel.interface';
import { Room } from '../../interfaces/room-interface';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css'],
})
export class HotelFormComponent {
  urlValidator = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

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
      1,
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
        Validators.pattern(this.urlValidator),
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

  constructor(private hotelService: HotelService) {}

  onSubmit() {
    console.log(this.hotelForm);

    const hotel = {
      ...this.hotelForm.value,
    };
    this.hotelService.addNewHotel(hotel as Hotel);
  }
}
