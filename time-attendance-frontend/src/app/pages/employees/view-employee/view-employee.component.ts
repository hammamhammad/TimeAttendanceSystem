import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { EmployeesService } from '../employees.service';
import { AttendanceService } from '../../../core/services/attendance.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { EmployeeDto, Gender, EmploymentStatus, WorkLocationType } from '../../../shared/models/employee.model';
import { AttendanceRecord, AttendanceStatistics, AttendanceStatus, AttendanceTransaction } from '../../../shared/models/attendance.model';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HasPermissionDirective],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private employeesService = inject(EmployeesService);
  private attendanceService = inject(AttendanceService);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  error = signal<string | null>(null);
  employee = signal<EmployeeDto | null>(null);
  employeeId: number = 0;

  // Attendance-related signals
  attendanceLoading = signal(false);
  attendanceRecords = signal<AttendanceRecord[]>([]);
  attendanceStatistics = signal<AttendanceStatistics | null>(null);
  recentTransactions = signal<AttendanceTransaction[]>([]);
  selectedDateRange = signal<{ start: string; end: string }>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  activeTab = signal<'overview' | 'records' | 'transactions'>('overview');

  // Computed values for attendance summary
  totalWorkingDays = computed(() => {
    const records = this.attendanceRecords();
    return records.length;
  });

  presentDays = computed(() => {
    const records = this.attendanceRecords();
    return records.filter(r => r.status === AttendanceStatus.Present).length;
  });

  absentDays = computed(() => {
    const records = this.attendanceRecords();
    return records.filter(r => r.status === AttendanceStatus.Absent).length;
  });

  lateDays = computed(() => {
    const records = this.attendanceRecords();
    return records.filter(r => r.status === AttendanceStatus.Late).length;
  });

  attendanceRate = computed(() => {
    const total = this.totalWorkingDays();
    const present = this.presentDays();
    return total > 0 ? Math.round((present / total) * 100) : 0;
  });

  averageWorkingHours = computed(() => {
    const records = this.attendanceRecords();
    const workingRecords = records.filter(r => r.workingHours > 0);
    if (workingRecords.length === 0) return 0;
    const total = workingRecords.reduce((sum, r) => sum + r.workingHours, 0);
    return Math.round((total / workingRecords.length) * 10) / 10;
  });

  totalOvertimeHours = computed(() => {
    const records = this.attendanceRecords();
    return Math.round(records.reduce((sum, r) => sum + r.overtimeHours, 0) * 10) / 10;
  });

  // Permission constants for use in template
  readonly PERMISSIONS = {
    EMPLOYEE_UPDATE: `${PermissionResources.EMPLOYEE}.${PermissionActions.UPDATE}`,
    EMPLOYEE_DELETE: `${PermissionResources.EMPLOYEE}.${PermissionActions.DELETE}`,
    EMPLOYEE_MANAGE: `${PermissionResources.EMPLOYEE}.${PermissionActions.MANAGE}`
  };

  ngOnInit() {
    this.employeeId = +this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.loadEmployee();
      this.loadAttendanceData();
    } else {
      this.router.navigate(['/employees']);
    }
  }

  private loadEmployee() {
    this.loading.set(true);
    this.employeesService.getEmployeeById(this.employeeId).subscribe({
      next: (employee) => {
        this.employee.set(employee);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load employee');
        this.loading.set(false);
        console.error('Error loading employee:', error);
      }
    });
  }

  /**
   * Load attendance data for the employee
   */
  private loadAttendanceData() {
    this.attendanceLoading.set(true);
    const dateRange = this.selectedDateRange();

    // Load attendance records
    this.attendanceService.getEmployeeAttendanceRecords(
      this.employeeId,
      dateRange.start,
      dateRange.end
    ).subscribe({
      next: (records) => {
        this.attendanceRecords.set(records);
        this.attendanceLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading attendance records:', error);
        this.attendanceLoading.set(false);
      }
    });

    // Load recent transactions
    this.attendanceService.getEmployeeRecentTransactions(this.employeeId, 10).subscribe({
      next: (transactions) => {
        this.recentTransactions.set(transactions);
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
      }
    });
  }

  /**
   * Handle date range change
   */
  onDateRangeChange(start: string, end: string) {
    this.selectedDateRange.set({ start, end });
    this.loadAttendanceData();
  }

  /**
   * Change active tab
   */
  setActiveTab(tab: 'overview' | 'records' | 'transactions') {
    this.activeTab.set(tab);
  }

  /**
   * Get status badge class
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
      default:
        return 'badge bg-secondary';
    }
  }

  /**
   * Get transaction type badge class
   */
  getTransactionTypeBadgeClass(type: number): string {
    switch (type) {
      case 0: // CheckIn
        return 'badge bg-success';
      case 1: // CheckOut
        return 'badge bg-danger';
      case 2: // BreakStart
        return 'badge bg-warning';
      case 3: // BreakEnd
        return 'badge bg-info';
      case 4: // Manual
        return 'badge bg-primary';
      default:
        return 'badge bg-secondary';
    }
  }

  /**
   * Format time for display
   */
  formatTime(time: string | null): string {
    if (!time) return '--:--';
    try {
      const date = new Date(`1970-01-01T${time}`);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch {
      return time;
    }
  }

  /**
   * Calculate work duration
   */
  calculateWorkDuration(checkIn: string | null, checkOut: string | null): string {
    if (!checkIn || !checkOut) return '--';
    try {
      const start = new Date(`1970-01-01T${checkIn}`);
      const end = new Date(`1970-01-01T${checkOut}`);
      const diffMs = end.getTime() - start.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    } catch {
      return '--';
    }
  }

  /**
   * Get performance color based on attendance rate
   */
  getPerformanceColor(rate: number): string {
    if (rate >= 95) return 'success';
    if (rate >= 90) return 'primary';
    if (rate >= 80) return 'warning';
    return 'danger';
  }

  /**
   * Export employee attendance data
   */
  exportAttendanceData() {
    const records = this.attendanceRecords();
    if (records.length === 0) {
      this.notificationService.warning('No attendance data to export');
      return;
    }

    const csvContent = this.generateAttendanceCSV(records);
    this.downloadCSV(csvContent, `employee-${this.employeeId}-attendance.csv`);
    this.notificationService.success('Attendance data exported successfully');
  }

  /**
   * Generate CSV content from attendance records
   */
  private generateAttendanceCSV(records: AttendanceRecord[]): string {
    const headers = [
      'Date',
      'Status',
      'Check In',
      'Check Out',
      'Working Hours',
      'Break Hours',
      'Overtime Hours',
      'Notes'
    ];

    const rows = records.map(record => [
      record.attendanceDate,
      this.getStatusText(record.status),
      this.formatTime(record.actualCheckInTime || null),
      this.formatTime(record.actualCheckOutTime || null),
      record.workingHours.toString(),
      record.breakHours.toString(),
      record.overtimeHours.toString(),
      record.notes || ''
    ]);

    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
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

  /**
   * Get status text
   */
  private getStatusText(status: AttendanceStatus): string {
    return this.i18n.t(`attendance.status.${status.toString().toLowerCase()}`);
  }

  onEdit() {
    this.router.navigate(['/employees', this.employeeId, 'edit']);
  }

  onBack() {
    this.router.navigate(['/employees']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getEmploymentStatusLabel(status: EmploymentStatus): string {
    return this.t(`employees.employment_status.${EmploymentStatus[status].toLowerCase()}`);
  }

  getGenderLabel(gender: Gender): string {
    return this.t(`employees.gender.${Gender[gender].toLowerCase()}`);
  }

  getWorkLocationTypeLabel(type: WorkLocationType): string {
    return this.t(`employees.work_location.${WorkLocationType[type].toLowerCase()}`);
  }

  t(key: string): string {
    return this.i18n.t(key);
  }
}