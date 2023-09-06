import { AuthService } from './../components/auth/auth.service';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/hotel-managment']);
      return false;
    }
    return true;
  }
}
