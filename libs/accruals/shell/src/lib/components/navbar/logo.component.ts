import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tfx-logo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div>
      <a routerLink="/home">
        <div [style.width]="'150px'" [style.height]="'32.125px'"></div>
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {}
