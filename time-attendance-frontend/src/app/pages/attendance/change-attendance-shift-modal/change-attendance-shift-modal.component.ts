import { Component, Input, Output, EventEmitter, signal, inject, OnInit, OnChanges, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceRecord } from '../../../shared/models/attendance.model';
import { Shift, ShiftAssignment, ShiftAssignmentType, ShiftAssignmentStatus } from '../../../shared/models/shift.model';
import { ShiftsService } from '../../../core/services/shifts.service';
import { ShiftAssignmentService } from '../../../core/services/shift-assignment.service';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-change-attendance-shift-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <!-- Modal -->
    <div class="modal fade show"
         [style.display]="show ? 'block' : 'none'"
         [class.d-block]="show"
         tabindex="-1"
         role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-clock me-2"></i>
              {{ i18n.t('attendance.change_shift.title') || 'Change Attendance Shift' }}
            </h5>
            <button type="button" class="btn-close" (click)="onClose()"></button>
          </div>

          <div class="modal-body">
            <div *ngIf="attendanceRecord">
              <!-- Employee and Date info -->
              <div class="alert alert-info">
                <div class="d-flex align-items-center">
                  <div class="avatar-sm me-3">
                    <div class="avatar-initial bg-primary text-white rounded-circle">
                      {{ getInitials(attendanceRecord.employeeName) }}
                    </div>
                  </div>
                  <div>
                    <h6 class="mb-1">{{ attendanceRecord.employeeName }}</h6>
                    <small class="text-muted">
                      {{ attendanceRecord.employeeNumber }} •
                      {{ formatDate(attendanceRecord.attendanceDate) }}
                    </small>
                  </div>
                </div>
              </div>

              <!-- Current shift info -->
              <div class="mb-3">
                <label class="form-label">{{ i18n.t('attendance.change_shift.current_shift') || 'Current Shift' }}</label>
                <div class="card bg-light">
                  <div class="card-body py-2">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{{ getCurrentShiftName() }}</strong>
                        <div class="small text-muted">
                          {{ getCurrentShiftTime() }}
                        </div>
                      </div>
                      <span class="badge bg-light text-dark border">{{ i18n.t('attendance.change_shift.current') || 'Current' }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Error message display -->
              <div class="alert alert-danger" *ngIf="errorMessage()">
                <i class="fas fa-exclamation-triangle me-2"></i>
                {{ errorMessage() }}
              </div>

              <!-- Change shift form -->
              <form [formGroup]="changeShiftForm" (ngSubmit)="onSubmit()">
                <!-- New shift selection -->
                <div class="mb-3">
                  <label for="shiftId" class="form-label">
                    {{ i18n.t('attendance.change_shift.new_shift') || 'New Shift' }} *
                  </label>
                  <select id="shiftId"
                          class="form-select"
                          formControlName="shiftId"
                          [class.is-invalid]="changeShiftForm.get('shiftId')?.invalid && changeShiftForm.get('shiftId')?.touched">
                    <option value="">{{ i18n.t('attendance.change_shift.select_shift') || 'Select a shift...' }}</option>
                    <option *ngFor="let shift of availableShifts()"
                            [value]="shift.id">
                      {{ shift.name }} ({{ getShiftTimeDisplay(shift) }})
                    </option>
                  </select>
                  <div class="invalid-feedback" *ngIf="changeShiftForm.get('shiftId')?.invalid && changeShiftForm.get('shiftId')?.touched">
                    {{ i18n.t('attendance.change_shift.please_select_shift') || 'Please select a shift.' }}
                  </div>
                </div>

                <!-- Notes -->
                <div class="mb-3">
                  <label for="notes" class="form-label">{{ i18n.t('attendance.change_shift.notes') || 'Notes' }}</label>
                  <textarea id="notes"
                            class="form-control"
                            rows="3"
                            formControlName="notes"
                            [placeholder]="i18n.t('attendance.change_shift.notes_placeholder') || 'Optional notes about this shift change...'"></textarea>
                </div>

                <!-- Warning message -->
                <div class="alert alert-warning">
                  <i class="fas fa-info-circle me-2"></i>
                  {{ i18n.t('attendance.change_shift.warning') || 'Changing the shift will recalculate the attendance record based on the new shift schedule.' }}
                </div>
              </form>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button"
                    class="btn btn-secondary"
                    (click)="onClose()"
                    [disabled]="submitting()">
              {{ i18n.t('app.cancel') || 'Cancel' }}
            </button>
            <button type="button"
                    class="btn btn-primary"
                    (click)="onSubmit()"
                    [disabled]="changeShiftForm.invalid || submitting()">
              <span *ngIf="submitting()" class="spinner-border spinner-border-sm me-2"></span>
              <i *ngIf="!submitting()" class="fas fa-save me-2"></i>
              {{ submitting() ? (i18n.t('attendance.change_shift.changing') || 'Changing...') : (i18n.t('attendance.change_shift.change_shift') || 'Change Shift') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div class="modal-backdrop fade show" *ngIf="show" (click)="onClose()"></div>
  `,
  styles: [`
    .modal {
      z-index: 1055;
    }

    .modal-backdrop {
      z-index: 1050;
    }

    .avatar-sm {
      width: 2.5rem;
      height: 2.5rem;
    }

    .avatar-initial {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 1rem;
      font-weight: 600;
    }
  `]
})
export class ChangeAttendanceShiftModalComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private shiftsService = inject(ShiftsService);
  private shiftAssignmentService = inject(ShiftAssignmentService);
  public i18n = inject(I18nService);

  @Input() show = false;
  @Input() attendanceRecord: AttendanceRecord | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() shiftChanged = new EventEmitter<{attendanceRecord: AttendanceRecord, shiftId: number, notes?: string}>();

  availableShifts = signal<Shift[]>([]);
  currentShiftAssignment = signal<ShiftAssignment | null>(null);
  currentShift = signal<Shift | null>(null);
  submitting = signal(false);
  errorMessage = signal<string | null>(null);

  changeShiftForm: FormGroup;

  constructor() {
    this.changeShiftForm = this.fb.group({
      shiftId: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit() {
    if (this.show) {
      this.loadShifts();
    }
  }

  ngOnChanges() {
    if (this.show && this.attendanceRecord) {
      this.loadShifts();
      this.loadCurrentShiftAssignment();
      this.resetForm();
    }
  }

  private loadShifts() {
    this.shiftsService.getActiveShifts().subscribe({
      next: (response) => {
        // Include all active shifts (user should be able to select any shift)
        this.availableShifts.set(response.items);
      },
      error: (error) => {
        console.error('Failed to load shifts:', error);
        this.errorMessage.set('Failed to load available shifts. Please try again.');
      }
    });
  }

  private loadCurrentShiftAssignment() {
    if (!this.attendanceRecord?.employeeId) {
      return;
    }

    // Get current shift assignment for the employee
    this.shiftAssignmentService.getShiftAssignments({
      employeeId: this.attendanceRecord.employeeId,
      assignmentType: ShiftAssignmentType.Employee,
      status: ShiftAssignmentStatus.Active,
      currentlyActive: true,
      pageSize: 1
    }).subscribe({
      next: (response) => {
        if (response.items && response.items.length > 0) {
          const assignment = response.items[0];
          this.currentShiftAssignment.set(assignment);

          // Also load the shift details
          this.loadCurrentShiftDetails(assignment.shiftId);
        } else {
          // No active shift assignment found
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

  private loadCurrentShiftDetails(shiftId: number) {
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

  private resetForm() {
    this.changeShiftForm.reset({
      shiftId: '',
      notes: ''
    });

    // Clear any error messages
    this.clearError();
  }

  onSubmit() {
    if (this.changeShiftForm.invalid || !this.attendanceRecord) {
      return;
    }

    // Clear any previous error messages
    this.clearError();
    this.submitting.set(true);
    const formValue = this.changeShiftForm.value;

    this.shiftChanged.emit({
      attendanceRecord: this.attendanceRecord,
      shiftId: +formValue.shiftId,
      notes: formValue.notes || undefined
    });
  }

  onClose() {
    this.close.emit();
  }

  getInitials(fullName: string): string {
    if (!fullName) return '';
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }

  // Called from parent to reset submitting state and show errors
  resetSubmitting() {
    this.submitting.set(false);
  }

  // Called from parent to show error message
  showError(message: string) {
    this.errorMessage.set(message);
    this.submitting.set(false);
  }

  // Clear error message
  clearError() {
    this.errorMessage.set(null);
  }

  getCurrentShiftName(): string {
    const currentShift = this.currentShift();
    const currentAssignment = this.currentShiftAssignment();

    if (currentShift) {
      return currentShift.name;
    } else if (currentAssignment) {
      return currentAssignment.shiftName || 'Unknown Shift';
    } else {
      return this.i18n.t('attendance.change_shift.no_shift_assigned') || 'No shift assigned';
    }
  }

  getCurrentShiftTime(): string {
    const currentShift = this.currentShift();

    if (currentShift) {
      // For time-based shifts, show the first period time range
      if (currentShift.shiftType === 1 && currentShift.shiftPeriods && currentShift.shiftPeriods.length > 0) {
        const firstPeriod = currentShift.shiftPeriods[0];
        const lastPeriod = currentShift.shiftPeriods[currentShift.shiftPeriods.length - 1];
        return `${firstPeriod.startTime} - ${lastPeriod.endTime}`;
      }
      // For hours-only shifts, show required hours
      else if (currentShift.shiftType === 2 && currentShift.requiredHours) {
        return `${currentShift.requiredHours} ${this.i18n.t('shifts.hours') || 'hours'} required`;
      }
    }

    // Fallback to attendance record times if available
    if (this.attendanceRecord?.scheduledStartTime && this.attendanceRecord?.scheduledEndTime) {
      return `${this.formatTime(this.attendanceRecord.scheduledStartTime)} - ${this.formatTime(this.attendanceRecord.scheduledEndTime)}`;
    }

    return this.i18n.t('attendance.change_shift.time_not_specified') || 'Time not specified';
  }

  getShiftTimeDisplay(shift: Shift): string {
    if (shift.shiftPeriods && shift.shiftPeriods.length > 0) {
      const firstPeriod = shift.shiftPeriods[0];
      const lastPeriod = shift.shiftPeriods[shift.shiftPeriods.length - 1];
      return `${firstPeriod.startTime} - ${lastPeriod.endTime}`;
    }
    return 'Time not specified';
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  formatTime(time: string | Date): string {
    if (!time) return '';
    const d = new Date(time);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}