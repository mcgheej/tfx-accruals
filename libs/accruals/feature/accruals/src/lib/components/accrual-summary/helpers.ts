import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';
import * as dayjs from 'dayjs';

export const getMessage = (accrual: PresentationAccrual): string => {
  let message = 'No message'; // TODO - set this back to empty string
  if (
    accrual.startDateDayjs
      .add(accrual.durationInMonths - 1, 'month')
      .isSame(dayjs(), 'month')
  ) {
    message = 'Completes this month';
  } else if (
    accrual.startDateDayjs
      .add(accrual.durationInMonths - 2, 'month')
      .isSame(dayjs(), 'month')
  ) {
    message = 'Completes next month';
  }
  return message;
};
