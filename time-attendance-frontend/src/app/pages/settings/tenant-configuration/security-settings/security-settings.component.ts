import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { TenantConfigurationService } from '../services/tenant-configuration.service';
import { TenantSettingsDto } from '../services/tenant-configuration.models';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-security-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, FormSectionComponent, LoadingSpinnerComponent],
  template: `
    @if (loading()) {
      <app-loading-spinner />
    } @else if (settings(); as s) {
      <div class="app-modern-form">
        <app-form-section [title]="t('tenant_configuration.security.title')" icon="fa-solid fa-shield-halved" variant="modern">
          <div class="row g-3">
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="passwordExpiryDays" placeholder="90"
                       [ngModel]="s.passwordExpiryDays" (ngModelChange)="s.passwordExpiryDays = $event">
                <label for="passwordExpiryDays">{{ t('tenant_configuration.security.password_expiry') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="maxLoginAttempts" placeholder="5"
                       [ngModel]="s.maxLoginAttempts" (ngModelChange)="s.maxLoginAttempts = $event">
                <label for="maxLoginAttempts">{{ t('tenant_configuration.security.max_login_attempts') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="sessionTimeoutMinutes" placeholder="30"
                       [ngModel]="s.sessionTimeoutMinutes" (ngModelChange)="s.sessionTimeoutMinutes = $event">
                <label for="sessionTimeoutMinutes">{{ t('tenant_configuration.security.session_timeout') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="passwordHistoryCount" placeholder="5"
                       [ngModel]="s.passwordHistoryCount" (ngModelChange)="s.passwordHistoryCount = $event">
                <label for="passwordHistoryCount">{{ t('tenant_configuration.security.password_history') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="require2FA"
                       [ngModel]="s.require2FA" (ngModelChange)="s.require2FA = $event">
                <label class="form-check-label" for="require2FA">{{ t('tenant_configuration.security.require_2fa') }}</label>
              </div>
            </div>
          </div>
        </app-form-section>

        <div class="app-form-actions">
          <button class="btn btn-primary" (click)="save()" [disabled]="saving()">
            @if (saving()) {
              <span class="spinner-border spinner-border-sm me-2"></span>
            }
            <i class="fa-solid fa-save me-1"></i>
            {{ t('common.save') }}
          </button>
        </div>
      </div>
    }
  `
})
export class SecuritySettingsComponent implements OnInit {
  private configService = inject(TenantConfigurationService);
  private notificationService = inject(NotificationService);
  i18n = inject(I18nService);

  loading = signal(true);
  saving = signal(false);
  settings = signal<TenantSettingsDto | null>(null);

  t(key: string): string { return this.i18n.t(key); }

  ngOnInit(): void { this.loadSettings(); }

  loadSettings(): void {
    this.loading.set(true);
    this.configService.getTenantSettings().subscribe({
      next: (data) => { this.settings.set(data); this.loading.set(false); },
      error: () => { this.notificationService.error(this.t('common.error_loading')); this.loading.set(false); }
    });
  }

  save(): void {
    this.saving.set(true);
    this.configService.updateTenantSettings(this.settings()!).subscribe({
      next: () => { this.notificationService.success(this.t('tenant_configuration.saved')); this.saving.set(false); },
      error: () => { this.notificationService.error(this.t('common.error_loading')); this.saving.set(false); }
    });
  }
}
