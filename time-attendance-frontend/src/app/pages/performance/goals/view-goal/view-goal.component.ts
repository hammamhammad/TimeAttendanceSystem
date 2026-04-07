import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { PerformanceService } from '../../../../core/services/performance.service';
import { GoalDefinition } from '../../../../shared/models/performance.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-goal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent],
  templateUrl: './view-goal.component.html',
  styleUrls: ['./view-goal.component.css']
})
export class ViewGoalComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private notification = inject(NotificationService);
  private service = inject(PerformanceService);

  loading = signal(true);
  item = signal<GoalDefinition | null>(null);
  error = signal<string | null>(null);
  showProgressForm = signal(false);
  submittingProgress = signal(false);

  progressForm = this.fb.group({
    currentValue: ['', Validators.required],
    progressPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
  });

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      'Draft': { label: this.i18n.t('common.draft'), variant: 'secondary' },
      'Active': { label: this.i18n.t('common.active'), variant: 'info' },
      'InProgress': { label: this.i18n.t('goals.status_in_progress'), variant: 'info' },
      'Completed': { label: this.i18n.t('goals.status_completed'), variant: 'success' },
      'Cancelled': { label: this.i18n.t('common.cancelled'), variant: 'danger' },
      'Deferred': { label: this.i18n.t('goals.status_deferred'), variant: 'warning' }
    };
    return map[d.status] ?? { label: d.status, variant: 'secondary' as StatusVariant };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('goals.goal_title'), value: d.title },
      { label: this.i18n.t('fields.employee'), value: d.employeeName || '-' },
      { label: this.i18n.t('goals.category'), value: d.goalType || '-' },
      { label: this.i18n.t('goals.priority'), value: d.priority || '-' },
      { label: this.i18n.t('goals.weight'), value: `${d.weight}%` },
      { label: this.i18n.t('goals.target_value'), value: d.targetValue || '-' },
      { label: this.i18n.t('goals.current_value'), value: d.currentValue || '-' },
      { label: this.i18n.t('goals.measurement_unit'), value: d.unit || '-' },
      { label: this.i18n.t('goals.target_date'), value: d.dueDate || '-' }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    const actions: FormHeaderAction[] = [];
    if (d.status === 'Active' || d.status === 'InProgress' || d.status === 'Draft') {
      actions.push({ label: this.i18n.t('goals.update_progress'), icon: 'fas fa-chart-line', action: () => this.openProgressForm(), type: 'primary' });
    }
    if (d.status === 'Draft' || d.status === 'Active') {
      actions.push({ label: this.i18n.t('common.edit'), icon: 'fas fa-edit', action: () => this.router.navigate(['/performance/goals', d.id, 'edit']), type: 'outline-primary' });
    }
    return actions;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/performance/goals']); return; }
    this.service.getGoal(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('goals.load_error')); this.loading.set(false); }
    });
  }

  openProgressForm(): void {
    const d = this.item();
    if (d) {
      this.progressForm.patchValue({
        currentValue: d.currentValue || '',
        progressPercentage: d.progressPercentage || 0
      });
    }
    this.showProgressForm.set(true);
  }

  submitProgress(): void {
    if (this.progressForm.invalid) return;
    this.submittingProgress.set(true);
    const v = this.progressForm.getRawValue();
    this.service.updateProgress(this.item()!.id, {
      currentValue: v.currentValue!,
      progressPercentage: v.progressPercentage!
    }).subscribe({
      next: (u) => {
        this.item.set(u);
        this.showProgressForm.set(false);
        this.submittingProgress.set(false);
        this.notification.success(this.i18n.t('goals.progress_updated_success'));
      },
      error: () => {
        this.notification.error(this.i18n.t('goals.progress_update_error'));
        this.submittingProgress.set(false);
      }
    });
  }
}
