import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { EmployeeExcusesService } from '../employee-excuses.service';
import { EmployeesService } from '../../employees/employees.service';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import {
  CreateEmployeeExcuseRequest,
  UpdateEmployeeExcuseRequest,
  EmployeeExcuseDto,
  ExcuseType
} from '../../../shared/models/employee-excuse.model';

@Component({
  selector: 'app-excuse-request-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchableSelectComponent,
    FormHeaderComponent,
    FormSectionComponent
  ],
  templateUrl: './excuse-request-form.component.html',
  styleUrls: ['./excuse-request-form.component.css']
})
export class ExcuseRequestFormComponent implements OnInit {
  public i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private employeeExcusesService = inject(EmployeeExcusesService);
  private employeesService = inject(EmployeesService);
  private notificationService = inject(NotificationService);

  // Signals
  loading = signal(false);
  saving = signal(false);
  isEditMode = signal(false);
  currentExcuse = signal<EmployeeExcuseDto | null>(null);
  selectedFile = signal<File | null>(null);
  currentUser = signal<any>(null);
  availableEmployees = signal<Array<{id: number, name: string, employeeNumber: string}>>([]);
  noPolicyActive = signal(false);
  policyError = signal<string | null>(null);

  // Computed property for searchable select options
  employeeOptions = computed<SearchableSelectOption[]>(() => {
    return this.availableEmployees().map(employee => ({
      value: employee.id,
      label: employee.name,
      subLabel: employee.employeeNumber ? `Employee #${employee.employeeNumber}` : undefined
    }));
  });


  // Form
  form: FormGroup;

