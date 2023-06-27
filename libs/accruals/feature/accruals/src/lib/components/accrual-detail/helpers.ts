import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';
import * as dayjs from 'dayjs';

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
  let result = '';
  const startDate = dayjs(accrual.startDate, 'YYYYMM').startOf('month');
  const endDate = startDate
    .clone()
    .add(accrual.durationInMonths - 1, 'month')
    .startOf('month');
  startDate.isBefore(dayjs().startOf('month'))
    ? (result = `Saving started ${startDate.format('MMM YYYY')} `)
    : (result = `Saving starts ${startDate.format('MMM YYYY')} `);
  endDate.isBefore(dayjs().startOf('month'))
    ? (result += `and ended ${endDate.format('MMM YYYY')}`)
    : (result += `and ends ${endDate.format('MMM YYYY')}`);
  return result;
};
