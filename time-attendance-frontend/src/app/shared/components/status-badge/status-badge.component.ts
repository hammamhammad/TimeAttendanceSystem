import { Component, Input } from '@angular/core';


export type StatusVariant = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'cancelled' | 'processing' | 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary' | 'light' | 'dark';

export interface StatusConfig {
  label: string;
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
          [attr.title]="title || label">
      @if (showIcon && icon) {
        <i [class]="icon + ' me-1'" [class.app-pulse]="pulse"></i>
      }
      {{ label }}
    </span>
  `
})
export class StatusBadgeComponent {
  @Input() status?: string;
  @Input() label?: string;
  @Input() variant?: StatusVariant;
  @Input() icon?: string;
  @Input() pulse = false;
  @Input() showIcon = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() title?: string;
  @Input() customConfig?: { [key: string]: StatusConfig };

  private defaultStatusConfig: { [key: string]: StatusConfig } = {
    'active': { label: 'Active', variant: 'success', icon: 'fas fa-check-circle' },
    'inactive': { label: 'Inactive', variant: 'danger', icon: 'fas fa-times-circle' },
    'pending': { label: 'Pending', variant: 'warning', icon: 'fas fa-hourglass-half' },
    'approved': { label: 'Approved', variant: 'success', icon: 'fas fa-check-circle' },
    'rejected': { label: 'Rejected', variant: 'danger', icon: 'fas fa-times-circle' },
    'cancelled': { label: 'Cancelled', variant: 'secondary', icon: 'fas fa-ban' },
    'processing': { label: 'Processing', variant: 'info', icon: 'fas fa-spinner', pulse: true },
    'draft': { label: 'Draft', variant: 'light', icon: 'fas fa-edit' },
    'published': { label: 'Published', variant: 'primary', icon: 'fas fa-eye' },
    'archived': { label: 'Archived', variant: 'secondary', icon: 'fas fa-archive' },
    'online': { label: 'Online', variant: 'success', icon: 'fas fa-circle' },
    'offline': { label: 'Offline', variant: 'danger', icon: 'fas fa-circle' },
    'present': { label: 'Present', variant: 'success', icon: 'fas fa-user-check' },
    'absent': { label: 'Absent', variant: 'danger', icon: 'fas fa-user-times' },
    'late': { label: 'Late', variant: 'warning', icon: 'fas fa-clock' },
    'early': { label: 'Early', variant: 'info', icon: 'fas fa-clock' },
    'overtime': { label: 'Overtime', variant: 'primary', icon: 'fas fa-business-time' },
    'full_time': { label: 'Full Time', variant: 'primary', icon: 'fas fa-user-tie' },
    'part_time': { label: 'Part Time', variant: 'info', icon: 'fas fa-user-clock' },
    'contract': { label: 'Contract', variant: 'warning', icon: 'fas fa-file-contract' },
    'intern': { label: 'Intern', variant: 'light', icon: 'fas fa-graduation-cap' },
    'male': { label: 'Male', variant: 'info', icon: 'fas fa-mars' },
    'female': { label: 'Female', variant: 'info', icon: 'fas fa-venus' },
    'office': { label: 'Office', variant: 'primary', icon: 'fas fa-building' },
    'remote': { label: 'Remote', variant: 'success', icon: 'fas fa-home' },
    'hybrid': { label: 'Hybrid', variant: 'info', icon: 'fas fa-laptop-house' }
  };

  get effectiveConfig(): StatusConfig | null {
    if (this.status) {
      const config = this.customConfig?.[this.status] || this.defaultStatusConfig[this.status.toLowerCase()];
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
    return this.effectiveConfig?.label || this.label || this.status || '';
  }

  get resolvedVariant(): StatusVariant {
    return this.effectiveConfig?.variant || this.variant || 'secondary';
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