/**
 * Allowance Management domain models
 */

export enum AllowanceCategory {
  Allowance = 'Allowance',
  Deduction = 'Deduction',
  Benefit = 'Benefit'
}

export enum AllowanceCalculationType {
  Fixed = 'Fixed',
  PercentageOfBasic = 'PercentageOfBasic',
  PercentageOfGross = 'PercentageOfGross'
}

export enum AllowanceAssignmentStatus {
  Active = 'Active',
  Suspended = 'Suspended',
  Expired = 'Expired',
  Cancelled = 'Cancelled'
}

export enum AllowanceRequestType {
  New = 'New',
  Increase = 'Increase',
  Decrease = 'Decrease',
  Remove = 'Remove',
  Temporary = 'Temporary'
}

export enum AllowanceRequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Applied = 'Applied',
  Withdrawn = 'Withdrawn',
  Cancelled = 'Cancelled'
}

export interface AllowanceType {
  id: number;
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  category: string;
  defaultCalculationType: string;
  defaultAmount?: number;
  defaultPercentage?: number;
  isTaxable: boolean;
  isSocialInsurable: boolean;
  isActive: boolean;
  branchId?: number;
  branchName?: string;
  createdAtUtc?: string;
  createdBy?: string;
  modifiedAtUtc?: string;
  modifiedBy?: string;
}

export interface CreateAllowanceTypeRequest {
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  category: string;
  defaultCalculationType: string;
  defaultAmount?: number;
  defaultPercentage?: number;
  isTaxable: boolean;
  isSocialInsurable: boolean;
  branchId?: number;
}

export interface UpdateAllowanceTypeRequest extends CreateAllowanceTypeRequest {
  id: number;
  isActive: boolean;
}

export interface AllowancePolicy {
  id: number;
  allowanceTypeId: number;
  allowanceTypeName: string;
  name: string;
  nameAr?: string;
  description?: string;
  branchId?: number;
  branchName?: string;
  eligibilityRules?: string;
  requiresApproval: boolean;
  minAmount?: number;
  maxAmount?: number;
  maxPercentageOfBasic?: number;
  isTemporaryAllowed: boolean;
  maxDurationMonths?: number;
  effectiveDate: string;
  isActive: boolean;
  createdAtUtc?: string;
  createdBy?: string;
  modifiedAtUtc?: string;
  modifiedBy?: string;
}

export interface CreateAllowancePolicyRequest {
  allowanceTypeId: number;
  name: string;
  nameAr?: string;
  description?: string;
  branchId?: number;
  eligibilityRules?: string;
  requiresApproval: boolean;
  minAmount?: number;
  maxAmount?: number;
  maxPercentageOfBasic?: number;
  isTemporaryAllowed: boolean;
  maxDurationMonths?: number;
  effectiveDate: string;
}

export interface UpdateAllowancePolicyRequest extends CreateAllowancePolicyRequest {
  id: number;
  isActive: boolean;
}

export interface AllowanceAssignment {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber?: string;
  allowanceTypeId: number;
  allowanceTypeName: string;
  amount: number;
  calculationType: string;
  percentage?: number;
  currency: string;
  effectiveFromDate: string;
  effectiveToDate?: string;
  status: string;
  assignedByUserId?: number;
  reason?: string;
  allowanceRequestId?: number;
  notes?: string;
  createdAtUtc?: string;
  createdBy?: string;
  modifiedAtUtc?: string;
  modifiedBy?: string;
}

export interface CreateAllowanceAssignmentRequest {
  employeeId: number;
  allowanceTypeId: number;
  amount: number;
  calculationType: string;
  percentage?: number;
  currency: string;
  effectiveFromDate: string;
  effectiveToDate?: string;
  reason?: string;
  notes?: string;
}

export interface AllowanceRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber?: string;
  allowanceTypeId: number;
  allowanceTypeName: string;
  allowancePolicyId?: number;
  requestType: string;
  requestedAmount?: number;
  requestedPercentage?: number;
  effectiveFromDate: string;
  effectiveToDate?: string;
  reason?: string;
  justification?: string;
  supportingDocumentUrl?: string;
  status: string;
  rejectionReason?: string;
  approvedByUserId?: number;
  approvedAt?: string;
  createdAtUtc?: string;
  createdBy?: string;
  modifiedAtUtc?: string;
  modifiedBy?: string;
}
