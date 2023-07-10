import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Statement } from '@tfx-accruals/accruals/util/accruals-types';

@Component({
  selector: 'tfx-statements',
  standalone: true,
  imports: [CommonModule],
  template: `<div>{{ vmStatement | json }}</div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatementsComponent implements OnInit {
  @Input() vmStatement!: Statement;

  ngOnInit(): void {
    console.log(this.vmStatement);
  }
}
