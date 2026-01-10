import {
  SearchableSelectComponent
} from "./chunk-2D23Y7U6.js";
import {
  FormSectionComponent
} from "./chunk-JTLHOQFH.js";
import {
  BranchesService
} from "./chunk-Z44KTAEC.js";
import {
  DepartmentsService
} from "./chunk-OU7DT47F.js";
import {
  EmployeesService
} from "./chunk-5B6AVE4S.js";
import {
  LoadingSpinnerComponent
} from "./chunk-VATI3GP6.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-GYSVNBR7.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/departments/department-form/department-form.component.ts
function DepartmentFormComponent_Conditional_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("branchId"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_3_Conditional_4_Template, "DepartmentFormComponent_Conditional_3_Conditional_4_Template");
function DepartmentFormComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "label", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-searchable-select", 10);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function DepartmentFormComponent_Conditional_3_Template_app_searchable_select_selectionChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBranchSelectionChange($event));
    }, "DepartmentFormComponent_Conditional_3_Template_app_searchable_select_selectionChange_3_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, DepartmentFormComponent_Conditional_3_Conditional_4_Template, 2, 1, "div", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("branch.title"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r1.isFieldInvalid("branchId"));
    \u0275\u0275property("options", ctx_r1.branchSelectOptions)("value", ((tmp_4_0 = ctx_r1.form.get("branchId")) == null ? null : tmp_4_0.value == null ? null : tmp_4_0.value.toString()) || "")("placeholder", ctx_r1.i18n.t("branch.select"))("searchable", true)("clearable", false)("disabled", ctx_r1.loadingBranches())("loading", ctx_r1.loadingBranches());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isFieldInvalid("branchId") ? 4 : -1);
  }
}
__name(DepartmentFormComponent_Conditional_3_Template, "DepartmentFormComponent_Conditional_3_Template");
function DepartmentFormComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("name"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_8_Template, "DepartmentFormComponent_Conditional_8_Template");
function DepartmentFormComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("nameAr"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_13_Template, "DepartmentFormComponent_Conditional_13_Template");
function DepartmentFormComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("code"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_18_Template, "DepartmentFormComponent_Conditional_18_Template");
function DepartmentFormComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("parentDepartmentId"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_23_Template, "DepartmentFormComponent_Conditional_23_Template");
function DepartmentFormComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("description"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_30_Template, "DepartmentFormComponent_Conditional_30_Template");
function DepartmentFormComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("descriptionAr"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_35_Template, "DepartmentFormComponent_Conditional_35_Template");
function DepartmentFormComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "app-loading-spinner", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", "sm")("showMessage", false);
  }
}
__name(DepartmentFormComponent_Conditional_43_Template, "DepartmentFormComponent_Conditional_43_Template");
function DepartmentFormComponent_Conditional_44_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentFormComponent_Conditional_44_For_2_Template_button_click_0_listener() {
      const manager_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onSelectManager(manager_r4));
    }, "DepartmentFormComponent_Conditional_44_For_2_Template_button_click_0_listener"));
    \u0275\u0275elementStart(1, "div", 42)(2, "span", 43);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 44);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const manager_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(manager_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(manager_r4.employeeNumber);
  }
}
__name(DepartmentFormComponent_Conditional_44_For_2_Template, "DepartmentFormComponent_Conditional_44_For_2_Template");
function DepartmentFormComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275repeaterCreate(1, DepartmentFormComponent_Conditional_44_For_2_Template, 6, 2, "button", 40, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredManagers());
  }
}
__name(DepartmentFormComponent_Conditional_44_Template, "DepartmentFormComponent_Conditional_44_Template");
function DepartmentFormComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span", 44);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.noResultsFound"));
  }
}
__name(DepartmentFormComponent_Conditional_45_Template, "DepartmentFormComponent_Conditional_45_Template");
function DepartmentFormComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span", 44);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("department.selectBranchFirst"));
  }
}
__name(DepartmentFormComponent_Conditional_46_Template, "DepartmentFormComponent_Conditional_46_Template");
function DepartmentFormComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("managerEmployeeId"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_47_Template, "DepartmentFormComponent_Conditional_47_Template");
function DepartmentFormComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("costCenter"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_54_Template, "DepartmentFormComponent_Conditional_54_Template");
function DepartmentFormComponent_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("location"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_59_Template, "DepartmentFormComponent_Conditional_59_Template");
function DepartmentFormComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("phone"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_64_Template, "DepartmentFormComponent_Conditional_64_Template");
function DepartmentFormComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("email"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_69_Template, "DepartmentFormComponent_Conditional_69_Template");
function DepartmentFormComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("sortOrder"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_74_Template, "DepartmentFormComponent_Conditional_74_Template");
function DepartmentFormComponent_Conditional_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 36);
  }
}
__name(DepartmentFormComponent_Conditional_97_Template, "DepartmentFormComponent_Conditional_97_Template");
function DepartmentFormComponent_Conditional_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 37);
  }
}
__name(DepartmentFormComponent_Conditional_98_Template, "DepartmentFormComponent_Conditional_98_Template");
function DepartmentFormComponent_Conditional_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 45);
    \u0275\u0275element(2, "app-loading-spinner", 46);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("message", ctx_r1.i18n.t("common.loading"))("variant", "primary")("centered", true);
  }
}
__name(DepartmentFormComponent_Conditional_100_Template, "DepartmentFormComponent_Conditional_100_Template");
var _DepartmentFormComponent = class _DepartmentFormComponent {
  department = null;
  branchId = null;
  parentId = null;
  isEditMode = false;
  externalSaving = false;
  save = new EventEmitter();
  cancel = new EventEmitter();
  i18n = inject(I18nService);
  fb = inject(FormBuilder);
  departmentsService = inject(DepartmentsService);
  employeesService = inject(EmployeesService);
  branchesService = inject(BranchesService);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  departments = signal([], ...ngDevMode ? [{ debugName: "departments" }] : []);
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  managers = signal([], ...ngDevMode ? [{ debugName: "managers" }] : []);
  filteredManagers = signal([], ...ngDevMode ? [{ debugName: "filteredManagers" }] : []);
  loadingBranches = signal(false, ...ngDevMode ? [{ debugName: "loadingBranches" }] : []);
  loadingManagers = signal(false, ...ngDevMode ? [{ debugName: "loadingManagers" }] : []);
  showManagerDropdown = signal(false, ...ngDevMode ? [{ debugName: "showManagerDropdown" }] : []);
  managerSearchTerm = signal("", ...ngDevMode ? [{ debugName: "managerSearchTerm" }] : []);
  // Computed signal for saving state (either internal or external)
  isSaving = computed(() => this.saving() || this.externalSaving, ...ngDevMode ? [{ debugName: "isSaving" }] : []);
  // Form
  form;
  constructor() {
    this.form = this.createForm();
  }
  ngOnInit() {
    if (!this.isEditMode) {
      this.loadBranches();
    } else {
      this.loadDepartments();
      this.loadManagers();
    }
  }
  ngOnChanges(changes) {
    if (changes["department"] && this.department) {
      this.populateForm();
    }
  }
  createForm() {
    return this.fb.group({
      branchId: [this.branchId, this.isEditMode ? [] : [Validators.required]],
      name: ["", [Validators.required, Validators.maxLength(100)]],
      nameAr: ["", [Validators.maxLength(100)]],
      code: ["", [Validators.required, Validators.maxLength(20)]],
      description: ["", [Validators.maxLength(500)]],
      descriptionAr: ["", [Validators.maxLength(500)]],
      parentDepartmentId: [null],
      managerEmployeeId: [null],
      costCenter: ["", [Validators.maxLength(50)]],
      location: ["", [Validators.maxLength(100)]],
      phone: ["", [Validators.maxLength(20)]],
      email: ["", [Validators.email, Validators.maxLength(100)]],
      sortOrder: [0, [Validators.min(0)]],
      isActive: [true]
    });
  }
  populateForm() {
    if (!this.department)
      return;
    this.form.patchValue({
      branchId: this.department.branchId,
      name: this.department.name,
      nameAr: this.department.nameAr,
      code: this.department.code,
      description: this.department.description,
      descriptionAr: this.department.descriptionAr,
      parentDepartmentId: this.department.parentDepartmentId,
      managerEmployeeId: this.department.managerEmployeeId,
      costCenter: this.department.costCenter,
      location: this.department.location,
      phone: this.department.phone,
      email: this.department.email,
      sortOrder: this.department.sortOrder,
      isActive: this.department.isActive
    });
    this.managerSearchTerm.set("");
    if (this.isEditMode) {
      this.loadDepartments();
      this.loadManagers();
    }
  }
  loadBranches() {
    this.loadingBranches.set(true);
    this.employeesService.getBranches().subscribe({
      next: /* @__PURE__ */ __name((result) => {
        this.branches.set(result.items);
        this.loadingBranches.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches:", error);
        this.loadingBranches.set(false);
      }, "error")
    });
  }
  loadDepartments() {
    const selectedBranchId = this.branchId || this.form.get("branchId")?.value;
    if (!selectedBranchId) {
      this.departments.set([]);
      return;
    }
    this.loading.set(true);
    this.departmentsService.getDepartments({
      branchId: selectedBranchId,
      includeInactive: false
    }).subscribe({
      next: /* @__PURE__ */ __name((departments) => {
        const filtered = this.isEditMode && this.department ? departments.filter((d) => d.id !== this.department.id && !d.path.includes(this.department.name)) : departments;
        this.departments.set(filtered);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load departments:", error);
        this.loading.set(false);
      }, "error")
    });
  }
  loadManagers() {
    const selectedBranchId = this.branchId || this.form.get("branchId")?.value;
    if (!this.isEditMode && !selectedBranchId) {
      this.managers.set([]);
      this.filteredManagers.set([]);
      return;
    }
    this.loadingManagers.set(true);
    this.employeesService.getManagers(selectedBranchId || void 0).subscribe({
      next: /* @__PURE__ */ __name((managers) => {
        this.managers.set(managers);
        this.filteredManagers.set(managers);
        this.loadingManagers.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load managers:", error);
        this.loadingManagers.set(false);
      }, "error")
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      return;
    }
    this.saving.set(true);
    const formValue = this.form.value;
    const data = __spreadProps(__spreadValues({}, formValue), {
      branchId: formValue.branchId || this.branchId,
      parentDepartmentId: this.parentId || formValue.parentDepartmentId || null
    });
    this.save.emit(data);
  }
  onCancel() {
    this.cancel.emit();
  }
  onReset() {
    if (this.isEditMode && this.department) {
      this.populateForm();
    } else {
      this.form.reset({
        branchId: null,
        isActive: true,
        sortOrder: 0,
        parentDepartmentId: this.parentId
      });
    }
  }
  onBranchChange() {
    this.form.patchValue({
      parentDepartmentId: null,
      // Reset parent department
      managerEmployeeId: null
      // Reset manager
    });
    this.loadDepartments();
    this.loadManagers();
  }
  markFormGroupTouched() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
  isFieldInvalid(fieldName) {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
  getFieldError(fieldName) {
    const field = this.form.get(fieldName);
    if (!field || !field.errors || !field.touched)
      return "";
    const errors = field.errors;
    if (errors["required"])
      return this.i18n.t("validation.required");
    if (errors["maxlength"])
      return this.i18n.t("validation.maxLength");
    if (errors["email"])
      return this.i18n.t("validation.email");
    if (errors["min"])
      return this.i18n.t("validation.min");
    return "";
  }
  onManagerSearch(event) {
    const target = event.target;
    const searchTerm = target.value.toLowerCase();
    this.managerSearchTerm.set(target.value);
    if (searchTerm.trim() === "") {
      this.filteredManagers.set(this.managers());
    } else {
      const filtered = this.managers().filter((manager) => manager.name.toLowerCase().includes(searchTerm) || manager.employeeNumber.toLowerCase().includes(searchTerm));
      this.filteredManagers.set(filtered);
    }
    this.showManagerDropdown.set(true);
  }
  onSelectManager(manager) {
    this.form.get("managerEmployeeId")?.setValue(manager.id);
    this.managerSearchTerm.set("");
    this.showManagerDropdown.set(false);
  }
  onManagerFocus() {
    this.showManagerDropdown.set(true);
    const selectedId = this.form.get("managerEmployeeId")?.value;
    if (selectedId) {
      this.managerSearchTerm.set("");
    }
    this.filteredManagers.set(this.managers());
  }
  onManagerBlur() {
    setTimeout(() => this.showManagerDropdown.set(false), 200);
  }
  getSelectedManagerName() {
    const selectedId = this.form.get("managerEmployeeId")?.value;
    if (!selectedId)
      return "";
    const manager = this.managers().find((m) => m.id === selectedId);
    return manager ? manager.name : "";
  }
  trackByManagerId(index, manager) {
    return manager.id;
  }
  // Searchable select options
  get branchSelectOptions() {
    const options = [
      { value: "", label: this.i18n.t("branch.select") }
    ];
    this.branches().forEach((branch) => {
      options.push({
        value: branch.id.toString(),
        label: `${branch.name} (${branch.code})`,
        subLabel: branch.location
      });
    });
    return options;
  }
  get departmentSelectOptions() {
    const options = [
      { value: "", label: this.i18n.t("department.selectParent") }
    ];
    this.departments().forEach((dept) => {
      options.push({
        value: dept.id.toString(),
        label: dept.path || dept.name,
        subLabel: dept.code
      });
    });
    return options;
  }
  onBranchSelectionChange(branchIdStr) {
    const branchId = branchIdStr ? parseInt(branchIdStr) : null;
    this.form.patchValue({ branchId });
    this.onBranchChange();
  }
  onParentDepartmentSelectionChange(departmentIdStr) {
    const departmentId = departmentIdStr ? parseInt(departmentIdStr) : null;
    this.form.patchValue({ parentDepartmentId: departmentId });
  }
};
__name(_DepartmentFormComponent, "DepartmentFormComponent");
__publicField(_DepartmentFormComponent, "\u0275fac", /* @__PURE__ */ __name(function DepartmentFormComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DepartmentFormComponent)();
}, "DepartmentFormComponent_Factory"));
__publicField(_DepartmentFormComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DepartmentFormComponent, selectors: [["app-department-form"]], inputs: { department: "department", branchId: "branchId", parentId: "parentId", isEditMode: "isEditMode", externalSaving: "externalSaving" }, outputs: { save: "save", cancel: "cancel" }, features: [\u0275\u0275NgOnChangesFeature], decls: 101, vars: 90, consts: [[3, "ngSubmit", "formGroup"], [3, "title"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label", "required"], ["type", "text", "formControlName", "name", 1, "form-control", 3, "placeholder"], [1, "invalid-feedback"], [1, "form-label"], ["type", "text", "formControlName", "nameAr", "dir", "rtl", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "code", 1, "form-control", 2, "text-transform", "uppercase", 3, "placeholder"], [3, "selectionChange", "options", "value", "placeholder", "searchable", "clearable", "disabled", "loading"], [1, "form-text", "text-muted"], ["formControlName", "description", "rows", "3", 1, "form-control", 3, "placeholder"], ["formControlName", "descriptionAr", "rows", "3", "dir", "rtl", 1, "form-control", 3, "placeholder"], [1, "position-relative"], ["type", "text", 1, "form-control", 3, "input", "focus", "blur", "value", "placeholder", "disabled"], [1, "position-absolute", "top-50", "end-0", "translate-middle-y", "me-3"], [1, "dropdown-menu", "show", "w-100", "mt-1", "shadow", 2, "max-height", "200px", "overflow-y", "auto", "position", "absolute", "z-index", "1050"], [1, "dropdown-menu", "show", "w-100", "mt-1", "shadow", "text-center", "py-3", 2, "position", "absolute", "z-index", "1050"], ["type", "text", "formControlName", "costCenter", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "location", 1, "form-control", 3, "placeholder"], ["type", "tel", "formControlName", "phone", 1, "form-control", 3, "placeholder"], ["type", "email", "formControlName", "email", 1, "form-control", 3, "placeholder"], ["type", "number", "formControlName", "sortOrder", "min", "0", 1, "form-control"], [1, "col-12"], [1, "form-check", "form-switch"], ["type", "checkbox", "formControlName", "isActive", "id", "isActiveSwitch", 1, "form-check-input"], ["for", "isActiveSwitch", 1, "form-check-label"], [1, "form-actions"], [1, "d-flex", "justify-content-between"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fas", "fa-undo", "me-2"], [1, "d-flex", "gap-2"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], [1, "fas", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-save", "me-2"], [1, "loading-overlay"], [3, "size", "showMessage"], ["type", "button", 1, "dropdown-item", "d-flex", "justify-content-between", "align-items-center"], ["type", "button", 1, "dropdown-item", "d-flex", "justify-content-between", "align-items-center", 3, "click"], [1, "d-flex", "flex-column"], [1, "fw-medium"], [1, "text-muted"], [1, "d-flex", "align-items-center", "justify-content-center", "h-100"], [3, "message", "variant", "centered"]], template: /* @__PURE__ */ __name(function DepartmentFormComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "form", 0);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_form_ngSubmit_0_listener() {
      return ctx.onSubmit();
    }, "DepartmentFormComponent_Template_form_ngSubmit_0_listener"));
    \u0275\u0275elementStart(1, "app-form-section", 1)(2, "div", 2);
    \u0275\u0275conditionalCreate(3, DepartmentFormComponent_Conditional_3_Template, 5, 11, "div", 3);
    \u0275\u0275elementStart(4, "div", 3)(5, "label", 4);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 5);
    \u0275\u0275conditionalCreate(8, DepartmentFormComponent_Conditional_8_Template, 2, 1, "div", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 3)(10, "label", 7);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 8);
    \u0275\u0275conditionalCreate(13, DepartmentFormComponent_Conditional_13_Template, 2, 1, "div", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 3)(15, "label", 4);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 9);
    \u0275\u0275conditionalCreate(18, DepartmentFormComponent_Conditional_18_Template, 2, 1, "div", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 3)(20, "label", 7);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "app-searchable-select", 10);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_app_searchable_select_selectionChange_22_listener($event) {
      return ctx.onParentDepartmentSelectionChange($event);
    }, "DepartmentFormComponent_Template_app_searchable_select_selectionChange_22_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, DepartmentFormComponent_Conditional_23_Template, 2, 1, "div", 6);
    \u0275\u0275elementStart(24, "small", 11);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 3)(27, "label", 7);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "textarea", 12);
    \u0275\u0275conditionalCreate(30, DepartmentFormComponent_Conditional_30_Template, 2, 1, "div", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 3)(32, "label", 7);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275element(34, "textarea", 13);
    \u0275\u0275conditionalCreate(35, DepartmentFormComponent_Conditional_35_Template, 2, 1, "div", 6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "app-form-section", 1)(37, "div", 2)(38, "div", 3)(39, "label", 7);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 14)(42, "input", 15);
    \u0275\u0275listener("input", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_input_input_42_listener($event) {
      return ctx.onManagerSearch($event);
    }, "DepartmentFormComponent_Template_input_input_42_listener"))("focus", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_input_focus_42_listener() {
      return ctx.onManagerFocus();
    }, "DepartmentFormComponent_Template_input_focus_42_listener"))("blur", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_input_blur_42_listener() {
      return ctx.onManagerBlur();
    }, "DepartmentFormComponent_Template_input_blur_42_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(43, DepartmentFormComponent_Conditional_43_Template, 2, 2, "div", 16);
    \u0275\u0275conditionalCreate(44, DepartmentFormComponent_Conditional_44_Template, 3, 0, "div", 17);
    \u0275\u0275conditionalCreate(45, DepartmentFormComponent_Conditional_45_Template, 3, 1, "div", 18);
    \u0275\u0275conditionalCreate(46, DepartmentFormComponent_Conditional_46_Template, 3, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(47, DepartmentFormComponent_Conditional_47_Template, 2, 1, "div", 6);
    \u0275\u0275elementStart(48, "small", 11);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 3)(51, "label", 7);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275element(53, "input", 19);
    \u0275\u0275conditionalCreate(54, DepartmentFormComponent_Conditional_54_Template, 2, 1, "div", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "div", 3)(56, "label", 7);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd();
    \u0275\u0275element(58, "input", 20);
    \u0275\u0275conditionalCreate(59, DepartmentFormComponent_Conditional_59_Template, 2, 1, "div", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "div", 3)(61, "label", 7);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd();
    \u0275\u0275element(63, "input", 21);
    \u0275\u0275conditionalCreate(64, DepartmentFormComponent_Conditional_64_Template, 2, 1, "div", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 3)(66, "label", 7);
    \u0275\u0275text(67);
    \u0275\u0275elementEnd();
    \u0275\u0275element(68, "input", 22);
    \u0275\u0275conditionalCreate(69, DepartmentFormComponent_Conditional_69_Template, 2, 1, "div", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "div", 3)(71, "label", 7);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd();
    \u0275\u0275element(73, "input", 23);
    \u0275\u0275conditionalCreate(74, DepartmentFormComponent_Conditional_74_Template, 2, 1, "div", 6);
    \u0275\u0275elementStart(75, "small", 11);
    \u0275\u0275text(76);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(77, "app-form-section", 1)(78, "div", 2)(79, "div", 24)(80, "div", 25);
    \u0275\u0275element(81, "input", 26);
    \u0275\u0275elementStart(82, "label", 27);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(84, "small", 11);
    \u0275\u0275text(85);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(86, "div", 28)(87, "div", 29)(88, "div")(89, "button", 30);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_button_click_89_listener() {
      return ctx.onReset();
    }, "DepartmentFormComponent_Template_button_click_89_listener"));
    \u0275\u0275element(90, "i", 31);
    \u0275\u0275text(91);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "div", 32)(93, "button", 33);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_button_click_93_listener() {
      return ctx.onCancel();
    }, "DepartmentFormComponent_Template_button_click_93_listener"));
    \u0275\u0275element(94, "i", 34);
    \u0275\u0275text(95);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "button", 35);
    \u0275\u0275conditionalCreate(97, DepartmentFormComponent_Conditional_97_Template, 1, 0, "span", 36);
    \u0275\u0275conditionalCreate(98, DepartmentFormComponent_Conditional_98_Template, 1, 0, "i", 37);
    \u0275\u0275text(99);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(100, DepartmentFormComponent_Conditional_100_Template, 3, 3, "div", 38);
  }
  if (rf & 2) {
    let tmp_18_0;
    \u0275\u0275property("formGroup", ctx.form);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("common.basicInformation"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx.isEditMode ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.name"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("name"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.namePlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("name") ? 8 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.nameAr"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("nameAr"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.nameArPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("nameAr") ? 13 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.code"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("code"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.codePlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("code") ? 18 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.parentDepartment"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("parentDepartmentId"));
    \u0275\u0275property("options", ctx.departmentSelectOptions)("value", ((tmp_18_0 = ctx.form.get("parentDepartmentId")) == null ? null : tmp_18_0.value == null ? null : tmp_18_0.value.toString()) || "")("placeholder", ctx.i18n.t("department.selectParent"))("searchable", true)("clearable", true)("disabled", ctx.loading())("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("parentDepartmentId") ? 23 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("department.parentDepartmentHelp"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("common.description"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("description"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.descriptionPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("description") ? 30 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.descriptionAr"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("descriptionAr"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.descriptionArPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("descriptionAr") ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("department.additionalInformation"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.manager"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("managerEmployeeId"));
    \u0275\u0275property("value", ctx.managerSearchTerm() || ctx.getSelectedManagerName())("placeholder", ctx.i18n.t("department.selectManager"))("disabled", ctx.loadingManagers());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loadingManagers() ? 43 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showManagerDropdown() && !ctx.loadingManagers() && ctx.filteredManagers().length > 0 ? 44 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showManagerDropdown() && !ctx.loadingManagers() && ctx.filteredManagers().length === 0 && ctx.managerSearchTerm() ? 45 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.isEditMode && ctx.showManagerDropdown() && !ctx.loadingManagers() && ctx.managers().length === 0 ? 46 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("managerEmployeeId") ? 47 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("department.managerHelp"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.costCenter"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("costCenter"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.costCenterPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("costCenter") ? 54 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.location"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("location"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.locationPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("location") ? 59 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("common.phone"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("phone"));
    \u0275\u0275property("placeholder", ctx.i18n.t("common.phonePlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("phone") ? 64 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("common.email"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("email"));
    \u0275\u0275property("placeholder", ctx.i18n.t("common.emailPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("email") ? 69 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("common.sortOrder"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("sortOrder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("sortOrder") ? 74 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.sortOrderHelp"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("common.status"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("department.isActive"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("department.isActiveHelp"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx.isSaving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.reset"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.isSaving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.form.invalid || ctx.isSaving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isSaving() ? 97 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.isSaving() ? 98 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.isSaving() ? ctx.i18n.t("common.saving") : ctx.isEditMode ? ctx.i18n.t("common.update") : ctx.i18n.t("common.save"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 100 : -1);
  }
}, "DepartmentFormComponent_Template"), dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, SearchableSelectComponent, FormSectionComponent, LoadingSpinnerComponent], styles: [`

.section-title[_ngcontent-%COMP%] {
  color: #495057;
  font-weight: 600;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
}
.section-title[_ngcontent-%COMP%]:first-child {
  margin-top: 0;
}
.section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #667eea;
}
.form-label[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}
.form-label.required[_ngcontent-%COMP%]::after {
  content: " *";
  color: #dc3545;
}
.form-control[_ngcontent-%COMP%], 
.form-select[_ngcontent-%COMP%] {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}
.form-control[_ngcontent-%COMP%]:focus, 
.form-select[_ngcontent-%COMP%]:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}
.form-control.is-invalid[_ngcontent-%COMP%], 
.form-select.is-invalid[_ngcontent-%COMP%] {
  border-color: #dc3545;
  background-image: none;
}
.form-control.is-invalid[_ngcontent-%COMP%]:focus, 
.form-select.is-invalid[_ngcontent-%COMP%]:focus {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
textarea.form-control[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: 80px;
}
.form-check-input[_ngcontent-%COMP%] {
  border-radius: 6px;
  transition: all 0.3s ease;
}
.form-check-input[_ngcontent-%COMP%]:checked {
  background-color: #667eea;
  border-color: #667eea;
}
.form-check-input[_ngcontent-%COMP%]:focus {
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}
.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%] {
  width: 2.5rem;
  border-radius: 2rem;
}
.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%]:checked {
  background-color: #28a745;
  border-color: #28a745;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
.form-text[_ngcontent-%COMP%] {
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.25rem;
}
.invalid-feedback[_ngcontent-%COMP%] {
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}
.form-actions[_ngcontent-%COMP%] {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}
.form-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
  border-radius: 8px;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}
.btn-primary[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  border: none;
}
.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
.btn-primary[_ngcontent-%COMP%]:disabled {
  background: #6c757d;
  opacity: 0.6;
  transform: none;
}
.btn-secondary[_ngcontent-%COMP%] {
  background-color: #6c757d;
  border-color: #6c757d;
}
.btn-outline-secondary[_ngcontent-%COMP%] {
  border-color: #6c757d;
  color: #6c757d;
}
.btn-outline-secondary[_ngcontent-%COMP%]:hover {
  background-color: #6c757d;
  border-color: #6c757d;
}
.loading-overlay[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
  border-radius: 8px;
}
[dir=rtl][_ngcontent-%COMP%]   .form-control[dir=rtl][_ngcontent-%COMP%], 
[dir=rtl][_ngcontent-%COMP%]   .form-select[dir=rtl][_ngcontent-%COMP%] {
  text-align: right;
}
[dir=rtl][_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {
  flex-direction: row-reverse;
}
[dir=rtl][_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  margin-left: 0.5rem;
  margin-right: 0;
}
@media (max-width: 768px) {
  .form-actions[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  .form-actions[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {
    width: 100%;
  }
  .form-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .section-title[_ngcontent-%COMP%] {
    font-size: 1rem;
    margin-top: 1rem;
  }
}
@media (max-width: 576px) {
  .form-control[_ngcontent-%COMP%], 
   .form-select[_ngcontent-%COMP%] {
    font-size: 1rem;
  }
  .section-title[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
  }
  .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
    margin-bottom: 0.25rem;
  }
}
.form-control[_ngcontent-%COMP%], 
.form-select[_ngcontent-%COMP%], 
.btn[_ngcontent-%COMP%] {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.form-actions[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_slideUp 0.4s ease-out;
}
@keyframes _ngcontent-%COMP%_slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.form-control[_ngcontent-%COMP%]:focus, 
.form-select[_ngcontent-%COMP%]:focus, 
.form-check-input[_ngcontent-%COMP%]:focus {
  outline: none;
}
.form-check-label[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #495057;
  cursor: pointer;
}
.input-group[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:focus {
  z-index: 3;
}
.input-group-text[_ngcontent-%COMP%] {
  background-color: #f8f9fa;
  border-color: #e0e0e0;
  color: #6c757d;
}
.form-select[_ngcontent-%COMP%] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 16px 12px;
}
.was-validated[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:valid, 
.form-control.is-valid[_ngcontent-%COMP%] {
  border-color: #28a745;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%2328a745' viewBox='0 0 8 8'%3e%3cpath d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
}
.was-validated[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:valid:focus, 
.form-control.is-valid[_ngcontent-%COMP%]:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}
@media print {
  .form-actions[_ngcontent-%COMP%] {
    display: none;
  }
  .form-control[_ngcontent-%COMP%], 
   .form-select[_ngcontent-%COMP%] {
    border: 1px solid #000 !important;
    box-shadow: none !important;
  }
  .section-title[_ngcontent-%COMP%] {
    page-break-after: avoid;
  }
}
/*# sourceMappingURL=department-form.component.css.map */`] }));
var DepartmentFormComponent = _DepartmentFormComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DepartmentFormComponent, [{
    type: Component,
    args: [{ selector: "app-department-form", standalone: true, imports: [ReactiveFormsModule, SearchableSelectComponent, FormSectionComponent, LoadingSpinnerComponent], template: `<form [formGroup]="form" (ngSubmit)="onSubmit()">\r
  <app-form-section [title]="i18n.t('common.basicInformation')">\r
    <div class="row g-3">\r
    <!-- Branch (only for create mode) -->\r
    @if (!isEditMode) {\r
      <div class="col-md-6">\r
        <label class="form-label required">{{ i18n.t('branch.title') }}</label>\r
        <app-searchable-select\r
          [options]="branchSelectOptions"\r
          [value]="form.get('branchId')?.value?.toString() || ''"\r
          (selectionChange)="onBranchSelectionChange($event)"\r
          [placeholder]="i18n.t('branch.select')"\r
          [searchable]="true"\r
          [clearable]="false"\r
          [disabled]="loadingBranches()"\r
          [loading]="loadingBranches()"\r
          [class.is-invalid]="isFieldInvalid('branchId')"\r
        ></app-searchable-select>\r
        @if (isFieldInvalid('branchId')) {\r
          <div class="invalid-feedback">\r
            {{ getFieldError('branchId') }}\r
          </div>\r
        }\r
      </div>\r
    }\r
\r
    <!-- Name -->\r
    <div class="col-md-6">\r
      <label class="form-label required">{{ i18n.t('department.name') }}</label>\r
      <input\r
        type="text"\r
        class="form-control"\r
        formControlName="name"\r
        [class.is-invalid]="isFieldInvalid('name')"\r
        [placeholder]="i18n.t('department.namePlaceholder')"\r
      />\r
      @if (isFieldInvalid('name')) {\r
        <div class="invalid-feedback">\r
          {{ getFieldError('name') }}\r
        </div>\r
      }\r
    </div>\r
\r
    <!-- Arabic Name -->\r
    <div class="col-md-6">\r
      <label class="form-label">{{ i18n.t('department.nameAr') }}</label>\r
      <input\r
        type="text"\r
        class="form-control"\r
        formControlName="nameAr"\r
        [class.is-invalid]="isFieldInvalid('nameAr')"\r
        [placeholder]="i18n.t('department.nameArPlaceholder')"\r
        dir="rtl"\r
      />\r
      @if (isFieldInvalid('nameAr')) {\r
        <div class="invalid-feedback">\r
          {{ getFieldError('nameAr') }}\r
        </div>\r
      }\r
    </div>\r
\r
    <!-- Code -->\r
    <div class="col-md-6">\r
      <label class="form-label required">{{ i18n.t('department.code') }}</label>\r
      <input\r
        type="text"\r
        class="form-control"\r
        formControlName="code"\r
        [class.is-invalid]="isFieldInvalid('code')"\r
        [placeholder]="i18n.t('department.codePlaceholder')"\r
        style="text-transform: uppercase;"\r
      />\r
      @if (isFieldInvalid('code')) {\r
        <div class="invalid-feedback">\r
          {{ getFieldError('code') }}\r
        </div>\r
      }\r
    </div>\r
\r
    <!-- Parent Department -->\r
    <div class="col-md-6">\r
      <label class="form-label">{{ i18n.t('department.parentDepartment') }}</label>\r
      <app-searchable-select\r
        [options]="departmentSelectOptions"\r
        [value]="form.get('parentDepartmentId')?.value?.toString() || ''"\r
        (selectionChange)="onParentDepartmentSelectionChange($event)"\r
        [placeholder]="i18n.t('department.selectParent')"\r
        [searchable]="true"\r
        [clearable]="true"\r
        [disabled]="loading()"\r
        [loading]="loading()"\r
        [class.is-invalid]="isFieldInvalid('parentDepartmentId')"\r
      ></app-searchable-select>\r
      @if (isFieldInvalid('parentDepartmentId')) {\r
        <div class="invalid-feedback">\r
          {{ getFieldError('parentDepartmentId') }}\r
        </div>\r
      }\r
      <small class="form-text text-muted">\r
        {{ i18n.t('department.parentDepartmentHelp') }}\r
      </small>\r
    </div>\r
\r
    <!-- Description -->\r
    <div class="col-md-6">\r
      <label class="form-label">{{ i18n.t('common.description') }}</label>\r
      <textarea\r
        class="form-control"\r
        formControlName="description"\r
        [class.is-invalid]="isFieldInvalid('description')"\r
        [placeholder]="i18n.t('department.descriptionPlaceholder')"\r
        rows="3"\r
      ></textarea>\r
      @if (isFieldInvalid('description')) {\r
        <div class="invalid-feedback">\r
          {{ getFieldError('description') }}\r
        </div>\r
      }\r
    </div>\r
\r
    <!-- Arabic Description -->\r
    <div class="col-md-6">\r
      <label class="form-label">{{ i18n.t('department.descriptionAr') }}</label>\r
      <textarea\r
        class="form-control"\r
        formControlName="descriptionAr"\r
        [class.is-invalid]="isFieldInvalid('descriptionAr')"\r
        [placeholder]="i18n.t('department.descriptionArPlaceholder')"\r
        rows="3"\r
        dir="rtl"\r
      ></textarea>\r
      @if (isFieldInvalid('descriptionAr')) {\r
        <div class="invalid-feedback">\r
          {{ getFieldError('descriptionAr') }}\r
        </div>\r
      }\r
    </div>\r
    </div>\r
  </app-form-section>\r
\r
  <!-- Additional Information -->\r
  <app-form-section [title]="i18n.t('department.additionalInformation')">\r
    <div class="row g-3">\r
    <!-- Manager -->\r
    <div class="col-md-6">\r
      <label class="form-label">{{ i18n.t('department.manager') }}</label>\r
      <div class="position-relative">\r
        <input\r
          type="text"\r
          class="form-control"\r
          [value]="managerSearchTerm() || getSelectedManagerName()"\r
          [class.is-invalid]="isFieldInvalid('managerEmployeeId')"\r
          [placeholder]="i18n.t('department.selectManager')"\r
          (input)="onManagerSearch($event)"\r
          (focus)="onManagerFocus()"\r
          (blur)="onManagerBlur()"\r
          [disabled]="loadingManagers()"\r
        />\r
\r
        <!-- Loading indicator -->\r
        @if (loadingManagers()) {\r
          <div class="position-absolute top-50 end-0 translate-middle-y me-3">\r
            <app-loading-spinner\r
              [size]="'sm'"\r
              [showMessage]="false">\r
            </app-loading-spinner>\r
          </div>\r
        }\r
\r
        <!-- Dropdown -->\r
        @if (showManagerDropdown() && !loadingManagers() && filteredManagers().length > 0) {\r
          <div\r
            class="dropdown-menu show w-100 mt-1 shadow"\r
            style="max-height: 200px; overflow-y: auto; position: absolute; z-index: 1050;"\r
          >\r
            @for (manager of filteredManagers(); track $index) {\r
              <button\r
                type="button"\r
                class="dropdown-item d-flex justify-content-between align-items-center"\r
                (click)="onSelectManager(manager)"\r
              >\r
                <div class="d-flex flex-column">\r
                  <span class="fw-medium">{{ manager.name }}</span>\r
                  <small class="text-muted">{{ manager.employeeNumber }}</small>\r
                </div>\r
              </button>\r
            }\r
          </div>\r
        }\r
\r
        <!-- No results -->\r
        @if (showManagerDropdown() && !loadingManagers() && filteredManagers().length === 0 && managerSearchTerm()) {\r
          <div\r
            class="dropdown-menu show w-100 mt-1 shadow text-center py-3"\r
            style="position: absolute; z-index: 1050;"\r
          >\r
            <span class="text-muted">{{ i18n.t('common.noResultsFound') }}</span>\r
          </div>\r
        }\r
\r
        <!-- No branch selected message for create mode -->\r
        @if (!isEditMode && showManagerDropdown() && !loadingManagers() && managers().length === 0) {\r
          <div\r
            class="dropdown-menu show w-100 mt-1 shadow text-center py-3"\r
            style="position: absolute; z-index: 1050;"\r
          >\r
            <span class="text-muted">{{ i18n.t('department.selectBranchFirst') }}</span>\r
          </div>\r
        }\r
      </div>\r
\r
      @if (isFieldInvalid('managerEmployeeId')) {\r
        <div class="invalid-feedback">\r
          {{ getFieldError('managerEmployeeId') }}\r
        </div>\r
      }\r
      <small class="form-text text-muted">\r
        {{ i18n.t('department.managerHelp') }}\r
      </small>\r
    </div>\r
\r
    <!-- Cost Center -->\r
    <div class="col-md-6">\r
      <label class="form-label">{{ i18n.t('department.costCenter') }}</label>\r
      <input\r
        type="text"\r
        class="form-control"\r
        formControlName="costCenter"\r
        [class.is-invalid]="isFieldInvalid('costCenter')"\r
        [placeholder]="i18n.t('department.costCenterPlaceholder')"\r
      />\r
      @if (isFieldInvalid('costCenter')) {\r
        <div class="invalid-feedback">\r
          {{ getFieldError('costCenter') }}\r
        </div>\r
      }\r
    </div>\r
\r
    <!-- Location -->\r
    <div class="col-md-6">\r
      <label class="form-label">{{ i18n.t('department.location') }}</label>\r
      <input\r
        type="text"\r
        class="form-control"\r
        formControlName="location"\r
        [class.is-invalid]="isFieldInvalid('location')"\r
        [placeholder]="i18n.t('department.locationPlaceholder')"\r
      />\r
      @if (isFieldInvalid('location')) {\r
        <div class="invalid-feedback">\r
          {{ getFieldError('location') }}\r
        </div>\r
      }\r
    </div>\r
\r
    <!-- Phone -->\r
    <div class="col-md-6">\r
      <label class="form-label">{{ i18n.t('common.phone') }}</label>\r
      <input\r
        type="tel"\r
        class="form-control"\r
        formControlName="phone"\r
        [class.is-invalid]="isFieldInvalid('phone')"\r
        [placeholder]="i18n.t('common.phonePlaceholder')"\r
      />\r
      @if (isFieldInvalid('phone')) {\r
        <div class="invalid-feedback">\r
          {{ getFieldError('phone') }}\r
        </div>\r
      }\r
    </div>\r
\r
    <!-- Email -->\r
    <div class="col-md-6">\r
      <label class="form-label">{{ i18n.t('common.email') }}</label>\r
      <input\r
        type="email"\r
        class="form-control"\r
        formControlName="email"\r
        [class.is-invalid]="isFieldInvalid('email')"\r
        [placeholder]="i18n.t('common.emailPlaceholder')"\r
      />\r
      @if (isFieldInvalid('email')) {\r
        <div class="invalid-feedback">\r
          {{ getFieldError('email') }}\r
        </div>\r
      }\r
    </div>\r
\r
    <!-- Sort Order -->\r
    <div class="col-md-6">\r
      <label class="form-label">{{ i18n.t('common.sortOrder') }}</label>\r
      <input\r
        type="number"\r
        class="form-control"\r
        formControlName="sortOrder"\r
        [class.is-invalid]="isFieldInvalid('sortOrder')"\r
        min="0"\r
      />\r
      @if (isFieldInvalid('sortOrder')) {\r
        <div class="invalid-feedback">\r
          {{ getFieldError('sortOrder') }}\r
        </div>\r
      }\r
      <small class="form-text text-muted">\r
        {{ i18n.t('common.sortOrderHelp') }}\r
      </small>\r
    </div>\r
    </div>\r
  </app-form-section>\r
\r
  <!-- Status -->\r
  <app-form-section [title]="i18n.t('common.status')">\r
    <div class="row g-3">\r
    <!-- Active Status -->\r
    <div class="col-12">\r
      <div class="form-check form-switch">\r
        <input\r
          class="form-check-input"\r
          type="checkbox"\r
          formControlName="isActive"\r
          id="isActiveSwitch"\r
        />\r
        <label class="form-check-label" for="isActiveSwitch">\r
          {{ i18n.t('department.isActive') }}\r
        </label>\r
      </div>\r
      <small class="form-text text-muted">\r
        {{ i18n.t('department.isActiveHelp') }}\r
      </small>\r
    </div>\r
    </div>\r
  </app-form-section>\r
\r
  <!-- Form Actions -->\r
  <div class="form-actions">\r
    <div class="d-flex justify-content-between">\r
      <div>\r
        <button\r
          type="button"\r
          class="btn btn-outline-secondary"\r
          (click)="onReset()"\r
          [disabled]="isSaving()"\r
        >\r
          <i class="fas fa-undo me-2"></i>\r
          {{ i18n.t('common.reset') }}\r
        </button>\r
      </div>\r
      <div class="d-flex gap-2">\r
        <button\r
          type="button"\r
          class="btn btn-secondary"\r
          (click)="onCancel()"\r
          [disabled]="isSaving()"\r
        >\r
          <i class="fas fa-times me-2"></i>\r
          {{ i18n.t('common.cancel') }}\r
        </button>\r
        <button\r
          type="submit"\r
          class="btn btn-primary"\r
          [disabled]="form.invalid || isSaving()"\r
        >\r
          @if (isSaving()) {\r
            <span class="spinner-border spinner-border-sm me-2"></span>\r
          }\r
          @if (!isSaving()) {\r
            <i class="fas fa-save me-2"></i>\r
          }\r
          {{ isSaving() ? i18n.t('common.saving') : (isEditMode ? i18n.t('common.update') : i18n.t('common.save')) }}\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</form>\r
\r
<!-- Loading Overlay -->\r
@if (loading()) {\r
  <div class="loading-overlay">\r
    <div class="d-flex align-items-center justify-content-center h-100">\r
      <app-loading-spinner\r
        [message]="i18n.t('common.loading')"\r
        [variant]="'primary'"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  </div>\r
}`, styles: [`/* src/app/pages/departments/department-form/department-form.component.css */
.section-title {
  color: #495057;
  font-weight: 600;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
}
.section-title:first-child {
  margin-top: 0;
}
.section-title i {
  color: #667eea;
}
.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}
.form-label.required::after {
  content: " *";
  color: #dc3545;
}
.form-control,
.form-select {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}
.form-control:focus,
.form-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}
.form-control.is-invalid,
.form-select.is-invalid {
  border-color: #dc3545;
  background-image: none;
}
.form-control.is-invalid:focus,
.form-select.is-invalid:focus {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
textarea.form-control {
  resize: vertical;
  min-height: 80px;
}
.form-check-input {
  border-radius: 6px;
  transition: all 0.3s ease;
}
.form-check-input:checked {
  background-color: #667eea;
  border-color: #667eea;
}
.form-check-input:focus {
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}
.form-switch .form-check-input {
  width: 2.5rem;
  border-radius: 2rem;
}
.form-switch .form-check-input:checked {
  background-color: #28a745;
  border-color: #28a745;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
.form-text {
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.25rem;
}
.invalid-feedback {
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}
.form-actions {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}
.form-actions .btn {
  border-radius: 8px;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}
.btn-primary {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  border: none;
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
.btn-primary:disabled {
  background: #6c757d;
  opacity: 0.6;
  transform: none;
}
.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}
.btn-outline-secondary {
  border-color: #6c757d;
  color: #6c757d;
}
.btn-outline-secondary:hover {
  background-color: #6c757d;
  border-color: #6c757d;
}
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
  border-radius: 8px;
}
[dir=rtl] .form-control[dir=rtl],
[dir=rtl] .form-select[dir=rtl] {
  text-align: right;
}
[dir=rtl] .section-title {
  flex-direction: row-reverse;
}
[dir=rtl] .section-title i {
  margin-left: 0.5rem;
  margin-right: 0;
}
@media (max-width: 768px) {
  .form-actions .d-flex {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  .form-actions .d-flex > div {
    width: 100%;
  }
  .form-actions .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .section-title {
    font-size: 1rem;
    margin-top: 1rem;
  }
}
@media (max-width: 576px) {
  .form-control,
  .form-select {
    font-size: 1rem;
  }
  .section-title {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
  }
  .section-title i {
    margin-bottom: 0.25rem;
  }
}
.form-control,
.form-select,
.btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.form-actions {
  animation: slideUp 0.4s ease-out;
}
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.form-control:focus,
.form-select:focus,
.form-check-input:focus {
  outline: none;
}
.form-check-label {
  font-weight: 500;
  color: #495057;
  cursor: pointer;
}
.input-group .form-control:focus {
  z-index: 3;
}
.input-group-text {
  background-color: #f8f9fa;
  border-color: #e0e0e0;
  color: #6c757d;
}
.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 16px 12px;
}
.was-validated .form-control:valid,
.form-control.is-valid {
  border-color: #28a745;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%2328a745' viewBox='0 0 8 8'%3e%3cpath d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
}
.was-validated .form-control:valid:focus,
.form-control.is-valid:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}
@media print {
  .form-actions {
    display: none;
  }
  .form-control,
  .form-select {
    border: 1px solid #000 !important;
    box-shadow: none !important;
  }
  .section-title {
    page-break-after: avoid;
  }
}
/*# sourceMappingURL=department-form.component.css.map */
`] }]
  }], () => [], { department: [{
    type: Input
  }], branchId: [{
    type: Input
  }], parentId: [{
    type: Input
  }], isEditMode: [{
    type: Input
  }], externalSaving: [{
    type: Input
  }], save: [{
    type: Output
  }], cancel: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DepartmentFormComponent, { className: "DepartmentFormComponent", filePath: "src/app/pages/departments/department-form/department-form.component.ts", lineNumber: 21 });
})();

export {
  DepartmentFormComponent
};
//# sourceMappingURL=chunk-2BSO4TCC.js.map
