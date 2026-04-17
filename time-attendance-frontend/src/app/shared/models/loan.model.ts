// ===== Enums =====

export enum LoanApplicationStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  UnderReview = 'UnderReview',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Disbursed = 'Disbursed',
  Repaying = 'Repaying',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum RepaymentStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Overdue = 'Overdue',
  Waived = 'Waived'
}

export enum SalaryAdvanceStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Disbursed = 'Disbursed',
  Deducted = 'Deducted'
}

// ===== Loan Type =====

export interface LoanTypeDto {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  maxAmount: number;
  maxRepaymentMonths: number;
  interestRate: number;
  isActive: boolean;
  applicationCount: number;
  createdAtUtc: string;
}

export interface CreateLoanTypeRequest {
  name: string;
  nameAr?: string;
  description?: string;
  maxAmount: number;
  maxRepaymentMonths: number;
  interestRate: number;
  isActive: boolean;
}

export interface UpdateLoanTypeRequest {
  name: string;
  nameAr?: string;
  description?: string;
  maxAmount: number;
  maxRepaymentMonths: number;
  interestRate: number;
  isActive: boolean;
}

// ===== Loan Policy =====

export interface LoanPolicyDto {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  maxLoanMultiplier: number;
  minServiceMonths: number;
  maxActiveLoanCount: number;
  allowedLoanTypes: number[];
  allowedLoanTypeNames: string[];
  isActive: boolean;
  createdAtUtc: string;
}

export interface CreateLoanPolicyRequest {
  name: string;
  nameAr?: string;
  description?: string;
  maxLoanMultiplier: number;
  minServiceMonths: number;
  maxActiveLoanCount: number;
  allowedLoanTypes: number[];
  isActive: boolean;
}

export interface UpdateLoanPolicyRequest {
  name: string;
  nameAr?: string;
  description?: string;
  maxLoanMultiplier: number;
  minServiceMonths: number;
  maxActiveLoanCount: number;
  allowedLoanTypes: number[];
  isActive: boolean;
}

// ===== Loan Application =====

export interface LoanApplicationDto {
  id: number;
  applicationNumber: string;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  loanTypeId: number;
  loanTypeName: string;
  requestedAmount: number;
  approvedAmount?: number;
  termMonths: number;
  interestRate: number;
  monthlyInstallment: number;
  totalRepayment: number;
  remainingBalance: number;
  purpose?: string;
  status: LoanApplicationStatus;
  submittedAtUtc?: string;
  approvedByName?: string;
  approvedAtUtc?: string;
  disbursedAtUtc?: string;
  rejectionReason?: string;
  repayments: LoanRepaymentDto[];
  createdAtUtc: string;
}

export interface LoanRepaymentDto {
  id: number;
  installmentNumber: number;
  dueDate: string;
  amount: number;
  principalAmount: number;
  interestAmount: number;
  status: RepaymentStatus;
  paidDate?: string;
  paidAmount?: number;
}

export interface CreateLoanApplicationRequest {
  employeeId: number;
  loanTypeId: number;
  loanPolicyId?: number;
  requestedAmount: number;
  repaymentMonths: number;
  interestRate: number;
  purpose?: string;
  purposeAr?: string;
  notes?: string;
}

// ===== Salary Advance =====

export interface SalaryAdvanceDto {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  requestedAmount: number;
  approvedAmount?: number;
  reason?: string;
  // Phase 7 (v14.7): replaced legacy `deductionMonth` (string/YYYYMM) with an explicit date range.
  deductionStartDate?: string;
  deductionEndDate?: string;
  status: SalaryAdvanceStatus;
  approvedByName?: string;
  approvedAtUtc?: string;
  rejectionReason?: string;
  createdAtUtc: string;
}

export interface CreateSalaryAdvanceRequest {
  employeeId: number;
  amount: number;
  currency?: string;
  deductionStartDate?: string;
  deductionEndDate?: string;
  reason?: string;
  reasonAr?: string;
}
