import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeExcusesService } from '../../employee-excuses/employee-excuses.service';
import { EmployeeExcuseDto, ExcuseStatus, ExcuseType } from '../../../shared/models/employee-excuse.model';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { TableActionsComponent, TableActionItem } from '../../../shared/components/table-actions/table-actions.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

/**
 * Excuse Requests List Component
 * Displays employee excuse requests in a data table
 */
@Component({
  selector: 'app-excuse-requests-list',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    TableActionsComponent,
    EmptyStateComponent,
    LoadingSpinnerComponent,
    PageHeaderComponent
  ],
  templateUrl: './excuse-requests-list.component.html',
  styleUrl: './excuse-requests-list.component.css'
})
export class ExcuseRequestsListComponent implements OnInit {
  readonly i18n = inject(I18nService);
  readonly router = inject(Router);
  readonly notificationService = inject(NotificationService);
  readonly confirmationService = inject(ConfirmationService);
  readonly excuseService = inject(EmployeeExcusesService);

  // State
  excuses = signal<EmployeeExcuseDto[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Table configuration
  readonly columns: TableColumn[] = [
    { key: 'excuseDate', label: 'Date', sortable: true },
    { key: 'excuseType', label: 'Type', sortable: true },
    { key: 'startTime', label: 'Start Time', sortable: false },
    { key: 'endTime', label: 'End Time', sortable: false },
    { key: 'durationHours', label: 'Duration (hrs)', sortable: true },
    { key: 'reason', label: 'Reason', sortable: false },
    { key: 'status', label: 'Status', sortable: true, renderHtml: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  readonly actions: TableActionItem[] = [
    {
      id: 'view',
      label: 'View',
      icon: 'bi-eye',
      variant: 'primary'
    },
    {
      id: 'cancel',
      label: 'Cancel',
      icon: 'bi-x',
      variant: 'danger',
      visible: (item: EmployeeExcuseDto) => item.status === ExcuseStatus.Pending
    }
  ];

  // Computed table data with formatted values
  tableData = computed(() => {
    return this.excuses().map(excuse => ({
      ...excuse,
      excuseDate: this.formatDate(excuse.excuseDate),
      excuseType: this.getExcuseTypeLabel(excuse.excuseType),
      startTime: this.formatTime(excuse.startTime),
      endTime: this.formatTime(excuse.endTime),
      durationHours: `${excuse.durationHours.toFixed(1)} hrs`,
      status: this.getStatusBadgeHtml(excuse),
      actions: excuse
    }));
  });

  ngOnInit(): void {
    this.loadExcuses();
  }

  /**
   * Load excuse requests from the service
   */
  loadExcuses(): void {
    this.loading.set(true);
    this.error.set(null);

    this.excuseService.getEmployeeExcuses({}).subscribe({
      next: () => {
        // Service updates its own signals, we can access pagedResult
        const result = this.excuseService.pagedResult();
        if (result) {
          this.excuses.set(result.items);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load excuse requests:', error);
        this.error.set('Failed to load excuse requests');
        this.notificationService.error(this.i18n.t('portal.failed_to_load_excuses'));
        this.loading.set(false);
      }
    });
  }

  /**
   * Handle action clicks from table
   */
  onActionClick(event: { action: TableActionItem; item: any }): void {
    const excuse = event.item as EmployeeExcuseDto;

    switch (event.action.id) {
      case 'view':
        this.viewExcuse(excuse);
        break;
      case 'cancel':
        this.cancelExcuse(excuse);
        break;
    }
  }

  /**
   * Navigate to excuse request details
   */
  viewExcuse(excuse: EmployeeExcuseDto): void {
    this.router.navigate(['/excuse-requests', excuse.id]);
  }

  /**
   * Navigate to create new excuse request
   */
  createExcuse(): void {
    this.router.navigate(['/excuse-requests/new']);
  }

  /**
   * Cancel an excuse request
   */
  async cancelExcuse(excuse: EmployeeExcuseDto): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.cancel_excuse'),
      message: this.i18n.t('portal.cancel_excuse_confirm'),
      confirmText: this.i18n.t('common.yes_cancel'),
      cancelText: this.i18n.t('common.no'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi-x',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.loading.set(true);
      this.excuseService.cancelEmployeeExcuse(excuse.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('portal.excuse_cancelled'));
          this.loadExcuses();
        },
        error: (error) => {
          console.error('Failed to cancel excuse:', error);
          this.notificationService.error(this.i18n.t('portal.failed_to_cancel_excuse'));
          this.loading.set(false);
        }
      });
    }
  }

  /**
   * Refresh the excuse list
   */
  refresh(): void {
    this.loadExcuses();
  }

  /**
   * Format date for display
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Format time for display
   */
  private formatTime(timeString: string): string {
    return timeString.substring(0, 5); // HH:mm
  }

  /**
   * Get excuse type label
   */
  private getExcuseTypeLabel(type: ExcuseType): string {
    switch (type) {
      case ExcuseType.PersonalExcuse:
        return this.i18n.t('portal.personal_excuse');
      case ExcuseType.OfficialDuty:
        return this.i18n.t('portal.official_duty');
      default:
        return type;
    }
  }

  /**
   * Get status badge HTML for table display
   */
  private getStatusBadgeHtml(excuse: EmployeeExcuseDto): string {
    switch (excuse.status) {
      case ExcuseStatus.Pending:
        return '<span class="badge bg-warning">Pending</span>';
      case ExcuseStatus.Approved:
        return '<span class="badge bg-success">Approved</span>';
      case ExcuseStatus.Rejected:
        return '<span class="badge bg-danger">Rejected</span>';
      case ExcuseStatus.Cancelled:
        return '<span class="badge bg-secondary">Cancelled</span>';
      default:
        return `<span class="badge bg-secondary">${excuse.status}</span>`;
    }
  }
}
