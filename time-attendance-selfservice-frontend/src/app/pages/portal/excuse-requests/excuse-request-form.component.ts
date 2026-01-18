import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeExcusesService } from '../../employee-excuses/employee-excuses.service';
import { AuthService } from '../../../core/auth/auth.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import {
  CreateEmployeeExcuseRequest,
  UpdateEmployeeExcuseRequest,
  EmployeeExcuseDto,
  ExcuseType
} from '../../../shared/models/employee-excuse.model';

/**
 * Portal Excuse Request Form Component
 * Simplified form for employees to create/edit their excuse requests
 */
@Component({
  selector: 'app-portal-excuse-request-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './excuse-request-form.component.html',
  styleUrl: './excuse-request-form.component.css'
})
export class PortalExcuseRequestFormComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly excuseService = inject(EmployeeExcusesService);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);

  // Signals
  loading = signal(false);
  saving = signal(false);
  isEditMode = signal(false);
  currentExcuse = signal<EmployeeExcuseDto | null>(null);
  selectedFile = signal<File | null>(null);

  // Form
  form: FormGroup;

  // Excuse types for dropdown - use getter for i18n
  get excuseTypes() {
    return [
      { value: ExcuseType.PersonalExcuse, label: this.i18n.t('portal.personal_excuse') },
      { value: ExcuseType.OfficialDuty, label: this.i18n.t('portal.official_duty') }
    ];
  }

  constructor() {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.checkEditMode();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      excuseType: [ExcuseType.PersonalExcuse, [Validators.required]],
      excuseDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      reason: ['', [Validators.required, Validators.maxLength(500)]],
      attachment: [null]
    });
  }

  private checkEditMode(): void {
    const excuseId = this.route.snapshot.paramMap.get('id');
    if (excuseId && excuseId !== 'new') {
      this.isEditMode.set(true);
      this.loadExcuse(+excuseId);
    }
  }

  private loadExcuse(id: number): void {
    this.loading.set(true);

    this.excuseService.getEmployeeExcuseById(id).subscribe({
      next: (excuse) => {
        if (excuse) {
          this.currentExcuse.set(excuse);
          this.populateForm(excuse);
        } else {
          this.notificationService.error(this.i18n.t('portal.excuse_not_found'));
          this.router.navigate(['/excuse-requests']);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load excuse:', error);
        this.notificationService.error(this.i18n.t('portal.failed_to_load_excuse'));
        this.loading.set(false);
        this.router.navigate(['/excuse-requests']);
      }
    });
  }

  private populateForm(excuse: EmployeeExcuseDto): void {
    const excuseDate = new Date(excuse.excuseDate).toISOString().split('T')[0];

    this.form.patchValue({
      excuseType: excuse.excuseType || ExcuseType.PersonalExcuse,
      excuseDate: excuseDate,
      startTime: excuse.startTime,
      endTime: excuse.endTime,
      reason: excuse.reason
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile.set(file);
      this.form.patchValue({ attachment: file });
    }
  }

  removeFile(): void {
    this.selectedFile.set(null);
    this.form.patchValue({ attachment: null });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.error(this.i18n.t('common.form_validation_error'));
      return;
    }

    // Show confirmation dialog before submitting
    const result = await this.confirmationService.confirmSave(
      this.i18n.t('common.confirm_submit')
    );

    if (!result.confirmed) {
      return;
    }

    if (this.isEditMode()) {
      this.updateExcuse();
    } else {
      this.createExcuse();
    }
  }

  private createExcuse(): void {
    console.log('[ExcuseForm] createExcuse() called');
    this.saving.set(true);
    console.log('[ExcuseForm] saving set to true');

    const currentUser = this.authService.currentUser();
    console.log('[ExcuseForm] currentUser:', currentUser);
    if (!currentUser || !currentUser.employeeId) {
      this.notificationService.error(this.i18n.t('portal.employee_not_found'));
      this.saving.set(false);
      return;
    }

    const formValue = this.form.value;
    const request: CreateEmployeeExcuseRequest = {
      employeeId: currentUser.employeeId,
      excuseType: formValue.excuseType,
      excuseDate: formValue.excuseDate,
      startTime: formValue.startTime,
      endTime: formValue.endTime,
      reason: formValue.reason,
      attachmentFile: this.selectedFile() || undefined
    };
    console.log('[ExcuseForm] Request object:', JSON.stringify(request));

    console.log('[ExcuseForm] Calling excuseService.createEmployeeExcuse()...');
    this.excuseService.createEmployeeExcuse(request).subscribe({
      next: (response) => {
        console.log('[ExcuseForm] SUCCESS callback - response:', response);
        this.saving.set(false);
        console.log('[ExcuseForm] saving set to false');
        this.notificationService.success(this.i18n.t('portal.excuse_created'));
        console.log('[ExcuseForm] Navigating to /excuse-requests');
        this.router.navigate(['/excuse-requests']);
      },
      error: (error) => {
        console.error('[ExcuseForm] ERROR callback - error:', error);
        this.saving.set(false);
        console.log('[ExcuseForm] saving set to false after error');
        // Extract and display the actual error message from the backend
        const errorMessage = this.extractErrorMessage(error) || this.i18n.t('portal.failed_to_create_excuse');
        this.notificationService.error(errorMessage);
      },
      complete: () => {
        console.log('[ExcuseForm] COMPLETE callback - subscription completed');
      }
    });
    console.log('[ExcuseForm] subscribe() called, waiting for response...');
  }

  private updateExcuse(): void {
    const currentExcuse = this.currentExcuse();
    if (!currentExcuse) return;

    this.saving.set(true);

    const formValue = this.form.value;
    const request: UpdateEmployeeExcuseRequest = {
      excuseType: formValue.excuseType,
      excuseDate: formValue.excuseDate,
      startTime: formValue.startTime,
      endTime: formValue.endTime,
      reason: formValue.reason,
      approvalStatus: currentExcuse.status, // Keep current status
      attachmentFile: this.selectedFile() || undefined
    };

    this.excuseService.updateEmployeeExcuse(currentExcuse.id, request).subscribe({
      next: () => {
        this.saving.set(false);
        this.notificationService.success(this.i18n.t('portal.excuse_updated'));
        this.router.navigate(['/excuse-requests']);
      },
      error: (error) => {
        this.saving.set(false);
        console.error('Failed to update excuse:', error);
        // Extract and display the actual error message from the backend
        const errorMessage = this.extractErrorMessage(error) || this.i18n.t('portal.failed_to_update_excuse');
        this.notificationService.error(errorMessage);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/excuse-requests']);
  }

  // Helper method to check if field has error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }

  // Helper method to get field error message
  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.hasError('required')) {
      return this.i18n.t('common.field_required');
    }
    if (field.hasError('maxlength')) {
      const maxLength = field.errors['maxlength'].requiredLength;
      return this.i18n.t('common.field_max_length', { max: maxLength });
    }
    return '';
  }

  /**
   * Extracts the error message from the backend response
   * Handles different error response formats
   */
  private extractErrorMessage(error: any): string | null {
    // Check for error in HttpErrorResponse body
    if (error?.error) {
      // Backend returns Result<T> with error property
      if (typeof error.error.error === 'string') {
        return error.error.error;
      }
      // Backend returns direct error message
      if (typeof error.error === 'string') {
        return error.error;
      }
      // Backend returns message property
      if (typeof error.error.message === 'string') {
        return error.error.message;
      }
    }
    // Check for message property on error itself
    if (typeof error?.message === 'string' && !error.message.includes('Http failure')) {
      return error.message;
    }
    return null;
  }

  /**
   * Calculates the duration in hours between start and end times
   * Returns formatted string like "1 h 30 m" or "0 m" if times not set
   */
  calculateDuration(): string {
    const startTime = this.form.get('startTime')?.value;
    const endTime = this.form.get('endTime')?.value;

    if (!startTime || !endTime) {
      return '0 m';
    }

    try {
      // Parse time strings (HH:mm format)
      const [startHour, startMin] = startTime.split(':').map(Number);
      const [endHour, endMin] = endTime.split(':').map(Number);

      // Calculate total minutes
      const startTotalMinutes = startHour * 60 + startMin;
      const endTotalMinutes = endHour * 60 + endMin;

      // Calculate difference
      let diffMinutes = endTotalMinutes - startTotalMinutes;

      // Handle case where end time is before start time (invalid)
      if (diffMinutes <= 0) {
        return '0 m';
      }

      // Format as hours and minutes
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;

      if (hours === 0) {
        return `${minutes} m`;
      } else if (minutes === 0) {
        return `${hours} h`;
      } else {
        return `${hours} h ${minutes} m`;
      }
    } catch {
      return '0 m';
    }
  }
}
