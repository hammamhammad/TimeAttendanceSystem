import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AuthService } from '../../../core/auth/auth.service';
import { PortalService } from '../services/portal.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
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
        section: 'Personal Information',
        fields: [
          { label: 'Username', value: prof.userName || '-', icon: 'bi-person' },
          { label: 'Email', value: prof.email || '-', icon: 'bi-envelope' },
          { label: 'Phone', value: prof.phoneNumber || '-', icon: 'bi-telephone' },
          { label: 'Display Name', value: prof.displayName || '-', icon: 'bi-person-badge' }
        ]
      },
      {
        section: 'Employee Information',
        fields: [
          { label: 'Employee Code', value: prof.employeeInfo?.employeeCode || '-', icon: 'bi-person-vcard' },
          { label: 'Full Name', value: prof.employeeInfo?.fullName || '-', icon: 'bi-person-circle' },
          { label: 'Department', value: prof.employeeInfo?.department || '-', icon: 'bi-building' },
          { label: 'Branch', value: prof.employeeInfo?.branch || '-', icon: 'bi-geo-alt' },
          { label: 'Position', value: prof.employeeInfo?.position || '-', icon: 'bi-briefcase' },
          { label: 'Hire Date', value: prof.employeeInfo?.hireDate ? this.formatDate(prof.employeeInfo.hireDate) : '-', icon: 'bi-calendar' }
        ]
      },
      {
        section: 'Account Information',
        fields: [
          { label: 'Status', value: prof.isActive ? 'Active' : 'Inactive', icon: 'bi-circle-fill', badgeClass: prof.isActive ? 'badge bg-success' : 'badge bg-danger' },
          { label: 'Roles', value: prof.roles?.join(', ') || '-', icon: 'bi-shield' },
          { label: 'Created', value: this.formatDate(prof.createdAtUtc), icon: 'bi-clock' },
          { label: 'Last Login', value: prof.lastLoginAtUtc ? this.formatDate(prof.lastLoginAtUtc) : 'Never', icon: 'bi-box-arrow-in-right' }
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
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getFieldError(fieldName: string): string {
    const control = this.editForm.get(fieldName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }
}
