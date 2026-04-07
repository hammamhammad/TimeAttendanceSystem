import { Component, signal, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { TrainingService } from '../../../../core/services/training.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
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
  categoryOptions = signal<SearchableSelectOption[]>([]);

  deliveryMethods = ['InPerson', 'Online', 'Hybrid', 'SelfPaced', 'OnTheJob'];

  ngOnInit(): void {
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      nameAr: [''],
      description: [''],
      descriptionAr: [''],
      categoryId: [null, Validators.required],
      deliveryMethod: ['InPerson', Validators.required],
      durationHours: [0, [Validators.required, Validators.min(0.5)]],
      maxParticipants: [null],
      prerequisites: [''],
      objectives: [''],
      isActive: [true],
      isMandatory: [false],
      costPerParticipant: [null],
      currency: ['SAR'],
      providerName: ['']
    });

    this.loadCategories();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadCourse(+id);
    }
  }

  private loadCategories(): void {
    this.service.getCategoryDropdown().subscribe({
      next: (data) => this.categoryOptions.set(data.map(c => ({ value: c.id, label: c.name }))),
      error: () => {}
    });
  }

  private loadCourse(id: number): void {
    this.service.getCourse(id).subscribe({
      next: (course) => {
        this.form.patchValue(course);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.router.navigate(['/training/courses']); }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const val = this.form.value;
    const obs$ = this.isEditMode()
      ? this.service.updateCourse(this.editId()!, val)
      : this.service.createCourse(val);
    (obs$ as any).subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'training_courses.updated' : 'training_courses.created'));
        this.router.navigate(['/training/courses']);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }
}
