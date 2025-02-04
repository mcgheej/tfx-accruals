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
import { MatTooltipModule } from '@angular/material/tooltip';
import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';
import { TfxProgressDonutComponent } from '@tfx-accruals/shared/ui/tfx-progress-donut';
import { AccrualsTabTypes } from '../../tab-types.type';
import * as helpers from './helpers';

@Component({
    selector: 'tfx-accrual-detail',
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        TfxProgressDonutComponent,
    ],
    templateUrl: './accrual-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccrualDetailComponent {
  helpers = helpers;

  @Input({ required: true }) accrual!: PresentationAccrual;
  @Input({ required: true }) tabType: AccrualsTabTypes = 'active';
  @Output() editAccrual = new EventEmitter<void>();
  @Output() deleteAccrual = new EventEmitter<void>();
  @Output() restoreAccrual = new EventEmitter<void>();
  @Output() permanentDeleteAccrual = new EventEmitter<void>();

  onEditAccrual(ev: MouseEvent) {
    ev.stopPropagation();
    this.editAccrual.emit();
  }

  onDeleteAccrual(ev: MouseEvent) {
    ev.stopPropagation();
    this.deleteAccrual.emit();
  }

  onRestoreAccrual(ev: MouseEvent) {
    ev.stopPropagation();
    this.restoreAccrual.emit();
  }

  onPermanentDelete(ev: MouseEvent) {
    ev.stopPropagation();
    this.permanentDeleteAccrual.emit();
  }
}
