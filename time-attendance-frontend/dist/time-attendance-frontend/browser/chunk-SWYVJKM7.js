import {
  SearchableSelectComponent
} from "./chunk-YPZLTOXZ.js";
import {
  FormSectionComponent
} from "./chunk-I3BAAGQQ.js";
import {
  UsersService
} from "./chunk-P7LM43DG.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-CVUMC7BN.js";
import {
  Router,
  RouterLink,
  RouterModule
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/users/user-form/user-form.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function UserFormComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "i", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(UserFormComponent_Conditional_21_Template, "UserFormComponent_Conditional_21_Template");
function UserFormComponent_Conditional_23_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275element(1, "i", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("employeeId"), " ");
  }
}
__name(UserFormComponent_Conditional_23_Conditional_6_Template, "UserFormComponent_Conditional_23_Conditional_6_Template");
function UserFormComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "label", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 18);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "app-searchable-select", 40);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function UserFormComponent_Conditional_23_Template_app_searchable_select_selectionChange_5_listener($event) {
      let tmp_3_0;
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      ctx_r0.onEmployeeSelected($event);
      return \u0275\u0275resetView((tmp_3_0 = ctx_r0.userForm.get("employeeId")) == null ? null : tmp_3_0.setValue($event));
    }, "UserFormComponent_Conditional_23_Template_app_searchable_select_selectionChange_5_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, UserFormComponent_Conditional_23_Conditional_6_Template, 3, 1, "div", 41);
    \u0275\u0275elementStart(7, "small", 28);
    \u0275\u0275element(8, "i", 42);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.t("users.employee"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r0.employeeOptions())("value", (tmp_3_0 = ctx_r0.userForm.get("employeeId")) == null ? null : tmp_3_0.value)("placeholder", ctx_r0.t("common.select"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("employeeId") ? 6 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("users.employee_help"), " ");
  }
}
__name(UserFormComponent_Conditional_23_Template, "UserFormComponent_Conditional_23_Template");
function UserFormComponent_Conditional_24_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("username"));
  }
}
__name(UserFormComponent_Conditional_24_Conditional_6_Template, "UserFormComponent_Conditional_24_Conditional_6_Template");
function UserFormComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "label", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 18);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "input", 44);
    \u0275\u0275conditionalCreate(6, UserFormComponent_Conditional_24_Conditional_6_Template, 2, 1, "div", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.t("users.username"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("username"));
    \u0275\u0275property("placeholder", ctx_r0.t("users.username"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("username") ? 6 : -1);
  }
}
__name(UserFormComponent_Conditional_24_Template, "UserFormComponent_Conditional_24_Template");
function UserFormComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("email"));
  }
}
__name(UserFormComponent_Conditional_31_Template, "UserFormComponent_Conditional_31_Template");
function UserFormComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("phone"));
  }
}
__name(UserFormComponent_Conditional_36_Template, "UserFormComponent_Conditional_36_Template");
function UserFormComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("preferredLanguage"));
  }
}
__name(UserFormComponent_Conditional_47_Template, "UserFormComponent_Conditional_47_Template");
function UserFormComponent_Conditional_48_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("password"));
  }
}
__name(UserFormComponent_Conditional_48_Conditional_6_Template, "UserFormComponent_Conditional_48_Conditional_6_Template");
function UserFormComponent_Conditional_48_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("confirmPassword"));
  }
}
__name(UserFormComponent_Conditional_48_Conditional_15_Template, "UserFormComponent_Conditional_48_Conditional_15_Template");
function UserFormComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "label", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 18);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "input", 45);
    \u0275\u0275conditionalCreate(6, UserFormComponent_Conditional_48_Conditional_6_Template, 2, 1, "div", 20);
    \u0275\u0275elementStart(7, "small", 28);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 16)(10, "label", 17);
    \u0275\u0275text(11);
    \u0275\u0275elementStart(12, "span", 18);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(14, "input", 46);
    \u0275\u0275conditionalCreate(15, UserFormComponent_Conditional_48_Conditional_15_Template, 2, 1, "div", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.t("users.password"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("password"));
    \u0275\u0275property("placeholder", ctx_r0.t("users.password"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("password") ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("auth.password_requirements"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.t("users.confirm_password"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("confirmPassword"));
    \u0275\u0275property("placeholder", ctx_r0.t("users.confirm_password"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("confirmPassword") ? 15 : -1);
  }
}
__name(UserFormComponent_Conditional_48_Template, "UserFormComponent_Conditional_48_Template");
function UserFormComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "label", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 25);
    \u0275\u0275element(4, "input", 47);
    \u0275\u0275elementStart(5, "label", 48);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.status"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.active"), " ");
  }
}
__name(UserFormComponent_Conditional_49_Template, "UserFormComponent_Conditional_49_Template");
function UserFormComponent_Conditional_66_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50)(2, "input", 51);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function UserFormComponent_Conditional_66_For_2_Template_input_change_2_listener() {
      const role_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onRoleToggle(role_r4.id));
    }, "UserFormComponent_Conditional_66_For_2_Template_input_change_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 52);
    \u0275\u0275element(4, "i", 53);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const role_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "role-" + role_r4.id)("checked", ctx_r0.isRoleSelected(role_r4.id));
    \u0275\u0275advance();
    \u0275\u0275property("for", "role-" + role_r4.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", role_r4.name, " ");
  }
}
__name(UserFormComponent_Conditional_66_For_2_Template, "UserFormComponent_Conditional_66_For_2_Template");
function UserFormComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275repeaterCreate(1, UserFormComponent_Conditional_66_For_2_Template, 6, 4, "div", 49, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.availableRoles());
  }
}
__name(UserFormComponent_Conditional_66_Template, "UserFormComponent_Conditional_66_Template");
function UserFormComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275element(1, "i", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.loading"), "... ");
  }
}
__name(UserFormComponent_Conditional_67_Template, "UserFormComponent_Conditional_67_Template");
function UserFormComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275element(1, "i", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("roleIds"), " ");
  }
}
__name(UserFormComponent_Conditional_68_Template, "UserFormComponent_Conditional_68_Template");
function UserFormComponent_Conditional_73_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50)(2, "input", 51);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function UserFormComponent_Conditional_73_For_2_Template_input_change_2_listener() {
      const branch_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onBranchToggle(branch_r6.id));
    }, "UserFormComponent_Conditional_73_For_2_Template_input_change_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 52);
    \u0275\u0275element(4, "i", 55);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const branch_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "branch-" + branch_r6.id)("checked", ctx_r0.isBranchSelected(branch_r6.id));
    \u0275\u0275advance();
    \u0275\u0275property("for", "branch-" + branch_r6.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", branch_r6.name, " ");
  }
}
__name(UserFormComponent_Conditional_73_For_2_Template, "UserFormComponent_Conditional_73_For_2_Template");
function UserFormComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275repeaterCreate(1, UserFormComponent_Conditional_73_For_2_Template, 6, 4, "div", 49, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.availableBranches());
  }
}
__name(UserFormComponent_Conditional_73_Template, "UserFormComponent_Conditional_73_Template");
function UserFormComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275element(1, "i", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.loading"), "... ");
  }
}
__name(UserFormComponent_Conditional_74_Template, "UserFormComponent_Conditional_74_Template");
function UserFormComponent_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 38);
  }
}
__name(UserFormComponent_Conditional_83_Template, "UserFormComponent_Conditional_83_Template");
function UserFormComponent_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 56);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.save"), " ");
  }
}
__name(UserFormComponent_Conditional_84_Template, "UserFormComponent_Conditional_84_Template");
function UserFormComponent_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 57);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("users.create_user"), " ");
  }
}
__name(UserFormComponent_Conditional_85_Template, "UserFormComponent_Conditional_85_Template");
var _UserFormComponent = class _UserFormComponent {
  user = null;
  show = false;
  showChange = new EventEmitter();
  userSaved = new EventEmitter();
  userCreated = new EventEmitter();
  fb = inject(FormBuilder);
  usersService = inject(UsersService);
  router = inject(Router);
  i18n = inject(I18nService);
  userForm;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  availableRoles = signal([], ...ngDevMode ? [{ debugName: "availableRoles" }] : []);
  availableBranches = signal([], ...ngDevMode ? [{ debugName: "availableBranches" }] : []);
  availableEmployees = signal([], ...ngDevMode ? [{ debugName: "availableEmployees" }] : []);
  selectedEmployee = signal(null, ...ngDevMode ? [{ debugName: "selectedEmployee" }] : []);
  isEditMode = computed(() => !!this.user, ...ngDevMode ? [{ debugName: "isEditMode" }] : []);
  isSystemAdmin = computed(() => {
    return this.user?.username?.toLowerCase() === "systemadmin";
  }, ...ngDevMode ? [{ debugName: "isSystemAdmin" }] : []);
  modalTitle = computed(() => this.isEditMode() ? this.t("users.edit_user") : this.t("users.create_user"), ...ngDevMode ? [{ debugName: "modalTitle" }] : []);
  // Transform employees to SearchableSelectOption format
  employeeOptions = computed(() => this.availableEmployees().map((emp) => ({
    value: emp.id,
    label: emp.fullName || `${emp.employeeNumber}`,
    subLabel: emp.email || emp.employeeNumber
  })), ...ngDevMode ? [{ debugName: "employeeOptions" }] : []);
  ngOnInit() {
    this.initializeForm();
    this.loadRoles();
    this.loadBranches();
    this.loadAvailableEmployees();
  }
  ngOnChanges() {
    if (this.userForm && this.user) {
      this.populateForm();
    }
  }
  t(key) {
    return this.i18n.t(key);
  }
  initializeForm() {
    const isSystemAdminUser = this.isSystemAdmin();
    const isCreateMode = !this.isEditMode();
    this.userForm = this.fb.group({
      username: [
        { value: "", disabled: this.isEditMode() || isSystemAdminUser || isCreateMode },
        [Validators.required, Validators.minLength(3)]
      ],
      email: [
        { value: "", disabled: isSystemAdminUser || isCreateMode },
        [Validators.required, Validators.email]
      ],
      phone: [{ value: "", disabled: isSystemAdminUser }],
      password: [
        { value: "", disabled: !isCreateMode || isSystemAdminUser },
        isCreateMode ? [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
        ] : []
      ],
      confirmPassword: [
        { value: "", disabled: !isCreateMode || isSystemAdminUser },
        isCreateMode ? [Validators.required] : []
      ],
      preferredLanguage: [
        { value: "en", disabled: isSystemAdminUser },
        Validators.required
      ],
      roleIds: [
        { value: [], disabled: isSystemAdminUser },
        Validators.required
      ],
      branchIds: [{ value: [], disabled: isSystemAdminUser }],
      employeeId: [
        { value: null, disabled: this.isEditMode() || isSystemAdminUser },
        isCreateMode && !isSystemAdminUser ? [Validators.required] : []
      ],
      mustChangePassword: [{ value: false, disabled: isSystemAdminUser }]
    });
    if (isCreateMode) {
      this.userForm.get("confirmPassword")?.setValidators([
        Validators.required,
        this.passwordMatchValidator.bind(this)
      ]);
    }
    if (this.isEditMode()) {
      this.userForm.addControl("isActive", this.fb.control({ value: true, disabled: isSystemAdminUser }));
    }
    if (this.user) {
      this.populateForm();
    }
  }
  populateForm() {
    if (!this.user || !this.userForm)
      return;
    const roleIds = (this.user.roles || []).map((roleName) => {
      const role = this.availableRoles().find((r) => r.name === roleName);
      return role?.id || 0;
    }).filter((id) => id > 0);
    const branchIds = (this.user.branches || []).map((branchName) => {
      const branch = this.availableBranches().find((b) => b.name === branchName);
      return branch?.id || 0;
    }).filter((id) => id > 0);
    this.userForm.patchValue({
      username: this.user.username,
      email: this.user.email,
      phone: this.user.phone || "",
      preferredLanguage: this.user.preferredLanguage,
      roleIds,
      branchIds,
      isActive: this.user.isActive,
      mustChangePassword: this.user.mustChangePassword
    });
  }
  onEmployeeSelected(employeeId) {
    if (employeeId) {
      const employee = this.availableEmployees().find((e) => e.id === employeeId);
      if (employee) {
        this.selectedEmployee.set(employee);
        let username = employee.employeeNumber || "";
        if (employee.email) {
          username = employee.email.split("@")[0];
        }
        this.userForm.patchValue({
          username,
          email: employee.email || ""
        });
      }
    } else {
      this.selectedEmployee.set(null);
      this.userForm.patchValue({
        username: "",
        email: ""
      });
    }
  }
  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if (this.isSystemAdmin()) {
      this.error.set(this.t("users.cannot_edit_system_admin"));
      return;
    }
    this.loading.set(true);
    this.error.set("");
    const formValue = this.userForm.getRawValue();
    if (this.isEditMode()) {
      this.updateUser(formValue);
    } else {
      this.createUser(formValue);
    }
  }
  createUser(formValue) {
    const request = {
      username: formValue.username,
      email: formValue.email,
      phone: formValue.phone || void 0,
      password: formValue.password,
      preferredLanguage: formValue.preferredLanguage,
      mustChangePassword: formValue.mustChangePassword || false,
      roleIds: formValue.roleIds,
      branchIds: formValue.branchIds,
      employeeId: formValue.employeeId || void 0
    };
    this.usersService.createUser(request).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.loading.set(false);
        this.usersService.getUserById(response.id).subscribe({
          next: /* @__PURE__ */ __name((user) => {
            this.userCreated.emit(user);
            this.closeModal();
          }, "next")
        });
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.loading.set(false);
        this.error.set(this.getErrorMessage(error));
      }, "error")
    });
  }
  updateUser(formValue) {
    if (!this.user)
      return;
    const request = {
      email: formValue.email,
      phone: formValue.phone || void 0,
      preferredLanguage: formValue.preferredLanguage,
      isActive: formValue.isActive,
      mustChangePassword: formValue.mustChangePassword || false
    };
    this.usersService.updateUser(this.user.id, request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.loading.set(false);
        this.usersService.getUserById(this.user.id).subscribe({
          next: /* @__PURE__ */ __name((user) => {
            this.userSaved.emit(user);
            this.closeModal();
          }, "next")
        });
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.loading.set(false);
        this.error.set(this.getErrorMessage(error));
      }, "error")
    });
  }
  onRoleToggle(roleId) {
    const currentRoles = this.userForm.get("roleIds")?.value || [];
    const index = currentRoles.indexOf(roleId);
    if (index > -1) {
      currentRoles.splice(index, 1);
    } else {
      currentRoles.push(roleId);
    }
    this.userForm.get("roleIds")?.setValue([...currentRoles]);
    this.userForm.get("roleIds")?.markAsTouched();
  }
  onBranchToggle(branchId) {
    const currentBranches = this.userForm.get("branchIds")?.value || [];
    const index = currentBranches.indexOf(branchId);
    if (index > -1) {
      currentBranches.splice(index, 1);
    } else {
      currentBranches.push(branchId);
    }
    this.userForm.get("branchIds")?.setValue([...currentBranches]);
  }
  isRoleSelected(roleId) {
    const roles = this.userForm.get("roleIds")?.value || [];
    return roles.includes(roleId);
  }
  isBranchSelected(branchId) {
    const branches = this.userForm.get("branchIds")?.value || [];
    return branches.includes(branchId);
  }
  closeModal() {
    this.router.navigate(["/users"]);
  }
  getErrorMessage(error) {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.t("errors.unknown");
  }
  // Form field helpers
  getFieldError(fieldName) {
    const field = this.userForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors["required"]) {
        return this.t("validation.required");
      }
      if (field.errors["email"]) {
        return this.t("validation.email");
      }
      if (field.errors["minlength"]) {
        return this.t("validation.minlength").replace("{{min}}", field.errors["minlength"].requiredLength);
      }
      if (field.errors["pattern"] && fieldName === "password") {
        return "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.";
      }
      if (field.errors["passwordMismatch"]) {
        return "Passwords do not match.";
      }
    }
    return "";
  }
  passwordMatchValidator(control) {
    const password = this.userForm?.get("password")?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  loadRoles() {
    this.usersService.getRoles().subscribe({
      next: /* @__PURE__ */ __name((roles) => {
        this.availableRoles.set(roles);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load roles:", error);
      }, "error")
    });
  }
  loadBranches() {
    this.usersService.getBranches().subscribe({
      next: /* @__PURE__ */ __name((branches) => {
        this.availableBranches.set(branches);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches:", error);
      }, "error")
    });
  }
  loadAvailableEmployees() {
    this.usersService.getAvailableEmployees().subscribe({
      next: /* @__PURE__ */ __name((employees) => {
        this.availableEmployees.set(employees);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load employees:", error);
      }, "error")
    });
  }
  isFieldInvalid(fieldName) {
    const field = this.userForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }
};
__name(_UserFormComponent, "UserFormComponent");
__publicField(_UserFormComponent, "\u0275fac", /* @__PURE__ */ __name(function UserFormComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UserFormComponent)();
}, "UserFormComponent_Factory"));
__publicField(_UserFormComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserFormComponent, selectors: [["app-user-form"]], inputs: { user: "user", show: "show" }, outputs: { showChange: "showChange", userSaved: "userSaved", userCreated: "userCreated" }, features: [\u0275\u0275NgOnChangesFeature], decls: 86, vars: 45, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], ["aria-label", "breadcrumb"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["routerLink", "/dashboard"], ["routerLink", "/users"], [1, "breadcrumb-item", "active"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fa-solid", "fa-arrow-left", "me-2"], [3, "title"], [1, "card-body"], [3, "ngSubmit", "formGroup"], ["role", "alert", 1, "alert", "alert-danger"], [1, "row", "g-3"], [1, "col-md-12"], [1, "col-md-6"], [1, "form-label"], [1, "text-danger"], ["type", "email", "formControlName", "email", 1, "form-control", 3, "placeholder", "readonly"], [1, "invalid-feedback"], ["type", "tel", "formControlName", "phone", 1, "form-control", 3, "placeholder"], ["formControlName", "preferredLanguage", 1, "form-select"], ["value", "en"], ["value", "ar"], [1, "form-check", "form-switch", "mt-2"], ["type", "checkbox", "role", "switch", "id", "mustChangePasswordSwitch", "formControlName", "mustChangePassword", 1, "form-check-input"], ["for", "mustChangePasswordSwitch", 1, "form-check-label"], [1, "form-text", "text-muted"], [1, "mb-3"], [1, "border", "rounded", "p-3", "bg-light"], [1, "text-muted", "text-center", "py-3"], [1, "text-danger", "small", "mt-2"], [1, "form-text", "text-muted", "d-block", "mt-3", "px-2"], [1, "fa-solid", "fa-info-circle", "me-1", "text-info"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4"], [1, "fa-solid", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"], [3, "selectionChange", "options", "value", "placeholder"], [1, "text-danger", "small", "mt-1"], [1, "fa-solid", "fa-info-circle", "me-1"], [1, "fa-solid", "fa-exclamation-triangle", "me-1"], ["type", "text", "formControlName", "username", "readonly", "", 1, "form-control", 3, "placeholder"], ["type", "password", "formControlName", "password", 1, "form-control", 3, "placeholder"], ["type", "password", "formControlName", "confirmPassword", 1, "form-control", 3, "placeholder"], ["type", "checkbox", "role", "switch", "id", "isActiveSwitch", "formControlName", "isActive", 1, "form-check-input"], ["for", "isActiveSwitch", 1, "form-check-label"], [1, "col-md-6", "col-lg-4"], [1, "form-check", "p-2", "border", "rounded", "bg-white"], ["type", "checkbox", 1, "form-check-input", 3, "change", "id", "checked"], [1, "form-check-label", "fw-medium", 3, "for"], [1, "fa-solid", "fa-shield-alt", "me-2", "text-primary"], [1, "fa-solid", "fa-spinner", "fa-spin", "me-2"], [1, "fa-solid", "fa-building", "me-2", "text-success"], [1, "fa-solid", "fa-save", "me-2"], [1, "fa-solid", "fa-plus", "me-2"]], template: /* @__PURE__ */ __name(function UserFormComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "nav", 2)(6, "ol", 3)(7, "li", 4)(8, "a", 5);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "li", 4)(11, "a", 6);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "li", 7);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "button", 8);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function UserFormComponent_Template_button_click_15_listener() {
      return ctx.closeModal();
    }, "UserFormComponent_Template_button_click_15_listener"));
    \u0275\u0275element(16, "i", 9);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "app-form-section", 10)(19, "div", 11)(20, "form", 12);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function UserFormComponent_Template_form_ngSubmit_20_listener() {
      return ctx.onSubmit();
    }, "UserFormComponent_Template_form_ngSubmit_20_listener"));
    \u0275\u0275conditionalCreate(21, UserFormComponent_Conditional_21_Template, 3, 1, "div", 13);
    \u0275\u0275elementStart(22, "div", 14);
    \u0275\u0275conditionalCreate(23, UserFormComponent_Conditional_23_Template, 10, 6, "div", 15);
    \u0275\u0275conditionalCreate(24, UserFormComponent_Conditional_24_Template, 7, 5, "div", 16);
    \u0275\u0275elementStart(25, "div", 16)(26, "label", 17);
    \u0275\u0275text(27);
    \u0275\u0275elementStart(28, "span", 18);
    \u0275\u0275text(29, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(30, "input", 19);
    \u0275\u0275conditionalCreate(31, UserFormComponent_Conditional_31_Template, 2, 1, "div", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 16)(33, "label", 17);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "input", 21);
    \u0275\u0275conditionalCreate(36, UserFormComponent_Conditional_36_Template, 2, 1, "div", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 16)(38, "label", 17);
    \u0275\u0275text(39);
    \u0275\u0275elementStart(40, "span", 18);
    \u0275\u0275text(41, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "select", 22)(43, "option", 23);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "option", 24);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(47, UserFormComponent_Conditional_47_Template, 2, 1, "div", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(48, UserFormComponent_Conditional_48_Template, 16, 11);
    \u0275\u0275conditionalCreate(49, UserFormComponent_Conditional_49_Template, 7, 2, "div", 16);
    \u0275\u0275elementStart(50, "div", 16)(51, "label", 17);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 25);
    \u0275\u0275element(54, "input", 26);
    \u0275\u0275elementStart(55, "label", 27);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "small", 28);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "app-form-section", 10)(60, "div", 29)(61, "label", 17);
    \u0275\u0275text(62);
    \u0275\u0275elementStart(63, "span", 18);
    \u0275\u0275text(64, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "div", 30);
    \u0275\u0275conditionalCreate(66, UserFormComponent_Conditional_66_Template, 3, 0, "div", 14)(67, UserFormComponent_Conditional_67_Template, 3, 1, "div", 31);
    \u0275\u0275conditionalCreate(68, UserFormComponent_Conditional_68_Template, 3, 1, "div", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "div", 29)(70, "label", 17);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "div", 30);
    \u0275\u0275conditionalCreate(73, UserFormComponent_Conditional_73_Template, 3, 0, "div", 14)(74, UserFormComponent_Conditional_74_Template, 3, 1, "div", 31);
    \u0275\u0275elementStart(75, "small", 33);
    \u0275\u0275element(76, "i", 34);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(78, "div", 35)(79, "button", 8);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function UserFormComponent_Template_button_click_79_listener() {
      return ctx.closeModal();
    }, "UserFormComponent_Template_button_click_79_listener"));
    \u0275\u0275element(80, "i", 36);
    \u0275\u0275text(81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "button", 37);
    \u0275\u0275conditionalCreate(83, UserFormComponent_Conditional_83_Template, 1, 0, "span", 38);
    \u0275\u0275conditionalCreate(84, UserFormComponent_Conditional_84_Template, 2, 1)(85, UserFormComponent_Conditional_85_Template, 2, 1);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.modalTitle());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.t("dashboard.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("users.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.modalTitle());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.loading());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.back"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("users.user_information"));
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx.userForm);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 21 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx.isEditMode() && !ctx.isSystemAdmin() ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.isEditMode() ? 24 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("users.email"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("email"));
    \u0275\u0275property("placeholder", ctx.t("users.email"))("readonly", !ctx.isEditMode());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("email") ? 31 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("users.phone"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("phone"));
    \u0275\u0275property("placeholder", ctx.t("users.phone"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("phone") ? 36 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("users.language"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("preferredLanguage"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.language_english"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.language_arabic"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("preferredLanguage") ? 47 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.isEditMode() ? 48 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isEditMode() ? 49 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("users.password_status"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("users.must_change_password"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("users.must_change_password_hint"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("users.permissions"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("users.roles"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx.availableRoles().length > 0 ? 66 : 67);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.isFieldInvalid("roleIds") ? 68 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("users.branches"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.availableBranches().length > 0 ? 73 : 74);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("users.branches_help"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.loading());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.userForm.invalid || ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 83 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isEditMode() ? 84 : 85);
  }
}, "UserFormComponent_Template"), dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterModule, RouterLink, FormSectionComponent, SearchableSelectComponent], styles: ["\n\n.modal.show[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  margin: 2rem auto;\n}\n.modal-content[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.5rem;\n}\n.modal-header[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem 0.5rem 0 0;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-dark);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-top: 1px solid var(--bs-border-color);\n  border-radius: 0 0 0.5rem 0.5rem;\n}\n.form-check[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.375rem;\n  background-color: var(--bs-light);\n  transition: all 0.2s ease;\n}\n.form-check[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-primary-bg-subtle);\n  border-color: var(--bs-primary-border-subtle);\n}\n.form-check-input[_ngcontent-%COMP%]:checked    + .form-check-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-primary);\n}\n.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 1.25rem;\n}\n.form-switch[_ngcontent-%COMP%]   .form-check-input#isActiveSwitch[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-success);\n  border-color: var(--bs-success);\n}\n.form-switch[_ngcontent-%COMP%]   .form-check-input#mustChangePasswordSwitch[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-warning);\n  border-color: var(--bs-warning);\n}\n.alert[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 0.5rem;\n  margin-bottom: 1rem;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: var(--bs-danger-bg-subtle);\n  color: var(--bs-danger-text);\n  border-left: 4px solid var(--bs-danger);\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  padding: 0.5rem 1rem;\n  font-weight: 500;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-primary-hover, #0056b3);\n  border-color: var(--bs-primary-hover, #0056b3);\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.is-invalid[_ngcontent-%COMP%] {\n  border-color: var(--bs-danger);\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-danger-rgb), 0.25);\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: var(--bs-danger) !important;\n}\n[dir=rtl][_ngcontent-%COMP%]   .modal-dialog[_ngcontent-%COMP%] {\n  margin: 2rem auto;\n}\n[dir=rtl][_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%] {\n  text-align: right;\n}\n[dir=rtl][_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%] {\n  margin-left: 0;\n  margin-right: -1.5em;\n}\n[dir=rtl][_ngcontent-%COMP%]   .form-check-label[_ngcontent-%COMP%] {\n  padding-left: 0;\n  padding-right: 1.5em;\n}\n@media (max-width: 768px) {\n  .modal-dialog[_ngcontent-%COMP%] {\n    margin: 1rem;\n    max-width: none;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .row.g-2[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n  }\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: var(--bs-primary);\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.form-check-input[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.form-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  margin-top: 0.25rem;\n}\n.form-check-input[type=checkbox][_ngcontent-%COMP%] {\n  border-radius: 0.25rem;\n}\n.form-check-input[type=checkbox][_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.spinner-border[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spinner-border 0.75s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spinner-border {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=user-form.component.css.map */"] }));
var UserFormComponent = _UserFormComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserFormComponent, [{
    type: Component,
    args: [{ selector: "app-user-form", standalone: true, imports: [ReactiveFormsModule, RouterModule, FormSectionComponent, SearchableSelectComponent], template: `<div class="container-fluid">
  <!-- Header -->
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h2>{{ modalTitle() }}</h2>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a routerLink="/dashboard">{{ t('dashboard.title') }}</a>
          </li>
          <li class="breadcrumb-item">
            <a routerLink="/users">{{ t('users.title') }}</a>
          </li>
          <li class="breadcrumb-item active">{{ modalTitle() }}</li>
        </ol>
      </nav>
    </div>
    <button 
      type="button" 
      class="btn btn-outline-secondary"
      (click)="closeModal()"
      [disabled]="loading()">
      <i class="fa-solid fa-arrow-left me-2"></i>
      {{ t('common.back') }}
    </button>
  </div>

  <!-- Main Form Card -->
  <app-form-section [title]="t('users.user_information')">
    <div class="card-body">
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
            @if (error()) {
              <div class="alert alert-danger" role="alert">
                <i class="fa-solid fa-exclamation-triangle me-2"></i>
                {{ error() }}
              </div>
            }

            <div class="row g-3">
              <!-- Employee Selection (only for create and not for SystemAdmin) -->
              @if (!isEditMode() && !isSystemAdmin()) {
                <div class="col-md-12">
                  <label class="form-label">{{ t('users.employee') }} <span class="text-danger">*</span></label>
                  <app-searchable-select
                    [options]="employeeOptions()"
                    [value]="userForm.get('employeeId')?.value"
                    [placeholder]="t('common.select')"
                    (selectionChange)="onEmployeeSelected($event); userForm.get('employeeId')?.setValue($event)"
                  ></app-searchable-select>
                  @if (isFieldInvalid('employeeId')) {
                    <div class="text-danger small mt-1">
                      <i class="fa-solid fa-exclamation-triangle me-1"></i>
                      {{ getFieldError('employeeId') }}
                    </div>
                  }
                  <small class="form-text text-muted">
                    <i class="fa-solid fa-info-circle me-1"></i>
                    {{ t('users.employee_help') }}
                  </small>
                </div>
              }

              <!-- Username (only for create) - Auto-filled from employee -->
              @if (!isEditMode()) {
                <div class="col-md-6">
                  <label class="form-label">{{ t('users.username') }} <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    class="form-control"
                    formControlName="username"
                    [placeholder]="t('users.username')"
                    [class.is-invalid]="isFieldInvalid('username')"
                    readonly
                  />
                  @if (isFieldInvalid('username')) {
                    <div class="invalid-feedback">{{ getFieldError('username') }}</div>
                  }
                </div>
              }

              <!-- Email - Auto-filled from employee in create mode -->
              <div class="col-md-6">
                <label class="form-label">{{ t('users.email') }} <span class="text-danger">*</span></label>
                <input
                  type="email"
                  class="form-control"
                  formControlName="email"
                  [placeholder]="t('users.email')"
                  [class.is-invalid]="isFieldInvalid('email')"
                  [readonly]="!isEditMode()"
                />
                @if (isFieldInvalid('email')) {
                  <div class="invalid-feedback">{{ getFieldError('email') }}</div>
                }
              </div>

              <!-- Phone -->
              <div class="col-md-6">
                <label class="form-label">{{ t('users.phone') }}</label>
                <input
                  type="tel"
                  class="form-control"
                  formControlName="phone"
                  [placeholder]="t('users.phone')"
                  [class.is-invalid]="isFieldInvalid('phone')"
                />
                @if (isFieldInvalid('phone')) {
                  <div class="invalid-feedback">{{ getFieldError('phone') }}</div>
                }
              </div>

              <!-- Preferred Language -->
              <div class="col-md-6">
                <label class="form-label">{{ t('users.language') }} <span class="text-danger">*</span></label>
                <select
                  class="form-select"
                  formControlName="preferredLanguage"
                  [class.is-invalid]="isFieldInvalid('preferredLanguage')"
                >
                  <option value="en">{{ t('common.language_english') }}</option>
                  <option value="ar">{{ t('common.language_arabic') }}</option>
                </select>
                @if (isFieldInvalid('preferredLanguage')) {
                  <div class="invalid-feedback">{{ getFieldError('preferredLanguage') }}</div>
                }
              </div>

              <!-- Password Row (only for create) -->
              @if (!isEditMode()) {
                <!-- Password -->
                <div class="col-md-6">
                  <label class="form-label">{{ t('users.password') }} <span class="text-danger">*</span></label>
                  <input
                    type="password"
                    class="form-control"
                    formControlName="password"
                    [placeholder]="t('users.password')"
                    [class.is-invalid]="isFieldInvalid('password')"
                  />
                  @if (isFieldInvalid('password')) {
                    <div class="invalid-feedback">{{ getFieldError('password') }}</div>
                  }
                  <small class="form-text text-muted">
                    {{ t('auth.password_requirements') }}
                  </small>
                </div>

                <!-- Confirm Password -->
                <div class="col-md-6">
                  <label class="form-label">{{ t('users.confirm_password') }} <span class="text-danger">*</span></label>
                  <input
                    type="password"
                    class="form-control"
                    formControlName="confirmPassword"
                    [placeholder]="t('users.confirm_password')"
                    [class.is-invalid]="isFieldInvalid('confirmPassword')"
                  />
                  @if (isFieldInvalid('confirmPassword')) {
                    <div class="invalid-feedback">{{ getFieldError('confirmPassword') }}</div>
                  }
                </div>
              }

              <!-- Status (only for edit) -->
              @if (isEditMode()) {
                <div class="col-md-6">
                  <label class="form-label">{{ t('common.status') }}</label>
                  <div class="form-check form-switch mt-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="isActiveSwitch"
                      formControlName="isActive"
                    />
                    <label class="form-check-label" for="isActiveSwitch">
                      {{ t('common.active') }}
                    </label>
                  </div>
                </div>
              }

              <!-- Must Change Password -->
              <div class="col-md-6">
                <label class="form-label">{{ t('users.password_status') }}</label>
                <div class="form-check form-switch mt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="mustChangePasswordSwitch"
                    formControlName="mustChangePassword"
                  />
                  <label class="form-check-label" for="mustChangePasswordSwitch">
                    {{ t('users.must_change_password') }}
                  </label>
                </div>
                <small class="form-text text-muted">
                  {{ t('users.must_change_password_hint') }}
                </small>
              </div>
            </div>

            <!-- Permissions Section -->
              <app-form-section [title]="t('users.permissions')">
                <!-- Roles -->
                <div class="mb-3">
                  <label class="form-label">{{ t('users.roles') }} <span class="text-danger">*</span></label>
                  <div class="border rounded p-3 bg-light">
                    @if (availableRoles().length > 0) {
                      <div class="row g-3">
                        @for (role of availableRoles(); track role.id) {
                          <div class="col-md-6 col-lg-4">
                            <div class="form-check p-2 border rounded bg-white">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                [id]="'role-' + role.id"
                                [checked]="isRoleSelected(role.id)"
                                (change)="onRoleToggle(role.id)"
                              />
                              <label class="form-check-label fw-medium" [for]="'role-' + role.id">
                                <i class="fa-solid fa-shield-alt me-2 text-primary"></i>
                                {{ role.name }}
                              </label>
                            </div>
                          </div>
                        }
                      </div>
                    } @else {
                      <div class="text-muted text-center py-3">
                        <i class="fa-solid fa-spinner fa-spin me-2"></i>
                        {{ t('common.loading') }}...
                      </div>
                    }
                    @if (isFieldInvalid('roleIds')) {
                      <div class="text-danger small mt-2">
                        <i class="fa-solid fa-exclamation-triangle me-1"></i>
                        {{ getFieldError('roleIds') }}
                      </div>
                    }
                  </div>
                </div>

                <!-- Branches -->
                <div class="mb-3">
                  <label class="form-label">{{ t('users.branches') }}</label>
                  <div class="border rounded p-3 bg-light">
                    @if (availableBranches().length > 0) {
                      <div class="row g-3">
                        @for (branch of availableBranches(); track branch.id) {
                          <div class="col-md-6 col-lg-4">
                            <div class="form-check p-2 border rounded bg-white">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                [id]="'branch-' + branch.id"
                                [checked]="isBranchSelected(branch.id)"
                                (change)="onBranchToggle(branch.id)"
                              />
                              <label class="form-check-label fw-medium" [for]="'branch-' + branch.id">
                                <i class="fa-solid fa-building me-2 text-success"></i>
                                {{ branch.name }}
                              </label>
                            </div>
                          </div>
                        }
                      </div>
                    } @else {
                      <div class="text-muted text-center py-3">
                        <i class="fa-solid fa-spinner fa-spin me-2"></i>
                        {{ t('common.loading') }}...
                      </div>
                    }
                    <small class="form-text text-muted d-block mt-3 px-2">
                      <i class="fa-solid fa-info-circle me-1 text-info"></i>
                      {{ t('users.branches_help') }}
                    </small>
                  </div>
                </div>
              </app-form-section>

        <!-- Form Actions -->
        <div class="d-flex justify-content-end gap-2 mt-4">
          <button type="button" class="btn btn-outline-secondary" (click)="closeModal()" [disabled]="loading()">
            <i class="fa-solid fa-times me-2"></i>
            {{ t('common.cancel') }}
          </button>
          <button 
            type="submit" 
            class="btn btn-primary" 
            [disabled]="userForm.invalid || loading()"
          >
            @if (loading()) {
              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            }
            @if (isEditMode()) {
              <i class="fa-solid fa-save me-2"></i>
              {{ t('common.save') }}
            } @else {
              <i class="fa-solid fa-plus me-2"></i>
              {{ t('users.create_user') }}
            }
          </button>
        </div>
      </form>
    </div>
  </app-form-section>
</div>`, styles: ["/* src/app/pages/users/user-form/user-form.component.css */\n.modal.show {\n  animation: fadeIn 0.15s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-dialog {\n  margin: 2rem auto;\n}\n.modal-content {\n  border: none;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.5rem;\n}\n.modal-header {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem 0.5rem 0 0;\n}\n.modal-title {\n  font-weight: 600;\n  color: var(--bs-dark);\n}\n.modal-body {\n  padding: 1.5rem;\n}\n.modal-footer {\n  background-color: var(--bs-light);\n  border-top: 1px solid var(--bs-border-color);\n  border-radius: 0 0 0.5rem 0.5rem;\n}\n.form-check {\n  padding: 0.5rem;\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.375rem;\n  background-color: var(--bs-light);\n  transition: all 0.2s ease;\n}\n.form-check:hover {\n  background-color: var(--bs-primary-bg-subtle);\n  border-color: var(--bs-primary-border-subtle);\n}\n.form-check-input:checked + .form-check-label {\n  font-weight: 500;\n  color: var(--bs-primary);\n}\n.form-switch .form-check-input {\n  width: 2.5rem;\n  height: 1.25rem;\n}\n.form-switch .form-check-input#isActiveSwitch:checked {\n  background-color: var(--bs-success);\n  border-color: var(--bs-success);\n}\n.form-switch .form-check-input#mustChangePasswordSwitch:checked {\n  background-color: var(--bs-warning);\n  border-color: var(--bs-warning);\n}\n.alert {\n  border: none;\n  border-radius: 0.5rem;\n  margin-bottom: 1rem;\n}\n.alert-danger {\n  background-color: var(--bs-danger-bg-subtle);\n  color: var(--bs-danger-text);\n  border-left: 4px solid var(--bs-danger);\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.btn {\n  border-radius: 0.375rem;\n  padding: 0.5rem 1rem;\n  font-weight: 500;\n}\n.btn-primary {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-primary:hover {\n  background-color: var(--bs-primary-hover, #0056b3);\n  border-color: var(--bs-primary-hover, #0056b3);\n}\n.btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.is-invalid {\n  border-color: var(--bs-danger);\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-danger-rgb), 0.25);\n}\n.text-danger {\n  color: var(--bs-danger) !important;\n}\n[dir=rtl] .modal-dialog {\n  margin: 2rem auto;\n}\n[dir=rtl] .form-check {\n  text-align: right;\n}\n[dir=rtl] .form-check-input {\n  margin-left: 0;\n  margin-right: -1.5em;\n}\n[dir=rtl] .form-check-label {\n  padding-left: 0;\n  padding-right: 1.5em;\n}\n@media (max-width: 768px) {\n  .modal-dialog {\n    margin: 1rem;\n    max-width: none;\n  }\n  .modal-body {\n    padding: 1rem;\n  }\n  .row.g-2 > * {\n    margin-bottom: 0.5rem;\n  }\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: var(--bs-primary);\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.form-check-input:focus {\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.form-text {\n  font-size: 0.875rem;\n  margin-top: 0.25rem;\n}\n.form-check-input[type=checkbox] {\n  border-radius: 0.25rem;\n}\n.form-check-input[type=checkbox]:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.spinner-border {\n  animation: spinner-border 0.75s linear infinite;\n}\n@keyframes spinner-border {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=user-form.component.css.map */\n"] }]
  }], null, { user: [{
    type: Input
  }], show: [{
    type: Input
  }], showChange: [{
    type: Output
  }], userSaved: [{
    type: Output
  }], userCreated: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserFormComponent, { className: "UserFormComponent", filePath: "src/app/pages/users/user-form/user-form.component.ts", lineNumber: 29 });
})();

export {
  UserFormComponent
};
//# sourceMappingURL=chunk-SWYVJKM7.js.map
