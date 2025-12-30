import { Component, signal, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { AuthService } from '../../../core/auth/auth.service';

/**
 * Change Password Modal Component
 * Modal dialog for voluntary password change from profile page
 */
@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Modal Backdrop -->
    @if (isOpen()) {
      <div class="modal-backdrop fade show" (click)="onClose()"></div>

      <!-- Modal Dialog -->
      <div class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h5 class="modal-title">
                <i class="bi bi-key me-2 text-primary"></i>
                {{ t('auth.change_password') }}
              </h5>
              <button type="button" class="btn-close" (click)="onClose()" [disabled]="loading()"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
              @if (error()) {
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <i class="bi bi-exclamation-triangle me-2"></i>
                  {{ error() }}
                  <button type="button" class="btn-close" (click)="error.set('')"></button>
                </div>
              }

              @if (success()) {
                <div class="alert alert-success" role="alert">
                  <i class="bi bi-check-circle me-2"></i>
                  {{ t('auth.password_changed_success') }}
                </div>
              } @else {
                <form [formGroup]="changePasswordForm" (ngSubmit)="onSubmit()">
                  <!-- Current Password -->
                  <div class="mb-3">
                    <label class="form-label">
                      {{ t('auth.current_password') }}
                      <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                      <input
                        [type]="showCurrentPassword() ? 'text' : 'password'"
                        class="form-control"
                        formControlName="currentPassword"
                        [class.is-invalid]="changePasswordForm.get('currentPassword')?.invalid && changePasswordForm.get('currentPassword')?.touched"
                        [placeholder]="t('auth.enter_current_password')"
                      />
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        (click)="showCurrentPassword.set(!showCurrentPassword())">
                        <i [class]="showCurrentPassword() ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                      </button>
                    </div>
                    @if (changePasswordForm.get('currentPassword')?.invalid && changePasswordForm.get('currentPassword')?.touched) {
                      <div class="invalid-feedback d-block">
                        {{ t('validations.required') }}
                      </div>
                    }
                  </div>

                  <!-- New Password -->
                  <div class="mb-3">
                    <label class="form-label">
                      {{ t('auth.new_password') }}
                      <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                      <input
                        [type]="showNewPassword() ? 'text' : 'password'"
                        class="form-control"
                        formControlName="newPassword"
                        [class.is-invalid]="changePasswordForm.get('newPassword')?.invalid && changePasswordForm.get('newPassword')?.touched"
                        [placeholder]="t('auth.enter_new_password')"
                      />
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        (click)="showNewPassword.set(!showNewPassword())">
                        <i [class]="showNewPassword() ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                      </button>
                    </div>
                    @if (changePasswordForm.get('newPassword')?.invalid && changePasswordForm.get('newPassword')?.touched) {
                      <div class="invalid-feedback d-block">
                        @if (changePasswordForm.get('newPassword')?.errors?.['required']) {
                          {{ t('validations.required') }}
                        } @else if (changePasswordForm.get('newPassword')?.errors?.['minlength']) {
                          {{ t('auth.password_requirements') }}
                        } @else if (changePasswordForm.get('newPassword')?.errors?.['pattern']) {
                          {{ t('auth.password_requirements') }}
                        }
                      </div>
                    }
                    <small class="form-text text-muted">
                      <i class="bi bi-info-circle me-1"></i>
                      {{ t('auth.password_requirements') }}
                    </small>
                  </div>

                  <!-- Confirm Password -->
                  <div class="mb-3">
                    <label class="form-label">
                      {{ t('auth.confirm_new_password') }}
                      <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                      <input
                        [type]="showConfirmPassword() ? 'text' : 'password'"
                        class="form-control"
                        formControlName="confirmPassword"
                        [class.is-invalid]="changePasswordForm.get('confirmPassword')?.invalid && changePasswordForm.get('confirmPassword')?.touched"
                        [placeholder]="t('auth.confirm_new_password')"
                      />
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        (click)="showConfirmPassword.set(!showConfirmPassword())">
                        <i [class]="showConfirmPassword() ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                      </button>
                    </div>
                    @if (changePasswordForm.get('confirmPassword')?.invalid && changePasswordForm.get('confirmPassword')?.touched) {
                      <div class="invalid-feedback d-block">
                        @if (changePasswordForm.get('confirmPassword')?.errors?.['required']) {
                          {{ t('validations.required') }}
                        } @else if (changePasswordForm.get('confirmPassword')?.errors?.['passwordMismatch']) {
                          {{ t('auth.passwords_dont_match') }}
                        }
                      </div>
                    }
                  </div>
                </form>
              }
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
              @if (success()) {
                <button type="button" class="btn btn-primary" (click)="onClose()">
                  <i class="bi bi-check me-1"></i>
                  {{ t('common.done') }}
                </button>
              } @else {
                <button type="button" class="btn btn-outline-secondary" (click)="onClose()" [disabled]="loading()">
                  {{ t('common.cancel') }}
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  (click)="onSubmit()"
                  [disabled]="loading() || changePasswordForm.invalid">
                  @if (loading()) {
                    <span class="spinner-border spinner-border-sm me-2"></span>
                  } @else {
                    <i class="bi bi-floppy me-1"></i>
                  }
                  {{ t('auth.change_password') }}
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      z-index: 1040;
    }
    .modal {
      z-index: 1050;
    }
  `]
})
export class ChangePasswordModalComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  @Input() isOpen = signal(false);
  @Output() closed = new EventEmitter<void>();

  changePasswordForm: FormGroup;
  loading = signal(false);
  error = signal('');
  success = signal(false);

  // Password visibility toggles
  showCurrentPassword = signal(false);
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);

  constructor() {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else if (confirmPassword && !confirmPassword.hasError('required')) {
      confirmPassword.setErrors(null);
    }

    return null;
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  onClose(): void {
    if (!this.loading()) {
      this.resetForm();
      this.closed.emit();
    }
  }

  resetForm(): void {
    this.changePasswordForm.reset();
    this.error.set('');
    this.success.set(false);
    this.showCurrentPassword.set(false);
    this.showNewPassword.set(false);
    this.showConfirmPassword.set(false);
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const request = {
      currentPassword: this.changePasswordForm.value.currentPassword,
      newPassword: this.changePasswordForm.value.newPassword,
      confirmNewPassword: this.changePasswordForm.value.confirmPassword
    };

    this.authService.changePassword(request)
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.success.set(true);
          this.notificationService.success(this.t('auth.password_changed_success'));
        },
        error: (error) => {
          this.loading.set(false);
          const errorMessage = error.error?.error || this.t('auth.password_change_failed');
          this.error.set(errorMessage);
        }
      });
  }
}
