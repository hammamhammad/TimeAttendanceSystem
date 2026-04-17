import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Phase 3 (v14.3): Angular service for the operational-alerts + ops-dashboard endpoints.
 * Mirrors the shapes returned by OperationalAlertsController and OpsDashboardController.
 */

export type OperationalFailureCategory =
  | 'LifecycleAutomation'
  | 'WorkflowRouting'
  | 'ApprovalExecution'
  | 'PayrollProcessing'
  | 'BackgroundJob'
  | 'Integration';

export type OperationalFailureSeverity = 'Info' | 'Warning' | 'Error' | 'Critical';

export interface OperationalFailureAlert {
  id: number;
  category: OperationalFailureCategory;
  sourceEntityType: string;
  sourceEntityId: number;
  employeeId: number | null;
  failureCode: string;
  reason: string;
  errorMessage: string | null;
  severity: OperationalFailureSeverity;
  failedAtUtc: string;
  isResolved: boolean;
  resolvedAtUtc: string | null;
  resolvedByUserId: number | null;
  resolutionNotes: string | null;
  isRetryable: boolean;
  retryCount: number;
  lastRetryAtUtc: string | null;
  metadataJson: string | null;
}

export interface OperationalAlertListResponse {
  total: number;
  page: number;
  pageSize: number;
  items: OperationalFailureAlert[];
}

export interface BulkAlertOperationRequest {
  alertIds: number[];
  notes?: string | null;
}

export interface BulkAlertItemResult {
  alertId: number;
  outcome: 'Succeeded' | 'AlreadyProcessed' | 'Skipped' | 'Failed';
  message: string | null;
}

export interface BulkAlertOperationResult {
  attempted: number;
  succeeded: number;
  alreadyProcessed: number;
  skipped: number;
  failed: number;
  items: BulkAlertItemResult[];
}

export interface OpsDashboardSummary {
  generatedAtUtc: string;
  alerts: {
    totalUnresolved: number;
    byCategory: { [key: string]: number };
    bySeverity: { [key: string]: number };
  };
  lifecycle: { failuresLast7Days: number; byAutomationType: { [key: string]: number } };
  payroll: { openAlerts: number; runsWithFailuresLast7Days: number };
  approvedNotExecuted: {
    allowanceRequests: number;
    loanApplications: number;
    salaryAdvances: number;
    expenseClaims: number;
    benefitEnrollments: number;
    letterRequests: number;
  };
  overdue: { onboardingTasks: number; clearanceItems: number; workflowApprovals: number };
}

@Injectable({ providedIn: 'root' })
export class OperationalAlertsService {
  private http = inject(HttpClient);
  private alertsUrl = `${environment.apiUrl}/api/v1/operational-alerts`;
  private dashboardUrl = `${environment.apiUrl}/api/v1/ops-dashboard`;

  list(filters: {
    isResolved?: boolean;
    category?: OperationalFailureCategory;
    minSeverity?: OperationalFailureSeverity;
    sourceEntityType?: string;
    sourceEntityId?: number;
    employeeId?: number;
    page?: number;
    pageSize?: number;
  } = {}): Observable<OperationalAlertListResponse> {
    let params = new HttpParams();
    if (filters.isResolved !== undefined) params = params.set('isResolved', String(filters.isResolved));
    if (filters.category) params = params.set('category', filters.category);
    if (filters.minSeverity) params = params.set('minSeverity', filters.minSeverity);
    if (filters.sourceEntityType) params = params.set('sourceEntityType', filters.sourceEntityType);
    if (filters.sourceEntityId != null) params = params.set('sourceEntityId', String(filters.sourceEntityId));
    if (filters.employeeId != null) params = params.set('employeeId', String(filters.employeeId));
    params = params.set('page', String(filters.page ?? 1));
    params = params.set('pageSize', String(filters.pageSize ?? 50));
    return this.http.get<OperationalAlertListResponse>(this.alertsUrl, { params });
  }

  get(id: number): Observable<OperationalFailureAlert> {
    return this.http.get<OperationalFailureAlert>(`${this.alertsUrl}/${id}`);
  }

  resolve(id: number, notes?: string | null): Observable<void> {
    return this.http.post<void>(`${this.alertsUrl}/${id}/resolve`, { notes });
  }

  retry(id: number): Observable<any> {
    return this.http.post<any>(`${this.alertsUrl}/${id}/retry`, {});
  }

  bulkResolve(body: BulkAlertOperationRequest): Observable<BulkAlertOperationResult> {
    return this.http.post<BulkAlertOperationResult>(`${this.alertsUrl}/bulk-resolve`, body);
  }

  bulkRetry(body: BulkAlertOperationRequest): Observable<BulkAlertOperationResult> {
    return this.http.post<BulkAlertOperationResult>(`${this.alertsUrl}/bulk-retry`, body);
  }

  getDashboardSummary(): Observable<OpsDashboardSummary> {
    return this.http.get<OpsDashboardSummary>(`${this.dashboardUrl}/summary`);
  }

  getQueue(queue: string, limit: number = 100): Observable<any[]> {
    const params = new HttpParams().set('limit', String(limit));
    return this.http.get<any[]>(`${this.dashboardUrl}/queues/${queue}`, { params });
  }
}
