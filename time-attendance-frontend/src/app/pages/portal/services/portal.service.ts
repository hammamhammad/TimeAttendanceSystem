import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map } from 'rxjs';
import { NotificationService } from '../../../core/notifications/notification.service';
import { environment } from '../../../../environments/environment';
import {
  EmployeeDashboard,
  Activity,
  QuickAction,
  StatsCard
} from '../models/employee-dashboard.model';
import {
  FingerprintRequest,
  FingerprintRequestType,
  FingerprintRequestStatus,
  CreateFingerprintRequestRequest,
  UpdateFingerprintRequestRequest,
  CompleteFingerprintRequestRequest,
  FingerprintRequestQueryParams,
  PagedResult
} from '../models/fingerprint-request.model';

/**
 * Portal Service - Manages employee self-service portal data
 * Provides dashboard, fingerprint requests, and other portal features
 * Uses Angular signals for reactive state management
 */
@Injectable({
  providedIn: 'root'
})
export class PortalService {
  private readonly portalApiUrl = `${environment.apiUrl}/api/v1/portal`;
  private readonly fingerprintApiUrl = `${environment.apiUrl}/api/v1/fingerprint-requests`;

  // ===== EMPLOYEE DASHBOARD STATE =====

  private readonly _dashboard = signal<EmployeeDashboard | null>(null);
  private readonly _dashboardLoading = signal<boolean>(false);
  private readonly _dashboardError = signal<string | null>(null);

  readonly dashboard = this._dashboard.asReadonly();
  readonly dashboardLoading = this._dashboardLoading.asReadonly();
  readonly dashboardError = this._dashboardError.asReadonly();

  // Computed signals for dashboard stats cards
  readonly statsCards = computed<StatsCard[]>(() => {
    const dash = this._dashboard();
    if (!dash) return [];

    return [
      {
        id: 'attendance',
        title: 'Attendance Rate',
        value: `${dash.attendanceRate.toFixed(1)}%`,
        subtitle: dash.attendanceTrend >= 0
          ? `+${dash.attendanceTrend.toFixed(1)}% from last month`
          : `${dash.attendanceTrend.toFixed(1)}% from last month`,
        icon: 'fa-calendar-check',
        iconColor: 'text-primary',
        trend: dash.attendanceTrend,
        trendLabel: 'vs last month',
        route: '/portal/my-attendance'
      },
      {
        id: 'working-hours',
        title: 'Working Hours',
        value: dash.totalWorkingHours.toFixed(1),
        subtitle: 'This month',
        icon: 'fa-clock',
        iconColor: 'text-success',
        route: '/portal/my-attendance'
      },
      {
        id: 'overtime',
        title: 'Overtime Hours',
        value: dash.overtimeHours.toFixed(1),
        subtitle: 'This month',
        icon: 'fa-business-time',
        iconColor: 'text-warning',
        route: '/portal/my-attendance'
      },
      {
        id: 'vacation',
        title: 'Vacation Days',
        value: dash.remainingVacationDays,
        subtitle: 'Remaining this year',
        icon: 'fa-umbrella-beach',
        iconColor: 'text-info',
        route: '/employee-vacations'
      }
    ];
  });

  // Computed quick actions
  readonly quickActions = computed<QuickAction[]>(() => {
    return [
      {
        id: 'request-vacation',
        title: 'Request Vacation',
        description: 'Submit a new vacation request',
        icon: 'fa-umbrella-beach',
        route: '/employee-vacations/new',
        color: 'primary',
        enabled: true
      },
      {
        id: 'request-excuse',
        title: 'Request Excuse',
        description: 'Submit an absence excuse',
        icon: 'fa-file-medical',
        route: '/employee-excuses/new',
        color: 'info',
        enabled: true
      },
      {
        id: 'fingerprint-request',
        title: 'Fingerprint Request',
        description: 'Request fingerprint enrollment or update',
        icon: 'fa-fingerprint',
        route: '/portal/fingerprint-requests/new',
        color: 'warning',
        enabled: true
      },
      {
        id: 'view-attendance',
        title: 'My Attendance',
        description: 'View attendance history',
        icon: 'fa-calendar-alt',
        route: '/portal/my-attendance',
        color: 'success',
        enabled: true
      }
    ];
  });

  // ===== FINGERPRINT REQUESTS STATE =====

