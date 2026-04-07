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

interface DisciplinaryAction {
  id: number;
  type: string;
  reason: string;
  issuedAtUtc: string;
  effectiveDate?: string;
  status: string;
  isAcknowledged: boolean;
  acknowledgedAtUtc?: string;
  appealNotes?: string;
  appealStatus?: string;
}

@Component({
  selector: 'app-my-disciplinary',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, ModalWrapperComponent, EmptyStateComponent],
  templateUrl: './my-disciplinary.component.html',
  styleUrl: './my-disciplinary.component.css'
})
export class MyDisciplinaryComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  actions = signal<DisciplinaryAction[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Appeal modal
  showAppealModal = signal(false);
  appealNotes = signal('');
  appealTargetId = signal<number | null>(null);
  saving = signal(false);

  columns: TableColumn[] = [
    { key: 'type', label: this.i18n.t('portal.disciplinary.type'), sortable: true, priority: 'high', renderHtml: true },
    { key: 'reason', label: this.i18n.t('portal.disciplinary.reason'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('portal.status'), sortable: true, priority: 'high', renderHtml: true },
    { key: 'acknowledged', label: this.i18n.t('portal.disciplinary.acknowledged'), priority: 'medium', renderHtml: true },
    { key: 'issuedAtUtc', label: this.i18n.t('portal.disciplinary.issued_at'), sortable: true, priority: 'medium' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'acknowledge', label: this.i18n.t('portal.disciplinary.acknowledge'), icon: 'bi-check-circle', color: 'success', condition: (item: any) => !item.isAcknowledged && item.rawStatus !== 'Appealed' },
    { key: 'appeal', label: this.i18n.t('portal.disciplinary.appeal'), icon: 'bi-shield-exclamation', color: 'warning', condition: (item: any) => item.isAcknowledged && item.rawStatus !== 'Appealed' && item.rawStatus !== 'AppealApproved' && item.rawStatus !== 'AppealRejected' }
  ]);

  tableData = computed(() => {
    return this.actions().map(a => ({
      ...a,
      rawStatus: a.status,
      type: this.getTypeBadgeHtml(a.type),
      status: this.getStatusBadgeHtml(a.status),
      acknowledged: a.isAcknowledged
        ? `<span class="badge bg-success"><i class="bi bi-check-circle me-1"></i>${this.i18n.t('common.yes')}</span>`
        : `<span class="badge bg-warning">${this.i18n.t('portal.disciplinary.pending')}</span>`,
      issuedAtUtc: a.issuedAtUtc ? new Date(a.issuedAtUtc).toLocaleDateString(this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US') : '-'
    }));
  });

  ngOnInit(): void { this.loadActions(); }

  refresh(): void { this.loadActions(); }

  loadActions(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: DisciplinaryAction[]; totalCount: number }>(`${this.baseUrl}/portal/my-disciplinary-actions`).subscribe({
      next: (res) => { this.actions.set(res.data); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onAction(event: { action: string; item: any }): void {
    if (event.action === 'acknowledge') {
      this.acknowledgeAction(event.item.id);
    } else if (event.action === 'appeal') {
      this.openAppealModal(event.item.id);
    }
  }

  acknowledgeAction(id: number): void {
    this.http.post(`${this.baseUrl}/portal/my-disciplinary-actions/${id}/acknowledge`, {}).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('portal.disciplinary.acknowledged_success'));
        this.loadActions();
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error'));
      }
    });
  }

  openAppealModal(id: number): void {
    this.appealTargetId.set(id);
    this.appealNotes.set('');
    this.showAppealModal.set(true);
  }

  submitAppeal(): void {
    const id = this.appealTargetId();
    if (!id || !this.appealNotes().trim()) return;
    this.saving.set(true);
    this.http.post(`${this.baseUrl}/portal/my-disciplinary-actions/${id}/appeal`, {
      appealNotes: this.appealNotes()
    }).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('portal.disciplinary.appeal_submitted'));
        this.showAppealModal.set(false);
        this.saving.set(false);
        this.loadActions();
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error'));
        this.saving.set(false);
      }
    });
  }

  getStatusBadgeHtml(status: string): string {
    switch (status) {
      case 'Issued':
        return `<span class="badge bg-info">${this.i18n.t('portal.disciplinary.status_Issued')}</span>`;
      case 'Acknowledged':
        return `<span class="badge bg-primary">${this.i18n.t('portal.disciplinary.status_Acknowledged')}</span>`;
      case 'Appealed':
        return `<span class="badge bg-warning">${this.i18n.t('portal.disciplinary.status_Appealed')}</span>`;
      case 'AppealApproved':
        return `<span class="badge bg-success">${this.i18n.t('portal.disciplinary.status_AppealApproved')}</span>`;
      case 'AppealRejected':
        return `<span class="badge bg-danger">${this.i18n.t('portal.disciplinary.status_AppealRejected')}</span>`;
      case 'Closed':
        return `<span class="badge bg-secondary">${this.i18n.t('portal.disciplinary.status_Closed')}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }

  getTypeBadgeHtml(type: string): string {
    switch (type) {
      case 'VerbalWarning':
        return `<span class="badge bg-warning text-dark">${this.i18n.t('portal.disciplinary.type_VerbalWarning')}</span>`;
      case 'WrittenWarning':
        return `<span class="badge bg-orange">${this.i18n.t('portal.disciplinary.type_WrittenWarning')}</span>`;
      case 'FinalWarning':
        return `<span class="badge bg-danger">${this.i18n.t('portal.disciplinary.type_FinalWarning')}</span>`;
      case 'Suspension':
        return `<span class="badge bg-dark">${this.i18n.t('portal.disciplinary.type_Suspension')}</span>`;
      case 'Demotion':
        return `<span class="badge bg-secondary">${this.i18n.t('portal.disciplinary.type_Demotion')}</span>`;
      case 'Termination':
        return `<span class="badge bg-danger">${this.i18n.t('portal.disciplinary.type_Termination')}</span>`;
      default:
        return `<span class="badge bg-secondary">${type}</span>`;
    }
  }
}
