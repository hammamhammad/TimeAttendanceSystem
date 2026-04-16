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
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="passwordMinLength" placeholder="8" min="8" max="128"
                       [ngModel]="s.passwordMinLength ?? 8" (ngModelChange)="s.passwordMinLength = $event">
                <label for="passwordMinLength">Password Min Length</label>
              </div>
            </div>
            <div class="col-12">
              <label class="form-label small text-muted mb-1">Login Lockout Policy (JSON array of {{ '{' }}attempts, minutes{{ '}' }})</label>
              <textarea class="form-control font-monospace" id="loginLockoutPolicyJson" rows="3"
                        placeholder='[{"attempts":5,"minutes":15},{"attempts":10,"minutes":60},{"attempts":15,"minutes":1440}]'
                        [ngModel]="s.loginLockoutPolicyJson ?? ''"
                        (ngModelChange)="s.loginLockoutPolicyJson = $event"></textarea>
              <small class="text-muted">Leave empty for default escalation (5→15m, 10→1h, 15→24h).</small>
            </div>
          </div>
        </app-form-section>

        <app-form-section title="Business Rule Thresholds" icon="fa-solid fa-sliders" variant="modern">
          <div class="row g-3">
            <div class="col-md-6">
              <div class="form-floating">
                <input type="text" class="form-control" id="contractExpiryAlertDaysCsv" placeholder="30,15,7"
                       [ngModel]="s.contractExpiryAlertDaysCsv ?? '30,15,7'"
                       (ngModelChange)="s.contractExpiryAlertDaysCsv = $event">
                <label for="contractExpiryAlertDaysCsv">Contract Expiry Alert Days (CSV)</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="text" class="form-control" id="visaExpiryAlertDaysCsv" placeholder="90,60,30,15,7"
                       [ngModel]="s.visaExpiryAlertDaysCsv ?? '90,60,30,15,7'"
                       (ngModelChange)="s.visaExpiryAlertDaysCsv = $event">
                <label for="visaExpiryAlertDaysCsv">Visa Expiry Alert Days (CSV)</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="text" class="form-control" id="reviewReminderDaysCsv" placeholder="7,3,1"
                       [ngModel]="s.reviewReminderDaysCsv ?? '7,3,1'"
                       (ngModelChange)="s.reviewReminderDaysCsv = $event">
                <label for="reviewReminderDaysCsv">Review Reminder Days (CSV)</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="loanRepaymentReminderDays" placeholder="7" min="1"
                       [ngModel]="s.loanRepaymentReminderDays ?? 7"
                       (ngModelChange)="s.loanRepaymentReminderDays = $event">
                <label for="loanRepaymentReminderDays">Loan Repayment Reminder Days</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="frozenWorkflowCleanupDays" placeholder="90" min="1"
                       [ngModel]="s.frozenWorkflowCleanupDays ?? 90"
                       (ngModelChange)="s.frozenWorkflowCleanupDays = $event">
                <label for="frozenWorkflowCleanupDays">Frozen Workflow Cleanup Days</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="defaultProbationDays" placeholder="90" min="0"
                       [ngModel]="s.defaultProbationDays ?? 90"
                       (ngModelChange)="s.defaultProbationDays = $event">
                <label for="defaultProbationDays">Default Probation Days</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="maxUploadSizeMb" placeholder="10" min="1" max="100"
                       [ngModel]="s.maxUploadSizeMb ?? 10"
                       (ngModelChange)="s.maxUploadSizeMb = $event">
                <label for="maxUploadSizeMb">Max Upload Size (MB)</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="maxVacationDaysPerRequest" placeholder="365" min="1"
                       [ngModel]="s.maxVacationDaysPerRequest ?? 365"
                       (ngModelChange)="s.maxVacationDaysPerRequest = $event">
                <label for="maxVacationDaysPerRequest">Max Vacation Days Per Request</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="maxVacationFuturePlanningYears" placeholder="2" min="1"
                       [ngModel]="s.maxVacationFuturePlanningYears ?? 2"
                       (ngModelChange)="s.maxVacationFuturePlanningYears = $event">
                <label for="maxVacationFuturePlanningYears">Max Vacation Future Planning (Years)</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="maxShiftGracePeriodMinutes" placeholder="120" min="0"
                       [ngModel]="s.maxShiftGracePeriodMinutes ?? 120"
                       (ngModelChange)="s.maxShiftGracePeriodMinutes = $event">
                <label for="maxShiftGracePeriodMinutes">Max Shift Grace Period (min)</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="excuseBackwardWindowDays" placeholder="365" min="0"
                       [ngModel]="s.excuseBackwardWindowDays ?? 365"
                       (ngModelChange)="s.excuseBackwardWindowDays = $event">
                <label for="excuseBackwardWindowDays">Excuse Backward Window (days)</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="excuseForwardWindowDays" placeholder="30" min="0"
                       [ngModel]="s.excuseForwardWindowDays ?? 30"
                       (ngModelChange)="s.excuseForwardWindowDays = $event">
                <label for="excuseForwardWindowDays">Excuse Forward Window (days)</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="overtimeConfigMaxFutureDays" placeholder="30" min="0"
                       [ngModel]="s.overtimeConfigMaxFutureDays ?? 30"
                       (ngModelChange)="s.overtimeConfigMaxFutureDays = $event">
                <label for="overtimeConfigMaxFutureDays">OT Config Max Future Days</label>
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
