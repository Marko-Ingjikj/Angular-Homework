import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.fireAuth.authState.subscribe({
      next: (user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.setItem('user', '');
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  async login(email: string, password: string) {
    try {
      const result = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (result.user) {
        this.router.navigate(['/hotel-managment']);
      } else {
        console.error('Rrror while log in');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async register(name: string, email: string, password: string) {
    try {
      const result = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (result?.user) {
        await result.user.updateProfile({ displayName: name });
        await this.setUserData(result.user as User);
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error(error);
    }
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user;
  }

  setUserData(user: User): Promise<void> {
    const userRef = this.firestore.collection('users').doc(user.uid);

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
    };

    return userRef.set(userData, { merge: true });
  }
}
