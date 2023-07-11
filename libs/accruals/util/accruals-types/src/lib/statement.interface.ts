import { Transaction } from './transaction.interface';

export interface Statement {
  yearMonth: string;
  openingBalace: number;
  closingBalance: number;
  withdrawals: Transaction[];
  deposits: Transaction[];
}

export interface VMStatement extends Statement {
  statementMonth: Date;
  minDate: Date;
  maxDate: Date;
}
