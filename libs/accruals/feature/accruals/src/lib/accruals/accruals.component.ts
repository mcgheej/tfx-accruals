import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import { CategorisedAccruals } from '@tfx-accruals/accruals/util/accruals-types';
import * as dayjs from 'dayjs';
import { map } from 'rxjs';
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

  categorisedAccruals$ = this.db.presentationAccruals$.pipe(
    map((accruals) => {
      const result: CategorisedAccruals = {
        activeAccruals: [],
        expiredAccruals: [],
        pendingAccruals: [],
        deletedAccruals: [],
      };
      accruals.map((accrual) => {
        const endDate = accrual.startDateDayjs
          .clone()
          .add(accrual.durationInMonths, 'month');
        if (accrual.deleted) {
          result.deletedAccruals.push(accrual);
        } else if (
          endDate.isSameOrBefore(dayjs().startOf('month').add(1, 'day'))
        ) {
          result.expiredAccruals.push(accrual);
        } else if (
          accrual.startDateDayjs.isAfter(dayjs().startOf('month').add(1, 'day'))
        ) {
          result.pendingAccruals.push(accrual);
        } else {
          result.activeAccruals.push(accrual);
        }
      });
      return result;
    })
  );

  showAddAccrualButton = true;

  setShowAddAccrualButton(flag: boolean) {
    this.showAddAccrualButton = flag;
  }
}
