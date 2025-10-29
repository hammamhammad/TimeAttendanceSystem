import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AuthService } from '../../../core/auth/auth.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

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
    LoadingSpinnerComponent
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit, OnDestroy {
  private readonly portalService = inject(PortalService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  readonly i18n = inject(I18nService);

  // State from service
  profile = this.portalService.myProfile;
  loading = this.portalService.myProfileLoading;
  error = this.portalService.myProfileError;

  // Current user
  currentUser = computed(() => this.authService.currentUser());

  // Edit mode
  isEditMode = signal<boolean>(false);

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
          { label: 'Username', value: prof.userName || '-', icon: 'fa-user' },
          { label: 'Email', value: prof.email || '-', icon: 'fa-envelope' },
          { label: 'Phone', value: prof.phoneNumber || '-', icon: 'fa-phone' },
          { label: 'Display Name', value: prof.displayName || '-', icon: 'fa-id-card' }
        ]
      },
      {
        section: 'Employee Information',
        fields: [
          { label: 'Employee Code', value: prof.employeeInfo?.employeeCode || '-', icon: 'fa-id-badge' },
          { label: 'Full Name', value: prof.employeeInfo?.fullName || '-', icon: 'fa-user-circle' },
          { label: 'Department', value: prof.employeeInfo?.department || '-', icon: 'fa-building' },
          { label: 'Branch', value: prof.employeeInfo?.branch || '-', icon: 'fa-map-marker-alt' },
          { label: 'Position', value: prof.employeeInfo?.position || '-', icon: 'fa-briefcase' },
          { label: 'Hire Date', value: prof.employeeInfo?.hireDate ? this.formatDate(prof.employeeInfo.hireDate) : '-', icon: 'fa-calendar' }
        ]
      },
      {
        section: 'Account Information',
        fields: [
          { label: 'Status', value: prof.isActive ? 'Active' : 'Inactive', icon: 'fa-circle', badgeClass: prof.isActive ? 'badge bg-success' : 'badge bg-danger' },
          { label: 'Roles', value: prof.roles?.join(', ') || '-', icon: 'fa-shield-alt' },
          { label: 'Created', value: this.formatDate(prof.createdAtUtc), icon: 'fa-clock' },
          { label: 'Last Login', value: prof.lastLoginAtUtc ? this.formatDate(prof.lastLoginAtUtc) : 'Never', icon: 'fa-sign-in-alt' }
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

  saveProfile(): void {
    if (this.editForm.valid) {
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
    // Navigate to change password page
    this.router.navigate(['/auth/change-password']);
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
