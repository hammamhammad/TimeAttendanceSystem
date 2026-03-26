import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AuthService } from '../../../core/auth/auth.service';
import { PortalService } from '../services/portal.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { ChangePasswordModalComponent } from './change-password-modal.component';

/**
 * My Profile Component
 * Allows employees to view and edit their profile information
 */
@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    ChangePasswordModalComponent
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit, OnDestroy {
  private readonly portalService = inject(PortalService);
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  // State from service
  profile = this.portalService.myProfile;
  loading = this.portalService.myProfileLoading;
  error = this.portalService.myProfileError;

  // Current user
  currentUser = computed(() => this.authService.currentUser());

  // Status badge for active/inactive display
  statusBadge = computed(() => ({
    label: this.profile()?.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
    variant: (this.profile()?.isActive ? 'success' : 'danger') as StatusVariant
  }));

  // Edit mode
  isEditMode = signal<boolean>(false);

  // Change password modal
  showChangePasswordModal = signal<boolean>(false);

  // Edit form
  editForm!: FormGroup;

  // Profile display fields
  displayFields = computed(() => {
    const prof = this.profile();
    if (!prof) return [];

    return [
      {
        section: this.i18n.t('portal.profile.personal_information'),
        fields: [
          { label: this.i18n.t('portal.profile.username'), value: prof.userName || '-', icon: 'bi-person' },
          { label: this.i18n.t('portal.profile.email'), value: prof.email || '-', icon: 'bi-envelope' },
          { label: this.i18n.t('portal.profile.phone'), value: prof.phoneNumber || '-', icon: 'bi-telephone' },
          { label: this.i18n.t('portal.profile.display_name'), value: prof.displayName || '-', icon: 'bi-person-badge' }
        ]
      },
      {
        section: this.i18n.t('portal.profile.employee_information'),
        fields: [
          { label: this.i18n.t('portal.profile.employee_code'), value: prof.employeeInfo?.employeeCode || '-', icon: 'bi-person-vcard' },
          { label: this.i18n.t('portal.profile.full_name'), value: prof.employeeInfo?.fullName || '-', icon: 'bi-person-circle' },
          { label: this.i18n.t('portal.profile.department'), value: prof.employeeInfo?.department || '-', icon: 'bi-building' },
          { label: this.i18n.t('portal.profile.branch'), value: prof.employeeInfo?.branch || '-', icon: 'bi-geo-alt' },
          { label: this.i18n.t('portal.profile.position'), value: prof.employeeInfo?.position || '-', icon: 'bi-briefcase' },
          { label: this.i18n.t('portal.profile.hire_date'), value: prof.employeeInfo?.hireDate ? this.formatDate(prof.employeeInfo.hireDate) : '-', icon: 'bi-calendar' }
        ]
      },
      {
        section: this.i18n.t('portal.profile.account_information'),
        fields: [
          { label: this.i18n.t('portal.profile.status'), value: prof.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'), icon: 'bi-circle-fill', isStatus: true },
          { label: this.i18n.t('portal.profile.roles'), value: prof.roles?.join(', ') || '-', icon: 'bi-shield' },
          { label: this.i18n.t('portal.profile.created'), value: this.formatDate(prof.createdAtUtc), icon: 'bi-clock' },
          { label: this.i18n.t('portal.profile.last_login'), value: prof.lastLoginAtUtc ? this.formatDate(prof.lastLoginAtUtc) : this.i18n.t('portal.profile.never'), icon: 'bi-box-arrow-in-right' }
        ]
      }
    ];
  });

  ngOnInit(): void {
    this.initializeForm();
    this.loadProfile();
  }

  ngOnDestroy(): void {
    this.portalService.clearMyProfile();
  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      phoneNumber: [''],
      email: ['', [Validators.email]],
      displayName: [''],
      address: [''],
      emergencyContact: [''],
      emergencyPhone: ['']
    });
  }

  loadProfile(): void {
    this.portalService.loadMyProfile().subscribe({
      next: () => {
        // Populate form with current values
        const prof = this.profile();
        if (prof) {
          this.editForm.patchValue({
            phoneNumber: prof.phoneNumber || '',
            email: prof.email || '',
            displayName: prof.displayName || '',
            address: prof.employeeInfo?.address || '',
            emergencyContact: prof.employeeInfo?.emergencyContact || '',
            emergencyPhone: prof.employeeInfo?.emergencyPhone || ''
          });
        }
      },
      error: (error) => {
        console.error('Failed to load profile:', error);
      }
    });
  }

  refresh(): void {
    this.loadProfile();
  }

  toggleEditMode(): void {
    if (this.isEditMode()) {
      // Cancel edit
      this.isEditMode.set(false);
      // Reset form
      this.loadProfile();
    } else {
      // Enter edit mode
      this.isEditMode.set(true);
    }
  }

  async saveProfile(): Promise<void> {
    if (this.editForm.valid) {
      // Show confirmation dialog before saving
      const result = await this.confirmationService.confirmSave(
        this.i18n.t('common.confirm_save_changes')
      );

      if (!result.confirmed) {
        return;
      }

      const formValue = this.editForm.value;

      this.portalService.updateMyProfile(formValue).subscribe({
        next: () => {
          this.isEditMode.set(false);
        },
        error: (error) => {
          console.error('Failed to update profile:', error);
        }
      });
    } else {
      // Mark all as touched to show validation errors
      Object.keys(this.editForm.controls).forEach(key => {
        this.editForm.get(key)?.markAsTouched();
      });
    }
  }

  changePassword(): void {
    // Open change password modal
    this.showChangePasswordModal.set(true);
  }

  onChangePasswordModalClosed(): void {
    this.showChangePasswordModal.set(false);
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getFieldError(fieldName: string): string {
    const control = this.editForm.get(fieldName);
    if (control?.hasError('required')) {
      return this.i18n.t('portal.profile.field_required');
    }
    if (control?.hasError('email')) {
      return this.i18n.t('portal.profile.invalid_email');
    }
    return '';
  }
}
