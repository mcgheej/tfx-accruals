import { Route } from '@angular/router';
import { HomeComponent } from '@tfx-accruals/accruals/feature/home';
import { PageNotFoundComponent } from '@tfx-accruals/accruals/shell';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent, title: 'Home Page' },
  {
    path: 'login',
    loadChildren: () =>
      import('@tfx-accruals/accruals/feature/login').then((m) => m.loginRoutes),
  },
  {
    path: 'statements',
    loadChildren: () =>
      import('@tfx-accruals/accruals/feature/statements').then(
        (m) => m.statementsRoutes
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@tfx-accruals/accruals/feature/dashboard').then(
        (m) => m.dashboardRoutes
      ),
  },
  {
    path: 'accruals',
    loadChildren: () =>
      import('@tfx-accruals/accruals/feature/accruals').then(
        (m) => m.accrualsRoutes
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];
