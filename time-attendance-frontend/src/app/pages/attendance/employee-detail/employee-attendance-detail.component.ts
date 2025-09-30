import { Component, OnInit, signal, computed, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AttendanceService } from '../../../core/services/attendance.service';
import { EmployeesService } from '../../employees/employees.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { DataTableComponent, TableColumn, TableAction, SortEvent } from '../../../shared/components/data-table/data-table.component';
import { FilterPanelComponent, FilterConfig, FilterValues } from '../shared/filter-panel/filter-panel.component';
import { AttendanceChartComponent, ChartData } from '../shared/attendance-chart/attendance-chart.component';
import { AttendanceSummaryCardComponent, AttendanceSummaryData } from '../shared/attendance-summary-card/attendance-summary-card.component';
import {
  AttendanceRecord,
  AttendanceStatus
} from '../../../shared/models/attendance.model';
import { EmployeeDto } from '../../../shared/models/employee.model';

interface EmployeeAttendanceStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  overtimeDays: number;
  avgWorkingHours: number;
  totalWorkingHours: number;
  totalLateMinutes: number;
  attendanceRate: number;
}

@Component({
  selector: 'app-employee-attendance-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DataTableComponent,
    FilterPanelComponent,
    AttendanceChartComponent,
    AttendanceSummaryCardComponent
  ],
  templateUrl: './employee-attendance-detail.component.html',
  styleUrls: ['./employee-attendance-detail.component.css']
})
export class EmployeeAttendanceDetailComponent implements OnInit, OnDestroy {
  employeeId: string | null = null;
  Math = Math; // Expose Math to template

