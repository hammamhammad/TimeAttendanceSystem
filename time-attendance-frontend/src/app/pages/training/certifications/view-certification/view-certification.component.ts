import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { TrainingService } from '../../../../core/services/training.service';
import { EmployeeCertificationDto } from '../../../../shared/models/training.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-certification',
  standalone: true,
  imports: [CommonModule, RouterModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-certification.component.html',
  styleUrl: './view-certification.component.css'
})
export class ViewCertificationComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(TrainingService);
  private readonly notification = inject(NotificationService);

  loading = signal(false);
  cert = signal<EmployeeCertificationDto | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const c = this.cert();
    if (!c) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      Active: { label: this.i18n.t('certifications.status_Active'), variant: 'success' },
      Expired: { label: this.i18n.t('certifications.status_Expired'), variant: 'danger' },
      Revoked: { label: this.i18n.t('certifications.status_Revoked'), variant: 'warning' },
      Pending: { label: this.i18n.t('certifications.status_Pending'), variant: 'secondary' }
    };
    return map[c.status] ?? { label: c.status, variant: 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const c = this.cert();
    if (!c) return [];
    return [
      { label: this.i18n.t('certifications.employee'), value: c.employeeName ?? '-' },
      { label: this.i18n.t('certifications.employee_number'), value: c.employeeNumber ?? '-' },
      { label: this.i18n.t('certifications.name'), value: c.certificationName },
      { label: this.i18n.t('certifications.name_ar'), value: c.certificationNameAr ?? '-' },
      { label: this.i18n.t('certifications.issuing_org'), value: c.issuingOrganization },
      { label: this.i18n.t('certifications.credential_id'), value: c.credentialId ?? '-' },
      { label: this.i18n.t('certifications.issue_date'), value: c.issueDate },
      { label: this.i18n.t('certifications.expiry_date'), value: c.expiryDate ?? '-' },
      { label: this.i18n.t('certifications.related_course'), value: c.courseName ?? '-' },
      { label: this.i18n.t('certifications.related_session'), value: c.sessionTitle ?? '-' },
      { label: this.i18n.t('common.notes'), value: c.notes ?? '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/training/certifications']); return; }
    this.loading.set(true);
    this.service.getCertification(+id).subscribe({
      next: (c) => { this.cert.set(c); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }
}
