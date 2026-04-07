import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';

export interface ResignationRequest {
  id: number;
  resignationDate: string;
  lastWorkingDate: string;
  reason: string;
  status: string;
  submittedDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  reviewComments?: string;
  noticePeriodDays?: number;
}

/**
 * My Resignation Component
 * Allows employee to submit and track resignation requests
 */
@Component({
  selector: 'app-my-resignation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    FormSectionComponent
  ],
  templateUrl: './my-resignation.component.html',
  styleUrl: './my-resignation.component.css'
})
export class MyResignationComponent implements OnInit, OnDestroy {
  private readonly portalService = inject(PortalService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly fb = inject(FormBuilder);
  readonly i18n = inject(I18nService);

  // State
  resignation = signal<ResignationRequest | null>(null);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);
  withdrawing = signal<boolean>(false);
  error = signal<string | null>(null);
  showForm = signal<boolean>(false);

  // Computed
  hasActiveResignation = computed(() => {
    const r = this.resignation();
    return r && (r.status === 'Pending' || r.status === 'Approved' || r.status === 'InProgress');
  });

  canWithdraw = computed(() => {
    const r = this.resignation();
    return r && (r.status === 'Pending' || r.status === 'InProgress');
  });

  // Min date for resignation (today)
  minDate = computed(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Form
  form: FormGroup = this.fb.group({
    resignationDate: ['', Validators.required],
    lastWorkingDate: ['', Validators.required],
    reason: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit(): void {
    this.loadResignation();
  }

  ngOnDestroy(): void {
    // Clean up if needed
  }

  loadResignation(): void {
    this.loading.set(true);
    this.error.set(null);

    this.portalService.getMyResignation().subscribe({
      next: (result) => {
        this.resignation.set(result);
        this.showForm.set(!result);
        this.loading.set(false);
      },
      error: (err) => {
        // 404 is expected when no resignation exists
        if (err.status === 404) {
          this.resignation.set(null);
          this.showForm.set(true);
          this.loading.set(false);
          return;
        }
        console.error('Failed to load resignation:', err);
        this.error.set(this.i18n.t('portal.resignation.failed_to_load'));
        this.notificationService.error(this.i18n.t('portal.resignation.failed_to_load'));
        this.loading.set(false);
      }
    });
  }

  async submitResignation(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.error(this.i18n.t('common.form_validation_error'));
      return;
    }

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.resignation.confirm_submit_title'),
      message: this.i18n.t('portal.resignation.confirm_submit_message'),
      confirmText: this.i18n.t('common.submit'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi bi-exclamation-triangle',
      iconClass: 'text-danger'
    });

    if (!result.confirmed) return;

    this.submitting.set(true);

    const data = {
      resignationDate: this.form.value.resignationDate,
      lastWorkingDate: this.form.value.lastWorkingDate,
      reason: this.form.value.reason
    };

    this.portalService.submitResignation(data).subscribe({
      next: (resignation) => {
        this.resignation.set(resignation);
        this.showForm.set(false);
        this.submitting.set(false);
        this.notificationService.success(this.i18n.t('portal.resignation.submitted_success'));
        this.form.reset();
      },
      error: (err) => {
        console.error('Failed to submit resignation:', err);
        this.submitting.set(false);
        this.notificationService.error(this.i18n.t('portal.resignation.failed_to_submit'));
      }
    });
  }

  async withdrawResignation(): Promise<void> {
    const r = this.resignation();
    if (!r) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.resignation.confirm_withdraw_title'),
      message: this.i18n.t('portal.resignation.confirm_withdraw_message'),
      confirmText: this.i18n.t('portal.resignation.withdraw'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-warning',
      icon: 'bi bi-arrow-counterclockwise',
      iconClass: 'text-warning'
    });

    if (!result.confirmed) return;

    this.withdrawing.set(true);

    this.portalService.withdrawResignation(r.id).subscribe({
      next: () => {
        this.resignation.set(null);
        this.showForm.set(true);
        this.withdrawing.set(false);
        this.notificationService.success(this.i18n.t('portal.resignation.withdrawn_success'));
      },
      error: (err) => {
        console.error('Failed to withdraw resignation:', err);
        this.withdrawing.set(false);
        this.notificationService.error(this.i18n.t('portal.resignation.failed_to_withdraw'));
      }
    });
  }

  refresh(): void {
    this.loadResignation();
  }

  onStartNewResignation(): void {
    this.showForm.set(true);
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  formatDateTime(date: string): string {
    const d = new Date(date);
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return d.toLocaleString(locale, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Pending':
      case 'InProgress':
        return 'bg-warning';
      case 'Approved':
        return 'bg-success';
      case 'Rejected':
        return 'bg-danger';
      case 'Withdrawn':
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'Pending':
        return this.i18n.t('portal.status_pending');
      case 'InProgress':
        return this.i18n.t('portal.status_pending');
      case 'Approved':
        return this.i18n.t('portal.status_approved');
      case 'Rejected':
        return this.i18n.t('portal.status_rejected');
      case 'Withdrawn':
        return this.i18n.t('portal.resignation.status_withdrawn');
      default:
        return status;
    }
  }
}
