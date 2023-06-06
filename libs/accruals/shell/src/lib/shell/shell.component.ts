import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AfAuthenticationService } from '@tfx-accruals/shared/util/af-authentication';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'tfx-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <tfx-navbar></tfx-navbar>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  constructor(private temp: AfAuthenticationService) {
    temp.isLoggedIn$.subscribe((loggedIn) => console.log(loggedIn));
  }
}
