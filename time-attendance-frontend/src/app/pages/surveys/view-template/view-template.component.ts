import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { SurveyService } from '../../../core/services/survey.service';
import { SurveyTemplateDto } from '../../../shared/models/survey.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-template',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-template.component.html',
  styleUrl: './view-template.component.css'
})
export class ViewTemplateComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(SurveyService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  loading = signal(false);
  template = signal<SurveyTemplateDto | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const t = this.template();
    if (!t) return { label: '', variant: 'secondary' as StatusVariant };
    return t.isActive
      ? { label: this.i18n.t('common.active'), variant: 'success' as StatusVariant }
      : { label: this.i18n.t('common.inactive'), variant: 'secondary' as StatusVariant };
  });

  typeBadge = computed(() => {
    const t = this.template();
    if (!t) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { EmployeeEngagement: 'primary', PulseSurvey: 'info', ENPS: 'success', Onboarding: 'warning', ExitSurvey: 'danger', Custom: 'secondary' };
    return { label: this.i18n.t('surveys.type_' + t.surveyType), variant: map[t.surveyType] ?? 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const t = this.template();
    if (!t) return [];
    return [
      { label: this.i18n.t('surveys.template_name'), value: t.name },
      { label: this.i18n.t('surveys.template_name_ar'), value: t.nameAr ?? '-' },
      { label: this.i18n.t('surveys.type'), value: this.i18n.t('surveys.type_' + t.surveyType) },
      { label: this.i18n.t('common.description'), value: t.description ?? '-' },
      { label: this.i18n.t('surveys.description_ar'), value: t.descriptionAr ?? '-' },
      { label: this.i18n.t('surveys.question_count'), value: String(t.questionCount) },
      { label: this.i18n.t('surveys.distribution_count'), value: String(t.distributionCount) },
      { label: this.i18n.t('surveys.created_by'), value: t.createdByName },
      { label: this.i18n.t('common.created_date'), value: t.createdAtUtc ? new Date(t.createdAtUtc).toLocaleString() : '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/surveys/templates']); return; }
    this.loadTemplate(+id);
  }

  loadTemplate(id: number): void {
    this.loading.set(true);
    this.service.getTemplate(id).subscribe({
      next: (t) => { this.template.set(t); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  editTemplate(): void {
    const t = this.template();
    if (t) this.router.navigate(['/surveys/templates', t.id, 'edit']);
  }

  async duplicateTemplate(): Promise<void> {
    const t = this.template();
    if (!t) return;
    const result = await this.confirmation.confirm({ title: this.i18n.t('surveys.duplicate'), message: this.i18n.t('surveys.confirm_duplicate'), confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-primary' });
    if (!result.confirmed) return;
    this.service.duplicateTemplate(t.id).subscribe({
      next: (dup) => { this.notification.success(this.i18n.t('surveys.duplicated')); this.router.navigate(['/surveys/templates', dup.id, 'view']); },
      error: () => this.notification.error(this.i18n.t('common.error'))
    });
  }

  getQuestionTypeIcon(type: string): string {
    const map: Record<string, string> = { Rating: 'fas fa-star', MultipleChoice: 'fas fa-list-ul', MultiSelect: 'fas fa-check-double', OpenText: 'fas fa-align-left', NPS: 'fas fa-gauge-high', YesNo: 'fas fa-toggle-on' };
    return map[type] ?? 'fas fa-question';
  }
}
