import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';
import {
  addMonths,
  differenceInCalendarMonths,
  format,
  parse,
  startOfMonth,
} from 'date-fns';

export const getDepositsStatement = (accrual: PresentationAccrual): string => {
  const numberOfDeposits = accrual.depositSchedule.length;
  if (
    accrual.depositSchedule[0].toFixed(2) ===
    accrual.depositSchedule[numberOfDeposits - 1].toFixed(2)
  ) {
    return `${numberOfDeposits} deposits of £${accrual.depositSchedule[0].toFixed(
      2
    )}`;
  }
  return `${
    numberOfDeposits - 1
  } deposits of £${accrual.depositSchedule[0].toFixed(
    2
  )} followed by a final deposit of £${accrual.depositSchedule[
    numberOfDeposits - 1
  ].toFixed(2)}`;
};

export const getPeriodStatement = (accrual: PresentationAccrual): string => {
  console.log('hello');
  let result = '';
  const startOfThisMonth = startOfMonth(new Date());
  const startDate = startOfMonth(
    parse(accrual.startDate, 'yyyyMM', new Date())
  );
  const lastDepositDate = addMonths(startDate, accrual.durationInMonths - 1);
  const diff1 = differenceInCalendarMonths(startOfThisMonth, startDate);
  const diff2 = differenceInCalendarMonths(startOfThisMonth, lastDepositDate);
  differenceInCalendarMonths(startOfThisMonth, startDate) >= 0
    ? (result = `Deposits started ${format(startDate, 'MMM yyyy')} `)
    : (result = `Deposits start ${format(startDate, 'MMM yyyy')} `);
  differenceInCalendarMonths(startOfThisMonth, lastDepositDate) > 0
    ? (result += `and ended ${format(lastDepositDate, 'MMM yyyy')}`)
    : (result += `and end ${format(lastDepositDate, 'MMM yyyy')}`);
  return result;
};
