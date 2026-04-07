import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { TrainingService } from '../../../../core/services/training.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-create-program',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.css']
})
export class CreateProgramComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TrainingService);
  private readonly notification = inject(NotificationService);

  form!: FormGroup;
  saving = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  courseOptions = signal<SearchableSelectOption[]>([]);
  branchOptions = signal<SearchableSelectOption[]>([]);
  departmentOptions = signal<SearchableSelectOption[]>([]);
  selectedCourseIds = signal<number[]>([]);

  statuses = ['Draft', 'Active', 'Completed', 'Cancelled', 'Archived'];

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nameAr: [''],
      description: [''],
      descriptionAr: [''],
      status: ['Draft', Validators.required],
      startDate: [''],
      endDate: [''],
      branchId: [null],
      departmentId: [null]
    });

    this.loadCourses();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadProgram(+id);
    }
  }

  private loadCourses(): void {
    this.service.getCourseDropdown().subscribe({
      next: (data) => this.courseOptions.set(data.map(c => ({ value: c.id, label: `${c.code} - ${c.name}` }))),
      error: () => {}
    });
  }

  private loadProgram(id: number): void {
    this.service.getProgram(id).subscribe({
      next: (p) => {
        this.form.patchValue(p);
        this.selectedCourseIds.set(p.courses?.map(c => c.courseId) || []);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.router.navigate(['/training/programs']); }
    });
  }

  toggleCourse(courseId: number): void {
    const current = this.selectedCourseIds();
    if (current.includes(courseId)) {
      this.selectedCourseIds.set(current.filter(id => id !== courseId));
    } else {
      this.selectedCourseIds.set([...current, courseId]);
    }
  }

  isCourseSelected(courseId: number): boolean {
    return this.selectedCourseIds().includes(courseId);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const val = { ...this.form.value, courseIds: this.selectedCourseIds() };
    const obs$ = this.isEditMode()
      ? this.service.updateProgram(this.editId()!, val)
      : this.service.createProgram(val);
    (obs$ as any).subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'training_programs.updated' : 'training_programs.created'));
        this.router.navigate(['/training/programs']);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }
}
