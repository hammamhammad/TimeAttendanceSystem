import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { PerformanceService } from '../../../../core/services/performance.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-cycle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, LoadingSpinnerComponent],
  templateUrl: './create-cycle.component.html',
  styleUrls: ['./create-cycle.component.css']
})
export class CreateCycleComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);
  private service = inject(PerformanceService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('performanceReviewCycle.manage');
  }
  submitting = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  loadingData = signal(false);

  form = this.fb.group({
    name: ['', Validators.required],
    nameAr: [''],
    description: [''],
    descriptionAr: [''],
    cycleType: ['Annual', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    selfAssessmentDeadline: [''],
    managerAssessmentDeadline: [''],
    branchId: [null as number | null]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadingData.set(true);
      this.service.getCycle(+id).subscribe({
        next: (c) => {
          this.form.patchValue({
            name: c.name,
            nameAr: c.nameAr || '',
            description: c.description || '',
            descriptionAr: c.descriptionAr || '',
            cycleType: c.cycleType,
            startDate: c.startDate?.split('T')[0] || '',
            endDate: c.endDate?.split('T')[0] || '',
            selfAssessmentDeadline: c.selfAssessmentDeadline?.split('T')[0] || '',
            managerAssessmentDeadline: c.managerAssessmentDeadline?.split('T')[0] || '',
            branchId: c.branchId || null
          });
          if (!this.canEdit()) {
            this.form.disable();
          }
          this.loadingData.set(false);
        },
        error: () => {
          this.notification.error(this.i18n.t('performance_cycles.load_error'));
          this.router.navigate(['/performance/cycles']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.getRawValue();
    const payload = {
      name: v.name!,
      nameAr: v.nameAr || undefined,
      cycleType: v.cycleType as any,
      startDate: v.startDate!,
      endDate: v.endDate!,
      selfAssessmentDeadline: v.selfAssessmentDeadline || undefined,
      managerAssessmentDeadline: v.managerAssessmentDeadline || undefined,
      description: v.description || undefined,
      descriptionAr: v.descriptionAr || undefined,
      branchId: v.branchId || undefined
    };

    const request$ = this.isEditMode()
      ? this.service.updateCycle(this.editId()!, payload)
      : this.service.createCycle(payload);

    request$.subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'performance_cycles.updated_success' : 'performance_cycles.created_success'));
        this.router.navigate(['/performance/cycles']);
      },
      error: () => {
        this.notification.error(this.i18n.t(this.isEditMode() ? 'performance_cycles.update_error' : 'performance_cycles.create_error'));
        this.submitting.set(false);
      }
    });
  }
}
