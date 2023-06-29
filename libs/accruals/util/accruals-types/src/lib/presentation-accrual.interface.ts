import { AccrualTotals } from './accrual-totals.interface';
import { Accrual } from './accrual.interface';

/**
 * Presentation Accrual
 * ====================
 * totals:
 * (AccrualTotals)
 *
 */
export interface PresentationAccrual extends Accrual {
  totals: AccrualTotals;
}
