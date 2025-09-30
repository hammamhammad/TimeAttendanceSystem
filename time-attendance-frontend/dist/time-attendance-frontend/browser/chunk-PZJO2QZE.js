import {
  UsersService
} from "./chunk-LZOHW3WQ.js";
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
  Router,
  RouterLink,
  RouterModule,
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
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/users/user-form/user-form.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function UserFormComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "i", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(UserFormComponent_Conditional_25_Template, "UserFormComponent_Conditional_25_Template");
function UserFormComponent_Conditional_27_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("username"));
  }
}
__name(UserFormComponent_Conditional_27_Conditional_6_Template, "UserFormComponent_Conditional_27_Conditional_6_Template");
function UserFormComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "label", 19);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 20);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "input", 41);
    \u0275\u0275conditionalCreate(6, UserFormComponent_Conditional_27_Conditional_6_Template, 2, 1, "div", 22);
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
__name(UserFormComponent_Conditional_27_Template, "UserFormComponent_Conditional_27_Template");
function UserFormComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("email"));
  }
}
__name(UserFormComponent_Conditional_34_Template, "UserFormComponent_Conditional_34_Template");
function UserFormComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("phone"));
  }
}
__name(UserFormComponent_Conditional_39_Template, "UserFormComponent_Conditional_39_Template");
function UserFormComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("preferredLanguage"));
  }
}
__name(UserFormComponent_Conditional_50_Template, "UserFormComponent_Conditional_50_Template");
function UserFormComponent_Conditional_51_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("password"));
  }
}
__name(UserFormComponent_Conditional_51_Conditional_6_Template, "UserFormComponent_Conditional_51_Conditional_6_Template");
function UserFormComponent_Conditional_51_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("confirmPassword"));
  }
}
__name(UserFormComponent_Conditional_51_Conditional_15_Template, "UserFormComponent_Conditional_51_Conditional_15_Template");
function UserFormComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "label", 19);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 20);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "input", 42);
    \u0275\u0275conditionalCreate(6, UserFormComponent_Conditional_51_Conditional_6_Template, 2, 1, "div", 22);
    \u0275\u0275elementStart(7, "small", 43);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 18)(10, "label", 19);
    \u0275\u0275text(11);
    \u0275\u0275elementStart(12, "span", 20);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(14, "input", 44);
    \u0275\u0275conditionalCreate(15, UserFormComponent_Conditional_51_Conditional_15_Template, 2, 1, "div", 22);
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
__name(UserFormComponent_Conditional_51_Template, "UserFormComponent_Conditional_51_Template");
function UserFormComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "label", 19);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 45);
    \u0275\u0275element(4, "input", 46);
    \u0275\u0275elementStart(5, "label", 47);
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
__name(UserFormComponent_Conditional_52_Template, "UserFormComponent_Conditional_52_Template");
function UserFormComponent_Conditional_63_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 49)(2, "input", 50);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function UserFormComponent_Conditional_63_For_2_Template_input_change_2_listener() {
      const role_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onRoleToggle(role_r3.id));
    }, "UserFormComponent_Conditional_63_For_2_Template_input_change_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 51);
    \u0275\u0275element(4, "i", 52);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const role_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "role-" + role_r3.id)("checked", ctx_r0.isRoleSelected(role_r3.id));
    \u0275\u0275advance();
    \u0275\u0275property("for", "role-" + role_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", role_r3.name, " ");
  }
}
__name(UserFormComponent_Conditional_63_For_2_Template, "UserFormComponent_Conditional_63_For_2_Template");
function UserFormComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275repeaterCreate(1, UserFormComponent_Conditional_63_For_2_Template, 6, 4, "div", 48, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.availableRoles());
  }
}
__name(UserFormComponent_Conditional_63_Template, "UserFormComponent_Conditional_63_Template");
function UserFormComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.loading"), "... ");
  }
}
__name(UserFormComponent_Conditional_64_Template, "UserFormComponent_Conditional_64_Template");
function UserFormComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275element(1, "i", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("roleIds"), " ");
  }
}
__name(UserFormComponent_Conditional_65_Template, "UserFormComponent_Conditional_65_Template");
function UserFormComponent_Conditional_70_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 49)(2, "input", 50);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function UserFormComponent_Conditional_70_For_2_Template_input_change_2_listener() {
      const branch_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onBranchToggle(branch_r5.id));
    }, "UserFormComponent_Conditional_70_For_2_Template_input_change_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 51);
    \u0275\u0275element(4, "i", 55);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const branch_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "branch-" + branch_r5.id)("checked", ctx_r0.isBranchSelected(branch_r5.id));
    \u0275\u0275advance();
    \u0275\u0275property("for", "branch-" + branch_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", branch_r5.name, " ");
  }
}
__name(UserFormComponent_Conditional_70_For_2_Template, "UserFormComponent_Conditional_70_For_2_Template");
function UserFormComponent_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275repeaterCreate(1, UserFormComponent_Conditional_70_For_2_Template, 6, 4, "div", 48, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.availableBranches());
  }
}
__name(UserFormComponent_Conditional_70_Template, "UserFormComponent_Conditional_70_Template");
function UserFormComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("common.loading"), "... ");
  }
}
__name(UserFormComponent_Conditional_71_Template, "UserFormComponent_Conditional_71_Template");
function UserFormComponent_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 39);
  }
}
__name(UserFormComponent_Conditional_80_Template, "UserFormComponent_Conditional_80_Template");
function UserFormComponent_Conditional_81_Template(rf, ctx) {
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
__name(UserFormComponent_Conditional_81_Template, "UserFormComponent_Conditional_81_Template");
function UserFormComponent_Conditional_82_Template(rf, ctx) {
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
__name(UserFormComponent_Conditional_82_Template, "UserFormComponent_Conditional_82_Template");
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
  isEditMode = computed(() => !!this.user, ...ngDevMode ? [{ debugName: "isEditMode" }] : []);
  isSystemAdmin = computed(() => {
    return this.user?.username?.toLowerCase() === "systemadmin";
  }, ...ngDevMode ? [{ debugName: "isSystemAdmin" }] : []);
  modalTitle = computed(() => this.isEditMode() ? this.t("users.edit_user") : this.t("users.create_user"), ...ngDevMode ? [{ debugName: "modalTitle" }] : []);
  ngOnInit() {
    this.initializeForm();
    this.loadRoles();
    this.loadBranches();
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
        { value: "", disabled: this.isEditMode() || isSystemAdminUser },
        [Validators.required, Validators.minLength(3)]
      ],
      email: [
        { value: "", disabled: isSystemAdminUser },
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
      branchIds: [{ value: [], disabled: isSystemAdminUser }]
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
      isActive: this.user.isActive
    });
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
    const formValue = this.userForm.value;
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
      roleIds: formValue.roleIds,
      branchIds: formValue.branchIds
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
      isActive: formValue.isActive
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
  isFieldInvalid(fieldName) {
    const field = this.userForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }
};
__name(_UserFormComponent, "UserFormComponent");
__publicField(_UserFormComponent, "\u0275fac", /* @__PURE__ */ __name(function UserFormComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UserFormComponent)();
}, "UserFormComponent_Factory"));
__publicField(_UserFormComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserFormComponent, selectors: [["app-user-form"]], inputs: { user: "user", show: "show" }, outputs: { showChange: "showChange", userSaved: "userSaved", userCreated: "userCreated" }, features: [\u0275\u0275NgOnChangesFeature], decls: 83, vars: 40, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], ["aria-label", "breadcrumb"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["routerLink", "/dashboard"], ["routerLink", "/users"], [1, "breadcrumb-item", "active"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fa-solid", "fa-arrow-left", "me-2"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fa-solid", "fa-user", "me-2"], [1, "card-body"], [3, "ngSubmit", "formGroup"], ["role", "alert", 1, "alert", "alert-danger"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label"], [1, "text-danger"], ["type", "email", "formControlName", "email", 1, "form-control", 3, "placeholder"], [1, "invalid-feedback"], ["type", "tel", "formControlName", "phone", 1, "form-control", 3, "placeholder"], ["formControlName", "preferredLanguage", 1, "form-select"], ["value", "en"], ["value", "ar"], [1, "col-12", "mb-4"], [1, "text-primary", "mb-3", "border-bottom", "pb-2"], [1, "fa-solid", "fa-shield-alt", "me-2"], [1, "mb-3"], [1, "border", "rounded", "p-3", "bg-light"], [1, "text-muted", "text-center", "py-3"], [1, "text-danger", "small", "mt-2"], [1, "form-text", "text-muted", "d-block", "mt-3", "px-2"], [1, "fa-solid", "fa-info-circle", "me-1", "text-info"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4"], [1, "fa-solid", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"], ["type", "text", "formControlName", "username", 1, "form-control", 3, "placeholder"], ["type", "password", "formControlName", "password", 1, "form-control", 3, "placeholder"], [1, "form-text", "text-muted"], ["type", "password", "formControlName", "confirmPassword", 1, "form-control", 3, "placeholder"], [1, "form-check", "form-switch", "mt-2"], ["type", "checkbox", "role", "switch", "id", "isActiveSwitch", "formControlName", "isActive", 1, "form-check-input"], ["for", "isActiveSwitch", 1, "form-check-label"], [1, "col-md-6", "col-lg-4"], [1, "form-check", "p-2", "border", "rounded", "bg-white"], ["type", "checkbox", 1, "form-check-input", 3, "change", "id", "checked"], [1, "form-check-label", "fw-medium", 3, "for"], [1, "fa-solid", "fa-shield-alt", "me-2", "text-primary"], [1, "fa-solid", "fa-spinner", "fa-spin", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-1"], [1, "fa-solid", "fa-building", "me-2", "text-success"], [1, "fa-solid", "fa-save", "me-2"], [1, "fa-solid", "fa-plus", "me-2"]], template: /* @__PURE__ */ __name(function UserFormComponent_Template(rf, ctx) {
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
    \u0275\u0275elementStart(18, "div", 10)(19, "div", 11)(20, "h5", 12);
    \u0275\u0275element(21, "i", 13);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 14)(24, "form", 15);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function UserFormComponent_Template_form_ngSubmit_24_listener() {
      return ctx.onSubmit();
    }, "UserFormComponent_Template_form_ngSubmit_24_listener"));
    \u0275\u0275conditionalCreate(25, UserFormComponent_Conditional_25_Template, 3, 1, "div", 16);
    \u0275\u0275elementStart(26, "div", 17);
    \u0275\u0275conditionalCreate(27, UserFormComponent_Conditional_27_Template, 7, 5, "div", 18);
    \u0275\u0275elementStart(28, "div", 18)(29, "label", 19);
    \u0275\u0275text(30);
    \u0275\u0275elementStart(31, "span", 20);
    \u0275\u0275text(32, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(33, "input", 21);
    \u0275\u0275conditionalCreate(34, UserFormComponent_Conditional_34_Template, 2, 1, "div", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 18)(36, "label", 19);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "input", 23);
    \u0275\u0275conditionalCreate(39, UserFormComponent_Conditional_39_Template, 2, 1, "div", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 18)(41, "label", 19);
    \u0275\u0275text(42);
    \u0275\u0275elementStart(43, "span", 20);
    \u0275\u0275text(44, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "select", 24)(46, "option", 25);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "option", 26);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(50, UserFormComponent_Conditional_50_Template, 2, 1, "div", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(51, UserFormComponent_Conditional_51_Template, 16, 11);
    \u0275\u0275conditionalCreate(52, UserFormComponent_Conditional_52_Template, 7, 2, "div", 18);
    \u0275\u0275elementStart(53, "div", 27)(54, "h6", 28);
    \u0275\u0275element(55, "i", 29);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 30)(58, "label", 19);
    \u0275\u0275text(59);
    \u0275\u0275elementStart(60, "span", 20);
    \u0275\u0275text(61, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div", 31);
    \u0275\u0275conditionalCreate(63, UserFormComponent_Conditional_63_Template, 3, 0, "div", 17)(64, UserFormComponent_Conditional_64_Template, 3, 1, "div", 32);
    \u0275\u0275conditionalCreate(65, UserFormComponent_Conditional_65_Template, 3, 1, "div", 33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 30)(67, "label", 19);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "div", 31);
    \u0275\u0275conditionalCreate(70, UserFormComponent_Conditional_70_Template, 3, 0, "div", 17)(71, UserFormComponent_Conditional_71_Template, 3, 1, "div", 32);
    \u0275\u0275elementStart(72, "small", 34);
    \u0275\u0275element(73, "i", 35);
    \u0275\u0275text(74);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(75, "div", 36)(76, "button", 8);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function UserFormComponent_Template_button_click_76_listener() {
      return ctx.closeModal();
    }, "UserFormComponent_Template_button_click_76_listener"));
    \u0275\u0275element(77, "i", 37);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "button", 38);
    \u0275\u0275conditionalCreate(80, UserFormComponent_Conditional_80_Template, 1, 0, "span", 39);
    \u0275\u0275conditionalCreate(81, UserFormComponent_Conditional_81_Template, 2, 1)(82, UserFormComponent_Conditional_82_Template, 2, 1);
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
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx.t("users.user_information"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx.userForm);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 25 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx.isEditMode() ? 27 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("users.email"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("email"));
    \u0275\u0275property("placeholder", ctx.t("users.email"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("email") ? 34 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("users.phone"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("phone"));
    \u0275\u0275property("placeholder", ctx.t("users.phone"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("phone") ? 39 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("users.language"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("preferredLanguage"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.language_english"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("common.language_arabic"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("preferredLanguage") ? 50 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.isEditMode() ? 51 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isEditMode() ? 52 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("users.permissions"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("users.roles"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx.availableRoles().length > 0 ? 63 : 64);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.isFieldInvalid("roleIds") ? 65 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("users.branches"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.availableBranches().length > 0 ? 70 : 71);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.t("users.branches_help"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.loading());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.userForm.invalid || ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 80 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isEditMode() ? 81 : 82);
  }
}, "UserFormComponent_Template"), dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterModule, RouterLink], styles: ["\n\n.modal.show[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  margin: 2rem auto;\n}\n.modal-content[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.5rem;\n}\n.modal-header[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem 0.5rem 0 0;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-dark);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-top: 1px solid var(--bs-border-color);\n  border-radius: 0 0 0.5rem 0.5rem;\n}\n.form-check[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.375rem;\n  background-color: var(--bs-light);\n  transition: all 0.2s ease;\n}\n.form-check[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-primary-bg-subtle);\n  border-color: var(--bs-primary-border-subtle);\n}\n.form-check-input[_ngcontent-%COMP%]:checked    + .form-check-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-primary);\n}\n.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 1.25rem;\n}\n.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-success);\n  border-color: var(--bs-success);\n}\n.alert[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 0.5rem;\n  margin-bottom: 1rem;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: var(--bs-danger-bg-subtle);\n  color: var(--bs-danger-text);\n  border-left: 4px solid var(--bs-danger);\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  padding: 0.5rem 1rem;\n  font-weight: 500;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-primary-hover, #0056b3);\n  border-color: var(--bs-primary-hover, #0056b3);\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.is-invalid[_ngcontent-%COMP%] {\n  border-color: var(--bs-danger);\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-danger-rgb), 0.25);\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: var(--bs-danger) !important;\n}\n[dir=rtl][_ngcontent-%COMP%]   .modal-dialog[_ngcontent-%COMP%] {\n  margin: 2rem auto;\n}\n[dir=rtl][_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%] {\n  text-align: right;\n}\n[dir=rtl][_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%] {\n  margin-left: 0;\n  margin-right: -1.5em;\n}\n[dir=rtl][_ngcontent-%COMP%]   .form-check-label[_ngcontent-%COMP%] {\n  padding-left: 0;\n  padding-right: 1.5em;\n}\n@media (max-width: 768px) {\n  .modal-dialog[_ngcontent-%COMP%] {\n    margin: 1rem;\n    max-width: none;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .row.g-2[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n  }\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: var(--bs-primary);\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.form-check-input[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.form-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  margin-top: 0.25rem;\n}\n.form-check-input[type=checkbox][_ngcontent-%COMP%] {\n  border-radius: 0.25rem;\n}\n.form-check-input[type=checkbox][_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.spinner-border[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spinner-border 0.75s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spinner-border {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=user-form.component.css.map */"] }));
var UserFormComponent = _UserFormComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserFormComponent, [{
    type: Component,
    args: [{ selector: "app-user-form", standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterModule], template: `<div class="container-fluid">
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
  <div class="card">
    <div class="card-header">
      <h5 class="card-title mb-0">
        <i class="fa-solid fa-user me-2"></i>
        {{ t('users.user_information') }}
      </h5>
    </div>
    <div class="card-body">
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
            @if (error()) {
              <div class="alert alert-danger" role="alert">
                <i class="fa-solid fa-exclamation-triangle me-2"></i>
                {{ error() }}
              </div>
            }

            <div class="row g-3">
              <!-- Username (only for create) -->
              @if (!isEditMode()) {
                <div class="col-md-6">
                  <label class="form-label">{{ t('users.username') }} <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    class="form-control"
                    formControlName="username"
                    [placeholder]="t('users.username')"
                    [class.is-invalid]="isFieldInvalid('username')"
                  />
                  @if (isFieldInvalid('username')) {
                    <div class="invalid-feedback">{{ getFieldError('username') }}</div>
                  }
                </div>
              }

              <!-- Email -->
              <div class="col-md-6">
                <label class="form-label">{{ t('users.email') }} <span class="text-danger">*</span></label>
                <input
                  type="email"
                  class="form-control"
                  formControlName="email"
                  [placeholder]="t('users.email')"
                  [class.is-invalid]="isFieldInvalid('email')"
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

              <!-- Permissions Section -->
              <div class="col-12 mb-4">
                <h6 class="text-primary mb-3 border-bottom pb-2">
                  <i class="fa-solid fa-shield-alt me-2"></i>
                  {{ t('users.permissions') }}
                </h6>
                
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
              </div>
            </div>

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
  </div>
</div>`, styles: ["/* src/app/pages/users/user-form/user-form.component.css */\n.modal.show {\n  animation: fadeIn 0.15s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-dialog {\n  margin: 2rem auto;\n}\n.modal-content {\n  border: none;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.5rem;\n}\n.modal-header {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem 0.5rem 0 0;\n}\n.modal-title {\n  font-weight: 600;\n  color: var(--bs-dark);\n}\n.modal-body {\n  padding: 1.5rem;\n}\n.modal-footer {\n  background-color: var(--bs-light);\n  border-top: 1px solid var(--bs-border-color);\n  border-radius: 0 0 0.5rem 0.5rem;\n}\n.form-check {\n  padding: 0.5rem;\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.375rem;\n  background-color: var(--bs-light);\n  transition: all 0.2s ease;\n}\n.form-check:hover {\n  background-color: var(--bs-primary-bg-subtle);\n  border-color: var(--bs-primary-border-subtle);\n}\n.form-check-input:checked + .form-check-label {\n  font-weight: 500;\n  color: var(--bs-primary);\n}\n.form-switch .form-check-input {\n  width: 2.5rem;\n  height: 1.25rem;\n}\n.form-switch .form-check-input:checked {\n  background-color: var(--bs-success);\n  border-color: var(--bs-success);\n}\n.alert {\n  border: none;\n  border-radius: 0.5rem;\n  margin-bottom: 1rem;\n}\n.alert-danger {\n  background-color: var(--bs-danger-bg-subtle);\n  color: var(--bs-danger-text);\n  border-left: 4px solid var(--bs-danger);\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.btn {\n  border-radius: 0.375rem;\n  padding: 0.5rem 1rem;\n  font-weight: 500;\n}\n.btn-primary {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-primary:hover {\n  background-color: var(--bs-primary-hover, #0056b3);\n  border-color: var(--bs-primary-hover, #0056b3);\n}\n.btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.is-invalid {\n  border-color: var(--bs-danger);\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-danger-rgb), 0.25);\n}\n.text-danger {\n  color: var(--bs-danger) !important;\n}\n[dir=rtl] .modal-dialog {\n  margin: 2rem auto;\n}\n[dir=rtl] .form-check {\n  text-align: right;\n}\n[dir=rtl] .form-check-input {\n  margin-left: 0;\n  margin-right: -1.5em;\n}\n[dir=rtl] .form-check-label {\n  padding-left: 0;\n  padding-right: 1.5em;\n}\n@media (max-width: 768px) {\n  .modal-dialog {\n    margin: 1rem;\n    max-width: none;\n  }\n  .modal-body {\n    padding: 1rem;\n  }\n  .row.g-2 > * {\n    margin-bottom: 0.5rem;\n  }\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: var(--bs-primary);\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.form-check-input:focus {\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.form-text {\n  font-size: 0.875rem;\n  margin-top: 0.25rem;\n}\n.form-check-input[type=checkbox] {\n  border-radius: 0.25rem;\n}\n.form-check-input[type=checkbox]:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.spinner-border {\n  animation: spinner-border 0.75s linear infinite;\n}\n@keyframes spinner-border {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=user-form.component.css.map */\n"] }]
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserFormComponent, { className: "UserFormComponent", filePath: "src/app/pages/users/user-form/user-form.component.ts", lineNumber: 26 });
})();

export {
  UserFormComponent
};
//# sourceMappingURL=chunk-PZJO2QZE.js.map
