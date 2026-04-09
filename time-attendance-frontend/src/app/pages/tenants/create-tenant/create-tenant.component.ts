import { Component, OnInit, signal, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TenantService } from '../services/tenant.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { FileUploadComponent, FileUploadedEvent } from '../../../shared/components/file-upload/file-upload.component';
import { SubscriptionPlanDto } from '../models/tenant.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-create-tenant',
  standalone: true,
  imports: [
    DecimalPipe,
    ReactiveFormsModule,
    RouterModule,
    FormHeaderComponent,
    FormSectionComponent,
    LoadingSpinnerComponent,
    FileUploadComponent
  ],
  templateUrl: './create-tenant.component.html',
  styleUrls: ['./create-tenant.component.css']
})
export class CreateTenantComponent implements OnInit {
  public i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private tenantService = inject(TenantService);
  private notificationService = inject(NotificationService);

  submitting = signal(false);
  plans = signal<SubscriptionPlanDto[]>([]);
  plansLoading = signal(true);
  selectedPlanId = signal<number | null>(null);
  selectedBillingCycle = signal<'Monthly' | 'Annual'>('Monthly');
  logoPreviewUrl = signal<string | null>(null);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    nameAr: ['', [Validators.maxLength(200)]],
    isActive: [true],
    logoUrl: [''],
    companyRegistrationNumber: ['', [Validators.maxLength(100)]],
    taxIdentificationNumber: ['', [Validators.maxLength(100)]],
    industry: ['', [Validators.maxLength(100)]],
    country: ['SA', [Validators.maxLength(100)]],
    city: ['', [Validators.maxLength(100)]],
    address: ['', [Validators.maxLength(500)]],
    phone: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    website: ['', [Validators.maxLength(500)]],
    defaultTimezone: ['Asia/Riyadh', [Validators.required]],
    defaultLanguage: ['en', [Validators.required]],
    defaultCurrency: ['SAR', [Validators.required]],
    planId: [null as number | null],
    billingCycle: ['Monthly']
  });

  timezones = [
    'Asia/Riyadh', 'Asia/Dubai', 'Asia/Kuwait', 'Asia/Qatar',
    'Asia/Bahrain', 'Asia/Muscat', 'Africa/Cairo', 'Europe/London',
    'Europe/Paris', 'America/New_York', 'America/Chicago',
    'America/Los_Angeles', 'Asia/Kolkata', 'Asia/Singapore', 'UTC'
  ];

  languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'Arabic' }
  ];

  currencies = [
    { code: 'SAR', label: 'SAR - Saudi Riyal' },
    { code: 'AED', label: 'AED - UAE Dirham' },
    { code: 'USD', label: 'USD - US Dollar' },
    { code: 'EUR', label: 'EUR - Euro' },
    { code: 'GBP', label: 'GBP - British Pound' },
    { code: 'EGP', label: 'EGP - Egyptian Pound' },
    { code: 'KWD', label: 'KWD - Kuwaiti Dinar' },
    { code: 'QAR', label: 'QAR - Qatari Riyal' },
    { code: 'BHD', label: 'BHD - Bahraini Dinar' },
    { code: 'OMR', label: 'OMR - Omani Rial' }
  ];

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.plansLoading.set(true);
    this.tenantService.getSubscriptionPlans().subscribe({
      next: (plans) => {
        this.plans.set(plans.filter(p => p.isActive).sort((a, b) => a.sortOrder - b.sortOrder));
        this.plansLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load subscription plans:', error);
        this.plansLoading.set(false);
        this.notificationService.error(
          this.i18n.t('app.error'),
          this.i18n.t('tenants.plans_load_failed')
        );
      }
    });
  }

  selectPlan(planId: number): void {
    if (this.selectedPlanId() === planId) {
      this.selectedPlanId.set(null);
      this.form.patchValue({ planId: null });
    } else {
      this.selectedPlanId.set(planId);
      this.form.patchValue({ planId });
    }
  }

  setBillingCycle(cycle: 'Monthly' | 'Annual'): void {
    this.selectedBillingCycle.set(cycle);
    this.form.patchValue({ billingCycle: cycle });
  }

  onLogoUploaded(event: FileUploadedEvent): void {
    this.form.patchValue({ logoUrl: event.fileUrl });
    const fullUrl = event.fileUrl.startsWith('http')
      ? event.fileUrl
      : `${environment.apiUrl}${event.fileUrl}`;
    this.logoPreviewUrl.set(fullUrl);
  }

  onLogoRemoved(): void {
    this.form.patchValue({ logoUrl: '' });
    this.logoPreviewUrl.set(null);
  }

  getPlanPrice(plan: SubscriptionPlanDto): number {
    return this.selectedBillingCycle() === 'Annual' ? plan.annualPriceUsd : plan.monthlyPriceUsd;
  }

  getPlanPriceLabel(plan: SubscriptionPlanDto): string {
    return this.selectedBillingCycle() === 'Annual' ? this.i18n.t('tenants.per_year') : this.i18n.t('tenants.per_month');
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

  getTierClass(tier: string): string {
    const map: Record<string, string> = {
      'Free': 'tier-free',
      'Starter': 'tier-starter',
      'Professional': 'tier-professional',
      'Enterprise': 'tier-enterprise',
      'Custom': 'tier-custom'
    };
    return map[tier] || '';
  }

  getLimitEntries(limits: Record<string, number>): { key: string; value: string }[] {
    return Object.entries(limits).map(([key, value]) => ({
      key: key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim(),
      value: value === -1 ? this.i18n.t('common.unlimited') : value.toLocaleString()
    }));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const formValue = this.form.value;

    this.tenantService.createTenant(formValue).subscribe({
      next: (response) => {
        this.submitting.set(false);
        this.notificationService.success(this.i18n.t('app.success'), this.i18n.t('tenants.created_success'));
        if (response.warning) {
          this.notificationService.warning(this.i18n.t('app.warning'), this.i18n.t('tenants.plan_assignment_warning'));
        }
        this.router.navigate(['/tenants', response.id]);
      },
      error: (error) => {
        this.submitting.set(false);
        console.error('Failed to create tenant:', error);
        const message = error?.error?.message || error?.error?.error || this.i18n.t('tenants.create_failed');
        this.notificationService.error(this.i18n.t('app.error'), message);
      }
    });
  }

  hasError(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getError(field: string): string {
    const control = this.form.get(field);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return this.i18n.t('validation.required');
    if (control.errors['minlength']) return this.i18n.t('validation.minlength').replace('{{min}}', control.errors['minlength'].requiredLength);
    if (control.errors['maxlength']) return this.i18n.t('validation.maxlength').replace('{{max}}', control.errors['maxlength'].requiredLength);
    if (control.errors['email']) return this.i18n.t('validation.email');
    if (control.errors['pattern']) return this.i18n.t('validation.pattern');
    return this.i18n.t('validation.invalid_format');
  }
}
