import {
  SectionCardComponent
} from "./chunk-HMI65T4K.js";
import {
  PublicHolidaysService
} from "./chunk-SBZVYMGF.js";
import {
  DefinitionListComponent
} from "./chunk-YAIJIRYX.js";
import {
  FormHeaderComponent
} from "./chunk-U5KRTQNT.js";
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
  Router,
  RouterLink,
  RouterModule
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
} from "./chunk-DUNHAUAW.js";
import {
  __async,
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/settings/public-holidays/view-public-holiday/view-public-holiday.component.ts
var _c0 = /* @__PURE__ */ __name(() => ["/settings/public-holidays"], "_c0");
function ViewPublicHolidayComponent_Conditional_2_Template(rf, ctx) {
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
__name(ViewPublicHolidayComponent_Conditional_2_Template, "ViewPublicHolidayComponent_Conditional_2_Template");
function ViewPublicHolidayComponent_Conditional_3_Template(rf, ctx) {
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
__name(ViewPublicHolidayComponent_Conditional_3_Template, "ViewPublicHolidayComponent_Conditional_3_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-section-card", 11);
    \u0275\u0275element(1, "app-definition-list", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("settings.holidays.additionalSettings"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r0.additionalInfoItems())("labelWidth", "4")("valueWidth", "8");
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_6_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_6_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 30);
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Conditional_1_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Conditional_1_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 31);
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Conditional_2_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Conditional_2_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteHoliday());
    }, "ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Conditional_1_Template, 1, 0, "span", 30)(2, ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Conditional_2_Template, 1, 0, "i", 31);
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
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-section-card", 14)(1, "div", 27);
    \u0275\u0275conditionalCreate(2, ViewPublicHolidayComponent_Conditional_4_Conditional_10_Conditional_2_Template, 4, 3, "button", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("common.actions"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.canDelete() ? 2 : -1);
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_10_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_10_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275element(1, "i", 6);
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("settings.holidays.conflicts_detected"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("settings.holidays.conflicts_description"), " ");
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_11_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_11_Template");
function ViewPublicHolidayComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 7)(2, "app-section-card", 8);
    \u0275\u0275element(3, "app-definition-list", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "app-section-card", 10);
    \u0275\u0275element(5, "app-definition-list", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, ViewPublicHolidayComponent_Conditional_4_Conditional_6_Template, 2, 4, "app-section-card", 11);
    \u0275\u0275elementStart(7, "app-section-card", 12);
    \u0275\u0275element(8, "app-definition-list", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 13);
    \u0275\u0275conditionalCreate(10, ViewPublicHolidayComponent_Conditional_4_Conditional_10_Template, 3, 2, "app-section-card", 14);
    \u0275\u0275conditionalCreate(11, ViewPublicHolidayComponent_Conditional_4_Conditional_11_Template, 6, 2, "div", 15);
    \u0275\u0275elementStart(12, "app-section-card", 16)(13, "div", 17)(14, "div", 18)(15, "div", 19);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 20);
    \u0275\u0275element(18, "app-status-badge", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 18)(20, "div", 19);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 20);
    \u0275\u0275element(23, "app-status-badge", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 18)(25, "div", 19);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 22);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 18)(30, "div", 19);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 20);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(34, "app-section-card", 23)(35, "div", 24)(36, "a", 25);
    \u0275\u0275element(37, "i", 26);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    let tmp_24_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("settings.holidays.basicInformation"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r0.basicInfoItems())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("settings.holidays.dateConfiguration"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r0.dateInfoItems())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.additionalInfoItems().length > 0 ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("common.audit_information"));
    \u0275\u0275advance();
    \u0275\u0275property("items", ctx_r0.auditItems())("labelWidth", "3")("valueWidth", "9");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasActiveActions() ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_15_0 = ctx_r0.holiday()) == null ? null : tmp_15_0.hasConflicts) ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("settings.holidays.summary"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.status"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.statusBadge().label)("variant", ctx_r0.statusBadge().variant);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.scope"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.scopeBadge().label)("variant", ctx_r0.scopeBadge().variant);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.priority"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_24_0 = ctx_r0.holiday()) == null ? null : tmp_24_0.priority);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.holidayType"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getHolidayTypeLabel(ctx_r0.holiday().holidayType));
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("common.navigation"));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(29, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("settings.holidays.title"), " ");
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Template, "ViewPublicHolidayComponent_Conditional_4_Template");
var _ViewPublicHolidayComponent = class _ViewPublicHolidayComponent {
  i18n = inject(I18nService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  publicHolidaysService = inject(PublicHolidaysService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  permissionService = inject(PermissionService);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  processing = signal(false, ...ngDevMode ? [{ debugName: "processing" }] : []);
  holiday = signal(null, ...ngDevMode ? [{ debugName: "holiday" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  // Computed properties for reactive data
  basicInfoItems = computed(() => {
    const holiday = this.holiday();
    if (!holiday)
      return [];
    return [
      {
        label: this.i18n.t("fields.name"),
        value: holiday.name
      },
      {
        label: this.i18n.t("fields.nameAr"),
        value: holiday.nameAr || this.i18n.t("common.not_specified")
      },
      {
        label: this.i18n.t("fields.holidayType"),
        value: this.getHolidayTypeLabel(holiday.holidayType)
      },
      {
        label: this.i18n.t("fields.scope"),
        value: holiday.isNational ? this.i18n.t("settings.holidays.national") : holiday.branchId ? holiday.branchName || `Branch ${holiday.branchId}` : this.i18n.t("common.company_wide")
      }
    ];
  }, ...ngDevMode ? [{ debugName: "basicInfoItems" }] : []);
  dateInfoItems = computed(() => {
    const holiday = this.holiday();
    if (!holiday)
      return [];
    const items = [
      {
        label: this.i18n.t("settings.holidays.pattern_description"),
        value: holiday.patternDescription
      }
    ];
    if (holiday.nextOccurrence) {
      items.push({
        label: this.i18n.t("settings.holidays.nextOccurrence"),
        value: this.formatDate(holiday.nextOccurrence)
      });
    }
    if (holiday.effectiveFromYear || holiday.effectiveToYear) {
      let effectivePeriod = "";
      if (holiday.effectiveFromYear && holiday.effectiveToYear) {
        effectivePeriod = `${holiday.effectiveFromYear} - ${holiday.effectiveToYear}`;
      } else if (holiday.effectiveFromYear) {
        effectivePeriod = `${this.i18n.t("common.from")} ${holiday.effectiveFromYear}`;
      } else if (holiday.effectiveToYear) {
        effectivePeriod = `${this.i18n.t("settings.holidays.until")} ${holiday.effectiveToYear}`;
      }
      if (effectivePeriod) {
        items.push({
          label: this.i18n.t("settings.holidays.effective_period"),
          value: effectivePeriod
        });
      }
    }
    items.push({
      label: this.i18n.t("fields.priority"),
      value: holiday.priority.toString()
    });
    if (holiday.hasConflicts) {
      items.push({
        label: this.i18n.t("settings.holidays.conflicts"),
        value: this.i18n.t("common.yes")
      });
    }
    return items;
  }, ...ngDevMode ? [{ debugName: "dateInfoItems" }] : []);
  additionalInfoItems = computed(() => {
    const holiday = this.holiday();
    if (!holiday)
      return [];
    const items = [];
    if (holiday.description) {
      items.push({
        label: this.i18n.t("fields.description"),
        value: holiday.description
      });
    }
    if (holiday.countryCode) {
      items.push({
        label: this.i18n.t("fields.countryCode"),
        value: holiday.countryCode.toUpperCase()
      });
    }
    return items;
  }, ...ngDevMode ? [{ debugName: "additionalInfoItems" }] : []);
  auditItems = computed(() => {
    const holiday = this.holiday();
    if (!holiday)
      return [];
    const items = [
      {
        label: this.i18n.t("fields.createdAt"),
        value: this.formatDateTime(holiday.createdAt)
      }
    ];
    if (holiday.updatedAt) {
      items.push({
        label: this.i18n.t("fields.updatedAt"),
        value: this.formatDateTime(holiday.updatedAt)
      });
    }
    return items;
  }, ...ngDevMode ? [{ debugName: "auditItems" }] : []);
  // Status badge computed properties
  statusBadge = computed(() => ({
    label: this.holiday()?.isActive ? this.i18n.t("common.active") : this.i18n.t("common.inactive"),
    variant: this.holiday()?.isActive ? "success" : "secondary"
  }), ...ngDevMode ? [{ debugName: "statusBadge" }] : []);
  scopeBadge = computed(() => {
    const holiday = this.holiday();
    if (!holiday)
      return { label: "", variant: "secondary" };
    return {
      label: holiday.isNational ? this.i18n.t("settings.holidays.national") : holiday.branchId ? holiday.branchName || `Branch ${holiday.branchId}` : this.i18n.t("common.company_wide"),
      variant: holiday.isNational ? "primary" : "info"
    };
  }, ...ngDevMode ? [{ debugName: "scopeBadge" }] : []);
  ngOnInit() {
    this.loadHolidayDetails();
  }
  loadHolidayDetails() {
    const holidayId = this.route.snapshot.paramMap.get("id");
    if (!holidayId) {
      this.router.navigate(["/settings/public-holidays"]);
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.publicHolidaysService.getPublicHolidayById(+holidayId, true).subscribe({
      next: /* @__PURE__ */ __name((holiday) => {
        this.holiday.set(holiday);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load holiday details:", error);
        this.error.set(this.i18n.t("common.errors.load_failed"));
        this.loading.set(false);
      }, "error")
    });
  }
  deleteHoliday() {
    return __async(this, null, function* () {
      if (!this.holiday())
        return;
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("settings.holidays.deleteHoliday"),
        message: this.i18n.t("settings.holidays.deleteHolidayConfirmation"),
        confirmText: this.i18n.t("common.delete"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.processing.set(true);
        this.publicHolidaysService.deletePublicHoliday(this.holiday().id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("settings.holidays.holidayDeletedSuccessfully"));
            this.router.navigate(["/settings/public-holidays"]);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete holiday:", error);
            this.notificationService.error(this.i18n.t("common.errors.delete_failed"));
            this.processing.set(false);
          }, "error")
        });
      }
    });
  }
  // Helper methods
  getHolidayTypeLabel(holidayType) {
    const types = this.publicHolidaysService.getHolidayTypes();
    const type = types.find((t) => t.value === holidayType);
    return type ? type.label : holidayType.toString();
  }
  formatDate(date) {
    if (!date)
      return "";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(dateObj);
  }
  formatDateTime(dateTime) {
    if (!dateTime)
      return "";
    const dateObj = typeof dateTime === "string" ? new Date(dateTime) : dateTime;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(dateObj);
  }
  // Permission checks
  canEdit() {
    return this.permissionService.has(`public-holiday.${PermissionActions.UPDATE}`);
  }
  canDelete() {
    return this.permissionService.has(`public-holiday.${PermissionActions.DELETE}`);
  }
  hasActiveActions() {
    return this.canEdit() || this.canDelete();
  }
  getHolidayName() {
    return this.holiday()?.name || "";
  }
};
__name(_ViewPublicHolidayComponent, "ViewPublicHolidayComponent");
__publicField(_ViewPublicHolidayComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewPublicHolidayComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewPublicHolidayComponent)();
}, "ViewPublicHolidayComponent_Factory"));
__publicField(_ViewPublicHolidayComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewPublicHolidayComponent, selectors: [["app-view-public-holiday"]], decls: 5, vars: 6, consts: [[1, "app-view-page"], ["mode", "view", "moduleName", "settings", "moduleRoute", "settings/public-holidays", 3, "title", "entityId", "loading"], [1, "text-center", "py-5"], ["role", "alert", 1, "alert", "alert-danger"], [1, "app-desktop-sidebar"], [3, "message", "variant", "centered"], [1, "fas", "fa-exclamation-triangle", "me-2"], [1, "app-main-content"], ["icon", "fas fa-info-circle", "headerClass", "bg-light", 1, "mb-4", 3, "title"], [3, "items", "labelWidth", "valueWidth"], ["icon", "fas fa-calendar-alt", "headerClass", "bg-light", 1, "mb-4", 3, "title"], ["icon", "fas fa-list-ul", "headerClass", "bg-light", 1, "mb-4", 3, "title"], ["icon", "fas fa-history", "headerClass", "bg-light", 1, "mb-4", 3, "title"], [1, "app-sidebar-content"], ["icon", "fas fa-cogs", "headerClass", "bg-light", 1, "mb-3", 3, "title"], ["role", "alert", 1, "alert", "alert-warning"], ["icon", "fas fa-calendar-check", "headerClass", "bg-light", 1, "mb-3", 3, "title"], [1, "config-summary"], [1, "summary-item"], [1, "summary-label"], [1, "summary-value"], [3, "status", "variant"], [1, "summary-value", "rate-value"], ["icon", "fas fa-arrow-left", "headerClass", "bg-light", "bodyClass", "p-0", 3, "title"], [1, "list-group", "list-group-flush"], [1, "list-group-item", "list-group-item-action", 3, "routerLink"], [1, "fas", "fa-list", "me-2"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-trash", "me-2"], [1, "mb-0", "mt-2", "small"]], template: /* @__PURE__ */ __name(function ViewPublicHolidayComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ViewPublicHolidayComponent_Conditional_2_Template, 2, 3, "div", 2);
    \u0275\u0275conditionalCreate(3, ViewPublicHolidayComponent_Conditional_3_Template, 3, 1, "div", 3);
    \u0275\u0275conditionalCreate(4, ViewPublicHolidayComponent_Conditional_4_Template, 39, 30, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("settings.holidays.view_details"))("entityId", (tmp_1_0 = ctx.holiday()) == null ? null : tmp_1_0.id)("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.holiday() && !ctx.loading() ? 4 : -1);
  }
}, "ViewPublicHolidayComponent_Template"), dependencies: [
  RouterModule,
  RouterLink,
  LoadingSpinnerComponent,
  SectionCardComponent,
  DefinitionListComponent,
  StatusBadgeComponent,
  FormHeaderComponent
], styles: ["\n\n.config-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--bs-border-color);\n}\n.summary-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.summary-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  font-size: 0.875rem;\n}\n.summary-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-gray-900);\n}\n.rate-value[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--bs-primary);\n}\n.holiday-pattern[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      45deg,\n      var(--bs-primary-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin: 1rem 0;\n}\n.pattern-description[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 500;\n  color: var(--bs-primary);\n  margin-bottom: 0.5rem;\n}\n.next-occurrence[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--bs-secondary);\n}\n.conflict-indicator[_ngcontent-%COMP%] {\n  background-color: var(--bs-warning-bg-subtle);\n  border-left: 4px solid var(--bs-warning);\n  padding: 0.75rem;\n  border-radius: 0.25rem;\n}\n.holiday-type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.75rem;\n  background-color: var(--bs-primary-bg-subtle);\n  border: 1px solid var(--bs-primary-border-subtle);\n  border-radius: 0.5rem;\n  color: var(--bs-primary-text-emphasis);\n  font-weight: 500;\n}\n.scope-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem 0.5rem;\n  background-color: var(--bs-info-bg-subtle);\n  border-radius: 0.25rem;\n  font-size: 0.875rem;\n  color: var(--bs-info-text-emphasis);\n}\n.scope-indicator.national[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary-bg-subtle);\n  color: var(--bs-primary-text-emphasis);\n}\n.scope-indicator.branch[_ngcontent-%COMP%] {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n}\n.status-info-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-success-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border: 1px solid var(--bs-success-border-subtle);\n}\n.status-info-card.inactive[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-secondary-bg-subtle) 0%,\n      var(--bs-light) 100%);\n  border: 1px solid var(--bs-secondary-border-subtle);\n}\n.loading-container[_ngcontent-%COMP%] {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n.priority-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  background-color: var(--bs-primary);\n  color: white;\n  border-radius: 50%;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .app-sidebar-content[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n  .actions-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .d-grid.gap-2[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .info-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    text-align: left;\n  }\n  .info-label[_ngcontent-%COMP%] {\n    min-width: auto;\n    margin-bottom: 0.25rem;\n  }\n  .info-value[_ngcontent-%COMP%] {\n    text-align: left;\n  }\n  .holiday-pattern[_ngcontent-%COMP%] {\n    margin: 0.5rem 0;\n    padding: 0.75rem;\n  }\n  .pattern-description[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .next-occurrence[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n  }\n}\n/*# sourceMappingURL=view-public-holiday.component.css.map */"] }));
var ViewPublicHolidayComponent = _ViewPublicHolidayComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewPublicHolidayComponent, [{
    type: Component,
    args: [{ selector: "app-view-public-holiday", standalone: true, imports: [
      RouterModule,
      LoadingSpinnerComponent,
      SectionCardComponent,
      DefinitionListComponent,
      StatusBadgeComponent,
      FormHeaderComponent
    ], template: `<div class="app-view-page">\r
  <!-- Standardized Page Header -->\r
  <app-form-header\r
    mode="view"\r
    [title]="i18n.t('settings.holidays.view_details')"\r
    moduleName="settings"\r
    moduleRoute="settings/public-holidays"\r
    [entityId]="holiday()?.id"\r
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
  <!-- Holiday Details -->\r
  @if (holiday() && !loading()) {\r
    <div class="app-desktop-sidebar">\r
      <!-- Main Content -->\r
      <div class="app-main-content">\r
        <!-- Basic Information Card -->\r
        <app-section-card\r
          [title]="i18n.t('settings.holidays.basicInformation')"\r
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
        <!-- Date & Pattern Information Card -->\r
        <app-section-card\r
          [title]="i18n.t('settings.holidays.dateConfiguration')"\r
          icon="fas fa-calendar-alt"\r
          headerClass="bg-light"\r
          class="mb-4">\r
          <app-definition-list\r
            [items]="dateInfoItems()"\r
            [labelWidth]="'4'"\r
            [valueWidth]="'8'">\r
          </app-definition-list>\r
        </app-section-card>\r
\r
        <!-- Additional Information Card -->\r
        @if (additionalInfoItems().length > 0) {\r
          <app-section-card\r
            [title]="i18n.t('settings.holidays.additionalSettings')"\r
            icon="fas fa-list-ul"\r
            headerClass="bg-light"\r
            class="mb-4">\r
            <app-definition-list\r
              [items]="additionalInfoItems()"\r
              [labelWidth]="'4'"\r
              [valueWidth]="'8'">\r
            </app-definition-list>\r
          </app-section-card>\r
        }\r
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
              <!-- Delete Action -->\r
              @if (canDelete()) {\r
                <button\r
                  type="button"\r
                  class="btn btn-outline-danger"\r
                  (click)="deleteHoliday()"\r
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
        <!-- Conflicts Warning -->\r
        @if (holiday()?.hasConflicts) {\r
          <div class="alert alert-warning" role="alert">\r
            <i class="fas fa-exclamation-triangle me-2"></i>\r
            <strong>{{ i18n.t('settings.holidays.conflicts_detected') }}</strong>\r
            <p class="mb-0 mt-2 small">\r
              {{ i18n.t('settings.holidays.conflicts_description') }}\r
            </p>\r
          </div>\r
        }\r
\r
        <!-- Holiday Summary Card -->\r
        <app-section-card\r
          [title]="i18n.t('settings.holidays.summary')"\r
          icon="fas fa-calendar-check"\r
          headerClass="bg-light"\r
          class="mb-3">\r
          <div class="config-summary">\r
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
            <!-- Scope -->\r
            <div class="summary-item">\r
              <div class="summary-label">{{ i18n.t('fields.scope') }}</div>\r
              <div class="summary-value">\r
                <app-status-badge\r
                  [status]="scopeBadge().label"\r
                  [variant]="scopeBadge().variant">\r
                </app-status-badge>\r
              </div>\r
            </div>\r
\r
            <!-- Priority -->\r
            <div class="summary-item">\r
              <div class="summary-label">{{ i18n.t('fields.priority') }}</div>\r
              <div class="summary-value rate-value">{{ holiday()?.priority }}</div>\r
            </div>\r
\r
            <!-- Holiday Type -->\r
            <div class="summary-item">\r
              <div class="summary-label">{{ i18n.t('fields.holidayType') }}</div>\r
              <div class="summary-value">{{ getHolidayTypeLabel(holiday()!.holidayType) }}</div>\r
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
            <a [routerLink]="['/settings/public-holidays']" class="list-group-item list-group-item-action">\r
              <i class="fas fa-list me-2"></i>\r
              {{ i18n.t('settings.holidays.title') }}\r
            </a>\r
          </div>\r
        </app-section-card>\r
      </div>\r
    </div>\r
  }\r
</div>`, styles: ["/* src/app/pages/settings/public-holidays/view-public-holiday/view-public-holiday.component.css */\n.config-summary {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.summary-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--bs-border-color);\n}\n.summary-item:last-child {\n  border-bottom: none;\n}\n.summary-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  font-size: 0.875rem;\n}\n.summary-value {\n  font-weight: 600;\n  color: var(--bs-gray-900);\n}\n.rate-value {\n  font-size: 1.1rem;\n  color: var(--bs-primary);\n}\n.holiday-pattern {\n  background:\n    linear-gradient(\n      45deg,\n      var(--bs-primary-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin: 1rem 0;\n}\n.pattern-description {\n  font-size: 1.1rem;\n  font-weight: 500;\n  color: var(--bs-primary);\n  margin-bottom: 0.5rem;\n}\n.next-occurrence {\n  font-size: 0.9rem;\n  color: var(--bs-secondary);\n}\n.conflict-indicator {\n  background-color: var(--bs-warning-bg-subtle);\n  border-left: 4px solid var(--bs-warning);\n  padding: 0.75rem;\n  border-radius: 0.25rem;\n}\n.holiday-type-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.75rem;\n  background-color: var(--bs-primary-bg-subtle);\n  border: 1px solid var(--bs-primary-border-subtle);\n  border-radius: 0.5rem;\n  color: var(--bs-primary-text-emphasis);\n  font-weight: 500;\n}\n.scope-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem 0.5rem;\n  background-color: var(--bs-info-bg-subtle);\n  border-radius: 0.25rem;\n  font-size: 0.875rem;\n  color: var(--bs-info-text-emphasis);\n}\n.scope-indicator.national {\n  background-color: var(--bs-primary-bg-subtle);\n  color: var(--bs-primary-text-emphasis);\n}\n.scope-indicator.branch {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n}\n.status-info-card {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-success-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border: 1px solid var(--bs-success-border-subtle);\n}\n.status-info-card.inactive {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-secondary-bg-subtle) 0%,\n      var(--bs-light) 100%);\n  border: 1px solid var(--bs-secondary-border-subtle);\n}\n.loading-container {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n.priority-indicator {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  background-color: var(--bs-primary);\n  color: white;\n  border-radius: 50%;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar {\n    flex-direction: column;\n  }\n  .app-sidebar-content {\n    margin-top: 1rem;\n  }\n  .actions-card {\n    position: static;\n  }\n  .d-grid.gap-2 {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .info-item {\n    flex-direction: column;\n    align-items: flex-start;\n    text-align: left;\n  }\n  .info-label {\n    min-width: auto;\n    margin-bottom: 0.25rem;\n  }\n  .info-value {\n    text-align: left;\n  }\n  .holiday-pattern {\n    margin: 0.5rem 0;\n    padding: 0.75rem;\n  }\n  .pattern-description {\n    font-size: 1rem;\n  }\n  .next-occurrence {\n    font-size: 0.85rem;\n  }\n}\n/*# sourceMappingURL=view-public-holiday.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewPublicHolidayComponent, { className: "ViewPublicHolidayComponent", filePath: "src/app/pages/settings/public-holidays/view-public-holiday/view-public-holiday.component.ts", lineNumber: 32 });
})();
export {
  ViewPublicHolidayComponent
};
//# sourceMappingURL=chunk-IMS7JQ3W.js.map
