import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeVacationsService } from '../../employee-vacations/employee-vacations.service';
import { AuthService } from '../../../core/auth/auth.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import {
  EmployeeVacation,
  CreateEmployeeVacationRequest,
  UpdateEmployeeVacationRequest
} from '../../../shared/models/employee-vacation.model';

/**
 * Portal Vacation Request Form Component
 * Simplified form for employees to create/edit their vacation requests
 */
@Component({
  selector: 'app-portal-vacation-request-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './vacation-request-form.component.html',
  styleUrl: './vacation-request-form.component.css'
})
export class PortalVacationRequestFormComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly vacationService = inject(EmployeeVacationsService);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);

  // Signals
  loading = signal(false);
  saving = signal(false);
  isEditMode = signal(false);
  currentVacation = signal<EmployeeVacation | null>(null);
  vacationTypes = signal<Array<{ id: number; name: string }>>([]);

  // Form
  form: FormGroup;

  constructor() {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.loadVacationTypes();
    this.checkEditMode();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      vacationTypeId: [null, [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      notes: ['', [Validators.maxLength(500)]]
    });
  }

  private loadVacationTypes(): void {
    this.vacationService.getVacationTypes().subscribe({
      next: (types) => {
        this.vacationTypes.set(types);
      },
      error: (error) => {
        console.error('Failed to load vacation types:', error);
        this.notificationService.error(this.i18n.t('portal.failed_to_load_vacation_types'));
      }
    });
  }

  private checkEditMode(): void {
    const vacationId = this.route.snapshot.paramMap.get('id');
    if (vacationId && vacationId !== 'new') {
      this.isEditMode.set(true);
      this.loadVacation(+vacationId);
    }
  }

  private loadVacation(id: number): void {
    this.loading.set(true);

    this.vacationService.getVacationById(id).subscribe({
      next: (vacation) => {
        if (vacation) {
          this.currentVacation.set(vacation);
          this.populateForm(vacation);
        } else {
          this.notificationService.error(this.i18n.t('portal.vacation_not_found'));
          this.router.navigate(['/vacation-requests']);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load vacation:', error);
        this.notificationService.error(this.i18n.t('portal.failed_to_load_vacation'));
        this.loading.set(false);
        this.router.navigate(['/vacation-requests']);
      }
    });
  }

  private populateForm(vacation: EmployeeVacation): void {
    const startDate = new Date(vacation.startDate).toISOString().split('T')[0];
    const endDate = new Date(vacation.endDate).toISOString().split('T')[0];

    this.form.patchValue({
      vacationTypeId: vacation.vacationTypeId,
      startDate: startDate,
      endDate: endDate,
      notes: vacation.notes
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.error(this.i18n.t('common.form_validation_error'));
      return;
    }

    // Validate date range
    const startDate = new Date(this.form.value.startDate);
    const endDate = new Date(this.form.value.endDate);
    if (endDate < startDate) {
      this.notificationService.error(this.i18n.t('portal.end_date_before_start'));
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
      this.updateVacation();
    } else {
      this.createVacation();
    }
  }

  private createVacation(): void {
    this.saving.set(true);

    const currentUser = this.authService.currentUser();
    if (!currentUser || !currentUser.employeeId) {
      this.notificationService.error(this.i18n.t('portal.employee_not_found'));
      this.saving.set(false);
      return;
    }

    const formValue = this.form.value;
    const request: CreateEmployeeVacationRequest = {
      employeeId: currentUser.employeeId,
      vacationTypeId: formValue.vacationTypeId,
      startDate: new Date(formValue.startDate),
      endDate: new Date(formValue.endDate),
      notes: formValue.notes || undefined
    };

    this.vacationService.createVacation(request).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.vacation_created'));
        this.router.navigate(['/vacation-requests']);
      },
      error: (error) => {
        console.error('Failed to create vacation:', error);
        this.notificationService.error(this.i18n.t('portal.failed_to_create_vacation'));
        this.saving.set(false);
      }
    });
  }

  private updateVacation(): void {
    const currentVacation = this.currentVacation();
    if (!currentVacation) return;

    this.saving.set(true);

    const formValue = this.form.value;
    const request: UpdateEmployeeVacationRequest = {
      vacationTypeId: formValue.vacationTypeId,
      startDate: new Date(formValue.startDate),
      endDate: new Date(formValue.endDate),
      isApproved: currentVacation.isApproved, // Keep current status
      notes: formValue.notes || undefined
    };

    this.vacationService.updateVacation(currentVacation.id, request).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.vacation_updated'));
        this.router.navigate(['/vacation-requests']);
      },
      error: (error) => {
        console.error('Failed to update vacation:', error);
        this.notificationService.error(this.i18n.t('portal.failed_to_update_vacation'));
        this.saving.set(false);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/vacation-requests']);
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

  // Calculate and display total days
  get totalDays(): number {
    const startDate = this.form.get('startDate')?.value;
    const endDate = this.form.get('endDate')?.value;
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  }
}
