import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { TenantConfigurationService } from '../services/tenant-configuration.service';
import { PolicyTemplateDto, PolicyTemplateItemDto } from '../services/tenant-configuration.models';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-policy-templates',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, EmptyStateComponent],
  templateUrl: './policy-templates.component.html',
  styleUrl: './policy-templates.component.css'
})
export class PolicyTemplatesComponent implements OnInit {
  private configService = inject(TenantConfigurationService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  i18n = inject(I18nService);

  loading = signal(true);
  applying = signal<number | null>(null);
  deleting = signal<number | null>(null);
  templates = signal<PolicyTemplateDto[]>([]);
  expandedTemplate = signal<number | null>(null);

  // Filters
  regionFilter = signal<string>('');
  industryFilter = signal<string>('');

  // Computed: distinct regions and industries from loaded templates
  regions = computed(() => {
    const all = this.templates().map(t => t.region);
    return [...new Set(all)].sort();
  });

  industries = computed(() => {
    const all = this.templates()
      .map(t => t.industry)
      .filter((i): i is string => i != null && i.length > 0);
    return [...new Set(all)].sort();
  });

  filteredTemplates = computed(() => {
    let list = this.templates();
    const region = this.regionFilter();
    const industry = this.industryFilter();
    if (region) list = list.filter(t => t.region === region);
    if (industry) list = list.filter(t => t.industry === industry);
    return list;
  });

  t(key: string): string { return this.i18n.t(key); }

  ngOnInit(): void { this.loadTemplates(); }

  loadTemplates(): void {
    this.loading.set(true);
    this.configService.getPolicyTemplates().subscribe({
      next: (data) => { this.templates.set(data); this.loading.set(false); },
      error: () => { this.loading.set(false); }
    });
  }

  async applyTemplate(template: PolicyTemplateDto): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('tenant_configuration.templates.apply_confirm_title'),
      message: this.t('tenant_configuration.templates.apply_confirm_message'),
      confirmText: this.t('tenant_configuration.templates.apply'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-primary',
      icon: 'fa-wand-magic-sparkles',
      iconClass: 'text-primary'
    });

    if (!result.confirmed) return;

    this.applying.set(template.id);
    this.configService.applyPolicyTemplate(template.id).subscribe({
      next: () => {
        this.notificationService.success(this.t('tenant_configuration.templates.applied'));
        this.applying.set(null);
      },
      error: (err) => {
        const msg = err?.error?.error || err?.error?.message || this.t('tenant_configuration.templates.apply_failed');
        this.notificationService.error(msg);
        this.applying.set(null);
      }
    });
  }

  async deleteTemplate(template: PolicyTemplateDto): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('tenant_configuration.templates.delete_confirm_title'),
      message: this.t('tenant_configuration.templates.delete_confirm_message'),
      confirmText: this.t('common.delete'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (!result.confirmed) return;

    this.deleting.set(template.id);
    this.configService.deletePolicyTemplate(template.id).subscribe({
      next: () => {
        this.notificationService.success(this.t('tenant_configuration.templates.deleted'));
        this.deleting.set(null);
        this.loadTemplates();
      },
      error: (err) => {
        const msg = err?.error?.error || err?.error?.message || this.t('tenant_configuration.templates.delete_failed');
        this.notificationService.error(msg);
        this.deleting.set(null);
      }
    });
  }

  toggleExpand(templateId: number): void {
    this.expandedTemplate.set(this.expandedTemplate() === templateId ? null : templateId);
  }

  isExpanded(templateId: number): boolean {
    return this.expandedTemplate() === templateId;
  }

  getRegionLabel(region: string): string {
    const labels: Record<string, string> = { 'SA': 'Saudi Arabia', 'AE': 'UAE', 'BH': 'Bahrain', 'KW': 'Kuwait', 'OM': 'Oman', 'QA': 'Qatar' };
    return labels[region] || region;
  }

  getPolicyTypeIcon(policyType: string): string {
    const icons: Record<string, string> = {
      'TenantSettings': 'fa-gear',
      'VacationType': 'fa-umbrella-beach',
      'ExcusePolicy': 'fa-clock',
      'Shift': 'fa-calendar-days',
      'OffDay': 'fa-calendar-xmark',
      'OvertimeConfiguration': 'fa-hourglass-half',
      'RemoteWorkPolicy': 'fa-house-laptop'
    };
    return icons[policyType] || 'fa-file';
  }

  getPolicyTypeLabel(policyType: string): string {
    const key = `tenant_configuration.templates.policy_type_${policyType.toLowerCase()}`;
    const translated = this.t(key);
    return translated !== key ? translated : policyType;
  }

  getItemDisplayName(item: PolicyTemplateItemDto): string {
    try {
      const config = JSON.parse(item.configurationJson);
      const name = this.i18n.getCurrentLocale() === 'ar' && config.NameAr
        ? config.NameAr
        : config.Name;
      if (name) return name;
    } catch { /* ignore parse errors */ }
    return this.getPolicyTypeLabel(item.policyType);
  }

  getLocalizedName(tpl: PolicyTemplateDto): string {
    return this.i18n.getCurrentLocale() === 'ar' && tpl.nameAr ? tpl.nameAr : tpl.name;
  }

  getLocalizedDesc(tpl: PolicyTemplateDto): string {
    const desc = this.i18n.getCurrentLocale() === 'ar' && tpl.descriptionAr ? tpl.descriptionAr : tpl.description;
    return desc || '';
  }

  clearFilters(): void {
    this.regionFilter.set('');
    this.industryFilter.set('');
  }
}
