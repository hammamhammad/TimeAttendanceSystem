import { Component, OnInit, signal, inject } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchesService } from '../branches.service';
import { Branch } from '../../../shared/models/branch.model';
import { I18nService } from '../../../core/i18n/i18n.service';
// import { TIMEZONE_LIST } from '../../../shared/constants/timezone.constants';

@Component({
  selector: 'app-edit-branch',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('branches.edit_branch') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/branches">{{ i18n.t('branches.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('branches.edit_branch') }}</li>
            </ol>
          </nav>
        </div>
        <button 
          type="button" 
          class="btn btn-outline-secondary"
          (click)="onCancel()"
          [disabled]="saving()">
          <i class="fa-solid fa-arrow-left me-2"></i>
          {{ i18n.t('common.back') }}
        </button>
      </div>

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>
          </div>
        </div>
      } @else if (branch()) {
        <!-- Main Form Card -->
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="fa-solid fa-building me-2"></i>
              {{ i18n.t('branches.branch_information') }}
            </h5>
          </div>
          <div class="card-body">
            <form [formGroup]="branchForm" (ngSubmit)="onSubmit()">
              @if (error()) {
                <div class="alert alert-danger" role="alert">
                  <i class="fa-solid fa-exclamation-triangle me-2"></i>
                  {{ error() }}
                </div>
              }

              <!-- Basic Information Section -->
              <div class="mb-4">
                <h6 class="text-primary mb-3">
                  <i class="fa-solid fa-info-circle me-2"></i>
                  {{ i18n.t('branches.basic_information') }}
                </h6>
                <div class="row g-3">
                  <!-- Branch Name -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('branches.name') }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="name"
                      [class.is-invalid]="isFieldInvalid('name')"
                      [placeholder]="i18n.t('branches.name_placeholder')"
                    />
                    @if (isFieldInvalid('name')) {
                      <div class="invalid-feedback">{{ getFieldError('name') }}</div>
                    }
                  </div>

                  <!-- Branch Code -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('branches.code') }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="code"
                      [class.is-invalid]="isFieldInvalid('code')"
                      [placeholder]="i18n.t('branches.code_placeholder')"
                      style="text-transform: uppercase;"
                    />
                    @if (isFieldInvalid('code')) {
                      <div class="invalid-feedback">{{ getFieldError('code') }}</div>
                    }
                    <div class="form-text">{{ i18n.t('branches.code_hint') }}</div>
                  </div>

                  <!-- Timezone -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('branches.timezone') }}
                      <span class="text-danger">*</span>
                    </label>
                    <select
                      class="form-select"
                      formControlName="timezone"
                      [class.is-invalid]="isFieldInvalid('timezone')"
                    >
                      <option value="">{{ i18n.t('branches.select_timezone') }}</option>
                      @for (timezone of timezones; track timezone.value) {
                        <option [value]="timezone.value">{{ timezone.label }}</option>
                      }
                    </select>
                    @if (isFieldInvalid('timezone')) {
                      <div class="invalid-feedback">{{ getFieldError('timezone') }}</div>
                    }
                  </div>

                  <!-- Status -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('common.status') }}</label>
                    <div class="form-check form-switch mt-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="isActiveSwitch"
                        formControlName="isActive"
                      />
                      <label class="form-check-label" for="isActiveSwitch">
                        {{ i18n.t('common.active') }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <hr>

              <!-- GPS Location Section (for Mobile Check-in) -->
              <div class="mb-4">
                <h6 class="text-success mb-3">
                  <i class="fa-solid fa-location-dot me-2"></i>
                  {{ i18n.t('branches.gps_settings') }}
                </h6>
                <div class="alert alert-info mb-3">
                  <i class="fa-solid fa-info-circle me-2"></i>
                  {{ i18n.t('branches.gps_settings_hint') }}
                </div>
                <div class="row g-3">
                  <!-- Latitude -->
                  <div class="col-md-4">
                    <label class="form-label">
                      {{ i18n.t('branches.latitude') }}
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      class="form-control"
                      formControlName="latitude"
                      [class.is-invalid]="isFieldInvalid('latitude')"
                      placeholder="-90 to 90"
                    />
                    @if (isFieldInvalid('latitude')) {
                      <div class="invalid-feedback">{{ getFieldError('latitude') }}</div>
                    }
                    <div class="form-text">{{ i18n.t('branches.latitude_hint') }}</div>
                  </div>

                  <!-- Longitude -->
                  <div class="col-md-4">
                    <label class="form-label">
                      {{ i18n.t('branches.longitude') }}
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      class="form-control"
                      formControlName="longitude"
                      [class.is-invalid]="isFieldInvalid('longitude')"
                      placeholder="-180 to 180"
                    />
                    @if (isFieldInvalid('longitude')) {
                      <div class="invalid-feedback">{{ getFieldError('longitude') }}</div>
                    }
                    <div class="form-text">{{ i18n.t('branches.longitude_hint') }}</div>
                  </div>

                  <!-- Geofence Radius -->
                  <div class="col-md-4">
                    <label class="form-label">
                      {{ i18n.t('branches.geofence_radius') }}
                    </label>
                    <div class="input-group">
                      <input
                        type="number"
                        min="10"
                        max="1000"
                        class="form-control"
                        formControlName="geofenceRadiusMeters"
                        [class.is-invalid]="isFieldInvalid('geofenceRadiusMeters')"
                      />
                      <span class="input-group-text">{{ i18n.t('common.meters') }}</span>
                    </div>
                    @if (isFieldInvalid('geofenceRadiusMeters')) {
                      <div class="invalid-feedback d-block">{{ getFieldError('geofenceRadiusMeters') }}</div>
                    }
                    <div class="form-text">{{ i18n.t('branches.geofence_radius_hint') }}</div>
                  </div>
                </div>
              </div>

              <hr>

              <!-- Contact Information Section -->
              <div class="mb-4">
                <h6 class="text-secondary mb-3">
                  <i class="fa-solid fa-address-book me-2"></i>
                  {{ i18n.t('branches.contact_information') }}
                </h6>
                <div class="row g-3">
                  <!-- Phone -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('common.phone') }}</label>
                    <input
                      type="tel"
                      class="form-control"
                      formControlName="phone"
                      [class.is-invalid]="isFieldInvalid('phone')"
                      [placeholder]="i18n.t('common.phone_placeholder')"
                    />
                    @if (isFieldInvalid('phone')) {
                      <div class="invalid-feedback">{{ getFieldError('phone') }}</div>
                    }
                  </div>

                  <!-- Email -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('common.email') }}</label>
                    <input
                      type="email"
                      class="form-control"
                      formControlName="email"
                      [class.is-invalid]="isFieldInvalid('email')"
                      [placeholder]="i18n.t('common.email_placeholder')"
                    />
                    @if (isFieldInvalid('email')) {
                      <div class="invalid-feedback">{{ getFieldError('email') }}</div>
                    }
                  </div>

                  <!-- Address -->
                  <div class="col-12">
                    <label class="form-label">{{ i18n.t('branches.address') }}</label>
                    <textarea
                      class="form-control"
                      formControlName="address"
                      [class.is-invalid]="isFieldInvalid('address')"
                      [placeholder]="i18n.t('branches.address_placeholder')"
                      rows="3"
                    ></textarea>
                    @if (isFieldInvalid('address')) {
                      <div class="invalid-feedback">{{ getFieldError('address') }}</div>
                    }
                  </div>

                  <!-- Description -->
                  <div class="col-12">
                    <label class="form-label">{{ i18n.t('common.description') }}</label>
                    <textarea
                      class="form-control"
                      formControlName="description"
                      [class.is-invalid]="isFieldInvalid('description')"
                      [placeholder]="i18n.t('branches.description_placeholder')"
                      rows="3"
                    ></textarea>
                    @if (isFieldInvalid('description')) {
                      <div class="invalid-feedback">{{ getFieldError('description') }}</div>
                    }
                  </div>
                </div>
              </div>

              <!-- Validation Info -->
              <div class="alert alert-info">
                <h6 class="alert-heading">
                  <i class="fa-solid fa-info-circle me-2"></i>
                  {{ i18n.t('branches.validation_rules.title') }}
                </h6>
                <ul class="mb-0">
                  <li>{{ i18n.t('branches.validation_rules.name') }}</li>
                  <li>{{ i18n.t('branches.validation_rules.code') }}</li>
                  <li>{{ i18n.t('branches.validation_rules.timezone') }}</li>
                  <li>{{ i18n.t('branches.validation_rules.email') }}</li>
                  <li>{{ i18n.t('branches.validation_rules.phone') }}</li>
                </ul>
              </div>

              <!-- Form Actions -->
              <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-outline-secondary" (click)="onCancel()" [disabled]="saving()">
                  <i class="fa-solid fa-times me-2"></i>
                  {{ i18n.t('common.cancel') }}
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary" 
                  [disabled]="branchForm.invalid || saving()"
                >
                  @if (saving()) {
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  } @else {
                    <i class="fa-solid fa-save me-2"></i>
                  }
                  {{ saving() ? i18n.t('common.saving') : i18n.t('branches.update_branch') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('branches.branch_not_found') }}
        </div>
      }
    </div>
  `
})
export class EditBranchComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private branchesService = inject(BranchesService);
  private fb = inject(FormBuilder);
  public i18n = inject(I18nService);

  branch = signal<Branch | null>(null);
  loading = signal(true);
  saving = signal(false);
  error = signal('');
  timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'America/Chicago', label: 'Central Time' },
    { value: 'America/Denver', label: 'Mountain Time' },
    { value: 'America/Los_Angeles', label: 'Pacific Time' },
    { value: 'Europe/London', label: 'London' },
    { value: 'Europe/Paris', label: 'Paris' },
    { value: 'Asia/Tokyo', label: 'Tokyo' },
    { value: 'Asia/Dubai', label: 'Dubai' }
  ];

  branchForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
    
    const branchId = this.route.snapshot.paramMap.get('id');
    if (branchId) {
      this.loadBranch(branchId);
    } else {
      this.error.set('Invalid branch ID');
      this.loading.set(false);
    }
  }

  initializeForm(): void {
    this.branchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required, Validators.minLength(2)]],
      timezone: ['', Validators.required],
      phone: [''],
      email: ['', Validators.email],
      address: [''],
      description: [''],
      isActive: [true],
      // GPS Coordinates
      latitude: [null, [Validators.min(-90), Validators.max(90)]],
      longitude: [null, [Validators.min(-180), Validators.max(180)]],
      geofenceRadiusMeters: [100, [Validators.required, Validators.min(10), Validators.max(1000)]]
    });
  }

  loadBranch(branchId: string): void {
    this.branchesService.getBranchById(parseInt(branchId)).subscribe({
      next: (branch) => {
        this.branch.set(branch);
        this.populateForm(branch);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.getErrorMessage(err));
        this.loading.set(false);
      }
    });
  }

  populateForm(branch: Branch): void {
    this.branchForm.patchValue({
      name: branch.name,
      code: branch.code,
      timezone: branch.timeZone,
      phone: '',
      email: '',
      address: '',
      description: '',
      isActive: branch.isActive,
      // GPS Coordinates
      latitude: branch.latitude,
      longitude: branch.longitude,
      geofenceRadiusMeters: branch.geofenceRadiusMeters || 100
    });
  }

  onSubmit(): void {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set('');

    const formValue = this.branchForm.value;
    const branchId = this.branch()!.id;

    const updateRequest = {
      name: formValue.name,
      code: formValue.code.toUpperCase(),
      timeZone: formValue.timezone,
      isActive: formValue.isActive
    };

    const coordinatesRequest = {
      latitude: formValue.latitude,
      longitude: formValue.longitude,
      geofenceRadiusMeters: formValue.geofenceRadiusMeters
    };

    // Update branch info first, then coordinates
    this.branchesService.updateBranch(branchId, updateRequest).subscribe({
      next: () => {
        // Now update coordinates
        this.branchesService.updateBranchCoordinates(branchId, coordinatesRequest).subscribe({
          next: () => {
            this.saving.set(false);
            this.router.navigate(['/branches', branchId, 'view']);
          },
          error: (err) => {
            this.saving.set(false);
            this.error.set(this.getErrorMessage(err));
          }
        });
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(this.getErrorMessage(err));
      }
    });
  }

  onCancel(): void {
    if (this.branch()) {
      this.router.navigate(['/branches', this.branch()!.id, 'view']);
    } else {
      this.router.navigate(['/branches']);
    }
  }

  // Form field helpers
  getFieldError(fieldName: string): string {
    const field = this.branchForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return this.i18n.t('validation.required');
      }
      if (field.errors['email']) {
        return this.i18n.t('validation.email');
      }
      if (field.errors['minlength']) {
        return this.i18n.t('validation.minlength').replace('{{min}}', field.errors['minlength'].requiredLength);
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.branchForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }

  private getErrorMessage(error: any): string {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t('errors.unknown');
  }
}