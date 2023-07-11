import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import {
  Statement,
  VMStatement,
} from '@tfx-accruals/accruals/util/accruals-types';
import { parse } from 'date-fns';
import { Observable, map, take } from 'rxjs';

export const statementsResolver: ResolveFn<Statement | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  db = inject(AfAccrualsDataService)
): Observable<VMStatement | undefined> => {
  return db.statementsState$.pipe(
    map((statementsState) => {
      const id = route.paramMap.get('yyyymm');
      if (id && statementsState.statements[id]) {
        const { ids, statements } = statementsState;
        const now = Date.now();
        return {
          ...statementsState.statements[id],
          statementMonth: parse(id, 'yyyyMM', Date.now()),
          minDate: parse(statements[ids[0]].yearMonth, 'yyyyMM', now),
          maxDate: parse(
            statements[ids[ids.length - 1]].yearMonth,
            'yyyyMM',
            now
          ),
        } as VMStatement;
      }
      return undefined;
    }),
    take(1)
  );
};
