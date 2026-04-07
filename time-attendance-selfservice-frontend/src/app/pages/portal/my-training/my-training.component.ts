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

interface TrainingEnrollment {
  id: number;
  courseTitle: string;
  courseTitleAr?: string;
  sessionDate: string;
  sessionEndDate?: string;
  instructorName?: string;
  location?: string;
  deliveryMethod?: string;
  status: string;
  completionDate?: string;
  category?: string;
}

@Component({
  selector: 'app-my-training',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, EmptyStateComponent],
  templateUrl: './my-training.component.html',
  styleUrl: './my-training.component.css'
})
export class MyTrainingComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  enrollments = signal<TrainingEnrollment[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  activeTab = signal<'current' | 'completed' | 'all'>('current');

  columns: TableColumn[] = [
    { key: 'courseTitle', label: this.i18n.t('portal.training.course_title'), sortable: true, priority: 'high' },
    { key: 'sessionDate', label: this.i18n.t('portal.training.session_date'), sortable: true, priority: 'high' },
    { key: 'instructorName', label: this.i18n.t('portal.training.instructor'), sortable: true, priority: 'medium' },
    { key: 'deliveryMethod', label: this.i18n.t('portal.training.delivery_method'), priority: 'low' },
    { key: 'status', label: this.i18n.t('portal.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'bi-eye', color: 'info' }
  ]);

  filteredEnrollments = computed(() => {
    const tab = this.activeTab();
    const all = this.enrollments();
    if (tab === 'current') {
      return all.filter(e => e.status !== 'Completed' && e.status !== 'Cancelled' && e.status !== 'Failed');
    } else if (tab === 'completed') {
      return all.filter(e => e.status === 'Completed');
    }
    return all;
  });

  tableData = computed(() => {
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return this.filteredEnrollments().map(e => ({
      ...e,
      courseTitle: this.i18n.locale() === 'ar' && e.courseTitleAr ? e.courseTitleAr : e.courseTitle,
      sessionDate: e.sessionDate ? new Date(e.sessionDate).toLocaleDateString(locale) : '-',
      instructorName: e.instructorName || '-',
      deliveryMethod: e.deliveryMethod ? this.i18n.t('portal.training.delivery_' + e.deliveryMethod) : '-',
      status: this.getStatusBadgeHtml(e.status)
    }));
  });

  ngOnInit(): void {
    this.loadEnrollments();
  }

  setTab(tab: 'current' | 'completed' | 'all'): void {
    this.activeTab.set(tab);
  }

  refresh(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: TrainingEnrollment[]; totalCount: number }>(`${this.baseUrl}/portal/my-training`).subscribe({
      next: (res) => { this.enrollments.set(res.data); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onAction(event: { action: string; item: any }): void {
    if (event.action === 'view') {
      this.router.navigate(['/training', event.item.id]);
    }
  }

  getStatusBadgeHtml(status: string): string {
    const key = 'portal.training.status_' + status;
    const label = this.i18n.t(key);
    switch (status) {
      case 'Pending':
        return `<span class="badge bg-warning">${label}</span>`;
      case 'Approved':
        return `<span class="badge bg-info">${label}</span>`;
      case 'InProgress':
        return `<span class="badge bg-primary">${label}</span>`;
      case 'Completed':
        return `<span class="badge bg-success">${label}</span>`;
      case 'Cancelled':
        return `<span class="badge bg-secondary">${label}</span>`;
      case 'Failed':
        return `<span class="badge bg-danger">${label}</span>`;
      case 'Waitlisted':
        return `<span class="badge bg-warning text-dark">${label}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }
}
