import { Component, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeRelationsService } from '../../../core/services/employee-relations.service';
import { DisciplinaryAction, DisciplinaryActionStatus, EmployeeRelationsPagedResult } from '../../../shared/models/employee-relations.model';

@Component({
  selector: 'app-disciplinary-actions',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent, StatusBadgeComponent, UnifiedFilterComponent],
  templateUrl: './disciplinary-actions.component.html',
  styleUrls: ['./disciplinary-actions.component.css']
})
export class DisciplinaryActionsComponent implements OnInit {
  private service = inject(EmployeeRelationsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  readonly i18n = inject(I18nService);

  items = signal<DisciplinaryAction[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  searchTerm = '';

  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('common.employee'), sortable: true, priority: 'high' },
    { key: 'actionType', label: this.i18n.t('disciplinary_actions.action_type'), sortable: true, priority: 'high' },
    { key: 'severity', label: this.i18n.t('disciplinary_actions.severity'), sortable: true, priority: 'medium' },
    { key: 'incidentDate', label: this.i18n.t('disciplinary_actions.incident_date'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-solid fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-solid fa-edit', color: 'primary', condition: (item) => item.status === 'Draft' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-solid fa-trash', color: 'danger', condition: (item) => item.status === 'Draft' }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    const params: any = { page: this.currentPage(), pageSize: this.pageSize() };
    if (this.searchTerm) params.search = this.searchTerm;
    this.service.getDisciplinaryActions(params).subscribe({
      next: (result: EmployeeRelationsPagedResult<DisciplinaryAction>) => {
        this.items.set(result.data);
        this.totalCount.set(result.totalCount);
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.currentPage.set(1);
    this.loadData();
  }

  onActionClick(event: { action: string; item: DisciplinaryAction }): void {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/employee-relations/disciplinary-actions', event.item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/employee-relations/disciplinary-actions', event.item.id, 'edit']);
        break;
      case 'delete':
        this.deleteAction(event.item);
        break;
    }
  }

  deleteAction(item: DisciplinaryAction): void {
    this.confirmationService.confirm({
      title: this.i18n.t('common.confirm_delete'),
      message: this.i18n.t('disciplinary_actions.confirm_delete_message'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.service.deleteDisciplinaryAction(item.id).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('disciplinary_actions.deleted'));
            this.loadData();
          },
          error: () => this.notificationService.error(this.i18n.t('common.error'))
        });
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/employee-relations/disciplinary-actions/create']);
  }

  getStatusVariant(status: DisciplinaryActionStatus): string {
    const map: Record<DisciplinaryActionStatus, string> = {
      'Draft': 'secondary', 'Pending': 'warning', 'Approved': 'success',
      'Acknowledged': 'info', 'Appealed': 'danger', 'AppealResolved': 'primary',
      'Completed': 'dark', 'Cancelled': 'secondary'
    };
    return map[status] || 'secondary';
  }

  getSeverityVariant(severity: string): string {
    const map: Record<string, string> = {
      'Minor': 'info', 'Moderate': 'warning', 'Major': 'danger', 'Severe': 'danger', 'Critical': 'danger'
    };
    return map[severity] || 'secondary';
  }

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadData();
  }
}
