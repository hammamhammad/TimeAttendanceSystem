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
  selector: 'app-leave-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, FormSectionComponent, LoadingSpinnerComponent],
  template: `
    @if (loading()) {
      <app-loading-spinner />
    } @else if (settings(); as s) {
      <div class="app-modern-form">
        <app-form-section [title]="t('tenant_configuration.leave.title')" icon="fa-solid fa-calendar-minus" variant="modern">
          <div class="row g-3">
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="allowNegativeLeaveBalance"
                       [ngModel]="s.allowNegativeLeaveBalance" (ngModelChange)="s.allowNegativeLeaveBalance = $event">
                <label class="form-check-label" for="allowNegativeLeaveBalance">{{ t('tenant_configuration.leave.allow_negative_balance') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="requireAttachmentForSickLeave"
                       [ngModel]="s.requireAttachmentForSickLeave" (ngModelChange)="s.requireAttachmentForSickLeave = $event">
                <label class="form-check-label" for="requireAttachmentForSickLeave">{{ t('tenant_configuration.leave.require_attachment_sick') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="allowHalfDayLeave"
                       [ngModel]="s.allowHalfDayLeave" (ngModelChange)="s.allowHalfDayLeave = $event">
                <label class="form-check-label" for="allowHalfDayLeave">{{ t('tenant_configuration.leave.allow_half_day') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="allowLeaveEncashment"
                       [ngModel]="s.allowLeaveEncashment" (ngModelChange)="s.allowLeaveEncashment = $event">
                <label class="form-check-label" for="allowLeaveEncashment">{{ t('tenant_configuration.leave.allow_encashment') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="minDaysBeforeLeaveRequest" placeholder="1"
                       [ngModel]="s.minDaysBeforeLeaveRequest" (ngModelChange)="s.minDaysBeforeLeaveRequest = $event">
                <label for="minDaysBeforeLeaveRequest">{{ t('tenant_configuration.leave.min_days_notice') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="text" class="form-control" id="leaveYearStart" placeholder="01-01"
                       [ngModel]="s.leaveYearStart" (ngModelChange)="s.leaveYearStart = $event">
                <label for="leaveYearStart">{{ t('tenant_configuration.leave.year_start') }}</label>
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
export class LeaveSettingsComponent implements OnInit {
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
