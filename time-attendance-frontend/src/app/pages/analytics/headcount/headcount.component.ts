import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import {
  HeadcountResponse,
  HeadcountDemographicsResponse,
  AnalyticsQueryParams
} from '../../../shared/models/analytics.model';

@Component({
  selector: 'app-headcount',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './headcount.component.html',
  styleUrl: './headcount.component.css'
})
export class HeadcountComponent implements OnInit {
  i18n = inject(I18nService);
  private analyticsService = inject(AnalyticsService);
  private notificationService = inject(NotificationService);

  loading = signal(false);
  data = signal<HeadcountResponse | null>(null);
  demographics = signal<HeadcountDemographicsResponse | null>(null);

  startDate = signal('');
  endDate = signal('');
  branchId = signal<number | null>(null);

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
      endDate: this.endDate(),
      branchId: this.branchId() || undefined
    };

    this.analyticsService.getHeadcount(params).subscribe({
      next: (res) => {
        this.data.set(res);
        this.loadDemographics(params);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('analytics.load_error'));
        this.loading.set(false);
      }
    });
  }

  private loadDemographics(params: AnalyticsQueryParams): void {
    this.analyticsService.getHeadcountDemographics(params).subscribe({
      next: (res) => {
        this.demographics.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  onFilter(): void {
    this.loadData();
  }

  getMaxBranchCount(): number {
    const branches = this.data()?.byBranch ?? [];
    return branches.reduce((max, b) => Math.max(max, b.count), 1);
  }

  getTotalHires(): number {
    return (this.data()?.hiresByMonth ?? []).reduce((sum, m) => sum + m.count, 0);
  }

  getMonthLabel(year: number, month: number): string {
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  getGenderTotal(): number {
    return (this.demographics()?.byGender ?? []).reduce((sum, g) => sum + g.count, 0);
  }

  getAgeGroupTotal(): number {
    return (this.demographics()?.byAgeGroup ?? []).reduce((sum, g) => sum + g.count, 0);
  }
}
