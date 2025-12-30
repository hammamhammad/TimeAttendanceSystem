import { Component, OnInit, signal, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { RemoteWorkPoliciesService } from '../../../../core/services/remote-work-policies.service';
import { BranchesService } from '../../../branches/branches.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { CreateRemoteWorkPolicyRequest } from '../../../../core/models/remote-work-policy.model';

@Component({
  selector: 'app-create-remote-work-policy',
  standalone: true,
  imports: [FormsModule, FormHeaderComponent, SearchableSelectComponent, LoadingSpinnerComponent],
  templateUrl: './create-remote-work-policy.component.html',
  styleUrls: ['./create-remote-work-policy.component.css']
})
export class CreateRemoteWorkPolicyComponent implements OnInit {
  private service = inject(RemoteWorkPoliciesService);
  private branchesService = inject(BranchesService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  // Signals for state management
  loading = signal(false);
  submitting = signal(false);
  branches = signal<SearchableSelectOption[]>([]);

  // Policy scope (company-wide or branch-specific)
  policyScope: 'company' | 'branch' = 'company';

  // Form state
  policyForm = {
    branchId: undefined as number | undefined,
    maxDaysPerWeek: undefined as number | undefined,
    maxDaysPerMonth: undefined as number | undefined,
    maxDaysPerYear: undefined as number | undefined,
    requiresManagerApproval: true,
    allowConsecutiveDays: false,
    maxConsecutiveDays: undefined as number | undefined,
    minAdvanceNoticeDays: undefined as number | undefined,
    blackoutPeriods: undefined as string | undefined,
    countForOvertime: true,
    enforceShiftTimes: true,
    isActive: true
  };

  ngOnInit(): void {
    this.loadBranches();
  }

  /**
   * Load branches for selection
   */
  private loadBranches(): void {
    this.loading.set(true);
    this.branchesService.getBranchesForDropdown().subscribe({
      next: (branches) => {
        this.branches.set(branches.map(b => ({
          value: b.id,
          label: b.name
        })));
        this.loading.set(false);
      },
      error: (err: unknown) => {
        console.error('Failed to load branches:', err);
        this.notificationService.error(this.i18n.t('branches.errors.load_failed'));
        this.loading.set(false);
      }
    });
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.submitting.set(true);

    const payload: CreateRemoteWorkPolicyRequest = {
      branchId: this.policyScope === 'company' ? undefined : this.policyForm.branchId,
      maxDaysPerWeek: this.policyForm.maxDaysPerWeek,
      maxDaysPerMonth: this.policyForm.maxDaysPerMonth,
      maxDaysPerYear: this.policyForm.maxDaysPerYear,
      requiresManagerApproval: this.policyForm.requiresManagerApproval,
      allowConsecutiveDays: this.policyForm.allowConsecutiveDays,
      maxConsecutiveDays: this.policyForm.maxConsecutiveDays,
      minAdvanceNoticeDays: this.policyForm.minAdvanceNoticeDays,
      blackoutPeriods: this.policyForm.blackoutPeriods,
      countForOvertime: this.policyForm.countForOvertime,
      enforceShiftTimes: this.policyForm.enforceShiftTimes,
      isActive: this.policyForm.isActive
    };

    this.service.create(payload).subscribe({
      next: (response) => {
        this.submitting.set(false);
        this.notificationService.success(this.i18n.t('remoteWork.policy.success.created'));
        this.router.navigate(['/settings/remote-work-policy']);
      },
      error: (err: unknown) => {
        this.submitting.set(false);
        console.error('Failed to create policy:', err);
        this.notificationService.error(this.i18n.t('remoteWork.policy.errors.create_failed'));
      }
    });
  }

  /**
   * Handle policy scope change
   */
  onPolicyScopeChange(): void {
    if (this.policyScope === 'company') {
      // Clear branch selection for company-wide policy
      this.policyForm.branchId = undefined;
    }
  }

  /**
   * Validate form data
   */
  private validateForm(): boolean {
    // Validate branch selection for branch-specific policies
    if (this.policyScope === 'branch' && !this.policyForm.branchId) {
      this.notificationService.error(this.i18n.t('remoteWork.policy.errors.branch_required'));
      return false;
    }

    // Validate that at least one quota is set
    const hasQuota =
      (this.policyForm.maxDaysPerWeek !== undefined && this.policyForm.maxDaysPerWeek !== null) ||
      (this.policyForm.maxDaysPerMonth !== undefined && this.policyForm.maxDaysPerMonth !== null) ||
      (this.policyForm.maxDaysPerYear !== undefined && this.policyForm.maxDaysPerYear !== null);

    if (!hasQuota) {
      this.notificationService.warning(this.i18n.t('remoteWork.policy.warnings.no_quotas'));
    }

    // Validate numeric values
    if (this.policyForm.maxDaysPerWeek !== undefined &&
        this.policyForm.maxDaysPerWeek !== null &&
        (this.policyForm.maxDaysPerWeek < 0 || this.policyForm.maxDaysPerWeek > 7)) {
      this.notificationService.error(this.i18n.t('remoteWork.policy.errors.invalid_max_days_per_week'));
      return false;
    }

    if (this.policyForm.maxDaysPerMonth !== undefined &&
        this.policyForm.maxDaysPerMonth !== null &&
        (this.policyForm.maxDaysPerMonth < 0 || this.policyForm.maxDaysPerMonth > 31)) {
      this.notificationService.error(this.i18n.t('remoteWork.policy.errors.invalid_max_days_per_month'));
      return false;
    }

    if (this.policyForm.maxDaysPerYear !== undefined &&
        this.policyForm.maxDaysPerYear !== null &&
        (this.policyForm.maxDaysPerYear < 0 || this.policyForm.maxDaysPerYear > 365)) {
      this.notificationService.error(this.i18n.t('remoteWork.policy.errors.invalid_max_days_per_year'));
      return false;
    }

    if (this.policyForm.minAdvanceNoticeDays !== undefined &&
        this.policyForm.minAdvanceNoticeDays !== null &&
        this.policyForm.minAdvanceNoticeDays < 0) {
      this.notificationService.error(this.i18n.t('remoteWork.policy.errors.invalid_advance_notice'));
      return false;
    }

    return true;
  }

  /**
   * Cancel and go back
   */
  onCancel(): void {
    this.router.navigate(['/settings/remote-work-policy']);
  }
}
