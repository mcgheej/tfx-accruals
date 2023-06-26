import { Route } from '@angular/router';
import { AccrualsComponent } from './accruals/accruals.component';

export const accrualsRoutes: Route[] = [
  { path: 'recycle', component: AccrualsComponent },
  { path: '', component: AccrualsComponent },
];
