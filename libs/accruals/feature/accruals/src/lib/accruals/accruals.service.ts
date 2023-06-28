import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';
import { SnackAccrualDeletedComponent } from '../components/snack-accrual-deleted/snack-accrual-deleted.component';
import { SnackPermanentDeleteComponent } from '../components/snack-permanent-delete/snack-permanent-delete.component';

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
        this.snackBar.open(`Delete failed - ${err.message}`, undefined, {
          duration: 2000,
        });
      },
    });
  }

  restoreAccrual(accrual: PresentationAccrual) {
    this.snackBar.open('Restoring...', undefined, { duration: 0 });
    this.db.recoverAccrual(accrual).subscribe({
      next: () => {
        this.snackBar.open(`Accrual ${accrual.name} restored`, undefined, {
          duration: 2000,
        });
      },
      error: (err) => {
        this.snackBar.open(
          `Restore accrual ${accrual.name} failed - ${err.message}`,
          undefined,
          { duration: 5000 }
        );
      },
    });
  }

  permanentDeleteAccrual(accrual: PresentationAccrual) {
    this.snackBar
      .openFromComponent(SnackPermanentDeleteComponent, {
        duration: 0,
        verticalPosition: 'bottom',
      })
      .onAction()
      .subscribe({
        next: () => this.doPermanentDelete(accrual),
      });
  }

  private undoSnackBar(accrual: PresentationAccrual) {
    this.snackBar
      .openFromComponent(SnackAccrualDeletedComponent, {
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
          `Undo delete of ${accrual.name} failed - ${err.message}`,
          undefined,
          { duration: 5000 }
        );
      },
    });
  }

  private doPermanentDelete(accrual: PresentationAccrual) {
    this.snackBar.open('Permanently deleting', undefined, { duration: 0 });
    this.db.permanentlyDeleteAccrual(accrual).subscribe({
      next: () => {
        this.snackBar.open(`${accrual.name} permanently deleted`, undefined, {
          duration: 2000,
        });
      },
      error: (err) => {
        this.snackBar.open(err.message, undefined, { duration: 2000 });
      },
    });
  }
}
