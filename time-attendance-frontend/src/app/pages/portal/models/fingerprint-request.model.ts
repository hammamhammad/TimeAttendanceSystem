/**
 * Fingerprint Request Data Models
 * Matches backend DTOs from Phase 1 implementation
 */

/**
 * Fingerprint request entity
 */
export interface FingerprintRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  requestType: FingerprintRequestType;
  issueDescription: string;
  affectedFingers?: string;
  preferredDate?: Date;
  preferredTime?: string;
  scheduledDate?: Date;
  scheduledTime?: string;
  completedDate?: Date;
  status: FingerprintRequestStatus;
  technicianId?: number;
  technicianName?: string;
  technicianNotes?: string;
  createdAtUtc: Date;
  modifiedAtUtc?: Date;
}

/**
 * Fingerprint request types
 */
export enum FingerprintRequestType {
  NewEnrollment = 'NewEnrollment',
  Update = 'Update',
  Issue = 'Issue',
  AdditionalFingers = 'AdditionalFingers',
  LocationChange = 'LocationChange'
}

/**
 * Fingerprint request status
 */
export enum FingerprintRequestStatus {
  Pending = 'Pending',
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Rejected = 'Rejected'
}

/**
 * Create fingerprint request payload
 */
export interface CreateFingerprintRequestRequest {
  requestType: FingerprintRequestType;
  issueDescription: string;
  affectedFingers?: string;
  preferredDate?: Date;
  preferredTime?: string;
}

/**
 * Update fingerprint request payload
 */
export interface UpdateFingerprintRequestRequest {
  issueDescription: string;
  affectedFingers?: string;
  preferredDate?: Date;
  preferredTime?: string;
}

/**
 * Complete fingerprint request payload (admin only)
 */
export interface CompleteFingerprintRequestRequest {
  technicianNotes?: string;
}

/**
 * Fingerprint request query parameters
 */
export interface FingerprintRequestQueryParams {
  employeeId?: number;
  status?: FingerprintRequestStatus;
  requestType?: FingerprintRequestType;
  startDate?: Date;
  endDate?: Date;
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Paged result for fingerprint requests
 */
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
