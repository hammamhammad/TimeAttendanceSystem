import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { RecruitmentService } from '../../../../core/services/recruitment.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-create-requisition',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent, LoadingSpinnerComponent],
  templateUrl: './create-requisition.component.html',
  styleUrls: ['./create-requisition.component.css']
})
export class CreateRequisitionComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private service = inject(RecruitmentService);
  private http = inject(HttpClient);

  private route = inject(ActivatedRoute);

  submitting = signal(false);
  loading = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  departmentOptions: SearchableSelectOption[] = [];
  branchOptions: SearchableSelectOption[] = [];

  priorityOptions = computed<SearchableSelectOption[]>(() => [
    { value: 'Low', label: this.i18n.t('job_requisitions.priority_low') },
    { value: 'Medium', label: this.i18n.t('job_requisitions.priority_medium') },
    { value: 'High', label: this.i18n.t('job_requisitions.priority_high') },
    { value: 'Urgent', label: this.i18n.t('job_requisitions.priority_urgent') }
  ]);

  employmentTypeOptions = computed<SearchableSelectOption[]>(() => [
    { value: 'FullTime', label: this.i18n.t('job_requisitions.type_full_time') },
    { value: 'PartTime', label: this.i18n.t('job_requisitions.type_part_time') },
    { value: 'Contract', label: this.i18n.t('job_requisitions.type_contract') },
    { value: 'Internship', label: this.i18n.t('job_requisitions.type_internship') },
    { value: 'Temporary', label: this.i18n.t('job_requisitions.type_temporary') }
  ]);

  form = this.fb.group({
    jobTitle: ['', Validators.required],
    jobTitleAr: [''],
    departmentId: [null as number | null, Validators.required],
    branchId: [null as number | null, Validators.required],
    employmentType: ['FullTime', Validators.required],
    numberOfPositions: [1, [Validators.required, Validators.min(1)]],
    priority: ['Medium', Validators.required],
    description: [''],
    descriptionAr: [''],
    requiredQualifications: [''],
    requiredSkills: [''],
    requiredExperienceYears: [null as number | null],
    budgetedSalaryMin: [null as number | null],
    budgetedSalaryMax: [null as number | null],
    currency: ['SAR'],
    targetHireDate: [''],
    justification: [''],
    isReplacement: [false],
    notes: ['']
  });

  ngOnInit(): void {
    this.loadDropdowns();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadExistingData(+id);
    }
  }

  private loadExistingData(id: number): void {
    this.loading.set(true);
    this.service.getRequisition(id).subscribe({
      next: (data: any) => {
        this.form.patchValue({
          jobTitle: data.jobTitle,
          jobTitleAr: data.jobTitleAr,
          departmentId: data.departmentId,
          branchId: data.branchId,
          employmentType: data.employmentType,
          numberOfPositions: data.numberOfPositions,
          priority: data.priority,
          description: data.description,
          descriptionAr: data.descriptionAr,
          requiredQualifications: data.requiredQualifications,
          requiredSkills: data.requiredSkills,
          requiredExperienceYears: data.requiredExperienceYears,
          budgetedSalaryMin: data.budgetedSalaryMin,
          budgetedSalaryMax: data.budgetedSalaryMax,
          currency: data.currency,
          targetHireDate: data.targetHireDate ? data.targetHireDate.split('T')[0] : '',
          justification: data.justification,
          isReplacement: data.isReplacement,
          notes: data.notes
        });
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  private loadDropdowns(): void {
    this.loading.set(true);
    let loaded = 0;
    const checkDone = () => { loaded++; if (loaded >= 2) this.loading.set(false); };

    this.http.get<any[]>(`${environment.apiUrl}/api/v1/branches/dropdown`).subscribe({
      next: (data) => {
        const items = Array.isArray(data) ? data : [];
        this.branchOptions = items.map(b => ({ value: b.id, label: b.name }));
        checkDone();
      },
      error: () => checkDone()
    });

    this.http.get<any[]>(`${environment.apiUrl}/api/v1/departments/dropdown`).subscribe({
      next: (data) => {
        const items = Array.isArray(data) ? data : [];
        this.departmentOptions = items.map(d => ({ value: d.id, label: d.name }));
        checkDone();
      },
      error: () => checkDone()
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.getRawValue();
    const request: any = {
      branchId: v.branchId!,
      departmentId: v.departmentId!,
      jobTitle: v.jobTitle!,
      jobTitleAr: v.jobTitleAr || undefined,
      description: v.description || undefined,
      descriptionAr: v.descriptionAr || undefined,
      employmentType: v.employmentType as any,
      numberOfPositions: v.numberOfPositions!,
      priority: v.priority as any,
      budgetedSalaryMin: v.budgetedSalaryMin || undefined,
      budgetedSalaryMax: v.budgetedSalaryMax || undefined,
      currency: v.currency || undefined,
      requiredSkills: v.requiredSkills || undefined,
      requiredQualifications: v.requiredQualifications || undefined,
      requiredExperienceYears: v.requiredExperienceYears || undefined,
      targetHireDate: v.targetHireDate || undefined,
      justification: v.justification || undefined,
      isReplacement: v.isReplacement!,
      notes: v.notes || undefined
    };

    const action$ = this.isEditMode()
      ? this.http.put(`${environment.apiUrl}/api/v1/job-requisitions/${this.editId()}`, request)
      : this.service.createRequisition(request);

    const successKey = this.isEditMode() ? 'job_requisitions.updated_success' : 'job_requisitions.created_success';

    action$.subscribe({
      next: () => { this.notification.success(this.i18n.t(successKey)); this.router.navigate(['/recruitment/requisitions']); },
      error: () => { this.notification.error(this.i18n.t('common.error_saving')); this.submitting.set(false); }
    });
  }
}
