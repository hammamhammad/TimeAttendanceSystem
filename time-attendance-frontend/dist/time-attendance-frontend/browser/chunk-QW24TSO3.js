import {
  EmploymentStatus,
  Gender,
  WorkLocationType
} from "./chunk-LZPEC357.js";
import {
  EmployeesService
} from "./chunk-IR2IKZBB.js";
import {
  DataTableComponent
} from "./chunk-7JZQN7NK.js";
import {
  UnifiedFilterComponent
} from "./chunk-THHKOIOG.js";
import "./chunk-5ZV3Z4IV.js";
import {
  StatusBadgeComponent
} from "./chunk-MAN5UEZP.js";
import "./chunk-DS3UNCKJ.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-7XYWDBYG.js";
import {
  ConfirmationService
} from "./chunk-NUNE7G5P.js";
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
import "./chunk-CVUMC7BN.js";
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
  EventEmitter,
  Input,
  Output,
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
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-2WKN5CRJ.js";
import {
  __async,
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/pages/employees/employee-table/employee-table.component.ts
function EmployeeTableComponent_ng_template_1_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 4)(2, "div", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div")(5, "div", 3);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 6);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const employee_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getInitials(employee_r2.firstName, employee_r2.lastName), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", employee_r2.firstName, " ", employee_r2.lastName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(employee_r2.email);
  }
}
__name(EmployeeTableComponent_ng_template_1_Case_0_Template, "EmployeeTableComponent_ng_template_1_Case_0_Template");
function EmployeeTableComponent_ng_template_1_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const employee_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", employee_r2.employeeNumber, " ");
  }
}
__name(EmployeeTableComponent_ng_template_1_Case_1_Template, "EmployeeTableComponent_ng_template_1_Case_1_Template");
function EmployeeTableComponent_ng_template_1_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const employee_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(employee_r2.departmentName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(employee_r2.branchName);
  }
}
__name(EmployeeTableComponent_ng_template_1_Case_2_Template, "EmployeeTableComponent_ng_template_1_Case_2_Template");
function EmployeeTableComponent_ng_template_1_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "app-status-badge", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const employee_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("status", ctx_r2.getEmploymentStatusBadgeStatus(employee_r2.employmentStatus))("label", ctx_r2.getEmploymentStatusLabel(employee_r2.employmentStatus));
  }
}
__name(EmployeeTableComponent_ng_template_1_Case_3_Template, "EmployeeTableComponent_ng_template_1_Case_3_Template");
function EmployeeTableComponent_ng_template_1_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const employee_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getGenderLabel(employee_r2.gender), " ");
  }
}
__name(EmployeeTableComponent_ng_template_1_Case_4_Template, "EmployeeTableComponent_ng_template_1_Case_4_Template");
function EmployeeTableComponent_ng_template_1_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "app-status-badge", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const employee_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("status", "info")("label", ctx_r2.getWorkLocationLabel(employee_r2.workLocationType));
  }
}
__name(EmployeeTableComponent_ng_template_1_Case_5_Template, "EmployeeTableComponent_ng_template_1_Case_5_Template");
function EmployeeTableComponent_ng_template_1_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "app-status-badge", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const employee_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("status", employee_r2.isActive ? "active" : "inactive")("label", employee_r2.isActive ? "Active" : "Inactive")("showIcon", true);
  }
}
__name(EmployeeTableComponent_ng_template_1_Case_6_Template, "EmployeeTableComponent_ng_template_1_Case_6_Template");
function EmployeeTableComponent_ng_template_1_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const employee_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatDate(employee_r2.hireDate), " ");
  }
}
__name(EmployeeTableComponent_ng_template_1_Case_7_Template, "EmployeeTableComponent_ng_template_1_Case_7_Template");
function EmployeeTableComponent_ng_template_1_Case_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const employee_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(employee_r2.currentShiftName);
  }
}
__name(EmployeeTableComponent_ng_template_1_Case_8_Conditional_1_Template, "EmployeeTableComponent_ng_template_1_Case_8_Conditional_1_Template");
function EmployeeTableComponent_ng_template_1_Case_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1, "No shift assigned");
    \u0275\u0275elementEnd();
  }
}
__name(EmployeeTableComponent_ng_template_1_Case_8_Conditional_2_Template, "EmployeeTableComponent_ng_template_1_Case_8_Conditional_2_Template");
function EmployeeTableComponent_ng_template_1_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, EmployeeTableComponent_ng_template_1_Case_8_Conditional_1_Template, 2, 1, "div");
    \u0275\u0275conditionalCreate(2, EmployeeTableComponent_ng_template_1_Case_8_Conditional_2_Template, 2, 0, "span", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const employee_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(employee_r2.currentShiftName ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!employee_r2.currentShiftName ? 2 : -1);
  }
}
__name(EmployeeTableComponent_ng_template_1_Case_8_Template, "EmployeeTableComponent_ng_template_1_Case_8_Template");
function EmployeeTableComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EmployeeTableComponent_ng_template_1_Case_0_Template, 9, 4, "div", 2)(1, EmployeeTableComponent_ng_template_1_Case_1_Template, 2, 1, "span", 3)(2, EmployeeTableComponent_ng_template_1_Case_2_Template, 5, 2, "div")(3, EmployeeTableComponent_ng_template_1_Case_3_Template, 2, 2, "span")(4, EmployeeTableComponent_ng_template_1_Case_4_Template, 2, 1, "span")(5, EmployeeTableComponent_ng_template_1_Case_5_Template, 2, 2, "span")(6, EmployeeTableComponent_ng_template_1_Case_6_Template, 2, 3, "span")(7, EmployeeTableComponent_ng_template_1_Case_7_Template, 2, 1, "span")(8, EmployeeTableComponent_ng_template_1_Case_8_Template, 3, 2, "div");
  }
  if (rf & 2) {
    let tmp_4_0;
    const column_r4 = ctx.column;
    \u0275\u0275conditional((tmp_4_0 = column_r4.key) === "name" ? 0 : tmp_4_0 === "employeeCode" ? 1 : tmp_4_0 === "department" ? 2 : tmp_4_0 === "employmentStatus" ? 3 : tmp_4_0 === "gender" ? 4 : tmp_4_0 === "workLocation" ? 5 : tmp_4_0 === "status" ? 6 : tmp_4_0 === "hireDate" ? 7 : tmp_4_0 === "shift" ? 8 : -1);
  }
}
__name(EmployeeTableComponent_ng_template_1_Template, "EmployeeTableComponent_ng_template_1_Template");
var _EmployeeTableComponent = class _EmployeeTableComponent {
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  employees = [];
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  totalPages = signal(1, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  totalItems = signal(0, ...ngDevMode ? [{ debugName: "totalItems" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  viewEmployee = new EventEmitter();
  editEmployee = new EventEmitter();
  deleteEmployee = new EventEmitter();
  changeShift = new EventEmitter();
  pageChange = new EventEmitter();
  pageSizeChange = new EventEmitter();
  selectionChange = new EventEmitter();
  sortChange = new EventEmitter();
  columns = [
    {
      key: "name",
      label: "Employee",
      width: "250px",
      sortable: true,
      priority: "high",
      mobileLabel: "Employee"
    },
    {
      key: "employeeCode",
      label: "Code",
      width: "100px",
      sortable: true,
      priority: "high",
      mobileLabel: "Code"
    },
    {
      key: "department",
      label: "Department",
      width: "200px",
      sortable: true,
      priority: "medium",
      hideOnMobile: false,
      mobileLabel: "Dept"
    },
    {
      key: "employmentStatus",
      label: "Employment",
      width: "120px",
      align: "center",
      sortable: true,
      priority: "low",
      hideOnMobile: true,
      mobileLabel: "Status"
    },
    {
      key: "workLocation",
      label: "Location",
      width: "100px",
      align: "center",
      priority: "low",
      hideOnMobile: true,
      mobileLabel: "Location"
    },
    {
      key: "shift",
      label: "Current Shift",
      width: "150px",
      priority: "medium",
      hideOnMobile: false,
      mobileLabel: "Shift"
    },
    {
      key: "hireDate",
      label: "Hire Date",
      width: "120px",
      sortable: true,
      priority: "low",
      hideOnMobile: true,
      mobileLabel: "Hired"
    },
    {
      key: "status",
      label: "Status",
      width: "100px",
      align: "center",
      sortable: true,
      priority: "high",
      mobileLabel: "Status"
    }
  ];
  get actions() {
    const actions = [];
    if (this.permissionService.has(`${PermissionResources.EMPLOYEE}.${PermissionActions.READ}`)) {
      actions.push({
        key: "view",
        label: "View",
        icon: "fa-eye",
        color: "info"
      });
    }
    if (this.permissionService.has(`${PermissionResources.EMPLOYEE}.${PermissionActions.UPDATE}`)) {
      actions.push({
        key: "edit",
        label: "Edit",
        icon: "fa-edit",
        color: "primary"
      });
      actions.push({
        key: "changeShift",
        label: "Change Shift",
        icon: "fa-clock",
        color: "warning"
      });
    }
    if (this.permissionService.has(`${PermissionResources.EMPLOYEE}.${PermissionActions.DELETE}`)) {
      actions.push({
        key: "delete",
        label: "Delete",
        icon: "fa-trash",
        color: "danger"
      });
    }
    return actions;
  }
  onActionClick(event) {
    const { action, item } = event;
    switch (action) {
      case "view":
        this.viewEmployee.emit(item);
        break;
      case "edit":
        this.editEmployee.emit(item);
        break;
      case "delete":
        this.deleteEmployee.emit(item);
        break;
      case "changeShift":
        this.changeShift.emit(item);
        break;
    }
  }
  onPageChange(page) {
    this.pageChange.emit(page);
  }
  onPageSizeChange(size) {
    this.pageSizeChange.emit(size);
  }
  onSelectionChange(selectedEmployees) {
    this.selectionChange.emit(selectedEmployees);
  }
  onSortChange(sortEvent) {
    this.sortChange.emit(sortEvent);
  }
  getInitials(firstName, lastName) {
    const first = firstName ? firstName.charAt(0).toUpperCase() : "";
    const last = lastName ? lastName.charAt(0).toUpperCase() : "";
    return first + last;
  }
  getEmploymentStatusLabel(status) {
    const statusMap = {
      [EmploymentStatus.Active]: "Active",
      [EmploymentStatus.FullTime]: "Full Time",
      [EmploymentStatus.PartTime]: "Part Time",
      [EmploymentStatus.Contract]: "Contract",
      [EmploymentStatus.Intern]: "Intern",
      [EmploymentStatus.Consultant]: "Consultant",
      [EmploymentStatus.Terminated]: "Terminated",
      [EmploymentStatus.Inactive]: "Inactive"
    };
    return statusMap[status] || "Unknown";
  }
  getEmploymentStatusClass(status) {
    const classMap = {
      [EmploymentStatus.Active]: "bg-success",
      [EmploymentStatus.FullTime]: "bg-success",
      [EmploymentStatus.PartTime]: "bg-info",
      [EmploymentStatus.Contract]: "bg-warning",
      [EmploymentStatus.Intern]: "bg-primary",
      [EmploymentStatus.Consultant]: "bg-light text-dark border",
      [EmploymentStatus.Terminated]: "bg-danger",
      [EmploymentStatus.Inactive]: "bg-light text-dark border"
    };
    return classMap[status] || "bg-light text-dark border";
  }
  getEmploymentStatusBadgeStatus(status) {
    const statusMap = {
      [EmploymentStatus.Active]: "success",
      [EmploymentStatus.FullTime]: "success",
      [EmploymentStatus.PartTime]: "info",
      [EmploymentStatus.Contract]: "warning",
      [EmploymentStatus.Intern]: "primary",
      [EmploymentStatus.Consultant]: "secondary",
      [EmploymentStatus.Terminated]: "danger",
      [EmploymentStatus.Inactive]: "secondary"
    };
    return statusMap[status] || "secondary";
  }
  getGenderLabel(gender) {
    return gender === Gender.Male ? "Male" : "Female";
  }
  getWorkLocationLabel(type) {
    const typeMap = {
      [WorkLocationType.OnSite]: "On-site",
      [WorkLocationType.Remote]: "Remote",
      [WorkLocationType.Hybrid]: "Hybrid"
    };
    return typeMap[type] || "Unknown";
  }
  formatDate(dateString) {
    if (!dateString)
      return "";
    const dateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (dateMatch) {
      const [, year, month, day] = dateMatch;
      const date2 = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date2.toLocaleDateString();
    }
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
};
__name(_EmployeeTableComponent, "EmployeeTableComponent");
__publicField(_EmployeeTableComponent, "\u0275fac", /* @__PURE__ */ __name(function EmployeeTableComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmployeeTableComponent)();
}, "EmployeeTableComponent_Factory"));
__publicField(_EmployeeTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmployeeTableComponent, selectors: [["app-employee-table"]], inputs: { employees: "employees", loading: "loading", currentPage: "currentPage", totalPages: "totalPages", totalItems: "totalItems", pageSize: "pageSize" }, outputs: { viewEmployee: "viewEmployee", editEmployee: "editEmployee", deleteEmployee: "deleteEmployee", changeShift: "changeShift", pageChange: "pageChange", pageSizeChange: "pageSizeChange", selectionChange: "selectionChange", sortChange: "sortChange" }, decls: 3, vars: 9, consts: [["cellTemplate", ""], [3, "actionClick", "pageChange", "pageSizeChange", "selectionChange", "sortChange", "data", "columns", "actions", "loading", "currentPage", "totalPages", "totalItems", "pageSize", "emptyMessage"], [1, "d-flex", "align-items-center"], [1, "fw-medium"], [1, "avatar-sm", "me-2"], [1, "avatar-initial", "bg-primary", "text-white", "rounded-circle"], [1, "text-muted"], [3, "status", "label"], [3, "status", "label", "showIcon"]], template: /* @__PURE__ */ __name(function EmployeeTableComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-data-table", 1);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function EmployeeTableComponent_Template_app_data_table_actionClick_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onActionClick($event));
    }, "EmployeeTableComponent_Template_app_data_table_actionClick_0_listener"))("pageChange", /* @__PURE__ */ __name(function EmployeeTableComponent_Template_app_data_table_pageChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageChange($event));
    }, "EmployeeTableComponent_Template_app_data_table_pageChange_0_listener"))("pageSizeChange", /* @__PURE__ */ __name(function EmployeeTableComponent_Template_app_data_table_pageSizeChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageSizeChange($event));
    }, "EmployeeTableComponent_Template_app_data_table_pageSizeChange_0_listener"))("selectionChange", /* @__PURE__ */ __name(function EmployeeTableComponent_Template_app_data_table_selectionChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSelectionChange($event));
    }, "EmployeeTableComponent_Template_app_data_table_selectionChange_0_listener"))("sortChange", /* @__PURE__ */ __name(function EmployeeTableComponent_Template_app_data_table_sortChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSortChange($event));
    }, "EmployeeTableComponent_Template_app_data_table_sortChange_0_listener"));
    \u0275\u0275template(1, EmployeeTableComponent_ng_template_1_Template, 9, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("data", ctx.employees)("columns", ctx.columns)("actions", ctx.actions)("loading", ctx.loading)("currentPage", ctx.currentPage)("totalPages", ctx.totalPages)("totalItems", ctx.totalItems)("pageSize", ctx.pageSize)("emptyMessage", "No employees found");
  }
}, "EmployeeTableComponent_Template"), dependencies: [DataTableComponent, StatusBadgeComponent], styles: ["\n\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n}\n.avatar-initial[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=employee-table.component.css.map */"] }));
var EmployeeTableComponent = _EmployeeTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeeTableComponent, [{
    type: Component,
    args: [{ selector: "app-employee-table", standalone: true, imports: [DataTableComponent, StatusBadgeComponent], template: `
    <app-data-table
      [data]="employees"
      [columns]="columns"
      [actions]="actions"
      [loading]="loading"
      [currentPage]="currentPage"
      [totalPages]="totalPages"
      [totalItems]="totalItems"
      [pageSize]="pageSize"
      [emptyMessage]="'No employees found'"
      (actionClick)="onActionClick($event)"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
      (selectionChange)="onSelectionChange($event)"
      (sortChange)="onSortChange($event)">
    
      <ng-template #cellTemplate let-employee let-column="column">
        @switch (column.key) {
          <!-- Employee name with avatar -->
          @case ('name') {
            <div class="d-flex align-items-center">
              <div class="avatar-sm me-2">
                <div class="avatar-initial bg-primary text-white rounded-circle">
                  {{ getInitials(employee.firstName, employee.lastName) }}
                </div>
              </div>
              <div>
                <div class="fw-medium">{{ employee.firstName }} {{ employee.lastName }}</div>
                <small class="text-muted">{{ employee.email }}</small>
              </div>
            </div>
          }
          <!-- Employee Code -->
          @case ('employeeCode') {
            <span class="fw-medium">
              {{ employee.employeeNumber }}
            </span>
          }
          <!-- Department with branch -->
          @case ('department') {
            <div>
              <div>{{ employee.departmentName }}</div>
              <small class="text-muted">{{ employee.branchName }}</small>
            </div>
          }
          <!-- Employment status with badge -->
          @case ('employmentStatus') {
            <span>
              <app-status-badge
                [status]="getEmploymentStatusBadgeStatus(employee.employmentStatus)"
                [label]="getEmploymentStatusLabel(employee.employmentStatus)">
              </app-status-badge>
            </span>
          }
          <!-- Gender -->
          @case ('gender') {
            <span>
              {{ getGenderLabel(employee.gender) }}
            </span>
          }
          <!-- Work location -->
          @case ('workLocation') {
            <span>
              <app-status-badge
                [status]="'info'"
                [label]="getWorkLocationLabel(employee.workLocationType)">
              </app-status-badge>
            </span>
          }
          <!-- Status -->
          @case ('status') {
            <span>
              <app-status-badge
                [status]="employee.isActive ? 'active' : 'inactive'"
                [label]="employee.isActive ? 'Active' : 'Inactive'"
                [showIcon]="true">
              </app-status-badge>
            </span>
          }
          <!-- Hire date -->
          @case ('hireDate') {
            <span>
              {{ formatDate(employee.hireDate) }}
            </span>
          }
          <!-- Current shift -->
          @case ('shift') {
            <div>
              @if (employee.currentShiftName) {
                <div>{{ employee.currentShiftName }}</div>
              }
              @if (!employee.currentShiftName) {
                <span class="text-muted">No shift assigned</span>
              }
            </div>
          }
        }
      </ng-template>
    </app-data-table>
    `, styles: ["/* angular:styles/component:css;b01443c16e75437b73dd8a728713eee6579ca4d4c02199e6657f116651c97be5;D:/Work/AI Code/TimeAttendanceSystem/time-attendance-frontend/src/app/pages/employees/employee-table/employee-table.component.ts */\n.avatar-sm {\n  width: 2rem;\n  height: 2rem;\n}\n.avatar-initial {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=employee-table.component.css.map */\n"] }]
  }], null, { employees: [{
    type: Input
  }], loading: [{
    type: Input
  }], currentPage: [{
    type: Input
  }], totalPages: [{
    type: Input
  }], totalItems: [{
    type: Input
  }], pageSize: [{
    type: Input
  }], viewEmployee: [{
    type: Output
  }], editEmployee: [{
    type: Output
  }], deleteEmployee: [{
    type: Output
  }], changeShift: [{
    type: Output
  }], pageChange: [{
    type: Output
  }], pageSizeChange: [{
    type: Output
  }], selectionChange: [{
    type: Output
  }], sortChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmployeeTableComponent, { className: "EmployeeTableComponent", filePath: "src/app/pages/employees/employee-table/employee-table.component.ts", lineNumber: 132 });
})();

