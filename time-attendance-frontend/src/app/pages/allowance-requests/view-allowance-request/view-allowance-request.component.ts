import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { AllowanceService } from '../../../core/services/allowance.service';
import { AllowanceRequest } from '../../../shared/models/allowance.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';
import { FileUploadComponent, FileUploadedEvent } from '../../../shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-view-allowance-request',
  standalone: true,
  imports: [
    CommonModule,
    FormHeaderComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    DefinitionListComponent,
    AuditHistoryComponent,
    SectionCardComponent,
    FileUploadComponent
  ],
  templateUrl: './view-allowance-request.component.html',
  styleUrls: ['./view-allowance-request.component.css']
})
export class ViewAllowanceRequestComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private allowanceService = inject(AllowanceService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  request = signal<AllowanceRequest | null>(null);
  entityId = signal<number | null>(null);

  readonly PERMISSIONS = {
    APPROVE: 'allowanceRequest.approve'
  };

  statusBadge = computed(() => {
    const item = this.request();
    if (!item) return { label: '', variant: 'secondary' as StatusVariant };

    let variant: StatusVariant = 'secondary';
    let key = 'allowance_requests.status_' + item.status.toLowerCase();

    switch (item.status) {
      case 'Pending':
        variant = 'warning';
        break;
      case 'Approved':
        variant = 'success';
        break;
      case 'Rejected':
        variant = 'danger';
        break;
      case 'Applied':
        variant = 'primary';
        break;
      case 'Withdrawn':
        variant = 'secondary';
        break;
      case 'Cancelled':
        variant = 'secondary';
        break;
    }

    return { label: this.i18n.t(key), variant };
  });

  requestInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.request();
    if (!item) return [];

    const typeKey = `allowance_requests.type_${item.requestType.toLowerCase()}`;

    return [
      { label: this.i18n.t('common.employee'), value: item.employeeName },
      { label: this.i18n.t('common.employee_number'), value: item.employeeNumber || '-' },
      { label: this.i18n.t('allowance_policies.allowance_type'), value: item.allowanceTypeName },
      { label: this.i18n.t('allowance_requests.request_type'), value: this.i18n.t(typeKey) },
      { label: this.i18n.t('common.status'), value: '', customContent: true }
    ];
  });

  amountInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.request();
    if (!item) return [];

    const items: DefinitionItem[] = [];

    if (item.requestedAmount != null) {
      items.push({ label: this.i18n.t('allowance_requests.requested_amount'), value: item.requestedAmount.toFixed(2) });
    }
    if (item.requestedPercentage != null) {
      items.push({ label: this.i18n.t('allowance_requests.requested_percentage'), value: `${item.requestedPercentage}%` });
    }

    items.push(
      { label: this.i18n.t('allowance_assignments.effective_from'), value: this.formatDate(item.effectiveFromDate) },
      { label: this.i18n.t('allowance_assignments.effective_to'), value: item.effectiveToDate ? this.formatDate(item.effectiveToDate) : '-' }
    );

    return items;
  });

  detailsItems = computed<DefinitionItem[]>(() => {
    const item = this.request();
    if (!item) return [];

    const items: DefinitionItem[] = [];

    if (item.reason) {
      items.push({ label: this.i18n.t('common.reason'), value: item.reason });
    }
    if (item.justification) {
      items.push({ label: this.i18n.t('allowance_requests.justification'), value: item.justification });
    }
    if (item.supportingDocumentUrl) {
      items.push({ label: this.i18n.t('allowance_requests.supporting_document'), value: item.supportingDocumentUrl });
    }
    if (item.rejectionReason) {
      items.push({ label: this.i18n.t('common.rejection_reason'), value: item.rejectionReason });
    }
    if (item.approvedAt) {
      items.push({ label: this.i18n.t('common.approved_at'), value: this.formatDate(item.approvedAt) });
    }

    return items;
  });

  auditInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.request();
    if (!item) return [];

    const items: DefinitionItem[] = [
      { label: this.i18n.t('fields.createdBy'), value: item.createdBy || '-' },
      { label: this.i18n.t('fields.createdAt'), value: item.createdAtUtc ? this.formatDate(item.createdAtUtc) : '-' }
    ];

    if (item.modifiedBy && item.modifiedAtUtc) {
      items.push(
        { label: this.i18n.t('fields.updatedBy'), value: item.modifiedBy },
        { label: this.i18n.t('fields.updatedAt'), value: this.formatDate(item.modifiedAtUtc) }
      );
    }

    return items;
  });

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  private loadData(): void {
    this.loading.set(true);

    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id || id <= 0) {
          this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_requests.load_error'));
          this.router.navigate(['/allowance-requests']);
          throw new Error('Invalid allowance request ID');
        }
        this.entityId.set(id);
        return this.allowanceService.getAllowanceRequest(id);
      })
    ).subscribe({
      next: (data) => {
        this.loading.set(false);
        this.request.set(data);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Failed to load allowance request:', error);
        this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_requests.load_error'));
        this.router.navigate(['/allowance-requests']);
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getDateLocale(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  isPending(): boolean {
    const item = this.request();
    return !!item && item.status === 'Pending';
  }

  async onApprove(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('common.confirm'),
      message: this.i18n.t('allowance_requests.approve_confirm'),
      confirmText: this.i18n.t('common.approve'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success',
      icon: 'fa-check',
      iconClass: 'text-success'
    });

    if (result.confirmed) {
      this.allowanceService.approveAllowanceRequest(this.entityId()!).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('app.success'), this.i18n.t('allowance_requests.approved_success'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to approve:', error);
          this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_requests.approved_success'));
        }
      });
    }
  }

  async onReject(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('common.confirm'),
      message: this.i18n.t('allowance_requests.reject_confirm'),
      confirmText: this.i18n.t('common.reject'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-times',
      iconClass: 'text-danger',
      requireComments: true
    });

    if (result.confirmed && result.comments) {
      this.allowanceService.rejectAllowanceRequest(this.entityId()!, result.comments).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('app.success'), this.i18n.t('allowance_requests.rejected_success'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to reject:', error);
          this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('allowance_requests.rejected_success'));
        }
      });
    }
  }

  onDocumentUploaded(event: FileUploadedEvent): void {
    const current = this.request();
    if (current) {
      this.request.set({ ...current, supportingDocumentUrl: event.fileUrl });
    }
    this.notificationService.success(this.i18n.t('app.success'), this.i18n.t('files.upload'));
  }

  onBack(): void {
    this.router.navigate(['/allowance-requests']);
  }
}