  constructor() {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.checkEditMode();

    // Check policy status after component initialization
    setTimeout(() => {
      this.checkPolicyStatus();
    }, 100);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      employeeId: ['', [Validators.required]],
      excuseType: ['PersonalExcuse', [Validators.required]],
      excuseDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      reason: ['', [Validators.required, Validators.maxLength(500)]],
      approvalStatus: ['Approved', [Validators.required]], // Default to Approved for HR entry
      reviewerComments: [''],
      attachment: [null]
    });
  }

  private loadEmployees(): void {
    this.employeesService.getEmployeesDropdown().subscribe({
      next: (employees) => {
        this.availableEmployees.set(employees);
      },
      error: (error) => {
        console.error('Failed to load employees:', error);
        this.notificationService.error(
          this.i18n.t('employee_excuses.load_employees_error')
        );
      }
    });
  }

  private checkEditMode(): void {
    const excuseId = this.route.snapshot.paramMap.get('id');
    if (excuseId) {
      this.isEditMode.set(true);
      this.loadExcuse(+excuseId);
    }
  }

  private loadExcuse(id: number): void {
    this.loading.set(true);

    this.employeeExcusesService.getEmployeeExcuseById(id).subscribe({
      next: (excuse) => {
        if (excuse) {
          this.currentExcuse.set(excuse);
          this.populateForm(excuse);
        } else {
          this.notificationService.error(
            this.i18n.t('employee_excuses.not_found')
          );
          this.router.navigate(['/employee-excuses']);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load excuse:', error);
        this.notificationService.error(
          this.i18n.t('employee_excuses.load_error')
        );
        this.loading.set(false);
        this.router.navigate(['/employee-excuses']);
      }
    });
  }

  private populateForm(excuse: EmployeeExcuseDto): void {
    // Convert dates to proper format for inputs
    const excuseDate = new Date(excuse.excuseDate).toISOString().split('T')[0];

    this.form.patchValue({
      employeeId: excuse.employeeId,
      excuseType: excuse.excuseType || 'PersonalExcuse',
      excuseDate: excuseDate,
      startTime: excuse.startTime,
      endTime: excuse.endTime,
      reason: excuse.reason,
      approvalStatus: excuse.status || 'Pending',
      reviewerComments: excuse.reviewerComments || ''
    });

    // Disable the employee field in edit mode
    if (this.isEditMode()) {
      this.form.get('employeeId')?.disable();
    }
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] || null;

    if (file) {
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        this.notificationService.error(
          this.i18n.t('employee_excuses.file_too_large')
        );
        target.value = '';
        return;
      }

      // Validate file type
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!allowedTypes.includes(file.type)) {
        this.notificationService.error(
          this.i18n.t('employee_excuses.invalid_file_type')
        );
        target.value = '';
        return;
      }

      this.selectedFile.set(file);
    } else {
      this.selectedFile.set(null);
    }
  }

  private checkPolicyStatus(): void {
    // Only check policy status for new excuse creation (not edit mode)
    if (this.isEditMode()) return;

    // Check if we have at least one employee to validate with
    if (this.availableEmployees().length === 0) {
      // Wait for employees to load, then check policy
      setTimeout(() => this.checkPolicyStatus(), 500);
      return;
    }

    const firstEmployee = this.availableEmployees()[0];
    if (!firstEmployee) return;

    // Use current date and default times for validation
    const validationRequest = {
      employeeId: firstEmployee.id,
      excuseDate: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      excuseType: 'PersonalExcuse' as ExcuseType
    };

    this.employeeExcusesService.validateExcuse(validationRequest).subscribe({
      next: (result) => {
        if (result.data && result.data.validationErrors) {
          const noPolicyError = result.data.validationErrors.find((error: string) =>
            error.includes('No active excuse policy') ||
            error.includes('policy')
          );

          if (noPolicyError) {
            this.noPolicyActive.set(true);
            this.policyError.set(noPolicyError);
          }
        }
      },
      error: (error) => {
        console.error('Policy validation error:', error);
        // If the API returns an error about no policy, handle it
        if (error.error?.error?.includes('policy') || error.error?.message?.includes('policy')) {
          this.noPolicyActive.set(true);
          this.policyError.set(error.error?.error || error.error?.message || 'No active excuse policy found');
        }
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      return;
    }

    // Check if no policy is active and prevent submission
    if (this.noPolicyActive()) {
      this.notificationService.error(
        this.policyError() || this.i18n.t('employee_excuses.no_active_policy')
      );
      return;
    }

    // Validate time range
    if (!this.isValidTimeRange()) {
      this.notificationService.error(
        this.i18n.t('employee_excuses.invalid_time_range')
      );
      return;
    }

    this.saving.set(true);
    const formValue = this.form.value;

    if (this.isEditMode()) {
      this.updateExcuse(formValue);
    } else {
      this.createExcuse(formValue);
    }
  }

  private createExcuse(formValue: any): void {
    const request: CreateEmployeeExcuseRequest = {
      employeeId: +formValue.employeeId,
      excuseDate: formValue.excuseDate,
      startTime: formValue.startTime,
      endTime: formValue.endTime,
      reason: formValue.reason,
      excuseType: formValue.excuseType as ExcuseType,
      attachmentFile: this.selectedFile() || undefined
    };

    this.employeeExcusesService.createEmployeeExcuse(request).subscribe({
      next: () => {
        this.notificationService.success(
          this.i18n.t('employee_excuses.create_success')
        );
        this.router.navigate(['/employee-excuses']);
      },
      error: (error) => {
        console.error('Failed to create excuse:', error);

        // Extract meaningful error message from API response
        let errorMessage = this.i18n.t('employee_excuses.create_error');

        if (error?.error?.error) {
          // Handle case where error message is in error.error.error
          errorMessage = error.error.error;
        } else if (error?.error?.message) {
          // Handle case where error message is in error.error.message
          errorMessage = error.error.message;
        } else if (typeof error?.error === 'string') {
          // Handle case where error.error is a string
          errorMessage = error.error;
        } else if (error?.message) {
          // Handle case where error message is in error.message
          errorMessage = error.message;
        }

        this.notificationService.error(errorMessage);
        this.saving.set(false);
      }
    });
  }

  private updateExcuse(formValue: any): void {
    if (!this.currentExcuse()) return;

    const request: UpdateEmployeeExcuseRequest = {
      excuseDate: formValue.excuseDate,
      excuseType: formValue.excuseType as ExcuseType,
      startTime: formValue.startTime,
      endTime: formValue.endTime,
      reason: formValue.reason,
      approvalStatus: formValue.approvalStatus,
      reviewerComments: formValue.reviewerComments || undefined,
      attachmentFile: this.selectedFile() || undefined
    };

    this.employeeExcusesService.updateEmployeeExcuse(
      this.currentExcuse()!.id,
      request
    ).subscribe({
      next: () => {
        this.notificationService.success(
          this.i18n.t('employee_excuses.update_success')
        );
        this.router.navigate(['/employee-excuses']);
      },
      error: (error) => {
        console.error('Failed to update excuse:', error);

        // Extract meaningful error message from API response
        let errorMessage = this.i18n.t('employee_excuses.update_error');

        if (error?.error?.error) {
          // Handle case where error message is in error.error.error
          errorMessage = error.error.error;
        } else if (error?.error?.message) {
          // Handle case where error message is in error.error.message
          errorMessage = error.error.message;
        } else if (typeof error?.error === 'string') {
          // Handle case where error.error is a string
          errorMessage = error.error;
        } else if (error?.message) {
          // Handle case where error message is in error.message
          errorMessage = error.message;
        }

        this.notificationService.error(errorMessage);
        this.saving.set(false);
      }
    });
  }

  private isValidTimeRange(): boolean {
    const startTime = this.form.get('startTime')?.value;
    const endTime = this.form.get('endTime')?.value;

    if (!startTime || !endTime) return false;

    return startTime < endTime;
  }

  onCancel(): void {
    this.router.navigate(['/employee-excuses']);
  }

  onReset(): void {
    if (this.isEditMode() && this.currentExcuse()) {
      this.populateForm(this.currentExcuse()!);
    } else {
      this.form.reset();
      this.selectedFile.set(null);
      // Reset file input
      const fileInput = document.getElementById('attachment') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    const errors = field.errors;
    if (errors['required']) return this.i18n.t('validation.required');
    if (errors['maxlength']) return this.i18n.t('validation.maxLength');

    return '';
  }

  calculateDuration(): string {
    const startTime = this.form.get('startTime')?.value;
    const endTime = this.form.get('endTime')?.value;

    if (!startTime || !endTime) return '';

    // Parse times
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    // Calculate duration in minutes
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const durationMinutes = endMinutes - startMinutes;

    if (durationMinutes <= 0) return '';

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours === 0) {
      return `${minutes} ${this.i18n.t('common.minutes')}`;
    } else if (minutes === 0) {
      return `${hours} ${this.i18n.t('common.hours')}`;
    } else {
      return `${hours} ${this.i18n.t('common.hours')} ${minutes} ${this.i18n.t('common.minutes')}`;
    }
  }

  getFormattedFileSize(): string {
    const file = this.selectedFile();
    if (!file) return '';

    const size = file.size;
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  }

  removeSelectedFile(): void {
    this.selectedFile.set(null);
    const fileInput = document.getElementById('attachment') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  hasExistingAttachment(): boolean {
    return this.isEditMode() && !!this.currentExcuse()?.attachmentUrl;
  }

  getPageTitle(): string {
    return this.isEditMode()
      ? this.i18n.t('employee_excuses.edit_request')
      : this.i18n.t('employee_excuses.create_request');
  }

  getFormMode(): 'create' | 'edit' {
    return this.isEditMode() ? 'edit' : 'create';
  }

  getExcuseId(): number | undefined {
    return this.currentExcuse()?.id;
  }

  getSubmitButtonText(): string {
    if (this.saving()) {
      return this.isEditMode()
        ? this.i18n.t('employee_excuses.updating')
        : this.i18n.t('employee_excuses.creating');
    }
    return this.isEditMode()
      ? this.i18n.t('employee_excuses.update_request')
      : this.i18n.t('employee_excuses.submit_request');
  }

}