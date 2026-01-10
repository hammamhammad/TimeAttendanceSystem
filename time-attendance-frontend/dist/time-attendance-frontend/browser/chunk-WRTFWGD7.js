import {
  VacationTypesService
} from "./chunk-ZC4UCEJS.js";
import {
  EmployeesService
} from "./chunk-5B6AVE4S.js";
import {
  DataTableComponent
} from "./chunk-JW5UYWPK.js";
import "./chunk-NKWUQBPB.js";
import {
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
import {
  PermissionService
} from "./chunk-DWXA666M.js";
import "./chunk-EVMJ7ILG.js";
import "./chunk-VATI3GP6.js";
import {
  PageHeaderComponent
} from "./chunk-V6PMR2EI.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import "./chunk-O2IS3HK2.js";
import {
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
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-DUNHAUAW.js";
import {
  __async,
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/settings/leave-balances/leave-entitlements-list/leave-entitlements-list.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function LeaveEntitlementsListComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openBulkUpload());
    }, "LeaveEntitlementsListComponent_Conditional_3_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 21);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Conditional_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.createEntitlement());
    }, "LeaveEntitlementsListComponent_Conditional_3_Template_button_click_3_listener"));
    \u0275\u0275element(4, "i", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("leaveBalance.bulkUpload"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("leaveBalance.createEntitlement"), " ");
  }
}
__name(LeaveEntitlementsListComponent_Conditional_3_Template, "LeaveEntitlementsListComponent_Conditional_3_Template");
function LeaveEntitlementsListComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const year_r3 = ctx.$implicit;
    \u0275\u0275property("value", year_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(year_r3);
  }
}
__name(LeaveEntitlementsListComponent_For_12_Template, "LeaveEntitlementsListComponent_For_12_Template");
function LeaveEntitlementsListComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const employee_r4 = ctx.$implicit;
    \u0275\u0275property("value", employee_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(employee_r4.name);
  }
}
__name(LeaveEntitlementsListComponent_For_20_Template, "LeaveEntitlementsListComponent_For_20_Template");
function LeaveEntitlementsListComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vacationType_r5 = ctx.$implicit;
    \u0275\u0275property("value", vacationType_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(vacationType_r5.name);
  }
}
__name(LeaveEntitlementsListComponent_For_28_Template, "LeaveEntitlementsListComponent_For_28_Template");
var _LeaveEntitlementsListComponent = class _LeaveEntitlementsListComponent {
  router = inject(Router);
  confirmationService = inject(ConfirmationService);
  notificationService = inject(NotificationService);
  employeesService = inject(EmployeesService);
  vacationTypesService = inject(VacationTypesService);
  permissionService = inject(PermissionService);
  i18n = inject(I18nService);
  // Permission constants
  PERMISSIONS = {
    LEAVE_BALANCE_CREATE: "leaveBalance.create",
    LEAVE_BALANCE_READ: "leaveBalance.read",
    LEAVE_BALANCE_UPDATE: "leaveBalance.update",
    LEAVE_BALANCE_DELETE: "leaveBalance.delete"
  };
  // State signals
  entitlements = signal([], ...ngDevMode ? [{ debugName: "entitlements" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  totalCount = signal(0, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  totalPages = signal(0, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  selectedYear = signal((/* @__PURE__ */ new Date()).getFullYear(), ...ngDevMode ? [{ debugName: "selectedYear" }] : []);
  selectedEmployeeId = signal(null, ...ngDevMode ? [{ debugName: "selectedEmployeeId" }] : []);
  selectedVacationTypeId = signal(null, ...ngDevMode ? [{ debugName: "selectedVacationTypeId" }] : []);
  // Filter options
  employees = signal([], ...ngDevMode ? [{ debugName: "employees" }] : []);
  vacationTypes = signal([], ...ngDevMode ? [{ debugName: "vacationTypes" }] : []);
  availableYears = signal([], ...ngDevMode ? [{ debugName: "availableYears" }] : []);
  // Data table configuration
  tableColumns = computed(() => [
    {
      key: "employeeCode",
      label: this.t("employees.employeeCode"),
      sortable: true,
      width: "120px",
      priority: "high",
      mobileLabel: this.t("employees.employeeCode")
    },
    {
      key: "employeeName",
      label: this.t("employees.employeeName"),
      sortable: true,
      width: "180px",
      priority: "high",
      mobileLabel: this.t("employees.employeeName")
    },
    {
      key: "vacationTypeName",
      label: this.t("vacationTypes.vacationType"),
      sortable: false,
      width: "150px",
      priority: "high",
      mobileLabel: this.t("vacationTypes.vacationType")
    },
    {
      key: "year",
      label: this.t("leaveBalance.year"),
      sortable: true,
      width: "80px",
      align: "center",
      priority: "medium",
      mobileLabel: this.t("leaveBalance.year")
    },
    {
      key: "annualDays",
      label: this.t("leaveBalance.annualDays"),
      sortable: false,
      width: "110px",
      align: "right",
      priority: "medium",
      mobileLabel: this.t("leaveBalance.annualDays")
    },
    {
      key: "carryOverDays",
      label: this.t("leaveBalance.carryOverDays"),
      sortable: false,
      width: "120px",
      align: "right",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("leaveBalance.carryOverDays")
    },
    {
      key: "expiresStatus",
      label: this.t("leaveBalance.expiresAtYearEnd"),
      sortable: false,
      width: "130px",
      align: "center",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("leaveBalance.expiresAtYearEnd"),
      renderHtml: true
    },
    {
      key: "notes",
      label: this.t("common.notes"),
      sortable: false,
      width: "150px",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("common.notes")
    }
  ], ...ngDevMode ? [{ debugName: "tableColumns" }] : []);
  tableActions = computed(() => [
    {
      key: "edit",
      label: this.t("common.edit"),
      icon: "fa-pencil",
      color: "primary",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.LEAVE_BALANCE_UPDATE), "condition")
    },
    {
      key: "delete",
      label: this.t("common.delete"),
      icon: "fa-trash",
      color: "danger",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.LEAVE_BALANCE_DELETE), "condition")
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  // Transform entitlements data for data table
  tableData = computed(() => {
    return this.entitlements().map((entitlement) => __spreadProps(__spreadValues({}, entitlement), {
      expiresStatus: this.formatExpiresStatus(entitlement.expiresAtYearEnd),
      notes: entitlement.notes || "-"
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  ngOnInit() {
    this.loadFilterOptions();
    this.loadEntitlements();
    this.generateAvailableYears();
  }
  /**
   * Loads filter options (employees and vacation types).
   */
  loadFilterOptions() {
    this.employeesService.getEmployees({ pageSize: 1e3 }).subscribe({
      next: /* @__PURE__ */ __name((result) => {
        this.employees.set(result.items.map((emp) => ({
          id: emp.id,
          name: emp.fullName
        })));
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load employees", error);
      }, "error")
    });
    this.vacationTypesService.getVacationTypes({ pageSize: 1e3 }).subscribe({
      next: /* @__PURE__ */ __name((result) => {
        this.vacationTypes.set(result.items.map((vt) => ({
          id: vt.id,
          name: vt.name
        })));
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load vacation types", error);
      }, "error")
    });
  }
  /**
   * Generates list of available years (current year ± 2 years).
   */
  generateAvailableYears() {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const years = [];
    for (let i = -2; i <= 2; i++) {
      years.push(currentYear + i);
    }
    this.availableYears.set(years);
  }
  /**
   * Loads leave entitlements based on current filters.
   */
  loadEntitlements() {
    this.loading.set(true);
    setTimeout(() => {
      const mockEntitlements = [
        {
          id: 1,
          employeeId: 1,
          employeeName: "John Doe",
          employeeCode: "EMP001",
          vacationTypeId: 1,
          vacationTypeName: "Annual Leave",
          year: this.selectedYear(),
          annualDays: 30,
          carryOverDays: 5,
          maxCarryOverDays: 10,
          expiresAtYearEnd: false,
          effectiveStartDate: `${this.selectedYear()}-01-01`,
          effectiveEndDate: `${this.selectedYear()}-12-31`,
          notes: "Standard annual leave entitlement"
        },
        {
          id: 2,
          employeeId: 1,
          employeeName: "John Doe",
          employeeCode: "EMP001",
          vacationTypeId: 2,
          vacationTypeName: "Sick Leave",
          year: this.selectedYear(),
          annualDays: 15,
          carryOverDays: 0,
          maxCarryOverDays: null,
          expiresAtYearEnd: true,
          effectiveStartDate: `${this.selectedYear()}-01-01`,
          effectiveEndDate: `${this.selectedYear()}-12-31`,
          notes: null
        }
      ];
      let filtered = mockEntitlements.filter((e) => e.year === this.selectedYear());
      if (this.selectedEmployeeId()) {
        filtered = filtered.filter((e) => e.employeeId === this.selectedEmployeeId());
      }
      if (this.selectedVacationTypeId()) {
        filtered = filtered.filter((e) => e.vacationTypeId === this.selectedVacationTypeId());
      }
      this.entitlements.set(filtered);
      this.loading.set(false);
    }, 500);
  }
  /**
   * Navigates to create entitlement form.
   */
  createEntitlement() {
    this.router.navigate(["/settings/leave-entitlements/create"]);
  }
  /**
   * Navigates to edit entitlement form.
   */
  editEntitlement(entitlement) {
    this.router.navigate(["/settings/leave-entitlements/edit", entitlement.id]);
  }
  /**
   * Deletes a leave entitlement after confirmation.
   */
  deleteEntitlement(entitlement) {
    return __async(this, null, function* () {
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("leaveBalance.deleteEntitlementTitle"),
        message: this.i18n.t("leaveBalance.deleteEntitlementMessage", {
          employee: entitlement.employeeName,
          vacationType: entitlement.vacationTypeName,
          year: entitlement.year.toString()
        }),
        confirmText: this.i18n.t("common.delete"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-danger"
      });
      if (result.confirmed) {
        this.notificationService.success(this.i18n.t("leaveBalance.entitlementDeleted"));
        this.loadEntitlements();
      }
    });
  }
  /**
   * Filters entitlements by year.
   */
  onYearChange() {
    this.loadEntitlements();
  }
  /**
   * Filters entitlements by employee.
   */
  onEmployeeChange() {
    this.loadEntitlements();
  }
  /**
   * Filters entitlements by vacation type.
   */
  onVacationTypeChange() {
    this.loadEntitlements();
  }
  /**
   * Clears all filters.
   */
  clearFilters() {
    this.selectedYear.set((/* @__PURE__ */ new Date()).getFullYear());
    this.selectedEmployeeId.set(null);
    this.selectedVacationTypeId.set(null);
    this.loadEntitlements();
  }
  /**
   * Opens bulk upload modal.
   */
  openBulkUpload() {
    this.notificationService.info("Bulk upload feature coming soon");
  }
  /**
   * Translation helper method.
   */
  t(key) {
    return this.i18n.t(key);
  }
  /**
   * Formats expires at year end status.
   */
  formatExpiresStatus(expiresAtYearEnd) {
    const text = expiresAtYearEnd ? this.t("common.yes") : this.t("common.no");
    const badgeClass = expiresAtYearEnd ? "badge bg-warning" : "badge bg-success";
    return `<span class="${badgeClass}">${text}</span>`;
  }
  /**
   * Data table action handler.
   */
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "edit":
        this.editEntitlement(item);
        break;
      case "delete":
        this.deleteEntitlement(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  /**
   * Pagination handlers.
   */
  onPageChange(page) {
    this.currentPage.set(page);
    this.loadEntitlements();
  }
  onPageSizeChange(pageSize) {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadEntitlements();
  }
  /**
   * Check if any filters are active.
   */
  hasActiveFilters() {
    return !!(this.selectedEmployeeId() !== null || this.selectedVacationTypeId() !== null);
  }
};
__name(_LeaveEntitlementsListComponent, "LeaveEntitlementsListComponent");
__publicField(_LeaveEntitlementsListComponent, "\u0275fac", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LeaveEntitlementsListComponent)();
}, "LeaveEntitlementsListComponent_Factory"));
__publicField(_LeaveEntitlementsListComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeaveEntitlementsListComponent, selectors: [["app-leave-entitlements-list"]], decls: 33, vars: 26, consts: [[1, "container-fluid"], [3, "title", "subtitle"], ["actions", ""], [1, "card", "mb-4"], [1, "card-body"], [1, "row", "g-3"], [1, "col-md-3"], ["for", "yearFilter", 1, "form-label"], ["id", "yearFilter", 1, "form-select", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "col-md-4"], ["for", "employeeFilter", 1, "form-label"], ["id", "employeeFilter", 1, "form-select", 3, "ngModelChange", "ngModel"], ["for", "vacationTypeFilter", 1, "form-label"], ["id", "vacationTypeFilter", 1, "form-select", 3, "ngModelChange", "ngModel"], [1, "col-md-1", "d-flex", "align-items-end"], ["type", "button", 1, "btn", "btn-outline-secondary", "w-100", 3, "click", "disabled", "title"], [1, "fa", "fa-times"], [3, "actionClick", "pageChange", "pageSizeChange", "columns", "data", "actions", "loading", "currentPage", "pageSize", "totalItems", "totalPages", "emptyTitle", "emptyMessage"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click"], [1, "fa", "fa-upload", "me-2"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "fa", "fa-plus", "me-2"]], template: /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "app-page-header", 1);
    \u0275\u0275elementContainerStart(2, 2);
    \u0275\u0275conditionalCreate(3, LeaveEntitlementsListComponent_Conditional_3_Template, 6, 2);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "label", 7);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "select", 8);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Template_select_ngModelChange_10_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.selectedYear, $event) || (ctx.selectedYear = $event);
      return $event;
    }, "LeaveEntitlementsListComponent_Template_select_ngModelChange_10_listener"));
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Template_select_ngModelChange_10_listener() {
      return ctx.onYearChange();
    }, "LeaveEntitlementsListComponent_Template_select_ngModelChange_10_listener"));
    \u0275\u0275repeaterCreate(11, LeaveEntitlementsListComponent_For_12_Template, 2, 2, "option", 9, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 10)(14, "label", 11);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "select", 12);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Template_select_ngModelChange_16_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.selectedEmployeeId, $event) || (ctx.selectedEmployeeId = $event);
      return $event;
    }, "LeaveEntitlementsListComponent_Template_select_ngModelChange_16_listener"));
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Template_select_ngModelChange_16_listener() {
      return ctx.onEmployeeChange();
    }, "LeaveEntitlementsListComponent_Template_select_ngModelChange_16_listener"));
    \u0275\u0275elementStart(17, "option", 9);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(19, LeaveEntitlementsListComponent_For_20_Template, 2, 2, "option", 9, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 10)(22, "label", 13);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "select", 14);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Template_select_ngModelChange_24_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.selectedVacationTypeId, $event) || (ctx.selectedVacationTypeId = $event);
      return $event;
    }, "LeaveEntitlementsListComponent_Template_select_ngModelChange_24_listener"));
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Template_select_ngModelChange_24_listener() {
      return ctx.onVacationTypeChange();
    }, "LeaveEntitlementsListComponent_Template_select_ngModelChange_24_listener"));
    \u0275\u0275elementStart(25, "option", 9);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(27, LeaveEntitlementsListComponent_For_28_Template, 2, 2, "option", 9, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 15)(30, "button", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Template_button_click_30_listener() {
      return ctx.clearFilters();
    }, "LeaveEntitlementsListComponent_Template_button_click_30_listener"));
    \u0275\u0275element(31, "i", 17);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(32, "app-data-table", 18);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Template_app_data_table_actionClick_32_listener($event) {
      return ctx.onActionClick($event);
    }, "LeaveEntitlementsListComponent_Template_app_data_table_actionClick_32_listener"))("pageChange", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Template_app_data_table_pageChange_32_listener($event) {
      return ctx.onPageChange($event);
    }, "LeaveEntitlementsListComponent_Template_app_data_table_pageChange_32_listener"))("pageSizeChange", /* @__PURE__ */ __name(function LeaveEntitlementsListComponent_Template_app_data_table_pageSizeChange_32_listener($event) {
      return ctx.onPageSizeChange($event);
    }, "LeaveEntitlementsListComponent_Template_app_data_table_pageSizeChange_32_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("leaveBalance.leaveEntitlements"))("subtitle", ctx.i18n.t("leaveBalance.leaveEntitlementsDescription"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.permissionService.has(ctx.PERMISSIONS.LEAVE_BALANCE_CREATE) ? 3 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("leaveBalance.year"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.selectedYear);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.availableYears());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("employees.employee"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.selectedEmployeeId);
    \u0275\u0275advance();
    \u0275\u0275property("value", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.i18n.t("common.all"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.employees());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx.i18n.t("vacationTypes.vacationType"), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.selectedVacationTypeId);
    \u0275\u0275advance();
    \u0275\u0275property("value", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.i18n.t("common.all"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.vacationTypes());
    \u0275\u0275advance(3);
    \u0275\u0275property("title", \u0275\u0275interpolate(ctx.i18n.t("common.clearFilters")))("disabled", !ctx.hasActiveFilters());
    \u0275\u0275advance(2);
    \u0275\u0275property("columns", ctx.tableColumns())("data", ctx.tableData())("actions", ctx.tableActions())("loading", ctx.loading())("currentPage", ctx.currentPage())("pageSize", ctx.pageSize())("totalItems", ctx.totalCount())("totalPages", ctx.totalPages())("emptyTitle", ctx.i18n.t("leaveBalance.noEntitlementsTitle"))("emptyMessage", ctx.i18n.t("leaveBalance.noEntitlementsMessage"));
  }
}, "LeaveEntitlementsListComponent_Template"), dependencies: [
  FormsModule,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  SelectControlValueAccessor,
  NgControlStatus,
  NgModel,
  DataTableComponent,
  PageHeaderComponent
], styles: ["\n\n.container-fluid[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\nh2[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-weight: 600;\n}\n.text-muted[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.card[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-select[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  border: 1px solid #ced4da;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #80bdff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  font-weight: 500;\n  padding: 0.5rem 1rem;\n  transition: all 0.15s ease-in-out;\n}\n.btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #0056b3;\n  border-color: #004085;\n}\n.btn-outline-primary[_ngcontent-%COMP%] {\n  color: #007bff;\n  border-color: #007bff;\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background-color: #007bff;\n  color: #fff;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #6c757d;\n  color: #fff;\n}\n.gap-2[_ngcontent-%COMP%] {\n  gap: 0.5rem;\n}\n.gap-3[_ngcontent-%COMP%] {\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .container-fluid[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.gap-2[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=leave-entitlements-list.component.css.map */"] }));
var LeaveEntitlementsListComponent = _LeaveEntitlementsListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeaveEntitlementsListComponent, [{
    type: Component,
    args: [{ selector: "app-leave-entitlements-list", standalone: true, imports: [
      FormsModule,
      DataTableComponent,
      PageHeaderComponent
    ], template: `<div class="container-fluid">\r
  <!-- Page Header -->\r
  <app-page-header\r
    [title]="i18n.t('leaveBalance.leaveEntitlements')"\r
    [subtitle]="i18n.t('leaveBalance.leaveEntitlementsDescription')">\r
    <ng-container actions>\r
      @if (permissionService.has(PERMISSIONS.LEAVE_BALANCE_CREATE)) {\r
        <button\r
          type="button"\r
          class="btn btn-outline-primary"\r
          (click)="openBulkUpload()">\r
          <i class="fa fa-upload me-2"></i>\r
          {{ i18n.t('leaveBalance.bulkUpload') }}\r
        </button>\r
        <button\r
          type="button"\r
          class="btn btn-primary"\r
          (click)="createEntitlement()">\r
          <i class="fa fa-plus me-2"></i>\r
          {{ i18n.t('leaveBalance.createEntitlement') }}\r
        </button>\r
      }\r
    </ng-container>\r
  </app-page-header>\r
\r
  <!-- Filters Card -->\r
  <div class="card mb-4">\r
    <div class="card-body">\r
      <div class="row g-3">\r
        <!-- Year Filter -->\r
        <div class="col-md-3">\r
          <label for="yearFilter" class="form-label">\r
            {{ i18n.t('leaveBalance.year') }}\r
          </label>\r
          <select\r
            id="yearFilter"\r
            class="form-select"\r
            [(ngModel)]="selectedYear"\r
            (ngModelChange)="onYearChange()">\r
            @for (year of availableYears(); track year) {\r
              <option [value]="year">{{ year }}</option>\r
            }\r
          </select>\r
        </div>\r
\r
        <!-- Employee Filter -->\r
        <div class="col-md-4">\r
          <label for="employeeFilter" class="form-label">\r
            {{ i18n.t('employees.employee') }}\r
          </label>\r
          <select\r
            id="employeeFilter"\r
            class="form-select"\r
            [(ngModel)]="selectedEmployeeId"\r
            (ngModelChange)="onEmployeeChange()">\r
            <option [value]="null">{{ i18n.t('common.all') }}</option>\r
            @for (employee of employees(); track employee.id) {\r
              <option [value]="employee.id">{{ employee.name }}</option>\r
            }\r
          </select>\r
        </div>\r
\r
        <!-- Vacation Type Filter -->\r
        <div class="col-md-4">\r
          <label for="vacationTypeFilter" class="form-label">\r
            {{ i18n.t('vacationTypes.vacationType') }}\r
          </label>\r
          <select\r
            id="vacationTypeFilter"\r
            class="form-select"\r
            [(ngModel)]="selectedVacationTypeId"\r
            (ngModelChange)="onVacationTypeChange()">\r
            <option [value]="null">{{ i18n.t('common.all') }}</option>\r
            @for (vacationType of vacationTypes(); track vacationType.id) {\r
              <option [value]="vacationType.id">{{ vacationType.name }}</option>\r
            }\r
          </select>\r
        </div>\r
\r
        <!-- Clear Filters Button -->\r
        <div class="col-md-1 d-flex align-items-end">\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary w-100"\r
            (click)="clearFilters()"\r
            [disabled]="!hasActiveFilters()"\r
            title="{{ i18n.t('common.clearFilters') }}">\r
            <i class="fa fa-times"></i>\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Data Table -->\r
  <app-data-table\r
    [columns]="tableColumns()"\r
    [data]="tableData()"\r
    [actions]="tableActions()"\r
    [loading]="loading()"\r
    [currentPage]="currentPage()"\r
    [pageSize]="pageSize()"\r
    [totalItems]="totalCount()"\r
    [totalPages]="totalPages()"\r
    [emptyTitle]="i18n.t('leaveBalance.noEntitlementsTitle')"\r
    [emptyMessage]="i18n.t('leaveBalance.noEntitlementsMessage')"\r
    (actionClick)="onActionClick($event)"\r
    (pageChange)="onPageChange($event)"\r
    (pageSizeChange)="onPageSizeChange($event)">\r
  </app-data-table>\r
</div>\r
`, styles: ["/* src/app/pages/settings/leave-balances/leave-entitlements-list/leave-entitlements-list.component.css */\n.container-fluid {\n  padding: 1.5rem;\n}\nh2 {\n  color: #2c3e50;\n  font-weight: 600;\n}\n.text-muted {\n  font-size: 0.9rem;\n}\n.card {\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.card-body {\n  padding: 1.25rem;\n}\n.form-label {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-select {\n  border-radius: 0.375rem;\n  border: 1px solid #ced4da;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-select:focus {\n  border-color: #80bdff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.btn {\n  border-radius: 0.375rem;\n  font-weight: 500;\n  padding: 0.5rem 1rem;\n  transition: all 0.15s ease-in-out;\n}\n.btn i {\n  font-size: 0.875rem;\n}\n.btn-primary {\n  background-color: #007bff;\n  border-color: #007bff;\n}\n.btn-primary:hover {\n  background-color: #0056b3;\n  border-color: #004085;\n}\n.btn-outline-primary {\n  color: #007bff;\n  border-color: #007bff;\n}\n.btn-outline-primary:hover {\n  background-color: #007bff;\n  color: #fff;\n}\n.btn-outline-secondary {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary:hover {\n  background-color: #6c757d;\n  color: #fff;\n}\n.gap-2 {\n  gap: 0.5rem;\n}\n.gap-3 {\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .container-fluid {\n    padding: 1rem;\n  }\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.gap-2 {\n    width: 100%;\n  }\n  .btn {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=leave-entitlements-list.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeaveEntitlementsListComponent, { className: "LeaveEntitlementsListComponent", filePath: "src/app/pages/settings/leave-balances/leave-entitlements-list/leave-entitlements-list.component.ts", lineNumber: 30 });
})();
export {
  LeaveEntitlementsListComponent
};
//# sourceMappingURL=chunk-WRTFWGD7.js.map
