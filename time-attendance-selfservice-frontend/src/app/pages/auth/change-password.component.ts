import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="card shadow-sm">
              <div class="card-body p-4">
                <div class="text-center mb-4">
                  <i class="fa-solid fa-key fa-3x text-warning mb-3"></i>
                  <h4 class="mb-2">{{ t('auth.change_password_required') }}</h4>
                  <p class="text-muted">{{ t('auth.change_password_message') }}</p>
                </div>

                <form [formGroup]="changePasswordForm" (ngSubmit)="onSubmit()">
                  @if (error()) {
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                      <i class="fa-solid fa-exclamation-triangle me-2"></i>
                      {{ error() }}
                      <button type="button" class="btn-close" (click)="error.set('')"></button>
                    </div>
                  }

                  <!-- Current Password -->
                  <div class="mb-3">
                    <label class="form-label">{{ t('auth.current_password') }} <span class="text-danger">*</span></label>
                    <input
                      type="password"
                      class="form-control"
                      formControlName="currentPassword"
                      [class.is-invalid]="changePasswordForm.get('currentPassword')?.invalid && changePasswordForm.get('currentPassword')?.touched"
                    />
                    @if (changePasswordForm.get('currentPassword')?.invalid && changePasswordForm.get('currentPassword')?.touched) {
                      <div class="invalid-feedback">
                        {{ t('validation.required_field') }}
                      </div>
                    }
                  </div>

                  <!-- New Password -->
                  <div class="mb-3">
                    <label class="form-label">{{ t('auth.new_password') }} <span class="text-danger">*</span></label>
                    <input
                      type="password"
                      class="form-control"
                      formControlName="newPassword"
                      [class.is-invalid]="changePasswordForm.get('newPassword')?.invalid && changePasswordForm.get('newPassword')?.touched"
                    />
                    @if (changePasswordForm.get('newPassword')?.invalid && changePasswordForm.get('newPassword')?.touched) {
                      <div class="invalid-feedback">
                        @if (changePasswordForm.get('newPassword')?.errors?.['required']) {
                          {{ t('validation.required_field') }}
                        }
                        @if (changePasswordForm.get('newPassword')?.errors?.['minlength']) {
                          {{ t('auth.password_min_length') }}
                        }
                        @if (changePasswordForm.get('newPassword')?.errors?.['pattern']) {
                          {{ t('auth.password_requirements') }}
                        }
                      </div>
                    }
                    <small class="form-text text-muted">
                      {{ t('auth.password_requirements') }}
                    </small>
                  </div>

                  <!-- Confirm Password -->
                  <div class="mb-4">
                    <label class="form-label">{{ t('auth.confirm_new_password') }} <span class="text-danger">*</span></label>
                    <input
                      type="password"
                      class="form-control"
                      formControlName="confirmPassword"
                      [class.is-invalid]="changePasswordForm.get('confirmPassword')?.invalid && changePasswordForm.get('confirmPassword')?.touched"
                    />
                    @if (changePasswordForm.get('confirmPassword')?.invalid && changePasswordForm.get('confirmPassword')?.touched) {
                      <div class="invalid-feedback">
                        @if (changePasswordForm.get('confirmPassword')?.errors?.['required']) {
                          {{ t('validation.required_field') }}
                        }
                        @if (changePasswordForm.get('confirmPassword')?.errors?.['passwordMismatch']) {
                          {{ t('auth.passwords_dont_match') }}
                        }
                      </div>
                    }
                  </div>

                  <!-- Submit Button -->
                  <button
                    type="submit"
                    class="btn btn-warning w-100"
                    [disabled]="loading() || changePasswordForm.invalid"
                  >
                    @if (loading()) {
                      <span class="spinner-border spinner-border-sm me-2"></span>
                    }
                    {{ t('auth.change_password') }}
                  </button>

                  <!-- Logout Option -->
                  <div class="text-center mt-3">
                    <button type="button" class="btn btn-link text-muted" (click)="onLogout()">
                      <i class="fa-solid fa-sign-out-alt me-2"></i>
                      {{ t('auth.logout') }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ChangePasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);

  changePasswordForm: FormGroup;
  loading = signal(false);
  error = signal('');

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

  async onSubmit(): Promise<void> {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    // Show confirmation dialog before changing password
    const result = await this.confirmationService.confirmSave(
      this.i18n.t('common.confirm_save_changes')
    );

    if (!result.confirmed) {
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
          this.notificationService.success(
            this.t('auth.password_changed_success'),
            'You can now continue using the system'
          );
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading.set(false);
          const errorMessage = error.error?.error || this.t('auth.password_change_failed');
          this.error.set(errorMessage);
          this.notificationService.error(
            this.t('auth.password_change_failed'),
            errorMessage
          );
        }
      });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
