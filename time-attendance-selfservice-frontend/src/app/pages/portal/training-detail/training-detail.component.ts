import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

interface TrainingDetail {
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
  instructorBio?: string;
  maxParticipants: number;
  enrolledCount: number;
  availableSpots: number;
  duration?: string;
  objectives?: string;
  prerequisites?: string;
  status: string;
  enrollmentStatus?: string;
  isEnrolled: boolean;
  completionDate?: string;
  hasEvaluated: boolean;
}

interface EvaluationForm {
  overallRating: number;
  contentRating: number;
  instructorRating: number;
  materialsRating: number;
  comments: string;
}

@Component({
  selector: 'app-training-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './training-detail.component.html',
  styleUrl: './training-detail.component.css'
})
export class TrainingDetailComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  detail = signal<TrainingDetail | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  enrolling = signal(false);
  submittingEval = signal(false);
  showEvalForm = signal(false);

  evaluation = signal<EvaluationForm>({
    overallRating: 0,
    contentRating: 0,
    instructorRating: 0,
    materialsRating: 0,
    comments: ''
  });

  ratingOptions = [1, 2, 3, 4, 5];

  canEvaluate = computed(() => {
    const d = this.detail();
    return d && d.isEnrolled && d.enrollmentStatus === 'Completed' && !d.hasEvaluated;
  });

  canEnroll = computed(() => {
    const d = this.detail();
    return d && !d.isEnrolled && d.availableSpots > 0;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDetail(+id);
    }
  }

  loadDetail(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<TrainingDetail>(`${this.baseUrl}/portal/my-training/${id}`).subscribe({
      next: (data) => { this.detail.set(data); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  getTitle(): string {
    const d = this.detail();
    if (!d) return '';
    return this.i18n.locale() === 'ar' && d.courseTitleAr ? d.courseTitleAr : d.courseTitle;
  }

  getDescription(): string {
    const d = this.detail();
    if (!d) return '';
    return this.i18n.locale() === 'ar' && d.courseDescriptionAr ? d.courseDescriptionAr : (d.courseDescription || '');
  }

  getCategoryLabel(): string {
    const d = this.detail();
    if (!d) return '';
    return this.i18n.locale() === 'ar' && d.categoryAr ? d.categoryAr : d.category;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return new Date(dateStr).toLocaleDateString(locale);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Pending': return 'bg-warning';
      case 'Approved': return 'bg-info';
      case 'InProgress': return 'bg-primary';
      case 'Completed': return 'bg-success';
      case 'Cancelled': return 'bg-secondary';
      case 'Failed': return 'bg-danger';
      case 'Waitlisted': return 'bg-warning text-dark';
      default: return 'bg-secondary';
    }
  }

  getDeliveryLabel(method: string): string {
    return this.i18n.t('portal.training.delivery_' + method);
  }

  enroll(): void {
    const d = this.detail();
    if (!d) return;
    this.enrolling.set(true);
    this.http.post(`${this.baseUrl}/training-enrollments`, { trainingSessionId: d.id }).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('portal.training.enrolled_success'));
        this.enrolling.set(false);
        this.loadDetail(d.id);
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error'));
        this.enrolling.set(false);
      }
    });
  }

  openEvaluation(): void {
    this.evaluation.set({ overallRating: 0, contentRating: 0, instructorRating: 0, materialsRating: 0, comments: '' });
    this.showEvalForm.set(true);
  }

  setRating(field: keyof EvaluationForm, value: number): void {
    this.evaluation.update(e => ({ ...e, [field]: value }));
  }

  setComments(value: string): void {
    this.evaluation.update(e => ({ ...e, comments: value }));
  }

  submitEvaluation(): void {
    const d = this.detail();
    const e = this.evaluation();
    if (!d || e.overallRating === 0) return;
    this.submittingEval.set(true);
    this.http.post(`${this.baseUrl}/training-evaluations`, {
      trainingSessionId: d.id,
      overallRating: e.overallRating,
      contentRating: e.contentRating,
      instructorRating: e.instructorRating,
      materialsRating: e.materialsRating,
      comments: e.comments
    }).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('portal.training.evaluation_submitted'));
        this.submittingEval.set(false);
        this.showEvalForm.set(false);
        this.loadDetail(d.id);
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error'));
        this.submittingEval.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/my-training']);
  }
}
