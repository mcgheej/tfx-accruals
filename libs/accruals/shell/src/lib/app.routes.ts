import { Route } from '@angular/router';
import { HomeComponent } from '@tfx-accruals/accruals/feature/home';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];
