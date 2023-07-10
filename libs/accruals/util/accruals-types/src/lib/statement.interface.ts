import { Transaction } from './transaction.interface';

export interface Statement {
  yearMonth: string;
  openingBalace: number;
  closingBalance: number;
  withdrawals: Transaction[];
  deposits: Transaction[];
}
