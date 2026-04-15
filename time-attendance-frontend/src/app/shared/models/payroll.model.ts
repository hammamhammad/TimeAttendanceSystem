export interface PayrollPeriod {
  id: number;
  name: string;
  branchId: number;
  branchName: string;
  periodType: PayrollPeriodType;
  startDate: string;
  endDate: string;
  status: PayrollStatus;
  totalGrossSalary: number;
  totalNetSalary: number;
  totalDeductions: number;
  totalAllowances: number;
  employeeCount: number;
  processedByName?: string;
  processedAtUtc?: string;
  approvedByName?: string;
  approvedAtUtc?: string;
  paidAtUtc?: string;
  createdAtUtc: string;
  /** Set when the period transitions to Paid — once set, the period and its records are immutable. */
  lockedAtUtc?: string;
  lockedByUserId?: number;
}

export interface CreatePayrollPeriodRequest {
  branchId: number;
  name: string;
  periodType: PayrollPeriodType;
  startDate: string;
  endDate: string;
}

export interface PayrollRecord {
  id: number;
  payrollPeriodId: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  departmentName?: string;
  basicSalary: number;
  grossSalary: number;
  totalDeductions: number;
  totalAllowances: number;
  netSalary: number;
  workingDays: number;
  presentDays: number;
  absentDays: number;
  overtimeHours: number;
  overtimeAmount: number;
  status: string;
  details: PayrollRecordDetail[];
  /** When present, the record is locked and cannot be modified. */
  lockedAtUtc?: string;
  calculationVersion?: number;
}

export interface PayrollRecordDetail {
  id: number;
  componentName: string;
  componentType: string;
  amount: number;
  isDeduction: boolean;
}

export interface PayrollSummary {
  totalEmployees: number;
  totalGrossSalary: number;
  totalNetSalary: number;
  totalDeductions: number;
  totalAllowances: number;
  totalOvertimeAmount: number;
}

export type PayrollPeriodType = 'Monthly' | 'BiWeekly';
export type PayrollStatus = 'Draft' | 'Processing' | 'Processed' | 'PendingApproval' | 'Approved' | 'Paid' | 'Cancelled';
