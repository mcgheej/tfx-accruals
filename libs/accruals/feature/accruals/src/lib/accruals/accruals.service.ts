import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';
import { AccrualDeletedSnackComponent } from '../components/accrual-deleted-snack/accrual-deleted-snack.component';

@Injectable()
export class AccrualsService {
  private snackBar = inject(MatSnackBar);
  private db = inject(AfAccrualsDataService);

  /**
   * Method that sets the accrual's deleted flag to true
   *
   * @param accrual accrual to flag as deleted
   *
   */
  deleteAccrual(accrual: PresentationAccrual) {
    this.snackBar.open('Deleting...', undefined, { duration: 0 });
    this.db.deleteAccrual(accrual).subscribe({
      next: () => {
        this.undoSnackBar(accrual);
      },
      error: (err) => {
        this.snackBar.open(err.message, undefined, { duration: 2000 });
      },
    });
  }

  private undoSnackBar(accrual: PresentationAccrual) {
    this.snackBar
      .openFromComponent(AccrualDeletedSnackComponent, {
        duration: 10000,
        verticalPosition: 'bottom',
      })
      .onAction()
      .subscribe({
        next: () => this.undoDelete(accrual),
      });
  }

  private undoDelete(accrual: PresentationAccrual) {
    this.snackBar.open(`Undoing delete of ${accrual.name}...`);
    this.db.recoverAccrual(accrual).subscribe({
      next: () =>
        this.snackBar.open('Delete undone', undefined, { duration: 2000 }),
      error: (err) => {
        this.snackBar.open(
          `Undo delete of ${accrual.name} failed - ${err}`,
          undefined,
          { duration: 5000 }
        );
      },
    });
  }
}
