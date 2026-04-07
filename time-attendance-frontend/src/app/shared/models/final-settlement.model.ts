export interface FinalSettlementSummary {
  id: number;
  terminationId: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  endOfServiceAmount: number;
  remainingLeaveAmount: number;
  otherEarnings: number;
  totalDeductions: number;
  netAmount: number;
  status: string;
  calculatedAtUtc?: string;
  approvedAtUtc?: string;
  paidAtUtc?: string;
}

export interface CalculateFinalSettlementRequest {
  terminationId: number;
  additionalEarnings?: AdditionalItem[];
  additionalDeductions?: AdditionalItem[];
}

export interface AdditionalItem {
  description: string;
  amount: number;
}

export interface ApproveFinalSettlementRequest {
  comments?: string;
}
