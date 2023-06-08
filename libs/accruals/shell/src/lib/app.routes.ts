import { Route } from '@angular/router';
import { HomeComponent } from '@tfx-accruals/accruals/feature/home';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent, title: 'Home Page' },
  {
    path: 'login',
    loadChildren: () =>
      import('@tfx-accruals/accruals/feature/login').then((m) => m.loginRoutes),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('@tfx-accruals/accruals/feature/register').then(
        (m) => m.registerRoutes
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@tfx-accruals/accruals/feature/dashboard').then(
        (m) => m.dashboardRoutes
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];
