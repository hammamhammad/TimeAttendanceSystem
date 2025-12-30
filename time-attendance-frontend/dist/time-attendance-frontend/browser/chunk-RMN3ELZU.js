import {
  OvertimeConfigurationsService
} from "./chunk-APUTWHRK.js";
import {
  SectionCardComponent
} from "./chunk-OAYY6FJW.js";
import {
  DefinitionListComponent
} from "./chunk-I7HA6QL2.js";
import {
  FormHeaderComponent
} from "./chunk-KM5VSJTZ.js";
import {
  StatusBadgeComponent
} from "./chunk-MAN5UEZP.js";
import {
  ConfirmationService
} from "./chunk-NUNE7G5P.js";
import {
  PermissionService
} from "./chunk-HT4DZZW3.js";
import {
  PermissionActions
} from "./chunk-6LEZROWG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-GSKH2KOG.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
import "./chunk-HZ2IZU2F.js";
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
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __async,
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/overtime/view-overtime-configuration/view-overtime-configuration.component.ts
var _c0 = /* @__PURE__ */ __name(() => ["/settings/overtime"], "_c0");
function ViewOvertimeConfigurationComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("common.loading"))("variant", "primary")("centered", true);
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
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 33);
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Conditional_1_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Conditional_1_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 35);
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap(((tmp_4_0 = ctx_r0.overtimeConfig()) == null ? null : tmp_4_0.isActive) ? "fa-pause" : "fa-check");
    \u0275\u0275classProp("me-2", true);
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Conditional_2_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Conditional_2_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.toggleStatus());
    }, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Conditional_1_Template, 1, 0, "span", 33)(2, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Conditional_2_Template, 1, 4, "i", 34);
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
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 33);
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Conditional_1_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Conditional_1_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 37);
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Conditional_2_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Conditional_2_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteOvertimeConfiguration());
    }, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Conditional_1_Template, 1, 0, "span", 33)(2, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Conditional_2_Template, 1, 0, "i", 37);
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
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-section-card", 17)(1, "div", 29);
    \u0275\u0275conditionalCreate(2, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_2_Template, 4, 5, "button", 30);
    \u0275\u0275conditionalCreate(3, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Conditional_3_Template, 4, 3, "button", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("common.actions"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.canToggleStatus() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canDelete() ? 3 : -1);
  }
}
__name(ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Template, "ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Template");
function ViewOvertimeConfigurationComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 7)(2, "app-section-card", 8);
    \u0275\u0275element(3, "app-definition-list", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "app-section-card", 10)(5, "div", 11)(6, "div", 12);
    \u0275\u0275element(7, "app-definition-list", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 12);
    \u0275\u0275element(9, "app-definition-list", 9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "app-section-card", 13);
    \u0275\u0275element(11, "app-definition-list", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "app-section-card", 14);
    \u0275\u0275element(13, "app-definition-list", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "app-section-card", 15);
    \u0275\u0275element(15, "app-definition-list", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 16);
    \u0275\u0275conditionalCreate(17, ViewOvertimeConfigurationComponent_Conditional_4_Conditional_17_Template, 4, 3, "app-section-card", 17);
    \u0275\u0275elementStart(18, "app-section-card", 18)(19, "div", 19)(20, "div", 20)(21, "div", 21);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 22);
    \u0275\u0275element(24, "app-status-badge", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 20)(26, "div", 21);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 22);
    \u0275\u0275element(29, "app-status-badge", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 20)(31, "div", 21);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 24);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 20)(36, "div", 21);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 24);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 20)(41, "div", 21);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 22);
    \u0275\u0275element(44, "app-status-badge", 23);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(45, "app-section-card", 25)(46, "div", 26)(47, "a", 27);
    \u0275\u0275element(48, "i", 28);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_33_0;
    let tmp_35_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("settings.overtime.configurationInfo"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r0.basicInfoItems())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("settings.overtime.calculationSettings"));
    \u0275\u0275advance(3);
    \u0275\u0275property("items", ctx_r0.overtimeSettingsLeftItems())("labelWidth", "7")("valueWidth", "5");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.overtimeSettingsRightItems())("labelWidth", "7")("valueWidth", "5");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("settings.overtime.overtimeRates"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r0.overtimeRatesItems())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("settings.overtime.additionalSettings"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r0.policySettingsItems())("labelWidth", "5")("valueWidth", "7");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("common.audit_information"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r0.auditItems())("labelWidth", "3")("valueWidth", "9");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasActiveActions() ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("settings.overtime.configuration"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("settings.overtime.preShift"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.preShiftOvertimeBadge().label)("variant", ctx_r0.preShiftOvertimeBadge().variant);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("settings.overtime.postShift"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.postShiftOvertimeBadge().label)("variant", ctx_r0.postShiftOvertimeBadge().variant);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("settings.overtime.normalDay"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (tmp_33_0 = ctx_r0.overtimeConfig()) == null ? null : tmp_33_0.normalDayRate, "x");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("settings.overtime.holiday"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (tmp_35_0 = ctx_r0.overtimeConfig()) == null ? null : tmp_35_0.publicHolidayRate, "x");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("settings.overtime.requiresApproval"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.requiresApprovalBadge().label)("variant", ctx_r0.requiresApprovalBadge().variant);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("common.navigation"));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(41, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("settings.overtime.title"), " ");
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
  basicInfoItems = computed(() => {
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
        label: this.i18n.t("settings.overtime.effectiveFrom"),
        value: config.effectiveFromDate,
        type: "date"
      },
      {
        label: this.i18n.t("settings.overtime.effectiveTo"),
        value: config.effectiveToDate || this.i18n.t("settings.overtime.indefinite")
      }
    ];
  }, ...ngDevMode ? [{ debugName: "basicInfoItems" }] : []);
  overtimeSettingsLeftItems = computed(() => {
    const config = this.overtimeConfig();
    if (!config)
      return [];
    return [
      {
        label: this.i18n.t("settings.overtime.enablePreShift"),
        value: config.enablePreShiftOvertime ? this.i18n.t("common.enabled") : this.i18n.t("common.disabled"),
        type: "badge",
        badgeVariant: config.enablePreShiftOvertime ? "success" : "secondary"
      },
      {
        label: this.i18n.t("settings.overtime.enablePostShift"),
        value: config.enablePostShiftOvertime ? this.i18n.t("common.enabled") : this.i18n.t("common.disabled"),
        type: "badge",
        badgeVariant: config.enablePostShiftOvertime ? "success" : "secondary"
      },
      {
        label: this.i18n.t("settings.overtime.maxPreShiftHours"),
        value: `${config.maxPreShiftOvertimeHours} ${this.i18n.t("common.hours")}`
      },
      {
        label: this.i18n.t("settings.overtime.maxPostShiftHours"),
        value: `${config.maxPostShiftOvertimeHours} ${this.i18n.t("common.hours")}`
      }
    ];
  }, ...ngDevMode ? [{ debugName: "overtimeSettingsLeftItems" }] : []);
  overtimeSettingsRightItems = computed(() => {
    const config = this.overtimeConfig();
    if (!config)
      return [];
    return [
      {
        label: this.i18n.t("settings.overtime.minimumOvertimeMinutes"),
        value: `${config.minimumOvertimeMinutes} ${this.i18n.t("common.minutes")}`
      },
      {
        label: this.i18n.t("settings.overtime.gracePeriodMinutes"),
        value: `${config.overtimeGracePeriodMinutes} ${this.i18n.t("common.minutes")}`
      },
      {
        label: this.i18n.t("settings.overtime.roundingIntervalMinutes"),
        value: `${config.roundingIntervalMinutes} ${this.i18n.t("common.minutes")}`
      }
    ];
  }, ...ngDevMode ? [{ debugName: "overtimeSettingsRightItems" }] : []);
  overtimeRatesItems = computed(() => {
    const config = this.overtimeConfig();
    if (!config)
      return [];
    return [
      {
        label: this.i18n.t("settings.overtime.normalDayRate"),
        value: `${config.normalDayRate}x`
      },
      {
        label: this.i18n.t("settings.overtime.publicHolidayRate"),
        value: `${config.publicHolidayRate}x`
      },
      {
        label: this.i18n.t("settings.overtime.offDayRate"),
        value: `${config.offDayRate}x`
      }
    ];
  }, ...ngDevMode ? [{ debugName: "overtimeRatesItems" }] : []);
  policySettingsItems = computed(() => {
    const config = this.overtimeConfig();
    if (!config)
      return [];
    const fields = [
      {
        label: this.i18n.t("settings.overtime.requireApproval"),
        value: config.requireApproval ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
        type: "badge",
        badgeVariant: config.requireApproval ? "warning" : "success"
      },
      {
        label: this.i18n.t("settings.overtime.considerFlexibleTime"),
        value: config.considerFlexibleTime ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
        type: "badge",
        badgeVariant: config.considerFlexibleTime ? "info" : "secondary"
      },
      {
        label: this.i18n.t("settings.overtime.weekendAsOffDay"),
        value: config.weekendAsOffDay ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
        type: "badge",
        badgeVariant: config.weekendAsOffDay ? "info" : "secondary"
      }
    ];
    if (config.policyNotes) {
      fields.push({
        label: this.i18n.t("settings.overtime.policyNotes"),
        value: config.policyNotes
      });
    }
    return fields;
  }, ...ngDevMode ? [{ debugName: "policySettingsItems" }] : []);
  auditItems = computed(() => {
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
  }, ...ngDevMode ? [{ debugName: "auditItems" }] : []);
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
        this.error.set(this.i18n.t("common.errors.load_failed"));
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
        title: isActivating ? this.i18n.t("settings.overtime.activatePolicy") : this.i18n.t("settings.overtime.deactivatePolicy"),
        message: isActivating ? this.i18n.t("settings.overtime.activatePolicyConfirmation") : this.i18n.t("settings.overtime.deactivatePolicyConfirmation"),
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
            this.notificationService.success(isActivating ? this.i18n.t("settings.overtime.policyActivatedSuccessfully") : this.i18n.t("settings.overtime.policyDeactivatedSuccessfully"));
            this.loadOvertimeConfigurationDetails();
            this.processing.set(false);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to toggle overtime configuration status:", error);
            this.notificationService.error(this.i18n.t("common.errors.operation_failed"));
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
        title: this.i18n.t("settings.overtime.deletePolicy"),
        message: this.i18n.t("settings.overtime.deletePolicyConfirmation"),
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
            this.notificationService.success(this.i18n.t("settings.overtime.policyDeletedSuccessfully"));
            this.router.navigate(["/settings/overtime"]);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete overtime configuration:", error);
            this.notificationService.error(this.i18n.t("common.errors.delete_failed"));
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
    return `${this.i18n.t("settings.overtime.configuration")} #${config.id}`;
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
__publicField(_ViewOvertimeConfigurationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewOvertimeConfigurationComponent, selectors: [["app-view-overtime-configuration"]], decls: 5, vars: 6, consts: [[1, "app-view-page"], ["mode", "view", "moduleName", "settings", "moduleRoute", "settings/overtime", 3, "title", "entityId", "loading"], [1, "text-center", "py-5"], ["role", "alert", 1, "alert", "alert-danger"], [1, "app-desktop-sidebar"], [3, "message", "variant", "centered"], [1, "fas", "fa-exclamation-triangle", "me-2"], [1, "app-main-content"], ["icon", "fas fa-info-circle", "headerClass", "bg-light", 1, "mb-4", 3, "title"], [3, "items", "labelWidth", "valueWidth"], ["icon", "fas fa-clock", "headerClass", "bg-light", 1, "mb-4", 3, "title"], [1, "row"], [1, "col-md-6"], ["icon", "fas fa-percentage", "headerClass", "bg-light", 1, "mb-4", 3, "title"], ["icon", "fas fa-cogs", "headerClass", "bg-light", 1, "mb-4", 3, "title"], ["icon", "fas fa-history", "headerClass", "bg-light", 1, "mb-4", 3, "title"], [1, "app-sidebar-content"], ["icon", "fas fa-cogs", "headerClass", "bg-light", 1, "mb-3", 3, "title"], ["icon", "fas fa-chart-line", "headerClass", "bg-light", 1, "mb-3", 3, "title"], [1, "config-summary"], [1, "summary-item"], [1, "summary-label"], [1, "summary-value"], [3, "status", "variant"], [1, "summary-value", "rate-value"], ["icon", "fas fa-arrow-left", "headerClass", "bg-light", "bodyClass", "p-0", 3, "title"], [1, "list-group", "list-group-flush"], [1, "list-group-item", "list-group-item-action", 3, "routerLink"], [1, "fas", "fa-list", "me-2"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", 3, "class", "disabled"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "disabled"], ["type", "button", 1, "btn", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", 3, "class", "me-2"], [1, "fas"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-trash", "me-2"]], template: /* @__PURE__ */ __name(function ViewOvertimeConfigurationComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ViewOvertimeConfigurationComponent_Conditional_2_Template, 2, 3, "div", 2);
    \u0275\u0275conditionalCreate(3, ViewOvertimeConfigurationComponent_Conditional_3_Template, 3, 1, "div", 3);
    \u0275\u0275conditionalCreate(4, ViewOvertimeConfigurationComponent_Conditional_4_Template, 50, 42, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("settings.overtime.configurationInfo"))("entityId", (tmp_1_0 = ctx.overtimeConfig()) == null ? null : tmp_1_0.id)("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.overtimeConfig() && !ctx.loading() ? 4 : -1);
  }
}, "ViewOvertimeConfigurationComponent_Template"), dependencies: [
  RouterModule,
  RouterLink,
  LoadingSpinnerComponent,
  DefinitionListComponent,
  SectionCardComponent,
  FormHeaderComponent,
  StatusBadgeComponent
], styles: ["\n\n.detail-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.detail-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  font-weight: 600;\n}\n.detail-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n}\n.actions-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n.btn-group-vertical[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.btn-group-vertical[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.config-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem;\n  background-color: var(--bs-gray-50);\n  border-radius: 0.25rem;\n  border-left: 3px solid var(--bs-primary);\n}\n.summary-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  font-size: 0.875rem;\n}\n.summary-value[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.rate-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-primary);\n  font-size: 1rem;\n  background-color: var(--bs-primary-bg-subtle);\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n}\n.overtime-settings-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.setting-item[_ngcontent-%COMP%] {\n  background: var(--bs-light);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  border-left: 4px solid var(--bs-primary);\n  transition: all 0.2s ease;\n}\n.setting-item[_ngcontent-%COMP%]:hover {\n  background: var(--bs-gray-100);\n  transform: translateY(-1px);\n  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);\n}\n.setting-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-gray-800);\n  font-size: 0.9rem;\n  margin-bottom: 0.5rem;\n  display: block;\n}\n.setting-value[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--bs-primary);\n  font-weight: 500;\n}\n.setting-unit[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n  margin-left: 0.25rem;\n}\n.rate-display[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      45deg,\n      var(--bs-success-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border: 1px solid var(--bs-success-border-subtle);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  text-align: center;\n}\n.rate-multiplier[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: var(--bs-success);\n  display: block;\n}\n.rate-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n  margin-top: 0.25rem;\n}\n.policy-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.375rem 0.75rem;\n  border-radius: 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  border: 1px solid;\n}\n.policy-badge.enabled[_ngcontent-%COMP%] {\n  background-color: var(--bs-success-bg-subtle);\n  color: var(--bs-success-text-emphasis);\n  border-color: var(--bs-success-border-subtle);\n}\n.policy-badge.disabled[_ngcontent-%COMP%] {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n  border-color: var(--bs-secondary-border-subtle);\n}\n.policy-badge.requires-approval[_ngcontent-%COMP%] {\n  background-color: var(--bs-warning-bg-subtle);\n  color: var(--bs-warning-text-emphasis);\n  border-color: var(--bs-warning-border-subtle);\n}\n.time-value[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: baseline;\n  gap: 0.25rem;\n}\n.time-number[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--bs-info);\n}\n.time-unit[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n}\n.status-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem;\n  border-radius: 0.5rem;\n  font-weight: 500;\n}\n.status-indicator.active[_ngcontent-%COMP%] {\n  background-color: var(--bs-success-bg-subtle);\n  color: var(--bs-success-text-emphasis);\n  border: 1px solid var(--bs-success-border-subtle);\n}\n.status-indicator.inactive[_ngcontent-%COMP%] {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n  border: 1px solid var(--bs-secondary-border-subtle);\n}\n.loading-container[_ngcontent-%COMP%] {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .app-sidebar-content[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n  .actions-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .d-grid.gap-2[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .overtime-settings-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0.75rem;\n  }\n  .config-summary[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n  .summary-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    text-align: center;\n    gap: 0.25rem;\n  }\n  .summary-value[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n  .rate-display[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .rate-multiplier[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .setting-item[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n}\n/*# sourceMappingURL=view-overtime-configuration.component.css.map */"] }));
var ViewOvertimeConfigurationComponent = _ViewOvertimeConfigurationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewOvertimeConfigurationComponent, [{
    type: Component,
    args: [{ selector: "app-view-overtime-configuration", standalone: true, imports: [
      RouterModule,
      LoadingSpinnerComponent,
      DefinitionListComponent,
      SectionCardComponent,
      FormHeaderComponent,
      StatusBadgeComponent
    ], template: `<div class="app-view-page">\r
  <!-- Standardized Page Header -->\r
  <app-form-header\r
    mode="view"\r
    [title]="i18n.t('settings.overtime.configurationInfo')"\r
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
        [message]="i18n.t('common.loading')"\r
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
        <app-section-card\r
          [title]="i18n.t('settings.overtime.configurationInfo')"\r
          icon="fas fa-info-circle"\r
          headerClass="bg-light"\r
          class="mb-4">\r
          <app-definition-list\r
            [items]="basicInfoItems()"\r
            [labelWidth]="'4'"\r
            [valueWidth]="'8'">\r
          </app-definition-list>\r
        </app-section-card>\r
\r
        <!-- Overtime Settings Card -->\r
        <app-section-card\r
          [title]="i18n.t('settings.overtime.calculationSettings')"\r
          icon="fas fa-clock"\r
          headerClass="bg-light"\r
          class="mb-4">\r
          <div class="row">\r
            <div class="col-md-6">\r
              <app-definition-list\r
                [items]="overtimeSettingsLeftItems()"\r
                [labelWidth]="'7'"\r
                [valueWidth]="'5'">\r
              </app-definition-list>\r
            </div>\r
            <div class="col-md-6">\r
              <app-definition-list\r
                [items]="overtimeSettingsRightItems()"\r
                [labelWidth]="'7'"\r
                [valueWidth]="'5'">\r
              </app-definition-list>\r
            </div>\r
          </div>\r
        </app-section-card>\r
\r
        <!-- Overtime Rates Card -->\r
        <app-section-card\r
          [title]="i18n.t('settings.overtime.overtimeRates')"\r
          icon="fas fa-percentage"\r
          headerClass="bg-light"\r
          class="mb-4">\r
          <app-definition-list\r
            [items]="overtimeRatesItems()"\r
            [labelWidth]="'4'"\r
            [valueWidth]="'8'">\r
          </app-definition-list>\r
        </app-section-card>\r
\r
        <!-- Policy Settings Card -->\r
        <app-section-card\r
          [title]="i18n.t('settings.overtime.additionalSettings')"\r
          icon="fas fa-cogs"\r
          headerClass="bg-light"\r
          class="mb-4">\r
          <app-definition-list\r
            [items]="policySettingsItems()"\r
            [labelWidth]="'5'"\r
            [valueWidth]="'7'">\r
          </app-definition-list>\r
        </app-section-card>\r
\r
        <!-- Audit Information Card -->\r
        <app-section-card\r
          [title]="i18n.t('common.audit_information')"\r
          icon="fas fa-history"\r
          headerClass="bg-light"\r
          class="mb-4">\r
          <app-definition-list\r
            [items]="auditItems()"\r
            [labelWidth]="'3'"\r
            [valueWidth]="'9'">\r
          </app-definition-list>\r
        </app-section-card>\r
      </div>\r
\r
      <!-- Sidebar -->\r
      <div class="app-sidebar-content">\r
        <!-- Actions Card -->\r
        @if (hasActiveActions()) {\r
          <app-section-card\r
            [title]="i18n.t('common.actions')"\r
            icon="fas fa-cogs"\r
            headerClass="bg-light"\r
            class="mb-3">\r
            <div class="d-grid gap-2">\r
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
          </app-section-card>\r
        }\r
\r
        <!-- Configuration Summary -->\r
        <app-section-card\r
          [title]="i18n.t('settings.overtime.configuration')"\r
          icon="fas fa-chart-line"\r
          headerClass="bg-light"\r
          class="mb-3">\r
          <div class="config-summary">\r
            <!-- Pre/Post Shift Status -->\r
            <div class="summary-item">\r
              <div class="summary-label">{{ i18n.t('settings.overtime.preShift') }}</div>\r
              <div class="summary-value">\r
                <app-status-badge\r
                  [status]="preShiftOvertimeBadge().label"\r
                  [variant]="preShiftOvertimeBadge().variant">\r
                </app-status-badge>\r
              </div>\r
            </div>\r
\r
            <div class="summary-item">\r
              <div class="summary-label">{{ i18n.t('settings.overtime.postShift') }}</div>\r
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
              <div class="summary-label">{{ i18n.t('settings.overtime.normalDay') }}</div>\r
              <div class="summary-value rate-value">{{ overtimeConfig()?.normalDayRate }}x</div>\r
            </div>\r
\r
            <div class="summary-item">\r
              <div class="summary-label">{{ i18n.t('settings.overtime.holiday') }}</div>\r
              <div class="summary-value rate-value">{{ overtimeConfig()?.publicHolidayRate }}x</div>\r
            </div>\r
\r
            <!-- Key Settings -->\r
            <div class="summary-item">\r
              <div class="summary-label">{{ i18n.t('settings.overtime.requiresApproval') }}</div>\r
              <div class="summary-value">\r
                <app-status-badge\r
                  [status]="requiresApprovalBadge().label"\r
                  [variant]="requiresApprovalBadge().variant">\r
                </app-status-badge>\r
              </div>\r
            </div>\r
          </div>\r
        </app-section-card>\r
\r
        <!-- Back Navigation -->\r
        <app-section-card\r
          [title]="i18n.t('common.navigation')"\r
          icon="fas fa-arrow-left"\r
          headerClass="bg-light"\r
          bodyClass="p-0">\r
          <div class="list-group list-group-flush">\r
            <a [routerLink]="['/settings/overtime']" class="list-group-item list-group-item-action">\r
              <i class="fas fa-list me-2"></i>\r
              {{ i18n.t('settings.overtime.title') }}\r
            </a>\r
          </div>\r
        </app-section-card>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/pages/settings/overtime/view-overtime-configuration/view-overtime-configuration.component.css */\n.detail-card {\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.detail-card .card-header {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  font-weight: 600;\n}\n.detail-card .card-body {\n  padding: 1.25rem;\n}\n.actions-card {\n  position: sticky;\n  top: 1rem;\n}\n.btn-group-vertical .btn {\n  margin-bottom: 0.5rem;\n}\n.btn-group-vertical .btn:last-child {\n  margin-bottom: 0;\n}\n.status-badge {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.config-summary {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.summary-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem;\n  background-color: var(--bs-gray-50);\n  border-radius: 0.25rem;\n  border-left: 3px solid var(--bs-primary);\n}\n.summary-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  font-size: 0.875rem;\n}\n.summary-value {\n  text-align: right;\n}\n.rate-value {\n  font-weight: 600;\n  color: var(--bs-primary);\n  font-size: 1rem;\n  background-color: var(--bs-primary-bg-subtle);\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n}\n.overtime-settings-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.setting-item {\n  background: var(--bs-light);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  border-left: 4px solid var(--bs-primary);\n  transition: all 0.2s ease;\n}\n.setting-item:hover {\n  background: var(--bs-gray-100);\n  transform: translateY(-1px);\n  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);\n}\n.setting-label {\n  font-weight: 600;\n  color: var(--bs-gray-800);\n  font-size: 0.9rem;\n  margin-bottom: 0.5rem;\n  display: block;\n}\n.setting-value {\n  font-size: 1.1rem;\n  color: var(--bs-primary);\n  font-weight: 500;\n}\n.setting-unit {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n  margin-left: 0.25rem;\n}\n.rate-display {\n  background:\n    linear-gradient(\n      45deg,\n      var(--bs-success-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border: 1px solid var(--bs-success-border-subtle);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  text-align: center;\n}\n.rate-multiplier {\n  font-size: 2rem;\n  font-weight: 700;\n  color: var(--bs-success);\n  display: block;\n}\n.rate-label {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n  margin-top: 0.25rem;\n}\n.policy-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.375rem 0.75rem;\n  border-radius: 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  border: 1px solid;\n}\n.policy-badge.enabled {\n  background-color: var(--bs-success-bg-subtle);\n  color: var(--bs-success-text-emphasis);\n  border-color: var(--bs-success-border-subtle);\n}\n.policy-badge.disabled {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n  border-color: var(--bs-secondary-border-subtle);\n}\n.policy-badge.requires-approval {\n  background-color: var(--bs-warning-bg-subtle);\n  color: var(--bs-warning-text-emphasis);\n  border-color: var(--bs-warning-border-subtle);\n}\n.time-value {\n  display: inline-flex;\n  align-items: baseline;\n  gap: 0.25rem;\n}\n.time-number {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--bs-info);\n}\n.time-unit {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n}\n.status-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem;\n  border-radius: 0.5rem;\n  font-weight: 500;\n}\n.status-indicator.active {\n  background-color: var(--bs-success-bg-subtle);\n  color: var(--bs-success-text-emphasis);\n  border: 1px solid var(--bs-success-border-subtle);\n}\n.status-indicator.inactive {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n  border: 1px solid var(--bs-secondary-border-subtle);\n}\n.loading-container {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar {\n    flex-direction: column;\n  }\n  .app-sidebar-content {\n    margin-top: 1rem;\n  }\n  .actions-card {\n    position: static;\n  }\n  .d-grid.gap-2 {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .overtime-settings-grid {\n    grid-template-columns: 1fr;\n    gap: 0.75rem;\n  }\n  .config-summary {\n    gap: 0.5rem;\n  }\n  .summary-item {\n    flex-direction: column;\n    align-items: stretch;\n    text-align: center;\n    gap: 0.25rem;\n  }\n  .summary-value {\n    text-align: center;\n  }\n  .rate-display {\n    padding: 0.75rem;\n  }\n  .rate-multiplier {\n    font-size: 1.5rem;\n  }\n  .setting-item {\n    padding: 0.75rem;\n  }\n}\n/*# sourceMappingURL=view-overtime-configuration.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewOvertimeConfigurationComponent, { className: "ViewOvertimeConfigurationComponent", filePath: "src/app/pages/settings/overtime/view-overtime-configuration/view-overtime-configuration.component.ts", lineNumber: 32 });
})();
export {
  ViewOvertimeConfigurationComponent
};
//# sourceMappingURL=chunk-RMN3ELZU.js.map
