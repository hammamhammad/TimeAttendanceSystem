import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { DocumentService } from '../../../../core/services/document.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';

@Component({
  selector: 'app-create-template',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent],
  templateUrl: './create-template.component.html',
  styleUrl: './create-template.component.css'
})
export class CreateTemplateComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(DocumentService);
  private readonly notification = inject(NotificationService);

  form!: FormGroup;
  saving = signal(false);
  isEdit = signal(false);
  entityId = signal<number | null>(null);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nameAr: [''],
      description: [''],
      category: ['', Validators.required],
      htmlContent: ['', Validators.required],
      isActive: [true]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.entityId.set(+id);
      this.service.getLetterTemplate(+id).subscribe({
        next: (t) => this.form.patchValue({ name: t.name, nameAr: t.nameAr, description: t.description, category: t.category, htmlContent: t.htmlContent, isActive: t.isActive }),
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const data = this.form.value;
    const handler = {
      next: () => { this.notification.success(this.i18n.t(this.isEdit() ? 'letter_templates.updated' : 'letter_templates.created')); this.router.navigate(['/documents/letter-templates']); this.saving.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    };
    if (this.isEdit()) { this.service.updateLetterTemplate(this.entityId()!, data).subscribe(handler); }
    else { this.service.createLetterTemplate(data).subscribe(handler); }
  }
}
