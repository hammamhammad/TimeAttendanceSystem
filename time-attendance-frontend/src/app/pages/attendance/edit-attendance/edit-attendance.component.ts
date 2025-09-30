import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from '../../../core/services/attendance.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { NotificationService } from '../../../core/notifications/notification.service';
import {
  AttendanceRecord,
  AttendanceStatus,
  UpdateAttendanceRecordRequest
} from '../../../shared/models/attendance.model';

@Component({
  selector: 'app-edit-attendance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, StatusBadgeComponent],
  templateUrl: './edit-attendance.component.html',
  styleUrls: ['./edit-attendance.component.css']
})
export class EditAttendanceComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private attendanceService = inject(AttendanceService);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  // Signals for reactive state management
  attendanceRecord = signal<AttendanceRecord | null>(null);
  loading = signal(true);
  saving = signal(false);
  error = signal<string | null>(null);

  // Form group for editing
  editForm: FormGroup;

  // Constants for template
  AttendanceStatus = AttendanceStatus;
  availableStatuses = [
    { value: AttendanceStatus.Present, label: 'attendance.status.present' },
    { value: AttendanceStatus.Absent, label: 'attendance.status.absent' },
    { value: AttendanceStatus.Late, label: 'attendance.status.late' },
    { value: AttendanceStatus.EarlyLeave, label: 'attendance.status.early_leave' },
    { value: AttendanceStatus.OnLeave, label: 'attendance.status.on_leave' },
    { value: AttendanceStatus.DayOff, label: 'attendance.status.day_off' },
    { value: AttendanceStatus.Overtime, label: 'attendance.status.overtime' },
    { value: AttendanceStatus.Holiday, label: 'attendance.status.holiday' },
    { value: AttendanceStatus.SickLeave, label: 'attendance.status.sick_leave' }
  ];

  recordId: number | null = null;
  private returnDate: string | null = null;

  // Additional signals for business rules
  shiftHasBreak = signal(false);
  calculatedStatus = signal<AttendanceStatus | null>(null);
  calculatedWorkingHours = signal(0);
  calculatedOvertimeHours = signal(0);
  calculatedLateMinutes = signal(0);
  calculatedEarlyLeaveMinutes = signal(0);
  totalLateMinutes = signal(0);

  /**
   * Computed property for status badge
   */
  statusBadge = computed<{ label: string; variant: 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'primary' }>(() => {
    const status = this.calculatedStatus();
    if (!status) {
      return { label: this.i18n.t('attendance.status.pending'), variant: 'secondary' };
    }

    const label = this.i18n.t(this.getStatusText(status));

    switch (status) {
      case AttendanceStatus.Present:
        return { label, variant: 'success' };
      case AttendanceStatus.Absent:
        return { label, variant: 'danger' };
      case AttendanceStatus.Late:
      case AttendanceStatus.EarlyLeave:
      case AttendanceStatus.SickLeave:
        return { label, variant: 'warning' };
      case AttendanceStatus.OnLeave:
        return { label, variant: 'info' };
      case AttendanceStatus.Overtime:
        return { label, variant: 'primary' };
      case AttendanceStatus.DayOff:
      case AttendanceStatus.Holiday:
      default:
        return { label, variant: 'secondary' };
    }
  });

  constructor() {
    // Simplified form - only editable fields based on business rules
    this.editForm = this.fb.group({
      actualCheckInTime: [''],
      actualCheckOutTime: [''],
      breakHours: [null, [Validators.min(0), Validators.max(24)]], // Conditionally visible
      isApproved: [false],
      notes: ['', [Validators.maxLength(1000)]],
      overrideNotes: ['', [Validators.maxLength(500)]]
    });

    // Note: Removed client-side calculation listeners
    // The "Hours & Calculations" section now shows backend values only
    // for accurate flexible hours business logic
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.recordId = parseInt(id, 10);
        this.loadAttendanceRecord(this.recordId);
      } else {
        this.error.set('Invalid attendance record ID');
        this.loading.set(false);
      }
    });

    // Capture the return date from query parameters
    this.route.queryParams.subscribe(params => {
      this.returnDate = params['returnDate'] || null;
    });
  }

  /**
   * Load attendance record by ID
   */
  private loadAttendanceRecord(recordId: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.attendanceService.getAttendanceRecordById(recordId).subscribe({
      next: (record) => {
        this.attendanceRecord.set(record);
        this.populateForm(record);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading attendance record:', error);
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }
    });
  }

  /**
   * Populate form with existing record data
   */
  private populateForm(record: AttendanceRecord): void {
    // Only populate editable fields
    this.editForm.patchValue({
      actualCheckInTime: this.formatTimeForInput(record.actualCheckInTime),
      actualCheckOutTime: this.formatTimeForInput(record.actualCheckOutTime),
      breakHours: record.breakHours || null,
      isApproved: record.isApproved,
      notes: record.notes || '',
      overrideNotes: ''
    });

    // Use the backend's calculated values directly - they include flexible hours logic
    this.calculatedStatus.set(record.status);
    this.calculatedWorkingHours.set(record.workingHours || 0);
    this.calculatedOvertimeHours.set(record.overtimeHours || 0);
    this.calculatedLateMinutes.set(record.lateMinutes || 0);
    this.calculatedEarlyLeaveMinutes.set(record.earlyLeaveMinutes || 0);

    // Calculate total late minutes (could be historical data)
    this.calculateTotalLateMinutes(record);

    // Determine if shift has break (mock logic - would normally come from shift data)
    this.determineShiftBreakSettings(record);

    // Don't override backend calculations with client-side calculations
    // The backend values are authoritative and include flexible hours business logic
  }

  /**
   * Determine if the employee's shift includes break time
   */
  private determineShiftBreakSettings(record: AttendanceRecord): void {
    // This would normally query shift assignment data
    // For now, assume break is included if breakHours > 0 in record
    this.shiftHasBreak.set((record.breakHours || 0) > 0);
  }

  /**
   * Calculate total late minutes (late minutes + early leave minutes)
   */
  private calculateTotalLateMinutes(record: AttendanceRecord): void {
    // Total late includes both late check-in and early leave
    const lateMinutes = record.lateMinutes || 0;
    const earlyLeaveMinutes = record.earlyLeaveMinutes || 0;
    this.totalLateMinutes.set(lateMinutes + earlyLeaveMinutes);
  }

  /**
   * Calculate dependent fields based on check-in/check-out times
   * Uses backend calculation service for accurate business logic
   */
  private calculateFields(): void {
    const record = this.attendanceRecord();
    if (!record) return;

    const checkInTime = this.editForm.get('actualCheckInTime')?.value;
    const checkOutTime = this.editForm.get('actualCheckOutTime')?.value;

    if (!checkInTime || !checkOutTime) {
      // Reset calculated values if times are incomplete
      this.calculatedStatus.set(AttendanceStatus.Incomplete);
      this.calculatedWorkingHours.set(0);
      this.calculatedOvertimeHours.set(0);
      this.calculatedLateMinutes.set(0);
      this.calculatedEarlyLeaveMinutes.set(0);
      return;
    }

    // For manual calculations during editing, call backend service
    // to ensure consistent business logic with flexible hours
    this.calculateFieldsUsingBackend();
  }

  /**
   * Use backend calculation service to get accurate values
   * This ensures consistent business logic including flexible hours
   */
  private calculateFieldsUsingBackend(): void {
    const record = this.attendanceRecord();
    if (!record || !this.recordId) return;

    const checkInTime = this.editForm.get('actualCheckInTime')?.value;
    const checkOutTime = this.editForm.get('actualCheckOutTime')?.value;

    if (!checkInTime || !checkOutTime) return;

    // Create a request with updated times to get calculated values
    const request: UpdateAttendanceRecordRequest = {
      actualCheckInTime: this.convertTimeToDateTime(checkInTime),
      actualCheckOutTime: this.convertTimeToDateTime(checkOutTime),
      breakHours: this.editForm.get('breakHours')?.value || undefined
    };

    // Call backend to get calculated values (without saving)
    // For now, we'll use client-side calculation as fallback
    // Note: Using backend business logic values only
    // No client-side calculations needed as they don't match backend flexible hours logic
  }


  /**
   * Format time string for HTML time input
   */
  private formatTimeForInput(timeString: string | null): string {
    if (!timeString) return '';

    try {
      // Handle both full datetime and time-only strings
      let date: Date;
      if (timeString.includes('T')) {
        date = new Date(timeString);
      } else {
        date = new Date(`1970-01-01T${timeString}`);
      }

      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch {
      return '';
    }
  }

  /**
   * Convert time string (HH:mm) to DateTime string for API
   */
  private convertTimeToDateTime(timeString: string | null): string | undefined {
    if (!timeString) return undefined;

    const record = this.attendanceRecord();
    if (!record) return undefined;

    try {
      // Use the attendance date as the date part
      const attendanceDate = new Date(record.attendanceDate);
      const year = attendanceDate.getFullYear();
      const month = (attendanceDate.getMonth() + 1).toString().padStart(2, '0');
      const day = attendanceDate.getDate().toString().padStart(2, '0');

      // Combine date with time
      const dateTimeString = `${year}-${month}-${day}T${timeString}:00`;

      // Validate by parsing
      const testDate = new Date(dateTimeString);
      if (isNaN(testDate.getTime())) {
        return undefined;
      }

      return dateTimeString;
    } catch {
      return undefined;
    }
  }

  /**
   * Save attendance record changes
   */
  onSave(): void {
    if (this.editForm.invalid) {
      this.markFormGroupTouched(this.editForm);
      this.notificationService.error('Please fix validation errors before saving');
      return;
    }

    if (!this.recordId) {
      this.notificationService.error('Invalid record ID');
      return;
    }

    // Validate that manual overrides require override notes
    const formValue = this.editForm.value;
    if (this.hasManualOverrides(formValue) && !formValue.overrideNotes?.trim()) {
      this.notificationService.error('Override notes are required when making manual adjustments');
      return;
    }

    // Validate time order
    if (formValue.actualCheckInTime && formValue.actualCheckOutTime) {
      const checkInDateTime = this.convertTimeToDateTime(formValue.actualCheckInTime);
      const checkOutDateTime = this.convertTimeToDateTime(formValue.actualCheckOutTime);

      if (checkInDateTime && checkOutDateTime) {
        const checkIn = new Date(checkInDateTime);
        const checkOut = new Date(checkOutDateTime);
        if (checkOut <= checkIn) {
          this.notificationService.error('Check-out time must be after check-in time');
          return;
        }
      }
    }

    // Validate break hours
    if (formValue.breakHours && formValue.breakHours < 0) {
      this.notificationService.error('Break hours cannot be negative');
      return;
    }

    this.saving.set(true);

    const request: UpdateAttendanceRecordRequest = {
      // Only send editable fields - calculated fields will be computed by backend
      actualCheckInTime: this.convertTimeToDateTime(formValue.actualCheckInTime),
      actualCheckOutTime: this.convertTimeToDateTime(formValue.actualCheckOutTime),
      breakHours: formValue.breakHours || undefined,
      isApproved: formValue.isApproved || undefined,
      notes: formValue.notes?.trim() || undefined,
      overrideNotes: formValue.overrideNotes?.trim() || undefined
    };

    this.attendanceService.updateAttendanceRecord(this.recordId, request).subscribe({
      next: (updatedRecord) => {
        this.attendanceRecord.set(updatedRecord);
        this.saving.set(false);
        this.notificationService.success('Attendance record updated successfully');
        this.navigateBackToDailyAttendance();
      },
      error: (error) => {
        console.error('Error updating attendance record:', error);
        this.saving.set(false);
        this.notificationService.error(this.getErrorMessage(error));
      }
    });
  }

  /**
   * Check if form has manual overrides
   */
  private hasManualOverrides(formValue: any): boolean {
    const originalRecord = this.attendanceRecord();
    if (!originalRecord) return false;

    return formValue.actualCheckInTime !== this.formatTimeForInput(originalRecord.actualCheckInTime) ||
           formValue.actualCheckOutTime !== this.formatTimeForInput(originalRecord.actualCheckOutTime) ||
           formValue.breakHours !== originalRecord.breakHours;
  }

  /**
   * Navigate back to daily attendance page with preserved date
   */
  private navigateBackToDailyAttendance(): void {
    if (this.returnDate) {
      this.router.navigate(['/attendance/daily'], {
        queryParams: { date: this.returnDate }
      });
    } else {
      this.router.navigate(['/attendance/daily']);
    }
  }

  /**
   * Cancel editing and go back
   */
  onCancel(): void {
    this.navigateBackToDailyAttendance();
  }

  /**
   * Reset form to original values
   */
  onReset(): void {
    const record = this.attendanceRecord();
    if (record) {
      this.populateForm(record);
      this.notificationService.info('Form reset to original values');
    }
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
      case AttendanceStatus.Holiday:
        return 'attendance.status.holiday';
      case AttendanceStatus.SickLeave:
        return 'attendance.status.sick_leave';
      default:
        return 'attendance.status.pending';
    }
  }

  /**
   * Get status badge class
   */
  getStatusBadgeClass(status: AttendanceStatus | null): string {
    if (!status) return 'badge bg-secondary';

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
      case AttendanceStatus.Holiday:
        return 'badge bg-secondary';
      case AttendanceStatus.SickLeave:
        return 'badge bg-warning';
      default:
        return 'badge bg-secondary';
    }
  }

  /**
   * Get status display text
   */
  getStatusDisplayText(status: AttendanceStatus | null): string {
    if (!status) return this.i18n.t('attendance.status.pending');
    return this.i18n.t(this.getStatusText(status));
  }

  /**
   * Get error message from HTTP error
   */
  private getErrorMessage(error: any): string {
    if (error?.status === 403) {
      return 'You do not have permission to edit attendance records';
    }
    if (error?.status === 404) {
      return 'Attendance record not found';
    }
    if (error?.error && typeof error.error === 'string') {
      return error.error;
    }
    if (error?.message) {
      return error.message;
    }
    return 'An error occurred while processing your request';
  }

  /**
   * Mark all form controls as touched to show validation errors
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Get form control error message
   */
  getControlErrorMessage(controlName: string): string {
    const control = this.editForm.get(controlName);
    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return `${controlName} is required`;
    }
    if (control.errors['min']) {
      return `${controlName} must be greater than or equal to ${control.errors['min'].min}`;
    }
    if (control.errors['max']) {
      return `${controlName} must be less than or equal to ${control.errors['max'].max}`;
    }
    if (control.errors['maxlength']) {
      return `${controlName} cannot exceed ${control.errors['maxlength'].requiredLength} characters`;
    }

    return 'Invalid value';
  }

  /**
   * Check if form control has error
   */
  hasControlError(controlName: string): boolean {
    const control = this.editForm.get(controlName);
    return !!(control?.touched && control?.invalid);
  }

  /**
   * Format decimal hours to time format (H:MM)
   * Example: 7.983333 becomes "7:59"
   */
  formatHoursAsTime(hours: number): string {
    if (!hours || hours === 0) return '0:00';

    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);

    // Handle case where minutes round to 60
    if (minutes === 60) {
      return `${wholeHours + 1}:00`;
    }

    const minutesStr = minutes.toString().padStart(2, '0');
    return `${wholeHours}:${minutesStr}`;
  }
}