import { Component, Input, Output, EventEmitter, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDto } from '../../../shared/models/employee.model';
import { Shift } from '../../../shared/models/shift.model';
import { ShiftsService } from '../../../core/services/shifts.service';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-change-shift-modal',
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
              Change Employee Shift
            </h5>
            <button type="button" class="btn-close" (click)="onClose()"></button>
          </div>

          <div class="modal-body">
            <div *ngIf="employee">
              <!-- Employee info -->
              <div class="alert alert-info">
                <div class="d-flex align-items-center">
                  <div class="avatar-sm me-3">
                    <div class="avatar-initial bg-primary text-white rounded-circle">
                      {{ getInitials(employee.firstName, employee.lastName) }}
                    </div>
                  </div>
                  <div>
                    <h6 class="mb-1">{{ employee.firstName }} {{ employee.lastName }}</h6>
                    <small class="text-muted">{{ employee.departmentName }} - {{ employee.branchName }}</small>
                  </div>
                </div>
              </div>

              <!-- Current shift info -->
              <div class="mb-3" *ngIf="employee.currentShiftId">
                <label class="form-label">Current Shift</label>
                <div class="card bg-light">
                  <div class="card-body py-2">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{{ employee.currentShiftName }}</strong>
                        <div class="small text-muted">
                          {{ getCurrentShiftDisplay() }}
                        </div>
                      </div>
                      <span class="badge bg-primary">Current</span>
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
                  <label for="shiftId" class="form-label">New Shift *</label>
                  <select id="shiftId"
                          class="form-select"
                          formControlName="shiftId"
                          [class.is-invalid]="changeShiftForm.get('shiftId')?.invalid && changeShiftForm.get('shiftId')?.touched">
                    <option value="">Select a shift...</option>
                    <option *ngFor="let shift of availableShifts()"
                            [value]="shift.id">
                      {{ shift.name }} ({{ getShiftTimeDisplay(shift) }})
                    </option>
                  </select>
                  <div class="invalid-feedback" *ngIf="changeShiftForm.get('shiftId')?.invalid && changeShiftForm.get('shiftId')?.touched">
                    Please select a shift.
                  </div>
                </div>

                <!-- Effective date -->
                <div class="mb-3">
                  <label for="effectiveDate" class="form-label">Effective Date *</label>
                  <input type="date"
                         id="effectiveDate"
                         class="form-control"
                         formControlName="effectiveDate"
                         [class.is-invalid]="changeShiftForm.get('effectiveDate')?.invalid && changeShiftForm.get('effectiveDate')?.touched">
                  <div class="invalid-feedback" *ngIf="changeShiftForm.get('effectiveDate')?.errors?.['futureDate'] && changeShiftForm.get('effectiveDate')?.touched">
                    Effective date must be greater than today's date.
                  </div>
                  <div class="form-text">Shift assignments must be planned in advance.</div>
                </div>

                <!-- Notes -->
                <div class="mb-3">
                  <label for="notes" class="form-label">Notes</label>
                  <textarea id="notes"
                            class="form-control"
                            rows="3"
                            formControlName="notes"
                            placeholder="Optional notes about this shift change..."></textarea>
                </div>
              </form>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button"
                    class="btn btn-secondary"
                    (click)="onClose()"
                    [disabled]="submitting()">
              Cancel
            </button>
            <button type="button"
                    class="btn btn-primary"
                    (click)="onSubmit()"
                    [disabled]="changeShiftForm.invalid || submitting()">
              <span *ngIf="submitting()" class="spinner-border spinner-border-sm me-2"></span>
              <i *ngIf="!submitting()" class="fas fa-save me-2"></i>
              {{ submitting() ? 'Changing...' : 'Change Shift' }}
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
export class ChangeShiftModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private shiftsService = inject(ShiftsService);
  private i18n = inject(I18nService);

  @Input() show = false;
  @Input() employee: EmployeeDto | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() shiftChanged = new EventEmitter<{employee: EmployeeDto, shiftData: any}>();

  availableShifts = signal<Shift[]>([]);
  submitting = signal(false);
  errorMessage = signal<string | null>(null);

  changeShiftForm: FormGroup;

  constructor() {
    // Set effective date to tomorrow to meet validation requirement
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.changeShiftForm = this.fb.group({
      shiftId: ['', Validators.required],
      effectiveDate: [tomorrow.toISOString().split('T')[0], this.futureDateValidator()],
      notes: ['']
    });
  }

  ngOnInit() {
    if (this.show) {
      this.loadShifts();
    }
  }

  ngOnChanges() {
    if (this.show && this.employee) {
      this.loadShifts();
      this.resetForm();
    }
  }

  private loadShifts() {
    this.shiftsService.getActiveShifts().subscribe({
      next: (response) => {
        // Filter out the current shift if employee has one
        let shifts = response.items;
        if (this.employee?.currentShiftId) {
          shifts = shifts.filter(shift => shift.id !== this.employee!.currentShiftId);
        }
        this.availableShifts.set(shifts);
      },
      error: (error) => {
        console.error('Failed to load shifts:', error);
      }
    });
  }

  private futureDateValidator() {
    return (control: any) => {
      if (!control.value) return null;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(control.value);
      selectedDate.setHours(0, 0, 0, 0);

      return selectedDate > today ? null : { futureDate: true };
    };
  }

  private resetForm() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.changeShiftForm.reset({
      shiftId: '',
      effectiveDate: tomorrow.toISOString().split('T')[0],
      notes: ''
    });

    // Clear any error messages
    this.clearError();
  }

  onSubmit() {
    if (this.changeShiftForm.invalid || !this.employee) {
      return;
    }

    // Clear any previous error messages
    this.clearError();
    this.submitting.set(true);
    const formValue = this.changeShiftForm.value;

    const shiftData = {
      shiftId: +formValue.shiftId,
      effectiveDate: formValue.effectiveDate || undefined,
      notes: formValue.notes || undefined
    };

    this.shiftChanged.emit({
      employee: this.employee,
      shiftData: shiftData
    });
  }

  onClose() {
    this.close.emit();
  }

  getInitials(firstName: string, lastName: string): string {
    const first = firstName ? firstName.charAt(0).toUpperCase() : '';
    const last = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + last;
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

  getCurrentShiftDisplay(): string {
    if (!this.employee?.currentShiftName) {
      return 'No current shift assigned';
    }

    // Check if we have shift periods information
    if (this.employee.currentShift?.startTime && this.employee.currentShift?.endTime) {
      return `${this.employee.currentShift.startTime} - ${this.employee.currentShift.endTime}`;
    }

    // Fallback to just showing the shift name
    return this.employee.currentShiftName;
  }

  getShiftTimeDisplay(shift: any): string {
    if (shift.shiftPeriods && shift.shiftPeriods.length > 0) {
      const firstPeriod = shift.shiftPeriods[0];
      const lastPeriod = shift.shiftPeriods[shift.shiftPeriods.length - 1];
      return `${firstPeriod.startTime} - ${lastPeriod.endTime}`;
    }
    return 'Time not specified';
  }
}