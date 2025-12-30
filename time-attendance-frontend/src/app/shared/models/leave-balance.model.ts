/**
 * Leave Balance and Accrual Management Models
 * TypeScript interfaces matching backend DTOs and request models
 */

/**
 * Transaction type enumeration matching backend LeaveTransactionType enum
 */
export enum LeaveTransactionType {
  Accrual = 0,
  Usage = 1,
  Adjustment = 2,
  CarryOver = 3,
  Reset = 4,
  Reservation = 5,
  ReservationRelease = 6
}

/**
 * Leave balance details for a specific employee, vacation type, and year
 * Matches backend LeaveBalanceDto
 */
export interface LeaveBalance {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeCode: string;
  vacationTypeId: number;
  vacationTypeName: string;
  year: number;
  entitledDays: number;
  accruedDays: number;
  usedDays: number;
  pendingDays: number;
  adjustedDays: number;
  currentBalance: number;
  carryOverDays: number;
  maxCarryOverDays: number | null;
  expiresAtYearEnd: boolean;
  effectiveStartDate: string | null;
  effectiveEndDate: string | null;
  lastAccrualDate: string | null;
  notes: string | null;
}

/**
 * Balance summary for a single vacation type
 * Matches backend VacationTypeBalanceDto
 */
export interface VacationTypeBalance {
  vacationTypeId: number;
  vacationTypeName: string;
  entitledDays: number;
  accruedDays: number;
  usedDays: number;
  pendingDays: number;
  adjustedDays: number;
  currentBalance: number;
  carryOverDays: number;
  expiresAtYearEnd: boolean;
  lastAccrualDate: string | null;
}

/**
 * Complete balance summary for an employee across all vacation types
 * Matches backend LeaveBalanceSummaryDto
 */
export interface LeaveBalanceSummary {
  employeeId: number;
  employeeName: string;
  employeeCode: string;
  year: number;
  vacationTypeBalances: VacationTypeBalance[];
  totalEntitled: number;
  totalAccrued: number;
  totalUsed: number;
  totalPending: number;
  totalAvailable: number;
}

/**
 * Leave transaction history record
 * Matches backend LeaveTransactionDto
 */
export interface LeaveTransaction {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeCode: string;
  vacationTypeId: number;
  vacationTypeName: string;
  year: number;
  transactionType: LeaveTransactionType;
  transactionTypeName: string;
  days: number;
  transactionDate: string;
  referenceId: number | null;
  referenceType: string | null;
  performedBy: string | null;
  reason: string | null;
  balanceBeforeTransaction: number;
  balanceAfterTransaction: number;
}

/**
 * Leave entitlement configuration
 * Matches backend LeaveEntitlement entity
 */
export interface LeaveEntitlement {
  id: number;
  employeeId: number;
  employeeName?: string;
  employeeCode?: string;
  vacationTypeId: number;
  vacationTypeName?: string;
  year: number;
  annualDays: number;
  carryOverDays: number;
  maxCarryOverDays: number | null;
  expiresAtYearEnd: boolean;
  effectiveStartDate: string | null;
  effectiveEndDate: string | null;
  notes: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Request model for setting/updating leave entitlement
 * Matches backend SetLeaveEntitlementRequest
 */
export interface SetLeaveEntitlementRequest {
  employeeId: number;
  vacationTypeId: number;
  year: number;
  annualDays: number;
  carryOverDays?: number;
  maxCarryOverDays?: number | null;
  expiresAtYearEnd?: boolean;
  effectiveStartDate?: string | null;
  effectiveEndDate?: string | null;
  notes?: string | null;
}

/**
 * Request model for processing monthly accrual
 * Matches backend ProcessMonthlyAccrualRequest
 */
export interface ProcessMonthlyAccrualRequest {
  year: number;
  month: number;
  employeeId?: number | null;
}

/**
 * Request model for manual balance adjustment
 * Matches backend AdjustLeaveBalanceRequest
 */
export interface AdjustLeaveBalanceRequest {
  employeeId: number;
  vacationTypeId: number;
  year: number;
  adjustmentDays: number;
  reason: string;
}

/**
 * Query parameters for leave transaction history
 */
export interface LeaveTransactionHistoryParams {
  employeeId: number;
  vacationTypeId?: number | null;
  year?: number | null;
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Bulk entitlement upload item
 */
export interface BulkEntitlementItem {
  employeeCode: string;
  vacationTypeCode: string;
  year: number;
  annualDays: number;
  carryOverDays?: number;
  notes?: string;
  rowNumber?: number;
  errors?: string[];
}

/**
 * Bulk upload result
 */
export interface BulkEntitlementUploadResult {
  totalRows: number;
  successCount: number;
  errorCount: number;
  errors: BulkEntitlementError[];
}

/**
 * Bulk upload error detail
 */
export interface BulkEntitlementError {
  rowNumber: number;
  employeeCode: string;
  vacationTypeCode: string;
  error: string;
}

/**
 * Paginated result wrapper
 * Matches backend PagedResult<T> structure
 */
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
