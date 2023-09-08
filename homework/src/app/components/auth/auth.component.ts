import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: new FormControl<string>('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  onSubmit() {
    const { name, email, password } = this.authForm.value;

    if (this.showLoginForm) {
      if (!email || !password) {
        return;
      }
      this.authService.login(email, password);
    } else {
      if (!email || !password || !name) {
        return;
      }
      this.authService.register(name, email, password);
    }
  }
}
