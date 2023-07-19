import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardResolver } from './dashboard/dashboard.resolver';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    resolve: { vmDashboard: dashboardResolver },
  },
];
