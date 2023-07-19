import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VMDashboard } from '../dashboard.types';

@Component({
  selector: 'tfx-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  /**
   * vmDashboard is bound to the output of a resolver that gets
   * a VMDashboard object containing accrual and statement data
   * for the current month
   */
  @Input() vmDashboard!: VMDashboard;
}
