import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AuthService } from '../../../core/auth/auth.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { StatsCard, Activity, QuickAction } from '../models/employee-dashboard.model';
import { EntitlementService } from '../../../core/services/entitlement.service';
import { environment } from '../../../../environments/environment';

interface DashboardAnnouncement {
  id: number;
  title: string;
  titleAr?: string;
  isPinned: boolean;
  requiresAcknowledgment: boolean;
  isAcknowledged: boolean;
  publishedDate: string;
}

/**
 * Employee Dashboard Component
 * Displays employee self-service dashboard with attendance stats, vacation balance, and recent activity
 */
@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit, OnDestroy {
  // Inject services
  private readonly portalService = inject(PortalService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  readonly i18n = inject(I18nService);
  readonly entitlementService = inject(EntitlementService);

  // Dashboard state from service
  dashboard = this.portalService.dashboard;
  loading = this.portalService.dashboardLoading;
  error = this.portalService.dashboardError;

  // Map stats card IDs to module entitlement names
  private readonly statsModuleMap: Record<string, string> = {
    'attendance': 'TimeAttendance',
    'working-hours': 'TimeAttendance',
    'overtime': 'TimeAttendance',
    'vacation': 'LeaveManagement'
  };

  // Map quick action IDs to module entitlement names
  private readonly actionModuleMap: Record<string, string> = {
    'request-vacation': 'LeaveManagement',
    'request-excuse': 'LeaveManagement',
    'view-attendance': 'TimeAttendance',
    'attendance-correction': 'TimeAttendance'
  };

  // Computed stats cards filtered by module entitlements
  statsCards = computed(() => {
    const cards = this.portalService.statsCards();
    return cards.filter(card => {
      const module = this.statsModuleMap[card.id];
      return !module || this.entitlementService.isModuleEnabled(module);
    });
  });

  // Computed quick actions filtered by module entitlements
  quickActions = computed(() => {
    const actions = this.portalService.quickActions();
    return actions.filter(action => {
      const module = this.actionModuleMap[action.id];
      return !module || this.entitlementService.isModuleEnabled(module);
    });
  });

  // Current user
  currentUser = computed(() => this.authService.currentUser());

  // Employee name for welcome message - prioritize dashboard data, then user's fullName, then username
  employeeName = computed(() => {
    const dash = this.dashboard();
    const user = this.currentUser();
    const isArabic = this.i18n.locale() === 'ar';

    // First priority: Dashboard employee name (if available)
    if (dash?.employeeName) {
      return dash.employeeName;
    }

    // Second priority: User's fullName (localized for Arabic)
    if (user) {
      if (isArabic && user.fullNameAr) {
        return user.fullNameAr;
      }
      if (user.fullName) {
        return user.fullName;
      }
      // Fallback to username
      return user.username;
    }

    return 'User';
  });

  // Recent activity computed from dashboard
  recentActivity = computed(() => {
    const dash = this.dashboard();
    return dash ? dash.recentActivity.slice(0, 10) : [];
  });

  // Has activity
  hasActivity = computed(() => this.recentActivity().length > 0);

  // Pending requests count
  pendingRequestsCount = computed(() => {
    const dash = this.dashboard();
    return dash ? dash.pendingRequestsCount : 0;
  });

  // Recent announcements
  recentAnnouncements = signal<DashboardAnnouncement[]>([]);

  // Auto-refresh interval
  private refreshInterval: any;

  ngOnInit(): void {
    // Load dashboard data on init
    this.loadDashboard();
    this.loadRecentAnnouncements();

    // Auto-refresh every 5 minutes
    this.refreshInterval = setInterval(() => {
      this.loadDashboard();
    }, 5 * 60 * 1000);
  }

  ngOnDestroy(): void {
    // Clear interval
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    // Clear dashboard data
    this.portalService.clearDashboard();
  }

  /**
   * Loads dashboard data
   */
  loadDashboard(): void {
    this.portalService.loadEmployeeDashboard().subscribe({
      error: (error) => {
        console.error('Failed to load dashboard:', error);
      }
    });
  }

  /**
   * Refreshes dashboard manually
   */
  refresh(): void {
    this.loadDashboard();
  }

  /**
   * Navigates to a quick action route
   */
  navigateToAction(action: QuickAction): void {
    if (action.enabled) {
      this.router.navigate([action.route]);
    }
  }

  /**
   * Navigates to stats card route
   */
  navigateToStats(card: StatsCard): void {
    if (card.route) {
      this.router.navigate([card.route]);
    }
  }

  /**
   * Navigates to activity details based on activity type
   */
  navigateToActivity(activity: Activity): void {
    if (!activity.entityId) {
      return;
    }

    const routeMap: Record<string, string> = {
      'Vacation': '/vacation-requests',
      'Excuse': '/excuse-requests',
      'RemoteWork': '/remote-work-requests',
      'Attendance': '/my-attendance'
    };

    const baseRoute = routeMap[activity.type];
    if (baseRoute) {
      // For requests, navigate to detail page with ID
      if (activity.type !== 'Attendance') {
        this.router.navigate([baseRoute, activity.entityId]);
      } else {
        // For attendance, navigate to attendance list (no detail view)
        this.router.navigate([baseRoute]);
      }
    }
  }

  /**
   * Checks if an activity is clickable (has a valid route)
   */
  isActivityClickable(activity: Activity): boolean {
    return !!activity.entityId && activity.type !== 'Attendance';
  }

  /**
   * Gets activity icon class
   */
  getActivityIconClass(activity: Activity): string {
    const variantColorMap: Record<string, string> = {
      'success': 'text-success',
      'warning': 'text-warning',
      'danger': 'text-danger',
      'info': 'text-info',
      'secondary': 'text-secondary',
      'primary': 'text-primary'
    };
    const iconColor = variantColorMap[activity.variant] || 'text-secondary';
    return `bi ${activity.icon} ${iconColor}`;
  }

  /**
   * Gets activity background class for icon wrapper
   */
  getActivityBgClass(activity: Activity): string {
    const variantBgMap: Record<string, string> = {
      'success': 'bg-success-subtle',
      'warning': 'bg-warning-subtle',
      'danger': 'bg-danger-subtle',
      'info': 'bg-info-subtle',
      'secondary': 'bg-secondary-subtle',
      'primary': 'bg-primary-subtle'
    };
    return variantBgMap[activity.variant] || 'bg-secondary-subtle';
  }

  /**
   * Gets activity badge class
   */
  getActivityBadgeClass(activity: Activity): string {
    const variantMap: Record<string, string> = {
      'success': 'badge bg-success',
      'warning': 'badge bg-warning',
      'danger': 'badge bg-danger',
      'info': 'badge bg-info',
      'secondary': 'badge bg-secondary',
      'primary': 'badge bg-primary'
    };
    return variantMap[activity.variant] || 'badge bg-secondary';
  }

  /**
   * Gets localized activity type label
   */
  getActivityType(type: string): string {
    const typeMap: Record<string, string> = {
      'Attendance': this.i18n.t('portal.activity.attendance'),
      'Vacation': this.i18n.t('portal.activity.vacation'),
      'Excuse': this.i18n.t('portal.activity.excuse'),
      'RemoteWork': this.i18n.t('portal.activity.remote_work')
    };
    return typeMap[type] || type;
  }

  /**
   * Gets localized activity description built from structured data
   */
  getLocalizedDescription(activity: Activity): string {
    // Fall back to original description if structured data is not available
    if (!activity.startDate && activity.type !== 'Attendance') {
      return activity.description;
    }

    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    const dateOpts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const shortDateOpts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

    const statusLabel = activity.statusLabel
      ? this.getLocalizedStatus(activity.statusLabel)
      : this.getActivityVariantLabel(activity.variant, activity.type);

    switch (activity.type) {
      case 'Attendance': {
        if (!activity.startDate) return activity.description;
        const date = new Date(activity.startDate).toLocaleDateString(locale, dateOpts);
        const hours = activity.workingHours?.toFixed(1) ?? '0.0';
        return this.i18n.t('portal.activity_attended', { date, hours });
      }
      case 'Vacation': {
        const start = new Date(activity.startDate!).toLocaleDateString(locale, shortDateOpts);
        const end = activity.endDate
          ? new Date(activity.endDate).toLocaleDateString(locale, shortDateOpts)
          : start;
        return this.i18n.t('portal.activity_vacation', { start, end, status: statusLabel });
      }
      case 'Excuse': {
        const date = new Date(activity.startDate!).toLocaleDateString(locale, shortDateOpts);
        return this.i18n.t('portal.activity_excuse', { date, status: statusLabel });
      }
      case 'RemoteWork': {
        const start = new Date(activity.startDate!).toLocaleDateString(locale, shortDateOpts);
        const end = activity.endDate
          ? new Date(activity.endDate).toLocaleDateString(locale, shortDateOpts)
          : start;
        return this.i18n.t('portal.activity_remote_work', { start, end, status: statusLabel });
      }
      default:
        return activity.description;
    }
  }

  /**
   * Gets localized status label from English status string
   */
  private getLocalizedStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'Approved': this.i18n.t('common.approved'),
      'Pending': this.i18n.t('common.pending'),
      'Rejected': this.i18n.t('common.rejected'),
      'Cancelled': this.i18n.t('common.cancelled'),
      'Present': this.i18n.t('attendance.status.present'),
      'Absent': this.i18n.t('attendance.status.absent'),
      'Late': this.i18n.t('attendance.status.late'),
      'OnLeave': this.i18n.t('attendance.status.on_leave')
    };
    return statusMap[status] || status;
  }

  /**
   * Gets localized variant label (status) based on activity type and variant
   */
  getActivityVariantLabel(variant: string, activityType?: string): string {
    // For attendance, use attendance-specific status labels
    if (activityType === 'Attendance') {
      const attendanceStatusMap: Record<string, string> = {
        'success': this.i18n.t('attendance.status.present'),
        'warning': this.i18n.t('attendance.status.late'),
        'danger': this.i18n.t('attendance.status.absent'),
        'info': this.i18n.t('attendance.status.on_leave'),
        'secondary': this.i18n.t('common.completed'),
        'primary': this.i18n.t('common.active')
      };
      return attendanceStatusMap[variant] || variant;
    }

    // For other activity types (Vacation, Excuse, RemoteWork), use approval status labels
    const variantLabelMap: Record<string, string> = {
      'success': this.i18n.t('common.approved'),
      'warning': this.i18n.t('common.pending'),
      'danger': this.i18n.t('common.rejected'),
      'info': this.i18n.t('common.info'),
      'secondary': this.i18n.t('common.completed'),
      'primary': this.i18n.t('common.active')
    };
    return variantLabelMap[variant] || variant;
  }

  /**
   * Formats date for display
   */
  formatDate(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset times for comparison
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const compareToday = new Date(today);
    compareToday.setHours(0, 0, 0, 0);
    const compareYesterday = new Date(yesterday);
    compareYesterday.setHours(0, 0, 0, 0);

    if (compareDate.getTime() === compareToday.getTime()) {
      return this.i18n.t('common.today');
    } else if (compareDate.getTime() === compareYesterday.getTime()) {
      return this.i18n.t('common.yesterday');
    } else {
      const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
      return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }

  /**
   * Gets trend icon
   */
  getTrendIcon(trend: number): string {
    if (trend > 0) return 'bi-arrow-up text-success';
    if (trend < 0) return 'bi-arrow-down text-danger';
    return 'bi-dash text-secondary';
  }

  /**
   * Formats trend value
   */
  formatTrend(trend: number): string {
    const sign = trend >= 0 ? '+' : '';
    return `${sign}${trend.toFixed(1)}%`;
  }

  /**
   * Loads recent announcements for the dashboard widget
   */
  loadRecentAnnouncements(): void {
    this.http.get<{ data: DashboardAnnouncement[]; totalCount: number }>(
      `${environment.apiUrl}/api/v1/portal/announcements`
    ).subscribe({
      next: (res) => {
        const items = res.data || [];
        // Sort pinned first, then by date, take first 3
        const sorted = items.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        });
        this.recentAnnouncements.set(sorted.slice(0, 3));
      },
      error: () => {
        // Silently fail - announcements widget is non-critical
        this.recentAnnouncements.set([]);
      }
    });
  }

  /**
   * Formats announcement date string for display
   */
  formatAnnouncementDate(dateStr: string): string {
    if (!dateStr) return '-';
    return this.formatDate(new Date(dateStr));
  }

  /**
   * Gets localized announcement title
   */
  getAnnouncementTitle(ann: DashboardAnnouncement): string {
    if (this.i18n.locale() === 'ar' && ann.titleAr) return ann.titleAr;
    return ann.title;
  }

  /**
   * Navigates to announcement detail
   */
  navigateToAnnouncement(id: number): void {
    this.router.navigate(['/announcements', id]);
  }
}
