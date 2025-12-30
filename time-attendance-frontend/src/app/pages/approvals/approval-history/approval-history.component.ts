import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ApprovalsService } from '../approvals.service';
import { ApprovalHistoryItem, WorkflowEntityType, ApprovalAction } from '../../../shared/models/workflow.model';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

// Local interface for table column definition (not using DataTableComponent)
interface HistoryColumn {
  key: string;
  label: string;
  sortable?: boolean;
  template?: string;
}

@Component({
  selector: 'app-approval-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    EmptyStateComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './approval-history.component.html',
  styleUrls: ['./approval-history.component.css']
})
export class ApprovalHistoryComponent implements OnInit {
  private approvalsService = inject(ApprovalsService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  public i18n = inject(I18nService);

  // State
  loading = signal(false);
  historyItems = signal<ApprovalHistoryItem[]>([]);
  totalCount = signal(0);

  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);

  // Filters
  entityTypeFilter = signal<string>('');
  actionFilter = signal<string>('');
  dateFromFilter = signal<string>('');
  dateToFilter = signal<string>('');

  // Entity type options for filter
  entityTypes: { value: string; label: string }[] = [
    { value: '', label: this.t('common.all') },
    { value: 'Vacation', label: this.t('approvals.entity_type_vacation') },
    { value: 'Excuse', label: this.t('approvals.entity_type_excuse') },
    { value: 'RemoteWork', label: this.t('approvals.entity_type_remote_work') },
    { value: 'Overtime', label: this.t('approvals.entity_type_overtime') },
    { value: 'Timesheet', label: this.t('approvals.entity_type_timesheet') }
  ];

  // Action options for filter
  actionOptions: { value: string; label: string }[] = [
    { value: '', label: this.t('common.all') },
    { value: 'Approved', label: this.t('approvals.action_approved') },
    { value: 'Rejected', label: this.t('approvals.action_rejected') },
    { value: 'Delegated', label: this.t('approvals.action_delegated') }
  ];

  // Table columns
  columns: HistoryColumn[] = [
    {
      key: 'entityType',
      label: this.t('approvals.entity_type'),
      sortable: true,
      template: 'entityType'
    },
    {
      key: 'requesterName',
      label: this.t('approvals.requester'),
      sortable: true
    },
    {
      key: 'stepName',
      label: this.t('approvals.step'),
      sortable: true
    },
    {
      key: 'action',
      label: this.t('approvals.action'),
      sortable: true,
      template: 'action'
    },
    {
      key: 'actionTakenAt',
      label: this.t('approvals.action_date'),
      sortable: true,
      template: 'date'
    },
    {
      key: 'comments',
      label: this.t('approvals.comments'),
      sortable: false
    }
  ];

  // Computed
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));

  ngOnInit(): void {
    this.loadHistory();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadHistory(): void {
    this.loading.set(true);
    const params: any = {
      page: this.currentPage(),
      pageSize: this.pageSize()
    };

    if (this.entityTypeFilter()) {
      params.entityType = this.entityTypeFilter();
    }
    if (this.actionFilter()) {
      params.action = this.actionFilter();
    }
    if (this.dateFromFilter()) {
      params.dateFrom = this.dateFromFilter();
    }
    if (this.dateToFilter()) {
      params.dateTo = this.dateToFilter();
    }

    this.approvalsService.getApprovalHistory(params).subscribe({
      next: (response) => {
        if (response && response.items) {
          this.historyItems.set(response.items);
          this.totalCount.set(response.totalCount || 0);
        } else {
          this.historyItems.set([]);
          this.totalCount.set(0);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading approval history:', error);
        this.notificationService.error(this.t('app.error'), this.t('approvals.load_error'));
        this.loading.set(false);
      }
    });
  }

  onEntityTypeFilterChange(value: string): void {
    this.entityTypeFilter.set(value);
    this.currentPage.set(1);
    this.loadHistory();
  }

  onActionFilterChange(value: string): void {
    this.actionFilter.set(value);
    this.currentPage.set(1);
    this.loadHistory();
  }

  onDateFromChange(value: string): void {
    this.dateFromFilter.set(value);
    this.currentPage.set(1);
    this.loadHistory();
  }

  onDateToChange(value: string): void {
    this.dateToFilter.set(value);
    this.currentPage.set(1);
    this.loadHistory();
  }

  clearFilters(): void {
    this.entityTypeFilter.set('');
    this.actionFilter.set('');
    this.dateFromFilter.set('');
    this.dateToFilter.set('');
    this.currentPage.set(1);
    this.loadHistory();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadHistory();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadHistory();
  }

  getEntityTypeBadgeClass(entityType: string): string {
    const classes: Record<string, string> = {
      'Vacation': 'bg-success',
      'Excuse': 'bg-info',
      'RemoteWork': 'bg-primary',
      'Overtime': 'bg-warning',
      'Timesheet': 'bg-secondary'
    };
    return `badge ${classes[entityType] || 'bg-secondary'}`;
  }

  getActionBadgeClass(action: string): string {
    const classes: Record<string, string> = {
      'Approved': 'bg-success',
      'Rejected': 'bg-danger',
      'Delegated': 'bg-info',
      'Skipped': 'bg-secondary',
      'TimedOut': 'bg-warning'
    };
    return `badge ${classes[action] || 'bg-secondary'}`;
  }

  formatDate(date: string | null): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getMaxShowingCount(): number {
    const maxOnPage = this.currentPage() * this.pageSize();
    return Math.min(maxOnPage, this.totalCount());
  }

  goBack(): void {
    this.router.navigate(['/approvals']);
  }
}
