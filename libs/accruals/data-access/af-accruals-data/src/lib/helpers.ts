import {
  Accrual,
  AccrualTotals,
} from '@tfx-accruals/accruals/util/accruals-types';
import {
  addMonths,
  differenceInCalendarMonths,
  parse,
  startOfMonth,
} from 'date-fns';

// export const getAccrualTotals = (accrual: Accrual): AccrualTotals => {
//   const result = {
//     percentageComplete: 0,
//     totalSaved: 0,
//   } as AccrualTotals;
//   dayjs.extend(isSameOrBefore);

//   const thisMonth = dayjs().startOf('month');
//   let paymentDate = dayjs(accrual.startDate, 'YYYYMM').startOf('month');
//   for (let i = 0; i < accrual.depositSchedule.length; i++) {
//     if (paymentDate.isSameOrBefore(thisMonth, 'month')) {
//       result.totalSaved += accrual.depositSchedule[i];
//       paymentDate = paymentDate.add(1, 'month');
//     } else {
//       break;
//     }
//   }
//   result.percentageComplete = Math.round(
//     (result.totalSaved / accrual.targetValue) * 100
//   );
//   return result;
// };

export const getAccrualTotals = (accrual: Accrual): AccrualTotals => {
  const result = {
    percentageComplete: 0,
    totalSaved: 0,
  } as AccrualTotals;

  const thisMonth = startOfMonth(new Date());
  let paymentDate = startOfMonth(
    parse(accrual.startDate, 'yyyyMM', new Date())
  );
  for (let i = 0; i < accrual.depositSchedule.length; i++) {
    if (differenceInCalendarMonths(paymentDate, thisMonth) <= 0) {
      result.totalSaved += accrual.depositSchedule[i];
      paymentDate = addMonths(paymentDate, 1);
    } else {
      break;
    }
  }
  result.percentageComplete = Math.round(
    (result.totalSaved / accrual.targetValue) * 100
  );
  return result;
};

/**
 *
 * @param accrual - Accrual to validate
 * @returns - if accrual invalid then returns string error message, else
 *            returns an empty string
 */
export const validateAccrual = (accrual: Accrual): string => {
  if (accrual.depositSchedule.length !== accrual.durationInMonths) {
    return 'Number of deposits must match accrual duration';
  }
  return '';
};
