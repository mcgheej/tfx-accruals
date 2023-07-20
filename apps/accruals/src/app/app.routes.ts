import { Route } from '@angular/router';
import { HomeComponent } from '@tfx-accruals/accruals/feature/home';
import { PageNotFoundComponent } from '@tfx-accruals/accruals/shell';
import {
  afAuthGuard,
  afNotAuthGuard,
} from '@tfx-accruals/shared/util/af-authentication';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent, title: 'Home Page' },
  {
    path: 'login',
    canActivate: [afNotAuthGuard('/home')],
    loadChildren: () =>
      import('@tfx-accruals/accruals/feature/login').then((m) => m.loginRoutes),
  },
  {
    path: 'statements',
    canActivate: [afAuthGuard('/home')],
    loadChildren: () =>
      import('@tfx-accruals/accruals/feature/statements').then(
        (m) => m.statementsRoutes
      ),
  },
  {
    path: 'dashboard',
    canActivate: [afAuthGuard('/home')],
    loadChildren: () =>
      import('@tfx-accruals/accruals/feature/dashboard').then(
        (m) => m.dashboardRoutes
      ),
  },
  {
    path: 'accruals',
    canActivate: [afAuthGuard('/home')],
    loadChildren: () =>
      import('@tfx-accruals/accruals/feature/accruals').then(
        (m) => m.accrualsRoutes
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];
