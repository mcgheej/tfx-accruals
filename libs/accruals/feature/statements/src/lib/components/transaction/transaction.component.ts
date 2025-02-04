import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Transaction } from '@tfx-accruals/accruals/util/accruals-types';

@Component({
    selector: 'tfx-transaction',
    imports: [CommonModule],
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionComponent {
  @Input({ required: true }) transaction!: Transaction;
}
