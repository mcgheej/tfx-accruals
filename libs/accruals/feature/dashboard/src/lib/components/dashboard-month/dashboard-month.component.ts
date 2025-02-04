import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DashboardMonth } from '../../dashboard.types';

@Component({
    selector: 'tfx-dashboard-month',
    imports: [CommonModule],
    templateUrl: './dashboard-month.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardMonthComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) monthData!: DashboardMonth;
}
