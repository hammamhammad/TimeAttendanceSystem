import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { TenantConfigurationService } from '../services/tenant-configuration.service';
import { SetupStatusDto } from '../services/tenant-configuration.models';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-setup-status',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent],
  templateUrl: './setup-status.component.html',
  styleUrl: './setup-status.component.css'
})
export class SetupStatusComponent implements OnInit {
  private configService = inject(TenantConfigurationService);
  private notificationService = inject(NotificationService);
  i18n = inject(I18nService);

  loading = signal(true);
  recalculating = signal(false);
  status = signal<SetupStatusDto | null>(null);

  t(key: string): string { return this.i18n.t(key); }

  stepRoutes: Record<string, string> = {
    'company_info': '/tenants',
    'branches': '/branches',
    'departments': '/departments',
    'shifts': '/shifts',
    'vacation_types': '/vacation-types',
    'excuse_policies': '/settings/excuse-policies',
    'workflows': '/settings/workflows',
    'employees': '/employees',
    'payroll': '/settings/overtime'
  };

  ngOnInit(): void { this.loadStatus(); }

  loadStatus(): void {
    this.loading.set(true);
    this.configService.getSetupStatus().subscribe({
      next: (data) => { this.status.set(data); this.loading.set(false); },
      error: () => { this.loading.set(false); }
    });
  }

  recalculate(): void {
    this.recalculating.set(true);
    this.configService.recalculateSetupStatus().subscribe({
      next: (data) => {
        this.status.set(data);
        this.notificationService.success(this.t('tenant_configuration.setup_status.recalculated'));
        this.recalculating.set(false);
      },
      error: () => {
        this.notificationService.error(this.t('common.error_loading'));
        this.recalculating.set(false);
      }
    });
  }

  getStepRoute(stepKey: string): string {
    return this.stepRoutes[stepKey] || '/settings/tenant-config';
  }
}
