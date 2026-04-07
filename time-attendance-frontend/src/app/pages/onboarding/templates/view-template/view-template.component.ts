import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { OnboardingService } from '../../../../core/services/onboarding.service';
import { OnboardingTemplate } from '../../../../shared/models/onboarding.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-template',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent],
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.css']
})
export class ViewOnboardingTemplateComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private service = inject(OnboardingService);

  loading = signal(true);
  item = signal<OnboardingTemplate | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      'Active': { label: this.i18n.t('common.active'), variant: 'success' },
      'Inactive': { label: this.i18n.t('common.inactive'), variant: 'secondary' },
      'Draft': { label: this.i18n.t('common.draft'), variant: 'warning' }
    };
    const statusKey = d.status || (d.isActive ? 'Active' : 'Inactive');
    return map[statusKey] ?? { label: statusKey, variant: 'secondary' as StatusVariant };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('onboarding_templates.name'), value: d.name },
      { label: this.i18n.t('fields.department'), value: d.departmentName || '-' },
      { label: this.i18n.t('fields.branch'), value: d.branchName || '-' },
      { label: this.i18n.t('onboarding_templates.estimated_days'), value: String(d.estimatedDays) },
      { label: this.i18n.t('onboarding_templates.task_count'), value: String(d.taskCount) }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('common.edit'), icon: 'fas fa-edit', action: () => this.router.navigate(['/onboarding/templates', d.id, 'edit']), type: 'outline-primary' },
      {
        label: d.isActive ? this.i18n.t('common.deactivate') : this.i18n.t('common.activate'),
        icon: d.isActive ? 'fas fa-toggle-off' : 'fas fa-toggle-on',
        action: () => this.toggleStatus(),
        type: d.isActive ? 'warning' : 'success'
      }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/onboarding/templates']); return; }
    this.service.getTemplate(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('onboarding_templates.load_error')); this.loading.set(false); }
    });
  }

  async toggleStatus(): Promise<void> {
    const d = this.item()!;
    const newStatus = d.isActive ? this.i18n.t('common.inactive') : this.i18n.t('common.active');
    const result = await this.confirmation.confirm({
      title: this.i18n.t('onboarding_templates.toggle_status'),
      message: this.i18n.t('onboarding_templates.confirm_toggle_status'),
      confirmText: this.i18n.t('common.confirm'),
      confirmButtonClass: d.isActive ? 'btn-warning' : 'btn-success'
    });
    if (!result.confirmed) return;
    this.service.toggleTemplateStatus(d.id).subscribe({
      next: (u) => {
        this.item.set(u);
        this.notification.success(this.i18n.t('onboarding_templates.toggled_success'));
      },
      error: () => this.notification.error(this.i18n.t('onboarding_templates.toggle_error'))
    });
  }
}
