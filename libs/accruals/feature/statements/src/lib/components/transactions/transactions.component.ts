import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Transaction } from '@tfx-accruals/accruals/util/accruals-types';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  selector: 'tfx-transactions',
  standalone: true,
  imports: [CommonModule, TransactionComponent],
  templateUrl: './transactions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  @Input({ required: true }) title!: string;
  @Input() transactions: Transaction[] = [];

  getTotal(): number {
    const a: Transaction = this.transactions.reduce((acc, t) => ({
      name: '',
      amount: acc.amount + t.amount,
    }));
    return a.amount;
  }
}
