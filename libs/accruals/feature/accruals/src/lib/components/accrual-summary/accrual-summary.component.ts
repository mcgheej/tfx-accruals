import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';
import * as helper from './helpers';

@Component({
  selector: 'tfx-accrual-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accrual-summary.component.html',
  styleUrls: ['./accrual-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualSummaryComponent {
  @Input({ required: true }) accrual!: PresentationAccrual;
  @Input({ required: true }) expandedAccrualId = '';
  @Output() toggleExpand = new EventEmitter<void>();

  helper = helper;

  onToggleExpand(ev: MouseEvent) {
    ev.stopPropagation();
    this.toggleExpand.emit();
  }
}
