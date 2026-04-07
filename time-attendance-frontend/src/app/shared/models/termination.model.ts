export interface Termination {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  departmentName?: string;
  branchName?: string;
  terminationType: TerminationType;
  terminationDate: string;
  lastWorkingDate: string;
  reason: string;
  clearanceStatus: ClearanceStatus;
  clearanceItems: ClearanceItem[];
  endOfServiceAmount?: number;
  finalSettlementStatus?: FinalSettlementStatus;
  exitInterviewCompleted: boolean;
  createdByName?: string;
  createdAtUtc: string;
}

export interface CreateTerminationRequest {
  employeeId: number;
  terminationType: TerminationType;
  terminationDate: string;
  lastWorkingDate: string;
  reason: string;
}

export interface ClearanceItem {
  id: number;
  department: string;
  description: string;
  isCompleted: boolean;
  completedByName?: string;
  completedAtUtc?: string;
  notes?: string;
}

export interface EndOfServiceCalculation {
  employeeName: string;
  hireDate: string;
  terminationDate: string;
  yearsOfService: number;
  basicSalary: number;
  totalAmount: number;
  breakdown: EndOfServiceBreakdown[];
}

export interface EndOfServiceBreakdown {
  period: string;
  years: number;
  rate: number;
  amount: number;
}

export interface FinalSettlement {
  id: number;
  terminationId: number;
  employeeName: string;
  endOfServiceAmount: number;
  remainingLeaveAmount: number;
  pendingExpensesAmount: number;
  deductionsAmount: number;
  totalAmount: number;
  status: FinalSettlementStatus;
  approvedByName?: string;
  approvedAtUtc?: string;
  paidAtUtc?: string;
  items: FinalSettlementItem[];
}

export interface FinalSettlementItem {
  description: string;
  amount: number;
  isDeduction: boolean;
}

export interface ExitInterview {
  id: number;
  terminationId: number;
  interviewDate?: string;
  interviewerName?: string;
  overallRating?: number;
  reasonForLeaving?: string;
  feedback?: string;
  wouldRecommend?: boolean;
  suggestions?: string;
  isCompleted: boolean;
}

export interface SaveExitInterviewRequest {
  interviewDate: string;
  interviewerName: string;
  overallRating: number;
  reasonForLeaving: string;
  feedback?: string;
  wouldRecommend: boolean;
  suggestions?: string;
}

export type TerminationType = 'Resignation' | 'Termination' | 'EndOfContract' | 'Retirement' | 'Redundancy' | 'MutualAgreement';
export type ClearanceStatus = 'Pending' | 'InProgress' | 'Completed';
export type FinalSettlementStatus = 'Draft' | 'Calculated' | 'PendingApproval' | 'Approved' | 'Paid' | 'Cancelled';
