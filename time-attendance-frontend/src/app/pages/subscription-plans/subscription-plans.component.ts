import { Component, OnInit, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { TenantService } from '../tenants/services/tenant.service';
import { SubscriptionPlanDto } from '../tenants/models/tenant.model';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent, StatusVariant } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [
    PageHeaderComponent,
    UnifiedFilterComponent,
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
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);

  loading = signal(true);
  plans = signal<SubscriptionPlanDto[]>([]);
  filteredPlans = signal<SubscriptionPlanDto[]>([]);
  searchTerm = signal('');

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.loading.set(true);
    this.tenantService.getSubscriptionPlans().subscribe({
      next: (plans) => {
        const sorted = plans.sort((a, b) => a.sortOrder - b.sortOrder);
        this.plans.set(sorted);
        this.applyFilter();
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load plans:', error);
        this.notificationService.error('Error', 'Failed to load subscription plans');
        this.loading.set(false);
      }
    });
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.applyFilter();
  }

  applyFilter(): void {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      this.filteredPlans.set(this.plans());
    } else {
      this.filteredPlans.set(
        this.plans().filter(p =>
          p.name.toLowerCase().includes(term) ||
          p.code.toLowerCase().includes(term) ||
          p.tier.toLowerCase().includes(term) ||
          (p.description && p.description.toLowerCase().includes(term))
        )
      );
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/subscription-plans/create']);
  }

  navigateToEdit(plan: SubscriptionPlanDto): void {
    this.router.navigate(['/subscription-plans', plan.id, 'edit']);
  }

  async deletePlan(plan: SubscriptionPlanDto): Promise<void> {
    const result = await this.confirmationService.confirmDelete(plan.name, 'subscription plan');
    if (result.confirmed) {
      this.tenantService.deleteSubscriptionPlan(plan.id).subscribe({
        next: () => {
          this.notificationService.success('Success', 'Subscription plan deleted successfully');
          this.loadPlans();
        },
        error: (error) => {
          console.error('Failed to delete plan:', error);
          const message = error?.error?.error || 'Failed to delete subscription plan';
          this.notificationService.error('Error', message);
        }
      });
    }
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
