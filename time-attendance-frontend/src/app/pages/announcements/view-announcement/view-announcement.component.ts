import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { AnnouncementService } from '../../../core/services/announcement.service';
import { AnnouncementDto, AnnouncementAcknowledgmentDto } from '../../../shared/models/announcement.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-view-announcement',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent, DataTableComponent],
  templateUrl: './view-announcement.component.html',
  styleUrl: './view-announcement.component.css'
})
export class ViewAnnouncementComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(AnnouncementService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  loading = signal(false);
  processing = signal(false);
  announcement = signal<AnnouncementDto | null>(null);
  acknowledgments = signal<AnnouncementAcknowledgmentDto[]>([]);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const a = this.announcement();
    if (!a) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      Draft: { label: this.i18n.t('announcements.status_Draft'), variant: 'secondary' },
      Scheduled: { label: this.i18n.t('announcements.status_Scheduled'), variant: 'info' },
      Published: { label: this.i18n.t('announcements.status_Published'), variant: 'success' },
      Expired: { label: this.i18n.t('announcements.status_Expired'), variant: 'warning' },
      Archived: { label: this.i18n.t('announcements.status_Archived'), variant: 'dark' }
    };
    return map[a.status] ?? { label: a.status, variant: 'secondary' as StatusVariant };
  });

  priorityBadge = computed(() => {
    const a = this.announcement();
    if (!a) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      Low: { label: this.i18n.t('announcements.priority_Low'), variant: 'secondary' },
      Normal: { label: this.i18n.t('announcements.priority_Normal'), variant: 'primary' },
      High: { label: this.i18n.t('announcements.priority_High'), variant: 'warning' },
      Urgent: { label: this.i18n.t('announcements.priority_Urgent'), variant: 'danger' }
    };
    return map[a.priority] ?? { label: a.priority, variant: 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const a = this.announcement();
    if (!a) return [];
    return [
      { label: this.i18n.t('announcements.title_field'), value: a.title },
      { label: this.i18n.t('announcements.title_ar'), value: a.titleAr ?? '-' },
      { label: this.i18n.t('announcements.category'), value: a.categoryName },
      { label: this.i18n.t('announcements.priority'), value: this.i18n.t('announcements.priority_' + a.priority) },
      { label: this.i18n.t('announcements.target_audience'), value: this.i18n.t('announcements.target_' + a.targetAudience) },
      { label: this.i18n.t('announcements.target_names'), value: a.targetNames?.join(', ') || '-' },
      { label: this.i18n.t('announcements.scheduled_date'), value: a.scheduledDate ? new Date(a.scheduledDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('announcements.expiry_date'), value: a.expiryDate ? new Date(a.expiryDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('announcements.published_at'), value: a.publishedAtUtc ? new Date(a.publishedAtUtc).toLocaleString() : '-' },
      { label: this.i18n.t('announcements.pinned'), value: a.isPinned ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('announcements.requires_acknowledgment'), value: a.requiresAcknowledgment ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('announcements.acknowledge_count'), value: `${a.acknowledgmentCount} / ${a.totalTargetEmployees}` },
      { label: this.i18n.t('announcements.created_by'), value: a.createdByName },
      { label: this.i18n.t('common.created_date'), value: a.createdAtUtc ? new Date(a.createdAtUtc).toLocaleString() : '-' }
    ];
  });

  contentItems = computed<DefinitionItem[]>(() => {
    const a = this.announcement();
    if (!a) return [];
    return [
      { label: this.i18n.t('announcements.content'), value: a.content },
      { label: this.i18n.t('announcements.content_ar'), value: a.contentAr ?? '-' }
    ];
  });

  ackColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('common.employee'), sortable: true, priority: 'high' },
    { key: 'employeeNumber', label: this.i18n.t('employees.employee_number'), sortable: true, priority: 'medium' },
    { key: 'acknowledgedAtUtc', label: this.i18n.t('common.date'), sortable: true, priority: 'high' }
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/announcements']); return; }
    this.loadAnnouncement(+id);
  }

  loadAnnouncement(id: number): void {
    this.loading.set(true);
    this.service.getAnnouncement(id).subscribe({
      next: (a) => {
        this.announcement.set(a);
        this.loading.set(false);
        if (a.requiresAcknowledgment) { this.loadAcknowledgments(id); }
      },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  loadAcknowledgments(id: number): void {
    this.service.getAcknowledgments(id).subscribe({
      next: (acks) => this.acknowledgments.set(acks),
      error: () => {}
    });
  }

  async publishAnnouncement(): Promise<void> {
    const a = this.announcement();
    if (!a) return;
    const result = await this.confirmation.confirm({ title: this.i18n.t('announcements.publish'), message: this.i18n.t('announcements.confirm_publish'), confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-success' });
    if (!result.confirmed) return;
    this.processing.set(true);
    this.service.publishAnnouncement(a.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('announcements.published')); this.loadAnnouncement(a.id); this.processing.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.processing.set(false); }
    });
  }

  async archiveAnnouncement(): Promise<void> {
    const a = this.announcement();
    if (!a) return;
    const result = await this.confirmation.confirm({ title: this.i18n.t('announcements.archive'), message: this.i18n.t('announcements.confirm_archive'), confirmText: this.i18n.t('common.confirm'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-warning' });
    if (!result.confirmed) return;
    this.processing.set(true);
    this.service.archiveAnnouncement(a.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('announcements.archived')); this.loadAnnouncement(a.id); this.processing.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.processing.set(false); }
    });
  }

  editAnnouncement(): void {
    const a = this.announcement();
    if (a) this.router.navigate(['/announcements', a.id, 'edit']);
  }
}
