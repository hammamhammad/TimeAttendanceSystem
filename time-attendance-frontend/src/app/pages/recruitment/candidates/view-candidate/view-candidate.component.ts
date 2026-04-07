import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { RecruitmentService } from '../../../../core/services/recruitment.service';
import { Candidate } from '../../../../shared/models/recruitment.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { FileUploadComponent, FileUploadedEvent } from '../../../../shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-view-candidate',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent, FileUploadComponent],
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css']
})
export class ViewCandidateComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private service = inject(RecruitmentService);

  loading = signal(true);
  item = signal<Candidate | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      'Active': { label: this.i18n.t('common.active'), variant: 'success' },
      'Hired': { label: this.i18n.t('candidates.status_hired'), variant: 'primary' },
      'Blacklisted': { label: this.i18n.t('candidates.status_blacklisted'), variant: 'danger' },
      'Inactive': { label: this.i18n.t('common.inactive'), variant: 'secondary' }
    };
    return map[d.status || ''] ?? { label: d.status || '', variant: 'secondary' as StatusVariant };
  });

  personalItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('candidates.name'), value: d.fullName || `${d.firstName} ${d.lastName}` },
      { label: this.i18n.t('candidates.email'), value: d.email },
      { label: this.i18n.t('candidates.phone'), value: d.phone || '-' },
      { label: this.i18n.t('candidates.source'), value: d.source },
      { label: this.i18n.t('candidates.current_title'), value: d.currentJobTitle || '-' },
      { label: this.i18n.t('candidates.current_company'), value: d.currentCompany || '-' },
      { label: this.i18n.t('candidates.experience'), value: d.yearsOfExperience != null ? `${d.yearsOfExperience} ${this.i18n.t('candidates.years')}` : '-' },
      { label: this.i18n.t('candidates.applications'), value: String(d.applicationCount || 0) }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/recruitment/candidates']); return; }
    this.service.getCandidate(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('candidates.load_error')); this.loading.set(false); }
    });
  }

  onResumeUploaded(event: FileUploadedEvent): void {
    const current = this.item();
    if (current) {
      this.item.set({ ...current, resumeUrl: event.fileUrl });
    }
  }
}
