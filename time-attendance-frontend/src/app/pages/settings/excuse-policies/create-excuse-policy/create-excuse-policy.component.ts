import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { ExcusePoliciesService } from '../excuse-policies.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { BranchesService } from '../../../branches/branches.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { CreateExcusePolicyRequest } from '../../../../shared/models/excuse-policy.model';

@Component({
  selector: 'app-create-excuse-policy',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FormHeaderComponent, FormSectionComponent],
  templateUrl: './create-excuse-policy.component.html',
  styleUrls: ['./create-excuse-policy.component.css']
})
export class CreateExcusePolicyComponent implements OnInit {
  private excusePoliciesService = inject(ExcusePoliciesService);
  private branchesService = inject(BranchesService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  // Signals for state management
  submitting = signal(false);
  branches = signal<any[]>([]);

  // Form state with default values
  policyForm = {
    branchId: null as number | null,
    maxPersonalExcusesPerMonth: 5,
    maxPersonalExcuseHoursPerMonth: 8,
    maxPersonalExcuseHoursPerDay: 4,
    maxHoursPerExcuse: 2,
    requiresApproval: true,
    allowPartialHourExcuses: true,
    minimumExcuseDuration: 0.5,
    maxRetroactiveDays: 7,
    allowSelfServiceRequests: true
  };

  // Validation errors
  validationErrors = signal<{[key: string]: string}>({});

  ngOnInit(): void {
    this.loadBranches();
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

  validateForm(): boolean {
    const errors: {[key: string]: string} = {};

    // Validate max excuses per month
    if (this.policyForm.maxPersonalExcusesPerMonth <= 0 || this.policyForm.maxPersonalExcusesPerMonth > 100) {
      errors['maxPersonalExcusesPerMonth'] = this.t('excuse_policies.validation.excusesPerMonthRange');
    }

    // Validate max hours per month
    if (this.policyForm.maxPersonalExcuseHoursPerMonth <= 0 || this.policyForm.maxPersonalExcuseHoursPerMonth > 744) {
      errors['maxPersonalExcuseHoursPerMonth'] = this.t('excuse_policies.validation.hoursPerMonthRange');
    }

    // Validate max hours per day
    if (this.policyForm.maxPersonalExcuseHoursPerDay <= 0 || this.policyForm.maxPersonalExcuseHoursPerDay > 24) {
      errors['maxPersonalExcuseHoursPerDay'] = this.t('excuse_policies.validation.hoursPerDayRange');
    }

    // Validate max hours per excuse
    if (this.policyForm.maxHoursPerExcuse <= 0) {
      errors['maxHoursPerExcuse'] = this.t('validation.min');
    }

    // Validate minimum duration
    if (this.policyForm.minimumExcuseDuration <= 0) {
      errors['minimumExcuseDuration'] = this.t('validation.min');
    }

    // Business rule: daily limit must not exceed monthly limit
    if (this.policyForm.maxPersonalExcuseHoursPerDay > this.policyForm.maxPersonalExcuseHoursPerMonth) {
      errors['maxPersonalExcuseHoursPerDay'] = this.t('excuse_policies.validation.dailyExceedsMonthly');
    }

    // Business rule: single excuse limit must not exceed daily limit
    if (this.policyForm.maxHoursPerExcuse > this.policyForm.maxPersonalExcuseHoursPerDay) {
      errors['maxHoursPerExcuse'] = this.t('excuse_policies.validation.excuseExceedsDaily');
    }

    // Business rule: minimum duration must not exceed max hours per excuse
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

    const request: CreateExcusePolicyRequest = {
      branchId: this.policyForm.branchId,
      maxPersonalExcusesPerMonth: this.policyForm.maxPersonalExcusesPerMonth,
      maxPersonalExcuseHoursPerMonth: this.policyForm.maxPersonalExcuseHoursPerMonth,
      maxPersonalExcuseHoursPerDay: this.policyForm.maxPersonalExcuseHoursPerDay,
      maxHoursPerExcuse: this.policyForm.maxHoursPerExcuse,
      requiresApproval: this.policyForm.requiresApproval,
      allowPartialHourExcuses: this.policyForm.allowPartialHourExcuses,
      minimumExcuseDuration: this.policyForm.minimumExcuseDuration,
      maxRetroactiveDays: this.policyForm.maxRetroactiveDays,
      allowSelfServiceRequests: this.policyForm.allowSelfServiceRequests
    };

    this.excusePoliciesService.createExcusePolicy(request).subscribe({
      next: (id) => {
        this.submitting.set(false);
        this.notificationService.success(
          this.t('app.success'),
          this.t('excuse_policies.create_success')
        );
        this.router.navigate(['/settings/excuse-policies', id, 'view']);
      },
      error: (error) => {
        this.submitting.set(false);
        console.error('Failed to create excuse policy:', error);

        // Extract error message from API response
        let errorMessage = this.t('excuse_policies.create_error');
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
    this.router.navigate(['/settings/excuse-policies']);
  }
}
