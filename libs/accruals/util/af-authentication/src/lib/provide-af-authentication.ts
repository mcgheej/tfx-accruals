import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { AfAuthenticationService } from './af-authentication.service';
import { AfAuthenticationConfig } from './tokens';
import { AfAuthConfig } from './types';

export function provideAfAuthentication(
  config: AfAuthConfig
): EnvironmentProviders {
  return makeEnvironmentProviders([
    AfAuthenticationService,
    {
      provide: AfAuthenticationConfig,
      useValue: config,
    },
  ]);
}
