import {
  ShiftStatus,
  ShiftType
} from "./chunk-IP6EMSNR.js";
import {
  DetailCardComponent
} from "./chunk-6KMVFXGX.js";
import {
  FormHeaderComponent
} from "./chunk-U5KRTQNT.js";
import {
  ShiftsService
} from "./chunk-QRFVLUN5.js";
import {
  StatusBadgeComponent
} from "./chunk-TT5VOWGP.js";
import {
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
import {
  PermissionService
} from "./chunk-DWXA666M.js";
import {
  PermissionActions
} from "./chunk-EVMJ7ILG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-VATI3GP6.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import "./chunk-O2IS3HK2.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
import {
  Component,
  computed,
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
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-DUNHAUAW.js";
import {
  __async,
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/shifts/view-shift/view-shift.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function ViewShiftComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("shifts.loading_details"))("variant", "primary")("centered", true);
  }
}
__name(ViewShiftComponent_Conditional_2_Template, "ViewShiftComponent_Conditional_2_Template");
function ViewShiftComponent_Conditional_3_Template(rf, ctx) {
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
__name(ViewShiftComponent_Conditional_3_Template, "ViewShiftComponent_Conditional_3_Template");
function ViewShiftComponent_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-detail-card", 9);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("shifts.working_hours"))("fields", ctx_r0.workingHoursFields);
  }
}
__name(ViewShiftComponent_Conditional_4_Conditional_3_Template, "ViewShiftComponent_Conditional_4_Conditional_3_Template");
function ViewShiftComponent_Conditional_4_Conditional_4_For_8_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("shifts.night_period"));
  }
}
__name(ViewShiftComponent_Conditional_4_Conditional_4_For_8_Conditional_6_Template, "ViewShiftComponent_Conditional_4_Conditional_4_For_8_Conditional_6_Template");
function ViewShiftComponent_Conditional_4_Conditional_4_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "span", 34);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, ViewShiftComponent_Conditional_4_Conditional_4_For_8_Conditional_6_Template, 2, 1, "span", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 37);
    \u0275\u0275element(8, "i", 38);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const period_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("night-period", period_r2.isNightPeriod);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", period_r2.periodOrder);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.formatTime(period_r2.startTime), " - ", ctx_r0.formatTime(period_r2.endTime));
    \u0275\u0275advance();
    \u0275\u0275conditional(period_r2.isNightPeriod ? 6 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.calculatePeriodHours(period_r2), " ");
  }
}
__name(ViewShiftComponent_Conditional_4_Conditional_4_For_8_Template, "ViewShiftComponent_Conditional_4_Conditional_4_For_8_Template");
function ViewShiftComponent_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 16)(2, "h5", 17);
    \u0275\u0275element(3, "i", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 19)(6, "div", 29);
    \u0275\u0275repeaterCreate(7, ViewShiftComponent_Conditional_4_Conditional_4_For_8_Template, 10, 7, "div", 30, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 31)(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("shifts.shift_periods"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.shiftPeriods);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r0.i18n.t("shifts.total_shift_hours"), ": ", ctx_r0.getTotalShiftHours());
  }
}
__name(ViewShiftComponent_Conditional_4_Conditional_4_Template, "ViewShiftComponent_Conditional_4_Conditional_4_Template");
function ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 44);
  }
}
__name(ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Conditional_1_Template, "ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Conditional_1_Template");
function ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 45);
  }
}
__name(ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Conditional_2_Template, "ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Conditional_2_Template");
function ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.setAsDefault());
    }, "ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Conditional_1_Template, 1, 0, "span", 44)(2, ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Conditional_2_Template, 1, 0, "i", 45);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.processing());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.processing() ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("shifts.set_default"), " ");
  }
}
__name(ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Template, "ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Template");
function ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 44);
  }
}
__name(ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Conditional_1_Template, "ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Conditional_1_Template");
function ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 47);
  }
}
__name(ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Conditional_2_Template, "ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Conditional_2_Template");
function ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteShift());
    }, "ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Conditional_1_Template, 1, 0, "span", 44)(2, ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Conditional_2_Template, 1, 0, "i", 47);
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
__name(ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Template, "ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Template");
function ViewShiftComponent_Conditional_4_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16)(2, "h6", 17);
    \u0275\u0275element(3, "i", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 19)(6, "div", 40);
    \u0275\u0275conditionalCreate(7, ViewShiftComponent_Conditional_4_Conditional_9_Conditional_7_Template, 4, 3, "button", 41);
    \u0275\u0275conditionalCreate(8, ViewShiftComponent_Conditional_4_Conditional_9_Conditional_8_Template, 4, 3, "button", 42);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.actions"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.canSetDefault() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canDelete() ? 8 : -1);
  }
}
__name(ViewShiftComponent_Conditional_4_Conditional_9_Template, "ViewShiftComponent_Conditional_4_Conditional_9_Template");
function ViewShiftComponent_Conditional_4_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("shifts.total_hours"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getTotalShiftHours());
  }
}
__name(ViewShiftComponent_Conditional_4_Conditional_32_Template, "ViewShiftComponent_Conditional_4_Conditional_32_Template");
function ViewShiftComponent_Conditional_4_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 23);
    \u0275\u0275element(4, "app-status-badge", 49);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("shifts.night_shift"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.nightShiftBadge().label)("variant", ctx_r0.nightShiftBadge().variant);
  }
}
__name(ViewShiftComponent_Conditional_4_Conditional_38_Template, "ViewShiftComponent_Conditional_4_Conditional_38_Template");
function ViewShiftComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 7);
    \u0275\u0275element(2, "app-detail-card", 8);
    \u0275\u0275conditionalCreate(3, ViewShiftComponent_Conditional_4_Conditional_3_Template, 1, 2, "app-detail-card", 9);
    \u0275\u0275conditionalCreate(4, ViewShiftComponent_Conditional_4_Conditional_4_Template, 12, 3, "div", 10);
    \u0275\u0275element(5, "app-detail-card", 11)(6, "app-detail-card", 12)(7, "app-detail-card", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 14);
    \u0275\u0275conditionalCreate(9, ViewShiftComponent_Conditional_4_Conditional_9_Template, 9, 3, "div", 15);
    \u0275\u0275elementStart(10, "div", 15)(11, "div", 16)(12, "h6", 17);
    \u0275\u0275element(13, "i", 18);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 19)(16, "div", 20)(17, "div", 21)(18, "div", 22);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 23);
    \u0275\u0275element(21, "app-status-badge", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 21)(23, "div", 22);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 23);
    \u0275\u0275element(26, "app-status-badge", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 21)(28, "div", 22);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 25);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(32, ViewShiftComponent_Conditional_4_Conditional_32_Template, 5, 2, "div", 21);
    \u0275\u0275elementStart(33, "div", 21)(34, "div", 22);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 23);
    \u0275\u0275element(37, "app-status-badge", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(38, ViewShiftComponent_Conditional_4_Conditional_38_Template, 5, 3, "div", 21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 26)(40, "div", 16)(41, "h6", 17);
    \u0275\u0275element(42, "i", 27);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(44, "div", 19);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("shifts.basic_information"))("fields", ctx_r0.basicInfoFields);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.workingHoursFields.length > 0 ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shiftPeriods.length > 0 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("shifts.working_days"))("fields", ctx_r0.workingDaysFields);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("shifts.shift_settings"))("fields", ctx_r0.settingsFields);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("shifts.audit_information"))("fields", ctx_r0.auditFields);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasActiveActions() ? 9 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("shifts.shift_summary"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.type"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.shiftTypeBadge().label)("variant", ctx_r0.shiftTypeBadge().variant);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.status"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.statusBadge().label)("variant", ctx_r0.statusBadge().variant);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("shifts.total_periods"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.shiftPeriods.length);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shiftPeriods.length > 0 ? 32 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("shifts.flexible_hours"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.flexibilityBadge().label)("variant", ctx_r0.flexibilityBadge().variant);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nightShiftBadge().visible ? 38 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.navigation"), " ");
  }
}
__name(ViewShiftComponent_Conditional_4_Template, "ViewShiftComponent_Conditional_4_Template");
var _ViewShiftComponent = class _ViewShiftComponent {
  i18n = inject(I18nService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  shiftsService = inject(ShiftsService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  permissionService = inject(PermissionService);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  processing = signal(false, ...ngDevMode ? [{ debugName: "processing" }] : []);
  shift = signal(null, ...ngDevMode ? [{ debugName: "shift" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  // Expose enums for template
  ShiftType = ShiftType;
  ShiftStatus = ShiftStatus;
  get basicInfoFields() {
    const shift = this.shift();
    if (!shift)
      return [];
    return [
      {
        label: this.i18n.t("shifts.name"),
        value: shift.name
      },
      {
        label: this.i18n.t("shifts.description"),
        value: shift.description || this.i18n.t("common.not_specified")
      },
      {
        label: this.i18n.t("shifts.type"),
        value: this.getShiftTypeLabel(shift.shiftType),
        type: "badge",
        badgeVariant: shift.shiftType === ShiftType.TimeBased ? "info" : "secondary"
      },
      {
        label: this.i18n.t("common.status"),
        value: this.getShiftStatusLabel(shift.status),
        type: "badge",
        badgeVariant: this.getStatusBadgeVariant(shift.status)
      },
      {
        label: this.i18n.t("shifts.night_shift"),
        value: shift.isNightShift ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
        type: "badge",
        badgeVariant: shift.isNightShift ? "warning" : "secondary"
      }
    ];
  }
  get workingHoursFields() {
    const shift = this.shift();
    if (!shift)
      return [];
    const fields = [];
    if (shift.requiredHours !== void 0) {
      fields.push({
        label: this.i18n.t("shifts.required_hours"),
        value: `${shift.requiredHours} ${this.i18n.t("fields.hoursUnit")}`
      });
    }
    if (shift.requiredWeeklyHours !== void 0) {
      fields.push({
        label: this.i18n.t("shifts.required_weekly_hours"),
        value: `${shift.requiredWeeklyHours} ${this.i18n.t("fields.hoursUnit")}`
      });
    }
    if (shift.hasCoreHours && shift.coreStart && shift.coreEnd) {
      fields.push({
        label: this.i18n.t("shifts.core_hours"),
        value: `${shift.coreStart} - ${shift.coreEnd}`
      });
    }
    return fields;
  }
  get workingDaysFields() {
    const shift = this.shift();
    if (!shift)
      return [];
    const workingDays = [];
    if (shift.isSunday)
      workingDays.push(this.i18n.t("days.sunday"));
    if (shift.isMonday)
      workingDays.push(this.i18n.t("days.monday"));
    if (shift.isTuesday)
      workingDays.push(this.i18n.t("days.tuesday"));
    if (shift.isWednesday)
      workingDays.push(this.i18n.t("days.wednesday"));
    if (shift.isThursday)
      workingDays.push(this.i18n.t("days.thursday"));
    if (shift.isFriday)
      workingDays.push(this.i18n.t("days.friday"));
    if (shift.isSaturday)
      workingDays.push(this.i18n.t("days.saturday"));
    return [
      {
        label: this.i18n.t("shifts.working_days"),
        value: workingDays.length > 0 ? workingDays.join(", ") : this.i18n.t("shifts.no_working_days")
      },
      {
        label: this.i18n.t("shifts.total_working_days"),
        value: `${workingDays.length} ${workingDays.length === 1 ? this.i18n.t("fields.dayUnit") : this.i18n.t("fields.daysUnit")}`
      }
    ];
  }
  get settingsFields() {
    const shift = this.shift();
    if (!shift)
      return [];
    const fields = [
      {
        label: this.i18n.t("shifts.check_in_required"),
        value: shift.isCheckInRequired ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
        type: "badge",
        badgeVariant: shift.isCheckInRequired ? "success" : "secondary"
      },
      {
        label: this.i18n.t("shifts.auto_check_out"),
        value: shift.isAutoCheckOut ? this.i18n.t("common.yes") : this.i18n.t("common.no"),
        type: "badge",
        badgeVariant: shift.isAutoCheckOut ? "info" : "secondary"
      },
      {
        label: this.i18n.t("shifts.flexible_hours"),
        value: shift.allowFlexibleHours ? this.i18n.t("common.enabled") : this.i18n.t("common.disabled"),
        type: "badge",
        badgeVariant: shift.allowFlexibleHours ? "success" : "secondary"
      }
    ];
    if (shift.allowFlexibleHours) {
      if (shift.flexMinutesBefore !== void 0) {
        fields.push({
          label: this.i18n.t("shifts.flex_minutes_before"),
          value: `${shift.flexMinutesBefore} ${this.i18n.t("fields.minutesUnit")}`
        });
      }
      if (shift.flexMinutesAfter !== void 0) {
        fields.push({
          label: this.i18n.t("shifts.flex_minutes_after"),
          value: `${shift.flexMinutesAfter} ${this.i18n.t("fields.minutesUnit")}`
        });
      }
    }
    if (shift.gracePeriodMinutes !== void 0) {
      fields.push({
        label: this.i18n.t("shifts.grace_period"),
        value: `${shift.gracePeriodMinutes} ${this.i18n.t("fields.minutesUnit")}`
      });
    }
    return fields;
  }
  get auditFields() {
    const shift = this.shift();
    if (!shift)
      return [];
    const fields = [
      {
        label: this.i18n.t("fields.createdAt"),
        value: shift.createdAtUtc,
        type: "datetime"
      },
      {
        label: this.i18n.t("fields.createdBy"),
        value: shift.createdBy
      }
    ];
    if (shift.modifiedAtUtc && shift.modifiedBy) {
      fields.push({
        label: this.i18n.t("fields.modifiedAt"),
        value: shift.modifiedAtUtc,
        type: "datetime"
      }, {
        label: this.i18n.t("fields.modifiedBy"),
        value: shift.modifiedBy
      });
    }
    return fields;
  }
  get shiftPeriods() {
    return this.shift()?.shiftPeriods || [];
  }
  ngOnInit() {
    this.loadShiftDetails();
  }
  loadShiftDetails() {
    const shiftId = this.route.snapshot.paramMap.get("id");
    if (!shiftId) {
      this.router.navigate(["/shifts"]);
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.shiftsService.getShiftById(+shiftId).subscribe({
      next: /* @__PURE__ */ __name((shift) => {
        this.shift.set(shift);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load shift details:", error);
        this.error.set(this.i18n.t("shifts.errors.load_failed"));
        this.loading.set(false);
      }, "error")
    });
  }
  setAsDefault() {
    return __async(this, null, function* () {
      if (!this.shift())
        return;
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("shifts.set_default_shift"),
        message: this.i18n.t("shifts.confirm_set_default"),
        confirmText: this.i18n.t("shifts.set_default"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-primary",
        icon: "fa-star",
        iconClass: "text-warning"
      });
      if (result.confirmed) {
        this.processing.set(true);
        this.shiftsService.setDefaultShift(this.shift().id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("shifts.success.defaultSet"));
            this.processing.set(false);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to set default shift:", error);
            this.notificationService.error(this.i18n.t("shifts.errors.set_default_failed"));
            this.processing.set(false);
          }, "error")
        });
      }
    });
  }
  deleteShift() {
    return __async(this, null, function* () {
      if (!this.shift())
        return;
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("shifts.delete_shift"),
        message: this.i18n.t("shifts.confirm_delete"),
        confirmText: this.i18n.t("common.delete"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.processing.set(true);
        this.shiftsService.deleteShift(this.shift().id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("shifts.success.deleted"));
            this.router.navigate(["/shifts"]);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete shift:", error);
            this.notificationService.error(this.i18n.t("shifts.errors.delete_failed"));
            this.processing.set(false);
          }, "error")
        });
      }
    });
  }
  // Helper methods
  getShiftName() {
    const shift = this.shift();
    return shift ? shift.name : "";
  }
  getShiftTypeLabel(shiftType) {
    switch (shiftType) {
      case ShiftType.TimeBased:
        return this.i18n.t("shifts.time_based");
      case ShiftType.HoursOnly:
        return this.i18n.t("shifts.hours_only");
      default:
        return shiftType.toString();
    }
  }
  getShiftStatusLabel(status) {
    switch (status) {
      case ShiftStatus.Active:
        return this.i18n.t("common.active");
      case ShiftStatus.Inactive:
        return this.i18n.t("common.inactive");
      case ShiftStatus.Draft:
        return this.i18n.t("shifts.draft");
      case ShiftStatus.Archived:
        return this.i18n.t("shifts.archived");
      default:
        return status.toString();
    }
  }
  getStatusBadgeVariant(status) {
    switch (status) {
      case ShiftStatus.Active:
        return "success";
      case ShiftStatus.Inactive:
        return "secondary";
      case ShiftStatus.Draft:
        return "warning";
      case ShiftStatus.Archived:
        return "dark";
      default:
        return "secondary";
    }
  }
  // Permission checks
  canEdit() {
    return this.permissionService.has(`shift.${PermissionActions.UPDATE}`);
  }
  canSetDefault() {
    return this.permissionService.has(`shift.${PermissionActions.UPDATE}`);
  }
  canDelete() {
    return this.permissionService.has(`shift.${PermissionActions.DELETE}`);
  }
  hasActiveActions() {
    return this.canEdit() || this.canSetDefault() || this.canDelete();
  }
  formatTime(time) {
    return time;
  }
  calculatePeriodHours(period) {
    return `${period.hours} ${this.i18n.t("fields.hoursUnit")}`;
  }
  getTotalShiftHours() {
    const periods = this.shiftPeriods;
    if (periods.length === 0)
      return "0";
    const totalHours = periods.reduce((sum, period) => sum + period.hours, 0);
    return `${totalHours} ${this.i18n.t("fields.hoursUnit")}`;
  }
  // Computed properties for summary badges
  shiftTypeBadge = computed(() => {
    const shift = this.shift();
    if (!shift)
      return { label: "", variant: "secondary" };
    const variant = shift.shiftType === ShiftType.TimeBased ? "info" : "secondary";
    return {
      label: this.getShiftTypeLabel(shift.shiftType),
      variant
    };
  }, ...ngDevMode ? [{ debugName: "shiftTypeBadge" }] : []);
  statusBadge = computed(() => {
    const shift = this.shift();
    if (!shift)
      return { label: "", variant: "secondary" };
    return {
      label: this.getShiftStatusLabel(shift.status),
      variant: this.getStatusBadgeVariant(shift.status)
    };
  }, ...ngDevMode ? [{ debugName: "statusBadge" }] : []);
  flexibilityBadge = computed(() => {
    const shift = this.shift();
    if (!shift)
      return { label: "", variant: "secondary" };
    const variant = shift.allowFlexibleHours ? "success" : "secondary";
    return {
      label: shift.allowFlexibleHours ? this.i18n.t("common.enabled") : this.i18n.t("common.disabled"),
      variant
    };
  }, ...ngDevMode ? [{ debugName: "flexibilityBadge" }] : []);
  nightShiftBadge = computed(() => {
    const shift = this.shift();
    return {
      label: this.i18n.t("common.yes"),
      variant: "warning",
      visible: shift?.isNightShift || false
    };
  }, ...ngDevMode ? [{ debugName: "nightShiftBadge" }] : []);
  // Header actions computed property
  headerActions = computed(() => {
    const shift = this.shift();
    if (!shift)
      return [];
    const actions = [];
    if (this.canEdit()) {
      actions.push({
        label: this.i18n.t("common.edit"),
        icon: "fas fa-edit",
        route: `/shifts/edit/${shift.id}`,
        type: "primary",
        action: /* @__PURE__ */ __name(() => {
        }, "action")
      });
    }
    return actions;
  }, ...ngDevMode ? [{ debugName: "headerActions" }] : []);
};
__name(_ViewShiftComponent, "ViewShiftComponent");
__publicField(_ViewShiftComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewShiftComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewShiftComponent)();
}, "ViewShiftComponent_Factory"));
__publicField(_ViewShiftComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewShiftComponent, selectors: [["app-view-shift"]], decls: 5, vars: 7, consts: [[1, "app-view-page"], ["mode", "view", "moduleName", "shifts", "moduleRoute", "shifts", 3, "title", "entityId", "actions", "loading"], [1, "text-center", "py-5"], ["role", "alert", 1, "alert", "alert-danger"], [1, "app-desktop-sidebar"], [3, "message", "variant", "centered"], [1, "fas", "fa-exclamation-triangle", "me-2"], [1, "app-main-content"], ["icon", "fas fa-info-circle", "layout", "two-column", 3, "title", "fields"], ["icon", "fas fa-clock", "layout", "two-column", 1, "mt-4", 3, "title", "fields"], [1, "card", "mt-4"], ["icon", "fas fa-calendar-week", "layout", "two-column", 1, "mt-4", 3, "title", "fields"], ["icon", "fas fa-cogs", "layout", "two-column", 1, "mt-4", 3, "title", "fields"], ["icon", "fas fa-history", "layout", "two-column", 1, "mt-4", 3, "title", "fields"], [1, "app-sidebar-content"], [1, "card", "mb-3"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-chart-pie", "me-2"], [1, "card-body"], [1, "shift-summary"], [1, "summary-item"], [1, "summary-label"], [1, "summary-value"], [3, "status", "variant"], [1, "summary-value", "periods-count"], [1, "card"], [1, "fas", "fa-arrow-left", "me-2"], [1, "fas", "fa-calendar-day", "me-2"], [1, "shift-periods"], [1, "period-item", 3, "night-period"], [1, "total-hours", "mt-3"], [1, "period-item"], [1, "period-header"], [1, "period-order"], [1, "period-time"], [1, "badge", "bg-warning", "ms-2"], [1, "period-duration"], [1, "fas", "fa-clock", "me-1"], [1, "fas", "fa-cogs", "me-2"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", "btn-warning", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "disabled"], ["type", "button", 1, "btn", "btn-warning", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-star", "me-2"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-trash", "me-2"], [1, "summary-value", "hours-value"], ["icon", "fas fa-moon", 3, "status", "variant"]], template: /* @__PURE__ */ __name(function ViewShiftComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ViewShiftComponent_Conditional_2_Template, 2, 3, "div", 2);
    \u0275\u0275conditionalCreate(3, ViewShiftComponent_Conditional_3_Template, 3, 1, "div", 3);
    \u0275\u0275conditionalCreate(4, ViewShiftComponent_Conditional_4_Template, 45, 26, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("shifts.view_shift"))("entityId", (tmp_1_0 = ctx.shift()) == null ? null : tmp_1_0.id)("actions", ctx.headerActions())("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.shift() && !ctx.loading() ? 4 : -1);
  }
}, "ViewShiftComponent_Template"), dependencies: [
  LoadingSpinnerComponent,
  DetailCardComponent,
  FormHeaderComponent,
  StatusBadgeComponent
], styles: ["\n\n.detail-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.detail-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  font-weight: 600;\n}\n.detail-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n}\n.actions-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n.btn-group-vertical[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.btn-group-vertical[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.shift-periods[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.period-item[_ngcontent-%COMP%] {\n  background: var(--bs-light);\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  border-left: 4px solid var(--bs-primary);\n  transition: all 0.2s ease;\n}\n.period-item[_ngcontent-%COMP%]:hover {\n  background: var(--bs-gray-100);\n  transform: translateY(-1px);\n  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);\n}\n.period-item.night-period[_ngcontent-%COMP%] {\n  border-left-color: var(--bs-warning);\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-warning-bg-subtle) 0%,\n      var(--bs-light) 100%);\n}\n.period-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.5rem;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.period-order[_ngcontent-%COMP%] {\n  background: var(--bs-primary);\n  color: white;\n  border-radius: 50%;\n  width: 1.75rem;\n  height: 1.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.period-time[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--bs-primary);\n}\n.period-duration[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  color: var(--bs-gray-600);\n  font-size: 0.9rem;\n}\n.total-hours[_ngcontent-%COMP%] {\n  background: var(--bs-primary-bg-subtle);\n  border: 1px solid var(--bs-primary-border-subtle);\n  border-radius: 0.5rem;\n  padding: 0.75rem;\n  text-align: center;\n  color: var(--bs-primary-text-emphasis);\n}\n.shift-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem;\n  background-color: var(--bs-gray-50);\n  border-radius: 0.25rem;\n  border-left: 3px solid var(--bs-primary);\n}\n.summary-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  font-size: 0.875rem;\n}\n.summary-value[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.periods-count[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-info);\n  font-size: 1.1rem;\n  background-color: var(--bs-info-bg-subtle);\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n}\n.hours-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-success);\n  font-size: 1rem;\n  background-color: var(--bs-success-bg-subtle);\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n}\n.shift-type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.375rem 0.75rem;\n  border-radius: 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  border: 1px solid;\n}\n.shift-type-badge.time-based[_ngcontent-%COMP%] {\n  background-color: var(--bs-info-bg-subtle);\n  color: var(--bs-info-text-emphasis);\n  border-color: var(--bs-info-border-subtle);\n}\n.shift-type-badge.hours-only[_ngcontent-%COMP%] {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n  border-color: var(--bs-secondary-border-subtle);\n}\n.working-days-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n.day-badge[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n  background-color: var(--bs-success-bg-subtle);\n  color: var(--bs-success-text-emphasis);\n  border: 1px solid var(--bs-success-border-subtle);\n  border-radius: 0.25rem;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n.setting-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.setting-indicator.enabled[_ngcontent-%COMP%] {\n  background-color: var(--bs-success-bg-subtle);\n  color: var(--bs-success-text-emphasis);\n}\n.setting-indicator.disabled[_ngcontent-%COMP%] {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n}\n.flexibility-info[_ngcontent-%COMP%] {\n  background: var(--bs-info-bg-subtle);\n  border: 1px solid var(--bs-info-border-subtle);\n  border-radius: 0.5rem;\n  padding: 0.75rem;\n  margin-top: 0.5rem;\n}\n.flexibility-detail[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.25rem;\n}\n.flexibility-detail[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.loading-container[_ngcontent-%COMP%] {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n.core-hours[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      45deg,\n      var(--bs-warning-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border: 1px solid var(--bs-warning-border-subtle);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  text-align: center;\n  margin-top: 1rem;\n}\n.core-hours-time[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--bs-warning-text-emphasis);\n}\n.core-hours-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n  margin-top: 0.25rem;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .app-sidebar-content[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n  .actions-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .d-grid.gap-2[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .period-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    text-align: center;\n  }\n  .period-time[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .shift-periods[_ngcontent-%COMP%] {\n    gap: 0.75rem;\n  }\n  .period-item[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .summary-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    text-align: center;\n    gap: 0.25rem;\n  }\n  .summary-value[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n  .working-days-list[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .flexibility-detail[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    gap: 0.25rem;\n  }\n  .core-hours[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .core-hours-time[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n}\n/*# sourceMappingURL=view-shift.component.css.map */"] }));
var ViewShiftComponent = _ViewShiftComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewShiftComponent, [{
    type: Component,
    args: [{ selector: "app-view-shift", standalone: true, imports: [
      LoadingSpinnerComponent,
      DetailCardComponent,
      FormHeaderComponent,
      StatusBadgeComponent
    ], template: `<div class="app-view-page">\r
  <!-- Standardized Page Header -->\r
  <app-form-header\r
    mode="view"\r
    [title]="i18n.t('shifts.view_shift')"\r
    moduleName="shifts"\r
    moduleRoute="shifts"\r
    [entityId]="shift()?.id"\r
    [actions]="headerActions()"\r
    [loading]="loading()">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <app-loading-spinner\r
        [message]="i18n.t('shifts.loading_details')"\r
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
  <!-- Shift Details -->\r
  @if (shift() && !loading()) {\r
    <div class="app-desktop-sidebar">\r
      <!-- Main Content -->\r
      <div class="app-main-content">\r
        <!-- Basic Information Card -->\r
        <app-detail-card\r
          [title]="i18n.t('shifts.basic_information')"\r
          icon="fas fa-info-circle"\r
          [fields]="basicInfoFields"\r
          layout="two-column">\r
        </app-detail-card>\r
\r
        <!-- Working Hours Card -->\r
        @if (workingHoursFields.length > 0) {\r
          <app-detail-card\r
            [title]="i18n.t('shifts.working_hours')"\r
            icon="fas fa-clock"\r
            [fields]="workingHoursFields"\r
            layout="two-column"\r
            class="mt-4">\r
          </app-detail-card>\r
        }\r
\r
        <!-- Shift Periods Card -->\r
        @if (shiftPeriods.length > 0) {\r
          <div class="card mt-4">\r
            <div class="card-header">\r
              <h5 class="card-title mb-0">\r
                <i class="fas fa-calendar-day me-2"></i>\r
                {{ i18n.t('shifts.shift_periods') }}\r
              </h5>\r
            </div>\r
            <div class="card-body">\r
              <div class="shift-periods">\r
                @for (period of shiftPeriods; track period.id) {\r
                  <div class="period-item" [class.night-period]="period.isNightPeriod">\r
                    <div class="period-header">\r
                      <span class="period-order">#{{ period.periodOrder }}</span>\r
                      <span class="period-time">{{ formatTime(period.startTime) }} - {{ formatTime(period.endTime) }}</span>\r
                      @if (period.isNightPeriod) {\r
                        <span class="badge bg-warning ms-2">{{ i18n.t('shifts.night_period') }}</span>\r
                      }\r
                    </div>\r
                    <div class="period-duration">\r
                      <i class="fas fa-clock me-1"></i>\r
                      {{ calculatePeriodHours(period) }}\r
                    </div>\r
                  </div>\r
                }\r
              </div>\r
              <div class="total-hours mt-3">\r
                <strong>{{ i18n.t('shifts.total_shift_hours') }}: {{ getTotalShiftHours() }}</strong>\r
              </div>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Working Days Card -->\r
        <app-detail-card\r
          [title]="i18n.t('shifts.working_days')"\r
          icon="fas fa-calendar-week"\r
          [fields]="workingDaysFields"\r
          layout="two-column"\r
          class="mt-4">\r
        </app-detail-card>\r
\r
        <!-- Settings Card -->\r
        <app-detail-card\r
          [title]="i18n.t('shifts.shift_settings')"\r
          icon="fas fa-cogs"\r
          [fields]="settingsFields"\r
          layout="two-column"\r
          class="mt-4">\r
        </app-detail-card>\r
\r
        <!-- Audit Information Card -->\r
        <app-detail-card\r
          [title]="i18n.t('shifts.audit_information')"\r
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
                <!-- Set as Default Action -->\r
                @if (canSetDefault()) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-warning"\r
                    (click)="setAsDefault()"\r
                    [disabled]="processing()">\r
                    @if (processing()) {\r
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    } @else {\r
                      <i class="fas fa-star me-2"></i>\r
                    }\r
                    {{ i18n.t('shifts.set_default') }}\r
                  </button>\r
                }\r
\r
                <!-- Delete Action -->\r
                @if (canDelete()) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-outline-danger"\r
                    (click)="deleteShift()"\r
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
        <!-- Shift Summary -->\r
        <div class="card mb-3">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">\r
              <i class="fas fa-chart-pie me-2"></i>\r
              {{ i18n.t('shifts.shift_summary') }}\r
            </h6>\r
          </div>\r
          <div class="card-body">\r
            <div class="shift-summary">\r
              <!-- Shift Type -->\r
              <div class="summary-item">\r
                <div class="summary-label">{{ i18n.t('fields.type') }}</div>\r
                <div class="summary-value">\r
                  <app-status-badge\r
                    [status]="shiftTypeBadge().label"\r
                    [variant]="shiftTypeBadge().variant">\r
                  </app-status-badge>\r
                </div>\r
              </div>\r
\r
              <!-- Status -->\r
              <div class="summary-item">\r
                <div class="summary-label">{{ i18n.t('fields.status') }}</div>\r
                <div class="summary-value">\r
                  <app-status-badge\r
                    [status]="statusBadge().label"\r
                    [variant]="statusBadge().variant">\r
                  </app-status-badge>\r
                </div>\r
              </div>\r
\r
              <!-- Total Periods -->\r
              <div class="summary-item">\r
                <div class="summary-label">{{ i18n.t('shifts.total_periods') }}</div>\r
                <div class="summary-value periods-count">{{ shiftPeriods.length }}</div>\r
              </div>\r
\r
              <!-- Total Hours -->\r
              @if (shiftPeriods.length > 0) {\r
                <div class="summary-item">\r
                  <div class="summary-label">{{ i18n.t('shifts.total_hours') }}</div>\r
                  <div class="summary-value hours-value">{{ getTotalShiftHours() }}</div>\r
                </div>\r
              }\r
\r
              <!-- Flexibility -->\r
              <div class="summary-item">\r
                <div class="summary-label">{{ i18n.t('shifts.flexible_hours') }}</div>\r
                <div class="summary-value">\r
                  <app-status-badge\r
                    [status]="flexibilityBadge().label"\r
                    [variant]="flexibilityBadge().variant">\r
                  </app-status-badge>\r
                </div>\r
              </div>\r
\r
              <!-- Night Shift -->\r
              @if (nightShiftBadge().visible) {\r
                <div class="summary-item">\r
                  <div class="summary-label">{{ i18n.t('shifts.night_shift') }}</div>\r
                  <div class="summary-value">\r
                    <app-status-badge\r
                      [status]="nightShiftBadge().label"\r
                      [variant]="nightShiftBadge().variant"\r
                      icon="fas fa-moon">\r
                    </app-status-badge>\r
                  </div>\r
                </div>\r
              }\r
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
</div>`, styles: ["/* src/app/pages/shifts/view-shift/view-shift.component.css */\n.detail-card {\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.detail-card .card-header {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  font-weight: 600;\n}\n.detail-card .card-body {\n  padding: 1.25rem;\n}\n.actions-card {\n  position: sticky;\n  top: 1rem;\n}\n.btn-group-vertical .btn {\n  margin-bottom: 0.5rem;\n}\n.btn-group-vertical .btn:last-child {\n  margin-bottom: 0;\n}\n.shift-periods {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.period-item {\n  background: var(--bs-light);\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  border-left: 4px solid var(--bs-primary);\n  transition: all 0.2s ease;\n}\n.period-item:hover {\n  background: var(--bs-gray-100);\n  transform: translateY(-1px);\n  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);\n}\n.period-item.night-period {\n  border-left-color: var(--bs-warning);\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-warning-bg-subtle) 0%,\n      var(--bs-light) 100%);\n}\n.period-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.5rem;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.period-order {\n  background: var(--bs-primary);\n  color: white;\n  border-radius: 50%;\n  width: 1.75rem;\n  height: 1.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.period-time {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--bs-primary);\n}\n.period-duration {\n  display: flex;\n  align-items: center;\n  color: var(--bs-gray-600);\n  font-size: 0.9rem;\n}\n.total-hours {\n  background: var(--bs-primary-bg-subtle);\n  border: 1px solid var(--bs-primary-border-subtle);\n  border-radius: 0.5rem;\n  padding: 0.75rem;\n  text-align: center;\n  color: var(--bs-primary-text-emphasis);\n}\n.shift-summary {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.summary-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem;\n  background-color: var(--bs-gray-50);\n  border-radius: 0.25rem;\n  border-left: 3px solid var(--bs-primary);\n}\n.summary-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  font-size: 0.875rem;\n}\n.summary-value {\n  text-align: right;\n}\n.periods-count {\n  font-weight: 600;\n  color: var(--bs-info);\n  font-size: 1.1rem;\n  background-color: var(--bs-info-bg-subtle);\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n}\n.hours-value {\n  font-weight: 600;\n  color: var(--bs-success);\n  font-size: 1rem;\n  background-color: var(--bs-success-bg-subtle);\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n}\n.shift-type-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.375rem 0.75rem;\n  border-radius: 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  border: 1px solid;\n}\n.shift-type-badge.time-based {\n  background-color: var(--bs-info-bg-subtle);\n  color: var(--bs-info-text-emphasis);\n  border-color: var(--bs-info-border-subtle);\n}\n.shift-type-badge.hours-only {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n  border-color: var(--bs-secondary-border-subtle);\n}\n.working-days-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n.day-badge {\n  padding: 0.25rem 0.5rem;\n  background-color: var(--bs-success-bg-subtle);\n  color: var(--bs-success-text-emphasis);\n  border: 1px solid var(--bs-success-border-subtle);\n  border-radius: 0.25rem;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n.setting-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.setting-indicator.enabled {\n  background-color: var(--bs-success-bg-subtle);\n  color: var(--bs-success-text-emphasis);\n}\n.setting-indicator.disabled {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n}\n.flexibility-info {\n  background: var(--bs-info-bg-subtle);\n  border: 1px solid var(--bs-info-border-subtle);\n  border-radius: 0.5rem;\n  padding: 0.75rem;\n  margin-top: 0.5rem;\n}\n.flexibility-detail {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.25rem;\n}\n.flexibility-detail:last-child {\n  margin-bottom: 0;\n}\n.loading-container {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n.core-hours {\n  background:\n    linear-gradient(\n      45deg,\n      var(--bs-warning-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border: 1px solid var(--bs-warning-border-subtle);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  text-align: center;\n  margin-top: 1rem;\n}\n.core-hours-time {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--bs-warning-text-emphasis);\n}\n.core-hours-label {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n  margin-top: 0.25rem;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar {\n    flex-direction: column;\n  }\n  .app-sidebar-content {\n    margin-top: 1rem;\n  }\n  .actions-card {\n    position: static;\n  }\n  .d-grid.gap-2 {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .period-header {\n    flex-direction: column;\n    align-items: stretch;\n    text-align: center;\n  }\n  .period-time {\n    font-size: 1rem;\n  }\n  .shift-periods {\n    gap: 0.75rem;\n  }\n  .period-item {\n    padding: 0.75rem;\n  }\n  .summary-item {\n    flex-direction: column;\n    align-items: stretch;\n    text-align: center;\n    gap: 0.25rem;\n  }\n  .summary-value {\n    text-align: center;\n  }\n  .working-days-list {\n    justify-content: center;\n  }\n  .flexibility-detail {\n    flex-direction: column;\n    text-align: center;\n    gap: 0.25rem;\n  }\n  .core-hours {\n    padding: 0.75rem;\n  }\n  .core-hours-time {\n    font-size: 1.1rem;\n  }\n}\n/*# sourceMappingURL=view-shift.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewShiftComponent, { className: "ViewShiftComponent", filePath: "src/app/pages/shifts/view-shift/view-shift.component.ts", lineNumber: 29 });
})();
export {
  ViewShiftComponent
};
//# sourceMappingURL=chunk-352ZUXPU.js.map
