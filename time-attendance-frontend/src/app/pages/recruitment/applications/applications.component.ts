import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { RecruitmentService } from '../../../core/services/recruitment.service';
import { JobApplication } from '../../../shared/models/recruitment.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(RecruitmentService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  items = signal<JobApplication[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(a => ({
    ...a,
    _statusDisplay: this.formatStatus(a.status),
    _appliedDisplay: a.appliedDate ? new Date(a.appliedDate).toLocaleDateString() : '-'
  })));

  tableColumns: TableColumn[] = [
    { key: 'candidateName', label: this.i18n.t('job_applications.candidate'), sortable: true, width: '18%' },
    { key: 'postingTitle', label: this.i18n.t('job_applications.posting'), sortable: true, width: '22%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), sortable: true, width: '12%', renderHtml: true },
    { key: 'currentStage', label: this.i18n.t('job_applications.stage'), sortable: true, width: '12%' },
    { key: 'rating', label: this.i18n.t('job_applications.rating'), sortable: true, width: '10%' },
    { key: '_appliedDisplay', label: this.i18n.t('job_applications.applied_date'), sortable: true, width: '14%' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' }
  ];

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getApplications({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('job_applications.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: JobApplication }): void {
    if (event.action === 'view') this.router.navigate(['/recruitment/applications', event.item.id, 'edit']);
  }

  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, searchTerm: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }

  private formatStatus(s: string): string {
    const map: Record<string, string> = { 'Applied': 'secondary', 'Screening': 'info', 'Interview': 'warning', 'Assessment': 'primary', 'Offered': 'success', 'Hired': 'success', 'Rejected': 'danger', 'Withdrawn': 'dark' };
    return `<span class="badge bg-${map[s] || 'secondary'}">${s}</span>`;
  }
}
