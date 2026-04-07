import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { LoanService } from '../../../core/services/loan.service';
import { LoanPolicyDto, CreateLoanPolicyRequest } from '../../../shared/models/loan.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'app-loan-policies',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent, ModalWrapperComponent],
  templateUrl: './loan-policies.component.html',
  styleUrl: './loan-policies.component.css'
})
export class LoanPoliciesComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(LoanService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  data = signal<LoanPolicyDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  showModal = signal(false);
  editingItem = signal<LoanPolicyDto | null>(null);
  formData = signal<CreateLoanPolicyRequest>({ name: '', maxLoanMultiplier: 3, minServiceMonths: 12, maxActiveLoanCount: 1, allowedLoanTypes: [], isActive: true });
  saving = signal(false);

  columns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('loan_policies.name'), sortable: true, priority: 'high' },
    { key: 'maxLoanMultiplier', label: this.i18n.t('loan_policies.max_multiplier'), sortable: true, priority: 'medium' },
    { key: 'minServiceMonths', label: this.i18n.t('loan_policies.min_service'), sortable: true, priority: 'medium' },
    { key: 'maxActiveLoanCount', label: this.i18n.t('loan_policies.max_active'), sortable: true, priority: 'medium' },
    { key: 'isActive', label: this.i18n.t('common.status'), sortable: true, priority: 'high' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getPolicies({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }
  onAdd(): void { this.editingItem.set(null); this.formData.set({ name: '', maxLoanMultiplier: 3, minServiceMonths: 12, maxActiveLoanCount: 1, allowedLoanTypes: [], isActive: true }); this.showModal.set(true); }

  updateField(field: string, value: any): void {
    this.formData.update(d => ({ ...d, [field]: value }));
  }

  onActionClick(event: { action: string; item: LoanPolicyDto }): void {
    if (event.action === 'edit') { this.editingItem.set(event.item); this.formData.set({ name: event.item.name, nameAr: event.item.nameAr, description: event.item.description, maxLoanMultiplier: event.item.maxLoanMultiplier, minServiceMonths: event.item.minServiceMonths, maxActiveLoanCount: event.item.maxActiveLoanCount, allowedLoanTypes: event.item.allowedLoanTypes, isActive: event.item.isActive }); this.showModal.set(true); }
    else if (event.action === 'delete') {
      this.confirmation.confirm({ title: this.i18n.t('common.confirm_delete'), message: this.i18n.t('loan_policies.confirm_delete'), confirmText: this.i18n.t('common.delete'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger' }).then(confirmed => {
        if (confirmed) this.service.deletePolicy(event.item.id).subscribe({ next: () => { this.notification.success(this.i18n.t('loan_policies.deleted')); this.loadData(); }, error: () => this.notification.error(this.i18n.t('common.error')) });
      });
    }
  }

  saveItem(): void {
    this.saving.set(true);
    const data = this.formData();
    const editing = this.editingItem();
    const handler = { next: () => { this.notification.success(this.i18n.t(editing ? 'loan_policies.updated' : 'loan_policies.created')); this.showModal.set(false); this.saving.set(false); this.loadData(); }, error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); } };
    if (editing) { this.service.updatePolicy(editing.id, data).subscribe(handler); } else { this.service.createPolicy(data).subscribe(handler); }
  }
}
