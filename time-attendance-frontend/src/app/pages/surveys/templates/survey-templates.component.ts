import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { SurveyService } from '../../../core/services/survey.service';
import { SurveyTemplateDto, SurveyType } from '../../../shared/models/survey.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-survey-templates',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './survey-templates.component.html',
  styleUrl: './survey-templates.component.css'
})
export class SurveyTemplatesComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(SurveyService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);

  data = signal<SurveyTemplateDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  typeFilter = signal('');
  activeFilter = signal('');

  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  typeOptions = Object.values(SurveyType);

  columns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('surveys.template_name'), sortable: true, priority: 'high' },
    { key: '_typeDisplay', label: this.i18n.t('surveys.type'), sortable: true, priority: 'medium', renderHtml: true },
    { key: 'questionCount', label: this.i18n.t('surveys.question_count'), sortable: true, priority: 'medium' },
    { key: 'distributionCount', label: this.i18n.t('surveys.distribution_count'), sortable: true, priority: 'low' },
    { key: '_statusDisplay', label: this.i18n.t('common.status'), sortable: true, priority: 'high', renderHtml: true },
    { key: '_createdDateDisplay', label: this.i18n.t('common.created_date'), sortable: true, priority: 'low' }
  ];

  tableData = computed(() => {
    return this.data().map(item => ({
      ...item,
      _typeDisplay: this.getTypeBadgeHtml(item.surveyType),
      _statusDisplay: this.getStatusBadgeHtml(item.isActive),
      _createdDateDisplay: item.createdAtUtc ? new Date(item.createdAtUtc).toLocaleDateString() : '-'
    }));
  });

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'duplicate', label: this.i18n.t('surveys.duplicate'), icon: 'fa-copy', color: 'secondary' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger', condition: (item: any) => item.distributionCount === 0 }
  ]);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.service.getTemplates({
      search: this.searchTerm(),
      surveyType: this.typeFilter() || undefined,
      isActive: this.activeFilter() !== '' ? this.activeFilter() : undefined,
      pageNumber: this.currentPage(),
      pageSize: this.pageSize()
    }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  onAdd(): void { this.router.navigate(['/surveys/templates/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }
  onTypeChange(value: string): void { this.typeFilter.set(value); this.currentPage.set(1); this.loadData(); }
  onActiveChange(value: string): void { this.activeFilter.set(value); this.currentPage.set(1); this.loadData(); }

  onActionClick(event: { action: string; item: SurveyTemplateDto }): void {
    if (event.action === 'view') {
      this.router.navigate(['/surveys/templates', event.item.id, 'view']);
    } else if (event.action === 'edit') {
      this.router.navigate(['/surveys/templates', event.item.id, 'edit']);
    } else if (event.action === 'duplicate') {
      this.duplicateTemplate(event.item);
    } else if (event.action === 'delete') {
      this.deleteTemplate(event.item);
    }
  }

  async duplicateTemplate(item: SurveyTemplateDto): Promise<void> {
    const result = await this.confirmation.confirm({ title: this.i18n.t('surveys.duplicate'), message: this.i18n.t('surveys.confirm_duplicate'), confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-primary' });
    if (!result.confirmed) return;
    this.service.duplicateTemplate(item.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('surveys.duplicated')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('common.error'))
    });
  }

  async deleteTemplate(item: SurveyTemplateDto): Promise<void> {
    const result = await this.confirmation.confirm({ title: this.i18n.t('common.confirm_delete'), message: this.i18n.t('surveys.confirm_delete_template'), confirmText: this.i18n.t('common.delete'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger' });
    if (!result.confirmed) return;
    this.service.deleteTemplate(item.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('surveys.template_deleted')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('common.error'))
    });
  }

  getTypeBadgeHtml(type: string): string {
    const map: Record<string, string> = { EmployeeEngagement: 'bg-primary', PulseSurvey: 'bg-info', ENPS: 'bg-success', Onboarding: 'bg-warning', ExitSurvey: 'bg-danger', Custom: 'bg-secondary' };
    const cls = 'badge ' + (map[type] ?? 'bg-secondary');
    return `<span class="${cls}">${this.i18n.t('surveys.type_' + type)}</span>`;
  }

  getStatusBadgeHtml(active: boolean): string {
    const cls = 'badge ' + (active ? 'bg-success' : 'bg-secondary');
    const label = active ? this.i18n.t('common.active') : this.i18n.t('common.inactive');
    return `<span class="${cls}">${label}</span>`;
  }
}
