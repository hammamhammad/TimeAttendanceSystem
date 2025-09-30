import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { ExcusePoliciesService } from '../excuse-policies.service';
// import { BranchesService } from '../../branches/branches.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { CreateExcusePolicyRequest } from '../../../shared/models/excuse-policy.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';

interface Branch {
  id: number;
  name: string;
}

@Component({
  selector: 'app-create-excuse-policy',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormHeaderComponent],
  templateUrl: './create-excuse-policy.component.html',
  styleUrls: ['./create-excuse-policy.component.css']
})
export class CreateExcusePolicyComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private excusePoliciesService = inject(ExcusePoliciesService);
  private router = inject(Router);
  // private branchesService = inject(BranchesService);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  // Signals for state management
  loading = signal(false);
  submitting = signal(false);
  availableBranches = signal<Branch[]>([]);

  // Form
  excusePolicyForm!: FormGroup;

  // Default values
  private defaultValues = {
    maxPersonalExcusesPerMonth: 4,
    maxPersonalExcuseHoursPerMonth: 8,
    maxPersonalExcuseHoursPerDay: 2,
    maxHoursPerExcuse: 4,
    requiresApproval: true,
    allowPartialHourExcuses: true,
    maxRetroactiveDays: 7,
    allowSelfServiceRequests: true
  };

  ngOnInit(): void {
    this.initializeForm();
    this.loadBranches();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  initializeForm(): void {
    this.excusePolicyForm = this.formBuilder.group({
      branchId: [null],
      maxPersonalExcusesPerMonth: [
        this.defaultValues.maxPersonalExcusesPerMonth,
        [Validators.required, Validators.min(0), Validators.max(100)]
      ],
      maxPersonalExcuseHoursPerMonth: [
        this.defaultValues.maxPersonalExcuseHoursPerMonth,
        [Validators.required, Validators.min(0), Validators.max(744)] // Max hours in a month
      ],
      maxPersonalExcuseHoursPerDay: [
        this.defaultValues.maxPersonalExcuseHoursPerDay,
        [Validators.required, Validators.min(0), Validators.max(24)]
      ],
      maxHoursPerExcuse: [
        this.defaultValues.maxHoursPerExcuse,
        [Validators.required, Validators.min(0.5), Validators.max(24)]
      ],
      requiresApproval: [this.defaultValues.requiresApproval],
      allowPartialHourExcuses: [this.defaultValues.allowPartialHourExcuses],
      maxRetroactiveDays: [
        this.defaultValues.maxRetroactiveDays,
        [Validators.required, Validators.min(0), Validators.max(365)]
      ],
      allowSelfServiceRequests: [this.defaultValues.allowSelfServiceRequests]
    });
  }

  loadBranches(): void {
    // Temporarily use mock data to isolate the ViewChild issue
    this.availableBranches.set([
      { id: 1, name: 'Main Branch' },
      { id: 2, name: 'Secondary Branch' }
    ]);
  }

  goBack(): void {
    this.router.navigate(['/settings/excuse-policies']);
  }

  resetForm(): void {
    this.excusePolicyForm.reset();
    this.initializeForm();
    this.submitting.set(false);
  }

  onSubmit(): void {
    if (this.excusePolicyForm.valid) {
      const formValue = this.excusePolicyForm.value;

      const request: CreateExcusePolicyRequest = {
        branchId: formValue.branchId || null,
        maxPersonalExcusesPerMonth: formValue.maxPersonalExcusesPerMonth,
        maxPersonalExcuseHoursPerMonth: formValue.maxPersonalExcuseHoursPerMonth,
        maxPersonalExcuseHoursPerDay: formValue.maxPersonalExcuseHoursPerDay,
        maxHoursPerExcuse: formValue.maxHoursPerExcuse,
        requiresApproval: formValue.requiresApproval,
        allowPartialHourExcuses: formValue.allowPartialHourExcuses,
        maxRetroactiveDays: formValue.maxRetroactiveDays,
        allowSelfServiceRequests: formValue.allowSelfServiceRequests
      };

      this.submitting.set(true);

      this.excusePoliciesService.createExcusePolicy(request).subscribe({
        next: () => {
          this.submitting.set(false);
          this.notificationService.success(
            this.t('excuse_policies.create_success')
          );
          this.goBack();
        },
        error: (error) => {
          console.error('Failed to create excuse policy:', error);
          this.submitting.set(false);
          this.notificationService.error(
            this.t('excuse_policies.create_error')
          );
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.excusePolicyForm.controls).forEach(key => {
      const control = this.excusePolicyForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.excusePolicyForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.excusePolicyForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return this.t('validation.required');
      }
      if (field.errors['min']) {
        const minValue = field.errors['min'].min;
        return this.i18n.t('validation.min_value').replace('{min}', minValue);
      }
      if (field.errors['max']) {
        const maxValue = field.errors['max'].max;
        return this.i18n.t('validation.max_value').replace('{max}', maxValue);
      }
    }
    return '';
  }

  // Helper methods for template
  getBranchDisplayName(branchId: number | null): string {
    if (!branchId) {
      return this.t('excuse_policies.organization_wide');
    }
    const branch = this.availableBranches().find(b => b.id === branchId);
    return branch ? branch.name : '';
  }

}