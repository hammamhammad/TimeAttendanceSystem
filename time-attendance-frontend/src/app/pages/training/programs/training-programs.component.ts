import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { TrainingService } from '../../../core/services/training.service';
import { TrainingProgramDto } from '../../../shared/models/training.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-training-programs',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './training-programs.component.html',
  styleUrl: './training-programs.component.css'
})
export class TrainingProgramsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(TrainingService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);

  data = signal<TrainingProgramDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('training_programs.name'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' },
    { key: 'courseCount', label: this.i18n.t('training_programs.course_count'), sortable: true, priority: 'medium' },
    { key: 'totalDurationHours', label: this.i18n.t('training_programs.total_hours'), sortable: true, priority: 'medium' },
    { key: 'startDate', label: this.i18n.t('training_programs.start_date'), sortable: true, priority: 'medium' },
    { key: 'endDate', label: this.i18n.t('training_programs.end_date'), sortable: true, priority: 'low' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getPrograms({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  navigateToCreate(): void { this.router.navigate(['/training/programs/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  async onDelete(item: TrainingProgramDto): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('training_programs.delete'), message: this.i18n.t('training_programs.confirm_delete'),
      confirmText: this.i18n.t('common.delete'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger'
    });
    if (result.confirmed) {
      this.service.deleteProgram(item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('training_programs.deleted')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  onActionClick(event: { action: string; item: TrainingProgramDto }): void {
    if (event.action === 'view') this.router.navigate(['/training/programs', event.item.id, 'view']);
    else if (event.action === 'edit') this.router.navigate(['/training/programs', event.item.id, 'edit']);
    else if (event.action === 'delete') this.onDelete(event.item);
  }
}
