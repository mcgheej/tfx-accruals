/**
 * Accrual
 * =======
 * id:                uniquely identifies an accrual.
 * (string)
 *
 * name:              name of the accrual, e.g. 'Car Insurance'.
 * (string)
 *
 * description:       fuller description of the accrual, e.g. 'Annually
 * (string)           recurring insurance premium'.
 *
 * targetValue:       target sum that needs to be accrued
 * (number)
 *
 * startDate:         when the accrual starts, expressed as a string in
 * (string)           YYYYMM format.
 *
 * durationInMonths:  how many months the accrual is active, that is where
 * (number)           monthly deposits are accrued.
 *
 * depositSchedule:   an array of the monthly deposits paid and/or to be
 * (number[])         paid for the accrual. The array will contain an element
 *                    for each month the accrual is active.
 *
 * deleted:           flag indicating whether or not the accrual has been
 * (boolean)          placed in the accrual recycle bin ready for permanent
 *                    deletion.
 */
export interface Accrual {
  id: string;
  name: string;
  description: string;
  targetValue: number;
  startDate: string;
  durationInMonths: number;
  depositSchedule: number[];
  deleted: boolean;
}

export const MIN_ACCRUAL_DURATION_IN_MONTHS = 3;
export const MAX_ACCRUAL_DURATION_IN_MONTHS = 60;
export const DEFAULT_ACCRUAL_DURATION_IN_MONTHS = 12;
export const DEFAULT_TARGET_VALUE = 120;
