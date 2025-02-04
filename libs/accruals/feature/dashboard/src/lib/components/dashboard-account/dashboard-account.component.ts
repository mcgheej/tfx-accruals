import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DashboardAccount } from '../../dashboard.types';

@Component({
    selector: 'tfx-dashboard-account',
    imports: [CommonModule],
    templateUrl: './dashboard-account.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardAccountComponent {
  @Input({ required: true }) accountData!: DashboardAccount;

  transferTitle(amount: number): string {
    if (amount < 0) {
      return `Withdraw `;
    }
    return `Deposit `;
  }

  transferAmount(amount: number): number {
    return Math.abs(amount);
  }
}
