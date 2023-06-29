import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';
import {
  addMonths,
  differenceInCalendarMonths,
  parse,
  startOfMonth,
} from 'date-fns';

/**
 *
 * @param accrual
 * @returns message string
 *
 * This function returns a message string that indicates whether or
 * not the accrual completes this month or next month. Note withdrawal
 * for an accrual happens one month after completion.
 */
export const getMessage = (accrual: PresentationAccrual): string => {
  const startOfThisMonth = startOfMonth(new Date());
  const startDate = parse(accrual.startDate, 'yyyyMM', new Date());
  const endDate = addMonths(startDate, accrual.durationInMonths - 1);
  const monthsDiff = differenceInCalendarMonths(startOfThisMonth, endDate);
  if (monthsDiff === 0) {
    return 'Deposits finish this month';
  } else if (monthsDiff === -1) {
    return 'Deposits finish next month';
  } else if (monthsDiff === 1) {
    return 'Withdrawal this month';
  }
  return '';
};
