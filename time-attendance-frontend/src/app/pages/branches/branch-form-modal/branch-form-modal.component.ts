import { Component, Input, Output, EventEmitter, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Branch, CreateBranchRequest, UpdateBranchRequest } from '../../../shared/models/branch.model';
import { TIMEZONE_OPTIONS } from '../../../shared/constants/timezone.constants';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-branch-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SearchableSelectComponent],
  template: `
    <!-- Modal -->
    <div class="modal fade show"
         [style.display]="show ? 'block' : 'none'"
         [class.d-block]="show"
         tabindex="-1"
         role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-building me-2"></i>
              {{ editMode ? 'Edit Branch' : 'Create Branch' }}
            </h5>
            <button type="button" class="btn-close" (click)="onClose()"></button>
          </div>

          <form [formGroup]="branchForm" (ngSubmit)="onSubmit()">
            <div class="modal-body">
              <!-- Branch Code -->
              <div class="mb-3">
                <label for="code" class="form-label">Branch Code *</label>
                <input type="text"
                       id="code"
                       class="form-control"
                       formControlName="code"
                       [class.is-invalid]="branchForm.get('code')?.invalid && branchForm.get('code')?.touched"
                       placeholder="Enter branch code">
                <div class="invalid-feedback" *ngIf="branchForm.get('code')?.invalid && branchForm.get('code')?.touched">
                  <div *ngIf="branchForm.get('code')?.errors?.['required']">Branch code is required.</div>
                  <div *ngIf="branchForm.get('code')?.errors?.['minlength']">Branch code must be at least 2 characters.</div>
                  <div *ngIf="branchForm.get('code')?.errors?.['maxlength']">Branch code cannot exceed 10 characters.</div>
                </div>
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
                <div class="invalid-feedback" *ngIf="branchForm.get('name')?.invalid && branchForm.get('name')?.touched">
                  <div *ngIf="branchForm.get('name')?.errors?.['required']">Branch name is required.</div>
                  <div *ngIf="branchForm.get('name')?.errors?.['minlength']">Branch name must be at least 2 characters.</div>
                  <div *ngIf="branchForm.get('name')?.errors?.['maxlength']">Branch name cannot exceed 100 characters.</div>
                </div>
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
                <div class="invalid-feedback d-block" *ngIf="branchForm.get('timeZone')?.invalid && branchForm.get('timeZone')?.touched">
                  Timezone is required.
                </div>
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
            </div>

            <div class="modal-footer">
              <button type="button"
                      class="btn btn-secondary"
                      (click)="onClose()"
                      [disabled]="submitting()">
                Cancel
              </button>
              <button type="submit"
                      class="btn btn-primary"
                      [disabled]="branchForm.invalid || submitting()">
                <span *ngIf="submitting()" class="spinner-border spinner-border-sm me-2"></span>
                <i *ngIf="!submitting()" class="fas fa-save me-2"></i>
                {{ submitting() ? 'Saving...' : (editMode ? 'Update Branch' : 'Create Branch') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div class="modal-backdrop fade show" *ngIf="show" (click)="onClose()"></div>
  `,
  styles: [`
    .modal {
      z-index: 1055;
    }

    .modal-backdrop {
      z-index: 1050;
    }
  `]
})
export class BranchFormModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private i18n = inject(I18nService);

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
      isActive: [true]
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
        isActive: this.branch.isActive
      });
    }
  }

  private resetForm() {
    this.branchForm.reset({
      code: '',
      name: '',
      timeZone: 'UTC',
      isActive: true
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
      isActive: formValue.isActive
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