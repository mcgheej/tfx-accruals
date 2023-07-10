import { Statement } from './statement.interface';

export interface Statements {
  [id: string]: Statement;
}

export interface StatementsState {
  ids: string[];
  statements: Statements;
}
