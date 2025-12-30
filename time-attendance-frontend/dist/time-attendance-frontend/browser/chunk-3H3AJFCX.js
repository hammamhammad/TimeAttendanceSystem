import {
  RemoteWorkPoliciesService
} from "./chunk-EGHINQUX.js";
import {
  FormHeaderComponent
} from "./chunk-KM5VSJTZ.js";
import {
  SearchableSelectComponent
} from "./chunk-YPZLTOXZ.js";
import {
  BranchesService
} from "./chunk-VA62FO4C.js";
import "./chunk-HT4DZZW3.js";
import "./chunk-6LEZROWG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-GSKH2KOG.js";
import {
  CheckboxControlValueAccessor,
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
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import "./chunk-HZ2IZU2F.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  Component,
  Subject,
  inject,
  setClassMetadata,
  signal,
  switchMap,
  takeUntil,
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
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/remote-work-policy/edit-remote-work-policy/edit-remote-work-policy.component.ts
function EditRemoteWorkPolicyComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "app-loading-spinner", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("common.loading"))("variant", "primary")("centered", true);
  }
}
__name(EditRemoteWorkPolicyComponent_Conditional_2_Template, "EditRemoteWorkPolicyComponent_Conditional_2_Template");
function EditRemoteWorkPolicyComponent_Conditional_3_Conditional_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 43);
  }
}
__name(EditRemoteWorkPolicyComponent_Conditional_3_Conditional_82_Template, "EditRemoteWorkPolicyComponent_Conditional_3_Conditional_82_Template");
function EditRemoteWorkPolicyComponent_Conditional_3_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 44);
  }
}
__name(EditRemoteWorkPolicyComponent_Conditional_3_Conditional_83_Template, "EditRemoteWorkPolicyComponent_Conditional_3_Conditional_83_Template");
function EditRemoteWorkPolicyComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 5, 0);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function EditRemoteWorkPolicyComponent_Conditional_3_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "EditRemoteWorkPolicyComponent_Conditional_3_Template_form_ngSubmit_0_listener"));
    \u0275\u0275elementStart(2, "div", 6)(3, "div", 7)(4, "h5", 8);
    \u0275\u0275element(5, "i", 9);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 10)(8, "div", 11)(9, "div", 12)(10, "label", 13);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "app-searchable-select", 14);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditRemoteWorkPolicyComponent_Conditional_3_Template_app_searchable_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.policyForm.branchId, $event) || (ctx_r0.policyForm.branchId = $event);
      return \u0275\u0275resetView($event);
    }, "EditRemoteWorkPolicyComponent_Conditional_3_Template_app_searchable_select_ngModelChange_12_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 12)(14, "label", 15);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 16)(17, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditRemoteWorkPolicyComponent_Conditional_3_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.policyForm.isActive, $event) || (ctx_r0.policyForm.isActive = $event);
      return \u0275\u0275resetView($event);
    }, "EditRemoteWorkPolicyComponent_Conditional_3_Template_input_ngModelChange_17_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "label", 18);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(20, "div", 6)(21, "div", 7)(22, "h5", 8);
    \u0275\u0275element(23, "i", 19);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 10)(26, "p", 20);
    \u0275\u0275element(27, "i", 21);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 11)(30, "div", 22)(31, "label", 23);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditRemoteWorkPolicyComponent_Conditional_3_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.policyForm.maxDaysPerWeek, $event) || (ctx_r0.policyForm.maxDaysPerWeek = $event);
      return \u0275\u0275resetView($event);
    }, "EditRemoteWorkPolicyComponent_Conditional_3_Template_input_ngModelChange_33_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 25);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 22)(37, "label", 26);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditRemoteWorkPolicyComponent_Conditional_3_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.policyForm.maxDaysPerMonth, $event) || (ctx_r0.policyForm.maxDaysPerMonth = $event);
      return \u0275\u0275resetView($event);
    }, "EditRemoteWorkPolicyComponent_Conditional_3_Template_input_ngModelChange_39_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 25);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 22)(43, "label", 28);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditRemoteWorkPolicyComponent_Conditional_3_Template_input_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.policyForm.maxDaysPerYear, $event) || (ctx_r0.policyForm.maxDaysPerYear = $event);
      return \u0275\u0275resetView($event);
    }, "EditRemoteWorkPolicyComponent_Conditional_3_Template_input_ngModelChange_45_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 25);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(48, "div", 6)(49, "div", 7)(50, "h5", 8);
    \u0275\u0275element(51, "i", 30);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 10)(54, "div", 11)(55, "div", 31)(56, "div", 32)(57, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditRemoteWorkPolicyComponent_Conditional_3_Template_input_ngModelChange_57_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.policyForm.requiresManagerApproval, $event) || (ctx_r0.policyForm.requiresManagerApproval = $event);
      return \u0275\u0275resetView($event);
    }, "EditRemoteWorkPolicyComponent_Conditional_3_Template_input_ngModelChange_57_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "label", 34);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 25);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(62, "div", 6)(63, "div", 7)(64, "h5", 8);
    \u0275\u0275element(65, "i", 35);
    \u0275\u0275text(66);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div", 10)(68, "div", 11)(69, "div", 12)(70, "label", 36);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function EditRemoteWorkPolicyComponent_Conditional_3_Template_input_ngModelChange_72_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.policyForm.minAdvanceNoticeDays, $event) || (ctx_r0.policyForm.minAdvanceNoticeDays = $event);
      return \u0275\u0275resetView($event);
    }, "EditRemoteWorkPolicyComponent_Conditional_3_Template_input_ngModelChange_72_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div", 25);
    \u0275\u0275text(74);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(75, "div", 38)(76, "div", 10)(77, "div", 39)(78, "button", 40);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditRemoteWorkPolicyComponent_Conditional_3_Template_button_click_78_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "EditRemoteWorkPolicyComponent_Conditional_3_Template_button_click_78_listener"));
    \u0275\u0275element(79, "i", 41);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "button", 42);
    \u0275\u0275conditionalCreate(82, EditRemoteWorkPolicyComponent_Conditional_3_Conditional_82_Template, 1, 0, "span", 43)(83, EditRemoteWorkPolicyComponent_Conditional_3_Conditional_83_Template, 1, 0, "i", 44);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const policyFormElement_r3 = \u0275\u0275reference(1);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.basic_information"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.branch"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.policyForm.branchId);
    \u0275\u0275property("options", ctx_r0.branches())("placeholder", ctx_r0.i18n.t("remoteWork.policy.select_branch"))("required", true);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.status"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.policyForm.isActive);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.policyForm.isActive ? ctx_r0.i18n.t("common.active") : ctx_r0.i18n.t("common.inactive"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.quota_settings"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.quota_settings_help"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.max_days_per_week"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.policyForm.maxDaysPerWeek);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("remoteWork.policy.no_limit"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("remoteWork.policy.max_7_days"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.max_days_per_month"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.policyForm.maxDaysPerMonth);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("remoteWork.policy.no_limit"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("remoteWork.policy.max_31_days"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.max_days_per_year"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.policyForm.maxDaysPerYear);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("remoteWork.policy.no_limit"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("remoteWork.policy.max_365_days"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.approval_settings"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.policyForm.requiresManagerApproval);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.requires_manager_approval"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.policyForm.requiresManagerApproval ? ctx_r0.i18n.t("remoteWork.policy.approval_required_help") : ctx_r0.i18n.t("remoteWork.policy.approval_automatic_help"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.advance_notice"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("remoteWork.policy.min_advance_notice_days"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.policyForm.minAdvanceNoticeDays);
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("remoteWork.policy.no_advance_notice"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("remoteWork.policy.advance_notice_help"));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.submitting() || !policyFormElement_r3.form.valid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.submitting() ? 82 : 83);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.save"), " ");
  }
}
__name(EditRemoteWorkPolicyComponent_Conditional_3_Template, "EditRemoteWorkPolicyComponent_Conditional_3_Template");
var _EditRemoteWorkPolicyComponent = class _EditRemoteWorkPolicyComponent {
  service = inject(RemoteWorkPoliciesService);
  branchesService = inject(BranchesService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  notificationService = inject(NotificationService);
  destroy$ = new Subject();
  i18n = inject(I18nService);
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  policyId = signal(null, ...ngDevMode ? [{ debugName: "policyId" }] : []);
  // Form state
  policyForm = {
    branchId: void 0,
    maxDaysPerWeek: void 0,
    maxDaysPerMonth: void 0,
    maxDaysPerYear: void 0,
    requiresManagerApproval: true,
    allowConsecutiveDays: false,
    maxConsecutiveDays: void 0,
    minAdvanceNoticeDays: void 0,
    blackoutPeriods: void 0,
    countForOvertime: true,
    enforceShiftTimes: true,
    isActive: true
  };
  ngOnInit() {
    this.loadBranches();
    this.loadPolicy();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Load branches for selection
   */
  loadBranches() {
    this.branchesService.getBranchesForDropdown().subscribe({
      next: /* @__PURE__ */ __name((branches) => {
        this.branches.set(branches.map((b) => ({
          value: b.id,
          label: b.name
        })));
      }, "next"),
      error: /* @__PURE__ */ __name((err) => {
        console.error("Failed to load branches:", err);
        this.notificationService.error(this.i18n.t("branches.errors.load_failed"));
      }, "error")
    });
  }
  /**
   * Load policy data
   */
  loadPolicy() {
    this.loading.set(true);
    this.route.paramMap.pipe(takeUntil(this.destroy$), switchMap((params) => {
      const id = Number(params.get("id"));
      if (!id || id <= 0) {
        this.notificationService.error(this.i18n.t("remoteWork.policy.errors.invalid_id"));
        this.router.navigate(["/settings/remote-work-policy"]);
        throw new Error("Invalid policy ID");
      }
      this.policyId.set(id);
      return this.service.getById(id);
    })).subscribe({
      next: /* @__PURE__ */ __name((policy) => {
        this.populateForm(policy);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((err) => {
        this.loading.set(false);
        console.error("Failed to load policy:", err);
        if (err.status === 404) {
          this.notificationService.error(this.i18n.t("remoteWork.policy.errors.not_found"));
        } else {
          this.notificationService.error(this.i18n.t("remoteWork.policy.errors.load_failed"));
        }
        this.router.navigate(["/settings/remote-work-policy"]);
      }, "error")
    });
  }
  /**
   * Populate form with policy data
   */
  populateForm(policy) {
    this.policyForm = {
      branchId: policy.branchId,
      maxDaysPerWeek: policy.maxDaysPerWeek ?? void 0,
      maxDaysPerMonth: policy.maxDaysPerMonth ?? void 0,
      maxDaysPerYear: policy.maxDaysPerYear ?? void 0,
      requiresManagerApproval: policy.requiresManagerApproval,
      allowConsecutiveDays: policy.allowConsecutiveDays,
      maxConsecutiveDays: policy.maxConsecutiveDays ?? void 0,
      minAdvanceNoticeDays: policy.minAdvanceNoticeDays ?? void 0,
      blackoutPeriods: policy.blackoutPeriods ?? void 0,
      countForOvertime: policy.countForOvertime,
      enforceShiftTimes: policy.enforceShiftTimes,
      isActive: policy.isActive
    };
  }
  /**
   * Handle form submission
   */
  onSubmit() {
    if (!this.validateForm()) {
      return;
    }
    const id = this.policyId();
    if (!id) {
      this.notificationService.error(this.i18n.t("remoteWork.policy.errors.invalid_id"));
      return;
    }
    this.submitting.set(true);
    const payload = {
      id,
      maxDaysPerWeek: this.policyForm.maxDaysPerWeek,
      maxDaysPerMonth: this.policyForm.maxDaysPerMonth,
      maxDaysPerYear: this.policyForm.maxDaysPerYear,
      requiresManagerApproval: this.policyForm.requiresManagerApproval,
      allowConsecutiveDays: this.policyForm.allowConsecutiveDays,
      maxConsecutiveDays: this.policyForm.maxConsecutiveDays,
      minAdvanceNoticeDays: this.policyForm.minAdvanceNoticeDays,
      blackoutPeriods: this.policyForm.blackoutPeriods,
      countForOvertime: this.policyForm.countForOvertime,
      enforceShiftTimes: this.policyForm.enforceShiftTimes
    };
    this.service.update(id, payload).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.submitting.set(false);
        this.notificationService.success(this.i18n.t("remoteWork.policy.success.updated"));
        this.router.navigate(["/settings/remote-work-policy"]);
      }, "next"),
      error: /* @__PURE__ */ __name((err) => {
        this.submitting.set(false);
        console.error("Failed to update policy:", err);
        this.notificationService.error(this.i18n.t("remoteWork.policy.errors.update_failed"));
      }, "error")
    });
  }
  /**
   * Validate form data
   */
  validateForm() {
    if (!this.policyForm.branchId) {
      this.notificationService.error(this.i18n.t("remoteWork.policy.errors.branch_required"));
      return false;
    }
    const hasQuota = this.policyForm.maxDaysPerWeek !== void 0 && this.policyForm.maxDaysPerWeek !== null || this.policyForm.maxDaysPerMonth !== void 0 && this.policyForm.maxDaysPerMonth !== null || this.policyForm.maxDaysPerYear !== void 0 && this.policyForm.maxDaysPerYear !== null;
    if (!hasQuota) {
      this.notificationService.warning(this.i18n.t("remoteWork.policy.warnings.no_quotas"));
    }
    if (this.policyForm.maxDaysPerWeek !== void 0 && this.policyForm.maxDaysPerWeek !== null && (this.policyForm.maxDaysPerWeek < 0 || this.policyForm.maxDaysPerWeek > 7)) {
      this.notificationService.error(this.i18n.t("remoteWork.policy.errors.invalid_max_days_per_week"));
      return false;
    }
    if (this.policyForm.maxDaysPerMonth !== void 0 && this.policyForm.maxDaysPerMonth !== null && (this.policyForm.maxDaysPerMonth < 0 || this.policyForm.maxDaysPerMonth > 31)) {
      this.notificationService.error(this.i18n.t("remoteWork.policy.errors.invalid_max_days_per_month"));
      return false;
    }
    if (this.policyForm.maxDaysPerYear !== void 0 && this.policyForm.maxDaysPerYear !== null && (this.policyForm.maxDaysPerYear < 0 || this.policyForm.maxDaysPerYear > 365)) {
      this.notificationService.error(this.i18n.t("remoteWork.policy.errors.invalid_max_days_per_year"));
      return false;
    }
    if (this.policyForm.minAdvanceNoticeDays !== void 0 && this.policyForm.minAdvanceNoticeDays !== null && this.policyForm.minAdvanceNoticeDays < 0) {
      this.notificationService.error(this.i18n.t("remoteWork.policy.errors.invalid_advance_notice"));
      return false;
    }
    return true;
  }
  /**
   * Cancel and go back
   */
  onCancel() {
    this.router.navigate(["/settings/remote-work-policy"]);
  }
};
__name(_EditRemoteWorkPolicyComponent, "EditRemoteWorkPolicyComponent");
__publicField(_EditRemoteWorkPolicyComponent, "\u0275fac", /* @__PURE__ */ __name(function EditRemoteWorkPolicyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditRemoteWorkPolicyComponent)();
}, "EditRemoteWorkPolicyComponent_Factory"));
__publicField(_EditRemoteWorkPolicyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditRemoteWorkPolicyComponent, selectors: [["app-edit-remote-work-policy"]], decls: 4, vars: 4, consts: [["policyFormElement", "ngForm"], [1, "edit-remote-work-policy-page"], ["mode", "edit", "moduleName", "remote-work-policy", "moduleRoute", "settings/remote-work-policy", 3, "title", "entityId", "loading"], [1, "d-flex", "justify-content-center", "align-items-center", "py-5"], [3, "message", "variant", "centered"], [3, "ngSubmit"], [1, "card", "mb-4"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-info-circle", "text-info", "me-2"], [1, "card-body"], [1, "row"], [1, "col-md-6", "mb-3"], ["for", "branchId", 1, "form-label", "required"], ["name", "branchId", "valueField", "id", "labelField", "name", 3, "ngModelChange", "ngModel", "options", "placeholder", "required"], ["for", "isActive", 1, "form-label"], [1, "form-check", "form-switch", "mt-2"], ["type", "checkbox", "id", "isActive", "name", "isActive", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "isActive", 1, "form-check-label"], [1, "fas", "fa-calendar-check", "text-success", "me-2"], [1, "text-muted", "mb-3"], [1, "fas", "fa-info-circle", "me-1"], [1, "col-md-4", "mb-3"], ["for", "maxDaysPerWeek", 1, "form-label"], ["type", "number", "id", "maxDaysPerWeek", "name", "maxDaysPerWeek", "min", "0", "max", "7", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder"], [1, "form-text"], ["for", "maxDaysPerMonth", 1, "form-label"], ["type", "number", "id", "maxDaysPerMonth", "name", "maxDaysPerMonth", "min", "0", "max", "31", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder"], ["for", "maxDaysPerYear", 1, "form-label"], ["type", "number", "id", "maxDaysPerYear", "name", "maxDaysPerYear", "min", "0", "max", "365", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder"], [1, "fas", "fa-user-check", "text-warning", "me-2"], [1, "col-md-12", "mb-3"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "requiresManagerApproval", "name", "requiresManagerApproval", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "requiresManagerApproval", 1, "form-check-label"], [1, "fas", "fa-bell", "text-primary", "me-2"], ["for", "minAdvanceNoticeDays", 1, "form-label"], ["type", "number", "id", "minAdvanceNoticeDays", "name", "minAdvanceNoticeDays", "min", "0", 1, "form-control", 3, "ngModelChange", "ngModel", "placeholder"], [1, "card"], [1, "d-flex", "justify-content-end", "gap-2"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], [1, "fas", "fa-times", "me-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-save", "me-2"]], template: /* @__PURE__ */ __name(function EditRemoteWorkPolicyComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-form-header", 2);
    \u0275\u0275conditionalCreate(2, EditRemoteWorkPolicyComponent_Conditional_2_Template, 2, 3, "div", 3)(3, EditRemoteWorkPolicyComponent_Conditional_3_Template, 85, 37, "form");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("remoteWork.policy.edit_policy"))("entityId", ctx.policyId() || void 0)("loading", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : 3);
  }
}, "EditRemoteWorkPolicyComponent_Template"), dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, NgModel, NgForm, FormHeaderComponent, SearchableSelectComponent, LoadingSpinnerComponent], styles: ['\n\n.edit-remote-work-policy-page[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.card[_ngcontent-%COMP%] {\n  border: 1px solid #e9ecef;\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n  transition: box-shadow 0.3s ease;\n}\n.card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #e9ecef;\n  padding: 1rem 1.5rem;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #495057;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.required[_ngcontent-%COMP%]::after {\n  content: " *";\n  color: #dc3545;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: #198754;\n  border-color: #198754;\n}\n.gap-2[_ngcontent-%COMP%] {\n  gap: 0.5rem;\n}\n@media (max-width: 768px) {\n  .edit-remote-work-policy-page[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=edit-remote-work-policy.component.css.map */'] }));
var EditRemoteWorkPolicyComponent = _EditRemoteWorkPolicyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditRemoteWorkPolicyComponent, [{
    type: Component,
    args: [{ selector: "app-edit-remote-work-policy", standalone: true, imports: [FormsModule, FormHeaderComponent, SearchableSelectComponent, LoadingSpinnerComponent], template: `<div class="edit-remote-work-policy-page">\r
  <!-- Page Header -->\r
  <app-form-header\r
    mode="edit"\r
    [title]="i18n.t('remoteWork.policy.edit_policy')"\r
    moduleName="remote-work-policy"\r
    moduleRoute="settings/remote-work-policy"\r
    [entityId]="policyId() || undefined"\r
    [loading]="submitting()">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="d-flex justify-content-center align-items-center py-5">\r
      <app-loading-spinner\r
        [message]="i18n.t('common.loading')"\r
        [variant]="'primary'"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  } @else {\r
    <!-- Policy Form -->\r
    <form (ngSubmit)="onSubmit()" #policyFormElement="ngForm">\r
      <!-- Basic Information -->\r
      <div class="card mb-4">\r
        <div class="card-header">\r
          <h5 class="card-title mb-0">\r
            <i class="fas fa-info-circle text-info me-2"></i>\r
            {{ i18n.t('common.basic_information') }}\r
          </h5>\r
        </div>\r
        <div class="card-body">\r
          <div class="row">\r
            <!-- Branch Selection -->\r
            <div class="col-md-6 mb-3">\r
              <label for="branchId" class="form-label required">\r
                {{ i18n.t('remoteWork.policy.branch') }}\r
              </label>\r
              <app-searchable-select\r
                [(ngModel)]="policyForm.branchId"\r
                name="branchId"\r
                [options]="branches()"\r
                [placeholder]="i18n.t('remoteWork.policy.select_branch')"\r
                [required]="true"\r
                valueField="id"\r
                labelField="name">\r
              </app-searchable-select>\r
            </div>\r
\r
            <!-- Active Status -->\r
            <div class="col-md-6 mb-3">\r
              <label for="isActive" class="form-label">\r
                {{ i18n.t('common.status') }}\r
              </label>\r
              <div class="form-check form-switch mt-2">\r
                <input\r
                  class="form-check-input"\r
                  type="checkbox"\r
                  id="isActive"\r
                  [(ngModel)]="policyForm.isActive"\r
                  name="isActive">\r
                <label class="form-check-label" for="isActive">\r
                  {{ policyForm.isActive ? i18n.t('common.active') : i18n.t('common.inactive') }}\r
                </label>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Quota Settings -->\r
      <div class="card mb-4">\r
        <div class="card-header">\r
          <h5 class="card-title mb-0">\r
            <i class="fas fa-calendar-check text-success me-2"></i>\r
            {{ i18n.t('remoteWork.policy.quota_settings') }}\r
          </h5>\r
        </div>\r
        <div class="card-body">\r
          <p class="text-muted mb-3">\r
            <i class="fas fa-info-circle me-1"></i>\r
            {{ i18n.t('remoteWork.policy.quota_settings_help') }}\r
          </p>\r
          <div class="row">\r
            <!-- Max Days Per Week -->\r
            <div class="col-md-4 mb-3">\r
              <label for="maxDaysPerWeek" class="form-label">\r
                {{ i18n.t('remoteWork.policy.max_days_per_week') }}\r
              </label>\r
              <input\r
                type="number"\r
                class="form-control"\r
                id="maxDaysPerWeek"\r
                [(ngModel)]="policyForm.maxDaysPerWeek"\r
                name="maxDaysPerWeek"\r
                min="0"\r
                max="7"\r
                [placeholder]="i18n.t('remoteWork.policy.no_limit')">\r
              <div class="form-text">{{ i18n.t('remoteWork.policy.max_7_days') }}</div>\r
            </div>\r
\r
            <!-- Max Days Per Month -->\r
            <div class="col-md-4 mb-3">\r
              <label for="maxDaysPerMonth" class="form-label">\r
                {{ i18n.t('remoteWork.policy.max_days_per_month') }}\r
              </label>\r
              <input\r
                type="number"\r
                class="form-control"\r
                id="maxDaysPerMonth"\r
                [(ngModel)]="policyForm.maxDaysPerMonth"\r
                name="maxDaysPerMonth"\r
                min="0"\r
                max="31"\r
                [placeholder]="i18n.t('remoteWork.policy.no_limit')">\r
              <div class="form-text">{{ i18n.t('remoteWork.policy.max_31_days') }}</div>\r
            </div>\r
\r
            <!-- Max Days Per Year -->\r
            <div class="col-md-4 mb-3">\r
              <label for="maxDaysPerYear" class="form-label">\r
                {{ i18n.t('remoteWork.policy.max_days_per_year') }}\r
              </label>\r
              <input\r
                type="number"\r
                class="form-control"\r
                id="maxDaysPerYear"\r
                [(ngModel)]="policyForm.maxDaysPerYear"\r
                name="maxDaysPerYear"\r
                min="0"\r
                max="365"\r
                [placeholder]="i18n.t('remoteWork.policy.no_limit')">\r
              <div class="form-text">{{ i18n.t('remoteWork.policy.max_365_days') }}</div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Approval Settings -->\r
      <div class="card mb-4">\r
        <div class="card-header">\r
          <h5 class="card-title mb-0">\r
            <i class="fas fa-user-check text-warning me-2"></i>\r
            {{ i18n.t('remoteWork.policy.approval_settings') }}\r
          </h5>\r
        </div>\r
        <div class="card-body">\r
          <div class="row">\r
            <!-- Manager Approval Required -->\r
            <div class="col-md-12 mb-3">\r
              <div class="form-check form-switch">\r
                <input\r
                  class="form-check-input"\r
                  type="checkbox"\r
                  id="requiresManagerApproval"\r
                  [(ngModel)]="policyForm.requiresManagerApproval"\r
                  name="requiresManagerApproval">\r
                <label class="form-check-label" for="requiresManagerApproval">\r
                  {{ i18n.t('remoteWork.policy.requires_manager_approval') }}\r
                </label>\r
              </div>\r
              <div class="form-text">\r
                {{ policyForm.requiresManagerApproval\r
                  ? i18n.t('remoteWork.policy.approval_required_help')\r
                  : i18n.t('remoteWork.policy.approval_automatic_help') }}\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Advance Notice -->\r
      <div class="card mb-4">\r
        <div class="card-header">\r
          <h5 class="card-title mb-0">\r
            <i class="fas fa-bell text-primary me-2"></i>\r
            {{ i18n.t('remoteWork.policy.advance_notice') }}\r
          </h5>\r
        </div>\r
        <div class="card-body">\r
          <div class="row">\r
            <!-- Minimum Advance Notice Days -->\r
            <div class="col-md-6 mb-3">\r
              <label for="minAdvanceNoticeDays" class="form-label">\r
                {{ i18n.t('remoteWork.policy.min_advance_notice_days') }}\r
              </label>\r
              <input\r
                type="number"\r
                class="form-control"\r
                id="minAdvanceNoticeDays"\r
                [(ngModel)]="policyForm.minAdvanceNoticeDays"\r
                name="minAdvanceNoticeDays"\r
                min="0"\r
                [placeholder]="i18n.t('remoteWork.policy.no_advance_notice')">\r
              <div class="form-text">{{ i18n.t('remoteWork.policy.advance_notice_help') }}</div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Form Actions -->\r
      <div class="card">\r
        <div class="card-body">\r
          <div class="d-flex justify-content-end gap-2">\r
            <button\r
              type="button"\r
              class="btn btn-secondary"\r
              (click)="onCancel()"\r
              [disabled]="submitting()">\r
              <i class="fas fa-times me-2"></i>\r
              {{ i18n.t('common.cancel') }}\r
            </button>\r
            <button\r
              type="submit"\r
              class="btn btn-primary"\r
              [disabled]="submitting() || !policyFormElement.form.valid">\r
              @if (submitting()) {\r
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>\r
              } @else {\r
                <i class="fas fa-save me-2"></i>\r
              }\r
              {{ i18n.t('common.save') }}\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
    </form>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/settings/remote-work-policy/edit-remote-work-policy/edit-remote-work-policy.component.css */\n.edit-remote-work-policy-page {\n  padding: 1.5rem;\n}\n.card {\n  border: 1px solid #e9ecef;\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n  transition: box-shadow 0.3s ease;\n}\n.card:hover {\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.card-header {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #e9ecef;\n  padding: 1rem 1.5rem;\n}\n.card-title {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #495057;\n}\n.card-body {\n  padding: 1.5rem;\n}\n.required::after {\n  content: " *";\n  color: #dc3545;\n}\n.form-check-input:checked {\n  background-color: #198754;\n  border-color: #198754;\n}\n.gap-2 {\n  gap: 0.5rem;\n}\n@media (max-width: 768px) {\n  .edit-remote-work-policy-page {\n    padding: 1rem;\n  }\n  .card-body {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=edit-remote-work-policy.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditRemoteWorkPolicyComponent, { className: "EditRemoteWorkPolicyComponent", filePath: "src/app/pages/settings/remote-work-policy/edit-remote-work-policy/edit-remote-work-policy.component.ts", lineNumber: 22 });
})();
export {
  EditRemoteWorkPolicyComponent
};
//# sourceMappingURL=chunk-3H3AJFCX.js.map
