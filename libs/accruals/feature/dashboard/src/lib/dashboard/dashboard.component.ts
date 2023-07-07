import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tfx-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `<p>dashboard is working!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
