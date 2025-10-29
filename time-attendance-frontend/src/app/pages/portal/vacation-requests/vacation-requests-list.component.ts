import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { TableActionsComponent, TableActionItem } from '../../../shared/components/table-actions/table-actions.component';
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
    TableActionsComponent,
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

  // Table columns
  readonly columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'vacationTypeName', label: 'Type', sortable: true },
    { key: 'startDate', label: 'Start Date', sortable: true },
    { key: 'endDate', label: 'End Date', sortable: true },
    { key: 'totalDays', label: 'Days', sortable: true, width: '100px' },
    { key: 'status', label: 'Status', sortable: true, renderHtml: true },
    { key: 'actions', label: 'Actions', sortable: false, width: '120px' }
  ];

  // Table actions
  readonly actions: TableActionItem[] = [
    {
      id: 'view',
      label: 'View',
      icon: 'fa-eye',
      variant: 'primary'
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: 'fa-edit',
      variant: 'warning',
      visible: (item: any) => !item.isApproved && !item.isCompleted
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'fa-trash',
      variant: 'danger',
      visible: (item: any) => !item.isApproved && !item.isCompleted
    }
  ];

  // Computed properties for table data
  tableData = computed(() => {
    const vacs = this.vacations();
    return vacs.map(vac => ({
      ...vac,
      startDate: this.formatDate(vac.startDate),
      endDate: this.formatDate(vac.endDate),
      status: this.getStatusBadgeHtml(vac)
    }));
  });

  ngOnInit(): void {
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
    this.router.navigate(['/portal/vacation-requests/new']);
  }

  onActionClick(event: { action: TableActionItem; item: any }): void {
    const vacation = this.vacations().find(v => v.id === event.item.id);
    if (!vacation) return;

    switch (event.action.id) {
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
    this.router.navigate(['/portal/vacation-requests', vacation.id]);
  }

  editVacation(vacation: EmployeeVacation): void {
    this.router.navigate(['/portal/vacation-requests', vacation.id, 'edit']);
  }

  async deleteVacation(vacation: EmployeeVacation): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.delete_vacation'),
      message: this.i18n.t('portal.delete_vacation_confirm'),
      confirmText: this.i18n.t('common.yes_delete'),
      cancelText: this.i18n.t('common.no'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
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
    if (vacation.isCurrentlyActive) {
      return '<span class="badge bg-info">Active</span>';
    }
    if (vacation.isCompleted) {
      return '<span class="badge bg-secondary">Completed</span>';
    }
    if (vacation.isUpcoming) {
      if (vacation.isApproved) {
        return '<span class="badge bg-success">Approved</span>';
      }
      return '<span class="badge bg-warning">Pending</span>';
    }
    if (vacation.isApproved) {
      return '<span class="badge bg-success">Approved</span>';
    }
    return '<span class="badge bg-warning">Pending</span>';
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
