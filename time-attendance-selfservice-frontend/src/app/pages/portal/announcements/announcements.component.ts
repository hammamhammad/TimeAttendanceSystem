import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

export interface Announcement {
  id: number;
  title: string;
  titleAr?: string;
  content: string;
  contentAr?: string;
  category: string;
  priority: string;
  isPinned: boolean;
  requiresAcknowledgment: boolean;
  isAcknowledged: boolean;
  publishedDate: string;
  expiryDate?: string;
  publishedBy?: string;
  attachments?: AnnouncementAttachment[];
}

export interface AnnouncementAttachment {
  id: number;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
}

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, EmptyStateComponent],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  announcements = signal<Announcement[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selectedCategory = signal<string>('all');

  categories = computed(() => {
    const cats = new Set<string>();
    this.announcements().forEach(a => {
      if (a.category) cats.add(a.category);
    });
    return ['all', ...Array.from(cats)];
  });

  filteredAnnouncements = computed(() => {
    const cat = this.selectedCategory();
    const all = this.announcements();
    const filtered = cat === 'all' ? all : all.filter(a => a.category === cat);
    // Sort: pinned first, then by published date desc
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });
  });

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  refresh(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: Announcement[]; totalCount: number }>(`${this.baseUrl}/portal/announcements`).subscribe({
      next: (res) => {
        this.announcements.set(res.data || []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.i18n.t('common.error'));
        this.loading.set(false);
      }
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory.set(category);
  }

  viewDetail(announcement: Announcement): void {
    this.router.navigate(['/announcements', announcement.id]);
  }

  getLocalizedTitle(a: Announcement): string {
    if (this.i18n.locale() === 'ar' && a.titleAr) return a.titleAr;
    return a.title;
  }

  getLocalizedContent(a: Announcement): string {
    if (this.i18n.locale() === 'ar' && a.contentAr) return a.contentAr;
    return a.content;
  }

  getContentPreview(a: Announcement): string {
    const content = this.getLocalizedContent(a);
    // Strip HTML tags for preview
    const stripped = content.replace(/<[^>]*>/g, '');
    return stripped.length > 150 ? stripped.substring(0, 150) + '...' : stripped;
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

  getCategoryLabel(category: string): string {
    if (category === 'all') return this.i18n.t('common.all');
    return category;
  }
}
