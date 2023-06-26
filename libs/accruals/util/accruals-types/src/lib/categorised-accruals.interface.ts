import { PresentationAccrual } from './presentation-accrual.interface';

export interface CategorisedAccruals {
  activeAccruals: PresentationAccrual[];
  expiredAccruals: PresentationAccrual[];
  pendingAccruals: PresentationAccrual[];
  deletedAccruals: PresentationAccrual[];
}
