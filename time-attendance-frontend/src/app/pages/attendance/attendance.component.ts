import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AttendanceService } from '../../core/services/attendance.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import {
  AttendanceDashboardData,
  AttendanceStatistics,
  AttendanceRecord,
  AttendanceTransaction,
  AttendanceStatus
} from '../../shared/models/attendance.model';
import { AttendanceChartComponent, ChartData } from './shared/attendance-chart/attendance-chart.component';
import { AttendanceSummaryCardComponent, AttendanceSummaryData } from './shared/attendance-summary-card/attendance-summary-card.component';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, RouterModule, AttendanceChartComponent, AttendanceSummaryCardComponent],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  // Signals for reactive state management
  dashboardData = signal<AttendanceDashboardData | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  currentDate = signal(new Date());

  // Computed values
  todayStats = computed(() => this.dashboardData()?.todayStats);
  incompleteRecords = computed(() => this.dashboardData()?.incompleteRecords || []);
  recentTransactions = computed(() => this.dashboardData()?.recentTransactions || []);

  // Chart data computed properties
  attendanceChartData = computed<ChartData>(() => {
    const stats = this.todayStats();
    if (!stats) {
      console.log('🔴 No stats for attendance chart');
      return { labels: [], datasets: [] };
    }

    const chartData = {
      labels: ['Present', 'Absent', 'Late', 'Overtime'],
      datasets: [{
        label: 'Today\'s Attendance',
        data: [stats.presentEmployees, stats.absentEmployees, stats.lateEmployees, stats.overtimeEmployees],
        backgroundColor: ['#198754', '#dc3545', '#ffc107', '#0d6efd'],
        borderWidth: 2
      }]
    };
    console.log('📊 Attendance Chart Data:', chartData);
    return chartData;
  });

  weeklyTrendData = computed<ChartData>(() => {
    const weeklyTrend = this.dashboardData()?.weeklyTrend || [];
    if (weeklyTrend.length === 0) {
      console.log('🔴 No weekly trend data');
      return { labels: [], datasets: [] };
    }

    const chartData = {
      labels: weeklyTrend.map((d: any) => this.formatDateLabel(d.date)),
      datasets: [
        {
          label: 'Present',
          data: weeklyTrend.map(d => d.presentEmployees),
          backgroundColor: '#198754',
          borderColor: '#198754',
          borderWidth: 2,
          fill: false
        },
        {
          label: 'Absent',
          data: weeklyTrend.map(d => d.absentEmployees),
          backgroundColor: '#dc3545',
          borderColor: '#dc3545',
          borderWidth: 2,
          fill: false
        }
      ]
    };
    console.log('📈 Weekly Trend Chart Data:', chartData);
    return chartData;
  });

  // Summary card data
  summaryCards = computed<AttendanceSummaryData[]>(() => {
    const stats = this.todayStats();
    if (!stats) return [];

    return [
      {
        title: 'Total Employees',
        value: stats.totalEmployees,
        icon: 'fa-users',
        color: 'primary',
        link: '/employees',
        actionLabel: 'View All'
      },
      {
        title: 'Present Today',
        value: stats.presentEmployees,
        icon: 'fa-user-check',
        color: 'success',
        percentage: stats.totalEmployees > 0 ? (stats.presentEmployees / stats.totalEmployees) * 100 : 0,
        trend: {
          value: 5.2,
          isPositive: true,
          label: 'vs yesterday'
        }
      },
      {
        title: 'Absent Today',
        value: stats.absentEmployees,
        icon: 'fa-user-times',
        color: 'danger',
        percentage: stats.totalEmployees > 0 ? (stats.absentEmployees / stats.totalEmployees) * 100 : 0,
        trend: {
          value: 2.1,
          isPositive: false,
          label: 'vs yesterday'
        }
      },
      {
        title: 'Late Arrivals',
        value: stats.lateEmployees,
        icon: 'fa-clock',
        color: 'warning',
        link: '/attendance/reports?status=late',
        actionLabel: 'View Details'
      },
      {
        title: 'Overtime Workers',
        value: stats.overtimeEmployees,
        icon: 'fa-business-time',
        color: 'info',
        subtitle: `${this.formatDuration(stats.totalOvertimeHours)} total`
      },
      {
        title: 'Attendance Rate',
        value: `${Math.round(stats.attendanceRate)}%`,
        icon: 'fa-percentage',
        color: stats.attendanceRate >= 90 ? 'success' : stats.attendanceRate >= 80 ? 'warning' : 'danger',
        trend: {
          value: 1.8,
          isPositive: true,
          label: 'this month'
        }
      }
    ];
  });

  // Status breakdown computed values
  statusBreakdown = computed(() => {
    const stats = this.todayStats();
    if (!stats) return this.getEmptyStatusBreakdown();

    // Use available fields from AttendanceStatistics interface
    // and set defaults for fields not yet available from the API
    return {
      present: stats.presentEmployees || 0,
      absent: stats.absentEmployees || 0,
      late: stats.lateEmployees || 0,
      earlyLeave: 0, // Not available in current API
      onLeave: 0, // Not available in current API
      dayOff: 0, // Not available in current API
      overtime: stats.overtimeEmployees || 0,
      incomplete: 0, // Not available in current API
      holiday: 0, // Not available in current API
      sickLeave: 0, // Not available in current API
      pending: 0 // Not available in current API
    };
  });

  // Constants for template
  AttendanceStatus = AttendanceStatus;

  constructor(
    private attendanceService: AttendanceService,
    public readonly i18nService: I18nService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  /**
   * Load dashboard data including today's statistics and recent activity
   */
  loadDashboardData(): void {
    this.loading.set(true);
    this.error.set(null);

    this.attendanceService.getDashboardData().subscribe({
      next: (data) => {
        console.log('📊 Dashboard Data Received:', data);
        console.log('📈 Weekly Trend:', data.weeklyTrend);
        console.log('⚠️ Incomplete Records:', data.incompleteRecords);
        console.log('📅 Today Stats:', data.todayStats);
        this.dashboardData.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.error.set('Failed to load dashboard data');
        this.loading.set(false);
        this.notificationService.error('Failed to load attendance dashboard');
      }
    });
  }


  /**
   * Format date label for charts
   */
  private formatDateLabel(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  /**
   * Navigate to specific section with parameters
   */
  navigateToSection(link: string): void {
    // This will be handled by the router link in the template
  }

  /**
   * Get status badge class for attendance status
   */
  getStatusBadgeClass(status: AttendanceStatus): string {
    switch (status) {
      case AttendanceStatus.Present:
        return 'badge bg-success';
      case AttendanceStatus.Absent:
        return 'badge bg-danger';
      case AttendanceStatus.Late:
        return 'badge bg-warning';
      case AttendanceStatus.EarlyLeave:
        return 'badge bg-warning';
      case AttendanceStatus.OnLeave:
        return 'badge bg-info';
      case AttendanceStatus.DayOff:
        return 'badge bg-secondary';
      case AttendanceStatus.Overtime:
        return 'badge bg-primary';
      case AttendanceStatus.Incomplete:
        return 'badge bg-danger';
      case AttendanceStatus.Holiday:
        return 'badge bg-secondary';
      case AttendanceStatus.SickLeave:
        return 'badge bg-warning';
      default:
        return 'badge bg-secondary';
    }
  }

  /**
   * Get status text translation key
   */
  getStatusText(status: AttendanceStatus): string {
    return `attendance.status.${status.toString().toLowerCase()}`;
  }

  /**
   * Format time duration in hours and minutes
   */
  formatDuration(hours: number): string {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);

    if (wholeHours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${wholeHours}h`;
    } else {
      return `${wholeHours}h ${minutes}m`;
    }
  }

  /**
   * Calculate attendance rate percentage
   */
  getAttendanceRatePercentage(): number {
    const stats = this.todayStats();
    if (!stats || stats.totalEmployees === 0) {
      return 0;
    }
    return Math.round((stats.presentEmployees / stats.totalEmployees) * 100);
  }

  /**
   * Refresh dashboard data
   */
  refresh(): void {
    this.loadDashboardData();
  }

  /**
   * Navigate to view more details for a specific section
   */
  viewIncompleteRecords(): void {
    // Navigation will be handled by router
  }

  viewAllReports(): void {
    // Navigation will be handled by router
  }

  /**
   * Get empty status breakdown for initialization
   */
  private getEmptyStatusBreakdown() {
    return {
      present: 0,
      absent: 0,
      late: 0,
      earlyLeave: 0,
      onLeave: 0,
      dayOff: 0,
      overtime: 0,
      incomplete: 0,
      holiday: 0,
      sickLeave: 0,
      pending: 0
    };
  }

  /**
   * Get status configuration for display
   */
  getStatusConfig(status: string) {
    const configs = {
      present: {
        icon: 'fa-user-check',
        color: 'success',
        bgColor: 'bg-success',
        translation: 'attendance.status.present'
      },
      absent: {
        icon: 'fa-user-times',
        color: 'danger',
        bgColor: 'bg-danger',
        translation: 'attendance.status.absent'
      },
      late: {
        icon: 'fa-clock',
        color: 'warning',
        bgColor: 'bg-warning',
        translation: 'attendance.status.late'
      },
      earlyLeave: {
        icon: 'fa-door-open',
        color: 'warning',
        bgColor: 'bg-warning',
        translation: 'attendance.status.earlyleave'
      },
      onLeave: {
        icon: 'fa-calendar-times',
        color: 'info',
        bgColor: 'bg-info',
        translation: 'attendance.status.onleave'
      },
      dayOff: {
        icon: 'fa-calendar-minus',
        color: 'secondary',
        bgColor: 'bg-secondary',
        translation: 'attendance.status.dayoff'
      },
      overtime: {
        icon: 'fa-business-time',
        color: 'primary',
        bgColor: 'bg-primary',
        translation: 'attendance.status.overtime'
      },
      incomplete: {
        icon: 'fa-exclamation-triangle',
        color: 'danger',
        bgColor: 'bg-danger',
        translation: 'attendance.status.incomplete'
      },
      holiday: {
        icon: 'fa-calendar-star',
        color: 'secondary',
        bgColor: 'bg-secondary',
        translation: 'attendance.status.holiday'
      },
      sickLeave: {
        icon: 'fa-thermometer-half',
        color: 'warning',
        bgColor: 'bg-warning',
        translation: 'attendance.status.sickleave'
      },
      pending: {
        icon: 'fa-hourglass-half',
        color: 'muted',
        bgColor: 'bg-secondary',
        translation: 'attendance.status.pending'
      }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  }

  /**
   * Get all status entries for template iteration
   */
  getStatusEntries() {
    const breakdown = this.statusBreakdown();
    return Object.entries(breakdown).map(([key, value]) => ({
      key: key,
      value,
      config: this.getStatusConfig(key)
    }));
  }

  /**
   * Check if there's no attendance data
   */
  hasNoAttendanceData(): boolean {
    const chartData = this.attendanceChartData();
    if (!chartData.datasets || chartData.datasets.length === 0) {
      return true;
    }
    const data = chartData.datasets[0]?.data || [];
    return data.every(v => v === 0);
  }

}