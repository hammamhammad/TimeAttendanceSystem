import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PerformanceService } from '../../../../core/services/performance.service';
import { PerformanceReviewCycle } from '../../../../shared/models/performance.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-cycle',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent],
  templateUrl: './view-cycle.component.html',
  styleUrls: ['./view-cycle.component.css']
})
export class ViewCycleComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private service = inject(PerformanceService);

  loading = signal(true);
  item = signal<PerformanceReviewCycle | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      'Draft': { label: this.i18n.t('common.draft'), variant: 'secondary' },
      'Active': { label: this.i18n.t('common.active'), variant: 'success' },
      'InReview': { label: this.i18n.t('performance_cycles.status_in_review'), variant: 'info' },
      'Completed': { label: this.i18n.t('performance_cycles.status_completed'), variant: 'primary' },
      'Cancelled': { label: this.i18n.t('common.cancelled'), variant: 'dark' }
    };
    return map[d.status] ?? { label: d.status, variant: 'secondary' as StatusVariant };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('performance_cycles.name'), value: d.name },
      { label: this.i18n.t('fields.start_date'), value: d.startDate },
      { label: this.i18n.t('fields.end_date'), value: d.endDate },
      { label: this.i18n.t('performance_cycles.self_review_deadline'), value: d.selfAssessmentDeadline || '-' },
      { label: this.i18n.t('performance_cycles.manager_review_deadline'), value: d.managerAssessmentDeadline || '-' },
      { label: this.i18n.t('performance_cycles.calibration_deadline'), value: d.calibrationDeadline || '-' },
      { label: this.i18n.t('performance_cycles.total_reviews'), value: String(d.totalReviews || d.reviewCount || 0) },
      { label: this.i18n.t('performance_cycles.reviews_completed'), value: `${d.completedReviews || 0}/${d.totalReviews || d.reviewCount || 0}` }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    const actions: FormHeaderAction[] = [];
    if (d.status === 'Draft') {
      actions.push({ label: this.i18n.t('common.activate'), icon: 'fas fa-play', action: () => this.activate(), type: 'success' });
      actions.push({ label: this.i18n.t('common.edit'), icon: 'fas fa-edit', action: () => this.router.navigate(['/performance/cycles', d.id, 'edit']), type: 'outline-primary' });
    }
    if (d.status === 'Active') {
      actions.push({ label: this.i18n.t('performance_cycles.complete'), icon: 'fas fa-check', action: () => this.complete(), type: 'primary' });
    }
    if (d.status !== 'Completed' && d.status !== 'Cancelled') {
      actions.push({ label: this.i18n.t('common.cancel_action'), icon: 'fas fa-ban', action: () => this.cancel(), type: 'danger' });
    }
    return actions;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/performance/cycles']); return; }
    this.service.getCycle(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('performance_cycles.load_error')); this.loading.set(false); }
    });
  }

  activate(): void {
    this.service.activateCycle(this.item()!.id).subscribe({
      next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('performance_cycles.activated_success')); },
      error: () => this.notification.error(this.i18n.t('performance_cycles.activate_error'))
    });
  }

  complete(): void {
    this.service.completeCycle(this.item()!.id).subscribe({
      next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('performance_cycles.completed_success')); },
      error: () => this.notification.error(this.i18n.t('performance_cycles.complete_error'))
    });
  }

  async cancel(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('common.cancel_action'),
      message: this.i18n.t('performance_cycles.confirm_cancel'),
      confirmText: this.i18n.t('common.cancel_action'),
      confirmButtonClass: 'btn-danger'
    });
    if (!result.confirmed) return;
    this.service.cancelCycle(this.item()!.id).subscribe({
      next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('performance_cycles.cancelled_success')); },
      error: () => this.notification.error(this.i18n.t('performance_cycles.cancel_error'))
    });
  }
}
