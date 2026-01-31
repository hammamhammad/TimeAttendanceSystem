import { Component, Input, Output, EventEmitter, signal, inject, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Branch, CreateBranchRequest, UpdateBranchRequest } from '../../../shared/models/branch.model';
import { TIMEZONE_OPTIONS } from '../../../shared/constants/timezone.constants';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'app-branch-form-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SearchableSelectComponent, ModalWrapperComponent],
  template: `
    <app-modal-wrapper
      [show]="show"
      [title]="(editMode ? 'Edit Branch' : 'Create Branch')"
      [centered]="true"
      [loading]="submitting()"
      (close)="onClose()">
    
      <form [formGroup]="branchForm" (ngSubmit)="onSubmit()">
        <!-- Branch Code -->
        <div class="mb-3">
          <label for="code" class="form-label">Branch Code *</label>
          <input type="text"
            id="code"
            class="form-control"
            formControlName="code"
            [class.is-invalid]="branchForm.get('code')?.invalid && branchForm.get('code')?.touched"
            placeholder="Enter branch code">
          @if (branchForm.get('code')?.invalid && branchForm.get('code')?.touched) {
            <div class="invalid-feedback">
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
          <label for="name" class="form-label">Branch Name *</label>
          <input type="text"
            id="name"
            class="form-control"
            formControlName="name"
            [class.is-invalid]="branchForm.get('name')?.invalid && branchForm.get('name')?.touched"
            placeholder="Enter branch name">
          @if (branchForm.get('name')?.invalid && branchForm.get('name')?.touched) {
            <div class="invalid-feedback">
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
          <label for="timeZone" class="form-label">Timezone *</label>
          <app-searchable-select
            [options]="timezoneOptions"
            [value]="branchForm.get('timeZone')?.value || ''"
            (selectionChange)="onTimezoneChange($event)"
            [placeholder]="'Select timezone'"
            [searchable]="true"
            [clearable]="false">
          </app-searchable-select>
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
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="latitude" class="form-label">{{ i18n.t('branches.latitude') }}</label>
                <input type="number"
                  id="latitude"
                  class="form-control"
                  formControlName="latitude"
                  [class.is-invalid]="branchForm.get('latitude')?.invalid && branchForm.get('latitude')?.touched"
                  placeholder="{{ i18n.t('branches.latitude_placeholder') }}"
                  step="0.000001">
                @if (branchForm.get('latitude')?.invalid && branchForm.get('latitude')?.touched) {
                  <div class="invalid-feedback">
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
                <label for="longitude" class="form-label">{{ i18n.t('branches.longitude') }}</label>
                <input type="number"
                  id="longitude"
                  class="form-control"
                  formControlName="longitude"
                  [class.is-invalid]="branchForm.get('longitude')?.invalid && branchForm.get('longitude')?.touched"
                  placeholder="{{ i18n.t('branches.longitude_placeholder') }}"
                  step="0.000001">
                @if (branchForm.get('longitude')?.invalid && branchForm.get('longitude')?.touched) {
                  <div class="invalid-feedback">
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
              <label for="geofenceRadiusMeters" class="form-label">{{ i18n.t('branches.geofence_radius') }}</label>
              <div class="input-group">
                <input type="number"
                  id="geofenceRadiusMeters"
                  class="form-control"
                  formControlName="geofenceRadiusMeters"
                  [class.is-invalid]="branchForm.get('geofenceRadiusMeters')?.invalid && branchForm.get('geofenceRadiusMeters')?.touched"
                  placeholder="{{ i18n.t('branches.geofence_radius_placeholder') }}"
                  min="10"
                  max="5000">
                <span class="input-group-text">{{ i18n.t('common.meters') }}</span>
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
              <div class="form-text">{{ i18n.t('branches.geofence_hint') }}</div>
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