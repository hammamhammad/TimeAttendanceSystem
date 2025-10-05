import { Component, OnInit, signal, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { RemoteWorkPoliciesService } from '../../../../core/services/remote-work-policies.service';
import { BranchesService } from '../../../branches/branches.service';
import { RemoteWorkPolicy, UpdateRemoteWorkPolicyRequest } from '../../../../core/models/remote-work-policy.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-edit-remote-work-policy',
  standalone: true,
  imports: [CommonModule, FormsModule, FormHeaderComponent, SearchableSelectComponent, LoadingSpinnerComponent],
  templateUrl: './edit-remote-work-policy.component.html',
  styleUrls: ['./edit-remote-work-policy.component.css']
})
export class EditRemoteWorkPolicyComponent implements OnInit, OnDestroy {
  private service = inject(RemoteWorkPoliciesService);
  private branchesService = inject(BranchesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);

  // Signals for state management
  loading = signal(false);
  submitting = signal(false);
  branches = signal<SearchableSelectOption[]>([]);
  policyId = signal<number | null>(null);

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
    this.loadPolicy();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load branches for selection
   */
  private loadBranches(): void {
    this.branchesService.getBranchesForDropdown().subscribe({
      next: (branches) => {
        this.branches.set(branches.map(b => ({
          value: b.id,
          label: b.name
        })));
      },
      error: (err: unknown) => {
        console.error('Failed to load branches:', err);
        this.notificationService.error(this.i18n.t('branches.errors.load_failed'));
      }
    });
  }

  /**
   * Load policy data
   */
  private loadPolicy(): void {
    this.loading.set(true);

    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id || id <= 0) {
          this.notificationService.error(this.i18n.t('remoteWork.policy.errors.invalid_id'));
          this.router.navigate(['/settings/remote-work-policy']);
          throw new Error('Invalid policy ID');
        }

        this.policyId.set(id);
        return this.service.getById(id);
      })
    ).subscribe({
      next: (policy) => {
        this.populateForm(policy);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.loading.set(false);
        console.error('Failed to load policy:', err);

        if (err.status === 404) {
          this.notificationService.error(this.i18n.t('remoteWork.policy.errors.not_found'));
        } else {
          this.notificationService.error(this.i18n.t('remoteWork.policy.errors.load_failed'));
        }

        this.router.navigate(['/settings/remote-work-policy']);
      }
    });
  }

  /**
   * Populate form with policy data
   */
  private populateForm(policy: RemoteWorkPolicy): void {
    this.policyForm = {
      branchId: policy.branchId,
      maxDaysPerWeek: policy.maxDaysPerWeek ?? undefined,
      maxDaysPerMonth: policy.maxDaysPerMonth ?? undefined,
      maxDaysPerYear: policy.maxDaysPerYear ?? undefined,
      requiresManagerApproval: policy.requiresManagerApproval,
      allowConsecutiveDays: policy.allowConsecutiveDays,
      maxConsecutiveDays: policy.maxConsecutiveDays ?? undefined,
      minAdvanceNoticeDays: policy.minAdvanceNoticeDays ?? undefined,
      blackoutPeriods: policy.blackoutPeriods ?? undefined,
      countForOvertime: policy.countForOvertime,
      enforceShiftTimes: policy.enforceShiftTimes,
      isActive: policy.isActive
    };
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    const id = this.policyId();
    if (!id) {
      this.notificationService.error(this.i18n.t('remoteWork.policy.errors.invalid_id'));
      return;
    }

    this.submitting.set(true);

    const payload: UpdateRemoteWorkPolicyRequest = {
      id,
      maxDaysPerWeek: this.policyForm.maxDaysPerWeek,
      maxDaysPerMonth: this.policyForm.maxDaysPerMonth,
      maxDaysPerYear: this.policyForm.maxDaysPerYear,
      requiresManagerApproval: this.policyForm.requiresManagerApproval,
      allowConsecutiveDays: this.policyForm.allowConsecutiveDays,
      maxConsecutiveDays: this.policyForm.maxConsecutiveDays,
      minAdvanceNoticeDays: this.policyForm.minAdvanceNoticeDays,
      blackoutPeriods: this.policyForm.blackoutPeriods,
      countForOvertime: this.policyForm.countForOvertime,
      enforceShiftTimes: this.policyForm.enforceShiftTimes
    };

    this.service.update(id, payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.notificationService.success(this.i18n.t('remoteWork.policy.success.updated'));
        this.router.navigate(['/settings/remote-work-policy']);
      },
      error: (err: unknown) => {
        this.submitting.set(false);
        console.error('Failed to update policy:', err);
        this.notificationService.error(this.i18n.t('remoteWork.policy.errors.update_failed'));
      }
    });
  }

  /**
   * Validate form data
   */
  private validateForm(): boolean {
    if (!this.policyForm.branchId) {
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
