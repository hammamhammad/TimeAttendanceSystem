import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  WorkflowEntityType,
  ApprovalAction,
  PendingApproval,
  ApprovalHistoryItem,
  ApprovalDelegation,
  ApprovalActionRequest,
  DelegateApprovalRequest,
  CreateDelegationRequest,
  PagedWorkflowResponse
} from '../../shared/models/workflow.model';

/**
 * API response wrapper (matches backend Result<T> structure)
 */
interface ApiResponse<T> {
  value: T;
  isSuccess: boolean;
  isFailure: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApprovalsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/approvals`;

  /**
   * Get pending approvals for current user
   */
  getPendingApprovals(
    page: number = 1,
    pageSize: number = 10,
    entityType?: WorkflowEntityType | null,
    isOverdue?: boolean | null
  ): Observable<PagedWorkflowResponse<PendingApproval>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (entityType !== null && entityType !== undefined) {
      params = params.set('entityType', entityType);
    }

    if (isOverdue !== null && isOverdue !== undefined) {
      params = params.set('isOverdue', isOverdue.toString());
    }

    return this.http.get<ApiResponse<PagedWorkflowResponse<PendingApproval>>>(`${this.baseUrl}/pending`, { params })
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Get approval history for current user
   */
  getApprovalHistory(filters: {
    page: number;
    pageSize: number;
    entityType?: string | null;
    action?: string | null;
    dateFrom?: string | null;
    dateTo?: string | null;
  }): Observable<PagedWorkflowResponse<ApprovalHistoryItem>> {
    let params = new HttpParams()
      .set('page', filters.page.toString())
      .set('pageSize', filters.pageSize.toString());

    if (filters.entityType) {
      params = params.set('entityType', filters.entityType);
    }

    if (filters.action) {
      params = params.set('action', filters.action);
    }

    if (filters.dateFrom) {
      params = params.set('dateFrom', filters.dateFrom);
    }

    if (filters.dateTo) {
      params = params.set('dateTo', filters.dateTo);
    }

    return this.http.get<ApiResponse<PagedWorkflowResponse<ApprovalHistoryItem>>>(`${this.baseUrl}/history`, { params })
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Approve a workflow step
   */
  approveStep(workflowInstanceId: number, request: ApprovalActionRequest): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/${workflowInstanceId}/approve`, request)
      .pipe(
        map(() => void 0)
      );
  }

  /**
   * Reject a workflow step
   */
  rejectStep(workflowInstanceId: number, request: ApprovalActionRequest): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/${workflowInstanceId}/reject`, request)
      .pipe(
        map(() => void 0)
      );
  }

  /**
   * Delegate a workflow step to another user
   */
  delegateStep(workflowInstanceId: number, request: DelegateApprovalRequest): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/${workflowInstanceId}/delegate`, request)
      .pipe(
        map(() => void 0)
      );
  }

  /**
   * Cancel a workflow
   */
  cancelWorkflow(workflowInstanceId: number, reason?: string): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/${workflowInstanceId}/cancel`, { reason })
      .pipe(
        map(() => void 0)
      );
  }

  /**
   * Create a new approval delegation
   */
  createDelegation(request: CreateDelegationRequest): Observable<number> {
    return this.http.post<ApiResponse<number>>(`${this.baseUrl}/delegations`, request)
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Delete an approval delegation
   */
  deleteDelegation(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/delegations/${id}`)
      .pipe(
        map(() => void 0)
      );
  }

  /**
   * Get entity type display name
   */
  getEntityTypeDisplayName(entityType: WorkflowEntityType): string {
    const displayNames: Record<WorkflowEntityType, string> = {
      'Vacation': 'Vacation Request',
      'Excuse': 'Excuse Request',
      'RemoteWork': 'Remote Work Request',
      'Overtime': 'Overtime Request',
      'Timesheet': 'Timesheet',
      'AttendanceCorrection': 'Attendance Correction',
      'FingerprintRequest': 'Fingerprint Request'
    };
    return displayNames[entityType] || entityType;
  }

  /**
   * Get action display name
   */
  getActionDisplayName(action: ApprovalAction): string {
    const displayNames: Record<ApprovalAction, string> = {
      'Approved': 'Approved',
      'Rejected': 'Rejected',
      'Delegated': 'Delegated',
      'Skipped': 'Skipped',
      'TimedOut': 'Timed Out'
    };
    return displayNames[action] || action;
  }

  /**
   * Get action badge class
   */
  getActionBadgeClass(action: ApprovalAction): string {
    const classes: Record<ApprovalAction, string> = {
      'Approved': 'bg-success',
      'Rejected': 'bg-danger',
      'Delegated': 'bg-info',
      'Skipped': 'bg-secondary',
      'TimedOut': 'bg-warning text-dark'
    };
    return classes[action] || 'bg-secondary';
  }
}
