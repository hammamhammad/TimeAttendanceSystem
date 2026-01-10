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

    // Safely get numeric values with defaults
    const attendanceRate = dash.attendanceRate ?? 0;
    const attendanceTrend = dash.attendanceTrend ?? 0;
    const totalWorkingHours = dash.totalWorkingHours ?? 0;
    const totalOvertimeHours = dash.totalOvertimeHours ?? 0;
    const remainingVacationDays = dash.remainingVacationDays ?? 0;

    return [
      {
        id: 'attendance',
        title: 'Attendance Rate',
        value: `${attendanceRate.toFixed(1)}%`,
        subtitle: attendanceTrend >= 0
          ? `+${attendanceTrend.toFixed(1)}% from last month`
          : `${attendanceTrend.toFixed(1)}% from last month`,
        icon: 'bi-calendar-check',
        iconColor: 'text-primary',
        trend: attendanceTrend,
        trendLabel: 'vs last month',
        route: '/my-attendance'
      },
      {
        id: 'working-hours',
        title: 'Working Hours',
        value: totalWorkingHours.toFixed(1),
        subtitle: 'This month',
        icon: 'bi-clock',
        iconColor: 'text-success',
        route: '/my-attendance'
      },
      {
        id: 'overtime',
        title: 'Overtime Hours',
        value: totalOvertimeHours.toFixed(1),
        subtitle: 'This month',
        icon: 'bi-hourglass-split',
        iconColor: 'text-warning',
        route: '/my-attendance'
      },
      {
        id: 'vacation',
        title: 'Vacation Days',
        value: remainingVacationDays,
        subtitle: 'Remaining this year',
        icon: 'bi-sun',
        iconColor: 'text-info',
        route: '/vacation-requests'
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
        icon: 'bi-sun',
        route: '/vacation-requests/new',
        color: 'primary',
        enabled: true
      },
      {
        id: 'request-excuse',
        title: 'Request Excuse',
        description: 'Submit an absence excuse',
        icon: 'bi-file-medical',
        route: '/excuse-requests/new',
        color: 'info',
        enabled: true
      },
      {
        id: 'fingerprint-request',
        title: 'Fingerprint Request',
        description: 'Request fingerprint enrollment or update',
        icon: 'bi-fingerprint',
        route: '/fingerprint-requests/new',
        color: 'warning',
        enabled: true
      },
      {
        id: 'view-attendance',
        title: 'My Attendance',
        description: 'View attendance history',
        icon: 'bi-calendar3',
        route: '/my-attendance',
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
      recentActivity: (dashboard.recentActivity || []).map(activity => ({
        ...activity,
        timestamp: new Date(activity.timestamp)
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

    // Build query params for the portal my-attendance endpoint
    let httpParams = new HttpParams();
    if (params.startDate) {
      httpParams = httpParams.set('startDate', params.startDate.toISOString());
    }
    if (params.endDate) {
      httpParams = httpParams.set('endDate', params.endDate.toISOString());
    }

    return this.http.get<{ isSuccess: boolean; value: any[]; error: string }>(
      `${this.portalApiUrl}/my-attendance`,
      { params: httpParams }
    ).pipe(
      map(response => {
        if (!response.isSuccess) {
          throw new Error(response.error || 'Failed to load attendance');
        }
        // Transform dates if needed
        return response.value.map((item: any) => ({
          ...item,
          date: new Date(item.date),
          actualCheckInTime: item.actualCheckInTime ? new Date(item.actualCheckInTime) : null,
          actualCheckOutTime: item.actualCheckOutTime ? new Date(item.actualCheckOutTime) : null
        }));
      }),
      tap(records => {
        this._myAttendance.set(records);
        this._myAttendanceLoading.set(false);
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load attendance';
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

    // Use the portal my-profile endpoint
    return this.http.get<{ isSuccess: boolean; value: any; error: string }>(
      `${this.portalApiUrl}/my-profile`
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
      `${this.portalApiUrl}/my-profile`,
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

  // ===== MANAGER DASHBOARD METHODS =====

  private readonly _managerDashboard = signal<any | null>(null);
  private readonly _managerDashboardLoading = signal<boolean>(false);
  private readonly _managerDashboardError = signal<string | null>(null);

  readonly managerDashboard = this._managerDashboard.asReadonly();
  readonly managerDashboardLoading = this._managerDashboardLoading.asReadonly();
  readonly managerDashboardError = this._managerDashboardError.asReadonly();

  /**
   * Loads manager dashboard data
   */
  loadManagerDashboard(): Observable<any> {
    this._managerDashboardLoading.set(true);
    this._managerDashboardError.set(null);

    return this.http.get<{ isSuccess: boolean; value: any; error: string }>(
      `${this.portalApiUrl}/manager-dashboard`
    ).pipe(
      map(response => {
        if (!response.isSuccess) {
          throw new Error(response.error || 'Failed to load manager dashboard');
        }
        return response.value;
      }),
      tap(dashboard => {
        this._managerDashboard.set(dashboard);
        this._managerDashboardLoading.set(false);
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load manager dashboard';
        this._managerDashboardError.set(errorMessage);
        this._managerDashboardLoading.set(false);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Clears manager dashboard data
   */
  clearManagerDashboard(): void {
    this._managerDashboard.set(null);
    this._managerDashboardError.set(null);
  }

  // ===== TEAM MEMBERS METHODS =====

  private readonly _teamMembers = signal<any[]>([]);
  private readonly _teamMembersLoading = signal<boolean>(false);
  private readonly _teamMembersError = signal<string | null>(null);

  readonly teamMembers = this._teamMembers.asReadonly();
  readonly teamMembersLoading = this._teamMembersLoading.asReadonly();
  readonly teamMembersError = this._teamMembersError.asReadonly();

  /**
   * Loads team members (full hierarchy)
   */
  loadTeamMembers(includeIndirectReports: boolean = true): Observable<any[]> {
    this._teamMembersLoading.set(true);
    this._teamMembersError.set(null);

    let params = new HttpParams();
    params = params.set('includeIndirectReports', includeIndirectReports.toString());

    return this.http.get<{ isSuccess: boolean; value: any[]; error: string }>(
      `${this.portalApiUrl}/team-members`,
      { params }
    ).pipe(
      map(response => {
        if (!response.isSuccess) {
          throw new Error(response.error || 'Failed to load team members');
        }
        return response.value;
      }),
      tap(members => {
        this._teamMembers.set(members);
        this._teamMembersLoading.set(false);
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load team members';
        this._teamMembersError.set(errorMessage);
        this._teamMembersLoading.set(false);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Clears team members data
   */
  clearTeamMembers(): void {
    this._teamMembers.set([]);
    this._teamMembersError.set(null);
  }

  // ===== PENDING APPROVALS METHODS =====

  private readonly _pendingApprovals = signal<any[]>([]);
  private readonly _pendingApprovalsLoading = signal<boolean>(false);
  private readonly _pendingApprovalsError = signal<string | null>(null);

  readonly pendingApprovals = this._pendingApprovals.asReadonly();
  readonly pendingApprovalsLoading = this._pendingApprovalsLoading.asReadonly();
  readonly pendingApprovalsError = this._pendingApprovalsError.asReadonly();

  /**
   * Loads pending approvals for the current manager
   */
  loadPendingApprovals(entityType?: string): Observable<any[]> {
    this._pendingApprovalsLoading.set(true);
    this._pendingApprovalsError.set(null);

    let params = new HttpParams();
    if (entityType) {
      params = params.set('entityType', entityType);
    }

    return this.http.get<{ isSuccess: boolean; value: any[]; error: string }>(
      `${this.portalApiUrl}/pending-approvals`,
      { params }
    ).pipe(
      map(response => {
        if (!response.isSuccess) {
          throw new Error(response.error || 'Failed to load pending approvals');
        }
        return response.value.map((item: any) => ({
          ...item,
          // Use entityTypeName (string) from backend instead of entityType (number)
          entityType: item.entityTypeName || item.entityType,
          requestedAt: new Date(item.requestedAt),
          dueAt: item.dueAt ? new Date(item.dueAt) : undefined
        }));
      }),
      tap(approvals => {
        this._pendingApprovals.set(approvals);
        this._pendingApprovalsLoading.set(false);
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load pending approvals';
        this._pendingApprovalsError.set(errorMessage);
        this._pendingApprovalsLoading.set(false);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Approves a workflow step
   */
  approveWorkflowStep(workflowInstanceId: number, comments?: string): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}/api/v1/approvals/${workflowInstanceId}/approve`,
      { comments }
    ).pipe(
      tap(() => {
        this.notificationService.success('Request approved successfully');
        // Refresh pending approvals
        this.loadPendingApprovals().subscribe();
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to approve request';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Rejects a workflow step
   */
  rejectWorkflowStep(workflowInstanceId: number, comments?: string): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}/api/v1/approvals/${workflowInstanceId}/reject`,
      { comments }
    ).pipe(
      tap(() => {
        this.notificationService.success('Request rejected successfully');
        // Refresh pending approvals
        this.loadPendingApprovals().subscribe();
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to reject request';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Delegates a workflow step to another user
   */
  delegateWorkflowStep(workflowInstanceId: number, delegateToUserId: number, comments?: string): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}/api/v1/approvals/${workflowInstanceId}/delegate`,
      { delegateToUserId, comments }
    ).pipe(
      tap(() => {
        this.notificationService.success('Request delegated successfully');
        // Refresh pending approvals
        this.loadPendingApprovals().subscribe();
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to delegate request';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Clears pending approvals data
   */
  clearPendingApprovals(): void {
    this._pendingApprovals.set([]);
    this._pendingApprovalsError.set(null);
  }
}
