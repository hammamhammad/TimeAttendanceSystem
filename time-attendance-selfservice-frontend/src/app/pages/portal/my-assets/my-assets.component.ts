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

interface MyAssetAssignment {
  id: number;
  assetId: number;
  assetName: string;
  assetTag: string;
  categoryName?: string;
  serialNumber?: string;
  assignedDate: string;
  expectedReturnDate?: string;
  status: string;
  condition?: string;
  notes?: string;
}

@Component({
  selector: 'app-my-assets',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, EmptyStateComponent],
  templateUrl: './my-assets.component.html',
  styleUrl: './my-assets.component.css'
})
export class MyAssetsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  assets = signal<MyAssetAssignment[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  columns: TableColumn[] = [
    { key: 'assetTag', label: this.i18n.t('portal.assets.asset_tag'), sortable: true, priority: 'high' },
    { key: 'assetName', label: this.i18n.t('portal.assets.asset_name'), sortable: true, priority: 'high' },
    { key: 'categoryName', label: this.i18n.t('portal.assets.category'), sortable: true, priority: 'medium' },
    { key: 'assignedDate', label: this.i18n.t('portal.assets.assigned_date'), sortable: true, priority: 'high' },
    { key: 'expectedReturnDate', label: this.i18n.t('portal.assets.expected_return'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('portal.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => []);

  tableData = computed(() => {
    return this.assets().map(a => ({
      ...a,
      assignedDate: a.assignedDate ? new Date(a.assignedDate).toLocaleDateString(this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US') : '-',
      expectedReturnDate: a.expectedReturnDate ? new Date(a.expectedReturnDate).toLocaleDateString(this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US') : '-',
      categoryName: a.categoryName || '-',
      status: this.getStatusBadgeHtml(a.status)
    }));
  });

  ngOnInit(): void {
    this.loadAssets();
  }

  refresh(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<MyAssetAssignment[]>(`${this.baseUrl}/portal/my-assets`).subscribe({
      next: (data) => {
        this.assets.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.i18n.t('common.error'));
        this.loading.set(false);
      }
    });
  }

  getStatusBadgeHtml(status: string): string {
    switch (status) {
      case 'Active':
        return `<span class="badge bg-success">${this.i18n.t('portal.assets.status_active')}</span>`;
      case 'Returned':
        return `<span class="badge bg-secondary">${this.i18n.t('portal.assets.status_returned')}</span>`;
      case 'Lost':
        return `<span class="badge bg-danger">${this.i18n.t('portal.assets.status_lost')}</span>`;
      case 'Damaged':
        return `<span class="badge bg-warning">${this.i18n.t('portal.assets.status_damaged')}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }
}
