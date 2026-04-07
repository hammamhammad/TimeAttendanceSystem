import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { TrainingService } from '../../../../core/services/training.service';
import { TrainingProgramDto } from '../../../../shared/models/training.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-program',
  standalone: true,
  imports: [CommonModule, RouterModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-program.component.html',
  styleUrl: './view-program.component.css'
})
export class ViewProgramComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(TrainingService);
  private readonly notification = inject(NotificationService);

  loading = signal(false);
  program = signal<TrainingProgramDto | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const p = this.program();
    if (!p) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      Draft: { label: this.i18n.t('training_programs.status_Draft'), variant: 'secondary' },
      Active: { label: this.i18n.t('training_programs.status_Active'), variant: 'success' },
      Completed: { label: this.i18n.t('training_programs.status_Completed'), variant: 'info' },
      Cancelled: { label: this.i18n.t('training_programs.status_Cancelled'), variant: 'danger' },
      Archived: { label: this.i18n.t('training_programs.status_Archived'), variant: 'warning' }
    };
    return map[p.status] ?? { label: p.status, variant: 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const p = this.program();
    if (!p) return [];
    return [
      { label: this.i18n.t('training_programs.name'), value: p.name },
      { label: this.i18n.t('training_programs.name_ar'), value: p.nameAr ?? '-' },
      { label: this.i18n.t('training_programs.total_hours'), value: String(p.totalDurationHours) },
      { label: this.i18n.t('training_programs.course_count'), value: String(p.courseCount) },
      { label: this.i18n.t('training_programs.start_date'), value: p.startDate ?? '-' },
      { label: this.i18n.t('training_programs.end_date'), value: p.endDate ?? '-' },
      { label: this.i18n.t('training_programs.branch'), value: p.branchName ?? '-' },
      { label: this.i18n.t('training_programs.department'), value: p.departmentName ?? '-' },
      { label: this.i18n.t('common.description'), value: p.description ?? '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/training/programs']); return; }
    this.loading.set(true);
    this.service.getProgram(+id).subscribe({
      next: (p) => { this.program.set(p); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }
}
