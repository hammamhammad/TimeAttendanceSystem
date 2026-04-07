import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

interface TrainingSession {
  id: number;
  courseTitle: string;
  courseTitleAr?: string;
  courseDescription?: string;
  courseDescriptionAr?: string;
  category: string;
  categoryAr?: string;
  startDate: string;
  endDate: string;
  location?: string;
  deliveryMethod: string;
  instructorName?: string;
  availableSpots: number;
  maxParticipants: number;
  enrolledCount: number;
  isEnrolled: boolean;
  duration?: string;
}

@Component({
  selector: 'app-training-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent, EmptyStateComponent],
  templateUrl: './training-catalog.component.html',
  styleUrl: './training-catalog.component.css'
})
export class TrainingCatalogComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  sessions = signal<TrainingSession[]>([]);
  categories = signal<string[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  enrollingId = signal<number | null>(null);
  selectedCategory = signal<string>('');
  searchTerm = signal('');

  filteredSessions = computed(() => {
    let items = this.sessions();
    const cat = this.selectedCategory();
    const term = this.searchTerm().toLowerCase();
    if (cat) {
      items = items.filter(s => s.category === cat);
    }
    if (term) {
      items = items.filter(s =>
        s.courseTitle.toLowerCase().includes(term) ||
        (s.courseTitleAr && s.courseTitleAr.includes(term)) ||
        (s.instructorName && s.instructorName.toLowerCase().includes(term))
      );
    }
    return items;
  });

  ngOnInit(): void {
    this.loadCatalog();
  }

  refresh(): void {
    this.loadCatalog();
  }

  loadCatalog(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: TrainingSession[]; totalCount: number }>(`${this.baseUrl}/portal/training-catalog`).subscribe({
      next: (res) => {
        this.sessions.set(res.data);
        const cats = [...new Set(res.data.map(s => s.category))].filter(Boolean);
        this.categories.set(cats);
        this.loading.set(false);
      },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  getTitle(session: TrainingSession): string {
    return this.i18n.locale() === 'ar' && session.courseTitleAr ? session.courseTitleAr : session.courseTitle;
  }

  getDescription(session: TrainingSession): string {
    return this.i18n.locale() === 'ar' && session.courseDescriptionAr ? session.courseDescriptionAr : (session.courseDescription || '');
  }

  getCategoryLabel(session: TrainingSession): string {
    return this.i18n.locale() === 'ar' && session.categoryAr ? session.categoryAr : session.category;
  }

  getDeliveryLabel(method: string): string {
    return this.i18n.t('portal.training.delivery_' + method);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return new Date(dateStr).toLocaleDateString(locale);
  }

  enroll(session: TrainingSession): void {
    this.enrollingId.set(session.id);
    this.http.post(`${this.baseUrl}/training-enrollments`, { trainingSessionId: session.id }).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('portal.training.enrolled_success'));
        this.enrollingId.set(null);
        this.loadCatalog();
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error'));
        this.enrollingId.set(null);
      }
    });
  }

  viewDetails(session: TrainingSession): void {
    this.router.navigate(['/training', session.id]);
  }
}
