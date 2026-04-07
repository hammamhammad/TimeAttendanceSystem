import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TenantService } from '../services/tenant.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-create-tenant',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormHeaderComponent,
    FormSectionComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './create-tenant.component.html',
  styleUrls: ['./create-tenant.component.css']
})
export class CreateTenantComponent {
  public i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private tenantService = inject(TenantService);
  private notificationService = inject(NotificationService);

  submitting = signal(false);

  form: FormGroup = this.fb.group({
    subdomain: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-z0-9-]+$/)]],
    name: ['', [Validators.required, Validators.maxLength(200)]],
    nameAr: ['', [Validators.maxLength(200)]],
    apiBaseUrl: ['', [Validators.required, Validators.maxLength(500)]],
    customDomain: ['', [Validators.maxLength(500)]],
    companyRegistrationNumber: ['', [Validators.maxLength(100)]],
    taxIdentificationNumber: ['', [Validators.maxLength(100)]],
    industry: ['', [Validators.maxLength(100)]],
    country: ['', [Validators.maxLength(100)]],
    city: ['', [Validators.maxLength(100)]],
    address: ['', [Validators.maxLength(500)]],
    phone: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.email, Validators.maxLength(200)]],
    website: ['', [Validators.maxLength(500)]],
    defaultTimezone: ['Asia/Riyadh', [Validators.required]],
    defaultLanguage: ['en', [Validators.required]],
    defaultCurrency: ['SAR', [Validators.required]]
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
        this.notificationService.success('Success', 'Tenant created successfully');
        this.router.navigate(['/tenants', response.id]);
      },
      error: (error) => {
        this.submitting.set(false);
        console.error('Failed to create tenant:', error);
        const message = error?.error?.message || 'Failed to create tenant';
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
    if (control.errors['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} characters`;
    if (control.errors['maxlength']) return `Maximum ${control.errors['maxlength'].requiredLength} characters`;
    if (control.errors['email']) return 'Invalid email address';
    if (control.errors['pattern']) return 'Only lowercase letters, numbers, and hyphens allowed';
    return 'Invalid value';
  }
}
