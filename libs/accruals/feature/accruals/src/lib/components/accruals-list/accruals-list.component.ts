import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';
import { AccrualsTabTypes } from '../../tab-types.type';
import { AccrualSummaryComponent } from '../accrual-summary/accrual-summary.component';

@Component({
  selector: 'tfx-accruals-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    AccrualSummaryComponent,
  ],
  templateUrl: './accruals-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualsListComponent {
  @Input({ required: true }) accruals!: PresentationAccrual[];
  @Input({ required: true }) showAddAccrualButton = false;
  @Input({ required: true }) tabType: AccrualsTabTypes = 'active';
  @Output() addAccrual = new EventEmitter<void>();
  @Output() editAccrual = new EventEmitter<PresentationAccrual>();
  @Output() deleteAccrual = new EventEmitter<PresentationAccrual>();
  @Output() restoreAccrual = new EventEmitter<PresentationAccrual>();
  @Output() permanentDeleteAccrual = new EventEmitter<PresentationAccrual>();

  expandedAccrualId = '';

  addAccrualClick(ev: MouseEvent) {
    ev.stopPropagation();
    this.addAccrual.emit();
  }

  onEditAccrual(accrual: PresentationAccrual) {
    this.expandedAccrualId = '';
    this.editAccrual.emit(accrual);
  }

  onDeleteAccrual(accrual: PresentationAccrual) {
    this.expandedAccrualId = '';
    this.deleteAccrual.emit(accrual);
  }

  onRestoreAccrual(accrual: PresentationAccrual) {
    this.expandedAccrualId = '';
    this.restoreAccrual.emit(accrual);
  }

  onPermanentDeleteAccrual(accrual: PresentationAccrual) {
    this.expandedAccrualId = '';
    this.permanentDeleteAccrual.emit(accrual);
  }

  onToggleExpand(accrual: PresentationAccrual) {
    if (accrual.id === this.expandedAccrualId) {
      this.expandedAccrualId = '';
    } else {
      this.expandedAccrualId = accrual.id;
    }
  }
}
