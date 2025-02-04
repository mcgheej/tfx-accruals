import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';
import { AccrualsTabTypes } from '../../tab-types.type';
import { AccrualDetailComponent } from '../accrual-detail/accrual-detail.component';
import * as helper from './helpers';

@Component({
    selector: 'tfx-accrual-summary',
    imports: [CommonModule, AccrualDetailComponent],
    templateUrl: './accrual-summary.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccrualSummaryComponent {
  @Input({ required: true }) accrual!: PresentationAccrual;
  @Input({ required: true }) expandedAccrualId = '';
  @Input({ required: true }) tabType: AccrualsTabTypes = 'active';
  @Output() toggleExpand = new EventEmitter<void>();
  @Output() editAccrual = new EventEmitter<void>();
  @Output() deleteAccrual = new EventEmitter<void>();
  @Output() restoreAccrual = new EventEmitter<void>();
  @Output() permanentDeleteAccrual = new EventEmitter<void>();

  helper = helper;

  onToggleExpand(ev: MouseEvent) {
    ev.stopPropagation();
    this.toggleExpand.emit();
  }
}
