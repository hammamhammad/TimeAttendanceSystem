import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { SuccessionService } from '../../../core/services/succession.service';
import { CareerPath } from '../../../shared/models/succession.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-career-paths',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './career-paths.component.html',
  styleUrls: ['./career-paths.component.css']
})
export class CareerPathsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(SuccessionService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  items = signal<CareerPath[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(item => ({
    ...item,
    _statusDisplay: item.isActive
      ? `<span class="badge bg-success">${this.i18n.t('common.active')}</span>`
      : `<span class="badge bg-secondary">${this.i18n.t('common.inactive')}</span>`
  })));

  tableColumns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('succession.career_paths.name'), sortable: true, width: '25%' },
    { key: 'description', label: this.i18n.t('succession.career_paths.description'), sortable: false, width: '30%' },
    { key: 'stepCount', label: this.i18n.t('succession.career_paths.steps'), width: '12%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), width: '12%', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'info' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getCareerPaths({ pageNumber: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('succession.career_paths.load_error')); this.loading.set(false); }
    });
  }

  async onTableAction(event: { action: string; item: CareerPath }): Promise<void> {
    if (event.action === 'view') this.router.navigate(['/succession/career-paths', event.item.id, 'view']);
    if (event.action === 'edit') this.router.navigate(['/succession/career-paths', event.item.id, 'edit']);
    if (event.action === 'delete') {
      const result = await this.confirmation.confirm({
        title: this.i18n.t('common.delete'),
        message: this.i18n.t('succession.career_paths.confirm_delete'),
        confirmText: this.i18n.t('common.delete'),
        confirmButtonClass: 'btn-danger'
      });
      if (!result.confirmed) return;
      this.service.deleteCareerPath(event.item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('succession.career_paths.deleted_success')); this.loadData(); },
        error: (err) => this.notification.error(err?.error?.error || this.i18n.t('succession.career_paths.delete_error'))
      });
    }
  }

  navigateToCreate(): void { this.router.navigate(['/succession/career-paths/create']); }
  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, search: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }
}