  // Signals for reactive state management
  employee = signal<EmployeeDto | null>(null);
  attendanceRecords = signal<AttendanceRecord[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Filter signals
  startDate = signal(this.getDefaultStartDate());
  endDate = signal(this.getDefaultEndDate());
  selectedStatus = signal<AttendanceStatus | null>(null);

  // Pagination and sorting signals
  currentPage = signal(1);
  pageSize = signal(10);
  sortColumn = signal('attendanceDate');
  sortDirection = signal<'asc' | 'desc'>('desc');

  // Signals for data table component
  tableTotalPages = signal(1);
  tableTotalItems = signal(0);

  // Computed values
  filteredRecords = computed(() => {
    const records = this.attendanceRecords();
    const status = this.selectedStatus();

    return records.filter(record => {
      const matchesStatus = status === null || record.status === status;
      return matchesStatus;
    });
  });

  // Sorted records
  sortedRecords = computed(() => {
    const records = [...this.filteredRecords()];
    const column = this.sortColumn();
    const direction = this.sortDirection();

    if (!column) return records;

    return records.sort((a, b) => {
      let aValue = this.getValueForSorting(a, column);
      let bValue = this.getValueForSorting(b, column);

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return direction === 'asc' ? 1 : -1;
      if (bValue == null) return direction === 'asc' ? -1 : 1;

      // Convert to comparable types
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  });

  // Pagination computed values
  totalItems = computed(() => this.sortedRecords().length);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  // Paginated records
  paginatedRecords = computed(() => {
    const records = this.sortedRecords();
    const page = this.currentPage();
    const size = this.pageSize();
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    return records.slice(startIndex, endIndex);
  });

  // Attendance statistics computed
  attendanceStats = computed((): EmployeeAttendanceStats => {
    const records = this.filteredRecords();
    const totalDays = records.length;
    const presentDays = records.filter(r =>
      r.status === AttendanceStatus.Present ||
      r.status === AttendanceStatus.Late ||
      r.status === AttendanceStatus.Overtime
    ).length;
    const absentDays = records.filter(r => r.status === AttendanceStatus.Absent).length;
    const lateDays = records.filter(r => r.status === AttendanceStatus.Late).length;
    const overtimeDays = records.filter(r => r.status === AttendanceStatus.Overtime).length;

    const totalWorkingHours = records.reduce((sum, r) => sum + (r.workingHours || 0), 0);
    const avgWorkingHours = totalDays > 0 ? totalWorkingHours / totalDays : 0;
    const totalLateMinutes = records.reduce((sum, r) => sum + (r.lateMinutes || 0), 0);
    const attendanceRate = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

    return {
      totalDays,
      presentDays,
      absentDays,
      lateDays,
      overtimeDays,
      avgWorkingHours,
      totalWorkingHours,
      totalLateMinutes,
      attendanceRate
    };
  });

  // Summary cards data
  summaryCards = computed<AttendanceSummaryData[]>(() => {
    const stats = this.attendanceStats();
    const employee = this.employee();

    return [
      {
        title: this.i18n.t('attendance.employee_history.total_days'),
        value: stats.totalDays,
        icon: 'fa-solid fa-calendar',
        color: 'primary',
        subtitle: this.i18n.t('attendance.employee_history.period_covered')
      },
      {
        title: this.i18n.t('attendance.status.present'),
        value: stats.presentDays,
        icon: 'fa-solid fa-check-circle',
        color: 'success',
        percentage: stats.totalDays > 0 ? Math.round((stats.presentDays / stats.totalDays) * 100) : 0,
        maxValue: stats.totalDays
      },
      {
        title: this.i18n.t('attendance.status.absent'),
        value: stats.absentDays,
        icon: 'fa-solid fa-times-circle',
        color: 'danger',
        percentage: stats.totalDays > 0 ? Math.round((stats.absentDays / stats.totalDays) * 100) : 0,
        maxValue: stats.totalDays
      },
      {
        title: this.i18n.t('attendance.status.late'),
        value: stats.lateDays,
        icon: 'fa-solid fa-clock',
        color: 'warning',
        percentage: stats.totalDays > 0 ? Math.round((stats.lateDays / stats.totalDays) * 100) : 0,
        maxValue: stats.totalDays
      },
      {
        title: this.i18n.t('attendance.attendance_rate'),
        value: Math.round(stats.attendanceRate) + '%',
        icon: 'fa-solid fa-percentage',
        color: stats.attendanceRate >= 90 ? 'success' : stats.attendanceRate >= 75 ? 'warning' : 'danger',
        trend: {
          value: Math.round(stats.attendanceRate),
          isPositive: stats.attendanceRate >= 80,
          label: this.i18n.t('attendance.overall_performance')
        }
      },
      {
        title: this.i18n.t('attendance.total_working_hours'),
        value: this.formatHours(stats.totalWorkingHours),
        icon: 'fa-solid fa-business-time',
        color: 'info',
        subtitle: this.i18n.t('attendance.avg_per_day') + ': ' + this.formatHours(stats.avgWorkingHours)
      }
    ];
  });

  // Chart data for attendance distribution
  attendanceChartData = computed<ChartData>(() => {
    const stats = this.attendanceStats();
    if (stats.totalDays === 0) {
      return { labels: [], datasets: [] };
    }

    return {
      labels: [
        this.i18n.t('attendance.status.present'),
        this.i18n.t('attendance.status.absent'),
        this.i18n.t('attendance.status.late'),
        this.i18n.t('attendance.status.overtime')
      ],
      datasets: [{
        label: this.i18n.t('attendance.employee_history.attendance_distribution'),
        data: [stats.presentDays, stats.absentDays, stats.lateDays, stats.overtimeDays],
        backgroundColor: ['#198754', '#dc3545', '#ffc107', '#0dcaf0'],
        borderColor: ['#146c43', '#b02a37', '#d39e00', '#0aa2c0'],
        borderWidth: 2
      }]
    };
  });

  // Constants for template
  AttendanceStatus = AttendanceStatus;
  availableStatuses = [
    { value: null, label: 'attendance.filters.all_statuses' },
    { value: AttendanceStatus.Present, label: 'attendance.status.present' },
    { value: AttendanceStatus.Absent, label: 'attendance.status.absent' },
    { value: AttendanceStatus.Late, label: 'attendance.status.late' },
    { value: AttendanceStatus.EarlyLeave, label: 'attendance.status.early_leave' },
    { value: AttendanceStatus.OnLeave, label: 'attendance.status.on_leave' },
    { value: AttendanceStatus.Overtime, label: 'attendance.status.overtime' }
  ];

  // Filter configuration for FilterPanelComponent
  filterConfig: FilterConfig = {
    dateRange: {
      enabled: true,
      startDate: this.getDefaultStartDate(),
      endDate: this.getDefaultEndDate()
    },
    status: {
      enabled: true,
      multiple: false,
      options: this.availableStatuses.map(s => ({
        value: s.value,
        label: s.label
      }))
    }
  };

  // Data table configuration - using computed to avoid change detection issues
  tableColumns = computed<TableColumn[]>(() => [
    { key: 'attendanceDate', label: this.i18n.t('attendance.fields.date'), sortable: true, width: '120px' },
    { key: 'status', label: this.i18n.t('attendance.fields.status'), sortable: true, width: '120px', align: 'center', renderHtml: true },
    { key: 'checkIn', label: this.i18n.t('attendance.fields.check_in'), sortable: false, width: '100px', align: 'center' },
    { key: 'checkOut', label: this.i18n.t('attendance.fields.check_out'), sortable: false, width: '100px', align: 'center' },
    { key: 'workingHours', label: this.i18n.t('attendance.fields.working_hours'), sortable: true, width: '120px', align: 'center' },
    { key: 'scheduledHours', label: this.i18n.t('attendance.fields.scheduled_hours'), sortable: true, width: '120px', align: 'center' },
    { key: 'lateMinutes', label: this.i18n.t('attendance.fields.total_late'), sortable: true, width: '100px', align: 'center' }
  ]);

  tableActions = computed<TableAction[]>(() => [
    {
      key: 'edit',
      label: this.i18n.t('attendance.actions.edit_record'),
      icon: 'fa-edit',
      color: 'secondary'
    }
  ]);

  /**
   * Transform attendance records for data table - using computed to avoid refresh issues
   */
  tableData = computed(() => {
    return this.paginatedRecords().map(record => ({
      ...record,
      attendanceDate: this.formatDate(record.attendanceDate),
      status: this.formatStatusForTable(record.status),
      checkIn: this.formatTime(this.getCheckInTime(record)),
      checkOut: this.formatTime(this.getCheckOutTime(record)),
      workingHours: this.formatHours(record.workingHours),
      scheduledHours: this.formatHours(record.scheduledHours),
      lateMinutes: this.formatLateTime(record.lateMinutes)
    }));
  });

  constructor(
    private attendanceService: AttendanceService,
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public i18n: I18nService,
    private notificationService: NotificationService
  ) {
    // Get employee ID from route params or query params
    this.employeeId = this.route.snapshot.paramMap.get('id') ||
                      this.route.snapshot.queryParamMap.get('employeeId');

    // Check for year/month from query params (from Monthly Report)
    const year = this.route.snapshot.queryParamMap.get('year');
    const month = this.route.snapshot.queryParamMap.get('month');

    if (year && month) {
      // Set date range for the selected month
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);

      // Format dates as YYYY-MM-DD
      const formatDateString = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
      };

      this.startDate.set(formatDateString(startDate));
      this.endDate.set(formatDateString(endDate));
    }

    // Update table signals when computed values change
    effect(() => {
      this.tableTotalPages.set(this.totalPages());
      this.tableTotalItems.set(this.totalItems());
    });
  }

  ngOnInit(): void {
    if (this.employeeId) {
      this.loadEmployeeData();
      this.loadAttendanceData();
    } else {
      this.error.set('Employee ID not found');
      this.loading.set(false);
    }
  }

  /**
   * Handle filter changes from FilterPanelComponent
   */
  onFilterChange(filters: FilterValues): void {
    // Update date range if provided
    if (filters.dateRange) {
      if (filters.dateRange.startDate) {
        this.startDate.set(filters.dateRange.startDate);
      }
      if (filters.dateRange.endDate) {
        this.endDate.set(filters.dateRange.endDate);
      }
      // Reload data when date range changes
      this.loadAttendanceData();
    }

    // Update status filter
    if (filters['status'] !== undefined) {
      this.selectedStatus.set(filters['status'] ? Number(filters['status']) as AttendanceStatus : null);
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  /**
   * Load employee information
   */
  private loadEmployeeData(): void {
    if (!this.employeeId) return;

    this.employeesService.getEmployeeById(parseInt(this.employeeId)).subscribe({
      next: (employee: EmployeeDto) => {
        this.employee.set(employee);
      },
      error: (error: any) => {
        console.error('Error loading employee data:', error);
        this.error.set('Failed to load employee information');
      }
    });
  }

  /**
   * Load attendance data for the employee
   */
  loadAttendanceData(): void {
    if (!this.employeeId) return;

    this.loading.set(true);
    this.error.set(null);

    const startDate = this.startDate();
    const endDate = this.endDate();
    const employeeId = parseInt(this.employeeId);

    this.attendanceService.getEmployeeAttendanceHistoryComplete(
      employeeId,
      startDate,
      endDate
    ).subscribe({
      next: (records: AttendanceRecord[]) => {
        this.attendanceRecords.set(records);
        this.loading.set(false);
      },
      error: (error: any) => {
        console.error('Error loading attendance data:', error);
        this.error.set('Failed to load attendance records');
        this.loading.set(false);
        this.notificationService.error('Failed to load attendance records');
      }
    });
  }

  /**
   * Handle start date change
   */
  onStartDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.startDate.set(target.value);
  }

  /**
   * Handle end date change
   */
  onEndDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.endDate.set(target.value);
  }

  /**
   * Handle status filter change
   */
  onStatusChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value === '' ? null : parseInt(target.value);
    this.selectedStatus.set(value as AttendanceStatus | null);
  }

