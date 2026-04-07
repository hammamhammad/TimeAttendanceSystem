import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PerformanceService } from '../../../../core/services/performance.service';
import { PerformanceReview } from '../../../../shared/models/performance.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent],
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.css']
})
export class ViewReviewComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private service = inject(PerformanceService);

  loading = signal(true);
  item = signal<PerformanceReview | null>(null);
  error = signal<string | null>(null);
  showSelfForm = signal(false);
  showManagerForm = signal(false);
  submittingAction = signal(false);

  selfForm = this.fb.group({
    selfRating: ['MeetsExpectations', Validators.required],
    selfComments: ['']
  });

  managerForm = this.fb.group({
    managerRating: ['MeetsExpectations', Validators.required],
    managerComments: [''],
    strengths: [''],
    areasForImprovement: ['']
  });

  ratingOptions = ['Exceptional', 'ExceedsExpectations', 'MeetsExpectations', 'NeedsImprovement', 'Unsatisfactory'];

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      'NotStarted': { label: this.i18n.t('performance_reviews.status_not_started'), variant: 'secondary' },
      'SelfReview': { label: this.i18n.t('performance_reviews.status_self_review'), variant: 'info' },
      'SelfAssessmentPending': { label: this.i18n.t('performance_reviews.status_self_review'), variant: 'info' },
      'ManagerReview': { label: this.i18n.t('performance_reviews.status_manager_review'), variant: 'warning' },
      'ManagerAssessmentPending': { label: this.i18n.t('performance_reviews.status_manager_review'), variant: 'warning' },
      'Calibration': { label: this.i18n.t('performance_reviews.status_calibration'), variant: 'primary' },
      'Completed': { label: this.i18n.t('performance_reviews.status_completed'), variant: 'success' },
      'Acknowledged': { label: this.i18n.t('performance_reviews.status_acknowledged'), variant: 'success' }
    };
    return map[d.status] ?? { label: d.status, variant: 'secondary' as StatusVariant };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('fields.employee'), value: d.employeeName || '-' },
      { label: this.i18n.t('performance_reviews.cycle'), value: d.cycleName || '-' },
      { label: this.i18n.t('performance_reviews.reviewer'), value: d.reviewerName || '-' },
      { label: this.i18n.t('fields.department'), value: d.departmentName || '-' },
      { label: this.i18n.t('performance_reviews.self_rating'), value: d.selfRating != null ? String(d.selfRating) : '-' },
      { label: this.i18n.t('performance_reviews.manager_rating'), value: d.managerRating != null ? String(d.managerRating) : '-' },
      { label: this.i18n.t('performance_reviews.final_rating'), value: d.finalRating != null ? String(d.finalRating) : '-' },
      { label: this.i18n.t('performance_reviews.overall_rating'), value: d.overallRating || '-' }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    const actions: FormHeaderAction[] = [];
    if (d.status === 'SelfReview' || d.status === 'SelfAssessmentPending') {
      actions.push({ label: this.i18n.t('performance_reviews.submit_self_review'), icon: 'fas fa-user-check', action: () => this.showSelfForm.set(true), type: 'info' });
    }
    if (d.status === 'ManagerReview' || d.status === 'ManagerAssessmentPending') {
      actions.push({ label: this.i18n.t('performance_reviews.submit_manager_review'), icon: 'fas fa-user-tie', action: () => this.showManagerForm.set(true), type: 'warning' });
    }
    if (d.status === 'Calibration') {
      actions.push({ label: this.i18n.t('common.approve'), icon: 'fas fa-check', action: () => this.approveReview(), type: 'success' });
    }
    if (d.status === 'Completed') {
      actions.push({ label: this.i18n.t('performance_reviews.acknowledge'), icon: 'fas fa-thumbs-up', action: () => this.acknowledgeReview(), type: 'primary' });
    }
    return actions;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/performance/reviews']); return; }
    this.service.getReview(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('performance_reviews.load_error')); this.loading.set(false); }
    });
  }

  submitSelfReview(): void {
    if (this.selfForm.invalid) return;
    this.submittingAction.set(true);
    const v = this.selfForm.getRawValue();
    this.service.submitSelfReview(this.item()!.id, {
      selfRating: v.selfRating,
      selfComments: v.selfComments || undefined
    }).subscribe({
      next: (u) => {
        this.item.set(u);
        this.showSelfForm.set(false);
        this.submittingAction.set(false);
        this.notification.success(this.i18n.t('performance_reviews.self_review_success'));
      },
      error: () => {
        this.notification.error(this.i18n.t('performance_reviews.self_review_error'));
        this.submittingAction.set(false);
      }
    });
  }

  submitManagerReview(): void {
    if (this.managerForm.invalid) return;
    this.submittingAction.set(true);
    const v = this.managerForm.getRawValue();
    this.service.submitManagerReview(this.item()!.id, {
      managerRating: v.managerRating,
      managerComments: v.managerComments || undefined,
      strengths: v.strengths || undefined,
      areasForImprovement: v.areasForImprovement || undefined
    }).subscribe({
      next: (u) => {
        this.item.set(u);
        this.showManagerForm.set(false);
        this.submittingAction.set(false);
        this.notification.success(this.i18n.t('performance_reviews.manager_review_success'));
      },
      error: () => {
        this.notification.error(this.i18n.t('performance_reviews.manager_review_error'));
        this.submittingAction.set(false);
      }
    });
  }

  async approveReview(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('common.approve'),
      message: this.i18n.t('performance_reviews.confirm_approve'),
      confirmText: this.i18n.t('common.approve'),
      confirmButtonClass: 'btn-success'
    });
    if (!result.confirmed) return;
    this.service.submitManagerReview(this.item()!.id, { approve: true }).subscribe({
      next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('performance_reviews.approved_success')); },
      error: () => this.notification.error(this.i18n.t('performance_reviews.approve_error'))
    });
  }

  async acknowledgeReview(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('performance_reviews.acknowledge'),
      message: this.i18n.t('performance_reviews.confirm_acknowledge'),
      confirmText: this.i18n.t('performance_reviews.acknowledge'),
      confirmButtonClass: 'btn-primary'
    });
    if (!result.confirmed) return;
    this.service.submitSelfReview(this.item()!.id, { acknowledge: true }).subscribe({
      next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('performance_reviews.acknowledged_success')); },
      error: () => this.notification.error(this.i18n.t('performance_reviews.acknowledge_error'))
    });
  }
}
