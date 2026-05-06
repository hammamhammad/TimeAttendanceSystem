import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { AllowanceService } from '../../../../core/services/allowance.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { BranchesService } from '../../../branches/branches.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import {
  AllowanceCategory,
  AllowanceCalculationType,
  CreateAllowanceTypeRequest,
  UpdateAllowanceTypeRequest,
  AllowanceType
} from '../../../../shared/models/allowance.model';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-allowance-type',
  standalone: true,
  imports: [FormsModule, RouterModule, FormHeaderComponent, FormSectionComponent],
  templateUrl: './create-allowance-type.component.html',
  styleUrls: ['./create-allowance-type.component.css']
})
export class CreateAllowanceTypeComponent implements OnInit {
  private allowanceService = inject(AllowanceService);
  private branchesService = inject(BranchesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  private permissionService = inject(PermissionService);

  // TODO: wire up readonly disable when canEdit is false (form is a plain object with ngModel — not a FormGroup)
  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('allowanceType.update');
  }
  submitting = signal(false);
  branches = signal<any[]>([]);
  isEditMode = signal(false);
  editId = signal<number | null>(null);

  categories = Object.values(AllowanceCategory);
  calculationTypes = Object.values(AllowanceCalculationType);

  form = {
    code: '',
    name: '',
    nameAr: '',
    description: '',
    category: AllowanceCategory.Allowance as string,
    defaultCalculationType: AllowanceCalculationType.Fixed as string,
    defaultAmount: null as number | null,
    defaultPercentage: null as number | null,
    isTaxable: false,
    isSocialInsurable: false,
    isActive: true,
    branchId: null as number | null
  };

  validationErrors = signal<{ [key: string]: string }>({});

  ngOnInit(): void {
    this.loadBranches();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(Number(id));
      this.loadAllowanceType(Number(id));
    }
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadBranches(): void {
    this.branchesService.getBranches(1, 1000).subscribe({
      next: (result) => {
        this.branches.set(result.items);
      },
      error: (error: any) => {
        console.error('Failed to load branches:', error);
      }
    });
  }

  loadAllowanceType(id: number): void {
    this.allowanceService.getAllowanceType(id).subscribe({
      next: (data: AllowanceType) => {
        this.form.code = data.code;
        this.form.name = data.name;
        this.form.nameAr = data.nameAr || '';
        this.form.description = data.description || '';
        this.form.category = data.category;
        this.form.defaultCalculationType = data.defaultCalculationType;
        this.form.defaultAmount = data.defaultAmount ?? null;
        this.form.defaultPercentage = data.defaultPercentage ?? null;
        this.form.isTaxable = data.isTaxable;
        this.form.isSocialInsurable = data.isSocialInsurable;
        this.form.isActive = data.isActive;
        this.form.branchId = data.branchId ?? null;
      },
      error: (error) => {
        console.error('Failed to load allowance type:', error);
        this.notificationService.error(this.t('app.error'), this.t('allowance_types.load_error'));
        this.router.navigate(['/settings/allowance-types']);
      }
    });
  }

  getCategoryLabel(category: string): string {
    return this.t(`allowance_types.category_${category.toLowerCase()}`);
  }

  getCalcTypeLabel(calcType: string): string {
    if (calcType === 'Fixed') return this.t('allowance_types.calc_fixed');
    if (calcType === 'PercentageOfBasic') return this.t('allowance_types.calc_percent_basic');
    if (calcType === 'PercentageOfGross') return this.t('allowance_types.calc_percent_gross');
    return calcType;
  }

  isPercentageType(): boolean {
    return this.form.defaultCalculationType === 'PercentageOfBasic' || this.form.defaultCalculationType === 'PercentageOfGross';
  }

  validateForm(): boolean {
    const errors: { [key: string]: string } = {};

    if (!this.form.code || this.form.code.trim().length === 0) {
      errors['code'] = this.t('validation.required');
    }
    if (!this.form.name || this.form.name.trim().length === 0) {
      errors['name'] = this.t('validation.required');
    }
    if (!this.form.category) {
      errors['category'] = this.t('validation.required');
    }
    if (!this.form.defaultCalculationType) {
      errors['defaultCalculationType'] = this.t('validation.required');
    }

    if (this.form.defaultCalculationType === 'Fixed') {
      if (this.form.defaultAmount != null && this.form.defaultAmount < 0) {
        errors['defaultAmount'] = this.t('validation.min');
      }
    } else {
      if (this.form.defaultPercentage != null && (this.form.defaultPercentage < 0 || this.form.defaultPercentage > 100)) {
        errors['defaultPercentage'] = this.t('validation.range');
      }
    }

    this.validationErrors.set(errors);
    return Object.keys(errors).length === 0;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      this.notificationService.error(this.t('app.validationError'), this.t('app.checkForm'));
      return;
    }

    this.submitting.set(true);

    if (this.isEditMode()) {
      const request: UpdateAllowanceTypeRequest = {
        id: this.editId()!,
        code: this.form.code.trim(),
        name: this.form.name.trim(),
        nameAr: this.form.nameAr?.trim() || undefined,
        description: this.form.description?.trim() || undefined,
        category: this.form.category,
        defaultCalculationType: this.form.defaultCalculationType,
        defaultAmount: this.form.defaultCalculationType === 'Fixed' ? this.form.defaultAmount ?? undefined : undefined,
        defaultPercentage: this.isPercentageType() ? this.form.defaultPercentage ?? undefined : undefined,
        isTaxable: this.form.isTaxable,
        isSocialInsurable: this.form.isSocialInsurable,
        isActive: this.form.isActive,
        branchId: this.form.branchId ?? undefined
      };

      this.allowanceService.updateAllowanceType(this.editId()!, request).subscribe({
        next: () => {
          this.submitting.set(false);
          this.notificationService.success(this.t('app.success'), this.t('allowance_types.updated_success'));
          this.router.navigate(['/settings/allowance-types']);
        },
        error: (error) => {
          this.submitting.set(false);
          console.error('Failed to update allowance type:', error);
          const errorMessage = error?.error?.error || error?.message || this.t('allowance_types.updated_success');
          this.notificationService.error(this.t('app.error'), errorMessage);
        }
      });
    } else {
      const request: CreateAllowanceTypeRequest = {
        code: this.form.code.trim(),
        name: this.form.name.trim(),
        nameAr: this.form.nameAr?.trim() || undefined,
        description: this.form.description?.trim() || undefined,
        category: this.form.category,
        defaultCalculationType: this.form.defaultCalculationType,
        defaultAmount: this.form.defaultCalculationType === 'Fixed' ? this.form.defaultAmount ?? undefined : undefined,
        defaultPercentage: this.isPercentageType() ? this.form.defaultPercentage ?? undefined : undefined,
        isTaxable: this.form.isTaxable,
        isSocialInsurable: this.form.isSocialInsurable,
        branchId: this.form.branchId ?? undefined
      };

      this.allowanceService.createAllowanceType(request).subscribe({
        next: (id) => {
          this.submitting.set(false);
          this.notificationService.success(this.t('app.success'), this.t('allowance_types.created_success'));
          this.router.navigate(['/settings/allowance-types']);
        },
        error: (error) => {
          this.submitting.set(false);
          console.error('Failed to create allowance type:', error);
          const errorMessage = error?.error?.error || error?.message || this.t('allowance_types.created_success');
          this.notificationService.error(this.t('app.error'), errorMessage);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/settings/allowance-types']);
  }
}
