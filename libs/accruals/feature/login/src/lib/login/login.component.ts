import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AfAuthenticationService } from '@tfx-accruals/shared/util/af-authentication';

@Component({
  selector: 'tfx-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: ` <button
    mat-raised-button
    color="primary"
    class="mx-2"
    (click)="onLoginClick()"
  >
    Login
  </button>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private afAuth: AfAuthenticationService = inject(AfAuthenticationService);

  onLoginClick() {
    this.afAuth.login('mcghee.j@btinternet.com', 'howdydoodee').subscribe({
      error: (err) => {
        console.log(err);
        this.snackBar.open('Invalid username/password', undefined, {
          duration: 2000,
        });
      },
    });
  }
}
