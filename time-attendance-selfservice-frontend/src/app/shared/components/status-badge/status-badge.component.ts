import { Component, Input, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';

export type StatusVariant = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'cancelled' | 'processing' | 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary' | 'light' | 'dark';

export interface StatusConfig {
  label: string;
  variant: StatusVariant;
  icon?: string;
  pulse?: boolean;
}

interface StatusStyleConfig {
  i18nKey: string;
  variant: StatusVariant;
  icon?: string;
  pulse?: boolean;
}

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [],
  template: `
    <span [class]="getBadgeClasses()"
          [attr.title]="title || resolvedLabel">
      @if (showIcon && resolvedIcon) {
        <i [class]="resolvedIcon + ' me-1'" [class.app-pulse]="resolvedPulse"></i>
      }
      {{ resolvedLabel }}
    </span>
  `
})
export class StatusBadgeComponent {
  private i18n = inject(I18nService);

  @Input() status?: string;
  @Input() label?: string;
  @Input() variant?: StatusVariant;
  @Input() icon?: string;
  @Input() pulse = false;
  @Input() showIcon = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() title?: string;
  @Input() customConfig?: { [key: string]: StatusConfig };

  private static readonly statusStyleMap: { [key: string]: StatusStyleConfig } = {
    'active': { i18nKey: 'common.statuses.active', variant: 'success', icon: 'fas fa-check-circle' },
    'inactive': { i18nKey: 'common.statuses.inactive', variant: 'danger', icon: 'fas fa-times-circle' },
    'pending': { i18nKey: 'common.statuses.pending', variant: 'warning', icon: 'fas fa-hourglass-half' },
    'approved': { i18nKey: 'common.statuses.approved', variant: 'success', icon: 'fas fa-check-circle' },
    'rejected': { i18nKey: 'common.statuses.rejected', variant: 'danger', icon: 'fas fa-times-circle' },
    'cancelled': { i18nKey: 'common.statuses.cancelled', variant: 'secondary', icon: 'fas fa-ban' },
    'processing': { i18nKey: 'common.statuses.processing', variant: 'info', icon: 'fas fa-spinner', pulse: true },
    'draft': { i18nKey: 'common.statuses.draft', variant: 'light', icon: 'fas fa-edit' },
    'published': { i18nKey: 'common.statuses.published', variant: 'primary', icon: 'fas fa-eye' },
    'archived': { i18nKey: 'common.statuses.archived', variant: 'secondary', icon: 'fas fa-archive' },
    'online': { i18nKey: 'common.statuses.online', variant: 'success', icon: 'fas fa-circle' },
    'offline': { i18nKey: 'common.statuses.offline', variant: 'danger', icon: 'fas fa-circle' },
    'present': { i18nKey: 'common.statuses.present', variant: 'success', icon: 'fas fa-user-check' },
    'absent': { i18nKey: 'common.statuses.absent', variant: 'danger', icon: 'fas fa-user-times' },
    'late': { i18nKey: 'common.statuses.late', variant: 'warning', icon: 'fas fa-clock' },
    'early': { i18nKey: 'common.statuses.early', variant: 'info', icon: 'fas fa-clock' },
    'overtime': { i18nKey: 'common.statuses.overtime', variant: 'primary', icon: 'fas fa-business-time' },
    'full_time': { i18nKey: 'common.statuses.full_time', variant: 'primary', icon: 'fas fa-user-tie' },
    'part_time': { i18nKey: 'common.statuses.part_time', variant: 'info', icon: 'fas fa-user-clock' },
    'contract': { i18nKey: 'common.statuses.contract', variant: 'warning', icon: 'fas fa-file-contract' },
    'intern': { i18nKey: 'common.statuses.intern', variant: 'light', icon: 'fas fa-graduation-cap' },
    'male': { i18nKey: 'common.statuses.male', variant: 'info', icon: 'fas fa-mars' },
    'female': { i18nKey: 'common.statuses.female', variant: 'info', icon: 'fas fa-venus' },
    'office': { i18nKey: 'common.statuses.office', variant: 'primary', icon: 'fas fa-building' },
    'remote': { i18nKey: 'common.statuses.remote', variant: 'success', icon: 'fas fa-home' },
    'hybrid': { i18nKey: 'common.statuses.hybrid', variant: 'info', icon: 'fas fa-laptop-house' }
  };

  private getDefaultStatusConfig(key: string): StatusConfig | undefined {
    const style = StatusBadgeComponent.statusStyleMap[key];
    if (!style) return undefined;
    return {
      label: this.i18n.t(style.i18nKey),
      variant: style.variant,
      icon: style.icon,
      pulse: style.pulse
    };
  }

  get effectiveConfig(): StatusConfig | null {
    if (this.status) {
      const config = this.customConfig?.[this.status] || this.getDefaultStatusConfig(this.status.toLowerCase());
      if (config) {
        return {
          ...config,
          pulse: this.pulse || config.pulse || false
        };
      }
    }

    // Fallback to manual configuration
    if (this.label && this.variant) {
      return {
        label: this.label,
        variant: this.variant,
        icon: this.icon,
        pulse: this.pulse
      };
    }

    return null;
  }

  get resolvedLabel(): string {
    return this.label || this.effectiveConfig?.label || this.status || '';
  }

  get resolvedVariant(): StatusVariant {
    return this.variant || this.effectiveConfig?.variant || 'secondary';
  }

  get resolvedIcon(): string | undefined {
    return this.effectiveConfig?.icon || this.icon;
  }

  get resolvedPulse(): boolean {
    return this.effectiveConfig?.pulse || this.pulse;
  }

  getBadgeClasses(): string {
    const variant = this.resolvedVariant;
    const sizeClass = this.size === 'sm' ? 'badge-sm' : this.size === 'lg' ? 'badge-lg' : '';

    // Map custom variants to Bootstrap classes
    const variantClass = this.getBootstrapVariant(variant);

    return `badge ${variantClass} ${sizeClass}`.trim();
  }

  private getBootstrapVariant(variant: StatusVariant): string {
    switch (variant) {
      case 'active':
      case 'success':
      case 'approved':
        return 'bg-success';
      case 'inactive':
      case 'danger':
      case 'rejected':
        return 'bg-danger';
      case 'pending':
      case 'warning':
        return 'bg-warning';
      case 'processing':
      case 'info':
        return 'bg-info';
      case 'cancelled':
      case 'secondary':
        return 'bg-secondary';
      case 'primary':
        return 'bg-primary';
      case 'light':
        return 'bg-light text-dark';
      case 'dark':
        return 'bg-dark';
      default:
        return 'bg-secondary';
    }
  }
}
