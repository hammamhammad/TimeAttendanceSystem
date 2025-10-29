import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { EmployeeExcusesService } from '../../employee-excuses/employee-excuses.service';
import { AuthService } from '../../../core/auth/auth.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
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
    FormSectionComponent,
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

  // Signals
  loading = signal(false);
  saving = signal(false);
  isEditMode = signal(false);
  currentExcuse = signal<EmployeeExcuseDto | null>(null);
  selectedFile = signal<File | null>(null);

  // Form
  form: FormGroup;

  // Excuse types for dropdown
  readonly excuseTypes = [
    { value: ExcuseType.PersonalExcuse, label: 'Personal Excuse' },
    { value: ExcuseType.OfficialDuty, label: 'Official Duty' }
  ];

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
          this.router.navigate(['/portal/excuse-requests']);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load excuse:', error);
        this.notificationService.error(this.i18n.t('portal.failed_to_load_excuse'));
        this.loading.set(false);
        this.router.navigate(['/portal/excuse-requests']);
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

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.error(this.i18n.t('common.form_validation_error'));
      return;
    }

    if (this.isEditMode()) {
      this.updateExcuse();
    } else {
      this.createExcuse();
    }
  }

  private createExcuse(): void {
    this.saving.set(true);

    const currentUser = this.authService.currentUser();
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

    this.excuseService.createEmployeeExcuse(request).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.excuse_created'));
        this.router.navigate(['/portal/excuse-requests']);
      },
      error: (error) => {
        console.error('Failed to create excuse:', error);
        this.notificationService.error(this.i18n.t('portal.failed_to_create_excuse'));
        this.saving.set(false);
      }
    });
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
        this.notificationService.success(this.i18n.t('portal.excuse_updated'));
        this.router.navigate(['/portal/excuse-requests']);
      },
      error: (error) => {
        console.error('Failed to update excuse:', error);
        this.notificationService.error(this.i18n.t('portal.failed_to_update_excuse'));
        this.saving.set(false);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/portal/excuse-requests']);
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
}
