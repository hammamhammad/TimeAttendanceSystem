import {
  DefinitionListComponent
} from "./chunk-YAIJIRYX.js";
import {
  FormHeaderComponent
} from "./chunk-U5KRTQNT.js";
import {
  VacationTypesService
} from "./chunk-ZC4UCEJS.js";
import {
  StatusBadgeComponent
} from "./chunk-TT5VOWGP.js";
import {
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
import {
  PermissionService
} from "./chunk-DWXA666M.js";
import "./chunk-EVMJ7ILG.js";
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
  CommonModule,
  Component,
  DatePipe,
  Subject,
  computed,
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/vacation-types/view-vacation-type/view-vacation-type.component.ts
function ViewVacationTypeComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-loading-spinner", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("vacation_types.loading_details"))("variant", "primary")("centered", true);
  }
}
__name(ViewVacationTypeComponent_Conditional_1_Template, "ViewVacationTypeComponent_Conditional_1_Template");
function ViewVacationTypeComponent_Conditional_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vt_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(vt_r2.nameAr);
  }
}
__name(ViewVacationTypeComponent_Conditional_2_Conditional_10_Template, "ViewVacationTypeComponent_Conditional_2_Conditional_10_Template");
function ViewVacationTypeComponent_Conditional_2_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "i", 28);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vt_r2 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.i18n.t("vacation_types.modified_at"), ": ", \u0275\u0275pipeBind2(3, 2, vt_r2.modifiedAtUtc, "medium"), " ");
  }
}
__name(ViewVacationTypeComponent_Conditional_2_Conditional_22_Template, "ViewVacationTypeComponent_Conditional_2_Conditional_22_Template");
function ViewVacationTypeComponent_Conditional_2_Conditional_30_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32);
    \u0275\u0275element(2, "i", 33);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.restrictions.cannot_modify"));
  }
}
__name(ViewVacationTypeComponent_Conditional_2_Conditional_30_Conditional_7_Template, "ViewVacationTypeComponent_Conditional_2_Conditional_30_Conditional_7_Template");
function ViewVacationTypeComponent_Conditional_2_Conditional_30_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32);
    \u0275\u0275element(2, "i", 34);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.restrictions.cannot_delete"));
  }
}
__name(ViewVacationTypeComponent_Conditional_2_Conditional_30_Conditional_8_Template, "ViewVacationTypeComponent_Conditional_2_Conditional_30_Conditional_8_Template");
function ViewVacationTypeComponent_Conditional_2_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 29)(2, "h6", 23);
    \u0275\u0275element(3, "i", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 25)(6, "div", 10);
    \u0275\u0275conditionalCreate(7, ViewVacationTypeComponent_Conditional_2_Conditional_30_Conditional_7_Template, 5, 1, "div", 31);
    \u0275\u0275conditionalCreate(8, ViewVacationTypeComponent_Conditional_2_Conditional_30_Conditional_8_Template, 5, 1, "div", 31);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const vt_r2 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("vacation_types.restrictions"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!vt_r2.canBeModified ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!vt_r2.canBeDeleted ? 8 : -1);
  }
}
__name(ViewVacationTypeComponent_Conditional_2_Conditional_30_Template, "ViewVacationTypeComponent_Conditional_2_Conditional_30_Template");
function ViewVacationTypeComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-form-header", 4);
    \u0275\u0275elementStart(1, "div", 5)(2, "div", 6)(3, "div", 7);
    \u0275\u0275element(4, "i", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 9)(6, "div", 10)(7, "div", 11)(8, "h3", 12);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, ViewVacationTypeComponent_Conditional_2_Conditional_10_Template, 2, 1, "h4", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 14)(12, "div", 15);
    \u0275\u0275element(13, "app-status-badge", 16);
    \u0275\u0275elementStart(14, "div", 17)(15, "div");
    \u0275\u0275element(16, "i", 18);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 19);
    \u0275\u0275element(19, "i", 20);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(22, ViewVacationTypeComponent_Conditional_2_Conditional_22_Template, 4, 5, "div", 19);
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(23, "div", 21)(24, "div", 22)(25, "h5", 23);
    \u0275\u0275element(26, "i", 24);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 25);
    \u0275\u0275element(29, "app-definition-list", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(30, ViewVacationTypeComponent_Conditional_2_Conditional_30_Template, 9, 3, "div", 27);
  }
  if (rf & 2) {
    const vt_r2 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ctx_r0.i18n.t("vacation_types.vacation_type_details"))("entityId", ctx_r0.vacationTypeId() || void 0)("loading", ctx_r0.loading());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(vt_r2.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(vt_r2.nameAr ? 10 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("status", ctx_r0.statusBadge().label)("variant", ctx_r0.statusBadge().variant);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", vt_r2.branchName || ctx_r0.i18n.t("common.not_specified"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r0.i18n.t("vacation_types.created_at"), ": ", \u0275\u0275pipeBind2(21, 16, vt_r2.createdAtUtc, "medium"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(vt_r2.modifiedAtUtc ? 22 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("vacation_types.basic_information"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.basicInfoItems())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance();
    \u0275\u0275conditional(!vt_r2.canBeModified || !vt_r2.canBeDeleted ? 30 : -1);
  }
}
__name(ViewVacationTypeComponent_Conditional_2_Template, "ViewVacationTypeComponent_Conditional_2_Template");
function ViewVacationTypeComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "i", 35);
    \u0275\u0275elementStart(2, "h4", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 36);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.vacation_type_not_found"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("vacation_types.vacation_type_not_found_message"));
  }
}
__name(ViewVacationTypeComponent_Conditional_3_Template, "ViewVacationTypeComponent_Conditional_3_Template");
var _ViewVacationTypeComponent = class _ViewVacationTypeComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  vacationTypesService = inject(VacationTypesService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  destroy$ = new Subject();
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // State signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  vacationType = signal(null, ...ngDevMode ? [{ debugName: "vacationType" }] : []);
  vacationTypeId = signal(null, ...ngDevMode ? [{ debugName: "vacationTypeId" }] : []);
  // Permission constants
  PERMISSIONS = {
    VACATION_TYPE_UPDATE: "vacationType.update",
    VACATION_TYPE_DELETE: "vacationType.delete"
  };
  ngOnInit() {
    this.loadVacationType();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Load vacation type data from route parameters
   */
  loadVacationType() {
    this.loading.set(true);
    this.route.paramMap.pipe(takeUntil(this.destroy$), switchMap((params) => {
      const id = Number(params.get("id"));
      if (!id || id <= 0) {
        this.notificationService.error(this.i18n.t("vacation_types.errors.invalid_id"));
        this.router.navigate(["/vacation-types"]);
        throw new Error("Invalid vacation type ID");
      }
      this.vacationTypeId.set(id);
      return this.vacationTypesService.getVacationTypeById(id, true);
    })).subscribe({
      next: /* @__PURE__ */ __name((vacationType) => {
        this.loading.set(false);
        this.vacationType.set(vacationType);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.loading.set(false);
        console.error("Failed to load vacation type:", error);
        if (error.status === 404) {
          this.notificationService.error(this.i18n.t("vacation_types.errors.not_found"));
        } else {
          this.notificationService.error(this.i18n.t("vacation_types.errors.load_failed"));
        }
        this.router.navigate(["/vacation-types"]);
      }, "error")
    });
  }
  /**
   * Toggle vacation type status
   */
  onToggleStatus() {
    const vacationType = this.vacationType();
    if (!vacationType || !this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_UPDATE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    const action = vacationType.isActive ? "deactivate" : "activate";
    const message = this.i18n.t(`vacation_types.confirm_${action}`);
    this.confirmationService.confirm({
      title: this.i18n.t(`vacation_types.${action}_vacation_type`),
      message,
      confirmText: this.i18n.t(`common.${action}`),
      cancelText: this.i18n.t("common.cancel")
    }).then((result) => {
      if (result.confirmed && vacationType) {
        this.vacationTypesService.toggleVacationTypeStatus(vacationType.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            const successMessage = vacationType.isActive ? this.i18n.t("vacation_types.success.deactivated") : this.i18n.t("vacation_types.success.activated");
            this.notificationService.success(successMessage);
            this.loadVacationType();
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to toggle vacation type status:", error);
            this.notificationService.error(this.i18n.t("vacation_types.errors.status_toggle_failed"));
          }, "error")
        });
      }
    });
  }
  /**
   * Delete vacation type
   */
  onDelete() {
    const vacationType = this.vacationType();
    if (!vacationType || !this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_DELETE)) {
      this.notificationService.error(this.i18n.t("common.errors.insufficient_permissions"));
      return;
    }
    if (!vacationType.canBeDeleted) {
      this.notificationService.warning(this.i18n.t("vacation_types.warnings.cannot_delete"));
      return;
    }
    this.confirmationService.confirm({
      title: this.i18n.t("vacation_types.delete_vacation_type"),
      message: this.i18n.t("vacation_types.confirm_delete"),
      confirmText: this.i18n.t("common.delete"),
      cancelText: this.i18n.t("common.cancel"),
      confirmButtonClass: "btn-danger"
    }).then((result) => {
      if (result.confirmed && vacationType) {
        this.vacationTypesService.deleteVacationType(vacationType.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("vacation_types.success.deleted"));
            this.router.navigate(["/vacation-types"]);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete vacation type:", error);
            this.notificationService.error(this.i18n.t("vacation_types.errors.delete_failed"));
          }, "error")
        });
      }
    });
  }
  /**
   * Computed property for status badge
   */
  statusBadge = computed(() => {
    const vt = this.vacationType();
    if (!vt)
      return { label: "", variant: "secondary" };
    return {
      label: vt.isActive ? this.i18n.t("common.active") : this.i18n.t("common.inactive"),
      variant: vt.isActive ? "success" : "secondary"
    };
  }, ...ngDevMode ? [{ debugName: "statusBadge" }] : []);
  /**
   * Computed property for basic information items
   */
  basicInfoItems = computed(() => {
    const vt = this.vacationType();
    if (!vt)
      return [];
    const items = [
      { label: this.i18n.t("vacation_types.name"), value: vt.name }
    ];
    if (vt.nameAr) {
      items.push({ label: this.i18n.t("vacation_types.name_ar"), value: vt.nameAr });
    }
    items.push({
      label: this.i18n.t("vacation_types.branch"),
      value: vt.branchId ? vt.branchName || `Branch ${vt.branchId}` : this.i18n.t("common.company_wide")
    }, {
      label: this.i18n.t("common.status"),
      value: this.statusBadge().label,
      type: "badge",
      badgeVariant: this.statusBadge().variant
    });
    return items;
  }, ...ngDevMode ? [{ debugName: "basicInfoItems" }] : []);
  /**
   * Get status badge class (kept for backward compatibility if needed elsewhere)
   */
  getStatusBadgeClass(isActive) {
    return isActive ? "bg-success" : "bg-secondary";
  }
  /**
   * Get status text (kept for backward compatibility if needed elsewhere)
   */
  getStatusText(isActive) {
    return isActive ? this.i18n.t("common.active") : this.i18n.t("common.inactive");
  }
};
__name(_ViewVacationTypeComponent, "ViewVacationTypeComponent");
__publicField(_ViewVacationTypeComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewVacationTypeComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewVacationTypeComponent)();
}, "ViewVacationTypeComponent_Factory"));
__publicField(_ViewVacationTypeComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewVacationTypeComponent, selectors: [["app-view-vacation-type"]], decls: 4, vars: 1, consts: [[1, "view-vacation-type-page"], [1, "d-flex", "justify-content-center", "align-items-center", "py-5"], [1, "text-center", "py-5"], [3, "message", "variant", "centered"], ["mode", "view", "moduleName", "vacation-types", "moduleRoute", "vacation-types", 3, "title", "entityId", "loading"], [1, "header-card", "mb-4"], [1, "d-flex", "align-items-center"], [1, "vacation-type-icon", "me-4"], [1, "fas", "fa-calendar-alt", "text-primary"], [1, "flex-grow-1"], [1, "row"], [1, "col-md-8"], [1, "mb-1"], ["dir", "rtl", 1, "text-muted", "mb-2"], [1, "col-md-4", "text-md-end"], [1, "status-info"], [1, "fs-6", "mb-2", 3, "status", "variant"], [1, "text-muted", "small"], [1, "fas", "fa-building", "me-1"], [1, "mt-1"], [1, "fas", "fa-clock", "me-1"], [1, "card", "mb-4"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-info-circle", "text-info", "me-2"], [1, "card-body"], ["layout", "two-column", 3, "items", "labelWidth", "valueWidth"], [1, "card", "border-warning"], [1, "fas", "fa-edit", "me-1"], [1, "card-header", "bg-warning", "text-dark"], [1, "fas", "fa-exclamation-triangle", "me-2"], [1, "col-md-6"], [1, "restriction-item"], [1, "fas", "fa-edit", "text-muted", "me-2"], [1, "fas", "fa-trash", "text-muted", "me-2"], [1, "fas", "fa-exclamation-triangle", "fa-3x", "text-warning", "mb-3"], [1, "text-muted"]], template: /* @__PURE__ */ __name(function ViewVacationTypeComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, ViewVacationTypeComponent_Conditional_1_Template, 2, 3, "div", 1)(2, ViewVacationTypeComponent_Conditional_2_Template, 31, 19)(3, ViewVacationTypeComponent_Conditional_3_Template, 6, 2, "div", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_0_0;
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 1 : (tmp_0_0 = ctx.vacationType()) ? 2 : 3, tmp_0_0);
  }
}, "ViewVacationTypeComponent_Template"), dependencies: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, DatePipe], styles: ['\n\n.view-vacation-type-page[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.view-vacation-type-page[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-weight: 600;\n}\n.view-vacation-type-page[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  border: 1px solid #6c757d;\n  color: #6c757d;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s ease-in-out;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n  color: #fff;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  transition: all 0.15s ease-in-out;\n  font-weight: 500;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background-color: #007bff;\n  border-color: #007bff;\n  color: #fff;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-outline-warning[_ngcontent-%COMP%]:hover {\n  background-color: #ffc107;\n  border-color: #ffc107;\n  color: #212529;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-outline-danger[_ngcontent-%COMP%]:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: #fff;\n}\n.header-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  border: 1px solid #dee2e6;\n  border-radius: 12px;\n  padding: 2rem;\n  position: relative;\n  overflow: hidden;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);\n}\n.header-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 4px;\n  height: 100%;\n  background:\n    linear-gradient(\n      135deg,\n      #007bff 0%,\n      #0056b3 100%);\n}\n.vacation-type-icon[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 80px;\n  height: 80px;\n  background: #fff;\n  border-radius: 16px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  flex-shrink: 0;\n}\n.color-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -2px;\n  right: -2px;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  border: 3px solid #fff;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n  z-index: 1;\n}\n.vacation-type-icon[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #007bff;\n}\n.header-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-weight: 700;\n  font-size: 1.75rem;\n  line-height: 1.3;\n}\n.header-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 1.25rem;\n}\n.header-card[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  line-height: 1.5;\n}\n.status-info[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.status-info[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  line-height: 1.6;\n}\n.status-info[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  opacity: 0.7;\n}\n.card[_ngcontent-%COMP%] {\n  border: 1px solid #e9ecef;\n  border-radius: 12px;\n  overflow: hidden;\n  transition: all 0.2s ease-in-out;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n  transform: translateY(-1px);\n}\n.card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  border-bottom: 1px solid #e9ecef;\n  padding: 1.25rem 1.5rem;\n}\n.card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  color: #495057;\n  font-weight: 600;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.card-header[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin-right: 0.75rem;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 2rem 1.5rem;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.5rem;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #6c757d;\n  margin-bottom: 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.info-value[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.info-value[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  padding: 0.5rem 1rem;\n  border-radius: 16px;\n  font-weight: 600;\n}\n.info-value[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n}\n.info-value[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:not(.badge) {\n  font-weight: 500;\n  color: #495057;\n}\n.alert[_ngcontent-%COMP%] {\n  border-radius: 10px;\n  padding: 1.25rem;\n  border: none;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.alert-info[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #d1ecf1 0%,\n      #bee5eb 100%);\n  color: #0c5460;\n}\n.alert-secondary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  color: #495057;\n  border: 1px solid #dee2e6;\n}\n.alert[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n  transition: all 0.2s ease-in-out;\n  height: 100%;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n  transform: translateY(-2px);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n}\n.stat-icon[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\n.stat-number[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #2c3e50;\n  margin-bottom: 0.5rem;\n  line-height: 1;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6c757d;\n  font-weight: 500;\n  margin: 0;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.card.border-warning[_ngcontent-%COMP%] {\n  border-color: #ffc107 !important;\n  border-width: 2px;\n}\n.card-header.bg-warning[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ffc107 0%,\n      #e0a800 100%) !important;\n}\n.restriction-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 0.75rem;\n  background: #fff3cd;\n  border-radius: 8px;\n  border: 1px solid #ffeaa7;\n}\n.restriction-item[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  opacity: 0.7;\n}\n.restriction-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #856404;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n}\n.bg-primary[_ngcontent-%COMP%] {\n  background-color: #007bff !important;\n}\n.bg-info[_ngcontent-%COMP%] {\n  background-color: #17a2b8 !important;\n}\n.bg-warning[_ngcontent-%COMP%] {\n  background-color: #ffc107 !important;\n}\n.bg-success[_ngcontent-%COMP%] {\n  background-color: #28a745 !important;\n}\n.bg-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d !important;\n}\n.bg-danger[_ngcontent-%COMP%] {\n  background-color: #dc3545 !important;\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: #007bff !important;\n}\n.text-info[_ngcontent-%COMP%] {\n  color: #17a2b8 !important;\n}\n.text-warning[_ngcontent-%COMP%] {\n  color: #ffc107 !important;\n}\n.text-success[_ngcontent-%COMP%] {\n  color: #28a745 !important;\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: #dc3545 !important;\n}\n.text-dark[_ngcontent-%COMP%] {\n  color: #343a40 !important;\n}\n.fa-3x[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  opacity: 0.7;\n}\n@media (max-width: 768px) {\n  .view-vacation-type-page[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .d-flex.align-items-center.mb-4[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start !important;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between.align-items-start[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    width: 100%;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    width: 100%;\n  }\n  .action-buttons[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 120px;\n  }\n  .header-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .header-card[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    gap: 1.5rem;\n  }\n  .vacation-type-icon[_ngcontent-%COMP%] {\n    width: 70px;\n    height: 70px;\n    align-self: center;\n  }\n  .vacation-type-icon[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n  }\n  .header-card[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n  .header-card[_ngcontent-%COMP%]   .col-md-8[_ngcontent-%COMP%], \n   .header-card[_ngcontent-%COMP%]   .col-md-4[_ngcontent-%COMP%] {\n    padding: 0;\n    margin-bottom: 1rem;\n  }\n  .header-card[_ngcontent-%COMP%]   .text-md-end[_ngcontent-%COMP%] {\n    text-align: center !important;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1.5rem 1rem;\n  }\n  .info-grid[_ngcontent-%COMP%] {\n    gap: 1.25rem;\n  }\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n  }\n  .stat-number[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n  }\n  .stat-icon[_ngcontent-%COMP%] {\n    width: 45px;\n    height: 45px;\n  }\n  .stat-icon[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n}\n@media (max-width: 576px) {\n  .view-vacation-type-page[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n  }\n  .view-vacation-type-page[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .header-card[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .header-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .header-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n  .vacation-type-icon[_ngcontent-%COMP%] {\n    width: 60px;\n    height: 60px;\n  }\n  .vacation-type-icon[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .card-header[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .info-value[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.375rem 0.75rem;\n  }\n  .stat-number[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .stat-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    margin-bottom: 0.75rem;\n  }\n  .stat-icon[_ngcontent-%COMP%]   .fas[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .alert[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .spinner-border[_ngcontent-%COMP%] {\n    width: 2.5rem;\n    height: 2.5rem;\n  }\n  .action-buttons[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n    padding: 0.5rem 0.75rem;\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.view-vacation-type-page[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeInUp 0.4s ease-out;\n}\n.header-card[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeInUp 0.4s ease-out 0.1s both;\n}\n.card[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeInUp 0.4s ease-out 0.2s both;\n}\n.card[_ngcontent-%COMP%]:nth-child(even) {\n  animation: _ngcontent-%COMP%_fadeInUp 0.4s ease-out 0.25s both;\n}\n.card[_ngcontent-%COMP%]:last-child {\n  animation: _ngcontent-%COMP%_fadeInUp 0.4s ease-out 0.3s both;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.05);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n.spinner-border[_ngcontent-%COMP%] {\n  animation: spin 1s linear infinite, _ngcontent-%COMP%_pulse 2s ease-in-out infinite;\n}\n.stat-card[_ngcontent-%COMP%]:hover   .stat-icon[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n  transition: transform 0.2s ease-in-out;\n}\n.info-value[_ngcontent-%COMP%]:hover   .badge[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n  transition: transform 0.15s ease-in-out;\n}\n.btn[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.25);\n}\n@media (prefers-contrast: high) {\n  .header-card[_ngcontent-%COMP%] {\n    border-width: 2px;\n  }\n  .header-card[_ngcontent-%COMP%]::before {\n    width: 6px;\n  }\n  .vacation-type-icon[_ngcontent-%COMP%] {\n    border: 2px solid #000;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-width: 2px;\n  }\n  .stat-card[_ngcontent-%COMP%] {\n    border: 2px solid #dee2e6;\n  }\n}\n@media print {\n  .btn[_ngcontent-%COMP%], \n   .action-buttons[_ngcontent-%COMP%], \n   .card[_ngcontent-%COMP%]:last-child {\n    display: none !important;\n  }\n  .view-vacation-type-page[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .card[_ngcontent-%COMP%] {\n    border: none;\n    box-shadow: none;\n    margin-bottom: 1rem;\n  }\n  .header-card[_ngcontent-%COMP%] {\n    background: none;\n    border: 1px solid #000;\n  }\n  .header-card[_ngcontent-%COMP%]::before {\n    display: none;\n  }\n  .stat-card[_ngcontent-%COMP%] {\n    border: 1px solid #dee2e6;\n  }\n  .alert[_ngcontent-%COMP%] {\n    border: 1px solid #000;\n  }\n}\n/*# sourceMappingURL=view-vacation-type.component.css.map */'] }));
var ViewVacationTypeComponent = _ViewVacationTypeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewVacationTypeComponent, [{
    type: Component,
    args: [{ selector: "app-view-vacation-type", standalone: true, imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent], template: `<div class="view-vacation-type-page">\r
  @if (loading()) {\r
    <!-- Loading State -->\r
    <div class="d-flex justify-content-center align-items-center py-5">\r
      <app-loading-spinner\r
        [message]="i18n.t('vacation_types.loading_details')"\r
        [variant]="'primary'"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  } @else if (vacationType(); as vt) {\r
    <!-- Page Header -->\r
    <app-form-header\r
      mode="view"\r
      [title]="i18n.t('vacation_types.vacation_type_details')"\r
      moduleName="vacation-types"\r
      moduleRoute="vacation-types"\r
      [entityId]="vacationTypeId() || undefined"\r
      [loading]="loading()">\r
    </app-form-header>\r
\r
    <!-- Vacation Type Header Card -->\r
    <div class="header-card mb-4">\r
      <div class="d-flex align-items-center">\r
        <div class="vacation-type-icon me-4">\r
          <i class="fas fa-calendar-alt text-primary"></i>\r
        </div>\r
        <div class="flex-grow-1">\r
          <div class="row">\r
            <div class="col-md-8">\r
              <h3 class="mb-1">{{ vt.name }}</h3>\r
              @if (vt.nameAr) {\r
                <h4 class="text-muted mb-2" dir="rtl">{{ vt.nameAr }}</h4>\r
              }\r
            </div>\r
            <div class="col-md-4 text-md-end">\r
              <div class="status-info">\r
                <app-status-badge\r
                  [status]="statusBadge().label"\r
                  [variant]="statusBadge().variant"\r
                  class="fs-6 mb-2">\r
                </app-status-badge>\r
                <div class="text-muted small">\r
                  <div>\r
                    <i class="fas fa-building me-1"></i>\r
                    {{ vt.branchName || i18n.t('common.not_specified') }}\r
                  </div>\r
                  <div class="mt-1">\r
                    <i class="fas fa-clock me-1"></i>\r
                    {{ i18n.t('vacation_types.created_at') }}: {{ vt.createdAtUtc | date:'medium' }}\r
                  </div>\r
                  @if (vt.modifiedAtUtc) {\r
                    <div class="mt-1">\r
                      <i class="fas fa-edit me-1"></i>\r
                      {{ i18n.t('vacation_types.modified_at') }}: {{ vt.modifiedAtUtc | date:'medium' }}\r
                    </div>\r
                  }\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Basic Information -->\r
    <div class="card mb-4">\r
      <div class="card-header">\r
        <h5 class="card-title mb-0">\r
          <i class="fas fa-info-circle text-info me-2"></i>\r
          {{ i18n.t('vacation_types.basic_information') }}\r
        </h5>\r
      </div>\r
      <div class="card-body">\r
        <app-definition-list\r
          [items]="basicInfoItems()"\r
          [labelWidth]="'4'"\r
          [valueWidth]="'8'"\r
          layout="two-column">\r
        </app-definition-list>\r
      </div>\r
    </div>\r
\r
    <!-- Permissions and Actions -->\r
    @if (!vt.canBeModified || !vt.canBeDeleted) {\r
      <div class="card border-warning">\r
        <div class="card-header bg-warning text-dark">\r
          <h6 class="card-title mb-0">\r
            <i class="fas fa-exclamation-triangle me-2"></i>\r
            {{ i18n.t('vacation_types.restrictions') }}\r
          </h6>\r
        </div>\r
        <div class="card-body">\r
          <div class="row">\r
            @if (!vt.canBeModified) {\r
              <div class="col-md-6">\r
                <div class="restriction-item">\r
                  <i class="fas fa-edit text-muted me-2"></i>\r
                  <span>{{ i18n.t('vacation_types.restrictions.cannot_modify') }}</span>\r
                </div>\r
              </div>\r
            }\r
            @if (!vt.canBeDeleted) {\r
              <div class="col-md-6">\r
                <div class="restriction-item">\r
                  <i class="fas fa-trash text-muted me-2"></i>\r
                  <span>{{ i18n.t('vacation_types.restrictions.cannot_delete') }}</span>\r
                </div>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
    }\r
  } @else {\r
    <!-- Error State -->\r
    <div class="text-center py-5">\r
      <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>\r
      <h4 class="text-muted">{{ i18n.t('vacation_types.vacation_type_not_found') }}</h4>\r
      <p class="text-muted">{{ i18n.t('vacation_types.vacation_type_not_found_message') }}</p>\r
    </div>\r
  }\r
</div>`, styles: ['/* src/app/pages/vacation-types/view-vacation-type/view-vacation-type.component.css */\n.view-vacation-type-page {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.view-vacation-type-page h2 {\n  color: #2c3e50;\n  font-weight: 600;\n}\n.view-vacation-type-page .text-muted {\n  color: #6c757d !important;\n}\n.btn-outline-secondary {\n  border: 1px solid #6c757d;\n  color: #6c757d;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s ease-in-out;\n}\n.btn-outline-secondary:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n  color: #fff;\n}\n.action-buttons .btn {\n  transition: all 0.15s ease-in-out;\n  font-weight: 500;\n}\n.action-buttons .btn-outline-primary:hover {\n  background-color: #007bff;\n  border-color: #007bff;\n  color: #fff;\n}\n.action-buttons .btn-outline-warning:hover {\n  background-color: #ffc107;\n  border-color: #ffc107;\n  color: #212529;\n}\n.action-buttons .btn-outline-danger:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: #fff;\n}\n.header-card {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  border: 1px solid #dee2e6;\n  border-radius: 12px;\n  padding: 2rem;\n  position: relative;\n  overflow: hidden;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);\n}\n.header-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 4px;\n  height: 100%;\n  background:\n    linear-gradient(\n      135deg,\n      #007bff 0%,\n      #0056b3 100%);\n}\n.vacation-type-icon {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 80px;\n  height: 80px;\n  background: #fff;\n  border-radius: 16px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  flex-shrink: 0;\n}\n.color-indicator {\n  position: absolute;\n  top: -2px;\n  right: -2px;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  border: 3px solid #fff;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n  z-index: 1;\n}\n.vacation-type-icon .fas {\n  font-size: 2rem;\n  color: #007bff;\n}\n.header-card h3 {\n  color: #2c3e50;\n  font-weight: 700;\n  font-size: 1.75rem;\n  line-height: 1.3;\n}\n.header-card h4 {\n  font-weight: 600;\n  font-size: 1.25rem;\n}\n.header-card .text-muted {\n  font-size: 0.95rem;\n  line-height: 1.5;\n}\n.status-info .badge {\n  font-size: 0.75rem;\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.status-info .text-muted {\n  font-size: 0.85rem;\n  line-height: 1.6;\n}\n.status-info .fas {\n  opacity: 0.7;\n}\n.card {\n  border: 1px solid #e9ecef;\n  border-radius: 12px;\n  overflow: hidden;\n  transition: all 0.2s ease-in-out;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.card:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n  transform: translateY(-1px);\n}\n.card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  border-bottom: 1px solid #e9ecef;\n  padding: 1.25rem 1.5rem;\n}\n.card-header h5 {\n  color: #495057;\n  font-weight: 600;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.card-header .fas {\n  font-size: 1.1rem;\n  margin-right: 0.75rem;\n}\n.card-body {\n  padding: 2rem 1.5rem;\n}\n.info-grid {\n  display: grid;\n  gap: 1.5rem;\n}\n.info-item {\n  display: flex;\n  flex-direction: column;\n}\n.info-label {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #6c757d;\n  margin-bottom: 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.info-value {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.info-value .badge {\n  font-size: 0.8rem;\n  padding: 0.5rem 1rem;\n  border-radius: 16px;\n  font-weight: 600;\n}\n.info-value .fas {\n  font-size: 1.25rem;\n}\n.info-value span:not(.badge) {\n  font-weight: 500;\n  color: #495057;\n}\n.alert {\n  border-radius: 10px;\n  padding: 1.25rem;\n  border: none;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.alert-info {\n  background:\n    linear-gradient(\n      135deg,\n      #d1ecf1 0%,\n      #bee5eb 100%);\n  color: #0c5460;\n}\n.alert-secondary {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  color: #495057;\n  border: 1px solid #dee2e6;\n}\n.alert .fas {\n  font-size: 1.1rem;\n}\n.stat-card {\n  background: #fff;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n  transition: all 0.2s ease-in-out;\n  height: 100%;\n}\n.stat-card:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n  transform: translateY(-2px);\n}\n.stat-icon {\n  width: 50px;\n  height: 50px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n}\n.stat-icon .fas {\n  font-size: 1.5rem;\n}\n.stat-number {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #2c3e50;\n  margin-bottom: 0.5rem;\n  line-height: 1;\n}\n.stat-label {\n  font-size: 0.85rem;\n  color: #6c757d;\n  font-weight: 500;\n  margin: 0;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.card.border-warning {\n  border-color: #ffc107 !important;\n  border-width: 2px;\n}\n.card-header.bg-warning {\n  background:\n    linear-gradient(\n      135deg,\n      #ffc107 0%,\n      #e0a800 100%) !important;\n}\n.restriction-item {\n  display: flex;\n  align-items: center;\n  padding: 0.75rem;\n  background: #fff3cd;\n  border-radius: 8px;\n  border: 1px solid #ffeaa7;\n}\n.restriction-item .fas {\n  font-size: 1.1rem;\n  opacity: 0.7;\n}\n.restriction-item span {\n  font-weight: 500;\n  color: #856404;\n}\n.spinner-border {\n  width: 3rem;\n  height: 3rem;\n}\n.bg-primary {\n  background-color: #007bff !important;\n}\n.bg-info {\n  background-color: #17a2b8 !important;\n}\n.bg-warning {\n  background-color: #ffc107 !important;\n}\n.bg-success {\n  background-color: #28a745 !important;\n}\n.bg-secondary {\n  background-color: #6c757d !important;\n}\n.bg-danger {\n  background-color: #dc3545 !important;\n}\n.text-primary {\n  color: #007bff !important;\n}\n.text-info {\n  color: #17a2b8 !important;\n}\n.text-warning {\n  color: #ffc107 !important;\n}\n.text-success {\n  color: #28a745 !important;\n}\n.text-danger {\n  color: #dc3545 !important;\n}\n.text-dark {\n  color: #343a40 !important;\n}\n.fa-3x {\n  font-size: 3rem;\n  opacity: 0.7;\n}\n@media (max-width: 768px) {\n  .view-vacation-type-page {\n    padding: 1rem;\n  }\n  .d-flex.align-items-center.mb-4 {\n    flex-direction: column;\n    align-items: flex-start !important;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between.align-items-start {\n    flex-direction: column;\n    gap: 1rem;\n    width: 100%;\n  }\n  .action-buttons {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    width: 100%;\n  }\n  .action-buttons .btn {\n    flex: 1;\n    min-width: 120px;\n  }\n  .header-card {\n    padding: 1.5rem;\n  }\n  .header-card .d-flex {\n    flex-direction: column;\n    text-align: center;\n    gap: 1.5rem;\n  }\n  .vacation-type-icon {\n    width: 70px;\n    height: 70px;\n    align-self: center;\n  }\n  .vacation-type-icon .fas {\n    font-size: 1.75rem;\n  }\n  .header-card .row {\n    margin: 0;\n  }\n  .header-card .col-md-8,\n  .header-card .col-md-4 {\n    padding: 0;\n    margin-bottom: 1rem;\n  }\n  .header-card .text-md-end {\n    text-align: center !important;\n  }\n  .card-body {\n    padding: 1.5rem 1rem;\n  }\n  .info-grid {\n    gap: 1.25rem;\n  }\n  .stat-card {\n    padding: 1.25rem;\n  }\n  .stat-number {\n    font-size: 1.75rem;\n  }\n  .stat-icon {\n    width: 45px;\n    height: 45px;\n  }\n  .stat-icon .fas {\n    font-size: 1.25rem;\n  }\n}\n@media (max-width: 576px) {\n  .view-vacation-type-page {\n    padding: 0.5rem;\n  }\n  .view-vacation-type-page h2 {\n    font-size: 1.5rem;\n  }\n  .header-card {\n    padding: 1rem;\n  }\n  .header-card h3 {\n    font-size: 1.5rem;\n  }\n  .header-card h4 {\n    font-size: 1.1rem;\n  }\n  .vacation-type-icon {\n    width: 60px;\n    height: 60px;\n  }\n  .vacation-type-icon .fas {\n    font-size: 1.5rem;\n  }\n  .card-header {\n    padding: 1rem;\n  }\n  .card-body {\n    padding: 1rem;\n  }\n  .info-value .badge {\n    font-size: 0.75rem;\n    padding: 0.375rem 0.75rem;\n  }\n  .stat-number {\n    font-size: 1.5rem;\n  }\n  .stat-icon {\n    width: 40px;\n    height: 40px;\n    margin-bottom: 0.75rem;\n  }\n  .stat-icon .fas {\n    font-size: 1rem;\n  }\n  .alert {\n    padding: 1rem;\n  }\n  .spinner-border {\n    width: 2.5rem;\n    height: 2.5rem;\n  }\n  .action-buttons .btn {\n    font-size: 0.85rem;\n    padding: 0.5rem 0.75rem;\n  }\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.view-vacation-type-page {\n  animation: fadeInUp 0.4s ease-out;\n}\n.header-card {\n  animation: fadeInUp 0.4s ease-out 0.1s both;\n}\n.card {\n  animation: fadeInUp 0.4s ease-out 0.2s both;\n}\n.card:nth-child(even) {\n  animation: fadeInUp 0.4s ease-out 0.25s both;\n}\n.card:last-child {\n  animation: fadeInUp 0.4s ease-out 0.3s both;\n}\n@keyframes pulse {\n  0% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.05);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n.spinner-border {\n  animation: spin 1s linear infinite, pulse 2s ease-in-out infinite;\n}\n.stat-card:hover .stat-icon {\n  transform: scale(1.1);\n  transition: transform 0.2s ease-in-out;\n}\n.info-value:hover .badge {\n  transform: scale(1.05);\n  transition: transform 0.15s ease-in-out;\n}\n.btn:focus {\n  outline: none;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.btn-outline-secondary:focus {\n  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.25);\n}\n@media (prefers-contrast: high) {\n  .header-card {\n    border-width: 2px;\n  }\n  .header-card::before {\n    width: 6px;\n  }\n  .vacation-type-icon {\n    border: 2px solid #000;\n  }\n  .card {\n    border-width: 2px;\n  }\n  .stat-card {\n    border: 2px solid #dee2e6;\n  }\n}\n@media print {\n  .btn,\n  .action-buttons,\n  .card:last-child {\n    display: none !important;\n  }\n  .view-vacation-type-page {\n    padding: 0;\n  }\n  .card {\n    border: none;\n    box-shadow: none;\n    margin-bottom: 1rem;\n  }\n  .header-card {\n    background: none;\n    border: 1px solid #000;\n  }\n  .header-card::before {\n    display: none;\n  }\n  .stat-card {\n    border: 1px solid #dee2e6;\n  }\n  .alert {\n    border: 1px solid #000;\n  }\n}\n/*# sourceMappingURL=view-vacation-type.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewVacationTypeComponent, { className: "ViewVacationTypeComponent", filePath: "src/app/pages/vacation-types/view-vacation-type/view-vacation-type.component.ts", lineNumber: 23 });
})();
export {
  ViewVacationTypeComponent
};
//# sourceMappingURL=chunk-M7ED7XSP.js.map
