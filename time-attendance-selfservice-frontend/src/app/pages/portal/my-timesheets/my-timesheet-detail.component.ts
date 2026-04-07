import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-my-timesheet-detail',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, DataTableComponent],
  templateUrl: './my-timesheet-detail.component.html',
  styleUrl: './my-timesheet-detail.component.css'
})
export class MyTimesheetDetailComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  loading = signal(false);
  timesheet = signal<any>(null);
  error = signal<string | null>(null);
  actionLoading = signal(false);

  statusBadge = computed(() => {
    const t = this.timesheet();
    if (!t) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { Draft: 'secondary', Submitted: 'primary', Approved: 'success', Rejected: 'danger', Recalled: 'warning' };
    return { label: this.i18n.t(`portal.timesheets.status_${t.status.toLowerCase()}`), variant: map[t.status] || 'secondary' };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const t = this.timesheet();
    if (!t) return [];
    return [
      { label: this.i18n.t('portal.timesheets.period'), value: t.periodName },
      { label: this.i18n.t('portal.timesheets.date_range'), value: `${new Date(t.periodStartDate).toLocaleDateString()} - ${new Date(t.periodEndDate).toLocaleDateString()}` },
      { label: this.i18n.t('portal.timesheets.total_hours'), value: t.totalHours.toString() },
      { label: this.i18n.t('portal.timesheets.regular_hours'), value: t.regularHours.toString() },
      { label: this.i18n.t('portal.timesheets.overtime_hours'), value: t.overtimeHours.toString() },
      { label: this.i18n.t('portal.timesheets.submitted_at'), value: t.submittedAt ? new Date(t.submittedAt).toLocaleString() : '-' },
      { label: this.i18n.t('portal.timesheets.approved_at'), value: t.approvedAt ? new Date(t.approvedAt).toLocaleString() : '-' },
      { label: this.i18n.t('portal.timesheets.notes'), value: t.notes ?? '-' }
    ];
  });

  rejectionItems = computed<DefinitionItem[]>(() => {
    const t = this.timesheet();
    if (!t || !t.rejectedAt) return [];
    return [
      { label: this.i18n.t('portal.timesheets.rejected_at'), value: new Date(t.rejectedAt).toLocaleString() },
      { label: this.i18n.t('portal.timesheets.rejection_reason'), value: t.rejectionReason ?? '-' }
    ];
  });

  entryColumns: TableColumn[] = [
    { key: 'entryDate', label: this.i18n.t('portal.timesheets.date'), sortable: true, priority: 'high' },
    { key: 'projectName', label: this.i18n.t('portal.timesheets.project'), sortable: true, priority: 'high' },
    { key: 'projectTaskName', label: this.i18n.t('portal.timesheets.task'), sortable: true, priority: 'medium' },
    { key: 'hours', label: this.i18n.t('portal.timesheets.hours'), sortable: true, priority: 'high' },
    { key: 'overtimeHours', label: this.i18n.t('portal.timesheets.overtime_hours'), sortable: true, priority: 'medium' }
  ];

  entryTableData = computed(() => {
    const t = this.timesheet();
    if (!t?.entries) return [];
    return t.entries.map((e: any) => ({
      ...e,
      entryDate: new Date(e.entryDate).toLocaleDateString(),
      projectTaskName: e.projectTaskName ?? '-'
    }));
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/my-timesheets']); return; }
    this.loadTimesheet(+id);
  }

  private loadTimesheet(id: number): void {
    this.loading.set(true);
    this.http.get<any>(`${this.baseUrl}/portal/my-timesheets/${id}`).subscribe({
      next: (t) => { this.timesheet.set(t); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  editTimesheet(): void {
    this.router.navigate(['/my-timesheets', this.timesheet()?.id, 'edit']);
  }

  async submitTimesheet(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('portal.timesheets.submit_confirm_title'),
      message: this.i18n.t('portal.timesheets.submit_confirm_message'),
      confirmText: this.i18n.t('common.submit'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-primary'
    });
    if (!result.confirmed) return;
    this.actionLoading.set(true);
    this.http.post(`${this.baseUrl}/portal/my-timesheets/${this.timesheet()!.id}/submit`, {}).subscribe({
      next: () => { this.notification.success(this.i18n.t('portal.timesheets.submitted')); this.loadTimesheet(this.timesheet()!.id); this.actionLoading.set(false); },
      error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.actionLoading.set(false); }
    });
  }

  async recallTimesheet(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('portal.timesheets.recall_confirm_title'),
      message: this.i18n.t('portal.timesheets.recall_confirm_message'),
      confirmText: this.i18n.t('portal.timesheets.recall'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-warning'
    });
    if (!result.confirmed) return;
    this.actionLoading.set(true);
    this.http.post(`${this.baseUrl}/portal/my-timesheets/${this.timesheet()!.id}/recall`, {}).subscribe({
      next: () => { this.notification.success(this.i18n.t('portal.timesheets.recalled')); this.loadTimesheet(this.timesheet()!.id); this.actionLoading.set(false); },
      error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.actionLoading.set(false); }
    });
  }

  canEdit(): boolean { const s = this.timesheet()?.status; return s === 'Draft' || s === 'Rejected' || s === 'Recalled'; }
  canSubmit(): boolean { const s = this.timesheet()?.status; return s === 'Draft' || s === 'Rejected'; }
  canRecall(): boolean { return this.timesheet()?.status === 'Submitted'; }
}
