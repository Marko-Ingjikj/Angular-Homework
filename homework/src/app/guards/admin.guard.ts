import { Observable, take, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../components/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    return this.authService.userData$.pipe(
      take(1),
      map((user) => !!user?.roles?.['admin']),
      tap((isAdmin) => !isAdmin && this.router.navigate(['/hotel-managment']))
    );
  }
}