  /**
   * Handle table sort event
   */
  onSort(event: SortEvent): void {
    this.sortColumn.set(event.column);
    this.sortDirection.set(event.direction);
    this.currentPage.set(1); // Reset to first page when sorting
  }

  /**
   * Handle page change event
   */
  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  /**
   * Handle page size change event
   */
  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1); // Reset to first page when page size changes
  }

  /**
   * Handle table action clicks
   */
  onActionClick(event: {action: string, item: any}): void {
    const { action, item } = event;

    switch (action) {
      case 'edit':
        this.editAttendanceRecord(item);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  /**
   * Navigate to edit attendance record page
   */
  editAttendanceRecord(record: AttendanceRecord): void {
    this.router.navigate(['/attendance/edit', record.id]);
  }

  /**
   * Refresh data
   */
  refresh(): void {
    this.loadEmployeeData();
    this.loadAttendanceData();
  }

  /**
   * Go back to previous page
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Export attendance data
   */
  exportData(): void {
    const records = this.filteredRecords();
    if (records.length === 0) {
      this.notificationService.warning('No data to export');
      return;
    }

    const employee = this.employee();
    const csvContent = this.generateCSV(records);
    const filename = `employee-attendance-${employee?.employeeNumber || this.employeeId}-${this.startDate()}-${this.endDate()}.csv`;
    this.downloadCSV(csvContent, filename);
    this.notificationService.success('Data exported successfully');
  }

  /**
   * Get default start date (30 days ago)
   */
  private getDefaultStartDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  }

  /**
   * Get default end date (today)
   */
  private getDefaultEndDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Get value for sorting
   */
  private getValueForSorting(record: AttendanceRecord, column: string): any {
    switch (column) {
      case 'attendanceDate':
        return record.attendanceDate;
      case 'status':
        return record.status || 0;
      case 'workingHours':
        return record.workingHours || 0;
      case 'scheduledHours':
        return record.scheduledHours || 0;
      case 'lateMinutes':
        return record.lateMinutes || 0;
      default:
        return record[column as keyof AttendanceRecord];
    }
  }

  /**
   * Calculate attendance rate percentage
   */
  getAttendanceRatePercentage(): number {
    return Math.round(this.attendanceStats().attendanceRate);
  }

  /**
   * Format date for display
   */
  formatDate(date: string): string {
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return date;
    }
  }

  /**
   * Format time for display
   */
  formatTime(time: string | null): string {
    if (!time) return '--:--';

    try {
      let timeToFormat = time;

      if (time.includes('T')) {
        const timePart = time.split('T')[1];
        timeToFormat = timePart.split('Z')[0];
      }

      if (timeToFormat.includes(':')) {
        const date = new Date(`1970-01-01T${timeToFormat}`);
        if (!isNaN(date.getTime())) {
          return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });
        }
      }

      return timeToFormat;
    } catch {
      return time || '--:--';
    }
  }

  /**
   * Get check-in time with fallback
   */
  getCheckInTime(record: AttendanceRecord): string | null {
    return record.checkInTime || record.actualCheckInTime || null;
  }

  /**
   * Get check-out time with fallback
   */
  getCheckOutTime(record: AttendanceRecord): string | null {
    return record.checkOutTime || record.actualCheckOutTime || null;
  }

  /**
   * Format hours (convert decimal hours to hours and minutes)
   */
  formatHours(hours: number): string {
    if (!hours || hours === 0) return '0h 0m';

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
   * Format late time from minutes
   */
  formatLateTime(lateMinutes: number): string {
    if (!lateMinutes || lateMinutes === 0) return '--';

    const hours = Math.floor(lateMinutes / 60);
    const minutes = lateMinutes % 60;

    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }

  /**
   * Get status badge variant for attendance status
   */
  getStatusBadgeVariant(status: AttendanceStatus): 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'primary' {
    switch (status) {
      case AttendanceStatus.Present:
        return 'success';
      case AttendanceStatus.Absent:
      case AttendanceStatus.Incomplete:
        return 'danger';
      case AttendanceStatus.Late:
      case AttendanceStatus.EarlyLeave:
      case AttendanceStatus.SickLeave:
        return 'warning';
      case AttendanceStatus.OnLeave:
        return 'info';
      case AttendanceStatus.Overtime:
        return 'primary';
      case AttendanceStatus.DayOff:
      case AttendanceStatus.Holiday:
      default:
        return 'secondary';
    }
  }

  /**
   * Format status for table display with badge styling
   */
  formatStatusForTable(status: AttendanceStatus): string {
    const statusText = this.i18n.t(this.getStatusText(status));
    const variant = this.getStatusBadgeVariant(status);
    return `<span class="badge bg-${variant}">${statusText}</span>`;
  }

  /**
   * Get status text translation key
   */
  getStatusText(status: AttendanceStatus): string {
    switch (status) {
      case AttendanceStatus.Present:
        return 'attendance.status.present';
      case AttendanceStatus.Absent:
        return 'attendance.status.absent';
      case AttendanceStatus.Late:
        return 'attendance.status.late';
      case AttendanceStatus.EarlyLeave:
        return 'attendance.status.early_leave';
      case AttendanceStatus.OnLeave:
        return 'attendance.status.on_leave';
      case AttendanceStatus.DayOff:
        return 'attendance.status.day_off';
      case AttendanceStatus.Overtime:
        return 'attendance.status.overtime';
      case AttendanceStatus.Incomplete:
        return 'attendance.status.incomplete';
      case AttendanceStatus.Holiday:
        return 'attendance.status.holiday';
      case AttendanceStatus.SickLeave:
        return 'attendance.status.sick_leave';
      case AttendanceStatus.Pending:
        return 'attendance.status.pending';
      default:
        return 'attendance.status.pending';
    }
  }

  /**
   * Generate CSV content from records
   */
  private generateCSV(records: AttendanceRecord[]): string {
    const employee = this.employee();
    const headers = [
      'Date',
      'Status',
      'Check In',
      'Check Out',
      'Working Hours',
      'Required Hours',
      'Late Minutes'
    ];

    const rows = records.map(record => [
      this.formatDate(record.attendanceDate),
      this.i18n.t(this.getStatusText(record.status)),
      this.formatTime(this.getCheckInTime(record)),
      this.formatTime(this.getCheckOutTime(record)),
      this.formatHours(record.workingHours),
      this.formatHours(record.scheduledHours),
      this.formatLateTime(record.lateMinutes)
    ]);

    const csvHeader = `Employee Attendance Report\nEmployee: ${employee?.fullName || ''} (${employee?.employeeNumber || ''})\nPeriod: ${this.startDate()} to ${this.endDate()}\n\n`;
    const csvData = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    return csvHeader + csvData;
  }

  /**
   * Download CSV file
   */
  private downloadCSV(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}