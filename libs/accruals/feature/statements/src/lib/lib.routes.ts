import { Route } from '@angular/router';
import { StatementsComponent } from './statements/statements.component';
import { statementsResolver } from './statements/statements.resolver';

export const statementsRoutes: Route[] = [
  {
    path: ':yyyymm',
    component: StatementsComponent,
    resolve: { vmStatement: statementsResolver },
  },
];
