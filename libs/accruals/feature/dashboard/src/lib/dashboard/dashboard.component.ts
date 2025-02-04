import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DashboardAccountComponent } from '../components/dashboard-account/dashboard-account.component';
import { DashboardAccrualsComponent } from '../components/dashboard-accruals/dashboard-accruals.component';
import { DashboardMonthComponent } from '../components/dashboard-month/dashboard-month.component';
import { VMDashboard } from '../dashboard.types';

@Component({
    selector: 'tfx-dashboard',
    imports: [
        CommonModule,
        DashboardAccrualsComponent,
        DashboardAccountComponent,
        DashboardMonthComponent,
    ],
    templateUrl: './dashboard.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  /**
   * vmDashboard is bound to the output of a resolver that gets
   * a VMDashboard object containing accrual and statement data
   * for the current month
   */
  @Input() vmDashboard!: VMDashboard;
}
