import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { RecruitmentService } from '../../../../core/services/recruitment.service';
import { JobPosting } from '../../../../shared/models/recruitment.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-posting',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent],
  templateUrl: './view-posting.component.html',
  styleUrls: ['./view-posting.component.css']
})
export class ViewPostingComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private service = inject(RecruitmentService);

  loading = signal(true);
  item = signal<JobPosting | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      'Draft': { label: this.i18n.t('common.draft'), variant: 'secondary' },
      'Active': { label: this.i18n.t('common.active'), variant: 'success' },
      'Published': { label: this.i18n.t('job_postings.status_published'), variant: 'success' },
      'Paused': { label: this.i18n.t('job_postings.status_paused'), variant: 'warning' },
      'Closed': { label: this.i18n.t('job_postings.status_closed'), variant: 'danger' },
      'Expired': { label: this.i18n.t('common.expired'), variant: 'dark' }
    };
    return map[d.status] ?? { label: d.status, variant: 'secondary' as StatusVariant };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('job_postings.title_field'), value: d.postingTitle },
      { label: this.i18n.t('job_postings.requisition'), value: d.jobTitle || d.requisitionNumber || '-' },
      { label: this.i18n.t('job_postings.employment_type'), value: d.employmentType || '-' },
      { label: this.i18n.t('job_postings.location'), value: d.location || '-' },
      { label: this.i18n.t('job_postings.publish_date'), value: d.publishDate || '-' },
      { label: this.i18n.t('job_postings.expiry_date'), value: d.expiryDate || '-' },
      { label: this.i18n.t('job_postings.channel'), value: [d.isInternal ? this.i18n.t('job_postings.internal') : '', !d.isInternal ? this.i18n.t('job_postings.external') : ''].filter(Boolean).join(', ') || '-' },
      { label: this.i18n.t('job_postings.applications'), value: String(d.applicationCount) }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    const actions: FormHeaderAction[] = [];
    if (d.status === 'Draft') {
      actions.push({ label: this.i18n.t('job_postings.publish'), icon: 'fas fa-globe', action: () => this.publish(), type: 'success' });
    }
    if (d.status === 'Published' || d.status === 'Active') {
      actions.push({ label: this.i18n.t('job_postings.close'), icon: 'fas fa-lock', action: () => this.close(), type: 'danger' });
    }
    return actions;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/recruitment/postings']); return; }
    this.service.getPosting(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('job_postings.load_error')); this.loading.set(false); }
    });
  }

  publish(): void {
    this.service.publishPosting(this.item()!.id).subscribe({
      next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('job_postings.published_success')); },
      error: () => this.notification.error(this.i18n.t('job_postings.publish_error'))
    });
  }

  async close(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('job_postings.close'),
      message: this.i18n.t('job_postings.confirm_close'),
      confirmText: this.i18n.t('job_postings.close'),
      confirmButtonClass: 'btn-danger'
    });
    if (!result.confirmed) return;
    this.service.closePosting(this.item()!.id).subscribe({
      next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('job_postings.closed_success')); },
      error: () => this.notification.error(this.i18n.t('job_postings.close_error'))
    });
  }
}
