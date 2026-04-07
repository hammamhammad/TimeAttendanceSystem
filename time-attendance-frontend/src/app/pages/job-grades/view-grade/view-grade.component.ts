import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { JobGradeService } from '../../../core/services/job-grade.service';
import { JobGrade } from '../../../shared/models/job-grade.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-view-grade',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormHeaderComponent,
    StatusBadgeComponent,
    DefinitionListComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './view-grade.component.html',
  styleUrls: ['./view-grade.component.css']
})
export class ViewGradeComponent implements OnInit {
  i18n = inject(I18nService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private gradeService = inject(JobGradeService);

  grade = signal<JobGrade | null>(null);
  loading = signal(false);

  statusBadge = computed(() => ({
    label: this.grade()?.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
    variant: (this.grade()?.isActive ? 'success' : 'secondary') as StatusVariant
  }));

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const g = this.grade();
    if (!g) return [];
    return [
      { label: this.i18n.t('job_grades.code'), value: g.code },
      { label: this.i18n.t('job_grades.name'), value: g.name },
      { label: this.i18n.t('job_grades.name_ar'), value: g.nameAr || '--' },
      { label: this.i18n.t('job_grades.level'), value: String(g.level) },
      { label: this.i18n.t('job_grades.description'), value: g.description || '--' },
      { label: this.i18n.t('job_grades.description_ar'), value: g.descriptionAr || '--' }
    ];
  });

  salaryItems = computed<DefinitionItem[]>(() => {
    const g = this.grade();
    if (!g) return [];
    return [
      { label: this.i18n.t('job_grades.min_salary'), value: g.minSalary.toLocaleString() },
      { label: this.i18n.t('job_grades.mid_salary'), value: g.midSalary.toLocaleString() },
      { label: this.i18n.t('job_grades.max_salary'), value: g.maxSalary.toLocaleString() }
    ];
  });

  auditItems = computed<DefinitionItem[]>(() => {
    const g = this.grade();
    if (!g) return [];
    return [
      { label: this.i18n.t('common.created_at'), value: g.createdAtUtc ? new Date(g.createdAtUtc).toLocaleString() : '--' },
      { label: this.i18n.t('common.modified_at'), value: g.modifiedAtUtc ? new Date(g.modifiedAtUtc).toLocaleString() : '--' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadGrade(+id);
    }
  }

  private loadGrade(id: number): void {
    this.loading.set(true);
    this.gradeService.getJobGradeById(id).subscribe({
      next: (data) => {
        this.grade.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  editGrade(): void {
    this.router.navigate(['/job-grades', this.grade()?.id, 'edit']);
  }

  toggleStatus(): void {
    const g = this.grade();
    if (!g) return;
    const newStatus = !g.isActive;
    this.gradeService.updateJobGrade(g.id, { ...g, isActive: newStatus }).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('common.status_updated'));
        this.loadGrade(g.id);
      },
      error: () => this.notification.error(this.i18n.t('common.error_updating'))
    });
  }

  deleteGrade(): void {
    const g = this.grade();
    if (!g) return;
    this.confirmation.confirm({
      title: this.i18n.t('job_grades.delete_title'),
      message: this.i18n.t('job_grades.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      confirmButtonClass: 'btn-danger'
    }).then(result => {
      if (result.confirmed) {
        this.gradeService.deleteJobGrade(g.id).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('job_grades.delete_success'));
            this.router.navigate(['/job-grades']);
          },
          error: () => this.notification.error(this.i18n.t('job_grades.delete_error'))
        });
      }
    });
  }
}
