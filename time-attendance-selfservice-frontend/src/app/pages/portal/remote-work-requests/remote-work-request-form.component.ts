import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { RemoteWorkRequestsService } from '../../../core/services/remote-work-requests.service';
import { AuthService } from '../../../core/auth/auth.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import {
  RemoteWorkRequest,
  CreateRemoteWorkRequest,
  UpdateRemoteWorkRequest,
  RemoteWorkRequestStatus
} from '../../../core/models/remote-work-request.model';

/**
 * Portal Remote Work Request Form Component
 * Simplified form for employees to create/edit remote work requests
 */
@Component({
  selector: 'app-portal-remote-work-request-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './remote-work-request-form.component.html',
  styleUrl: './remote-work-request-form.component.css'
})
export class PortalRemoteWorkRequestFormComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly remoteWorkService = inject(RemoteWorkRequestsService);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);

  // Signals
  loading = signal(false);
  saving = signal(false);
  isEditMode = signal(false);
  currentRequest = signal<RemoteWorkRequest | null>(null);
  calculatedDays = signal<number>(0);

  // Form
  form: FormGroup;

  constructor() {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.checkEditMode();
    this.setupDateWatcher();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      reason: ['', [Validators.maxLength(500)]]
    });
  }

  private setupDateWatcher(): void {
    // Watch for changes in start and end dates to calculate working days
    this.form.get('startDate')?.valueChanges.subscribe(() => this.calculateWorkingDays());
    this.form.get('endDate')?.valueChanges.subscribe(() => this.calculateWorkingDays());
  }

  private calculateWorkingDays(): void {
    const startDate = this.form.get('startDate')?.value;
    const endDate = this.form.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end >= start) {
        const days = this.getWorkingDaysBetween(start, end);
        this.calculatedDays.set(days);
      } else {
        this.calculatedDays.set(0);
      }
    } else {
      this.calculatedDays.set(0);
    }
  }

  private getWorkingDaysBetween(startDate: Date, endDate: Date): number {
    let count = 0;
    const current = new Date(startDate);

    while (current <= endDate) {
      const dayOfWeek = current.getDay();
      // Count only weekdays (Monday = 1 to Friday = 5)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count;
  }

  private checkEditMode(): void {
    const requestId = this.route.snapshot.paramMap.get('id');
    if (requestId && requestId !== 'new') {
      this.isEditMode.set(true);
      this.loadRequest(+requestId);
    }
  }

  private loadRequest(id: number): void {
    this.loading.set(true);

    this.remoteWorkService.getById(id).subscribe({
      next: (request) => {
        this.currentRequest.set(request);
        this.populateForm(request);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load remote work request:', error);
        this.notificationService.error(this.i18n.t('portal.failed_to_load_remote_work'));
        this.loading.set(false);
        this.router.navigate(['/remote-work-requests']);
      }
    });
  }

  private populateForm(request: RemoteWorkRequest): void {
    const startDate = new Date(request.startDate).toISOString().split('T')[0];
    const endDate = new Date(request.endDate).toISOString().split('T')[0];

    this.form.patchValue({
      startDate: startDate,
      endDate: endDate,
      reason: request.reason || ''
    });

    // Calculate working days after populating
    this.calculateWorkingDays();
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
      this.notificationService.error(this.i18n.t('portal.end_date_before_start_date'));
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
      this.updateRequest();
    } else {
      this.createRequest();
    }
  }

  private createRequest(): void {
    this.saving.set(true);

    const currentUser = this.authService.currentUser();
    if (!currentUser || !currentUser.employeeId || !currentUser.id) {
      this.notificationService.error(this.i18n.t('portal.employee_not_found'));
      this.saving.set(false);
      return;
    }

    const formValue = this.form.value;
    const request: CreateRemoteWorkRequest = {
      employeeId: currentUser.employeeId,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      reason: formValue.reason,
      createdByUserId: currentUser.id,
      status: RemoteWorkRequestStatus.Pending
    };

    this.remoteWorkService.create(request).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.remote_work_created'));
        this.router.navigate(['/remote-work-requests']);
      },
      error: (error) => {
        console.error('Failed to create remote work request:', error);
        // Show the actual error message from the API if available
        const errorMessage = error?.error?.error || error?.error || this.i18n.t('portal.failed_to_create_remote_work');
        this.notificationService.error(errorMessage);
        this.saving.set(false);
      }
    });
  }

  private updateRequest(): void {
    const currentRequest = this.currentRequest();
    if (!currentRequest) return;

    this.saving.set(true);

    const formValue = this.form.value;
    const request: UpdateRemoteWorkRequest = {
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      reason: formValue.reason,
      status: currentRequest.status // Keep current status
    };

    this.remoteWorkService.update(currentRequest.id, request).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.remote_work_updated'));
        this.router.navigate(['/remote-work-requests']);
      },
      error: (error) => {
        console.error('Failed to update remote work request:', error);
        // Show the actual error message from the API if available
        const errorMessage = error?.error?.error || error?.error || this.i18n.t('portal.failed_to_update_remote_work');
        this.notificationService.error(errorMessage);
        this.saving.set(false);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/remote-work-requests']);
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
