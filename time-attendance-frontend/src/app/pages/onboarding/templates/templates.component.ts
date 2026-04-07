import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { OnboardingService } from '../../../core/services/onboarding.service';
import { OnboardingTemplate } from '../../../shared/models/onboarding.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-onboarding-templates',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class OnboardingTemplatesComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(OnboardingService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  items = signal<OnboardingTemplate[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(t => ({
    ...t,
    _statusDisplay: `<span class="badge bg-${(t.status || (t.isActive ? 'Active' : 'Inactive')) === 'Active' ? 'success' : (t.status || '') === 'Draft' ? 'secondary' : 'warning'}">${t.status || (t.isActive ? 'Active' : 'Inactive')}</span>`
  })));

  tableColumns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('onboarding_templates.name'), sortable: true, width: '25%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), sortable: true, width: '12%', renderHtml: true },
    { key: 'departmentName', label: this.i18n.t('fields.department'), sortable: true, width: '15%' },
    { key: 'estimatedDays', label: this.i18n.t('onboarding_templates.estimated_days'), sortable: true, width: '12%' },
    { key: 'taskCount', label: this.i18n.t('onboarding_templates.task_count'), sortable: true, width: '12%' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'info' },
    { key: 'toggleStatus', label: this.i18n.t('onboarding_templates.toggle_status'), icon: 'fa-toggle-on', color: 'warning' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger', condition: (i: OnboardingTemplate) => (i.status || '') === 'Draft' }
  ];

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getTemplates({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('onboarding_templates.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: OnboardingTemplate }): void {
    if (event.action === 'view') this.router.navigate(['/onboarding/templates', event.item.id, 'view']);
    if (event.action === 'edit') this.router.navigate(['/onboarding/templates', event.item.id, 'edit']);
    if (event.action === 'toggleStatus') this.service.toggleTemplateStatus(event.item.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('onboarding_templates.toggled_success')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('onboarding_templates.toggle_error'))
    });
    if (event.action === 'delete') this.service.deleteTemplate(event.item.id).subscribe({ next: () => { this.notification.success(this.i18n.t('onboarding_templates.deleted_success')); this.loadData(); } });
  }

  navigateToCreate(): void { this.router.navigate(['/onboarding/templates/create']); }
  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, searchTerm: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }
}
