import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { TrainingService } from '../../../../core/services/training.service';
import { TrainingCourseDto } from '../../../../shared/models/training.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-course',
  standalone: true,
  imports: [CommonModule, RouterModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.css'
})
export class ViewCourseComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(TrainingService);
  private readonly notification = inject(NotificationService);

  loading = signal(false);
  course = signal<TrainingCourseDto | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const c = this.course();
    if (!c) return { label: '', variant: 'secondary' as StatusVariant };
    return c.isActive
      ? { label: this.i18n.t('common.active'), variant: 'success' as StatusVariant }
      : { label: this.i18n.t('common.inactive'), variant: 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const c = this.course();
    if (!c) return [];
    return [
      { label: this.i18n.t('training_courses.code'), value: c.code },
      { label: this.i18n.t('training_courses.name'), value: c.name },
      { label: this.i18n.t('training_courses.name_ar'), value: c.nameAr ?? '-' },
      { label: this.i18n.t('training_courses.category'), value: c.categoryName ?? '-' },
      { label: this.i18n.t('training_courses.delivery_method'), value: this.i18n.t('training_courses.method_' + c.deliveryMethod) },
      { label: this.i18n.t('training_courses.duration_hours'), value: String(c.durationHours) },
      { label: this.i18n.t('training_courses.max_participants'), value: c.maxParticipants ? String(c.maxParticipants) : '-' },
      { label: this.i18n.t('training_courses.cost_per_participant'), value: c.costPerParticipant ? `${c.costPerParticipant} ${c.currency || ''}` : '-' },
      { label: this.i18n.t('training_courses.provider'), value: c.providerName ?? '-' },
      { label: this.i18n.t('training_courses.mandatory'), value: c.isMandatory ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('common.description'), value: c.description ?? '-' },
      { label: this.i18n.t('training_courses.prerequisites'), value: c.prerequisites ?? '-' },
      { label: this.i18n.t('training_courses.objectives'), value: c.objectives ?? '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/training/courses']); return; }
    this.loading.set(true);
    this.service.getCourse(+id).subscribe({
      next: (c) => { this.course.set(c); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }
}
