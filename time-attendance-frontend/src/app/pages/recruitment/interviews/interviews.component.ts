import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { RecruitmentService } from '../../../core/services/recruitment.service';
import { InterviewSchedule } from '../../../shared/models/recruitment.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-interviews',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(RecruitmentService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  items = signal<InterviewSchedule[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(item => ({
    ...item,
    _typeDisplay: this.i18n.t('interviews.type_' + item.interviewType),
    _dateDisplay: item.scheduledDate ? new Date(item.scheduledDate).toLocaleDateString() + ' ' + new Date(item.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-',
    _resultDisplay: this.formatResult(item.result)
  })));

  tableColumns: TableColumn[] = [
    { key: 'candidateName', label: this.i18n.t('interviews.candidate'), sortable: true, width: '17%' },
    { key: 'postingTitle', label: this.i18n.t('interviews.posting'), sortable: true, width: '17%' },
    { key: 'interviewerName', label: this.i18n.t('interviews.interviewer'), sortable: true, width: '15%' },
    { key: '_typeDisplay', label: this.i18n.t('interviews.type'), sortable: true, width: '11%' },
    { key: '_dateDisplay', label: this.i18n.t('interviews.scheduled_date'), sortable: true, width: '16%' },
    { key: '_resultDisplay', label: this.i18n.t('interviews.result'), sortable: true, width: '12%', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'cancel', label: this.i18n.t('interviews.cancel'), icon: 'fa-times-circle', color: 'danger',
      condition: (item: any) => item.result === 'Pending' || item.result === 'Rescheduled' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getInterviews({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('interviews.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: InterviewSchedule }): void {
    if (event.action === 'view') {
      this.router.navigate(['/recruitment/interviews', event.item.id, 'view']);
    } else if (event.action === 'cancel') {
      this.cancelInterview(event.item);
    }
  }

  async cancelInterview(item: InterviewSchedule): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('interviews.cancel'),
      message: this.i18n.t('interviews.confirm_cancel'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-times-circle',
      iconClass: 'text-danger',
      requireComments: true
    });
    if (result.confirmed) {
      this.service.cancelInterview(item.id, result.comments || '').subscribe({
        next: () => { this.notification.success(this.i18n.t('interviews.cancelled_success')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('interviews.cancel_error'))
      });
    }
  }

  navigateToCreate(): void { this.router.navigate(['/recruitment/interviews/create']); }
  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, search: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }

  private formatResult(r: string): string {
    const map: Record<string, string> = { 'Pending': 'warning', 'Passed': 'success', 'Failed': 'danger', 'OnHold': 'info', 'NoShow': 'dark', 'Rescheduled': 'secondary' };
    return `<span class="badge bg-${map[r] || 'secondary'}">${this.i18n.t('interviews.result_' + r)}</span>`;
  }
}
