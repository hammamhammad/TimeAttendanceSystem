import { Injectable, signal, effect } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, interval, map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Comprehensive dashboard overview data structure
 */
export interface DashboardOverview {
  organization: OrganizationStatistics;
  humanResources: HumanResourcesStatistics;
  attendance: AttendanceStatistics;
  leaves: LeaveStatistics;
  shifts: ShiftStatistics;
  system: SystemStatistics;
}

/**
 * Organization structure statistics
 */
export interface OrganizationStatistics {
  totalBranches: number;
  totalDepartments: number;
  activeBranches: number;
  activeDepartments: number;
  branchSummaries: BranchSummary[];
  departmentSummaries: DepartmentSummary[];
}

/**
 * Human resources statistics
 */
export interface HumanResourcesStatistics {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  roleDistribution: RoleDistribution[];
  employmentStatusDistribution: EmploymentStatusDistribution[];
}

/**
 * Attendance overview statistics
 */
export interface AttendanceStatistics {
  todayPresent: number;
  todayAbsent: number;
  todayLate: number;
  attendanceRate: number;
  todayOvertime: number;
  weeklyTrend: DailyAttendanceTrend[];
  incompleteRecords: IncompleteAttendanceRecord[];
}

/**
 * Leave management statistics
 */
export interface LeaveStatistics {
  pendingRequests: number;
  approvedToday: number;
  onLeaveToday: number;
  rejectedToday: number;
  upcomingVacations: VacationSummary[];
  vacationTypeBreakdown: VacationTypeSummary[];
}

/**
 * Shift management statistics
 */
export interface ShiftStatistics {
  activeShifts: number;
  totalShiftAssignments: number;
  todayCoverage: number;
  unassignedShifts: number;
  shiftCoverage: ShiftCoverageSummary[];
}

/**
 * System health and activity statistics
 */
export interface SystemStatistics {
  activeSessions: number;
  lastBackup: string;
  systemUptime: string;
  recentActivities: RecentActivity[];
  todayLogins: number;
  todayApiCalls: number;
}

// Supporting interfaces
export interface BranchSummary {
  id: number;
  name: string;
  employeeCount: number;
  activeEmployees: number;
  isActive: boolean;
}

export interface DepartmentSummary {
  id: number;
  name: string;
  branchName: string;
  employeeCount: number;
  activeEmployees: number;
  isActive: boolean;
}

export interface RoleDistribution {
  roleName: string;
  userCount: number;
  percentage: number;
}

export interface EmploymentStatusDistribution {
  status: string;
  count: number;
  percentage: number;
}

export interface DailyAttendanceTrend {
  date: string;
  totalEmployees: number;
  presentEmployees: number;
  absentEmployees: number;
  lateEmployees: number;
  attendanceRate: number;
}

export interface IncompleteAttendanceRecord {
  employeeId: number;
  employeeNumber: string;
  employeeName: string;
  date: string;
  status: string;
  checkInTime?: string;
  checkOutTime?: string;
}

export interface VacationSummary {
  vacationId: number;
  employeeId: number;
  employeeNumber: string;
  employeeName: string;
  vacationType: string;
  startDate: string;
  endDate: string;
  daysCount: number;
  status: string;
}

export interface VacationTypeSummary {
  vacationType: string;
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
}

export interface ShiftCoverageSummary {
  shiftId: number;
  shiftName: string;
  timeRange: string;
  requiredEmployees: number;
  assignedEmployees: number;
  coveragePercentage: number;
}

export interface RecentActivity {
  id: number;
  activityType: string;
  description: string;
  userName: string;
  timestamp: string;
  module: string;
  action: string;
}

/**
 * Dashboard filter options
 */
export interface DashboardFilters {
  branchId?: number;
  departmentId?: number;
  refreshInterval?: number; // in seconds
}

