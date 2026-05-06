import { Component, OnInit, signal, computed, inject, effect } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent } from '../../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { LeaveBalanceService } from '../leave-balance.service';
import { SetLeaveEntitlementRequest } from '../../../../shared/models/leave-balance.model';
import { EmployeesService } from '../../../employees/employees.service';
import { VacationTypesService } from '../../../vacation-types/vacation-types.service';

import { PermissionService } from '../../../../core/auth/permission.service';
/**
 * Component for creating and editing leave entitlements.
 * Allows HR to configure annual leave allocations for employees.
 */
@Component({
  selector: 'app-leave-entitlement-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormHeaderComponent,
    FormSectionComponent,
    SearchableSelectComponent,
    LoadingSpinnerComponent
],
  templateUrl: './leave-entitlement-form.component.html',
  styleUrls: ['./leave-entitlement-form.component.css']
})
export class LeaveEntitlementFormComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private leaveBalanceService = inject(LeaveBalanceService);
  private employeesService = inject(EmployeesService);
  private vacationTypesService = inject(VacationTypesService);
  private notificationService = inject(NotificationService);
  readonly i18n = inject(I18nService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('leaveBalance.update');
  }
  // State
  entitlementId = signal<number | null>(null);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);
  isEditMode = computed(() => this.entitlementId() !== null);

  // Form options
  employees = signal<Array<{value: number, label: string}>>([]);
  vacationTypes = signal<Array<{value: number, label: string}>>([]);
  availableYears = signal<number[]>([]);

  // Form
  entitlementForm: FormGroup;

  constructor() {
    this.entitlementForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      vacationTypeId: [null, [Validators.required]],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(2000), Validators.max(2100)]],
      annualDays: [0, [Validators.required, Validators.min(0), Validators.max(365)]],
      carryOverDays: [0, [Validators.min(0), Validators.max(365)]],
      maxCarryOverDays: [null, [Validators.min(0), Validators.max(365)]],
      expiresAtYearEnd: [true, [Validators.required]],
      effectiveStartDate: [null],
      effectiveEndDate: [null],
      notes: ['', [Validators.maxLength(500)]]
    });

    // Programmatic disable wiring (replaces template [disabled] bindings on
    // formControlName-bound controls to avoid the reactive-forms warning).
    // employeeId + vacationTypeId are locked once we're editing an existing
    // entitlement (you can't reassign the entitlement to a different employee/type).
    effect(() => {
      const editing = this.isEditMode();
      const lockedNames = ['employeeId', 'vacationTypeId'];
      for (const name of lockedNames) {
        const ctrl = this.entitlementForm?.get(name);
        if (!ctrl) continue;
        if (editing && ctrl.enabled) {
          ctrl.disable({ emitEvent: false });
        } else if (!editing && ctrl.disabled) {
          ctrl.enable({ emitEvent: false });
        }
      }
    });
  }

  ngOnInit(): void {
    this.generateAvailableYears();
    this.loadFormOptions();

    // Check if editing existing entitlement
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.entitlementId.set(+id);
        this.loadEntitlement(+id);
      }
    });
  }

  /**
   * Generates list of available years (current year ± 5 years).
   */
  private generateAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = -5; i <= 5; i++) {
      years.push(currentYear + i);
    }
    this.availableYears.set(years);
  }

  /**
   * Loads form options (employees and vacation types).
   */
  private loadFormOptions(): void {
    // Load employees
    this.employeesService.getEmployees({ pageSize: 1000 }).subscribe({
      next: (result) => {
        this.employees.set(result.items.map(emp => ({
          value: emp.id,
          label: `${emp.employeeNumber} - ${emp.fullName}`
        })));
      },
      error: (error) => {
        console.error('Failed to load employees', error);
        this.notificationService.error(this.i18n.t('errors.loadEmployeesFailed'));
      }
    });

    // Load vacation types
    this.vacationTypesService.getVacationTypes({ pageSize: 1000 }).subscribe({
      next: (result) => {
        this.vacationTypes.set(result.items.map(vt => ({
          value: vt.id,
          label: vt.name
        })));
      },
      error: (error) => {
        console.error('Failed to load vacation types', error);
        this.notificationService.error(this.i18n.t('errors.loadVacationTypesFailed'));
      }
    });
  }

  /**
   * Loads existing entitlement for editing.
   */
  private loadEntitlement(id: number): void {
    this.loading.set(true);

    // TODO: Load entitlement from API when endpoint is available
    // For now, populate with sample data
    setTimeout(() => {
      const sampleEntitlement = {
        employeeId: 1,
        vacationTypeId: 1,
        year: new Date().getFullYear(),
        annualDays: 30,
        carryOverDays: 5,
        maxCarryOverDays: 10,
        expiresAtYearEnd: false,
        effectiveStartDate: `${new Date().getFullYear()}-01-01`,
        effectiveEndDate: `${new Date().getFullYear()}-12-31`,
        notes: 'Standard annual leave entitlement'
      };

      this.entitlementForm.patchValue(sampleEntitlement);
      this.loading.set(false);
    }, 500);
  }

  /**
   * Handles form submission.
   */
  onSubmit(): void {
    if (this.entitlementForm.invalid) {
      this.entitlementForm.markAllAsTouched();
      this.notificationService.error(this.i18n.t('errors.formValidationFailed'));
      return;
    }

    this.submitting.set(true);

    const request: SetLeaveEntitlementRequest = {
      employeeId: this.entitlementForm.value.employeeId,
      vacationTypeId: this.entitlementForm.value.vacationTypeId,
      year: this.entitlementForm.value.year,
      annualDays: this.entitlementForm.value.annualDays,
      carryOverDays: this.entitlementForm.value.carryOverDays || 0,
      maxCarryOverDays: this.entitlementForm.value.maxCarryOverDays,
      expiresAtYearEnd: this.entitlementForm.value.expiresAtYearEnd,
      effectiveStartDate: this.entitlementForm.value.effectiveStartDate,
      effectiveEndDate: this.entitlementForm.value.effectiveEndDate,
      notes: this.entitlementForm.value.notes || null
    };

    this.leaveBalanceService.setLeaveEntitlement(request).subscribe({
      next: (entitlementId) => {
        this.submitting.set(false);
        const successMessage = this.isEditMode()
          ? this.i18n.t('leaveBalance.entitlementUpdated')
          : this.i18n.t('leaveBalance.entitlementCreated');
        this.notificationService.success(successMessage);
        this.router.navigate(['/settings/leave-entitlements']);
      },
      error: (error) => {
        this.submitting.set(false);
        const errorMessage = error.error?.message || this.i18n.t('errors.operationFailed');
        this.notificationService.error(errorMessage);
      }
    });
  }

  /**
   * Cancels form and navigates back.
   */
  onCancel(): void {
    this.router.navigate(['/settings/leave-entitlements']);
  }

  /**
   * Gets page title based on mode.
   */
  getPageTitle(): string {
    return this.isEditMode()
      ? this.i18n.t('leaveBalance.editEntitlement')
      : this.i18n.t('leaveBalance.createEntitlement');
  }

  /**
   * Gets submit button label based on mode.
   */
  getSubmitButtonLabel(): string {
    return this.isEditMode()
      ? this.i18n.t('common.update')
      : this.i18n.t('common.create');
  }

  /**
   * Validates max carry-over days against carry-over days.
   */
  validateMaxCarryOver(): void {
    const carryOver = this.entitlementForm.value.carryOverDays;
    const maxCarryOver = this.entitlementForm.value.maxCarryOverDays;

    if (maxCarryOver !== null && maxCarryOver < carryOver) {
      this.entitlementForm.patchValue({
        maxCarryOverDays: carryOver
      });
      if (!this.canEdit()) {
        this.entitlementForm.disable();
      }
    }
  }
}
