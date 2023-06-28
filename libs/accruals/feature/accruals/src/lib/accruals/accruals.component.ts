import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import {
  CategorisedAccruals,
  PresentationAccrual,
} from '@tfx-accruals/accruals/util/accruals-types';
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
  styleUrls: ['./accruals.component.css'],
  providers: [AccrualsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualsComponent {
  private router = inject(Router);
  private db = inject(AfAccrualsDataService);
  private service = inject(AccrualsService);

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

  onCreateAccrual() {
    this.db
      .createAccrual({
        name: 'Test2',
        description: '',
        startValue: 0,
        targetValue: 100,
        startDate: '202306',
        durationInMonths: 10,
        depositSchedule: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        deleted: false,
      })
      .subscribe({
        error: (err: Error) => console.log(err.message),
      });
  }

  setShowAddAccrualButton(flag: boolean) {
    this.showAddAccrualButton = flag;
  }

  onDeleteAccrual(accrual: PresentationAccrual) {
    this.service.deleteAccrual(accrual);
  }

  onRestoreAccrual(accrual: PresentationAccrual) {
    this.service.restoreAccrual(accrual);
  }
}
