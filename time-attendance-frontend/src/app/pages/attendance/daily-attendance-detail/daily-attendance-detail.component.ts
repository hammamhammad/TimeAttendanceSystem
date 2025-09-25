import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { AttendanceService } from '../../../core/services/attendance.service';
import { EmployeesService } from '../../employees/employees.service';
import { ShiftsService } from '../../shifts/shifts.service';
import { AttendanceRecord } from '../../../shared/models/attendance.model';
import { Employee } from '../../../shared/models/employee.model';
import { Shift, ShiftType } from '../../../shared/models/shift.model';
import { AttendanceStatus } from '../../../shared/models/attendance.model';

@Component({
  selector: 'app-daily-attendance-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
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
  shift = signal<Shift | null>(null);

  // Route parameters
  employeeId!: number;
  attendanceDate!: string;

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
      // Load employee, attendance record, and shift data in parallel
      const [employeeResponse, attendanceResponse] = await Promise.all([
        this.employeesService.getEmployeeById(this.employeeId).toPromise(),
        this.attendanceService.getEmployeeAttendanceRecord(this.employeeId, this.attendanceDate).toPromise()
      ]);

      if (employeeResponse) {
        this.employee.set(employeeResponse);
      }

      if (attendanceResponse) {
        this.attendanceRecord.set(attendanceResponse);

        // Note: Shift information would need to be loaded differently
        // since AttendanceRecord doesn't include shiftId directly
        // This would require an additional API call or backend enhancement
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

  getShiftStartTime(shift: Shift): string {
    if (!shift.shiftPeriods || shift.shiftPeriods.length === 0) return '--:--';
    return shift.shiftPeriods[0].startTime;
  }

  getShiftEndTime(shift: Shift): string {
    if (!shift.shiftPeriods || shift.shiftPeriods.length === 0) return '--:--';
    const lastPeriod = shift.shiftPeriods[shift.shiftPeriods.length - 1];
    return lastPeriod.endTime;
  }

  getShiftTypeDisplay(shift: Shift): string {
    return shift.shiftType === ShiftType.TimeBased ? 'Time Based' : 'Hours Only';
  }
}