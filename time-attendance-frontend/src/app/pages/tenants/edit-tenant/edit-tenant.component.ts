import { Component, OnInit, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TenantService } from '../services/tenant.service';
import { TenantDetailDto } from '../models/tenant.model';
import { NotificationService } from '../../../core/notifications/notification.service';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { FileUploadComponent, FileUploadedEvent } from '../../../shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-edit-tenant',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormHeaderComponent,
    FormSectionComponent,
    LoadingSpinnerComponent,
    FileUploadComponent
  ],
  templateUrl: './edit-tenant.component.html',
  styleUrls: ['./edit-tenant.component.css']
})
export class EditTenantComponent implements OnInit {
  public i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private tenantService = inject(TenantService);
  private notificationService = inject(NotificationService);

  loading = signal(true);
  submitting = signal(false);
  tenant = signal<TenantDetailDto | null>(null);
  tenantId = 0;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    nameAr: ['', [Validators.maxLength(200)]],
    logoUrl: ['', [Validators.maxLength(500)]],
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tenantId = parseInt(id, 10);
      this.loadTenant();
    } else {
      this.loading.set(false);
      this.notificationService.error('Error', 'Invalid tenant ID');
      this.router.navigate(['/tenants']);
    }
  }

  loadTenant(): void {
    this.tenantService.getTenantById(this.tenantId).subscribe({
      next: (tenant) => {
        this.tenant.set(tenant);
        this.form.patchValue({
          name: tenant.name,
          nameAr: tenant.nameAr || '',
          logoUrl: tenant.logoUrl || '',
          companyRegistrationNumber: tenant.companyRegistrationNumber || '',
          taxIdentificationNumber: tenant.taxIdentificationNumber || '',
          industry: tenant.industry || '',
          country: tenant.country || '',
          city: tenant.city || '',
          address: tenant.address || '',
          phone: tenant.phone || '',
          email: tenant.email || '',
          website: tenant.website || '',
          defaultTimezone: tenant.defaultTimezone,
          defaultLanguage: tenant.defaultLanguage,
          defaultCurrency: tenant.defaultCurrency
        });
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load tenant:', error);
        this.loading.set(false);
        this.notificationService.error('Error', 'Failed to load tenant');
        this.router.navigate(['/tenants']);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const formValue = this.form.value;

    this.tenantService.updateTenant(this.tenantId, formValue).subscribe({
      next: () => {
        this.submitting.set(false);
        this.notificationService.success('Success', 'Tenant updated successfully');
        this.router.navigate(['/tenants', this.tenantId]);
      },
      error: (error) => {
        this.submitting.set(false);
        console.error('Failed to update tenant:', error);
        const message = error?.error?.message || 'Failed to update tenant';
        this.notificationService.error('Error', message);
      }
    });
  }

  onLogoUploaded(event: FileUploadedEvent): void {
    this.form.patchValue({ logoUrl: event.fileUrl });
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
    return 'Invalid value';
  }
}
