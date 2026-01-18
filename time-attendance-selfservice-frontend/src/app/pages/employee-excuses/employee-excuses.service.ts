import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, finalize, catchError, of, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  EmployeeExcuseDto,
  EmployeeExcusesPagedResult,
  EmployeeExcusesQueryParams,
  CreateEmployeeExcuseRequest,
  UpdateEmployeeExcuseRequest,
  ReviewExcuseRequest,
  EmployeeExcuseStatistics,
  ExcuseStatus,
  ExcuseType
} from '../../shared/models/employee-excuse.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeExcusesService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/employee-excuses`;
  private readonly portalApiUrl = `${environment.apiUrl}/api/v1/portal`;

  // Signals for state management
  employeeExcuses = signal<EmployeeExcuseDto[]>([]);
  pagedResult = signal<EmployeeExcusesPagedResult | null>(null);
  statistics = signal<EmployeeExcuseStatistics | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Get employee excuses with filtering and pagination
   */
  getEmployeeExcuses(params: EmployeeExcusesQueryParams = {}): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    let httpParams = new HttpParams();

    if (params.page) httpParams = httpParams.set('pageNumber', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.employeeId) httpParams = httpParams.set('employeeId', params.employeeId.toString());
    if (params.branchId) httpParams = httpParams.set('branchId', params.branchId.toString());
    if (params.status) httpParams = httpParams.set('approvalStatus', params.status);
    if (params.fromDate) httpParams = httpParams.set('startDate', params.fromDate);
    if (params.toDate) httpParams = httpParams.set('endDate', params.toDate);
    // Note: API doesn't support departmentId, searchTerm, sortBy, sortDirection parameters yet

    return this.http.get<any>(this.apiUrl, { params: httpParams }).pipe(
      tap(apiResponse => {
        // Handle Result<PagedResult<T>> wrapper from API
        const result = apiResponse.isSuccess ? apiResponse.value : { items: [], totalCount: 0, pageNumber: 1, pageSize: 10, totalPages: 0 };

        // Map API DTOs to frontend model
        const mappedItems = (result.items || []).map((item: any) => ({
          ...item,
          status: this.mapApprovalStatusToExcuseStatus(item.approvalStatus || item.approvalStatusDisplay),
          submissionDate: item.createdAtUtc,
          departmentName: item.departmentName || '',
          branchName: item.branchName || ''
        }));

        this.employeeExcuses.set(mappedItems);
        this.pagedResult.set({
          items: mappedItems,
          totalCount: result.totalCount || 0,
          page: result.pageNumber || 1,
          pageSize: result.pageSize || 10,
          totalPages: result.totalPages || 0
        });
      }),
      catchError(error => {
        this.error.set('Failed to load employee excuses');
        console.error('Error loading employee excuses:', error);
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
   * Get employee excuse by ID
   */
  getEmployeeExcuseById(id: number): Observable<EmployeeExcuseDto | null> {
    this.loading.set(true);
    this.error.set(null);

    return new Observable<EmployeeExcuseDto | null>(observer => {
      this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
        catchError(error => {
          this.error.set('Failed to load employee excuse details');
          console.error('Error loading employee excuse:', error);
          observer.next(null);
          observer.complete();
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      ).subscribe(apiResponse => {
        // Handle Result<T> wrapper from API
        if (apiResponse && apiResponse.isSuccess && apiResponse.value) {
          const item = apiResponse.value;
          // Map API response to frontend model using the shared mapping function
          const mappedItem = this.mapApiExcuseToDto(item);
          observer.next(mappedItem);
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
  }

  /**
   * Create new employee excuse request
   * Backend returns Result<long> with the created excuse ID
   */
  createEmployeeExcuse(request: CreateEmployeeExcuseRequest): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    // Backend expects JSON body with specific property names
    const jsonRequest = {
      EmployeeId: request.employeeId,
      ExcuseDate: request.excuseDate,
      StartTime: request.startTime,
      EndTime: request.endTime,
      Reason: request.reason,
      ExcuseType: request.excuseType || 'PersonalExcuse'
    };

    console.log('[ExcuseService] Starting HTTP POST to:', this.apiUrl);
    console.log('[ExcuseService] Request payload:', JSON.stringify(jsonRequest));

    return this.http.post<any>(this.apiUrl, jsonRequest).pipe(
      tap((response) => {
        console.log('[ExcuseService] SUCCESS - Response received:', response);
        console.log('[ExcuseService] Setting loading to false');
        this.loading.set(false);
        console.log('[ExcuseService] Loading is now:', this.loading());
      }),
      catchError(error => {
        console.error('[ExcuseService] ERROR - Request failed:', error);
        console.error('[ExcuseService] Error status:', error?.status);
        console.error('[ExcuseService] Error body:', error?.error);
        this.error.set('Failed to create employee excuse request');
        this.loading.set(false);
        console.log('[ExcuseService] Loading set to false after error');
        return throwError(() => error);
      })
    );
  }

  /**
   * Update employee excuse request
   * Backend returns Result<bool>
   */
  updateEmployeeExcuse(id: number, request: UpdateEmployeeExcuseRequest): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    // Backend expects JSON body with specific property names
    const jsonRequest = {
      ExcuseDate: request.excuseDate,
      ExcuseType: request.excuseType || 'PersonalExcuse',
      StartTime: request.startTime,
      EndTime: request.endTime,
      Reason: request.reason,
      ApprovalStatus: request.approvalStatus || 'Pending',
      ReviewerComments: request.reviewerComments || null
    };

    return this.http.put<any>(`${this.apiUrl}/${id}`, jsonRequest).pipe(
      tap(() => {
        this.loading.set(false);
      }),
      catchError(error => {
        this.error.set('Failed to update employee excuse request');
        console.error('Error updating employee excuse:', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    );
  }

  /**
   * Review employee excuse (approve/reject)
   */
  reviewEmployeeExcuse(id: number, request: ReviewExcuseRequest): Observable<EmployeeExcuseDto> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.post<EmployeeExcuseDto>(`${this.apiUrl}/${id}/review`, request).pipe(
      tap(() => {
        // Refresh the list after review
        this.refreshCurrentList();
      }),
      catchError(error => {
        this.error.set('Failed to review employee excuse');
        console.error('Error reviewing employee excuse:', error);
        throw error;
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Cancel employee excuse request (admin endpoint - requires ExcuseDelete permission)
   */
  cancelEmployeeExcuse(id: number): Observable<void> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        // Refresh the list after cancellation
        this.refreshCurrentList();
      }),
      catchError(error => {
        this.error.set('Failed to cancel employee excuse');
        console.error('Error cancelling employee excuse:', error);
        throw error;
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Cancel current employee's own excuse request (self-service portal endpoint).
   * Only pending excuses can be cancelled.
   */
  cancelMyExcuse(id: number): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.delete<any>(`${this.portalApiUrl}/my-excuses/${id}`).pipe(
      tap(() => {
        // Refresh the list after cancellation
        this.refreshCurrentList();
      }),
      catchError(error => {
        this.error.set('Failed to cancel excuse request');
        console.error('Error cancelling my excuse:', error);
        return throwError(() => error);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Get employee excuse statistics
   */
  getEmployeeExcuseStatistics(employeeId?: number): Observable<EmployeeExcuseStatistics> {
    this.loading.set(true);
    this.error.set(null);

    let httpParams = new HttpParams();
    if (employeeId) {
      httpParams = httpParams.set('employeeId', employeeId.toString());
    }

    return this.http.get<EmployeeExcuseStatistics>(`${this.apiUrl}/statistics`, { params: httpParams }).pipe(
      tap(stats => {
        this.statistics.set(stats);
      }),
      catchError(error => {
        this.error.set('Failed to load employee excuse statistics');
        console.error('Error loading statistics:', error);
        return of({
          totalRequests: 0,
          pendingRequests: 0,
          approvedRequests: 0,
          rejectedRequests: 0,
          currentMonthHours: 0,
          remainingMonthlyHours: 0,
          monthlyLimit: 0
        } as EmployeeExcuseStatistics);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Download attachment file
   */
  downloadAttachment(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/attachment`, {
      responseType: 'blob'
    }).pipe(
      catchError(error => {
        this.error.set('Failed to download attachment');
        console.error('Error downloading attachment:', error);
        throw error;
      })
    );
  }

  /**
   * Get available excuse statuses for filtering
   */
  getExcuseStatuses(): ExcuseStatus[] {
    return Object.values(ExcuseStatus);
  }

  /**
   * Refresh the current list (used after mutations)
   */
  private refreshCurrentList(): void {
    const currentResult = this.pagedResult();
    if (currentResult) {
      this.getEmployeeExcuses({
        page: currentResult.page,
        pageSize: currentResult.pageSize
      }).subscribe();
    } else {
      // If no current result, load the first page
      this.getEmployeeExcuses({
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

  /**
   * Validate excuse request parameters
   */
  validateExcuse(request: {
    employeeId: number;
    excuseDate: string;
    startTime: string;
    endTime: string;
    excuseType: ExcuseType;
  }): Observable<any> {
    this.loading.set(true);
    this.error.set(null);

    // Transform the request to match backend expectations
    const validationRequest = {
      EmployeeId: request.employeeId,
      ExcuseDate: request.excuseDate,
      ExcuseType: request.excuseType,
      StartTime: request.startTime,
      EndTime: request.endTime
    };

    return this.http.post<any>(`${this.apiUrl}/validate`, validationRequest).pipe(
      catchError(error => {
        this.error.set('Failed to validate excuse request');
        console.error('Error validating excuse:', error);
        throw error;
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Map API ApprovalStatus to frontend ExcuseStatus
   */
  private mapApprovalStatusToExcuseStatus(apiStatus: any): ExcuseStatus {
    // Handle both enum values and string representations
    const statusStr = typeof apiStatus === 'string' ? apiStatus : String(apiStatus);

    switch (statusStr) {
      case '1':
      case 'Pending':
        return ExcuseStatus.Pending;
      case '2':
      case 'Approved':
        return ExcuseStatus.Approved;
      case '3':
      case 'Rejected':
        return ExcuseStatus.Rejected;
      case '4':
      case 'Cancelled':
        return ExcuseStatus.Cancelled;
      default:
        return ExcuseStatus.Pending;
    }
  }

  // ============================================
  // Portal Self-Service Methods (for employees)
  // ============================================

  /**
   * Get current employee's excuse requests (self-service).
   * Uses the portal endpoint which automatically filters by the logged-in user.
   */
  getMyExcuses(page: number = 1, pageSize: number = 20): Observable<EmployeeExcusesPagedResult> {
    this.loading.set(true);
    this.error.set(null);

    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.portalApiUrl}/my-excuses`, { params }).pipe(
      tap(result => {
        // Map API response to frontend model
        const mappedItems = (result.items || []).map((item: any) => this.mapApiExcuseToDto(item));

        this.employeeExcuses.set(mappedItems);
        this.pagedResult.set({
          items: mappedItems,
          totalCount: result.totalCount || 0,
          page: result.pageNumber || result.page || 1,
          pageSize: result.pageSize || 20,
          totalPages: result.totalPages || Math.ceil((result.totalCount || 0) / (result.pageSize || 20))
        });
      }),
      catchError(error => {
        this.error.set('Failed to load your excuse requests');
        console.error('Error loading my excuses:', error);
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
   * Get a specific excuse request for the current employee (self-service).
   * Only returns excuses that belong to the current employee.
   */
  getMyExcuseById(id: number): Observable<EmployeeExcuseDto | null> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<any>(`${this.portalApiUrl}/my-excuses/${id}`).pipe(
      map((item: any) => item ? this.mapApiExcuseToDto(item) : null),
      catchError(error => {
        this.error.set('Failed to load excuse details');
        console.error('Error loading my excuse:', error);
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Get excuse details for approval (manager view).
   * Used when managers view team member excuse requests.
   */
  getExcuseForApproval(id: number): Observable<EmployeeExcuseDto | null> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<any>(`${this.portalApiUrl}/approval-excuse/${id}`).pipe(
      map((item: any) => item ? this.mapApiExcuseToDto(item) : null),
      catchError(error => {
        this.error.set('Failed to load excuse details for approval');
        console.error('Error loading excuse for approval:', error);
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Maps API excuse response to frontend DTO
   */
  private mapApiExcuseToDto(item: any): EmployeeExcuseDto {
    return {
      id: item.id,
      employeeId: item.employeeId,
      employeeName: item.employeeName || '',
      employeeNumber: item.employeeNumber || '',
      departmentName: item.departmentName || '',
      branchName: item.branchName || '',
      excuseDate: item.excuseDate,
      excuseType: item.excuseType,
      excuseTypeDisplay: item.excuseTypeDisplay || '',
      startTime: item.startTime,
      endTime: item.endTime,
      timeRange: item.timeRange || '',
      durationHours: item.durationHours || 0,
      reason: item.reason || '',
      approvalStatus: item.approvalStatus,
      approvalStatusDisplay: item.approvalStatusDisplay || '',
      approvedById: item.approvedById,
      approvedByName: item.approvedByName,
      approvedAt: item.approvedAt,
      rejectionReason: item.rejectionReason,
      attachmentPath: item.attachmentPath,
      affectsSalary: item.affectsSalary || false,
      processingNotes: item.processingNotes,
      createdAtUtc: item.createdAtUtc,
      createdBy: item.createdBy || '',
      modifiedAtUtc: item.modifiedAtUtc,
      modifiedBy: item.modifiedBy,
      canBeModified: item.canBeModified || false,
      excuseSummary: item.excuseSummary || '',
      // Legacy fields
      status: this.mapApprovalStatusToExcuseStatus(item.approvalStatus || item.approvalStatusDisplay),
      submissionDate: item.createdAtUtc,
      reviewDate: item.approvedAt,
      reviewerId: item.approvedById,
      reviewerName: item.approvedByName,
      reviewerComments: item.rejectionReason,
      attachmentUrl: item.attachmentPath,
      isWithinPolicy: true,
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
   * Clear all state
   */
  clearState(): void {
    this.employeeExcuses.set([]);
    this.pagedResult.set(null);
    this.statistics.set(null);
    this.loading.set(false);
    this.error.set(null);
  }
}