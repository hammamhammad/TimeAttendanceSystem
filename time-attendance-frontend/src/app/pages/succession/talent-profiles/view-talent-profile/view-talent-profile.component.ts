import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { SuccessionService } from '../../../../core/services/succession.service';
import { TalentProfile } from '../../../../shared/models/succession.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-talent-profile',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent],
  templateUrl: './view-talent-profile.component.html',
  styleUrls: ['./view-talent-profile.component.css']
})
export class ViewTalentProfileComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private service = inject(SuccessionService);

  loading = signal(true);
  item = signal<TalentProfile | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    return d.isActive
      ? { label: this.i18n.t('common.active'), variant: 'success' as StatusVariant }
      : { label: this.i18n.t('common.inactive'), variant: 'secondary' as StatusVariant };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('succession.talent_profiles.employee'), value: d.employeeName || '-' },
      { label: this.i18n.t('employees.employee_number'), value: d.employeeNumber || '-' },
      { label: this.i18n.t('fields.department'), value: d.departmentName || '-' },
      { label: this.i18n.t('fields.branch'), value: d.branchName || '-' },
      { label: this.i18n.t('succession.talent_profiles.performance_rating'), value: d.performanceRating ? this.i18n.t('succession.enums.' + d.performanceRating) : '-' },
      { label: this.i18n.t('succession.talent_profiles.potential_rating'), value: this.i18n.t('succession.enums.' + d.potentialRating) },
      { label: this.i18n.t('succession.talent_profiles.nine_box'), value: this.i18n.t('succession.enums.' + d.nineBoxPosition) },
      { label: this.i18n.t('succession.talent_profiles.readiness'), value: this.i18n.t('succession.enums.' + d.readinessLevel) },
      { label: this.i18n.t('succession.talent_profiles.retention_risk'), value: this.i18n.t('succession.enums.' + d.retentionRisk) },
      { label: this.i18n.t('succession.talent_profiles.high_potential'), value: d.isHighPotential ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('succession.talent_profiles.last_assessment_date'), value: d.lastAssessmentDate?.split('T')[0] || '-' }
    ];
  });

  developmentItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('succession.talent_profiles.career_aspiration'), value: d.careerAspiration || '-' },
      { label: this.i18n.t('succession.talent_profiles.strengths'), value: d.strengthsSummary || '-' },
      { label: this.i18n.t('succession.talent_profiles.development_areas'), value: d.developmentAreas || '-' },
      { label: this.i18n.t('fields.notes'), value: d.notes || '-' }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('common.edit'), icon: 'fas fa-edit', action: () => this.router.navigate(['/succession/talent-profiles', d.id, 'edit']), type: 'outline-primary' },
      { label: this.i18n.t('common.delete'), icon: 'fas fa-trash', action: () => this.delete(), type: 'danger' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/succession/talent-profiles']); return; }
    this.service.getTalentProfile(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('succession.talent_profiles.load_error')); this.loading.set(false); }
    });
  }

  async delete(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('common.delete'),
      message: this.i18n.t('succession.talent_profiles.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      confirmButtonClass: 'btn-danger'
    });
    if (!result.confirmed) return;
    this.service.deleteTalentProfile(this.item()!.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('succession.talent_profiles.deleted_success')); this.router.navigate(['/succession/talent-profiles']); },
      error: (err) => this.notification.error(err?.error?.error || this.i18n.t('succession.talent_profiles.delete_error'))
    });
  }
}
