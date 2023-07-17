import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AfAuthenticationService } from '@tfx-accruals/shared/util/af-authentication';
import { format } from 'date-fns';
import { map } from 'rxjs';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NavProps } from '../shell.types';

@Component({
  selector: 'tfx-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // RouterOutlet,
    // RouterLink,
    // RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    NavbarComponent,
  ],
  templateUrl: './shell.component.html',
  styles: [
    `
      .active-link {
        @apply text-indigo-500;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  router = inject(Router);

  private afAuth = inject(AfAuthenticationService);

  menuHidden = true;
  vm$ = this.afAuth.isLoggedIn$.pipe(
    map((loggedIn) => {
      return {
        loggedIn,
      };
    })
  );

  navProps: NavProps[] = [
    {
      title: 'Dashboard',
      url: './dashboard',
      loggedInRequired: true,
    },
    {
      title: 'Statements',
      url: this.getThisMonthStatementPath(),
      loggedInRequired: true,
    },
    {
      title: 'Accruals',
      url: './accruals',
      loggedInRequired: true,
    },
    {
      title: 'Login',
      url: './login',
      loggedInRequired: false,
    },
    {
      title: 'Register',
      url: './register',
      loggedInRequired: false,
    },
  ];

  onHomeClick() {
    this.router.navigateByUrl('/home');
  }

  onLogout(sidenav: MatSidenav) {
    sidenav.close();
    this.afAuth.logout();
  }

  getThisMonthStatementPath(): string {
    console.log(this.router.url);
    return `./statements/${format(Date.now(), 'yyyyMM')}`;
  }
}
