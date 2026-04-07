import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TenantService } from '../services/tenant.service';
import { TenantDetailDto, SubscriptionPlanDto, TenantSubscriptionDto } from '../models/tenant.model';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-tenant',
  standalone: true,
  imports: [
    RouterModule,
    PageHeaderComponent,
    StatusBadgeComponent,
    DefinitionListComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    SectionCardComponent
  ],
  templateUrl: './view-tenant.component.html',
  styleUrls: ['./view-tenant.component.css']
})
export class ViewTenantComponent implements OnInit {
  public i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tenantService = inject(TenantService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);

  loading = signal(true);
  tenant = signal<TenantDetailDto | null>(null);
  activeTab = signal<'overview' | 'subscription' | 'branches'>('overview');
  error = signal('');

  // Subscription management state
  plans = signal<SubscriptionPlanDto[]>([]);
  loadingPlans = signal(false);
  showAssignPlanForm = signal(false);
  showChangePlanForm = signal(false);
  selectedPlanId = signal<number | null>(null);
  selectedBillingCycle = signal<string>('Monthly');
  submittingSubscription = signal(false);

  // Computed status badge
  statusBadge = computed(() => {
    const t = this.tenant();
    if (!t) return { label: '', variant: 'secondary' as StatusVariant };
    const variantMap: Record<string, StatusVariant> = {
      'Active': 'success',
      'Suspended': 'danger',
      'Trial': 'warning',
      'PendingSetup': 'info',
      'Cancelled': 'secondary'
    };
    return {
      label: t.status,
      variant: variantMap[t.status] || 'secondary' as StatusVariant
    };
  });

  // Overview definition items
  basicInfoItems = computed<DefinitionItem[]>(() => {
    const t = this.tenant();
    if (!t) return [];
    return [
      { label: 'Subdomain', value: t.subdomain, copyable: true },
      { label: 'Company Name', value: t.name },
      { label: 'Company Name (Arabic)', value: t.nameAr || '-' },
      { label: 'API Base URL', value: t.apiBaseUrl, copyable: true },
      { label: 'Custom Domain', value: t.customDomain || '-' },
      { label: 'Status', value: t.status, type: 'badge', badgeVariant: this.getStatusBadgeVariant(t.status) },
      { label: 'Created', value: t.createdAtUtc, type: 'date' }
    ];
  });

  companyInfoItems = computed<DefinitionItem[]>(() => {
    const t = this.tenant();
    if (!t) return [];
    return [
      { label: 'Registration Number', value: t.companyRegistrationNumber || '-' },
      { label: 'Tax ID', value: t.taxIdentificationNumber || '-' },
      { label: 'Industry', value: t.industry || '-' },
      { label: 'Country', value: t.country || '-' },
      { label: 'City', value: t.city || '-' },
      { label: 'Address', value: t.address || '-' },
      { label: 'Phone', value: t.phone || '-' },
      { label: 'Email', value: t.email || '-' },
      { label: 'Website', value: t.website || '-', type: t.website ? 'link' as const : 'text' as const, href: t.website || undefined }
    ];
  });

  defaultsItems = computed<DefinitionItem[]>(() => {
    const t = this.tenant();
    if (!t) return [];
    return [
      { label: 'Timezone', value: t.defaultTimezone },
      { label: 'Language', value: t.defaultLanguage === 'en' ? 'English' : t.defaultLanguage === 'ar' ? 'Arabic' : t.defaultLanguage },
      { label: 'Currency', value: t.defaultCurrency }
    ];
  });

