import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { RecruitmentService } from '../../../../core/services/recruitment.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { InterviewSchedule, InterviewFeedback, InterviewResult, InterviewRecommendation } from '../../../../shared/models/recruitment.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-view-interview',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, FormHeaderComponent, LoadingSpinnerComponent,
    SectionCardComponent, DefinitionListComponent, StatusBadgeComponent
  ],
  templateUrl: './view-interview.component.html',
  styleUrls: ['./view-interview.component.css']
})
export class ViewInterviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(RecruitmentService);
  private employeeService = inject(EmployeeService);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  loading = signal(false);
  interview = signal<InterviewSchedule | null>(null);
  feedback = signal<InterviewFeedback | null>(null);
  feedbackLoading = signal(false);
  processing = signal(false);
  activeTab = signal<'details' | 'feedback'>('details');

  employees = signal<{ id: number; name: string }[]>([]);

  // Feedback form
  feedbackForm = {
    technicalScore: 5,
    communicationScore: 5,
    culturalFitScore: 5,
    overallScore: 5,
    recommendation: 'Neutral' as InterviewRecommendation,
    strengths: '',
    weaknesses: '',
    comments: ''
  };

  resultBadge = computed(() => {
    const r = this.interview()?.result;
    if (!r) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { 'Pending': 'warning', 'Passed': 'success', 'Failed': 'danger', 'OnHold': 'info', 'NoShow': 'dark', 'Rescheduled': 'secondary' };
    return { label: this.i18n.t('interviews.result_' + r), variant: map[r] || 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const i = this.interview();
    if (!i) return [];
    return [
      { label: this.i18n.t('interviews.candidate'), value: i.candidateName || '-' },
      { label: this.i18n.t('interviews.posting'), value: i.postingTitle || '-' },
      { label: this.i18n.t('interviews.interviewer'), value: i.interviewerName || '-' },
      { label: this.i18n.t('interviews.type'), value: this.i18n.t('interviews.type_' + i.interviewType) },
      { label: this.i18n.t('interviews.scheduled_date'), value: i.scheduledDate, type: 'date' },
      { label: this.i18n.t('interviews.duration'), value: i.durationMinutes + ' min' },
      { label: this.i18n.t('interviews.location'), value: i.location || '-' },
      { label: this.i18n.t('interviews.meeting_link'), value: i.meetingLink || '-' },
      { label: this.i18n.t('interviews.notes'), value: i.notes || '-' },
      { label: this.i18n.t('common.created_at'), value: i.createdAtUtc, type: 'date' }
    ];
  });

  feedbackItems = computed<DefinitionItem[]>(() => {
    const f = this.feedback();
    if (!f) return [];
    return [
      { label: this.i18n.t('interviews.interviewer'), value: f.interviewerName || '-' },
      { label: this.i18n.t('interviews.technical_score'), value: String(f.technicalScore) + '/10' },
      { label: this.i18n.t('interviews.communication_score'), value: String(f.communicationScore) + '/10' },
      { label: this.i18n.t('interviews.cultural_fit_score'), value: String(f.culturalFitScore) + '/10' },
      { label: this.i18n.t('interviews.overall_score'), value: String(f.overallScore) + '/10' },
      { label: this.i18n.t('interviews.recommendation'), value: this.i18n.t('interviews.rec_' + f.recommendation) },
      { label: this.i18n.t('interviews.strengths'), value: f.strengths || '-' },
      { label: this.i18n.t('interviews.weaknesses'), value: f.weaknesses || '-' },
      { label: this.i18n.t('interviews.feedback_comments'), value: f.comments || '-' }
    ];
  });

  recommendationOptions = [
    { value: 'StronglyRecommend', label: this.i18n.t('interviews.rec_StronglyRecommend') },
    { value: 'Recommend', label: this.i18n.t('interviews.rec_Recommend') },
    { value: 'Neutral', label: this.i18n.t('interviews.rec_Neutral') },
    { value: 'DoNotRecommend', label: this.i18n.t('interviews.rec_DoNotRecommend') },
    { value: 'StronglyDoNotRecommend', label: this.i18n.t('interviews.rec_StronglyDoNotRecommend') }
  ];

  canComplete = computed(() => {
    const r = this.interview()?.result;
    return r === 'Pending' || r === 'Rescheduled';
  });

  showFeedbackForm = computed(() => {
    return !this.feedback() && this.interview()?.result !== 'Pending';
  });

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadData(+id);
      this.employeeService.getDropdown().subscribe(data => this.employees.set(data));
    }
  }

  loadData(id: number): void {
    this.loading.set(true);
    this.service.getInterview(id).subscribe({
      next: (data) => {
        this.interview.set(data);
        this.loading.set(false);
        if (data.hasFeedback) {
          this.loadFeedback(id);
        }
      },
      error: () => { this.notification.error(this.i18n.t('interviews.load_error')); this.loading.set(false); }
    });
  }

  loadFeedback(interviewId: number): void {
    this.feedbackLoading.set(true);
    this.service.getFeedback(interviewId).subscribe({
      next: (data) => { this.feedback.set(data); this.feedbackLoading.set(false); },
      error: () => { this.feedbackLoading.set(false); }
    });
  }

  setTab(tab: 'details' | 'feedback'): void {
    this.activeTab.set(tab);
  }

  async completeInterview(result: InterviewResult): Promise<void> {
    const res = await this.confirmation.confirm({
      title: this.i18n.t('interviews.complete'),
      message: this.i18n.t('interviews.confirm_complete'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success'
    });
    if (res.confirmed) {
      this.processing.set(true);
      this.service.completeInterview(this.interview()!.id, { result }).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('interviews.completed_success'));
          this.loadData(this.interview()!.id);
          this.processing.set(false);
        },
        error: () => { this.notification.error(this.i18n.t('interviews.complete_error')); this.processing.set(false); }
      });
    }
  }

  submitFeedback(): void {
    this.processing.set(true);
    const data = {
      interviewScheduleId: this.interview()!.id,
      interviewerEmployeeId: this.interview()!.interviewerEmployeeId,
      ...this.feedbackForm
    };
    this.service.submitFeedback(data).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('interviews.feedback_submitted'));
        this.loadData(this.interview()!.id);
        this.processing.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('interviews.feedback_error')); this.processing.set(false); }
    });
  }

  goBack(): void { this.router.navigate(['/recruitment/interviews']); }
}
