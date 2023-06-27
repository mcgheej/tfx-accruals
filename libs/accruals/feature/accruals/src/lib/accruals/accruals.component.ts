import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import { CategorisedAccruals } from '@tfx-accruals/accruals/util/accruals-types';
import * as dayjs from 'dayjs';
import { Observable, map } from 'rxjs';
import { AccrualSummaryComponent } from '../components/accrual-summary/accrual-summary.component';

@Component({
  selector: 'tfx-accruals',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    AccrualSummaryComponent,
  ],
  templateUrl: './accruals.component.html',
  styleUrls: ['./accruals.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualsComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private db = inject(AfAccrualsDataService);

  url$!: Observable<string>;
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

  ngOnInit(): void {
    this.url$ = this.route.url.pipe(
      map((segments) => 'accruals' + segments.join('/'))
    );
  }

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
}
