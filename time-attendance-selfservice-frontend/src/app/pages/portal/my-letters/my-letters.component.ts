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

interface LetterRequest {
  id: number; templateName: string; purpose?: string; status: string; generatedFileUrl?: string; requestedAtUtc: string;
}

@Component({
  selector: 'app-my-letters',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, ModalWrapperComponent, EmptyStateComponent],
  templateUrl: './my-letters.component.html',
  styleUrl: './my-letters.component.css'
})
export class MyLettersComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  requests = signal<LetterRequest[]>([]);
  templates = signal<{ id: number; name: string }[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  showModal = signal(false);
  saving = signal(false);
  selectedTemplateId = signal<number | null>(null);
  purpose = signal('');

  columns: TableColumn[] = [
    { key: 'templateName', label: this.i18n.t('portal.letters.template'), sortable: true, priority: 'high' },
    { key: 'purpose', label: this.i18n.t('portal.letters.purpose'), priority: 'medium' },
    { key: 'status', label: this.i18n.t('portal.status'), sortable: true, priority: 'high', renderHtml: true },
    { key: 'requestedAtUtc', label: this.i18n.t('portal.letters.requested_at'), sortable: true, priority: 'medium' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'download', label: this.i18n.t('common.download'), icon: 'bi-download', color: 'primary', condition: (item: any) => !!item.generatedFileUrl }
  ]);

  tableData = computed(() => {
    return this.requests().map(req => ({
      ...req,
      status: this.getStatusBadgeHtml(req.status),
      requestedAtUtc: req.requestedAtUtc ? new Date(req.requestedAtUtc).toLocaleDateString(this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US') : '-'
    }));
  });

  ngOnInit(): void { this.loadRequests(); this.loadTemplates(); }

  refresh(): void { this.loadRequests(); }

  loadRequests(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: LetterRequest[]; totalCount: number }>(`${this.baseUrl}/portal/my-letter-requests`).subscribe({
      next: (res) => { this.requests.set(res.data); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  loadTemplates(): void {
    this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/letter-templates/dropdown`).subscribe({
      next: (data) => this.templates.set(data),
      error: () => {}
    });
  }

  openNewRequest(): void { this.selectedTemplateId.set(null); this.purpose.set(''); this.showModal.set(true); }

  submitRequest(): void {
    if (!this.selectedTemplateId()) return;
    this.saving.set(true);
    this.http.post(`${this.baseUrl}/letter-requests`, { templateId: this.selectedTemplateId(), purpose: this.purpose() }).subscribe({
      next: () => { this.notification.success(this.i18n.t('portal.letters.submitted')); this.showModal.set(false); this.saving.set(false); this.loadRequests(); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }

  onAction(event: { action: string; item: LetterRequest }): void {
    if (event.action === 'download' && event.item.generatedFileUrl) window.open(event.item.generatedFileUrl, '_blank');
  }

  getStatusBadgeHtml(status: string): string {
    switch (status) {
      case 'Pending':
        return `<span class="badge bg-warning">${this.i18n.t('portal.letters.status_pending')}</span>`;
      case 'Generated':
        return `<span class="badge bg-success">${this.i18n.t('portal.letters.status_generated')}</span>`;
      case 'Approved':
        return `<span class="badge bg-info">${this.i18n.t('portal.letters.status_approved')}</span>`;
      case 'Rejected':
        return `<span class="badge bg-danger">${this.i18n.t('portal.letters.status_rejected')}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }
}
