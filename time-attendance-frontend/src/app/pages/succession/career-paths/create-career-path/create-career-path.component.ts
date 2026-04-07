import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { SuccessionService } from '../../../../core/services/succession.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SearchableSelectComponent } from '../../../../shared/components/searchable-select/searchable-select.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-create-career-path',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, LoadingSpinnerComponent, SearchableSelectComponent],
  templateUrl: './create-career-path.component.html',
  styleUrls: ['./create-career-path.component.css']
})
export class CreateCareerPathComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);
  private service = inject(SuccessionService);
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1`;

  submitting = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  loadingData = signal(false);
  jobGrades = signal<any[]>([]);

  form = this.fb.group({
    name: ['', Validators.required],
    nameAr: [''],
    description: [''],
    descriptionAr: [''],
    isActive: [true]
  });

  steps = signal<{ fromJobGradeId: number | null; toJobGradeId: number | null; jobTitle: string; jobTitleAr: string; typicalDurationMonths: number | null; requiredCompetencies: string; stepOrder: number }[]>([]);

  ngOnInit(): void {
    this.http.get<any[]>(`${this.baseUrl}/job-grades`).subscribe((d: any) => this.jobGrades.set(d.data || d));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadingData.set(true);
      this.service.getCareerPath(+id).subscribe({
        next: (d) => {
          this.form.patchValue({
            name: d.name,
            nameAr: d.nameAr || '',
            description: d.description || '',
            descriptionAr: d.descriptionAr || '',
            isActive: d.isActive
          });
          if (d.steps) {
            this.steps.set(d.steps.map(s => ({
              fromJobGradeId: s.fromJobGradeId || null,
              toJobGradeId: s.toJobGradeId,
              jobTitle: s.jobTitle,
              jobTitleAr: s.jobTitleAr || '',
              typicalDurationMonths: s.typicalDurationMonths || null,
              requiredCompetencies: s.requiredCompetencies || '',
              stepOrder: s.stepOrder
            })));
          }
          this.loadingData.set(false);
        },
        error: () => { this.notification.error(this.i18n.t('succession.career_paths.load_error')); this.router.navigate(['/succession/career-paths']); }
      });
    }
  }

  addStep(): void {
    const nextOrder = this.steps().length + 1;
    this.steps.update(s => [...s, { fromJobGradeId: null, toJobGradeId: null, jobTitle: '', jobTitleAr: '', typicalDurationMonths: null, requiredCompetencies: '', stepOrder: nextOrder }]);
  }

  removeStep(index: number): void {
    this.steps.update(s => s.filter((_, i) => i !== index).map((st, i) => ({ ...st, stepOrder: i + 1 })));
  }

  updateStep(index: number, field: string, value: any): void {
    this.steps.update(s => s.map((st, i) => i === index ? { ...st, [field]: value } : st));
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.getRawValue();

    if (this.isEditMode()) {
      const payload = {
        name: v.name!,
        nameAr: v.nameAr || undefined,
        description: v.description || undefined,
        descriptionAr: v.descriptionAr || undefined,
        isActive: v.isActive!
      };
      this.service.updateCareerPath(this.editId()!, payload).subscribe({
        next: () => { this.notification.success(this.i18n.t('succession.career_paths.updated_success')); this.router.navigate(['/succession/career-paths']); },
        error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('succession.career_paths.update_error')); this.submitting.set(false); }
      });
    } else {
      const stepsPayload = this.steps().filter(s => s.jobTitle && s.toJobGradeId).map(s => ({
        fromJobGradeId: s.fromJobGradeId || undefined,
        toJobGradeId: s.toJobGradeId!,
        jobTitle: s.jobTitle,
        jobTitleAr: s.jobTitleAr || undefined,
        typicalDurationMonths: s.typicalDurationMonths || undefined,
        requiredCompetencies: s.requiredCompetencies || undefined,
        stepOrder: s.stepOrder
      }));
      const payload = {
        name: v.name!,
        nameAr: v.nameAr || undefined,
        description: v.description || undefined,
        descriptionAr: v.descriptionAr || undefined,
        steps: stepsPayload.length > 0 ? stepsPayload : undefined
      };
      this.service.createCareerPath(payload).subscribe({
        next: () => { this.notification.success(this.i18n.t('succession.career_paths.created_success')); this.router.navigate(['/succession/career-paths']); },
        error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('succession.career_paths.create_error')); this.submitting.set(false); }
      });
    }
  }
}
