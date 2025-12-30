import {
  HolidayTemplate,
  HolidayType,
  PublicHolidaysService
} from "./chunk-OMK64WGC.js";
import {
  ModalWrapperComponent
} from "./chunk-3OFDLXN2.js";
import {
  DataTableComponent
} from "./chunk-7JZQN7NK.js";
import {
  UnifiedFilterComponent
} from "./chunk-THHKOIOG.js";
import "./chunk-5ZV3Z4IV.js";
import "./chunk-DS3UNCKJ.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-7XYWDBYG.js";
import {
  ConfirmationService
} from "./chunk-NUNE7G5P.js";
import {
  PermissionService
} from "./chunk-HT4DZZW3.js";
import "./chunk-6LEZROWG.js";
import "./chunk-GSKH2KOG.js";
import {
  PageHeaderComponent
} from "./chunk-DKGFJHVQ.js";
import {
  CheckboxControlValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-CVUMC7BN.js";
import {
  NotificationService
} from "./chunk-6SX47UU2.js";
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __async,
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/public-holidays/public-holidays.component.ts
var _c0 = /* @__PURE__ */ __name(() => [], "_c0");
function PublicHolidaysComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "button", 28);
    \u0275\u0275element(2, "i", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ul", 30)(5, "li")(6, "a", 31);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function PublicHolidaysComponent_Conditional_5_Template_a_click_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.onExportHolidays("json");
      return \u0275\u0275resetView($event.preventDefault());
    }, "PublicHolidaysComponent_Conditional_5_Template_a_click_6_listener"));
    \u0275\u0275element(7, "i", 32);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "li")(10, "a", 31);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function PublicHolidaysComponent_Conditional_5_Template_a_click_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.onExportHolidays("csv");
      return \u0275\u0275resetView($event.preventDefault());
    }, "PublicHolidaysComponent_Conditional_5_Template_a_click_10_listener"));
    \u0275\u0275element(11, "i", 33);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "li")(14, "a", 31);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function PublicHolidaysComponent_Conditional_5_Template_a_click_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.onExportHolidays("ical");
      return \u0275\u0275resetView($event.preventDefault());
    }, "PublicHolidaysComponent_Conditional_5_Template_a_click_14_listener"));
    \u0275\u0275element(15, "i", 34);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("settings.holidays.export"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("settings.holidays.exportJson"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("settings.holidays.exportCsv"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("settings.holidays.exportIcal"), " ");
  }
}
__name(PublicHolidaysComponent_Conditional_5_Template, "PublicHolidaysComponent_Conditional_5_Template");
function PublicHolidaysComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function PublicHolidaysComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onShowImportModal());
    }, "PublicHolidaysComponent_Conditional_6_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("settings.holidays.import"), " ");
  }
}
__name(PublicHolidaysComponent_Conditional_6_Template, "PublicHolidaysComponent_Conditional_6_Template");
function PublicHolidaysComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const template_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", template_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getTemplateDisplayName(template_r4));
  }
}
__name(PublicHolidaysComponent_For_18_Template, "PublicHolidaysComponent_For_18_Template");
function PublicHolidaysComponent_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const year_r5 = ctx.$implicit;
    \u0275\u0275property("value", year_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(year_r5);
  }
}
__name(PublicHolidaysComponent_For_24_Template, "PublicHolidaysComponent_For_24_Template");
function PublicHolidaysComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 27);
  }
}
__name(PublicHolidaysComponent_Conditional_44_Template, "PublicHolidaysComponent_Conditional_44_Template");
var _PublicHolidaysComponent = class _PublicHolidaysComponent {
  publicHolidaysService = inject(PublicHolidaysService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  // Permission constants for use in template
  PERMISSIONS = {
    HOLIDAY_CREATE: "publicHoliday.create",
    HOLIDAY_READ: "publicHoliday.read",
    HOLIDAY_UPDATE: "publicHoliday.update",
    HOLIDAY_DELETE: "publicHoliday.delete",
    HOLIDAY_IMPORT: "publicHoliday.import",
    HOLIDAY_EXPORT: "publicHoliday.export"
  };
  // Holiday type and template references for template
  HolidayType = HolidayType;
  HolidayTemplate = HolidayTemplate;
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  holidays = signal([], ...ngDevMode ? [{ debugName: "holidays" }] : []);
  totalCount = signal(0, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  totalPages = signal(0, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // Filter signals
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  selectedYear = signal((/* @__PURE__ */ new Date()).getFullYear(), ...ngDevMode ? [{ debugName: "selectedYear" }] : []);
  selectedBranchId = signal(void 0, ...ngDevMode ? [{ debugName: "selectedBranchId" }] : []);
  selectedHolidayType = signal(void 0, ...ngDevMode ? [{ debugName: "selectedHolidayType" }] : []);
  selectedActiveStatus = signal(void 0, ...ngDevMode ? [{ debugName: "selectedActiveStatus" }] : []);
  selectedNationalStatus = signal(void 0, ...ngDevMode ? [{ debugName: "selectedNationalStatus" }] : []);
  // Sorting state
  sortColumn = signal("name", ...ngDevMode ? [{ debugName: "sortColumn" }] : []);
  sortDirection = signal("asc", ...ngDevMode ? [{ debugName: "sortDirection" }] : []);
  // Import state
  showImportModal = signal(false, ...ngDevMode ? [{ debugName: "showImportModal" }] : []);
  importLoading = signal(false, ...ngDevMode ? [{ debugName: "importLoading" }] : []);
  selectedTemplate = signal(HolidayTemplate.USA_Federal, ...ngDevMode ? [{ debugName: "selectedTemplate" }] : []);
  importYear = signal((/* @__PURE__ */ new Date()).getFullYear(), ...ngDevMode ? [{ debugName: "importYear" }] : []);
  importBranchId = signal(void 0, ...ngDevMode ? [{ debugName: "importBranchId" }] : []);
  overwriteExisting = signal(false, ...ngDevMode ? [{ debugName: "overwriteExisting" }] : []);
  // Data table configuration
  tableColumns = computed(() => [
    {
      key: "name",
      label: this.t("settings.holidays.name"),
      sortable: true,
      width: "200px",
      priority: "high",
      mobileLabel: this.t("settings.holidays.name")
    },
    {
      key: "holidayType",
      label: this.t("settings.holidays.type"),
      sortable: true,
      width: "120px",
      priority: "high",
      mobileLabel: this.t("settings.holidays.type"),
      renderHtml: true
    },
    {
      key: "nextOccurrence",
      label: this.t("settings.holidays.nextOccurrence"),
      sortable: true,
      width: "150px",
      priority: "medium",
      mobileLabel: this.t("settings.holidays.nextOccurrence")
    },
    {
      key: "scope",
      label: this.t("settings.holidays.scope"),
      sortable: false,
      width: "120px",
      priority: "medium",
      mobileLabel: this.t("settings.holidays.scope"),
      renderHtml: true
    },
    {
      key: "status",
      label: this.t("settings.holidays.status"),
      sortable: false,
      width: "100px",
      align: "center",
      priority: "high",
      mobileLabel: this.t("settings.holidays.status"),
      renderHtml: true
    },
    {
      key: "priority",
      label: this.t("settings.holidays.priority"),
      sortable: true,
      width: "80px",
      align: "center",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("settings.holidays.priority")
    },
    {
      key: "createdAt",
      label: this.t("common.created"),
      sortable: true,
      width: "150px",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: this.t("common.created")
    }
  ], ...ngDevMode ? [{ debugName: "tableColumns" }] : []);
  tableActions = computed(() => [
    {
      key: "view",
      label: this.t("common.view"),
      icon: "fa-eye",
      color: "primary",
      condition: /* @__PURE__ */ __name(() => this.permissionService.has(this.PERMISSIONS.HOLIDAY_READ), "condition")
    },
    {
      key: "edit",
      label: this.t("common.edit"),
      icon: "fa-edit",
      color: "secondary",
      condition: /* @__PURE__ */ __name(() => this.permissionService.canManagePublicHolidays(), "condition")
    },
    {
      key: "delete",
      label: this.t("common.delete"),
      icon: "fa-trash",
      color: "danger",
      condition: /* @__PURE__ */ __name(() => this.permissionService.canManagePublicHolidays(), "condition")
    }
  ], ...ngDevMode ? [{ debugName: "tableActions" }] : []);
  // Transform holidays data for data table
  tableData = computed(() => {
    return this.holidays().map((holiday) => __spreadProps(__spreadValues({}, holiday), {
      holidayType: this.formatHolidayType(holiday.holidayType),
      nextOccurrence: holiday.nextOccurrence ? this.formatDate(holiday.nextOccurrence) : this.t("settings.holidays.noUpcoming"),
      scope: this.formatScope(holiday),
      status: this.formatStatus(holiday),
      createdAt: this.formatDate(holiday.createdAt)
    }));
  }, ...ngDevMode ? [{ debugName: "tableData" }] : []);
  // Available holiday types for filters
  holidayTypes = computed(() => this.publicHolidaysService.getHolidayTypes(), ...ngDevMode ? [{ debugName: "holidayTypes" }] : []);
  // Available templates for import
  availableTemplates = computed(() => this.publicHolidaysService.getAvailableTemplates(), ...ngDevMode ? [{ debugName: "availableTemplates" }] : []);
  ngOnInit() {
    this.loadHolidays();
  }
  t(key) {
    return this.i18n.t(key);
  }
  loadHolidays() {
    this.loading.set(true);
    this.publicHolidaysService.getPublicHolidays(this.currentPage(), this.pageSize(), this.searchTerm() || void 0, this.selectedYear(), this.selectedBranchId(), this.selectedHolidayType(), this.selectedActiveStatus(), this.selectedNationalStatus()).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.holidays.set(response.holidays);
        this.totalCount.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load public holidays:", error);
        this.loading.set(false);
        this.notificationService.error(this.t("app.error"), this.t("errors.server"));
      }, "error")
    });
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  formatHolidayType(type) {
    const typeLabels = {
      [HolidayType.OneTime]: "One Time",
      [HolidayType.Annual]: "Annual",
      [HolidayType.Monthly]: "Monthly",
      [HolidayType.Floating]: "Floating"
    };
    const typeColors = {
      [HolidayType.OneTime]: "info",
      [HolidayType.Annual]: "primary",
      [HolidayType.Monthly]: "warning",
      [HolidayType.Floating]: "secondary"
    };
    return `<span class="badge bg-${typeColors[type]}">${typeLabels[type]}</span>`;
  }
  formatScope(holiday) {
    if (holiday.isNational) {
      return `<span class="badge bg-success">${this.t("settings.holidays.national")}</span>`;
    } else if (holiday.branchId) {
      return `<span class="badge bg-info">${holiday.branchName || `Branch ${holiday.branchId}`}</span>`;
    } else {
      return `<span class="badge bg-info">${this.t("common.company_wide")}</span>`;
    }
  }
  formatStatus(holiday) {
    if (holiday.isActive) {
      return `<span class="badge bg-success">${this.t("settings.holidays.active")}</span>`;
    } else {
      return `<span class="badge bg-light text-dark border">${this.t("settings.holidays.inactive")}</span>`;
    }
  }
  // Data table action handler
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.onViewHoliday(item);
        break;
      case "edit":
        this.onEditHoliday(item);
        break;
      case "delete":
        this.onDeleteHoliday(item);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }
  // Pagination handlers
  onPageChange(page) {
    this.currentPage.set(page);
    this.loadHolidays();
  }
  onPageSizeChange(pageSize) {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadHolidays();
  }
  // Filter handlers
  onSearchChange() {
    this.currentPage.set(1);
    this.loadHolidays();
  }
  onYearChange() {
    this.currentPage.set(1);
    this.loadHolidays();
  }
  onHolidayTypeChange() {
    this.currentPage.set(1);
    this.loadHolidays();
  }
  onActiveStatusChange() {
    this.currentPage.set(1);
    this.loadHolidays();
  }
  onNationalStatusChange() {
    this.currentPage.set(1);
    this.loadHolidays();
  }
  onClearFilters() {
    this.searchTerm.set("");
    this.selectedYear.set((/* @__PURE__ */ new Date()).getFullYear());
    this.selectedBranchId.set(void 0);
    this.selectedHolidayType.set(void 0);
    this.selectedActiveStatus.set(void 0);
    this.selectedNationalStatus.set(void 0);
    this.currentPage.set(1);
    this.loadHolidays();
  }
  hasActiveFilters() {
    return !!(this.searchTerm() || this.selectedHolidayType() !== void 0 || this.selectedActiveStatus() !== void 0 || this.selectedNationalStatus() !== void 0 || this.selectedYear() !== (/* @__PURE__ */ new Date()).getFullYear());
  }
  // Unified filter handlers
  onSearchTermChange(searchTerm) {
    this.searchTerm.set(searchTerm);
    this.onSearchChange();
  }
  onFiltersChange(filters) {
    if (filters.branchId !== void 0) {
      this.selectedBranchId.set(filters.branchId ? parseInt(filters.branchId) : void 0);
    }
    if (filters.isActive !== void 0) {
      this.selectedActiveStatus.set(filters.isActive === "true" ? true : filters.isActive === "false" ? false : void 0);
    }
    if (filters.year !== void 0) {
      this.selectedYear.set(filters.year ? parseInt(filters.year) : (/* @__PURE__ */ new Date()).getFullYear());
    }
    this.currentPage.set(1);
    this.loadHolidays();
  }
  onRefreshData() {
    this.onClearFilters();
  }
  // Holiday CRUD operations
  onCreateHoliday() {
    this.router.navigate(["/settings/public-holidays/create"]);
  }
  onViewHoliday(holiday) {
    this.router.navigate(["/settings/public-holidays", holiday.id, "view"]);
  }
  onEditHoliday(holiday) {
    this.router.navigate(["/settings/public-holidays", holiday.id, "edit"]);
  }
  onDeleteHoliday(holiday) {
    return __async(this, null, function* () {
      const result = yield this.confirmationService.confirm({
        title: this.t("settings.holidays.deleteHoliday"),
        message: this.t("settings.holidays.deleteHolidayConfirmation"),
        confirmText: this.t("common.delete"),
        cancelText: this.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.publicHolidaysService.deletePublicHoliday(holiday.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.loadHolidays();
            this.notificationService.success(this.t("app.success"), this.t("settings.holidays.holidayDeletedSuccessfully"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete holiday:", error);
            this.notificationService.error(this.t("app.error"), this.t("errors.server"));
          }, "error")
        });
      }
    });
  }
  // Import functionality
  onShowImportModal() {
    this.showImportModal.set(true);
  }
  onHideImportModal() {
    this.showImportModal.set(false);
    this.selectedTemplate.set(HolidayTemplate.USA_Federal);
    this.importYear.set((/* @__PURE__ */ new Date()).getFullYear());
    this.importBranchId.set(void 0);
    this.overwriteExisting.set(false);
  }
  onImportTemplate() {
    return __async(this, null, function* () {
      const result = yield this.confirmationService.confirm({
        title: this.t("settings.holidays.importTemplate"),
        message: this.t("settings.holidays.importTemplateConfirmation"),
        confirmText: this.t("settings.holidays.import"),
        cancelText: this.t("common.cancel"),
        confirmButtonClass: "btn-primary",
        icon: "fa-download",
        iconClass: "text-primary"
      });
      if (result.confirmed) {
        this.importLoading.set(true);
        this.publicHolidaysService.importHolidayTemplate({
          template: this.selectedTemplate(),
          year: this.importYear(),
          branchId: this.importBranchId(),
          countryCode: "US",
          // This should be dynamic based on template
          overwriteExisting: this.overwriteExisting()
        }).subscribe({
          next: /* @__PURE__ */ __name((importedHolidays) => {
            this.importLoading.set(false);
            this.onHideImportModal();
            this.loadHolidays();
            this.notificationService.success(this.t("app.success"), this.t("settings.holidays.templateImportedSuccessfully"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to import template:", error);
            this.importLoading.set(false);
            this.notificationService.error(this.t("app.error"), this.t("errors.server"));
          }, "error")
        });
      }
    });
  }
  // Export functionality
  onExportHolidays(format = "json") {
    const year = this.selectedYear() || (/* @__PURE__ */ new Date()).getFullYear();
    this.publicHolidaysService.exportHolidays(year, format, this.selectedBranchId(), false).subscribe({
      next: /* @__PURE__ */ __name((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `public-holidays-${year}.${format}`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.notificationService.success(this.t("app.success"), this.t("settings.holidays.exportedSuccessfully"));
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to export holidays:", error);
        this.notificationService.error(this.t("app.error"), this.t("errors.server"));
      }, "error")
    });
  }
  // Permission checks
  canCreateHolidays() {
    return this.permissionService.canManagePublicHolidays();
  }
  canImportHolidays() {
    return this.permissionService.canImportPublicHolidays();
  }
  canExportHolidays() {
    return this.permissionService.canExportPublicHolidays();
  }
  // Utility methods
  getYearOptions() {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years;
  }
  getTemplateDisplayName(template) {
    const templateNames = {
      [HolidayTemplate.USA_Federal]: "USA Federal Holidays",
      [HolidayTemplate.UK_BankHolidays]: "UK Bank Holidays",
      [HolidayTemplate.SaudiArabia_National]: "Saudi Arabia National Holidays"
    };
    return templateNames[template];
  }
};
__name(_PublicHolidaysComponent, "PublicHolidaysComponent");
__publicField(_PublicHolidaysComponent, "\u0275fac", /* @__PURE__ */ __name(function PublicHolidaysComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PublicHolidaysComponent)();
}, "PublicHolidaysComponent_Factory"));
__publicField(_PublicHolidaysComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PublicHolidaysComponent, selectors: [["app-public-holidays"]], decls: 46, vars: 36, consts: [[1, "container-fluid"], [3, "title"], ["moduleName", "public-holidays", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [1, "d-flex", "justify-content-end", "align-items-center", "mb-4"], [1, "d-flex", "gap-2"], [1, "dropdown"], ["type", "button", 1, "btn", "btn-outline-primary"], [1, "card"], [1, "card-body"], [3, "actionClick", "pageChange", "pageSizeChange", "data", "columns", "actions", "totalItems", "currentPage", "pageSize", "totalPages", "loading", "emptyTitle", "emptyMessage"], [3, "close", "show", "title", "centered", "loading"], [1, "modal-body"], [1, "mb-3"], ["for", "template", 1, "form-label"], ["id", "template", "name", "template", 1, "form-select", 3, "ngModelChange", "ngModel"], [3, "value"], ["for", "importYear", 1, "form-label"], ["id", "importYear", "name", "importYear", 1, "form-select", 3, "ngModelChange", "ngModel"], ["for", "importBranch", 1, "form-label"], ["id", "importBranch", "name", "importBranch", 1, "form-select", 3, "ngModelChange", "ngModel"], [1, "form-text"], [1, "form-check"], ["type", "checkbox", "id", "overwriteExisting", "name", "overwriteExisting", 1, "form-check-input", 3, "ngModelChange", "ngModel"], ["for", "overwriteExisting", 1, "form-check-label"], ["modal-footer", "", 1, "d-flex", "gap-2", "justify-content-end"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-1"], ["type", "button", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "btn", "btn-outline-secondary", "dropdown-toggle"], [1, "fas", "fa-download", "me-1"], [1, "dropdown-menu"], ["href", "#", 1, "dropdown-item", 3, "click"], [1, "fas", "fa-file-code", "me-2"], [1, "fas", "fa-file-csv", "me-2"], [1, "fas", "fa-calendar", "me-2"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click"], [1, "fas", "fa-upload", "me-1"]], template: /* @__PURE__ */ __name(function PublicHolidaysComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      return ctx.onSearchTermChange($event);
    }, "PublicHolidaysComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      return ctx.onFiltersChange($event);
    }, "PublicHolidaysComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_app_unified_filter_add_2_listener() {
      return ctx.onCreateHoliday();
    }, "PublicHolidaysComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefreshData();
    }, "PublicHolidaysComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3)(4, "div", 4);
    \u0275\u0275conditionalCreate(5, PublicHolidaysComponent_Conditional_5_Template, 17, 4, "div", 5);
    \u0275\u0275conditionalCreate(6, PublicHolidaysComponent_Conditional_6_Template, 3, 1, "button", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 7)(8, "div", 8)(9, "app-data-table", 9);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_app_data_table_actionClick_9_listener($event) {
      return ctx.onActionClick($event);
    }, "PublicHolidaysComponent_Template_app_data_table_actionClick_9_listener"))("pageChange", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_app_data_table_pageChange_9_listener($event) {
      return ctx.onPageChange($event);
    }, "PublicHolidaysComponent_Template_app_data_table_pageChange_9_listener"))("pageSizeChange", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_app_data_table_pageSizeChange_9_listener($event) {
      return ctx.onPageSizeChange($event);
    }, "PublicHolidaysComponent_Template_app_data_table_pageSizeChange_9_listener"));
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "app-modal-wrapper", 10);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_app_modal_wrapper_close_10_listener() {
      return ctx.onHideImportModal();
    }, "PublicHolidaysComponent_Template_app_modal_wrapper_close_10_listener"));
    \u0275\u0275elementStart(11, "div", 11)(12, "form")(13, "div", 12)(14, "label", 13);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "select", 14);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_select_ngModelChange_16_listener($event) {
      return ctx.selectedTemplate.set($event);
    }, "PublicHolidaysComponent_Template_select_ngModelChange_16_listener"));
    \u0275\u0275repeaterCreate(17, PublicHolidaysComponent_For_18_Template, 2, 2, "option", 15, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 12)(20, "label", 16);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "select", 17);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_select_ngModelChange_22_listener($event) {
      return ctx.importYear.set($event);
    }, "PublicHolidaysComponent_Template_select_ngModelChange_22_listener"));
    \u0275\u0275repeaterCreate(23, PublicHolidaysComponent_For_24_Template, 2, 2, "option", 15, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 12)(26, "label", 18);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "select", 19);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_select_ngModelChange_28_listener($event) {
      return ctx.importBranchId.set($event);
    }, "PublicHolidaysComponent_Template_select_ngModelChange_28_listener"));
    \u0275\u0275elementStart(29, "option", 15);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 20);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 12)(34, "div", 21)(35, "input", 22);
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_input_ngModelChange_35_listener($event) {
      return ctx.overwriteExisting.set($event);
    }, "PublicHolidaysComponent_Template_input_ngModelChange_35_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "label", 23);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 20);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(40, "div", 24)(41, "button", 25);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_button_click_41_listener() {
      return ctx.onHideImportModal();
    }, "PublicHolidaysComponent_Template_button_click_41_listener"));
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 26);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function PublicHolidaysComponent_Template_button_click_43_listener() {
      return ctx.onImportTemplate();
    }, "PublicHolidaysComponent_Template_button_click_43_listener"));
    \u0275\u0275conditionalCreate(44, PublicHolidaysComponent_Conditional_44_Template, 1, 0, "span", 27);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("settings.holidays.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.canExportHolidays() ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.canImportHolidays() ? 6 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("data", ctx.tableData() || \u0275\u0275pureFunction0(35, _c0))("columns", ctx.tableColumns())("actions", ctx.tableActions())("totalItems", ctx.totalCount)("currentPage", ctx.currentPage)("pageSize", ctx.pageSize)("totalPages", ctx.totalPages)("loading", ctx.loading)("emptyTitle", ctx.t("settings.holidays.noHolidaysTitle"))("emptyMessage", ctx.t("settings.holidays.noHolidaysMessage"));
    \u0275\u0275advance();
    \u0275\u0275property("show", ctx.showImportModal())("title", ctx.t("settings.holidays.importTemplate"))("centered", true)("loading", ctx.importLoading());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.template"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.selectedTemplate());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.availableTemplates());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.year"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.importYear());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.getYearOptions());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.branch"));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx.importBranchId());
    \u0275\u0275advance();
    \u0275\u0275property("value", void 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.allBranches"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.branchHelpText"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx.overwriteExisting());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.holidays.overwriteExisting"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.overwriteHelpText"));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.importLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.importLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.importLoading() ? 44 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.holidays.import"), " ");
  }
}, "PublicHolidaysComponent_Template"), dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent, ModalWrapperComponent], styles: ["\n\n.container-fluid[_ngcontent-%COMP%] {\n  padding: 0 1.5rem;\n}\n.card-body[_ngcontent-%COMP%]   .row.g-3[_ngcontent-%COMP%] {\n  align-items: end;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  margin-bottom: 0.5rem;\n}\n.form-select[_ngcontent-%COMP%], \n.form-control[_ngcontent-%COMP%] {\n  border: 1px solid var(--bs-gray-300);\n  border-radius: 0.375rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-select[_ngcontent-%COMP%]:focus, \n.form-control[_ngcontent-%COMP%]:focus {\n  border-color: var(--bs-primary);\n  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  font-weight: 500;\n  padding: 0.5rem 1rem;\n  transition: all 0.15s ease-in-out;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n.btn-outline-primary[_ngcontent-%COMP%] {\n  color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n  transform: translateY(-1px);\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  color: var(--bs-gray-600);\n  border-color: var(--bs-gray-300);\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background-color: var(--bs-gray-100);\n  border-color: var(--bs-gray-400);\n}\n.h3[_ngcontent-%COMP%] {\n  color: var(--bs-gray-800);\n  font-weight: 600;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: var(--bs-gray-600) !important;\n}\n.card[_ngcontent-%COMP%] {\n  border: 1px solid var(--bs-gray-200);\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.dropdown-menu[_ngcontent-%COMP%] {\n  border: 1px solid var(--bs-gray-200);\n  border-radius: 0.375rem;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  padding: 0.5rem 0;\n}\n.dropdown-item[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  color: var(--bs-gray-700);\n  transition: background-color 0.15s ease-in-out;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover, \n.dropdown-item[_ngcontent-%COMP%]:focus {\n  background-color: var(--bs-gray-100);\n  color: var(--bs-gray-800);\n}\n.dropdown-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 1rem;\n  text-align: center;\n}\n.modal-content[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 0.5rem;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);\n}\n.modal-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--bs-gray-200);\n  padding: 1.5rem 1.5rem 1rem;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-gray-800);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--bs-gray-200);\n  padding: 1rem 1.5rem 1.5rem;\n}\n.btn-close[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  margin: -0.5rem -0.5rem -0.5rem auto;\n}\n.form-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n  margin-top: 0.25rem;\n}\n.form-check[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.form-check-input[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n}\n.form-check-label[_ngcontent-%COMP%] {\n  color: var(--bs-gray-700);\n  font-weight: 500;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  padding: 0.375rem 0.5rem;\n  border-radius: 0.25rem;\n}\n.badge.bg-success[_ngcontent-%COMP%] {\n  background-color: var(--bs-success) !important;\n}\n.badge.bg-secondary[_ngcontent-%COMP%] {\n  background-color: var(--bs-secondary) !important;\n}\n.badge.bg-info[_ngcontent-%COMP%] {\n  background-color: var(--bs-info) !important;\n}\n.badge.bg-primary[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary) !important;\n}\n.badge.bg-warning[_ngcontent-%COMP%] {\n  background-color: var(--bs-warning) !important;\n  color: var(--bs-primary) !important;\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 0.875rem;\n  height: 0.875rem;\n}\n@media (max-width: 768px) {\n  .container-fluid[_ngcontent-%COMP%] {\n    padding: 0 1rem;\n  }\n  .d-flex.gap-2[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .modal-dialog[_ngcontent-%COMP%] {\n    margin: 1rem;\n  }\n  .card-body[_ngcontent-%COMP%]   .row.g-3[_ngcontent-%COMP%] {\n    --bs-gutter-x: 1rem;\n  }\n  .col-md-1[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n}\n@media (max-width: 576px) {\n  .h3[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n  .text-muted[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .dropdown[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .dropdown-toggle[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.btn[_ngcontent-%COMP%]:focus, \n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.card[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in-out;\n}\n.table-responsive[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: var(--bs-gray-100);\n  border-radius: 4px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--bs-gray-400);\n  border-radius: 4px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: var(--bs-gray-500);\n}\n/*# sourceMappingURL=public-holidays.component.css.map */"] }));
var PublicHolidaysComponent = _PublicHolidaysComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PublicHolidaysComponent, [{
    type: Component,
    args: [{ selector: "app-public-holidays", standalone: true, imports: [FormsModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent, ModalWrapperComponent], template: `<div class="container-fluid">\r
  <!-- Page Header -->\r
  <app-page-header\r
    [title]="t('settings.holidays.title')">\r
  </app-page-header>\r
\r
  <!-- Unified Filter Component -->\r
  <app-unified-filter\r
    moduleName="public-holidays"\r
    [refreshing]="loading()"\r
    (searchChange)="onSearchTermChange($event)"\r
    (filtersChange)="onFiltersChange($event)"\r
    (add)="onCreateHoliday()"\r
    (refresh)="onRefreshData()">\r
  </app-unified-filter>\r
\r
  <!-- Additional Action Buttons -->\r
  <div class="d-flex justify-content-end align-items-center mb-4">\r
    <div class="d-flex gap-2">\r
      <!-- Export Dropdown -->\r
      @if (canExportHolidays()) {\r
        <div class="dropdown">\r
          <button class="btn btn-outline-secondary dropdown-toggle"\r
                  type="button"\r
                  data-bs-toggle="dropdown"\r
                  aria-expanded="false">\r
            <i class="fas fa-download me-1"></i>\r
            {{ t('settings.holidays.export') }}\r
          </button>\r
          <ul class="dropdown-menu">\r
            <li>\r
              <a class="dropdown-item" href="#" (click)="onExportHolidays('json'); $event.preventDefault()">\r
                <i class="fas fa-file-code me-2"></i>\r
                {{ t('settings.holidays.exportJson') }}\r
              </a>\r
            </li>\r
            <li>\r
              <a class="dropdown-item" href="#" (click)="onExportHolidays('csv'); $event.preventDefault()">\r
                <i class="fas fa-file-csv me-2"></i>\r
                {{ t('settings.holidays.exportCsv') }}\r
              </a>\r
            </li>\r
            <li>\r
              <a class="dropdown-item" href="#" (click)="onExportHolidays('ical'); $event.preventDefault()">\r
                <i class="fas fa-calendar me-2"></i>\r
                {{ t('settings.holidays.exportIcal') }}\r
              </a>\r
            </li>\r
          </ul>\r
        </div>\r
      }\r
\r
      <!-- Import Button -->\r
      @if (canImportHolidays()) {\r
        <button type="button"\r
                class="btn btn-outline-primary"\r
                (click)="onShowImportModal()">\r
          <i class="fas fa-upload me-1"></i>\r
          {{ t('settings.holidays.import') }}\r
        </button>\r
      }\r
    </div>\r
  </div>\r
\r
\r
  <!-- Data Table -->\r
  <div class="card">\r
    <div class="card-body">\r
      <app-data-table\r
        [data]="tableData() || []"\r
        [columns]="tableColumns()"\r
        [actions]="tableActions()"\r
        [totalItems]="totalCount"\r
        [currentPage]="currentPage"\r
        [pageSize]="pageSize"\r
        [totalPages]="totalPages"\r
        [loading]="loading"\r
        [emptyTitle]="t('settings.holidays.noHolidaysTitle')"\r
        [emptyMessage]="t('settings.holidays.noHolidaysMessage')"\r
        (actionClick)="onActionClick($event)"\r
        (pageChange)="onPageChange($event)"\r
        (pageSizeChange)="onPageSizeChange($event)">\r
      </app-data-table>\r
    </div>\r
  </div>\r
\r
  <!-- Import Modal -->\r
  <app-modal-wrapper\r
    [show]="showImportModal()"\r
    [title]="t('settings.holidays.importTemplate')"\r
    [centered]="true"\r
    [loading]="importLoading()"\r
    (close)="onHideImportModal()">\r
\r
    <div class="modal-body">\r
      <form>\r
              <!-- Template Selection -->\r
              <div class="mb-3">\r
                <label for="template" class="form-label">{{ t('settings.holidays.template') }}</label>\r
                <select id="template"\r
                        name="template"\r
                        class="form-select"\r
                        [ngModel]="selectedTemplate()"\r
                        (ngModelChange)="selectedTemplate.set($event)">\r
                  @for (template of availableTemplates(); track template) {\r
                    <option [value]="template">{{ getTemplateDisplayName(template) }}</option>\r
                  }\r
                </select>\r
              </div>\r
\r
              <!-- Year -->\r
              <div class="mb-3">\r
                <label for="importYear" class="form-label">{{ t('settings.holidays.year') }}</label>\r
                <select id="importYear"\r
                        name="importYear"\r
                        class="form-select"\r
                        [ngModel]="importYear()"\r
                        (ngModelChange)="importYear.set($event)">\r
                  @for (year of getYearOptions(); track year) {\r
                    <option [value]="year">{{ year }}</option>\r
                  }\r
                </select>\r
              </div>\r
\r
              <!-- Branch (Optional) -->\r
              <div class="mb-3">\r
                <label for="importBranch" class="form-label">{{ t('settings.holidays.branch') }}</label>\r
                <select id="importBranch"\r
                        name="importBranch"\r
                        class="form-select"\r
                        [ngModel]="importBranchId()"\r
                        (ngModelChange)="importBranchId.set($event)">\r
                  <option [value]="undefined">{{ t('settings.holidays.allBranches') }}</option>\r
                  <!-- Branch options would be loaded from a branches service -->\r
                </select>\r
                <div class="form-text">{{ t('settings.holidays.branchHelpText') }}</div>\r
              </div>\r
\r
              <!-- Overwrite Existing -->\r
              <div class="mb-3">\r
                <div class="form-check">\r
                  <input class="form-check-input"\r
                         type="checkbox"\r
                         id="overwriteExisting"\r
                         name="overwriteExisting"\r
                         [ngModel]="overwriteExisting()"\r
                         (ngModelChange)="overwriteExisting.set($event)">\r
                  <label class="form-check-label" for="overwriteExisting">\r
                    {{ t('settings.holidays.overwriteExisting') }}\r
                  </label>\r
                </div>\r
                <div class="form-text">{{ t('settings.holidays.overwriteHelpText') }}</div>\r
              </div>\r
      </form>\r
    </div>\r
\r
    <div modal-footer class="d-flex gap-2 justify-content-end">\r
      <button type="button"\r
              class="btn btn-secondary"\r
              (click)="onHideImportModal()"\r
              [disabled]="importLoading()">\r
        {{ t('common.cancel') }}\r
      </button>\r
      <button type="button"\r
              class="btn btn-primary"\r
              (click)="onImportTemplate()"\r
              [disabled]="importLoading()">\r
        @if (importLoading()) {\r
          <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>\r
        }\r
        {{ t('settings.holidays.import') }}\r
      </button>\r
    </div>\r
\r
  </app-modal-wrapper>\r
</div>`, styles: ["/* src/app/pages/settings/public-holidays/public-holidays.component.css */\n.container-fluid {\n  padding: 0 1.5rem;\n}\n.card-body .row.g-3 {\n  align-items: end;\n}\n.form-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n  margin-bottom: 0.5rem;\n}\n.form-select,\n.form-control {\n  border: 1px solid var(--bs-gray-300);\n  border-radius: 0.375rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-select:focus,\n.form-control:focus {\n  border-color: var(--bs-primary);\n  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.btn {\n  border-radius: 0.375rem;\n  font-weight: 500;\n  padding: 0.5rem 1rem;\n  transition: all 0.15s ease-in-out;\n}\n.btn-primary {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-primary:hover {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n.btn-outline-primary {\n  color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-outline-primary:hover {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n  transform: translateY(-1px);\n}\n.btn-outline-secondary {\n  color: var(--bs-gray-600);\n  border-color: var(--bs-gray-300);\n}\n.btn-outline-secondary:hover {\n  background-color: var(--bs-gray-100);\n  border-color: var(--bs-gray-400);\n}\n.h3 {\n  color: var(--bs-gray-800);\n  font-weight: 600;\n}\n.text-muted {\n  color: var(--bs-gray-600) !important;\n}\n.card {\n  border: 1px solid var(--bs-gray-200);\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.card-body {\n  padding: 1.5rem;\n}\n.dropdown-menu {\n  border: 1px solid var(--bs-gray-200);\n  border-radius: 0.375rem;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  padding: 0.5rem 0;\n}\n.dropdown-item {\n  padding: 0.5rem 1rem;\n  color: var(--bs-gray-700);\n  transition: background-color 0.15s ease-in-out;\n}\n.dropdown-item:hover,\n.dropdown-item:focus {\n  background-color: var(--bs-gray-100);\n  color: var(--bs-gray-800);\n}\n.dropdown-item i {\n  width: 1rem;\n  text-align: center;\n}\n.modal-content {\n  border: none;\n  border-radius: 0.5rem;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);\n}\n.modal-header {\n  border-bottom: 1px solid var(--bs-gray-200);\n  padding: 1.5rem 1.5rem 1rem;\n}\n.modal-title {\n  font-weight: 600;\n  color: var(--bs-gray-800);\n}\n.modal-body {\n  padding: 1.5rem;\n}\n.modal-footer {\n  border-top: 1px solid var(--bs-gray-200);\n  padding: 1rem 1.5rem 1.5rem;\n}\n.btn-close {\n  padding: 0.75rem;\n  margin: -0.5rem -0.5rem -0.5rem auto;\n}\n.form-text {\n  font-size: 0.875rem;\n  color: var(--bs-gray-600);\n  margin-top: 0.25rem;\n}\n.form-check {\n  margin-bottom: 0.5rem;\n}\n.form-check-input {\n  margin-top: 0.25rem;\n}\n.form-check-label {\n  color: var(--bs-gray-700);\n  font-weight: 500;\n}\n.badge {\n  font-size: 0.75rem;\n  font-weight: 500;\n  padding: 0.375rem 0.5rem;\n  border-radius: 0.25rem;\n}\n.badge.bg-success {\n  background-color: var(--bs-success) !important;\n}\n.badge.bg-secondary {\n  background-color: var(--bs-secondary) !important;\n}\n.badge.bg-info {\n  background-color: var(--bs-info) !important;\n}\n.badge.bg-primary {\n  background-color: var(--bs-primary) !important;\n}\n.badge.bg-warning {\n  background-color: var(--bs-warning) !important;\n  color: var(--bs-primary) !important;\n}\n.spinner-border-sm {\n  width: 0.875rem;\n  height: 0.875rem;\n}\n@media (max-width: 768px) {\n  .container-fluid {\n    padding: 0 1rem;\n  }\n  .d-flex.gap-2 {\n    flex-direction: column;\n    gap: 0.5rem !important;\n  }\n  .btn {\n    width: 100%;\n  }\n  .modal-dialog {\n    margin: 1rem;\n  }\n  .card-body .row.g-3 {\n    --bs-gutter-x: 1rem;\n  }\n  .col-md-1 {\n    margin-top: 1rem;\n  }\n}\n@media (max-width: 576px) {\n  .h3 {\n    font-size: 1.25rem;\n  }\n  .text-muted {\n    font-size: 0.875rem;\n  }\n  .dropdown {\n    width: 100%;\n  }\n  .dropdown-toggle {\n    width: 100%;\n  }\n}\n.btn:focus,\n.form-control:focus,\n.form-select:focus {\n  outline: none;\n  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.card {\n  animation: fadeIn 0.3s ease-in-out;\n}\n.table-responsive {\n  border-radius: 0.375rem;\n}\n::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n::-webkit-scrollbar-track {\n  background: var(--bs-gray-100);\n  border-radius: 4px;\n}\n::-webkit-scrollbar-thumb {\n  background: var(--bs-gray-400);\n  border-radius: 4px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: var(--bs-gray-500);\n}\n/*# sourceMappingURL=public-holidays.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PublicHolidaysComponent, { className: "PublicHolidaysComponent", filePath: "src/app/pages/settings/public-holidays/public-holidays.component.ts", lineNumber: 23 });
})();
export {
  PublicHolidaysComponent
};
//# sourceMappingURL=chunk-USOZFBN7.js.map
