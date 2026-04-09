import { Component, signal, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchesService } from '../branches.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { LocationPickerComponent } from '../../../shared/components/location-picker/location-picker.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { TIMEZONE_OPTIONS } from '../../../shared/constants/timezone.constants';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';

@Component({
  selector: 'app-create-branch',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    LocationPickerComponent,
    SearchableSelectComponent,
    PageHeaderComponent,
    FormSectionComponent
  ],
  template: `
    <div class="container-fluid app-modern-form">
      <app-page-header
        [title]="i18n.t('branches.create_branch')"
        [showBackButton]="true"
        backRoute="/branches">
      </app-page-header>

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
            <app-form-section
              [title]="i18n.t('branches.basic_information')"
              icon="fa-solid fa-info-circle"
              variant="modern">
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="text"
                      id="code"
                      class="form-control"
                      formControlName="code"
                      [class.is-invalid]="isFieldInvalid('code')"
                      placeholder="{{ i18n.t('branches.code') }}"
                      style="text-transform: uppercase;">
                    <label for="code">{{ i18n.t('branches.code') }} <span class="text-danger">*</span></label>
                  </div>
                  @if (isFieldInvalid('code')) {
                    <div class="invalid-feedback d-block">{{ getFieldError('code') }}</div>
                  }
                  <div class="form-text">{{ i18n.t('branches.code_hint') }}</div>
                </div>

                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="text"
                      id="name"
                      class="form-control"
                      formControlName="name"
                      [class.is-invalid]="isFieldInvalid('name')"
                      placeholder="{{ i18n.t('branches.name') }}">
                    <label for="name">{{ i18n.t('branches.name') }} <span class="text-danger">*</span></label>
                  </div>
                  @if (isFieldInvalid('name')) {
                    <div class="invalid-feedback d-block">{{ getFieldError('name') }}</div>
                  }
                </div>

                <div class="col-md-6">
                  <div class="app-modern-field">
                    <label class="app-modern-label">{{ i18n.t('branches.timezone') }} <span class="text-danger">*</span></label>
                    <app-searchable-select
                      [options]="timezoneOptions"
                      [value]="branchForm.get('timeZone')?.value || ''"
                      (selectionChange)="onTimezoneChange($event)"
                      [placeholder]="i18n.t('branches.select_timezone')"
                      [searchable]="true"
                      [clearable]="false">
                    </app-searchable-select>
                  </div>
                  @if (branchForm.get('timeZone')?.invalid && branchForm.get('timeZone')?.touched) {
                    <div class="invalid-feedback d-block">{{ i18n.t('validation.required') }}</div>
                  }
                </div>

                <div class="col-md-6">
                  <label class="form-label">{{ i18n.t('common.status') }}</label>
                  <div class="form-check form-switch mt-2">
                    <input class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="isActive"
                      formControlName="isActive">
                    <label class="form-check-label" for="isActive">{{ i18n.t('common.active') }}</label>
                  </div>
                </div>
              </div>
            </app-form-section>

            <!-- GPS Location Section -->
            <app-form-section
              [title]="i18n.t('branches.gps_settings')"
              icon="fa-solid fa-location-dot"
              variant="modern">
              <div class="alert alert-info mb-3">
                <i class="fa-solid fa-info-circle me-2"></i>
                {{ i18n.t('branches.gps_settings_hint') }}
              </div>
              <div class="mb-3">
                <app-location-picker
                  [latitude]="branchForm.get('latitude')?.value"
                  [longitude]="branchForm.get('longitude')?.value"
                  [radiusMeters]="branchForm.get('geofenceRadiusMeters')?.value || 100"
                  [height]="'350px'"
                  [placeholder]="i18n.t('branches.map_click_hint')"
                  (locationChange)="onLocationChange($event)">
                </app-location-picker>
              </div>
              <div class="row g-3">
                <div class="col-md-4">
                  <div class="form-floating">
                    <input type="number"
                      id="latitude"
                      class="form-control"
                      formControlName="latitude"
                      [class.is-invalid]="isFieldInvalid('latitude')"
                      placeholder="{{ i18n.t('branches.latitude') }}"
                      step="0.000001">
                    <label for="latitude">{{ i18n.t('branches.latitude') }}</label>
                  </div>
                  @if (isFieldInvalid('latitude')) {
                    <div class="invalid-feedback d-block">{{ getFieldError('latitude') }}</div>
                  }
                  <div class="form-text">{{ i18n.t('branches.latitude_hint') }}</div>
                </div>

                <div class="col-md-4">
                  <div class="form-floating">
                    <input type="number"
                      id="longitude"
                      class="form-control"
                      formControlName="longitude"
                      [class.is-invalid]="isFieldInvalid('longitude')"
                      placeholder="{{ i18n.t('branches.longitude') }}"
                      step="0.000001">
                    <label for="longitude">{{ i18n.t('branches.longitude') }}</label>
                  </div>
                  @if (isFieldInvalid('longitude')) {
                    <div class="invalid-feedback d-block">{{ getFieldError('longitude') }}</div>
                  }
                  <div class="form-text">{{ i18n.t('branches.longitude_hint') }}</div>
                </div>

                <div class="col-md-4">
                  <div class="form-floating">
                    <input type="number"
                      id="geofenceRadiusMeters"
                      class="form-control"
                      formControlName="geofenceRadiusMeters"
                      [class.is-invalid]="isFieldInvalid('geofenceRadiusMeters')"
                      placeholder="{{ i18n.t('branches.geofence_radius') }}"
                      min="10"
                      max="5000">
                    <label for="geofenceRadiusMeters">{{ i18n.t('branches.geofence_radius') }} ({{ i18n.t('common.meters') }})</label>
                  </div>
                  @if (isFieldInvalid('geofenceRadiusMeters')) {
                    <div class="invalid-feedback d-block">{{ getFieldError('geofenceRadiusMeters') }}</div>
                  }
                  <div class="form-text">{{ i18n.t('branches.geofence_radius_hint') }}</div>
                </div>
              </div>
            </app-form-section>

            <!-- Contact Information Section -->
            <app-form-section
              [title]="i18n.t('branches.contact_information')"
              icon="fa-solid fa-address-book"
              variant="modern">
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="tel"
                      id="phone"
                      class="form-control"
                      formControlName="phone"
                      [class.is-invalid]="isFieldInvalid('phone')"
                      placeholder="{{ i18n.t('common.phone') }}">
                    <label for="phone">{{ i18n.t('common.phone') }}</label>
                  </div>
                  @if (isFieldInvalid('phone')) {
                    <div class="invalid-feedback d-block">{{ getFieldError('phone') }}</div>
                  }
                </div>

                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="email"
                      id="email"
                      class="form-control"
                      formControlName="email"
                      [class.is-invalid]="isFieldInvalid('email')"
                      placeholder="{{ i18n.t('common.email') }}">
                    <label for="email">{{ i18n.t('common.email') }}</label>
                  </div>
                  @if (isFieldInvalid('email')) {
                    <div class="invalid-feedback d-block">{{ getFieldError('email') }}</div>
                  }
                </div>

                <div class="col-12">
                  <div class="form-floating">
                    <textarea
                      id="address"
                      class="form-control"
                      formControlName="address"
                      [class.is-invalid]="isFieldInvalid('address')"
                      placeholder="{{ i18n.t('branches.address') }}"
                      style="height: 80px"></textarea>
                    <label for="address">{{ i18n.t('branches.address') }}</label>
                  </div>
                  @if (isFieldInvalid('address')) {
                    <div class="invalid-feedback d-block">{{ getFieldError('address') }}</div>
                  }
                </div>

                <div class="col-12">
                  <div class="form-floating">
                    <textarea
                      id="description"
                      class="form-control"
                      formControlName="description"
                      [class.is-invalid]="isFieldInvalid('description')"
                      placeholder="{{ i18n.t('common.description') }}"
                      style="height: 80px"></textarea>
                    <label for="description">{{ i18n.t('common.description') }}</label>
                  </div>
                  @if (isFieldInvalid('description')) {
                    <div class="invalid-feedback d-block">{{ getFieldError('description') }}</div>
                  }
                </div>
              </div>
            </app-form-section>

            <!-- Form Actions -->
            <div class="app-form-actions">
              <button type="button" class="btn btn-secondary" (click)="onCancel()" [disabled]="saving()">
                <i class="fa-solid fa-times me-2"></i>
                {{ i18n.t('common.cancel') }}
              </button>
              <button type="submit" class="btn btn-primary" [disabled]="branchForm.invalid || saving()">
                @if (saving()) {
                  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                } @else {
                  <i class="fa-solid fa-save me-2"></i>
                }
                {{ saving() ? i18n.t('common.saving') : i18n.t('branches.create_branch') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class CreateBranchComponent {
  private router = inject(Router);
  private branchesService = inject(BranchesService);
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  saving = signal(false);
  error = signal('');

  timezoneOptions: SearchableSelectOption[] = TIMEZONE_OPTIONS.map(tz => ({
    value: tz.value,
    label: tz.label,
    subLabel: tz.offset
  }));

  branchForm: FormGroup;

  constructor() {
    this.branchForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      timeZone: ['', Validators.required],
      isActive: [true],
      latitude: [null, [Validators.min(-90), Validators.max(90)]],
      longitude: [null, [Validators.min(-180), Validators.max(180)]],
      geofenceRadiusMeters: [100, [Validators.min(10), Validators.max(5000)]],
      phone: [''],
      email: ['', Validators.email],
      address: [''],
      description: ['']
    });
  }

  onTimezoneChange(timezone: string): void {
    this.branchForm.patchValue({ timeZone: timezone });
  }

  onLocationChange(event: { latitude: number; longitude: number }): void {
    this.branchForm.patchValue({
      latitude: event.latitude,
      longitude: event.longitude
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
    const request = {
      code: formValue.code.trim().toUpperCase(),
      name: formValue.name.trim(),
      timeZone: formValue.timeZone,
      isActive: formValue.isActive,
      latitude: formValue.latitude || null,
      longitude: formValue.longitude || null,
      geofenceRadiusMeters: formValue.geofenceRadiusMeters || 100
    };

    this.branchesService.createBranch(request).subscribe({
      next: () => {
        this.saving.set(false);
        this.notificationService.success(
          this.i18n.t('app.success'),
          this.i18n.t('branches.branch_created')
        );
        this.router.navigate(['/branches']);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(this.getErrorMessage(err));
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/branches']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.branchForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.branchForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return this.i18n.t('validation.required');
      if (field.errors['email']) return this.i18n.t('validation.email');
      if (field.errors['minlength']) return this.i18n.t('validation.minlength').replace('{{min}}', field.errors['minlength'].requiredLength);
      if (field.errors['maxlength']) return this.i18n.t('validation.maxlength').replace('{{max}}', field.errors['maxlength'].requiredLength);
      if (field.errors['min']) return this.i18n.t('validation.min').replace('{{min}}', field.errors['min'].min);
      if (field.errors['max']) return this.i18n.t('validation.max').replace('{{max}}', field.errors['max'].max);
    }
    return '';
  }

  private getErrorMessage(error: any): string {
    if (error?.error?.error) return error.error.error;
    if (error?.error?.message) return error.error.message;
    return this.i18n.t('errors.unknown');
  }
}
