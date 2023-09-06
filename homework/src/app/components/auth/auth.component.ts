import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  showLoginForm: boolean = true;
  hidePassword: boolean = true;

  authForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(
      this.authForm.value.name!,
      this.authForm.value.email!,
      this.authForm.value.password!
    );
  }
}
