import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { RecruitmentService } from '../../../../core/services/recruitment.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { FileUploadComponent, FileUploadedEvent } from '../../../../shared/components/file-upload/file-upload.component';
import { SearchableSelectComponent } from '../../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-create-candidate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, FileUploadComponent, SearchableSelectComponent, LoadingSpinnerComponent],
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.css']
})
export class CreateCandidateComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);
  private service = inject(RecruitmentService);
  private employeeService = inject(EmployeeService);

  submitting = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  loadingData = signal(false);
  employees = signal<{ id: number; name: string; employeeNumber: string }[]>([]);
  employeeOptions = computed(() => this.employees().map(e => ({ value: e.id, label: e.name })));
  resumeUrl = signal<string | null>(null);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    firstNameAr: [''],
    lastNameAr: [''],
    email: ['', [Validators.email]],
    phone: [''],
    nationalId: [''],
    dateOfBirth: [''],
    gender: ['' as string],
    nationality: [''],
    source: ['Website', Validators.required],
    referredByEmployeeId: [null as number | null],
    currentCompany: [''],
    currentJobTitle: [''],
    yearsOfExperience: [null as number | null],
    skills: [''],
    linkedInUrl: [''],
    notes: ['']
  });

  sourceOptions = [
    { value: 'Website', label: 'Website' },
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Agency', label: 'Agency' },
    { value: 'Indeed', label: 'Indeed' },
    { value: 'University', label: 'University' },
    { value: 'JobFair', label: 'Job Fair' },
    { value: 'Internal', label: 'Internal' },
    { value: 'Other', label: 'Other' }
  ];

  genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ];

  ngOnInit(): void {
    this.employeeService.getDropdown().subscribe({
      next: (data) => this.employees.set(data)
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadingData.set(true);
      this.service.getCandidate(+id).subscribe({
        next: (c) => {
          this.form.patchValue({
            firstName: c.firstName,
            lastName: c.lastName,
            firstNameAr: c.firstNameAr || '',
            lastNameAr: c.lastNameAr || '',
            email: c.email || '',
            phone: c.phone || '',
            nationalId: c.nationalId || '',
            dateOfBirth: c.dateOfBirth?.split('T')[0] || '',
            gender: c.gender || '',
            nationality: c.nationality || '',
            source: c.source || 'Website',
            referredByEmployeeId: c.referredByEmployeeId || null,
            currentCompany: c.currentCompany || '',
            currentJobTitle: c.currentJobTitle || '',
            yearsOfExperience: c.yearsOfExperience ?? null,
            skills: c.skills || '',
            linkedInUrl: c.linkedInUrl || '',
            notes: c.notes || ''
          });
          if (c.resumeUrl) this.resumeUrl.set(c.resumeUrl);
          this.loadingData.set(false);
        },
        error: () => {
          this.notification.error(this.i18n.t('candidates.load_error'));
          this.router.navigate(['/recruitment/candidates']);
        }
      });
    }
  }

  onResumeUploaded(event: FileUploadedEvent): void {
    this.resumeUrl.set(event.fileUrl);
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.getRawValue();
    const payload = {
      firstName: v.firstName!,
      lastName: v.lastName!,
      firstNameAr: v.firstNameAr || undefined,
      lastNameAr: v.lastNameAr || undefined,
      email: v.email || undefined,
      phone: v.phone || undefined,
      nationalId: v.nationalId || undefined,
      dateOfBirth: v.dateOfBirth || undefined,
      gender: (v.gender || undefined) as any,
      nationality: v.nationality || undefined,
      source: v.source as any,
      referredByEmployeeId: v.referredByEmployeeId || undefined,
      currentCompany: v.currentCompany || undefined,
      currentJobTitle: v.currentJobTitle || undefined,
      yearsOfExperience: v.yearsOfExperience ?? undefined,
      skills: v.skills || undefined,
      linkedInUrl: v.linkedInUrl || undefined,
      resumeUrl: this.resumeUrl() || undefined,
      notes: v.notes || undefined
    };

    const request$ = this.isEditMode()
      ? this.service.updateCandidate(this.editId()!, payload)
      : this.service.createCandidate(payload);

    request$.subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'candidates.updated_success' : 'candidates.created_success'));
        this.router.navigate(['/recruitment/candidates']);
      },
      error: () => {
        this.notification.error(this.i18n.t(this.isEditMode() ? 'candidates.update_error' : 'candidates.create_error'));
        this.submitting.set(false);
      }
    });
  }
}
