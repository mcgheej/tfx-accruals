import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DashboardAccruals } from '../../dashboard.types';

@Component({
    selector: 'tfx-dashboard-accruals',
    imports: [CommonModule],
    templateUrl: './dashboard-accruals.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardAccrualsComponent {
  @Input({ required: true }) accrualsData!: DashboardAccruals;
}
