import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map, of } from 'rxjs';
import { NotificationService } from '../../../core/notifications/notification.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { environment } from '../../../../environments/environment';
import {
  EmployeeDashboard,
  Activity,
  QuickAction,
  StatsCard
} from '../models/employee-dashboard.model';

/**
 * Portal Service - Manages employee self-service portal data
 * Provides dashboard and other portal features
 * Uses Angular signals for reactive state management
 */
@Injectable({
  providedIn: 'root'
})
export class PortalService {
  private readonly portalApiUrl = `${environment.apiUrl}/api/v1/portal`;

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

    const fromLastMonth = this.i18n.t('portal.stats_from_last_month');
    const trendSubtitle = attendanceTrend >= 0
      ? `+${attendanceTrend.toFixed(1)}% ${fromLastMonth}`
      : `${attendanceTrend.toFixed(1)}% ${fromLastMonth}`;

    return [
      {
        id: 'attendance',
        title: this.i18n.t('portal.stats_attendance_rate'),
        value: `${attendanceRate.toFixed(1)}%`,
        subtitle: trendSubtitle,
        icon: 'bi-calendar-check',
        iconColor: 'text-primary',
        trend: attendanceTrend,
        trendLabel: fromLastMonth,
        route: '/my-attendance'
      },
      {
        id: 'working-hours',
        title: this.i18n.t('portal.working_hours'),
        value: totalWorkingHours.toFixed(1),
        subtitle: this.i18n.t('portal.this_month'),
        icon: 'bi-clock',
        iconColor: 'text-success',
        route: '/my-attendance'
      },
      {
        id: 'overtime',
        title: this.i18n.t('portal.overtime_hours'),
        value: totalOvertimeHours.toFixed(1),
        subtitle: this.i18n.t('portal.this_month'),
        icon: 'bi-hourglass-split',
        iconColor: 'text-warning',
        route: '/my-attendance'
      },
      {
        id: 'vacation',
        title: this.i18n.t('portal.stats_vacation_days'),
        value: remainingVacationDays,
        subtitle: this.i18n.t('portal.stats_remaining_this_year'),
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
        title: this.i18n.t('portal.request_vacation'),
        description: this.i18n.t('portal.quick_submit_vacation'),
        icon: 'bi-sun',
        route: '/vacation-requests/new',
        color: 'primary',
        enabled: true
      },
      {
        id: 'request-excuse',
        title: this.i18n.t('portal.request_excuse'),
        description: this.i18n.t('portal.quick_submit_excuse'),
        icon: 'bi-file-medical',
        route: '/excuse-requests/new',
        color: 'info',
        enabled: true
      },
      {
        id: 'view-attendance',
        title: this.i18n.t('portal.my_attendance'),
        description: this.i18n.t('portal.quick_view_attendance'),
        icon: 'bi-calendar3',
        route: '/my-attendance',
        color: 'success',
        enabled: true
      },
      {
        id: 'attendance-correction',
        title: this.i18n.t('portal.quick_attendance_correction'),
        description: this.i18n.t('portal.quick_correction_desc'),
        icon: 'bi-clock-history',
        route: '/attendance-corrections/new',
        color: 'warning',
        enabled: true
      }
    ];
  });

  private i18n = inject(I18nService);

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
        timestamp: new Date(activity.timestamp),
        startDate: activity.startDate ? new Date(activity.startDate) : undefined,
        endDate: activity.endDate ? new Date(activity.endDate) : undefined
      }))
    };
  }

  // ===== MY ATTENDANCE METHODS =====

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
          throw new Error(response.error || this.i18n.t('portal.profile_update_failed'));
        }
      }),
      tap(() => {
        this._myProfileLoading.set(false);
        this.notificationService.success(this.i18n.t('portal.profile_updated_success'));
        // Refresh profile
        this.loadMyProfile().subscribe();
      }),
      catchError(error => {
        this._myProfileLoading.set(false);
        const errorMessage = error.error?.error || error.message || this.i18n.t('portal.profile_update_failed');
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
        this.notificationService.success(this.i18n.t('portal.approval_success'));
        // Refresh pending approvals
        this.loadPendingApprovals().subscribe();
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || this.i18n.t('portal.approval_failed');
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
        this.notificationService.success(this.i18n.t('portal.rejection_success'));
        // Refresh pending approvals
        this.loadPendingApprovals().subscribe();
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || this.i18n.t('portal.rejection_failed');
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
        this.notificationService.success(this.i18n.t('portal.delegation_success'));
        // Refresh pending approvals
        this.loadPendingApprovals().subscribe();
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || this.i18n.t('portal.delegation_error');
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

  /**
   * Gets workflow instance details by ID.
   * Used to redirect from old notification URLs with workflowId to proper entity pages.
   */
  getWorkflowInstance(workflowInstanceId: number): Observable<WorkflowInstanceDto> {
    return this.http.get<WorkflowInstanceDto>(
      `${environment.apiUrl}/api/v1/workflows/instances/${workflowInstanceId}`
    );
  }

  // ===== REMOTE WORK APPROVAL =====

  /**
   * Gets a remote work request for approval (manager view).
   * Includes workflow status and approval history.
   */
  getRemoteWorkForApproval(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.portalApiUrl}/approval-remote-work/${id}`
    ).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load remote work request';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  // ===== DELEGATION EMPLOYEE SEARCH =====

  /**
   * Search employees for delegation purposes.
   * Uses the dedicated delegation-employees endpoint to search ALL employees with user accounts.
   */
  searchEmployeesForDelegation(searchTerm: string): Observable<DelegationEmployee[]> {
    let params = new HttpParams();
    params = params.set('searchTerm', searchTerm);
    params = params.set('pageSize', '20');

    return this.http.get<any[]>(
      `${this.portalApiUrl}/delegation-employees`,
      { params }
    ).pipe(
      map(response => {
        // Backend returns array of DelegationEmployeeDto directly
        if (!response || !Array.isArray(response)) {
          return [];
        }

        return response.map((emp: any) => ({
          id: emp.employeeId,
          userId: emp.userId,
          fullName: emp.fullName,
          fullNameAr: emp.fullNameAr,
          jobTitle: emp.jobTitle,
          departmentName: emp.departmentName,
          email: emp.email
        }));
      }),
      catchError(error => {
        console.error('Error searching employees for delegation:', error);
        return of([]);
      })
    );
  }

  // ===== MY ALLOWANCES METHODS =====

  /**
   * Loads active allowances for the current employee
   */
  getMyAllowances(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.portalApiUrl}/my-allowances`
    ).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load allowances';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Loads allowance summary (total) for the current employee
   */
  getMyAllowanceSummary(): Observable<any> {
    return this.http.get<any>(
      `${this.portalApiUrl}/my-allowances/summary`
    ).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load allowance summary';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  // ===== MY PAYSLIPS METHODS =====

  /**
   * Loads payslips for the current employee
   */
  getMyPayslips(year?: number): Observable<any[]> {
    let params = new HttpParams();
    if (year) {
      params = params.set('year', year.toString());
    }

    return this.http.get<any>(
      `${this.portalApiUrl}/my-payslips`,
      { params }
    ).pipe(
      map(response => {
        // Backend returns { isSuccess, value: { items: [...], totalCount } }
        const val = response?.value ?? response;
        if (val?.items) return val.items;
        if (Array.isArray(val)) return val;
        return [];
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load payslips';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Downloads a payslip PDF
   */
  downloadPayslipPdf(payslipId: number): Observable<Blob> {
    return this.http.get(
      `${this.portalApiUrl}/my-payslips/${payslipId}/download`,
      { responseType: 'blob' }
    ).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to download payslip';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  // ===== MY SALARY METHODS =====

  /**
   * Loads current salary breakdown for the current employee
   */
  getMyCurrentSalary(): Observable<any> {
    return this.http.get<any>(
      `${this.portalApiUrl}/my-salary`
    ).pipe(
      map(response => {
        // Backend returns { isSuccess, value: { baseSalary, currency, components, ... } }
        return response?.value ?? response;
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load salary';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  // ===== MY RESIGNATION METHODS =====

  /**
   * Loads current resignation request for the employee (if any)
   */
  getMyResignation(): Observable<any> {
    return this.http.get<any>(
      `${this.portalApiUrl}/my-resignation`
    ).pipe(
      map(response => {
        // Backend returns { isSuccess, value: [array] }
        const val = response?.value ?? response;
        if (Array.isArray(val)) return val.length > 0 ? val[0] : null;
        return val;
      }),
      catchError(error => {
        // 404 means no resignation found - propagate the error so component handles it
        return throwError(() => error);
      })
    );
  }

  /**
   * Submits a new resignation request
   */
  submitResignation(data: { resignationDate: string; lastWorkingDate: string; reason: string }): Observable<any> {
    return this.http.post<{ isSuccess: boolean; value: any; error: string }>(
      `${this.portalApiUrl}/my-resignation`,
      data
    ).pipe(
      map(response => {
        if (!response.isSuccess && response.value) {
          return response.value;
        }
        return response.value || response;
      }),
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to submit resignation';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  /**
   * Withdraws a pending resignation request
   */
  withdrawResignation(id: number): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}/api/v1/resignation-requests/${id}/withdraw`,
      {}
    ).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to withdraw resignation';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  // ===== MY BENEFITS METHODS =====

  getMyBenefits(): Observable<any> {
    return this.http.get<any>(`${this.portalApiUrl}/my-benefits`).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load benefits';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  getAvailableBenefitPlans(): Observable<any> {
    return this.http.get<any>(`${this.portalApiUrl}/my-benefits/available-plans`).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  enrollInBenefitPlan(data: any): Observable<any> {
    return this.http.post<any>(`${this.portalApiUrl}/my-benefits/enroll`, data).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to enroll';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  cancelMyEnrollment(id: number): Observable<any> {
    return this.http.post<any>(`${this.portalApiUrl}/my-benefits/enrollments/${id}/cancel`, {}).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to cancel enrollment';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  getMyBenefitDependents(): Observable<any> {
    return this.http.get<any>(`${this.portalApiUrl}/my-benefits/dependents`).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  addMyBenefitDependent(data: any): Observable<any> {
    return this.http.post<any>(`${this.portalApiUrl}/my-benefits/dependents`, data).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to add dependent';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  removeMyBenefitDependent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.portalApiUrl}/my-benefits/dependents/${id}`).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to remove dependent';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  getMyBenefitClaims(): Observable<any> {
    return this.http.get<any>(`${this.portalApiUrl}/my-benefits/claims`).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  createMyBenefitClaim(data: any): Observable<any> {
    return this.http.post<any>(`${this.portalApiUrl}/my-benefits/claims`, data).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to submit claim';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  // ===== SHIFT SWAP REQUESTS METHODS =====

  getMyShiftSwapRequests(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/shift-swap-requests`, { params: { page: '1', pageSize: '50' } }).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load shift swap requests';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  createShiftSwapRequest(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/shift-swap-requests`, data).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to create shift swap request';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  getShiftSwapRequestById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/shift-swap-requests/${id}`).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load shift swap request';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  partnerApproveShiftSwap(id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/shift-swap-requests/${id}/partner-approve`, {}).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to approve shift swap';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  partnerRejectShiftSwap(id: number, reason: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/shift-swap-requests/${id}/partner-reject`, { rejectionReason: reason }).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to reject shift swap';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  cancelShiftSwapRequest(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/v1/shift-swap-requests/${id}`).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to cancel shift swap request';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  // ===== MY ON-CALL METHODS =====

  getMyOnCallSchedules(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/on-call-schedules`, { params: { isActive: 'true', page: '1', pageSize: '50' } }).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load on-call schedules';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  // ===== COMPENSATORY OFFS METHODS =====

  getMyCompensatoryOffs(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/compensatory-offs`, { params: { page: '1', pageSize: '50' } }).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load compensatory offs';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  // ===== LEAVE ENCASHMENTS METHODS =====

  getMyLeaveEncashments(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/leave-encashments`, { params: { page: '1', pageSize: '50' } }).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load leave encashments';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  getEligibleLeaveEncashment(employeeId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/v1/leave-encashments/employee/${employeeId}/eligible`).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to load eligible leave encashment';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }

  createLeaveEncashment(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/leave-encashments`, data).pipe(
      catchError(error => {
        const errorMessage = error.error?.error || error.message || 'Failed to create leave encashment';
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }
}

/**
 * DTO for delegation employee search results
 */
export interface DelegationEmployee {
  id: number;
  userId: number;
  fullName: string;
  fullNameAr?: string;
  jobTitle?: string;
  departmentName?: string;
  email?: string;
}

/**
 * DTO for workflow instance details
 */
export interface WorkflowInstanceDto {
  id: number;
  workflowDefinitionId: number;
  workflowName: string;
  entityType: string;
  entityTypeName: string;
  entityId: number;
  status: number;
  statusName: string;
  requestedByUserId: number;
  requestedByUserName: string;
  requestedAt: string;
  completedAt?: string;
  currentStepOrder: number;
  currentStepName: string;
  totalSteps: number;
}
