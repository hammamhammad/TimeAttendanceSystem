import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PortalService } from '../services/portal.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { FingerprintRequestType, CreateFingerprintRequestRequest, UpdateFingerprintRequestRequest } from '../models/fingerprint-request.model';

/**
 * Fingerprint Request Form Component
 * For creating and editing fingerprint requests
 */
@Component({
  selector: 'app-fingerprint-request-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './fingerprint-request-form.component.html',
  styleUrl: './fingerprint-request-form.component.css'
})
export class FingerprintRequestFormComponent implements OnInit {
  private readonly portalService = inject(PortalService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly notificationService = inject(NotificationService);
  readonly i18n = inject(I18nService);

  // State
  requestId = signal<number | null>(null);
  isEditMode = signal<boolean>(false);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);

  // Form
  requestForm!: FormGroup;

  // Request types for dropdown
  readonly requestTypes = [
    { value: FingerprintRequestType.NewEnrollment, label: 'New Enrollment' },
    { value: FingerprintRequestType.Update, label: 'Update Existing' },
    { value: FingerprintRequestType.Issue, label: 'Issue/Problem' },
    { value: FingerprintRequestType.AdditionalFingers, label: 'Additional Fingers' },
    { value: FingerprintRequestType.LocationChange, label: 'Location Change' }
  ];

  ngOnInit(): void {
    this.initializeForm();
    this.checkRouteParams();
  }

  initializeForm(): void {
    this.requestForm = this.fb.group({
      requestType: [FingerprintRequestType.Issue, [Validators.required]],
      issueDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      affectedFingers: [''],
      preferredDate: [''],
      preferredTime: ['']
    });
  }

  checkRouteParams(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.requestId.set(parseInt(id, 10));
      this.isEditMode.set(true);
      this.loadRequest(this.requestId()!);
    }
  }

  loadRequest(id: number): void {
    this.loading.set(true);
    this.portalService.loadFingerprintRequests().subscribe({
      next: () => {
        const requests = this.portalService.fingerprintRequests();
        const request = requests.find(r => r.id === id);
        if (request) {
          this.requestForm.patchValue({
            requestType: request.requestType,
            issueDescription: request.issueDescription,
            affectedFingers: request.affectedFingers || '',
            preferredDate: request.preferredDate ? this.formatDateForInput(request.preferredDate) : '',
            preferredTime: request.preferredTime || ''
          });
        } else {
          this.notificationService.error(this.i18n.t('portal.request_not_found'));
          this.router.navigate(['/portal/fingerprint-requests']);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load request:', error);
        this.notificationService.error(this.i18n.t('portal.failed_to_load_request'));
        this.loading.set(false);
      }
    });
  }

  submitForm(): void {
    if (this.requestForm.valid) {
      this.submitting.set(true);

      const formValue = this.requestForm.value;
      const payload = {
        requestType: formValue.requestType,
        issueDescription: formValue.issueDescription,
        affectedFingers: formValue.affectedFingers || undefined,
        preferredDate: formValue.preferredDate ? new Date(formValue.preferredDate) : undefined,
        preferredTime: formValue.preferredTime || undefined
      };

      if (this.isEditMode() && this.requestId()) {
        // Update existing request
        const updatePayload: UpdateFingerprintRequestRequest = {
          issueDescription: payload.issueDescription,
          affectedFingers: payload.affectedFingers,
          preferredDate: payload.preferredDate,
          preferredTime: payload.preferredTime
        };

        this.portalService.updateFingerprintRequest(this.requestId()!, updatePayload).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('portal.request_updated_successfully'));
            this.router.navigate(['/portal/fingerprint-requests', this.requestId()]);
            this.submitting.set(false);
          },
          error: (error) => {
            console.error('Failed to update request:', error);
            this.notificationService.error(this.i18n.t('portal.failed_to_update_request'));
            this.submitting.set(false);
          }
        });
      } else {
        // Create new request
        const createPayload: CreateFingerprintRequestRequest = payload;

        this.portalService.createFingerprintRequest(createPayload).subscribe({
          next: (newRequestId) => {
            this.notificationService.success(this.i18n.t('portal.request_created_successfully'));
            this.router.navigate(['/portal/fingerprint-requests', newRequestId]);
            this.submitting.set(false);
          },
          error: (error) => {
            console.error('Failed to create request:', error);
            this.notificationService.error(this.i18n.t('portal.failed_to_create_request'));
            this.submitting.set(false);
          }
        });
      }
    } else {
      // Mark all as touched to show validation errors
      Object.keys(this.requestForm.controls).forEach(key => {
        this.requestForm.get(key)?.markAsTouched();
      });
    }
  }

  cancel(): void {
    if (this.isEditMode() && this.requestId()) {
      this.router.navigate(['/portal/fingerprint-requests', this.requestId()]);
    } else {
      this.router.navigate(['/portal/fingerprint-requests']);
    }
  }

  getFieldError(fieldName: string): string {
    const control = this.requestForm.get(fieldName);
    if (control?.hasError('required')) {
      return this.i18n.t('validation.required');
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength']?.requiredLength;
      return this.i18n.t('validation.min_length', { length: minLength });
    }
    if (control?.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength']?.requiredLength;
      return this.i18n.t('validation.max_length', { length: maxLength });
    }
    return '';
  }

  formatDateForInput(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
