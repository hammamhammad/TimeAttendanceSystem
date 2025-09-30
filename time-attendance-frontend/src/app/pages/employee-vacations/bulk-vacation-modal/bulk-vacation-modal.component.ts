import { Component, Output, EventEmitter, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { EmployeeVacationsService } from '../employee-vacations.service';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';

export interface BulkVacationRequest {
  vacationTypeId: number;
  startDate: string;
  endDate: string;
  assignmentType: BulkAssignmentType;
  branchId?: number;
  departmentId?: number;
  isApproved: boolean;
  notes?: string;
}

export interface BulkVacationResult {
  totalEligibleEmployees: number;
  vacationsCreated: number;
  employeesSkipped: number;
  skippedEmployees: Array<{
    employeeId: number;
    employeeName: string;
    employeeNumber: string;
    reason: string;
  }>;
  isCompleteSuccess: boolean;
  summary: string;
}

export enum BulkAssignmentType {
  Branch = 1,
  Department = 2
}

@Component({
  selector: 'app-bulk-vacation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalWrapperComponent],
  templateUrl: './bulk-vacation-modal.component.html',
  styleUrls: ['./bulk-vacation-modal.component.css']
})
export class BulkVacationModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);
  private employeeVacationsService = inject(EmployeeVacationsService);
  public i18n = inject(I18nService);

  @Output() modalClose = new EventEmitter<void>();
  @Output() bulkVacationCreated = new EventEmitter<void>();

  // Modal state
  isVisible = signal(false);
  loading = signal(false);
  submitting = signal(false);

  // Form
  bulkVacationForm: FormGroup;

  // Available options
  vacationTypes = signal<Array<{id: number, name: string}>>([]);
  branches = signal<Array<{id: number, name: string}>>([]);
  departments = signal<Array<{id: number, name: string}>>([]);

  // Preview data
  previewEmployeeCount = signal<number | null>(null);
  loadingPreview = signal(false);

  // Assignment types for template
  readonly BulkAssignmentType = BulkAssignmentType;

  constructor() {
    this.bulkVacationForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadVacationTypes();
    this.loadBranches();
    this.loadDepartments();
  }

  /**
   * Create reactive form
   */
  private createForm(): FormGroup {
    return this.fb.group({
      vacationTypeId: [null, [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      assignmentType: [BulkAssignmentType.Branch, [Validators.required]],
      branchId: [null],
      departmentId: [null],
      isApproved: [true],
      notes: ['']
    });
  }

  /**
   * Load vacation types for dropdown
   */
  private loadVacationTypes(): void {
    this.employeeVacationsService.getVacationTypes().subscribe({
      next: (vacationTypes) => {
        this.vacationTypes.set(vacationTypes);
      },
      error: (error) => {
        console.error('Failed to load vacation types:', error);
      }
    });
  }

  /**
   * Load branches for dropdown
   */
  private loadBranches(): void {
    this.employeeVacationsService.getBranches().subscribe({
      next: (branches) => {
        this.branches.set(branches);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
      }
    });
  }

  /**
   * Load departments for dropdown
   */
  private loadDepartments(): void {
    this.employeeVacationsService.getDepartments().subscribe({
      next: (departments) => {
        this.departments.set(departments);
      },
      error: (error) => {
        console.error('Failed to load departments:', error);
      }
    });
  }

  /**
   * Open modal
   */
  openModal(): void {
    this.resetForm();
    this.previewEmployeeCount.set(null);
    this.isVisible.set(true);
  }

  /**
   * Close modal
   */
  closeModal(): void {
    this.isVisible.set(false);
    this.resetForm();
    this.modalClose.emit();
  }

  /**
   * Reset form to initial state
   */
  private resetForm(): void {
    this.bulkVacationForm.reset({
      assignmentType: BulkAssignmentType.Branch,
      isApproved: true
    });
    this.previewEmployeeCount.set(null);
  }

  /**
   * Handle assignment type change
   */
  onAssignmentTypeChange(): void {
    const assignmentType = this.bulkVacationForm.get('assignmentType')?.value;

    // Clear both IDs and update validators
    this.bulkVacationForm.patchValue({
      branchId: null,
      departmentId: null
    });

    // Update validators based on assignment type
    const branchControl = this.bulkVacationForm.get('branchId');
    const departmentControl = this.bulkVacationForm.get('departmentId');

    if (assignmentType === BulkAssignmentType.Branch) {
      branchControl?.setValidators([Validators.required]);
      departmentControl?.clearValidators();
    } else if (assignmentType === BulkAssignmentType.Department) {
      departmentControl?.setValidators([Validators.required]);
      branchControl?.clearValidators();
    }

    branchControl?.updateValueAndValidity();
    departmentControl?.updateValueAndValidity();

    // Clear preview
    this.previewEmployeeCount.set(null);
  }

  /**
   * Handle target change (branch or department)
   */
  onTargetChange(): void {
    this.updatePreview();
  }

  /**
   * Update employee count preview
   */
  private updatePreview(): void {
    const formValue = this.bulkVacationForm.value;

    if (!this.isValidForPreview(formValue)) {
      this.previewEmployeeCount.set(null);
      return;
    }

    this.loadingPreview.set(true);

    const request = {
      assignmentType: formValue.assignmentType,
      branchId: formValue.assignmentType === BulkAssignmentType.Branch ? formValue.branchId : undefined,
      departmentId: formValue.assignmentType === BulkAssignmentType.Department ? formValue.departmentId : undefined
    };

    this.employeeVacationsService.getEmployeeCountPreview(request).subscribe({
      next: (count) => {
        this.previewEmployeeCount.set(count);
        this.loadingPreview.set(false);
      },
      error: (error) => {
        console.error('Failed to load preview:', error);
        this.previewEmployeeCount.set(null);
        this.loadingPreview.set(false);
      }
    });
  }

  /**
   * Check if form is valid for preview
   */
  private isValidForPreview(formValue: any): boolean {
    if (formValue.assignmentType === BulkAssignmentType.Branch) {
      return formValue.branchId != null;
    } else if (formValue.assignmentType === BulkAssignmentType.Department) {
      return formValue.departmentId != null;
    }
    return false;
  }

  /**
   * Submit form
   */
  onSubmit(): void {
    if (this.bulkVacationForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.submitting.set(true);

    const formValue = this.bulkVacationForm.value;
    const request: BulkVacationRequest = {
      vacationTypeId: formValue.vacationTypeId,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      assignmentType: formValue.assignmentType,
      branchId: formValue.assignmentType === BulkAssignmentType.Branch ? formValue.branchId : undefined,
      departmentId: formValue.assignmentType === BulkAssignmentType.Department ? formValue.departmentId : undefined,
      isApproved: formValue.isApproved,
      notes: formValue.notes || undefined
    };

    this.employeeVacationsService.createBulkVacations(request).subscribe({
      next: (result) => {
        this.submitting.set(false);
        this.handleBulkCreationResult(result);
        this.closeModal();
        this.bulkVacationCreated.emit();
      },
      error: (error) => {
        this.submitting.set(false);
        const message = error.error?.message || this.i18n.t('employee_vacations.errors.bulk_create_failed');
        this.notificationService.error(this.i18n.t('app.error'), message);
      }
    });
  }

  /**
   * Handle bulk creation result and show appropriate notifications
   */
  private handleBulkCreationResult(result: BulkVacationResult): void {
    if (result.isCompleteSuccess) {
      this.notificationService.success(
        this.i18n.t('app.success'),
        this.i18n.t('employee_vacations.bulk_create_success').replace('{{count}}', result.vacationsCreated.toString())
      );
    } else {
      // Show partial success with warning
      this.notificationService.warning(
        this.i18n.t('app.partial_success'),
        this.i18n.t('employee_vacations.bulk_create_partial')
          .replace('{{created}}', result.vacationsCreated.toString())
          .replace('{{skipped}}', result.employeesSkipped.toString())
      );
    }
  }

  /**
   * Mark all form controls as touched
   */
  private markFormGroupTouched(): void {
    Object.keys(this.bulkVacationForm.controls).forEach(key => {
      const control = this.bulkVacationForm.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Check if field has error
   */
  hasError(fieldName: string): boolean {
    const field = this.bulkVacationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Get field error message
   */
  getErrorMessage(fieldName: string): string {
    const field = this.bulkVacationForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return this.i18n.t('validation.required');
      }
    }
    return '';
  }

  /**
   * Get assignment type display name
   */
  getAssignmentTypeName(type: BulkAssignmentType): string {
    return type === BulkAssignmentType.Branch
      ? this.i18n.t('employee_vacations.branch')
      : this.i18n.t('employee_vacations.department');
  }
}