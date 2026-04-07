import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { BenefitService } from '../../../../core/services/benefit.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { BenefitType, BenefitPlan } from '../../../../shared/models/benefit.model';

@Component({
  selector: 'app-create-plan',
  standalone: true,
  imports: [FormsModule, FormHeaderComponent, FormSectionComponent],
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {
  private benefitService = inject(BenefitService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  submitting = signal(false);
  isEdit = signal(false);
  editId = signal<number | null>(null);

  benefitTypes = Object.values(BenefitType);
  currencies = ['SAR', 'USD', 'EUR', 'GBP', 'AED'];

  form = {
    code: '',
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    benefitType: BenefitType.Health as string,
    insuranceProviderId: null as number | null,
    planYear: new Date().getFullYear(),
    effectiveStartDate: '',
    effectiveEndDate: '',
    employeePremiumAmount: 0,
    employerPremiumAmount: 0,
    currency: 'SAR',
    coverageDetails: '',
    coverageDetailsAr: '',
    maxDependents: null as number | null,
    dependentPremiumAmount: 0,
    isActive: true
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.editId.set(+id);
      this.loadPlan(+id);
    }
  }

  t(key: string): string { return this.i18n.t(key); }

  loadPlan(id: number): void {
    this.benefitService.getBenefitPlan(id).subscribe({
      next: (plan: BenefitPlan) => {
        this.form.code = plan.code;
        this.form.name = plan.name;
        this.form.nameAr = plan.nameAr || '';
        this.form.description = plan.description || '';
        this.form.descriptionAr = plan.descriptionAr || '';
        this.form.benefitType = plan.benefitType;
        this.form.insuranceProviderId = plan.insuranceProviderId || null;
        this.form.planYear = plan.planYear;
        this.form.effectiveStartDate = plan.effectiveStartDate ? plan.effectiveStartDate.substring(0, 10) : '';
        this.form.effectiveEndDate = plan.effectiveEndDate ? plan.effectiveEndDate.substring(0, 10) : '';
        this.form.employeePremiumAmount = plan.employeePremiumAmount;
        this.form.employerPremiumAmount = plan.employerPremiumAmount;
        this.form.currency = plan.currency;
        this.form.coverageDetails = plan.coverageDetails || '';
        this.form.coverageDetailsAr = plan.coverageDetailsAr || '';
        this.form.maxDependents = plan.maxDependents || null;
        this.form.dependentPremiumAmount = plan.dependentPremiumAmount;
        this.form.isActive = plan.isActive;
      },
      error: () => {
        this.notificationService.error(this.t('app.error'), this.t('benefits.plans.load_error'));
        this.router.navigate(['/benefits/plans']);
      }
    });
  }

  onSubmit(): void {
    if (!this.form.code || !this.form.name || !this.form.effectiveStartDate || !this.form.effectiveEndDate) {
      this.notificationService.warning(this.t('app.warning'), this.t('common.fill_required'));
      return;
    }

    this.submitting.set(true);
    const payload: any = { ...this.form };
    if (payload.insuranceProviderId === null) delete payload.insuranceProviderId;
    if (payload.maxDependents === null) delete payload.maxDependents;

    if (this.isEdit()) {
      this.benefitService.updateBenefitPlan(this.editId()!, payload).subscribe({
        next: () => {
          this.notificationService.success(this.t('app.success'), this.t('benefits.plans.updated_success'));
          this.router.navigate(['/benefits/plans', this.editId(), 'view']);
          this.submitting.set(false);
        },
        error: (err) => {
          this.submitting.set(false);
          this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.plans.save_error'));
        }
      });
    } else {
      this.benefitService.createBenefitPlan(payload).subscribe({
        next: (res) => {
          this.notificationService.success(this.t('app.success'), this.t('benefits.plans.created_success'));
          this.router.navigate(['/benefits/plans', res.id, 'view']);
          this.submitting.set(false);
        },
        error: (err) => {
          this.submitting.set(false);
          this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.plans.save_error'));
        }
      });
    }
  }

  onCancel(): void { this.router.navigate(['/benefits/plans']); }
}
