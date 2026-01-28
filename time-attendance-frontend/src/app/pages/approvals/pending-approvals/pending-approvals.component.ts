import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { ApprovalsService } from '../approvals.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';
import { PendingApproval, WorkflowEntityType } from '../../../shared/models/workflow.model';

@Component({
  selector: 'app-pending-approvals',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DataTableComponent,
    PageHeaderComponent,
    ModalWrapperComponent
  ],
  templateUrl: './pending-approvals.component.html',
  styleUrls: ['./pending-approvals.component.css']
})
export class PendingApprovalsComponent implements OnInit {
  private approvalsService = inject(ApprovalsService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Signals for state management
  loading = signal(false);
  approvals = signal<PendingApproval[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);

  // Filter signals
  selectedEntityType = signal<WorkflowEntityType | undefined>(undefined);
  selectedOverdue = signal<boolean | undefined>(undefined);

  // Modal state
  showApprovalModal = signal(false);
  selectedApproval = signal<PendingApproval | null>(null);
  approvalAction = signal<'approve' | 'reject' | 'delegate'>('approve');
  comments = signal('');
  delegateUserId = signal<number | undefined>(undefined);
  processing = signal(false);

  // Entity types for filter dropdown
  // Entity types for filter dropdown
  entityTypes = computed(() => [
    { value: 'Vacation' as WorkflowEntityType, label: this.t('approvals.vacation_request') },
    { value: 'Excuse' as WorkflowEntityType, label: this.t('approvals.excuse_request') },
    { value: 'RemoteWork' as WorkflowEntityType, label: this.t('approvals.remote_work_request') },
    { value: 'Overtime' as WorkflowEntityType, label: this.t('approvals.overtime_request') },
    { value: 'Timesheet' as WorkflowEntityType, label: this.t('approvals.timesheet') },
    { value: 'AttendanceCorrection' as WorkflowEntityType, label: this.t('approvals.attendance_correction') }
  ]);

  // Data table configuration
  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'entityTypeDisplay',
      label: this.t('approvals.request_type'),
      sortable: false,
      width: '150px',
      priority: 'high',
      mobileLabel: this.t('approvals.request_type'),
      renderHtml: true
    },
    {
      key: 'requestedByName',
      label: this.t('approvals.requested_by'),
      sortable: true,
      width: '150px',
      priority: 'high',
      mobileLabel: this.t('approvals.requested_by')
    },
    {
      key: 'entityDescription',
      label: this.t('approvals.description'),
      sortable: false,
      width: '200px',
      priority: 'medium',
      mobileLabel: this.t('approvals.description')
    },
    {
      key: 'currentStepName',
      label: this.t('approvals.current_step'),
      sortable: false,
      width: '150px',
      priority: 'medium',
      mobileLabel: this.t('approvals.current_step')
    },
    {
      key: 'requestedAtDisplay',
      label: this.t('approvals.requested_at'),
      sortable: true,
      width: '150px',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('approvals.requested_at')
    },
    {
      key: 'overdueStatus',
      label: this.t('approvals.status'),
      sortable: false,
      width: '100px',
      align: 'center',
      priority: 'high',
      mobileLabel: this.t('approvals.status'),
      renderHtml: true
    }
  ]);

  tableActions = computed<TableAction[]>(() => [
    {
      key: 'approve',
      label: this.t('approvals.approve'),
      icon: 'fa-check',
      color: 'success',
      condition: () => true
    },
    {
      key: 'reject',
      label: this.t('approvals.reject'),
      icon: 'fa-times',
      color: 'danger',
      condition: () => true
    },
    {
      key: 'delegate',
      label: this.t('approvals.delegate'),
      icon: 'fa-share',
      color: 'info',
      condition: (item: PendingApproval) => item.allowDelegation
    },
    {
      key: 'view',
      label: this.t('common.view'),
      icon: 'fa-eye',
      color: 'primary',
      condition: () => true
    }
  ]);

  // Transform approvals data for data table
  tableData = computed(() => {
    return this.approvals().map(approval => ({
      ...approval,
      entityTypeDisplay: this.formatEntityType(approval.entityType),
      requestedAtDisplay: this.formatDate(approval.requestedAt),
      overdueStatus: this.formatOverdueStatus(approval)
    }));
  });

  // Computed properties for summary counts
  overdueCount = computed(() => this.approvals().filter(a => a.isOverdue).length);
  onTimeCount = computed(() => this.approvals().filter(a => !a.isOverdue).length);

  ngOnInit(): void {
    this.loadApprovals();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadApprovals(): void {
    this.loading.set(true);

    this.approvalsService.getPendingApprovals(
      this.currentPage(),
      this.pageSize(),
      this.selectedEntityType(),
      this.selectedOverdue()
    ).subscribe({
      next: (response) => {
        if (response && response.items) {
          this.approvals.set(response.items);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(response.totalPages);
        } else {
          this.approvals.set([]);
          this.totalCount.set(0);
          this.totalPages.set(0);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load pending approvals:', error);
        this.loading.set(false);
        this.notificationService.error(
          this.t('app.error'),
          this.t('approvals.load_error')
        );
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatEntityType(entityType: WorkflowEntityType): string {
    let key = '';
    switch (entityType) {
      case 'Vacation': key = 'vacation_request'; break;
      case 'Excuse': key = 'excuse_request'; break;
      case 'RemoteWork': key = 'remote_work_request'; break;
      case 'Overtime': key = 'overtime_request'; break;
      case 'Timesheet': key = 'timesheet'; break;
      case 'AttendanceCorrection': key = 'attendance_correction'; break;
      default: return entityType;
    }
    const displayName = this.t(`approvals.${key}`);
    return `<span class="badge bg-primary">${displayName}</span>`;
  }

  formatOverdueStatus(approval: PendingApproval): string {
    if (approval.isOverdue) {
      return `<span class="badge bg-danger">${this.t('approvals.overdue')}</span>`;
    }
    return `<span class="badge bg-warning text-dark">${this.t('approvals.pending')}</span>`;
  }

  // Data table action handler
  onActionClick(event: { action: string, item: PendingApproval }): void {
    const { action, item } = event;

    switch (action) {
      case 'approve':
        this.openApprovalModal(item, 'approve');
        break;
      case 'reject':
        this.openApprovalModal(item, 'reject');
        break;
      case 'delegate':
        this.openApprovalModal(item, 'delegate');
        break;
      case 'view':
        this.viewEntityDetails(item);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  openApprovalModal(approval: PendingApproval, action: 'approve' | 'reject' | 'delegate'): void {
    this.selectedApproval.set(approval);
    this.approvalAction.set(action);
    this.comments.set('');
    this.delegateUserId.set(undefined);
    this.showApprovalModal.set(true);
  }

  closeApprovalModal(): void {
    this.showApprovalModal.set(false);
    this.selectedApproval.set(null);
    this.comments.set('');
    this.delegateUserId.set(undefined);
  }

  async submitApproval(): Promise<void> {
    const approval = this.selectedApproval();
    if (!approval) return;

    // Validate rejection requires comments
    if (this.approvalAction() === 'reject' && !this.comments().trim()) {
      this.notificationService.warning(
        this.t('app.warning'),
        this.t('approvals.comments_required_reject')
      );
      return;
    }

    // Validate delegation requires user selection
    if (this.approvalAction() === 'delegate' && !this.delegateUserId()) {
      this.notificationService.warning(
        this.t('app.warning'),
        this.t('approvals.delegate_user_required')
      );
      return;
    }

    this.processing.set(true);

    try {
      switch (this.approvalAction()) {
        case 'approve':
          await this.approvalsService.approveStep(approval.workflowInstanceId, {
            comments: this.comments() || undefined
          }).toPromise();
          this.notificationService.success(
            this.t('app.success'),
            this.t('approvals.approve_success')
          );
          break;

        case 'reject':
          await this.approvalsService.rejectStep(approval.workflowInstanceId, {
            comments: this.comments()
          }).toPromise();
          this.notificationService.success(
            this.t('app.success'),
            this.t('approvals.reject_success')
          );
          break;

        case 'delegate':
          await this.approvalsService.delegateStep(approval.workflowInstanceId, {
            delegateToUserId: this.delegateUserId()!,
            comments: this.comments() || undefined
          }).toPromise();
          this.notificationService.success(
            this.t('app.success'),
            this.t('approvals.delegate_success')
          );
          break;
      }

      this.closeApprovalModal();
      this.loadApprovals();
    } catch (error) {
      console.error('Failed to process approval:', error);
      this.notificationService.error(
        this.t('app.error'),
        this.t(`approvals.${this.approvalAction()}_error`)
      );
    } finally {
      this.processing.set(false);
    }
  }

  viewEntityDetails(approval: PendingApproval): void {
    // Navigate to the entity details page based on entity type
    const routes: Record<WorkflowEntityType, string> = {
      'Vacation': '/employee-vacations',
      'Excuse': '/employee-excuses',
      'RemoteWork': '/remote-work',
      'Overtime': '/overtime-requests',
      'Timesheet': '/timesheets',
      'AttendanceCorrection': '/attendance-corrections'
    };

    const basePath = routes[approval.entityType];
    if (basePath) {
      this.router.navigate([basePath, approval.entityId, 'view']);
    }
  }

  // Pagination handlers
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadApprovals();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadApprovals();
  }

  // Filter handlers
  onEntityTypeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedEntityType.set(value ? value as WorkflowEntityType : undefined);
    this.currentPage.set(1);
    this.loadApprovals();
  }

  onOverdueChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedOverdue.set(value === 'true' ? true : value === 'false' ? false : undefined);
    this.currentPage.set(1);
    this.loadApprovals();
  }

  onClearFilters(): void {
    this.selectedEntityType.set(undefined);
    this.selectedOverdue.set(undefined);
    this.currentPage.set(1);
    this.loadApprovals();
  }

  hasActiveFilters(): boolean {
    return !!(
      this.selectedEntityType() !== undefined ||
      this.selectedOverdue() !== undefined
    );
  }

  getModalTitle(): string {
    switch (this.approvalAction()) {
      case 'approve':
        return this.t('approvals.approve_request');
      case 'reject':
        return this.t('approvals.reject_request');
      case 'delegate':
        return this.t('approvals.delegate_request');
      default:
        return '';
    }
  }

  getSubmitButtonClass(): string {
    switch (this.approvalAction()) {
      case 'approve':
        return 'btn-success';
      case 'reject':
        return 'btn-danger';
      case 'delegate':
        return 'btn-info';
      default:
        return 'btn-primary';
    }
  }
}