  private readonly _fingerprintRequests = signal<FingerprintRequest[]>([]);
  private readonly _fingerprintRequestsLoading = signal<boolean>(false);
  private readonly _fingerprintRequestsError = signal<string | null>(null);
  private readonly _fingerprintRequestsPagedResult = signal<PagedResult<FingerprintRequest> | null>(null);

  readonly fingerprintRequests = this._fingerprintRequests.asReadonly();
  readonly fingerprintRequestsLoading = this._fingerprintRequestsLoading.asReadonly();
  readonly fingerprintRequestsError = this._fingerprintRequestsError.asReadonly();
  readonly fingerprintRequestsPagedResult = this._fingerprintRequestsPagedResult.asReadonly();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  // ===== EMPLOYEE DASHBOARD METHODS =====

  /**
   * Loads employee dashboard data
   */
  loadEmployeeDashboard(): Observable<EmployeeDashboard> {
    this._dashboardLoading.set(true);
    this._dashboardError.set(null);

    return this.http.get<{ isSuccess: boolean; value: EmployeeDashboard; error: string }>(
      `${this.portalApiUrl}/employee-dashboard`
    ).pipe(
      map(response => {
        if (!response.isSuccess) {
          throw new Error(response.error || 'Failed to load dashboard');
        }
        return this.transformDashboardDates(response.value);
      }),
      tap(dashboard => {
        this._dashboard.set(dashboard);
        this._dashboardLoading.set(false);
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load employee dashboard';
        this._dashboardError.set(errorMessage);
        this._dashboardLoading.set(false);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Refreshes employee dashboard data
   */
  refreshDashboard(): void {
    this.loadEmployeeDashboard().subscribe();
  }

  /**
   * Clears dashboard data
   */
  clearDashboard(): void {
    this._dashboard.set(null);
    this._dashboardError.set(null);
  }

  /**
   * Transforms date strings to Date objects in dashboard data
   */
  private transformDashboardDates(dashboard: EmployeeDashboard): EmployeeDashboard {
    return {
      ...dashboard,
      recentActivity: dashboard.recentActivity.map(activity => ({
        ...activity,
        date: new Date(activity.date)
      }))
    };
  }

  // ===== FINGERPRINT REQUESTS METHODS =====

  /**
   * Loads fingerprint requests with optional filtering
   */
  loadFingerprintRequests(params?: FingerprintRequestQueryParams): Observable<PagedResult<FingerprintRequest>> {
    this._fingerprintRequestsLoading.set(true);
    this._fingerprintRequestsError.set(null);

    let httpParams = new HttpParams();

    if (params) {
      if (params.employeeId) httpParams = httpParams.set('employeeId', params.employeeId.toString());
      if (params.status) httpParams = httpParams.set('status', params.status);
      if (params.requestType) httpParams = httpParams.set('requestType', params.requestType);
      if (params.startDate) httpParams = httpParams.set('startDate', params.startDate.toISOString());
      if (params.endDate) httpParams = httpParams.set('endDate', params.endDate.toISOString());
      if (params.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }

    return this.http.get<{ isSuccess: boolean; value: PagedResult<FingerprintRequest>; error: string }>(
      this.fingerprintApiUrl,
      { params: httpParams }
    ).pipe(
      map(response => {
        if (!response.isSuccess) {
          throw new Error(response.error || 'Failed to load fingerprint requests');
        }
        return {
          ...response.value,
          items: response.value.items.map(item => this.transformFingerprintRequestDates(item))
        };
      }),
      tap(result => {
        this._fingerprintRequests.set(result.items);
        this._fingerprintRequestsPagedResult.set(result);
        this._fingerprintRequestsLoading.set(false);
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load fingerprint requests';
        this._fingerprintRequestsError.set(errorMessage);
        this._fingerprintRequestsLoading.set(false);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Gets a specific fingerprint request by ID
   */
  getFingerprintRequestById(id: number): Observable<FingerprintRequest> {
    return this.http.get<{ isSuccess: boolean; value: FingerprintRequest; error: string }>(
      `${this.fingerprintApiUrl}/${id}`
    ).pipe(
      map(response => {
        if (!response.isSuccess) {
          throw new Error(response.error || 'Failed to load fingerprint request');
        }
        return this.transformFingerprintRequestDates(response.value);
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load fingerprint request';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Creates a new fingerprint request
   */
  createFingerprintRequest(request: CreateFingerprintRequestRequest): Observable<number> {
    this._fingerprintRequestsLoading.set(true);

    return this.http.post<{ isSuccess: boolean; value: number; error: string }>(
      this.fingerprintApiUrl,
      request
    ).pipe(
      map(response => {
        if (!response.isSuccess) {
          throw new Error(response.error || 'Failed to create fingerprint request');
        }
        return response.value;
      }),
      tap(requestId => {
        this._fingerprintRequestsLoading.set(false);
        this.notificationService.success('Fingerprint request created successfully');
        // Refresh the list if we have one
        const currentResult = this._fingerprintRequestsPagedResult();
        if (currentResult) {
          this.loadFingerprintRequests().subscribe();
        }
      }),
      catchError(error => {
        this._fingerprintRequestsLoading.set(false);
        const errorMessage = error.error?.error || error.message || 'Failed to create fingerprint request';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Updates an existing fingerprint request
   */
  updateFingerprintRequest(id: number, request: UpdateFingerprintRequestRequest): Observable<void> {
    this._fingerprintRequestsLoading.set(true);

    return this.http.put<{ isSuccess: boolean; error: string }>(
      `${this.fingerprintApiUrl}/${id}`,
      request
    ).pipe(
      map(response => {
        if (!response.isSuccess) {
          throw new Error(response.error || 'Failed to update fingerprint request');
        }
      }),
      tap(() => {
        this._fingerprintRequestsLoading.set(false);
        this.notificationService.success('Fingerprint request updated successfully');
        // Refresh the list
        const currentResult = this._fingerprintRequestsPagedResult();
        if (currentResult) {
          this.loadFingerprintRequests().subscribe();
        }
      }),
      catchError(error => {
        this._fingerprintRequestsLoading.set(false);
        const errorMessage = error.error?.error || error.message || 'Failed to update fingerprint request';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Completes a fingerprint request (admin only)
   */
  completeFingerprintRequest(id: number, request: CompleteFingerprintRequestRequest): Observable<void> {
    this._fingerprintRequestsLoading.set(true);

    return this.http.post<{ isSuccess: boolean; error: string }>(
      `${this.fingerprintApiUrl}/${id}/complete`,
      request
    ).pipe(
      map(response => {
        if (!response.isSuccess) {
          throw new Error(response.error || 'Failed to complete fingerprint request');
        }
      }),
      tap(() => {
        this._fingerprintRequestsLoading.set(false);
        this.notificationService.success('Fingerprint request completed successfully');
        // Refresh the list
        const currentResult = this._fingerprintRequestsPagedResult();
        if (currentResult) {
          this.loadFingerprintRequests().subscribe();
        }
      }),
      catchError(error => {
        this._fingerprintRequestsLoading.set(false);
        const errorMessage = error.error?.error || error.message || 'Failed to complete fingerprint request';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Cancels a fingerprint request
   */
  cancelFingerprintRequest(id: number): Observable<void> {
    this._fingerprintRequestsLoading.set(true);

    return this.http.post<{ isSuccess: boolean; error: string }>(
      `${this.fingerprintApiUrl}/${id}/cancel`,
      {}
    ).pipe(
      map(response => {
        if (!response.isSuccess) {
          throw new Error(response.error || 'Failed to cancel fingerprint request');
        }
      }),
      tap(() => {
        this._fingerprintRequestsLoading.set(false);
        this.notificationService.success('Fingerprint request cancelled successfully');
        // Refresh the list
        const currentResult = this._fingerprintRequestsPagedResult();
        if (currentResult) {
          this.loadFingerprintRequests().subscribe();
        }
      }),
      catchError(error => {
        this._fingerprintRequestsLoading.set(false);
        const errorMessage = error.error?.error || error.message || 'Failed to cancel fingerprint request';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Transforms date strings to Date objects in fingerprint request data
   */
  private transformFingerprintRequestDates(request: FingerprintRequest): FingerprintRequest {
    return {
      ...request,
      preferredDate: request.preferredDate ? new Date(request.preferredDate) : undefined,
      scheduledDate: request.scheduledDate ? new Date(request.scheduledDate) : undefined,
      completedDate: request.completedDate ? new Date(request.completedDate) : undefined,
      createdAtUtc: new Date(request.createdAtUtc),
      modifiedAtUtc: request.modifiedAtUtc ? new Date(request.modifiedAtUtc) : undefined
    };
  }

  /**
   * Clears fingerprint requests data
   */
  clearFingerprintRequests(): void {
    this._fingerprintRequests.set([]);
    this._fingerprintRequestsPagedResult.set(null);
    this._fingerprintRequestsError.set(null);
  }

  /**
   * Refreshes fingerprint requests list
   */
  refreshFingerprintRequests(): void {
    const currentResult = this._fingerprintRequestsPagedResult();
    if (currentResult) {
      this.loadFingerprintRequests({
        pageNumber: currentResult.page,
        pageSize: currentResult.pageSize
      }).subscribe();
    } else {
      this.loadFingerprintRequests().subscribe();
    }
  }

  // ===== MY ATTENDANCE METHODS (Phase 3) =====

  private readonly _myAttendance = signal<any[]>([]);
  private readonly _myAttendanceLoading = signal<boolean>(false);
  private readonly _myAttendanceError = signal<string | null>(null);

  readonly myAttendance = this._myAttendance.asReadonly();
  readonly myAttendanceLoading = this._myAttendanceLoading.asReadonly();
  readonly myAttendanceError = this._myAttendanceError.asReadonly();

  /**
   * Loads my attendance records for the current user
   */
  loadMyAttendance(params: any): Observable<any> {
    this._myAttendanceLoading.set(true);
    this._myAttendanceError.set(null);

    // Build request body for attendance report
    const requestBody = {
      startDate: params.startDate?.toISOString() || new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
      endDate: params.endDate?.toISOString() || new Date().toISOString(),
      employeeId: params.employeeId
    };

    return this.http.post<any>(
      `${environment.apiUrl}/api/v1/attendance/report`,
      requestBody
    ).pipe(
      map(response => {
        // Transform dates if needed
        return response.map((item: any) => ({
          ...item,
          date: new Date(item.date),
          checkInTime: item.checkInTime ? new Date(item.checkInTime) : null,
          checkOutTime: item.checkOutTime ? new Date(item.checkOutTime) : null
        }));
      }),
      tap(records => {
        this._myAttendance.set(records);
        this._myAttendanceLoading.set(false);
      }),
      catchError(error => {
        const errorMessage = error.error?.message || error.message || 'Failed to load attendance';
        this._myAttendanceError.set(errorMessage);
        this._myAttendanceLoading.set(false);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Clears attendance data
   */
  clearMyAttendance(): void {
    this._myAttendance.set([]);
    this._myAttendanceError.set(null);
  }

  // ===== MY PROFILE METHODS (Phase 3) =====

  private readonly _myProfile = signal<any | null>(null);
  private readonly _myProfileLoading = signal<boolean>(false);
  private readonly _myProfileError = signal<string | null>(null);

  readonly myProfile = this._myProfile.asReadonly();
  readonly myProfileLoading = this._myProfileLoading.asReadonly();
  readonly myProfileError = this._myProfileError.asReadonly();

  /**
   * Loads current user's profile
   */
  loadMyProfile(): Observable<any> {
    this._myProfileLoading.set(true);
    this._myProfileError.set(null);

    // Use the current user endpoint to get profile
    return this.http.get<{ isSuccess: boolean; value: any; error: string }>(
      `${environment.apiUrl}/api/v1/users/me`
    ).pipe(
      map(response => {
        if (!response.isSuccess && response.value) {
          return response.value;
        }
        // Handle different response formats
        return response.value || response;
      }),
      tap(profile => {
        this._myProfile.set(profile);
        this._myProfileLoading.set(false);
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load profile';
        this._myProfileError.set(errorMessage);
        this._myProfileLoading.set(false);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Updates current user's profile
   */
  updateMyProfile(request: any): Observable<void> {
    this._myProfileLoading.set(true);

    return this.http.put<{ isSuccess: boolean; error: string }>(
      `${environment.apiUrl}/api/v1/users/me`,
      request
    ).pipe(
      map(response => {
        if (response && !response.isSuccess) {
          throw new Error(response.error || 'Failed to update profile');
        }
      }),
      tap(() => {
        this._myProfileLoading.set(false);
        this.notificationService.success('Profile updated successfully');
        // Refresh profile
        this.loadMyProfile().subscribe();
      }),
      catchError(error => {
        this._myProfileLoading.set(false);
        const errorMessage = error.error?.error || error.message || 'Failed to update profile';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Clears profile data
   */
  clearMyProfile(): void {
    this._myProfile.set(null);
    this._myProfileError.set(null);
  }
}
