import { Component, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { TerminationService } from '../../../core/services/termination.service';
import { Termination, ClearanceStatus } from '../../../shared/models/termination.model';

@Component({
  selector: 'app-terminations',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent, StatusBadgeComponent, UnifiedFilterComponent],
  templateUrl: './terminations.component.html',
  styleUrls: ['./terminations.component.css']
})
export class TerminationsComponent implements OnInit {
  private terminationService = inject(TerminationService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  readonly i18n = inject(I18nService);

  items = signal<Termination[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);

  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('common.employee'), sortable: true, priority: 'high' },
    { key: 'terminationType', label: this.i18n.t('offboarding.terminations.type'), sortable: true, priority: 'high' },
    { key: 'terminationDate', label: this.i18n.t('offboarding.terminations.termination_date'), sortable: true, priority: 'high' },
    { key: 'lastWorkingDate', label: this.i18n.t('offboarding.terminations.last_working_date'), sortable: true, priority: 'medium' },
    { key: 'clearanceStatus', label: this.i18n.t('offboarding.terminations.clearance_status'), sortable: true, priority: 'medium' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-solid fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-solid fa-edit', color: 'secondary', condition: (item) => item.clearanceStatus === 'Pending' }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.terminationService.getAll({ page: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (data) => {
        this.items.set(data);
        this.totalCount.set(data.length);
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  create(): void {
    this.router.navigate(['/offboarding/terminations/create']);
  }

  onActionClick(event: { action: string; item: Termination }): void {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/offboarding/terminations', event.item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/offboarding/terminations', event.item.id, 'edit']);
        break;
    }
  }

  getClearanceVariant(status: ClearanceStatus): string {
    const map: Record<ClearanceStatus, string> = {
      'Pending': 'warning', 'InProgress': 'info', 'Completed': 'success'
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
