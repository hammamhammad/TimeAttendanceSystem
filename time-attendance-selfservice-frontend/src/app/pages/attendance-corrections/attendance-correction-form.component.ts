import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { AttendanceCorrectionsService } from './attendance-corrections.service';
import { AuthService } from '../../core/auth/auth.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import {
  CreateAttendanceCorrectionRequest,
  UpdateAttendanceCorrectionRequest,
  AttendanceCorrectionRequestDto,
  AttendanceCorrectionType
} from '../../shared/models/attendance-correction.model';

/**
 * Attendance Correction Form Component
 * Form for employees to create/edit their attendance correction requests
 */
@Component({
  selector: 'app-attendance-correction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './attendance-correction-form.component.html',
  styleUrl: './attendance-correction-form.component.css'
})
export class AttendanceCorrectionFormComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly correctionService = inject(AttendanceCorrectionsService);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);

  // Signals
  loading = signal(false);
  saving = signal(false);
  isEditMode = signal(false);
  currentCorrection = signal<AttendanceCorrectionRequestDto | null>(null);
  selectedFile = signal<File | null>(null);

  // Form
  form: FormGroup;

  // Correction types for dropdown - use getter for i18n
  get correctionTypes() {
    return [
      { value: AttendanceCorrectionType.CheckIn, label: this.i18n.t('portal.check_in') },
      { value: AttendanceCorrectionType.CheckOut, label: this.i18n.t('portal.check_out') }
    ];
  }

  // Maximum retroactive days (30 days)
  get maxRetroactiveDays(): number {
    return 30;
  }

  // Minimum allowed date (30 days ago)
  get minDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - this.maxRetroactiveDays);
    return date.toISOString().split('T')[0];
  }

  // Maximum allowed date (yesterday - corrections are only for past dates)
  get maxDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  }

  constructor() {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.checkEditMode();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      correctionType: [AttendanceCorrectionType.CheckIn, [Validators.required]],
      correctionDate: ['', [Validators.required]],
      correctionTime: ['', [Validators.required]],
      reason: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      attachment: [null]
    });
  }

  private checkEditMode(): void {
    const correctionId = this.route.snapshot.paramMap.get('id');
    if (correctionId && correctionId !== 'new') {
      this.isEditMode.set(true);
      this.loadCorrection(+correctionId);
    }
  }

  private loadCorrection(id: number): void {
    this.loading.set(true);

    this.correctionService.getAttendanceCorrectionRequestById(id).subscribe({
      next: (correction) => {
        if (correction) {
          this.currentCorrection.set(correction);
          this.populateForm(correction);
        } else {
          this.notificationService.error(this.i18n.t('portal.correction_not_found'));
          this.router.navigate(['/attendance-corrections']);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load correction:', error);
        this.notificationService.error(this.i18n.t('portal.failed_to_load_correction'));
        this.loading.set(false);
        this.router.navigate(['/attendance-corrections']);
      }
    });
  }

  private populateForm(correction: AttendanceCorrectionRequestDto): void {
    const correctionDate = new Date(correction.correctionDate).toISOString().split('T')[0];

    this.form.patchValue({
      correctionType: correction.correctionType,
      correctionDate: correctionDate,
      correctionTime: correction.correctionTime?.substring(0, 5) || '',
      reason: correction.reason
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
      this.updateCorrection();
    } else {
      this.createCorrection();
    }
  }

  private createCorrection(): void {
    console.log('[CorrectionForm] createCorrection() called');
    this.saving.set(true);

    const currentUser = this.authService.currentUser();
    if (!currentUser || !currentUser.employeeId) {
      this.notificationService.error(this.i18n.t('portal.employee_not_found'));
      this.saving.set(false);
      return;
    }

    const formValue = this.form.value;
    const request: CreateAttendanceCorrectionRequest = {
      employeeId: currentUser.employeeId,
      correctionType: Number(formValue.correctionType),
      correctionDate: formValue.correctionDate,
      correctionTime: formValue.correctionTime,
      reason: formValue.reason,
      attachmentFile: this.selectedFile() || undefined
    };
    console.log('[CorrectionForm] Request object:', JSON.stringify(request));

    this.correctionService.createAttendanceCorrectionRequest(request).subscribe({
      next: (response) => {
        console.log('[CorrectionForm] SUCCESS callback - response:', response);
        this.saving.set(false);
        this.notificationService.success(this.i18n.t('portal.correction_created'));
        this.router.navigate(['/attendance-corrections']);
      },
      error: (error) => {
        console.error('[CorrectionForm] ERROR callback - error:', error);
        this.saving.set(false);
        // Extract and display the actual error message from the backend
        const errorMessage = this.extractErrorMessage(error) || this.i18n.t('portal.failed_to_create_correction');
        this.notificationService.error(errorMessage);
      }
    });
  }

  private updateCorrection(): void {
    const currentCorrection = this.currentCorrection();
    if (!currentCorrection) return;

    this.saving.set(true);

    const formValue = this.form.value;
    const request: UpdateAttendanceCorrectionRequest = {
      correctionType: Number(formValue.correctionType),
      correctionDate: formValue.correctionDate,
      correctionTime: formValue.correctionTime,
      reason: formValue.reason,
      attachmentFile: this.selectedFile() || undefined
    };

    this.correctionService.updateAttendanceCorrectionRequest(currentCorrection.id, request).subscribe({
      next: () => {
        this.saving.set(false);
        this.notificationService.success(this.i18n.t('portal.correction_updated'));
        this.router.navigate(['/attendance-corrections']);
      },
      error: (error) => {
        this.saving.set(false);
        console.error('Failed to update correction:', error);
        const errorMessage = this.extractErrorMessage(error) || this.i18n.t('portal.failed_to_update_correction');
        this.notificationService.error(errorMessage);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/attendance-corrections']);
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
    if (field.hasError('minlength')) {
      const minLength = field.errors['minlength'].requiredLength;
      return this.i18n.t('common.field_min_length', { min: minLength });
    }
    if (field.hasError('maxlength')) {
      const maxLength = field.errors['maxlength'].requiredLength;
      return this.i18n.t('common.field_max_length', { max: maxLength });
    }
    return '';
  }

  /**
   * Extracts the error message from the backend response
   */
  private extractErrorMessage(error: any): string | null {
    if (error?.error) {
      if (typeof error.error.error === 'string') {
        return error.error.error;
      }
      if (typeof error.error === 'string') {
        return error.error;
      }
      if (typeof error.error.message === 'string') {
        return error.error.message;
      }
    }
    if (typeof error?.message === 'string' && !error.message.includes('Http failure')) {
      return error.message;
    }
    return null;
  }

  /**
   * Get display label for correction type
   */
  getCorrectionTypeLabel(type: AttendanceCorrectionType): string {
    switch (type) {
      case AttendanceCorrectionType.CheckIn:
        return this.i18n.t('portal.check_in');
      case AttendanceCorrectionType.CheckOut:
        return this.i18n.t('portal.check_out');
      default:
        return String(type);
    }
  }
}
