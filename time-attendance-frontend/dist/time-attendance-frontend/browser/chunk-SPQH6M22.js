import {
  AttendanceService
} from "./chunk-UR7BACYI.js";
import {
  ShiftAssignmentService
} from "./chunk-EXGLHUX7.js";
import "./chunk-IP6EMSNR.js";
import {
  SearchableSelectComponent
} from "./chunk-2D23Y7U6.js";
import {
  BranchesService
} from "./chunk-Z44KTAEC.js";
import {
  DepartmentsService
} from "./chunk-OU7DT47F.js";
import {
  EmployeesService
} from "./chunk-5B6AVE4S.js";
import {
  DataTableComponent
} from "./chunk-JW5UYWPK.js";
import "./chunk-NKWUQBPB.js";
import {
  AttendanceStatus
} from "./chunk-XLGMY32C.js";
import {
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
import {
  LoadingSpinnerComponent
} from "./chunk-VATI3GP6.js";
import {
  PageHeaderComponent
} from "./chunk-V6PMR2EI.js";
import {
  FormsModule,
  NgSelectOption,
  ɵNgSelectMultipleOption
} from "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import {
  ActivatedRoute,
  Router,
  RouterModule
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
import {
  Component,
  computed,
  effect,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/attendance/daily/daily-attendance.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.value, "_forTrack0");
function DailyAttendanceComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 46)(2, "div")(3, "h5", 47);
    \u0275\u0275element(4, "i", 48);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small", 49);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 13)(9, "div", 50)(10, "div", 51)(11, "label", 16);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 17);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DailyAttendanceComponent_Conditional_15_Template_input_change_13_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onManualCalculationDateChange($event));
    }, "DailyAttendanceComponent_Conditional_15_Template_input_change_13_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 52)(15, "div", 53)(16, "button", 54);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DailyAttendanceComponent_Conditional_15_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generateMissingAttendanceForDate());
    }, "DailyAttendanceComponent_Conditional_15_Template_button_click_16_listener"));
    \u0275\u0275element(17, "i", 55);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 56);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DailyAttendanceComponent_Conditional_15_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.forceRecalculateAllForDate());
    }, "DailyAttendanceComponent_Conditional_15_Template_button_click_19_listener"));
    \u0275\u0275element(20, "i", 55);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "small", 57);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("attendance.manual_calculation.title"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("attendance.manual_calculation.subtitle"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("attendance.manual_calculation.select_date"));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.manualCalculationDate())("disabled", ctx_r1.calculatingBulk());
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.calculatingBulk())("title", ctx_r1.i18n.t("attendance.manual_calculation.generate_missing_help"));
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-plus", !ctx_r1.calculatingBulk())("fa-spinner", ctx_r1.calculatingBulk())("fa-spin", ctx_r1.calculatingBulk());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("attendance.manual_calculation.generate_missing"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.calculatingBulk())("title", ctx_r1.i18n.t("attendance.manual_calculation.recalculate_all_help"));
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-calculator", !ctx_r1.calculatingBulk())("fa-spinner", ctx_r1.calculatingBulk())("fa-spin", ctx_r1.calculatingBulk());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("attendance.manual_calculation.recalculate_all"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("attendance.manual_calculation.date_info").replace("{{date}}", ctx_r1.manualCalculationDate()), " ");
  }
}
__name(DailyAttendanceComponent_Conditional_15_Template, "DailyAttendanceComponent_Conditional_15_Template");
function DailyAttendanceComponent_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", status_r3.value === null ? "" : status_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t(status_r3.label), " ");
  }
}
__name(DailyAttendanceComponent_For_40_Template, "DailyAttendanceComponent_For_40_Template");
function DailyAttendanceComponent_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275element(1, "app-loading-spinner", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r1.i18n.t("attendance.messages.loading_data"))("variant", "primary")("centered", true);
  }
}
__name(DailyAttendanceComponent_Conditional_86_Template, "DailyAttendanceComponent_Conditional_86_Template");
function DailyAttendanceComponent_Conditional_87_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 62);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DailyAttendanceComponent_Conditional_87_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    }, "DailyAttendanceComponent_Conditional_87_Conditional_5_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r1.i18n.t("attendance.actions.try_with_filter"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("attendance.actions.add_filter"), " ");
  }
}
__name(DailyAttendanceComponent_Conditional_87_Conditional_5_Template, "DailyAttendanceComponent_Conditional_87_Conditional_5_Template");
function DailyAttendanceComponent_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 59)(2, "div");
    \u0275\u0275element(3, "i", 60);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, DailyAttendanceComponent_Conditional_87_Conditional_5_Template, 3, 2, "button", 61);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error(), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.hasActiveFilters() ? 5 : -1);
  }
}
__name(DailyAttendanceComponent_Conditional_87_Template, "DailyAttendanceComponent_Conditional_87_Template");
function DailyAttendanceComponent_Conditional_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275element(1, "i", 64);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "strong", 65);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 66)(6, "small", 49);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("attendance.hints.better_performance"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("attendance.hints.use_filters"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("attendance.hints.filter_help") || "Please select a Branch, Department, or Employee to view attendance records for today.", " ");
  }
}
__name(DailyAttendanceComponent_Conditional_88_Template, "DailyAttendanceComponent_Conditional_88_Template");
function DailyAttendanceComponent_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 67)(2, "label", 16);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 68);
    \u0275\u0275listener("input", /* @__PURE__ */ __name(function DailyAttendanceComponent_Conditional_89_Template_input_input_4_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSearchChange($event));
    }, "DailyAttendanceComponent_Conditional_89_Template_input_input_4_listener"));
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("attendance.filters.search"));
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r1.i18n.t("attendance.filters.search_placeholder"))("disabled", ctx_r1.loading());
  }
}
__name(DailyAttendanceComponent_Conditional_89_Template, "DailyAttendanceComponent_Conditional_89_Template");
function DailyAttendanceComponent_Conditional_90_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275element(1, "i", 74);
    \u0275\u0275elementStart(2, "h5", 49);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 49);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("attendance.no_records"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("attendance.no_records_description"));
  }
}
__name(DailyAttendanceComponent_Conditional_90_Conditional_9_Template, "DailyAttendanceComponent_Conditional_90_Conditional_9_Template");
function DailyAttendanceComponent_Conditional_90_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "app-data-table", 75);
    \u0275\u0275listener("sortChange", /* @__PURE__ */ __name(function DailyAttendanceComponent_Conditional_90_Conditional_10_Template_app_data_table_sortChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onSort($event));
    }, "DailyAttendanceComponent_Conditional_90_Conditional_10_Template_app_data_table_sortChange_1_listener"))("actionClick", /* @__PURE__ */ __name(function DailyAttendanceComponent_Conditional_90_Conditional_10_Template_app_data_table_actionClick_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onActionClick($event));
    }, "DailyAttendanceComponent_Conditional_90_Conditional_10_Template_app_data_table_actionClick_1_listener"))("pageChange", /* @__PURE__ */ __name(function DailyAttendanceComponent_Conditional_90_Conditional_10_Template_app_data_table_pageChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPageChange($event));
    }, "DailyAttendanceComponent_Conditional_90_Conditional_10_Template_app_data_table_pageChange_1_listener"))("pageSizeChange", /* @__PURE__ */ __name(function DailyAttendanceComponent_Conditional_90_Conditional_10_Template_app_data_table_pageSizeChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPageSizeChange($event));
    }, "DailyAttendanceComponent_Conditional_90_Conditional_10_Template_app_data_table_pageSizeChange_1_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx_r1.tableData())("columns", ctx_r1.tableColumns())("actions", ctx_r1.tableActions())("loading", ctx_r1.loading)("showPagination", true)("currentPage", ctx_r1.currentPage)("totalPages", ctx_r1.tableTotalPages)("totalItems", ctx_r1.tableTotalItems)("pageSize", ctx_r1.pageSize)("sortColumn", ctx_r1.sortColumn)("sortDirection", ctx_r1.sortDirection)("responsiveMode", "horizontal-scroll")("emptyMessage", ctx_r1.i18n.t("attendance.daily.no_records"));
  }
}
__name(DailyAttendanceComponent_Conditional_90_Conditional_10_Template, "DailyAttendanceComponent_Conditional_90_Conditional_10_Template");
function DailyAttendanceComponent_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "div", 69)(2, "div", 24)(3, "h5", 70);
    \u0275\u0275element(4, "i", 71);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 72);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 73);
    \u0275\u0275conditionalCreate(9, DailyAttendanceComponent_Conditional_90_Conditional_9_Template, 6, 2, "div", 41);
    \u0275\u0275conditionalCreate(10, DailyAttendanceComponent_Conditional_90_Conditional_10_Template, 2, 13, "div");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("attendance.daily_records"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.filteredRecords().length, " ", ctx_r1.i18n.t("attendance.records"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.filteredRecords().length === 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.filteredRecords().length > 0 ? 10 : -1);
  }
}
__name(DailyAttendanceComponent_Conditional_90_Template, "DailyAttendanceComponent_Conditional_90_Template");
var _DailyAttendanceComponent = class _DailyAttendanceComponent {
  attendanceService;
  employeesService;
  departmentsService;
  branchesService;
  shiftAssignmentService;
  i18n;
  notificationService;
  confirmationService;
  router;
  route;
  // Signals for reactive state management
  attendanceRecords = signal([], ...ngDevMode ? [{ debugName: "attendanceRecords" }] : []);
  selectedDate = signal((/* @__PURE__ */ new Date()).toISOString().split("T")[0], ...ngDevMode ? [{ debugName: "selectedDate" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  // Filter signals
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  selectedStatus = signal(null, ...ngDevMode ? [{ debugName: "selectedStatus" }] : []);
  selectedEmployeeId = signal(null, ...ngDevMode ? [{ debugName: "selectedEmployeeId" }] : []);
  selectedDepartmentId = signal(null, ...ngDevMode ? [{ debugName: "selectedDepartmentId" }] : []);
  selectedBranchId = signal(null, ...ngDevMode ? [{ debugName: "selectedBranchId" }] : []);
  // Manual calculation signals
  calculating = signal(false, ...ngDevMode ? [{ debugName: "calculating" }] : []);
  calculatingBulk = signal(false, ...ngDevMode ? [{ debugName: "calculatingBulk" }] : []);
  manualCalculationDate = signal((/* @__PURE__ */ new Date()).toISOString().split("T")[0], ...ngDevMode ? [{ debugName: "manualCalculationDate" }] : []);
  // Pagination and sorting signals
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  sortColumn = signal("", ...ngDevMode ? [{ debugName: "sortColumn" }] : []);
  sortDirection = signal("asc", ...ngDevMode ? [{ debugName: "sortDirection" }] : []);
  // Signals for data table component
  tableTotalPages = signal(1, ...ngDevMode ? [{ debugName: "tableTotalPages" }] : []);
  tableTotalItems = signal(0, ...ngDevMode ? [{ debugName: "tableTotalItems" }] : []);
  // Options for filters
  availableEmployees = signal([], ...ngDevMode ? [{ debugName: "availableEmployees" }] : []);
  availableDepartments = signal([], ...ngDevMode ? [{ debugName: "availableDepartments" }] : []);
  availableBranches = signal([], ...ngDevMode ? [{ debugName: "availableBranches" }] : []);
  loadingEmployees = signal(false, ...ngDevMode ? [{ debugName: "loadingEmployees" }] : []);
  loadingDepartments = signal(false, ...ngDevMode ? [{ debugName: "loadingDepartments" }] : []);
  loadingBranches = signal(false, ...ngDevMode ? [{ debugName: "loadingBranches" }] : []);
  // Computed values
  filteredRecords = computed(() => {
    const records = this.attendanceRecords();
    const search = this.searchTerm().toLowerCase();
    const status = this.selectedStatus();
    return records.filter((record) => {
      const matchesSearch = !search || record.employeeName.toLowerCase().includes(search) || record.employeeNumber.toLowerCase().includes(search);
      const normalizedRecordStatus = this.normalizeStatusValue(record.status);
      const matchesStatus = status === null || normalizedRecordStatus === status;
      return matchesSearch && matchesStatus;
    });
  }, ...ngDevMode ? [{ debugName: "filteredRecords" }] : []);
  // Sorted records
  sortedRecords = computed(() => {
    const records = [...this.filteredRecords()];
    const column = this.sortColumn();
    const direction = this.sortDirection();
    if (!column)
      return records;
    return records.sort((a, b) => {
      let aValue = this.getValueForSorting(a, column);
      let bValue = this.getValueForSorting(b, column);
      if (aValue == null && bValue == null)
        return 0;
      if (aValue == null)
        return direction === "asc" ? 1 : -1;
      if (bValue == null)
        return direction === "asc" ? -1 : 1;
      if (typeof aValue === "string")
        aValue = aValue.toLowerCase();
      if (typeof bValue === "string")
        bValue = bValue.toLowerCase();
      if (aValue < bValue)
        return direction === "asc" ? -1 : 1;
      if (aValue > bValue)
        return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, ...ngDevMode ? [{ debugName: "sortedRecords" }] : []);
  // Pagination computed values
  totalItems = computed(() => this.sortedRecords().length, ...ngDevMode ? [{ debugName: "totalItems" }] : []);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()), ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // Paginated records
  paginatedRecords = computed(() => {
    const records = this.sortedRecords();
    const page = this.currentPage();
    const size = this.pageSize();
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    return records.slice(startIndex, endIndex);
  }, ...ngDevMode ? [{ debugName: "paginatedRecords" }] : []);
  // Statistics computed from filtered records
  totalEmployees = computed(() => this.filteredRecords().length, ...ngDevMode ? [{ debugName: "totalEmployees" }] : []);
  presentEmployees = computed(() => this.filteredRecords().filter((r) => this.normalizeStatusValue(r.status) === AttendanceStatus.Present).length, ...ngDevMode ? [{ debugName: "presentEmployees" }] : []);
  absentEmployees = computed(() => this.filteredRecords().filter((r) => this.normalizeStatusValue(r.status) === AttendanceStatus.Absent).length, ...ngDevMode ? [{ debugName: "absentEmployees" }] : []);
  lateEmployees = computed(() => this.filteredRecords().filter((r) => this.calculateTotalLateMinutes(r) > 0).length, ...ngDevMode ? [{ debugName: "lateEmployees" }] : []);
  // Computed select options
  employeeSelectOptions = computed(() => {
    const options = [
      { value: null, label: this.i18n.t("attendance.filters.all_employees") }
    ];
    this.availableEmployees().forEach((employee) => {
      options.push({
        value: employee.id,
        label: employee.name,
        subLabel: employee.employeeNumber
      });
    });
    return options;
  }, ...ngDevMode ? [{ debugName: "employeeSelectOptions" }] : []);
  departmentSelectOptions = computed(() => {
    const options = [
      { value: null, label: this.i18n.t("attendance.filters.all_departments") }
    ];
    this.availableDepartments().forEach((department) => {
      options.push({
        value: department.id,
        label: department.name,
        subLabel: department.nameAr || ""
      });
    });
    return options;
  }, ...ngDevMode ? [{ debugName: "departmentSelectOptions" }] : []);
  branchSelectOptions = computed(() => {
    const options = [
      { value: null, label: this.i18n.t("attendance.filters.all_branches") }
    ];
    this.availableBranches().forEach((branch) => {
      options.push({
        value: branch.id,
        label: branch.name,
        subLabel: branch.code
      });
    });
    return options;
  }, ...ngDevMode ? [{ debugName: "branchSelectOptions" }] : []);
  // Constants for template
  AttendanceStatus = AttendanceStatus;
  availableStatuses = [
    { value: null, label: "attendance.filters.all_statuses" },
    { value: AttendanceStatus.Present, label: "attendance.status.present" },
    { value: AttendanceStatus.Absent, label: "attendance.status.absent" },
    { value: AttendanceStatus.Late, label: "attendance.status.late" },
    { value: AttendanceStatus.EarlyLeave, label: "attendance.status.early_leave" },
    { value: AttendanceStatus.OnLeave, label: "attendance.status.on_leave" },
    { value: AttendanceStatus.Overtime, label: "attendance.status.overtime" }
  ];
  // Data table configuration - using computed to avoid change detection issues
  tableColumns = computed(() => [
    {
      key: "employeeNumber",
      label: this.i18n.t("attendance.fields.employee_number"),
      sortable: true,
      width: "120px",
      priority: "high",
      mobileLabel: this.i18n.t("attendance.fields.emp_no")
    },
    {
      key: "employeeName",
      label: this.i18n.t("attendance.fields.employee_name"),
      sortable: true,
      width: "200px",
      priority: "high",
      mobileLabel: this.i18n.t("attendance.fields.name")
    },
    {
      key: "status",
      label: this.i18n.t("attendance.fields.status"),
      sortable: true,
      width: "120px",
      align: "center",
      priority: "high",
      mobileLabel: this.i18n.t("attendance.fields.status"),
      renderHtml: true
    },
    {
      key: "checkIn",
      label: this.i18n.t("attendance.fields.check_in"),
      sortable: false,
      width: "100px",
      align: "center",
      priority: "medium",
      mobileLabel: this.i18n.t("attendance.fields.in")
    },
    {
      key: "checkOut",
      label: this.i18n.t("attendance.fields.check_out"),
      sortable: false,
      width: "100px",
      align: "center",
      priority: "medium",
      mobileLabel: this.i18n.t("attendance.fields.out")
    },
    {
      key: "workingHours",
      label: this.i18n.t("attendance.fields.working_hours"),
      sortable: true,
      width: "120px",
      align: "center",
      priority: "medium",
      hideOnMobile: false,
      mobileLabel: this.i18n.t("attendance.fields.work_hrs")
    },
    {
      key: "scheduledHours",
      label: this.i18n.t("attendance.fields.scheduled_hours"),
      sortable: true,
      width: "120px",
      align: "center",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.i18n.t("attendance.fields.sched_hrs")
    },
    {
      key: "overtimeHours",
      label: this.i18n.t("attendance.fields.overtime_hours"),
      sortable: true,
      width: "120px",
      align: "center",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.i18n.t("attendance.fields.overtime")
    },
    {
      key: "lateMinutes",
      label: this.i18n.t("attendance.fields.late_minutes"),
      sortable: true,
      width: "90px",
      align: "center",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.i18n.t("attendance.fields.late")
    },
    {
      key: "earlyLeaveMinutes",
      label: this.i18n.t("attendance.fields.early_leave_minutes"),
      sortable: true,
      width: "90px",
      align: "center",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.i18n.t("attendance.fields.early")
    },
    {
      key: "totalLateMinutes",
      label: this.i18n.t("attendance.fields.total_late"),
      sortable: true,
      width: "90px",
      align: "center",
      priority: "medium",
      hideOnMobile: false,
      mobileLabel: this.i18n.t("attendance.fields.total_late")
    }
  ], ...ngDevMode ? [{ debugName: "tableColumns" }] : []);
  tableActions = computed(() => [
    {
      key: "view",
      label: this.i18n.t("attendance.actions.view_details"),
      icon: "fa-eye",
      color: "primary",
      condition: /* @__PURE__ */ __name(() => true, "condition")
    },
    {
      key: "edit",
      label: this.i18n.t("attendance.actions.edit_record"),
      icon: "fa-edit",
      color: "secondary",
      condition: /* @__PURE__ */ __name(() => true, "condition")
    },
    {
      key: "change-shift",
      label: this.i18n.t("attendance.actions.change_shift"),
      icon: "fa-clock",
      color: "warning",
      condition: /* @__PURE__ */ __name(() => true, "condition")
    },
    {
      key: "recalculate",
      label: this.i18n.t("attendance.actions.recalculate"),
      icon: "fa-calculator",
      color: "info",
      condition: /* @__PURE__ */ __name(() => true, "condition")
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  constructor(attendanceService, employeesService, departmentsService, branchesService, shiftAssignmentService, i18n, notificationService, confirmationService, router, route) {
    this.attendanceService = attendanceService;
    this.employeesService = employeesService;
    this.departmentsService = departmentsService;
    this.branchesService = branchesService;
    this.shiftAssignmentService = shiftAssignmentService;
    this.i18n = i18n;
    this.notificationService = notificationService;
    this.confirmationService = confirmationService;
    this.router = router;
    this.route = route;
    effect(() => {
      this.tableTotalPages.set(this.totalPages());
      this.tableTotalItems.set(this.totalItems());
    });
  }
  /**
   * Calculate attendance rate percentage for current records
   */
  getAttendanceRatePercentage() {
    const records = this.filteredRecords();
    const totalRecords = records.length;
    if (totalRecords === 0) {
      return 0;
    }
    const presentRecords = records.filter((r) => {
      const normalizedStatus = this.normalizeStatusValue(r.status);
      return normalizedStatus === AttendanceStatus.Present || normalizedStatus === AttendanceStatus.Late || normalizedStatus === AttendanceStatus.Overtime;
    }).length;
    return Math.round(presentRecords / totalRecords * 100);
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const dateParam = params["date"];
      if (dateParam) {
        this.selectedDate.set(dateParam);
        this.manualCalculationDate.set(dateParam);
      }
    });
    this.loadFilterOptions();
    this.checkInitialLoad();
  }
  /**
   * Check if we should load data initially or show filter warning
   */
  checkInitialLoad() {
    this.loading.set(true);
    this.error.set(null);
    const date = this.selectedDate();
    console.log("=== DEBUG: Initial load attempt ===");
    console.log("Date:", date);
    this.attendanceService.getDailyAttendance(date).subscribe({
      next: /* @__PURE__ */ __name((records) => {
        console.log("=== DEBUG: Initial load successful ===");
        console.log("Records count:", records.length);
        this.attendanceRecords.set(records);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.log("=== DEBUG: Initial load failed (expected if filters required) ===");
        console.log("Error:", error);
        if (error?.status === 400 && (error?.error?.includes?.("filter") || error?.error?.includes?.("must be specified"))) {
          this.loading.set(false);
          this.error.set(null);
          this.attendanceRecords.set([]);
        } else {
          let errorMessage = this.getDetailedErrorMessage(error);
          this.error.set(errorMessage);
          this.loading.set(false);
          this.notificationService.error(errorMessage);
        }
      }, "error")
    });
  }
  ngOnDestroy() {
  }
  /**
   * Load daily attendance records for selected date
   */
  loadDailyAttendance() {
    this.loading.set(true);
    this.error.set(null);
    const date = this.selectedDate();
    const branchId = this.selectedBranchId();
    const departmentId = this.selectedDepartmentId();
    const employeeId = this.selectedEmployeeId();
    console.log("=== DEBUG: Loading daily attendance ===");
    console.log("Date:", date);
    console.log("Branch ID:", branchId);
    console.log("Department ID:", departmentId);
    console.log("Employee ID:", employeeId);
    console.log("Current records before loading:", this.attendanceRecords().length);
    this.attendanceService.getDailyAttendance(date, branchId || void 0, departmentId || void 0, employeeId || void 0).subscribe({
      next: /* @__PURE__ */ __name((records) => {
        console.log("=== DEBUG: Received attendance records ===");
        console.log("Records count:", records.length);
        console.log("Records data:", records);
        if (records.length > 0) {
          const firstRecord = records[0];
          console.log("=== DEBUG: First record time fields ===");
          console.log("checkInTime:", firstRecord.checkInTime);
          console.log("checkOutTime:", firstRecord.checkOutTime);
          console.log("actualCheckInTime:", firstRecord.actualCheckInTime);
          console.log("actualCheckOutTime:", firstRecord.actualCheckOutTime);
          console.log("scheduledStartTime:", firstRecord.scheduledStartTime);
          console.log("scheduledEndTime:", firstRecord.scheduledEndTime);
        }
        this.attendanceRecords.set(records);
        this.loading.set(false);
        console.log("Records after setting:", this.attendanceRecords().length);
        console.log("Filtered records count:", this.filteredRecords().length);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("=== DEBUG: Error loading daily attendance ===");
        console.error("Error object:", error);
        console.error("Error status:", error?.status);
        console.error("Error message:", error?.message);
        console.error("Error error:", error?.error);
        let errorMessage = this.getDetailedErrorMessage(error);
        this.error.set(errorMessage);
        this.loading.set(false);
        this.notificationService.error(errorMessage);
      }, "error")
    });
  }
  /**
   * Handle date change
   */
  onDateChange(event) {
    const target = event.target;
    this.selectedDate.set(target.value);
    this.loadDailyAttendance();
  }
  /**
   * Handle search input change
   */
  onSearchChange(event) {
    const target = event.target;
    this.searchTerm.set(target.value);
  }
  /**
   * Handle status filter change
   */
  onStatusChange(event) {
    const target = event.target;
    const value = target.value === "" ? null : parseInt(target.value);
    this.selectedStatus.set(value);
  }
  /**
   * Handle employee filter change from searchable select
   */
  onEmployeeSelectionChange(employeeId) {
    this.selectedEmployeeId.set(employeeId);
    this.loadDailyAttendance();
    if (employeeId === null && this.selectedBranchId()) {
      this.loadEmployeesForBranch(this.selectedBranchId());
    }
  }
  /**
   * Handle department filter change from searchable select
   */
  onDepartmentSelectionChange(departmentId) {
    this.selectedDepartmentId.set(departmentId);
    this.loadDailyAttendance();
  }
  /**
   * Handle branch filter change from searchable select
   */
  onBranchSelectionChange(branchId) {
    this.selectedBranchId.set(branchId);
    this.loadDailyAttendance();
    this.selectedEmployeeId.set(null);
    if (branchId) {
      this.loadEmployeesForBranch(branchId);
    } else {
      this.loadEmployeesForBranch();
    }
  }
  /**
   * Load employees for a specific branch (permission-based)
   */
  loadEmployeesForBranch(branchId) {
    this.loadingEmployees.set(true);
    this.employeesService.getEmployeesForSelection(branchId).subscribe({
      next: /* @__PURE__ */ __name((employees) => {
        this.availableEmployees.set(employees);
        this.loadingEmployees.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading employees for branch:", error);
        this.loadingEmployees.set(false);
      }, "error")
    });
  }
  /**
   * Load filter options from API with permission-based access
   */
  loadFilterOptions() {
    this.loadingEmployees.set(true);
    this.employeesService.getEmployeesForSelection().subscribe({
      next: /* @__PURE__ */ __name((employees) => {
        this.availableEmployees.set(employees);
        this.loadingEmployees.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading employees:", error);
        this.loadingEmployees.set(false);
      }, "error")
    });
    this.loadingDepartments.set(true);
    this.departmentsService.getDepartments({}).subscribe({
      next: /* @__PURE__ */ __name((departments) => {
        this.availableDepartments.set(departments);
        this.loadingDepartments.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading departments:", error);
        this.loadingDepartments.set(false);
      }, "error")
    });
    this.loadingBranches.set(true);
    this.branchesService.getBranches(1, 1e3).subscribe({
      next: /* @__PURE__ */ __name((result) => {
        this.availableBranches.set(result.items);
        this.loadingBranches.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Error loading branches:", error);
        this.loadingBranches.set(false);
      }, "error")
    });
  }
  // Status map for normalizing string enum values from API
  statusMap = {
    "Present": AttendanceStatus.Present,
    "Absent": AttendanceStatus.Absent,
    "Late": AttendanceStatus.Late,
    "EarlyLeave": AttendanceStatus.EarlyLeave,
    "OnLeave": AttendanceStatus.OnLeave,
    "DayOff": AttendanceStatus.DayOff,
    "Overtime": AttendanceStatus.Overtime,
    "Incomplete": AttendanceStatus.Incomplete,
    "Holiday": AttendanceStatus.Holiday,
    "SickLeave": AttendanceStatus.SickLeave,
    "Pending": AttendanceStatus.Pending,
    "OnDuty": AttendanceStatus.OnDuty,
    "Excused": AttendanceStatus.Excused,
    "RemoteWork": AttendanceStatus.RemoteWork
  };
  /**
   * Normalize status value to handle both string and numeric enum values
   * API returns strings due to JsonStringEnumConverter
   */
  normalizeStatusValue = /* @__PURE__ */ __name((status) => {
    if (typeof status === "number") {
      return status;
    }
    return this.statusMap[status] ?? AttendanceStatus.Pending;
  }, "normalizeStatusValue");
  /**
   * Wrapper method for normalizeStatusValue
   */
  normalizeStatus(status) {
    return this.normalizeStatusValue(status);
  }
  /**
   * Get status badge class for attendance status
   */
  getStatusBadgeClass(status) {
    const normalizedStatus = this.normalizeStatus(status);
    switch (normalizedStatus) {
      case AttendanceStatus.Present:
        return "badge bg-success";
      case AttendanceStatus.Absent:
        return "badge bg-danger";
      case AttendanceStatus.Late:
        return "badge bg-warning";
      case AttendanceStatus.EarlyLeave:
        return "badge bg-warning";
      case AttendanceStatus.OnLeave:
        return "badge bg-info";
      case AttendanceStatus.DayOff:
        return "badge bg-secondary";
      case AttendanceStatus.Overtime:
        return "badge bg-primary";
      case AttendanceStatus.Incomplete:
        return "badge bg-danger";
      case AttendanceStatus.Holiday:
        return "badge bg-secondary";
      case AttendanceStatus.SickLeave:
        return "badge bg-warning";
      case AttendanceStatus.OnDuty:
        return "badge bg-info";
      case AttendanceStatus.Excused:
        return "badge bg-info";
      case AttendanceStatus.RemoteWork:
        return "badge bg-primary";
      default:
        return "badge bg-secondary";
    }
  }
  /**
   * Get status text translation key
   */
  getStatusText(status) {
    const normalizedStatus = this.normalizeStatus(status);
    switch (normalizedStatus) {
      case AttendanceStatus.Present:
        return "attendance.status.present";
      case AttendanceStatus.Absent:
        return "attendance.status.absent";
      case AttendanceStatus.Late:
        return "attendance.status.late";
      case AttendanceStatus.EarlyLeave:
        return "attendance.status.early_leave";
      case AttendanceStatus.OnLeave:
        return "attendance.status.on_leave";
      case AttendanceStatus.DayOff:
        return "attendance.status.day_off";
      case AttendanceStatus.Overtime:
        return "attendance.status.overtime";
      case AttendanceStatus.Incomplete:
        return "attendance.status.incomplete";
      case AttendanceStatus.Holiday:
        return "attendance.status.holiday";
      case AttendanceStatus.SickLeave:
        return "attendance.status.sick_leave";
      case AttendanceStatus.Pending:
        return "attendance.status.pending";
      case AttendanceStatus.OnDuty:
        return "attendance.status.on_duty";
      case AttendanceStatus.Excused:
        return "attendance.status.excused";
      case AttendanceStatus.RemoteWork:
        return "attendance.status.remote_work";
      default:
        return "attendance.status.pending";
    }
  }
  /**
   * Format time for display
   */
  formatTime(time) {
    if (!time)
      return "--:--";
    try {
      let timeToFormat = time;
      if (time.includes("T")) {
        const timePart = time.split("T")[1];
        timeToFormat = timePart.split("Z")[0];
      }
      if (timeToFormat.includes(":")) {
        const date = /* @__PURE__ */ new Date(`1970-01-01T${timeToFormat}`);
        if (!isNaN(date.getTime())) {
          return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          });
        }
      }
      return timeToFormat;
    } catch {
      return time || "--:--";
    }
  }
  /**
   * Get check-in time with fallback to actual check-in time
   */
  getCheckInTime(record) {
    return record.checkInTime || record.actualCheckInTime || null;
  }
  /**
   * Get check-out time with fallback to actual check-out time
   */
  getCheckOutTime(record) {
    return record.checkOutTime || record.actualCheckOutTime || null;
  }
  /**
   * Format hours (convert decimal hours to hours and minutes)
   */
  formatHours(hours) {
    if (!hours || hours === 0)
      return "0h 0m";
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (wholeHours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${wholeHours}h`;
    } else {
      return `${wholeHours}h ${minutes}m`;
    }
  }
  /**
   * Format late time from minutes
   */
  formatLateTime(lateMinutes) {
    if (!lateMinutes || lateMinutes === 0)
      return "--";
    const hours = Math.floor(lateMinutes / 60);
    const minutes = lateMinutes % 60;
    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }
  /**
   * Calculate total late minutes (late arrival + early departure)
   */
  calculateTotalLateMinutes(record) {
    const lateMinutes = record.lateMinutes || 0;
    const earlyLeaveMinutes = record.earlyLeaveMinutes || 0;
    return lateMinutes + earlyLeaveMinutes;
  }
  /**
   * Format status for table display with badge styling
   */
  formatStatusForTable(status) {
    const statusText = this.i18n.t(this.getStatusText(status));
    const badgeClass = this.getStatusBadgeClass(status);
    return `<span class="${badgeClass}">${statusText}</span>`;
  }
  /**
   * Get CSS class for working hours based on comparison with scheduled hours
   */
  getWorkingHoursClass(workingHours, scheduledHours) {
    if (!workingHours || !scheduledHours)
      return "text-muted";
    if (workingHours >= scheduledHours) {
      return "text-success";
    } else if (workingHours >= scheduledHours * 0.8) {
      return "text-warning";
    } else {
      return "text-danger";
    }
  }
  /**
   * Get CSS class for late time display
   */
  getLateTimeClass(lateMinutes) {
    if (!lateMinutes || lateMinutes === 0)
      return "text-muted";
    if (lateMinutes <= 15) {
      return "text-warning";
    } else {
      return "text-danger";
    }
  }
  /**
   * Navigate to daily attendance detail page for specific employee and date
   */
  viewDailyAttendanceDetail(employeeId) {
    this.router.navigate(["/attendance/daily-detail", employeeId, this.selectedDate()]);
  }
  /**
   * Navigate to employee attendance detail page
   */
  viewEmployeeDetail(employeeId) {
    this.router.navigate(["/attendance/employee", employeeId]);
  }
  /**
   * Navigate to edit attendance record page
   */
  editAttendanceRecord(record) {
    this.router.navigate(["/attendance/edit", record.id], {
      queryParams: { returnDate: this.selectedDate() }
    });
  }
  /**
   * Handle table sort event
   */
  onSort(event) {
    this.sortColumn.set(event.column);
    this.sortDirection.set(event.direction);
    this.currentPage.set(1);
  }
  /**
   * Handle page change event
   */
  onPageChange(page) {
    this.currentPage.set(page);
  }
  /**
   * Handle page size change event
   */
  onPageSizeChange(size) {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }
  /**
   * Get value for sorting
   */
  getValueForSorting(record, column) {
    switch (column) {
      case "employeeNumber":
        return record.employeeNumber;
      case "employeeName":
        return record.employeeName;
      case "status":
        return record.status || 0;
      case "workingHours":
        return record.workingHours || 0;
      case "scheduledHours":
        return record.scheduledHours || 0;
      case "lateMinutes":
        return record.lateMinutes || 0;
      default:
        return record[column];
    }
  }
  /**
   * Handle table action clicks
   */
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.viewDailyAttendanceDetail(item.employeeId);
        break;
      case "edit":
        this.editAttendanceRecord(item);
        break;
      case "change-shift":
        this.router.navigate(["/attendance", item.id, "change-shift"]);
        break;
      case "recalculate":
        this.recalculateEmployeeAttendance(item.employeeId);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  /**
   * Transform attendance records for data table - using computed to avoid refresh issues
   */
  tableData = computed(() => {
    return this.paginatedRecords().map((record) => __spreadProps(__spreadValues({}, record), {
      status: this.formatStatusForTable(record.status),
      checkIn: this.formatTime(this.getCheckInTime(record)),
      checkOut: this.formatTime(this.getCheckOutTime(record)),
      workingHours: this.formatHours(record.workingHours),
      scheduledHours: this.formatHours(record.scheduledHours),
      overtimeHours: this.formatHours(record.overtimeHours),
      lateMinutes: this.formatLateTime(record.lateMinutes),
      earlyLeaveMinutes: this.formatLateTime(record.earlyLeaveMinutes),
      totalLateMinutes: this.formatLateTime(this.calculateTotalLateMinutes(record))
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  /**
   * Export daily attendance data
   */
  exportData() {
    const records = this.filteredRecords();
    if (records.length === 0) {
      this.notificationService.warning("No data to export");
      return;
    }
    const csvContent = this.generateCSV(records);
    this.downloadCSV(csvContent, `daily-attendance-${this.selectedDate()}.csv`);
    this.notificationService.success("Data exported successfully");
  }
  /**
   * Generate CSV content from records
   */
  generateCSV(records) {
    const headers = [
      "Employee Number",
      "Employee Name",
      "Status",
      "Check In",
      "Check Out",
      "Working Hours",
      "Scheduled Hours",
      "Overtime Hours",
      "Late Minutes",
      "Early Leave Minutes",
      "Total Late"
    ];
    const rows = records.map((record) => [
      record.employeeNumber,
      record.employeeName,
      this.i18n.t(this.getStatusText(record.status)),
      this.formatTime(this.getCheckInTime(record)),
      this.formatTime(this.getCheckOutTime(record)),
      this.formatHours(record.workingHours),
      this.formatHours(record.scheduledHours),
      this.formatHours(record.overtimeHours),
      this.formatLateTime(record.lateMinutes),
      this.formatLateTime(record.earlyLeaveMinutes),
      this.formatLateTime(this.calculateTotalLateMinutes(record))
    ]);
    return [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
  }
  /**
   * Download CSV file
   */
  downloadCSV(content, filename) {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== void 0) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  /**
   * Manual refresh button
   */
  onRefresh() {
    this.loadDailyAttendance();
  }
  /**
   * Track by function for ngFor
   */
  trackByEmployeeId(index, record) {
    return record.employeeId;
  }
  /**
   * Get detailed error message based on error response
   */
  getDetailedErrorMessage(error) {
    if (error?.status === 400) {
      if (error?.error && typeof error.error === "string") {
        if (error.error.includes("At least one filter") || error.error.includes("must be specified")) {
          return "To view attendance records, please select at least one filter: Employee, Department, or Branch. You can also contact your administrator if you need access to view all records.";
        }
        return error.error;
      }
      return "Please select at least one filter (Employee, Department, or Branch) to view attendance records.";
    }
    if (error?.status === 403) {
      return "You do not have permission to view attendance records. Please contact your administrator.";
    }
    if (error?.status === 404) {
      return "No attendance records found for the selected criteria.";
    }
    if (error?.status === 500) {
      return "Server error occurred while loading attendance records. Please try again or contact support.";
    }
    if (error?.error && typeof error.error === "string") {
      return error.error;
    }
    if (error?.message) {
      return error.message;
    }
    return "Failed to load daily attendance records. Please try again.";
  }
  /**
   * Check if any filter is applied
   */
  hasActiveFilters() {
    return !!(this.selectedEmployeeId() || this.selectedDepartmentId() || this.selectedBranchId());
  }
  /**
   * Clear all filters
   */
  clearFilters() {
    this.selectedEmployeeId.set(null);
    this.selectedDepartmentId.set(null);
    this.selectedBranchId.set(null);
    this.selectedStatus.set(null);
    this.searchTerm.set("");
    const selects = document.querySelectorAll("select");
    selects.forEach((select) => select.value = "");
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput)
      searchInput.value = "";
    this.loadEmployeesForBranch();
    this.loadDailyAttendance();
  }
  // ====================================================================
  // ENHANCED MANUAL CALCULATION METHODS
  // ====================================================================
  /**
   * Manually calculate attendance for a specific employee on the selected date
   */
  recalculateEmployeeAttendance(employeeId) {
    return __async(this, null, function* () {
      const date = this.selectedDate();
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("attendance.actions.recalculate"),
        message: this.i18n.t("attendance.confirmations.recalculate_employee"),
        confirmText: this.i18n.t("app.confirm"),
        cancelText: this.i18n.t("app.cancel"),
        confirmButtonClass: "btn-info",
        icon: "fa-calculator",
        iconClass: "text-info"
      });
      if (!result.confirmed) {
        return;
      }
      this.calculating.set(true);
      this.attendanceService.calculateAttendanceForEmployeeDate(employeeId, date).subscribe({
        next: /* @__PURE__ */ __name((updatedRecord) => {
          const records = this.attendanceRecords();
          const index = records.findIndex((r) => r.employeeId === employeeId);
          if (index !== -1) {
            const updatedRecords = [...records];
            updatedRecords[index] = updatedRecord;
            this.attendanceRecords.set(updatedRecords);
          }
          this.calculating.set(false);
          this.notificationService.success(this.i18n.t("attendance.messages.recalculation_success"));
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Error recalculating attendance:", error);
          this.calculating.set(false);
          let errorMessage = "Failed to recalculate attendance";
          if (error?.error && typeof error.error === "string") {
            errorMessage = error.error;
          }
          this.notificationService.error(errorMessage);
        }, "error")
      });
    });
  }
  /**
   * Manually calculate attendance for all employees on the selected date
   */
  calculateAllEmployees(forceRecalculate = false) {
    this.calculateAllEmployeesForDate(this.selectedDate(), forceRecalculate);
  }
  /**
   * Manually calculate attendance for all employees on a specific date
   */
  calculateAllEmployeesForDate(date, forceRecalculate = false) {
    return __async(this, null, function* () {
      const actionTitle = forceRecalculate ? this.i18n.t("attendance.actions.recalculate_all") : this.i18n.t("attendance.actions.generate_missing");
      const confirmMessage = forceRecalculate ? this.i18n.t("attendance.confirmations.recalculate_all").replace("{{date}}", date) : this.i18n.t("attendance.confirmations.generate_missing").replace("{{date}}", date);
      const result = yield this.confirmationService.confirm({
        title: actionTitle,
        message: confirmMessage,
        confirmText: this.i18n.t("app.confirm"),
        cancelText: this.i18n.t("app.cancel"),
        confirmButtonClass: forceRecalculate ? "btn-warning" : "btn-info",
        icon: forceRecalculate ? "fa-calculator" : "fa-plus",
        iconClass: forceRecalculate ? "text-warning" : "text-info"
      });
      if (!result.confirmed) {
        return;
      }
      this.calculatingBulk.set(true);
      const branchId = this.selectedBranchId();
      this.attendanceService.calculateAttendanceForDate(date, forceRecalculate, branchId).subscribe({
        next: /* @__PURE__ */ __name((result2) => {
          this.calculatingBulk.set(false);
          const successMessage = this.i18n.t("attendance.messages.bulk_calculation_success").replace("{{generated}}", result2.recordsGenerated.toString()).replace("{{updated}}", result2.recordsUpdated.toString()).replace("{{date}}", date);
          this.notificationService.success(successMessage);
          if (date === this.selectedDate()) {
            this.loadDailyAttendance();
          }
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Error calculating attendance for all employees:", error);
          this.calculatingBulk.set(false);
          let errorMessage = this.i18n.t("attendance.messages.calculation_failed");
          if (error?.error && typeof error.error === "string") {
            errorMessage = error.error;
          }
          this.notificationService.error(errorMessage);
        }, "error")
      });
    });
  }
  /**
   * Force recalculate all employees (with existing records)
   */
  forceRecalculateAll() {
    this.calculateAllEmployees(true);
  }
  /**
   * Generate attendance for employees without records
   */
  generateMissingAttendance() {
    this.calculateAllEmployees(false);
  }
  /**
   * Manual calculation for specific date (generate missing records)
   */
  generateMissingAttendanceForDate() {
    this.calculateAllEmployeesForDate(this.manualCalculationDate(), false);
  }
  /**
   * Manual calculation for specific date (force recalculate all)
   */
  forceRecalculateAllForDate() {
    this.calculateAllEmployeesForDate(this.manualCalculationDate(), true);
  }
  /**
   * Update manual calculation date
   */
  onManualCalculationDateChange(event) {
    const input = event.target;
    this.manualCalculationDate.set(input.value);
  }
  /**
   * Check if manual calculation features should be enabled (admin/manager permissions)
   */
  canManuallyCalculate() {
    return true;
  }
  /**
   * Check if any employee has incomplete status that might benefit from recalculation
   */
  hasIncompleteRecords() {
    return this.filteredRecords().some((record) => {
      const normalizedStatus = this.normalizeStatusValue(record.status);
      return normalizedStatus === AttendanceStatus.Incomplete || normalizedStatus === AttendanceStatus.Pending;
    });
  }
  /**
   * Get count of employees without attendance records (for information)
   */
  getMissingRecordsInfo() {
    const totalExpected = this.availableEmployees().length;
    const currentRecords = this.attendanceRecords().length;
    const missing = Math.max(0, totalExpected - currentRecords);
    if (missing > 0) {
      return this.i18n.t("attendance.info.missing_records").replace("{{count}}", missing.toString());
    }
    return "";
  }
};
__name(_DailyAttendanceComponent, "DailyAttendanceComponent");
__publicField(_DailyAttendanceComponent, "\u0275fac", /* @__PURE__ */ __name(function DailyAttendanceComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DailyAttendanceComponent)(\u0275\u0275directiveInject(AttendanceService), \u0275\u0275directiveInject(EmployeesService), \u0275\u0275directiveInject(DepartmentsService), \u0275\u0275directiveInject(BranchesService), \u0275\u0275directiveInject(ShiftAssignmentService), \u0275\u0275directiveInject(I18nService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(ConfirmationService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute));
}, "DailyAttendanceComponent_Factory"));
__publicField(_DailyAttendanceComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DailyAttendanceComponent, selectors: [["app-daily-attendance"]], decls: 91, vars: 49, consts: [[1, "container-fluid", "p-4"], [3, "title"], [1, "row", "mb-4"], [1, "col-12"], [1, "d-flex", "justify-content-end", "align-items-center"], ["type", "button", 1, "btn", "btn-outline-secondary", "me-2", 3, "click", "disabled", "title"], [1, "fa-solid", "fa-filter-circle-xmark", "me-2"], ["type", "button", 1, "btn", "btn-outline-primary", "me-2", 3, "click", "disabled"], [1, "fa-solid", "fa-refresh", "me-2"], ["type", "button", 1, "btn", "btn-success", 3, "click", "disabled"], [1, "fa-solid", "fa-download", "me-2"], [1, "card", "mb-4", "border-info"], [1, "card", "mb-4"], [1, "card-body"], [1, "row", "g-3"], [1, "col-md-2"], [1, "form-label"], ["type", "date", 1, "form-control", 3, "change", "value", "disabled"], [3, "selectionChange", "options", "loading", "disabled", "placeholder", "clearable", "value"], [3, "selectionChange", "options", "loading", "disabled", "placeholder", "clearable", "searchable", "value"], [1, "form-select", 3, "change", "disabled"], [3, "value"], [1, "col-md-3", "mb-3"], [1, "card", "stats-card", "border-start", "border-primary", "border-4"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "card-title", "text-muted", "small"], [1, "text-primary", "mb-0"], [1, "icon-circle", "bg-primary", "bg-opacity-10"], [1, "fa-solid", "fa-users", "text-primary"], [1, "card", "stats-card", "border-start", "border-success", "border-4"], [1, "text-success", "mb-0"], [1, "icon-circle", "bg-success", "bg-opacity-10"], [1, "fa-solid", "fa-user-check", "text-success"], [1, "card", "stats-card", "border-start", "border-danger", "border-4"], [1, "text-danger", "mb-0"], [1, "icon-circle", "bg-danger", "bg-opacity-10"], [1, "fa-solid", "fa-user-times", "text-danger"], [1, "card", "stats-card", "border-start", "border-warning", "border-4"], [1, "text-warning", "mb-0"], [1, "icon-circle", "bg-warning", "bg-opacity-10"], [1, "fa-solid", "fa-clock", "text-warning"], [1, "text-center", "py-5"], [1, "alert", "alert-danger"], [1, "alert", "alert-info"], [1, "row", "mb-3"], [1, "card"], [1, "card-header", "bg-light"], [1, "mb-1"], [1, "fa-solid", "fa-calculator", "me-2", "text-info"], [1, "text-muted"], [1, "row", "align-items-end"], [1, "col-md-3"], [1, "col-md-9"], [1, "d-flex", "gap-2"], ["type", "button", 1, "btn", "btn-info", 3, "click", "disabled", "title"], [1, "fa-solid", "me-2"], ["type", "button", 1, "btn", "btn-warning", 3, "click", "disabled", "title"], [1, "text-muted", "mt-1", "d-block"], [3, "message", "variant", "centered"], [1, "d-flex", "justify-content-between", "align-items-start"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"], ["type", "button", 1, "btn", "btn-outline-danger", "btn-sm", "ms-2", 3, "title"], ["type", "button", 1, "btn", "btn-outline-danger", "btn-sm", "ms-2", 3, "click", "title"], [1, "fa-solid", "fa-filter", "me-1"], [1, "fa-solid", "fa-info-circle", "me-2"], [1, "ms-1"], [1, "mt-2"], [1, "col-md-6"], ["type", "text", 1, "form-control", 3, "input", "placeholder", "disabled"], [1, "card-header"], [1, "mb-0"], [1, "fa-solid", "fa-calendar-check", "me-2"], [1, "badge", "bg-primary"], [1, "card-body", "p-0"], [1, "fa-solid", "fa-calendar-xmark", "fa-3x", "text-muted", "mb-3"], [1, "table-hover", 3, "sortChange", "actionClick", "pageChange", "pageSizeChange", "data", "columns", "actions", "loading", "showPagination", "currentPage", "totalPages", "totalItems", "pageSize", "sortColumn", "sortDirection", "responsiveMode", "emptyMessage"]], template: /* @__PURE__ */ __name(function DailyAttendanceComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div")(6, "button", 5);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DailyAttendanceComponent_Template_button_click_6_listener() {
      return ctx.clearFilters();
    }, "DailyAttendanceComponent_Template_button_click_6_listener"));
    \u0275\u0275element(7, "i", 6);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 7);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DailyAttendanceComponent_Template_button_click_9_listener() {
      return ctx.onRefresh();
    }, "DailyAttendanceComponent_Template_button_click_9_listener"));
    \u0275\u0275element(10, "i", 8);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 9);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function DailyAttendanceComponent_Template_button_click_12_listener() {
      return ctx.exportData();
    }, "DailyAttendanceComponent_Template_button_click_12_listener"));
    \u0275\u0275element(13, "i", 10);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(15, DailyAttendanceComponent_Conditional_15_Template, 24, 24, "div", 11);
    \u0275\u0275elementStart(16, "div", 12)(17, "div", 13)(18, "div", 14)(19, "div", 15)(20, "label", 16);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 17);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DailyAttendanceComponent_Template_input_change_22_listener($event) {
      return ctx.onDateChange($event);
    }, "DailyAttendanceComponent_Template_input_change_22_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 15)(24, "label", 16);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "app-searchable-select", 18);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function DailyAttendanceComponent_Template_app_searchable_select_selectionChange_26_listener($event) {
      return ctx.onBranchSelectionChange($event);
    }, "DailyAttendanceComponent_Template_app_searchable_select_selectionChange_26_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 15)(28, "label", 16);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "app-searchable-select", 18);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function DailyAttendanceComponent_Template_app_searchable_select_selectionChange_30_listener($event) {
      return ctx.onDepartmentSelectionChange($event);
    }, "DailyAttendanceComponent_Template_app_searchable_select_selectionChange_30_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 15)(32, "label", 16);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "app-searchable-select", 19);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function DailyAttendanceComponent_Template_app_searchable_select_selectionChange_34_listener($event) {
      return ctx.onEmployeeSelectionChange($event);
    }, "DailyAttendanceComponent_Template_app_searchable_select_selectionChange_34_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 15)(36, "label", 16);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "select", 20);
    \u0275\u0275listener("change", /* @__PURE__ */ __name(function DailyAttendanceComponent_Template_select_change_38_listener($event) {
      return ctx.onStatusChange($event);
    }, "DailyAttendanceComponent_Template_select_change_38_listener"));
    \u0275\u0275repeaterCreate(39, DailyAttendanceComponent_For_40_Template, 2, 2, "option", 21, _forTrack0);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(41, "div", 2)(42, "div", 22)(43, "div", 23)(44, "div", 13)(45, "div", 24)(46, "div")(47, "h6", 25);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "h3", 26);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 27);
    \u0275\u0275element(52, "i", 28);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(53, "div", 22)(54, "div", 29)(55, "div", 13)(56, "div", 24)(57, "div")(58, "h6", 25);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "h3", 30);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div", 31);
    \u0275\u0275element(63, "i", 32);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(64, "div", 22)(65, "div", 33)(66, "div", 13)(67, "div", 24)(68, "div")(69, "h6", 25);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "h3", 34);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "div", 35);
    \u0275\u0275element(74, "i", 36);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(75, "div", 22)(76, "div", 37)(77, "div", 13)(78, "div", 24)(79, "div")(80, "h6", 25);
    \u0275\u0275text(81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "h3", 38);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(84, "div", 39);
    \u0275\u0275element(85, "i", 40);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275conditionalCreate(86, DailyAttendanceComponent_Conditional_86_Template, 2, 3, "div", 41);
    \u0275\u0275conditionalCreate(87, DailyAttendanceComponent_Conditional_87_Template, 6, 2, "div", 42);
    \u0275\u0275conditionalCreate(88, DailyAttendanceComponent_Conditional_88_Template, 8, 3, "div", 43);
    \u0275\u0275conditionalCreate(89, DailyAttendanceComponent_Conditional_89_Template, 5, 3, "div", 44);
    \u0275\u0275conditionalCreate(90, DailyAttendanceComponent_Conditional_90_Template, 11, 5, "div", 45);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("attendance.daily_view"));
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx.loading() || !ctx.hasActiveFilters())("title", ctx.i18n.t("attendance.actions.clear_filters"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("attendance.actions.clear_filters"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.loading());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("app.refresh"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.loading() || ctx.filteredRecords().length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx.i18n.t("attendance.actions.export_data"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.canManuallyCalculate() ? 15 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx.i18n.t("attendance.filters.date"));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx.selectedDate())("disabled", ctx.loading());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("attendance.filters.branch"));
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx.branchSelectOptions())("loading", ctx.loadingBranches())("disabled", ctx.loading())("placeholder", ctx.i18n.t("attendance.filters.all_branches"))("clearable", true)("value", ctx.selectedBranchId());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("attendance.filters.department"));
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx.departmentSelectOptions())("loading", ctx.loadingDepartments())("disabled", ctx.loading())("placeholder", ctx.i18n.t("attendance.filters.all_departments"))("clearable", true)("value", ctx.selectedDepartmentId());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("attendance.filters.employee"));
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx.employeeSelectOptions())("loading", ctx.loadingEmployees())("disabled", ctx.loading())("placeholder", ctx.i18n.t("attendance.filters.all_employees"))("clearable", true)("searchable", true)("value", ctx.selectedEmployeeId());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.i18n.t("attendance.filters.status"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.availableStatuses);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx.i18n.t("attendance.statistics.total_employees"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.totalEmployees());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx.i18n.t("attendance.statistics.present_employees"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.presentEmployees());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx.i18n.t("attendance.statistics.absent_employees"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.absentEmployees());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx.i18n.t("attendance.statistics.late_employees"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.lateEmployees());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.loading() ? 86 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.error() ? 87 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && !ctx.error() && ctx.filteredRecords().length === 0 && !ctx.hasActiveFilters() ? 88 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && !ctx.error() ? 89 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && !ctx.error() ? 90 : -1);
  }
}, "DailyAttendanceComponent_Template"), dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, RouterModule, SearchableSelectComponent, DataTableComponent, PageHeaderComponent, LoadingSpinnerComponent], styles: ['\n\n.daily-attendance[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  min-height: calc(100vh - 120px);\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n}\n.page-title[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.stats-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--bs-primary),\n      var(--bs-info));\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.stats-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px) scale(1.02);\n}\n.stats-card[_ngcontent-%COMP%]:hover::before {\n  opacity: 1;\n}\n.table-hover[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: all 0.3s ease;\n  border-left: 3px solid transparent;\n}\n.table-hover[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      90deg,\n      #f8f9ff 0%,\n      #ffffff 100%);\n  border-left-color: #0d6efd;\n  transform: translateX(2px);\n  box-shadow: 0 2px 8px rgba(13, 110, 253, 0.1);\n}\n.table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n}\n.btn[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.4),\n      transparent);\n  transition: left 0.5s;\n}\n.btn[_ngcontent-%COMP%]:hover::before {\n  left: 100%;\n}\n.card-header[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 1.75rem;\n  right: 1.75rem;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--bs-primary),\n      var(--bs-info));\n  border-radius: 1px;\n}\n.border-success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(25, 135, 84, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-danger[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(220, 53, 69, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-warning[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(253, 126, 20, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-info[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(13, 202, 240, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(13, 110, 253, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-secondary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(108, 117, 125, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n@media (max-width: 768px) {\n  .daily-attendance[_ngcontent-%COMP%] {\n    padding: 1rem;\n    background:\n      linear-gradient(\n        135deg,\n        #f8f9fa 0%,\n        #ffffff 100%);\n  }\n  .page-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    text-align: center;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1.5rem;\n    align-items: center;\n  }\n  .stats-card[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    gap: 0.5rem;\n  }\n  .stats-card[_ngcontent-%COMP%]   .icon-circle[_ngcontent-%COMP%] {\n    margin: 0 auto 0.75rem;\n    width: 56px;\n    height: 56px;\n  }\n  .table-responsive[_ngcontent-%COMP%] {\n    margin: 0 -0.5rem;\n  }\n  .card-header[_ngcontent-%COMP%] {\n    padding: 1rem 1.25rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n  }\n}\n/*# sourceMappingURL=daily-attendance.component.css.map */'] }));
var DailyAttendanceComponent = _DailyAttendanceComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DailyAttendanceComponent, [{
    type: Component,
    args: [{ selector: "app-daily-attendance", standalone: true, imports: [FormsModule, RouterModule, SearchableSelectComponent, DataTableComponent, PageHeaderComponent, LoadingSpinnerComponent], template: `<div class="container-fluid p-4">\r
  <!-- Page Header -->\r
  <app-page-header\r
    [title]="i18n.t('attendance.daily_view')">\r
  </app-page-header>\r
\r
  <div class="row mb-4">\r
    <div class="col-12">\r
      <div class="d-flex justify-content-end align-items-center">\r
        <div>\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary me-2"\r
            (click)="clearFilters()"\r
            [disabled]="loading() || !hasActiveFilters()"\r
            [title]="i18n.t('attendance.actions.clear_filters')">\r
            <i class="fa-solid fa-filter-circle-xmark me-2"></i>{{ i18n.t('attendance.actions.clear_filters') }}\r
          </button>\r
          <button\r
            type="button"\r
            class="btn btn-outline-primary me-2"\r
            (click)="onRefresh()"\r
            [disabled]="loading()">\r
            <i class="fa-solid fa-refresh me-2"></i>{{ i18n.t('app.refresh') }}\r
          </button>\r
          <button\r
            type="button"\r
            class="btn btn-success"\r
            (click)="exportData()"\r
            [disabled]="loading() || filteredRecords().length === 0">\r
            <i class="fa-solid fa-download me-2"></i>{{ i18n.t('attendance.actions.export_data') }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Manual Calculation Section (Admin only) -->\r
  @if (canManuallyCalculate()) {\r
    <div class="card mb-4 border-info">\r
      <div class="card-header bg-light">\r
        <div>\r
          <h5 class="mb-1">\r
            <i class="fa-solid fa-calculator me-2 text-info"></i>\r
            {{ i18n.t('attendance.manual_calculation.title') }}\r
          </h5>\r
          <small class="text-muted">{{ i18n.t('attendance.manual_calculation.subtitle') }}</small>\r
        </div>\r
      </div>\r
      <div class="card-body">\r
        <div class="row align-items-end">\r
          <div class="col-md-3">\r
            <label class="form-label">{{ i18n.t('attendance.manual_calculation.select_date') }}</label>\r
            <input\r
              type="date"\r
              class="form-control"\r
              [value]="manualCalculationDate()"\r
              (change)="onManualCalculationDateChange($event)"\r
              [disabled]="calculatingBulk()">\r
          </div>\r
          <div class="col-md-9">\r
            <div class="d-flex gap-2">\r
              <button\r
                type="button"\r
                class="btn btn-info"\r
                (click)="generateMissingAttendanceForDate()"\r
                [disabled]="calculatingBulk()"\r
                [title]="i18n.t('attendance.manual_calculation.generate_missing_help')">\r
                <i class="fa-solid me-2" [class.fa-plus]="!calculatingBulk()" [class.fa-spinner]="calculatingBulk()" [class.fa-spin]="calculatingBulk()"></i>{{ i18n.t('attendance.manual_calculation.generate_missing') }}\r
              </button>\r
              <button\r
                type="button"\r
                class="btn btn-warning"\r
                (click)="forceRecalculateAllForDate()"\r
                [disabled]="calculatingBulk()"\r
                [title]="i18n.t('attendance.manual_calculation.recalculate_all_help')">\r
                <i class="fa-solid me-2" [class.fa-calculator]="!calculatingBulk()" [class.fa-spinner]="calculatingBulk()" [class.fa-spin]="calculatingBulk()"></i>{{ i18n.t('attendance.manual_calculation.recalculate_all') }}\r
              </button>\r
            </div>\r
            <small class="text-muted mt-1 d-block">\r
              {{ i18n.t('attendance.manual_calculation.date_info').replace('{{date}}', manualCalculationDate()) }}\r
            </small>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Date Selection and Filters -->\r
  <div class="card mb-4">\r
    <div class="card-body">\r
      <div class="row g-3">\r
        <div class="col-md-2">\r
          <label class="form-label">{{ i18n.t('attendance.filters.date') }}</label>\r
          <input\r
            type="date"\r
            class="form-control"\r
            [value]="selectedDate()"\r
            (change)="onDateChange($event)"\r
            [disabled]="loading()">\r
        </div>\r
        <div class="col-md-2">\r
          <label class="form-label">{{ i18n.t('attendance.filters.branch') }}</label>\r
          <app-searchable-select\r
            [options]="branchSelectOptions()"\r
            [loading]="loadingBranches()"\r
            [disabled]="loading()"\r
            [placeholder]="i18n.t('attendance.filters.all_branches')"\r
            [clearable]="true"\r
            [value]="selectedBranchId()"\r
            (selectionChange)="onBranchSelectionChange($event)">\r
          </app-searchable-select>\r
        </div>\r
        <div class="col-md-2">\r
          <label class="form-label">{{ i18n.t('attendance.filters.department') }}</label>\r
          <app-searchable-select\r
            [options]="departmentSelectOptions()"\r
            [loading]="loadingDepartments()"\r
            [disabled]="loading()"\r
            [placeholder]="i18n.t('attendance.filters.all_departments')"\r
            [clearable]="true"\r
            [value]="selectedDepartmentId()"\r
            (selectionChange)="onDepartmentSelectionChange($event)">\r
          </app-searchable-select>\r
        </div>\r
        <div class="col-md-2">\r
          <label class="form-label">{{ i18n.t('attendance.filters.employee') }}</label>\r
          <app-searchable-select\r
            [options]="employeeSelectOptions()"\r
            [loading]="loadingEmployees()"\r
            [disabled]="loading()"\r
            [placeholder]="i18n.t('attendance.filters.all_employees')"\r
            [clearable]="true"\r
            [searchable]="true"\r
            [value]="selectedEmployeeId()"\r
            (selectionChange)="onEmployeeSelectionChange($event)">\r
          </app-searchable-select>\r
        </div>\r
        <div class="col-md-2">\r
          <label class="form-label">{{ i18n.t('attendance.filters.status') }}</label>\r
          <select\r
            class="form-select"\r
            (change)="onStatusChange($event)"\r
            [disabled]="loading()">\r
            @for (status of availableStatuses; track status.value) {\r
              <option\r
                [value]="status.value === null ? '' : status.value">\r
                {{ i18n.t(status.label) }}\r
              </option>\r
            }\r
          </select>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Quick Statistics Cards -->\r
  <div class="row mb-4">\r
    <div class="col-md-3 mb-3">\r
      <div class="card stats-card border-start border-primary border-4">\r
        <div class="card-body">\r
          <div class="d-flex justify-content-between align-items-center">\r
            <div>\r
              <h6 class="card-title text-muted small">{{ i18n.t('attendance.statistics.total_employees') }}</h6>\r
              <h3 class="text-primary mb-0">{{ totalEmployees() }}</h3>\r
            </div>\r
            <div class="icon-circle bg-primary bg-opacity-10">\r
              <i class="fa-solid fa-users text-primary"></i>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="col-md-3 mb-3">\r
      <div class="card stats-card border-start border-success border-4">\r
        <div class="card-body">\r
          <div class="d-flex justify-content-between align-items-center">\r
            <div>\r
              <h6 class="card-title text-muted small">{{ i18n.t('attendance.statistics.present_employees') }}</h6>\r
              <h3 class="text-success mb-0">{{ presentEmployees() }}</h3>\r
            </div>\r
            <div class="icon-circle bg-success bg-opacity-10">\r
              <i class="fa-solid fa-user-check text-success"></i>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="col-md-3 mb-3">\r
      <div class="card stats-card border-start border-danger border-4">\r
        <div class="card-body">\r
          <div class="d-flex justify-content-between align-items-center">\r
            <div>\r
              <h6 class="card-title text-muted small">{{ i18n.t('attendance.statistics.absent_employees') }}</h6>\r
              <h3 class="text-danger mb-0">{{ absentEmployees() }}</h3>\r
            </div>\r
            <div class="icon-circle bg-danger bg-opacity-10">\r
              <i class="fa-solid fa-user-times text-danger"></i>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="col-md-3 mb-3">\r
      <div class="card stats-card border-start border-warning border-4">\r
        <div class="card-body">\r
          <div class="d-flex justify-content-between align-items-center">\r
            <div>\r
              <h6 class="card-title text-muted small">{{ i18n.t('attendance.statistics.late_employees') }}</h6>\r
              <h3 class="text-warning mb-0">{{ lateEmployees() }}</h3>\r
            </div>\r
            <div class="icon-circle bg-warning bg-opacity-10">\r
              <i class="fa-solid fa-clock text-warning"></i>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <app-loading-spinner\r
        [message]="i18n.t('attendance.messages.loading_data')"\r
        [variant]="'primary'"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  }\r
\r
  <!-- Error State -->\r
  @if (error()) {\r
    <div class="alert alert-danger">\r
      <div class="d-flex justify-content-between align-items-start">\r
        <div>\r
          <i class="fa-solid fa-exclamation-triangle me-2"></i>\r
          {{ error() }}\r
        </div>\r
        @if (!hasActiveFilters()) {\r
          <button\r
            type="button"\r
            class="btn btn-outline-danger btn-sm ms-2"\r
            (click)="clearFilters()"\r
            [title]="i18n.t('attendance.actions.try_with_filter')">\r
            <i class="fa-solid fa-filter me-1"></i>\r
            {{ i18n.t('attendance.actions.add_filter') }}\r
          </button>\r
        }\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Filter Hint -->\r
  @if (!loading() && !error() && filteredRecords().length === 0 && !hasActiveFilters()) {\r
    <div class="alert alert-info">\r
      <i class="fa-solid fa-info-circle me-2"></i>\r
      {{ i18n.t('attendance.hints.better_performance') }}\r
      <strong class="ms-1">{{ i18n.t('attendance.hints.use_filters') }}</strong>\r
      <div class="mt-2">\r
        <small class="text-muted">\r
          {{ i18n.t('attendance.hints.filter_help') || 'Please select a Branch, Department, or Employee to view attendance records for today.' }}\r
        </small>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Search Box -->\r
  @if (!loading() && !error()) {\r
    <div class="row mb-3">\r
      <div class="col-md-6">\r
        <label class="form-label">{{ i18n.t('attendance.filters.search') }}</label>\r
        <input\r
          type="text"\r
          class="form-control"\r
          [placeholder]="i18n.t('attendance.filters.search_placeholder')"\r
          (input)="onSearchChange($event)"\r
          [disabled]="loading()">\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Attendance Records Table -->\r
  @if (!loading() && !error()) {\r
    <div class="card">\r
      <div class="card-header">\r
        <div class="d-flex justify-content-between align-items-center">\r
          <h5 class="mb-0">\r
            <i class="fa-solid fa-calendar-check me-2"></i>\r
            {{ i18n.t('attendance.daily_records') }}\r
          </h5>\r
          <span class="badge bg-primary">{{ filteredRecords().length }} {{ i18n.t('attendance.records') }}</span>\r
        </div>\r
      </div>\r
      <div class="card-body p-0">\r
\r
        <!-- No Records -->\r
        @if (filteredRecords().length === 0) {\r
          <div class="text-center py-5">\r
            <i class="fa-solid fa-calendar-xmark fa-3x text-muted mb-3"></i>\r
            <h5 class="text-muted">{{ i18n.t('attendance.no_records') }}</h5>\r
            <p class="text-muted">{{ i18n.t('attendance.no_records_description') }}</p>\r
          </div>\r
        }\r
\r
        <!-- Data Table -->\r
        @if (filteredRecords().length > 0) {\r
          <div>\r
            <app-data-table\r
              [data]="tableData()"\r
              [columns]="tableColumns()"\r
              [actions]="tableActions()"\r
              [loading]="loading"\r
              [showPagination]="true"\r
              [currentPage]="currentPage"\r
              [totalPages]="tableTotalPages"\r
              [totalItems]="tableTotalItems"\r
              [pageSize]="pageSize"\r
              [sortColumn]="sortColumn"\r
              [sortDirection]="sortDirection"\r
              [responsiveMode]="'horizontal-scroll'"\r
              [emptyMessage]="i18n.t('attendance.daily.no_records')"\r
              (sortChange)="onSort($event)"\r
              (actionClick)="onActionClick($event)"\r
              (pageChange)="onPageChange($event)"\r
              (pageSizeChange)="onPageSizeChange($event)"\r
              class="table-hover">\r
            </app-data-table>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  }\r
\r
\r
</div>`, styles: ['/* src/app/pages/attendance/daily/daily-attendance.component.css */\n.daily-attendance {\n  padding: 1.5rem;\n  min-height: calc(100vh - 120px);\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  font-family:\n    "Segoe UI",\n    Tahoma,\n    Geneva,\n    Verdana,\n    sans-serif;\n}\n.page-title {\n  color: #2c3e50;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.stats-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--bs-primary),\n      var(--bs-info));\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.stats-card:hover {\n  transform: translateY(-4px) scale(1.02);\n}\n.stats-card:hover::before {\n  opacity: 1;\n}\n.table-hover tbody tr {\n  transition: all 0.3s ease;\n  border-left: 3px solid transparent;\n}\n.table-hover tbody tr:hover {\n  background:\n    linear-gradient(\n      90deg,\n      #f8f9ff 0%,\n      #ffffff 100%);\n  border-left-color: #0d6efd;\n  transform: translateX(2px);\n  box-shadow: 0 2px 8px rgba(13, 110, 253, 0.1);\n}\n.table thead th {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n}\n.btn::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.4),\n      transparent);\n  transition: left 0.5s;\n}\n.btn:hover::before {\n  left: 100%;\n}\n.card-header::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 1.75rem;\n  right: 1.75rem;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--bs-primary),\n      var(--bs-info));\n  border-radius: 1px;\n}\n.border-success {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(25, 135, 84, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-danger {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(220, 53, 69, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-warning {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(253, 126, 20, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-info {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(13, 202, 240, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-primary {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(13, 110, 253, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n.border-secondary {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(108, 117, 125, 0.05) 0%,\n      rgba(255, 255, 255, 1) 100%);\n}\n@media (max-width: 768px) {\n  .daily-attendance {\n    padding: 1rem;\n    background:\n      linear-gradient(\n        135deg,\n        #f8f9fa 0%,\n        #ffffff 100%);\n  }\n  .page-title {\n    font-size: 1.5rem;\n    text-align: center;\n  }\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1.5rem;\n    align-items: center;\n  }\n  .stats-card .d-flex {\n    flex-direction: column;\n    text-align: center;\n    gap: 0.5rem;\n  }\n  .stats-card .icon-circle {\n    margin: 0 auto 0.75rem;\n    width: 56px;\n    height: 56px;\n  }\n  .table-responsive {\n    margin: 0 -0.5rem;\n  }\n  .card-header {\n    padding: 1rem 1.25rem;\n  }\n  .card-body {\n    padding: 1.25rem;\n  }\n}\n/*# sourceMappingURL=daily-attendance.component.css.map */\n'] }]
  }], () => [{ type: AttendanceService }, { type: EmployeesService }, { type: DepartmentsService }, { type: BranchesService }, { type: ShiftAssignmentService }, { type: I18nService }, { type: NotificationService }, { type: ConfirmationService }, { type: Router }, { type: ActivatedRoute }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DailyAttendanceComponent, { className: "DailyAttendanceComponent", filePath: "src/app/pages/attendance/daily/daily-attendance.component.ts", lineNumber: 33 });
})();
export {
  DailyAttendanceComponent
};
//# sourceMappingURL=chunk-SPQH6M22.js.map
