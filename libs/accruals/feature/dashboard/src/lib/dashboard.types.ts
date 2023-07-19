export interface DashboardAccruals {
  active: number;
  pending: number;
  expired: number;
  deleted: number;
}

export interface DashboardAccount {
  openingBalance: number;
  transfer: number;
  closingBalance: number;
}

export interface DashboardMonth {
  accrualsStarting: number;
  accrualsCompleting: number;
  accrualsFinishing: number;
}

export interface VMDashboard {
  accruals: DashboardAccruals;
  account: DashboardAccount;
  thisMonth: DashboardMonth;
  nextMonth: DashboardMonth;
}
