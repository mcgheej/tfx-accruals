import { format } from 'date-fns';

export function displayStatementMonth(
  statementMonth: Date,
  monthFormat: 'MMM' | 'MMMM' = 'MMMM'
): string {
  return format(statementMonth, `${monthFormat} yyyy`);
}
