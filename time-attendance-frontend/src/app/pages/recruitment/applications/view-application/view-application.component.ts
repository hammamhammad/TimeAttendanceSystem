import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { RecruitmentService } from '../../../../core/services/recruitment.service';
import { JobApplication } from '../../../../shared/models/recruitment.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { FileUploadComponent, FileUploadedEvent } from '../../../../shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-view-application',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent, FileUploadComponent],
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.css']
})
export class ViewApplicationComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private service = inject(RecruitmentService);

  loading = signal(true);
  item = signal<JobApplication | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      'Applied': { label: this.i18n.t('job_applications.status_applied'), variant: 'secondary' },
      'New': { label: this.i18n.t('job_applications.status_applied'), variant: 'secondary' },
      'Screening': { label: this.i18n.t('job_applications.status_screening'), variant: 'info' },
      'InterviewScheduled': { label: this.i18n.t('job_applications.status_interview'), variant: 'warning' },
      'Interviewing': { label: this.i18n.t('job_applications.status_interview'), variant: 'warning' },
      'Interview': { label: this.i18n.t('job_applications.status_interview'), variant: 'warning' },
      'Assessment': { label: this.i18n.t('job_applications.status_assessment'), variant: 'primary' },
      'OfferPending': { label: this.i18n.t('job_applications.status_offered'), variant: 'success' },
      'OfferExtended': { label: this.i18n.t('job_applications.status_offered'), variant: 'success' },
      'Offered': { label: this.i18n.t('job_applications.status_offered'), variant: 'success' },
      'Hired': { label: this.i18n.t('job_applications.status_hired'), variant: 'success' },
      'Rejected': { label: this.i18n.t('common.rejected'), variant: 'danger' },
      'Withdrawn': { label: this.i18n.t('job_applications.status_withdrawn'), variant: 'dark' }
    };
    return map[d.status] ?? { label: d.status, variant: 'secondary' as StatusVariant };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    const items: DefinitionItem[] = [
      { label: this.i18n.t('job_applications.candidate'), value: d.candidateName || '-' },
      { label: this.i18n.t('job_applications.email'), value: d.candidateEmail || '-' },
      { label: this.i18n.t('job_applications.posting'), value: d.postingTitle || '-' },
      { label: this.i18n.t('job_applications.applied_date'), value: d.appliedDate ? new Date(d.appliedDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('job_applications.stage'), value: d.currentStage || '-' },
      { label: this.i18n.t('job_applications.rating'), value: d.rating != null ? String(d.rating) : '-' }
    ];
    if (d.rejectionReason) {
      items.push({ label: this.i18n.t('job_applications.rejection_reason'), value: d.rejectionReason });
    }
    return items;
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d || d.status === 'Hired' || d.status === 'Rejected' || d.status === 'Withdrawn') return [];
    return [
      { label: this.i18n.t('job_applications.advance'), icon: 'fas fa-arrow-right', action: () => this.advance(), type: 'primary' },
      { label: this.i18n.t('common.reject'), icon: 'fas fa-times', action: () => this.reject(), type: 'danger' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/recruitment/applications']); return; }
    this.service.getApplication(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('job_applications.load_error')); this.loading.set(false); }
    });
  }

  advance(): void {
    const nextStatus: Record<string, string> = {
      'New': 'Screening', 'Applied': 'Screening', 'Screening': 'InterviewScheduled',
      'InterviewScheduled': 'Assessment', 'Interviewing': 'Assessment', 'Interview': 'Assessment',
      'Assessment': 'OfferPending', 'OfferPending': 'Hired', 'OfferExtended': 'Hired', 'Offered': 'Hired'
    };
    const next = nextStatus[this.item()!.status];
    if (!next) return;
    this.service.advanceApplication(this.item()!.id, { newStatus: next as any }).subscribe({
      next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('job_applications.advanced_success')); },
      error: () => this.notification.error(this.i18n.t('job_applications.advance_error'))
    });
  }

  async reject(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('common.reject'),
      message: this.i18n.t('job_applications.reject_reason_prompt'),
      confirmText: this.i18n.t('common.reject'),
      confirmButtonClass: 'btn-danger',
      requireComments: true
    });
    if (!result.confirmed) return;
    const reason = result.comments || '';
    this.service.rejectApplication(this.item()!.id, reason).subscribe({
      next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('job_applications.rejected_success')); },
      error: () => this.notification.error(this.i18n.t('job_applications.reject_error'))
    });
  }

  onCoverLetterUploaded(event: FileUploadedEvent): void {
    this.notification.success(this.i18n.t('files.upload'));
  }
}
