import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EngagementResponse, AnalyticsQueryParams } from '../../../shared/models/analytics.model';

@Component({
  selector: 'app-engagement-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './engagement-analytics.component.html',
  styleUrl: './engagement-analytics.component.css'
})
export class EngagementAnalyticsComponent implements OnInit {
  i18n = inject(I18nService);
  private analyticsService = inject(AnalyticsService);
  private notificationService = inject(NotificationService);

  loading = signal(false);
  data = signal<EngagementResponse | null>(null);

  startDate = signal('');
  endDate = signal('');

  ngOnInit(): void {
    this.setDefaultDates();
    this.loadData();
  }

  private setDefaultDates(): void {
    const now = new Date();
    this.startDate.set(new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0]);
    this.endDate.set(now.toISOString().split('T')[0]);
  }

  loadData(): void {
    this.loading.set(true);
    const params: AnalyticsQueryParams = {
      startDate: this.startDate(),
      endDate: this.endDate()
    };
    this.analyticsService.getEngagement(params).subscribe({
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

  getLatestAvgScore(): number {
    const surveys = this.data()?.surveys ?? [];
    if (surveys.length === 0) return 0;
    return surveys[surveys.length - 1].avgScore;
  }

  getAvgParticipationRate(): number {
    const surveys = this.data()?.surveys ?? [];
    if (surveys.length === 0) return 0;
    const total = surveys.reduce((sum, s) => sum + s.participationRate, 0);
    return Math.round((total / surveys.length) * 10) / 10;
  }
}
