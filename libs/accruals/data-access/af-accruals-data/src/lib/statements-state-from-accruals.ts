/**
 * This file contains the functionality to create a complete
 * set of monthly statements from the set of accruals retrieved
 * from the database. Only accruals not flagged as deleted
 * contribute to the statements.
 */
import {
  PresentationAccrual,
  StatementsState,
} from '@tfx-accruals/accruals/util/accruals-types';
import { add, format, parse } from 'date-fns';

/**
 * This is the only exported function in the file.
 *
 * @param accruals - an array of accruals sorted by start date
 *
 * @returns - a StatementsStates object that contains all the
 * monthly statements generated from the accruals array.
 *
 * For each accrual not flagged as deleted this function adds
 * the accrual to the StatementsStates object.
 */
export function statementsStateFromAccruals(
  accruals: PresentationAccrual[]
): StatementsState {
  let statementsState: StatementsState = {
    ids: [],
    statements: {},
  };
  accruals
    .filter((accrual) => !accrual.deleted)
    .map((accrual) => {
      statementsState = addAccrualToStatements(accrual, statementsState);
    });
  return statementsState;
}

/**
 *
 * @param accrual - the accrual to add to the StatementsState object
 *
 * @param statementsState - the StatementsStates object before the
 * accrual is added
 *
 * @returns - StatementsState object with the accrual data added to
 * the monthly statements
 */
function addAccrualToStatements(
  accrual: PresentationAccrual,
  statementsState: StatementsState
): StatementsState {
  let s = addAccrualDeposits(accrual, statementsState);
  s = addAccrualWithdrawal(accrual, s);
  return addBalances(s);
}

/**
 *
 * @param accrual - accrual being added to the StatementsState object
 *
 * @param statementsState - StatementsState object before accral deposits
 * added to the monthly statements
 *
 * @returns - a new StatementsStates object with the accrual deposits added
 * to the monthly statemets
 */
function addAccrualDeposits(
  accrual: PresentationAccrual,
  statementsState: StatementsState
): StatementsState {
  let statementDate = parse(accrual.startDate, 'yyyyMM', new Date());
  let s = { ...statementsState };
  accrual.depositSchedule.map((deposit) => {
    s = addAccrualDeposit(accrual, deposit, statementDate, s);
    statementDate = add(statementDate, { months: 1 });
  });
  return s;
}

/**
 *
 * @param accrual - the accrual being processed
 * @param deposit - the deposit being made in a particular month
 * @param statementDate - the date of the deposit
 * @param statementsState - the StatementsState object before the
 * deposit has been added
 * @returns - a new StatementsState object with the accrual deposit
 * transaction record added to the relevant monthly statement
 */
function addAccrualDeposit(
  accrual: PresentationAccrual,
  deposit: number,
  statementDate: Date,
  statementsState: StatementsState
): StatementsState {
  const statementId = format(statementDate, 'yyyyMM');
  if (statementsState.statements[statementId]) {
    // add deposit transaction to existing statement
    const deposits = [
      ...statementsState.statements[statementId].deposits,
      { name: accrual.name, amount: deposit },
    ];
    return {
      ...statementsState,
      statements: {
        ...statementsState.statements,
        [statementId]: {
          ...statementsState.statements[statementId],
          deposits,
        },
      },
    };
  } else {
    // add deposit transaction to new statement
    const statements = { ...statementsState.statements };
    statements[statementId] = {
      yearMonth: statementId,
      openingBalance: 0,
      closingBalance: 0,
      withdrawals: [],
      deposits: [{ name: accrual.name, amount: deposit }],
    };
    return {
      ids: [...statementsState.ids, statementId],
      statements,
    };
  }
}

/**
 *
 * @param accrual - the accrual being processed
 * @param statementsState - the StatementsState object before the
 * withdrwal has been added
 * @returns - a new StatementsState object with the accrual's
 * withdrawal transaction record added to the relevant monthly statement
 */
function addAccrualWithdrawal(
  accrual: PresentationAccrual,
  statementsState: StatementsState
): StatementsState {
  // Get id of statement containing withdrawal transaction for this accrual
  const withdrawalDate = add(parse(accrual.startDate, 'yyyyMM', new Date()), {
    months: accrual.durationInMonths,
  });
  const id = format(withdrawalDate, 'yyyyMM');

  if (statementsState.statements[id]) {
    const withdrawals = [
      ...statementsState.statements[id].withdrawals,
      { name: accrual.name, amount: accrual.targetValue },
    ];
    return {
      ...statementsState,
      statements: {
        ...statementsState.statements,
        [id]: {
          ...statementsState.statements[id],
          withdrawals,
        },
      },
    };
  } else {
    const statements = { ...statementsState.statements };
    statements[id] = {
      yearMonth: id,
      openingBalance: 0,
      closingBalance: 0,
      withdrawals: [{ name: accrual.name, amount: accrual.targetValue }],
      deposits: [],
    };
    return {
      ids: [...statementsState.ids, id],
      statements,
    };
  }
}

/**
 *
 * @param statementsState - the StatementsState object before opening and
 * closing balances have been added to each monthly statement
 *
 * @returns - a new StatementsState object with opening and closing
 * balances added to the monthly statements.
 */
function addBalances(statementsState: StatementsState): StatementsState {
  const s = { ...statementsState };
  s.statements = { ...s.statements };
  let openingBalance = 0;
  s.ids.map((id) => {
    const depositsTotal = s.statements[id].deposits.reduce(
      (acc, d) => ({ name: '', amount: acc.amount + d.amount }),
      { name: '', amount: 0 }
    ).amount;
    const withdrawalsTotal = s.statements[id].withdrawals.reduce(
      (acc, w) => ({ name: '', amount: acc.amount + w.amount }),
      { name: '', amount: 0 }
    ).amount;
    const closingBalance = openingBalance + depositsTotal - withdrawalsTotal;
    s.statements[id] = {
      ...s.statements[id],
      openingBalance,
      closingBalance,
    };
    openingBalance = closingBalance;
  });
  return s;
}
