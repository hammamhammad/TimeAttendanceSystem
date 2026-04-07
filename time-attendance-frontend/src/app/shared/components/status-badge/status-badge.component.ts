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
      <span [class]="'erp-badge-dot ' + getDotClass()"></span>
      @if (showIcon && resolvedIcon) {
        <i [class]="resolvedIcon" [class.app-pulse]="resolvedPulse"></i>
      }
      {{ resolvedLabel }}
    </span>
  `,
  styles: [`
    :host { display: inline-block; }
    .erp-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 10px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.4;
      white-space: nowrap;
    }
    .erp-badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .erp-badge-sm { padding: 2px 8px; font-size: 11px; }
    .erp-badge-sm .erp-badge-dot { width: 5px; height: 5px; }
    .erp-badge-lg { padding: 4px 14px; font-size: 13px; }

    /* Success / Active / Approved */
    .erp-badge-success { background: var(--app-success-50, #F0FDF4); color: var(--app-success-600, #16A34A); }
    .erp-badge-success .erp-badge-dot { background: var(--app-success, #22C55E); }

    /* Danger / Inactive / Rejected */
    .erp-badge-danger { background: var(--app-danger-50, #FEF2F2); color: var(--app-danger-600, #DC2626); }
    .erp-badge-danger .erp-badge-dot { background: var(--app-danger, #EF4444); }

    /* Warning / Pending */
    .erp-badge-warning { background: var(--app-warning-50, #FFFBEB); color: var(--app-warning-600, #D97706); }
    .erp-badge-warning .erp-badge-dot { background: var(--app-warning, #F59E0B); }

    /* Info / Processing */
    .erp-badge-info { background: var(--app-info-50, #EFF6FF); color: var(--app-info-600, #2563EB); }
    .erp-badge-info .erp-badge-dot { background: var(--app-info, #3B82F6); }

    /* Primary */
    .erp-badge-primary { background: var(--app-primary-50, #EEF2FF); color: var(--app-primary-600, #3B51D4); }
    .erp-badge-primary .erp-badge-dot { background: var(--app-primary, #4F6BF6); }

    /* Secondary / Cancelled */
    .erp-badge-secondary { background: var(--app-gray-100, #F2F4F7); color: var(--app-gray-500, #667085); }
    .erp-badge-secondary .erp-badge-dot { background: var(--app-gray-400, #98A2B3); }

    /* Accent */
    .erp-badge-accent { background: var(--app-accent-50, #FFF7ED); color: var(--app-accent-600, #EA580C); }
    .erp-badge-accent .erp-badge-dot { background: var(--app-accent, #F97316); }

    /* Light */
    .erp-badge-light { background: var(--app-gray-100, #F2F4F7); color: var(--app-gray-700, #344054); }
    .erp-badge-light .erp-badge-dot { background: var(--app-gray-400, #98A2B3); }

    /* Dark */
    .erp-badge-dark { background: var(--app-gray-800, #1D2939); color: #FFFFFF; }
    .erp-badge-dark .erp-badge-dot { background: var(--app-gray-400, #98A2B3); }
  `]
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
    // Explicit label input takes priority over config default
    return this.label || this.effectiveConfig?.label || this.status || '';
  }

  get resolvedVariant(): StatusVariant {
    // Explicit variant input takes priority over config default
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
    const sizeClass = this.size === 'sm' ? 'erp-badge-sm' : this.size === 'lg' ? 'erp-badge-lg' : '';
    const variantClass = this.getErpVariant(variant);

    return `erp-badge ${variantClass} ${sizeClass}`.trim();
  }

  getDotClass(): string {
    return this.getErpVariant(this.resolvedVariant);
  }

  private getErpVariant(variant: StatusVariant): string {
    switch (variant) {
      case 'active':
      case 'success':
      case 'approved':
        return 'erp-badge-success';
      case 'inactive':
      case 'danger':
      case 'rejected':
        return 'erp-badge-danger';
      case 'pending':
      case 'warning':
        return 'erp-badge-warning';
      case 'processing':
      case 'info':
        return 'erp-badge-info';
      case 'cancelled':
      case 'secondary':
        return 'erp-badge-secondary';
      case 'primary':
        return 'erp-badge-primary';
      case 'light':
        return 'erp-badge-light';
      case 'dark':
        return 'erp-badge-dark';
      default:
        return 'erp-badge-secondary';
    }
  }
}
