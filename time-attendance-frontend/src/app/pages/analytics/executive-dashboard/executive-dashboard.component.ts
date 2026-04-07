import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ExecutiveSummaryResponse, AnalyticsQueryParams } from '../../../shared/models/analytics.model';

@Component({
  selector: 'app-executive-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './executive-dashboard.component.html',
  styleUrl: './executive-dashboard.component.css'
})
export class ExecutiveDashboardComponent implements OnInit {
  i18n = inject(I18nService);
  private analyticsService = inject(AnalyticsService);
  private notificationService = inject(NotificationService);

  loading = signal(false);
  data = signal<ExecutiveSummaryResponse | null>(null);

  startDate = signal('');
  endDate = signal('');

  ngOnInit(): void {
    this.setDefaultDates();
    this.loadData();
  }

  private setDefaultDates(): void {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    this.startDate.set(start.toISOString().split('T')[0]);
    this.endDate.set(now.toISOString().split('T')[0]);
  }

  loadData(): void {
    this.loading.set(true);
    const params: AnalyticsQueryParams = {
      startDate: this.startDate(),
      endDate: this.endDate()
    };
    this.analyticsService.getExecutiveSummary(params).subscribe({
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

  formatNumber(value: number | undefined): string {
    if (value === undefined || value === null) return '0';
    return value.toLocaleString('en-US');
  }

  formatPercent(value: number | undefined): string {
    if (value === undefined || value === null) return '0%';
    return value.toFixed(1) + '%';
  }

  formatCurrency(value: number | undefined): string {
    if (value === undefined || value === null) return '0';
    return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
}
