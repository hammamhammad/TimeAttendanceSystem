import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { RecruitmentService } from '../../../../core/services/recruitment.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-posting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent, LoadingSpinnerComponent],
  templateUrl: './create-posting.component.html',
  styleUrls: ['./create-posting.component.css']
})
export class CreatePostingComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private service = inject(RecruitmentService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('jobPosting.manage');
  }
  submitting = signal(false);
  loading = signal(false);
  requisitionOptions: SearchableSelectOption[] = [];

  form = this.fb.group({
    jobRequisitionId: [null as number | null, Validators.required],
    postingTitle: ['', Validators.required],
    postingTitleAr: [''],
    externalDescription: [''],
    externalDescriptionAr: [''],
    responsibilities: [''],
    benefits: [''],
    location: [''],
    expiryDate: [''],
    isInternal: [true],
    notes: ['']
  });

  ngOnInit(): void {
    this.loading.set(true);
    this.service.getRequisitions({ page: 1, pageSize: 100, status: 'Approved' }).subscribe({
      next: (result) => { this.requisitionOptions = (result.data || []).map(r => ({ value: r.id, label: `${r.requisitionNumber} - ${r.jobTitle}` })); this.loading.set(false); },
      error: () => { this.loading.set(false); }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.getRawValue();
    this.service.createPosting({
      jobRequisitionId: v.jobRequisitionId!,
      postingTitle: v.postingTitle!,
      postingTitleAr: v.postingTitleAr || undefined,
      externalDescription: v.externalDescription || undefined,
      externalDescriptionAr: v.externalDescriptionAr || undefined,
      responsibilities: v.responsibilities || undefined,
      benefits: v.benefits || undefined,
      location: v.location || undefined,
      expiryDate: v.expiryDate || undefined,
      isInternal: v.isInternal!,
      notes: v.notes || undefined
    }).subscribe({
      next: () => { this.notification.success(this.i18n.t('job_postings.created_success')); this.router.navigate(['/recruitment/postings']); },
      error: () => { this.notification.error(this.i18n.t('job_postings.create_error')); this.submitting.set(false); }
    });
  }
}
