import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PortalService } from '../services/portal.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { FingerprintRequest, FingerprintRequestStatus, FingerprintRequestType } from '../models/fingerprint-request.model';

/**
 * Fingerprint Request Details Component
 * Displays detailed information about a fingerprint request
 */
@Component({
  selector: 'app-fingerprint-request-details',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    DefinitionListComponent
  ],
  templateUrl: './fingerprint-request-details.component.html',
  styleUrl: './fingerprint-request-details.component.css'
})
export class FingerprintRequestDetailsComponent implements OnInit {
  private readonly portalService = inject(PortalService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  // Expose enum for template
  readonly FingerprintRequestStatus = FingerprintRequestStatus;

  // State
  request = signal<FingerprintRequest | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Computed properties
  statusBadge = computed(() => {
    const req = this.request();
    if (!req) return { label: '', variant: 'secondary' as const };

    const variants: Record<FingerprintRequestStatus, 'success' | 'warning' | 'danger' | 'info' | 'secondary'> = {
      [FingerprintRequestStatus.Pending]: 'warning',
      [FingerprintRequestStatus.Scheduled]: 'info',
      [FingerprintRequestStatus.Completed]: 'success',
      [FingerprintRequestStatus.Cancelled]: 'secondary',
      [FingerprintRequestStatus.Rejected]: 'danger'
    };

    return {
      label: req.status,
      variant: variants[req.status] || 'secondary'
    };
  });

  canEdit = computed(() => {
    const req = this.request();
    return req?.status === FingerprintRequestStatus.Pending;
  });

  canCancel = computed(() => {
    const req = this.request();
    return req?.status === FingerprintRequestStatus.Pending || req?.status === FingerprintRequestStatus.Scheduled;
  });

  requestInfoItems = computed((): DefinitionItem[] => {
    const req = this.request();
    if (!req) return [];

    return [
      { label: 'Request ID', value: `#${req.id}` },
      { label: 'Request Type', value: this.formatRequestType(req.requestType) },
      { label: 'Created', value: this.formatDate(req.createdAtUtc) },
      { label: 'Last Modified', value: req.modifiedAtUtc ? this.formatDate(req.modifiedAtUtc) : 'Not modified' }
    ];
  });

  detailsItems = computed((): DefinitionItem[] => {
    const req = this.request();
    if (!req) return [];

    return [
      { label: 'Issue Description', value: req.issueDescription },
      { label: 'Affected Fingers', value: req.affectedFingers || 'Not specified' },
      { label: 'Preferred Date', value: req.preferredDate ? this.formatDate(req.preferredDate) : 'Not specified' },
      { label: 'Preferred Time', value: req.preferredTime || 'Not specified' }
    ];
  });

  schedulingItems = computed((): DefinitionItem[] => {
    const req = this.request();
    if (!req) return [];

    const items: DefinitionItem[] = [];

    if (req.scheduledDate) {
      items.push({ label: 'Scheduled Date', value: this.formatDate(req.scheduledDate) });
    }
    if (req.scheduledTime) {
      items.push({ label: 'Scheduled Time', value: req.scheduledTime });
    }
    if (req.technicianName) {
      items.push({ label: 'Assigned Technician', value: req.technicianName });
    }
    if (req.completedDate) {
      items.push({ label: 'Completed Date', value: this.formatDate(req.completedDate) });
    }
    if (req.technicianNotes) {
      items.push({ label: 'Technician Notes', value: req.technicianNotes });
    }

    return items;
  });

  ngOnInit(): void {
    this.loadRequest();
  }

  loadRequest(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/portal/fingerprint-requests']);
      return;
    }

    this.loading.set(true);
    this.portalService.loadFingerprintRequests().subscribe({
      next: () => {
        const requests = this.portalService.fingerprintRequests();
        const request = requests.find(r => r.id === parseInt(id, 10));
        if (request) {
          this.request.set(request);
        } else {
          this.error.set('Request not found');
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load request:', error);
        this.error.set('Failed to load request details');
        this.loading.set(false);
      }
    });
  }

  refresh(): void {
    this.loadRequest();
  }

  editRequest(): void {
    const req = this.request();
    if (req) {
      this.router.navigate(['/portal/fingerprint-requests', req.id, 'edit']);
    }
  }

  async cancelRequest(): Promise<void> {
    const req = this.request();
    if (!req) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.cancel_request'),
      message: this.i18n.t('portal.cancel_request_confirm'),
      confirmText: this.i18n.t('common.yes_cancel'),
      cancelText: this.i18n.t('common.no'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-times',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.portalService.cancelFingerprintRequest(req.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('portal.request_cancelled_successfully'));
          this.loadRequest();
        },
        error: (error) => {
          console.error('Failed to cancel request:', error);
          this.notificationService.error(this.i18n.t('portal.failed_to_cancel_request'));
        }
      });
    }
  }

  backToList(): void {
    this.router.navigate(['/portal/fingerprint-requests']);
  }

  formatRequestType(type: FingerprintRequestType): string {
    const typeMap: Record<FingerprintRequestType, string> = {
      [FingerprintRequestType.NewEnrollment]: 'New Enrollment',
      [FingerprintRequestType.Update]: 'Update Existing',
      [FingerprintRequestType.Issue]: 'Issue/Problem',
      [FingerprintRequestType.AdditionalFingers]: 'Additional Fingers',
      [FingerprintRequestType.LocationChange]: 'Location Change'
    };
    return typeMap[type] || type;
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}
