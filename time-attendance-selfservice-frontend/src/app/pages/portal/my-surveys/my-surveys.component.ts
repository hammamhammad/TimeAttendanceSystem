import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

interface MySurveyDto {
  id: number;
  distributionId: number;
  title: string;
  titleAr?: string;
  surveyType: string;
  status: string;
  isAnonymous: boolean;
  startDate: string;
  endDate: string;
  startedAtUtc?: string;
  completedAtUtc?: string;
  token: string;
}

@Component({
  selector: 'app-my-surveys',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, EmptyStateComponent],
  templateUrl: './my-surveys.component.html',
  styleUrl: './my-surveys.component.css'
})
export class MySurveysComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  surveys = signal<MySurveyDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  columns: TableColumn[] = [
    { key: 'title', label: this.i18n.t('portal.surveys.survey_title'), sortable: true, priority: 'high' },
    { key: 'surveyType', label: this.i18n.t('portal.surveys.type'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('portal.status'), sortable: true, priority: 'high', renderHtml: true },
    { key: 'endDate', label: this.i18n.t('portal.surveys.deadline'), sortable: true, priority: 'medium' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'respond', label: this.i18n.t('portal.surveys.take_survey'), icon: 'bi-pencil-square', color: 'primary', condition: (item: any) => item.rawStatus === 'Pending' || item.rawStatus === 'Started' }
  ]);

  tableData = computed(() => {
    return this.surveys().map(s => ({
      ...s,
      rawStatus: s.status,
      status: this.getStatusBadgeHtml(s.status),
      surveyType: this.i18n.t('portal.surveys.type_' + s.surveyType),
      endDate: s.endDate ? new Date(s.endDate).toLocaleDateString(this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US') : '-'
    }));
  });

  ngOnInit(): void { this.loadSurveys(); }

  refresh(): void { this.loadSurveys(); }

  loadSurveys(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: MySurveyDto[]; totalCount: number }>(`${this.baseUrl}/portal/my-surveys`).subscribe({
      next: (res) => { this.surveys.set(res.data); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onAction(event: { action: string; item: any }): void {
    if (event.action === 'respond') {
      this.router.navigate(['/my-surveys', event.item.distributionId, 'respond'], { queryParams: { token: event.item.token } });
    }
  }

  getStatusBadgeHtml(status: string): string {
    switch (status) {
      case 'Pending':
        return `<span class="badge bg-warning">${this.i18n.t('portal.surveys.status_pending')}</span>`;
      case 'Started':
        return `<span class="badge bg-info">${this.i18n.t('portal.surveys.status_started')}</span>`;
      case 'Completed':
        return `<span class="badge bg-success">${this.i18n.t('portal.surveys.status_completed')}</span>`;
      case 'Expired':
        return `<span class="badge bg-secondary">${this.i18n.t('portal.surveys.status_expired')}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }
}
