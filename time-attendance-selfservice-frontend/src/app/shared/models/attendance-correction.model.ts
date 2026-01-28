import { PagedResult } from './employee.model';

/**
 * DTO representing a single approval step in workflow history.
 */
export interface CorrectionApprovalStepDto {
  stepOrder: number;
  stepName: string;
  status: string;
  assignedToName: string;
  actionByName?: string;
  assignedAt: string;
  actionAt?: string;
  comments?: string;
}

/**
 * DTO representing an attendance correction request.
 */
export interface AttendanceCorrectionRequestDto {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  departmentName: string;
  branchName: string;
  correctionDate: string;
  correctionTime: string;
  correctionType: AttendanceCorrectionType;
  correctionTypeDisplay: string;
  reason: string;
  approvalStatus: ApprovalStatus;
  approvalStatusDisplay: string;
  approvedById?: number;
  approvedByName?: string;
  approvedAt?: string;
  rejectionReason?: string;
  attachmentPath?: string;
  processingNotes?: string;
  createdAtUtc: string;
  createdBy: string;
  modifiedAtUtc?: string;
  modifiedBy?: string;
  canBeModified: boolean;
  correctionSummary: string;

  // Created transaction info (after approval)
  createdTransactionId?: number;

  // Workflow information
  workflowInstanceId?: number;
  workflowStatus?: string;
  currentApproverName?: string;
  currentApproverRole?: string;
  currentStepOrder?: number;
  totalSteps?: number;
  approvalHistory?: CorrectionApprovalStepDto[];
}

/**
 * Attendance correction type enum matching backend AttendanceCorrectionType
 */
export enum AttendanceCorrectionType {
  CheckIn = 1,
  CheckOut = 2
}

/**
 * Approval status enum matching backend ApprovalStatus
 */
export enum ApprovalStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled'
}

/**
 * Request model for creating a new attendance correction request.
 */
export interface CreateAttendanceCorrectionRequest {
  employeeId: number;
  correctionDate: string;
  correctionTime: string;
  correctionType: AttendanceCorrectionType;
  reason: string;
  attachmentFile?: File;
}

/**
 * Request model for updating an existing attendance correction request.
 */
export interface UpdateAttendanceCorrectionRequest {
  correctionDate: string;
  correctionTime: string;
  correctionType: AttendanceCorrectionType;
  reason: string;
  attachmentFile?: File;
}

/**
 * Request model for approving/rejecting an attendance correction request.
 */
export interface ApproveAttendanceCorrectionRequest {
  decision: 'Approved' | 'Rejected';
  rejectionReason?: string;
  processingNotes?: string;
}

/**
 * Query parameters for listing attendance correction requests.
 */
export interface AttendanceCorrectionRequestsQueryParams {
  page?: number;
  pageSize?: number;
  employeeId?: number;
  departmentId?: number;
  branchId?: number;
  status?: ApprovalStatus;
  correctionType?: AttendanceCorrectionType;
  fromDate?: string;
  toDate?: string;
  searchTerm?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

/**
 * Filter model for attendance correction requests.
 */
export interface AttendanceCorrectionRequestFilter {
  employeeId?: number;
  departmentId?: number;
  branchId?: number;
  status?: ApprovalStatus;
  correctionType?: AttendanceCorrectionType;
  fromDate?: string;
  toDate?: string;
  searchTerm?: string;
}

/**
 * Statistics for attendance correction requests.
 */
export interface AttendanceCorrectionStatistics {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  currentMonthRequests: number;
}

/**
 * Paged result type for attendance correction requests.
 */
export type AttendanceCorrectionRequestsPagedResult = PagedResult<AttendanceCorrectionRequestDto>;

/**
 * Helper function to get display text for correction type.
 */
export function getCorrectionTypeDisplay(type: AttendanceCorrectionType): string {
  switch (type) {
    case AttendanceCorrectionType.CheckIn:
      return 'Check In';
    case AttendanceCorrectionType.CheckOut:
      return 'Check Out';
    default:
      return 'Unknown';
  }
}

/**
 * Helper function to get display text for approval status.
 */
export function getApprovalStatusDisplay(status: ApprovalStatus): string {
  switch (status) {
    case ApprovalStatus.Pending:
      return 'Pending';
    case ApprovalStatus.Approved:
      return 'Approved';
    case ApprovalStatus.Rejected:
      return 'Rejected';
    case ApprovalStatus.Cancelled:
      return 'Cancelled';
    default:
      return 'Unknown';
  }
}

/**
 * Helper function to get CSS class for approval status badge.
 */
export function getApprovalStatusVariant(status: ApprovalStatus): string {
  switch (status) {
    case ApprovalStatus.Pending:
      return 'warning';
    case ApprovalStatus.Approved:
      return 'success';
    case ApprovalStatus.Rejected:
      return 'danger';
    case ApprovalStatus.Cancelled:
      return 'secondary';
    default:
      return 'secondary';
  }
}

/**
 * Helper function to get CSS class for correction type badge.
 */
export function getCorrectionTypeVariant(type: AttendanceCorrectionType): string {
  switch (type) {
    case AttendanceCorrectionType.CheckIn:
      return 'info';
    case AttendanceCorrectionType.CheckOut:
      return 'primary';
    default:
      return 'secondary';
  }
}
