import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from '@tfx-accruals/accruals/shell';
import { firebaseConfig } from '@tfx-accruals/accruals/util/firebase-config';
import { provideAfAuthentication } from '@tfx-accruals/shared/util/af-authentication';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom([
      MatSnackBarModule,
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
    ]),
    provideAfAuthentication({
      urlOnLoggedIn: '/dashboard',
      urlOnLoggedOut: '/home',
    }),
  ],
};
