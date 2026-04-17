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
  selector: 'app-general-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, FormSectionComponent, LoadingSpinnerComponent],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.css'
})
export class GeneralSettingsComponent implements OnInit {
  private configService = inject(CompanyConfigurationService);
  private notificationService = inject(NotificationService);
  i18n = inject(I18nService);

  loading = signal(true);
  saving = signal(false);
  settings = signal<CompanySettingsDto | null>(null);

  // Form model
  fiscalYearStartMonth = signal('01');
  weekStartDay = signal('Sunday');
  dateFormat = signal('dd/MM/yyyy');
  timeFormat = signal('HH:mm');
  numberFormat = signal('en-US');

  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dateFormats = ['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd', 'dd-MM-yyyy'];
  timeFormats = ['HH:mm', 'hh:mm a'];
  months = ['01','02','03','04','05','06','07','08','09','10','11','12'];

  t(key: string): string {
    return this.i18n.t(key);
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.loading.set(true);
    this.configService.getCompanySettings().subscribe({
      next: (data) => {
        this.settings.set(data);
        this.fiscalYearStartMonth.set(data.fiscalYearStartMonth || '01');
        this.weekStartDay.set(data.weekStartDay || 'Sunday');
        this.dateFormat.set(data.dateFormat || 'dd/MM/yyyy');
        this.timeFormat.set(data.timeFormat || 'HH:mm');
        this.numberFormat.set(data.numberFormat || 'en-US');
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  save(): void {
    this.saving.set(true);
    const current = this.settings();
    const payload: any = {
      ...current,
      fiscalYearStartMonth: this.fiscalYearStartMonth(),
      weekStartDay: this.weekStartDay(),
      dateFormat: this.dateFormat(),
      timeFormat: this.timeFormat(),
      numberFormat: this.numberFormat()
    };

    this.configService.updateCompanySettings(payload).subscribe({
      next: () => {
        this.notificationService.success(this.t('tenant_configuration.saved'));
        this.saving.set(false);
      },
      error: () => {
        this.notificationService.error(this.t('common.error_loading'));
        this.saving.set(false);
      }
    });
  }
}
