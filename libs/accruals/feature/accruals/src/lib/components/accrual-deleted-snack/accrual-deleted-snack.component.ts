import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'tfx-accrual-deleted-snack',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './accrual-deleted-snack.component.html',
  styleUrls: ['./accrual-deleted-snack.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualDeletedSnackComponent {
  private snackBarRef = inject(MatSnackBarRef<AccrualDeletedSnackComponent>);

  onUndo() {
    this.snackBarRef.dismissWithAction();
  }

  onClose() {
    this.snackBarRef.dismiss();
  }
}
