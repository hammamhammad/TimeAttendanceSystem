import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { AttendanceService } from '../../../core/services/attendance.service';
import { ShiftsService } from '../../../core/services/shifts.service';
import { ShiftAssignmentService } from '../../../core/services/shift-assignment.service';
import { AttendanceRecord } from '../../../shared/models/attendance.model';
import { Shift, ShiftAssignment, ShiftAssignmentType, ShiftAssignmentStatus } from '../../../shared/models/shift.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';

@Component({
  selector: 'app-change-attendance-shift',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    FormSectionComponent
  ],
  templateUrl: './change-attendance-shift.component.html',
  styleUrls: ['./change-attendance-shift.component.css']
})
export class ChangeAttendanceShiftComponent implements OnInit {
  public i18n = inject(I18nService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private attendanceService = inject(AttendanceService);
  private shiftsService = inject(ShiftsService);
  private shiftAssignmentService = inject(ShiftAssignmentService);
  private notificationService = inject(NotificationService);

  // Signals
  loading = signal(false);
  saving = signal(false);
  attendanceRecord = signal<AttendanceRecord | null>(null);
  availableShifts = signal<Shift[]>([]);
  currentShiftAssignment = signal<ShiftAssignment | null>(null);
  currentShift = signal<Shift | null>(null);
  error = signal<string | null>(null);

  changeShiftForm: FormGroup;

  constructor() {
    this.changeShiftForm = this.fb.group({
      shiftId: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadAttendanceRecord();
  }

  private loadAttendanceRecord(): void {
    const attendanceId = this.route.snapshot.paramMap.get('attendanceId');
    if (!attendanceId) {
      this.router.navigate(['/attendance']);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.attendanceService.getAttendanceById(+attendanceId).subscribe({
      next: (record) => {
        this.attendanceRecord.set(record);
        this.loadShifts();
        this.loadCurrentShiftAssignment();
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load attendance record:', error);
        this.error.set(this.i18n.t('attendance.errors.load_failed'));
        this.loading.set(false);
      }
    });
  }

  private loadShifts(): void {
    this.shiftsService.getActiveShifts().subscribe({
      next: (response) => {
        this.availableShifts.set(response.items);
      },
      error: (error) => {
        console.error('Failed to load shifts:', error);
        this.notificationService.error(this.i18n.t('shifts.errors.load_failed'));
      }
    });
  }

  private loadCurrentShiftAssignment(): void {
    const record = this.attendanceRecord();
    if (!record?.employeeId) {
      return;
    }

    this.shiftAssignmentService.getShiftAssignments({
      employeeId: record.employeeId,
      assignmentType: ShiftAssignmentType.Employee,
      status: ShiftAssignmentStatus.Active,
      currentlyActive: true,
      pageSize: 1
    }).subscribe({
      next: (response) => {
        if (response.items && response.items.length > 0) {
          const assignment = response.items[0];
          this.currentShiftAssignment.set(assignment);
          this.loadCurrentShiftDetails(assignment.shiftId);
        } else {
          this.currentShiftAssignment.set(null);
          this.currentShift.set(null);
        }
      },
      error: (error) => {
        console.error('Failed to load current shift assignment:', error);
        this.currentShiftAssignment.set(null);
        this.currentShift.set(null);
      }
    });
  }

  private loadCurrentShiftDetails(shiftId: number): void {
    this.shiftsService.getShiftById(shiftId).subscribe({
      next: (shift) => {
        this.currentShift.set(shift);
      },
      error: (error) => {
        console.error('Failed to load current shift details:', error);
        this.currentShift.set(null);
      }
    });
  }

  onSubmit(): void {
    if (this.changeShiftForm.invalid || !this.attendanceRecord()) {
      this.changeShiftForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    const formValue = this.changeShiftForm.value;
    const record = this.attendanceRecord()!;

    const changeData = {
      attendanceId: record.id,
      shiftId: +formValue.shiftId,
      notes: formValue.notes || undefined
    };

    this.attendanceService.changeAttendanceShift(changeData).subscribe({
      next: () => {
        this.notificationService.success(
          this.i18n.t('attendance.success.shift_changed')
        );
        this.router.navigate(['/attendance']);
      },
      error: (error: any) => {
        console.error('Failed to change attendance shift:', error);
        this.error.set(this.i18n.t('attendance.errors.shift_change_failed'));
        this.saving.set(false);
      }
    });
  }

  onReset(): void {
    this.changeShiftForm.reset({
      shiftId: '',
      notes: ''
    });
    this.error.set(null);
  }

  onCancel(): void {
    this.router.navigate(['/attendance']);
  }

  // Helper methods
  getEmployeeInitials(): string {
    const record = this.attendanceRecord();
    if (!record?.employeeName) return '';

    const nameParts = record.employeeName.split(' ');
    const first = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() : '';
    const last = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : '';
    return first + last;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getCurrentShiftName(): string {
    const shift = this.currentShift();
    return shift ? shift.name : this.i18n.t('attendance.no_shift_assigned');
  }

  getCurrentShiftTime(): string {
    const shift = this.currentShift();
    if (!shift) return '';

    if (shift.shiftPeriods && shift.shiftPeriods.length > 0) {
      const firstPeriod = shift.shiftPeriods[0];
      const lastPeriod = shift.shiftPeriods[shift.shiftPeriods.length - 1];
      return `${firstPeriod.startTime} - ${lastPeriod.endTime}`;
    }

    return this.i18n.t('shifts.time_not_specified');
  }

  getShiftTimeDisplay(shift: any): string {
    if (shift.shiftPeriods && shift.shiftPeriods.length > 0) {
      const firstPeriod = shift.shiftPeriods[0];
      const lastPeriod = shift.shiftPeriods[shift.shiftPeriods.length - 1];
      return `${firstPeriod.startTime} - ${lastPeriod.endTime}`;
    }
    return this.i18n.t('shifts.time_not_specified');
  }

  // Form validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.changeShiftForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  hasError(fieldName: string): boolean {
    return this.isFieldInvalid(fieldName);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.changeShiftForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return this.i18n.t('validation.required');
    }

    return '';
  }
}