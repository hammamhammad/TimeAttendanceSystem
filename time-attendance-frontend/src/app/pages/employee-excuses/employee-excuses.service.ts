import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, finalize, catchError, of } from 'rxjs';
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
          // Map API response to frontend model
          const mappedItem: EmployeeExcuseDto = {
            id: item.id,
            employeeId: item.employeeId,
            employeeName: item.employeeName || '',
            employeeNumber: item.employeeNumber || '',
            departmentName: item.departmentName || '',
            branchName: item.branchName || '',
            excuseDate: item.excuseDate,
            excuseType: item.excuseType,
            startTime: item.startTime,
            endTime: item.endTime,
            durationHours: item.durationHours || 0,
            reason: item.reason || '',
            status: this.mapApprovalStatusToExcuseStatus(item.approvalStatus || item.approvalStatusDisplay),
            submissionDate: item.createdAtUtc,
            reviewDate: item.reviewedAtUtc,
            reviewerId: item.reviewedByUserId,
            reviewerName: item.reviewerName,
            reviewerComments: item.reviewerComments,
            attachmentUrl: item.attachmentUrl,
            isWithinPolicy: true,
            policyViolationReason: undefined
          };
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
   */
  createEmployeeExcuse(request: CreateEmployeeExcuseRequest): Observable<EmployeeExcuseDto> {
    this.loading.set(true);
    this.error.set(null);

    const formData = new FormData();
    formData.append('employeeId', request.employeeId.toString());
    formData.append('excuseDate', request.excuseDate);
    formData.append('startTime', request.startTime);
    formData.append('endTime', request.endTime);
    formData.append('reason', request.reason);
    formData.append('excuseType', request.excuseType || 'PersonalExcuse');

    if (request.attachmentFile) {
      formData.append('attachmentFile', request.attachmentFile);
    }

    return this.http.post<EmployeeExcuseDto>(this.apiUrl, formData).pipe(
      tap(() => {
        // Refresh the list after creation
        this.refreshCurrentList();
      }),
      catchError(error => {
        this.error.set('Failed to create employee excuse request');
        console.error('Error creating employee excuse:', error);
        throw error;
      }),
      finalize(() => this.loading.set(false))
    );
  }

  /**
   * Update employee excuse request
   */
  updateEmployeeExcuse(id: number, request: UpdateEmployeeExcuseRequest): Observable<EmployeeExcuseDto> {
    this.loading.set(true);
    this.error.set(null);

    const formData = new FormData();
    formData.append('excuseDate', request.excuseDate);
    formData.append('excuseType', request.excuseType || 'PersonalExcuse');
    formData.append('startTime', request.startTime);
    formData.append('endTime', request.endTime);
    formData.append('reason', request.reason);
    formData.append('approvalStatus', request.approvalStatus || 'Pending');

    if (request.reviewerComments) {
      formData.append('reviewerComments', request.reviewerComments);
    }

    if (request.attachmentFile) {
      formData.append('attachmentFile', request.attachmentFile);
    }

    return this.http.put<EmployeeExcuseDto>(`${this.apiUrl}/${id}`, formData).pipe(
      tap(() => {
        // Refresh the list after update
        this.refreshCurrentList();
      }),
      catchError(error => {
        this.error.set('Failed to update employee excuse request');
        console.error('Error updating employee excuse:', error);
        throw error;
      }),
      finalize(() => this.loading.set(false))
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
   * Cancel employee excuse request
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