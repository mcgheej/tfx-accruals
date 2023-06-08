import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AfAuthenticationService } from '@tfx-accruals/shared/util/af-authentication';

@Component({
  selector: 'tfx-login',
  standalone: true,
  imports: [CommonModule],
  template: ` <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
    (click)="onLoginClick()"
  >
    Login
  </button>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private afAuth: AfAuthenticationService = inject(AfAuthenticationService);

  onLoginClick() {
    this.afAuth.login('mcghee.j@btinternet.com', 'howdydoodee');
  }
}
