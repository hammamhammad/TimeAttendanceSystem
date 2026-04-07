import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { BenefitService } from '../../../../core/services/benefit.service';
import { BenefitPlan, BenefitPlanOption, BenefitEligibilityRule } from '../../../../shared/models/benefit.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-plan',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.css']
})
export class ViewPlanComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private benefitService = inject(BenefitService);
  private notificationService = inject(NotificationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  plan = signal<BenefitPlan | null>(null);
  entityId = signal<number | null>(null);
  activeTab = signal<'details' | 'options' | 'eligibility'>('details');

  statusBadge = computed(() => {
    const item = this.plan();
    if (!item) return { label: '', variant: 'secondary' as StatusVariant };
    return item.isActive
      ? { label: this.i18n.t('common.active'), variant: 'success' as StatusVariant }
      : { label: this.i18n.t('common.inactive'), variant: 'secondary' as StatusVariant };
  });

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.plan();
    if (!item) return [];
    return [
      { label: this.i18n.t('benefits.plans.code'), value: item.code },
      { label: this.i18n.t('common.name'), value: item.name },
      { label: this.i18n.t('common.name_ar'), value: item.nameAr || '-' },
      { label: this.i18n.t('benefits.plans.benefit_type'), value: this.i18n.t('benefits.types.' + item.benefitType.toLowerCase()) },
      { label: this.i18n.t('benefits.plans.plan_year'), value: item.planYear?.toString() || '-' },
      { label: this.i18n.t('benefits.plans.effective_start'), value: this.formatDate(item.effectiveStartDate) },
      { label: this.i18n.t('benefits.plans.effective_end'), value: this.formatDate(item.effectiveEndDate) },
      { label: this.i18n.t('benefits.plans.insurance_provider'), value: item.insuranceProviderName || '-' }
    ];
  });

  premiumInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.plan();
    if (!item) return [];
    return [
      { label: this.i18n.t('benefits.plans.employee_premium'), value: `${item.employeePremiumAmount?.toFixed(2)} ${item.currency}` },
      { label: this.i18n.t('benefits.plans.employer_premium'), value: `${item.employerPremiumAmount?.toFixed(2)} ${item.currency}` },
      { label: this.i18n.t('benefits.plans.dependent_premium'), value: `${item.dependentPremiumAmount?.toFixed(2)} ${item.currency}` },
      { label: this.i18n.t('benefits.plans.max_dependents'), value: item.maxDependents?.toString() || '-' },
      { label: this.i18n.t('common.currency'), value: item.currency }
    ];
  });

  options = computed<BenefitPlanOption[]>(() => this.plan()?.options || []);
  eligibilityRules = computed<BenefitEligibilityRule[]>(() => this.plan()?.eligibilityRules || []);

  ngOnInit(): void { this.loadData(); }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
  t(key: string): string { return this.i18n.t(key); }

  private loadData(): void {
    this.loading.set(true);
    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id || id <= 0) { this.router.navigate(['/benefits/plans']); throw new Error('Invalid ID'); }
        this.entityId.set(id);
        return this.benefitService.getBenefitPlan(id);
      })
    ).subscribe({
      next: (data) => { this.loading.set(false); this.plan.set(data); },
      error: () => { this.loading.set(false); this.notificationService.error(this.i18n.t('app.error'), this.i18n.t('benefits.plans.load_error')); this.router.navigate(['/benefits/plans']); }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'long', day: 'numeric' });
  }

  setTab(tab: 'details' | 'options' | 'eligibility'): void { this.activeTab.set(tab); }

  getCoverageLevelLabel(level: string): string {
    return this.i18n.t('benefits.coverage_levels.' + level.toLowerCase());
  }

  getRuleTypeLabel(ruleType: string): string {
    return this.i18n.t('benefits.rule_types.' + ruleType.toLowerCase());
  }

  onEdit(): void { this.router.navigate(['/benefits/plans', this.entityId(), 'edit']); }
  onBack(): void { this.router.navigate(['/benefits/plans']); }
}
