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
  selector: 'app-notification-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, FormSectionComponent, LoadingSpinnerComponent],
  template: `
    @if (loading()) {
      <app-loading-spinner />
    } @else if (settings(); as s) {
      <div class="app-modern-form">
        <app-form-section [title]="t('tenant_configuration.notification.title')" icon="fa-solid fa-bell" variant="modern">
          <div class="row g-3">
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="enableEmailNotifications"
                       [ngModel]="s.enableEmailNotifications" (ngModelChange)="s.enableEmailNotifications = $event">
                <label class="form-check-label" for="enableEmailNotifications">{{ t('tenant_configuration.notification.email') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="enablePushNotifications"
                       [ngModel]="s.enablePushNotifications" (ngModelChange)="s.enablePushNotifications = $event">
                <label class="form-check-label" for="enablePushNotifications">{{ t('tenant_configuration.notification.push') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="enableSmsNotifications"
                       [ngModel]="s.enableSmsNotifications" (ngModelChange)="s.enableSmsNotifications = $event">
                <label class="form-check-label" for="enableSmsNotifications">{{ t('tenant_configuration.notification.sms') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="notifyManagerOnLeaveRequest"
                       [ngModel]="s.notifyManagerOnLeaveRequest" (ngModelChange)="s.notifyManagerOnLeaveRequest = $event">
                <label class="form-check-label" for="notifyManagerOnLeaveRequest">{{ t('tenant_configuration.notification.notify_manager_leave') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="notifyEmployeeOnApproval"
                       [ngModel]="s.notifyEmployeeOnApproval" (ngModelChange)="s.notifyEmployeeOnApproval = $event">
                <label class="form-check-label" for="notifyEmployeeOnApproval">{{ t('tenant_configuration.notification.notify_employee_approval') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="dailyAttendanceSummaryEnabled"
                       [ngModel]="s.dailyAttendanceSummaryEnabled" (ngModelChange)="s.dailyAttendanceSummaryEnabled = $event">
                <label class="form-check-label" for="dailyAttendanceSummaryEnabled">{{ t('tenant_configuration.notification.daily_summary') }}</label>
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
export class NotificationSettingsComponent implements OnInit {
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
