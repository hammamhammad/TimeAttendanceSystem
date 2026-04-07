import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { DocumentService } from '../../../../core/services/document.service';
import { EmployeeDocumentDto } from '../../../../shared/models/document.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-document',
  standalone: true,
  imports: [FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.css'
})
export class ViewDocumentComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(DocumentService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  loading = signal(false);
  processing = signal(false);
  document = signal<EmployeeDocumentDto | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const doc = this.document();
    if (!doc) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      Verified: { label: this.i18n.t('employee_documents.status_Verified'), variant: 'success' },
      PendingVerification: { label: this.i18n.t('employee_documents.status_PendingVerification'), variant: 'warning' },
      Expired: { label: this.i18n.t('employee_documents.status_Expired'), variant: 'danger' },
      Active: { label: this.i18n.t('employee_documents.status_Active'), variant: 'info' },
      Rejected: { label: this.i18n.t('employee_documents.status_Rejected'), variant: 'danger' }
    };
    return map[doc.status] ?? { label: doc.status, variant: 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const doc = this.document();
    if (!doc) return [];
    return [
      { label: this.i18n.t('employee_documents.employee'), value: doc.employeeName },
      { label: this.i18n.t('employee_documents.employee_number'), value: doc.employeeNumber },
      { label: this.i18n.t('employee_documents.category'), value: doc.categoryName },
      { label: this.i18n.t('employee_documents.title_field'), value: doc.title },
      { label: this.i18n.t('employee_documents.document_number'), value: doc.documentNumber ?? '-' },
      { label: this.i18n.t('employee_documents.issue_date'), value: doc.issueDate ? new Date(doc.issueDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('employee_documents.expiry_date'), value: doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('employee_documents.file_name'), value: doc.fileName },
      { label: this.i18n.t('employee_documents.verified_by'), value: doc.verifiedByName ?? '-' },
      { label: this.i18n.t('employee_documents.notes'), value: doc.notes ?? '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/documents/employee-documents']); return; }
    this.loading.set(true);
    this.service.getEmployeeDocument(+id).subscribe({
      next: (doc) => { this.document.set(doc); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  async verifyDocument(): Promise<void> {
    const doc = this.document();
    if (!doc) return;
    const result = await this.confirmation.confirm({ title: this.i18n.t('employee_documents.verify'), message: this.i18n.t('employee_documents.confirm_verify'), confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-success' });
    if (!result.confirmed) return;
    this.processing.set(true);
    this.service.verifyDocument(doc.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('employee_documents.verified')); this.ngOnInit(); this.processing.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.processing.set(false); }
    });
  }
}
