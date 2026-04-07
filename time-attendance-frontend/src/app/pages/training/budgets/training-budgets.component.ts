import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { TrainingService } from '../../../core/services/training.service';
import { TrainingBudgetDto, TrainingBudgetSummaryDto } from '../../../shared/models/training.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-training-budgets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './training-budgets.component.html',
  styleUrl: './training-budgets.component.css'
})
export class TrainingBudgetsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(TrainingService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly fb = inject(FormBuilder);

  data = signal<TrainingBudgetDto[]>([]);
  summary = signal<TrainingBudgetSummaryDto | null>(null);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  showModal = signal(false);
  editingId = signal<number | null>(null);
  saving = signal(false);
  form!: FormGroup;

  columns: TableColumn[] = [
    { key: 'year', label: this.i18n.t('training_budgets.year'), sortable: true, priority: 'high' },
    { key: 'branchName', label: this.i18n.t('training_budgets.branch'), sortable: true, priority: 'medium' },
    { key: 'departmentName', label: this.i18n.t('training_budgets.department'), sortable: true, priority: 'medium' },
    { key: 'totalBudget', label: this.i18n.t('training_budgets.total_budget'), sortable: true, priority: 'high' },
    { key: 'spentAmount', label: this.i18n.t('training_budgets.spent'), sortable: true, priority: 'high' },
    { key: 'utilizationPercentage', label: this.i18n.t('training_budgets.utilization'), sortable: true, priority: 'high' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void {
    this.form = this.fb.group({
      year: [new Date().getFullYear(), [Validators.required, Validators.min(2020)]],
      branchId: [null],
      departmentId: [null],
      totalBudget: [0, [Validators.required, Validators.min(0)]],
      currency: ['SAR', Validators.required],
      notes: ['']
    });
    this.loadData();
    this.loadSummary();
  }

  loadData(): void {
    this.loading.set(true);
    this.service.getBudgets({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  loadSummary(): void {
    this.service.getBudgetSummary().subscribe({
      next: (s) => this.summary.set(s),
      error: () => {}
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); this.loadSummary(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  openCreateModal(): void {
    this.editingId.set(null);
    this.form.reset({ year: new Date().getFullYear(), currency: 'SAR', totalBudget: 0 });
    this.showModal.set(true);
  }

  openEditModal(item: TrainingBudgetDto): void {
    this.editingId.set(item.id);
    this.form.patchValue({ year: item.year, branchId: item.branchId, departmentId: item.departmentId, totalBudget: item.totalBudget, currency: item.currency, notes: item.notes });
    this.showModal.set(true);
  }

  closeModal(): void { this.showModal.set(false); }

  onSave(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const val = this.form.value;
    const obs$ = this.editingId()
      ? this.service.updateBudget(this.editingId()!, val)
      : this.service.createBudget(val);
    (obs$ as any).subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.editingId() ? 'training_budgets.updated' : 'training_budgets.created'));
        this.closeModal(); this.saving.set(false); this.loadData(); this.loadSummary();
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }

  async onDelete(item: TrainingBudgetDto): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('training_budgets.delete'), message: this.i18n.t('training_budgets.confirm_delete'),
      confirmText: this.i18n.t('common.delete'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger'
    });
    if (result.confirmed) {
      this.service.deleteBudget(item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('training_budgets.deleted')); this.loadData(); this.loadSummary(); },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  onActionClick(event: { action: string; item: TrainingBudgetDto }): void {
    if (event.action === 'edit') this.openEditModal(event.item);
    else if (event.action === 'delete') this.onDelete(event.item);
  }
}
