import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import { AccrualsListComponent } from '../components/accruals-list/accruals-list.component';
import { AccrualsService } from './accruals.service';

@Component({
  selector: 'tfx-accruals',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    AccrualsListComponent,
  ],
  templateUrl: './accruals.component.html',
  providers: [AccrualsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualsComponent {
  private db = inject(AfAccrualsDataService);
  service = inject(AccrualsService);

  categorisedAccruals$ = this.service.categorisedAccruals$;

  showAddAccrualButton = true;

  setShowAddAccrualButton(flag: boolean) {
    this.showAddAccrualButton = flag;
  }
}
