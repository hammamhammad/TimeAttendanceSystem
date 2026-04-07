import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

interface ExpenseClaim {
  id: number; claimNumber: string; title: string; totalAmount: number; status: string; createdAtUtc: string;
}

interface ClaimItem {
  categoryId: number; description: string; amount: number; expenseDate: string;
}

@Component({
  selector: 'app-my-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, ModalWrapperComponent, EmptyStateComponent],
  templateUrl: './my-expenses.component.html',
  styleUrl: './my-expenses.component.css'
})
export class MyExpensesComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  claims = signal<ExpenseClaim[]>([]);
  categories = signal<{ id: number; name: string }[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  showModal = signal(false);
  saving = signal(false);

  claimTitle = signal('');
  claimDescription = signal('');
  items = signal<ClaimItem[]>([{ categoryId: 0, description: '', amount: 0, expenseDate: '' }]);

  columns: TableColumn[] = [
    { key: 'claimNumber', label: this.i18n.t('portal.expenses.claim_number'), sortable: true, priority: 'high' },
    { key: 'title', label: this.i18n.t('portal.expenses.title_field'), sortable: true, priority: 'high' },
    { key: 'totalAmount', label: this.i18n.t('portal.expenses.total_amount'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('portal.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => []);

  tableData = computed(() => {
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return this.claims().map(claim => ({
      ...claim,
      totalAmount: claim.totalAmount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      status: this.getStatusBadgeHtml(claim.status)
    }));
  });

  ngOnInit(): void { this.loadClaims(); this.loadCategories(); }

  refresh(): void { this.loadClaims(); }

  loadClaims(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: ExpenseClaim[]; totalCount: number }>(`${this.baseUrl}/portal/my-expense-claims`).subscribe({
      next: (res) => { this.claims.set(res.data); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  loadCategories(): void {
    this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/expense-categories/dropdown`).subscribe({
      next: (data) => this.categories.set(data), error: () => {}
    });
  }

  openNewClaim(): void {
    this.claimTitle.set(''); this.claimDescription.set('');
    this.items.set([{ categoryId: 0, description: '', amount: 0, expenseDate: '' }]);
    this.showModal.set(true);
  }

  addItem(): void { this.items.update(items => [...items, { categoryId: 0, description: '', amount: 0, expenseDate: '' }]); }
  removeItem(index: number): void { this.items.update(items => items.filter((_, i) => i !== index)); }
  updateItem(index: number, field: string, value: any): void {
    this.items.update(items => items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  }

  submitClaim(): void {
    if (!this.claimTitle() || this.items().length === 0) return;
    this.saving.set(true);
    this.http.post(`${this.baseUrl}/expense-claims`, { title: this.claimTitle(), description: this.claimDescription(), items: this.items() }).subscribe({
      next: () => { this.notification.success(this.i18n.t('portal.expenses.submitted')); this.showModal.set(false); this.saving.set(false); this.loadClaims(); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }

  getStatusBadgeHtml(status: string): string {
    switch (status) {
      case 'Draft':
        return `<span class="badge bg-secondary">${this.i18n.t('portal.expenses.status_draft')}</span>`;
      case 'Submitted':
        return `<span class="badge bg-primary">${this.i18n.t('portal.expenses.status_submitted')}</span>`;
      case 'Approved':
        return `<span class="badge bg-success">${this.i18n.t('portal.expenses.status_approved')}</span>`;
      case 'Reimbursed':
        return `<span class="badge bg-success">${this.i18n.t('portal.expenses.status_reimbursed')}</span>`;
      case 'Rejected':
        return `<span class="badge bg-danger">${this.i18n.t('portal.expenses.status_rejected')}</span>`;
      case 'UnderReview':
        return `<span class="badge bg-info">${this.i18n.t('portal.expenses.status_under_review')}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }
}
