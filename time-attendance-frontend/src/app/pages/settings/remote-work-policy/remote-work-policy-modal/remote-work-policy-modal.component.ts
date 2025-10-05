import { Component, OnInit, signal, inject, output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { RemoteWorkPoliciesService } from '../../../../core/services/remote-work-policies.service';
import { RemoteWorkPolicy } from '../../../../core/models/remote-work-policy.model';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';

declare const bootstrap: any;

type ModalMode = 'create' | 'edit' | 'view';

interface Branch {
  id: number;
  name: string;
}

@Component({
  selector: 'app-remote-work-policy-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StatusBadgeComponent,
    DefinitionListComponent
  ],
  templateUrl: './remote-work-policy-modal.component.html',
  styleUrls: ['./remote-work-policy-modal.component.css']
})
export class RemoteWorkPolicyModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private remoteWorkPoliciesService = inject(RemoteWorkPoliciesService);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  @ViewChild('modalElement') modalElement!: ElementRef;

  // Output events
  policyCreated = output<void>();
  policyUpdated = output<void>();

  // Signals
  modalMode = signal<ModalMode>('create');
  currentPolicy = signal<RemoteWorkPolicy | null>(null);
  availableBranches = signal<Branch[]>([]);
  loading = signal(false);
  submitting = signal(false);

  // Form
  policyForm!: FormGroup;
  private modalInstance: any;

  ngOnInit(): void {
    this.initializeForm();
    this.loadBranches();
  }

  /**
   * Initialize the reactive form
   */
  private initializeForm(): void {
    this.policyForm = this.fb.group({
      branchId: [null, [Validators.required]],
      maxDaysPerWeek: [null, [Validators.min(1), Validators.max(7)]],
      maxDaysPerMonth: [null, [Validators.min(1), Validators.max(31)]],
      maxDaysPerYear: [null, [Validators.min(1), Validators.max(365)]],
      requiresManagerApproval: [false],
      allowConsecutiveDays: [true],
      maxConsecutiveDays: [null, [Validators.min(1), Validators.max(31)]],
      minAdvanceNoticeDays: [null, [Validators.min(0), Validators.max(90)]],
      blackoutPeriods: [''],
      countForOvertime: [true],
      enforceShiftTimes: [false],
      isActive: [true]
    });
  }

  /**
   * Load available branches
   */
  private loadBranches(): void {
    // TODO: Replace with actual branch service call
    this.availableBranches.set([
      { id: 1, name: 'Main Branch' },
      { id: 2, name: 'Secondary Branch' }
    ]);
  }

  /**
   * Open the modal in specified mode
   */
  openModal(policy?: RemoteWorkPolicy, mode: ModalMode = 'create'): void {
    this.modalMode.set(mode);
    this.currentPolicy.set(policy || null);

    if (mode === 'create') {
      this.policyForm.reset({
        requiresManagerApproval: false,
        allowConsecutiveDays: true,
        countForOvertime: true,
        enforceShiftTimes: false,
        isActive: true
      });
      this.policyForm.enable();
    } else if (mode === 'edit' && policy) {
      this.policyForm.patchValue({
        branchId: policy.branchId,
        maxDaysPerWeek: policy.maxDaysPerWeek,
        maxDaysPerMonth: policy.maxDaysPerMonth,
        maxDaysPerYear: policy.maxDaysPerYear,
        requiresManagerApproval: policy.requiresManagerApproval,
        allowConsecutiveDays: policy.allowConsecutiveDays,
        maxConsecutiveDays: policy.maxConsecutiveDays,
        minAdvanceNoticeDays: policy.minAdvanceNoticeDays,
        blackoutPeriods: policy.blackoutPeriods,
        countForOvertime: policy.countForOvertime,
        enforceShiftTimes: policy.enforceShiftTimes,
        isActive: policy.isActive
      });
      this.policyForm.enable();
    } else if (mode === 'view' && policy) {
      this.policyForm.patchValue({
        branchId: policy.branchId,
        maxDaysPerWeek: policy.maxDaysPerWeek,
        maxDaysPerMonth: policy.maxDaysPerMonth,
        maxDaysPerYear: policy.maxDaysPerYear,
        requiresManagerApproval: policy.requiresManagerApproval,
        allowConsecutiveDays: policy.allowConsecutiveDays,
        maxConsecutiveDays: policy.maxConsecutiveDays,
        minAdvanceNoticeDays: policy.minAdvanceNoticeDays,
        blackoutPeriods: policy.blackoutPeriods,
        countForOvertime: policy.countForOvertime,
        enforceShiftTimes: policy.enforceShiftTimes,
        isActive: policy.isActive
      });
      this.policyForm.disable();
    }

    this.showModal();
  }

  /**
   * Show Bootstrap modal
   */
  private showModal(): void {
    if (this.modalElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
      this.modalInstance.show();
    }
  }

  /**
   * Hide Bootstrap modal
   */
  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.policyForm.invalid) {
      this.markFormGroupTouched(this.policyForm);
      return;
    }

    this.submitting.set(true);
    const formValue = this.policyForm.value;

    if (this.modalMode() === 'create') {
      this.createPolicy(formValue);
    } else if (this.modalMode() === 'edit') {
      this.updatePolicy(formValue);
    }
  }

  /**
   * Create new policy
   */
  private createPolicy(formValue: any): void {
    this.remoteWorkPoliciesService.create(formValue).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('remoteWork.policy.success.created'));
        this.submitting.set(false);
        this.closeModal();
        this.policyCreated.emit();
      },
      error: (error) => {
        console.error('Failed to create remote work policy:', error);
        this.notificationService.error(this.i18n.t('remoteWork.policy.errors.create_failed'));
        this.submitting.set(false);
      }
    });
  }

  /**
   * Update existing policy
   */
  private updatePolicy(formValue: any): void {
    const policyId = this.currentPolicy()?.id;
    if (!policyId) return;

    this.remoteWorkPoliciesService.update(policyId, formValue).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('remoteWork.policy.success.updated'));
        this.submitting.set(false);
        this.closeModal();
        this.policyUpdated.emit();
      },
      error: (error) => {
        console.error('Failed to update remote work policy:', error);
        this.notificationService.error(this.i18n.t('remoteWork.policy.errors.update_failed'));
        this.submitting.set(false);
      }
    });
  }

  /**
   * Mark all form fields as touched to trigger validation
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Get modal title based on mode
   */
  getModalTitle(): string {
    switch (this.modalMode()) {
      case 'create':
        return this.i18n.t('remoteWork.policy.create');
      case 'edit':
        return this.i18n.t('remoteWork.policy.edit');
      case 'view':
        return this.i18n.t('remoteWork.policy.view');
      default:
        return '';
    }
  }

  /**
   * Check if form field has error
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.policyForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }

  /**
   * Get field value
   */
  getFieldValue(fieldName: string): any {
    return this.policyForm.get(fieldName)?.value;
  }

  /**
   * Get branch name by ID
   */
  getBranchName(branchId: number | undefined): string {
    if (!branchId) return '';
    return this.availableBranches().find(b => b.id === branchId)?.name || '';
  }
}
