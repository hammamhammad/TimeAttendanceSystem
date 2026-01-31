import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NfcTagsService } from '../nfc-tags.service';
import { BranchesService } from '../../branches/branches.service';
import { NfcTag } from '../../../shared/models/nfc-tag.model';
import { Branch } from '../../../shared/models/branch.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-nfc-tag-form',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent
  ],
  template: `
    <div class="container-fluid">
      <app-page-header
        [title]="isEditMode() ? i18n.t('nfc_tags.edit_tag') : i18n.t('nfc_tags.register_tag')"
        [showBackButton]="true"
        backRoute="/nfc-tags">
      </app-page-header>

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <app-loading-spinner [message]="i18n.t('common.loading')" [centered]="true"></app-loading-spinner>
        </div>
      } @else {
        <div class="row">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">
                  <i class="fa-solid fa-tag me-2"></i>
                  {{ i18n.t('nfc_tags.tag_information') }}
                </h5>
              </div>
              <div class="card-body">
                <form [formGroup]="tagForm" (ngSubmit)="onSubmit()">
                  @if (error()) {
                    <div class="alert alert-danger">
                      <i class="fa-solid fa-exclamation-triangle me-2"></i>
                      {{ error() }}
                    </div>
                  }

                  <!-- Tag UID -->
                  <div class="mb-3">
                    <label class="form-label">
                      {{ i18n.t('nfc_tags.tag_uid') }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="tagUid"
                      [class.is-invalid]="isFieldInvalid('tagUid')"
                      [placeholder]="i18n.t('nfc_tags.tag_uid_placeholder')"
                      [readonly]="isEditMode()"
                    />
                    @if (isFieldInvalid('tagUid')) {
                      <div class="invalid-feedback">{{ getFieldError('tagUid') }}</div>
                    }
                    <div class="form-text">{{ i18n.t('nfc_tags.tag_uid_hint') }}</div>
                  </div>

                  <!-- Branch -->
                  <div class="mb-3">
                    <label class="form-label">
                      {{ i18n.t('common.branch') }}
                      <span class="text-danger">*</span>
                    </label>
                    <select
                      class="form-select"
                      formControlName="branchId"
                      [class.is-invalid]="isFieldInvalid('branchId')"
                    >
                      <option value="">{{ i18n.t('nfc_tags.select_branch') }}</option>
                      @for (branch of branches(); track branch.id) {
                        <option [value]="branch.id">{{ branch.name }}</option>
                      }
                    </select>
                    @if (isFieldInvalid('branchId')) {
                      <div class="invalid-feedback">{{ getFieldError('branchId') }}</div>
                    }
                    <div class="form-text">{{ i18n.t('nfc_tags.branch_hint') }}</div>
                  </div>

                  <!-- Description -->
                  <div class="mb-3">
                    <label class="form-label">{{ i18n.t('common.description') }}</label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="description"
                      [placeholder]="i18n.t('nfc_tags.description_placeholder')"
                    />
                    <div class="form-text">{{ i18n.t('nfc_tags.description_hint') }}</div>
                  </div>

                  <!-- Is Active (only in edit mode) -->
                  @if (isEditMode()) {
                    <div class="mb-3">
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="isActive"
                          formControlName="isActive"
                        />
                        <label class="form-check-label" for="isActive">
                          {{ i18n.t('common.active') }}
                        </label>
                      </div>
                      <div class="form-text">{{ i18n.t('nfc_tags.active_hint') }}</div>
                    </div>
                  }

                  <!-- Lock Warning -->
                  @if (isEditMode() && existingTag()?.isWriteProtected) {
                    <div class="alert alert-warning">
                      <i class="fa-solid fa-lock me-2"></i>
                      {{ i18n.t('nfc_tags.tag_is_locked') }}
                    </div>
                  }

                  <!-- Form Actions -->
                  <div class="d-flex justify-content-end gap-2 mt-4">
                    <button type="button" class="btn btn-outline-secondary" routerLink="/nfc-tags" [disabled]="saving()">
                      <i class="fa-solid fa-times me-2"></i>
                      {{ i18n.t('common.cancel') }}
                    </button>
                    <button type="submit" class="btn btn-primary" [disabled]="tagForm.invalid || saving()">
                      @if (saving()) {
                        <span class="spinner-border spinner-border-sm me-2"></span>
                      } @else {
                        <i class="fa-solid fa-save me-2"></i>
                      }
                      {{ saving() ? i18n.t('common.saving') : i18n.t('common.save') }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Sidebar with Help -->
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <h6 class="card-title mb-0">
                  <i class="fa-solid fa-info-circle me-2"></i>
                  {{ i18n.t('nfc_tags.help_title') }}
                </h6>
              </div>
              <div class="card-body">
                <p class="text-muted small">{{ i18n.t('nfc_tags.help_text_1') }}</p>
                <p class="text-muted small">{{ i18n.t('nfc_tags.help_text_2') }}</p>
                <p class="text-muted small mb-0">
                  <i class="fa-solid fa-exclamation-triangle text-warning me-1"></i>
                  {{ i18n.t('nfc_tags.help_text_3') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class NfcTagFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private nfcTagsService = inject(NfcTagsService);
  private branchesService = inject(BranchesService);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  // State
  loading = signal(true);
  saving = signal(false);
  error = signal('');
  branches = signal<Branch[]>([]);
  existingTag = signal<NfcTag | null>(null);

  // Form
  tagForm!: FormGroup;

  // Computed
  isEditMode = computed(() => !!this.existingTag());
  tagId: number | null = null;

  ngOnInit(): void {
    this.initForm();
    this.loadBranches();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.tagId = parseInt(idParam);
      this.loadTag(this.tagId);
    } else {
      this.loading.set(false);
    }
  }

  initForm(): void {
    this.tagForm = this.fb.group({
      tagUid: ['', [Validators.required, Validators.minLength(4)]],
      branchId: ['', Validators.required],
      description: [''],
      isActive: [true]
    });
  }

  loadBranches(): void {
    this.branchesService.getBranchesForDropdown().subscribe({
      next: (branches) => this.branches.set(branches),
      error: () => this.notificationService.error(this.i18n.t('errors.loading_branches'))
    });
  }

  loadTag(id: number): void {
    this.nfcTagsService.getNfcTagById(id).subscribe({
      next: (tag) => {
        this.existingTag.set(tag);
        this.tagForm.patchValue({
          tagUid: tag.tagUid,
          branchId: tag.branchId.toString(),
          description: tag.description || '',
          isActive: tag.isActive
        });
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.i18n.t('nfc_tags.tag_not_found'));
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.tagForm.invalid) {
      this.tagForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set('');

    const formValue = this.tagForm.value;

    if (this.isEditMode()) {
      this.nfcTagsService.updateNfcTag(this.tagId!, {
        branchId: parseInt(formValue.branchId),
        description: formValue.description || undefined,
        isActive: formValue.isActive
      }).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('nfc_tags.update_success'));
          this.router.navigate(['/nfc-tags', this.tagId, 'view']);
        },
        error: (err) => {
          this.saving.set(false);
          this.error.set(err.error?.error || this.i18n.t('nfc_tags.update_error'));
        }
      });
    } else {
      this.nfcTagsService.createNfcTag({
        tagUid: formValue.tagUid,
        branchId: parseInt(formValue.branchId),
        description: formValue.description || undefined
      }).subscribe({
        next: (response) => {
          this.notificationService.success(this.i18n.t('nfc_tags.create_success'));
          this.router.navigate(['/nfc-tags', response.id, 'view']);
        },
        error: (err) => {
          this.saving.set(false);
          this.error.set(err.error?.error || this.i18n.t('nfc_tags.create_error'));
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.tagForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.tagForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return this.i18n.t('validation.required');
      if (field.errors['minlength']) return this.i18n.t('validation.minlength', { min: field.errors['minlength'].requiredLength });
    }
    return '';
  }
}
