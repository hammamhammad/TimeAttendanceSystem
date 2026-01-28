import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, finalize, catchError, of, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AttendanceCorrectionRequestDto,
  AttendanceCorrectionRequestsPagedResult,
  AttendanceCorrectionRequestsQueryParams,
  CreateAttendanceCorrectionRequest,
  UpdateAttendanceCorrectionRequest,
  ApproveAttendanceCorrectionRequest,
  AttendanceCorrectionStatistics,
  ApprovalStatus,
  AttendanceCorrectionType
} from '../../shared/models/attendance-correction.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceCorrectionsService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/attendance-corrections`;
  private readonly portalApiUrl = `${environment.apiUrl}/api/v1/portal`;

  // Signals for state management
  correctionRequests = signal<AttendanceCorrectionRequestDto[]>([]);
  pagedResult = signal<AttendanceCorrectionRequestsPagedResult | null>(null);
  statistics = signal<AttendanceCorrectionStatistics | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Get attendance correction requests with filtering and pagination
   */
  getAttendanceCorrectionRequests(params: AttendanceCorrectionRequestsQueryParams = {}): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    let httpParams = new HttpParams();

    if (params.page) httpParams = httpParams.set('pageNumber', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.employeeId) httpParams = httpParams.set('employeeId', params.employeeId.toString());
    if (params.branchId) httpParams = httpParams.set('branchId', params.branchId.toString());
    if (params.departmentId) httpParams = httpParams.set('departmentId', params.departmentId.toString());
    if (params.status) httpParams = httpParams.set('approvalStatus', params.status);
    if (params.correctionType) httpParams = httpParams.set('correctionType', params.correctionType.toString());
    if (params.fromDate) httpParams = httpParams.set('startDate', params.fromDate);
    if (params.toDate) httpParams = httpParams.set('endDate', params.toDate);
    if (params.searchTerm) httpParams = httpParams.set('searchTerm', params.searchTerm);
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.sortDirection) httpParams = httpParams.set('sortDirection', params.sortDirection);

    return this.http.get<any>(this.apiUrl, { params: httpParams }).pipe(
      tap(apiResponse => {
        // Handle Result<PagedResult<T>> wrapper from API
        const result = apiResponse.isSuccess ? apiResponse.value : { items: [], totalCount: 0, pageNumber: 1, pageSize: 10, totalPages: 0 };

        // Map API DTOs to frontend model
        const mappedItems = (result.items || []).map((item: any) => this.mapApiCorrectionToDto(item));

        this.correctionRequests.set(mappedItems);
        this.pagedResult.set({
          items: mappedItems,
          totalCount: result.totalCount || 0,
          page: result.pageNumber || 1,
          pageSize: result.pageSize || 10,
          totalPages: result.totalPages || 0
        });
      }),
      catchError(error => {
        this.error.set('Failed to load attendance correction requests');
        console.error('Error loading attendance correction requests:', error);
        return of({
          items: [],
          totalCount: 0,
          page: 1,
          pageSize: 10,
          totalPages: 0
        });
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Get attendance correction request by ID
   */
  getAttendanceCorrectionRequestById(id: number): Observable<AttendanceCorrectionRequestDto | null> {
    this.loading.set(true);
    this.error.set(null);

    return new Observable<AttendanceCorrectionRequestDto | null>(observer => {
      this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
        catchError(error => {
          this.error.set('Failed to load attendance correction request details');
          console.error('Error loading attendance correction request:', error);
          observer.next(null);
          observer.complete();
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      ).subscribe(apiResponse => {
        // Handle Result<T> wrapper from API
        if (apiResponse && apiResponse.isSuccess && apiResponse.value) {
          const item = apiResponse.value;
          const mappedItem = this.mapApiCorrectionToDto(item);
          observer.next(mappedItem);
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
  }

  /**
   * Create new attendance correction request
   * Backend returns Result<long> with the created request ID
   */
  createAttendanceCorrectionRequest(request: CreateAttendanceCorrectionRequest): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    // Backend expects JSON body with specific property names
    const jsonRequest = {
      EmployeeId: request.employeeId,
      CorrectionDate: request.correctionDate,
      CorrectionTime: request.correctionTime,
      CorrectionType: request.correctionType,
      Reason: request.reason
    };

    console.log('[AttendanceCorrectionService] Starting HTTP POST to:', this.apiUrl);
    console.log('[AttendanceCorrectionService] Request payload:', JSON.stringify(jsonRequest));

    return this.http.post<any>(this.apiUrl, jsonRequest).pipe(
      tap((response) => {
        console.log('[AttendanceCorrectionService] SUCCESS - Response received:', response);
        this.loading.set(false);
      }),
      catchError(error => {
        console.error('[AttendanceCorrectionService] ERROR - Request failed:', error);
        console.error('[AttendanceCorrectionService] Error status:', error?.status);
        console.error('[AttendanceCorrectionService] Error body:', error?.error);
        this.error.set('Failed to create attendance correction request');
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  /**
   * Update attendance correction request
   * Backend returns Result<bool>
   */
  updateAttendanceCorrectionRequest(id: number, request: UpdateAttendanceCorrectionRequest): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    // Backend expects JSON body with specific property names
    const jsonRequest = {
      CorrectionDate: request.correctionDate,
      CorrectionTime: request.correctionTime,
      CorrectionType: request.correctionType,
      Reason: request.reason
    };

    return this.http.put<any>(`${this.apiUrl}/${id}`, jsonRequest).pipe(
      tap(() => {
        this.loading.set(false);
      }),
      catchError(error => {
        this.error.set('Failed to update attendance correction request');
        console.error('Error updating attendance correction request:', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  /**
   * Approve or reject attendance correction request (admin/manager endpoint)
   */
  approveAttendanceCorrectionRequest(id: number, request: ApproveAttendanceCorrectionRequest): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    const jsonRequest = {
      Decision: request.decision,
      RejectionReason: request.rejectionReason || null,
      ProcessingNotes: request.processingNotes || null
    };

    return this.http.patch<any>(`${this.apiUrl}/${id}/approve`, jsonRequest).pipe(
      tap(() => {
        this.refreshCurrentList();
      }),
      catchError(error => {
        this.error.set('Failed to process attendance correction request');
        console.error('Error processing attendance correction request:', error);
        return throwError(() => error);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Delete/cancel attendance correction request (admin endpoint)
   */
  deleteAttendanceCorrectionRequest(id: number): Observable<void> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.refreshCurrentList();
      }),
      catchError(error => {
        this.error.set('Failed to delete attendance correction request');
        console.error('Error deleting attendance correction request:', error);
        throw error;
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Cancel current employee's own correction request (self-service portal endpoint).
   * Only pending requests can be cancelled.
   */
  cancelMyCorrectionRequest(id: number): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.delete<any>(`${this.portalApiUrl}/my-attendance-corrections/${id}`).pipe(
      tap(() => {
        this.refreshCurrentList();
      }),
      catchError(error => {
        this.error.set('Failed to cancel attendance correction request');
        console.error('Error cancelling my correction request:', error);
        return throwError(() => error);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Get available approval statuses for filtering
   */
  getApprovalStatuses(): ApprovalStatus[] {
    return Object.values(ApprovalStatus);
  }

  /**
   * Get available correction types for filtering
   */
  getCorrectionTypes(): { value: AttendanceCorrectionType; label: string }[] {
    return [
      { value: AttendanceCorrectionType.CheckIn, label: 'Check In' },
      { value: AttendanceCorrectionType.CheckOut, label: 'Check Out' }
    ];
  }

  /**
   * Refresh the current list (used after mutations)
   */
  private refreshCurrentList(): void {
    const currentResult = this.pagedResult();
    if (currentResult) {
      this.getAttendanceCorrectionRequests({
        page: currentResult.page,
        pageSize: currentResult.pageSize
      }).subscribe();
    } else {
      this.getAttendanceCorrectionRequests({
        page: 1,
        pageSize: 10
      }).subscribe();
    }
  }

  /**
   * Get employees dropdown for selection
   */
  getEmployeesDropdown(): Observable<Array<{id: number, name: string, employeeNumber: string}>> {
    return this.http.get<Array<{id: number, name: string, employeeNumber: string}>>(`${environment.apiUrl}/api/v1/employees/dropdown`).pipe(
      catchError(error => {
        console.error('Error loading employees dropdown:', error);
        return of([]);
      })
    );
  }

  /**
   * Get departments dropdown for filtering
   */
  getDepartmentsDropdown(): Observable<Array<{id: number, name: string}>> {
    return this.http.get<Array<{id: number, name: string}>>(`${environment.apiUrl}/api/v1/departments/dropdown`).pipe(
      catchError(error => {
        console.error('Error loading departments dropdown:', error);
        return of([]);
      })
    );
  }

  /**
   * Get branches dropdown for filtering
   */
  getBranchesDropdown(): Observable<Array<{id: number, name: string}>> {
    return this.http.get<Array<{id: number, name: string}>>(`${environment.apiUrl}/api/v1/branches/dropdown`).pipe(
      catchError(error => {
        console.error('Error loading branches dropdown:', error);
        return of([]);
      })
    );
  }

  // ============================================
  // Portal Self-Service Methods (for employees)
  // ============================================

  /**
   * Get current employee's correction requests (self-service).
   * Uses the portal endpoint which automatically filters by the logged-in user.
   */
  getMyCorrectionRequests(page: number = 1, pageSize: number = 20): Observable<AttendanceCorrectionRequestsPagedResult> {
    this.loading.set(true);
    this.error.set(null);

    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.portalApiUrl}/my-attendance-corrections`, { params }).pipe(
      tap(result => {
        // Map API response to frontend model
        const mappedItems = (result.items || []).map((item: any) => this.mapApiCorrectionToDto(item));

        this.correctionRequests.set(mappedItems);
        this.pagedResult.set({
          items: mappedItems,
          totalCount: result.totalCount || 0,
          page: result.pageNumber || result.page || 1,
          pageSize: result.pageSize || 20,
          totalPages: result.totalPages || Math.ceil((result.totalCount || 0) / (result.pageSize || 20))
        });
      }),
      catchError(error => {
        this.error.set('Failed to load your attendance correction requests');
        console.error('Error loading my correction requests:', error);
        return of({
          items: [],
          totalCount: 0,
          page: 1,
          pageSize: 20,
          totalPages: 0
        });
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Get a specific correction request for the current employee (self-service).
   * Only returns requests that belong to the current employee.
   */
  getMyCorrectionRequestById(id: number): Observable<AttendanceCorrectionRequestDto | null> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<any>(`${this.portalApiUrl}/my-attendance-corrections/${id}`).pipe(
      map((item: any) => item ? this.mapApiCorrectionToDto(item) : null),
      catchError(error => {
        this.error.set('Failed to load correction request details');
        console.error('Error loading my correction request:', error);
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Get correction request details for approval (manager view).
   * Used when managers view team member correction requests.
   */
  getCorrectionRequestForApproval(id: number): Observable<AttendanceCorrectionRequestDto | null> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<any>(`${this.portalApiUrl}/approval-attendance-correction/${id}`).pipe(
      map((item: any) => item ? this.mapApiCorrectionToDto(item) : null),
      catchError(error => {
        this.error.set('Failed to load correction request details for approval');
        console.error('Error loading correction request for approval:', error);
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Maps API correction response to frontend DTO
   */
  private mapApiCorrectionToDto(item: any): AttendanceCorrectionRequestDto {
    return {
      id: item.id,
      employeeId: item.employeeId,
      employeeName: item.employeeName || '',
      employeeNumber: item.employeeNumber || '',
      departmentName: item.departmentName || '',
      branchName: item.branchName || '',
      correctionDate: item.correctionDate,
      correctionTime: item.correctionTime,
      correctionType: item.correctionType,
      correctionTypeDisplay: item.correctionTypeDisplay || this.getCorrectionTypeDisplayText(item.correctionType),
      reason: item.reason || '',
      approvalStatus: item.approvalStatus,
      approvalStatusDisplay: item.approvalStatusDisplay || this.getApprovalStatusDisplayText(item.approvalStatus),
      approvedById: item.approvedById,
      approvedByName: item.approvedByName,
      approvedAt: item.approvedAt,
      rejectionReason: item.rejectionReason,
      attachmentPath: item.attachmentPath,
      processingNotes: item.processingNotes,
      createdAtUtc: item.createdAtUtc,
      createdBy: item.createdBy || '',
      modifiedAtUtc: item.modifiedAtUtc,
      modifiedBy: item.modifiedBy,
      canBeModified: item.canBeModified || false,
      correctionSummary: item.correctionSummary || '',
      createdTransactionId: item.createdTransactionId,
      // Workflow information
      workflowInstanceId: item.workflowInstanceId,
      workflowStatus: item.workflowStatus,
      currentApproverName: item.currentApproverName,
      currentApproverRole: item.currentApproverRole,
      currentStepOrder: item.currentStepOrder,
      totalSteps: item.totalSteps,
      approvalHistory: item.approvalHistory
    };
  }

  /**
   * Get display text for correction type
   */
  private getCorrectionTypeDisplayText(type: AttendanceCorrectionType): string {
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
   * Get display text for approval status
   */
  private getApprovalStatusDisplayText(status: ApprovalStatus | string): string {
    const statusStr = typeof status === 'string' ? status : String(status);
    switch (statusStr) {
      case '1':
      case 'Pending':
        return 'Pending';
      case '2':
      case 'Approved':
        return 'Approved';
      case '3':
      case 'Rejected':
        return 'Rejected';
      case '4':
      case 'Cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }

  /**
   * Clear all state
   */
  clearState(): void {
    this.correctionRequests.set([]);
    this.pagedResult.set(null);
    this.statistics.set(null);
    this.loading.set(false);
    this.error.set(null);
  }
}
