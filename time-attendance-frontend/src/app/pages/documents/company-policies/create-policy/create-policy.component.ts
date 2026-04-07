import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { DocumentService } from '../../../../core/services/document.service';
import { DocumentCategoryDto } from '../../../../shared/models/document.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { FileUploadComponent } from '../../../../shared/components/file-upload/file-upload.component';
import { SearchableSelectComponent } from '../../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-create-policy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent, FileUploadComponent, SearchableSelectComponent],
  templateUrl: './create-policy.component.html',
  styleUrl: './create-policy.component.css'
})
export class CreatePolicyComponent implements OnInit {
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
  selectedFile = signal<File | null>(null);
  categoryOptions: { value: any; label: string }[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      titleAr: [''],
      description: [''],
      descriptionAr: [''],
      documentCategoryId: [null],
      version: ['1.0', Validators.required],
      effectiveDate: ['', Validators.required],
      expiryDate: [''],
      requiresAcknowledgment: [false]
    });

    this.service.getCategories({ pageSize: 100 }).subscribe({
      next: (res) => { this.categoryOptions = (res.data || []).map(c => ({ value: c.id, label: c.name })); }
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.entityId.set(+id);
      this.service.getPolicy(+id).subscribe({
        next: (policy) => {
          this.form.patchValue({
            title: policy.title, titleAr: policy.titleAr, description: policy.description,
            descriptionAr: policy.descriptionAr, documentCategoryId: policy.documentCategoryId, version: policy.version,
            effectiveDate: policy.effectiveDate?.split('T')[0], expiryDate: policy.expiryDate?.split('T')[0],
            requiresAcknowledgment: policy.requiresAcknowledgment
          });
        },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  onFileUploaded(event: any): void {
    this.selectedFile.set(event?.file ?? null);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const data = this.form.value;
    const file = this.selectedFile() ?? undefined;

    const handler = {
      next: () => { this.notification.success(this.i18n.t(this.isEdit() ? 'company_policies.updated' : 'company_policies.created')); this.router.navigate(['/documents/company-policies']); this.saving.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    };
    if (this.isEdit()) { this.service.updatePolicy(this.entityId()!, data, file).subscribe(handler); }
    else { this.service.createPolicy(data, file).subscribe(handler); }
  }
}
