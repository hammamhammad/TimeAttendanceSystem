import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { EmployeeVacationsService } from '../../employee-vacations/employee-vacations.service';
import { EmployeeVacation } from '../../../shared/models/employee-vacation.model';

/**
 * Vacation Requests List Component
 * Displays all vacation requests for the current employee
 */
@Component({
  selector: 'app-vacation-requests-list',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    DataTableComponent,
    EmptyStateComponent
  ],
  templateUrl: './vacation-requests-list.component.html',
  styleUrl: './vacation-requests-list.component.css'
})
export class VacationRequestsListComponent implements OnInit, OnDestroy {
  private readonly vacationService = inject(EmployeeVacationsService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  // State
  vacations = signal<EmployeeVacation[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Sorting state
  sortColumn = signal<string>('createdAtUtc');
  sortDirection = signal<'asc' | 'desc'>('desc');

  // Table columns
  columns: TableColumn[] = [];

  initColumns(): void {
    this.columns = [
      { key: 'id', label: 'ID', sortable: true, width: '80px' },
      { key: 'vacationTypeName', label: this.i18n.t('portal.vacation_type'), sortable: true },
      { key: 'startDate', label: this.i18n.t('portal.start_date'), sortable: true },
      { key: 'endDate', label: this.i18n.t('portal.end_date'), sortable: true },
      { key: 'totalDays', label: this.i18n.t('portal.total_days'), sortable: true, width: '80px' },
      { key: 'createdAtUtc', label: this.i18n.t('portal.submitted_date'), sortable: true },
      { key: 'status', label: this.i18n.t('portal.status'), sortable: true, renderHtml: true }
    ];
  }

  // Table actions - using DataTableComponent's TableAction interface with Bootstrap Icons
  tableActions: TableAction[] = [];

  initTableActions(): void {
    this.tableActions = [
      {
        key: 'view',
        label: 'View',
        icon: 'bi-eye',
        color: 'primary'
      },
      {
        key: 'edit',
        label: 'Edit',
        icon: 'bi-pencil',
        color: 'warning',
        // Only allow edit for pending workflow requests that haven't been finalized
        condition: (item: any) => this.canEditOrDelete(item)
      },
      {
        key: 'delete',
        label: 'Delete',
        icon: 'bi-trash',
        color: 'danger',
        // Only allow delete for pending workflow requests that haven't been finalized
        condition: (item: any) => this.canEditOrDelete(item)
      }
    ];
  }

  /**
   * Check if a vacation request can be edited or deleted.
   * Only pending requests that haven't been finalized (approved/rejected/expired) can be modified.
   */
  canEditOrDelete(item: any): boolean {
    // Get the original vacation to check workflow status
    const vacation = this.vacations().find(v => v.id === item.id);
    if (!vacation) return false;

    const workflowStatus = vacation.workflowStatus?.toLowerCase();

    // Cannot edit/delete if:
    // - Already approved (isApproved = true)
    // - Workflow status is expired (timed out)
    // - Workflow status is rejected
    // - Workflow status is approved
    if (vacation.isApproved) return false;
    if (workflowStatus === 'expired') return false;
    if (workflowStatus === 'rejected') return false;
    if (workflowStatus === 'approved') return false;

    // Can edit/delete if workflow is pending or in progress
    return workflowStatus === 'pending' || workflowStatus === 'inprogress';
  }

  // Computed properties for table data with sorting
  tableData = computed(() => {
    const vacs = this.vacations();
    const column = this.sortColumn();
    const direction = this.sortDirection();

    // Sort the data
    const sorted = [...vacs].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (column) {
        case 'id':
          aVal = a.id;
          bVal = b.id;
          break;
        case 'vacationTypeName':
          aVal = a.vacationTypeName?.toLowerCase() || '';
          bVal = b.vacationTypeName?.toLowerCase() || '';
          break;
        case 'startDate':
          aVal = new Date(a.startDate).getTime();
          bVal = new Date(b.startDate).getTime();
          break;
        case 'endDate':
          aVal = new Date(a.endDate).getTime();
          bVal = new Date(b.endDate).getTime();
          break;
        case 'totalDays':
          aVal = a.totalDays;
          bVal = b.totalDays;
          break;
        case 'createdAtUtc':
          aVal = new Date(a.createdAtUtc).getTime();
          bVal = new Date(b.createdAtUtc).getTime();
          break;
        case 'status':
          aVal = this.getStatusSortOrder(a);
          bVal = this.getStatusSortOrder(b);
          break;
        default:
          aVal = a.id;
          bVal = b.id;
      }

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    // Map to display format
    return sorted.map(vac => ({
      ...vac,
      startDate: this.formatDate(vac.startDate),
      endDate: this.formatDate(vac.endDate),
      createdAtUtc: this.formatDate(vac.createdAtUtc),
      status: this.getStatusBadgeHtml(vac)
    }));
  });

  // Helper to get status sort order
  getStatusSortOrder(vac: EmployeeVacation): number {
    // Check workflow status for expired (timed out)
    if (vac.workflowStatus?.toLowerCase() === 'expired') return 2; // Workflow timed out
    if (vac.workflowStatus?.toLowerCase() === 'rejected') return 2; // Rejected
    if (vac.isApproved && vac.isCurrentlyActive) return 1; // Active
    if (!vac.isApproved) return 3; // Pending
    if (vac.isApproved && !vac.isCompleted) return 4; // Approved
    return 5; // Completed
  }

  ngOnInit(): void {
    this.initColumns();
    this.initTableActions();
    this.loadVacations();
  }

  ngOnDestroy(): void {
    // Clean up if needed
  }

  loadVacations(): void {
    this.loading.set(true);
    this.error.set(null);

    this.vacationService.getVacations().subscribe({
      next: (result) => {
        this.vacations.set(result.items);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load vacations:', error);
        this.error.set('Failed to load vacation requests');
        this.notificationService.error(this.i18n.t('portal.failed_to_load_vacations'));
        this.loading.set(false);
      }
    });
  }

  refresh(): void {
    this.loadVacations();
  }

  createVacation(): void {
    this.router.navigate(['/vacation-requests/new']);
  }

  onSort(event: { column: string; direction: 'asc' | 'desc' }): void {
    this.sortColumn.set(event.column);
    this.sortDirection.set(event.direction);
  }

  onActionClick(event: { action: string; item: any }): void {
    const vacation = this.vacations().find(v => v.id === event.item.id);
    if (!vacation) return;

    switch (event.action) {
      case 'view':
        this.viewVacation(vacation);
        break;
      case 'edit':
        this.editVacation(vacation);
        break;
      case 'delete':
        this.deleteVacation(vacation);
        break;
    }
  }

  viewVacation(vacation: EmployeeVacation): void {
    this.router.navigate(['/vacation-requests', vacation.id]);
  }

  editVacation(vacation: EmployeeVacation): void {
    this.router.navigate(['/vacation-requests', vacation.id, 'edit']);
  }

  async deleteVacation(vacation: EmployeeVacation): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.delete_vacation'),
      message: this.i18n.t('portal.delete_vacation_confirm'),
      confirmText: this.i18n.t('common.yes_delete'),
      cancelText: this.i18n.t('common.no'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi bi-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.vacationService.deleteVacation(vacation.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('portal.vacation_deleted_successfully'));
          this.loadVacations();
        },
        error: (error) => {
          console.error('Failed to delete vacation:', error);
          this.notificationService.error(this.i18n.t('portal.failed_to_delete_vacation'));
        }
      });
    }
  }

  getStatusBadgeHtml(vacation: EmployeeVacation): string {
    // Check workflow status first - this reflects the actual approval state
    const workflowStatus = vacation.workflowStatus?.toLowerCase();

    // If workflow explicitly expired (timed out), show as expired
    if (workflowStatus === 'expired') {
      return `<span class="badge bg-danger">${this.i18n.t('portal.status_expired')}</span>`;
    }

    // If workflow was rejected
    if (workflowStatus === 'rejected') {
      return `<span class="badge bg-danger">${this.i18n.t('portal.status_rejected')}</span>`;
    }

    // Check if vacation dates have passed
    const isPastEndDate = vacation.isCompleted;

    if (vacation.isApproved) {
      // Approved vacation
      if (vacation.isCurrentlyActive) {
        return `<span class="badge bg-info">${this.i18n.t('portal.status_active')}</span>`;
      }
      if (isPastEndDate) {
        return `<span class="badge bg-secondary">${this.i18n.t('portal.status_completed')}</span>`;
      }
      // Approved and upcoming
      return `<span class="badge bg-success">${this.i18n.t('portal.status_approved')}</span>`;
    } else {
      // Not approved - workflow is still in progress
      // Show as pending regardless of vacation dates
      return `<span class="badge bg-warning">${this.i18n.t('portal.status_pending')}</span>`;
    }
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
