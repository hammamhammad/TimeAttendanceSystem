import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AuthService } from '../../../core/auth/auth.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { StatsCard, Activity, QuickAction } from '../models/employee-dashboard.model';

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
  readonly i18n = inject(I18nService);

  // Dashboard state from service
  dashboard = this.portalService.dashboard;
  loading = this.portalService.dashboardLoading;
  error = this.portalService.dashboardError;

  // Computed stats cards
  statsCards = this.portalService.statsCards;

  // Computed quick actions
  quickActions = this.portalService.quickActions;

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

  // Auto-refresh interval
  private refreshInterval: any;

  ngOnInit(): void {
    // Load dashboard data on init
    this.loadDashboard();

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
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
}
