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

  // Employee name for welcome message
  employeeName = computed(() => {
    const dash = this.dashboard();
    return dash ? dash.employeeName : this.currentUser()?.username || 'User';
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
   * Gets activity icon class
   */
  getActivityIconClass(activity: Activity): string {
    return `fa-solid ${activity.icon} ${activity.iconColor}`;
  }

  /**
   * Gets activity status badge class
   */
  getActivityStatusClass(activity: Activity): string {
    const variantMap: Record<string, string> = {
      'success': 'badge bg-success',
      'warning': 'badge bg-warning',
      'danger': 'badge bg-danger',
      'info': 'badge bg-info',
      'secondary': 'badge bg-secondary',
      'primary': 'badge bg-primary'
    };
    return variantMap[activity.statusVariant] || 'badge bg-secondary';
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
    if (trend > 0) return 'fa-arrow-up text-success';
    if (trend < 0) return 'fa-arrow-down text-danger';
    return 'fa-minus text-secondary';
  }

  /**
   * Formats trend value
   */
  formatTrend(trend: number): string {
    const sign = trend >= 0 ? '+' : '';
    return `${sign}${trend.toFixed(1)}%`;
  }
}
