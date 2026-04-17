import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { CompanyConfigurationService } from '../services/company-configuration.service';
import { CompanySettingsDto } from '../services/company-configuration.models';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-mobile-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, FormSectionComponent, LoadingSpinnerComponent],
  template: `
    @if (loading()) {
      <app-loading-spinner />
    } @else if (settings(); as s) {
      <div class="app-modern-form">
        <app-form-section [title]="t('tenant_configuration.mobile.title')" icon="fa-solid fa-mobile-screen" variant="modern">
          <div class="row g-3">
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="mobileCheckInEnabled"
                       [ngModel]="s.mobileCheckInEnabled" (ngModelChange)="s.mobileCheckInEnabled = $event">
                <label class="form-check-label" for="mobileCheckInEnabled">{{ t('tenant_configuration.mobile.check_in_enabled') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="requireNfcForMobile"
                       [ngModel]="s.requireNfcForMobile" (ngModelChange)="s.requireNfcForMobile = $event">
                <label class="form-check-label" for="requireNfcForMobile">{{ t('tenant_configuration.mobile.require_nfc') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="requireGpsForMobile"
                       [ngModel]="s.requireGpsForMobile" (ngModelChange)="s.requireGpsForMobile = $event">
                <label class="form-check-label" for="requireGpsForMobile">{{ t('tenant_configuration.mobile.require_gps') }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="allowMockLocation"
                       [ngModel]="s.allowMockLocation" (ngModelChange)="s.allowMockLocation = $event">
                <label class="form-check-label" for="allowMockLocation">{{ t('tenant_configuration.mobile.allow_mock_location') }}</label>
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
export class MobileSettingsComponent implements OnInit {
  private configService = inject(CompanyConfigurationService);
  private notificationService = inject(NotificationService);
  i18n = inject(I18nService);

  loading = signal(true);
  saving = signal(false);
  settings = signal<CompanySettingsDto | null>(null);

  t(key: string): string { return this.i18n.t(key); }

  ngOnInit(): void { this.loadSettings(); }

  loadSettings(): void {
    this.loading.set(true);
    this.configService.getCompanySettings().subscribe({
      next: (data) => { this.settings.set(data); this.loading.set(false); },
      error: () => { this.notificationService.error(this.t('common.error_loading')); this.loading.set(false); }
    });
  }

  save(): void {
    this.saving.set(true);
    this.configService.updateCompanySettings(this.settings()!).subscribe({
      next: () => { this.notificationService.success(this.t('tenant_configuration.saved')); this.saving.set(false); },
      error: () => { this.notificationService.error(this.t('common.error_loading')); this.saving.set(false); }
    });
  }
}
