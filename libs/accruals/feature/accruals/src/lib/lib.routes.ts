import { Route } from '@angular/router';
import { AccrualFormComponent } from './accrual-form/accrual-form.component';
import { accrualFormResolver } from './accrual-form/accrual-form.resolver';
import { AccrualsComponent } from './accruals/accruals.component';

export const accrualsRoutes: Route[] = [
  { path: 'add', component: AccrualFormComponent },
  {
    path: 'edit/:id',
    resolve: { accrual: accrualFormResolver },
    component: AccrualFormComponent,
  },
  { path: '', component: AccrualsComponent },
];
