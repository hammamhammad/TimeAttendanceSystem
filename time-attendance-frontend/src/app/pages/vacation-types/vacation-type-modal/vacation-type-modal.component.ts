import { Component, Input, Output, EventEmitter, signal, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { VacationTypesService } from '../vacation-types.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import {
  VacationTypeFormData,
  CreateVacationTypeRequest,
  UpdateVacationTypeRequest,
  VacationTypeDetailDto
} from '../../../shared/models/vacation-type.model';

interface Branch {
  id: number;
  name: string;
}

@Component({
  selector: 'app-vacation-type-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Modal -->
    <div class="modal fade" [class.show]="isOpen()" [style.display]="isOpen() ? 'block' : 'none'"
         tabindex="-1" role="dialog" aria-labelledby="vacationTypeModalLabel" aria-hidden="true"
         [class.d-block]="isOpen()">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="vacationTypeModalLabel">
              {{ isView ? i18n.t('vacation_types.view_details') : (isEdit ? i18n.t('vacation_types.edit_vacation_type') : i18n.t('vacation_types.create_vacation_type')) }}
            </h5>
            <button type="button" class="btn-close" (click)="onCancel()" [disabled]="loading()"></button>
          </div>

          <div class="modal-body">
            @if (isView) {
              <!-- View Mode - Read-only display -->
              <div class="vacation-type-details">
                <div class="row">
                  <!-- Branch -->
                  <div class="col-md-12 mb-3">
                    <label class="form-label fw-bold">{{ i18n.t('vacation_types.branch') }}</label>
                    <p class="form-control-plaintext">{{ getBranchName() || i18n.t('vacation_types.all_branches') }}</p>
                  </div>

                  <!-- Name -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold">{{ i18n.t('vacation_types.name') }}</label>
                    <p class="form-control-plaintext">{{ vacationType?.name }}</p>
                  </div>

                  <!-- Arabic Name -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold">{{ i18n.t('vacation_types.name_ar') }}</label>
                    <p class="form-control-plaintext" dir="rtl">{{ vacationType?.nameAr || i18n.t('common.not_specified') }}</p>
                  </div>

                  <!-- Status -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold">{{ i18n.t('vacation_types.column_status') }}</label>
                    <p class="form-control-plaintext">
                      <span
                        class="badge"
                        [class]="vacationType?.isActive ? 'bg-success' : 'bg-secondary'"
                      >
                        {{ vacationType?.isActive ? i18n.t('common.active') : i18n.t('common.inactive') }}
                      </span>
                    </p>
                  </div>

                  <!-- Created At -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold">{{ i18n.t('vacation_types.created_at') }}</label>
                    <p class="form-control-plaintext">{{ vacationType?.createdAtUtc | date:'medium' }}</p>
                  </div>
                </div>
              </div>
            } @else {
              <!-- Edit/Create Mode - Form -->
              <form [formGroup]="form" (ngSubmit)="onSubmit()" class="vacation-type-form">
                <div class="row">
                  <!-- Branch Selection -->
                  <div class="col-md-12 mb-3">
                    <label class="form-label">{{ i18n.t('vacation_types.branch') }}</label>
                    <select
                      class="form-select"
                      formControlName="branchId"
                      [class.is-invalid]="hasFieldError('branchId')"
                    >
                      <option value="">{{ i18n.t('vacation_types.all_branches') }}</option>
                      @for (branch of availableBranches(); track branch.id) {
                        <option [value]="branch.id">{{ branch.name }}</option>
                      }
                    </select>
                    @if (hasFieldError('branchId')) {
                      <div class="invalid-feedback">
                        {{ getFieldError('branchId') }}
                      </div>
                    }
                  </div>

                  <!-- Name -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label required">{{ i18n.t('vacation_types.name') }}</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="name"
                      [class.is-invalid]="hasFieldError('name')"
                      [placeholder]="i18n.t('vacation_types.name_placeholder')"
                      maxlength="100"
                    />
                    @if (hasFieldError('name')) {
                      <div class="invalid-feedback">
                        {{ getFieldError('name') }}
                      </div>
                    }
                  </div>

                  <!-- Arabic Name -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label">{{ i18n.t('vacation_types.name_ar') }}</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="nameAr"
                      [class.is-invalid]="hasFieldError('nameAr')"
                      [placeholder]="i18n.t('vacation_types.name_ar_placeholder')"
                      maxlength="100"
                      dir="rtl"
                    />
                    @if (hasFieldError('nameAr')) {
                      <div class="invalid-feedback">
                        {{ getFieldError('nameAr') }}
                      </div>
                    }
                  </div>
                </div>
              </form>
            }
          </div>

          <div class="modal-footer">
            @if (isView) {
              <!-- View Mode - Only Close button -->
              <button
                type="button"
                class="btn btn-secondary"
                (click)="onCancel()"
              >
                {{ i18n.t('common.close') }}
              </button>
            } @else {
              <!-- Edit/Create Mode - Cancel and Save buttons -->
              <button
                type="button"
                class="btn btn-secondary"
                (click)="onCancel()"
                [disabled]="loading()"
              >
                {{ i18n.t('common.cancel') }}
              </button>

              <button
                type="button"
                class="btn btn-primary"
                (click)="onSubmit()"
                [disabled]="!isFormValid() || loading()"
              >
                @if (loading()) {
                  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                }
                {{ isEdit ? i18n.t('common.update') : i18n.t('common.create') }}
              </button>
            }
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->
    @if (isOpen()) {
      <div class="modal-backdrop fade show" (click)="onCancel()"></div>
    }
  `,
  styles: [`
    .modal {
      z-index: 1055;
    }
    .modal-backdrop {
      z-index: 1050;
    }
    .required::after {
      content: ' *';
      color: red;
    }
  `]
})
export class VacationTypeModalComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private vacationTypesService = inject(VacationTypesService);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  @Input() vacationType?: VacationTypeDetailDto;
  @Input() isEdit = false;
  @Input() isView = false;
  @Input() isOpen = signal(false);

  @Output() modalClose = new EventEmitter<void>();
  @Output() vacationTypeCreated = new EventEmitter<void>();
  @Output() vacationTypeUpdated = new EventEmitter<void>();

  // Form and state
  form!: FormGroup;
  availableBranches = signal<Branch[]>([]);
  loading = signal(false);
  formValid = signal(false);
  formDirty = signal(false);

  // Computed signals for form validation
  readonly isFormValid = computed(() => this.formValid());
  readonly isDirty = computed(() => this.formDirty());

  ngOnInit(): void {
    this.initializeForm();
    this.loadBranches();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  /**
   * Initialize the reactive form with validators
   */
  private initializeForm(): void {
    this.form = this.fb.group({
      branchId: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      nameAr: ['', [Validators.maxLength(100)]]
    });

    // Update signals when form changes
    this.formValid.set(this.form.valid);
    this.formDirty.set(this.form.dirty);

    this.form.statusChanges.subscribe(() => {
      this.formValid.set(this.form.valid);
    });

    this.form.valueChanges.subscribe(() => {
      this.formDirty.set(this.form.dirty);
    });

    // Populate form if editing
    if (this.isEdit && this.vacationType) {
      this.populateForm();
    }
  }

  /**
   * Populate form with existing vacation type data
   */
  private populateForm(): void {
    if (!this.vacationType) return;

    this.form.patchValue({
      branchId: this.vacationType.branchId,
      name: this.vacationType.name,
      nameAr: this.vacationType.nameAr
    });

    // Update signals after populating form
    this.formValid.set(this.form.valid);
    this.formDirty.set(this.form.dirty);
  }

  /**
   * Load available branches for the dropdown
   */
  private loadBranches(): void {
    this.vacationTypesService.getBranches().subscribe({
      next: (branches) => {
        this.availableBranches.set(branches);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
      }
    });
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const requestData = {
      branchId: formValue.branchId || null,
      name: formValue.name.trim(),
      nameAr: formValue.nameAr?.trim() || undefined
    };

    this.loading.set(true);

    if (this.isEdit && this.vacationType) {
      // Update existing vacation type
      this.vacationTypesService.updateVacationType(this.vacationType.id, requestData as UpdateVacationTypeRequest).subscribe({
        next: () => {
          this.loading.set(false);
          this.notificationService.success(this.i18n.t('vacation_types.success.updated'));
          this.vacationTypeUpdated.emit();
          this.closeModal();
        },
        error: (error) => {
          this.loading.set(false);
          console.error('Failed to update vacation type:', error);
          if (error.error?.error) {
            this.notificationService.error(error.error.error);
          } else {
            this.notificationService.error(this.i18n.t('vacation_types.errors.update_failed'));
          }
        }
      });
    } else {
      // Create new vacation type
      this.vacationTypesService.createVacationType(requestData as CreateVacationTypeRequest).subscribe({
        next: () => {
          this.loading.set(false);
          this.notificationService.success(this.i18n.t('vacation_types.success.created'));
          this.vacationTypeCreated.emit();
          this.closeModal();
        },
        error: (error) => {
          this.loading.set(false);
          console.error('Failed to create vacation type:', error);
          if (error.error?.error) {
            this.notificationService.error(error.error.error);
          } else {
            this.notificationService.error(this.i18n.t('vacation_types.errors.create_failed'));
          }
        }
      });
    }
  }

  /**
   * Handle modal close
   */
  onCancel(): void {
    this.isOpen.set(false);
    this.form.reset();
    this.initializeForm();
    this.formValid.set(this.form.valid);
    this.formDirty.set(this.form.dirty);
    this.modalClose.emit();
  }

  /**
   * Get field error message
   */
  getFieldError(fieldName: string): string | null {
    const field = this.form.get(fieldName);

    if (!field || !field.errors || !field.touched) {
      return null;
    }

    const errors = field.errors;

    if (errors['required']) {
      return this.i18n.t('validation.field_required');
    }

    if (errors['maxlength']) {
      return this.i18n.t('validation.max_length');
    }

    return this.i18n.t('validation.invalid_field');
  }

  /**
   * Check if field has error
   */
  hasFieldError(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.errors && field.touched);
  }

  /**
   * Open modal with vacation type data
   */
  openModal(vacationType?: VacationTypeDetailDto, mode: 'create' | 'edit' | 'view' = 'create'): void {
    this.vacationType = vacationType;
    this.isEdit = mode === 'edit';
    this.isView = mode === 'view';
    this.isOpen.set(true);

    if (!this.isView) {
      this.initializeForm();
    }
  }

  /**
   * Close modal
   */
  closeModal(): void {
    this.isOpen.set(false);
    if (!this.isView) {
      this.form.reset();
      this.initializeForm();
      this.formValid.set(this.form.valid);
      this.formDirty.set(this.form.dirty);
    }
    this.modalClose.emit();
  }

  /**
   * Get branch name by ID
   */
  getBranchName(): string | null {
    if (!this.vacationType?.branchId) return null;
    const branch = this.availableBranches().find(b => b.id === this.vacationType?.branchId);
    return branch?.name || null;
  }
}