import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from '@tfx-accruals/accruals/shell';
import { firebaseConfig } from '@tfx-accruals/accruals/util/firebase-config';
import { provideAfAuthentication } from '@tfx-accruals/shared/util/af-authentication';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig))
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    provideAfAuthentication({
      urlOnLoggedIn: '/home',
      urlOnLoggedOut: '/home',
    }),
  ],
};
