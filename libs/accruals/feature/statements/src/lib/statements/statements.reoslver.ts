import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import { Statement } from '@tfx-accruals/accruals/util/accruals-types';
import { Observable, map, take } from 'rxjs';

export const statementsResolver: ResolveFn<Statement | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  db = inject(AfAccrualsDataService)
): Observable<Statement | undefined> => {
  return db.statementsState$.pipe(
    map((statementsState) => {
      const id = route.paramMap.get('yyyymm');
      if (id && statementsState.statements[id]) {
        return statementsState.statements[id];
      }
      return undefined;
    }),
    take(1)
  );
};
