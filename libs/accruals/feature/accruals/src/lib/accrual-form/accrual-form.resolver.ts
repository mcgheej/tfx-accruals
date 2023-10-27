import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import {
  DEFAULT_ACCRUAL_DURATION_IN_MONTHS,
  DEFAULT_TARGET_VALUE,
  MAX_ACCRUAL_DURATION_IN_MONTHS,
  MIN_ACCRUAL_DURATION_IN_MONTHS,
  PresentationAccrual,
} from '@tfx-accruals/accruals/util/accruals-types';
import { add, format, parse, startOfMonth } from 'date-fns';
import { Observable, map, take } from 'rxjs';
import { VMAccrual, VMAccrualDates } from './vm-accrual';

/**
 *
 * @param route
 * @param state
 * @param db
 * @returns
 *
 * This resolver returns an observable that will output a single
 * VMAccrual object.
 *
 * The VMAccrual object will either be an initialised default VMAccrual
 * object (blank id) or a VMAccrual object derived from an existing
 * PresentationAccrual object identified by the id parameter passed in
 * the route.
 */
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
          // Accrual found so return deep copy extended for use in the form
          // view.
          return extendToVMAccrual(accrual);
        }
      }
      // Accrual not found or creating new accrual so return
      // new default vm accrual object
      return initialisedAccrual();
    }),
    take(1)
  );
};

/**
 *
 * @param accrual
 * @returns
 */
const extendToVMAccrual = (accrual: PresentationAccrual): VMAccrual => {
  const {
    firstDepositDate,
    withdrawalDate,
    minWithdrawalDate,
    maxWithdrawalDate,
  } = getVMFields(
    parse(accrual.startDate, 'yyyyMM', new Date()),
    accrual.durationInMonths
  );
  return {
    ...JSON.parse(JSON.stringify(accrual)),
    firstDepositDate,
    withdrawalDate,
    minWithdrawalDate,
    maxWithdrawalDate,
  };
};

/**
 *
 * @returns a VMAccrual object initialised with default values.
 */
const initialisedAccrual = (): VMAccrual => {
  const {
    firstDepositDate,
    withdrawalDate,
    minWithdrawalDate,
    maxWithdrawalDate,
  } = getVMFields(startOfMonth(new Date()), DEFAULT_ACCRUAL_DURATION_IN_MONTHS);
  return {
    id: '',
    name: '',
    description: '',
    targetValue: DEFAULT_TARGET_VALUE,
    startDate: format(firstDepositDate, 'yyyyMM'),
    durationInMonths: DEFAULT_ACCRUAL_DURATION_IN_MONTHS,
    depositSchedule: [],
    deleted: false,
    totals: {
      percentageComplete: 0,
      totalSaved: 0,
    },
    firstDepositDate,
    withdrawalDate,
    minWithdrawalDate,
    maxWithdrawalDate,
  } as VMAccrual;
};

/**
 *
 * @param firstDepositDate
 * @param durationInMonths
 * @returns
 */
const getVMFields = (
  firstDepositDate: Date,
  durationInMonths: number
): VMAccrualDates => {
  const withdrawalDate = add(firstDepositDate, {
    months: durationInMonths,
  });
  const minWithdrawalDate = add(firstDepositDate, {
    months: MIN_ACCRUAL_DURATION_IN_MONTHS,
  });
  const maxWithdrawalDate = add(firstDepositDate, {
    months: MAX_ACCRUAL_DURATION_IN_MONTHS,
  });
  return {
    firstDepositDate,
    withdrawalDate,
    minWithdrawalDate,
    maxWithdrawalDate,
  };
};