// src/app/pages/employees/employees.component.ts
var _EmployeesComponent = class _EmployeesComponent {
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  employeesService = inject(EmployeesService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  router = inject(Router);
  // Signals
  employees = signal([], ...ngDevMode ? [{ debugName: "employees" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  totalCount = signal(0, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  totalPages = signal(0, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // Filter
  currentFilter = {};
  // Permission constants for use in template
  PERMISSIONS = {
    EMPLOYEE_CREATE: `${PermissionResources.EMPLOYEE}.${PermissionActions.CREATE}`,
    EMPLOYEE_READ: `${PermissionResources.EMPLOYEE}.${PermissionActions.READ}`,
    EMPLOYEE_UPDATE: `${PermissionResources.EMPLOYEE}.${PermissionActions.UPDATE}`,
    EMPLOYEE_DELETE: `${PermissionResources.EMPLOYEE}.${PermissionActions.DELETE}`,
    EMPLOYEE_MANAGE: `${PermissionResources.EMPLOYEE}.${PermissionActions.MANAGE}`
  };
  ngOnInit() {
    this.loadEmployees();
  }
  loadEmployees() {
    this.loading.set(true);
    const filter = __spreadValues({
      page: this.currentPage(),
      pageSize: this.pageSize()
    }, this.currentFilter);
    this.employeesService.getEmployees(filter).subscribe({
      next: /* @__PURE__ */ __name((result) => {
        this.employees.set(result.items);
        this.totalCount.set(result.totalCount);
        this.totalPages.set(result.totalPages);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load employees:", error);
        this.loading.set(false);
      }, "error")
    });
  }
  // Filter event handlers
  onSearchChange(searchTerm) {
    this.currentFilter = __spreadProps(__spreadValues({}, this.currentFilter), { search: searchTerm });
    this.currentPage.set(1);
    this.loadEmployees();
  }
  onAddEmployee() {
    this.router.navigate(["/employees/create"]);
  }
  onRefreshData() {
    this.currentFilter = {};
    this.currentPage.set(1);
    this.loadEmployees();
  }
  // Table event handlers
  onViewEmployee(employee) {
    this.router.navigate(["/employees", employee.id, "view"]);
  }
  onEditEmployee(employee) {
    this.router.navigate(["/employees", employee.id, "edit"]);
  }
  onDeleteEmployee(employee) {
    return __async(this, null, function* () {
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("employees.delete_employee"),
        message: `Are you sure you want to delete "${employee.firstName} ${employee.lastName}"? This action cannot be undone.`,
        confirmText: this.i18n.t("common.delete"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.employeesService.deleteEmployee(employee.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.loadEmployees();
            this.notificationService.success(this.i18n.t("app.success"), this.i18n.t("employees.employee_deleted"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete employee:", error);
            this.notificationService.error(this.i18n.t("app.error"), this.i18n.t("errors.server"));
          }, "error")
        });
      }
    });
  }
  onChangeShift(employee) {
    this.router.navigate(["/employees", employee.id, "change-shift"]);
  }
  onPageChange(page) {
    this.currentPage.set(page);
    this.loadEmployees();
  }
  onPageSizeChange(size) {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadEmployees();
  }
  onSelectionChange(selectedEmployees) {
    console.log("Selected employees:", selectedEmployees);
  }
  onSortChange(sortEvent) {
    this.currentFilter = __spreadProps(__spreadValues({}, this.currentFilter), {
      sortBy: sortEvent.column,
      sortDirection: sortEvent.direction
    });
    this.currentPage.set(1);
    this.loadEmployees();
  }
};
__name(_EmployeesComponent, "EmployeesComponent");
__publicField(_EmployeesComponent, "\u0275fac", /* @__PURE__ */ __name(function EmployeesComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmployeesComponent)();
}, "EmployeesComponent_Factory"));
__publicField(_EmployeesComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmployeesComponent, selectors: [["app-employees"]], decls: 4, vars: 13, consts: [[1, "employees-page"], [3, "title"], [3, "searchChange", "add", "refresh", "searchPlaceholder", "showAddButton", "addButtonText", "showRefreshButton", "refreshButtonText", "refreshing"], [3, "viewEmployee", "editEmployee", "deleteEmployee", "changeShift", "pageChange", "pageSizeChange", "selectionChange", "sortChange", "employees", "loading", "currentPage", "totalPages", "totalItems", "pageSize"]], template: /* @__PURE__ */ __name(function EmployeesComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-page-header", 1);
    \u0275\u0275elementStart(2, "app-unified-filter", 2);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function EmployeesComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      return ctx.onSearchChange($event);
    }, "EmployeesComponent_Template_app_unified_filter_searchChange_2_listener"))("add", /* @__PURE__ */ __name(function EmployeesComponent_Template_app_unified_filter_add_2_listener() {
      return ctx.onAddEmployee();
    }, "EmployeesComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function EmployeesComponent_Template_app_unified_filter_refresh_2_listener() {
      return ctx.onRefreshData();
    }, "EmployeesComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-employee-table", 3);
    \u0275\u0275listener("viewEmployee", /* @__PURE__ */ __name(function EmployeesComponent_Template_app_employee_table_viewEmployee_3_listener($event) {
      return ctx.onViewEmployee($event);
    }, "EmployeesComponent_Template_app_employee_table_viewEmployee_3_listener"))("editEmployee", /* @__PURE__ */ __name(function EmployeesComponent_Template_app_employee_table_editEmployee_3_listener($event) {
      return ctx.onEditEmployee($event);
    }, "EmployeesComponent_Template_app_employee_table_editEmployee_3_listener"))("deleteEmployee", /* @__PURE__ */ __name(function EmployeesComponent_Template_app_employee_table_deleteEmployee_3_listener($event) {
      return ctx.onDeleteEmployee($event);
    }, "EmployeesComponent_Template_app_employee_table_deleteEmployee_3_listener"))("changeShift", /* @__PURE__ */ __name(function EmployeesComponent_Template_app_employee_table_changeShift_3_listener($event) {
      return ctx.onChangeShift($event);
    }, "EmployeesComponent_Template_app_employee_table_changeShift_3_listener"))("pageChange", /* @__PURE__ */ __name(function EmployeesComponent_Template_app_employee_table_pageChange_3_listener($event) {
      return ctx.onPageChange($event);
    }, "EmployeesComponent_Template_app_employee_table_pageChange_3_listener"))("pageSizeChange", /* @__PURE__ */ __name(function EmployeesComponent_Template_app_employee_table_pageSizeChange_3_listener($event) {
      return ctx.onPageSizeChange($event);
    }, "EmployeesComponent_Template_app_employee_table_pageSizeChange_3_listener"))("selectionChange", /* @__PURE__ */ __name(function EmployeesComponent_Template_app_employee_table_selectionChange_3_listener($event) {
      return ctx.onSelectionChange($event);
    }, "EmployeesComponent_Template_app_employee_table_selectionChange_3_listener"))("sortChange", /* @__PURE__ */ __name(function EmployeesComponent_Template_app_employee_table_sortChange_3_listener($event) {
      return ctx.onSortChange($event);
    }, "EmployeesComponent_Template_app_employee_table_sortChange_3_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("employees.title"));
    \u0275\u0275advance();
    \u0275\u0275property("searchPlaceholder", ctx.i18n.t("employees.search_placeholder"))("showAddButton", true)("addButtonText", ctx.i18n.t("employees.add_employee"))("showRefreshButton", true)("refreshButtonText", ctx.i18n.t("common.refresh"))("refreshing", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("employees", ctx.employees())("loading", ctx.loading)("currentPage", ctx.currentPage)("totalPages", ctx.totalPages)("totalItems", ctx.totalCount)("pageSize", ctx.pageSize);
  }
}, "EmployeesComponent_Template"), dependencies: [UnifiedFilterComponent, EmployeeTableComponent, PageHeaderComponent], styles: ["\n\n.table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-top: none;\n  font-weight: 600;\n  color: #495057;\n}\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n.btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.75rem;\n}\n.modal[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.employee-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  object-fit: cover;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.75em;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n}\n.pagination[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  margin-bottom: 0;\n}\n.search-filters[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%], \n.search-filters[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n}\n.employee-status.active[_ngcontent-%COMP%] {\n  color: #198754;\n}\n.employee-status.inactive[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n@media (max-width: 768px) {\n  .table-responsive[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .btn-group-sm[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    padding: 0.125rem 0.25rem;\n  }\n  .modal-lg[_ngcontent-%COMP%] {\n    max-width: 95%;\n  }\n}\n/*# sourceMappingURL=employees.component.css.map */"] }));
var EmployeesComponent = _EmployeesComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeesComponent, [{
    type: Component,
    args: [{ selector: "app-employees", standalone: true, imports: [UnifiedFilterComponent, EmployeeTableComponent, PageHeaderComponent], template: `<div class="employees-page">
  <!-- Page Header -->
  <app-page-header
    [title]="i18n.t('employees.title')">
  </app-page-header>

  <!-- Filters Component -->
  <app-unified-filter
    [searchPlaceholder]="i18n.t('employees.search_placeholder')"
    [showAddButton]="true"
    [addButtonText]="i18n.t('employees.add_employee')"
    [showRefreshButton]="true"
    [refreshButtonText]="i18n.t('common.refresh')"
    [refreshing]="loading()"
    (searchChange)="onSearchChange($event)"
    (add)="onAddEmployee()"
    (refresh)="onRefreshData()">
  </app-unified-filter>

  <!-- Employees Table Component -->
  <app-employee-table
    [employees]="employees()"
    [loading]="loading"
    [currentPage]="currentPage"
    [totalPages]="totalPages"
    [totalItems]="totalCount"
    [pageSize]="pageSize"
    (viewEmployee)="onViewEmployee($event)"
    (editEmployee)="onEditEmployee($event)"
    (deleteEmployee)="onDeleteEmployee($event)"
    (changeShift)="onChangeShift($event)"
    (pageChange)="onPageChange($event)"
    (pageSizeChange)="onPageSizeChange($event)"
    (selectionChange)="onSelectionChange($event)"
    (sortChange)="onSortChange($event)">
  </app-employee-table>

</div>`, styles: ["/* src/app/pages/employees/employees.component.css */\n.table th {\n  background-color: #f8f9fa;\n  border-top: none;\n  font-weight: 600;\n  color: #495057;\n}\n.table td {\n  vertical-align: middle;\n}\n.btn-group-sm .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.75rem;\n}\n.modal {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.employee-avatar {\n  width: 40px;\n  height: 40px;\n  object-fit: cover;\n}\n.badge {\n  font-size: 0.75em;\n}\n.form-label {\n  font-weight: 500;\n  color: #495057;\n}\n.card-header {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n}\n.pagination {\n  margin-top: 1rem;\n  margin-bottom: 0;\n}\n.search-filters .form-control,\n.search-filters .form-select {\n  border-radius: 0.375rem;\n}\n.employee-status.active {\n  color: #198754;\n}\n.employee-status.inactive {\n  color: #6c757d;\n}\n@media (max-width: 768px) {\n  .table-responsive {\n    font-size: 0.875rem;\n  }\n  .btn-group-sm .btn {\n    padding: 0.125rem 0.25rem;\n  }\n  .modal-lg {\n    max-width: 95%;\n  }\n}\n/*# sourceMappingURL=employees.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmployeesComponent, { className: "EmployeesComponent", filePath: "src/app/pages/employees/employees.component.ts", lineNumber: 22 });
})();
export {
  EmployeesComponent
};
//# sourceMappingURL=chunk-QW24TSO3.js.map
