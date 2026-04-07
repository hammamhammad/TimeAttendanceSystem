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
import { Investigation, InvestigationStatus, EmployeeRelationsPagedResult } from '../../../shared/models/employee-relations.model';

@Component({
  selector: 'app-investigations',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent, StatusBadgeComponent, UnifiedFilterComponent],
  templateUrl: './investigations.component.html',
  styleUrls: ['./investigations.component.css']
})
export class InvestigationsComponent implements OnInit {
  private service = inject(EmployeeRelationsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  readonly i18n = inject(I18nService);

  items = signal<Investigation[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  searchTerm = '';

  tableColumns: TableColumn[] = [
    { key: 'subject', label: this.i18n.t('investigations.subject'), sortable: true, priority: 'high' },
    { key: 'employeeName', label: this.i18n.t('common.employee'), sortable: true, priority: 'high' },
    { key: 'assignedToName', label: this.i18n.t('investigations.assigned_to'), sortable: true, priority: 'medium' },
    { key: 'startDate', label: this.i18n.t('investigations.start_date'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-solid fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-solid fa-edit', color: 'primary', condition: (item) => item.status === 'Open' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-solid fa-trash', color: 'danger', condition: (item) => item.status === 'Open' }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    const params: any = { page: this.currentPage(), pageSize: this.pageSize() };
    if (this.searchTerm) params.search = this.searchTerm;
    this.service.getInvestigations(params).subscribe({
      next: (result: EmployeeRelationsPagedResult<Investigation>) => {
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

  onActionClick(event: { action: string; item: Investigation }): void {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/employee-relations/investigations', event.item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/employee-relations/investigations', event.item.id, 'edit']);
        break;
      case 'delete':
        this.deleteInvestigation(event.item);
        break;
    }
  }

  deleteInvestigation(item: Investigation): void {
    this.confirmationService.confirm({
      title: this.i18n.t('common.confirm_delete'),
      message: this.i18n.t('investigations.confirm_delete_message'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.service.deleteInvestigation(item.id).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('investigations.deleted'));
            this.loadData();
          },
          error: () => this.notificationService.error(this.i18n.t('common.error'))
        });
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/employee-relations/investigations/create']);
  }

  getStatusVariant(status: InvestigationStatus): string {
    const map: Record<InvestigationStatus, string> = {
      'Open': 'info', 'InProgress': 'primary', 'OnHold': 'warning',
      'Completed': 'success', 'Closed': 'dark', 'Cancelled': 'secondary'
    };
    return map[status] || 'secondary';
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
