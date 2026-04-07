import { Component, OnInit, signal, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TenantService } from '../tenants/services/tenant.service';
import { SubscriptionPlanDto } from '../tenants/models/tenant.model';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent, StatusVariant } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    StatusBadgeComponent
  ],
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css']
})
export class SubscriptionPlansComponent implements OnInit {
  public i18n = inject(I18nService);
  private tenantService = inject(TenantService);

  loading = signal(true);
  plans = signal<SubscriptionPlanDto[]>([]);

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.loading.set(true);
    this.tenantService.getSubscriptionPlans().subscribe({
      next: (plans) => {
        // Sort by sortOrder
        this.plans.set(plans.sort((a, b) => a.sortOrder - b.sortOrder));
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load plans:', error);
        this.loading.set(false);
      }
    });
  }

  getTierVariant(tier: string): StatusVariant {
    const map: Record<string, StatusVariant> = {
      'Free': 'secondary',
      'Starter': 'info',
      'Professional': 'primary',
      'Enterprise': 'success',
      'Custom': 'warning'
    };
    return map[tier] || 'secondary';
  }

  getTierIcon(tier: string): string {
    const map: Record<string, string> = {
      'Free': 'fa-solid fa-gift',
      'Starter': 'fa-solid fa-rocket',
      'Professional': 'fa-solid fa-briefcase',
      'Enterprise': 'fa-solid fa-building',
      'Custom': 'fa-solid fa-cog'
    };
    return map[tier] || 'fa-solid fa-tag';
  }

  isHighlighted(plan: SubscriptionPlanDto): boolean {
    return plan.tier === 'Professional' || plan.tier === 'Enterprise';
  }

  getLimitEntries(limits: Record<string, number>): { key: string; value: number }[] {
    return Object.entries(limits).map(([key, value]) => ({
      key: this.formatLimitKey(key),
      value
    }));
  }

  formatLimitKey(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim();
  }

  formatLimitValue(value: number): string {
    return value === -1 ? 'Unlimited' : value.toLocaleString();
  }
}
