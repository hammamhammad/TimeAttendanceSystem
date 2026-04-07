import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { DocumentService } from '../../../../core/services/document.service';
import { CompanyPolicyDto } from '../../../../shared/models/document.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-policy',
  standalone: true,
  imports: [FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-policy.component.html',
  styleUrl: './view-policy.component.css'
})
export class ViewPolicyComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(DocumentService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  loading = signal(false);
  processing = signal(false);
  policy = signal<CompanyPolicyDto | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const p = this.policy();
    if (!p) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      Draft: { label: this.i18n.t('company_policies.status_Draft'), variant: 'secondary' },
      Published: { label: this.i18n.t('company_policies.status_Published'), variant: 'success' },
      Archived: { label: this.i18n.t('company_policies.status_Archived'), variant: 'warning' }
    };
    return map[p.status] ?? { label: p.status, variant: 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const p = this.policy();
    if (!p) return [];
    return [
      { label: this.i18n.t('company_policies.title_field'), value: p.title },
      { label: this.i18n.t('company_policies.category'), value: p.categoryName ?? '-' },
      { label: this.i18n.t('company_policies.version'), value: p.version },
      { label: this.i18n.t('company_policies.effective_date'), value: p.effectiveDate ? new Date(p.effectiveDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('company_policies.expiry_date'), value: p.expiryDate ? new Date(p.expiryDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('company_policies.acknowledgment_required'), value: p.requiresAcknowledgment ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('company_policies.acknowledged'), value: `${p.acknowledgmentCount} / ${p.totalEmployees}` },
      { label: this.i18n.t('company_policies.created_by'), value: p.createdByName },
      { label: this.i18n.t('common.description'), value: p.description ?? '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/documents/company-policies']); return; }
    this.loading.set(true);
    this.service.getPolicy(+id).subscribe({
      next: (p) => { this.policy.set(p); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  async publishPolicy(): Promise<void> {
    const p = this.policy();
    if (!p) return;
    const result = await this.confirmation.confirm({ title: this.i18n.t('company_policies.publish'), message: this.i18n.t('company_policies.confirm_publish'), confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-success' });
    if (!result.confirmed) return;
    this.processing.set(true);
    this.service.publishPolicy(p.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('company_policies.published')); this.ngOnInit(); this.processing.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.processing.set(false); }
    });
  }

  async archivePolicy(): Promise<void> {
    const p = this.policy();
    if (!p) return;
    const result = await this.confirmation.confirm({ title: this.i18n.t('company_policies.archive'), message: this.i18n.t('company_policies.confirm_archive'), confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-warning' });
    if (!result.confirmed) return;
    this.processing.set(true);
    this.service.archivePolicy(p.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('company_policies.archived')); this.ngOnInit(); this.processing.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.processing.set(false); }
    });
  }
}
