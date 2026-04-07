import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { TrainingService } from '../../../../core/services/training.service';
import { TrainingSessionDto, TrainingEnrollmentDto, TrainingAttendanceDto, SessionEvaluationSummaryDto } from '../../../../shared/models/training.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-session',
  standalone: true,
  imports: [CommonModule, RouterModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-session.component.html',
  styleUrl: './view-session.component.css'
})
export class ViewSessionComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(TrainingService);
  private readonly notification = inject(NotificationService);

  loading = signal(false);
  session = signal<TrainingSessionDto | null>(null);
  enrollments = signal<TrainingEnrollmentDto[]>([]);
  attendance = signal<TrainingAttendanceDto[]>([]);
  evalSummary = signal<SessionEvaluationSummaryDto | null>(null);
  error = signal<string | null>(null);
  activeTab = signal<'enrollments' | 'attendance' | 'evaluations'>('enrollments');

  statusBadge = computed(() => {
    const s = this.session();
    if (!s) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      Scheduled: { label: this.i18n.t('training_sessions.status_Scheduled'), variant: 'primary' },
      InProgress: { label: this.i18n.t('training_sessions.status_InProgress'), variant: 'info' },
      Completed: { label: this.i18n.t('training_sessions.status_Completed'), variant: 'success' },
      Cancelled: { label: this.i18n.t('training_sessions.status_Cancelled'), variant: 'danger' },
      Postponed: { label: this.i18n.t('training_sessions.status_Postponed'), variant: 'warning' }
    };
    return map[s.status] ?? { label: s.status, variant: 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const s = this.session();
    if (!s) return [];
    return [
      { label: this.i18n.t('training_sessions.title_field'), value: s.title },
      { label: this.i18n.t('training_sessions.course'), value: s.courseName ?? '-' },
      { label: this.i18n.t('training_sessions.program'), value: s.programName ?? '-' },
      { label: this.i18n.t('training_courses.delivery_method'), value: this.i18n.t('training_courses.method_' + s.deliveryMethod) },
      { label: this.i18n.t('training_sessions.start_date'), value: s.startDate },
      { label: this.i18n.t('training_sessions.end_date'), value: s.endDate },
      { label: this.i18n.t('training_sessions.start_time'), value: s.startTime ?? '-' },
      { label: this.i18n.t('training_sessions.end_time'), value: s.endTime ?? '-' },
      { label: this.i18n.t('training_sessions.location'), value: s.location ?? '-' },
      { label: this.i18n.t('training_sessions.online_link'), value: s.onlineLink ?? '-' },
      { label: this.i18n.t('training_sessions.trainer'), value: s.trainerName ?? '-' },
      { label: this.i18n.t('training_sessions.max_participants'), value: String(s.maxParticipants) },
      { label: this.i18n.t('training_sessions.enrolled'), value: String(s.enrolledCount) },
      { label: this.i18n.t('training_sessions.branch'), value: s.branchName ?? '-' },
      { label: this.i18n.t('common.notes'), value: s.notes ?? '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/training/sessions']); return; }
    this.loading.set(true);
    this.service.getSession(+id).subscribe({
      next: (s) => {
        this.session.set(s);
        this.loading.set(false);
        this.loadEnrollments(s.id);
        this.loadAttendance(s.id);
        this.loadEvalSummary(s.id);
      },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  private loadEnrollments(sessionId: number): void {
    this.service.getEnrollments({ sessionId, pageSize: 100 }).subscribe({
      next: (res) => this.enrollments.set(res.data),
      error: () => {}
    });
  }

  private loadAttendance(sessionId: number): void {
    this.service.getSessionAttendance(sessionId).subscribe({
      next: (data) => this.attendance.set(data),
      error: () => {}
    });
  }

  private loadEvalSummary(sessionId: number): void {
    this.service.getSessionEvaluationSummary(sessionId).subscribe({
      next: (data) => this.evalSummary.set(data),
      error: () => {}
    });
  }

  setTab(tab: 'enrollments' | 'attendance' | 'evaluations'): void {
    this.activeTab.set(tab);
  }

  getEnrollmentStatusClass(status: string): string {
    const map: Record<string, string> = {
      Pending: 'bg-secondary', Approved: 'bg-primary', Rejected: 'bg-danger',
      Enrolled: 'bg-info', Completed: 'bg-success', Withdrawn: 'bg-warning', NoShow: 'bg-dark'
    };
    return map[status] ?? 'bg-secondary';
  }

  getAttendanceStatusClass(status: string): string {
    const map: Record<string, string> = {
      Present: 'bg-success', Absent: 'bg-danger', Late: 'bg-warning', Excused: 'bg-info'
    };
    return map[status] ?? 'bg-secondary';
  }
}
