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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import {
  Accrual,
  PresentationAccrual,
} from '@tfx-accruals/accruals/util/accruals-types';
import { format } from 'date-fns';
export interface VMAccrual extends PresentationAccrual {
  firstDepositDate: Date;
}

@Component({
  selector: 'tfx-accrual-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  templateUrl: './accrual-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualFormComponent {
  /**
   * The following inputs are bound to the routes targeting this component
   * through Component Input Binding.
   *
   * accrual: this is bound to output of a resolver that gets the accrual
   *          object associated with the id in the path "accruals/edit/:id"
   *
   * The other path that routes to this component is "accruals/add". In this case
   * both the component properties will be undefined.
   */
  @Input() vmAccrual!: VMAccrual;

  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private db = inject(AfAccrualsDataService);

  onSubmit() {
    this.vmAccrual.startDate = format(
      this.vmAccrual.firstDepositDate,
      'yyyyMM'
    );
    const accrualData = this.vmToAccrualData(this.vmAccrual);
    console.log(accrualData);
    if (this.vmAccrual.id) {
      this.updateAccrual(this.vmAccrual.id, accrualData);
    } else {
      this.createAccrual(accrualData);
    }
  }

  setMonthAndYear(
    normalizedMonthAndYear: Date,
    datepicker: MatDatepicker<Date>
  ) {
    this.vmAccrual.firstDepositDate = normalizedMonthAndYear;
    datepicker.close();
  }

  private updateAccrual(id: string, accrualData: Omit<Accrual, 'id'>) {
    this.db.updateAccrual(id, accrualData).subscribe({
      next: () => {
        this.snackBar.open('Accrual updated', undefined, { duration: 2000 });
        this.router.navigateByUrl('/accruals');
      },
      error: (err) => {
        this.snackBar.open(err.message, undefined, { duration: 2000 });
      },
    });
  }

  private createAccrual(accrualData: Omit<Accrual, 'id'>) {
    this.db.createAccrual(accrualData).subscribe({
      next: () => {
        this.snackBar.open('Accrual saved', undefined, { duration: 2000 });
        this.router.navigateByUrl('/accruals');
      },
      error: (err) => {
        this.snackBar.open(err.message, undefined, { duration: 2000 });
      },
    });
  }

  private vmToAccrualData(vmAccrual: VMAccrual): Omit<Accrual, 'id'> {
    vmAccrual.depositSchedule = this.getDepositSchedule(vmAccrual);
    const {
      id: _,
      totals: __,
      firstDepositDate: ___,
      ...accrualData
    } = vmAccrual;
    return accrualData as Omit<Accrual, 'id'>;
  }

  private getDepositSchedule(vmAccrual: VMAccrual): number[] {
    const schedule: number[] = [];
    const duration = vmAccrual.durationInMonths;
    const total = vmAccrual.targetValue;
    const deposit = Math.round((total / duration) * 100) / 100;
    const finalDeposit =
      Math.round((total - deposit * (duration - 1)) * 100) / 100;
    for (let i = 0; i < duration - 1; i++) {
      schedule.push(deposit);
    }
    schedule.push(finalDeposit);
    return schedule;
  }
}
