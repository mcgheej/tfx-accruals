import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { VMStatement } from '@tfx-accruals/accruals/util/accruals-types';
import { compareAsc, compareDesc, parse } from 'date-fns';
import { MonthSelectorComponent } from '../components/month-selector/month-selector.component';
import { StatementBalanceComponent } from '../components/statement-balance/statement-balance.component';
import { TransactionsComponent } from '../components/transactions/transactions.component';
import { displayStatementMonth } from '../helpers';

@Component({
    selector: 'tfx-statements',
    imports: [
        CommonModule,
        MatButtonModule,
        MonthSelectorComponent,
        StatementBalanceComponent,
        TransactionsComponent,
    ],
    templateUrl: './statements.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatementsComponent {
  /**
   * vmStatement is bound to the output of a resolver that gets
   * a VMStatement object containing data for the month identified
   * by a route parameter
   */
  @Input() vmStatement: VMStatement | undefined;

  displayStatementMonth = displayStatementMonth;

  private router = inject(Router);

  onMonthChanged(newMonth: string) {
    const newMonthDate = parse(newMonth, 'yyyyMM', Date.now());
    if (
      this.vmStatement &&
      (compareAsc(newMonthDate, this.vmStatement.minDate) < 0 ||
        compareDesc(newMonthDate, this.vmStatement.maxDate) < 0)
    ) {
      this.router.navigateByUrl(`statements/${this.vmStatement.yearMonth}`);
    } else {
      this.router.navigateByUrl(`statements/${newMonth}`);
    }
  }
}
