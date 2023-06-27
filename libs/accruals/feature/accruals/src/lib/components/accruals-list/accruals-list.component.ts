import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';
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
  styleUrls: ['./accruals-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualsListComponent {
  @Input({ required: true }) accruals!: PresentationAccrual[];
  @Input({ required: true }) showAddAccrualButton = false;

  expandedAccrualId = '';

  addAccrualClick(ev: MouseEvent) {
    ev.stopPropagation();
    console.log('add accrual clicked');
  }

  onToggleExpand(accrual: PresentationAccrual) {
    if (accrual.id === this.expandedAccrualId) {
      this.expandedAccrualId = '';
    } else {
      this.expandedAccrualId = accrual.id;
    }
  }
}
