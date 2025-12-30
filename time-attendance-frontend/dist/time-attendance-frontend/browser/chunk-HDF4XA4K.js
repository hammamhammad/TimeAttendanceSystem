import {
  EmployeeVacationsService
} from "./chunk-S3PPH3Y3.js";
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-2WKN5CRJ.js";
import {
  __async,
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/employee-vacations/view-employee-vacation/view-employee-vacation.component.ts
function ViewEmployeeVacationComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("employee_vacations.loading_details"))("variant", "primary")("centered", true);
  }
}
__name(ViewEmployeeVacationComponent_Conditional_2_Template, "ViewEmployeeVacationComponent_Conditional_2_Template");
function ViewEmployeeVacationComponent_Conditional_3_Template(rf, ctx) {
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
__name(ViewEmployeeVacationComponent_Conditional_3_Template, "ViewEmployeeVacationComponent_Conditional_3_Template");
function ViewEmployeeVacationComponent_Conditional_4_Conditional_27_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 41);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("fields.notes"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (tmp_4_0 = ctx_r0.vacation()) == null ? null : tmp_4_0.notes, " ");
  }
}
__name(ViewEmployeeVacationComponent_Conditional_4_Conditional_27_Conditional_4_Template, "ViewEmployeeVacationComponent_Conditional_4_Conditional_27_Conditional_4_Template");
function ViewEmployeeVacationComponent_Conditional_4_Conditional_27_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("fields.createdAt"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDateTime(ctx_r0.vacation().createdAtUtc));
  }
}
__name(ViewEmployeeVacationComponent_Conditional_4_Conditional_27_Conditional_5_Template, "ViewEmployeeVacationComponent_Conditional_4_Conditional_27_Conditional_5_Template");
function ViewEmployeeVacationComponent_Conditional_4_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "h6", 37);
    \u0275\u0275element(2, "i", 38);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, ViewEmployeeVacationComponent_Conditional_4_Conditional_27_Conditional_4_Template, 5, 2, "div", 39);
    \u0275\u0275conditionalCreate(5, ViewEmployeeVacationComponent_Conditional_4_Conditional_27_Conditional_5_Template, 5, 2, "div", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.additional_information"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.vacation().notes ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.vacation().createdAtUtc ? 5 : -1);
  }
}
__name(ViewEmployeeVacationComponent_Conditional_4_Conditional_27_Template, "ViewEmployeeVacationComponent_Conditional_4_Conditional_27_Template");
function ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.navigateToEdit());
    }, "ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_7_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.processing());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.edit"), " ");
  }
}
__name(ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_7_Template, "ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_7_Template");
function ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 51);
  }
}
__name(ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Conditional_1_Template, "ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Conditional_1_Template");
function ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 52);
  }
}
__name(ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Conditional_2_Template, "ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Conditional_2_Template");
function ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.approveVacation());
    }, "ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Conditional_1_Template, 1, 0, "span", 51)(2, ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Conditional_2_Template, 1, 0, "i", 52);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.processing());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.processing() ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.approve"), " ");
  }
}
__name(ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Template, "ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Template");
function ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 51);
  }
}
__name(ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Conditional_1_Template, "ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Conditional_1_Template");
function ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 54);
  }
}
__name(ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Conditional_2_Template, "ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Conditional_2_Template");
function ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteVacation());
    }, "ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Conditional_1_Template, 1, 0, "span", 51)(2, ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Conditional_2_Template, 1, 0, "i", 54);
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
__name(ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Template, "ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Template");
function ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 9)(2, "h6", 10);
    \u0275\u0275element(3, "i", 43);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 20)(6, "div", 44);
    \u0275\u0275conditionalCreate(7, ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_7_Template, 3, 2, "button", 45);
    \u0275\u0275conditionalCreate(8, ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_8_Template, 4, 3, "button", 46);
    \u0275\u0275conditionalCreate(9, ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Conditional_9_Template, 4, 3, "button", 47);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.actions"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.canEdit() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canApprove() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canDelete() ? 9 : -1);
  }
}
__name(ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Template, "ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Template");
function ViewEmployeeVacationComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 7)(2, "div", 8)(3, "div", 9)(4, "h5", 10)(5, "div", 11)(6, "div", 12)(7, "div", 13)(8, "div", 14);
    \u0275\u0275element(9, "i", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "div", 16);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "small", 17);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 18);
    \u0275\u0275element(16, "app-status-badge", 19);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "div", 20)(18, "div", 21)(19, "h6", 22);
    \u0275\u0275element(20, "i", 23);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 4)(23, "div", 24);
    \u0275\u0275element(24, "app-definition-list", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 24);
    \u0275\u0275element(26, "app-definition-list", 25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(27, ViewEmployeeVacationComponent_Conditional_4_Conditional_27_Template, 6, 3, "div", 21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 26);
    \u0275\u0275conditionalCreate(29, ViewEmployeeVacationComponent_Conditional_4_Conditional_29_Template, 10, 4, "div", 27);
    \u0275\u0275elementStart(30, "div", 8)(31, "div", 9)(32, "h6", 10);
    \u0275\u0275element(33, "i", 28);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 20)(36, "div", 29)(37, "div", 30)(38, "div", 31)(39, "div", 32);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 33);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "div", 30)(44, "div", 31)(45, "div", 34);
    \u0275\u0275element(46, "app-status-badge", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 33);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(49, "div", 35)(50, "div", 31)(51, "div", 36);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 33);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_15_0;
    let tmp_16_0;
    let tmp_20_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r0.vacation()) == null ? null : tmp_1_0.employeeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.i18n.t("employee_vacations.vacation_id"), ": #", (tmp_2_0 = ctx_r0.vacation()) == null ? null : tmp_2_0.id);
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r0.statusBadge().label)("variant", ctx_r0.statusBadge().variant);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.basic_information"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("items", ctx_r0.basicInfoColumn1())("labelWidth", "5")("valueWidth", "7");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.basicInfoColumn2())("labelWidth", "5")("valueWidth", "7");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.vacation().notes || ctx_r0.vacation().createdAtUtc ? 27 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasActiveActions() ? 29 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_vacations.vacation_summary"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((tmp_15_0 = ctx_r0.vacation()) == null ? null : tmp_15_0.totalDays);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_16_0 = ctx_r0.vacation()) == null ? null : tmp_16_0.totalDays) === 1 ? ctx_r0.i18n.t("fields.dayUnit") : ctx_r0.i18n.t("fields.daysUnit"));
    \u0275\u0275advance(4);
    \u0275\u0275property("status", ctx_r0.statusBadge().label)("variant", ctx_r0.statusBadge().variant);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.status"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((tmp_20_0 = ctx_r0.vacation()) == null ? null : tmp_20_0.vacationTypeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("fields.vacationType"));
  }
}
__name(ViewEmployeeVacationComponent_Conditional_4_Template, "ViewEmployeeVacationComponent_Conditional_4_Template");
var _ViewEmployeeVacationComponent = class _ViewEmployeeVacationComponent {
  i18n = inject(I18nService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  employeeVacationsService = inject(EmployeeVacationsService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  permissionService = inject(PermissionService);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  processing = signal(false, ...ngDevMode ? [{ debugName: "processing" }] : []);
  vacation = signal(null, ...ngDevMode ? [{ debugName: "vacation" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  ngOnInit() {
    this.loadVacationDetails();
  }
  loadVacationDetails() {
    const vacationId = this.route.snapshot.paramMap.get("id");
    if (!vacationId) {
      this.router.navigate(["/employee-vacations"]);
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.employeeVacationsService.getVacationById(+vacationId).subscribe({
      next: /* @__PURE__ */ __name((vacation) => {
        this.vacation.set(vacation);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load vacation details:", error);
        this.error.set(this.i18n.t("employee_vacations.errors.load_failed"));
        this.loading.set(false);
      }, "error")
    });
  }
  approveVacation() {
    return __async(this, null, function* () {
      if (!this.vacation())
        return;
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("employee_vacations.approve_vacation"),
        message: this.i18n.t("employee_vacations.confirm_approve"),
        confirmText: this.i18n.t("common.approve"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-success"
      });
      if (result.confirmed) {
        this.processing.set(true);
        this.employeeVacationsService.toggleVacationStatus(this.vacation().id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("employee_vacations.success.approved"));
            this.loadVacationDetails();
            this.processing.set(false);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to approve vacation:", error);
            this.notificationService.error(this.i18n.t("employee_vacations.errors.approve_failed"));
            this.processing.set(false);
          }, "error")
        });
      }
    });
  }
  deleteVacation() {
    return __async(this, null, function* () {
      if (!this.vacation())
        return;
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("employee_vacations.delete_vacation"),
        message: this.i18n.t("employee_vacations.confirm_delete"),
        confirmText: this.i18n.t("common.delete"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.processing.set(true);
        this.employeeVacationsService.deleteVacation(this.vacation().id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("employee_vacations.success.deleted"));
            this.router.navigate(["/employee-vacations"]);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete vacation:", error);
            this.notificationService.error(this.i18n.t("employee_vacations.errors.delete_failed"));
            this.processing.set(false);
          }, "error")
        });
      }
    });
  }
  // Permission checks
  canEdit() {
    return this.permissionService.has(`vacation.${PermissionActions.UPDATE}`);
  }
  canApprove() {
    const vacation = this.vacation();
    return vacation ? vacation.isApproved === false && this.permissionService.has(`vacation.${PermissionActions.APPROVE}`) : false;
  }
  canDelete() {
    return this.permissionService.has(`vacation.${PermissionActions.DELETE}`);
  }
  hasActiveActions() {
    return this.canEdit() || this.canApprove() || this.canDelete();
  }
  /**
   * Get form mode for FormHeaderComponent
   */
  getFormMode() {
    return "view";
  }
  /**
   * Get vacation ID for FormHeaderComponent
   */
  getVacationId() {
    return this.vacation()?.id;
  }
  /**
   * Navigate to edit
   */
  navigateToEdit() {
    if (this.vacation()) {
      this.router.navigate(["/employee-vacations", this.vacation().id, "edit"]);
    }
  }
  /**
   * Navigate back
   */
  navigateBack() {
    this.router.navigate(["/employee-vacations"]);
  }
  /**
   * Format date for display
   */
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }
  /**
   * Format datetime for display
   */
  formatDateTime(dateString) {
    return new Date(dateString).toLocaleString();
  }
  /**
   * Get status class for styling
   */
  getStatusClass(isApproved) {
    return isApproved ? "badge bg-success" : "badge bg-warning";
  }
  /**
   * Get status text
   */
  getStatusText(isApproved) {
    return isApproved ? this.i18n.t("vacationStatus.approved") : this.i18n.t("vacationStatus.pending");
  }
  // Computed properties for definition lists
  basicInfoColumn1 = computed(() => {
    const vacation = this.vacation();
    if (!vacation)
      return [];
    return [
      {
        label: this.i18n.t("fields.employee"),
        value: vacation.employeeName
      },
      {
        label: this.i18n.t("fields.vacationType"),
        value: vacation.vacationTypeName
      },
      {
        label: this.i18n.t("fields.totalDays"),
        value: `${vacation.totalDays} ${vacation.totalDays === 1 ? this.i18n.t("fields.dayUnit") : this.i18n.t("fields.daysUnit")}`
      }
    ];
  }, ...ngDevMode ? [{ debugName: "basicInfoColumn1" }] : []);
  basicInfoColumn2 = computed(() => {
    const vacation = this.vacation();
    if (!vacation)
      return [];
    return [
      {
        label: this.i18n.t("fields.startDate"),
        value: vacation.startDate,
        type: "date"
      },
      {
        label: this.i18n.t("fields.endDate"),
        value: vacation.endDate,
        type: "date"
      },
      {
        label: this.i18n.t("fields.status"),
        value: this.getStatusText(vacation.isApproved),
        type: "badge",
        badgeVariant: vacation.isApproved ? "success" : "warning"
      }
    ];
  }, ...ngDevMode ? [{ debugName: "basicInfoColumn2" }] : []);
  // Computed property for status badge
  statusBadge = computed(() => {
    const vacation = this.vacation();
    if (!vacation)
      return { label: "", variant: "warning" };
    return {
      label: this.getStatusText(vacation.isApproved),
      variant: vacation.isApproved ? "success" : "warning"
    };
  }, ...ngDevMode ? [{ debugName: "statusBadge" }] : []);
};
__name(_ViewEmployeeVacationComponent, "ViewEmployeeVacationComponent");
__publicField(_ViewEmployeeVacationComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewEmployeeVacationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewEmployeeVacationComponent)();
}, "ViewEmployeeVacationComponent_Factory"));
__publicField(_ViewEmployeeVacationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewEmployeeVacationComponent, selectors: [["app-view-employee-vacation"]], decls: 5, vars: 7, consts: [[1, "container-fluid"], ["moduleName", "employee-vacations", "moduleRoute", "employee-vacations", 3, "mode", "title", "entityId", "loading"], [1, "text-center", "py-5"], ["role", "alert", 1, "alert", "alert-danger"], [1, "row"], [3, "message", "variant", "centered"], [1, "fas", "fa-exclamation-triangle", "me-2"], [1, "col-lg-8"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "d-flex", "align-items-center", "justify-content-between"], [1, "d-flex", "align-items-center"], [1, "avatar-sm", "me-3"], [1, "avatar-title", "bg-primary-subtle", "text-primary", "rounded-circle"], [1, "fas", "fa-calendar-alt"], [1, "fw-medium"], [1, "text-muted"], [1, "text-end"], [3, "status", "variant"], [1, "card-body"], [1, "mb-4"], [1, "text-primary", "mb-3"], [1, "fa-solid", "fa-info-circle", "me-2"], [1, "col-md-6"], [3, "items", "labelWidth", "valueWidth"], [1, "col-lg-4"], [1, "card", "mb-4"], [1, "fas", "fa-chart-bar", "me-2"], [1, "row", "text-center"], [1, "col-12", "mb-3"], [1, "border", "rounded", "p-3"], [1, "h5", "mb-1", "text-primary"], [1, "text-muted", "small"], [1, "h6", "mb-1"], [1, "col-12"], [1, "h6", "mb-1", "text-info"], [1, "text-secondary", "mb-3"], [1, "fa-solid", "fa-list", "me-2"], [1, "mb-3"], [1, "mb-2"], [1, "bg-light", "p-3", "rounded", "mt-2"], [1, "ms-2"], [1, "fas", "fa-cogs", "me-2"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-success", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click", "disabled"], [1, "fas", "fa-edit", "me-2"], ["type", "button", 1, "btn", "btn-success", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-check", "me-2"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-trash", "me-2"]], template: /* @__PURE__ */ __name(function ViewEmployeeVacationComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ViewEmployeeVacationComponent_Conditional_2_Template, 2, 3, "div", 2);
    \u0275\u0275conditionalCreate(3, ViewEmployeeVacationComponent_Conditional_3_Template, 3, 1, "div", 3);
    \u0275\u0275conditionalCreate(4, ViewEmployeeVacationComponent_Conditional_4_Template, 55, 22, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("mode", ctx.getFormMode())("title", ctx.i18n.t("employee_vacations.view_vacation"))("entityId", ctx.getVacationId())("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.vacation() && !ctx.loading() ? 4 : -1);
  }
}, "ViewEmployeeVacationComponent_Template"), dependencies: [
  FormHeaderComponent,
  LoadingSpinnerComponent,
  StatusBadgeComponent,
  DefinitionListComponent
], styles: ["\n\n.detail-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.detail-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  font-weight: 600;\n}\n.detail-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n}\n.actions-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n.btn-group-vertical[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.btn-group-vertical[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--bs-border-color);\n}\n.info-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  min-width: 120px;\n}\n.info-value[_ngcontent-%COMP%] {\n  text-align: right;\n  color: var(--bs-gray-900);\n}\n.loading-container[_ngcontent-%COMP%] {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .app-sidebar-content[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n  .actions-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .d-grid.gap-2[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n}\n/*# sourceMappingURL=view-employee-vacation.component.css.map */"] }));
var ViewEmployeeVacationComponent = _ViewEmployeeVacationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewEmployeeVacationComponent, [{
    type: Component,
    args: [{ selector: "app-view-employee-vacation", standalone: true, imports: [
      FormHeaderComponent,
      LoadingSpinnerComponent,
      StatusBadgeComponent,
      DefinitionListComponent
    ], template: `<div class="container-fluid">\r
  <!-- Header -->\r
  <app-form-header\r
    [mode]="getFormMode()"\r
    [title]="i18n.t('employee_vacations.view_vacation')"\r
    moduleName="employee-vacations"\r
    moduleRoute="employee-vacations"\r
    [entityId]="getVacationId()"\r
    [loading]="loading()">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <app-loading-spinner\r
        [message]="i18n.t('employee_vacations.loading_details')"\r
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
  <!-- Vacation Details -->\r
  @if (vacation() && !loading()) {\r
    <div class="row">\r
      <!-- Main Information Card -->\r
      <div class="col-lg-8">\r
        <div class="card">\r
          <div class="card-header">\r
            <h5 class="card-title mb-0">\r
              <div class="d-flex align-items-center justify-content-between">\r
                <div class="d-flex align-items-center">\r
                  <div class="avatar-sm me-3">\r
                    <div class="avatar-title bg-primary-subtle text-primary rounded-circle">\r
                      <i class="fas fa-calendar-alt"></i>\r
                    </div>\r
                  </div>\r
                  <div>\r
                    <div class="fw-medium">{{ vacation()?.employeeName }}</div>\r
                    <small class="text-muted">{{ i18n.t('employee_vacations.vacation_id') }}: #{{ vacation()?.id }}</small>\r
                  </div>\r
                </div>\r
                <div class="text-end">\r
                  <app-status-badge\r
                    [status]="statusBadge().label"\r
                    [variant]="statusBadge().variant">\r
                  </app-status-badge>\r
                </div>\r
              </div>\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <!-- Basic Information Section -->\r
            <div class="mb-4">\r
              <h6 class="text-primary mb-3">\r
                <i class="fa-solid fa-info-circle me-2"></i>\r
                {{ i18n.t('employee_vacations.basic_information') }}\r
              </h6>\r
              <div class="row">\r
                <div class="col-md-6">\r
                  <app-definition-list\r
                    [items]="basicInfoColumn1()"\r
                    [labelWidth]="'5'"\r
                    [valueWidth]="'7'">\r
                  </app-definition-list>\r
                </div>\r
                <div class="col-md-6">\r
                  <app-definition-list\r
                    [items]="basicInfoColumn2()"\r
                    [labelWidth]="'5'"\r
                    [valueWidth]="'7'">\r
                  </app-definition-list>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Additional Information Section -->\r
            @if (vacation()!.notes || vacation()!.createdAtUtc) {\r
              <div class="mb-4">\r
                <h6 class="text-secondary mb-3">\r
                  <i class="fa-solid fa-list me-2"></i>\r
                  {{ i18n.t('employee_vacations.additional_information') }}\r
                </h6>\r
                @if (vacation()!.notes) {\r
                  <div class="mb-3">\r
                    <strong>{{ i18n.t('fields.notes') }}:</strong>\r
                    <div class="bg-light p-3 rounded mt-2">\r
                      {{ vacation()?.notes }}\r
                    </div>\r
                  </div>\r
                }\r
                @if (vacation()!.createdAtUtc) {\r
                  <div class="mb-2">\r
                    <strong>{{ i18n.t('fields.createdAt') }}:</strong>\r
                    <span class="ms-2">{{ formatDateTime(vacation()!.createdAtUtc) }}</span>\r
                  </div>\r
                }\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Actions Sidebar -->\r
      <div class="col-lg-4">\r
        <!-- Actions Card -->\r
        @if (hasActiveActions()) {\r
          <div class="card mb-4">\r
            <div class="card-header">\r
              <h6 class="card-title mb-0">\r
                <i class="fas fa-cogs me-2"></i>\r
                {{ i18n.t('common.actions') }}\r
              </h6>\r
            </div>\r
            <div class="card-body">\r
              <div class="d-grid gap-2">\r
                <!-- Edit Action -->\r
                @if (canEdit()) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-outline-primary"\r
                    (click)="navigateToEdit()"\r
                    [disabled]="processing()">\r
                    <i class="fas fa-edit me-2"></i>\r
                    {{ i18n.t('common.edit') }}\r
                  </button>\r
                }\r
\r
                <!-- Approve Action -->\r
                @if (canApprove()) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-success"\r
                    (click)="approveVacation()"\r
                    [disabled]="processing()">\r
                    @if (processing()) {\r
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    } @else {\r
                      <i class="fas fa-check me-2"></i>\r
                    }\r
                    {{ i18n.t('employee_vacations.approve') }}\r
                  </button>\r
                }\r
\r
                <!-- Delete Action -->\r
                @if (canDelete()) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-outline-danger"\r
                    (click)="deleteVacation()"\r
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
        <!-- Summary Card -->\r
        <div class="card">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">\r
              <i class="fas fa-chart-bar me-2"></i>\r
              {{ i18n.t('employee_vacations.vacation_summary') }}\r
            </h6>\r
          </div>\r
          <div class="card-body">\r
            <div class="row text-center">\r
              <div class="col-12 mb-3">\r
                <div class="border rounded p-3">\r
                  <div class="h5 mb-1 text-primary">{{ vacation()?.totalDays }}</div>\r
                  <div class="text-muted small">{{ vacation()?.totalDays === 1 ? i18n.t('fields.dayUnit') : i18n.t('fields.daysUnit') }}</div>\r
                </div>\r
              </div>\r
              <div class="col-12 mb-3">\r
                <div class="border rounded p-3">\r
                  <div class="h6 mb-1">\r
                    <app-status-badge\r
                      [status]="statusBadge().label"\r
                      [variant]="statusBadge().variant">\r
                    </app-status-badge>\r
                  </div>\r
                  <div class="text-muted small">{{ i18n.t('fields.status') }}</div>\r
                </div>\r
              </div>\r
              <div class="col-12">\r
                <div class="border rounded p-3">\r
                  <div class="h6 mb-1 text-info">{{ vacation()?.vacationTypeName }}</div>\r
                  <div class="text-muted small">{{ i18n.t('fields.vacationType') }}</div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>`, styles: ["/* src/app/pages/employee-vacations/view-employee-vacation/view-employee-vacation.component.css */\n.detail-card {\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.detail-card .card-header {\n  background-color: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  font-weight: 600;\n}\n.detail-card .card-body {\n  padding: 1.25rem;\n}\n.actions-card {\n  position: sticky;\n  top: 1rem;\n}\n.btn-group-vertical .btn {\n  margin-bottom: 0.5rem;\n}\n.btn-group-vertical .btn:last-child {\n  margin-bottom: 0;\n}\n.status-badge {\n  font-size: 0.875rem;\n  padding: 0.25rem 0.5rem;\n}\n.info-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--bs-border-color);\n}\n.info-item:last-child {\n  border-bottom: none;\n}\n.info-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  min-width: 120px;\n}\n.info-value {\n  text-align: right;\n  color: var(--bs-gray-900);\n}\n.loading-container {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar {\n    flex-direction: column;\n  }\n  .app-sidebar-content {\n    margin-top: 1rem;\n  }\n  .actions-card {\n    position: static;\n  }\n  .d-grid.gap-2 {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n}\n/*# sourceMappingURL=view-employee-vacation.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewEmployeeVacationComponent, { className: "ViewEmployeeVacationComponent", filePath: "src/app/pages/employee-vacations/view-employee-vacation/view-employee-vacation.component.ts", lineNumber: 28 });
})();
export {
  ViewEmployeeVacationComponent
};
//# sourceMappingURL=chunk-HDF4XA4K.js.map
