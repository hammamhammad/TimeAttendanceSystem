import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { SurveyService } from '../../../core/services/survey.service';
import { SurveyDistributionDto, SurveyParticipantDto } from '../../../shared/models/survey.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-view-distribution',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent, DataTableComponent],
  templateUrl: './view-distribution.component.html',
  styleUrl: './view-distribution.component.css'
})
export class ViewDistributionComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(SurveyService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  loading = signal(false);
  processing = signal(false);
  distribution = signal<SurveyDistributionDto | null>(null);
  participants = signal<SurveyParticipantDto[]>([]);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.distribution();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      Draft: { label: this.i18n.t('surveys.status_Draft'), variant: 'secondary' },
      Scheduled: { label: this.i18n.t('surveys.status_Scheduled'), variant: 'info' },
      Active: { label: this.i18n.t('surveys.status_Active'), variant: 'success' },
      Closed: { label: this.i18n.t('surveys.status_Closed'), variant: 'dark' },
      Cancelled: { label: this.i18n.t('surveys.status_Cancelled'), variant: 'danger' }
    };
    return map[d.status] ?? { label: d.status, variant: 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const d = this.distribution();
    if (!d) return [];
    return [
      { label: this.i18n.t('surveys.dist_title'), value: d.title },
      { label: this.i18n.t('surveys.dist_title_ar'), value: d.titleAr ?? '-' },
      { label: this.i18n.t('surveys.template'), value: d.templateName },
      { label: this.i18n.t('surveys.type'), value: this.i18n.t('surveys.type_' + d.surveyType) },
      { label: this.i18n.t('surveys.target_audience'), value: this.i18n.t('surveys.target_' + d.targetAudience) },
      { label: this.i18n.t('surveys.target_names'), value: d.targetNames?.join(', ') || '-' },
      { label: this.i18n.t('surveys.anonymous'), value: d.isAnonymous ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('surveys.start_date'), value: d.startDate ? new Date(d.startDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('surveys.end_date'), value: d.endDate ? new Date(d.endDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('surveys.total_participants'), value: String(d.totalParticipants) },
      { label: this.i18n.t('surveys.completed_count'), value: String(d.completedCount) },
      { label: this.i18n.t('surveys.completion_rate'), value: d.completionRate + '%' },
      { label: this.i18n.t('surveys.created_by'), value: d.createdByName },
      { label: this.i18n.t('common.created_date'), value: d.createdAtUtc ? new Date(d.createdAtUtc).toLocaleString() : '-' }
    ];
  });

  participantColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('common.employee'), sortable: true, priority: 'high' },
    { key: 'employeeNumber', label: this.i18n.t('employees.employee_number'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' },
    { key: 'completedAtUtc', label: this.i18n.t('surveys.completed_at'), sortable: true, priority: 'medium' }
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/surveys/distributions']); return; }
    this.loadDistribution(+id);
  }

  loadDistribution(id: number): void {
    this.loading.set(true);
    this.service.getDistribution(id).subscribe({
      next: (d) => { this.distribution.set(d); this.loading.set(false); this.loadParticipants(id); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  loadParticipants(id: number): void {
    this.service.getParticipants(id, { pageSize: 100 }).subscribe({
      next: (res) => this.participants.set(res.data),
      error: () => {}
    });
  }

  async activateDistribution(): Promise<void> {
    const d = this.distribution();
    if (!d) return;
    const result = await this.confirmation.confirm({ title: this.i18n.t('surveys.activate'), message: this.i18n.t('surveys.confirm_activate'), confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-success' });
    if (!result.confirmed) return;
    this.processing.set(true);
    this.service.activateDistribution(d.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('surveys.activated')); this.loadDistribution(d.id); this.processing.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.processing.set(false); }
    });
  }

  async closeDistribution(): Promise<void> {
    const d = this.distribution();
    if (!d) return;
    const result = await this.confirmation.confirm({ title: this.i18n.t('surveys.close'), message: this.i18n.t('surveys.confirm_close'), confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-warning' });
    if (!result.confirmed) return;
    this.processing.set(true);
    this.service.closeDistribution(d.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('surveys.closed')); this.loadDistribution(d.id); this.processing.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.processing.set(false); }
    });
  }

  editDistribution(): void {
    const d = this.distribution();
    if (d) this.router.navigate(['/surveys/distributions', d.id, 'edit']);
  }

  viewResults(): void {
    const d = this.distribution();
    if (d) this.router.navigate(['/surveys/distributions', d.id, 'results']);
  }

  getParticipantStatusBadgeClass(status: string): string {
    const map: Record<string, string> = { Pending: 'bg-warning', Started: 'bg-info', Completed: 'bg-success', Expired: 'bg-secondary' };
    return 'badge ' + (map[status] ?? 'bg-secondary');
  }
}
