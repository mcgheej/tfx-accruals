import {
  Accrual,
  AccrualTotals,
} from '@tfx-accruals/accruals/util/accruals-types';
import * as dayjs from 'dayjs';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

export const getAccrualTotals = (accrual: Accrual): AccrualTotals => {
  const result = {
    percentageComplete: 0,
    totalSaved: 0,
  } as AccrualTotals;
  dayjs.extend(isSameOrBefore);

  const thisMonth = dayjs().startOf('month');
  let paymentDate = dayjs(accrual.startDate, 'YYYYMM').startOf('month');
  for (let i = 0; i < accrual.depositSchedule.length; i++) {
    if (paymentDate.isSameOrBefore(thisMonth, 'month')) {
      result.totalSaved += accrual.depositSchedule[i];
      paymentDate = paymentDate.add(1, 'month');
    } else {
      break;
    }
  }
  result.percentageComplete = Math.round(
    (result.totalSaved / accrual.targetValue) * 100
  );
  return result;
};
