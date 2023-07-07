import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentReference,
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  Accrual,
  PresentationAccrual,
} from '@tfx-accruals/accruals/util/accruals-types';
import { AfAuthenticationService } from '@tfx-accruals/shared/util/af-authentication';
import { addDoc, orderBy, query } from 'firebase/firestore';
import { Observable, catchError, from, map, of, throwError } from 'rxjs';
import { getAccrualTotals, validateAccrual } from './helpers';

@Injectable({ providedIn: 'root' })
export class AfAccrualsDataService {
  private firestore = inject(Firestore);
  private afAuth = inject(AfAuthenticationService);

  private accrualsCollection: CollectionReference;

  presentationAccruals$: Observable<PresentationAccrual[]>;

  constructor() {
    this.accrualsCollection = collection(this.firestore, 'accruals');
    const q = query(this.accrualsCollection, ...[orderBy('startDate')]);
    this.presentationAccruals$ = (
      collectionData(q, {
        idField: 'id',
      }) as Observable<Accrual[]>
    ).pipe(
      catchError(() => of([] as PresentationAccrual[])),
      map((accruals) => {
        return accruals.map(
          (accrual) =>
            ({
              ...accrual,
              totals: getAccrualTotals(accrual),
            } as PresentationAccrual)
        );
      })
    );
  }

  createAccrual(
    newAccrual: Omit<Accrual, 'id'>
  ): Observable<DocumentReference> {
    const errMessage = validateAccrual({
      ...newAccrual,
      ...{ id: 'dummy' },
    });
    if (errMessage !== '') {
      return throwError(() => new Error(errMessage));
    }
    return from(addDoc(this.accrualsCollection, newAccrual));
  }

  updateAccrual(id: string, updateData: Omit<Accrual, 'id'>): Observable<void> {
    const modifiedAccrual = { ...{ id }, ...updateData };
    const errMessage = validateAccrual(modifiedAccrual);
    if (errMessage !== '') {
      return throwError(() => new Error(errMessage));
    }
    const docRef = doc(this.firestore, `accruals/${id}`);
    return from(updateDoc(docRef, updateData));
  }

  deleteAccrual(accrual: Accrual): Observable<void> {
    return this.setAccrualDeletedFlag(accrual.id, true);
  }

  recoverAccrual(accrual: Accrual): Observable<void> {
    return this.setAccrualDeletedFlag(accrual.id, false);
  }

  permanentlyDeleteAccrual(accrual: Accrual): Observable<void> {
    if (accrual.deleted) {
      const docRef = doc(this.firestore, `accruals/${accrual.id}`);
      return from(deleteDoc(docRef));
    }
    return throwError(
      () =>
        new Error('Can only permanently delete accrual when flagged as deleted')
    );
  }

  private setAccrualDeletedFlag(
    id: string,
    deletedFlag: boolean
  ): Observable<void> {
    const docRef = doc(this.firestore, `accruals/${id}`);
    return from(updateDoc(docRef, { deleted: deletedFlag }));
  }
}
