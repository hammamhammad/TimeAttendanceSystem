import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TenantService } from '../../tenants/services/tenant.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';

@Component({
  selector: 'app-create-plan',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormHeaderComponent,
    FormSectionComponent
  ],
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent {
  public i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private tenantService = inject(TenantService);
  private notificationService = inject(NotificationService);

  submitting = signal(false);

  tiers = ['Starter', 'Professional', 'Enterprise', 'Custom'];

  currencies = [
    { code: 'USD', label: 'USD - US Dollar' },
    { code: 'SAR', label: 'SAR - Saudi Riyal' },
    { code: 'AED', label: 'AED - UAE Dirham' },
    { code: 'EUR', label: 'EUR - Euro' },
    { code: 'GBP', label: 'GBP - British Pound' }
  ];

  allModules = [
    'Core', 'TimeAttendance', 'LeaveManagement', 'RemoteWork', 'Workflows',
    'EmployeeLifecycle', 'Payroll', 'Allowances', 'Offboarding', 'Recruitment',
    'Onboarding', 'Performance', 'Documents', 'Expenses', 'Loans',
    'Announcements', 'Training', 'EmployeeRelations', 'Assets', 'Surveys',
    'Analytics', 'Timesheets', 'SuccessionPlanning', 'Benefits', 'CustomReports', 'ShiftSwaps'
  ];

  selectedModules = signal<Set<string>>(new Set(['Core']));

  limitUnlimited = signal<Record<string, boolean>>({
    MaxEmployees: false,
    MaxBranches: false,
    MaxUsers: false,
    StorageGb: false
  });

  form: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
    name: ['', [Validators.required, Validators.maxLength(200)]],
    nameAr: ['', [Validators.maxLength(200)]],
    description: ['', [Validators.maxLength(1000)]],
    descriptionAr: ['', [Validators.maxLength(1000)]],
    tier: ['Professional', [Validators.required]],
    sortOrder: [0],
    monthlyPriceUsd: [0, [Validators.required, Validators.min(0)]],
    annualPriceUsd: [0, [Validators.required, Validators.min(0)]],
    currency: ['USD', [Validators.required]],
    maxEmployees: [50, [Validators.min(1)]],
    maxBranches: [5, [Validators.min(1)]],
    maxUsers: [50, [Validators.min(1)]],
    storageGb: [10, [Validators.min(1)]],
    isPublic: [true],
    isActive: [true]
  });

  toggleModule(mod: string): void {
    const current = new Set(this.selectedModules());
    if (current.has(mod)) {
      if (mod === 'Core') return; // Core cannot be deselected
      current.delete(mod);
    } else {
      current.add(mod);
    }
    this.selectedModules.set(current);
  }

  isModuleSelected(mod: string): boolean {
    return this.selectedModules().has(mod);
  }

  selectAllModules(): void {
    this.selectedModules.set(new Set(this.allModules));
  }

  deselectAllModules(): void {
    this.selectedModules.set(new Set(['Core']));
  }

  toggleUnlimited(limitKey: string): void {
    const current = { ...this.limitUnlimited() };
    current[limitKey] = !current[limitKey];
    this.limitUnlimited.set(current);
  }

  isUnlimited(limitKey: string): boolean {
    return this.limitUnlimited()[limitKey] || false;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const fv = this.form.value;
    const ul = this.limitUnlimited();

    const payload = {
      code: fv.code,
      name: fv.name,
      nameAr: fv.nameAr || null,
      description: fv.description || null,
      descriptionAr: fv.descriptionAr || null,
      tier: fv.tier,
      monthlyPriceUsd: fv.monthlyPriceUsd,
      annualPriceUsd: fv.annualPriceUsd,
      currency: fv.currency,
      modules: Array.from(this.selectedModules()),
      limits: {
        MaxEmployees: ul['MaxEmployees'] ? -1 : fv.maxEmployees,
        MaxBranches: ul['MaxBranches'] ? -1 : fv.maxBranches,
        MaxUsers: ul['MaxUsers'] ? -1 : fv.maxUsers,
        StorageGb: ul['StorageGb'] ? -1 : fv.storageGb
      },
      isPublic: fv.isPublic,
      isActive: fv.isActive,
      sortOrder: fv.sortOrder
    };

    this.tenantService.createSubscriptionPlan(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.notificationService.success('Success', 'Subscription plan created successfully');
        this.router.navigate(['/subscription-plans']);
      },
      error: (error) => {
        this.submitting.set(false);
        console.error('Failed to create plan:', error);
        const message = error?.error?.error || 'Failed to create subscription plan';
        this.notificationService.error('Error', message);
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

    if (control.errors['required']) return 'This field is required';
    if (control.errors['min']) return `Minimum value is ${control.errors['min'].min}`;
    if (control.errors['maxlength']) return `Maximum ${control.errors['maxlength'].requiredLength} characters`;
    if (control.errors['pattern']) return 'Only lowercase letters, numbers, and hyphens allowed';
    return 'Invalid value';
  }
}
