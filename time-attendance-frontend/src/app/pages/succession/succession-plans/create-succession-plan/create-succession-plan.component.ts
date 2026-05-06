import { Component, inject, signal, OnInit, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { SuccessionService } from '../../../../core/services/succession.service';
import { KeyPositionDropdown } from '../../../../shared/models/succession.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-succession-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, LoadingSpinnerComponent, SearchableSelectComponent],
  templateUrl: './create-succession-plan.component.html',
  styleUrls: ['./create-succession-plan.component.css']
})
export class CreateSuccessionPlanComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);
  private service = inject(SuccessionService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('successionPlan.update');
  }
  submitting = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  loadingData = signal(false);
  keyPositions = signal<KeyPositionDropdown[]>([]);

  keyPositionOptions = computed(() =>
    this.keyPositions().map(k => ({ value: k.id, label: k.jobTitle } as SearchableSelectOption))
  );

  form = this.fb.group({
    keyPositionId: [null as number | null, Validators.required],
    name: ['', Validators.required],
    nameAr: [''],
    status: ['Draft', Validators.required],
    effectiveDate: ['', Validators.required],
    reviewDate: [''],
    isActive: [true],
    notes: ['']
  });

  constructor() {
    // Programmatic disable wiring (replaces template [disabled] binding on the
    // keyPositionId searchable-select to avoid the reactive-forms warning).
    // The key position is locked once a succession plan exists.
    effect(() => {
      const editing = this.isEditMode();
      const ctrl = this.form.get('keyPositionId');
      if (!ctrl) return;
      if (editing && ctrl.enabled) {
        ctrl.disable({ emitEvent: false });
      } else if (!editing && ctrl.disabled) {
        ctrl.enable({ emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.service.getKeyPositionDropdown().subscribe(d => this.keyPositions.set(d));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadingData.set(true);
      this.service.getSuccessionPlan(+id).subscribe({
        next: (d) => {
          this.form.patchValue({
            keyPositionId: d.keyPositionId,
            name: d.name,
            nameAr: d.nameAr || '',
            status: d.status,
            effectiveDate: d.effectiveDate?.split('T')[0] || '',
            reviewDate: d.reviewDate?.split('T')[0] || '',
            isActive: d.isActive,
            notes: d.notes || ''
          });
          if (!this.canEdit()) {
            this.form.disable();
          }
          this.loadingData.set(false);
        },
        error: () => { this.notification.error(this.i18n.t('succession.plans.load_error')); this.router.navigate(['/succession/plans']); }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.getRawValue();

    if (this.isEditMode()) {
      const payload = {
        name: v.name!,
        nameAr: v.nameAr || undefined,
        status: v.status as any,
        effectiveDate: v.effectiveDate!,
        reviewDate: v.reviewDate || undefined,
        isActive: v.isActive!,
        notes: v.notes || undefined
      };
      this.service.updateSuccessionPlan(this.editId()!, payload).subscribe({
        next: () => { this.notification.success(this.i18n.t('succession.plans.updated_success')); this.router.navigate(['/succession/plans']); },
        error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('succession.plans.update_error')); this.submitting.set(false); }
      });
    } else {
      const payload = {
        keyPositionId: v.keyPositionId!,
        name: v.name!,
        nameAr: v.nameAr || undefined,
        status: v.status as any,
        effectiveDate: v.effectiveDate!,
        reviewDate: v.reviewDate || undefined,
        notes: v.notes || undefined
      };
      this.service.createSuccessionPlan(payload).subscribe({
        next: () => { this.notification.success(this.i18n.t('succession.plans.created_success')); this.router.navigate(['/succession/plans']); },
        error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('succession.plans.create_error')); this.submitting.set(false); }
      });
    }
  }
}
