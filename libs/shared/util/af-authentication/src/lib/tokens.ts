import { InjectionToken } from '@angular/core';
import { AfAuthConfig } from './types';

export const AfAuthenticationConfig = new InjectionToken<AfAuthConfig>(
  'AuthenticationConfig'
);
