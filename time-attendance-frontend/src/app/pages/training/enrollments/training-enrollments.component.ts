import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { TrainingService } from '../../../core/services/training.service';
import { TrainingEnrollmentDto } from '../../../shared/models/training.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-training-enrollments',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './training-enrollments.component.html',
  styleUrl: './training-enrollments.component.css'
})
export class TrainingEnrollmentsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(TrainingService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);

  data = signal<TrainingEnrollmentDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('training_enrollments.employee'), sortable: true, priority: 'high' },
    { key: 'sessionTitle', label: this.i18n.t('training_enrollments.session'), sortable: true, priority: 'high' },
    { key: 'courseName', label: this.i18n.t('training_enrollments.course'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' },
    { key: 'enrollmentDate', label: this.i18n.t('training_enrollments.enrollment_date'), sortable: true, priority: 'medium' },
    { key: 'score', label: this.i18n.t('training_enrollments.score'), sortable: true, priority: 'low' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'approve', label: this.i18n.t('common.approve'), icon: 'fa-check', color: 'success', condition: (item: any) => item.status === 'Pending' },
    { key: 'reject', label: this.i18n.t('common.reject'), icon: 'fa-times', color: 'danger', condition: (item: any) => item.status === 'Pending' },
    { key: 'cancel', label: this.i18n.t('common.cancel'), icon: 'fa-ban', color: 'warning', condition: (item: any) => item.status === 'Approved' || item.status === 'Enrolled' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getEnrollments({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  navigateToCreate(): void {
    // Enrollment is typically done from session view; this is a placeholder for bulk enroll
    this.notification.info(this.i18n.t('training_enrollments.use_session_view'));
  }

  async onApprove(item: TrainingEnrollmentDto): Promise<void> {
    this.service.approveEnrollment(item.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('training_enrollments.approved')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('common.error'))
    });
  }

  async onReject(item: TrainingEnrollmentDto): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('training_enrollments.reject'), message: this.i18n.t('training_enrollments.confirm_reject'),
      confirmText: this.i18n.t('common.reject'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger'
    });
    if (result.confirmed) {
      this.service.rejectEnrollment(item.id, '').subscribe({
        next: () => { this.notification.success(this.i18n.t('training_enrollments.rejected')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  async onCancel(item: TrainingEnrollmentDto): Promise<void> {
    this.service.cancelEnrollment(item.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('training_enrollments.cancelled')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('common.error'))
    });
  }

  onActionClick(event: { action: string; item: TrainingEnrollmentDto }): void {
    if (event.action === 'approve') this.onApprove(event.item);
    else if (event.action === 'reject') this.onReject(event.item);
    else if (event.action === 'cancel') this.onCancel(event.item);
  }
}
