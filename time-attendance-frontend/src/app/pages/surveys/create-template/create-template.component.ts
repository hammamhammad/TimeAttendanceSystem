import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { SurveyService } from '../../../core/services/survey.service';
import { SurveyType, SurveyQuestionType } from '../../../shared/models/survey.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent } from '../../../shared/components/searchable-select/searchable-select.component';

import { PermissionService } from '../../../core/auth/permission.service';
@Component({
  selector: 'app-create-template',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-template.component.html',
  styleUrl: './create-template.component.css'
})
export class CreateTemplateComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(SurveyService);
  private readonly notification = inject(NotificationService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('surveyTemplate.update');
  }
  form!: FormGroup;
  saving = signal(false);
  isEdit = signal(false);
  entityId = signal<number | null>(null);

  typeOptions = computed(() => Object.values(SurveyType).map(t => ({ value: t, label: this.i18n.t('surveys.type_' + t) })));
  questionTypeOptions = computed(() => Object.values(SurveyQuestionType).map(t => ({ value: t, label: this.i18n.t('surveys.question_type_' + t) })));

  get questionsArray(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nameAr: [''],
      description: [''],
      descriptionAr: [''],
      surveyType: ['EmployeeEngagement', Validators.required],
      isActive: [true],
      questions: this.fb.array([])
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.entityId.set(+id);
      this.service.getTemplate(+id).subscribe({
        next: (tmpl) => {
          this.form.patchValue({
            name: tmpl.name, nameAr: tmpl.nameAr, description: tmpl.description,
            descriptionAr: tmpl.descriptionAr, surveyType: tmpl.surveyType, isActive: tmpl.isActive
          });
          if (!this.canEdit()) {
            this.form.disable();
          }
          tmpl.questions.forEach(q => {
            this.addQuestion(q.questionType, q.questionText, q.questionTextAr ?? '', q.isRequired, q.options ?? [], q.optionsAr ?? []);
          });
        },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  addQuestion(type: string = 'Rating', text: string = '', textAr: string = '', required: boolean = true, options: string[] = [], optionsAr: string[] = []): void {
    const group = this.fb.group({
      questionText: [text, Validators.required],
      questionTextAr: [textAr],
      questionType: [type, Validators.required],
      isRequired: [required],
      options: [options],
      optionsAr: [optionsAr]
    });
    this.questionsArray.push(group);
  }

  removeQuestion(index: number): void {
    this.questionsArray.removeAt(index);
  }

  moveQuestion(index: number, direction: 'up' | 'down'): void {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= this.questionsArray.length) return;
    const item = this.questionsArray.at(index);
    this.questionsArray.removeAt(index);
    this.questionsArray.insert(newIndex, item);
  }

  getQuestionType(index: number): string {
    return this.questionsArray.at(index).get('questionType')?.value ?? '';
  }

  needsOptions(index: number): boolean {
    const type = this.getQuestionType(index);
    return type === 'MultipleChoice' || type === 'MultiSelect';
  }

  getOptions(index: number): string[] {
    return this.questionsArray.at(index).get('options')?.value ?? [];
  }

  addOption(index: number): void {
    const current = this.getOptions(index);
    this.questionsArray.at(index).get('options')?.setValue([...current, '']);
    const currentAr = this.questionsArray.at(index).get('optionsAr')?.value ?? [];
    this.questionsArray.at(index).get('optionsAr')?.setValue([...currentAr, '']);
  }

  removeOption(qIndex: number, oIndex: number): void {
    const current = this.getOptions(qIndex);
    current.splice(oIndex, 1);
    this.questionsArray.at(qIndex).get('options')?.setValue([...current]);
    const currentAr = this.questionsArray.at(qIndex).get('optionsAr')?.value ?? [];
    currentAr.splice(oIndex, 1);
    this.questionsArray.at(qIndex).get('optionsAr')?.setValue([...currentAr]);
  }

  updateOption(qIndex: number, oIndex: number, value: string): void {
    const current = this.getOptions(qIndex);
    current[oIndex] = value;
    this.questionsArray.at(qIndex).get('options')?.setValue([...current]);
  }

  updateOptionAr(qIndex: number, oIndex: number, value: string): void {
    const currentAr = this.questionsArray.at(qIndex).get('optionsAr')?.value ?? [];
    currentAr[oIndex] = value;
    this.questionsArray.at(qIndex).get('optionsAr')?.setValue([...currentAr]);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    if (this.questionsArray.length === 0) {
      this.notification.warning(this.i18n.t('surveys.add_at_least_one_question'));
      return;
    }
    this.saving.set(true);
    const formValue = this.form.value;
    const data = {
      ...formValue,
      questions: formValue.questions.map((q: any, i: number) => ({
        ...q,
        sortOrder: i + 1
      }))
    };

    const handler = {
      next: () => { this.notification.success(this.i18n.t(this.isEdit() ? 'surveys.template_updated' : 'surveys.template_created')); this.router.navigate(['/surveys/templates']); this.saving.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    };
    if (this.isEdit()) { this.service.updateTemplate(this.entityId()!, data).subscribe(handler); }
    else { this.service.createTemplate(data).subscribe(handler); }
  }
}
