import {
  ShiftStatus,
  ShiftType
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
  RadioControlValueAccessor,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/shifts/shifts.component.ts
var _c0 = /* @__PURE__ */ __name(() => [], "_c0");
function ShiftsComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "label", 7);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 28)(4, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Conditional_37_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.shiftForm.requiredHours, $event) || (ctx_r1.shiftForm.requiredHours = $event);
      return \u0275\u0275resetView($event);
    }, "ShiftsComponent_Conditional_37_Template_input_ngModelChange_4_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 30);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("shifts.fields.requiredHours"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.shiftForm.requiredHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("shifts.hours"));
  }
}
__name(ShiftsComponent_Conditional_37_Template, "ShiftsComponent_Conditional_37_Template");
function ShiftsComponent_Conditional_38_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 40)(2, "div", 31)(3, "h6", 41);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 42);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ShiftsComponent_Conditional_38_For_9_Template_button_click_5_listener() {
      const \u0275$index_95_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeShiftPeriod(\u0275$index_95_r5));
    }, "ShiftsComponent_Conditional_38_For_9_Template_button_click_5_listener"));
    \u0275\u0275element(6, "i", 43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 12)(8, "div", 13)(9, "label", 9);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Conditional_38_For_9_Template_input_ngModelChange_11_listener($event) {
      const period_r6 = \u0275\u0275restoreView(_r4).$implicit;
      \u0275\u0275twoWayBindingSet(period_r6.startTime, $event) || (period_r6.startTime = $event);
      return \u0275\u0275resetView($event);
    }, "ShiftsComponent_Conditional_38_For_9_Template_input_ngModelChange_11_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 13)(13, "label", 9);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Conditional_38_For_9_Template_input_ngModelChange_15_listener($event) {
      const period_r6 = \u0275\u0275restoreView(_r4).$implicit;
      \u0275\u0275twoWayBindingSet(period_r6.endTime, $event) || (period_r6.endTime = $event);
      return \u0275\u0275resetView($event);
    }, "ShiftsComponent_Conditional_38_For_9_Template_input_ngModelChange_15_listener"));
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const period_r6 = ctx.$implicit;
    const \u0275$index_95_r5 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.t("shifts.period"), " ", period_r6.periodOrder);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.shiftForm.shiftPeriods.length <= 1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.t("shifts.fields.startTime"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", period_r6.startTime);
    \u0275\u0275property("name", "startTime" + \u0275$index_95_r5);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t("shifts.fields.endTime"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", period_r6.endTime);
    \u0275\u0275property("name", "endTime" + \u0275$index_95_r5);
  }
}
__name(ShiftsComponent_Conditional_38_For_9_Template, "ShiftsComponent_Conditional_38_For_9_Template");
function ShiftsComponent_Conditional_38_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13)(2, "label", 9);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 28)(5, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Conditional_38_Conditional_17_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.shiftForm.flexMinutesBefore, $event) || (ctx_r1.shiftForm.flexMinutesBefore = $event);
      return \u0275\u0275resetView($event);
    }, "ShiftsComponent_Conditional_38_Conditional_17_Template_input_ngModelChange_5_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 30);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 13)(9, "label", 9);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 28)(12, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Conditional_38_Conditional_17_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.shiftForm.flexMinutesAfter, $event) || (ctx_r1.shiftForm.flexMinutesAfter = $event);
      return \u0275\u0275resetView($event);
    }, "ShiftsComponent_Conditional_38_Conditional_17_Template_input_ngModelChange_12_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 30);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t("shifts.fields.flexMinutesBefore"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.shiftForm.flexMinutesBefore);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("common.minutes"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t("shifts.fields.flexMinutesAfter"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.shiftForm.flexMinutesAfter);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("common.minutes"));
  }
}
__name(ShiftsComponent_Conditional_38_Conditional_17_Template, "ShiftsComponent_Conditional_38_Conditional_17_Template");
function ShiftsComponent_Conditional_38_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 39);
    \u0275\u0275element(1, "i", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.t("shifts.validation.flexibleHoursAndGraceCombined"), " ");
  }
}
__name(ShiftsComponent_Conditional_38_Conditional_27_Template, "ShiftsComponent_Conditional_38_Conditional_27_Template");
function ShiftsComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 6)(2, "div", 31)(3, "label", 7);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 32);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ShiftsComponent_Conditional_38_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addShiftPeriod());
    }, "ShiftsComponent_Conditional_38_Template_button_click_5_listener"));
    \u0275\u0275element(6, "i", 33);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(8, ShiftsComponent_Conditional_38_For_9_Template, 16, 9, "div", 34, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 6)(11, "div", 35)(12, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Conditional_38_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.shiftForm.allowFlexibleHours, $event) || (ctx_r1.shiftForm.allowFlexibleHours = $event);
      return \u0275\u0275resetView($event);
    }, "ShiftsComponent_Conditional_38_Template_input_ngModelChange_12_listener"));
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function ShiftsComponent_Conditional_38_Template_input_change_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFlexibleHoursChange());
    }, "ShiftsComponent_Conditional_38_Template_input_change_12_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "label", 16);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "small", 17);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(17, ShiftsComponent_Conditional_38_Conditional_17_Template, 15, 6, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 6)(19, "label", 9);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 28)(22, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Conditional_38_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.shiftForm.gracePeriodMinutes, $event) || (ctx_r1.shiftForm.gracePeriodMinutes = $event);
      return \u0275\u0275resetView($event);
    }, "ShiftsComponent_Conditional_38_Template_input_ngModelChange_22_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 30);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "small", 38);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(27, ShiftsComponent_Conditional_38_Conditional_27_Template, 3, 1, "small", 39);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.t("shifts.fields.periods"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.shiftForm.shiftPeriods.length >= 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.t("shifts.addPeriod"), " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.shiftForm.shiftPeriods);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.shiftForm.allowFlexibleHours);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("shifts.fields.allowFlexibleHours"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("shifts.flexibleHoursDescription"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.shiftForm.allowFlexibleHours ? 17 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.t("shifts.fields.gracePeriod"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.shiftForm.gracePeriodMinutes);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("common.minutes"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.t("shifts.gracePeriodDescription"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.shiftForm.allowFlexibleHours && ctx_r1.shiftForm.gracePeriodMinutes ? 27 : -1);
  }
}
__name(ShiftsComponent_Conditional_38_Template, "ShiftsComponent_Conditional_38_Template");
function ShiftsComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 24);
  }
}
__name(ShiftsComponent_Conditional_58_Template, "ShiftsComponent_Conditional_58_Template");
function ShiftsComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r1.selectedShift()) == null ? null : tmp_1_0.name);
  }
}
__name(ShiftsComponent_Conditional_64_Template, "ShiftsComponent_Conditional_64_Template");
function ShiftsComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 24);
  }
}
__name(ShiftsComponent_Conditional_69_Template, "ShiftsComponent_Conditional_69_Template");
function ShiftsComponent_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 24);
  }
}
__name(ShiftsComponent_Conditional_87_Template, "ShiftsComponent_Conditional_87_Template");
var _ShiftsComponent = class _ShiftsComponent {
  shiftsService = inject(ShiftsService);
  branchesService = inject(BranchesService);
  router = inject(Router);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Permission constants for use in template
  PERMISSIONS = {
    SHIFT_CREATE: `${PermissionResources.SHIFT}.${PermissionActions.CREATE}`,
    SHIFT_READ: `${PermissionResources.SHIFT}.${PermissionActions.READ}`,
    SHIFT_UPDATE: `${PermissionResources.SHIFT}.${PermissionActions.UPDATE}`,
    SHIFT_DELETE: `${PermissionResources.SHIFT}.${PermissionActions.DELETE}`,
    SHIFT_MANAGE: `${PermissionResources.SHIFT}.${PermissionActions.MANAGE}`
  };
  // Enum references for template
  ShiftType = ShiftType;
  ShiftStatus = ShiftStatus;
  // Page size options for searchable select
  get pageSizeSelectOptions() {
    return [
      { value: "10", label: "10" },
      { value: "25", label: "25" },
      { value: "50", label: "50" }
    ];
  }
  // Status options for searchable select
  get statusSelectOptions() {
    return [
      { value: ShiftStatus.Active.toString(), label: this.t("shifts.status.active") },
      { value: ShiftStatus.Inactive.toString(), label: this.t("shifts.status.inactive") },
      { value: ShiftStatus.Draft.toString(), label: this.t("shifts.status.draft") },
      { value: ShiftStatus.Archived.toString(), label: this.t("shifts.status.archived") }
    ];
  }
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  shifts = signal([], ...ngDevMode ? [{ debugName: "shifts" }] : []);
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  defaultShift = signal(null, ...ngDevMode ? [{ debugName: "defaultShift" }] : []);
  // Pagination
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  totalCount = signal(0, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  totalPages = signal(0, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // Filters
  searchTerm = "";
  branchFilter = void 0;
  // Modal state
  showCreateModal = signal(false, ...ngDevMode ? [{ debugName: "showCreateModal" }] : []);
  showEditModal = signal(false, ...ngDevMode ? [{ debugName: "showEditModal" }] : []);
  showDeleteModal = signal(false, ...ngDevMode ? [{ debugName: "showDeleteModal" }] : []);
  showDefaultShiftModal = signal(false, ...ngDevMode ? [{ debugName: "showDefaultShiftModal" }] : []);
  selectedShift = signal(null, ...ngDevMode ? [{ debugName: "selectedShift" }] : []);
  // Form state
  shiftForm = {
    name: "",
    description: "",
    shiftType: ShiftType.TimeBased,
    status: ShiftStatus.Active,
    requiredHours: void 0,
    isCheckInRequired: true,
    isAutoCheckOut: false,
    allowFlexibleHours: false,
    flexMinutesBefore: void 0,
    flexMinutesAfter: void 0,
    gracePeriodMinutes: void 0,
    shiftPeriods: []
  };
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  // Data table configuration
  tableColumns = computed(() => [
    {
      key: "name",
      label: this.t("shifts.fields.name"),
      sortable: true,
      width: "250px",
      priority: "high",
      mobileLabel: this.t("shifts.fields.name"),
      renderHtml: true
    },
    {
      key: "status",
      label: this.t("shifts.fields.status"),
      sortable: true,
      width: "120px",
      align: "center",
      priority: "high",
      mobileLabel: this.t("shifts.fields.status"),
      renderHtml: true
    },
    {
      key: "type",
      label: this.t("shifts.fields.type"),
      sortable: false,
      width: "120px",
      align: "center",
      priority: "medium",
      hideOnMobile: false,
      mobileLabel: this.t("shifts.fields.type"),
      renderHtml: true
    },
    {
      key: "periods",
      label: this.t("shifts.fields.periods"),
      sortable: false,
      width: "200px",
      priority: "medium",
      hideOnMobile: false,
      mobileLabel: "Periods",
      renderHtml: true
    },
    {
      key: "requirements",
      label: this.t("shifts.fields.requirements"),
      sortable: false,
      width: "180px",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: "Rules",
      renderHtml: true
    }
  ], ...ngDevMode ? [{ debugName: "tableColumns" }] : []);
  tableActions = computed(() => [
    {
      key: "view",
      label: this.t("common.view"),
      icon: "fa-eye",
      color: "primary",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.SHIFT_READ), "condition")
    },
    {
      key: "set-default",
      label: this.t("shifts.defaultShift.setDefault"),
      icon: "fa-star",
      color: "success",
      condition: /* @__PURE__ */ __name((shift) => this.canSetDefaultShift(shift), "condition")
    },
    {
      key: "edit",
      label: this.t("common.edit"),
      icon: "fa-edit",
      color: "secondary",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.SHIFT_UPDATE), "condition")
    },
    {
      key: "delete",
      label: this.t("common.delete"),
      icon: "fa-trash",
      color: "danger",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.SHIFT_DELETE), "condition")
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  // Transform shifts data for data table
  tableData = computed(() => {
    return this.shifts().map((shift) => __spreadProps(__spreadValues({}, shift), {
      name: this.formatShiftName(shift),
      status: this.formatShiftStatus(shift),
      type: this.formatShiftType(shift),
      periods: this.formatShiftPeriods(shift),
      requirements: this.formatShiftRequirements(shift)
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  ngOnInit() {
    this.loadBranches();
    this.loadShifts();
    this.loadDefaultShift();
  }
  t(key) {
    return this.i18n.t(key);
  }
  loadBranches() {
    this.branchesService.getBranches(1, 1e3).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.branches.set(response.items);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches:", error);
      }, "error")
    });
  }
  loadShifts() {
    this.loading.set(true);
    const search = this.searchTerm.trim() || void 0;
    this.shiftsService.getShifts(this.currentPage(), this.pageSize(), search).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.shifts.set(response.items);
        this.totalCount.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load shifts:", error);
        this.loading.set(false);
      }, "error")
    });
  }
  loadDefaultShift() {
    this.shiftsService.getDefaultShift().subscribe({
      next: /* @__PURE__ */ __name((defaultShift) => {
        this.defaultShift.set(defaultShift);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load default shift:", error);
        this.defaultShift.set(null);
      }, "error")
    });
  }
  onSearch() {
    this.currentPage.set(1);
    this.loadShifts();
  }
  /**
   * Handle search input changes from filters component
   */
  onSearchChange(searchTerm) {
    this.searchTerm = searchTerm;
    this.currentPage.set(1);
    this.loadShifts();
  }
  /**
   * Handle filters change from filters component
   */
  onFiltersChange(filters) {
    if (filters.search !== void 0) {
      this.searchTerm = filters.search || "";
    }
    if (filters.status !== void 0) {
    }
    if (filters.shiftType !== void 0) {
    }
    this.currentPage.set(1);
    this.loadShifts();
  }
  /**
   * Handle refresh data request
   */
  onRefreshData() {
    this.loadShifts();
  }
  onFilterChange() {
    this.currentPage.set(1);
    this.loadShifts();
  }
  onPageChange(page) {
    this.currentPage.set(page);
    this.loadShifts();
  }
  onPageSizeSelectionChange(pageSizeStr) {
    this.pageSize.set(parseInt(pageSizeStr));
    this.onPageSizeChange();
  }
  onPageSizeChange() {
    this.currentPage.set(1);
    this.loadShifts();
  }
  getShiftTypeText(shiftType) {
    return shiftType === ShiftType.TimeBased ? this.t("shifts.types.timeBased") : this.t("shifts.types.hoursOnly");
  }
  getShiftStatusText(status) {
    switch (status) {
      case ShiftStatus.Active:
        return this.t("shifts.status.active");
      case ShiftStatus.Inactive:
        return this.t("shifts.status.inactive");
      case ShiftStatus.Draft:
        return this.t("shifts.status.draft");
      case ShiftStatus.Archived:
        return this.t("shifts.status.archived");
      default:
        return this.t("shifts.status.active");
    }
  }
  getShiftStatusClass(status) {
    switch (status) {
      case ShiftStatus.Active:
        return "bg-success";
      case ShiftStatus.Inactive:
        return "bg-light text-dark border";
      case ShiftStatus.Draft:
        return "bg-warning";
      case ShiftStatus.Archived:
        return "bg-light text-dark border";
      default:
        return "bg-success";
    }
  }
  getShiftStatusBadgeStatus(status) {
    switch (status) {
      case ShiftStatus.Active:
        return "success";
      case ShiftStatus.Inactive:
        return "secondary";
      case ShiftStatus.Draft:
        return "warning";
      case ShiftStatus.Archived:
        return "secondary";
      default:
        return "success";
    }
  }
  formatTime(timeString) {
    return timeString;
  }
  formatHours(hours) {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours}h`;
  }
  getShiftTypeBadgeClass(shiftType) {
    return shiftType === ShiftType.TimeBased ? "badge-primary" : "badge-info";
  }
  getPeriodTypeText(period) {
    const isNight = this.isNightShift(period.startTime, period.endTime);
    return isNight ? this.t("shifts.periodTypes.nightShift") : this.t("shifts.periodTypes.dayShift");
  }
  getPeriodHoursText(period) {
    const hours = this.calculatePeriodHours(period.startTime, period.endTime);
    return this.formatHours(hours);
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  // CRUD Operations
  onCreateShift() {
    this.router.navigate(["/shifts/create"]);
  }
  onViewShift(shift) {
    this.router.navigate(["/shifts", shift.id, "view"]);
  }
  onEditShift(shift) {
    this.router.navigate(["/shifts", shift.id, "edit"]);
  }
  onDeleteShift(shift) {
    this.selectedShift.set(shift);
    this.showDeleteModal.set(true);
  }
  onSubmitCreate() {
    if (!this.isFormValid())
      return;
    this.submitting.set(true);
    const request = {
      name: this.shiftForm.name.trim(),
      description: this.shiftForm.description.trim() || void 0,
      shiftType: this.shiftForm.shiftType,
      status: this.shiftForm.status,
      requiredHours: this.shiftForm.requiredHours,
      isCheckInRequired: this.shiftForm.isCheckInRequired,
      isAutoCheckOut: this.shiftForm.isAutoCheckOut,
      allowFlexibleHours: this.shiftForm.allowFlexibleHours,
      flexMinutesBefore: this.shiftForm.flexMinutesBefore,
      flexMinutesAfter: this.shiftForm.flexMinutesAfter,
      gracePeriodMinutes: this.shiftForm.gracePeriodMinutes,
      shiftPeriods: this.shiftForm.shiftPeriods.length > 0 ? this.shiftForm.shiftPeriods.map((sp) => ({
        periodOrder: sp.periodOrder,
        startTime: sp.startTime,
        endTime: sp.endTime
      })) : void 0
    };
    this.shiftsService.createShift(request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.showCreateModal.set(false);
        this.loadShifts();
        this.submitting.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to create shift:", error);
        this.submitting.set(false);
      }, "error")
    });
  }
  onSubmitEdit() {
    if (!this.isFormValid() || !this.selectedShift())
      return;
    this.submitting.set(true);
    const request = {
      name: this.shiftForm.name.trim(),
      description: this.shiftForm.description.trim() || void 0,
      shiftType: this.shiftForm.shiftType,
      status: this.shiftForm.status,
      requiredHours: this.shiftForm.requiredHours,
      isCheckInRequired: this.shiftForm.isCheckInRequired,
      isAutoCheckOut: this.shiftForm.isAutoCheckOut,
      allowFlexibleHours: this.shiftForm.allowFlexibleHours,
      flexMinutesBefore: this.shiftForm.flexMinutesBefore,
      flexMinutesAfter: this.shiftForm.flexMinutesAfter,
      gracePeriodMinutes: this.shiftForm.gracePeriodMinutes,
      shiftPeriods: this.shiftForm.shiftPeriods.length > 0 ? this.shiftForm.shiftPeriods.map((sp) => ({
        id: sp.id,
        periodOrder: sp.periodOrder,
        startTime: sp.startTime,
        endTime: sp.endTime
      })) : void 0
    };
    this.shiftsService.updateShift(this.selectedShift().id, request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.showEditModal.set(false);
        this.loadShifts();
        this.submitting.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to update shift:", error);
        this.submitting.set(false);
      }, "error")
    });
  }
  onConfirmDelete() {
    if (!this.selectedShift())
      return;
    this.submitting.set(true);
    this.shiftsService.deleteShift(this.selectedShift().id).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.showDeleteModal.set(false);
        this.loadShifts();
        this.submitting.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to delete shift:", error);
        this.submitting.set(false);
        let errorMessage = "Failed to delete shift";
        if (error?.error?.message) {
          errorMessage = error.error.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        console.error("Deletion error:", errorMessage);
      }, "error")
    });
  }
  onCloseModal() {
    this.showCreateModal.set(false);
    this.showEditModal.set(false);
    this.showDeleteModal.set(false);
    this.showDefaultShiftModal.set(false);
    this.selectedShift.set(null);
    this.submitting.set(false);
  }
  // Default Shift Management
  onSetDefaultShift(shift) {
    if (this.defaultShift()) {
      this.selectedShift.set(shift);
      this.showDefaultShiftModal.set(true);
    } else {
      this.setDefaultShift(shift, false);
    }
  }
  onConfirmSetDefaultShift() {
    if (!this.selectedShift())
      return;
    this.setDefaultShift(this.selectedShift(), true);
  }
  setDefaultShift(shift, forceReplace) {
    this.submitting.set(true);
    this.shiftsService.setDefaultShift(shift.id, forceReplace).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.defaultShift.set(shift);
        this.showDefaultShiftModal.set(false);
        this.submitting.set(false);
        console.log(`Successfully set "${shift.name}" as default shift`);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to set default shift:", error);
        this.submitting.set(false);
      }, "error")
    });
  }
  isDefaultShift(shift) {
    return this.defaultShift()?.id === shift.id;
  }
  canSetDefaultShift(shift) {
    return this.permissionService.hasRole("SystemAdmin") && shift.status === ShiftStatus.Active && !this.isDefaultShift(shift);
  }
  // Shift Type Change Handler
  onShiftTypeChange() {
    if (this.shiftForm.shiftType === ShiftType.HoursOnly) {
      this.shiftForm.allowFlexibleHours = false;
      this.shiftForm.flexMinutesBefore = void 0;
      this.shiftForm.flexMinutesAfter = void 0;
      this.shiftForm.gracePeriodMinutes = void 0;
      this.shiftForm.shiftPeriods = [];
    } else {
      this.shiftForm.requiredHours = void 0;
      if (this.shiftForm.shiftPeriods.length === 0) {
        this.addShiftPeriod();
      }
    }
  }
  // Flexible Hours Change Handler
  onFlexibleHoursChange() {
    if (!this.shiftForm.allowFlexibleHours) {
      this.shiftForm.flexMinutesBefore = void 0;
      this.shiftForm.flexMinutesAfter = void 0;
    }
  }
  // Business Rule Methods
  calculatePeriodHours(startTime, endTime) {
    if (!startTime || !endTime)
      return 0;
    const start = this.parseTime(startTime);
    const end = this.parseTime(endTime);
    if (end > start) {
      return (end - start) / (1e3 * 60 * 60);
    } else if (end < start) {
      const hoursToMidnight = (24 * 60 * 60 * 1e3 - start) / (1e3 * 60 * 60);
      const hoursFromMidnight = end / (1e3 * 60 * 60);
      return hoursToMidnight + hoursFromMidnight;
    } else {
      return 0;
    }
  }
  isNightShift(startTime, endTime) {
    if (!startTime || !endTime)
      return false;
    const start = this.parseTime(startTime);
    const end = this.parseTime(endTime);
    return end < start;
  }
  getTotalShiftHours() {
    if (this.shiftForm.shiftType === ShiftType.HoursOnly) {
      return this.shiftForm.requiredHours || 0;
    }
    return this.shiftForm.shiftPeriods.reduce((total, period) => {
      return total + this.calculatePeriodHours(period.startTime, period.endTime);
    }, 0);
  }
  parseTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return (hours * 60 + minutes) * 60 * 1e3;
  }
  validateBusinessRules() {
    const errors = [];
    if (this.shiftForm.shiftType === ShiftType.TimeBased) {
      if (this.shiftForm.shiftPeriods.length === 0) {
        errors.push(this.t("shifts.validation.timeBased.periodsRequired"));
      }
      if (this.shiftForm.requiredHours !== void 0) {
        errors.push(this.t("shifts.validation.timeBased.noRequiredHours"));
      }
    } else if (this.shiftForm.shiftType === ShiftType.HoursOnly) {
      if (this.shiftForm.shiftPeriods.length > 0) {
        errors.push(this.t("shifts.validation.hoursOnly.noPeriods"));
      }
      if (!this.shiftForm.requiredHours || this.shiftForm.requiredHours <= 0) {
        errors.push(this.t("shifts.validation.hoursOnly.requiredHours"));
      }
      if (this.shiftForm.requiredHours && this.shiftForm.requiredHours > 24) {
        errors.push(this.t("shifts.validation.hoursOnly.maxHours"));
      }
    }
    if (this.shiftForm.shiftPeriods.length > 2) {
      errors.push(this.t("shifts.validation.periods.maxTwo"));
    }
    for (let i = 0; i < this.shiftForm.shiftPeriods.length; i++) {
      const period = this.shiftForm.shiftPeriods[i];
      if (period.startTime === period.endTime) {
        errors.push(this.t("shifts.validation.periods.sameTime").replace("{{period}}", (i + 1).toString()));
      }
      const hours = this.calculatePeriodHours(period.startTime, period.endTime);
      if (hours <= 0) {
        errors.push(this.t("shifts.validation.periods.positiveHours").replace("{{period}}", (i + 1).toString()));
      }
      if (hours > 24) {
        errors.push(this.t("shifts.validation.periods.maxHours").replace("{{period}}", (i + 1).toString()));
      }
    }
    if (this.shiftForm.shiftType === ShiftType.HoursOnly) {
      if (this.shiftForm.allowFlexibleHours) {
        errors.push(this.t("shifts.validation.hoursOnly.noFlexibleHours"));
      }
      if (this.shiftForm.gracePeriodMinutes) {
        errors.push(this.t("shifts.validation.hoursOnly.noGracePeriod"));
      }
    }
    if (this.shiftForm.allowFlexibleHours) {
      if (this.shiftForm.flexMinutesBefore && this.shiftForm.flexMinutesBefore > 480) {
        errors.push(this.t("shifts.validation.flexible.maxBefore"));
      }
      if (this.shiftForm.flexMinutesAfter && this.shiftForm.flexMinutesAfter > 480) {
        errors.push(this.t("shifts.validation.flexible.maxAfter"));
      }
    }
    if (this.shiftForm.gracePeriodMinutes && this.shiftForm.gracePeriodMinutes > 120) {
      errors.push(this.t("shifts.validation.gracePeriod.max"));
    }
    if (!this.shiftForm.isCheckInRequired && !this.shiftForm.isAutoCheckOut) {
      errors.push(this.t("shifts.validation.checkInOut.conflict"));
    }
    if (this.shiftForm.shiftPeriods.length === 2) {
      const periods = this.shiftForm.shiftPeriods.sort((a, b) => a.periodOrder - b.periodOrder);
      const firstPeriod = periods[0];
      const secondPeriod = periods[1];
      const firstIsNight = this.isNightShift(firstPeriod.startTime, firstPeriod.endTime);
      const secondIsNight = this.isNightShift(secondPeriod.startTime, secondPeriod.endTime);
      if (firstIsNight && secondIsNight) {
        errors.push(this.t("shifts.validation.periods.multipleNight"));
      }
      if (!firstIsNight && !secondIsNight) {
        const firstEndTime = this.parseTime(firstPeriod.endTime);
        const secondStartTime = this.parseTime(secondPeriod.startTime);
        if (firstEndTime >= secondStartTime) {
          errors.push(this.t("shifts.validation.periods.overlap"));
        }
      }
    }
    return errors;
  }
  // Shift Period Management
  addShiftPeriod() {
    if (this.shiftForm.shiftPeriods.length < 2) {
      this.shiftForm.shiftPeriods.push({
        periodOrder: this.shiftForm.shiftPeriods.length + 1,
        startTime: "08:00",
        endTime: "17:00"
      });
    }
  }
  removeShiftPeriod(index) {
    this.shiftForm.shiftPeriods.splice(index, 1);
    this.shiftForm.shiftPeriods.forEach((period, idx) => {
      period.periodOrder = idx + 1;
    });
  }
  resetForm() {
    this.shiftForm = {
      name: "",
      description: "",
      shiftType: ShiftType.TimeBased,
      status: ShiftStatus.Active,
      requiredHours: void 0,
      isCheckInRequired: true,
      isAutoCheckOut: false,
      allowFlexibleHours: false,
      flexMinutesBefore: void 0,
      flexMinutesAfter: void 0,
      gracePeriodMinutes: void 0,
      shiftPeriods: [
        {
          periodOrder: 1,
          startTime: "08:00",
          endTime: "17:00"
        }
      ]
    };
  }
  isFormValid() {
    if (!this.shiftForm.name.trim()) {
      return false;
    }
    const businessRuleErrors = this.validateBusinessRules();
    return businessRuleErrors.length === 0;
  }
  getFormErrors() {
    const errors = [];
    if (!this.shiftForm.name.trim()) {
      errors.push(this.t("shifts.validation.name.required"));
    }
    errors.push(...this.validateBusinessRules());
    return errors;
  }
  // Utility methods for pagination (similar to branches component)
  getPaginationArray() {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 2;
    let start = Math.max(1, current - delta);
    let end = Math.min(total, current + delta);
    if (end - start < 4 && total > 4) {
      if (start === 1) {
        end = Math.min(total, start + 4);
      } else if (end === total) {
        start = Math.max(1, end - 4);
      }
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
  getEndCount() {
    return Math.min(this.currentPage() * this.pageSize(), this.totalCount());
  }
  // Data table formatting methods
  formatShiftName(shift) {
    let html = `<div><strong>${shift.name}</strong>`;
    if (this.isDefaultShift(shift)) {
      html += `<span class="badge bg-success ms-2">${this.t("shifts.defaultShift.currentDefault")}</span>`;
    }
    if (shift.description) {
      html += `<small class="d-block text-muted">${shift.description}</small>`;
    }
    html += "</div>";
    return html;
  }
  formatShiftStatus(shift) {
    const statusText = this.getShiftStatusText(shift.status);
    const statusClass = this.getShiftStatusClass(shift.status);
    return `<span class="badge ${statusClass}">${statusText}</span>`;
  }
  formatShiftType(shift) {
    const typeText = this.getShiftTypeText(shift.shiftType);
    const typeClass = shift.shiftType === ShiftType.TimeBased ? "bg-primary" : "bg-info";
    return `<span class="badge ${typeClass}">${typeText}</span>`;
  }
  formatShiftPeriods(shift) {
    if (shift.shiftType === ShiftType.TimeBased && shift.shiftPeriods) {
      let html = "<div>";
      shift.shiftPeriods.forEach((period) => {
        html += `<div class="small">${this.formatTime(period.startTime)} - ${this.formatTime(period.endTime)}`;
        if (period.isNightPeriod) {
          html += `<span class="badge bg-warning ms-1">${this.t("shifts.nightShift")}</span>`;
        }
        html += "</div>";
      });
      html += "</div>";
      return html;
    } else if (shift.shiftType === ShiftType.HoursOnly) {
      return `<div>${shift.requiredHours} ${this.t("shifts.hours")}</div>`;
    }
    return "<div>-</div>";
  }
  formatShiftRequirements(shift) {
    let html = '<div class="small">';
    if (shift.isCheckInRequired) {
      html += `<div><i class="fas fa-check text-success me-1"></i>${this.t("shifts.checkInRequired")}</div>`;
    }
    if (shift.isAutoCheckOut) {
      html += `<div><i class="fas fa-check text-success me-1"></i>${this.t("shifts.autoCheckOut")}</div>`;
    }
    if (shift.allowFlexibleHours) {
      html += `<div><i class="fas fa-check text-success me-1"></i>${this.t("shifts.flexibleHours")}</div>`;
    }
    if (shift.gracePeriodMinutes) {
      html += `<div><i class="fas fa-clock text-info me-1"></i>${shift.gracePeriodMinutes}min ${this.t("shifts.gracePeriod")}</div>`;
    }
    html += "</div>";
    return html;
  }
  // Data table action handler
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.onViewShift(item);
        break;
      case "set-default":
        this.onSetDefaultShift(item);
        break;
      case "edit":
        this.onEditShift(item);
        break;
      case "delete":
        this.onDeleteShift(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  // Data table event handlers
  onTablePageChange(page) {
    this.onPageChange(page);
  }
  onTablePageSizeChange(size) {
    this.pageSize.set(size);
    this.onPageSizeChange();
  }
};
__name(_ShiftsComponent, "ShiftsComponent");
__publicField(_ShiftsComponent, "\u0275fac", /* @__PURE__ */ __name(function ShiftsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ShiftsComponent)();
}, "ShiftsComponent_Factory"));
__publicField(_ShiftsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShiftsComponent, selectors: [["app-shifts"]], decls: 89, vars: 74, consts: [[1, "app-list-page"], [3, "title"], ["moduleName", "shifts", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [3, "actionClick", "pageChange", "pageSizeChange", "data", "columns", "actions", "currentPage", "totalPages", "totalItems", "pageSize", "loading", "emptyTitle", "emptyMessage", "responsiveMode"], [3, "close", "show", "title", "size", "centered", "loading"], [1, "modal-body"], [1, "mb-3"], [1, "form-label", "required"], ["type", "text", "name", "name", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-label"], ["rows", "2", "name", "description", 1, "form-control", 3, "ngModelChange", "ngModel"], ["name", "status", 3, "ngModelChange", "options", "ngModel", "placeholder", "required", "searchable", "clearable"], [1, "row"], [1, "col-md-6"], [1, "form-check"], ["type", "radio", "name", "shiftType", 1, "form-check-input", 3, "ngModelChange", "change", "value", "ngModel"], [1, "form-check-label"], [1, "form-text", "text-muted", "d-block"], [1, "row", "mb-3"], ["type", "checkbox", "name", "isCheckInRequired", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["type", "checkbox", "name", "isAutoCheckOut", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["modal-footer", "", 1, "d-flex", "gap-2", "justify-content-end"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"], [3, "close", "show", "title", "centered", "loading"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-success", 3, "click", "disabled"], [1, "input-group"], ["type", "number", "name", "requiredHours", "min", "0.5", "max", "24", "step", "0.5", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "input-group-text"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-2"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-primary", 3, "click", "disabled"], [1, "fas", "fa-plus", "me-1"], [1, "card", "mb-2"], [1, "form-check", "mb-2"], ["type", "checkbox", "name", "allowFlexibleHours", 1, "form-check-input", 3, "ngModelChange", "change", "ngModel"], ["type", "number", "name", "gracePeriodMinutes", "min", "1", "max", "120", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-text", "text-muted"], [1, "form-text", "text-info", "d-block"], [1, "card-body", "p-3"], [1, "mb-0"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-trash"], ["type", "time", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel", "name"], ["type", "number", "name", "flexMinutesBefore", "min", "1", "max", "480", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "number", "name", "flexMinutesAfter", "min", "1", "max", "480", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "fas", "fa-info-circle", "me-1"]], template: /* @__PURE__ */ __name(function ShiftsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function ShiftsComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      return ctx.onSearchChange($event);
    }, "ShiftsComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function ShiftsComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      return ctx.onFiltersChange($event);
    }, "ShiftsComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function ShiftsComponent_Template_app_unified_filter_add_2_listener() {
      return ctx.onCreateShift();
    }, "ShiftsComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function ShiftsComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefreshData();
    }, "ShiftsComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-data-table", 3);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function ShiftsComponent_Template_app_data_table_actionClick_3_listener($event) {
      return ctx.onActionClick($event);
    }, "ShiftsComponent_Template_app_data_table_actionClick_3_listener"))("pageChange", /* @__PURE__ */ __name(function ShiftsComponent_Template_app_data_table_pageChange_3_listener($event) {
      return ctx.onTablePageChange($event);
    }, "ShiftsComponent_Template_app_data_table_pageChange_3_listener"))("pageSizeChange", /* @__PURE__ */ __name(function ShiftsComponent_Template_app_data_table_pageSizeChange_3_listener($event) {
      return ctx.onTablePageSizeChange($event);
    }, "ShiftsComponent_Template_app_data_table_pageSizeChange_3_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "app-modal-wrapper", 4);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function ShiftsComponent_Template_app_modal_wrapper_close_4_listener() {
      return ctx.onCloseModal();
    }, "ShiftsComponent_Template_app_modal_wrapper_close_4_listener"));
    \u0275\u0275elementStart(5, "div", 5)(6, "form")(7, "div", 6)(8, "label", 7);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 8);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.name, $event) || (ctx.shiftForm.name = $event);
      return $event;
    }, "ShiftsComponent_Template_input_ngModelChange_10_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 6)(12, "label", 9);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "textarea", 10);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Template_textarea_ngModelChange_14_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.description, $event) || (ctx.shiftForm.description = $event);
      return $event;
    }, "ShiftsComponent_Template_textarea_ngModelChange_14_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 6)(16, "label", 7);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "app-searchable-select", 11);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Template_app_searchable_select_ngModelChange_18_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.status, $event) || (ctx.shiftForm.status = $event);
      return $event;
    }, "ShiftsComponent_Template_app_searchable_select_ngModelChange_18_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 6)(20, "label", 7);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 12)(23, "div", 13)(24, "div", 14)(25, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.shiftType, $event) || (ctx.shiftForm.shiftType = $event);
      return $event;
    }, "ShiftsComponent_Template_input_ngModelChange_25_listener"));
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function ShiftsComponent_Template_input_change_25_listener() {
      return ctx.onShiftTypeChange();
    }, "ShiftsComponent_Template_input_change_25_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "label", 16);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "small", 17);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 13)(31, "div", 14)(32, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.shiftType, $event) || (ctx.shiftForm.shiftType = $event);
      return $event;
    }, "ShiftsComponent_Template_input_ngModelChange_32_listener"));
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function ShiftsComponent_Template_input_change_32_listener() {
      return ctx.onShiftTypeChange();
    }, "ShiftsComponent_Template_input_change_32_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "label", 16);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "small", 17);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(37, ShiftsComponent_Conditional_37_Template, 7, 3, "div", 6);
    \u0275\u0275conditionalCreate(38, ShiftsComponent_Conditional_38_Template, 28, 12, "div");
    \u0275\u0275elementStart(39, "div", 18)(40, "div", 13)(41, "div", 14)(42, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.isCheckInRequired, $event) || (ctx.shiftForm.isCheckInRequired = $event);
      return $event;
    }, "ShiftsComponent_Template_input_ngModelChange_42_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "label", 16);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "small", 17);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div", 13)(48, "div", 14)(49, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function ShiftsComponent_Template_input_ngModelChange_49_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.shiftForm.isAutoCheckOut, $event) || (ctx.shiftForm.isAutoCheckOut = $event);
      return $event;
    }, "ShiftsComponent_Template_input_ngModelChange_49_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "label", 16);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "small", 17);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(54, "div", 21)(55, "button", 22);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ShiftsComponent_Template_button_click_55_listener() {
      return ctx.onCloseModal();
    }, "ShiftsComponent_Template_button_click_55_listener"));
    \u0275\u0275text(56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "button", 23);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ShiftsComponent_Template_button_click_57_listener() {
      return ctx.showCreateModal() ? ctx.onSubmitCreate() : ctx.onSubmitEdit();
    }, "ShiftsComponent_Template_button_click_57_listener"));
    \u0275\u0275conditionalCreate(58, ShiftsComponent_Conditional_58_Template, 1, 0, "span", 24);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(60, "app-modal-wrapper", 25);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function ShiftsComponent_Template_app_modal_wrapper_close_60_listener() {
      return ctx.onCloseModal();
    }, "ShiftsComponent_Template_app_modal_wrapper_close_60_listener"));
    \u0275\u0275elementStart(61, "div", 5)(62, "p");
    \u0275\u0275text(63);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(64, ShiftsComponent_Conditional_64_Template, 3, 1, "p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 21)(66, "button", 22);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ShiftsComponent_Template_button_click_66_listener() {
      return ctx.onCloseModal();
    }, "ShiftsComponent_Template_button_click_66_listener"));
    \u0275\u0275text(67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "button", 26);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ShiftsComponent_Template_button_click_68_listener() {
      return ctx.onConfirmDelete();
    }, "ShiftsComponent_Template_button_click_68_listener"));
    \u0275\u0275conditionalCreate(69, ShiftsComponent_Conditional_69_Template, 1, 0, "span", 24);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(71, "app-modal-wrapper", 25);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function ShiftsComponent_Template_app_modal_wrapper_close_71_listener() {
      return ctx.onCloseModal();
    }, "ShiftsComponent_Template_app_modal_wrapper_close_71_listener"));
    \u0275\u0275elementStart(72, "div", 5)(73, "p");
    \u0275\u0275text(74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "p")(76, "strong");
    \u0275\u0275text(77);
    \u0275\u0275elementEnd();
    \u0275\u0275text(78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "p")(80, "strong");
    \u0275\u0275text(81);
    \u0275\u0275elementEnd();
    \u0275\u0275text(82);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "div", 21)(84, "button", 22);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ShiftsComponent_Template_button_click_84_listener() {
      return ctx.onCloseModal();
    }, "ShiftsComponent_Template_button_click_84_listener"));
    \u0275\u0275text(85);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "button", 27);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ShiftsComponent_Template_button_click_86_listener() {
      return ctx.onConfirmSetDefaultShift();
    }, "ShiftsComponent_Template_button_click_86_listener"));
    \u0275\u0275conditionalCreate(87, ShiftsComponent_Conditional_87_Template, 1, 0, "span", 24);
    \u0275\u0275text(88);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_66_0;
    let tmp_68_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("shifts.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx.tableData() || \u0275\u0275pureFunction0(73, _c0))("columns", ctx.tableColumns())("actions", ctx.tableActions())("currentPage", ctx.currentPage)("totalPages", ctx.totalPages)("totalItems", ctx.totalCount)("pageSize", ctx.pageSize)("loading", ctx.loading)("emptyTitle", ctx.t("shifts.noShifts"))("emptyMessage", ctx.t("shifts.noShiftsDescription"))("responsiveMode", "auto");
    \u0275\u0275advance();
    \u0275\u0275property("show", ctx.showCreateModal() || ctx.showEditModal())("title", ctx.showCreateModal() ? ctx.t("shifts.actions.create") : ctx.t("shifts.actions.edit"))("size", "lg")("centered", true)("loading", ctx.submitting());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.t("shifts.fields.name"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("shifts.fields.description"));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("shifts.fields.status"));
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx.statusSelectOptions);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.status);
    \u0275\u0275property("placeholder", ctx.t("common.select"))("required", true)("searchable", true)("clearable", false);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("shifts.fields.type"));
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx.ShiftType.TimeBased);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.shiftType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("shifts.types.timeBased"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.types.timeBasedDescription"));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx.ShiftType.HoursOnly);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.shiftType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("shifts.types.hoursOnly"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.types.hoursOnlyDescription"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.shiftForm.shiftType === ctx.ShiftType.HoursOnly ? 37 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.shiftForm.shiftType === ctx.ShiftType.TimeBased ? 38 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.isCheckInRequired);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("shifts.fields.checkInRequired"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.checkInRequiredDescription"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.shiftForm.isAutoCheckOut);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("shifts.fields.autoCheckOut"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("shifts.autoCheckOutDescription"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx.isFormValid() || ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.submitting() ? 58 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.showCreateModal() ? ctx.t("common.create") : ctx.t("common.update"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("show", ctx.showDeleteModal())("title", ctx.t("shifts.actions.delete"))("centered", true)("loading", ctx.submitting());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("shifts.deleteConfirmation"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.selectedShift() ? 64 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.submitting() ? 69 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.t("common.delete"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("show", ctx.showDefaultShiftModal())("title", ctx.t("shifts.defaultShift.confirmReplace"))("centered", true)("loading", ctx.submitting());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("shifts.defaultShift.confirmReplaceMessage"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("shifts.defaultShift.newShift"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_66_0 = ctx.selectedShift()) == null ? null : tmp_66_0.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx.t("shifts.defaultShift.currentShift"), ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_68_0 = ctx.defaultShift()) == null ? null : tmp_68_0.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("shifts.defaultShift.cancelButton"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.submitting() ? 87 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.t("shifts.defaultShift.confirmButton"), " ");
  }
}, "ShiftsComponent_Template"), dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, MaxValidator, NgModel, NgForm, SearchableSelectComponent, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent, ModalWrapperComponent], styles: ['\n\n.required[_ngcontent-%COMP%]::after {\n  content: " *";\n  color: #dc3545;\n}\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-top: none;\n  font-weight: 600;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.form-text.text-muted[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.pagination[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  margin: 0 0.125rem;\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.table-responsive[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n}\n@media (max-width: 768px) {\n  .btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    padding: 0.2rem 0.4rem;\n    font-size: 0.75rem;\n  }\n  .table-responsive[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n}\n/*# sourceMappingURL=shifts.component.css.map */'] }));
var ShiftsComponent = _ShiftsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShiftsComponent, [{
    type: Component,
    args: [{ selector: "app-shifts", standalone: true, imports: [FormsModule, HasPermissionDirective, SearchableSelectComponent, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent, StatusBadgeComponent, ModalWrapperComponent], template: `<div class="app-list-page">
  <!-- Page Header -->
  <app-page-header [title]="t('shifts.title')">
  </app-page-header>

  <!-- Standardized Filters Component -->
  <app-unified-filter moduleName="shifts" [refreshing]="loading()" (searchChange)="onSearchChange($event)"
    (filtersChange)="onFiltersChange($event)" (add)="onCreateShift()" (refresh)="onRefreshData()">
  </app-unified-filter>

  <!-- Shifts Table -->

  <app-data-table [data]="tableData() || []" [columns]="tableColumns()" [actions]="tableActions()"
    [currentPage]="currentPage" [totalPages]="totalPages" [totalItems]="totalCount" [pageSize]="pageSize"
    [loading]="loading" [emptyTitle]="t('shifts.noShifts')" [emptyMessage]="t('shifts.noShiftsDescription')"
    [responsiveMode]="'auto'" (actionClick)="onActionClick($event)" (pageChange)="onTablePageChange($event)"
    (pageSizeChange)="onTablePageSizeChange($event)">
  </app-data-table>

