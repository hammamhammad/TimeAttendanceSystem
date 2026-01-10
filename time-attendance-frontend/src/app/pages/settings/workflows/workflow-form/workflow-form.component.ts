import { Component, OnInit, signal, inject, computed } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { WorkflowsService } from '../workflows.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { BranchesService } from '../../../branches/branches.service';
import { Branch } from '../../../../shared/models/branch.model';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import {
  WorkflowDefinition,
  WorkflowStep,
  WorkflowEntityType,
  WorkflowStepType,
  ApproverType,
  TimeoutAction,
  CreateWorkflowDefinitionRequest,
  UpdateWorkflowDefinitionRequest,
  CreateWorkflowStepRequest
} from '../../../../shared/models/workflow.model';

@Component({
  selector: 'app-workflow-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SearchableSelectComponent
],
  templateUrl: './workflow-form.component.html',
  styleUrls: ['./workflow-form.component.css']
})
export class WorkflowFormComponent implements OnInit {
  private workflowsService = inject(WorkflowsService);
  private branchesService = inject(BranchesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Component state
  loading = signal(false);
  saving = signal(false);
  isEditMode = signal(false);
  isViewMode = signal(false);
  workflowId = signal<number | null>(null);
  workflow = signal<WorkflowDefinition | null>(null);
  branches = signal<Branch[]>([]);

  // Branch select options for searchable select
  branchSelectOptions = computed<SearchableSelectOption[]>(() => {
    return this.branches().map(branch => ({
      value: branch.id.toString(),
      label: branch.name
    }));
  });

  // Form
  form!: FormGroup;

  // Dropdown options
  entityTypes = this.workflowsService.getEntityTypes();
  stepTypes: { value: WorkflowStepType; label: string }[] = [
    { value: 'Approval', label: 'Approval' },
    { value: 'Notification', label: 'Notification' },
    { value: 'Validation', label: 'Validation' },
    { value: 'Condition', label: 'Condition' }
  ];
  approverTypes: { value: ApproverType; label: string }[] = [
    { value: 'DirectManager', label: 'Direct Manager' },
    { value: 'DepartmentHead', label: 'Department Head' },
    { value: 'Role', label: 'Specific Role' },
    { value: 'SpecificUser', label: 'Specific User' }
  ];
  timeoutActions: { value: TimeoutAction; label: string }[] = [
    { value: 'Expire', label: 'Expire' },
    { value: 'Escalate', label: 'Escalate' },
    { value: 'AutoApprove', label: 'Auto Approve' },
    { value: 'AutoReject', label: 'Auto Reject' }
  ];

  // Page title
  pageTitle = computed(() => {
    if (this.isViewMode()) return this.t('workflows.view_workflow');
    if (this.isEditMode()) return this.t('workflows.edit_workflow');
    return this.t('workflows.create_workflow');
  });

  ngOnInit(): void {
    this.initForm();
    this.loadBranches();
    this.checkRouteParams();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      nameAr: ['', [Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(1000)]],
      descriptionAr: ['', [Validators.maxLength(1000)]],
      entityType: ['Vacation', Validators.required],
      branchId: [null],
      isDefault: [false],
      steps: this.fb.array([])
    });
  }

  loadBranches(): void {
    this.branchesService.getBranchesForDropdown().subscribe({
      next: (branches) => {
        this.branches.set(branches);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
      }
    });
  }

  onBranchSelectionChange(value: string): void {
    const branchId = value ? parseInt(value, 10) : null;
    this.form.patchValue({ branchId });
  }

  get stepsArray(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  checkRouteParams(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const path = this.route.snapshot.url.map(s => s.path).join('/');

    if (id) {
      this.workflowId.set(parseInt(id, 10));

      if (path.includes('view')) {
        this.isViewMode.set(true);
      } else if (path.includes('edit')) {
        this.isEditMode.set(true);
      }

      this.loadWorkflow();
    } else {
      // Create mode - add one default step
      this.addStep();
    }
  }

  loadWorkflow(): void {
    const id = this.workflowId();
    if (!id) return;

    this.loading.set(true);

    this.workflowsService.getWorkflowDefinitionById(id).subscribe({
      next: (workflow) => {
        this.workflow.set(workflow);
        this.populateForm(workflow);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load workflow:', error);
        this.loading.set(false);
        this.notificationService.error(
          this.t('app.error'),
          this.t('workflows.load_error')
        );
        this.router.navigate(['/settings/workflows']);
      }
    });
  }

  populateForm(workflow: WorkflowDefinition): void {
    this.form.patchValue({
      name: workflow.name,
      nameAr: workflow.nameAr,
      description: workflow.description,
      descriptionAr: workflow.descriptionAr,
      entityType: workflow.entityType,
      branchId: workflow.branchId,
      isDefault: workflow.isDefault
    });

    // Clear existing steps
    while (this.stepsArray.length) {
      this.stepsArray.removeAt(0);
    }

    // Add steps from workflow
    workflow.steps
      .sort((a, b) => a.stepOrder - b.stepOrder)
      .forEach(step => this.addStep(step));

    if (this.isViewMode()) {
      this.form.disable();
    }
  }

  addStep(step?: WorkflowStep): void {
    const stepGroup = this.fb.group({
      stepOrder: [step?.stepOrder ?? this.stepsArray.length + 1],
      name: [step?.name ?? '', [Validators.required, Validators.maxLength(255)]],
      nameAr: [step?.nameAr ?? '', [Validators.maxLength(255)]],
      stepType: [step?.stepType ?? 'Approval', Validators.required],
      approverType: [step?.approverType ?? 'DirectManager', Validators.required],
      approverRoleId: [step?.approverRoleId],
      approverUserId: [step?.approverUserId],
      conditionJson: [step?.conditionJson],
      timeoutHours: [step?.timeoutHours],
      timeoutAction: [step?.timeoutAction ?? 'Expire'],
      allowDelegation: [step?.allowDelegation ?? true],
      notifyOnAction: [step?.notifyOnAction ?? true],
      notifyRequesterOnReach: [step?.notifyRequesterOnReach ?? true],
      approverInstructions: [step?.approverInstructions],
      approverInstructionsAr: [step?.approverInstructionsAr],
      requireCommentsOnApprove: [step?.requireCommentsOnApprove ?? false],
      requireCommentsOnReject: [step?.requireCommentsOnReject ?? true]
    });

    this.stepsArray.push(stepGroup);
  }

  removeStep(index: number): void {
    this.stepsArray.removeAt(index);
    // Re-order remaining steps
    this.stepsArray.controls.forEach((control, i) => {
      control.patchValue({ stepOrder: i + 1 });
    });
  }

  moveStepUp(index: number): void {
    if (index === 0) return;
    const steps = this.stepsArray;
    const current = steps.at(index);
    steps.removeAt(index);
    steps.insert(index - 1, current);
    // Update step orders
    steps.controls.forEach((control, i) => {
      control.patchValue({ stepOrder: i + 1 });
    });
  }

  moveStepDown(index: number): void {
    if (index === this.stepsArray.length - 1) return;
    const steps = this.stepsArray;
    const current = steps.at(index);
    steps.removeAt(index);
    steps.insert(index + 1, current);
    // Update step orders
    steps.controls.forEach((control, i) => {
      control.patchValue({ stepOrder: i + 1 });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.warning(
        this.t('app.validationError'),
        this.t('app.checkForm')
      );
      return;
    }

    this.saving.set(true);

    const formValue = this.form.value;
    const steps: CreateWorkflowStepRequest[] = formValue.steps.map((step: any) => ({
      stepOrder: step.stepOrder,
      name: step.name,
      nameAr: step.nameAr || undefined,
      stepType: step.stepType,
      approverType: step.approverType,
      approverRoleId: step.approverRoleId || undefined,
      approverUserId: step.approverUserId || undefined,
      conditionJson: step.conditionJson || undefined,
      timeoutHours: step.timeoutHours || undefined,
      timeoutAction: step.timeoutAction,
      allowDelegation: step.allowDelegation,
      notifyOnAction: step.notifyOnAction,
      notifyRequesterOnReach: step.notifyRequesterOnReach,
      approverInstructions: step.approverInstructions || undefined,
      approverInstructionsAr: step.approverInstructionsAr || undefined,
      requireCommentsOnApprove: step.requireCommentsOnApprove,
      requireCommentsOnReject: step.requireCommentsOnReject
    }));

    if (this.isEditMode() && this.workflowId()) {
      const request: UpdateWorkflowDefinitionRequest = {
        name: formValue.name,
        nameAr: formValue.nameAr || undefined,
        description: formValue.description || undefined,
        descriptionAr: formValue.descriptionAr || undefined,
        isDefault: formValue.isDefault,
        steps
      };

      this.workflowsService.updateWorkflowDefinition(this.workflowId()!, request).subscribe({
        next: () => {
          this.saving.set(false);
          this.notificationService.success(
            this.t('app.success'),
            this.t('workflows.update_success')
          );
          this.router.navigate(['/settings/workflows']);
        },
        error: (error) => {
          console.error('Failed to update workflow:', error);
          this.saving.set(false);
          this.notificationService.error(
            this.t('app.error'),
            this.t('workflows.update_error')
          );
        }
      });
    } else {
      const request: CreateWorkflowDefinitionRequest = {
        name: formValue.name,
        nameAr: formValue.nameAr || undefined,
        description: formValue.description || undefined,
        descriptionAr: formValue.descriptionAr || undefined,
        entityType: formValue.entityType,
        branchId: formValue.branchId || undefined,
        isDefault: formValue.isDefault,
        steps
      };

      this.workflowsService.createWorkflowDefinition(request).subscribe({
        next: () => {
          this.saving.set(false);
          this.notificationService.success(
            this.t('app.success'),
            this.t('workflows.create_success')
          );
          this.router.navigate(['/settings/workflows']);
        },
        error: (error) => {
          console.error('Failed to create workflow:', error);
          this.saving.set(false);
          this.notificationService.error(
            this.t('app.error'),
            this.t('workflows.create_error')
          );
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/settings/workflows']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  isStepFieldInvalid(stepIndex: number, fieldName: string): boolean {
    const step = this.stepsArray.at(stepIndex);
    const field = step?.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
