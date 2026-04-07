import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

interface MyDocument {
  id: number; title: string; categoryName: string; status: string; expiryDate?: string; fileUrl?: string; createdAtUtc: string;
}

interface CompanyPolicy {
  id: number; title: string; category: string; version: string; effectiveDate: string; acknowledged: boolean;
}

@Component({
  selector: 'app-my-documents',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, EmptyStateComponent],
  templateUrl: './my-documents.component.html',
  styleUrl: './my-documents.component.css'
})
export class MyDocumentsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  activeTab = signal<'documents' | 'policies'>('documents');
  documents = signal<MyDocument[]>([]);
  policies = signal<CompanyPolicy[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  docColumns: TableColumn[] = [
    { key: 'title', label: this.i18n.t('portal.documents.title_field'), sortable: true, priority: 'high' },
    { key: 'categoryName', label: this.i18n.t('portal.documents.category'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('portal.status'), sortable: true, priority: 'high', renderHtml: true },
    { key: 'expiryDate', label: this.i18n.t('portal.documents.expiry_date'), sortable: true, priority: 'medium' }
  ];

  docActions = computed<TableAction[]>(() => [
    { key: 'download', label: this.i18n.t('common.download'), icon: 'bi-download', color: 'primary', condition: (item: any) => !!item.fileUrl }
  ]);

  tableData = computed(() => {
    return this.documents().map(doc => ({
      ...doc,
      status: this.getStatusBadgeHtml(doc.status),
      expiryDate: doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString(this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US') : '-'
    }));
  });

  ngOnInit(): void { this.loadDocuments(); }

  setTab(tab: 'documents' | 'policies'): void {
    this.activeTab.set(tab);
    if (tab === 'documents') this.loadDocuments();
    else this.loadPolicies();
  }

  refresh(): void {
    if (this.activeTab() === 'documents') this.loadDocuments();
    else this.loadPolicies();
  }

  loadDocuments(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: MyDocument[]; totalCount: number }>(`${this.baseUrl}/portal/my-documents`).subscribe({
      next: (res) => { this.documents.set(res.data); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  loadPolicies(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: CompanyPolicy[]; totalCount: number }>(`${this.baseUrl}/portal/company-policies`).subscribe({
      next: (res) => { this.policies.set(res.data || []); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onDocAction(event: { action: string; item: MyDocument }): void {
    if (event.action === 'download' && event.item.fileUrl) {
      window.open(event.item.fileUrl, '_blank');
    }
  }

  acknowledgePolicy(policy: CompanyPolicy): void {
    this.http.post<void>(`${this.baseUrl}/company-policies/${policy.id}/acknowledge`, {}).subscribe({
      next: () => { this.notification.success(this.i18n.t('portal.documents.acknowledged')); this.loadPolicies(); },
      error: () => this.notification.error(this.i18n.t('common.error'))
    });
  }

  getStatusBadgeHtml(status: string): string {
    switch (status) {
      case 'Verified':
        return `<span class="badge bg-success">${this.i18n.t('portal.documents.status_verified')}</span>`;
      case 'PendingVerification':
        return `<span class="badge bg-warning">${this.i18n.t('portal.documents.status_pending')}</span>`;
      case 'Expired':
        return `<span class="badge bg-danger">${this.i18n.t('portal.documents.status_expired')}</span>`;
      case 'Active':
        return `<span class="badge bg-secondary">${this.i18n.t('portal.documents.status_active')}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }
}
