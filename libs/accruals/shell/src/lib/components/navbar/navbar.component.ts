import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AfAuthenticationService } from '@tfx-accruals/shared/util/af-authentication';
import { map } from 'rxjs';
import { NavProps } from '../../shell.types';
import { HamburgerButtonComponent } from './hamburger-button.component';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'tfx-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    HamburgerButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styles: [
    `
      .active-link {
        @apply underline decoration-2 underline-offset-8 decoration-indigo-500;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() navProps: NavProps[] = [];
  @Output() toggleSidenav = new EventEmitter<void>();

  private afAuth = inject(AfAuthenticationService);

  menuHidden = true;
  vm$ = this.afAuth.isLoggedIn$.pipe(
    map((loggedIn) => {
      return {
        loggedIn,
      };
    })
  );

  onMenuButtonClick() {
    this.menuHidden = !this.menuHidden;
  }

  onLogout() {
    this.afAuth.logout();
  }
}
