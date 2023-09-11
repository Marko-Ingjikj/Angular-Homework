import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, mergeMap, of } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

  private userData: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  userData$: Observable<User | null> = this.userData.asObservable();

  subscription: Subscription = new Subscription();

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.fireAuth.authState
      .pipe(
        mergeMap((user) => {
          if (user) {
            return this.firestore
              .collection<User>('users')
              .doc(user.uid)
              .valueChanges();
          } else {
            return of(null);
          }
        })
      )
      .subscribe({
        next: (user: User | null | undefined) => {
          console.log('authState', user);
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.updateIsLoggedIn(true);
            this.updateUserData(user);
          } else {
            localStorage.setItem('user', '');
            this.updateIsLoggedIn(false);
            this.updateUserData(null);
          }
        },
        error: (error) => {
          console.log('authState error', error);
        },
      });
  }

  private updateIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }

  private updateUserData(userData: User | null) {
    this.userData.next(userData);
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

    // this.subscription = this.fireAuth.authState
    //   .pipe(
    //     mergeMap((user) => {
    //       if (user) {
    //         return this.firestore
    //           .collection<User>('users')
    //           .doc(user.uid)
    //           .valueChanges();
    //       } else {
    //         return of(null);
    //       }
    //     })
    //   )
    //   .subscribe({
    //     next: (user: User | null | undefined) => {
    //       if (user) {
    //         localStorage.setItem('user', JSON.stringify(user));
    //         this.updateIsLoggedIn(true);
    //         this.updateUserData(user);
    //       } else {
    //         localStorage.setItem('user', '');
    //         this.updateIsLoggedIn(false);
    //         this.updateUserData(null);
    //       }
    //     },
    //     error: (error) => {
    //       console.log('authState error', error);
    //     },
    //   });
  }

  async register(name: string, email: string, password: string) {
    try {
      const result = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (result?.user) {
        const userData = {
          uid: result.user.uid,
          email,
          name,
          roles: {},
        } satisfies User;

        await result.user.updateProfile({ displayName: name });
        await this.setUserData(userData);
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error(error);
    }
  }

  setUserData(user: User): Promise<void> {
    const userRef = this.firestore.collection('users').doc(user.uid);

    return userRef.set(user, { merge: true });
  }

  async logout() {
    await this.fireAuth.signOut();
    localStorage.removeItem('user');
    this.updateIsLoggedIn(false);
    this.updateUserData(null);
    this.router.navigate(['/login']);
    this.subscription.unsubscribe();
  }
}
