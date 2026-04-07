import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { RecruitmentService } from '../../../core/services/recruitment.service';
import { JobRequisition, RequisitionStatus, RequisitionPriority } from '../../../shared/models/recruitment.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-job-requisitions',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './job-requisitions.component.html',
  styleUrls: ['./job-requisitions.component.css']
})
export class JobRequisitionsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(RecruitmentService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  items = signal<JobRequisition[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(r => ({
    ...r,
    _statusDisplay: this.formatStatus(r.status),
    _priorityDisplay: this.formatPriority(r.priority),
    _positionsDisplay: `${r.filledPositions}/${r.numberOfPositions}`
  })));

  tableColumns: TableColumn[] = [
    { key: 'requisitionNumber', label: this.i18n.t('job_requisitions.number'), sortable: true, width: '12%' },
    { key: 'jobTitle', label: this.i18n.t('job_requisitions.title_field'), sortable: true, width: '20%' },
    { key: 'departmentName', label: this.i18n.t('fields.department'), sortable: true, width: '14%' },
    { key: '_priorityDisplay', label: this.i18n.t('job_requisitions.priority'), sortable: true, width: '10%', renderHtml: true },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), sortable: true, width: '12%', renderHtml: true },
    { key: '_positionsDisplay', label: this.i18n.t('job_requisitions.filled_positions'), sortable: false, width: '10%' },
    { key: 'branchName', label: this.i18n.t('fields.branch'), sortable: true, width: '14%' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary', condition: (item: JobRequisition) => item.status === 'Draft' },
    { key: 'submit', label: this.i18n.t('job_requisitions.submit'), icon: 'fa-paper-plane', color: 'warning', condition: (item: JobRequisition) => item.status === 'Draft' },
    { key: 'approve', label: this.i18n.t('common.approve'), icon: 'fa-check', color: 'success', condition: (item: JobRequisition) => item.status === 'PendingApproval' },
    { key: 'reject', label: this.i18n.t('common.reject'), icon: 'fa-times', color: 'danger', condition: (item: JobRequisition) => item.status === 'PendingApproval' },
    { key: 'cancel', label: this.i18n.t('common.cancel'), icon: 'fa-ban', color: 'secondary', condition: (item: JobRequisition) => ['Draft', 'PendingApproval', 'Approved'].includes(item.status) }
  ];

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getRequisitions({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('job_requisitions.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: JobRequisition }): void {
    const { action, item } = event;
    switch (action) {
      case 'view': this.router.navigate(['/recruitment/requisitions', item.id, 'view']); break;
      case 'edit': this.router.navigate(['/recruitment/requisitions', item.id, 'edit']); break;
      case 'submit':
        this.service.submitRequisition(item.id).subscribe({
          next: () => { this.notification.success(this.i18n.t('job_requisitions.submitted_success')); this.loadData(); },
          error: () => this.notification.error(this.i18n.t('job_requisitions.submit_error'))
        });
        break;
      case 'approve':
        this.service.approveRequisition(item.id).subscribe({
          next: () => { this.notification.success(this.i18n.t('job_requisitions.approved_success')); this.loadData(); },
          error: () => this.notification.error(this.i18n.t('job_requisitions.approve_error'))
        });
        break;
      case 'reject':
        this.service.rejectRequisition(item.id, 'Rejected').subscribe({
          next: () => { this.notification.success(this.i18n.t('job_requisitions.rejected_success')); this.loadData(); },
          error: () => this.notification.error(this.i18n.t('job_requisitions.reject_error'))
        });
        break;
      case 'cancel':
        this.service.cancelRequisition(item.id).subscribe({
          next: () => { this.notification.success(this.i18n.t('job_requisitions.cancelled_success')); this.loadData(); },
          error: () => this.notification.error(this.i18n.t('job_requisitions.cancel_error'))
        });
        break;
    }
  }

  navigateToCreate(): void { this.router.navigate(['/recruitment/requisitions/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }
  onSearchChange(term: string): void { this.currentFilter = { ...this.currentFilter, search: term }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }

  private formatStatus(s: RequisitionStatus): string {
    const map: Record<string, { label: string; cls: string }> = {
      'Draft': { label: this.i18n.t('common.draft'), cls: 'badge bg-secondary' },
      'PendingApproval': { label: this.i18n.t('common.pending_approval'), cls: 'badge bg-warning text-dark' },
      'Approved': { label: this.i18n.t('common.approved'), cls: 'badge bg-success' },
      'Rejected': { label: this.i18n.t('common.rejected'), cls: 'badge bg-danger' },
      'Open': { label: this.i18n.t('job_requisitions.status_open'), cls: 'badge bg-info' },
      'OnHold': { label: this.i18n.t('common.on_hold'), cls: 'badge bg-warning text-dark' },
      'Filled': { label: this.i18n.t('job_requisitions.status_filled'), cls: 'badge bg-primary' },
      'Cancelled': { label: this.i18n.t('common.cancelled'), cls: 'badge bg-dark' }
    };
    const info = map[s] || { label: s, cls: 'badge bg-light text-dark' };
    return `<span class="${info.cls}">${info.label}</span>`;
  }

  private formatPriority(p: RequisitionPriority): string {
    const map: Record<string, { label: string; cls: string }> = {
      'Low': { label: this.i18n.t('job_requisitions.priority_low'), cls: 'badge bg-secondary' },
      'Medium': { label: this.i18n.t('job_requisitions.priority_medium'), cls: 'badge bg-info' },
      'High': { label: this.i18n.t('job_requisitions.priority_high'), cls: 'badge bg-warning text-dark' },
      'Urgent': { label: this.i18n.t('job_requisitions.priority_urgent'), cls: 'badge bg-danger' }
    };
    const info = map[p] || { label: p, cls: 'badge bg-light text-dark' };
    return `<span class="${info.cls}">${info.label}</span>`;
  }
}
