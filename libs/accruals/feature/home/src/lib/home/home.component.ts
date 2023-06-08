import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tfx-home',
  standalone: true,
  imports: [CommonModule],
  template: `<h1 class="border text-green-600">Home - Hello world!</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