</div>

<!-- Create/Edit Modal -->
<app-modal-wrapper [show]="showCreateModal() || showEditModal()"
  [title]="showCreateModal() ? t('shifts.actions.create') : t('shifts.actions.edit')" [size]="'lg'" [centered]="true"
  [loading]="submitting()" (close)="onCloseModal()">

  <div class="modal-body">
    <form>
      <!-- Basic Information -->
      <div class="mb-3">
        <label class="form-label required">{{ t('shifts.fields.name') }}</label>
        <input type="text" class="form-control" [(ngModel)]="shiftForm.name" name="name" required>
      </div>

      <div class="mb-3">
        <label class="form-label">{{ t('shifts.fields.description') }}</label>
        <textarea class="form-control" rows="2" [(ngModel)]="shiftForm.description" name="description"></textarea>
      </div>

      <!-- Status -->
      <div class="mb-3">
        <label class="form-label required">{{ t('shifts.fields.status') }}</label>
        <app-searchable-select [options]="statusSelectOptions" [(ngModel)]="shiftForm.status" name="status"
          [placeholder]="t('common.select')" [required]="true" [searchable]="true"
          [clearable]="false"></app-searchable-select>
      </div>

      <!-- Shift Type -->
      <div class="mb-3">
        <label class="form-label required">{{ t('shifts.fields.type') }}</label>
        <div class="row">
          <div class="col-md-6">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="shiftType" [value]="ShiftType.TimeBased"
                [(ngModel)]="shiftForm.shiftType" (change)="onShiftTypeChange()">
              <label class="form-check-label">
                {{ t('shifts.types.timeBased') }}
              </label>
              <small class="form-text text-muted d-block">{{ t('shifts.types.timeBasedDescription') }}</small>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="shiftType" [value]="ShiftType.HoursOnly"
                [(ngModel)]="shiftForm.shiftType" (change)="onShiftTypeChange()">
              <label class="form-check-label">
                {{ t('shifts.types.hoursOnly') }}
              </label>
              <small class="form-text text-muted d-block">{{ t('shifts.types.hoursOnlyDescription') }}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Hours Only Configuration -->
      @if (shiftForm.shiftType === ShiftType.HoursOnly) {
      <div class="mb-3">
        <label class="form-label required">{{ t('shifts.fields.requiredHours') }}</label>
        <div class="input-group">
          <input type="number" class="form-control" [(ngModel)]="shiftForm.requiredHours" name="requiredHours" min="0.5"
            max="24" step="0.5">
          <span class="input-group-text">{{ t('shifts.hours') }}</span>
        </div>
      </div>
      }

      <!-- Time-Based Configuration -->
      @if (shiftForm.shiftType === ShiftType.TimeBased) {
      <div>
        <!-- Shift Periods -->
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <label class="form-label required">{{ t('shifts.fields.periods') }}</label>
            <button type="button" class="btn btn-sm btn-outline-primary" (click)="addShiftPeriod()"
              [disabled]="shiftForm.shiftPeriods.length >= 2">
              <i class="fas fa-plus me-1"></i>{{ t('shifts.addPeriod') }}
            </button>
          </div>

          @for (period of shiftForm.shiftPeriods; track i; let i = $index) {
          <div class="card mb-2">
            <div class="card-body p-3">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0">{{ t('shifts.period') }} {{ period.periodOrder }}</h6>
                <button type="button" class="btn btn-sm btn-outline-danger" (click)="removeShiftPeriod(i)"
                  [disabled]="shiftForm.shiftPeriods.length <= 1">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label class="form-label">{{ t('shifts.fields.startTime') }}</label>
                  <input type="time" class="form-control" [(ngModel)]="period.startTime" [name]="'startTime' + i"
                    required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">{{ t('shifts.fields.endTime') }}</label>
                  <input type="time" class="form-control" [(ngModel)]="period.endTime" [name]="'endTime' + i" required>
                </div>
              </div>
            </div>
          </div>
          }
        </div>

        <!-- Flexible Hours -->
        <div class="mb-3">
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" [(ngModel)]="shiftForm.allowFlexibleHours"
              name="allowFlexibleHours" (change)="onFlexibleHoursChange()">
            <label class="form-check-label">
              {{ t('shifts.fields.allowFlexibleHours') }}
            </label>
            <small class="form-text text-muted d-block">{{ t('shifts.flexibleHoursDescription') }}</small>
          </div>

          @if (shiftForm.allowFlexibleHours) {
          <div class="row">
            <div class="col-md-6">
              <label class="form-label">{{ t('shifts.fields.flexMinutesBefore') }}</label>
              <div class="input-group">
                <input type="number" class="form-control" [(ngModel)]="shiftForm.flexMinutesBefore"
                  name="flexMinutesBefore" min="1" max="480">
                <span class="input-group-text">{{ t('common.minutes') }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ t('shifts.fields.flexMinutesAfter') }}</label>
              <div class="input-group">
                <input type="number" class="form-control" [(ngModel)]="shiftForm.flexMinutesAfter"
                  name="flexMinutesAfter" min="1" max="480">
                <span class="input-group-text">{{ t('common.minutes') }}</span>
              </div>
            </div>
          </div>
          }
        </div>

        <!-- Grace Period -->
        <div class="mb-3">
          <label class="form-label">{{ t('shifts.fields.gracePeriod') }}</label>
          <div class="input-group">
            <input type="number" class="form-control" [(ngModel)]="shiftForm.gracePeriodMinutes"
              name="gracePeriodMinutes" min="1" max="120">
            <span class="input-group-text">{{ t('common.minutes') }}</span>
          </div>
          <small class="form-text text-muted">{{ t('shifts.gracePeriodDescription') }}</small>
          @if (shiftForm.allowFlexibleHours && shiftForm.gracePeriodMinutes) {
          <small class="form-text text-info d-block">
            <i class="fas fa-info-circle me-1"></i>{{ t('shifts.validation.flexibleHoursAndGraceCombined') }}
          </small>
          }
        </div>
      </div>
      }

      <!-- Check-in/Check-out Options -->
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" [(ngModel)]="shiftForm.isCheckInRequired"
              name="isCheckInRequired">
            <label class="form-check-label">
              {{ t('shifts.fields.checkInRequired') }}
            </label>
            <small class="form-text text-muted d-block">{{ t('shifts.checkInRequiredDescription') }}</small>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" [(ngModel)]="shiftForm.isAutoCheckOut"
              name="isAutoCheckOut">
            <label class="form-check-label">
              {{ t('shifts.fields.autoCheckOut') }}
            </label>
            <small class="form-text text-muted d-block">{{ t('shifts.autoCheckOutDescription') }}</small>
          </div>
        </div>
      </div>
    </form>
  </div>

  <div modal-footer class="d-flex gap-2 justify-content-end">
    <button type="button" class="btn btn-secondary" (click)="onCloseModal()">
      {{ t('common.cancel') }}
    </button>
    <button type="button" class="btn btn-primary" (click)="showCreateModal() ? onSubmitCreate() : onSubmitEdit()"
      [disabled]="!isFormValid() || submitting()">
      @if (submitting()) {
      <span class="spinner-border spinner-border-sm me-2"></span>
      }
      {{ showCreateModal() ? t('common.create') : t('common.update') }}
    </button>
  </div>

