/**
 * Salary adjustment model for frontend consumption.
 * Matches the backend SalaryAdjustmentDto structure.
 */
export interface SalaryAdjustment {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  adjustmentType: AdjustmentType;
  currentSalary: number;
  newSalary: number;
  adjustmentAmount: number;
  percentageChange: number;
  currency: string;
  effectiveDate: string;
  status: AdjustmentStatus;
  reason?: string;
  notes?: string;
  initiatedByUserId?: number;
  initiatedByName?: string;
  approvedByUserId?: number;
  approvedByName?: string;
  approvedAt?: string;
  branchName?: string;
  departmentName?: string;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export enum AdjustmentType {
  AnnualIncrement = 'AnnualIncrement',
  PromotionIncrease = 'PromotionIncrease',
  MarketAdjustment = 'MarketAdjustment',
  PerformanceBonus = 'PerformanceBonus',
  CostOfLivingAdjustment = 'CostOfLivingAdjustment',
  ContractRenewal = 'ContractRenewal',
  TransferAdjustment = 'TransferAdjustment',
  Correction = 'Correction',
  Demotion = 'Demotion',
  AllowanceChange = 'AllowanceChange',
  Other = 'Other'
}

export enum AdjustmentStatus {
  Draft = 'Draft',
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Applied = 'Applied',
  Cancelled = 'Cancelled'
}

export interface CreateSalaryAdjustmentRequest {
  employeeId: number;
  adjustmentType: AdjustmentType;
  newBaseSalary: number;
  effectiveDate: string;
  reason?: string;
  reasonAr?: string;
  justification?: string;
  documentUrl?: string;
}

export interface UpdateSalaryAdjustmentRequest {
  adjustmentType: AdjustmentType;
  newSalary: number;
  effectiveDate: string;
  reason?: string;
  notes?: string;
}

export interface SalaryAdjustmentQueryParams {
  page?: number;
  pageSize?: number;
  employeeId?: number;
  branchId?: number;
  departmentId?: number;
  status?: AdjustmentStatus;
  adjustmentType?: AdjustmentType;
  searchTerm?: string;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface SalaryAdjustmentPagedResult {
  items: SalaryAdjustment[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
