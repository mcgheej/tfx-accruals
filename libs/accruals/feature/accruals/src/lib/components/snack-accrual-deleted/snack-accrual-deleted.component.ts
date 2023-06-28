import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'tfx-snack-accrual-deleted',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="w-full flex items-center">
      <div class="text-white text-base grow">Accrual deleted</div>
      <button mat-button color="accent" class="w-16" (click)="onUndo()">
        UNDO
      </button>
      <button
        mat-icon-button
        class="w-8 h-8 leading-8 flex justify-items-center items-center"
        (click)="onClose()"
      >
        <mat-icon
          class="text-[24px] leading-[24px] w-[24px] h-[24px] text-[#5f6368]"
          >close</mat-icon
        >
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackAccrualDeletedComponent {
  private snackBarRef = inject(MatSnackBarRef<SnackAccrualDeletedComponent>);

  onUndo() {
    this.snackBarRef.dismissWithAction();
  }

  onClose() {
    this.snackBarRef.dismiss();
  }
}
