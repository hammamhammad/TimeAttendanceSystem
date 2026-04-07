import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { TimesheetService } from '../../../../core/services/timesheet.service';
import { TimesheetDetailDto } from '../../../../shared/models/timesheet.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DataTableComponent, TableColumn } from '../../../../shared/components/data-table/data-table.component';
import { ModalWrapperComponent } from '../../../../shared/components/modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'app-view-timesheet',
  standalone: true,
  imports: [CommonModule, FormsModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent,
    DefinitionListComponent, AuditHistoryComponent, SectionCardComponent, DataTableComponent, ModalWrapperComponent],
  templateUrl: './view-timesheet.component.html',
  styleUrl: './view-timesheet.component.css'
})
export class ViewTimesheetComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly service = inject(TimesheetService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  loading = signal(false);
  timesheet = signal<TimesheetDetailDto | null>(null);
  error = signal<string | null>(null);
  showRejectModal = signal(false);
  rejectReason = signal('');
  actionLoading = signal(false);

  statusBadge = computed(() => {
    const t = this.timesheet();
    if (!t) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { Draft: 'secondary', Submitted: 'primary', Approved: 'success', Rejected: 'danger', Recalled: 'warning' };
    return { label: this.i18n.t(`timesheets.timesheets.status_${t.status.toLowerCase()}`), variant: map[t.status] || 'secondary' };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const t = this.timesheet();
    if (!t) return [];
    return [
      { label: this.i18n.t('timesheets.timesheets.employee'), value: t.employeeName },
      { label: this.i18n.t('timesheets.timesheets.employee_number'), value: t.employeeNumber },
      { label: this.i18n.t('timesheets.timesheets.period'), value: t.periodName },
      { label: this.i18n.t('timesheets.periods.start_date'), value: new Date(t.periodStartDate).toLocaleDateString() },
      { label: this.i18n.t('timesheets.periods.end_date'), value: new Date(t.periodEndDate).toLocaleDateString() },
      { label: this.i18n.t('timesheets.timesheets.total_hours'), value: t.totalHours.toString() },
      { label: this.i18n.t('timesheets.timesheets.regular_hours'), value: t.regularHours.toString() },
      { label: this.i18n.t('timesheets.timesheets.overtime_hours'), value: t.overtimeHours.toString() },
      { label: this.i18n.t('timesheets.timesheets.submitted_at'), value: t.submittedAt ? new Date(t.submittedAt).toLocaleString() : '-' },
      { label: this.i18n.t('timesheets.timesheets.approved_at'), value: t.approvedAt ? new Date(t.approvedAt).toLocaleString() : '-' },
      { label: this.i18n.t('timesheets.timesheets.notes'), value: t.notes ?? '-' }
    ];
  });

  rejectionItems = computed<DefinitionItem[]>(() => {
    const t = this.timesheet();
    if (!t || !t.rejectedAt) return [];
    return [
      { label: this.i18n.t('timesheets.timesheets.rejected_at'), value: new Date(t.rejectedAt).toLocaleString() },
      { label: this.i18n.t('timesheets.timesheets.rejection_reason'), value: t.rejectionReason ?? '-' }
    ];
  });

  entryColumns: TableColumn[] = [
    { key: 'entryDate', label: this.i18n.t('timesheets.entries.date'), sortable: true, priority: 'high' },
    { key: 'projectName', label: this.i18n.t('timesheets.entries.project'), sortable: true, priority: 'high' },
    { key: 'projectTaskName', label: this.i18n.t('timesheets.entries.task'), sortable: true, priority: 'medium' },
    { key: 'hours', label: this.i18n.t('timesheets.entries.hours'), sortable: true, priority: 'high' },
    { key: 'overtimeHours', label: this.i18n.t('timesheets.entries.overtime'), sortable: true, priority: 'medium' },
    { key: 'isAutoPopulated', label: this.i18n.t('timesheets.entries.auto_populated'), sortable: true, priority: 'low', renderHtml: true },
    { key: 'notes', label: this.i18n.t('timesheets.entries.notes'), sortable: false, priority: 'low' }
  ];

  entryTableData = computed(() => {
    const t = this.timesheet();
    if (!t) return [];
    return t.entries.map(e => ({
      ...e,
      entryDate: new Date(e.entryDate).toLocaleDateString(),
      projectTaskName: e.projectTaskName ?? '-',
      notes: e.notes ?? '-',
      isAutoPopulated: e.isAutoPopulated
        ? `<span class="badge bg-info">${this.i18n.t('common.yes')}</span>`
        : `<span class="badge bg-secondary">${this.i18n.t('common.no')}</span>`
    }));
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/timesheets/timesheets']); return; }
    this.loadTimesheet(+id);
  }

  private loadTimesheet(id: number): void {
    this.loading.set(true);
    this.service.getTimesheet(id).subscribe({
      next: (t) => { this.timesheet.set(t); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  async approveTimesheet(): Promise<void> {
    const result = await this.confirmation.confirm({ title: this.i18n.t('timesheets.timesheets.approve_confirm_title'), message: this.i18n.t('timesheets.timesheets.approve_confirm_message'), confirmText: this.i18n.t('timesheets.timesheets.approve'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-success' });
    if (!result.confirmed) return;
    this.actionLoading.set(true);
    this.service.approveTimesheet(this.timesheet()!.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('timesheets.timesheets.approved')); this.loadTimesheet(this.timesheet()!.id); this.actionLoading.set(false); },
      error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.actionLoading.set(false); }
    });
  }

  openRejectModal(): void {
    this.rejectReason.set('');
    this.showRejectModal.set(true);
  }

  rejectTimesheet(): void {
    if (!this.rejectReason()) return;
    this.actionLoading.set(true);
    this.service.rejectTimesheet(this.timesheet()!.id, { reason: this.rejectReason() }).subscribe({
      next: () => { this.notification.success(this.i18n.t('timesheets.timesheets.rejected')); this.showRejectModal.set(false); this.loadTimesheet(this.timesheet()!.id); this.actionLoading.set(false); },
      error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.actionLoading.set(false); }
    });
  }
}
