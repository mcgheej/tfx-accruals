import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'tfx-snack-permanent-delete',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full flex items-center">
      <div class="text-white text-base grow">Permanently delete?</div>
      <button mat-button class="w-16" (click)="onCancel()">cancel</button>
      <button
        mat-button
        color="accent"
        class="w-16"
        (click)="onPermanentDelete()"
      >
        DELETE
      </button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackPermanentDeleteComponent {
  private snackBarRef = inject(MatSnackBarRef);

  onPermanentDelete() {
    this.snackBarRef.dismissWithAction();
  }

  onCancel() {
    this.snackBarRef.dismiss();
  }
}
