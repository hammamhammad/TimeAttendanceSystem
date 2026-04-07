import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { TrainingService } from '../../../core/services/training.service';
import { TrainingSessionDto } from '../../../shared/models/training.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-training-sessions',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './training-sessions.component.html',
  styleUrl: './training-sessions.component.css'
})
export class TrainingSessionsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(TrainingService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);

  data = signal<TrainingSessionDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'title', label: this.i18n.t('training_sessions.title_field'), sortable: true, priority: 'high' },
    { key: 'courseName', label: this.i18n.t('training_sessions.course'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' },
    { key: 'startDate', label: this.i18n.t('training_sessions.start_date'), sortable: true, priority: 'medium' },
    { key: 'endDate', label: this.i18n.t('training_sessions.end_date'), sortable: true, priority: 'medium' },
    { key: 'enrolledCount', label: this.i18n.t('training_sessions.enrolled'), sortable: true, priority: 'medium' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary', condition: (item: any) => item.status === 'Scheduled' },
    { key: 'complete', label: this.i18n.t('training_sessions.complete'), icon: 'fa-check-circle', color: 'success', condition: (item: any) => item.status === 'InProgress' || item.status === 'Scheduled' },
    { key: 'cancel', label: this.i18n.t('common.cancel'), icon: 'fa-times-circle', color: 'danger', condition: (item: any) => item.status === 'Scheduled' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger', condition: (item: any) => item.status === 'Scheduled' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getSessions({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  navigateToCreate(): void { this.router.navigate(['/training/sessions/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  async onComplete(item: TrainingSessionDto): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('training_sessions.complete'), message: this.i18n.t('training_sessions.confirm_complete'),
      confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-success'
    });
    if (result.confirmed) {
      this.service.completeSession(item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('training_sessions.completed')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  async onCancel(item: TrainingSessionDto): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('training_sessions.cancel_session'), message: this.i18n.t('training_sessions.confirm_cancel'),
      confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger'
    });
    if (result.confirmed) {
      this.service.cancelSession(item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('training_sessions.cancelled')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  async onDelete(item: TrainingSessionDto): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('training_sessions.delete'), message: this.i18n.t('training_sessions.confirm_delete'),
      confirmText: this.i18n.t('common.delete'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger'
    });
    if (result.confirmed) {
      this.service.deleteSession(item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('training_sessions.deleted')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  onActionClick(event: { action: string; item: TrainingSessionDto }): void {
    if (event.action === 'view') this.router.navigate(['/training/sessions', event.item.id, 'view']);
    else if (event.action === 'edit') this.router.navigate(['/training/sessions', event.item.id, 'edit']);
    else if (event.action === 'complete') this.onComplete(event.item);
    else if (event.action === 'cancel') this.onCancel(event.item);
    else if (event.action === 'delete') this.onDelete(event.item);
  }
}
