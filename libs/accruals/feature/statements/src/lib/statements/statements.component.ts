import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tfx-statements',
  standalone: true,
  imports: [CommonModule],
  template: `<p>statements works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatementsComponent {}
