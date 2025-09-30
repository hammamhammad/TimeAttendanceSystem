import {
  PublicHolidaysService
} from "./chunk-WH4F4K6L.js";
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
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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

// src/app/pages/settings/public-holidays/view-public-holiday/view-public-holiday.component.ts
function ViewPublicHolidayComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("public_holidays.loading_details"))("variant", "primary")("centered", true);
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
function ViewPublicHolidayComponent_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-detail-card", 10);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("public_holidays.additional_information"))("fields", ctx_r0.additionalInfoFields);
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_4_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_4_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 29);
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_1_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_1_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 30);
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_2_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_2_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteHoliday());
    }, "ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_1_Template, 1, 0, "span", 29)(2, ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Conditional_2_Template, 1, 0, "i", 30);
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
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 14)(2, "h6", 15);
    \u0275\u0275element(3, "i", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 17)(6, "div", 26);
    \u0275\u0275conditionalCreate(7, ViewPublicHolidayComponent_Conditional_4_Conditional_6_Conditional_7_Template, 4, 3, "button", 27);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.actions"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.canDelete() ? 7 : -1);
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_6_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_6_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "i", 6);
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("public_holidays.conflicts_detected"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.conflicts_description"), " ");
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_7_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_7_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.status_active_description"), " ");
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_18_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_18_Template");
function ViewPublicHolidayComponent_Conditional_4_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.status_inactive_description"), " ");
  }
}
__name(ViewPublicHolidayComponent_Conditional_4_Conditional_19_Template, "ViewPublicHolidayComponent_Conditional_4_Conditional_19_Template");
function ViewPublicHolidayComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 7);
    \u0275\u0275element(2, "app-detail-card", 8)(3, "app-detail-card", 9);
    \u0275\u0275conditionalCreate(4, ViewPublicHolidayComponent_Conditional_4_Conditional_4_Template, 1, 2, "app-detail-card", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 11);
    \u0275\u0275conditionalCreate(6, ViewPublicHolidayComponent_Conditional_4_Conditional_6_Template, 8, 2, "div", 12);
    \u0275\u0275conditionalCreate(7, ViewPublicHolidayComponent_Conditional_4_Conditional_7_Template, 6, 2, "div", 13);
    \u0275\u0275elementStart(8, "div", 12)(9, "div", 14)(10, "h6", 15);
    \u0275\u0275element(11, "i", 16);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 17)(14, "div", 18);
    \u0275\u0275element(15, "i", 19);
    \u0275\u0275elementStart(16, "span", 20);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, ViewPublicHolidayComponent_Conditional_4_Conditional_18_Template, 2, 1, "small", 21)(19, ViewPublicHolidayComponent_Conditional_4_Conditional_19_Template, 2, 1, "small", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 23)(21, "div", 14)(22, "h6", 15);
    \u0275\u0275element(23, "i", 24);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(25, "div", 17);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r0.i18n.t("public_holidays.basic_information"))("fields", ctx_r0.basicInfoFields);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("public_holidays.date_pattern_info"))("fields", ctx_r0.dateInfoFields);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.additionalInfoFields.length > 0 ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasActiveActions() ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_7_0 = ctx_r0.holiday()) == null ? null : tmp_7_0.hasConflicts) ? 7 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.status_info"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(((tmp_9_0 = ctx_r0.holiday()) == null ? null : tmp_9_0.isActive) ? "text-success" : "text-secondary");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ((tmp_10_0 = ctx_r0.holiday()) == null ? null : tmp_10_0.isActive) ? ctx_r0.i18n.t("common.active") : ctx_r0.i18n.t("common.inactive"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_11_0 = ctx_r0.holiday()) == null ? null : tmp_11_0.isActive) ? 18 : 19);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.navigation"), " ");
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
  get basicInfoFields() {
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
        label: this.i18n.t("fields.status"),
        value: holiday.isActive ? this.i18n.t("common.active") : this.i18n.t("common.inactive"),
        type: "badge",
        badgeVariant: holiday.isActive ? "success" : "secondary"
      },
      {
        label: this.i18n.t("fields.scope"),
        value: holiday.isNational ? this.i18n.t("public_holidays.national") : holiday.branchName || this.i18n.t("public_holidays.branch_specific"),
        type: "badge",
        badgeVariant: holiday.isNational ? "primary" : "info"
      }
    ];
  }
  get dateInfoFields() {
    const holiday = this.holiday();
    if (!holiday)
      return [];
    const fields = [
      {
        label: this.i18n.t("public_holidays.pattern_description"),
        value: holiday.patternDescription
      }
    ];
    if (holiday.nextOccurrence) {
      fields.push({
        label: this.i18n.t("public_holidays.next_occurrence"),
        value: holiday.nextOccurrence,
        type: "date"
      });
    }
    if (holiday.effectiveFromYear || holiday.effectiveToYear) {
      let effectivePeriod = "";
      if (holiday.effectiveFromYear && holiday.effectiveToYear) {
        effectivePeriod = `${holiday.effectiveFromYear} - ${holiday.effectiveToYear}`;
      } else if (holiday.effectiveFromYear) {
        effectivePeriod = `${this.i18n.t("public_holidays.from")} ${holiday.effectiveFromYear}`;
      } else if (holiday.effectiveToYear) {
        effectivePeriod = `${this.i18n.t("public_holidays.until")} ${holiday.effectiveToYear}`;
      }
      if (effectivePeriod) {
        fields.push({
          label: this.i18n.t("public_holidays.effective_period"),
          value: effectivePeriod
        });
      }
    }
    fields.push({
      label: this.i18n.t("fields.priority"),
      value: holiday.priority.toString()
    });
    if (holiday.hasConflicts) {
      fields.push({
        label: this.i18n.t("public_holidays.conflicts"),
        value: this.i18n.t("common.yes"),
        type: "badge",
        badgeVariant: "warning"
      });
    }
    return fields;
  }
  get additionalInfoFields() {
    const holiday = this.holiday();
    if (!holiday)
      return [];
    const fields = [];
    if (holiday.description) {
      fields.push({
        label: this.i18n.t("fields.description"),
        value: holiday.description
      });
    }
    if (holiday.countryCode) {
      fields.push({
        label: this.i18n.t("fields.countryCode"),
        value: holiday.countryCode.toUpperCase()
      });
    }
    fields.push({
      label: this.i18n.t("fields.createdAt"),
      value: holiday.createdAt,
      type: "datetime"
    });
    if (holiday.updatedAt) {
      fields.push({
        label: this.i18n.t("fields.updatedAt"),
        value: holiday.updatedAt,
        type: "datetime"
      });
    }
    return fields;
  }
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
        this.error.set(this.i18n.t("public_holidays.errors.load_failed"));
        this.loading.set(false);
      }, "error")
    });
  }
  deleteHoliday() {
    return __async(this, null, function* () {
      if (!this.holiday())
        return;
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("public_holidays.delete_holiday"),
        message: this.i18n.t("public_holidays.confirm_delete"),
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
            this.notificationService.success(this.i18n.t("public_holidays.success.deleted"));
            this.router.navigate(["/settings/public-holidays"]);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete holiday:", error);
            this.notificationService.error(this.i18n.t("public_holidays.errors.delete_failed"));
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
__publicField(_ViewPublicHolidayComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewPublicHolidayComponent, selectors: [["app-view-public-holiday"]], decls: 5, vars: 6, consts: [[1, "app-view-page"], ["mode", "view", "moduleName", "settings", "moduleRoute", "settings/public-holidays", 3, "title", "entityId", "loading"], [1, "text-center", "py-5"], ["role", "alert", 1, "alert", "alert-danger"], [1, "app-desktop-sidebar"], [3, "message", "variant", "centered"], [1, "fas", "fa-exclamation-triangle", "me-2"], [1, "app-main-content"], ["icon", "fas fa-info-circle", "layout", "two-column", 3, "title", "fields"], ["icon", "fas fa-calendar-alt", "layout", "two-column", 1, "mt-4", 3, "title", "fields"], ["icon", "fas fa-list-ul", "layout", "two-column", 1, "mt-4", 3, "title", "fields"], [1, "app-sidebar-content"], [1, "card", "mb-3"], ["role", "alert", 1, "alert", "alert-warning"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-info-circle", "me-2"], [1, "card-body"], [1, "d-flex", "align-items-center", "mb-2"], [1, "fas", "fa-circle", "me-2"], [1, "fw-medium"], [1, "text-success"], [1, "text-muted"], [1, "card"], [1, "fas", "fa-arrow-left", "me-2"], [1, "fas", "fa-cogs", "me-2"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-trash", "me-2"], [1, "mb-0", "mt-2", "small"]], template: /* @__PURE__ */ __name(function ViewPublicHolidayComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ViewPublicHolidayComponent_Conditional_2_Template, 2, 3, "div", 2);
    \u0275\u0275conditionalCreate(3, ViewPublicHolidayComponent_Conditional_3_Template, 3, 1, "div", 3);
    \u0275\u0275conditionalCreate(4, ViewPublicHolidayComponent_Conditional_4_Template, 26, 13, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("public_holidays.view_holiday"))("entityId", (tmp_1_0 = ctx.holiday()) == null ? null : tmp_1_0.id)("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.holiday() && !ctx.loading() ? 4 : -1);
  }
}, "ViewPublicHolidayComponent_Template"), dependencies: [
  CommonModule,
  LoadingSpinnerComponent,
  DetailCardComponent,
  FormHeaderComponent
], styles: ["\n\n.detail-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.detail-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  font-weight: 600;\n}\n.detail-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n}\n.actions-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n.btn-group-vertical[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.btn-group-vertical[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--bs-border-color);\n}\n.info-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  min-width: 140px;\n}\n.info-value[_ngcontent-%COMP%] {\n  text-align: right;\n  color: var(--bs-gray-900);\n}\n.holiday-pattern[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      45deg,\n      var(--bs-primary-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin: 1rem 0;\n}\n.pattern-description[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 500;\n  color: var(--bs-primary);\n  margin-bottom: 0.5rem;\n}\n.next-occurrence[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--bs-secondary);\n}\n.conflict-indicator[_ngcontent-%COMP%] {\n  background-color: var(--bs-warning-bg-subtle);\n  border-left: 4px solid var(--bs-warning);\n  padding: 0.75rem;\n  border-radius: 0.25rem;\n}\n.holiday-type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.75rem;\n  background-color: var(--bs-primary-bg-subtle);\n  border: 1px solid var(--bs-primary-border-subtle);\n  border-radius: 0.5rem;\n  color: var(--bs-primary-text-emphasis);\n  font-weight: 500;\n}\n.scope-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem 0.5rem;\n  background-color: var(--bs-info-bg-subtle);\n  border-radius: 0.25rem;\n  font-size: 0.875rem;\n  color: var(--bs-info-text-emphasis);\n}\n.scope-indicator.national[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary-bg-subtle);\n  color: var(--bs-primary-text-emphasis);\n}\n.scope-indicator.branch[_ngcontent-%COMP%] {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n}\n.status-info-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-success-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border: 1px solid var(--bs-success-border-subtle);\n}\n.status-info-card.inactive[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-secondary-bg-subtle) 0%,\n      var(--bs-light) 100%);\n  border: 1px solid var(--bs-secondary-border-subtle);\n}\n.loading-container[_ngcontent-%COMP%] {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n.priority-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  background-color: var(--bs-primary);\n  color: white;\n  border-radius: 50%;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .app-sidebar-content[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n  .actions-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .d-grid.gap-2[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .info-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    text-align: left;\n  }\n  .info-label[_ngcontent-%COMP%] {\n    min-width: auto;\n    margin-bottom: 0.25rem;\n  }\n  .info-value[_ngcontent-%COMP%] {\n    text-align: left;\n  }\n  .holiday-pattern[_ngcontent-%COMP%] {\n    margin: 0.5rem 0;\n    padding: 0.75rem;\n  }\n  .pattern-description[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .next-occurrence[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n  }\n}\n/*# sourceMappingURL=view-public-holiday.component.css.map */"] }));
var ViewPublicHolidayComponent = _ViewPublicHolidayComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewPublicHolidayComponent, [{
    type: Component,
    args: [{ selector: "app-view-public-holiday", standalone: true, imports: [
      CommonModule,
      LoadingSpinnerComponent,
      DetailCardComponent,
      FormHeaderComponent
    ], template: `<div class="app-view-page">\r
  <!-- Standardized Page Header -->\r
  <app-form-header\r
    mode="view"\r
    [title]="i18n.t('public_holidays.view_holiday')"\r
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
        [message]="i18n.t('public_holidays.loading_details')"\r
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
        <app-detail-card\r
          [title]="i18n.t('public_holidays.basic_information')"\r
          icon="fas fa-info-circle"\r
          [fields]="basicInfoFields"\r
          layout="two-column">\r
        </app-detail-card>\r
\r
        <!-- Date & Pattern Information Card -->\r
        <app-detail-card\r
          [title]="i18n.t('public_holidays.date_pattern_info')"\r
          icon="fas fa-calendar-alt"\r
          [fields]="dateInfoFields"\r
          layout="two-column"\r
          class="mt-4">\r
        </app-detail-card>\r
\r
        <!-- Additional Information Card -->\r
        @if (additionalInfoFields.length > 0) {\r
          <app-detail-card\r
            [title]="i18n.t('public_holidays.additional_information')"\r
            icon="fas fa-list-ul"\r
            [fields]="additionalInfoFields"\r
            layout="two-column"\r
            class="mt-4">\r
          </app-detail-card>\r
        }\r
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
            </div>\r
          </div>\r
        }\r
\r
        <!-- Conflicts Warning -->\r
        @if (holiday()?.hasConflicts) {\r
          <div class="alert alert-warning" role="alert">\r
            <i class="fas fa-exclamation-triangle me-2"></i>\r
            <strong>{{ i18n.t('public_holidays.conflicts_detected') }}</strong>\r
            <p class="mb-0 mt-2 small">\r
              {{ i18n.t('public_holidays.conflicts_description') }}\r
            </p>\r
          </div>\r
        }\r
\r
        <!-- Holiday Status Info -->\r
        <div class="card mb-3">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">\r
              <i class="fas fa-info-circle me-2"></i>\r
              {{ i18n.t('public_holidays.status_info') }}\r
            </h6>\r
          </div>\r
          <div class="card-body">\r
            <div class="d-flex align-items-center mb-2">\r
              <i class="fas fa-circle me-2"\r
                 [class]="holiday()?.isActive ? 'text-success' : 'text-secondary'"></i>\r
              <span class="fw-medium">\r
                {{ holiday()?.isActive ? i18n.t('common.active') : i18n.t('common.inactive') }}\r
              </span>\r
            </div>\r
            @if (holiday()?.isActive) {\r
              <small class="text-success">\r
                {{ i18n.t('public_holidays.status_active_description') }}\r
              </small>\r
            } @else {\r
              <small class="text-muted">\r
                {{ i18n.t('public_holidays.status_inactive_description') }}\r
              </small>\r
            }\r
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
</div>`, styles: ["/* src/app/pages/settings/public-holidays/view-public-holiday/view-public-holiday.component.css */\n.detail-card {\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.detail-card .card-header {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  font-weight: 600;\n}\n.detail-card .card-body {\n  padding: 1.25rem;\n}\n.actions-card {\n  position: sticky;\n  top: 1rem;\n}\n.btn-group-vertical .btn {\n  margin-bottom: 0.5rem;\n}\n.btn-group-vertical .btn:last-child {\n  margin-bottom: 0;\n}\n.status-badge {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.info-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--bs-border-color);\n}\n.info-item:last-child {\n  border-bottom: none;\n}\n.info-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  min-width: 140px;\n}\n.info-value {\n  text-align: right;\n  color: var(--bs-gray-900);\n}\n.holiday-pattern {\n  background:\n    linear-gradient(\n      45deg,\n      var(--bs-primary-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin: 1rem 0;\n}\n.pattern-description {\n  font-size: 1.1rem;\n  font-weight: 500;\n  color: var(--bs-primary);\n  margin-bottom: 0.5rem;\n}\n.next-occurrence {\n  font-size: 0.9rem;\n  color: var(--bs-secondary);\n}\n.conflict-indicator {\n  background-color: var(--bs-warning-bg-subtle);\n  border-left: 4px solid var(--bs-warning);\n  padding: 0.75rem;\n  border-radius: 0.25rem;\n}\n.holiday-type-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.75rem;\n  background-color: var(--bs-primary-bg-subtle);\n  border: 1px solid var(--bs-primary-border-subtle);\n  border-radius: 0.5rem;\n  color: var(--bs-primary-text-emphasis);\n  font-weight: 500;\n}\n.scope-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem 0.5rem;\n  background-color: var(--bs-info-bg-subtle);\n  border-radius: 0.25rem;\n  font-size: 0.875rem;\n  color: var(--bs-info-text-emphasis);\n}\n.scope-indicator.national {\n  background-color: var(--bs-primary-bg-subtle);\n  color: var(--bs-primary-text-emphasis);\n}\n.scope-indicator.branch {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n}\n.status-info-card {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-success-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border: 1px solid var(--bs-success-border-subtle);\n}\n.status-info-card.inactive {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-secondary-bg-subtle) 0%,\n      var(--bs-light) 100%);\n  border: 1px solid var(--bs-secondary-border-subtle);\n}\n.loading-container {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n.priority-indicator {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  background-color: var(--bs-primary);\n  color: white;\n  border-radius: 50%;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar {\n    flex-direction: column;\n  }\n  .app-sidebar-content {\n    margin-top: 1rem;\n  }\n  .actions-card {\n    position: static;\n  }\n  .d-grid.gap-2 {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .info-item {\n    flex-direction: column;\n    align-items: flex-start;\n    text-align: left;\n  }\n  .info-label {\n    min-width: auto;\n    margin-bottom: 0.25rem;\n  }\n  .info-value {\n    text-align: left;\n  }\n  .holiday-pattern {\n    margin: 0.5rem 0;\n    padding: 0.75rem;\n  }\n  .pattern-description {\n    font-size: 1rem;\n  }\n  .next-occurrence {\n    font-size: 0.85rem;\n  }\n}\n/*# sourceMappingURL=view-public-holiday.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewPublicHolidayComponent, { className: "ViewPublicHolidayComponent", filePath: "src/app/pages/settings/public-holidays/view-public-holiday/view-public-holiday.component.ts", lineNumber: 29 });
})();
export {
  ViewPublicHolidayComponent
};
//# sourceMappingURL=chunk-GX6GUXYW.js.map
