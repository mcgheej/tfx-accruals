import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from, map, tap } from 'rxjs';
import { AfAuthenticationConfig } from './tokens';
import { AfAuthConfig } from './types';

@Injectable()
export class AfAuthenticationService {
  private router: Router = inject(Router);
  private config: AfAuthConfig = inject(AfAuthenticationConfig);
  private afAuth: Auth = inject(Auth);

  private authState$ = authState(this.afAuth);

  isLoggedIn$: Observable<boolean>;

  constructor() {
    this.isLoggedIn$ = this.authState$.pipe(
      map((user) => !!user),
      tap((loggedIn) => {
        loggedIn
          ? this.router.navigateByUrl(this.config.urlOnLoggedIn)
          : this.router.navigateByUrl(this.config.urlOnLoggedOut);
      })
    );
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.afAuth, email, password));
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}
