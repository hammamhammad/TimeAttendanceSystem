import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { SurveyService } from '../../../core/services/survey.service';
import { SurveyTargetAudience } from '../../../shared/models/survey.model';
import { BranchesService } from '../../branches/branches.service';
import { DepartmentsService } from '../../departments/departments.service';
import { RolesService } from '../../roles/roles.service';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent } from '../../../shared/components/searchable-select/searchable-select.component';

import { PermissionService } from '../../../core/auth/permission.service';
@Component({
  selector: 'app-create-distribution',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-distribution.component.html',
  styleUrl: './create-distribution.component.css'
})
export class CreateDistributionComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(SurveyService);
  private readonly notification = inject(NotificationService);
  private readonly branchesService = inject(BranchesService);
  private readonly departmentsService = inject(DepartmentsService);
  private readonly rolesService = inject(RolesService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('surveyDistribution.update');
  }
  form!: FormGroup;
  saving = signal(false);
  isEdit = signal(false);
  entityId = signal<number | null>(null);

  templateOptions = signal<{ value: any; label: string }[]>([]);
  targetAudienceOptions = computed(() => Object.values(SurveyTargetAudience).map(t => ({ value: t, label: this.i18n.t('surveys.target_' + t) })));
  targetIdOptions = signal<{ value: any; label: string }[]>([]);
  selectedTargetAudience = signal<string>('All');
  selectedTargetIds = signal<number[]>([]);

  ngOnInit(): void {
    this.form = this.fb.group({
      templateId: [null, Validators.required],
      title: ['', Validators.required],
      titleAr: [''],
      targetAudience: ['All', Validators.required],
      isAnonymous: [true],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.service.getTemplateDropdown().subscribe({
      next: (res) => this.templateOptions.set(res.map(t => ({ value: t.id, label: t.name })))
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.entityId.set(+id);
      this.service.getDistribution(+id).subscribe({
        next: (dist) => {
          this.form.patchValue({
            templateId: dist.templateId, title: dist.title, titleAr: dist.titleAr,
            targetAudience: dist.targetAudience, isAnonymous: dist.isAnonymous,
            startDate: dist.startDate?.split('T')[0], endDate: dist.endDate?.split('T')[0]
          });
          if (!this.canEdit()) {
            this.form.disable();
          }
          this.selectedTargetAudience.set(dist.targetAudience);
          this.selectedTargetIds.set(dist.targetIds ?? []);
          this.loadTargetOptions(dist.targetAudience);
        },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  onTargetAudienceChange(value: string): void {
    this.form.get('targetAudience')?.setValue(value);
    this.selectedTargetAudience.set(value);
    this.selectedTargetIds.set([]);
    this.loadTargetOptions(value);
  }

  loadTargetOptions(audience: string): void {
    this.targetIdOptions.set([]);
    if (audience === 'Branch') {
      this.branchesService.getBranchesForDropdown().subscribe({
        next: (branches) => this.targetIdOptions.set(branches.map(b => ({ value: b.id, label: b.name })))
      });
    } else if (audience === 'Department') {
      this.departmentsService.getDepartments({}).subscribe({
        next: (depts: any) => {
          const list = depts.data ?? depts;
          this.targetIdOptions.set(list.map((d: any) => ({ value: d.id, label: d.name })));
        }
      });
    } else if (audience === 'Role') {
      this.rolesService.getRoles().subscribe({
        next: (roles: any) => {
          const list = roles.data ?? roles;
          this.targetIdOptions.set(list.map((r: any) => ({ value: r.id, label: r.name })));
        }
      });
    }
  }

  onTargetIdChange(value: any): void {
    if (!value) return;
    const ids = this.selectedTargetIds();
    if (!ids.includes(value)) {
      this.selectedTargetIds.set([...ids, value]);
    }
  }

  removeTargetId(id: number): void {
    this.selectedTargetIds.set(this.selectedTargetIds().filter(i => i !== id));
  }

  getTargetLabel(id: number): string {
    return this.targetIdOptions().find(o => o.value === id)?.label ?? String(id);
  }

  showTargetIds(): boolean {
    const audience = this.selectedTargetAudience();
    return audience === 'Branch' || audience === 'Department' || audience === 'Role';
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const data = {
      ...this.form.value,
      targetIds: this.showTargetIds() ? this.selectedTargetIds() : undefined
    };

    const handler = {
      next: () => { this.notification.success(this.i18n.t(this.isEdit() ? 'surveys.distribution_updated' : 'surveys.distribution_created')); this.router.navigate(['/surveys/distributions']); this.saving.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    };
    if (this.isEdit()) { this.service.updateDistribution(this.entityId()!, data).subscribe(handler); }
    else { this.service.createDistribution(data).subscribe(handler); }
  }
}