  // Subscription info items
  subscriptionInfoItems = computed<DefinitionItem[]>(() => {
    const sub = this.tenant()?.subscription;
    if (!sub) return [];
    return [
      { label: 'Plan', value: sub.planName },
      { label: 'Tier', value: sub.planTier, type: 'badge', badgeVariant: this.getTierBadgeVariant(sub.planTier) },
      { label: 'Status', value: sub.status, type: 'badge', badgeVariant: this.getSubStatusVariant(sub.status) },
      { label: 'Billing Cycle', value: sub.billingCycle },
      { label: 'Start Date', value: sub.startDate, type: 'date' },
      { label: 'Current Period Start', value: sub.currentPeriodStart, type: 'date' },
      { label: 'Current Period End', value: sub.currentPeriodEnd, type: 'date' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTenant(parseInt(id, 10));
    } else {
      this.error.set('Invalid tenant ID');
      this.loading.set(false);
    }
  }

  loadTenant(id: number): void {
    this.loading.set(true);
    this.tenantService.getTenantById(id).subscribe({
      next: (tenant) => {
        this.tenant.set(tenant);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load tenant:', err);
        this.error.set('Failed to load tenant');
        this.loading.set(false);
      }
    });
  }

  setActiveTab(tab: 'overview' | 'subscription' | 'branches'): void {
    this.activeTab.set(tab);
    if (tab === 'subscription' && this.plans().length === 0) {
      this.loadPlans();
    }
  }

  loadPlans(): void {
    this.loadingPlans.set(true);
    this.tenantService.getSubscriptionPlans().subscribe({
      next: (plans) => {
        this.plans.set(plans);
        this.loadingPlans.set(false);
      },
      error: (error) => {
        console.error('Failed to load plans:', error);
        this.loadingPlans.set(false);
      }
    });
  }

  // Actions
  onEdit(): void {
    const t = this.tenant();
    if (t) {
      this.router.navigate(['/tenants', t.id, 'edit']);
    }
  }

  async onActivate(): Promise<void> {
    const t = this.tenant();
    if (!t) return;

    const result = await this.confirmationService.confirm({
      title: 'Activate Tenant',
      message: `Are you sure you want to activate "${t.name}"?`,
      confirmText: 'Activate',
      cancelText: 'Cancel',
      confirmButtonClass: 'btn-success',
      icon: 'fa-check-circle',
      iconClass: 'text-success'
    });

    if (result.confirmed) {
      this.tenantService.activateTenant(t.id).subscribe({
        next: () => {
          this.notificationService.success('Success', 'Tenant activated successfully');
          this.loadTenant(t.id);
        },
        error: (error) => {
          console.error('Failed to activate tenant:', error);
          this.notificationService.error('Error', 'Failed to activate tenant');
        }
      });
    }
  }

  async onSuspend(): Promise<void> {
    const t = this.tenant();
    if (!t) return;

    const result = await this.confirmationService.confirm({
      title: 'Suspend Tenant',
      message: `Are you sure you want to suspend "${t.name}"? This will disable access for all users.`,
      confirmText: 'Suspend',
      cancelText: 'Cancel',
      confirmButtonClass: 'btn-danger',
      icon: 'fa-ban',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.tenantService.suspendTenant(t.id).subscribe({
        next: () => {
          this.notificationService.success('Success', 'Tenant suspended successfully');
          this.loadTenant(t.id);
        },
        error: (error) => {
          console.error('Failed to suspend tenant:', error);
          this.notificationService.error('Error', 'Failed to suspend tenant');
        }
      });
    }
  }

  // Subscription management
  onShowAssignPlan(): void {
    if (this.plans().length === 0) {
      this.loadPlans();
    }
    this.showAssignPlanForm.set(true);
    this.selectedPlanId.set(null);
    this.selectedBillingCycle.set('Monthly');
  }

  onShowChangePlan(): void {
    if (this.plans().length === 0) {
      this.loadPlans();
    }
    this.showChangePlanForm.set(true);
    this.selectedPlanId.set(null);
  }

  onSelectPlan(planId: number): void {
    this.selectedPlanId.set(planId);
  }

  onSelectBillingCycle(cycle: string): void {
    this.selectedBillingCycle.set(cycle);
  }

  onAssignPlan(): void {
    const t = this.tenant();
    const planId = this.selectedPlanId();
    if (!t || !planId) return;

    this.submittingSubscription.set(true);
    this.tenantService.assignPlan(t.id, {
      planId,
      billingCycle: this.selectedBillingCycle()
    }).subscribe({
      next: () => {
        this.submittingSubscription.set(false);
        this.showAssignPlanForm.set(false);
        this.notificationService.success('Success', 'Subscription plan assigned successfully');
        this.loadTenant(t.id);
      },
      error: (error) => {
        this.submittingSubscription.set(false);
        console.error('Failed to assign plan:', error);
        this.notificationService.error('Error', error?.error?.message || 'Failed to assign plan');
      }
    });
  }

  onChangePlan(): void {
    const t = this.tenant();
    const planId = this.selectedPlanId();
    if (!t || !planId) return;

    this.submittingSubscription.set(true);
    this.tenantService.changePlan(t.id, { newPlanId: planId }).subscribe({
      next: () => {
        this.submittingSubscription.set(false);
        this.showChangePlanForm.set(false);
        this.notificationService.success('Success', 'Subscription plan changed successfully');
        this.loadTenant(t.id);
      },
      error: (error) => {
        this.submittingSubscription.set(false);
        console.error('Failed to change plan:', error);
        this.notificationService.error('Error', error?.error?.message || 'Failed to change plan');
      }
    });
  }

  async onCancelSubscription(): Promise<void> {
    const t = this.tenant();
    if (!t) return;

    const result = await this.confirmationService.confirm({
      title: 'Cancel Subscription',
      message: `Are you sure you want to cancel the subscription for "${t.name}"? This action will take effect at the end of the current billing period.`,
      confirmText: 'Cancel Subscription',
      cancelText: 'Keep Subscription',
      confirmButtonClass: 'btn-danger',
      icon: 'fa-times-circle',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.tenantService.cancelSubscription(t.id).subscribe({
        next: () => {
          this.notificationService.success('Success', 'Subscription cancelled successfully');
          this.loadTenant(t.id);
        },
        error: (error) => {
          console.error('Failed to cancel subscription:', error);
          this.notificationService.error('Error', 'Failed to cancel subscription');
        }
      });
    }
  }

  onCancelForm(): void {
    this.showAssignPlanForm.set(false);
    this.showChangePlanForm.set(false);
    this.selectedPlanId.set(null);
  }

  // Helper methods
  getStatusBadgeVariant(status: string): 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' {
    const map: Record<string, 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'> = {
      'Active': 'success',
      'Suspended': 'danger',
      'Trial': 'warning',
      'PendingSetup': 'info',
      'Cancelled': 'secondary'
    };
    return map[status] || 'secondary';
  }

  getTierBadgeVariant(tier: string): 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' {
    const map: Record<string, 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'> = {
      'Free': 'secondary',
      'Starter': 'info',
      'Professional': 'primary',
      'Enterprise': 'success',
      'Custom': 'warning'
    };
    return map[tier] || 'secondary';
  }

  getSubStatusVariant(status: string): 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' {
    const map: Record<string, 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'> = {
      'Active': 'success',
      'Trial': 'warning',
      'PastDue': 'danger',
      'Cancelled': 'secondary',
      'Expired': 'danger'
    };
    return map[status] || 'secondary';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString(this.i18n.getDateLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
}
