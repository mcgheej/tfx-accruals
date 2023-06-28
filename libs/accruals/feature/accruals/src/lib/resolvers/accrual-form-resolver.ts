import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';
import { Observable, map, take } from 'rxjs';

export const accrualFormResolver: ResolveFn<PresentationAccrual | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  db = inject(AfAccrualsDataService)
): Observable<PresentationAccrual | undefined> => {
  return db.presentationAccruals$.pipe(
    map((accruals) => {
      const id = route.paramMap.get('id');
      if (accruals.length > 0 && id) {
        return accruals.find((a) => a.id === id);
      }
      return undefined;
    }),
    take(1)
  );
};
