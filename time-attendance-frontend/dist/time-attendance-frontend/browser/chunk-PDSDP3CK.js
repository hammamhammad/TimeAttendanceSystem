import {
  OvertimeConfigurationsService
} from "./chunk-U3ZJ45W7.js";
import {
  DetailCardComponent
} from "./chunk-H3TT7FFA.js";
import {
  FormHeaderComponent
} from "./chunk-Z5T46DE2.js";
import {
  LoadingSpinnerComponent
} from "./chunk-WJCQS5EA.js";
import {
  StatusBadgeComponent
} from "./chunk-GFM52OPW.js";
import {
  ConfirmationService
} from "./chunk-OJL2NUV4.js";
import {
  PermissionActions,
  PermissionService
} from "./chunk-DKGIYIS4.js";
import {
  NotificationService
} from "./chunk-TDD355PI.js";
import "./chunk-IL4NCC2P.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  Router,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-54H4HALB.js";
import {
  __async,
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/overtime/view-overtime-configuration/view-overtime-configuration.component.ts
function ViewOvertimeConfigurationComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("overtime_configs.loading_details"))("variant", "primary")("centered", true);
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_2_Template, "ViewOvertimeConfigurationComponent_Conditional_2_Template");
function ViewOvertimeConfigurationComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "i", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_3_Template, "ViewOvertimeConfigurationComponent_Conditional_3_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 32);
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Conditional_1_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Conditional_1_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 34);
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap(((tmp_4_0 = ctx_r0.overtimeConfig()) == null ? null : tmp_4_0.isActive) ? "fa-pause" : "fa-check");
    \u0275\u0275classProp("me-2", true);
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Conditional_2_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Conditional_2_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.toggleStatus());
    }, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Conditional_1_Template, 1, 0, "span", 32)(2, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Conditional_2_Template, 1, 4, "i", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_6_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(((tmp_3_0 = ctx_r0.overtimeConfig()) == null ? null : tmp_3_0.isActive) ? "btn-warning" : "btn-success");
    \u0275\u0275property("disabled", ctx_r0.processing());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.processing() ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ((tmp_6_0 = ctx_r0.overtimeConfig()) == null ? null : tmp_6_0.isActive) ? ctx_r0.i18n.t("common.deactivate") : ctx_r0.i18n.t("common.activate"), " ");
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 32);
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Conditional_1_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Conditional_1_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 36);
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Conditional_2_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Conditional_2_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteOvertimeConfiguration());
    }, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Conditional_1_Template, 1, 0, "span", 32)(2, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Conditional_2_Template, 1, 0, "i", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.processing());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.processing() ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.delete"), " ");
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "h6", 16);
    \u0275\u0275element(3, "i", 27);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 18)(6, "div", 28);
    \u0275\u0275conditionalCreate(7, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_7_Template, 4, 5, "button", 29);
    \u0275\u0275conditionalCreate(8, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Conditional_8_Template, 4, 3, "button", 30);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.actions"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.canToggleStatus() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canDelete() ? 8 : -1);
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 7);
    \u0275\u0275element(2, "app-detail-card", 8)(3, "app-detail-card", 9)(4, "app-detail-card", 10)(5, "app-detail-card", 11)(6, "app-detail-card", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 13);
    \u0275\u0275conditionalCreate(8, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_8_Template, 9, 3, "div", 14);
    \u0275\u0275elementStart(9, "div", 14)(10, "div", 15)(11, "h6", 16);
    \u0275\u0275element(12, "i", 17);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 18)(15, "div", 19)(16, "div", 20)(17, "div", 21);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 22);
    \u0275\u0275element(20, "app-status-badge", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 20)(22, "div", 21);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 22);
    \u0275\u0275element(25, "app-status-badge", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 20)(27, "div", 21);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 24);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 20)(32, "div", 21);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 24);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 20)(37, "div", 21);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 22);
    \u0275\u0275element(40, "app-status-badge", 23);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(41, "div", 25)(42, "div", 15)(43, "h6", 16);
    \u0275\u0275element(44, "i", 26);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(46, "div", 18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_20_0;
    let tmp_22_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("overtime_configs.basic_information"))("fields", ctx_r0.basicInfoFields);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("overtime_configs.overtime_settings"))("fields", ctx_r0.overtimeSettingsFields);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("overtime_configs.overtime_rates"))("fields", ctx_r0.overtimeRatesFields);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("overtime_configs.policy_settings"))("fields", ctx_r0.policySettingsFields);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("overtime_configs.audit_information"))("fields", ctx_r0.auditFields);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasActiveActions() ? 8 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("overtime_configs.configuration_summary"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("overtime_configs.pre_shift_overtime"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.preShiftOvertimeBadge().label)("variant", ctx_r0.preShiftOvertimeBadge().variant);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("overtime_configs.post_shift_overtime"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.postShiftOvertimeBadge().label)("variant", ctx_r0.postShiftOvertimeBadge().variant);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("overtime_configs.normal_rate"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (tmp_20_0 = ctx_r0.overtimeConfig()) == null ? null : tmp_20_0.normalDayRate, "x");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("overtime_configs.holiday_rate"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (tmp_22_0 = ctx_r0.overtimeConfig()) == null ? null : tmp_22_0.publicHolidayRate, "x");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("overtime_configs.requires_approval"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.requiresApprovalBadge().label)("variant", ctx_r0.requiresApprovalBadge().variant);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.navigation"), " ");
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Template");
var _ViewOvertimeConfigurationComponent = class _ViewOvertimeConfigurationComponent {
  i18n = inject(I18nService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  overtimeConfigurationsService = inject(OvertimeConfigurationsService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  permissionService = inject(PermissionService);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  processing = signal(false, ...ngDevMode ? [{ debugName: "processing" }] : []);
  overtimeConfig = signal(null, ...ngDevMode ? [{ debugName: "overtimeConfig" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  get basicInfoFields() {
    const config = this.overtimeConfig();
    if (!config)
      return [];
    return [
      {
        label: this.i18n.t("fields.status"),
        value: config.isActive ? this.i18n.t("common.active") : this.i18n.t("common.inactive"),
        type: "badge",
        badgeVariant: config.isActive ? "success" : "secondary"
      },
      {
        label: this.i18n.t("overtime_configs.effective_from"),
        value: config.effectiveFromDate,
        type: "date"
      },
      {
        label: this.i18n.t("overtime_configs.effective_to"),
        value: config.effectiveToDate || this.i18n.t("common.ongoing"),
        type: config.effectiveToDate ? "date" : void 0
      }
    ];
  }
  get overtimeSettingsFields() {
    const config = this.overtimeConfig();
    if (!config)
      return [];
    return [
      {
        label: this.i18n.t("overtime_configs.enable_pre_shift"),
        value: config.enablePreShiftOvertime ? this.i18n.t("common.enabled") : this.i18n.t("common.disabled"),
        type: "badge",
        badgeVariant: config.enablePreShiftOvertime ? "success" : "secondary"
      },
      {
        label: this.i18n.t("overtime_configs.enable_post_shift"),
        value: config.enablePostShiftOvertime ? this.i18n.t("common.enabled") : this.i18n.t("common.disabled"),
        type: "badge",
        badgeVariant: config.enablePostShiftOvertime ? "success" : "secondary"
      },
      {
        label: this.i18n.t("overtime_configs.max_pre_shift_hours"),
        value: `${config.maxPreShiftOvertimeHours} ${this.i18n.t("fields.hoursUnit")}`
      },
      {
        label: this.i18n.t("overtime_configs.max_post_shift_hours"),
        value: `${config.maxPostShiftOvertimeHours} ${this.i18n.t("fields.hoursUnit")}`
      },
      {
        label: this.i18n.t("overtime_configs.minimum_overtime_minutes"),
        value: `${config.minimumOvertimeMinutes} ${this.i18n.t("fields.minutesUnit")}`
      },
      {
        label: this.i18n.t("overtime_configs.grace_period_minutes"),
        value: `${config.overtimeGracePeriodMinutes} ${this.i18n.t("fields.minutesUnit")}`
      },
      {
        label: this.i18n.t("overtime_configs.rounding_interval"),
        value: `${config.roundingIntervalMinutes} ${this.i18n.t("fields.minutesUnit")}`
      }
    ];
  }
  get overtimeRatesFields() {
    const config = this.overtimeConfig();
    if (!config)
      return [];
    return [
      {
        label: this.i18n.t("overtime_configs.normal_day_rate"),
        value: `${config.normalDayRate}x`
      },
      {
        label: this.i18n.t("overtime_configs.public_holiday_rate"),
        value: `${config.publicHolidayRate}x`
      },
      {
        label: this.i18n.t("overtime_configs.off_day_rate"),
        value: `${config.offDayRate}x`
      }
    ];
  }
  get policySettingsFields() {
    const config = this.overtimeConfig();
    if (!config)
      return [];
    const fields = [
      {
        label: this.i18n.t("overtime_configs.require_approval"),
        value: config.requireApproval ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
        type: "badge",
        badgeVariant: config.requireApproval ? "warning" : "success"
      },
      {
        label: this.i18n.t("overtime_configs.consider_flexible_time"),
        value: config.considerFlexibleTime ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
        type: "badge",
        badgeVariant: config.considerFlexibleTime ? "info" : "secondary"
      },
      {
        label: this.i18n.t("overtime_configs.weekend_as_off_day"),
        value: config.weekendAsOffDay ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
        type: "badge",
        badgeVariant: config.weekendAsOffDay ? "info" : "secondary"
      }
    ];
    if (config.policyNotes) {
      fields.push({
        label: this.i18n.t("overtime_configs.policy_notes"),
        value: config.policyNotes
      });
    }
    return fields;
  }
  get auditFields() {
    const config = this.overtimeConfig();
    if (!config)
      return [];
    const fields = [
      {
        label: this.i18n.t("fields.createdAt"),
        value: config.createdAtUtc,
        type: "datetime"
      },
      {
        label: this.i18n.t("fields.createdBy"),
        value: config.createdBy
      }
    ];
    if (config.updatedAtUtc && config.updatedBy) {
      fields.push({
        label: this.i18n.t("fields.updatedAt"),
        value: config.updatedAtUtc,
        type: "datetime"
      }, {
        label: this.i18n.t("fields.updatedBy"),
        value: config.updatedBy
      });
    }
    return fields;
  }
  ngOnInit() {
    this.loadOvertimeConfigurationDetails();
  }
  loadOvertimeConfigurationDetails() {
    const configId = this.route.snapshot.paramMap.get("id");
    if (!configId) {
      this.router.navigate(["/settings/overtime"]);
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.overtimeConfigurationsService.getOvertimeConfigurationById(+configId).subscribe({
      next: /* @__PURE__ */ __name((config) => {
        this.overtimeConfig.set(config);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load overtime configuration details:", error);
        this.error.set(this.i18n.t("overtime_configs.errors.load_failed"));
        this.loading.set(false);
      }, "error")
    });
  }
  toggleStatus() {
    return __async(this, null, function* () {
      if (!this.overtimeConfig())
        return;
      const config = this.overtimeConfig();
      const isActivating = !config.isActive;
      const result = yield this.confirmationService.confirm({
        title: isActivating ? this.i18n.t("overtime_configs.activate_configuration") : this.i18n.t("overtime_configs.deactivate_configuration"),
        message: isActivating ? this.i18n.t("overtime_configs.confirm_activate") : this.i18n.t("overtime_configs.confirm_deactivate"),
        confirmText: isActivating ? this.i18n.t("common.activate") : this.i18n.t("common.deactivate"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: isActivating ? "btn-success" : "btn-warning",
        icon: isActivating ? "fa-check" : "fa-pause",
        iconClass: isActivating ? "text-success" : "text-warning"
      });
      if (result.confirmed) {
        this.processing.set(true);
        const action = isActivating ? this.overtimeConfigurationsService.activateOvertimeConfiguration(config.id) : this.overtimeConfigurationsService.deactivateOvertimeConfiguration(config.id);
        action.subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(isActivating ? this.i18n.t("overtime_configs.success.activated") : this.i18n.t("overtime_configs.success.deactivated"));
            this.loadOvertimeConfigurationDetails();
            this.processing.set(false);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to toggle overtime configuration status:", error);
            this.notificationService.error(this.i18n.t("overtime_configs.errors.toggle_status_failed"));
            this.processing.set(false);
          }, "error")
        });
      }
    });
  }
  deleteOvertimeConfiguration() {
    return __async(this, null, function* () {
      if (!this.overtimeConfig())
        return;
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("overtime_configs.delete_configuration"),
        message: this.i18n.t("overtime_configs.confirm_delete"),
        confirmText: this.i18n.t("common.delete"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.processing.set(true);
        this.overtimeConfigurationsService.deleteOvertimeConfiguration(this.overtimeConfig().id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("overtime_configs.success.deleted"));
            this.router.navigate(["/settings/overtime"]);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete overtime configuration:", error);
            this.notificationService.error(this.i18n.t("overtime_configs.errors.delete_failed"));
            this.processing.set(false);
          }, "error")
        });
      }
    });
  }
  // Permission checks
  canEdit() {
    return this.permissionService.has(`overtime-config.${PermissionActions.UPDATE}`);
  }
  canToggleStatus() {
    return this.permissionService.has(`overtime-config.${PermissionActions.UPDATE}`);
  }
  canDelete() {
    return this.permissionService.has(`overtime-config.${PermissionActions.DELETE}`);
  }
  hasActiveActions() {
    return this.canEdit() || this.canToggleStatus() || this.canDelete();
  }
  getConfigurationDisplayName() {
    const config = this.overtimeConfig();
    if (!config)
      return "";
    return `${this.i18n.t("overtime_configs.configuration")} #${config.id}`;
  }
  // Computed properties for status badges
  preShiftOvertimeBadge = computed(() => {
    const config = this.overtimeConfig();
    if (!config)
      return { label: "", variant: "secondary" };
    return {
      label: config.enablePreShiftOvertime ? this.i18n.t("common.enabled") : this.i18n.t("common.disabled"),
      variant: config.enablePreShiftOvertime ? "success" : "secondary"
    };
  }, ...ngDevMode ? [{ debugName: "preShiftOvertimeBadge" }] : []);
  postShiftOvertimeBadge = computed(() => {
    const config = this.overtimeConfig();
    if (!config)
      return { label: "", variant: "secondary" };
    return {
      label: config.enablePostShiftOvertime ? this.i18n.t("common.enabled") : this.i18n.t("common.disabled"),
      variant: config.enablePostShiftOvertime ? "success" : "secondary"
    };
  }, ...ngDevMode ? [{ debugName: "postShiftOvertimeBadge" }] : []);
  requiresApprovalBadge = computed(() => {
    const config = this.overtimeConfig();
    if (!config)
      return { label: "", variant: "success" };
    return {
      label: config.requireApproval ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
      variant: config.requireApproval ? "warning" : "success"
    };
  }, ...ngDevMode ? [{ debugName: "requiresApprovalBadge" }] : []);
};
__name(_ViewOvertimeConfigurationComponent, "ViewOvertimeConfigurationComponent");
__publicField(_ViewOvertimeConfigurationComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewOvertimeConfigurationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewOvertimeConfigurationComponent)();
}, "ViewOvertimeConfigurationComponent_Factory"));
__publicField(_ViewOvertimeConfigurationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewOvertimeConfigurationComponent, selectors: [["app-view-overtime-configuration"]], decls: 5, vars: 6, consts: [[1, "app-view-page"], ["mode", "view", "moduleName", "settings", "moduleRoute", "settings/overtime", 3, "title", "entityId", "loading"], [1, "text-center", "py-5"], ["role", "alert", 1, "alert", "alert-danger"], [1, "app-desktop-sidebar"], [3, "message", "variant", "centered"], [1, "fas", "fa-exclamation-triangle", "me-2"], [1, "app-main-content"], ["icon", "fas fa-info-circle", "layout", "two-column", 3, "title", "fields"], ["icon", "fas fa-clock", "layout", "two-column", 1, "mt-4", 3, "title", "fields"], ["icon", "fas fa-percentage", "layout", "two-column", 1, "mt-4", 3, "title", "fields"], ["icon", "fas fa-cogs", "layout", "two-column", 1, "mt-4", 3, "title", "fields"], ["icon", "fas fa-history", "layout", "two-column", 1, "mt-4", 3, "title", "fields"], [1, "app-sidebar-content"], [1, "card", "mb-3"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-chart-line", "me-2"], [1, "card-body"], [1, "config-summary"], [1, "summary-item"], [1, "summary-label"], [1, "summary-value"], [3, "status", "variant"], [1, "summary-value", "rate-value"], [1, "card"], [1, "fas", "fa-arrow-left", "me-2"], [1, "fas", "fa-cogs", "me-2"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", 3, "class", "disabled"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "disabled"], ["type", "button", 1, "btn", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", 3, "class", "me-2"], [1, "fas"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-trash", "me-2"]], template: /* @__PURE__ */ __name(function ViewOvertimeConfigurationComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ViewOvertimeConfigurationComponent_Conditional_2_Template, 2, 3, "div", 2);
    \u0275\u0275conditionalCreate(3, ViewOvertimeConfigurationComponent_Conditional_3_Template, 3, 1, "div", 3);
    \u0275\u0275conditionalCreate(4, ViewOvertimeConfigurationComponent_Conditional_4_Template, 47, 26, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("overtime_configs.view_configuration"))("entityId", (tmp_1_0 = ctx.overtimeConfig()) == null ? null : tmp_1_0.id)("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.overtimeConfig() && !ctx.loading() ? 4 : -1);
  }
}, "ViewOvertimeConfigurationComponent_Template"), dependencies: [
  CommonModule,
  LoadingSpinnerComponent,
  DetailCardComponent,
  FormHeaderComponent,
  StatusBadgeComponent
], styles: ["\n\n.detail-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.detail-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  font-weight: 600;\n}\n.detail-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n}\n.actions-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n.btn-group-vertical[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.btn-group-vertical[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.config-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem;\n  background-color: var(--bs-gray-50);\n  border-radius: 0.25rem;\n  border-left: 3px solid var(--bs-primary);\n}\n.summary-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  font-size: 0.875rem;\n}\n.summary-value[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.rate-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-primary);\n  font-size: 1rem;\n  background-color: var(--bs-primary-bg-subtle);\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n}\n.overtime-settings-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.setting-item[_ngcontent-%COMP%] {\n  background: var(--bs-light);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  border-left: 4px solid var(--bs-primary);\n  transition: all 0.2s ease;\n}\n.setting-item[_ngcontent-%COMP%]:hover {\n  background: var(--bs-gray-100);\n  transform: translateY(-1px);\n  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);\n}\n.setting-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-gray-800);\n  font-size: 0.9rem;\n  margin-bottom: 0.5rem;\n  display: block;\n}\n.setting-value[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--bs-primary);\n  font-weight: 500;\n}\n.setting-unit[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n  margin-left: 0.25rem;\n}\n.rate-display[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      45deg,\n      var(--bs-success-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border: 1px solid var(--bs-success-border-subtle);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  text-align: center;\n}\n.rate-multiplier[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: var(--bs-success);\n  display: block;\n}\n.rate-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n  margin-top: 0.25rem;\n}\n.policy-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.375rem 0.75rem;\n  border-radius: 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  border: 1px solid;\n}\n.policy-badge.enabled[_ngcontent-%COMP%] {\n  background-color: var(--bs-success-bg-subtle);\n  color: var(--bs-success-text-emphasis);\n  border-color: var(--bs-success-border-subtle);\n}\n.policy-badge.disabled[_ngcontent-%COMP%] {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n  border-color: var(--bs-secondary-border-subtle);\n}\n.policy-badge.requires-approval[_ngcontent-%COMP%] {\n  background-color: var(--bs-warning-bg-subtle);\n  color: var(--bs-warning-text-emphasis);\n  border-color: var(--bs-warning-border-subtle);\n}\n.time-value[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: baseline;\n  gap: 0.25rem;\n}\n.time-number[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--bs-info);\n}\n.time-unit[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n}\n.status-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem;\n  border-radius: 0.5rem;\n  font-weight: 500;\n}\n.status-indicator.active[_ngcontent-%COMP%] {\n  background-color: var(--bs-success-bg-subtle);\n  color: var(--bs-success-text-emphasis);\n  border: 1px solid var(--bs-success-border-subtle);\n}\n.status-indicator.inactive[_ngcontent-%COMP%] {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n  border: 1px solid var(--bs-secondary-border-subtle);\n}\n.loading-container[_ngcontent-%COMP%] {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .app-sidebar-content[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n  .actions-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .d-grid.gap-2[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .overtime-settings-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0.75rem;\n  }\n  .config-summary[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n  .summary-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    text-align: center;\n    gap: 0.25rem;\n  }\n  .summary-value[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n  .rate-display[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .rate-multiplier[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .setting-item[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n}\n/*# sourceMappingURL=view-overtime-configuration.component.css.map */"] }));
var ViewOvertimeConfigurationComponent = _ViewOvertimeConfigurationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewOvertimeConfigurationComponent, [{
    type: Component,
    args: [{ selector: "app-view-overtime-configuration", standalone: true, imports: [
      CommonModule,
      LoadingSpinnerComponent,
      DetailCardComponent,
      FormHeaderComponent,
      StatusBadgeComponent
    ], template: `<div class="app-view-page">\r
  <!-- Standardized Page Header -->\r
  <app-form-header\r
    mode="view"\r
    [title]="i18n.t('overtime_configs.view_configuration')"\r
    moduleName="settings"\r
    moduleRoute="settings/overtime"\r
    [entityId]="overtimeConfig()?.id"\r
    [loading]="loading()">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <app-loading-spinner\r
        [message]="i18n.t('overtime_configs.loading_details')"\r
        [variant]="'primary'"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  }\r
\r
  <!-- Error State -->\r
  @if (error()) {\r
    <div class="alert alert-danger" role="alert">\r
      <i class="fas fa-exclamation-triangle me-2"></i>\r
      {{ error() }}\r
    </div>\r
  }\r
\r
  <!-- Overtime Configuration Details -->\r
  @if (overtimeConfig() && !loading()) {\r
    <div class="app-desktop-sidebar">\r
      <!-- Main Content -->\r
      <div class="app-main-content">\r
        <!-- Basic Information Card -->\r
        <app-detail-card\r
          [title]="i18n.t('overtime_configs.basic_information')"\r
          icon="fas fa-info-circle"\r
          [fields]="basicInfoFields"\r
          layout="two-column">\r
        </app-detail-card>\r
\r
        <!-- Overtime Settings Card -->\r
        <app-detail-card\r
          [title]="i18n.t('overtime_configs.overtime_settings')"\r
          icon="fas fa-clock"\r
          [fields]="overtimeSettingsFields"\r
          layout="two-column"\r
          class="mt-4">\r
        </app-detail-card>\r
\r
        <!-- Overtime Rates Card -->\r
        <app-detail-card\r
          [title]="i18n.t('overtime_configs.overtime_rates')"\r
          icon="fas fa-percentage"\r
          [fields]="overtimeRatesFields"\r
          layout="two-column"\r
          class="mt-4">\r
        </app-detail-card>\r
\r
        <!-- Policy Settings Card -->\r
        <app-detail-card\r
          [title]="i18n.t('overtime_configs.policy_settings')"\r
          icon="fas fa-cogs"\r
          [fields]="policySettingsFields"\r
          layout="two-column"\r
          class="mt-4">\r
        </app-detail-card>\r
\r
        <!-- Audit Information Card -->\r
        <app-detail-card\r
          [title]="i18n.t('overtime_configs.audit_information')"\r
          icon="fas fa-history"\r
          [fields]="auditFields"\r
          layout="two-column"\r
          class="mt-4">\r
        </app-detail-card>\r
      </div>\r
\r
      <!-- Sidebar -->\r
      <div class="app-sidebar-content">\r
        <!-- Actions Card -->\r
        @if (hasActiveActions()) {\r
          <div class="card mb-3">\r
            <div class="card-header">\r
              <h6 class="card-title mb-0">\r
                <i class="fas fa-cogs me-2"></i>\r
                {{ i18n.t('common.actions') }}\r
              </h6>\r
            </div>\r
            <div class="card-body">\r
              <div class="d-grid gap-2">\r
\r
                <!-- Toggle Status Action -->\r
                @if (canToggleStatus()) {\r
                  <button\r
                    type="button"\r
                    class="btn"\r
                    [class]="overtimeConfig()?.isActive ? 'btn-warning' : 'btn-success'"\r
                    (click)="toggleStatus()"\r
                    [disabled]="processing()">\r
                    @if (processing()) {\r
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    } @else {\r
                      <i class="fas" [class]="overtimeConfig()?.isActive ? 'fa-pause' : 'fa-check'" [class.me-2]="true"></i>\r
                    }\r
                    {{ overtimeConfig()?.isActive ? i18n.t('common.deactivate') : i18n.t('common.activate') }}\r
                  </button>\r
                }\r
\r
                <!-- Delete Action -->\r
                @if (canDelete()) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-outline-danger"\r
                    (click)="deleteOvertimeConfiguration()"\r
                    [disabled]="processing()">\r
                    @if (processing()) {\r
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    } @else {\r
                      <i class="fas fa-trash me-2"></i>\r
                    }\r
                    {{ i18n.t('common.delete') }}\r
                  </button>\r
                }\r
              </div>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Configuration Summary -->\r
        <div class="card mb-3">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">\r
              <i class="fas fa-chart-line me-2"></i>\r
              {{ i18n.t('overtime_configs.configuration_summary') }}\r
            </h6>\r
          </div>\r
          <div class="card-body">\r
            <div class="config-summary">\r
              <!-- Pre/Post Shift Status -->\r
              <div class="summary-item">\r
                <div class="summary-label">{{ i18n.t('overtime_configs.pre_shift_overtime') }}</div>\r
                <div class="summary-value">\r
                  <app-status-badge\r
                    [status]="preShiftOvertimeBadge().label"\r
                    [variant]="preShiftOvertimeBadge().variant">\r
                  </app-status-badge>\r
                </div>\r
              </div>\r
\r
              <div class="summary-item">\r
                <div class="summary-label">{{ i18n.t('overtime_configs.post_shift_overtime') }}</div>\r
                <div class="summary-value">\r
                  <app-status-badge\r
                    [status]="postShiftOvertimeBadge().label"\r
                    [variant]="postShiftOvertimeBadge().variant">\r
                  </app-status-badge>\r
                </div>\r
              </div>\r
\r
              <!-- Rates Summary -->\r
              <div class="summary-item">\r
                <div class="summary-label">{{ i18n.t('overtime_configs.normal_rate') }}</div>\r
                <div class="summary-value rate-value">{{ overtimeConfig()?.normalDayRate }}x</div>\r
              </div>\r
\r
              <div class="summary-item">\r
                <div class="summary-label">{{ i18n.t('overtime_configs.holiday_rate') }}</div>\r
                <div class="summary-value rate-value">{{ overtimeConfig()?.publicHolidayRate }}x</div>\r
              </div>\r
\r
              <!-- Key Settings -->\r
              <div class="summary-item">\r
                <div class="summary-label">{{ i18n.t('overtime_configs.requires_approval') }}</div>\r
                <div class="summary-value">\r
                  <app-status-badge\r
                    [status]="requiresApprovalBadge().label"\r
                    [variant]="requiresApprovalBadge().variant">\r
                  </app-status-badge>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Back Navigation -->\r
        <div class="card">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">\r
              <i class="fas fa-arrow-left me-2"></i>\r
              {{ i18n.t('common.navigation') }}\r
            </h6>\r
          </div>\r
          <div class="card-body">\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>`, styles: ["/* src/app/pages/settings/overtime/view-overtime-configuration/view-overtime-configuration.component.css */\n.detail-card {\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.detail-card .card-header {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  font-weight: 600;\n}\n.detail-card .card-body {\n  padding: 1.25rem;\n}\n.actions-card {\n  position: sticky;\n  top: 1rem;\n}\n.btn-group-vertical .btn {\n  margin-bottom: 0.5rem;\n}\n.btn-group-vertical .btn:last-child {\n  margin-bottom: 0;\n}\n.status-badge {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.config-summary {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.summary-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem;\n  background-color: var(--bs-gray-50);\n  border-radius: 0.25rem;\n  border-left: 3px solid var(--bs-primary);\n}\n.summary-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  font-size: 0.875rem;\n}\n.summary-value {\n  text-align: right;\n}\n.rate-value {\n  font-weight: 600;\n  color: var(--bs-primary);\n  font-size: 1rem;\n  background-color: var(--bs-primary-bg-subtle);\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n}\n.overtime-settings-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.setting-item {\n  background: var(--bs-light);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  border-left: 4px solid var(--bs-primary);\n  transition: all 0.2s ease;\n}\n.setting-item:hover {\n  background: var(--bs-gray-100);\n  transform: translateY(-1px);\n  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);\n}\n.setting-label {\n  font-weight: 600;\n  color: var(--bs-gray-800);\n  font-size: 0.9rem;\n  margin-bottom: 0.5rem;\n  display: block;\n}\n.setting-value {\n  font-size: 1.1rem;\n  color: var(--bs-primary);\n  font-weight: 500;\n}\n.setting-unit {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n  margin-left: 0.25rem;\n}\n.rate-display {\n  background:\n    linear-gradient(\n      45deg,\n      var(--bs-success-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border: 1px solid var(--bs-success-border-subtle);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  text-align: center;\n}\n.rate-multiplier {\n  font-size: 2rem;\n  font-weight: 700;\n  color: var(--bs-success);\n  display: block;\n}\n.rate-label {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n  margin-top: 0.25rem;\n}\n.policy-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.375rem 0.75rem;\n  border-radius: 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  border: 1px solid;\n}\n.policy-badge.enabled {\n  background-color: var(--bs-success-bg-subtle);\n  color: var(--bs-success-text-emphasis);\n  border-color: var(--bs-success-border-subtle);\n}\n.policy-badge.disabled {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n  border-color: var(--bs-secondary-border-subtle);\n}\n.policy-badge.requires-approval {\n  background-color: var(--bs-warning-bg-subtle);\n  color: var(--bs-warning-text-emphasis);\n  border-color: var(--bs-warning-border-subtle);\n}\n.time-value {\n  display: inline-flex;\n  align-items: baseline;\n  gap: 0.25rem;\n}\n.time-number {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--bs-info);\n}\n.time-unit {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n}\n.status-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem;\n  border-radius: 0.5rem;\n  font-weight: 500;\n}\n.status-indicator.active {\n  background-color: var(--bs-success-bg-subtle);\n  color: var(--bs-success-text-emphasis);\n  border: 1px solid var(--bs-success-border-subtle);\n}\n.status-indicator.inactive {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n  border: 1px solid var(--bs-secondary-border-subtle);\n}\n.loading-container {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar {\n    flex-direction: column;\n  }\n  .app-sidebar-content {\n    margin-top: 1rem;\n  }\n  .actions-card {\n    position: static;\n  }\n  .d-grid.gap-2 {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .overtime-settings-grid {\n    grid-template-columns: 1fr;\n    gap: 0.75rem;\n  }\n  .config-summary {\n    gap: 0.5rem;\n  }\n  .summary-item {\n    flex-direction: column;\n    align-items: stretch;\n    text-align: center;\n    gap: 0.25rem;\n  }\n  .summary-value {\n    text-align: center;\n  }\n  .rate-display {\n    padding: 0.75rem;\n  }\n  .rate-multiplier {\n    font-size: 1.5rem;\n  }\n  .setting-item {\n    padding: 0.75rem;\n  }\n}\n/*# sourceMappingURL=view-overtime-configuration.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewOvertimeConfigurationComponent, { className: "ViewOvertimeConfigurationComponent", filePath: "src/app/pages/settings/overtime/view-overtime-configuration/view-overtime-configuration.component.ts", lineNumber: 29 });
})();
export {
  ViewOvertimeConfigurationComponent
};
//# sourceMappingURL=chunk-PDSDP3CK.js.map
