import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AfAuthenticationService } from '@tfx-accruals/shared/util/af-authentication';
import { map } from 'rxjs';
import { HamburgerButtonComponent } from './hamburger-button.component';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'tfx-navbar',
  standalone: true,
  imports: [CommonModule, LogoComponent, RouterLink, HamburgerButtonComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  menuHidden = true;
  vm$ = this.afAuth.isLoggedIn$.pipe(
    map((loggedIn) => {
      return {
        loggedIn,
      };
    })
  );

  constructor(private afAuth: AfAuthenticationService) {}

  onMenuButtonClick() {
    this.menuHidden = !this.menuHidden;
  }

  onLogout() {
    this.afAuth.logout();
  }
}
