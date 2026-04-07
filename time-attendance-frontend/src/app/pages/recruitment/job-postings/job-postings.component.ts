import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { RecruitmentService } from '../../../core/services/recruitment.service';
import { JobPosting } from '../../../shared/models/recruitment.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-job-postings',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './job-postings.component.html',
  styleUrls: ['./job-postings.component.css']
})
export class JobPostingsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(RecruitmentService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  items = signal<JobPosting[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(p => ({
    ...p,
    _statusDisplay: this.formatStatus(p.status),
    _channelDisplay: [p.isInternal ? this.i18n.t('job_postings.internal') : '', !p.isInternal ? this.i18n.t('job_postings.external') : ''].filter(Boolean).join(', ')
  })));

  tableColumns: TableColumn[] = [
    { key: 'postingTitle', label: this.i18n.t('job_postings.title_field'), sortable: true, width: '25%' },
    { key: 'employmentType', label: this.i18n.t('job_postings.employment_type'), sortable: true, width: '12%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), sortable: true, width: '12%', renderHtml: true },
    { key: '_channelDisplay', label: this.i18n.t('job_postings.channel'), sortable: false, width: '12%' },
    { key: 'applicationCount', label: this.i18n.t('job_postings.applications'), sortable: true, width: '10%' },
    { key: 'expiryDate', label: this.i18n.t('job_postings.expiry_date'), sortable: true, width: '14%' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' },
    { key: 'publish', label: this.i18n.t('job_postings.publish'), icon: 'fa-bullhorn', color: 'success', condition: (i: JobPosting) => i.status === 'Draft' },
    { key: 'close', label: this.i18n.t('job_postings.close_posting'), icon: 'fa-times-circle', color: 'danger', condition: (i: JobPosting) => i.status === 'Active' || i.status === 'Published' }
  ];

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getPostings({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('job_postings.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: JobPosting }): void {
    if (event.action === 'view') this.router.navigate(['/recruitment/postings', event.item.id, 'view']);
    if (event.action === 'publish') this.service.publishPosting(event.item.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('job_postings.published_success')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('job_postings.publish_error'))
    });
    if (event.action === 'close') this.service.closePosting(event.item.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('job_postings.closed_success')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('job_postings.close_error'))
    });
  }

  navigateToCreate(): void { this.router.navigate(['/recruitment/postings/create']); }
  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, searchTerm: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }

  private formatStatus(s: string): string {
    const map: Record<string, { label: string; cls: string }> = {
      'Draft': { label: this.i18n.t('common.draft'), cls: 'badge bg-secondary' },
      'Active': { label: this.i18n.t('common.active'), cls: 'badge bg-success' },
      'Published': { label: this.i18n.t('job_postings.status_published'), cls: 'badge bg-success' },
      'Paused': { label: this.i18n.t('job_postings.status_paused'), cls: 'badge bg-warning text-dark' },
      'Closed': { label: this.i18n.t('job_postings.status_closed'), cls: 'badge bg-danger' },
      'Expired': { label: this.i18n.t('common.expired'), cls: 'badge bg-dark' }
    };
    const info = map[s] || { label: s, cls: 'badge bg-light text-dark' };
    return `<span class="${info.cls}">${info.label}</span>`;
  }
}
