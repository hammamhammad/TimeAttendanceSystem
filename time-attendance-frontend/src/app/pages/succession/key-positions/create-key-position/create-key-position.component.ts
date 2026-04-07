import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { SuccessionService } from '../../../../core/services/succession.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-create-key-position',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, LoadingSpinnerComponent, SearchableSelectComponent],
  templateUrl: './create-key-position.component.html',
  styleUrls: ['./create-key-position.component.css']
})
export class CreateKeyPositionComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);
  private service = inject(SuccessionService);
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1`;

  submitting = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  loadingData = signal(false);

  branches = signal<any[]>([]);
  departments = signal<any[]>([]);
  jobGrades = signal<any[]>([]);
  employees = signal<any[]>([]);

  branchOptions = computed(() =>
    this.branches().map(b => ({ value: b.id, label: b.name } as SearchableSelectOption))
  );
  departmentOptions = computed(() =>
    this.departments().map(d => ({ value: d.id, label: d.name } as SearchableSelectOption))
  );
  jobGradeOptions = computed(() =>
    this.jobGrades().map(g => ({ value: g.id, label: g.name } as SearchableSelectOption))
  );
  employeeOptions = computed(() =>
    this.employees().map(e => ({ value: e.id, label: e.fullName } as SearchableSelectOption))
  );

  form = this.fb.group({
    jobTitle: ['', Validators.required],
    jobTitleAr: [''],
    branchId: [null as number | null, Validators.required],
    departmentId: [null as number | null],
    jobGradeId: [null as number | null],
    currentHolderId: [null as number | null],
    criticalityLevel: ['Medium', Validators.required],
    vacancyRisk: ['Low', Validators.required],
    impactOfVacancy: [''],
    impactOfVacancyAr: [''],
    requiredCompetencies: [''],
    minExperienceYears: [null as number | null],
    isActive: [true],
    notes: ['']
  });

  ngOnInit(): void {
    this.loadDropdowns();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadingData.set(true);
      this.service.getKeyPosition(+id).subscribe({
        next: (d) => {
          this.form.patchValue({
            jobTitle: d.jobTitle,
            jobTitleAr: d.jobTitleAr || '',
            branchId: d.branchId,
            departmentId: d.departmentId || null,
            jobGradeId: d.jobGradeId || null,
            currentHolderId: d.currentHolderId || null,
            criticalityLevel: d.criticalityLevel,
            vacancyRisk: d.vacancyRisk,
            impactOfVacancy: d.impactOfVacancy || '',
            impactOfVacancyAr: d.impactOfVacancyAr || '',
            requiredCompetencies: d.requiredCompetencies || '',
            minExperienceYears: d.minExperienceYears || null,
            isActive: d.isActive,
            notes: d.notes || ''
          });
          this.loadingData.set(false);
        },
        error: () => { this.notification.error(this.i18n.t('succession.key_positions.load_error')); this.router.navigate(['/succession/key-positions']); }
      });
    }
  }

  loadDropdowns(): void {
    this.http.get<any[]>(`${this.baseUrl}/branches/dropdown`).subscribe(d => this.branches.set(d));
    this.http.get<any[]>(`${this.baseUrl}/departments/dropdown`).subscribe(d => this.departments.set(d));
    this.http.get<any[]>(`${this.baseUrl}/job-grades`).subscribe((d: any) => this.jobGrades.set(d.data || d));
    this.http.get<any[]>(`${this.baseUrl}/employees/dropdown`).subscribe(d => this.employees.set(d));
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.getRawValue();
    const payload: any = {
      jobTitle: v.jobTitle!,
      jobTitleAr: v.jobTitleAr || undefined,
      branchId: v.branchId!,
      departmentId: v.departmentId || undefined,
      jobGradeId: v.jobGradeId || undefined,
      currentHolderId: v.currentHolderId || undefined,
      criticalityLevel: v.criticalityLevel!,
      vacancyRisk: v.vacancyRisk!,
      impactOfVacancy: v.impactOfVacancy || undefined,
      impactOfVacancyAr: v.impactOfVacancyAr || undefined,
      requiredCompetencies: v.requiredCompetencies || undefined,
      minExperienceYears: v.minExperienceYears || undefined,
      notes: v.notes || undefined
    };

    if (this.isEditMode()) {
      payload.isActive = v.isActive;
    }

    const request$ = this.isEditMode()
      ? this.service.updateKeyPosition(this.editId()!, payload)
      : this.service.createKeyPosition(payload);

    request$.subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'succession.key_positions.updated_success' : 'succession.key_positions.created_success'));
        this.router.navigate(['/succession/key-positions']);
      },
      error: (err) => {
        this.notification.error(err?.error?.error || this.i18n.t(this.isEditMode() ? 'succession.key_positions.update_error' : 'succession.key_positions.create_error'));
        this.submitting.set(false);
      }
    });
  }
}
