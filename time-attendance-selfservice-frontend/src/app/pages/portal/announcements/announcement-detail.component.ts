import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DetailCardComponent } from '../../../shared/components/detail-card/detail-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { Announcement } from './announcements.component';

@Component({
  selector: 'app-announcement-detail',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    DetailCardComponent,
    DefinitionListComponent
  ],
  templateUrl: './announcement-detail.component.html',
  styleUrl: './announcement-detail.component.css'
})
export class AnnouncementDetailComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  announcement = signal<Announcement | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  acknowledging = signal(false);

  detailItems = computed<DefinitionItem[]>(() => {
    const a = this.announcement();
    if (!a) return [];
    return [
      { label: this.i18n.t('portal.announcements.category'), value: a.category || '-' },
      { label: this.i18n.t('portal.announcements.priority_label'), value: this.getPriorityLabel(a.priority) },
      { label: this.i18n.t('portal.announcements.published_date'), value: this.formatDate(a.publishedDate) },
      ...(a.expiryDate ? [{ label: this.i18n.t('portal.announcements.expiry_date'), value: this.formatDate(a.expiryDate) }] : []),
      ...(a.publishedBy ? [{ label: this.i18n.t('portal.announcements.published_by'), value: a.publishedBy }] : [])
    ];
  });

  canAcknowledge = computed(() => {
    const a = this.announcement();
    return a && a.requiresAcknowledgment && !a.isAcknowledged;
  });

  isAcknowledged = computed(() => {
    const a = this.announcement();
    return a && a.isAcknowledged;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAnnouncement(+id);
    }
  }

  loadAnnouncement(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Announcement>(`${this.baseUrl}/portal/announcements/${id}`).subscribe({
      next: (data) => {
        this.announcement.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.i18n.t('common.error'));
        this.loading.set(false);
      }
    });
  }

  acknowledge(): void {
    const a = this.announcement();
    if (!a) return;
    this.acknowledging.set(true);
    this.http.post(`${this.baseUrl}/portal/announcements/${a.id}/acknowledge`, {}).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('portal.announcements.acknowledged'));
        this.announcement.set({ ...a, isAcknowledged: true });
        this.acknowledging.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error'));
        this.acknowledging.set(false);
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/announcements']);
  }

  getLocalizedTitle(a: Announcement): string {
    if (this.i18n.locale() === 'ar' && a.titleAr) return a.titleAr;
    return a.title;
  }

  getLocalizedContent(a: Announcement): string {
    if (this.i18n.locale() === 'ar' && a.contentAr) return a.contentAr;
    return a.content;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  getPriorityBadgeClass(priority: string): string {
    switch (priority) {
      case 'Urgent': return 'badge bg-danger';
      case 'High': return 'badge bg-warning text-dark';
      case 'Normal': return 'badge bg-primary';
      case 'Low': return 'badge bg-secondary';
      default: return 'badge bg-secondary';
    }
  }

  getPriorityLabel(priority: string): string {
    switch (priority) {
      case 'Urgent': return this.i18n.t('portal.announcements.priority_urgent');
      case 'High': return this.i18n.t('portal.announcements.priority_high');
      case 'Normal': return this.i18n.t('portal.announcements.priority_normal');
      case 'Low': return this.i18n.t('portal.announcements.priority_low');
      default: return priority;
    }
  }

  downloadAttachment(attachment: { fileUrl: string; fileName: string }): void {
    window.open(attachment.fileUrl, '_blank');
  }
}
