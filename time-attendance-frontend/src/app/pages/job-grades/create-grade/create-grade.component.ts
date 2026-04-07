import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { JobGradeService } from '../../../core/services/job-grade.service';
import { CreateJobGradeRequest, UpdateJobGradeRequest } from '../../../shared/models/job-grade.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-create-grade',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormHeaderComponent,
    FormSectionComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './create-grade.component.html',
  styleUrls: ['./create-grade.component.css']
})
export class CreateGradeComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);
  private gradeService = inject(JobGradeService);

  submitting = signal(false);
  loading = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);

  form = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    nameAr: [''],
    description: [''],
    descriptionAr: [''],
    level: [1, [Validators.required, Validators.min(1)]],
    minSalary: [0, [Validators.required, Validators.min(0)]],
    midSalary: [0, [Validators.required, Validators.min(0)]],
    maxSalary: [0, [Validators.required, Validators.min(0)]],
    isActive: [true]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadExistingData(+id);
    }
  }

  private loadExistingData(id: number): void {
    this.loading.set(true);
    this.gradeService.getJobGradeById(id).subscribe({
      next: (data) => {
        this.form.patchValue({
          code: data.code,
          name: data.name,
          nameAr: data.nameAr,
          description: data.description,
          descriptionAr: data.descriptionAr,
          level: data.level,
          minSalary: data.minSalary,
          midSalary: data.midSalary,
          maxSalary: data.maxSalary,
          isActive: data.isActive
        });
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);

    const v = this.form.getRawValue();
    const request: CreateJobGradeRequest = {
      code: v.code!,
      name: v.name!,
      nameAr: v.nameAr || '',
      level: v.level!,
      minSalary: v.minSalary!,
      midSalary: v.midSalary!,
      maxSalary: v.maxSalary!,
      description: v.description || undefined,
      descriptionAr: v.descriptionAr || undefined,
      isActive: v.isActive!
    };

    const action$ = this.isEditMode()
      ? this.gradeService.updateJobGrade(this.editId()!, request as UpdateJobGradeRequest)
      : this.gradeService.createJobGrade(request);

    action$.subscribe({
      next: (result) => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'job_grades.updated_successfully' : 'job_grades.created_successfully'));
        this.router.navigate(['/job-grades']);
      },
      error: () => {
        this.notification.error(this.i18n.t(this.isEditMode() ? 'job_grades.update_error' : 'job_grades.create_error'));
        this.submitting.set(false);
      }
    });
  }
}
