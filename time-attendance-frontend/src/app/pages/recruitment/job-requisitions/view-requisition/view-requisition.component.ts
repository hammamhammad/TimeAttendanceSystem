import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { RecruitmentService } from '../../../../core/services/recruitment.service';
import { JobRequisition } from '../../../../shared/models/recruitment.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-requisition',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent],
  templateUrl: './view-requisition.component.html',
  styleUrls: ['./view-requisition.component.css']
})
export class ViewRequisitionComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private service = inject(RecruitmentService);

  loading = signal(true);
  item = signal<JobRequisition | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      'Draft': { label: this.i18n.t('common.draft'), variant: 'secondary' },
      'PendingApproval': { label: this.i18n.t('common.pending_approval'), variant: 'warning' },
      'Approved': { label: this.i18n.t('common.approved'), variant: 'success' },
      'Rejected': { label: this.i18n.t('common.rejected'), variant: 'danger' },
      'Open': { label: this.i18n.t('job_requisitions.status_open'), variant: 'info' },
      'Filled': { label: this.i18n.t('job_requisitions.status_filled'), variant: 'primary' },
      'Cancelled': { label: this.i18n.t('common.cancelled'), variant: 'dark' }
    };
    return map[d.status] ?? { label: d.status, variant: 'secondary' as StatusVariant };
  });

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('job_requisitions.number'), value: d.requisitionNumber },
      { label: this.i18n.t('job_requisitions.title_field'), value: d.jobTitle },
      { label: this.i18n.t('fields.department'), value: d.departmentName || '-' },
      { label: this.i18n.t('fields.branch'), value: d.branchName || '-' },
      { label: this.i18n.t('job_requisitions.employment_type'), value: d.employmentType },
      { label: this.i18n.t('job_requisitions.positions_count'), value: String(d.numberOfPositions) },
      { label: this.i18n.t('job_requisitions.filled_positions'), value: `${d.filledPositions}/${d.numberOfPositions}` },
      { label: this.i18n.t('job_requisitions.requested_by'), value: d.requestedByEmployeeName || '-' },
      { label: this.i18n.t('job_requisitions.target_date'), value: d.targetHireDate || '-' }
    ];
  });

  salaryItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('job_requisitions.min_salary'), value: d.budgetedSalaryMin ? `${d.budgetedSalaryMin} ${d.currency}` : '-' },
      { label: this.i18n.t('job_requisitions.max_salary'), value: d.budgetedSalaryMax ? `${d.budgetedSalaryMax} ${d.currency}` : '-' }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    const actions: FormHeaderAction[] = [];
    if (d.status === 'PendingApproval') {
      actions.push({ label: this.i18n.t('common.approve'), icon: 'fas fa-check', action: () => this.approve(), type: 'success' });
      actions.push({ label: this.i18n.t('common.reject'), icon: 'fas fa-times', action: () => this.reject(), type: 'danger' });
    }
    return actions;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/recruitment/requisitions']); return; }
    this.load(+id);
  }

  private load(id: number): void {
    this.loading.set(true);
    this.service.getRequisition(id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('job_requisitions.load_error')); this.loading.set(false); }
    });
  }

  approve(): void {
    this.confirmation.confirm({ title: this.i18n.t('common.approve'), message: this.i18n.t('job_requisitions.confirm_approve'), confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel') }).then(r => {
      if (!r.confirmed) return;
      this.service.approveRequisition(this.item()!.id).subscribe({
        next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('job_requisitions.approved_success')); },
        error: () => this.notification.error(this.i18n.t('job_requisitions.approve_error'))
      });
    });
  }

  reject(): void {
    this.confirmation.confirm({ title: this.i18n.t('common.reject'), message: this.i18n.t('job_requisitions.confirm_reject'), confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel'), requireComments: true }).then(r => {
      if (!r.confirmed) return;
      this.service.rejectRequisition(this.item()!.id, r.comments || '').subscribe({
        next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('job_requisitions.rejected_success')); },
        error: () => this.notification.error(this.i18n.t('job_requisitions.reject_error'))
      });
    });
  }
}
