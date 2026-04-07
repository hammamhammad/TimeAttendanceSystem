import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-my-benefits',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent, EmptyStateComponent],
  templateUrl: './my-benefits.component.html',
  styleUrl: './my-benefits.component.css'
})
export class MyBenefitsComponent implements OnInit {
  private readonly portalService = inject(PortalService);
  private readonly notificationService = inject(NotificationService);
  readonly i18n = inject(I18nService);

  // State
  enrollments = signal<any[]>([]);
  availablePlans = signal<any[]>([]);
  claims = signal<any[]>([]);
  dependents = signal<any[]>([]);
  loading = signal(false);
  activeTab = signal<'enrollments' | 'available' | 'claims' | 'dependents'>('enrollments');

  // Enroll form
  showEnrollForm = signal(false);
  enrollForm: any = {
    benefitPlanId: null,
    benefitPlanOptionId: null,
    effectiveDate: '',
    employeeMonthlyContribution: 0,
    employerMonthlyContribution: 0,
    currency: 'SAR',
    notes: ''
  };
  submitting = signal(false);

  // Claim form
  showClaimForm = signal(false);
  claimForm: any = {
    benefitEnrollmentId: null,
    claimAmount: 0,
    currency: 'SAR',
    claimType: 'Medical',
    description: '',
    notes: ''
  };

  // Dependent form
  showDependentForm = signal(false);
  dependentForm: any = {
    benefitEnrollmentId: null,
    firstName: '',
    lastName: '',
    relationship: 'Spouse',
    dateOfBirth: '',
    nationalId: '',
    coverageStartDate: '',
    additionalPremium: 0,
    currency: 'SAR'
  };

  claimTypes = ['Medical', 'Dental', 'Vision', 'Prescription', 'Preventive', 'Emergency', 'Other'];
  relationships = ['Spouse', 'Child', 'Parent', 'Sibling', 'Other'];
  currencies = ['SAR', 'USD', 'EUR', 'GBP', 'AED'];

  hasEnrollments = computed(() => this.enrollments().length > 0);
  activeEnrollments = computed(() => this.enrollments().filter(e => e.status === 'Active'));

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.portalService.getMyBenefits().subscribe({
      next: (res) => {
        this.enrollments.set(res?.data || []);
        this.loading.set(false);
      },
      error: () => { this.loading.set(false); }
    });
  }

  loadAvailablePlans(): void {
    this.portalService.getAvailableBenefitPlans().subscribe({
      next: (res) => { this.availablePlans.set(res?.data || []); },
      error: () => { }
    });
  }

  loadClaims(): void {
    this.portalService.getMyBenefitClaims().subscribe({
      next: (res) => { this.claims.set(res?.data || []); },
      error: () => { }
    });
  }

  loadDependents(): void {
    this.portalService.getMyBenefitDependents().subscribe({
      next: (res) => { this.dependents.set(res?.data || []); },
      error: () => { }
    });
  }

  setTab(tab: 'enrollments' | 'available' | 'claims' | 'dependents'): void {
    this.activeTab.set(tab);
    if (tab === 'available' && this.availablePlans().length === 0) this.loadAvailablePlans();
    if (tab === 'claims' && this.claims().length === 0) this.loadClaims();
    if (tab === 'dependents' && this.dependents().length === 0) this.loadDependents();
  }

  // Enroll
  startEnroll(plan: any): void {
    this.enrollForm.benefitPlanId = plan.id;
    this.enrollForm.effectiveDate = '';
    this.enrollForm.employeeMonthlyContribution = plan.employeePremiumAmount || 0;
    this.enrollForm.employerMonthlyContribution = plan.employerPremiumAmount || 0;
    this.enrollForm.currency = plan.currency || 'SAR';
    this.enrollForm.notes = '';
    this.showEnrollForm.set(true);
  }

  submitEnroll(): void {
    const form = this.enrollForm;
    if (!form.benefitPlanId || !form.effectiveDate) {
      this.notificationService.warning(this.i18n.t('common.fill_required'));
      return;
    }
    this.submitting.set(true);
    this.portalService.enrollInBenefitPlan(form).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.benefits.enrolled_success'));
        this.showEnrollForm.set(false);
        this.submitting.set(false);
        this.loadData();
        this.loadAvailablePlans();
      },
      error: () => { this.submitting.set(false); }
    });
  }

  cancelEnrollment(enrollment: any): void {
    this.portalService.cancelMyEnrollment(enrollment.id).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.benefits.cancelled_success'));
        this.loadData();
      },
      error: () => { }
    });
  }

  // Claims
  startClaim(): void {
    this.claimForm.benefitEnrollmentId = null;
    this.claimForm.claimAmount = 0;
    this.claimForm.claimType = 'Medical';
    this.claimForm.description = '';
    this.claimForm.notes = '';
    this.showClaimForm.set(true);
  }

  submitClaim(): void {
    const form = this.claimForm;
    if (!form.benefitEnrollmentId || !form.claimAmount) {
      this.notificationService.warning(this.i18n.t('common.fill_required'));
      return;
    }
    this.submitting.set(true);
    this.portalService.createMyBenefitClaim(form).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.benefits.claim_submitted'));
        this.showClaimForm.set(false);
        this.submitting.set(false);
        this.loadClaims();
      },
      error: () => { this.submitting.set(false); }
    });
  }

  // Dependents
  startAddDependent(): void {
    this.dependentForm.benefitEnrollmentId = null;
    this.dependentForm.firstName = '';
    this.dependentForm.lastName = '';
    this.dependentForm.dateOfBirth = '';
    this.dependentForm.nationalId = '';
    this.dependentForm.coverageStartDate = '';
    this.dependentForm.additionalPremium = 0;
    this.dependentForm.relationship = 'Spouse';
    this.showDependentForm.set(true);
  }

  submitDependent(): void {
    const form = this.dependentForm;
    if (!form.benefitEnrollmentId || !form.firstName || !form.lastName || !form.coverageStartDate) {
      this.notificationService.warning(this.i18n.t('common.fill_required'));
      return;
    }
    this.submitting.set(true);
    this.portalService.addMyBenefitDependent(form).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.benefits.dependent_added'));
        this.showDependentForm.set(false);
        this.submitting.set(false);
        this.loadDependents();
      },
      error: () => { this.submitting.set(false); }
    });
  }

  removeDependent(dep: any): void {
    this.portalService.removeMyBenefitDependent(dep.id).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.benefits.dependent_removed'));
        this.loadDependents();
      },
      error: () => { }
    });
  }

  formatCurrency(amount: number): string {
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return amount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  formatDate(date: string): string {
    if (!date) return '-';
    const d = new Date(date);
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = { Active: 'bg-success', PendingApproval: 'bg-info', Pending: 'bg-secondary', Suspended: 'bg-warning', Terminated: 'bg-danger', Cancelled: 'bg-danger' };
    return map[status] || 'bg-secondary';
  }

  getClaimStatusClass(status: string): string {
    const map: Record<string, string> = { Submitted: 'bg-info', UnderReview: 'bg-warning', Approved: 'bg-success', Rejected: 'bg-danger', Paid: 'bg-success', Cancelled: 'bg-secondary' };
    return map[status] || 'bg-secondary';
  }

  getBenefitName(item: any): string {
    const isAr = this.i18n.locale() === 'ar';
    return (isAr && item.benefitPlanNameAr) ? item.benefitPlanNameAr : item.benefitPlanName;
  }
}
