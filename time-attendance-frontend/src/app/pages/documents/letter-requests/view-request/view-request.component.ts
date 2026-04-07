import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { DocumentService } from '../../../../core/services/document.service';
import { LetterRequestDto } from '../../../../shared/models/document.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-request',
  standalone: true,
  imports: [FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-request.component.html',
  styleUrl: './view-request.component.css'
})
export class ViewRequestComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(DocumentService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  loading = signal(false);
  processing = signal(false);
  request = signal<LetterRequestDto | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const r = this.request();
    if (!r) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      Pending: { label: this.i18n.t('letter_requests.status_Pending'), variant: 'warning' },
      Approved: { label: this.i18n.t('letter_requests.status_Approved'), variant: 'success' },
      Rejected: { label: this.i18n.t('letter_requests.status_Rejected'), variant: 'danger' },
      Generated: { label: this.i18n.t('letter_requests.status_Generated'), variant: 'info' },
      Delivered: { label: this.i18n.t('letter_requests.status_Delivered'), variant: 'primary' }
    };
    return map[r.status] ?? { label: r.status, variant: 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const r = this.request();
    if (!r) return [];
    return [
      { label: this.i18n.t('letter_requests.employee'), value: r.employeeName },
      { label: this.i18n.t('letter_requests.employee_number'), value: r.employeeNumber },
      { label: this.i18n.t('letter_requests.template'), value: r.templateName },
      { label: this.i18n.t('letter_requests.purpose'), value: r.purpose ?? '-' },
      { label: this.i18n.t('letter_requests.requested_at'), value: r.requestedAtUtc ? new Date(r.requestedAtUtc).toLocaleDateString() : '-' },
      { label: this.i18n.t('letter_requests.processed_by'), value: r.processedByName ?? '-' },
      { label: this.i18n.t('letter_requests.rejection_reason'), value: r.rejectionReason ?? '-' },
      { label: this.i18n.t('letter_requests.notes'), value: r.notes ?? '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/documents/letter-requests']); return; }
    this.loading.set(true);
    this.service.getLetterRequest(+id).subscribe({
      next: (r) => { this.request.set(r); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  async generateLetter(): Promise<void> {
    const r = this.request();
    if (!r) return;
    this.processing.set(true);
    this.service.generateLetter(r.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('letter_requests.generated')); this.ngOnInit(); this.processing.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.processing.set(false); }
    });
  }
}
