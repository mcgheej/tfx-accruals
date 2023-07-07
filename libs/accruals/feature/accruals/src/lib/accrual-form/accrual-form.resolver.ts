import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import { format, parse, startOfMonth } from 'date-fns';
import { Observable, map, take } from 'rxjs';
import { VMAccrual } from './accrual-form.component';

export const accrualFormResolver: ResolveFn<VMAccrual> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  db = inject(AfAccrualsDataService)
): Observable<VMAccrual> => {
  return db.presentationAccruals$.pipe(
    map((accruals) => {
      const id = route.paramMap.get('id');
      if (accruals.length > 0 && id) {
        const accrual = accruals.find((a) => a.id === id);
        if (accrual) {
          // Accrual found so return deep copy.
          return {
            ...JSON.parse(JSON.stringify(accrual)),
            firstDepositDate: parse(accrual.startDate, 'yyyyMM', new Date()),
          } as VMAccrual;
        }
      }
      // Accrual not found or creating new accrual so return
      // new default vm accrual object
      const startOfThisMonth = startOfMonth(new Date());
      return {
        id: '',
        name: '',
        description: '',
        startValue: 0,
        targetValue: 120,
        startDate: format(startOfThisMonth, 'yyyyMM'),
        durationInMonths: 12,
        depositSchedule: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        deleted: false,
        totals: {
          percentageComplete: 8,
          totalSaved: 10,
        },
        firstDepositDate: startOfThisMonth,
      } as VMAccrual;
    }),
    take(1)
  );
};
