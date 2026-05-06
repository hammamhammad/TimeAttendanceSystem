import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { OnboardingService } from '../../../../core/services/onboarding.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-template',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, LoadingSpinnerComponent],
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateOnboardingTemplateComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);
  private service = inject(OnboardingService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('onboardingTemplate.manage');
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
    isActive: [true],
    isDefault: [false],
    tasks: this.fb.array([])
  });

  get tasks(): FormArray { return this.form.get('tasks') as FormArray; }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadingData.set(true);
      this.service.getTemplate(+id).subscribe({
        next: (t) => {
          this.form.patchValue({
            name: t.name,
            nameAr: t.nameAr || '',
            description: t.description || '',
            descriptionAr: t.descriptionAr || '',
            isActive: t.isActive,
            isDefault: t.isDefault
          });
          if (!this.canEdit()) {
            this.form.disable();
          }
          this.tasks.clear();
          if (t.tasks?.length) {
            t.tasks.forEach(task => {
              this.tasks.push(this.fb.group({
                taskName: [task.taskName, Validators.required],
                taskNameAr: [task.taskNameAr || ''],
                description: [task.description || ''],
                category: [task.category, Validators.required],
                priority: [task.priority, [Validators.required, Validators.min(1)]],
                dueDaysAfterJoining: [task.dueDaysAfterJoining, [Validators.required, Validators.min(1)]],
                isRequired: [task.isRequired],
                displayOrder: [task.displayOrder]
              }));
            });
          } else {
            this.addTask();
          }
          this.loadingData.set(false);
        },
        error: () => {
          this.notification.error(this.i18n.t('onboarding_templates.load_error'));
          this.router.navigate(['/onboarding/templates']);
        }
      });
    } else {
      this.addTask();
    }
  }

  addTask(): void {
    this.tasks.push(this.fb.group({
      taskName: ['', Validators.required],
      taskNameAr: [''],
      description: [''],
      category: ['HR', Validators.required],
      priority: [1, [Validators.required, Validators.min(1)]],
      dueDaysAfterJoining: [1, [Validators.required, Validators.min(1)]],
      isRequired: [true],
      displayOrder: [this.tasks.length + 1]
    }));
  }

  removeTask(index: number): void { this.tasks.removeAt(index); }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.getRawValue();
    const payload = {
      name: v.name!,
      nameAr: v.nameAr || undefined,
      description: v.description || undefined,
      descriptionAr: v.descriptionAr || undefined,
      isActive: v.isActive!,
      isDefault: v.isDefault!,
      tasks: v.tasks.map((t: any) => ({
        taskName: t.taskName,
        taskNameAr: t.taskNameAr || undefined,
        description: t.description || undefined,
        category: t.category,
        priority: t.priority,
        dueDaysAfterJoining: t.dueDaysAfterJoining,
        isRequired: t.isRequired,
        displayOrder: t.displayOrder
      }))
    };

    const request$ = this.isEditMode()
      ? this.service.updateTemplate(this.editId()!, payload)
      : this.service.createTemplate(payload);

    request$.subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'onboarding_templates.updated_success' : 'onboarding_templates.created_success'));
        this.router.navigate(['/onboarding/templates']);
      },
      error: () => {
        this.notification.error(this.i18n.t(this.isEditMode() ? 'onboarding_templates.update_error' : 'onboarding_templates.create_error'));
        this.submitting.set(false);
      }
    });
  }
}
