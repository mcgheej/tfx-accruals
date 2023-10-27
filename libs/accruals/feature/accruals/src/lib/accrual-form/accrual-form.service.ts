import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import { Accrual } from '@tfx-accruals/accruals/util/accruals-types';
import { VMAccrual } from './vm-accrual';

@Injectable()
export class AccrualFormService {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private db = inject(AfAccrualsDataService);

  createAccrual(accrualData: Omit<Accrual, 'id'>) {
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

  updateAccrual(id: string, accrualData: Omit<Accrual, 'id'>) {
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

  vmToAccrualData(vmAccrual: VMAccrual): Omit<Accrual, 'id'> {
    vmAccrual.depositSchedule = this.getDepositSchedule(vmAccrual);
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { id, totals, firstDepositDate, ...accrualData } = vmAccrual;
    /* eslint-enable @typescript-eslint/no-unused-vars */
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
