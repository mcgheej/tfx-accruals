import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';

export interface VMAccrual extends PresentationAccrual {
  firstDepositDate: Date;
  withdrawalDate: Date;
  minWithdrawalDate: Date;
  maxWithdrawalDate: Date;
}

export interface VMAccrualDates {
  firstDepositDate: Date;
  withdrawalDate: Date;
  minWithdrawalDate: Date;
  maxWithdrawalDate: Date;
}