</app-modal-wrapper>

<!-- Delete Confirmation Modal -->
<app-modal-wrapper [show]="showDeleteModal()" [title]="t('shifts.actions.delete')" [centered]="true"
  [loading]="submitting()" (close)="onCloseModal()">

  <div class="modal-body">
    <p>{{ t('shifts.deleteConfirmation') }}</p>
    @if (selectedShift()) {
    <p><strong>{{ selectedShift()?.name }}</strong></p>
    }
  </div>

  <div modal-footer class="d-flex gap-2 justify-content-end">
    <button type="button" class="btn btn-secondary" (click)="onCloseModal()">
      {{ t('common.cancel') }}
    </button>
    <button type="button" class="btn btn-danger" (click)="onConfirmDelete()" [disabled]="submitting()">
      @if (submitting()) {
      <span class="spinner-border spinner-border-sm me-2"></span>
      }
      {{ t('common.delete') }}
    </button>
  </div>

</app-modal-wrapper>

<!-- Default Shift Confirmation Modal -->
<app-modal-wrapper [show]="showDefaultShiftModal()" [title]="t('shifts.defaultShift.confirmReplace')" [centered]="true"
  [loading]="submitting()" (close)="onCloseModal()">

  <div class="modal-body">
    <p>{{ t('shifts.defaultShift.confirmReplaceMessage') }}</p>
    <p><strong>{{ t('shifts.defaultShift.newShift') }}:</strong> {{ selectedShift()?.name }}</p>
    <p><strong>{{ t('shifts.defaultShift.currentShift') }}:</strong> {{ defaultShift()?.name }}</p>
  </div>

  <div modal-footer class="d-flex gap-2 justify-content-end">
    <button type="button" class="btn btn-secondary" (click)="onCloseModal()">
      {{ t('shifts.defaultShift.cancelButton') }}
    </button>
    <button type="button" class="btn btn-success" (click)="onConfirmSetDefaultShift()" [disabled]="submitting()">
      @if (submitting()) {
      <span class="spinner-border spinner-border-sm me-2"></span>
      }
      {{ t('shifts.defaultShift.confirmButton') }}
    </button>
  </div>

