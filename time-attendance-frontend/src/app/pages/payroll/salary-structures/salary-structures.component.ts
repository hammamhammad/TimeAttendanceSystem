import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { SalaryStructureService } from '../../../core/services/salary-structure.service';
import { SalaryStructure } from '../../../shared/models/salary-structure.model';

@Component({
  selector: 'app-salary-structures',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent, StatusBadgeComponent, UnifiedFilterComponent],
  templateUrl: './salary-structures.component.html',
  styleUrls: ['./salary-structures.component.css']
})
export class SalaryStructuresComponent implements OnInit {
  private salaryStructureService = inject(SalaryStructureService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  readonly i18n = inject(I18nService);

  items = signal<SalaryStructure[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);

  tableColumns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('payroll.salary_structures.name'), sortable: true, priority: 'high' },
    { key: 'branchName', label: this.i18n.t('common.branch'), sortable: true, priority: 'medium' },
    { key: 'componentCount', label: this.i18n.t('payroll.salary_structures.component_count'), sortable: true, priority: 'medium' },
    { key: 'isActive', label: this.i18n.t('common.status'), sortable: true, priority: 'high' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-solid fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-solid fa-edit', color: 'primary' },
    { key: 'toggle', label: this.i18n.t('common.toggle_status'), icon: 'fa-solid fa-toggle-on', color: 'warning' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-solid fa-trash', color: 'danger' }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.salaryStructureService.getAll({ page: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (response: any) => {
        const raw = Array.isArray(response) ? response : (response.data || response.items || []);
        const items = raw.map((item: any) => ({
          ...item,
          branchName: item.branchName || this.i18n.t('common.all'),
          componentCount: item.components?.length || item.componentCount || 0
        }));
        this.items.set(items);
        this.totalCount.set(response.totalCount || items.length);
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  create(): void {
    this.router.navigate(['/payroll/salary-structures/create']);
  }

  onActionClick(event: { action: string; item: SalaryStructure }): void {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/payroll/salary-structures', event.item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/payroll/salary-structures', event.item.id, 'edit']);
        break;
      case 'toggle':
        this.toggleStatus(event.item);
        break;
      case 'delete':
        this.deleteItem(event.item);
        break;
    }
  }

  toggleStatus(item: SalaryStructure): void {
    this.salaryStructureService.toggleStatus(item.id).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('common.status_updated'));
        this.loadData();
      },
      error: () => this.notificationService.error(this.i18n.t('common.error_updating'))
    });
  }

  deleteItem(item: SalaryStructure): void {
    this.confirmationService.confirm({
      title: this.i18n.t('common.confirm_delete'),
      message: this.i18n.t('payroll.salary_structures.confirm_delete_message'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.salaryStructureService.delete(item.id).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('common.deleted_successfully'));
            this.loadData();
          },
          error: () => this.notificationService.error(this.i18n.t('common.error_deleting'))
        });
      }
    });
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
