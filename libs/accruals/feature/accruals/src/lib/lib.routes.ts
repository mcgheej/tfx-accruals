import { Route } from '@angular/router';
import { AccrualFormComponent } from './accrual-form/accrual-form.component';
import { AccrualsComponent } from './accruals/accruals.component';
import { accrualFormResolver } from './resolvers/accrual-form-resolver';

export const accrualsRoutes: Route[] = [
  { path: 'edit', component: AccrualFormComponent },
  {
    path: 'edit/:id',
    resolve: { accrual: accrualFormResolver },
    component: AccrualFormComponent,
  },
  { path: 'recycle', component: AccrualsComponent },
  { path: '', component: AccrualsComponent },
];
