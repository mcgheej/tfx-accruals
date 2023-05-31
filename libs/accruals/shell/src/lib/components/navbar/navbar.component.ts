import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
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
  private isLoggedIn = true;
  isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn);
  isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

  onMenuButtonClick() {
    this.menuHidden = !this.menuHidden;
  }

  onLogout() {
    this.isLoggedIn = false;
    this.isLoggedIn$.next(this.isLoggedIn);
  }
}
