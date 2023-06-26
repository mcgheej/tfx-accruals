import * as dayjs from 'dayjs';
import { AccrualTotals } from './accrual-totals.interface';
import { Accrual } from './accrual.interface';

/**
 * Presentation Accrual
 * ====================
 * totals:
 * (AccrualTotals)
 *
 * startDateDayjs:
 * (Dayjs)
 *
 */
export interface PresentationAccrual extends Accrual {
  totals: AccrualTotals;
  startDateDayjs: dayjs.Dayjs;
}
