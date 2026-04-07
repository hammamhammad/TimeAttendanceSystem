import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { TimesheetService } from '../../../../core/services/timesheet.service';
import { TimesheetPeriodDto, TimesheetListDto } from '../../../../shared/models/timesheet.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-view-period',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent,
    DefinitionListComponent, AuditHistoryComponent, SectionCardComponent, DataTableComponent],
  templateUrl: './view-period.component.html',
  styleUrl: './view-period.component.css'
})
export class ViewPeriodComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly service = inject(TimesheetService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  loading = signal(false);
  period = signal<TimesheetPeriodDto | null>(null);
  error = signal<string | null>(null);
  timesheets = signal<TimesheetListDto[]>([]);
  tsLoading = signal(false);

  statusBadge = computed(() => {
    const p = this.period();
    if (!p) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { Open: 'success', Closed: 'warning', Locked: 'secondary' };
    return { label: this.i18n.t(`timesheets.periods.status_${p.status.toLowerCase()}`), variant: map[p.status] || 'secondary' };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const p = this.period();
    if (!p) return [];
    return [
      { label: this.i18n.t('timesheets.periods.name'), value: p.name },
      { label: this.i18n.t('timesheets.periods.branch'), value: p.branchName },
      { label: this.i18n.t('timesheets.periods.period_type'), value: this.i18n.t(`timesheets.periods.type_${p.periodType.toLowerCase()}`) },
      { label: this.i18n.t('timesheets.periods.start_date'), value: new Date(p.startDate).toLocaleDateString() },
      { label: this.i18n.t('timesheets.periods.end_date'), value: new Date(p.endDate).toLocaleDateString() },
      { label: this.i18n.t('timesheets.periods.submission_deadline'), value: new Date(p.submissionDeadline).toLocaleDateString() },
      { label: this.i18n.t('timesheets.periods.timesheet_count'), value: p.timesheetCount.toString() },
      { label: this.i18n.t('timesheets.periods.submitted_count'), value: (p.submittedCount ?? 0).toString() },
      { label: this.i18n.t('timesheets.periods.approved_count'), value: (p.approvedCount ?? 0).toString() }
    ];
  });

  tsColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('timesheets.timesheets.employee'), sortable: true, priority: 'high' },
    { key: 'employeeNumber', label: this.i18n.t('timesheets.timesheets.employee_number'), sortable: true, priority: 'medium' },
    { key: 'totalHours', label: this.i18n.t('timesheets.timesheets.total_hours'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  tsActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' }
  ]);

  tsTableData = computed(() => this.timesheets().map(t => ({
    ...t,
    status: this.getTsStatusBadge(t.status)
  })));

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/timesheets/periods']); return; }
    this.loadPeriod(+id);
    this.loadTimesheets(+id);
  }

  private loadPeriod(id: number): void {
    this.loading.set(true);
    this.service.getTimesheetPeriod(id).subscribe({
      next: (p) => { this.period.set(p); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  private loadTimesheets(periodId: number): void {
    this.tsLoading.set(true);
    this.service.getTimesheets({ timesheetPeriodId: periodId, pageSize: 100 }).subscribe({
      next: (res) => { this.timesheets.set(res.data); this.tsLoading.set(false); },
      error: () => { this.tsLoading.set(false); }
    });
  }

  onTsAction(event: { action: string; item: any }): void {
    if (event.action === 'view') this.router.navigate(['/timesheets/timesheets', event.item.id, 'view']);
  }

  async closePeriod(): Promise<void> {
    const result = await this.confirmation.confirm({ title: this.i18n.t('timesheets.periods.close_confirm_title'), message: this.i18n.t('timesheets.periods.close_confirm_message'), confirmText: this.i18n.t('timesheets.periods.close'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-warning' });
    if (!result.confirmed) return;
    this.service.closeTimesheetPeriod(this.period()!.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('timesheets.periods.closed')); this.loadPeriod(this.period()!.id); },
      error: (err) => this.notification.error(err?.error?.error || this.i18n.t('common.error'))
    });
  }

  async lockPeriod(): Promise<void> {
    const result = await this.confirmation.confirm({ title: this.i18n.t('timesheets.periods.lock_confirm_title'), message: this.i18n.t('timesheets.periods.lock_confirm_message'), confirmText: this.i18n.t('timesheets.periods.lock'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger' });
    if (!result.confirmed) return;
    this.service.lockTimesheetPeriod(this.period()!.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('timesheets.periods.locked')); this.loadPeriod(this.period()!.id); },
      error: (err) => this.notification.error(err?.error?.error || this.i18n.t('common.error'))
    });
  }

  private getTsStatusBadge(status: string): string {
    const map: Record<string, string> = { Draft: 'secondary', Submitted: 'primary', Approved: 'success', Rejected: 'danger', Recalled: 'warning' };
    return `<span class="badge bg-${map[status] || 'secondary'}">${this.i18n.t(`timesheets.timesheets.status_${status.toLowerCase()}`)}</span>`;
  }
}
