import { Component, signal, computed, OnInit, OnDestroy, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { DashboardService, DashboardOverview, DashboardFilters } from './dashboard.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { StatsGridComponent, StatGridItem } from '../../shared/components/stats-grid/stats-grid.component';

interface DashboardCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  module: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent, StatsGridComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser = computed(() => this.authService.currentUser());

  // Dashboard state - will be initialized in ngOnInit
  dashboardData!: any;
  loading!: any;
  error!: any;
  lastRefresh!: any;
  autoRefresh!: any;

  // Dashboard cards computed from API data
  dashboardCards = computed(() => {
    const data = this.dashboardData();
    if (!data) return [];

    return [
      {
        title: this.t('dashboard.total_employees'),
        value: data.humanResources?.totalEmployees || 0,
        icon: 'fa-solid fa-users',
        color: 'primary',
        change: this.calculateChange(data.humanResources?.activeEmployees, data.humanResources?.totalEmployees),
        trend: 'up' as const,
        module: 'humanResources'
      },
      {
        title: this.t('dashboard.today_attendance'),
        value: data.attendance?.todayPresent || 0,
        icon: 'fa-solid fa-calendar-check',
        color: 'success',
        change: data.attendance?.attendanceRate || 0,
        trend: (data.attendance?.attendanceRate || 0) >= 90 ? 'up' as const : 'down' as const,
        module: 'attendance'
      },
      {
        title: this.t('dashboard.pending_vacations'),
        value: data.leaves?.pendingRequests || 0,
        icon: 'fa-solid fa-calendar-times',
        color: 'warning',
        trend: 'stable' as const,
        module: 'leaves'
      },
      {
        title: this.t('dashboard.active_shifts'),
        value: data.shifts?.activeShifts || 0,
        icon: 'fa-solid fa-clock',
        color: 'info',
        trend: 'stable' as const,
        module: 'shifts'
      },
      {
        title: this.t('dashboard.total_branches'),
        value: data.organization?.totalBranches || 0,
        icon: 'fa-solid fa-code-branch',
        color: 'secondary',
        trend: 'stable' as const,
        module: 'organization'
      },
      {
        title: this.t('dashboard.active_users'),
        value: data.humanResources?.activeUsers || 0,
        icon: 'fa-solid fa-user-check',
        color: 'primary',
        trend: 'up' as const,
        module: 'humanResources'
      },
      {
        title: this.t('dashboard.today_late'),
        value: data.attendance?.todayLate || 0,
        icon: 'fa-solid fa-exclamation-triangle',
        color: 'danger',
        trend: (data.attendance?.todayLate || 0) > 5 ? 'up' as const : 'down' as const,
        module: 'attendance'
      },
      {
        title: this.t('dashboard.active_sessions'),
        value: data.system?.activeSessions || 0,
        icon: 'fa-solid fa-wifi',
        color: 'info',
        trend: 'stable' as const,
        module: 'system'
      }
    ];
  });

  // Transform dashboard cards to StatGridItems for StatsGridComponent
  dashboardStats = computed<StatGridItem[]>(() => {
    const cards = this.dashboardCards();
    return cards.map(card => ({
      label: card.title,
      value: card.value,
      icon: card.icon,
      variant: this.mapColorToVariant(card.color),
      change: card.change !== undefined ? {
        value: Math.abs(card.change),
        type: card.trend === 'up' ? 'increase' as const : card.trend === 'down' ? 'decrease' as const : 'neutral' as const,
        isPercentage: card.module === 'attendance'
      } : undefined
    }));
  });

  // Filter state
  filters = signal<DashboardFilters>({});
  availableBranches = signal<any[]>([]);
  availableDepartments = signal<any[]>([]);

  // Widget visibility based on user permissions
  showOrganizationWidget = computed(() => this.hasPermission('branch.read') || this.hasPermission('department.read'));
  showHumanResourcesWidget = computed(() => this.hasPermission('user.read') || this.hasPermission('employee.read'));
  showAttendanceWidget = computed(() => this.hasPermission('attendance.read'));
  showVacationWidget = computed(() => this.hasPermission('vacation.read'));
  showShiftWidget = computed(() => this.hasPermission('shift.read'));
  showSystemWidget = computed(() => this.isSystemAdmin());

  // Auto-refresh options
  refreshIntervals = [
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' },
    { value: 900, label: '15 minutes' }
  ];

  constructor(
    private authService: AuthService,
    public i18n: I18nService,
    public dashboardService: DashboardService,
    private notificationService: NotificationService
  ) {
    this.setupErrorHandling();
  }

  ngOnInit(): void {
    // Initialize dashboard state signals
    this.dashboardData = this.dashboardService.dashboardData;
    this.loading = this.dashboardService.loading;
    this.error = this.dashboardService.error;
    this.lastRefresh = this.dashboardService.lastRefresh;
    this.autoRefresh = this.dashboardService.autoRefresh;

    this.loadDashboardData();
    this.loadFilterOptions();
  }

  ngOnDestroy(): void {
    this.dashboardService.stopAutoRefresh();
  }

  /**
   * Loads dashboard data with current filters
   */
  loadDashboardData(): void {
    const filters = this.filters();
    this.dashboardService.getDashboardOverview(filters).subscribe({
      next: (data) => {
        // Update available options based on loaded data
        if (data.organization?.branchSummaries) {
          this.availableBranches.set(data.organization.branchSummaries);
        }
        if (data.organization?.departmentSummaries) {
          this.availableDepartments.set(data.organization.departmentSummaries);
        }
      },
      error: (error) => {
        this.notificationService.error(this.t('dashboard.load_error'));
        console.error('Dashboard load failed:', error);
      }
    });
  }

  /**
   * Refreshes dashboard data manually
   */
  refreshData(): void {
    this.dashboardService.refreshDashboard(this.filters());
    this.notificationService.success(this.t('dashboard.refreshed'));
  }

  /**
   * Updates dashboard filters
   */
  updateFilters(newFilters: Partial<DashboardFilters>): void {
    this.filters.update(current => ({ ...current, ...newFilters }));
    this.loadDashboardData();
  }

  /**
   * Toggles auto-refresh functionality
   */
  toggleAutoRefresh(): void {
    if (this.autoRefresh()) {
      this.dashboardService.stopAutoRefresh();
      this.notificationService.info(this.t('dashboard.auto_refresh_disabled'));
    } else {
      this.dashboardService.startAutoRefresh();
      this.notificationService.info(this.t('dashboard.auto_refresh_enabled'));
    }
  }

  /**
   * Updates auto-refresh interval
   */
  updateRefreshInterval(seconds: number): void {
    this.dashboardService.updateRefreshInterval(seconds);
    if (this.autoRefresh()) {
      this.notificationService.info(
        this.t('dashboard.refresh_interval_updated')
      );
    }
  }

  /**
   * Gets formatted time since last refresh
   */
  getTimeSinceLastRefresh(): string {
    return this.dashboardService.getTimeSinceLastRefresh();
  }

  /**
   * Translation helper
   */
  t(key: string, params?: Record<string, any>): string {
    return this.i18n.t(key, params);
  }

  /**
   * Gets card color class for styling
   */
  getCardColorClass(color: string): string {
    return `card-${color}`;
  }

  /**
   * Gets trend icon for dashboard cards
   */
  getTrendIcon(trend?: string): string {
    switch (trend) {
      case 'up': return 'fa-solid fa-arrow-up text-success';
      case 'down': return 'fa-solid fa-arrow-down text-danger';
      default: return 'fa-solid fa-minus text-muted';
    }
  }

  /**
   * Calculates percentage change
   */
  private calculateChange(current?: number, total?: number): number {
    if (!current || !total || total === 0) return 0;
    return Math.round((current / total) * 100);
  }

  /**
   * Maps dashboard card color to StatGridItem variant
   */
  private mapColorToVariant(color: string): 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' {
    const variantMap: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary'> = {
      'primary': 'primary',
      'success': 'success',
      'warning': 'warning',
      'danger': 'danger',
      'info': 'info',
      'secondary': 'secondary'
    };
    return variantMap[color] || 'primary';
  }

  /**
   * Checks if user has specific permission
   */
  private hasPermission(permission: string): boolean {
    const user = this.currentUser();
    return user?.permissions?.includes(permission) || this.isSystemAdmin();
  }

  /**
   * Checks if user is system admin
   */
  private isSystemAdmin(): boolean {
    const user = this.currentUser();
    return user?.roles?.includes('SystemAdmin') || false;
  }

  /**
   * Sets up error handling for dashboard service
   */
  private setupErrorHandling(): void {
    // Subscribe to error state changes using effect
    effect(() => {
      const errorMsg = this.error();
      if (errorMsg) {
        this.notificationService.error(errorMsg);
      }
    });
  }

  /**
   * Loads filter options (branches, departments)
   */
  private loadFilterOptions(): void {
    // This could be enhanced to load filter options independently
    // For now, they're loaded as part of the dashboard data
  }

  /**
   * Export dashboard data to PDF/CSV (placeholder for future implementation)
   */
  exportDashboard(format: 'pdf' | 'csv'): void {
    // Placeholder for export functionality
    this.notificationService.info(
      this.t('dashboard.export_not_implemented')
    );
  }
}