import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { TimesheetService } from '../../../core/services/timesheet.service';
import { ProjectDto } from '../../../shared/models/timesheet.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(TimesheetService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);

  data = signal<ProjectDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'code', label: this.i18n.t('timesheets.projects.code'), sortable: true, priority: 'high' },
    { key: 'name', label: this.i18n.t('timesheets.projects.name'), sortable: true, priority: 'high' },
    { key: 'clientName', label: this.i18n.t('timesheets.projects.client_name'), sortable: true, priority: 'medium' },
    { key: 'branchName', label: this.i18n.t('timesheets.projects.branch'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high', renderHtml: true },
    { key: 'isActive', label: this.i18n.t('common.active'), sortable: true, priority: 'medium', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getProjects({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  onAdd(): void { this.router.navigate(['/timesheets/projects/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  tableData = computed(() => this.data().map(item => ({
    ...item,
    status: this.getStatusBadge(item.status),
    isActive: item.isActive
      ? `<span class="badge bg-success">${this.i18n.t('common.active')}</span>`
      : `<span class="badge bg-secondary">${this.i18n.t('common.inactive')}</span>`
  })));

  onActionClick(event: { action: string; item: any }): void {
    const original = this.data().find(d => d.id === event.item.id);
    if (!original) return;
    if (event.action === 'view') this.router.navigate(['/timesheets/projects', original.id, 'view']);
    else if (event.action === 'edit') this.router.navigate(['/timesheets/projects', original.id, 'edit']);
    else if (event.action === 'delete') this.deleteItem(original);
  }

  async deleteItem(item: ProjectDto): Promise<void> {
    const result = await this.confirmation.confirm({ title: this.i18n.t('common.confirm_delete'), message: this.i18n.t('timesheets.projects.confirm_delete'), confirmText: this.i18n.t('common.delete'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger' });
    if (!result.confirmed) return;
    this.service.deleteProject(item.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('timesheets.projects.deleted')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('common.error'))
    });
  }

  private getStatusBadge(status: string): string {
    const map: Record<string, string> = { Active: 'success', OnHold: 'warning', Completed: 'info', Cancelled: 'danger', Archived: 'secondary' };
    const variant = map[status] || 'secondary';
    const label = this.i18n.t(`timesheets.projects.status_${status.toLowerCase()}`);
    return `<span class="badge bg-${variant}">${label}</span>`;
  }
}
