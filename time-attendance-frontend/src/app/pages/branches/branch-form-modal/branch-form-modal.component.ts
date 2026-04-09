import { Component, Input, Output, EventEmitter, signal, inject, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Branch, CreateBranchRequest, UpdateBranchRequest } from '../../../shared/models/branch.model';
import { TIMEZONE_OPTIONS } from '../../../shared/constants/timezone.constants';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';
import { LocationPickerComponent } from '../../../shared/components/location-picker/location-picker.component';

@Component({
  selector: 'app-branch-form-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SearchableSelectComponent, ModalWrapperComponent, LocationPickerComponent],
  template: `
    <app-modal-wrapper
      [show]="show"
      [title]="(editMode ? 'Edit Branch' : 'Create Branch')"
      [centered]="true"
      [loading]="submitting()"
      (close)="onClose()">
    
      <form [formGroup]="branchForm" (ngSubmit)="onSubmit()" class="app-modern-form">
        <!-- Branch Code -->
        <div class="mb-3">
          <div class="form-floating">
            <input type="text"
              id="code"
              class="form-control"
              formControlName="code"
              [class.is-invalid]="branchForm.get('code')?.invalid && branchForm.get('code')?.touched"
              placeholder="Branch Code">
            <label for="code">Branch Code *</label>
          </div>
          @if (branchForm.get('code')?.invalid && branchForm.get('code')?.touched) {
            <div class="invalid-feedback d-block">
              @if (branchForm.get('code')?.errors?.['required']) {
                <div>Branch code is required.</div>
              }
              @if (branchForm.get('code')?.errors?.['minlength']) {
                <div>Branch code must be at least 2 characters.</div>
              }
              @if (branchForm.get('code')?.errors?.['maxlength']) {
                <div>Branch code cannot exceed 10 characters.</div>
              }
            </div>
          }
        </div>

        <!-- Branch Name -->
        <div class="mb-3">
          <div class="form-floating">
            <input type="text"
              id="name"
              class="form-control"
              formControlName="name"
              [class.is-invalid]="branchForm.get('name')?.invalid && branchForm.get('name')?.touched"
              placeholder="Branch Name">
            <label for="name">Branch Name *</label>
          </div>
          @if (branchForm.get('name')?.invalid && branchForm.get('name')?.touched) {
            <div class="invalid-feedback d-block">
              @if (branchForm.get('name')?.errors?.['required']) {
                <div>Branch name is required.</div>
              }
              @if (branchForm.get('name')?.errors?.['minlength']) {
                <div>Branch name must be at least 2 characters.</div>
              }
              @if (branchForm.get('name')?.errors?.['maxlength']) {
                <div>Branch name cannot exceed 100 characters.</div>
              }
            </div>
          }
        </div>

        <!-- Timezone -->
        <div class="mb-3">
          <div class="app-modern-field">
            <label class="app-modern-label">Timezone *</label>
            <app-searchable-select
              [options]="timezoneOptions"
              [value]="branchForm.get('timeZone')?.value || ''"
              (selectionChange)="onTimezoneChange($event)"
              [placeholder]="'Select timezone'"
              [searchable]="true"
              [clearable]="false">
            </app-searchable-select>
          </div>
          @if (branchForm.get('timeZone')?.invalid && branchForm.get('timeZone')?.touched) {
            <div class="invalid-feedback d-block">
              Timezone is required.
            </div>
          }
        </div>
    
        <!-- Status -->
        <div class="mb-3">
          <div class="form-check">
            <input class="form-check-input"
              type="checkbox"
              id="isActive"
              formControlName="isActive">
            <label class="form-check-label" for="isActive">
              Active
            </label>
          </div>
          <div class="form-text">Inactive branches will not be available for new employee assignments.</div>
        </div>

        <!-- GPS Location Settings -->
        <div class="card mb-3">
          <div class="card-header py-2">
            <h6 class="mb-0">
              <i class="fa-solid fa-location-dot me-2"></i>
              {{ i18n.t('branches.gps_settings') }}
            </h6>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <app-location-picker
                [latitude]="branchForm.get('latitude')?.value"
                [longitude]="branchForm.get('longitude')?.value"
                [radiusMeters]="branchForm.get('geofenceRadiusMeters')?.value || 100"
                [height]="'250px'"
                [placeholder]="i18n.t('branches.map_click_hint')"
                (locationChange)="onLocationChange($event)">
              </app-location-picker>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-floating">
                  <input type="number"
                    id="latitude"
                    class="form-control"
                    formControlName="latitude"
                    [class.is-invalid]="branchForm.get('latitude')?.invalid && branchForm.get('latitude')?.touched"
                    placeholder="{{ i18n.t('branches.latitude') }}"
                    step="0.000001">
                  <label for="latitude">{{ i18n.t('branches.latitude') }}</label>
                </div>
                @if (branchForm.get('latitude')?.invalid && branchForm.get('latitude')?.touched) {
                  <div class="invalid-feedback d-block">
                    @if (branchForm.get('latitude')?.errors?.['min']) {
                      <div>{{ i18n.t('branches.latitude_min_error') }}</div>
                    }
                    @if (branchForm.get('latitude')?.errors?.['max']) {
                      <div>{{ i18n.t('branches.latitude_max_error') }}</div>
                    }
                  </div>
                }
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-floating">
                  <input type="number"
                    id="longitude"
                    class="form-control"
                    formControlName="longitude"
                    [class.is-invalid]="branchForm.get('longitude')?.invalid && branchForm.get('longitude')?.touched"
                    placeholder="{{ i18n.t('branches.longitude') }}"
                    step="0.000001">
                  <label for="longitude">{{ i18n.t('branches.longitude') }}</label>
                </div>
                @if (branchForm.get('longitude')?.invalid && branchForm.get('longitude')?.touched) {
                  <div class="invalid-feedback d-block">
                    @if (branchForm.get('longitude')?.errors?.['min']) {
                      <div>{{ i18n.t('branches.longitude_min_error') }}</div>
                    }
                    @if (branchForm.get('longitude')?.errors?.['max']) {
                      <div>{{ i18n.t('branches.longitude_max_error') }}</div>
                    }
                  </div>
                }
              </div>
            </div>
            <div class="mb-0">
              <div class="form-floating">
                <input type="number"
                  id="geofenceRadiusMeters"
                  class="form-control"
                  formControlName="geofenceRadiusMeters"
                  [class.is-invalid]="branchForm.get('geofenceRadiusMeters')?.invalid && branchForm.get('geofenceRadiusMeters')?.touched"
                  placeholder="{{ i18n.t('branches.geofence_radius') }}"
                  min="10"
                  max="5000">
                <label for="geofenceRadiusMeters">{{ i18n.t('branches.geofence_radius') }} ({{ i18n.t('common.meters') }})</label>
              </div>
              @if (branchForm.get('geofenceRadiusMeters')?.invalid && branchForm.get('geofenceRadiusMeters')?.touched) {
                <div class="invalid-feedback d-block">
                  @if (branchForm.get('geofenceRadiusMeters')?.errors?.['min']) {
                    <div>{{ i18n.t('branches.geofence_min_error') }}</div>
                  }
                  @if (branchForm.get('geofenceRadiusMeters')?.errors?.['max']) {
                    <div>{{ i18n.t('branches.geofence_max_error') }}</div>
                  }
                </div>
              }
              <div class="form-text mt-2">{{ i18n.t('branches.geofence_hint') }}</div>
            </div>
          </div>
        </div>

        <!-- Footer Buttons -->
        <div modal-footer class="d-flex gap-2 justify-content-end">
          <button type="button"
            class="btn btn-secondary"
            (click)="onClose()"
            [disabled]="submitting()">
            Cancel
          </button>
          <button type="submit"
            class="btn btn-primary"
            [disabled]="branchForm.invalid || submitting()">
            @if (submitting()) {
              <span class="spinner-border spinner-border-sm me-2"></span>
            }
            @if (!submitting()) {
              <i class="fas fa-save me-2"></i>
            }
            {{ submitting() ? 'Saving...' : (editMode ? 'Update Branch' : 'Create Branch') }}
          </button>
        </div>
      </form>
    </app-modal-wrapper>
    `
})
export class BranchFormModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  public i18n = inject(I18nService);

  @Input() show = false;
  @Input() branch: Branch | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<CreateBranchRequest | UpdateBranchRequest>();

  submitting = signal(false);
  branchForm: FormGroup;

  timezoneOptions: SearchableSelectOption[] = TIMEZONE_OPTIONS.map(tz => ({
    value: tz.value,
    label: tz.label,
    subLabel: tz.offset
  }));

  get editMode(): boolean {
    return !!this.branch;
  }

  constructor() {
    this.branchForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      timeZone: ['', Validators.required],
      isActive: [true],
      latitude: [null, [Validators.min(-90), Validators.max(90)]],
      longitude: [null, [Validators.min(-180), Validators.max(180)]],
      geofenceRadiusMeters: [100, [Validators.min(10), Validators.max(5000)]]
    });
  }

  ngOnInit() {
    if (this.show && this.branch) {
      this.loadBranchData();
    }
  }

  ngOnChanges() {
    if (this.show) {
      if (this.branch) {
        this.loadBranchData();
      } else {
        this.resetForm();
      }
    }
  }

  private loadBranchData() {
    if (this.branch) {
      this.branchForm.patchValue({
        code: this.branch.code,
        name: this.branch.name,
        timeZone: this.branch.timeZone,
        isActive: this.branch.isActive,
        latitude: this.branch.latitude,
        longitude: this.branch.longitude,
        geofenceRadiusMeters: this.branch.geofenceRadiusMeters || 100
      });
    }
  }

  private resetForm() {
    this.branchForm.reset({
      code: '',
      name: '',
      timeZone: 'UTC',
      isActive: true,
      latitude: null,
      longitude: null,
      geofenceRadiusMeters: 100
    });
  }

  onTimezoneChange(timezone: string) {
    this.branchForm.patchValue({ timeZone: timezone });
  }

  onLocationChange(event: { latitude: number; longitude: number }) {
    this.branchForm.patchValue({
      latitude: event.latitude,
      longitude: event.longitude
    });
  }

  onSubmit() {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const formValue = this.branchForm.value;

    const branchData = {
      code: formValue.code.trim(),
      name: formValue.name.trim(),
      timeZone: formValue.timeZone,
      isActive: formValue.isActive,
      latitude: formValue.latitude || null,
      longitude: formValue.longitude || null,
      geofenceRadiusMeters: formValue.geofenceRadiusMeters || 100
    };

    this.save.emit(branchData);
  }

  onClose() {
    this.close.emit();
  }

  // Called from parent to reset submitting state
  resetSubmitting() {
    this.submitting.set(false);
  }
}