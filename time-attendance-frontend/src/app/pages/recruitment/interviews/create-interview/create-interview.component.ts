import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { RecruitmentService } from '../../../../core/services/recruitment.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { InterviewType } from '../../../../shared/models/recruitment.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent } from '../../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-create-interview',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent, LoadingSpinnerComponent],
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.css']
})
export class CreateInterviewComponent implements OnInit {
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

  applications = signal<{ id: number; candidateName: string; postingTitle: string }[]>([]);
  applicationOptions = computed(() => this.applications().map(a => ({
    value: a.id,
    label: `${a.candidateName} - ${a.postingTitle}`
  })));

  employees = signal<{ id: number; name: string; employeeNumber: string }[]>([]);
  employeeOptions = computed(() => this.employees().map(e => ({ value: e.id, label: e.name })));

  interviewTypeOptions = [
    { value: 'Phone', label: this.i18n.t('interviews.type_Phone') },
    { value: 'Video', label: this.i18n.t('interviews.type_Video') },
    { value: 'InPerson', label: this.i18n.t('interviews.type_InPerson') },
    { value: 'Panel', label: this.i18n.t('interviews.type_Panel') },
    { value: 'Technical', label: this.i18n.t('interviews.type_Technical') },
    { value: 'HR', label: this.i18n.t('interviews.type_HR') }
  ];

  form = this.fb.group({
    jobApplicationId: [null as number | null, Validators.required],
    interviewType: ['Phone' as InterviewType, Validators.required],
    interviewerEmployeeId: [null as number | null, Validators.required],
    scheduledDate: ['', Validators.required],
    durationMinutes: [60, [Validators.required, Validators.min(15)]],
    location: [''],
    meetingLink: [''],
    notes: ['']
  });

  ngOnInit(): void {
    this.loadDropdowns();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadInterview(+id);
    }
  }

  loadDropdowns(): void {
    this.service.getApplications({ pageSize: 200 }).subscribe({
      next: (res) => this.applications.set((res.data || []).map(a => ({
        id: a.id,
        candidateName: a.candidateName || '',
        postingTitle: a.postingTitle || ''
      })))
    });
    this.employeeService.getDropdown().subscribe({
      next: (data) => this.employees.set(data)
    });
  }

  loadInterview(id: number): void {
    this.loadingData.set(true);
    this.service.getInterview(id).subscribe({
      next: (data) => {
        this.form.patchValue({
          jobApplicationId: data.jobApplicationId,
          interviewType: data.interviewType,
          interviewerEmployeeId: data.interviewerEmployeeId,
          scheduledDate: data.scheduledDate ? data.scheduledDate.substring(0, 16) : '',
          durationMinutes: data.durationMinutes,
          location: data.location || '',
          meetingLink: data.meetingLink || '',
          notes: data.notes || ''
        });
        this.loadingData.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('interviews.load_error'));
        this.loadingData.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
      return;
    }
    this.submitting.set(true);
    const data = this.form.getRawValue() as any;

    const action = this.isEditMode()
      ? this.service.updateInterview(this.editId()!, data)
      : this.service.createInterview(data);

    action.subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'interviews.updated_success' : 'interviews.created_success'));
        this.router.navigate(['/recruitment/interviews']);
      },
      error: () => {
        this.notification.error(this.i18n.t('interviews.create_error'));
        this.submitting.set(false);
      }
    });
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }
}
