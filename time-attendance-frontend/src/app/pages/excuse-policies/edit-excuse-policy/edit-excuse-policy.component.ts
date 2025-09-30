import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ExcusePoliciesService } from '../excuse-policies.service';
import { ExcusePolicyDto, UpdateExcusePolicyRequest } from '../../../shared/models/excuse-policy.model';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';

@Component({
  selector: 'app-edit-excuse-policy',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchableSelectComponent,
    FormHeaderComponent,
    FormSectionComponent
  ],
  templateUrl: './edit-excuse-policy.component.html',
  styleUrls: ['./edit-excuse-policy.component.css']
})
export class EditExcusePolicyComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private excusePoliciesService = inject(ExcusePoliciesService);
  public i18n = inject(I18nService);

  // State
  loading = signal(false);
  saving = signal(false);
  currentPolicy = signal<ExcusePolicyDto | null>(null);
  policyId: number | null = null;

  // Form
  policyForm: FormGroup;

  // Available options
  branches = signal<Array<{id: number, name: string}>>([]);

  // Computed properties for searchable select options
  get branchOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: null, label: this.i18n.t('common.all_branches') }
    ];
    return options.concat(
      this.branches().map(branch => ({
        value: branch.id,
        label: branch.name
      }))
    );
  }

  constructor() {
    this.policyForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadBranches();
    this.loadPolicy();
  }

  /**
   * Create reactive form
   */
  private createForm(): FormGroup {
    return this.fb.group({
      branchId: [null],
      maxPersonalExcusesPerMonth: [1, [Validators.required, Validators.min(0), Validators.max(31)]],
      maxPersonalExcuseHoursPerMonth: [8, [Validators.required, Validators.min(0), Validators.max(744)]],
      maxPersonalExcuseHoursPerDay: [2, [Validators.required, Validators.min(0), Validators.max(24)]],
      maxHoursPerExcuse: [2, [Validators.required, Validators.min(0), Validators.max(24)]],
      requiresApproval: [true],
      allowPartialHourExcuses: [false],
      minimumExcuseDuration: [15, [Validators.required, Validators.min(1), Validators.max(1440)]],
      maxRetroactiveDays: [7, [Validators.required, Validators.min(0), Validators.max(365)]],
      allowSelfServiceRequests: [true],
      isActive: [true]
    });
  }

  /**
   * Load branches for dropdown
   */
  private loadBranches(): void {
    this.excusePoliciesService.getBranches().subscribe({
      next: (branches) => {
        this.branches.set(branches);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
        this.notificationService.error(this.i18n.t('excuse_policies.errors.load_branches_failed'));
      }
    });
  }

  /**
   * Load policy for editing
   */
  private loadPolicy(): void {
    const policyIdParam = this.route.snapshot.paramMap.get('id');
    if (!policyIdParam) {
      this.router.navigate(['/excuse-policies']);
      return;
    }

    this.policyId = +policyIdParam;
    this.loading.set(true);

    this.excusePoliciesService.getExcusePolicyById(this.policyId).subscribe({
      next: (policy) => {
        this.currentPolicy.set(policy);
        this.populateForm(policy);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load policy:', error);
        this.notificationService.error(this.i18n.t('excuse_policies.errors.load_failed'));
        this.loading.set(false);
        this.router.navigate(['/excuse-policies']);
      }
    });
  }

  /**
   * Populate form with policy data
   */
  private populateForm(policy: ExcusePolicyDto): void {
    this.policyForm.patchValue({
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
    });
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.policyForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const policy = this.currentPolicy();
    if (!policy) return;

    this.saving.set(true);
    const formValue = this.policyForm.value;

    const request: UpdateExcusePolicyRequest = {
      id: policy.id,
      branchId: formValue.branchId,
      maxPersonalExcusesPerMonth: formValue.maxPersonalExcusesPerMonth,
      maxPersonalExcuseHoursPerMonth: formValue.maxPersonalExcuseHoursPerMonth,
      maxPersonalExcuseHoursPerDay: formValue.maxPersonalExcuseHoursPerDay,
      maxHoursPerExcuse: formValue.maxHoursPerExcuse,
      requiresApproval: formValue.requiresApproval,
      allowPartialHourExcuses: formValue.allowPartialHourExcuses,
      minimumExcuseDuration: formValue.minimumExcuseDuration,
      maxRetroactiveDays: formValue.maxRetroactiveDays,
      allowSelfServiceRequests: formValue.allowSelfServiceRequests,
      isActive: formValue.isActive
    };

    this.excusePoliciesService.updateExcusePolicy(policy.id, request).subscribe({
      next: () => {
        this.saving.set(false);
        this.notificationService.success(this.i18n.t('excuse_policies.success.updated'));
        this.router.navigate(['/excuse-policies', policy.id, 'view']);
      },
      error: (error) => {
        this.saving.set(false);
        console.error('Failed to update policy:', error);
        this.notificationService.error(this.i18n.t('excuse_policies.errors.update_failed'));
      }
    });
  }

  /**
   * Cancel and navigate back
   */
  onCancel(): void {
    const policy = this.currentPolicy();
    if (policy) {
      this.router.navigate(['/excuse-policies', policy.id, 'view']);
    } else {
      this.router.navigate(['/excuse-policies']);
    }
  }

  /**
   * Reset form to original values
   */
  onReset(): void {
    const policy = this.currentPolicy();
    if (policy) {
      this.populateForm(policy);
    }
  }

  /**
   * Mark all form fields as touched
   */
  private markFormGroupTouched(): void {
    Object.keys(this.policyForm.controls).forEach(key => {
      const control = this.policyForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  /**
   * Check if form field has error
   */
  hasError(fieldName: string): boolean {
    const field = this.policyForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Get error message for field
   */
  getErrorMessage(fieldName: string): string {
    const field = this.policyForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return this.i18n.t('validation.required');
    }

    if (field.errors['min']) {
      return this.i18n.t('validation.min_value') + ' ' + field.errors['min'].min;
    }

    if (field.errors['max']) {
      return this.i18n.t('validation.max_value') + ' ' + field.errors['max'].max;
    }

    return '';
  }

  /**
   * Check if field is invalid for styling
   */
  isFieldInvalid(fieldName: string): boolean {
    return this.hasError(fieldName);
  }

  /**
   * Get policy branch name for display
   */
  getPolicyBranchName(): string {
    return this.currentPolicy()?.branchName || this.i18n.t('common.all_branches');
  }
}