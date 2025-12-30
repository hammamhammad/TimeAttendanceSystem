import {
  ShiftAssignmentService
} from "./chunk-LOECD3X7.js";
import {
  ShiftAssignmentStatus,
  ShiftAssignmentType
} from "./chunk-ICLZUHFB.js";
import {
  SearchableSelectComponent
} from "./chunk-YPZLTOXZ.js";
import {
  ShiftsService
} from "./chunk-3L6JDBEN.js";
import {
  BranchesService
} from "./chunk-VA62FO4C.js";
import {
  DepartmentsService
} from "./chunk-MPELPKFG.js";
import {
  EmployeesService
} from "./chunk-IR2IKZBB.js";
import {
  ModalWrapperComponent
} from "./chunk-3OFDLXN2.js";
import {
  DataTableComponent
} from "./chunk-7JZQN7NK.js";
import {
  UnifiedFilterComponent
} from "./chunk-THHKOIOG.js";
import {
  HasPermissionDirective
} from "./chunk-Q7GSD2OQ.js";
import "./chunk-5ZV3Z4IV.js";
import {
  StatusBadgeComponent
} from "./chunk-MAN5UEZP.js";
import "./chunk-DS3UNCKJ.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-7XYWDBYG.js";
import {
  PermissionService
} from "./chunk-HT4DZZW3.js";
import {
  PermissionActions,
  PermissionResources
} from "./chunk-6LEZROWG.js";
import "./chunk-GSKH2KOG.js";
import {
  PageHeaderComponent
} from "./chunk-DKGFJHVQ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-CVUMC7BN.js";
import "./chunk-HZ2IZU2F.js";
import {
  Router
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/shifts/assign-shifts/assign-shifts.component.ts
var _c0 = /* @__PURE__ */ __name(() => [], "_c0");
var _c1 = /* @__PURE__ */ __name(() => ({ standalone: true }), "_c1");
function AssignShiftsComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "label", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 9);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "app-searchable-select", 10);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Conditional_20_Template_app_searchable_select_selectionChange_5_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEmployeeSelectionChange($event));
    }, "AssignShiftsComponent_Conditional_20_Template_app_searchable_select_selectionChange_5_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("employees.employee"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r1.employeeSelectOptions)("ngModel", ((tmp_3_0 = ctx_r1.createForm().employeeId) == null ? null : tmp_3_0.toString()) || "")("ngModelOptions", \u0275\u0275pureFunction0(7, _c1))("placeholder", ctx_r1.i18n.t("common.select"))("searchable", true)("clearable", false);
  }
}
__name(AssignShiftsComponent_Conditional_20_Template, "AssignShiftsComponent_Conditional_20_Template");
function AssignShiftsComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "label", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 9);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "app-searchable-select", 10);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Conditional_21_Template_app_searchable_select_selectionChange_5_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDepartmentSelectionChange($event));
    }, "AssignShiftsComponent_Conditional_21_Template_app_searchable_select_selectionChange_5_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("departments.department"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r1.departmentSelectOptions)("ngModel", ((tmp_3_0 = ctx_r1.createForm().departmentId) == null ? null : tmp_3_0.toString()) || "")("ngModelOptions", \u0275\u0275pureFunction0(7, _c1))("placeholder", ctx_r1.i18n.t("common.select"))("searchable", true)("clearable", false);
  }
}
__name(AssignShiftsComponent_Conditional_21_Template, "AssignShiftsComponent_Conditional_21_Template");
function AssignShiftsComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "label", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 9);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "app-searchable-select", 10);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Conditional_22_Template_app_searchable_select_selectionChange_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBranchSelectionChange($event));
    }, "AssignShiftsComponent_Conditional_22_Template_app_searchable_select_selectionChange_5_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("branches.branch"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r1.branchSelectOptions)("ngModel", ((tmp_3_0 = ctx_r1.createForm().branchId) == null ? null : tmp_3_0.toString()) || "")("ngModelOptions", \u0275\u0275pureFunction0(7, _c1))("placeholder", ctx_r1.i18n.t("common.select"))("searchable", true)("clearable", false);
  }
}
__name(AssignShiftsComponent_Conditional_22_Template, "AssignShiftsComponent_Conditional_22_Template");
var _AssignShiftsComponent = class _AssignShiftsComponent {
  shiftAssignmentService = inject(ShiftAssignmentService);
  shiftsService = inject(ShiftsService);
  branchesService = inject(BranchesService);
  employeesService = inject(EmployeesService);
  departmentsService = inject(DepartmentsService);
  router = inject(Router);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Permission constants for use in template
  PERMISSIONS = {
    SHIFT_ASSIGNMENT_CREATE: `${PermissionResources.SHIFT}.${PermissionActions.CREATE}`,
    SHIFT_ASSIGNMENT_READ: `${PermissionResources.SHIFT}.${PermissionActions.READ}`,
    SHIFT_ASSIGNMENT_UPDATE: `${PermissionResources.SHIFT}.${PermissionActions.UPDATE}`,
    SHIFT_ASSIGNMENT_DELETE: `${PermissionResources.SHIFT}.${PermissionActions.DELETE}`,
    SHIFT_ASSIGNMENT_MANAGE: `${PermissionResources.SHIFT}.${PermissionActions.MANAGE}`
  };
  // Enum references for template
  ShiftAssignmentType = ShiftAssignmentType;
  ShiftAssignmentStatus = ShiftAssignmentStatus;
  Math = Math;
  // Signals for state management
  assignments = signal([], ...ngDevMode ? [{ debugName: "assignments" }] : []);
  totalCount = signal(0, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  totalPages = signal(0, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  // Filter signals
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  selectedAssignmentType = signal(null, ...ngDevMode ? [{ debugName: "selectedAssignmentType" }] : []);
  selectedStatus = signal(null, ...ngDevMode ? [{ debugName: "selectedStatus" }] : []);
  selectedShiftId = signal(null, ...ngDevMode ? [{ debugName: "selectedShiftId" }] : []);
  selectedEmployeeId = signal(null, ...ngDevMode ? [{ debugName: "selectedEmployeeId" }] : []);
  selectedDepartmentId = signal(null, ...ngDevMode ? [{ debugName: "selectedDepartmentId" }] : []);
  selectedBranchId = signal(null, ...ngDevMode ? [{ debugName: "selectedBranchId" }] : []);
  currentlyActiveOnly = signal(false, ...ngDevMode ? [{ debugName: "currentlyActiveOnly" }] : []);
  // Create/Edit assignment signals
  showCreateModal = signal(false, ...ngDevMode ? [{ debugName: "showCreateModal" }] : []);
  showEditModal = signal(false, ...ngDevMode ? [{ debugName: "showEditModal" }] : []);
  editingAssignment = signal(null, ...ngDevMode ? [{ debugName: "editingAssignment" }] : []);
  // Form data signals
  createForm = signal({
    shiftId: 0,
    assignmentType: ShiftAssignmentType.Employee,
    effectiveDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    status: ShiftAssignmentStatus.Active,
    priority: 10
  }, ...ngDevMode ? [{ debugName: "createForm" }] : []);
  // Options and lookup data
  assignmentOptions = signal({
    assignmentTypes: [],
    statuses: []
  }, ...ngDevMode ? [{ debugName: "assignmentOptions" }] : []);
  availableShifts = signal([], ...ngDevMode ? [{ debugName: "availableShifts" }] : []);
  availableBranches = signal([], ...ngDevMode ? [{ debugName: "availableBranches" }] : []);
  availableEmployees = signal([], ...ngDevMode ? [{ debugName: "availableEmployees" }] : []);
  availableDepartments = signal([], ...ngDevMode ? [{ debugName: "availableDepartments" }] : []);
  selectedBranchForFilter = signal(null, ...ngDevMode ? [{ debugName: "selectedBranchForFilter" }] : []);
  // Table configuration
  tableColumns = computed(() => [
    {
      key: "shift",
      label: this.i18n.t("shifts.shift"),
      sortable: false,
      width: "200px",
      priority: "high",
      renderHtml: true
    },
    {
      key: "assignmentType",
      label: this.i18n.t("shifts.assignments.assignmentType"),
      sortable: false,
      width: "150px",
      align: "center",
      priority: "medium",
      renderHtml: true
    },
    {
      key: "target",
      label: this.i18n.t("shifts.assignments.target"),
      sortable: false,
      width: "250px",
      priority: "high",
      renderHtml: true
    },
    {
      key: "effectiveDate",
      label: this.i18n.t("shifts.assignments.effectiveDate"),
      sortable: false,
      width: "120px",
      priority: "medium"
    },
    {
      key: "endDate",
      label: this.i18n.t("shifts.assignments.endDate"),
      sortable: false,
      width: "120px",
      priority: "low",
      renderHtml: true
    },
    {
      key: "status",
      label: this.i18n.t("common.status"),
      sortable: false,
      width: "120px",
      align: "center",
      priority: "medium",
      renderHtml: true
    },
    {
      key: "priority",
      label: this.i18n.t("shifts.assignments.priority"),
      sortable: false,
      width: "100px",
      align: "center",
      priority: "low",
      renderHtml: true
    }
  ], ...ngDevMode ? [{ debugName: "tableColumns" }] : []);
  tableActions = computed(() => [
    {
      key: "edit",
      label: this.i18n.t("common.edit"),
      icon: "fa-edit",
      color: "primary",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.SHIFT_ASSIGNMENT_MANAGE), "condition")
    },
    {
      key: "delete",
      label: this.i18n.t("common.delete"),
      icon: "fa-trash",
      color: "danger",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.SHIFT_ASSIGNMENT_MANAGE), "condition")
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  // Transform assignments data for data table
  tableData = computed(() => {
    return this.assignments().map((assignment) => __spreadProps(__spreadValues({}, assignment), {
      shift: this.formatShift(assignment),
      assignmentType: this.formatAssignmentType(assignment),
      target: this.formatTarget(assignment),
      effectiveDate: this.formatDate(assignment.effectiveDate),
      endDate: this.formatEndDate(assignment),
      status: this.formatStatus(assignment),
      priority: this.formatPriority(assignment)
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  ngOnInit() {
    this.loadAssignments();
    this.loadOptions();
    this.loadShifts();
    this.loadBranches();
    this.loadEmployees();
    this.loadDepartments();
  }
  loadAssignments() {
    this.loading.set(true);
    this.error.set(null);
    const params = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      search: this.searchTerm() || void 0,
      assignmentType: this.selectedAssignmentType() || void 0,
      status: this.selectedStatus() || void 0,
      shiftId: this.selectedShiftId() || void 0,
      employeeId: this.selectedEmployeeId() || void 0,
      departmentId: this.selectedDepartmentId() || void 0,
      branchId: this.selectedBranchId() || void 0,
      currentlyActive: this.currentlyActiveOnly() || void 0
    };
    this.shiftAssignmentService.getShiftAssignments(params).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.assignments.set(response.items);
        this.totalCount.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading shift assignments:", error);
        this.error.set(this.i18n.t("shifts.assignments.loadError"));
        this.loading.set(false);
      }, "error")
    });
  }
  loadOptions() {
    this.shiftAssignmentService.getAssignmentOptions().subscribe({
      next: /* @__PURE__ */ __name((options) => {
        this.assignmentOptions.set(options);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading assignment options:", error);
      }, "error")
    });
  }
  loadShifts() {
    this.shiftsService.getShifts(1, 1e3).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.availableShifts.set(response.items);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading shifts:", error);
      }, "error")
    });
  }
  loadBranches() {
    this.branchesService.getBranches(1, 1e3).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.availableBranches.set(response.items);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading branches:", error);
      }, "error")
    });
  }
  loadEmployees(branchId) {
    this.employeesService.getEmployeesForSelection(branchId).subscribe({
      next: /* @__PURE__ */ __name((employees) => {
        this.availableEmployees.set(employees);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading employees:", error);
      }, "error")
    });
  }
  loadDepartments(branchId) {
    const filter = branchId ? { branchId, isActive: true } : { isActive: true };
    this.departmentsService.getDepartments(filter).subscribe({
      next: /* @__PURE__ */ __name((departments) => {
        this.availableDepartments.set(departments);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading departments:", error);
      }, "error")
    });
  }
  // Pagination methods
  onPageChanged(page) {
    this.currentPage.set(page);
    this.loadAssignments();
  }
  onPageSizeChanged(size) {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadAssignments();
  }
  // Unified filter handlers
  onSearchTermChange(searchTerm) {
    this.searchTerm.set(searchTerm);
    this.currentPage.set(1);
    this.loadAssignments();
  }
  // Filter methods
  onSearchChanged() {
    this.currentPage.set(1);
    this.loadAssignments();
  }
  onFilterChanged() {
    this.currentPage.set(1);
    this.loadAssignments();
  }
  onFiltersChange(filters) {
    if (filters.branchId !== void 0) {
      const branchId = filters.branchId ? parseInt(filters.branchId) : null;
      this.selectedBranchId.set(branchId);
      this.onBranchFilterChanged(branchId);
    }
    if (filters.departmentId !== void 0) {
      const departmentId = filters.departmentId ? parseInt(filters.departmentId) : null;
      this.selectedDepartmentId.set(departmentId);
    }
    if (filters.shiftId !== void 0) {
      const shiftId = filters.shiftId ? parseInt(filters.shiftId) : null;
      this.selectedShiftId.set(shiftId);
    }
    if (filters.assignmentType !== void 0) {
      const assignmentType = filters.assignmentType ? parseInt(filters.assignmentType) : null;
      this.selectedAssignmentType.set(assignmentType);
    }
    if (filters.status !== void 0) {
      const status = filters.status ? parseInt(filters.status) : null;
      this.selectedStatus.set(status);
    }
    this.currentPage.set(1);
    this.loadAssignments();
  }
  onBranchFilterChanged(branchId) {
    this.selectedBranchId.set(branchId);
    this.onFilterChanged();
    this.loadEmployees(branchId || void 0);
    this.loadDepartments(branchId || void 0);
  }
  onRefreshData() {
    this.clearFilters();
    this.loadAssignments();
  }
  clearFilters() {
    this.searchTerm.set("");
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
  openCreateModal() {
    const today = /* @__PURE__ */ new Date();
    this.createForm.set({
      shiftId: 0,
      assignmentType: ShiftAssignmentType.Employee,
      effectiveDate: today.toISOString().split("T")[0],
      status: ShiftAssignmentStatus.Active,
      priority: 10
    });
    this.showCreateModal.set(true);
  }
  closeCreateModal() {
    this.showCreateModal.set(false);
  }
  createAssignment() {
    if (this.isCreateFormValid()) {
      this.shiftAssignmentService.createShiftAssignment(this.createForm()).subscribe({
        next: /* @__PURE__ */ __name((result) => {
          console.log("Assignment created successfully:", result);
          this.closeCreateModal();
          this.loadAssignments();
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Error creating assignment:", error);
        }, "error")
      });
    }
  }
  isCreateFormValid() {
    const form = this.createForm();
    return form.shiftId > 0 && form.effectiveDate !== "" && this.isEffectiveDateValid(form.effectiveDate) && this.isTargetValid(form.assignmentType, form.employeeId, form.departmentId, form.branchId);
  }
  isEffectiveDateValid(effectiveDate) {
    if (!effectiveDate)
      return false;
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(effectiveDate);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }
  isTargetValid(type, empId, deptId, branchId) {
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
  editAssignment(assignment) {
    this.editingAssignment.set(assignment);
    this.showEditModal.set(true);
  }
  closeEditModal() {
    this.showEditModal.set(false);
    this.editingAssignment.set(null);
  }
  updateAssignment() {
    const assignment = this.editingAssignment();
    if (assignment) {
      const updateRequest = {
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
        next: /* @__PURE__ */ __name(() => {
          console.log("Assignment updated successfully");
          this.closeEditModal();
          this.loadAssignments();
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Error updating assignment:", error);
        }, "error")
      });
    }
  }
  // Delete assignment method
  deleteAssignment(assignment) {
    if (confirm(this.i18n.t("shifts.assignments.confirmDelete"))) {
      this.shiftAssignmentService.deleteShiftAssignment(assignment.id).subscribe({
        next: /* @__PURE__ */ __name(() => {
          console.log("Assignment deleted successfully");
          this.loadAssignments();
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Error deleting assignment:", error);
        }, "error")
      });
    }
  }
  // Utility methods
  getStatusBadgeClass(status) {
    return this.shiftAssignmentService.getStatusBadgeClass(status);
  }
  formatDate(dateString) {
    return this.shiftAssignmentService.formatDate(dateString);
  }
  isCurrentlyActive(assignment) {
    return this.shiftAssignmentService.isCurrentlyActive(assignment);
  }
  getAssignmentTypeDisplay(type) {
    return this.shiftAssignmentService.getAssignmentTypeDisplay(type);
  }
  getStatusDisplay(status) {
    return this.shiftAssignmentService.getStatusDisplay(status);
  }
  // Form update methods
  updateCreateForm(field, value) {
    this.createForm.update((form) => __spreadProps(__spreadValues({}, form), { [field]: value }));
  }
  onAssignmentTypeChanged(type) {
    this.updateCreateForm("assignmentType", type);
    this.updateCreateForm("employeeId", void 0);
    this.updateCreateForm("departmentId", void 0);
    this.updateCreateForm("branchId", void 0);
  }
  // Searchable select options
  get shiftSelectOptions() {
    const options = [
      { value: "0", label: this.i18n.t("common.select") }
    ];
    this.availableShifts().forEach((shift) => {
      let subLabel = "";
      if (shift.shiftPeriods && shift.shiftPeriods.length > 0) {
        const firstPeriod = shift.shiftPeriods[0];
        subLabel = `${firstPeriod.startTime} - ${firstPeriod.endTime}`;
      }
      options.push({
        value: shift.id.toString(),
        label: shift.name,
        subLabel
      });
    });
    return options;
  }
  get assignmentTypeSelectOptions() {
    return this.assignmentOptions().assignmentTypes.map((type) => ({
      value: type.value.toString(),
      label: type.label
    }));
  }
  get assignmentTypeFilterOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.all") }
    ];
    return options.concat(this.assignmentTypeSelectOptions);
  }
  get statusFilterOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.all") }
    ];
    return options.concat(this.statusSelectOptions);
  }
  get branchSelectOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.select") }
    ];
    this.availableBranches().forEach((branch) => {
      options.push({
        value: branch.id.toString(),
        label: branch.name,
        subLabel: branch.code
      });
    });
    return options;
  }
  get employeeSelectOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.select") }
    ];
    this.availableEmployees().forEach((employee) => {
      options.push({
        value: employee.id.toString(),
        label: employee.name,
        subLabel: employee.employeeNumber
      });
    });
    return options;
  }
  get departmentSelectOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.select") }
    ];
    this.availableDepartments().forEach((department) => {
      options.push({
        value: department.id.toString(),
        label: department.name,
        subLabel: department.code
      });
    });
    return options;
  }
  get statusSelectOptions() {
    return this.assignmentOptions().statuses.map((status) => ({
      value: status.value.toString(),
      label: status.label
    }));
  }
  get shiftFilterOptions() {
    const options = [
      { value: "", label: this.i18n.t("common.all") }
    ];
    return options.concat(this.shiftSelectOptions.filter((option) => option.value !== "0"));
  }
  // Selection change handlers
  onShiftSelectionChange(shiftIdStr) {
    const shiftId = shiftIdStr ? parseInt(shiftIdStr) : 0;
    this.updateCreateForm("shiftId", shiftId);
  }
  onAssignmentTypeSelectionChange(typeStr) {
    const type = typeStr ? parseInt(typeStr) : ShiftAssignmentType.Employee;
    this.onAssignmentTypeChanged(type);
  }
  onBranchSelectionChange(branchIdStr) {
    const branchId = branchIdStr ? parseInt(branchIdStr) : void 0;
    this.updateCreateForm("branchId", branchId);
    this.loadEmployees(branchId);
    this.loadDepartments(branchId);
    this.updateCreateForm("employeeId", void 0);
    this.updateCreateForm("departmentId", void 0);
  }
  onEmployeeSelectionChange(employeeIdStr) {
    const employeeId = employeeIdStr ? parseInt(employeeIdStr) : void 0;
    this.updateCreateForm("employeeId", employeeId);
  }
  onDepartmentSelectionChange(departmentIdStr) {
    const departmentId = departmentIdStr ? parseInt(departmentIdStr) : void 0;
    this.updateCreateForm("departmentId", departmentId);
  }
  onStatusSelectionChange(statusStr) {
    const status = statusStr ? parseInt(statusStr) : ShiftAssignmentStatus.Active;
    this.updateCreateForm("status", status);
  }
  // Table data formatting methods
  formatShift(assignment) {
    return `
      <div>
        <strong>${assignment.shiftName}</strong>
        <small class="text-muted d-block">${assignment.shiftType || ""}</small>
      </div>
    `;
  }
  formatAssignmentType(assignment) {
    return `<span class="badge bg-info-subtle text-info">${assignment.assignmentTypeDisplay}</span>`;
  }
  formatTarget(assignment) {
    let html = `<div><strong>${assignment.targetDisplayName}</strong>`;
    if (assignment.employeeNumber) {
      html += `<small class="text-muted d-block">${this.i18n.t("employees.employeeNumber")}: ${assignment.employeeNumber}</small>`;
    }
    if (assignment.branchCode) {
      html += `<small class="text-muted d-block">${this.i18n.t("branches.code")}: ${assignment.branchCode}</small>`;
    }
    html += "</div>";
    return html;
  }
  formatEndDate(assignment) {
    if (assignment.endDate) {
      return this.formatDate(assignment.endDate);
    }
    return `<span class="text-muted">${this.i18n.t("common.indefinite")}</span>`;
  }
  formatStatus(assignment) {
    const statusVariant = assignment.status === 1 ? "success" : assignment.status === 2 ? "warning" : "secondary";
    return `<span class="badge bg-${statusVariant}-subtle text-${statusVariant}">${assignment.statusDisplay}</span>`;
  }
  formatPriority(assignment) {
    return `<span class="badge bg-info-subtle text-info">${assignment.priority}</span>`;
  }
  // Table action handler
  onTableActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "edit":
        this.editAssignment(item);
        break;
      case "delete":
        this.deleteAssignment(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  // Pagination handlers for data table
  onTablePageChange(page) {
    this.onPageChanged(page);
  }
  onTablePageSizeChange(size) {
    this.onPageSizeChanged(size);
  }
};
__name(_AssignShiftsComponent, "AssignShiftsComponent");
__publicField(_AssignShiftsComponent, "\u0275fac", /* @__PURE__ */ __name(function AssignShiftsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AssignShiftsComponent)();
}, "AssignShiftsComponent_Factory"));
__publicField(_AssignShiftsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssignShiftsComponent, selectors: [["app-assign-shifts"]], decls: 50, vars: 63, consts: [[1, "container-fluid"], [3, "title"], ["moduleName", "shift-assignments", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [3, "actionClick", "pageChange", "pageSizeChange", "data", "columns", "actions", "currentPage", "totalPages", "totalItems", "pageSize", "loading", "emptyTitle", "emptyMessage", "responsiveMode"], [3, "close", "show", "title", "size", "centered"], [1, "modal-body"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label"], [1, "text-danger"], [3, "selectionChange", "options", "ngModel", "ngModelOptions", "placeholder", "searchable", "clearable"], [3, "selectionChange", "options", "ngModel", "ngModelOptions", "searchable", "clearable"], ["type", "date", "name", "effectiveDate", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "date", "name", "endDate", 1, "form-control", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "name", "priority", "min", "0", "max", "100", 1, "form-control", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "col-12"], ["name", "notes", "rows", "3", 1, "form-control", 3, "ngModelChange", "ngModel", "ngModelOptions", "placeholder"], ["modal-footer", "", 1, "d-flex", "gap-2", "justify-content-end"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"]], template: /* @__PURE__ */ __name(function AssignShiftsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      return ctx.onSearchTermChange($event);
    }, "AssignShiftsComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      return ctx.onFiltersChange($event);
    }, "AssignShiftsComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_unified_filter_add_2_listener() {
      return ctx.openCreateModal();
    }, "AssignShiftsComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefreshData();
    }, "AssignShiftsComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-data-table", 3);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_data_table_actionClick_3_listener($event) {
      return ctx.onTableActionClick($event);
    }, "AssignShiftsComponent_Template_app_data_table_actionClick_3_listener"))("pageChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_data_table_pageChange_3_listener($event) {
      return ctx.onTablePageChange($event);
    }, "AssignShiftsComponent_Template_app_data_table_pageChange_3_listener"))("pageSizeChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_data_table_pageSizeChange_3_listener($event) {
      return ctx.onTablePageSizeChange($event);
    }, "AssignShiftsComponent_Template_app_data_table_pageSizeChange_3_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "app-modal-wrapper", 4);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_modal_wrapper_close_4_listener() {
      return ctx.closeCreateModal();
    }, "AssignShiftsComponent_Template_app_modal_wrapper_close_4_listener"));
    \u0275\u0275elementStart(5, "div", 5)(6, "form")(7, "div", 6)(8, "div", 7)(9, "label", 8);
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "span", 9);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "app-searchable-select", 10);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_searchable_select_selectionChange_13_listener($event) {
      return ctx.onShiftSelectionChange($event);
    }, "AssignShiftsComponent_Template_app_searchable_select_selectionChange_13_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 7)(15, "label", 8);
    \u0275\u0275text(16);
    \u0275\u0275elementStart(17, "span", 9);
    \u0275\u0275text(18, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "app-searchable-select", 11);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_searchable_select_selectionChange_19_listener($event) {
      return ctx.onAssignmentTypeSelectionChange($event);
    }, "AssignShiftsComponent_Template_app_searchable_select_selectionChange_19_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(20, AssignShiftsComponent_Conditional_20_Template, 6, 8, "div", 7);
    \u0275\u0275conditionalCreate(21, AssignShiftsComponent_Conditional_21_Template, 6, 8, "div", 7);
    \u0275\u0275conditionalCreate(22, AssignShiftsComponent_Conditional_22_Template, 6, 8, "div", 7);
    \u0275\u0275elementStart(23, "div", 7)(24, "label", 8);
    \u0275\u0275text(25);
    \u0275\u0275elementStart(26, "span", 9);
    \u0275\u0275text(27, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "input", 12);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_input_ngModelChange_28_listener($event) {
      return ctx.updateCreateForm("effectiveDate", $event);
    }, "AssignShiftsComponent_Template_input_ngModelChange_28_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 7)(30, "label", 8);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 13);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_input_ngModelChange_32_listener($event) {
      return ctx.updateCreateForm("endDate", $event);
    }, "AssignShiftsComponent_Template_input_ngModelChange_32_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 7)(34, "label", 8);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "app-searchable-select", 11);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_app_searchable_select_selectionChange_36_listener($event) {
      return ctx.onStatusSelectionChange($event);
    }, "AssignShiftsComponent_Template_app_searchable_select_selectionChange_36_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 7)(38, "label", 8);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "input", 14);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_input_ngModelChange_40_listener($event) {
      return ctx.updateCreateForm("priority", +$event);
    }, "AssignShiftsComponent_Template_input_ngModelChange_40_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 15)(42, "label", 8);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "textarea", 16);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_textarea_ngModelChange_44_listener($event) {
      return ctx.updateCreateForm("notes", $event);
    }, "AssignShiftsComponent_Template_textarea_ngModelChange_44_listener"));
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(45, "div", 17)(46, "button", 18);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_button_click_46_listener() {
      return ctx.closeCreateModal();
    }, "AssignShiftsComponent_Template_button_click_46_listener"));
    \u0275\u0275text(47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "button", 19);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function AssignShiftsComponent_Template_button_click_48_listener() {
      return ctx.createAssignment();
    }, "AssignShiftsComponent_Template_button_click_48_listener"));
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_41_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("shifts.assignments.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx.tableData() || \u0275\u0275pureFunction0(55, _c0))("columns", ctx.tableColumns())("actions", ctx.tableActions())("currentPage", ctx.currentPage)("totalPages", ctx.totalPages)("totalItems", ctx.totalCount)("pageSize", ctx.pageSize)("loading", ctx.loading)("emptyTitle", ctx.i18n.t("shifts.assignments.noAssignments"))("emptyMessage", ctx.i18n.t("shifts.assignments.noAssignmentsDescription"))("responsiveMode", "auto");
    \u0275\u0275advance();
    \u0275\u0275property("show", ctx.showCreateModal())("title", ctx.i18n.t("shifts.assignments.createTitle"))("size", "lg")("centered", true);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("shifts.shift"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx.shiftSelectOptions)("ngModel", ctx.createForm().shiftId.toString())("ngModelOptions", \u0275\u0275pureFunction0(56, _c1))("placeholder", ctx.i18n.t("common.select"))("searchable", true)("clearable", false);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("shifts.assignments.assignmentType"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx.assignmentTypeSelectOptions)("ngModel", ctx.createForm().assignmentType.toString())("ngModelOptions", \u0275\u0275pureFunction0(57, _c1))("searchable", false)("clearable", false);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.createForm().assignmentType === ctx.ShiftAssignmentType.Employee ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.createForm().assignmentType === ctx.ShiftAssignmentType.Department ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.createForm().assignmentType === ctx.ShiftAssignmentType.Branch ? 22 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("shifts.assignments.effectiveDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx.createForm().effectiveDate)("ngModelOptions", \u0275\u0275pureFunction0(58, _c1));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("shifts.assignments.endDate"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.createForm().endDate)("ngModelOptions", \u0275\u0275pureFunction0(59, _c1));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("common.status"));
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx.statusSelectOptions)("ngModel", ((tmp_41_0 = ctx.createForm().status) == null ? null : tmp_41_0.toString()) || "")("ngModelOptions", \u0275\u0275pureFunction0(60, _c1))("searchable", false)("clearable", false);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("shifts.assignments.priority"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.createForm().priority)("ngModelOptions", \u0275\u0275pureFunction0(61, _c1));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("common.notes"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.createForm().notes)("ngModelOptions", \u0275\u0275pureFunction0(62, _c1))("placeholder", ctx.i18n.t("shifts.assignments.notesPlaceholder"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx.isCreateFormValid());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.create"), " ");
  }
}, "AssignShiftsComponent_Template"), dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, NgModel, NgForm, SearchableSelectComponent, PageHeaderComponent, UnifiedFilterComponent, ModalWrapperComponent, DataTableComponent], styles: ['\n\n.container-fluid[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.badge-success[_ngcontent-%COMP%] {\n  background-color: #198754 !important;\n}\n.badge-warning[_ngcontent-%COMP%] {\n  background-color: #ffc107 !important;\n  color: #000 !important;\n}\n.badge-danger[_ngcontent-%COMP%] {\n  background-color: #dc3545 !important;\n}\n.badge-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d !important;\n}\n.badge-dark[_ngcontent-%COMP%] {\n  background-color: #212529 !important;\n}\n.badge-light[_ngcontent-%COMP%] {\n  background-color: #f8f9fa !important;\n  color: #000 !important;\n}\n.badge-info[_ngcontent-%COMP%] {\n  background-color: #0dcaf0 !important;\n  color: #000 !important;\n}\n.table-responsive[_ngcontent-%COMP%] {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.375rem;\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  font-weight: 600;\n  border-bottom: 2px solid #dee2e6;\n  white-space: nowrap;\n}\n.table-success[_ngcontent-%COMP%] {\n  background-color: rgba(25, 135, 84, 0.1) !important;\n}\n.table-hover[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n.btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-outline-danger[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.card[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.5rem;\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  padding: 1rem 1.25rem;\n}\n.card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  color: #495057;\n  font-weight: 600;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  border: 1px solid #ced4da;\n  border-radius: 0.375rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #86b7fe;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.modal-content[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.5rem;\n}\n.modal-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  border-radius: 0.5rem 0.5rem 0 0;\n}\n.modal-title[_ngcontent-%COMP%] {\n  color: #495057;\n  font-weight: 600;\n}\n.btn-close[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n  margin: -0.5rem -0.5rem -0.5rem auto;\n}\n.pagination[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  color: #0d6efd;\n  border: 1px solid #dee2e6;\n  padding: 0.375rem 0.75rem;\n}\n.pagination[_ngcontent-%COMP%]   .page-item.active[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n  color: white;\n}\n.pagination[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%]:hover {\n  color: #0a58ca;\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n.pagination[_ngcontent-%COMP%]   .page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  color: #6c757d;\n  background-color: #fff;\n  border-color: #dee2e6;\n  cursor: not-allowed;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n}\n.alert[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  border: none;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: rgba(220, 53, 69, 0.1);\n  color: #721c24;\n}\n@media (max-width: 768px) {\n  .container-fluid[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    padding: 0.2rem 0.4rem;\n    font-size: 0.8rem;\n  }\n  .table-responsive[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .modal-dialog[_ngcontent-%COMP%] {\n    margin: 0.5rem;\n  }\n}\n.text-truncate[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.cursor-pointer[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.min-width-120[_ngcontent-%COMP%] {\n  min-width: 120px;\n}\n.card-body[_ngcontent-%COMP%]   .row.g-3[_ngcontent-%COMP%]    > .col-md-1[_ngcontent-%COMP%], \n.card-body[_ngcontent-%COMP%]   .row.g-3[_ngcontent-%COMP%]    > .col-md-2[_ngcontent-%COMP%], \n.card-body[_ngcontent-%COMP%]   .row.g-3[_ngcontent-%COMP%]    > .col-md-3[_ngcontent-%COMP%] {\n  min-height: 80px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.target-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.target-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #212529;\n}\n.target-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 0.8rem;\n}\n.priority-badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.25rem 0.5rem;\n}\n.status-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.status-indicator[_ngcontent-%COMP%]::before {\n  content: "";\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: currentColor;\n}\n.table-success[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  position: relative;\n}\n.table-success[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 4px;\n  background-color: #198754;\n  border-radius: 0 4px 4px 0;\n}\n.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875rem;\n  color: #dc3545;\n}\n.empty-state[_ngcontent-%COMP%] {\n  padding: 3rem 1rem;\n  text-align: center;\n  color: #6c757d;\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n/*# sourceMappingURL=assign-shifts.component.css.map */'] }));
var AssignShiftsComponent = _AssignShiftsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AssignShiftsComponent, [{
    type: Component,
    args: [{ selector: "app-assign-shifts", standalone: true, imports: [FormsModule, HasPermissionDirective, SearchableSelectComponent, PageHeaderComponent, UnifiedFilterComponent, ModalWrapperComponent, DataTableComponent, StatusBadgeComponent], template: `<div class="container-fluid">
  <!-- Page Header -->
  <app-page-header
    [title]="i18n.t('shifts.assignments.title')">
  </app-page-header>

  <!-- Unified Filter Component -->
  <app-unified-filter
    moduleName="shift-assignments"
    [refreshing]="loading()"
    (searchChange)="onSearchTermChange($event)"
    (filtersChange)="onFiltersChange($event)"
    (add)="openCreateModal()"
    (refresh)="onRefreshData()">
  </app-unified-filter>

  <!-- Assignments Table -->
  <app-data-table
    [data]="tableData() || []"
    [columns]="tableColumns()"
    [actions]="tableActions()"
    [currentPage]="currentPage"
    [totalPages]="totalPages"
    [totalItems]="totalCount"
    [pageSize]="pageSize"
    [loading]="loading"
    [emptyTitle]="i18n.t('shifts.assignments.noAssignments')"
    [emptyMessage]="i18n.t('shifts.assignments.noAssignmentsDescription')"
    [responsiveMode]="'auto'"
    (actionClick)="onTableActionClick($event)"
    (pageChange)="onTablePageChange($event)"
    (pageSizeChange)="onTablePageSizeChange($event)">
  </app-data-table>
</div>

<!-- Create Assignment Modal -->
<app-modal-wrapper
  [show]="showCreateModal()"
  [title]="i18n.t('shifts.assignments.createTitle')"
  [size]="'lg'"
  [centered]="true"
  (close)="closeCreateModal()">

  <div class="modal-body">
    <form>
          <div class="row g-3">
            <!-- Shift Selection -->
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('shifts.shift') }} <span class="text-danger">*</span></label>
              <app-searchable-select
                [options]="shiftSelectOptions"
                [ngModel]="createForm().shiftId.toString()"
                [ngModelOptions]="{standalone: true}"
                (selectionChange)="onShiftSelectionChange($event)"
                [placeholder]="i18n.t('common.select')"
                [searchable]="true"
                [clearable]="false"
              ></app-searchable-select>
            </div>

            <!-- Assignment Type -->
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('shifts.assignments.assignmentType') }} <span class="text-danger">*</span></label>
              <app-searchable-select
                [options]="assignmentTypeSelectOptions"
                [ngModel]="createForm().assignmentType.toString()"
                [ngModelOptions]="{standalone: true}"
                (selectionChange)="onAssignmentTypeSelectionChange($event)"
                [searchable]="false"
                [clearable]="false"
              ></app-searchable-select>
            </div>

            <!-- Employee Selection (if Employee type) -->
            @if (createForm().assignmentType === ShiftAssignmentType.Employee) {
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('employees.employee') }} <span class="text-danger">*</span></label>
              <app-searchable-select
                [options]="employeeSelectOptions"
                [ngModel]="createForm().employeeId?.toString() || ''"
                [ngModelOptions]="{standalone: true}"
                (selectionChange)="onEmployeeSelectionChange($event)"
                [placeholder]="i18n.t('common.select')"
                [searchable]="true"
                [clearable]="false"
              ></app-searchable-select>
            </div>
            }

            <!-- Department Selection (if Department type) -->
            @if (createForm().assignmentType === ShiftAssignmentType.Department) {
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('departments.department') }} <span class="text-danger">*</span></label>
              <app-searchable-select
                [options]="departmentSelectOptions"
                [ngModel]="createForm().departmentId?.toString() || ''"
                [ngModelOptions]="{standalone: true}"
                (selectionChange)="onDepartmentSelectionChange($event)"
                [placeholder]="i18n.t('common.select')"
                [searchable]="true"
                [clearable]="false"
              ></app-searchable-select>
            </div>
            }

            <!-- Branch Selection (if Branch type) -->
            @if (createForm().assignmentType === ShiftAssignmentType.Branch) {
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('branches.branch') }} <span class="text-danger">*</span></label>
              <app-searchable-select
                [options]="branchSelectOptions"
                [ngModel]="createForm().branchId?.toString() || ''"
                [ngModelOptions]="{standalone: true}"
                (selectionChange)="onBranchSelectionChange($event)"
                [placeholder]="i18n.t('common.select')"
                [searchable]="true"
                [clearable]="false"
              ></app-searchable-select>
            </div>
            }

            <!-- Effective Date -->
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('shifts.assignments.effectiveDate') }} <span class="text-danger">*</span></label>
              <input
                type="date"
                class="form-control"
                name="effectiveDate"
                [ngModel]="createForm().effectiveDate"
                [ngModelOptions]="{standalone: true}"
                (ngModelChange)="updateCreateForm('effectiveDate', $event)"
                required>
            </div>

            <!-- End Date -->
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('shifts.assignments.endDate') }}</label>
              <input
                type="date"
                class="form-control"
                name="endDate"
                [ngModel]="createForm().endDate"
                [ngModelOptions]="{standalone: true}"
                (ngModelChange)="updateCreateForm('endDate', $event)">
            </div>

            <!-- Status -->
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('common.status') }}</label>
              <app-searchable-select
                [options]="statusSelectOptions"
                [ngModel]="createForm().status?.toString() || ''"
                [ngModelOptions]="{standalone: true}"
                (selectionChange)="onStatusSelectionChange($event)"
                [searchable]="false"
                [clearable]="false"
              ></app-searchable-select>
            </div>

            <!-- Priority -->
            <div class="col-md-6">
              <label class="form-label">{{ i18n.t('shifts.assignments.priority') }}</label>
              <input
                type="number"
                class="form-control"
                name="priority"
                min="0"
                max="100"
                [ngModel]="createForm().priority"
                [ngModelOptions]="{standalone: true}"
                (ngModelChange)="updateCreateForm('priority', +$event)">
            </div>

            <!-- Notes -->
            <div class="col-12">
              <label class="form-label">{{ i18n.t('common.notes') }}</label>
              <textarea
                class="form-control"
                name="notes"
                rows="3"
                [ngModel]="createForm().notes"
                [ngModelOptions]="{standalone: true}"
                (ngModelChange)="updateCreateForm('notes', $event)"
                [placeholder]="i18n.t('shifts.assignments.notesPlaceholder')"></textarea>
            </div>
          </div>
    </form>
  </div>

  <div modal-footer class="d-flex gap-2 justify-content-end">
    <button type="button" class="btn btn-secondary" (click)="closeCreateModal()">
      {{ i18n.t('common.cancel') }}
    </button>
    <button
      type="button"
      class="btn btn-primary"
      (click)="createAssignment()"
      [disabled]="!isCreateFormValid()">
      {{ i18n.t('common.create') }}
    </button>
  </div>

</app-modal-wrapper>`, styles: ['/* src/app/pages/shifts/assign-shifts/assign-shifts.component.css */\n.container-fluid {\n  padding: 1.5rem;\n}\n.badge-success {\n  background-color: #198754 !important;\n}\n.badge-warning {\n  background-color: #ffc107 !important;\n  color: #000 !important;\n}\n.badge-danger {\n  background-color: #dc3545 !important;\n}\n.badge-secondary {\n  background-color: #6c757d !important;\n}\n.badge-dark {\n  background-color: #212529 !important;\n}\n.badge-light {\n  background-color: #f8f9fa !important;\n  color: #000 !important;\n}\n.badge-info {\n  background-color: #0dcaf0 !important;\n  color: #000 !important;\n}\n.table-responsive {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.375rem;\n}\n.table th {\n  background-color: #f8f9fa;\n  font-weight: 600;\n  border-bottom: 2px solid #dee2e6;\n  white-space: nowrap;\n}\n.table-success {\n  background-color: rgba(25, 135, 84, 0.1) !important;\n}\n.table-hover tbody tr:hover {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n.btn-group-sm .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n}\n.btn-outline-primary:hover {\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-outline-danger:hover {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.card {\n  border: none;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.5rem;\n}\n.card-header {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  padding: 1rem 1.25rem;\n}\n.card-header h5 {\n  color: #495057;\n  font-weight: 600;\n}\n.form-label {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control,\n.form-select {\n  border: 1px solid #ced4da;\n  border-radius: 0.375rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #86b7fe;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-check-input:checked {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.modal-content {\n  border: none;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.5rem;\n}\n.modal-header {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  border-radius: 0.5rem 0.5rem 0 0;\n}\n.modal-title {\n  color: #495057;\n  font-weight: 600;\n}\n.btn-close {\n  padding: 0.5rem;\n  margin: -0.5rem -0.5rem -0.5rem auto;\n}\n.pagination .page-link {\n  color: #0d6efd;\n  border: 1px solid #dee2e6;\n  padding: 0.375rem 0.75rem;\n}\n.pagination .page-item.active .page-link {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n  color: white;\n}\n.pagination .page-link:hover {\n  color: #0a58ca;\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n.pagination .page-item.disabled .page-link {\n  color: #6c757d;\n  background-color: #fff;\n  border-color: #dee2e6;\n  cursor: not-allowed;\n}\n.spinner-border {\n  width: 2rem;\n  height: 2rem;\n}\n.alert {\n  border-radius: 0.5rem;\n  border: none;\n}\n.alert-danger {\n  background-color: rgba(220, 53, 69, 0.1);\n  color: #721c24;\n}\n@media (max-width: 768px) {\n  .container-fluid {\n    padding: 1rem;\n  }\n  .btn-group-sm .btn {\n    padding: 0.2rem 0.4rem;\n    font-size: 0.8rem;\n  }\n  .table-responsive {\n    font-size: 0.9rem;\n  }\n  .modal-dialog {\n    margin: 0.5rem;\n  }\n}\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.min-width-120 {\n  min-width: 120px;\n}\n.card-body .row.g-3 > .col-md-1,\n.card-body .row.g-3 > .col-md-2,\n.card-body .row.g-3 > .col-md-3 {\n  min-height: 80px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.target-info {\n  display: flex;\n  flex-direction: column;\n}\n.target-info strong {\n  color: #212529;\n}\n.target-info small {\n  color: #6c757d;\n  font-size: 0.8rem;\n}\n.priority-badge {\n  font-size: 0.75rem;\n  padding: 0.25rem 0.5rem;\n}\n.status-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.status-indicator::before {\n  content: "";\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: currentColor;\n}\n.table-success td {\n  position: relative;\n}\n.table-success td:first-child::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 4px;\n  background-color: #198754;\n  border-radius: 0 4px 4px 0;\n}\n.is-invalid {\n  border-color: #dc3545;\n}\n.invalid-feedback {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875rem;\n  color: #dc3545;\n}\n.empty-state {\n  padding: 3rem 1rem;\n  text-align: center;\n  color: #6c757d;\n}\n.empty-state i {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n/*# sourceMappingURL=assign-shifts.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssignShiftsComponent, { className: "AssignShiftsComponent", filePath: "src/app/pages/shifts/assign-shifts/assign-shifts.component.ts", lineNumber: 43 });
})();
export {
  AssignShiftsComponent
};
//# sourceMappingURL=chunk-TKMYYB5V.js.map
