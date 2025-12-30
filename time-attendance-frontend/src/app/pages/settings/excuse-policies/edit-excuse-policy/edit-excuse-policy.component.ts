import { Component, OnInit, signal, inject, OnDestroy } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { ExcusePoliciesService } from '../excuse-policies.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { BranchesService } from '../../../branches/branches.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { UpdateExcusePolicyRequest } from '../../../../shared/models/excuse-policy.model';

@Component({
  selector: 'app-edit-excuse-policy',
  standalone: true,
  imports: [FormsModule, RouterModule, FormHeaderComponent, FormSectionComponent, LoadingSpinnerComponent],
  templateUrl: './edit-excuse-policy.component.html',
  styleUrls: ['./edit-excuse-policy.component.css']
})
export class EditExcusePolicyComponent implements OnInit, OnDestroy {
  private excusePoliciesService = inject(ExcusePoliciesService);
  private branchesService = inject(BranchesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);

  // Signals for state management
  loading = signal(false);
  submitting = signal(false);
  branches = signal<any[]>([]);
  policyId = signal<number | null>(null);

  // Form state
  policyForm = {
    id: 0,
    branchId: null as number | null,
    maxPersonalExcusesPerMonth: 5,
    maxPersonalExcuseHoursPerMonth: 8,
    maxPersonalExcuseHoursPerDay: 4,
    maxHoursPerExcuse: 2,
    requiresApproval: true,
    allowPartialHourExcuses: true,
    minimumExcuseDuration: 0.5,
    maxRetroactiveDays: 7,
    allowSelfServiceRequests: true,
    isActive: true
  };

  // Validation errors
  validationErrors = signal<{[key: string]: string}>({});

  ngOnInit(): void {
    this.loadBranches();
    this.loadPolicy();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  private loadPolicy(): void {
    this.loading.set(true);

    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id || id <= 0) {
          this.notificationService.error(
            this.t('app.error'),
            this.t('excuse_policies.errors.load_failed')
          );
          this.router.navigate(['/settings/excuse-policies']);
          throw new Error('Invalid excuse policy ID');
        }

        this.policyId.set(id);
        return this.excusePoliciesService.getExcusePolicyById(id);
      })
    ).subscribe({
      next: (policy) => {
        this.loading.set(false);
        this.policyForm = {
          id: policy.id,
          branchId: policy.branchId,
          maxPersonalExcusesPerMonth: policy.maxPersonalExcusesPerMonth,
          maxPersonalExcuseHoursPerMonth: policy.maxPersonalExcuseHoursPerMonth,
          maxPersonalExcuseHoursPerDay: policy.maxPersonalExcuseHoursPerDay,
          maxHoursPerExcuse: policy.maxHoursPerExcuse,
          requiresApproval: policy.requiresApproval,
          allowPartialHourExcuses: policy.allowPartialHourExcuses,
          minimumExcuseDuration: policy.minimumExcuseDuration,
          maxRetroactiveDays: policy.maxRetroactiveDays,
          allowSelfServiceRequests: policy.allowSelfServiceRequests,
          isActive: policy.isActive
        };
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Failed to load excuse policy:', error);
        this.notificationService.error(
          this.t('app.error'),
          this.t('excuse_policies.errors.load_failed')
        );
        this.router.navigate(['/settings/excuse-policies']);
      }
    });
  }

  validateForm(): boolean {
    const errors: {[key: string]: string} = {};

    if (this.policyForm.maxPersonalExcusesPerMonth <= 0 || this.policyForm.maxPersonalExcusesPerMonth > 100) {
      errors['maxPersonalExcusesPerMonth'] = this.t('excuse_policies.validation.excusesPerMonthRange');
    }

    if (this.policyForm.maxPersonalExcuseHoursPerMonth <= 0 || this.policyForm.maxPersonalExcuseHoursPerMonth > 744) {
      errors['maxPersonalExcuseHoursPerMonth'] = this.t('excuse_policies.validation.hoursPerMonthRange');
    }

    if (this.policyForm.maxPersonalExcuseHoursPerDay <= 0 || this.policyForm.maxPersonalExcuseHoursPerDay > 24) {
      errors['maxPersonalExcuseHoursPerDay'] = this.t('excuse_policies.validation.hoursPerDayRange');
    }

    if (this.policyForm.maxHoursPerExcuse <= 0) {
      errors['maxHoursPerExcuse'] = this.t('validation.min');
    }

    if (this.policyForm.minimumExcuseDuration <= 0) {
      errors['minimumExcuseDuration'] = this.t('validation.min');
    }

    if (this.policyForm.maxPersonalExcuseHoursPerDay > this.policyForm.maxPersonalExcuseHoursPerMonth) {
      errors['maxPersonalExcuseHoursPerDay'] = this.t('excuse_policies.validation.dailyExceedsMonthly');
    }

    if (this.policyForm.maxHoursPerExcuse > this.policyForm.maxPersonalExcuseHoursPerDay) {
      errors['maxHoursPerExcuse'] = this.t('excuse_policies.validation.excuseExceedsDaily');
    }

    if (this.policyForm.minimumExcuseDuration > this.policyForm.maxHoursPerExcuse) {
      errors['minimumExcuseDuration'] = this.t('excuse_policies.validation.minimumExceedsMaximum');
    }

    this.validationErrors.set(errors);
    return Object.keys(errors).length === 0;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      this.notificationService.error(
        this.t('app.error'),
        this.t('excuse_policies.validation.pleaseFix')
      );
      return;
    }

    this.submitting.set(true);

    const request: UpdateExcusePolicyRequest = {
      id: this.policyForm.id,
      branchId: this.policyForm.branchId,
      maxPersonalExcusesPerMonth: this.policyForm.maxPersonalExcusesPerMonth,
      maxPersonalExcuseHoursPerMonth: this.policyForm.maxPersonalExcuseHoursPerMonth,
      maxPersonalExcuseHoursPerDay: this.policyForm.maxPersonalExcuseHoursPerDay,
      maxHoursPerExcuse: this.policyForm.maxHoursPerExcuse,
      requiresApproval: this.policyForm.requiresApproval,
      allowPartialHourExcuses: this.policyForm.allowPartialHourExcuses,
      minimumExcuseDuration: this.policyForm.minimumExcuseDuration,
      maxRetroactiveDays: this.policyForm.maxRetroactiveDays,
      allowSelfServiceRequests: this.policyForm.allowSelfServiceRequests,
      isActive: this.policyForm.isActive
    };

    this.excusePoliciesService.updateExcusePolicy(this.policyForm.id, request).subscribe({
      next: () => {
        this.submitting.set(false);
        this.notificationService.success(
          this.t('app.success'),
          this.t('excuse_policies.update_success')
        );
        this.router.navigate(['/settings/excuse-policies', this.policyForm.id, 'view']);
      },
      error: (error) => {
        this.submitting.set(false);
        console.error('Failed to update excuse policy:', error);

        // Extract error message from API response
        let errorMessage = this.t('excuse_policies.update_error');
        if (error?.error?.error) {
          errorMessage = error.error.error;
        } else if (error?.message) {
          errorMessage = error.message;
        }

        this.notificationService.error(
          this.t('app.error'),
          errorMessage
        );
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/settings/excuse-policies', this.policyForm.id, 'view']);
  }
}
