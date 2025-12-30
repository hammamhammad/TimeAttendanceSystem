import {
  BranchesService
} from "./chunk-VA62FO4C.js";
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
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
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

// src/app/pages/branches/edit-branch/edit-branch.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.value, "_forTrack0");
function EditBranchComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 13)(2, "span", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
  }
}
__name(EditBranchComponent_Conditional_18_Template, "EditBranchComponent_Conditional_18_Template");
function EditBranchComponent_Conditional_19_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(EditBranchComponent_Conditional_19_Conditional_7_Template, "EditBranchComponent_Conditional_19_Conditional_7_Template");
function EditBranchComponent_Conditional_19_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("name"));
  }
}
__name(EditBranchComponent_Conditional_19_Conditional_19_Template, "EditBranchComponent_Conditional_19_Conditional_19_Template");
function EditBranchComponent_Conditional_19_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("code"));
  }
}
__name(EditBranchComponent_Conditional_19_Conditional_26_Template, "EditBranchComponent_Conditional_19_Conditional_26_Template");
function EditBranchComponent_Conditional_19_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const timezone_r3 = ctx.$implicit;
    \u0275\u0275property("value", timezone_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(timezone_r3.label);
  }
}
__name(EditBranchComponent_Conditional_19_For_38_Template, "EditBranchComponent_Conditional_19_For_38_Template");
function EditBranchComponent_Conditional_19_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("timezone"));
  }
}
__name(EditBranchComponent_Conditional_19_Conditional_39_Template, "EditBranchComponent_Conditional_19_Conditional_39_Template");
function EditBranchComponent_Conditional_19_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("phone"));
  }
}
__name(EditBranchComponent_Conditional_19_Conditional_57_Template, "EditBranchComponent_Conditional_19_Conditional_57_Template");
function EditBranchComponent_Conditional_19_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("email"));
  }
}
__name(EditBranchComponent_Conditional_19_Conditional_62_Template, "EditBranchComponent_Conditional_19_Conditional_62_Template");
function EditBranchComponent_Conditional_19_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("address"));
  }
}
__name(EditBranchComponent_Conditional_19_Conditional_67_Template, "EditBranchComponent_Conditional_19_Conditional_67_Template");
function EditBranchComponent_Conditional_19_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getFieldError("description"));
  }
}
__name(EditBranchComponent_Conditional_19_Conditional_72_Template, "EditBranchComponent_Conditional_19_Conditional_72_Template");
function EditBranchComponent_Conditional_19_Conditional_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 51);
  }
}
__name(EditBranchComponent_Conditional_19_Conditional_93_Template, "EditBranchComponent_Conditional_19_Conditional_93_Template");
function EditBranchComponent_Conditional_19_Conditional_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 52);
  }
}
__name(EditBranchComponent_Conditional_19_Conditional_94_Template, "EditBranchComponent_Conditional_19_Conditional_94_Template");
function EditBranchComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 15)(2, "h5", 16);
    \u0275\u0275element(3, "i", 17);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 18)(6, "form", 19);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function EditBranchComponent_Conditional_19_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "EditBranchComponent_Conditional_19_Template_form_ngSubmit_6_listener"));
    \u0275\u0275conditionalCreate(7, EditBranchComponent_Conditional_19_Conditional_7_Template, 3, 1, "div", 20);
    \u0275\u0275elementStart(8, "div", 21)(9, "h6", 22);
    \u0275\u0275element(10, "i", 23);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 24)(13, "div", 25)(14, "label", 26);
    \u0275\u0275text(15);
    \u0275\u0275elementStart(16, "span", 27);
    \u0275\u0275text(17, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(18, "input", 28);
    \u0275\u0275conditionalCreate(19, EditBranchComponent_Conditional_19_Conditional_19_Template, 2, 1, "div", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 25)(21, "label", 26);
    \u0275\u0275text(22);
    \u0275\u0275elementStart(23, "span", 27);
    \u0275\u0275text(24, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(25, "input", 30);
    \u0275\u0275conditionalCreate(26, EditBranchComponent_Conditional_19_Conditional_26_Template, 2, 1, "div", 29);
    \u0275\u0275elementStart(27, "div", 31);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 25)(30, "label", 26);
    \u0275\u0275text(31);
    \u0275\u0275elementStart(32, "span", 27);
    \u0275\u0275text(33, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "select", 32)(35, "option", 33);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(37, EditBranchComponent_Conditional_19_For_38_Template, 2, 2, "option", 34, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(39, EditBranchComponent_Conditional_19_Conditional_39_Template, 2, 1, "div", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 25)(41, "label", 26);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 35);
    \u0275\u0275element(44, "input", 36);
    \u0275\u0275elementStart(45, "label", 37);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275element(47, "hr");
    \u0275\u0275elementStart(48, "div", 21)(49, "h6", 38);
    \u0275\u0275element(50, "i", 39);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div", 24)(53, "div", 25)(54, "label", 26);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd();
    \u0275\u0275element(56, "input", 40);
    \u0275\u0275conditionalCreate(57, EditBranchComponent_Conditional_19_Conditional_57_Template, 2, 1, "div", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 25)(59, "label", 26);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd();
    \u0275\u0275element(61, "input", 41);
    \u0275\u0275conditionalCreate(62, EditBranchComponent_Conditional_19_Conditional_62_Template, 2, 1, "div", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 42)(64, "label", 26);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd();
    \u0275\u0275element(66, "textarea", 43);
    \u0275\u0275conditionalCreate(67, EditBranchComponent_Conditional_19_Conditional_67_Template, 2, 1, "div", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 42)(69, "label", 26);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd();
    \u0275\u0275element(71, "textarea", 44);
    \u0275\u0275conditionalCreate(72, EditBranchComponent_Conditional_19_Conditional_72_Template, 2, 1, "div", 29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(73, "div", 45)(74, "h6", 46);
    \u0275\u0275element(75, "i", 23);
    \u0275\u0275text(76);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "ul", 47)(78, "li");
    \u0275\u0275text(79);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "li");
    \u0275\u0275text(81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "li");
    \u0275\u0275text(83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "li");
    \u0275\u0275text(85);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "li");
    \u0275\u0275text(87);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(88, "div", 48)(89, "button", 8);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditBranchComponent_Conditional_19_Template_button_click_89_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "EditBranchComponent_Conditional_19_Template_button_click_89_listener"));
    \u0275\u0275element(90, "i", 49);
    \u0275\u0275text(91);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "button", 50);
    \u0275\u0275conditionalCreate(93, EditBranchComponent_Conditional_19_Conditional_93_Template, 1, 0, "span", 51)(94, EditBranchComponent_Conditional_19_Conditional_94_Template, 1, 0, "i", 52);
    \u0275\u0275text(95);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("branches.branch_information"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r0.branchForm);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.error() ? 7 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("branches.basic_information"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("branches.name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("name"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("branches.name_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("name") ? 19 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("branches.code"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("code"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("branches.code_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("code") ? 26 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("branches.code_hint"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("branches.timezone"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("timezone"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("branches.select_timezone"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.timezones);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("timezone") ? 39 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.status"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.active"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("branches.contact_information"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.phone"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("phone"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("common.phone_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("phone") ? 57 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.email"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("email"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("common.email_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("email") ? 62 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("branches.address"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("address"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("branches.address_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("address") ? 67 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.description"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("description"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("branches.description_placeholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("description") ? 72 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("branches.validation_rules.title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("branches.validation_rules.name"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("branches.validation_rules.code"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("branches.validation_rules.timezone"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("branches.validation_rules.email"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("branches.validation_rules.phone"));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.branchForm.invalid || ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 93 : 94);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? ctx_r0.i18n.t("common.saving") : ctx_r0.i18n.t("branches.update_branch"), " ");
  }
}
__name(EditBranchComponent_Conditional_19_Template, "EditBranchComponent_Conditional_19_Template");
function EditBranchComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error() || ctx_r0.i18n.t("branches.branch_not_found"), " ");
  }
}
__name(EditBranchComponent_Conditional_20_Template, "EditBranchComponent_Conditional_20_Template");
var _EditBranchComponent = class _EditBranchComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  branchesService = inject(BranchesService);
  fb = inject(FormBuilder);
  i18n = inject(I18nService);
  branch = signal(null, ...ngDevMode ? [{ debugName: "branch" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  timezones = [
    { value: "UTC", label: "UTC" },
    { value: "America/New_York", label: "Eastern Time" },
    { value: "America/Chicago", label: "Central Time" },
    { value: "America/Denver", label: "Mountain Time" },
    { value: "America/Los_Angeles", label: "Pacific Time" },
    { value: "Europe/London", label: "London" },
    { value: "Europe/Paris", label: "Paris" },
    { value: "Asia/Tokyo", label: "Tokyo" },
    { value: "Asia/Dubai", label: "Dubai" }
  ];
  branchForm;
  ngOnInit() {
    this.initializeForm();
    const branchId = this.route.snapshot.paramMap.get("id");
    if (branchId) {
      this.loadBranch(branchId);
    } else {
      this.error.set("Invalid branch ID");
      this.loading.set(false);
    }
  }
  initializeForm() {
    this.branchForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      code: ["", [Validators.required, Validators.minLength(2)]],
      timezone: ["", Validators.required],
      phone: [""],
      email: ["", Validators.email],
      address: [""],
      description: [""],
      isActive: [true]
    });
  }
  loadBranch(branchId) {
    setTimeout(() => {
      const mockBranch = {
        id: parseInt(branchId),
        name: "Sample Branch",
        code: "SAMPLE",
        timeZone: "UTC",
        isActive: true,
        employeeCount: 10,
        departmentCount: 3,
        createdAtUtc: "2024-01-01T00:00:00Z"
      };
      this.branch.set(mockBranch);
      this.populateForm(mockBranch);
      this.loading.set(false);
    }, 1e3);
  }
  populateForm(branch) {
    this.branchForm.patchValue({
      name: branch.name,
      code: branch.code,
      timezone: branch.timeZone,
      phone: "",
      email: "",
      address: "",
      description: "",
      isActive: branch.isActive
    });
  }
  onSubmit() {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.error.set("");
    const formValue = this.branchForm.value;
    const updateRequest = {
      name: formValue.name,
      code: formValue.code.toUpperCase(),
      timeZone: formValue.timezone,
      isActive: formValue.isActive
    };
    setTimeout(() => {
      this.saving.set(false);
      this.router.navigate(["/branches", this.branch().id, "view"]);
    }, 1e3);
  }
  onCancel() {
    if (this.branch()) {
      this.router.navigate(["/branches", this.branch().id, "view"]);
    } else {
      this.router.navigate(["/branches"]);
    }
  }
  // Form field helpers
  getFieldError(fieldName) {
    const field = this.branchForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors["required"]) {
        return this.i18n.t("validation.required");
      }
      if (field.errors["email"]) {
        return this.i18n.t("validation.email");
      }
      if (field.errors["minlength"]) {
        return this.i18n.t("validation.minlength").replace("{{min}}", field.errors["minlength"].requiredLength);
      }
    }
    return "";
  }
  isFieldInvalid(fieldName) {
    const field = this.branchForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }
  getErrorMessage(error) {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t("errors.unknown");
  }
};
__name(_EditBranchComponent, "EditBranchComponent");
__publicField(_EditBranchComponent, "\u0275fac", /* @__PURE__ */ __name(function EditBranchComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditBranchComponent)();
}, "EditBranchComponent_Factory"));
__publicField(_EditBranchComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditBranchComponent, selectors: [["app-edit-branch"]], decls: 21, vars: 7, consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], ["aria-label", "breadcrumb"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["routerLink", "/dashboard"], ["routerLink", "/branches"], [1, "breadcrumb-item", "active"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fa-solid", "fa-arrow-left", "me-2"], [1, "d-flex", "justify-content-center", "py-5"], [1, "card"], [1, "alert", "alert-danger"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fa-solid", "fa-building", "me-2"], [1, "card-body"], [3, "ngSubmit", "formGroup"], ["role", "alert", 1, "alert", "alert-danger"], [1, "mb-4"], [1, "text-primary", "mb-3"], [1, "fa-solid", "fa-info-circle", "me-2"], [1, "row", "g-3"], [1, "col-md-6"], [1, "form-label"], [1, "text-danger"], ["type", "text", "formControlName", "name", 1, "form-control", 3, "placeholder"], [1, "invalid-feedback"], ["type", "text", "formControlName", "code", 1, "form-control", 2, "text-transform", "uppercase", 3, "placeholder"], [1, "form-text"], ["formControlName", "timezone", 1, "form-select"], ["value", ""], [3, "value"], [1, "form-check", "form-switch", "mt-2"], ["type", "checkbox", "role", "switch", "id", "isActiveSwitch", "formControlName", "isActive", 1, "form-check-input"], ["for", "isActiveSwitch", 1, "form-check-label"], [1, "text-secondary", "mb-3"], [1, "fa-solid", "fa-address-book", "me-2"], ["type", "tel", "formControlName", "phone", 1, "form-control", 3, "placeholder"], ["type", "email", "formControlName", "email", 1, "form-control", 3, "placeholder"], [1, "col-12"], ["formControlName", "address", "rows", "3", 1, "form-control", 3, "placeholder"], ["formControlName", "description", "rows", "3", 1, "form-control", 3, "placeholder"], [1, "alert", "alert-info"], [1, "alert-heading"], [1, "mb-0"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4"], [1, "fa-solid", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fa-solid", "fa-save", "me-2"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function EditBranchComponent_Template(rf, ctx) {
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
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditBranchComponent_Template_button_click_15_listener() {
      return ctx.onCancel();
    }, "EditBranchComponent_Template_button_click_15_listener"));
    \u0275\u0275element(16, "i", 9);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, EditBranchComponent_Conditional_18_Template, 4, 1, "div", 10)(19, EditBranchComponent_Conditional_19_Template, 96, 54, "div", 11)(20, EditBranchComponent_Conditional_20_Template, 3, 1, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.i18n.t("branches.edit_branch"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.i18n.t("dashboard.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("branches.title"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.i18n.t("branches.edit_branch"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("common.back"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 18 : ctx.branch() ? 19 : 20);
  }
}, "EditBranchComponent_Template"), dependencies: [RouterModule, RouterLink, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 }));
var EditBranchComponent = _EditBranchComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditBranchComponent, [{
    type: Component,
    args: [{
      selector: "app-edit-branch",
      standalone: true,
      imports: [RouterModule, ReactiveFormsModule],
      template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('branches.edit_branch') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/branches">{{ i18n.t('branches.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('branches.edit_branch') }}</li>
            </ol>
          </nav>
        </div>
        <button 
          type="button" 
          class="btn btn-outline-secondary"
          (click)="onCancel()"
          [disabled]="saving()">
          <i class="fa-solid fa-arrow-left me-2"></i>
          {{ i18n.t('common.back') }}
        </button>
      </div>

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>
          </div>
        </div>
      } @else if (branch()) {
        <!-- Main Form Card -->
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="fa-solid fa-building me-2"></i>
              {{ i18n.t('branches.branch_information') }}
            </h5>
          </div>
          <div class="card-body">
            <form [formGroup]="branchForm" (ngSubmit)="onSubmit()">
              @if (error()) {
                <div class="alert alert-danger" role="alert">
                  <i class="fa-solid fa-exclamation-triangle me-2"></i>
                  {{ error() }}
                </div>
              }

              <!-- Basic Information Section -->
              <div class="mb-4">
                <h6 class="text-primary mb-3">
                  <i class="fa-solid fa-info-circle me-2"></i>
                  {{ i18n.t('branches.basic_information') }}
                </h6>
                <div class="row g-3">
                  <!-- Branch Name -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('branches.name') }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="name"
                      [class.is-invalid]="isFieldInvalid('name')"
                      [placeholder]="i18n.t('branches.name_placeholder')"
                    />
                    @if (isFieldInvalid('name')) {
                      <div class="invalid-feedback">{{ getFieldError('name') }}</div>
                    }
                  </div>

                  <!-- Branch Code -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('branches.code') }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      formControlName="code"
                      [class.is-invalid]="isFieldInvalid('code')"
                      [placeholder]="i18n.t('branches.code_placeholder')"
                      style="text-transform: uppercase;"
                    />
                    @if (isFieldInvalid('code')) {
                      <div class="invalid-feedback">{{ getFieldError('code') }}</div>
                    }
                    <div class="form-text">{{ i18n.t('branches.code_hint') }}</div>
                  </div>

                  <!-- Timezone -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('branches.timezone') }}
                      <span class="text-danger">*</span>
                    </label>
                    <select
                      class="form-select"
                      formControlName="timezone"
                      [class.is-invalid]="isFieldInvalid('timezone')"
                    >
                      <option value="">{{ i18n.t('branches.select_timezone') }}</option>
                      @for (timezone of timezones; track timezone.value) {
                        <option [value]="timezone.value">{{ timezone.label }}</option>
                      }
                    </select>
                    @if (isFieldInvalid('timezone')) {
                      <div class="invalid-feedback">{{ getFieldError('timezone') }}</div>
                    }
                  </div>

                  <!-- Status -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('common.status') }}</label>
                    <div class="form-check form-switch mt-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="isActiveSwitch"
                        formControlName="isActive"
                      />
                      <label class="form-check-label" for="isActiveSwitch">
                        {{ i18n.t('common.active') }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <hr>

              <!-- Contact Information Section -->
              <div class="mb-4">
                <h6 class="text-secondary mb-3">
                  <i class="fa-solid fa-address-book me-2"></i>
                  {{ i18n.t('branches.contact_information') }}
                </h6>
                <div class="row g-3">
                  <!-- Phone -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('common.phone') }}</label>
                    <input
                      type="tel"
                      class="form-control"
                      formControlName="phone"
                      [class.is-invalid]="isFieldInvalid('phone')"
                      [placeholder]="i18n.t('common.phone_placeholder')"
                    />
                    @if (isFieldInvalid('phone')) {
                      <div class="invalid-feedback">{{ getFieldError('phone') }}</div>
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
                      [placeholder]="i18n.t('common.email_placeholder')"
                    />
                    @if (isFieldInvalid('email')) {
                      <div class="invalid-feedback">{{ getFieldError('email') }}</div>
                    }
                  </div>

                  <!-- Address -->
                  <div class="col-12">
                    <label class="form-label">{{ i18n.t('branches.address') }}</label>
                    <textarea
                      class="form-control"
                      formControlName="address"
                      [class.is-invalid]="isFieldInvalid('address')"
                      [placeholder]="i18n.t('branches.address_placeholder')"
                      rows="3"
                    ></textarea>
                    @if (isFieldInvalid('address')) {
                      <div class="invalid-feedback">{{ getFieldError('address') }}</div>
                    }
                  </div>

                  <!-- Description -->
                  <div class="col-12">
                    <label class="form-label">{{ i18n.t('common.description') }}</label>
                    <textarea
                      class="form-control"
                      formControlName="description"
                      [class.is-invalid]="isFieldInvalid('description')"
                      [placeholder]="i18n.t('branches.description_placeholder')"
                      rows="3"
                    ></textarea>
                    @if (isFieldInvalid('description')) {
                      <div class="invalid-feedback">{{ getFieldError('description') }}</div>
                    }
                  </div>
                </div>
              </div>

              <!-- Validation Info -->
              <div class="alert alert-info">
                <h6 class="alert-heading">
                  <i class="fa-solid fa-info-circle me-2"></i>
                  {{ i18n.t('branches.validation_rules.title') }}
                </h6>
                <ul class="mb-0">
                  <li>{{ i18n.t('branches.validation_rules.name') }}</li>
                  <li>{{ i18n.t('branches.validation_rules.code') }}</li>
                  <li>{{ i18n.t('branches.validation_rules.timezone') }}</li>
                  <li>{{ i18n.t('branches.validation_rules.email') }}</li>
                  <li>{{ i18n.t('branches.validation_rules.phone') }}</li>
                </ul>
              </div>

              <!-- Form Actions -->
              <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-outline-secondary" (click)="onCancel()" [disabled]="saving()">
                  <i class="fa-solid fa-times me-2"></i>
                  {{ i18n.t('common.cancel') }}
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary" 
                  [disabled]="branchForm.invalid || saving()"
                >
                  @if (saving()) {
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  } @else {
                    <i class="fa-solid fa-save me-2"></i>
                  }
                  {{ saving() ? i18n.t('common.saving') : i18n.t('branches.update_branch') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('branches.branch_not_found') }}
        </div>
      }
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditBranchComponent, { className: "EditBranchComponent", filePath: "src/app/pages/branches/edit-branch/edit-branch.component.ts", lineNumber: 268 });
})();
export {
  EditBranchComponent
};
//# sourceMappingURL=chunk-NOUWVPSN.js.map
