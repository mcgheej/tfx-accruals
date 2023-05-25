import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'tfx-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  // template: `<h1 class="border text-green-600">Hello world!</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}
