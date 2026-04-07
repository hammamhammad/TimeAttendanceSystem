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

interface Grievance {
  id: number;
  type: string;
  subject: string;
  description: string;
  isConfidential: boolean;
  status: string;
  filedAtUtc: string;
  resolvedAtUtc?: string;
  resolution?: string;
}

@Component({
  selector: 'app-my-grievances',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, ModalWrapperComponent, EmptyStateComponent],
  templateUrl: './my-grievances.component.html',
  styleUrl: './my-grievances.component.css'
})
export class MyGrievancesComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  grievances = signal<Grievance[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  showModal = signal(false);
  saving = signal(false);

  // Form fields
  selectedType = signal<string | null>(null);
  subject = signal('');
  description = signal('');
  isConfidential = signal(false);

  grievanceTypes = computed(() => [
    { value: 'Workplace', label: this.i18n.t('portal.grievances.type_Workplace') },
    { value: 'Harassment', label: this.i18n.t('portal.grievances.type_Harassment') },
    { value: 'Discrimination', label: this.i18n.t('portal.grievances.type_Discrimination') },
    { value: 'SafetyConcern', label: this.i18n.t('portal.grievances.type_SafetyConcern') },
    { value: 'PolicyViolation', label: this.i18n.t('portal.grievances.type_PolicyViolation') },
    { value: 'Compensation', label: this.i18n.t('portal.grievances.type_Compensation') },
    { value: 'Other', label: this.i18n.t('portal.grievances.type_Other') }
  ]);

  columns: TableColumn[] = [
    { key: 'type', label: this.i18n.t('portal.grievances.type'), sortable: true, priority: 'high' },
    { key: 'subject', label: this.i18n.t('portal.grievances.subject'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('portal.status'), sortable: true, priority: 'high', renderHtml: true },
    { key: 'confidential', label: this.i18n.t('portal.grievances.confidential'), priority: 'medium', renderHtml: true },
    { key: 'filedAtUtc', label: this.i18n.t('portal.grievances.filed'), sortable: true, priority: 'medium' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view_details'), icon: 'bi-eye', color: 'info' }
  ]);

  tableData = computed(() => {
    return this.grievances().map(g => ({
      ...g,
      type: this.getTypeLabel(g.type),
      status: this.getStatusBadgeHtml(g.status),
      confidential: g.isConfidential
        ? `<span class="badge bg-warning"><i class="bi bi-lock-fill me-1"></i>${this.i18n.t('common.yes')}</span>`
        : `<span class="badge bg-secondary">${this.i18n.t('common.no')}</span>`,
      filedAtUtc: g.filedAtUtc ? new Date(g.filedAtUtc).toLocaleDateString(this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US') : '-'
    }));
  });

  ngOnInit(): void { this.loadGrievances(); }

  refresh(): void { this.loadGrievances(); }

  loadGrievances(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: Grievance[]; totalCount: number }>(`${this.baseUrl}/portal/my-grievances`).subscribe({
      next: (res) => { this.grievances.set(res.data); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  openNewGrievance(): void {
    this.selectedType.set(null);
    this.subject.set('');
    this.description.set('');
    this.isConfidential.set(false);
    this.showModal.set(true);
  }

  submitGrievance(): void {
    if (!this.selectedType() || !this.subject().trim() || !this.description().trim()) return;
    this.saving.set(true);
    this.http.post(`${this.baseUrl}/portal/my-grievances`, {
      type: this.selectedType(),
      subject: this.subject(),
      description: this.description(),
      isConfidential: this.isConfidential()
    }).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('portal.grievances.submitted'));
        this.showModal.set(false);
        this.saving.set(false);
        this.loadGrievances();
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error'));
        this.saving.set(false);
      }
    });
  }

  onAction(event: { action: string; item: any }): void {
    // View details can be extended later
  }

  getStatusBadgeHtml(status: string): string {
    switch (status) {
      case 'Filed':
        return `<span class="badge bg-info">${this.i18n.t('portal.grievances.status_Filed')}</span>`;
      case 'UnderReview':
        return `<span class="badge bg-warning">${this.i18n.t('portal.grievances.status_UnderReview')}</span>`;
      case 'InvestigationInProgress':
        return `<span class="badge bg-primary">${this.i18n.t('portal.grievances.status_InvestigationInProgress')}</span>`;
      case 'Resolved':
        return `<span class="badge bg-success">${this.i18n.t('portal.grievances.status_Resolved')}</span>`;
      case 'Closed':
        return `<span class="badge bg-secondary">${this.i18n.t('portal.grievances.status_Closed')}</span>`;
      case 'Rejected':
        return `<span class="badge bg-danger">${this.i18n.t('portal.grievances.status_Rejected')}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }

  private getTypeLabel(type: string): string {
    const match = this.grievanceTypes().find(t => t.value === type);
    return match ? match.label : type;
  }
}
