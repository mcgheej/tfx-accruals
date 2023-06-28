import { Route } from '@angular/router';
import { AccrualFormComponent } from './accrual-form/accrual-form.component';
import { AccrualsComponent } from './accruals/accruals.component';

export const accrualsRoutes: Route[] = [
  { path: 'add', component: AccrualFormComponent },
  { path: 'edit/:id', component: AccrualFormComponent },
  { path: 'recycle', component: AccrualsComponent },
  { path: '', component: AccrualsComponent },
];
