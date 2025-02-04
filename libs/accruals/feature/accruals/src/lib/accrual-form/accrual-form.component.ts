import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAX_ACCRUAL_DURATION_IN_MONTHS,
  MIN_ACCRUAL_DURATION_IN_MONTHS,
} from '@tfx-accruals/accruals/util/accruals-types';
import { add, format, intervalToDuration } from 'date-fns';
import { AccrualFormService } from './accrual-form.service';
import { VMAccrual } from './vm-accrual';

@Component({
    selector: 'tfx-accrual-form',
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
    ],
    templateUrl: './accrual-form.component.html',
    providers: [AccrualFormService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccrualFormComponent {
  /**
   * The following inputs are bound to the routes targeting this component
   * through Component Input Binding.
   *
   * vmAccrual: this is bound to output of a resolver that gets the accrual
   *            object associated with the id in the path "accruals/edit/:id"
   *
   * The other path that routes to this component is "accruals/add". In this case
   * the resolver will intialise vmAccrual to the initial values defined for an accrual.
   */
  @Input() vmAccrual!: VMAccrual;

  private service = inject(AccrualFormService);

  /**
   * Called when the user completes entering data on the form.
   *
   * If the user was updating an existing accrual then the VMAccrual
   * object input to the component will have an non-empty id field.
   * In this case the accrual will be updated with any changes.
   *
   * If the id field is empty then a new accrual will be created.
   */
  onSubmit() {
    this.vmAccrual.startDate = format(
      this.vmAccrual.firstDepositDate,
      'yyyyMM'
    );
    const accrualData = this.service.vmToAccrualData(this.vmAccrual);
    if (this.vmAccrual.id) {
      this.service.updateAccrual(this.vmAccrual.id, accrualData);
    } else {
      this.service.createAccrual(accrualData);
    }
  }

  /**
   * This method is called when the user changes the accrual start
   * date, i.e. the date when the first deposit for the accrual is due.
   *
   * The method updates the VMAccrual object fields affected when the
   * user selects a start date using the form's Start Date datepicker control.
   * Affected fields are firstDepositDate, withdrawalDate, minWithdrawalDate
   * and maxWithdrawalDate. The method finsihes by closing the datepicker
   * control.
   */
  setMonthAndYear(
    normalizedMonthAndYear: Date,
    datepicker: MatDatepicker<Date>
  ) {
    this.vmAccrual.firstDepositDate = normalizedMonthAndYear;
    this.vmAccrual.withdrawalDate = add(normalizedMonthAndYear, {
      months: this.vmAccrual.durationInMonths,
    });
    this.vmAccrual.minWithdrawalDate = add(normalizedMonthAndYear, {
      months: MIN_ACCRUAL_DURATION_IN_MONTHS,
    });
    this.vmAccrual.maxWithdrawalDate = add(normalizedMonthAndYear, {
      months: MAX_ACCRUAL_DURATION_IN_MONTHS,
    });
    datepicker.close();
  }

  /**
   * This method is called when the user changes the accrual withdrawal
   * date, i.e. the date when the accrued sum can be withdrawn.
   *
   * The method updates the VMAccrual object fields affected when the
   * user selects a withdrawal date using the form's Withdrawal Date
   * datepicker control. Affected fields are withdrawalDate and the
   * durationInMonths. The method finsihes by closing the datepicker
   * control.
   */
  setWithdrawalMonthAndYear(
    normalizedMonthAndYear: Date,
    datepicker: MatDatepicker<Date>
  ) {
    this.vmAccrual.withdrawalDate = normalizedMonthAndYear;
    const duration = intervalToDuration({
      start: this.vmAccrual.firstDepositDate,
      end: this.vmAccrual.withdrawalDate,
    });
    this.vmAccrual.durationInMonths = duration.years ? duration.years * 12 : 0;
    this.vmAccrual.durationInMonths += duration.months ? duration.months : 0;
    datepicker.close();
  }
}