/**
 * Service for managing comprehensive dashboard data.
 * Provides system-wide statistics with real-time updates and permission-based filtering.
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/dashboard`;

  // Signal-based state management
  private readonly _dashboardData = signal<DashboardOverview | null>(null);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _lastRefresh = signal<Date | null>(null);
  private readonly _autoRefresh = signal<boolean>(false);
  private readonly _refreshInterval = signal<number>(30); // seconds

  // Read-only signals for external consumption
  readonly dashboardData = this._dashboardData.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly lastRefresh = this._lastRefresh.asReadonly();
  readonly autoRefresh = this._autoRefresh.asReadonly();
  readonly refreshInterval = this._refreshInterval.asReadonly();

  // BehaviorSubject for reactive dashboard updates
  private dashboardSubject = new BehaviorSubject<DashboardOverview | null>(null);
  public dashboard$ = this.dashboardSubject.asObservable();

  // Auto-refresh subscription
  private refreshSubscription: any;

  constructor(private http: HttpClient) {
    // Auto-refresh will be managed manually through component methods
    // Removed effect() to prevent infinite loop issues
  }

  /**
   * Gets comprehensive dashboard overview data
   */
  getDashboardOverview(filters?: DashboardFilters): Observable<DashboardOverview> {
    this._loading.set(true);
    this._error.set(null);

    let params = new HttpParams();
    if (filters?.branchId) {
      params = params.set('branchId', filters.branchId.toString());
    }
    if (filters?.departmentId) {
      params = params.set('departmentId', filters.departmentId.toString());
    }

    return this.http.get<DashboardOverview>(`${this.apiUrl}/overview`, { params })
      .pipe(
        map(data => {
          this._dashboardData.set(data);
          this._lastRefresh.set(new Date());
          this._loading.set(false);
          this.dashboardSubject.next(data);
          return data;
        }),
        catchError(error => {
          this._error.set(error.message || 'Failed to load dashboard data');
          this._loading.set(false);
          console.error('Dashboard data loading failed:', error);
          return of({
            organization: {} as OrganizationStatistics,
            humanResources: {} as HumanResourcesStatistics,
            attendance: {} as AttendanceStatistics,
            leaves: {} as LeaveStatistics,
            shifts: {} as ShiftStatistics,
            system: {} as SystemStatistics
          } as DashboardOverview);
        })
      );
  }

  /**
   * Gets specific widget data for incremental updates
   */
  getWidgetData(widgetName: string, filters?: DashboardFilters): Observable<any> {
    let params = new HttpParams();
    if (filters?.branchId) {
      params = params.set('branchId', filters.branchId.toString());
    }
    if (filters?.departmentId) {
      params = params.set('departmentId', filters.departmentId.toString());
    }

    return this.http.get<any>(`${this.apiUrl}/widgets/${widgetName}`, { params })
      .pipe(
        catchError(error => {
          console.error(`Failed to load ${widgetName} widget data:`, error);
          return of(null);
        })
      );
  }

  /**
   * Refreshes dashboard data manually
   */
  refreshDashboard(filters?: DashboardFilters): void {
    this.getDashboardOverview(filters).subscribe();
  }

  /**
   * Starts auto-refresh functionality
   */
  startAutoRefresh(intervalSeconds?: number): void {
    if (intervalSeconds) {
      this._refreshInterval.set(intervalSeconds);
    }

    this.stopAutoRefresh(); // Stop any existing refresh

    this._autoRefresh.set(true);

    this.refreshSubscription = interval(this._refreshInterval() * 1000)
      .subscribe(() => {
        if (this._autoRefresh()) {
          this.refreshDashboard();
        }
      });
  }

  /**
   * Stops auto-refresh functionality
   */
  stopAutoRefresh(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = null;
    }
    this._autoRefresh.set(false);
  }

  /**
   * Updates refresh interval
   */
  updateRefreshInterval(seconds: number): void {
    this._refreshInterval.set(seconds);
    if (this._autoRefresh()) {
      this.startAutoRefresh(seconds);
    }
  }

  /**
   * Clears dashboard data and error state
   */
  clearData(): void {
    this._dashboardData.set(null);
    this._error.set(null);
    this._lastRefresh.set(null);
    this.dashboardSubject.next(null);
  }

  /**
   * Gets formatted time since last refresh
   */
  getTimeSinceLastRefresh(): string {
    const lastRefresh = this._lastRefresh();
    if (!lastRefresh) return 'Never';

    const now = new Date();
    const diffMs = now.getTime() - lastRefresh.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);

    if (diffSeconds < 60) {
      return `${diffSeconds} seconds ago`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else {
      const diffHours = Math.floor(diffMinutes / 60);
      return `${diffHours} hours ago`;
    }
  }

  /**
   * Checks if dashboard data is available
   */
  hasData(): boolean {
    return this._dashboardData() !== null;
  }

  /**
   * Gets current dashboard filters (if any were applied)
   */
  getCurrentFilters(): DashboardFilters {
    // This would be enhanced to store and return current filters
    return {};
  }

  /**
   * Destroys the service and cleans up subscriptions
   */
  ngOnDestroy(): void {
    this.stopAutoRefresh();
  }
}