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
  CreateAllowancePolicyRequest,
  UpdateAllowancePolicyRequest,
  AllowancePolicy
} from '../../../../shared/models/allowance.model';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-allowance-policy',
  standalone: true,
  imports: [FormsModule, RouterModule, FormHeaderComponent, FormSectionComponent],
  templateUrl: './create-allowance-policy.component.html',
  styleUrls: ['./create-allowance-policy.component.css']
})
export class CreateAllowancePolicyComponent implements OnInit {
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
    return !inEdit || this.permissionService.has('allowancePolicy.update');
  }
  submitting = signal(false);
  branches = signal<any[]>([]);
  allowanceTypes = signal<any[]>([]);
  isEditMode = signal(false);
  editId = signal<number | null>(null);

  form = {
    allowanceTypeId: null as number | null,
    name: '',
    nameAr: '',
    description: '',
    branchId: null as number | null,
    eligibilityRules: '',
    requiresApproval: true,
    minAmount: null as number | null,
    maxAmount: null as number | null,
    maxPercentageOfBasic: null as number | null,
    isTemporaryAllowed: false,
    maxDurationMonths: null as number | null,
    effectiveDate: '',
    isActive: true
  };

  validationErrors = signal<{ [key: string]: string }>({});

  ngOnInit(): void {
    this.loadBranches();
    this.loadAllowanceTypes();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(Number(id));
      this.loadPolicy(Number(id));
    }
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadBranches(): void {
    this.branchesService.getBranches(1, 1000).subscribe({
      next: (result) => this.branches.set(result.items),
      error: (error) => console.error('Failed to load branches:', error)
    });
  }

  loadAllowanceTypes(): void {
    this.allowanceService.getAllowanceTypeDropdown().subscribe({
      next: (data) => this.allowanceTypes.set(data),
      error: (error) => console.error('Failed to load allowance types:', error)
    });
  }

  loadPolicy(id: number): void {
    this.allowanceService.getAllowancePolicy(id).subscribe({
      next: (data: AllowancePolicy) => {
        this.form.allowanceTypeId = data.allowanceTypeId;
        this.form.name = data.name;
        this.form.nameAr = data.nameAr || '';
        this.form.description = data.description || '';
        this.form.branchId = data.branchId ?? null;
        this.form.eligibilityRules = data.eligibilityRules || '';
        this.form.requiresApproval = data.requiresApproval;
        this.form.minAmount = data.minAmount ?? null;
        this.form.maxAmount = data.maxAmount ?? null;
        this.form.maxPercentageOfBasic = data.maxPercentageOfBasic ?? null;
        this.form.isTemporaryAllowed = data.isTemporaryAllowed;
        this.form.maxDurationMonths = data.maxDurationMonths ?? null;
        this.form.effectiveDate = data.effectiveDate ? data.effectiveDate.substring(0, 10) : '';
        this.form.isActive = data.isActive;
      },
      error: (error) => {
        console.error('Failed to load policy:', error);
        this.notificationService.error(this.t('app.error'), this.t('allowance_policies.load_error'));
        this.router.navigate(['/settings/allowance-policies']);
      }
    });
  }

  validateForm(): boolean {
    const errors: { [key: string]: string } = {};

    if (!this.form.allowanceTypeId) {
      errors['allowanceTypeId'] = this.t('validation.required');
    }
    if (!this.form.name || this.form.name.trim().length === 0) {
      errors['name'] = this.t('validation.required');
    }
    if (!this.form.effectiveDate) {
      errors['effectiveDate'] = this.t('validation.required');
    }
    if (this.form.minAmount != null && this.form.maxAmount != null && this.form.minAmount > this.form.maxAmount) {
      errors['maxAmount'] = this.t('validation.min_max');
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
      const request: UpdateAllowancePolicyRequest = {
        id: this.editId()!,
        allowanceTypeId: this.form.allowanceTypeId!,
        name: this.form.name.trim(),
        nameAr: this.form.nameAr?.trim() || undefined,
        description: this.form.description?.trim() || undefined,
        branchId: this.form.branchId ?? undefined,
        eligibilityRules: this.form.eligibilityRules?.trim() || undefined,
        requiresApproval: this.form.requiresApproval,
        minAmount: this.form.minAmount ?? undefined,
        maxAmount: this.form.maxAmount ?? undefined,
        maxPercentageOfBasic: this.form.maxPercentageOfBasic ?? undefined,
        isTemporaryAllowed: this.form.isTemporaryAllowed,
        maxDurationMonths: this.form.isTemporaryAllowed ? this.form.maxDurationMonths ?? undefined : undefined,
        effectiveDate: this.form.effectiveDate,
        isActive: this.form.isActive
      };

      this.allowanceService.updateAllowancePolicy(this.editId()!, request).subscribe({
        next: () => {
          this.submitting.set(false);
          this.notificationService.success(this.t('app.success'), this.t('allowance_policies.updated_success'));
          this.router.navigate(['/settings/allowance-policies']);
        },
        error: (error) => {
          this.submitting.set(false);
          console.error('Failed to update policy:', error);
          const errorMessage = error?.error?.error || error?.message || this.t('app.error');
          this.notificationService.error(this.t('app.error'), errorMessage);
        }
      });
    } else {
      const request: CreateAllowancePolicyRequest = {
        allowanceTypeId: this.form.allowanceTypeId!,
        name: this.form.name.trim(),
        nameAr: this.form.nameAr?.trim() || undefined,
        description: this.form.description?.trim() || undefined,
        branchId: this.form.branchId ?? undefined,
        eligibilityRules: this.form.eligibilityRules?.trim() || undefined,
        requiresApproval: this.form.requiresApproval,
        minAmount: this.form.minAmount ?? undefined,
        maxAmount: this.form.maxAmount ?? undefined,
        maxPercentageOfBasic: this.form.maxPercentageOfBasic ?? undefined,
        isTemporaryAllowed: this.form.isTemporaryAllowed,
        maxDurationMonths: this.form.isTemporaryAllowed ? this.form.maxDurationMonths ?? undefined : undefined,
        effectiveDate: this.form.effectiveDate
      };

      this.allowanceService.createAllowancePolicy(request).subscribe({
        next: (id) => {
          this.submitting.set(false);
          this.notificationService.success(this.t('app.success'), this.t('allowance_policies.created_success'));
          this.router.navigate(['/settings/allowance-policies']);
        },
        error: (error) => {
          this.submitting.set(false);
          console.error('Failed to create policy:', error);
          const errorMessage = error?.error?.error || error?.message || this.t('app.error');
          this.notificationService.error(this.t('app.error'), errorMessage);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/settings/allowance-policies']);
  }
}
