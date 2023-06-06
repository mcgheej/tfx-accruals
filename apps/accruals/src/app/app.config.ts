import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from '@tfx-accruals/accruals/shell';
import { provideAfAuthentication } from '@tfx-accruals/accruals/util/af-authentication';
import { firebaseConfig } from '@tfx-accruals/accruals/util/firebase-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig))
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    provideAfAuthentication({
      loginUrl: 'login',
      authInitialUrl: 'initialAuth',
      anonInitialUrl: 'initialAnon',
    }),
  ],
};
