import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';
import { AfAuthenticationConfig } from './tokens';
import { AfAuthConfig } from './types';

@Injectable()
export class AfAuthenticationService {
  private config: AfAuthConfig = inject(AfAuthenticationConfig);
  private afAuth: Auth = inject(Auth);
  private authState$ = authState(this.afAuth);

  isLoggedIn$: Observable<boolean>;

  constructor() {
    console.log(this.config);
    this.isLoggedIn$ = this.authState$.pipe(map((user) => !!user));
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.afAuth, email, password));
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}
