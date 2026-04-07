import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PerformanceService } from '../../../../core/services/performance.service';
import { FeedbackRequest360 } from '../../../../shared/models/performance.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-view-feedback-request',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, FormHeaderComponent, LoadingSpinnerComponent,
    SectionCardComponent, DefinitionListComponent, StatusBadgeComponent
  ],
  templateUrl: './view-feedback-request.component.html',
  styleUrls: ['./view-feedback-request.component.css']
})
export class ViewFeedbackRequestComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(PerformanceService);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  loading = signal(false);
  request = signal<FeedbackRequest360 | null>(null);
  processing = signal(false);

  // Feedback response form
  responseForm = {
    ratings: '',
    strengths: '',
    areasForImprovement: '',
    additionalComments: '',
    isAnonymous: true
  };

  statusBadge = computed(() => {
    const s = this.request()?.status;
    if (!s) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { 'Requested': 'warning', 'Submitted': 'success', 'Expired': 'dark', 'Declined': 'danger' };
    return { label: this.i18n.t('feedback_360.status_' + s), variant: map[s] || 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const r = this.request();
    if (!r) return [];
    return [
      { label: this.i18n.t('feedback_360.reviewee'), value: r.revieweeName || '-' },
      { label: this.i18n.t('feedback_360.reviewer'), value: r.requestedFromName || '-' },
      { label: this.i18n.t('feedback_360.cycle'), value: r.cycleName || '-' },
      { label: this.i18n.t('feedback_360.deadline'), value: r.deadline, type: 'date' },
      { label: this.i18n.t('feedback_360.submitted_at'), value: r.submittedAt, type: 'date' },
      { label: this.i18n.t('common.created_at'), value: r.createdAtUtc, type: 'date' }
    ];
  });

  isRequested = computed(() => this.request()?.status === 'Requested');

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) this.loadData(+id);
  }

  loadData(id: number): void {
    this.loading.set(true);
    this.service.getFeedbackRequests({ page: 1, pageSize: 1 }).subscribe({
      next: (res) => {
        const found = res.data?.find((r: FeedbackRequest360) => r.id === id);
        if (found) {
          this.request.set(found);
        }
        this.loading.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('feedback_360.load_error')); this.loading.set(false); }
    });
  }

  async submitFeedback(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('feedback_360.submit'),
      message: this.i18n.t('feedback_360.confirm_submit'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-primary'
    });
    if (result.confirmed) {
      this.processing.set(true);
      this.service.submitFeedback360(this.request()!.id, this.responseForm).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('feedback_360.submitted_success'));
          this.router.navigate(['/performance/feedback-requests']);
        },
        error: () => { this.notification.error(this.i18n.t('feedback_360.submit_error')); this.processing.set(false); }
      });
    }
  }

  async declineRequest(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('feedback_360.decline'),
      message: this.i18n.t('feedback_360.confirm_decline'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-times-circle',
      iconClass: 'text-danger'
    });
    if (result.confirmed) {
      this.processing.set(true);
      this.service.declineFeedback360(this.request()!.id).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('feedback_360.declined_success'));
          this.router.navigate(['/performance/feedback-requests']);
        },
        error: () => { this.notification.error(this.i18n.t('feedback_360.decline_error')); this.processing.set(false); }
      });
    }
  }

  goBack(): void { this.router.navigate(['/performance/feedback-requests']); }
}
