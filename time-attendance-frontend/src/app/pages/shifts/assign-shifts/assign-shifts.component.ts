import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { ShiftAssignmentService } from '../../../core/services/shift-assignment.service';
import { ShiftsService } from '../shifts.service';
import { BranchesService } from '../../branches/branches.service';
import { EmployeesService } from '../../employees/employees.service';
import { DepartmentsService } from '../../departments/departments.service';
import {
  ShiftAssignment,
  ShiftAssignmentType,
  ShiftAssignmentStatus,
  ShiftAssignmentsResponse,
  CreateShiftAssignmentRequest,
  UpdateShiftAssignmentRequest,
  ShiftAssignmentOptions,
  Shift,
  ShiftsResponse
} from '../../../shared/models/shift.model';
import { Branch } from '../../../shared/models/branch.model';
import { EmployeeSelectOption } from '../../../shared/models/employee.model';
import { DepartmentDto } from '../../../shared/models/department.model';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';

@Component({
  selector: 'app-assign-shifts',
  standalone: true,
  imports: [CommonModule, FormsModule, HasPermissionDirective, SearchableSelectComponent],
  templateUrl: './assign-shifts.component.html',
  styleUrls: ['./assign-shifts.component.css']
})
export class AssignShiftsComponent implements OnInit {
  private shiftAssignmentService = inject(ShiftAssignmentService);
  private shiftsService = inject(ShiftsService);
  private branchesService = inject(BranchesService);
  private employeesService = inject(EmployeesService);
  private departmentsService = inject(DepartmentsService);
  private router = inject(Router);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Permission constants for use in template
  readonly PERMISSIONS = {
    SHIFT_ASSIGNMENT_CREATE: `${PermissionResources.SHIFT}.${PermissionActions.CREATE}`,
    SHIFT_ASSIGNMENT_READ: `${PermissionResources.SHIFT}.${PermissionActions.READ}`,
    SHIFT_ASSIGNMENT_UPDATE: `${PermissionResources.SHIFT}.${PermissionActions.UPDATE}`,
    SHIFT_ASSIGNMENT_DELETE: `${PermissionResources.SHIFT}.${PermissionActions.DELETE}`,
    SHIFT_ASSIGNMENT_MANAGE: `${PermissionResources.SHIFT}.${PermissionActions.MANAGE}`
  };

  // Enum references for template
  readonly ShiftAssignmentType = ShiftAssignmentType;
  readonly ShiftAssignmentStatus = ShiftAssignmentStatus;
  readonly Math = Math;

  // Signals for state management
  assignments = signal<ShiftAssignment[]>([]);
  totalCount = signal<number>(0);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalPages = signal<number>(0);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Filter signals
  searchTerm = signal<string>('');
  selectedAssignmentType = signal<ShiftAssignmentType | null>(null);
  selectedStatus = signal<ShiftAssignmentStatus | null>(null);
  selectedShiftId = signal<number | null>(null);
  selectedEmployeeId = signal<number | null>(null);
  selectedDepartmentId = signal<number | null>(null);
  selectedBranchId = signal<number | null>(null);
  currentlyActiveOnly = signal<boolean>(false);

  // Create/Edit assignment signals
  showCreateModal = signal<boolean>(false);
  showEditModal = signal<boolean>(false);
  editingAssignment = signal<ShiftAssignment | null>(null);

  // Form data signals
  createForm = signal<CreateShiftAssignmentRequest>({
    shiftId: 0,
    assignmentType: ShiftAssignmentType.Employee,
    effectiveDate: new Date().toISOString().split('T')[0],
    status: ShiftAssignmentStatus.Active,
    priority: 10
  });

  // Options and lookup data
  assignmentOptions = signal<ShiftAssignmentOptions>({
    assignmentTypes: [],
    statuses: []
  });
  availableShifts = signal<Shift[]>([]);
  availableBranches = signal<Branch[]>([]);
  availableEmployees = signal<EmployeeSelectOption[]>([]);
  availableDepartments = signal<DepartmentDto[]>([]);
  selectedBranchForFilter = signal<number | null>(null);

