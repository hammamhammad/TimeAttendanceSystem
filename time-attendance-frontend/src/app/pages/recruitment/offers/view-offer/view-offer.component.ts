import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { RecruitmentService } from '../../../../core/services/recruitment.service';
import { OfferLetter } from '../../../../shared/models/recruitment.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { FileUploadComponent, FileUploadedEvent } from '../../../../shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-view-offer',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent, FileUploadComponent],
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.css']
})
export class ViewOfferComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private service = inject(RecruitmentService);

  loading = signal(true);
  item = signal<OfferLetter | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      'Draft': { label: this.i18n.t('common.draft'), variant: 'secondary' },
      'Approved': { label: this.i18n.t('common.approved'), variant: 'info' },
      'Sent': { label: this.i18n.t('offer_letters.status_sent'), variant: 'primary' },
      'Accepted': { label: this.i18n.t('offer_letters.status_accepted'), variant: 'success' },
      'Declined': { label: this.i18n.t('offer_letters.status_declined'), variant: 'danger' },
      'Expired': { label: this.i18n.t('common.expired'), variant: 'dark' },
      'Withdrawn': { label: this.i18n.t('offer_letters.status_withdrawn'), variant: 'dark' }
    };
    return map[d.status] ?? { label: d.status, variant: 'secondary' as StatusVariant };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('offer_letters.candidate'), value: d.candidateName || '-' },
      { label: this.i18n.t('offer_letters.position'), value: d.jobTitle },
      { label: this.i18n.t('fields.department'), value: d.departmentName || '-' },
      { label: this.i18n.t('fields.branch'), value: d.branchName || '-' },
      { label: this.i18n.t('offer_letters.salary'), value: `${d.offeredSalary.toLocaleString()} ${d.currency}` },
      { label: this.i18n.t('offer_letters.employment_type'), value: d.employmentType || d.contractType },
      { label: this.i18n.t('offer_letters.start_date'), value: d.startDate },
      { label: this.i18n.t('offer_letters.expiry_date'), value: d.expiryDate },
      { label: this.i18n.t('offer_letters.approved_by'), value: d.approvedByName || '-' },
      { label: this.i18n.t('offer_letters.sent_at'), value: d.sentAt ? new Date(d.sentAt).toLocaleString() : '-' },
      { label: this.i18n.t('offer_letters.responded_at'), value: d.respondedAt ? new Date(d.respondedAt).toLocaleString() : '-' }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    const actions: FormHeaderAction[] = [];
    if (d.status === 'Approved') actions.push({ label: this.i18n.t('offer_letters.send'), icon: 'fas fa-paper-plane', action: () => this.send(), type: 'primary' });
    if (d.status === 'Sent') {
      actions.push({ label: this.i18n.t('offer_letters.accept'), icon: 'fas fa-check', action: () => this.accept(), type: 'success' });
      actions.push({ label: this.i18n.t('offer_letters.decline'), icon: 'fas fa-times', action: () => this.decline(), type: 'danger' });
    }
    if (d.status !== 'Accepted' && d.status !== 'Declined' && d.status !== 'Expired' && d.status !== 'Withdrawn')
      actions.push({ label: this.i18n.t('offer_letters.withdraw'), icon: 'fas fa-undo', action: () => this.withdraw(), type: 'warning' });
    return actions;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/recruitment/offers']); return; }
    this.service.getOffer(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('offer_letters.load_error')); this.loading.set(false); }
    });
  }

  onDocumentUploaded(event: FileUploadedEvent): void {
    this.notification.success(this.i18n.t('files.upload'));
  }

  send(): void { this.service.sendOffer(this.item()!.id).subscribe({ next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('offer_letters.sent_success')); }, error: () => this.notification.error(this.i18n.t('offer_letters.send_error')) }); }
  accept(): void { this.service.acceptOffer(this.item()!.id).subscribe({ next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('offer_letters.accepted_success')); }, error: () => this.notification.error(this.i18n.t('offer_letters.accept_error')) }); }
  decline(): void { this.service.declineOffer(this.item()!.id, 'Declined').subscribe({ next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('offer_letters.declined_success')); }, error: () => this.notification.error(this.i18n.t('offer_letters.decline_error')) }); }
  withdraw(): void { this.service.withdrawOffer(this.item()!.id).subscribe({ next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('offer_letters.withdrawn_success')); }, error: () => this.notification.error(this.i18n.t('offer_letters.withdraw_error')) }); }
}
