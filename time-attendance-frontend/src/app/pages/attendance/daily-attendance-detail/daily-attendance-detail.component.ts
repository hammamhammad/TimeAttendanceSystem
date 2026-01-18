import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { AttendanceService } from '../../../core/services/attendance.service';
import { EmployeesService } from '../../employees/employees.service';
import { ShiftsService } from '../../shifts/shifts.service';
import { AttendanceRecord, ShiftInfo } from '../../../shared/models/attendance.model';
import { Employee } from '../../../shared/models/employee.model';
import { Shift, ShiftType } from '../../../shared/models/shift.model';
import { AttendanceStatus } from '../../../shared/models/attendance.model';
import { LeaveExcuseDetailsResponse } from '../../../shared/models/leave-excuse-details.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-daily-attendance-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, PageHeaderComponent, StatusBadgeComponent],
  templateUrl: './daily-attendance-detail.component.html',
  styleUrl: './daily-attendance-detail.component.css'
})
export class DailyAttendanceDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private attendanceService = inject(AttendanceService);
  private employeesService = inject(EmployeesService);
  private shiftsService = inject(ShiftsService);
  private notificationService = inject(NotificationService);

  readonly i18n = inject(I18nService);

  // Signals
  loading = signal(false);
  error = signal<string | null>(null);
  attendanceRecord = signal<AttendanceRecord | null>(null);
  employee = signal<Employee | null>(null);
  shift = signal<ShiftInfo | null>(null);
  leaveExcuseDetails = signal<LeaveExcuseDetailsResponse | null>(null);

  // Route parameters
  employeeId!: number;
  attendanceDate!: string;

  // Computed properties for status badge
  statusBadge = computed(() => {
    const record = this.attendanceRecord();
    if (!record) return { label: '', variant: 'secondary' as const };

    const status = record.status;
    let variant: 'success' | 'warning' | 'danger' | 'info' | 'secondary' = 'secondary';

    switch (status) {
      case AttendanceStatus.Present:
        variant = 'success';
        break;
      case AttendanceStatus.Late:
        variant = 'warning';
        break;
      case AttendanceStatus.Absent:
        variant = 'danger';
        break;
      case AttendanceStatus.OnLeave:
        variant = 'info';
        break;
      case AttendanceStatus.Holiday:
        variant = 'info';
        break;
    }

    return {
      label: this.getStatusDisplayText(status),
      variant
    };
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = +params['employeeId'];
      this.attendanceDate = params['date'];
      this.loadData();
    });
  }

  private async loadData(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      // Load employee, attendance record, and leave/excuse details in parallel
      const [employeeResponse, attendanceResponse, leaveExcuseResponse] = await Promise.all([
        this.employeesService.getEmployeeById(this.employeeId).toPromise(),
        this.attendanceService.getEmployeeAttendanceRecord(this.employeeId, this.attendanceDate).toPromise(),
        this.attendanceService.getLeaveExcuseDetails(this.employeeId, this.attendanceDate).toPromise()
      ]);

      if (employeeResponse) {
        this.employee.set(employeeResponse);
      }

      if (attendanceResponse) {
        this.attendanceRecord.set(attendanceResponse);

        // Set shift from the attendance response (included by backend)
        if (attendanceResponse.shift) {
          this.shift.set(attendanceResponse.shift);
        }
      }

      if (leaveExcuseResponse) {
        this.leaveExcuseDetails.set(leaveExcuseResponse);
      }
    } catch (error) {
      console.error('Error loading attendance details:', error);
      this.error.set(this.i18n.t('attendance.errors.load_failed'));
      this.notificationService.error(this.i18n.t('attendance.errors.load_failed'));
    } finally {
      this.loading.set(false);
    }
  }

  formatTime(time: string | null): string {
    if (!time) return '--:--';
    // The backend sends ActualCheckInTime/ActualCheckOutTime which is already in local time
    // (from TransactionTimeLocal). Parse the time string directly without timezone conversion.
    // Format: "2026-01-18T09:53:00" or similar ISO format
    const match = time.match(/T(\d{2}):(\d{2})/);
    if (match) {
      return `${match[1]}:${match[2]}`;
    }
    // Fallback to Date parsing if pattern doesn't match
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  formatHoursAsTime(hours: number): string {
    if (!hours || hours === 0) return '0:00';

    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);

    if (minutes === 60) {
      return `${wholeHours + 1}:00`;
    }

    const minutesStr = minutes.toString().padStart(2, '0');
    return `${wholeHours}:${minutesStr}`;
  }

  getStatusBadgeClass(status: AttendanceStatus): string {
    switch (status) {
      case AttendanceStatus.Present:
        return 'badge bg-success';
      case AttendanceStatus.Late:
        return 'badge bg-warning';
      case AttendanceStatus.EarlyLeave:
        return 'badge bg-info';
      case AttendanceStatus.Absent:
        return 'badge bg-danger';
      case AttendanceStatus.Holiday:
        return 'badge bg-secondary';
      case AttendanceStatus.OnLeave:
        return 'badge bg-primary';
      default:
        return 'badge bg-secondary';
    }
  }

  getStatusDisplayText(status: AttendanceStatus): string {
    // Handle both numeric and string status values
    const statusKey = typeof status === 'number' ? status.toString() : String(status).toLowerCase();
    return this.i18n.t(`attendance.status.${statusKey}`);
  }

  onEdit(): void {
    const record = this.attendanceRecord();
    if (record) {
      this.router.navigate(['/attendance/edit', record.id]);
    }
  }

  onBack(): void {
    this.router.navigate(['/attendance/daily'], {
      queryParams: { date: this.attendanceDate }
    });
  }

  onRefresh(): void {
    this.loadData();
  }

  getTotalLateMinutes(): number {
    const record = this.attendanceRecord();
    if (!record) return 0;
    return (record.lateMinutes || 0) + (record.earlyLeaveMinutes || 0);
  }

  getShiftStartTime(shift: ShiftInfo): string {
    // Use startTime from ShiftInfo (already formatted) or from periods
    if (shift.startTime) return shift.startTime;
    if (!shift.periods || shift.periods.length === 0) return '--:--';
    return shift.periods[0].startTime;
  }

  getShiftEndTime(shift: ShiftInfo): string {
    // Use endTime from ShiftInfo (already formatted) or from periods
    if (shift.endTime) return shift.endTime;
    if (!shift.periods || shift.periods.length === 0) return '--:--';
    const lastPeriod = shift.periods[shift.periods.length - 1];
    return lastPeriod.endTime;
  }

  getShiftTypeDisplay(shift: ShiftInfo): string {
    return shift.shiftType || 'Time Based';
  }

  // Helper methods for leave/excuse details
  hasLeaveExcuseData(): boolean {
    const details = this.leaveExcuseDetails();
    return details?.hasLeaveExcuseData || false;
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getApprovalStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning';
      case 'rejected':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  // Vacation status helper methods
  getVacationStatusVariant(status: string): 'success' | 'warning' | 'danger' | 'secondary' | 'info' {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'completed':
        return 'secondary';
      case 'pending':
        return 'warning';
      case 'expired':
        return 'danger';
      default:
        return 'warning';
    }
  }

  getVacationStatusIcon(status: string): string {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'fas fa-check-circle';
      case 'completed':
        return 'fas fa-check-double';
      case 'pending':
        return 'fas fa-hourglass-half';
      case 'expired':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-hourglass-half';
    }
  }
}