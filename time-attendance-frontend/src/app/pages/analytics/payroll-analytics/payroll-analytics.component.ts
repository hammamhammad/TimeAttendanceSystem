import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { PayrollResponse, AnalyticsQueryParams } from '../../../shared/models/analytics.model';

@Component({
  selector: 'app-payroll-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './payroll-analytics.component.html',
  styleUrl: './payroll-analytics.component.css'
})
export class PayrollAnalyticsComponent implements OnInit {
  i18n = inject(I18nService);
  private analyticsService = inject(AnalyticsService);
  private notificationService = inject(NotificationService);

  loading = signal(false);
  data = signal<PayrollResponse | null>(null);

  startDate = signal('');
  endDate = signal('');
  branchId = signal<number | null>(null);

  ngOnInit(): void {
    this.setDefaultDates();
    this.loadData();
  }

  private setDefaultDates(): void {
    const now = new Date();
    this.startDate.set(new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]);
    this.endDate.set(now.toISOString().split('T')[0]);
  }

  loadData(): void {
    this.loading.set(true);
    const params: AnalyticsQueryParams = {
      startDate: this.startDate(),
      endDate: this.endDate(),
      branchId: this.branchId() || undefined
    };
    this.analyticsService.getPayroll(params).subscribe({
      next: (res) => {
        this.data.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('analytics.load_error'));
        this.loading.set(false);
      }
    });
  }

  onFilter(): void {
    this.loadData();
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
}
