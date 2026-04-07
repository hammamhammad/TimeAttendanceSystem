import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { SuccessionService } from '../../../../core/services/succession.service';
import { KeyPosition } from '../../../../shared/models/succession.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-key-position',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent],
  templateUrl: './view-key-position.component.html',
  styleUrls: ['./view-key-position.component.css']
})
export class ViewKeyPositionComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private service = inject(SuccessionService);

  loading = signal(true);
  item = signal<KeyPosition | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    return d.isActive
      ? { label: this.i18n.t('common.active'), variant: 'success' as StatusVariant }
      : { label: this.i18n.t('common.inactive'), variant: 'secondary' as StatusVariant };
  });

  criticalityBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { 'Low': 'secondary', 'Medium': 'info', 'High': 'warning', 'Critical': 'danger' };
    return { label: this.i18n.t('succession.enums.' + d.criticalityLevel), variant: map[d.criticalityLevel] || 'secondary' };
  });

  vacancyRiskBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { 'Low': 'success', 'Medium': 'warning', 'High': 'danger', 'Imminent': 'danger' };
    return { label: this.i18n.t('succession.enums.' + d.vacancyRisk), variant: map[d.vacancyRisk] || 'secondary' };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('succession.key_positions.job_title'), value: d.jobTitle },
      { label: this.i18n.t('succession.key_positions.job_title_ar'), value: d.jobTitleAr || '-' },
      { label: this.i18n.t('fields.branch'), value: d.branchName || '-' },
      { label: this.i18n.t('fields.department'), value: d.departmentName || '-' },
      { label: this.i18n.t('succession.key_positions.job_grade'), value: d.jobGradeName || '-' },
      { label: this.i18n.t('succession.key_positions.current_holder'), value: d.currentHolderName || '-' },
      { label: this.i18n.t('succession.key_positions.min_experience_years'), value: d.minExperienceYears != null ? String(d.minExperienceYears) : '-' },
      { label: this.i18n.t('succession.key_positions.succession_plans_count'), value: String(d.successionPlanCount || 0) }
    ];
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('succession.key_positions.impact_of_vacancy'), value: d.impactOfVacancy || '-' },
      { label: this.i18n.t('succession.key_positions.required_competencies'), value: d.requiredCompetencies || '-' },
      { label: this.i18n.t('fields.notes'), value: d.notes || '-' }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('common.edit'), icon: 'fas fa-edit', action: () => this.router.navigate(['/succession/key-positions', d.id, 'edit']), type: 'outline-primary' },
      { label: this.i18n.t('common.delete'), icon: 'fas fa-trash', action: () => this.delete(), type: 'danger' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/succession/key-positions']); return; }
    this.service.getKeyPosition(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('succession.key_positions.load_error')); this.loading.set(false); }
    });
  }

  async delete(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('common.delete'),
      message: this.i18n.t('succession.key_positions.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      confirmButtonClass: 'btn-danger'
    });
    if (!result.confirmed) return;
    this.service.deleteKeyPosition(this.item()!.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('succession.key_positions.deleted_success')); this.router.navigate(['/succession/key-positions']); },
      error: (err) => this.notification.error(err?.error?.error || this.i18n.t('succession.key_positions.delete_error'))
    });
  }
}
