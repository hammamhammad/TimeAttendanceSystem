import { Component, inject, signal, OnInit, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
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

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-talent-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, LoadingSpinnerComponent, SearchableSelectComponent],
  templateUrl: './create-talent-profile.component.html',
  styleUrls: ['./create-talent-profile.component.css']
})
export class CreateTalentProfileComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);
  private service = inject(SuccessionService);
  private http = inject(HttpClient);
  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('talentProfile.update');
  }
  private baseUrl = `${environment.apiUrl}/api/v1`;

  submitting = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  loadingData = signal(false);
  employees = signal<any[]>([]);

  employeeOptions = computed(() =>
    this.employees().map(e => ({ value: e.id, label: e.fullName } as SearchableSelectOption))
  );

  form = this.fb.group({
    employeeId: [null as number | null, Validators.required],
    performanceRating: [''],
    potentialRating: ['High', Validators.required],
    nineBoxPosition: ['HighPerformanceHighPotential', Validators.required],
    readinessLevel: ['ReadyWithDevelopment', Validators.required],
    retentionRisk: ['Low', Validators.required],
    careerAspiration: [''],
    careerAspirationAr: [''],
    strengthsSummary: [''],
    developmentAreas: [''],
    lastAssessmentDate: [''],
    isHighPotential: [false],
    isActive: [true],
    notes: ['']
  });

  skills = signal<{ skillName: string; skillNameAr: string; proficiencyLevel: string; yearsOfExperience: number | null; isVerified: boolean }[]>([]);

  constructor() {
    // Programmatic disable wiring (replaces template [disabled] binding on the
    // employeeId searchable-select to avoid the reactive-forms warning). The
    // employee can't be reassigned once a talent profile exists.
    effect(() => {
      const editing = this.isEditMode();
      const ctrl = this.form.get('employeeId');
      if (!ctrl) return;
      if (editing && ctrl.enabled) {
        ctrl.disable({ emitEvent: false });
      } else if (!editing && ctrl.disabled) {
        ctrl.enable({ emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.http.get<any[]>(`${this.baseUrl}/employees/dropdown`).subscribe(d => this.employees.set(d));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadingData.set(true);
      this.service.getTalentProfile(+id).subscribe({
        next: (d) => {
          this.form.patchValue({
            employeeId: d.employeeId,
            performanceRating: d.performanceRating || '',
            potentialRating: d.potentialRating,
            nineBoxPosition: d.nineBoxPosition,
            readinessLevel: d.readinessLevel,
            retentionRisk: d.retentionRisk,
            careerAspiration: d.careerAspiration || '',
            careerAspirationAr: d.careerAspirationAr || '',
            strengthsSummary: d.strengthsSummary || '',
            developmentAreas: d.developmentAreas || '',
            lastAssessmentDate: d.lastAssessmentDate?.split('T')[0] || '',
            isHighPotential: d.isHighPotential,
            isActive: d.isActive,
            notes: d.notes || ''
          });
          if (!this.canEdit()) {
            this.form.disable();
          }
          if (d.skills) {
            this.skills.set(d.skills.map(s => ({
              skillName: s.skillName,
              skillNameAr: s.skillNameAr || '',
              proficiencyLevel: s.proficiencyLevel,
              yearsOfExperience: s.yearsOfExperience || null,
              isVerified: s.isVerified
            })));
          }
          this.loadingData.set(false);
        },
        error: () => { this.notification.error(this.i18n.t('succession.talent_profiles.load_error')); this.router.navigate(['/succession/talent-profiles']); }
      });
    }
  }

  addSkill(): void {
    this.skills.update(s => [...s, { skillName: '', skillNameAr: '', proficiencyLevel: 'Intermediate', yearsOfExperience: null, isVerified: false }]);
  }

  removeSkill(index: number): void {
    this.skills.update(s => s.filter((_, i) => i !== index));
  }

  updateSkill(index: number, field: string, value: any): void {
    this.skills.update(s => s.map((sk, i) => i === index ? { ...sk, [field]: value } : sk));
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.getRawValue();
    const payload: any = {
      employeeId: v.employeeId!,
      performanceRating: v.performanceRating || undefined,
      potentialRating: v.potentialRating!,
      nineBoxPosition: v.nineBoxPosition!,
      readinessLevel: v.readinessLevel!,
      retentionRisk: v.retentionRisk!,
      careerAspiration: v.careerAspiration || undefined,
      careerAspirationAr: v.careerAspirationAr || undefined,
      strengthsSummary: v.strengthsSummary || undefined,
      developmentAreas: v.developmentAreas || undefined,
      lastAssessmentDate: v.lastAssessmentDate || undefined,
      isHighPotential: v.isHighPotential,
      notes: v.notes || undefined,
      skills: this.skills().filter(s => s.skillName).map(s => ({
        skillName: s.skillName,
        skillNameAr: s.skillNameAr || undefined,
        proficiencyLevel: s.proficiencyLevel,
        yearsOfExperience: s.yearsOfExperience || undefined,
        isVerified: s.isVerified
      }))
    };

    if (this.isEditMode()) {
      payload.isActive = v.isActive;
    }

    const request$ = this.isEditMode()
      ? this.service.updateTalentProfile(this.editId()!, payload)
      : this.service.createTalentProfile(payload);

    request$.subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'succession.talent_profiles.updated_success' : 'succession.talent_profiles.created_success'));
        this.router.navigate(['/succession/talent-profiles']);
      },
      error: (err) => {
        this.notification.error(err?.error?.error || this.i18n.t(this.isEditMode() ? 'succession.talent_profiles.update_error' : 'succession.talent_profiles.create_error'));
        this.submitting.set(false);
      }
    });
  }
}
