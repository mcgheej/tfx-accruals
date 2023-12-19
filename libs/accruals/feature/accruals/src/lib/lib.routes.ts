import { Route } from '@angular/router';
import { accrualFormResolver } from './accrual-form/accrual-form.resolver';

export const accrualsRoutes: Route[] = [
  {
    path: 'add',
    resolve: { vmAccrual: accrualFormResolver },
    loadComponent: () =>
      import('./accrual-form/accrual-form.component').then(
        (m) => m.AccrualFormComponent
      ),
  },
  {
    path: 'edit/:id',
    resolve: { vmAccrual: accrualFormResolver },
    loadComponent: () =>
      import('./accrual-form/accrual-form.component').then(
        (m) => m.AccrualFormComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./accruals/accruals.component').then((m) => m.AccrualsComponent),
  },
];
