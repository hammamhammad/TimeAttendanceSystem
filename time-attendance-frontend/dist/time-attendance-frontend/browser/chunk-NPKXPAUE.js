import {
  SearchableSelectComponent
} from "./chunk-YVOT2QSR.js";
import {
  BranchesService
} from "./chunk-GHUXGLMI.js";
import {
  DepartmentsService
} from "./chunk-ZEREPA2X.js";
import {
  EmployeesService
} from "./chunk-WMEU4YDP.js";
import {
  LoadingSpinnerComponent
} from "./chunk-WJCQS5EA.js";
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
} from "./chunk-JBVPS774.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  CommonModule,
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
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/departments/department-form/department-form.component.ts
function DepartmentFormComponent_Conditional_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("branchId"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_6_Conditional_4_Template, "DepartmentFormComponent_Conditional_6_Conditional_4_Template");
function DepartmentFormComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "label", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-searchable-select", 12);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function DepartmentFormComponent_Conditional_6_Template_app_searchable_select_selectionChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBranchSelectionChange($event));
    }, "DepartmentFormComponent_Conditional_6_Template_app_searchable_select_selectionChange_3_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, DepartmentFormComponent_Conditional_6_Conditional_4_Template, 2, 1, "div", 8);
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
__name(DepartmentFormComponent_Conditional_6_Template, "DepartmentFormComponent_Conditional_6_Template");
function DepartmentFormComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("name"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_11_Template, "DepartmentFormComponent_Conditional_11_Template");
function DepartmentFormComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("nameAr"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_16_Template, "DepartmentFormComponent_Conditional_16_Template");
function DepartmentFormComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("code"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_21_Template, "DepartmentFormComponent_Conditional_21_Template");
function DepartmentFormComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("parentDepartmentId"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_26_Template, "DepartmentFormComponent_Conditional_26_Template");
function DepartmentFormComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("description"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_33_Template, "DepartmentFormComponent_Conditional_33_Template");
function DepartmentFormComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("descriptionAr"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_38_Template, "DepartmentFormComponent_Conditional_38_Template");
function DepartmentFormComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "app-loading-spinner", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("size", "sm")("showMessage", false);
  }
}
__name(DepartmentFormComponent_Conditional_48_Template, "DepartmentFormComponent_Conditional_48_Template");
function DepartmentFormComponent_Conditional_49_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentFormComponent_Conditional_49_For_2_Template_button_click_0_listener() {
      const manager_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onSelectManager(manager_r4));
    }, "DepartmentFormComponent_Conditional_49_For_2_Template_button_click_0_listener"));
    \u0275\u0275elementStart(1, "div", 45)(2, "span", 46);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 47);
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
__name(DepartmentFormComponent_Conditional_49_For_2_Template, "DepartmentFormComponent_Conditional_49_For_2_Template");
function DepartmentFormComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275repeaterCreate(1, DepartmentFormComponent_Conditional_49_For_2_Template, 6, 2, "button", 43, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredManagers());
  }
}
__name(DepartmentFormComponent_Conditional_49_Template, "DepartmentFormComponent_Conditional_49_Template");
function DepartmentFormComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "span", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("common.noResultsFound"));
  }
}
__name(DepartmentFormComponent_Conditional_50_Template, "DepartmentFormComponent_Conditional_50_Template");
function DepartmentFormComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "span", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("department.selectBranchFirst"));
  }
}
__name(DepartmentFormComponent_Conditional_51_Template, "DepartmentFormComponent_Conditional_51_Template");
function DepartmentFormComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("managerEmployeeId"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_52_Template, "DepartmentFormComponent_Conditional_52_Template");
function DepartmentFormComponent_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("costCenter"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_59_Template, "DepartmentFormComponent_Conditional_59_Template");
function DepartmentFormComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("location"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_64_Template, "DepartmentFormComponent_Conditional_64_Template");
function DepartmentFormComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("phone"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_69_Template, "DepartmentFormComponent_Conditional_69_Template");
function DepartmentFormComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("email"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_74_Template, "DepartmentFormComponent_Conditional_74_Template");
function DepartmentFormComponent_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("sortOrder"), " ");
  }
}
__name(DepartmentFormComponent_Conditional_79_Template, "DepartmentFormComponent_Conditional_79_Template");
function DepartmentFormComponent_Conditional_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 39);
  }
}
__name(DepartmentFormComponent_Conditional_104_Template, "DepartmentFormComponent_Conditional_104_Template");
function DepartmentFormComponent_Conditional_105_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 40);
  }
}
__name(DepartmentFormComponent_Conditional_105_Template, "DepartmentFormComponent_Conditional_105_Template");
function DepartmentFormComponent_Conditional_107_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 48);
    \u0275\u0275element(2, "app-loading-spinner", 49);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("message", ctx_r1.i18n.t("common.loading"))("variant", "primary")("centered", true);
  }
}
__name(DepartmentFormComponent_Conditional_107_Template, "DepartmentFormComponent_Conditional_107_Template");
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
__publicField(_DepartmentFormComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DepartmentFormComponent, selectors: [["app-department-form"]], inputs: { department: "department", branchId: "branchId", parentId: "parentId", isEditMode: "isEditMode", externalSaving: "externalSaving" }, outputs: { save: "save", cancel: "cancel" }, features: [\u0275\u0275NgOnChangesFeature], decls: 108, vars: 90, consts: [[3, "ngSubmit", "formGroup"], [1, "row", "g-3"], [1, "col-12"], [1, "section-title"], [1, "fas", "fa-info-circle", "me-2"], [1, "col-md-6"], [1, "form-label", "required"], ["type", "text", "formControlName", "name", 1, "form-control", 3, "placeholder"], [1, "invalid-feedback"], [1, "form-label"], ["type", "text", "formControlName", "nameAr", "dir", "rtl", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "code", 1, "form-control", 2, "text-transform", "uppercase", 3, "placeholder"], [3, "selectionChange", "options", "value", "placeholder", "searchable", "clearable", "disabled", "loading"], [1, "form-text", "text-muted"], ["formControlName", "description", "rows", "3", 1, "form-control", 3, "placeholder"], ["formControlName", "descriptionAr", "rows", "3", "dir", "rtl", 1, "form-control", 3, "placeholder"], [1, "fas", "fa-cog", "me-2"], [1, "position-relative"], ["type", "text", 1, "form-control", 3, "input", "focus", "blur", "value", "placeholder", "disabled"], [1, "position-absolute", "top-50", "end-0", "translate-middle-y", "me-3"], [1, "dropdown-menu", "show", "w-100", "mt-1", "shadow", 2, "max-height", "200px", "overflow-y", "auto", "position", "absolute", "z-index", "1050"], [1, "dropdown-menu", "show", "w-100", "mt-1", "shadow", "text-center", "py-3", 2, "position", "absolute", "z-index", "1050"], ["type", "text", "formControlName", "costCenter", 1, "form-control", 3, "placeholder"], ["type", "text", "formControlName", "location", 1, "form-control", 3, "placeholder"], ["type", "tel", "formControlName", "phone", 1, "form-control", 3, "placeholder"], ["type", "email", "formControlName", "email", 1, "form-control", 3, "placeholder"], ["type", "number", "formControlName", "sortOrder", "min", "0", 1, "form-control"], [1, "fas", "fa-toggle-on", "me-2"], [1, "form-check", "form-switch"], ["type", "checkbox", "formControlName", "isActive", "id", "isActiveSwitch", 1, "form-check-input"], ["for", "isActiveSwitch", 1, "form-check-label"], [1, "form-actions"], [1, "d-flex", "justify-content-between"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fas", "fa-undo", "me-2"], [1, "d-flex", "gap-2"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], [1, "fas", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-save", "me-2"], [1, "loading-overlay"], [3, "size", "showMessage"], ["type", "button", 1, "dropdown-item", "d-flex", "justify-content-between", "align-items-center"], ["type", "button", 1, "dropdown-item", "d-flex", "justify-content-between", "align-items-center", 3, "click"], [1, "d-flex", "flex-column"], [1, "fw-medium"], [1, "text-muted"], [1, "d-flex", "align-items-center", "justify-content-center", "h-100"], [3, "message", "variant", "centered"]], template: /* @__PURE__ */ __name(function DepartmentFormComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "form", 0);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_form_ngSubmit_0_listener() {
      return ctx.onSubmit();
    }, "DepartmentFormComponent_Template_form_ngSubmit_0_listener"));
    \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "h6", 3);
    \u0275\u0275element(4, "i", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, DepartmentFormComponent_Conditional_6_Template, 5, 11, "div", 5);
    \u0275\u0275elementStart(7, "div", 5)(8, "label", 6);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 7);
    \u0275\u0275conditionalCreate(11, DepartmentFormComponent_Conditional_11_Template, 2, 1, "div", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 5)(13, "label", 9);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 10);
    \u0275\u0275conditionalCreate(16, DepartmentFormComponent_Conditional_16_Template, 2, 1, "div", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 5)(18, "label", 6);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "input", 11);
    \u0275\u0275conditionalCreate(21, DepartmentFormComponent_Conditional_21_Template, 2, 1, "div", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 5)(23, "label", 9);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "app-searchable-select", 12);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_app_searchable_select_selectionChange_25_listener($event) {
      return ctx.onParentDepartmentSelectionChange($event);
    }, "DepartmentFormComponent_Template_app_searchable_select_selectionChange_25_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(26, DepartmentFormComponent_Conditional_26_Template, 2, 1, "div", 8);
    \u0275\u0275elementStart(27, "small", 13);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 5)(30, "label", 9);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275element(32, "textarea", 14);
    \u0275\u0275conditionalCreate(33, DepartmentFormComponent_Conditional_33_Template, 2, 1, "div", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 5)(35, "label", 9);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275element(37, "textarea", 15);
    \u0275\u0275conditionalCreate(38, DepartmentFormComponent_Conditional_38_Template, 2, 1, "div", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 2)(40, "h6", 3);
    \u0275\u0275element(41, "i", 16);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 5)(44, "label", 9);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 17)(47, "input", 18);
    \u0275\u0275listener("input", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_input_input_47_listener($event) {
      return ctx.onManagerSearch($event);
    }, "DepartmentFormComponent_Template_input_input_47_listener"))("focus", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_input_focus_47_listener() {
      return ctx.onManagerFocus();
    }, "DepartmentFormComponent_Template_input_focus_47_listener"))("blur", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_input_blur_47_listener() {
      return ctx.onManagerBlur();
    }, "DepartmentFormComponent_Template_input_blur_47_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(48, DepartmentFormComponent_Conditional_48_Template, 2, 2, "div", 19);
    \u0275\u0275conditionalCreate(49, DepartmentFormComponent_Conditional_49_Template, 3, 0, "div", 20);
    \u0275\u0275conditionalCreate(50, DepartmentFormComponent_Conditional_50_Template, 3, 1, "div", 21);
    \u0275\u0275conditionalCreate(51, DepartmentFormComponent_Conditional_51_Template, 3, 1, "div", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(52, DepartmentFormComponent_Conditional_52_Template, 2, 1, "div", 8);
    \u0275\u0275elementStart(53, "small", 13);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 5)(56, "label", 9);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd();
    \u0275\u0275element(58, "input", 22);
    \u0275\u0275conditionalCreate(59, DepartmentFormComponent_Conditional_59_Template, 2, 1, "div", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "div", 5)(61, "label", 9);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd();
    \u0275\u0275element(63, "input", 23);
    \u0275\u0275conditionalCreate(64, DepartmentFormComponent_Conditional_64_Template, 2, 1, "div", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 5)(66, "label", 9);
    \u0275\u0275text(67);
    \u0275\u0275elementEnd();
    \u0275\u0275element(68, "input", 24);
    \u0275\u0275conditionalCreate(69, DepartmentFormComponent_Conditional_69_Template, 2, 1, "div", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "div", 5)(71, "label", 9);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd();
    \u0275\u0275element(73, "input", 25);
    \u0275\u0275conditionalCreate(74, DepartmentFormComponent_Conditional_74_Template, 2, 1, "div", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "div", 5)(76, "label", 9);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd();
    \u0275\u0275element(78, "input", 26);
    \u0275\u0275conditionalCreate(79, DepartmentFormComponent_Conditional_79_Template, 2, 1, "div", 8);
    \u0275\u0275elementStart(80, "small", 13);
    \u0275\u0275text(81);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(82, "div", 2)(83, "h6", 3);
    \u0275\u0275element(84, "i", 27);
    \u0275\u0275text(85);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(86, "div", 2)(87, "div", 28);
    \u0275\u0275element(88, "input", 29);
    \u0275\u0275elementStart(89, "label", 30);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "small", 13);
    \u0275\u0275text(92);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(93, "div", 31)(94, "div", 32)(95, "div")(96, "button", 33);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_button_click_96_listener() {
      return ctx.onReset();
    }, "DepartmentFormComponent_Template_button_click_96_listener"));
    \u0275\u0275element(97, "i", 34);
    \u0275\u0275text(98);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(99, "div", 35)(100, "button", 36);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DepartmentFormComponent_Template_button_click_100_listener() {
      return ctx.onCancel();
    }, "DepartmentFormComponent_Template_button_click_100_listener"));
    \u0275\u0275element(101, "i", 37);
    \u0275\u0275text(102);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "button", 38);
    \u0275\u0275conditionalCreate(104, DepartmentFormComponent_Conditional_104_Template, 1, 0, "span", 39);
    \u0275\u0275conditionalCreate(105, DepartmentFormComponent_Conditional_105_Template, 1, 0, "i", 40);
    \u0275\u0275text(106);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(107, DepartmentFormComponent_Conditional_107_Template, 3, 3, "div", 41);
  }
  if (rf & 2) {
    let tmp_18_0;
    \u0275\u0275property("formGroup", ctx.form);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.basicInformation"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.isEditMode ? 6 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.name"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("name"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.namePlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("name") ? 11 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.nameAr"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("nameAr"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.nameArPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("nameAr") ? 16 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.code"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("code"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.codePlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("code") ? 21 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.parentDepartment"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("parentDepartmentId"));
    \u0275\u0275property("options", ctx.departmentSelectOptions)("value", ((tmp_18_0 = ctx.form.get("parentDepartmentId")) == null ? null : tmp_18_0.value == null ? null : tmp_18_0.value.toString()) || "")("placeholder", ctx.i18n.t("department.selectParent"))("searchable", true)("clearable", true)("disabled", ctx.loading())("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("parentDepartmentId") ? 26 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("department.parentDepartmentHelp"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("common.description"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("description"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.descriptionPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("description") ? 33 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.descriptionAr"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("descriptionAr"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.descriptionArPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("descriptionAr") ? 38 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("department.additionalInformation"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.manager"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("managerEmployeeId"));
    \u0275\u0275property("value", ctx.managerSearchTerm() || ctx.getSelectedManagerName())("placeholder", ctx.i18n.t("department.selectManager"))("disabled", ctx.loadingManagers());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loadingManagers() ? 48 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showManagerDropdown() && !ctx.loadingManagers() && ctx.filteredManagers().length > 0 ? 49 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showManagerDropdown() && !ctx.loadingManagers() && ctx.filteredManagers().length === 0 && ctx.managerSearchTerm() ? 50 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.isEditMode && ctx.showManagerDropdown() && !ctx.loadingManagers() && ctx.managers().length === 0 ? 51 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("managerEmployeeId") ? 52 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("department.managerHelp"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.costCenter"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("costCenter"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.costCenterPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("costCenter") ? 59 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("department.location"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("location"));
    \u0275\u0275property("placeholder", ctx.i18n.t("department.locationPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("location") ? 64 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("common.phone"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("phone"));
    \u0275\u0275property("placeholder", ctx.i18n.t("common.phonePlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("phone") ? 69 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("common.email"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("email"));
    \u0275\u0275property("placeholder", ctx.i18n.t("common.emailPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("email") ? 74 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("common.sortOrder"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("sortOrder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("sortOrder") ? 79 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.sortOrderHelp"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.status"), " ");
    \u0275\u0275advance(5);
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
    \u0275\u0275conditional(ctx.isSaving() ? 104 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.isSaving() ? 105 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.isSaving() ? ctx.i18n.t("common.saving") : ctx.isEditMode ? ctx.i18n.t("common.update") : ctx.i18n.t("common.save"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 107 : -1);
  }
}, "DepartmentFormComponent_Template"), dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, SearchableSelectComponent, LoadingSpinnerComponent], styles: [`

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
    args: [{ selector: "app-department-form", standalone: true, imports: [CommonModule, ReactiveFormsModule, SearchableSelectComponent, LoadingSpinnerComponent], template: `<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div class="row g-3">
    <!-- Basic Information -->
    <div class="col-12">
      <h6 class="section-title">
        <i class="fas fa-info-circle me-2"></i>
        {{ i18n.t('common.basicInformation') }}
      </h6>
    </div>

    <!-- Branch (only for create mode) -->
    @if (!isEditMode) {
      <div class="col-md-6">
        <label class="form-label required">{{ i18n.t('branch.title') }}</label>
        <app-searchable-select
          [options]="branchSelectOptions"
          [value]="form.get('branchId')?.value?.toString() || ''"
          (selectionChange)="onBranchSelectionChange($event)"
          [placeholder]="i18n.t('branch.select')"
          [searchable]="true"
          [clearable]="false"
          [disabled]="loadingBranches()"
          [loading]="loadingBranches()"
          [class.is-invalid]="isFieldInvalid('branchId')"
        ></app-searchable-select>
        @if (isFieldInvalid('branchId')) {
          <div class="invalid-feedback">
            {{ getFieldError('branchId') }}
          </div>
        }
      </div>
    }

    <!-- Name -->
    <div class="col-md-6">
      <label class="form-label required">{{ i18n.t('department.name') }}</label>
      <input
        type="text"
        class="form-control"
        formControlName="name"
        [class.is-invalid]="isFieldInvalid('name')"
        [placeholder]="i18n.t('department.namePlaceholder')"
      />
      @if (isFieldInvalid('name')) {
        <div class="invalid-feedback">
          {{ getFieldError('name') }}
        </div>
      }
    </div>

    <!-- Arabic Name -->
    <div class="col-md-6">
      <label class="form-label">{{ i18n.t('department.nameAr') }}</label>
      <input
        type="text"
        class="form-control"
        formControlName="nameAr"
        [class.is-invalid]="isFieldInvalid('nameAr')"
        [placeholder]="i18n.t('department.nameArPlaceholder')"
        dir="rtl"
      />
      @if (isFieldInvalid('nameAr')) {
        <div class="invalid-feedback">
          {{ getFieldError('nameAr') }}
        </div>
      }
    </div>

    <!-- Code -->
    <div class="col-md-6">
      <label class="form-label required">{{ i18n.t('department.code') }}</label>
      <input
        type="text"
        class="form-control"
        formControlName="code"
        [class.is-invalid]="isFieldInvalid('code')"
        [placeholder]="i18n.t('department.codePlaceholder')"
        style="text-transform: uppercase;"
      />
      @if (isFieldInvalid('code')) {
        <div class="invalid-feedback">
          {{ getFieldError('code') }}
        </div>
      }
    </div>

    <!-- Parent Department -->
    <div class="col-md-6">
      <label class="form-label">{{ i18n.t('department.parentDepartment') }}</label>
      <app-searchable-select
        [options]="departmentSelectOptions"
        [value]="form.get('parentDepartmentId')?.value?.toString() || ''"
        (selectionChange)="onParentDepartmentSelectionChange($event)"
        [placeholder]="i18n.t('department.selectParent')"
        [searchable]="true"
        [clearable]="true"
        [disabled]="loading()"
        [loading]="loading()"
        [class.is-invalid]="isFieldInvalid('parentDepartmentId')"
      ></app-searchable-select>
      @if (isFieldInvalid('parentDepartmentId')) {
        <div class="invalid-feedback">
          {{ getFieldError('parentDepartmentId') }}
        </div>
      }
      <small class="form-text text-muted">
        {{ i18n.t('department.parentDepartmentHelp') }}
      </small>
    </div>

    <!-- Description -->
    <div class="col-md-6">
      <label class="form-label">{{ i18n.t('common.description') }}</label>
      <textarea
        class="form-control"
        formControlName="description"
        [class.is-invalid]="isFieldInvalid('description')"
        [placeholder]="i18n.t('department.descriptionPlaceholder')"
        rows="3"
      ></textarea>
      @if (isFieldInvalid('description')) {
        <div class="invalid-feedback">
          {{ getFieldError('description') }}
        </div>
      }
    </div>

    <!-- Arabic Description -->
    <div class="col-md-6">
      <label class="form-label">{{ i18n.t('department.descriptionAr') }}</label>
      <textarea
        class="form-control"
        formControlName="descriptionAr"
        [class.is-invalid]="isFieldInvalid('descriptionAr')"
        [placeholder]="i18n.t('department.descriptionArPlaceholder')"
        rows="3"
        dir="rtl"
      ></textarea>
      @if (isFieldInvalid('descriptionAr')) {
        <div class="invalid-feedback">
          {{ getFieldError('descriptionAr') }}
        </div>
      }
    </div>

    <!-- Additional Information -->
    <div class="col-12">
      <h6 class="section-title">
        <i class="fas fa-cog me-2"></i>
        {{ i18n.t('department.additionalInformation') }}
      </h6>
    </div>

    <!-- Manager -->
    <div class="col-md-6">
      <label class="form-label">{{ i18n.t('department.manager') }}</label>
      <div class="position-relative">
        <input
          type="text"
          class="form-control"
          [value]="managerSearchTerm() || getSelectedManagerName()"
          [class.is-invalid]="isFieldInvalid('managerEmployeeId')"
          [placeholder]="i18n.t('department.selectManager')"
          (input)="onManagerSearch($event)"
          (focus)="onManagerFocus()"
          (blur)="onManagerBlur()"
          [disabled]="loadingManagers()"
        />

        <!-- Loading indicator -->
        @if (loadingManagers()) {
          <div class="position-absolute top-50 end-0 translate-middle-y me-3">
            <app-loading-spinner
              [size]="'sm'"
              [showMessage]="false">
            </app-loading-spinner>
          </div>
        }

        <!-- Dropdown -->
        @if (showManagerDropdown() && !loadingManagers() && filteredManagers().length > 0) {
          <div
            class="dropdown-menu show w-100 mt-1 shadow"
            style="max-height: 200px; overflow-y: auto; position: absolute; z-index: 1050;"
          >
            @for (manager of filteredManagers(); track $index) {
              <button
                type="button"
                class="dropdown-item d-flex justify-content-between align-items-center"
                (click)="onSelectManager(manager)"
              >
                <div class="d-flex flex-column">
                  <span class="fw-medium">{{ manager.name }}</span>
                  <small class="text-muted">{{ manager.employeeNumber }}</small>
                </div>
              </button>
            }
          </div>
        }

        <!-- No results -->
        @if (showManagerDropdown() && !loadingManagers() && filteredManagers().length === 0 && managerSearchTerm()) {
          <div
            class="dropdown-menu show w-100 mt-1 shadow text-center py-3"
            style="position: absolute; z-index: 1050;"
          >
            <span class="text-muted">{{ i18n.t('common.noResultsFound') }}</span>
          </div>
        }

        <!-- No branch selected message for create mode -->
        @if (!isEditMode && showManagerDropdown() && !loadingManagers() && managers().length === 0) {
          <div
            class="dropdown-menu show w-100 mt-1 shadow text-center py-3"
            style="position: absolute; z-index: 1050;"
          >
            <span class="text-muted">{{ i18n.t('department.selectBranchFirst') }}</span>
          </div>
        }
      </div>

      @if (isFieldInvalid('managerEmployeeId')) {
        <div class="invalid-feedback">
          {{ getFieldError('managerEmployeeId') }}
        </div>
      }
      <small class="form-text text-muted">
        {{ i18n.t('department.managerHelp') }}
      </small>
    </div>

    <!-- Cost Center -->
    <div class="col-md-6">
      <label class="form-label">{{ i18n.t('department.costCenter') }}</label>
      <input
        type="text"
        class="form-control"
        formControlName="costCenter"
        [class.is-invalid]="isFieldInvalid('costCenter')"
        [placeholder]="i18n.t('department.costCenterPlaceholder')"
      />
      @if (isFieldInvalid('costCenter')) {
        <div class="invalid-feedback">
          {{ getFieldError('costCenter') }}
        </div>
      }
    </div>

    <!-- Location -->
    <div class="col-md-6">
      <label class="form-label">{{ i18n.t('department.location') }}</label>
      <input
        type="text"
        class="form-control"
        formControlName="location"
        [class.is-invalid]="isFieldInvalid('location')"
        [placeholder]="i18n.t('department.locationPlaceholder')"
      />
      @if (isFieldInvalid('location')) {
        <div class="invalid-feedback">
          {{ getFieldError('location') }}
        </div>
      }
    </div>

    <!-- Phone -->
    <div class="col-md-6">
      <label class="form-label">{{ i18n.t('common.phone') }}</label>
      <input
        type="tel"
        class="form-control"
        formControlName="phone"
        [class.is-invalid]="isFieldInvalid('phone')"
        [placeholder]="i18n.t('common.phonePlaceholder')"
      />
      @if (isFieldInvalid('phone')) {
        <div class="invalid-feedback">
          {{ getFieldError('phone') }}
        </div>
      }
    </div>

    <!-- Email -->
    <div class="col-md-6">
      <label class="form-label">{{ i18n.t('common.email') }}</label>
      <input
        type="email"
        class="form-control"
        formControlName="email"
        [class.is-invalid]="isFieldInvalid('email')"
        [placeholder]="i18n.t('common.emailPlaceholder')"
      />
      @if (isFieldInvalid('email')) {
        <div class="invalid-feedback">
          {{ getFieldError('email') }}
        </div>
      }
    </div>

    <!-- Sort Order -->
    <div class="col-md-6">
      <label class="form-label">{{ i18n.t('common.sortOrder') }}</label>
      <input
        type="number"
        class="form-control"
        formControlName="sortOrder"
        [class.is-invalid]="isFieldInvalid('sortOrder')"
        min="0"
      />
      @if (isFieldInvalid('sortOrder')) {
        <div class="invalid-feedback">
          {{ getFieldError('sortOrder') }}
        </div>
      }
      <small class="form-text text-muted">
        {{ i18n.t('common.sortOrderHelp') }}
      </small>
    </div>

    <!-- Status -->
    <div class="col-12">
      <h6 class="section-title">
        <i class="fas fa-toggle-on me-2"></i>
        {{ i18n.t('common.status') }}
      </h6>
    </div>

    <!-- Active Status -->
    <div class="col-12">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          formControlName="isActive"
          id="isActiveSwitch"
        />
        <label class="form-check-label" for="isActiveSwitch">
          {{ i18n.t('department.isActive') }}
        </label>
      </div>
      <small class="form-text text-muted">
        {{ i18n.t('department.isActiveHelp') }}
      </small>
    </div>
  </div>

  <!-- Form Actions -->
  <div class="form-actions">
    <div class="d-flex justify-content-between">
      <div>
        <button
          type="button"
          class="btn btn-outline-secondary"
          (click)="onReset()"
          [disabled]="isSaving()"
        >
          <i class="fas fa-undo me-2"></i>
          {{ i18n.t('common.reset') }}
        </button>
      </div>
      <div class="d-flex gap-2">
        <button
          type="button"
          class="btn btn-secondary"
          (click)="onCancel()"
          [disabled]="isSaving()"
        >
          <i class="fas fa-times me-2"></i>
          {{ i18n.t('common.cancel') }}
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          [disabled]="form.invalid || isSaving()"
        >
          @if (isSaving()) {
            <span class="spinner-border spinner-border-sm me-2"></span>
          }
          @if (!isSaving()) {
            <i class="fas fa-save me-2"></i>
          }
          {{ isSaving() ? i18n.t('common.saving') : (isEditMode ? i18n.t('common.update') : i18n.t('common.save')) }}
        </button>
      </div>
    </div>
  </div>
</form>

<!-- Loading Overlay -->
@if (loading()) {
  <div class="loading-overlay">
    <div class="d-flex align-items-center justify-content-center h-100">
      <app-loading-spinner
        [message]="i18n.t('common.loading')"
        [variant]="'primary'"
        [centered]="true">
      </app-loading-spinner>
    </div>
  </div>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DepartmentFormComponent, { className: "DepartmentFormComponent", filePath: "src/app/pages/departments/department-form/department-form.component.ts", lineNumber: 20 });
})();

export {
  DepartmentFormComponent
};
//# sourceMappingURL=chunk-NPKXPAUE.js.map
