import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

interface Certification {
  id: number;
  certificationName: string;
  certificationNameAr?: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  status: string;
  daysUntilExpiry?: number;
}

@Component({
  selector: 'app-my-certifications',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, EmptyStateComponent],
  templateUrl: './my-certifications.component.html',
  styleUrl: './my-certifications.component.css'
})
export class MyCertificationsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  certifications = signal<Certification[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  columns: TableColumn[] = [
    { key: 'certificationName', label: this.i18n.t('portal.training.cert_name'), sortable: true, priority: 'high' },
    { key: 'issuingOrganization', label: this.i18n.t('portal.training.issuing_org'), sortable: true, priority: 'medium' },
    { key: 'issueDate', label: this.i18n.t('portal.training.issue_date'), sortable: true, priority: 'medium' },
    { key: 'expiryDate', label: this.i18n.t('portal.training.expiry_date'), sortable: true, priority: 'medium', renderHtml: true },
    { key: 'credentialId', label: this.i18n.t('portal.training.credential_id'), priority: 'low' },
    { key: 'status', label: this.i18n.t('portal.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  expiringCount = computed(() => {
    return this.certifications().filter(c => c.daysUntilExpiry != null && c.daysUntilExpiry > 0 && c.daysUntilExpiry <= 30).length;
  });

  expiredCount = computed(() => {
    return this.certifications().filter(c => c.status === 'Expired').length;
  });

  tableData = computed(() => {
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return this.certifications().map(c => ({
      ...c,
      certificationName: this.i18n.locale() === 'ar' && c.certificationNameAr ? c.certificationNameAr : c.certificationName,
      issueDate: c.issueDate ? new Date(c.issueDate).toLocaleDateString(locale) : '-',
      expiryDate: this.getExpiryDateHtml(c, locale),
      credentialId: c.credentialId || '-',
      status: this.getStatusBadgeHtml(c.status)
    }));
  });

  ngOnInit(): void {
    this.loadCertifications();
  }

  refresh(): void {
    this.loadCertifications();
  }

  loadCertifications(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: Certification[]; totalCount: number }>(`${this.baseUrl}/portal/my-certifications`).subscribe({
      next: (res) => { this.certifications.set(res.data); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  getExpiryDateHtml(cert: Certification, locale: string): string {
    if (!cert.expiryDate) return `<span class="text-muted">${this.i18n.t('portal.training.no_expiry')}</span>`;
    const dateStr = new Date(cert.expiryDate).toLocaleDateString(locale);
    if (cert.daysUntilExpiry != null && cert.daysUntilExpiry <= 0) {
      return `<span class="text-danger fw-semibold">${dateStr}</span>`;
    }
    if (cert.daysUntilExpiry != null && cert.daysUntilExpiry <= 30) {
      return `<span class="text-warning fw-semibold">${dateStr} <i class="bi bi-exclamation-triangle"></i></span>`;
    }
    return dateStr;
  }

  getStatusBadgeHtml(status: string): string {
    const key = 'portal.training.cert_' + status;
    const label = this.i18n.t(key);
    switch (status) {
      case 'Active':
        return `<span class="badge bg-success">${label}</span>`;
      case 'Expired':
        return `<span class="badge bg-danger">${label}</span>`;
      case 'Pending':
        return `<span class="badge bg-warning">${label}</span>`;
      case 'Revoked':
        return `<span class="badge bg-secondary">${label}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }
}
