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
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TfxProgressDonutComponent,
  ],
  templateUrl: './accrual-detail.component.html',
  styleUrls: ['./accrual-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualDetailComponent {
  helpers = helpers;

  @Input({ required: true }) accrual!: PresentationAccrual;
  @Input({ required: true }) tabType: AccrualsTabTypes = 'active';
  @Output() deleteAccrual = new EventEmitter<void>();

  onDeleteAccrualClick(ev: MouseEvent) {
    ev.stopPropagation();
    this.deleteAccrual.emit();
  }
}
