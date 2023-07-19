import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import {
  PresentationAccrual,
  StatementsState,
} from '@tfx-accruals/accruals/util/accruals-types';
import {
  addMonths,
  differenceInCalendarMonths,
  format,
  parse,
  startOfMonth,
} from 'date-fns';
import { Observable, combineLatest, map, take } from 'rxjs';
import {
  DashboardAccount,
  DashboardAccruals,
  DashboardMonth,
  VMDashboard,
} from '../dashboard.types';

interface AccrualsDataResult {
  accrualsData: DashboardAccruals;
  thisMonthData: DashboardMonth;
  nextMonthData: DashboardMonth;
}

function processAccrual(
  startMonth: Date,
  finishMonth: Date,
  d: AccrualsDataResult,
  thisMonth: Date
): AccrualsDataResult {
  const monthsToStart = differenceInCalendarMonths(startMonth, thisMonth);
  const monthsToFinish = differenceInCalendarMonths(finishMonth, thisMonth);
  const r = {
    ...d,
    thisMonthData: { ...d.thisMonthData },
    nextMonthData: { ...d.nextMonthData },
  } as AccrualsDataResult;
  switch (monthsToStart) {
    case 0: {
      r.thisMonthData.accrualsStarting++;
      break;
    }
    case 1: {
      r.nextMonthData.accrualsStarting++;
      break;
    }
  }
  switch (monthsToFinish) {
    case 0: {
      r.thisMonthData.accrualsFinishing++;
      break;
    }
    case 1: {
      r.thisMonthData.accrualsCompleting++;
      r.nextMonthData.accrualsFinishing++;
      break;
    }
    case 2: {
      r.nextMonthData.accrualsCompleting++;
      break;
    }
  }
  return r;
}

function accrualsDashboardData(
  accruals: PresentationAccrual[]
): AccrualsDataResult {
  let result: AccrualsDataResult = {
    accrualsData: {
      active: 0,
      pending: 0,
      expired: 0,
      deleted: 0,
    },
    thisMonthData: {
      accrualsStarting: 0,
      accrualsCompleting: 0,
      accrualsFinishing: 0,
    },
    nextMonthData: {
      accrualsStarting: 0,
      accrualsCompleting: 0,
      accrualsFinishing: 0,
    },
  };
  accruals.map((a) => {
    const thisMonth = startOfMonth(Date.now());
    if (a.deleted) {
      result.accrualsData.deleted++;
    } else {
      const startMonth = parse(a.startDate, 'yyyyMM', thisMonth);
      const finishMonth = addMonths(startMonth, a.durationInMonths);
      if (differenceInCalendarMonths(thisMonth, finishMonth) > 0) {
        result.accrualsData.expired++;
      } else {
        if (differenceInCalendarMonths(startMonth, thisMonth) > 0) {
          result.accrualsData.pending++;
        } else {
          result.accrualsData.active++;
        }
      }
      result = processAccrual(startMonth, finishMonth, result, thisMonth);
    }
  });
  return result;
}

function accountDashboardData(
  id: string,
  statementsState: StatementsState
): DashboardAccount {
  if (id && statementsState.statements[id]) {
    const s = statementsState.statements[id];
    return {
      openingBalance: s.openingBalance,
      transfer: s.closingBalance - s.openingBalance,
      closingBalance: s.closingBalance,
    };
  }
  return {
    openingBalance: 0,
    transfer: 0,
    closingBalance: 0,
  };
}

export const dashboardResolver: ResolveFn<VMDashboard> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  db = inject(AfAccrualsDataService)
): Observable<VMDashboard> => {
  return combineLatest([db.presentationAccruals$, db.statementsState$]).pipe(
    map(([accruals, statementsState]) => {
      const statementId = format(Date.now(), 'yyyyMM');
      const { accrualsData, thisMonthData, nextMonthData } =
        accrualsDashboardData(accruals);
      return {
        accruals: accrualsData,
        account: accountDashboardData(statementId, statementsState),
        thisMonth: thisMonthData,
        nextMonth: nextMonthData,
      } as VMDashboard;
    }),
    take(1)
  );
};