  ngOnInit(): void {
    this.loadAssignments();
    this.loadOptions();
    this.loadShifts();
    this.loadBranches();
    this.loadEmployees();
    this.loadDepartments();
  }

  loadAssignments(): void {
    this.loading.set(true);
    this.error.set(null);

    const params = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      search: this.searchTerm() || undefined,
      assignmentType: this.selectedAssignmentType() || undefined,
      status: this.selectedStatus() || undefined,
      shiftId: this.selectedShiftId() || undefined,
      employeeId: this.selectedEmployeeId() || undefined,
      departmentId: this.selectedDepartmentId() || undefined,
      branchId: this.selectedBranchId() || undefined,
      currentlyActive: this.currentlyActiveOnly() || undefined
    };

    this.shiftAssignmentService.getShiftAssignments(params).subscribe({
      next: (response: ShiftAssignmentsResponse) => {
        this.assignments.set(response.items);
        this.totalCount.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading shift assignments:', error);
        this.error.set(this.i18n.t('shifts.assignments.loadError'));
        this.loading.set(false);
      }
    });
  }

  loadOptions(): void {
    this.shiftAssignmentService.getAssignmentOptions().subscribe({
      next: (options) => {
        this.assignmentOptions.set(options);
      },
      error: (error) => {
        console.error('Error loading assignment options:', error);
      }
    });
  }

  loadShifts(): void {
    this.shiftsService.getShifts(1, 1000).subscribe({
      next: (response: ShiftsResponse) => {
        this.availableShifts.set(response.items);
      },
      error: (error) => {
        console.error('Error loading shifts:', error);
      }
    });
  }

  loadBranches(): void {
    this.branchesService.getBranches(1, 1000).subscribe({
      next: (response) => {
        this.availableBranches.set(response.items);
      },
      error: (error) => {
        console.error('Error loading branches:', error);
      }
    });
  }

  loadEmployees(branchId?: number): void {
    this.employeesService.getEmployeesForSelection(branchId).subscribe({
      next: (employees) => {
        this.availableEmployees.set(employees);
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  loadDepartments(branchId?: number): void {
    const filter = branchId ? { branchId, isActive: true } : { isActive: true };
    this.departmentsService.getDepartments(filter).subscribe({
      next: (departments) => {
        this.availableDepartments.set(departments);
      },
      error: (error) => {
        console.error('Error loading departments:', error);
      }
    });
  }

  // Pagination methods
  onPageChanged(page: number): void {
    this.currentPage.set(page);
    this.loadAssignments();
  }

  onPageSizeChanged(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadAssignments();
  }

  // Filter methods
  onSearchChanged(): void {
    this.currentPage.set(1);
    this.loadAssignments();
  }

  onFilterChanged(): void {
    this.currentPage.set(1);
    this.loadAssignments();
  }

  onBranchFilterChanged(branchId: number | null): void {
    this.selectedBranchId.set(branchId);
    this.onFilterChanged();

    // Also update the dropdowns for create form based on selected filter branch
    this.loadEmployees(branchId || undefined);
    this.loadDepartments(branchId || undefined);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedAssignmentType.set(null);
    this.selectedStatus.set(null);
    this.selectedShiftId.set(null);
    this.selectedEmployeeId.set(null);
    this.selectedDepartmentId.set(null);
    this.selectedBranchId.set(null);
    this.currentlyActiveOnly.set(false);
    this.currentPage.set(1);
    this.loadAssignments();
  }

  // Create assignment methods
  openCreateModal(): void {
    // Set effective date to tomorrow (today + 1 day) to meet the validation requirement
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.createForm.set({
      shiftId: 0,
      assignmentType: ShiftAssignmentType.Employee,
      effectiveDate: tomorrow.toISOString().split('T')[0],
      status: ShiftAssignmentStatus.Active,
      priority: 10
    });
    this.showCreateModal.set(true);
  }

  closeCreateModal(): void {
    this.showCreateModal.set(false);
  }

  createAssignment(): void {
    if (this.isCreateFormValid()) {
      this.shiftAssignmentService.createShiftAssignment(this.createForm()).subscribe({
        next: (result) => {
          console.log('Assignment created successfully:', result);
          this.closeCreateModal();
          this.loadAssignments();
        },
        error: (error) => {
          console.error('Error creating assignment:', error);
          // Handle error display
        }
      });
    }
  }

  isCreateFormValid(): boolean {
    const form = this.createForm();
    return form.shiftId > 0 &&
           form.effectiveDate !== '' &&
           this.isEffectiveDateValid(form.effectiveDate) &&
           this.isTargetValid(form.assignmentType, form.employeeId, form.departmentId, form.branchId);
  }

  private isEffectiveDateValid(effectiveDate: string): boolean {
    if (!effectiveDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(effectiveDate);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate > today;
  }

  private isTargetValid(type: ShiftAssignmentType, empId?: number, deptId?: number, branchId?: number): boolean {
    switch (type) {
      case ShiftAssignmentType.Employee:
        return !!empId && empId > 0;
      case ShiftAssignmentType.Department:
        return !!deptId && deptId > 0;
      case ShiftAssignmentType.Branch:
        return !!branchId && branchId > 0;
      default:
        return false;
    }
  }

  // Edit assignment methods
  editAssignment(assignment: ShiftAssignment): void {
    this.editingAssignment.set(assignment);
    this.showEditModal.set(true);
  }

  closeEditModal(): void {
    this.showEditModal.set(false);
    this.editingAssignment.set(null);
  }

  updateAssignment(): void {
    const assignment = this.editingAssignment();
    if (assignment) {
      const updateRequest: UpdateShiftAssignmentRequest = {
        shiftId: assignment.shiftId,
        assignmentType: assignment.assignmentType,
        employeeId: assignment.employeeId,
        departmentId: assignment.departmentId,
        branchId: assignment.branchId,
        effectiveDate: assignment.effectiveDate,
        endDate: assignment.endDate,
        status: assignment.status,
        priority: assignment.priority,
        notes: assignment.notes
      };

      this.shiftAssignmentService.updateShiftAssignment(assignment.id, updateRequest).subscribe({
        next: () => {
          console.log('Assignment updated successfully');
          this.closeEditModal();
          this.loadAssignments();
        },
        error: (error) => {
          console.error('Error updating assignment:', error);
        }
      });
    }
  }

  // Delete assignment method
  deleteAssignment(assignment: ShiftAssignment): void {
    if (confirm(this.i18n.t('shifts.assignments.confirmDelete'))) {
      this.shiftAssignmentService.deleteShiftAssignment(assignment.id).subscribe({
        next: () => {
          console.log('Assignment deleted successfully');
          this.loadAssignments();
        },
        error: (error) => {
          console.error('Error deleting assignment:', error);
        }
      });
    }
  }

  // Utility methods
  getStatusBadgeClass(status: ShiftAssignmentStatus): string {
    return this.shiftAssignmentService.getStatusBadgeClass(status);
  }

  formatDate(dateString: string): string {
    return this.shiftAssignmentService.formatDate(dateString);
  }

  isCurrentlyActive(assignment: ShiftAssignment): boolean {
    return this.shiftAssignmentService.isCurrentlyActive(assignment);
  }

  getAssignmentTypeDisplay(type: ShiftAssignmentType): string {
    return this.shiftAssignmentService.getAssignmentTypeDisplay(type);
  }

  getStatusDisplay(status: ShiftAssignmentStatus): string {
    return this.shiftAssignmentService.getStatusDisplay(status);
  }

  // Form update methods
  updateCreateForm<K extends keyof CreateShiftAssignmentRequest>(field: K, value: CreateShiftAssignmentRequest[K]): void {
    this.createForm.update(form => ({ ...form, [field]: value }));
  }

  onAssignmentTypeChanged(type: ShiftAssignmentType): void {
    this.updateCreateForm('assignmentType', type);
    // Clear other target fields
    this.updateCreateForm('employeeId', undefined);
    this.updateCreateForm('departmentId', undefined);
    this.updateCreateForm('branchId', undefined);
  }

  // Searchable select options
  get shiftSelectOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: '0', label: this.i18n.t('common.select') }
    ];

    this.availableShifts().forEach(shift => {
      let subLabel = '';
      if (shift.shiftPeriods && shift.shiftPeriods.length > 0) {
        const firstPeriod = shift.shiftPeriods[0];
        subLabel = `${firstPeriod.startTime} - ${firstPeriod.endTime}`;
      }
      options.push({
        value: shift.id.toString(),
        label: shift.name,
        subLabel: subLabel
      });
    });

    return options;
  }

  get assignmentTypeSelectOptions(): SearchableSelectOption[] {
    return this.assignmentOptions().assignmentTypes.map(type => ({
      value: type.value.toString(),
      label: type.label
    }));
  }

  get assignmentTypeFilterOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') }
    ];
    return options.concat(this.assignmentTypeSelectOptions);
  }

  get statusFilterOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') }
    ];
    return options.concat(this.statusSelectOptions);
  }

  get branchSelectOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.select') }
    ];

    this.availableBranches().forEach(branch => {
      options.push({
        value: branch.id.toString(),
        label: branch.name,
        subLabel: branch.code
      });
    });

    return options;
  }

  get employeeSelectOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.select') }
    ];

    this.availableEmployees().forEach(employee => {
      options.push({
        value: employee.id.toString(),
        label: employee.name,
        subLabel: employee.employeeNumber
      });
    });

    return options;
  }

  get departmentSelectOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.select') }
    ];

    this.availableDepartments().forEach(department => {
      options.push({
        value: department.id.toString(),
        label: department.name,
        subLabel: department.code
      });
    });

    return options;
  }

  get statusSelectOptions(): SearchableSelectOption[] {
    return this.assignmentOptions().statuses.map(status => ({
      value: status.value.toString(),
      label: status.label
    }));
  }

  get shiftFilterOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.all') }
    ];
    return options.concat(this.shiftSelectOptions.filter(option => option.value !== '0'));
  }

  // Selection change handlers
  onShiftSelectionChange(shiftIdStr: string) {
    const shiftId = shiftIdStr ? parseInt(shiftIdStr) : 0;
    this.updateCreateForm('shiftId', shiftId);
  }

  onAssignmentTypeSelectionChange(typeStr: string) {
    const type = typeStr ? parseInt(typeStr) : ShiftAssignmentType.Employee;
    this.onAssignmentTypeChanged(type);
  }

  onBranchSelectionChange(branchIdStr: string) {
    const branchId = branchIdStr ? parseInt(branchIdStr) : undefined;
    this.updateCreateForm('branchId', branchId);

    // Reload employees and departments when branch changes
    this.loadEmployees(branchId);
    this.loadDepartments(branchId);

    // Clear selected employee and department when branch changes
    this.updateCreateForm('employeeId', undefined);
    this.updateCreateForm('departmentId', undefined);
  }

  onEmployeeSelectionChange(employeeIdStr: string) {
    const employeeId = employeeIdStr ? parseInt(employeeIdStr) : undefined;
    this.updateCreateForm('employeeId', employeeId);
  }

  onDepartmentSelectionChange(departmentIdStr: string) {
    const departmentId = departmentIdStr ? parseInt(departmentIdStr) : undefined;
    this.updateCreateForm('departmentId', departmentId);
  }

  onStatusSelectionChange(statusStr: string) {
    const status = statusStr ? parseInt(statusStr) : ShiftAssignmentStatus.Active;
    this.updateCreateForm('status', status);
  }
}