</app-modal-wrapper>`, styles: ['/* src/app/pages/shifts/shifts.component.css */\n.required::after {\n  content: " *";\n  color: #dc3545;\n}\n.table th {\n  background-color: #f8f9fa;\n  border-top: none;\n  font-weight: 600;\n}\n.badge {\n  font-size: 0.75rem;\n}\n.btn-group-sm .btn {\n  padding: 0.25rem 0.5rem;\n}\n.modal-backdrop {\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.form-text.text-muted {\n  font-size: 0.8rem;\n}\n.card .card-body {\n  padding: 1rem;\n}\n.pagination .page-link {\n  border-radius: 0.375rem;\n  margin: 0 0.125rem;\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.table-responsive {\n  border-radius: 0.375rem;\n}\n@media (max-width: 768px) {\n  .btn-group-sm .btn {\n    padding: 0.2rem 0.4rem;\n    font-size: 0.75rem;\n  }\n  .table-responsive {\n    font-size: 0.9rem;\n  }\n}\n/*# sourceMappingURL=shifts.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShiftsComponent, { className: "ShiftsComponent", filePath: "src/app/pages/shifts/shifts.component.ts", lineNumber: 36 });
})();
export {
  ShiftsComponent
};
//# sourceMappingURL=chunk-TQP6X2AZ.js.map
