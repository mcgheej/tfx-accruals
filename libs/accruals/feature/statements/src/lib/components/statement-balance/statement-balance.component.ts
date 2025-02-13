import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'tfx-statement-balance',
    imports: [CommonModule],
    templateUrl: './statement-balance.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatementBalanceComponent {
  @Input() title = 'Opening balance';
  @Input() amount = 0;
}
