import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap, catchError, throwError } from 'rxjs';
import {
  EmployeeVacation,
  CreateEmployeeVacationRequest,
  UpdateEmployeeVacationRequest,
  VacationCalendarItem,
  VacationQueryParams,
  VacationFilters,
  VacationConflict
} from '../../shared/models/employee-vacation.model';
import { PagedResult } from '../../shared/models/vacation-type.model';
import { NotificationService } from '../../core/notifications/notification.service';
import { environment } from '../../../environments/environment';

/**
 * Service for managing employee vacation operations.
 * Provides comprehensive vacation management with state management using Angular signals.
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeVacationsService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/employee-vacations`;
  private readonly portalApiUrl = `${environment.apiUrl}/api/v1/portal`;

  // Signal-based state management
  private readonly _vacations = signal<EmployeeVacation[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _pagedResult = signal<PagedResult<EmployeeVacation> | null>(null);

  // Read-only signals for external consumption
  readonly vacations = this._vacations.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly pagedResult = this._pagedResult.asReadonly();

  // Computed signals for derived state
  readonly totalPages = signal(() => {
    const result = this._pagedResult();
    if (!result || result.pageSize === 0) return 1;
    return Math.ceil(result.totalCount / result.pageSize);
  });
  readonly hasNextPage = signal(() => {
    const result = this._pagedResult();
    return result ? result.page < this.totalPages()() : false;
  });
  readonly hasPreviousPage = signal(() => {
    const result = this._pagedResult();
    return result ? result.page > 1 : false;
  });

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  /**
   * Retrieves vacation records for the current employee (self-service).
   * Uses the portal endpoint which automatically filters by the logged-in user.
   */
  getVacations(params?: VacationQueryParams): Observable<PagedResult<EmployeeVacation>> {
    this._loading.set(true);
    this._error.set(null);

    let httpParams = new HttpParams();

    if (params) {
      // Portal endpoint only supports pagination params
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }

    // Use portal endpoint which filters by current employee automatically
    return this.http.get<PagedResult<EmployeeVacation>>(`${this.portalApiUrl}/my-vacations`, { params: httpParams }).pipe(
      map(result => ({
        ...result,
        items: result.items.map((item: EmployeeVacation) => this.transformDates(item))
      })),
      tap(result => {
        this._vacations.set(result.items);
        this._pagedResult.set(result);
        this._loading.set(false);
      }),
      catchError(error => {
        this._error.set(error.error?.message || 'Failed to load vacations');
        this._loading.set(false);
        this.notificationService.error('Failed to load employee vacations');
        return throwError(() => error);
      })
    );
  }

  /**
   * Retrieves a specific employee vacation by ID.
   * Uses the portal endpoint for self-service access.
   */
  getVacationById(id: number): Observable<EmployeeVacation> {
    // Use portal endpoint for self-service (doesn't require VacationRead policy)
    return this.http.get<EmployeeVacation>(`${environment.apiUrl}/api/v1/portal/my-vacations/${id}`).pipe(
      map(vacation => this.transformDates(vacation)),
      catchError(error => {
        this.notificationService.error('Failed to load vacation details');
        return throwError(() => error);
      })
    );
  }

  /**
   * Retrieves a vacation for approval purposes (manager view).
   * Used when managers view team member vacation requests.
   */
  getVacationForApproval(id: number): Observable<EmployeeVacation> {
    return this.http.get<EmployeeVacation>(`${environment.apiUrl}/api/v1/portal/approval-vacation/${id}`).pipe(
      map(vacation => this.transformDates(vacation)),
      catchError(error => {
        this.notificationService.error('Failed to load vacation details');
        return throwError(() => error);
      })
    );
  }

  /**
   * Creates a new employee vacation record.
   */
  createVacation(request: CreateEmployeeVacationRequest): Observable<number> {
    this._loading.set(true);

    return this.http.post<number>(this.apiUrl, request).pipe(
      tap(vacationId => {
        this._loading.set(false);
        this.notificationService.success('Vacation created successfully');
        // Refresh the vacation list
        this.refreshVacations();
      }),
      catchError(error => {
        this._loading.set(false);
        const errorMessage = error.error?.message || 'Failed to create vacation';
        this._error.set(errorMessage);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Updates an existing employee vacation record.
   */
  updateVacation(id: number, request: UpdateEmployeeVacationRequest): Observable<void> {
    this._loading.set(true);

    return this.http.put<void>(`${this.apiUrl}/${id}`, request).pipe(
      tap(() => {
        this._loading.set(false);
        this.notificationService.success('Vacation updated successfully');
        // Refresh the vacation list
        this.refreshVacations();
      }),
      catchError(error => {
        this._loading.set(false);
        const errorMessage = error.error?.message || 'Failed to update vacation';
        this._error.set(errorMessage);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Deletes an employee vacation record.
   */
  deleteVacation(id: number): Observable<void> {
    this._loading.set(true);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this._loading.set(false);
        this.notificationService.success('Vacation deleted successfully');
        // Remove from local state
        const currentVacations = this._vacations();
        this._vacations.set(currentVacations.filter(v => v.id !== id));
        // Update paged result if available
        const currentResult = this._pagedResult();
        if (currentResult) {
          this._pagedResult.set({
            ...currentResult,
            totalCount: currentResult.totalCount - 1
          });
        }
      }),
      catchError(error => {
        this._loading.set(false);
        const errorMessage = error.error?.message || 'Failed to delete vacation';
        this._error.set(errorMessage);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Toggles the approval status of a vacation record.
   */
  toggleVacationStatus(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/toggle-status`, {}).pipe(
      tap(() => {
        this.notificationService.success('Vacation status updated successfully');
        // Update local state
        const currentVacations = this._vacations();
        const updatedVacations = currentVacations.map(v =>
          v.id === id ? { ...v, isApproved: !v.isApproved } : v
        );
        this._vacations.set(updatedVacations);
      }),
      catchError(error => {
        const errorMessage = error.error?.message || 'Failed to update vacation status';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Retrieves vacation calendar data for display.
   */
  getVacationCalendar(startDate: Date, endDate: Date, employeeIds?: number[]): Observable<VacationCalendarItem[]> {
    let params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());

    if (employeeIds && employeeIds.length > 0) {
      employeeIds.forEach(id => {
        params = params.append('employeeIds', id.toString());
      });
    }

    return this.http.get<VacationCalendarItem[]>(`${this.apiUrl}/calendar`, { params }).pipe(
      map(items => items.map(item => ({
        ...item,
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate)
      }))),
      catchError(error => {
        this.notificationService.error('Failed to load vacation calendar');
        return throwError(() => error);
      })
    );
  }

  /**
   * Checks for vacation conflicts for a given employee and date range.
   */
  checkVacationConflicts(employeeId: number, startDate: Date, endDate: Date, excludeId?: number): Observable<VacationConflict> {
    // This would typically be a separate API endpoint
    // For now, we'll simulate it by checking existing vacations
    return this.getVacations({ employeeId }).pipe(
      map(result => {
        const conflictingVacations = result.items.filter((vacation: EmployeeVacation) => {
          // Exclude the vacation being edited
          if (excludeId && vacation.id === excludeId) {
            return false;
          }

          // Check for date overlap
          return vacation.startDate <= endDate && vacation.endDate >= startDate;
        });

        return {
          hasConflict: conflictingVacations.length > 0,
          conflictingVacations,
          message: conflictingVacations.length > 0
            ? `Found ${conflictingVacations.length} overlapping vacation(s)`
            : 'No conflicts found'
        };
      })
    );
  }

  /**
   * Refreshes the current vacation list without changing filters.
   */
  refreshVacations(): void {
    // Re-fetch with current parameters
    const currentResult = this._pagedResult();
    if (currentResult) {
      this.getVacations({
        page: currentResult.page,
        pageSize: currentResult.pageSize
      }).subscribe();
    } else {
      this.getVacations().subscribe();
    }
  }

  /**
   * Clears all vacation data and resets state.
   */
  clearVacations(): void {
    this._vacations.set([]);
    this._pagedResult.set(null);
    this._error.set(null);
  }

  /**
   * Transforms date strings to Date objects in vacation data.
   */
  private transformDates(vacation: EmployeeVacation): EmployeeVacation {
    return {
      ...vacation,
      startDate: new Date(vacation.startDate),
      endDate: new Date(vacation.endDate),
      createdAtUtc: new Date(vacation.createdAtUtc),
      modifiedAtUtc: vacation.modifiedAtUtc ? new Date(vacation.modifiedAtUtc) : undefined,
      // Transform approval history dates
      approvalHistory: vacation.approvalHistory?.map(step => ({
        ...step,
        assignedAt: new Date(step.assignedAt),
        actionAt: step.actionAt ? new Date(step.actionAt) : undefined
      }))
    };
  }

  /**
   * Applies filters to the vacation list.
   */
  applyFilters(filters: VacationFilters): void {
    const currentResult = this._pagedResult();
    this.getVacations({
      ...filters,
      page: 1, // Reset to first page when applying filters
      pageSize: currentResult?.pageSize || 20
    }).subscribe();
  }

  /**
   * Changes the page size and refreshes data.
   */
  changePageSize(newPageSize: number): void {
    this.getVacations({
      page: 1, // Reset to first page when changing page size
      pageSize: newPageSize
    }).subscribe();
  }

  /**
   * Navigates to a specific page.
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()()) {
      const currentResult = this._pagedResult();
      this.getVacations({
        page,
        pageSize: currentResult?.pageSize || 20
      }).subscribe();
    }
  }

  /**
   * Gets vacation summary statistics for dashboard/reporting.
   */
  getVacationStatistics(filters?: VacationFilters): Observable<any> {
    // This would typically be a separate API endpoint
    // For demonstration, we'll derive from current data
    return this.getVacations({ ...filters, pageSize: 1000 }).pipe(
      map(result => {
        const vacations = result.items;
        const totalVacations = vacations.length;
        const approvedVacations = vacations.filter((v: EmployeeVacation) => v.isApproved).length;
        const activeVacations = vacations.filter((v: EmployeeVacation) => v.isCurrentlyActive).length;
        const upcomingVacations = vacations.filter((v: EmployeeVacation) => v.isUpcoming).length;
        const totalDays = vacations.reduce((sum: number, v: EmployeeVacation) => sum + v.totalDays, 0);

        return {
          totalVacations,
          approvedVacations,
          pendingVacations: totalVacations - approvedVacations,
          activeVacations,
          upcomingVacations,
          totalDays,
          averageDaysPerVacation: totalVacations > 0 ? Math.round(totalDays / totalVacations * 10) / 10 : 0
        };
      })
    );
  }

  /**
   * Gets available employees for filtering
   */
  getEmployees(): Observable<Array<{id: number, name: string}>> {
    return this.http.get<Array<{id: number, name: string}>>(`${environment.apiUrl}/api/v1/employees/dropdown`).pipe(
      catchError(error => {
        this.notificationService.error('Failed to load employees');
        return throwError(() => error);
      })
    );
  }

  /**
   * Gets available vacation types for filtering
   */
  getVacationTypes(): Observable<Array<{id: number, name: string}>> {
    return this.http.get<Array<{id: number, name: string}>>(`${environment.apiUrl}/api/v1/vacation-types/dropdown`).pipe(
      catchError(error => {
        this.notificationService.error('Failed to load vacation types');
        return throwError(() => error);
      })
    );
  }

  /**
   * Gets available branches for bulk assignment
   */
  getBranches(): Observable<Array<{id: number, name: string}>> {
    return this.http.get<Array<{id: number, name: string}>>(`${environment.apiUrl}/api/v1/branches/dropdown`).pipe(
      catchError(error => {
        this.notificationService.error('Failed to load branches');
        return throwError(() => error);
      })
    );
  }

  /**
   * Gets available departments for bulk assignment
   */
  getDepartments(): Observable<Array<{id: number, name: string}>> {
    return this.http.get<Array<{id: number, name: string}>>(`${environment.apiUrl}/api/v1/departments/dropdown`).pipe(
      catchError(error => {
        this.notificationService.error('Failed to load departments');
        return throwError(() => error);
      })
    );
  }

  /**
   * Gets employee count preview for bulk assignment
   */
  getEmployeeCountPreview(request: { assignmentType: number; branchId?: number; departmentId?: number }): Observable<number> {
    let params = new HttpParams().set('assignmentType', request.assignmentType.toString());

    if (request.branchId) {
      params = params.set('branchId', request.branchId.toString());
    }

    if (request.departmentId) {
      params = params.set('departmentId', request.departmentId.toString());
    }

    return this.http.get<{ count: number }>(`${environment.apiUrl}/api/v1/employees/count-preview`, { params }).pipe(
      map(response => response.count),
      catchError(error => {
        this.notificationService.error('Failed to load employee count preview');
        return throwError(() => error);
      })
    );
  }

}