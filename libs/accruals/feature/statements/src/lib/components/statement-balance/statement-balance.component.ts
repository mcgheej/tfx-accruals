import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tfx-statement-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statement-balance.component.html',
  styleUrls: ['./statement-balance.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatementBalanceComponent {
  @Input() title = 'Opening balance';
  @Input() amount = 0;
}
