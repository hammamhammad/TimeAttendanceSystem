import {
  SearchableSelectComponent
} from "./chunk-2D23Y7U6.js";
import {
  BranchesService
} from "./chunk-Z44KTAEC.js";
import {
  ModalWrapperComponent
} from "./chunk-EDTHBJ53.js";
import {
  DataTableComponent
} from "./chunk-JW5UYWPK.js";
import {
  UnifiedFilterComponent
} from "./chunk-KEVORF3C.js";
import "./chunk-NKWUQBPB.js";
import {
  StatusBadgeComponent
} from "./chunk-TT5VOWGP.js";
import "./chunk-SKLP6OYI.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-XLGMY32C.js";
import {
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
import {
  PermissionService
} from "./chunk-DWXA666M.js";
import {
  PermissionActions,
  PermissionResources
} from "./chunk-EVMJ7ILG.js";
import "./chunk-VATI3GP6.js";
import {
  PageHeaderComponent
} from "./chunk-V6PMR2EI.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
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
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-DUNHAUAW.js";
import {
  __async,
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/pages/branches/branch-table/branch-table.component.ts
function BranchTableComponent_ng_template_1_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div")(5, "div", 5);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 6);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const branch_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", branch_r2.code.charAt(0).toUpperCase(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(branch_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(branch_r2.code);
  }
}
__name(BranchTableComponent_ng_template_1_Case_0_Template, "BranchTableComponent_ng_template_1_Case_0_Template");
function BranchTableComponent_ng_template_1_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const branch_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(branch_r2.timeZone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getTimezoneDisplay(branch_r2.timeZone));
  }
}
__name(BranchTableComponent_ng_template_1_Case_1_Template, "BranchTableComponent_ng_template_1_Case_1_Template");
function BranchTableComponent_ng_template_1_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "app-status-badge", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("status", branch_r2.isActive ? "active" : "inactive")("label", branch_r2.isActive ? "Active" : "Inactive")("showIcon", true);
  }
}
__name(BranchTableComponent_ng_template_1_Case_2_Template, "BranchTableComponent_ng_template_1_Case_2_Template");
function BranchTableComponent_ng_template_1_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "app-status-badge", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("status", "primary")("label", (branch_r2.employeeCount || 0).toString());
  }
}
__name(BranchTableComponent_ng_template_1_Case_3_Template, "BranchTableComponent_ng_template_1_Case_3_Template");
function BranchTableComponent_ng_template_1_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatDate(branch_r2.createdAtUtc), " ");
  }
}
__name(BranchTableComponent_ng_template_1_Case_4_Template, "BranchTableComponent_ng_template_1_Case_4_Template");
function BranchTableComponent_ng_template_1_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatDate(branch_r2.modifiedAtUtc), " ");
  }
}
__name(BranchTableComponent_ng_template_1_Case_5_Template, "BranchTableComponent_ng_template_1_Case_5_Template");
function BranchTableComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, BranchTableComponent_ng_template_1_Case_0_Template, 9, 3, "div", 2)(1, BranchTableComponent_ng_template_1_Case_1_Template, 5, 2, "div")(2, BranchTableComponent_ng_template_1_Case_2_Template, 2, 3, "span")(3, BranchTableComponent_ng_template_1_Case_3_Template, 2, 2, "span")(4, BranchTableComponent_ng_template_1_Case_4_Template, 2, 1, "span")(5, BranchTableComponent_ng_template_1_Case_5_Template, 2, 1, "span");
  }
  if (rf & 2) {
    let tmp_4_0;
    const column_r4 = ctx.column;
    \u0275\u0275conditional((tmp_4_0 = column_r4.key) === "branch" ? 0 : tmp_4_0 === "timezone" ? 1 : tmp_4_0 === "status" ? 2 : tmp_4_0 === "employeeCount" ? 3 : tmp_4_0 === "created" ? 4 : tmp_4_0 === "updated" ? 5 : -1);
  }
}
__name(BranchTableComponent_ng_template_1_Template, "BranchTableComponent_ng_template_1_Template");
var _BranchTableComponent = class _BranchTableComponent {
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  branches = [];
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  totalPages = signal(1, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  totalItems = signal(0, ...ngDevMode ? [{ debugName: "totalItems" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  viewBranch = new EventEmitter();
  editBranch = new EventEmitter();
  deleteBranch = new EventEmitter();
  pageChange = new EventEmitter();
  pageSizeChange = new EventEmitter();
  selectionChange = new EventEmitter();
  sortChange = new EventEmitter();
  columns = [
    { key: "branch", label: "Branch", width: "250px", sortable: true },
    { key: "timezone", label: "Timezone", width: "200px", sortable: true },
    { key: "employeeCount", label: "Employees", width: "100px", align: "center", sortable: true },
    { key: "status", label: "Status", width: "100px", align: "center", sortable: true },
    { key: "created", label: "Created", width: "120px", sortable: true },
    { key: "updated", label: "Updated", width: "120px", sortable: true }
  ];
  get actions() {
    const actions = [];
    if (this.permissionService.has(`${PermissionResources.BRANCH}.${PermissionActions.READ}`)) {
      actions.push({
        key: "view",
        label: "View",
        icon: "fa-eye",
        color: "info"
      });
    }
    if (this.permissionService.has(`${PermissionResources.BRANCH}.${PermissionActions.UPDATE}`)) {
      actions.push({
        key: "edit",
        label: "Edit",
        icon: "fa-edit",
        color: "primary"
      });
    }
    if (this.permissionService.has(`${PermissionResources.BRANCH}.${PermissionActions.DELETE}`)) {
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
        this.viewBranch.emit(item);
        break;
      case "edit":
        this.editBranch.emit(item);
        break;
      case "delete":
        this.deleteBranch.emit(item);
        break;
    }
  }
  onPageChange(page) {
    this.pageChange.emit(page);
  }
  onPageSizeChange(size) {
    this.pageSizeChange.emit(size);
  }
  onSelectionChange(selectedBranches) {
    this.selectionChange.emit(selectedBranches);
  }
  onSortChange(sortEvent) {
    this.sortChange.emit(sortEvent);
  }
  getTimezoneDisplay(timeZone) {
    const date = /* @__PURE__ */ new Date();
    try {
      return date.toLocaleTimeString("en-US", {
        timeZone,
        timeZoneName: "short",
        hour12: false
      }).split(" ")[1] || "";
    } catch (error) {
      return timeZone;
    }
  }
  formatDate(dateString) {
    if (!dateString) {
      return "-";
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "-";
    }
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
};
__name(_BranchTableComponent, "BranchTableComponent");
__publicField(_BranchTableComponent, "\u0275fac", /* @__PURE__ */ __name(function BranchTableComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BranchTableComponent)();
}, "BranchTableComponent_Factory"));
__publicField(_BranchTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BranchTableComponent, selectors: [["app-branch-table"]], inputs: { branches: "branches", loading: "loading", currentPage: "currentPage", totalPages: "totalPages", totalItems: "totalItems", pageSize: "pageSize" }, outputs: { viewBranch: "viewBranch", editBranch: "editBranch", deleteBranch: "deleteBranch", pageChange: "pageChange", pageSizeChange: "pageSizeChange", selectionChange: "selectionChange", sortChange: "sortChange" }, decls: 3, vars: 9, consts: [["cellTemplate", ""], [3, "actionClick", "pageChange", "pageSizeChange", "selectionChange", "sortChange", "data", "columns", "actions", "loading", "currentPage", "totalPages", "totalItems", "pageSize", "emptyMessage"], [1, "d-flex", "align-items-center"], [1, "avatar-sm", "me-2"], [1, "avatar-initial", "bg-info", "text-white", "rounded-circle"], [1, "fw-medium"], [1, "text-muted"], [3, "status", "label", "showIcon"], [3, "status", "label"]], template: /* @__PURE__ */ __name(function BranchTableComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-data-table", 1);
    \u0275\u0275listener("actionClick", /* @__PURE__ */ __name(function BranchTableComponent_Template_app_data_table_actionClick_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onActionClick($event));
    }, "BranchTableComponent_Template_app_data_table_actionClick_0_listener"))("pageChange", /* @__PURE__ */ __name(function BranchTableComponent_Template_app_data_table_pageChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageChange($event));
    }, "BranchTableComponent_Template_app_data_table_pageChange_0_listener"))("pageSizeChange", /* @__PURE__ */ __name(function BranchTableComponent_Template_app_data_table_pageSizeChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageSizeChange($event));
    }, "BranchTableComponent_Template_app_data_table_pageSizeChange_0_listener"))("selectionChange", /* @__PURE__ */ __name(function BranchTableComponent_Template_app_data_table_selectionChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSelectionChange($event));
    }, "BranchTableComponent_Template_app_data_table_selectionChange_0_listener"))("sortChange", /* @__PURE__ */ __name(function BranchTableComponent_Template_app_data_table_sortChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSortChange($event));
    }, "BranchTableComponent_Template_app_data_table_sortChange_0_listener"));
    \u0275\u0275template(1, BranchTableComponent_ng_template_1_Template, 6, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("data", ctx.branches)("columns", ctx.columns)("actions", ctx.actions)("loading", ctx.loading)("currentPage", ctx.currentPage)("totalPages", ctx.totalPages)("totalItems", ctx.totalItems)("pageSize", ctx.pageSize)("emptyMessage", "No branches found");
  }
}, "BranchTableComponent_Template"), dependencies: [DataTableComponent, StatusBadgeComponent], styles: ["\n\n.avatar-sm[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n}\n.avatar-initial[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=branch-table.component.css.map */"] }));
var BranchTableComponent = _BranchTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BranchTableComponent, [{
    type: Component,
    args: [{ selector: "app-branch-table", standalone: true, imports: [DataTableComponent, StatusBadgeComponent], template: `
    <app-data-table
      [data]="branches"
      [columns]="columns"
      [actions]="actions"
      [loading]="loading"
      [currentPage]="currentPage"
      [totalPages]="totalPages"
      [totalItems]="totalItems"
      [pageSize]="pageSize"
      [emptyMessage]="'No branches found'"
      (actionClick)="onActionClick($event)"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
      (selectionChange)="onSelectionChange($event)"
      (sortChange)="onSortChange($event)">
    
      <ng-template #cellTemplate let-branch let-column="column">
        @switch (column.key) {
          <!-- Branch info -->
          @case ('branch') {
            <div class="d-flex align-items-center">
              <div class="avatar-sm me-2">
                <div class="avatar-initial bg-info text-white rounded-circle">
                  {{ branch.code.charAt(0).toUpperCase() }}
                </div>
              </div>
              <div>
                <div class="fw-medium">{{ branch.name }}</div>
                <small class="text-muted">{{ branch.code }}</small>
              </div>
            </div>
          }
          <!-- Timezone -->
          @case ('timezone') {
            <div>
              <div>{{ branch.timeZone }}</div>
              <small class="text-muted">{{ getTimezoneDisplay(branch.timeZone) }}</small>
            </div>
          }
          <!-- Status -->
          @case ('status') {
            <span>
              <app-status-badge
                [status]="branch.isActive ? 'active' : 'inactive'"
                [label]="branch.isActive ? 'Active' : 'Inactive'"
                [showIcon]="true">
              </app-status-badge>
            </span>
          }
          <!-- Employee count -->
          @case ('employeeCount') {
            <span>
              <app-status-badge
                [status]="'primary'"
                [label]="(branch.employeeCount || 0).toString()">
              </app-status-badge>
            </span>
          }
          <!-- Created date -->
          @case ('created') {
            <span>
              {{ formatDate(branch.createdAtUtc) }}
            </span>
          }
          <!-- Last updated -->
          @case ('updated') {
            <span>
              {{ formatDate(branch.modifiedAtUtc) }}
            </span>
          }
        }
      </ng-template>
    </app-data-table>
    `, styles: ["/* angular:styles/component:css;b01443c16e75437b73dd8a728713eee6579ca4d4c02199e6657f116651c97be5;D:/Work/TimeAttendanceSystem/time-attendance-frontend/src/app/pages/branches/branch-table/branch-table.component.ts */\n.avatar-sm {\n  width: 2rem;\n  height: 2rem;\n}\n.avatar-initial {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=branch-table.component.css.map */\n"] }]
  }], null, { branches: [{
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
  }], viewBranch: [{
    type: Output
  }], editBranch: [{
    type: Output
  }], deleteBranch: [{
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BranchTableComponent, { className: "BranchTableComponent", filePath: "src/app/pages/branches/branch-table/branch-table.component.ts", lineNumber: 106 });
})();

// src/app/shared/constants/timezone.constants.ts
var TIMEZONE_OPTIONS = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)", offset: "UTC+00:00" },
  { value: "America/New_York", label: "Eastern Time (US & Canada)", offset: "UTC-05:00" },
  { value: "America/Chicago", label: "Central Time (US & Canada)", offset: "UTC-06:00" },
  { value: "America/Denver", label: "Mountain Time (US & Canada)", offset: "UTC-07:00" },
  { value: "America/Los_Angeles", label: "Pacific Time (US & Canada)", offset: "UTC-08:00" },
  { value: "Europe/London", label: "London, Edinburgh, Dublin", offset: "UTC+00:00" },
  { value: "Europe/Paris", label: "Paris, Madrid, Amsterdam", offset: "UTC+01:00" },
  { value: "Europe/Berlin", label: "Berlin, Rome, Stockholm", offset: "UTC+01:00" },
  { value: "Europe/Moscow", label: "Moscow, St. Petersburg", offset: "UTC+03:00" },
  { value: "Asia/Dubai", label: "Dubai, Abu Dhabi", offset: "UTC+04:00" },
  { value: "Asia/Riyadh", label: "Riyadh, Kuwait", offset: "UTC+03:00" },
  { value: "Asia/Qatar", label: "Doha", offset: "UTC+03:00" },
  { value: "Asia/Bahrain", label: "Manama", offset: "UTC+03:00" },
  { value: "Asia/Karachi", label: "Islamabad, Karachi", offset: "UTC+05:00" },
  { value: "Asia/Kolkata", label: "New Delhi, Mumbai", offset: "UTC+05:30" },
  { value: "Asia/Shanghai", label: "Beijing, Shanghai, Hong Kong", offset: "UTC+08:00" },
  { value: "Asia/Tokyo", label: "Tokyo, Osaka, Sapporo", offset: "UTC+09:00" },
  { value: "Asia/Seoul", label: "Seoul", offset: "UTC+09:00" },
  { value: "Australia/Sydney", label: "Sydney, Melbourne", offset: "UTC+10:00" },
  { value: "Pacific/Auckland", label: "Auckland, Wellington", offset: "UTC+12:00" }
];

// src/app/pages/branches/branch-form-modal/branch-form-modal.component.ts
function BranchFormModalComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Branch code is required.");
    \u0275\u0275elementEnd();
  }
}
__name(BranchFormModalComponent_Conditional_6_Conditional_1_Template, "BranchFormModalComponent_Conditional_6_Conditional_1_Template");
function BranchFormModalComponent_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Branch code must be at least 2 characters.");
    \u0275\u0275elementEnd();
  }
}
__name(BranchFormModalComponent_Conditional_6_Conditional_2_Template, "BranchFormModalComponent_Conditional_6_Conditional_2_Template");
function BranchFormModalComponent_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Branch code cannot exceed 10 characters.");
    \u0275\u0275elementEnd();
  }
}
__name(BranchFormModalComponent_Conditional_6_Conditional_3_Template, "BranchFormModalComponent_Conditional_6_Conditional_3_Template");
function BranchFormModalComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275conditionalCreate(1, BranchFormModalComponent_Conditional_6_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(2, BranchFormModalComponent_Conditional_6_Conditional_2_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(3, BranchFormModalComponent_Conditional_6_Conditional_3_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_1_0 = ctx_r0.branchForm.get("code")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r0.branchForm.get("code")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["minlength"]) ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_3_0 = ctx_r0.branchForm.get("code")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]) ? 3 : -1);
  }
}
__name(BranchFormModalComponent_Conditional_6_Template, "BranchFormModalComponent_Conditional_6_Template");
function BranchFormModalComponent_Conditional_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Branch name is required.");
    \u0275\u0275elementEnd();
  }
}
__name(BranchFormModalComponent_Conditional_11_Conditional_1_Template, "BranchFormModalComponent_Conditional_11_Conditional_1_Template");
function BranchFormModalComponent_Conditional_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Branch name must be at least 2 characters.");
    \u0275\u0275elementEnd();
  }
}
__name(BranchFormModalComponent_Conditional_11_Conditional_2_Template, "BranchFormModalComponent_Conditional_11_Conditional_2_Template");
function BranchFormModalComponent_Conditional_11_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Branch name cannot exceed 100 characters.");
    \u0275\u0275elementEnd();
  }
}
__name(BranchFormModalComponent_Conditional_11_Conditional_3_Template, "BranchFormModalComponent_Conditional_11_Conditional_3_Template");
function BranchFormModalComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275conditionalCreate(1, BranchFormModalComponent_Conditional_11_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(2, BranchFormModalComponent_Conditional_11_Conditional_2_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(3, BranchFormModalComponent_Conditional_11_Conditional_3_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_1_0 = ctx_r0.branchForm.get("name")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r0.branchForm.get("name")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["minlength"]) ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_3_0 = ctx_r0.branchForm.get("name")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]) ? 3 : -1);
  }
}
__name(BranchFormModalComponent_Conditional_11_Template, "BranchFormModalComponent_Conditional_11_Template");
function BranchFormModalComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1, " Timezone is required. ");
    \u0275\u0275elementEnd();
  }
}
__name(BranchFormModalComponent_Conditional_16_Template, "BranchFormModalComponent_Conditional_16_Template");
function BranchFormModalComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 18);
  }
}
__name(BranchFormModalComponent_Conditional_28_Template, "BranchFormModalComponent_Conditional_28_Template");
function BranchFormModalComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 19);
  }
}
__name(BranchFormModalComponent_Conditional_29_Template, "BranchFormModalComponent_Conditional_29_Template");
var _BranchFormModalComponent = class _BranchFormModalComponent {
  fb = inject(FormBuilder);
  i18n = inject(I18nService);
  show = false;
  branch = null;
  close = new EventEmitter();
  save = new EventEmitter();
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  branchForm;
  timezoneOptions = TIMEZONE_OPTIONS.map((tz) => ({
    value: tz.value,
    label: tz.label,
    subLabel: tz.offset
  }));
  get editMode() {
    return !!this.branch;
  }
  constructor() {
    this.branchForm = this.fb.group({
      code: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      timeZone: ["", Validators.required],
      isActive: [true]
    });
  }
  ngOnInit() {
    if (this.show && this.branch) {
      this.loadBranchData();
    }
  }
  ngOnChanges() {
    if (this.show) {
      if (this.branch) {
        this.loadBranchData();
      } else {
        this.resetForm();
      }
    }
  }
  loadBranchData() {
    if (this.branch) {
      this.branchForm.patchValue({
        code: this.branch.code,
        name: this.branch.name,
        timeZone: this.branch.timeZone,
        isActive: this.branch.isActive
      });
    }
  }
  resetForm() {
    this.branchForm.reset({
      code: "",
      name: "",
      timeZone: "UTC",
      isActive: true
    });
  }
  onTimezoneChange(timezone) {
    this.branchForm.patchValue({ timeZone: timezone });
  }
  onSubmit() {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    const formValue = this.branchForm.value;
    const branchData = {
      code: formValue.code.trim(),
      name: formValue.name.trim(),
      timeZone: formValue.timeZone,
      isActive: formValue.isActive
    };
    this.save.emit(branchData);
  }
  onClose() {
    this.close.emit();
  }
  // Called from parent to reset submitting state
  resetSubmitting() {
    this.submitting.set(false);
  }
};
__name(_BranchFormModalComponent, "BranchFormModalComponent");
__publicField(_BranchFormModalComponent, "\u0275fac", /* @__PURE__ */ __name(function BranchFormModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BranchFormModalComponent)();
}, "BranchFormModalComponent_Factory"));
__publicField(_BranchFormModalComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BranchFormModalComponent, selectors: [["app-branch-form-modal"]], inputs: { show: "show", branch: "branch" }, outputs: { close: "close", save: "save" }, features: [\u0275\u0275NgOnChangesFeature], decls: 31, vars: 22, consts: [[3, "close", "show", "title", "centered", "loading"], [3, "ngSubmit", "formGroup"], [1, "mb-3"], ["for", "code", 1, "form-label"], ["type", "text", "id", "code", "formControlName", "code", "placeholder", "Enter branch code", 1, "form-control"], [1, "invalid-feedback"], ["for", "name", 1, "form-label"], ["type", "text", "id", "name", "formControlName", "name", "placeholder", "Enter branch name", 1, "form-control"], ["for", "timeZone", 1, "form-label"], [3, "selectionChange", "options", "value", "placeholder", "searchable", "clearable"], [1, "invalid-feedback", "d-block"], [1, "form-check"], ["type", "checkbox", "id", "isActive", "formControlName", "isActive", 1, "form-check-input"], ["for", "isActive", 1, "form-check-label"], [1, "form-text"], ["modal-footer", "", 1, "d-flex", "gap-2", "justify-content-end"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-save", "me-2"]], template: /* @__PURE__ */ __name(function BranchFormModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-modal-wrapper", 0);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function BranchFormModalComponent_Template_app_modal_wrapper_close_0_listener() {
      return ctx.onClose();
    }, "BranchFormModalComponent_Template_app_modal_wrapper_close_0_listener"));
    \u0275\u0275elementStart(1, "form", 1);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function BranchFormModalComponent_Template_form_ngSubmit_1_listener() {
      return ctx.onSubmit();
    }, "BranchFormModalComponent_Template_form_ngSubmit_1_listener"));
    \u0275\u0275elementStart(2, "div", 2)(3, "label", 3);
    \u0275\u0275text(4, "Branch Code *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 4);
    \u0275\u0275conditionalCreate(6, BranchFormModalComponent_Conditional_6_Template, 4, 3, "div", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 2)(8, "label", 6);
    \u0275\u0275text(9, "Branch Name *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 7);
    \u0275\u0275conditionalCreate(11, BranchFormModalComponent_Conditional_11_Template, 4, 3, "div", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 2)(13, "label", 8);
    \u0275\u0275text(14, "Timezone *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "app-searchable-select", 9);
    \u0275\u0275listener("selectionChange", /* @__PURE__ */ __name(function BranchFormModalComponent_Template_app_searchable_select_selectionChange_15_listener($event) {
      return ctx.onTimezoneChange($event);
    }, "BranchFormModalComponent_Template_app_searchable_select_selectionChange_15_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, BranchFormModalComponent_Conditional_16_Template, 2, 0, "div", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 2)(18, "div", 11);
    \u0275\u0275element(19, "input", 12);
    \u0275\u0275elementStart(20, "label", 13);
    \u0275\u0275text(21, " Active ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 14);
    \u0275\u0275text(23, "Inactive branches will not be available for new employee assignments.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 15)(25, "button", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function BranchFormModalComponent_Template_button_click_25_listener() {
      return ctx.onClose();
    }, "BranchFormModalComponent_Template_button_click_25_listener"));
    \u0275\u0275text(26, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 17);
    \u0275\u0275conditionalCreate(28, BranchFormModalComponent_Conditional_28_Template, 1, 0, "span", 18);
    \u0275\u0275conditionalCreate(29, BranchFormModalComponent_Conditional_29_Template, 1, 0, "i", 19);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_10_0;
    let tmp_14_0;
    \u0275\u0275property("show", ctx.show)("title", ctx.editMode ? "Edit Branch" : "Create Branch")("centered", true)("loading", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx.branchForm);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-invalid", ((tmp_5_0 = ctx.branchForm.get("code")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.branchForm.get("code")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_6_0 = ctx.branchForm.get("code")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.branchForm.get("code")) == null ? null : tmp_6_0.touched) ? 6 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-invalid", ((tmp_7_0 = ctx.branchForm.get("name")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.branchForm.get("name")) == null ? null : tmp_7_0.touched));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_8_0 = ctx.branchForm.get("name")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.branchForm.get("name")) == null ? null : tmp_8_0.touched) ? 11 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("options", ctx.timezoneOptions)("value", ((tmp_10_0 = ctx.branchForm.get("timeZone")) == null ? null : tmp_10_0.value) || "")("placeholder", "Select timezone")("searchable", true)("clearable", false);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_14_0 = ctx.branchForm.get("timeZone")) == null ? null : tmp_14_0.invalid) && ((tmp_14_0 = ctx.branchForm.get("timeZone")) == null ? null : tmp_14_0.touched) ? 16 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", ctx.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.branchForm.invalid || ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.submitting() ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.submitting() ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.submitting() ? "Saving..." : ctx.editMode ? "Update Branch" : "Create Branch", " ");
  }
}, "BranchFormModalComponent_Template"), dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, ReactiveFormsModule, FormGroupDirective, FormControlName, SearchableSelectComponent, ModalWrapperComponent], encapsulation: 2 }));
var BranchFormModalComponent = _BranchFormModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BranchFormModalComponent, [{
    type: Component,
    args: [{
      selector: "app-branch-form-modal",
      standalone: true,
      imports: [FormsModule, ReactiveFormsModule, SearchableSelectComponent, ModalWrapperComponent],
      template: `
    <app-modal-wrapper
      [show]="show"
      [title]="(editMode ? 'Edit Branch' : 'Create Branch')"
      [centered]="true"
      [loading]="submitting()"
      (close)="onClose()">
    
      <form [formGroup]="branchForm" (ngSubmit)="onSubmit()">
        <!-- Branch Code -->
        <div class="mb-3">
          <label for="code" class="form-label">Branch Code *</label>
          <input type="text"
            id="code"
            class="form-control"
            formControlName="code"
            [class.is-invalid]="branchForm.get('code')?.invalid && branchForm.get('code')?.touched"
            placeholder="Enter branch code">
          @if (branchForm.get('code')?.invalid && branchForm.get('code')?.touched) {
            <div class="invalid-feedback">
              @if (branchForm.get('code')?.errors?.['required']) {
                <div>Branch code is required.</div>
              }
              @if (branchForm.get('code')?.errors?.['minlength']) {
                <div>Branch code must be at least 2 characters.</div>
              }
              @if (branchForm.get('code')?.errors?.['maxlength']) {
                <div>Branch code cannot exceed 10 characters.</div>
              }
            </div>
          }
        </div>
    
        <!-- Branch Name -->
        <div class="mb-3">
          <label for="name" class="form-label">Branch Name *</label>
          <input type="text"
            id="name"
            class="form-control"
            formControlName="name"
            [class.is-invalid]="branchForm.get('name')?.invalid && branchForm.get('name')?.touched"
            placeholder="Enter branch name">
          @if (branchForm.get('name')?.invalid && branchForm.get('name')?.touched) {
            <div class="invalid-feedback">
              @if (branchForm.get('name')?.errors?.['required']) {
                <div>Branch name is required.</div>
              }
              @if (branchForm.get('name')?.errors?.['minlength']) {
                <div>Branch name must be at least 2 characters.</div>
              }
              @if (branchForm.get('name')?.errors?.['maxlength']) {
                <div>Branch name cannot exceed 100 characters.</div>
              }
            </div>
          }
        </div>
    
        <!-- Timezone -->
        <div class="mb-3">
          <label for="timeZone" class="form-label">Timezone *</label>
          <app-searchable-select
            [options]="timezoneOptions"
            [value]="branchForm.get('timeZone')?.value || ''"
            (selectionChange)="onTimezoneChange($event)"
            [placeholder]="'Select timezone'"
            [searchable]="true"
            [clearable]="false">
          </app-searchable-select>
          @if (branchForm.get('timeZone')?.invalid && branchForm.get('timeZone')?.touched) {
            <div class="invalid-feedback d-block">
              Timezone is required.
            </div>
          }
        </div>
    
        <!-- Status -->
        <div class="mb-3">
          <div class="form-check">
            <input class="form-check-input"
              type="checkbox"
              id="isActive"
              formControlName="isActive">
            <label class="form-check-label" for="isActive">
              Active
            </label>
          </div>
          <div class="form-text">Inactive branches will not be available for new employee assignments.</div>
        </div>
    
        <!-- Footer Buttons -->
        <div modal-footer class="d-flex gap-2 justify-content-end">
          <button type="button"
            class="btn btn-secondary"
            (click)="onClose()"
            [disabled]="submitting()">
            Cancel
          </button>
          <button type="submit"
            class="btn btn-primary"
            [disabled]="branchForm.invalid || submitting()">
            @if (submitting()) {
              <span class="spinner-border spinner-border-sm me-2"></span>
            }
            @if (!submitting()) {
              <i class="fas fa-save me-2"></i>
            }
            {{ submitting() ? 'Saving...' : (editMode ? 'Update Branch' : 'Create Branch') }}
          </button>
        </div>
      </form>
    </app-modal-wrapper>
    `
    }]
  }], () => [], { show: [{
    type: Input
  }], branch: [{
    type: Input
  }], close: [{
    type: Output
  }], save: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BranchFormModalComponent, { className: "BranchFormModalComponent", filePath: "src/app/pages/branches/branch-form-modal/branch-form-modal.component.ts", lineNumber: 127 });
})();

// src/app/pages/branches/branches.component.ts
var _BranchesComponent = class _BranchesComponent {
  branchesService = inject(BranchesService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  router = inject(Router);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  branchFormModal;
  // Permission constants for use in template
  PERMISSIONS = {
    BRANCH_CREATE: `${PermissionResources.BRANCH}.${PermissionActions.CREATE}`,
    BRANCH_READ: `${PermissionResources.BRANCH}.${PermissionActions.READ}`,
    BRANCH_UPDATE: `${PermissionResources.BRANCH}.${PermissionActions.UPDATE}`,
    BRANCH_DELETE: `${PermissionResources.BRANCH}.${PermissionActions.DELETE}`,
    BRANCH_MANAGE: `${PermissionResources.BRANCH}.${PermissionActions.MANAGE}`
  };
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  // Pagination
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = signal(10, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  totalCount = signal(0, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  totalPages = signal(0, ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  // Filter state
  currentFilter = {};
  // Modal state
  showBranchForm = signal(false, ...ngDevMode ? [{ debugName: "showBranchForm" }] : []);
  selectedBranch = signal(null, ...ngDevMode ? [{ debugName: "selectedBranch" }] : []);
  ngOnInit() {
    this.loadBranches();
  }
  loadBranches() {
    this.loading.set(true);
    this.branchesService.getBranches(this.currentPage(), this.pageSize(), this.currentFilter.search, this.currentFilter.isActive).subscribe({
      next: /* @__PURE__ */ __name((response) => {
        this.branches.set(response.items);
        this.totalCount.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches:", error);
        this.loading.set(false);
        this.notificationService.error(this.i18n.t("app.error"), this.i18n.t("errors.server"));
      }, "error")
    });
  }
  // Filter event handlers
  onSearchChange(searchTerm) {
    this.currentFilter = __spreadProps(__spreadValues({}, this.currentFilter), { search: searchTerm });
    this.currentPage.set(1);
    this.loadBranches();
  }
  onFiltersChange(filters) {
    this.currentFilter = __spreadValues({}, filters);
    this.currentPage.set(1);
    this.loadBranches();
  }
  onAddBranch() {
    this.selectedBranch.set(null);
    this.showBranchForm.set(true);
  }
  onRefreshData() {
    this.currentFilter = {};
    this.currentPage.set(1);
    this.loadBranches();
  }
  // Table event handlers
  onViewBranch(branch) {
    this.router.navigate(["/branches", branch.id, "view"]);
  }
  onEditBranch(branch) {
    this.selectedBranch.set(branch);
    this.showBranchForm.set(true);
  }
  onDeleteBranch(branch) {
    return __async(this, null, function* () {
      const result = yield this.confirmationService.confirm({
        title: this.i18n.t("branches.delete_branch"),
        message: `Are you sure you want to delete "${branch.name}"? This action cannot be undone.`,
        confirmText: this.i18n.t("common.delete"),
        cancelText: this.i18n.t("common.cancel"),
        confirmButtonClass: "btn-danger",
        icon: "fa-trash",
        iconClass: "text-danger"
      });
      if (result.confirmed) {
        this.branchesService.deleteBranch(branch.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.loadBranches();
            this.notificationService.success(this.i18n.t("app.success"), this.i18n.t("branches.branch_deleted"));
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to delete branch:", error);
            this.notificationService.error(this.i18n.t("app.error"), this.i18n.t("errors.server"));
          }, "error")
        });
      }
    });
  }
  onPageChange(page) {
    this.currentPage.set(page);
    this.loadBranches();
  }
  onPageSizeChange(size) {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadBranches();
  }
  onSelectionChange(selectedBranches) {
    console.log("Selected branches:", selectedBranches);
  }
  onSortChange(sortEvent) {
    this.currentFilter = __spreadProps(__spreadValues({}, this.currentFilter), {
      sortBy: sortEvent.column,
      sortDirection: sortEvent.direction
    });
    this.currentPage.set(1);
    this.loadBranches();
  }
  // Modal event handlers
  onBranchSave(branchData) {
    const isEdit = !!this.selectedBranch();
    if (isEdit) {
      this.branchesService.updateBranch(this.selectedBranch().id, branchData).subscribe({
        next: /* @__PURE__ */ __name(() => {
          this.showBranchForm.set(false);
          this.selectedBranch.set(null);
          this.loadBranches();
          this.branchFormModal?.resetSubmitting();
          this.notificationService.success(this.i18n.t("app.success"), this.i18n.t("branches.branch_updated"));
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Failed to update branch:", error);
          this.branchFormModal?.resetSubmitting();
          this.notificationService.error(this.i18n.t("app.error"), this.i18n.t("errors.server"));
        }, "error")
      });
    } else {
      this.branchesService.createBranch(branchData).subscribe({
        next: /* @__PURE__ */ __name(() => {
          this.showBranchForm.set(false);
          this.selectedBranch.set(null);
          this.loadBranches();
          this.branchFormModal?.resetSubmitting();
          this.notificationService.success(this.i18n.t("app.success"), this.i18n.t("branches.branch_created"));
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Failed to create branch:", error);
          this.branchFormModal?.resetSubmitting();
          this.notificationService.error(this.i18n.t("app.error"), this.i18n.t("errors.server"));
        }, "error")
      });
    }
  }
  onCloseBranchForm() {
    this.showBranchForm.set(false);
    this.selectedBranch.set(null);
  }
};
__name(_BranchesComponent, "BranchesComponent");
__publicField(_BranchesComponent, "\u0275fac", /* @__PURE__ */ __name(function BranchesComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BranchesComponent)();
}, "BranchesComponent_Factory"));
__publicField(_BranchesComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BranchesComponent, selectors: [["app-branches"]], viewQuery: /* @__PURE__ */ __name(function BranchesComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(BranchFormModalComponent, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.branchFormModal = _t.first);
  }
}, "BranchesComponent_Query"), decls: 6, vars: 10, consts: [["branchFormModal", ""], [1, "app-list-page"], [3, "title"], ["moduleName", "branches", 3, "searchChange", "filtersChange", "add", "refresh", "refreshing"], [3, "viewBranch", "editBranch", "deleteBranch", "pageChange", "pageSizeChange", "selectionChange", "sortChange", "branches", "loading", "currentPage", "totalPages", "totalItems", "pageSize"], [3, "close", "save", "show", "branch"]], template: /* @__PURE__ */ __name(function BranchesComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-page-header", 2);
    \u0275\u0275elementStart(2, "app-unified-filter", 3);
    \u0275\u0275listener("searchChange", /* @__PURE__ */ __name(function BranchesComponent_Template_app_unified_filter_searchChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSearchChange($event));
    }, "BranchesComponent_Template_app_unified_filter_searchChange_2_listener"))("filtersChange", /* @__PURE__ */ __name(function BranchesComponent_Template_app_unified_filter_filtersChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onFiltersChange($event));
    }, "BranchesComponent_Template_app_unified_filter_filtersChange_2_listener"))("add", /* @__PURE__ */ __name(function BranchesComponent_Template_app_unified_filter_add_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onAddBranch());
    }, "BranchesComponent_Template_app_unified_filter_add_2_listener"))("refresh", /* @__PURE__ */ __name(function BranchesComponent_Template_app_unified_filter_refresh_2_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onRefreshData());
    }, "BranchesComponent_Template_app_unified_filter_refresh_2_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-branch-table", 4);
    \u0275\u0275listener("viewBranch", /* @__PURE__ */ __name(function BranchesComponent_Template_app_branch_table_viewBranch_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onViewBranch($event));
    }, "BranchesComponent_Template_app_branch_table_viewBranch_3_listener"))("editBranch", /* @__PURE__ */ __name(function BranchesComponent_Template_app_branch_table_editBranch_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onEditBranch($event));
    }, "BranchesComponent_Template_app_branch_table_editBranch_3_listener"))("deleteBranch", /* @__PURE__ */ __name(function BranchesComponent_Template_app_branch_table_deleteBranch_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onDeleteBranch($event));
    }, "BranchesComponent_Template_app_branch_table_deleteBranch_3_listener"))("pageChange", /* @__PURE__ */ __name(function BranchesComponent_Template_app_branch_table_pageChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageChange($event));
    }, "BranchesComponent_Template_app_branch_table_pageChange_3_listener"))("pageSizeChange", /* @__PURE__ */ __name(function BranchesComponent_Template_app_branch_table_pageSizeChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onPageSizeChange($event));
    }, "BranchesComponent_Template_app_branch_table_pageSizeChange_3_listener"))("selectionChange", /* @__PURE__ */ __name(function BranchesComponent_Template_app_branch_table_selectionChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSelectionChange($event));
    }, "BranchesComponent_Template_app_branch_table_selectionChange_3_listener"))("sortChange", /* @__PURE__ */ __name(function BranchesComponent_Template_app_branch_table_sortChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onSortChange($event));
    }, "BranchesComponent_Template_app_branch_table_sortChange_3_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "app-branch-form-modal", 5, 0);
    \u0275\u0275listener("close", /* @__PURE__ */ __name(function BranchesComponent_Template_app_branch_form_modal_close_4_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onCloseBranchForm());
    }, "BranchesComponent_Template_app_branch_form_modal_close_4_listener"))("save", /* @__PURE__ */ __name(function BranchesComponent_Template_app_branch_form_modal_save_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onBranchSave($event));
    }, "BranchesComponent_Template_app_branch_form_modal_save_4_listener"));
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("branches.title"));
    \u0275\u0275advance();
    \u0275\u0275property("refreshing", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275property("branches", ctx.branches())("loading", ctx.loading)("currentPage", ctx.currentPage)("totalPages", ctx.totalPages)("totalItems", ctx.totalCount)("pageSize", ctx.pageSize);
    \u0275\u0275advance();
    \u0275\u0275property("show", ctx.showBranchForm())("branch", ctx.selectedBranch());
  }
}, "BranchesComponent_Template"), dependencies: [
  UnifiedFilterComponent,
  BranchTableComponent,
  BranchFormModalComponent,
  PageHeaderComponent
], styles: ["\n\n.branches-container[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.branch-card[_ngcontent-%COMP%] {\n  transition: all 0.2s ease-in-out;\n  border: 1px solid #dee2e6;\n}\n.branch-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.branch-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #007bff 0%,\n      #0056b3 100%);\n  color: white;\n  padding: 1rem;\n  border-radius: 0.375rem 0.375rem 0 0;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 1rem;\n}\n.stat-item[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 0.75rem;\n  background: #f8f9fa;\n  border-radius: 0.25rem;\n  border-left: 4px solid #007bff;\n}\n.stat-number[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: #007bff;\n  margin-bottom: 0.25rem;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #6c757d;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.pagination-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-size-selector[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.page-size-selector[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: auto;\n}\n.pagination[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n@media (max-width: 768px) {\n  .branches-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .pagination-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .page-size-selector[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.search-filters[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 1px solid #dee2e6;\n  border-radius: 0.375rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n.filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: end;\n  flex-wrap: wrap;\n}\n@media (max-width: 576px) {\n  .filter-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .filter-row[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}\n/*# sourceMappingURL=branches.component.css.map */"] }));
var BranchesComponent = _BranchesComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BranchesComponent, [{
    type: Component,
    args: [{ selector: "app-branches", standalone: true, imports: [
      UnifiedFilterComponent,
      BranchTableComponent,
      BranchFormModalComponent,
      PageHeaderComponent
    ], template: `<div class="app-list-page">\r
  <!-- Page Header -->\r
  <app-page-header\r
    [title]="i18n.t('branches.title')">\r
  </app-page-header>\r
\r
  <!-- Filters Component -->\r
  <app-unified-filter\r
    moduleName="branches"\r
    [refreshing]="loading()"\r
    (searchChange)="onSearchChange($event)"\r
    (filtersChange)="onFiltersChange($event)"\r
    (add)="onAddBranch()"\r
    (refresh)="onRefreshData()">\r
  </app-unified-filter>\r
\r
  <!-- Branches Table Component -->\r
  <app-branch-table\r
    [branches]="branches()"\r
    [loading]="loading"\r
    [currentPage]="currentPage"\r
    [totalPages]="totalPages"\r
    [totalItems]="totalCount"\r
    [pageSize]="pageSize"\r
    (viewBranch)="onViewBranch($event)"\r
    (editBranch)="onEditBranch($event)"\r
    (deleteBranch)="onDeleteBranch($event)"\r
    (pageChange)="onPageChange($event)"\r
    (pageSizeChange)="onPageSizeChange($event)"\r
    (selectionChange)="onSelectionChange($event)"\r
    (sortChange)="onSortChange($event)">\r
  </app-branch-table>\r
\r
  <!-- Branch Form Modal Component -->\r
  <app-branch-form-modal\r
    #branchFormModal\r
    [show]="showBranchForm()"\r
    [branch]="selectedBranch()"\r
    (close)="onCloseBranchForm()"\r
    (save)="onBranchSave($event)">\r
  </app-branch-form-modal>\r
</div>`, styles: ["/* src/app/pages/branches/branches.component.css */\n.branches-container {\n  padding: 1.5rem;\n}\n.branch-card {\n  transition: all 0.2s ease-in-out;\n  border: 1px solid #dee2e6;\n}\n.branch-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.branch-header {\n  background:\n    linear-gradient(\n      135deg,\n      #007bff 0%,\n      #0056b3 100%);\n  color: white;\n  padding: 1rem;\n  border-radius: 0.375rem 0.375rem 0 0;\n}\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 1rem;\n}\n.stat-item {\n  text-align: center;\n  padding: 0.75rem;\n  background: #f8f9fa;\n  border-radius: 0.25rem;\n  border-left: 4px solid #007bff;\n}\n.stat-number {\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: #007bff;\n  margin-bottom: 0.25rem;\n}\n.stat-label {\n  font-size: 0.8rem;\n  color: #6c757d;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.pagination-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 1.5rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.page-size-selector {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.page-size-selector select {\n  width: auto;\n}\n.pagination {\n  margin-bottom: 0;\n}\n@media (max-width: 768px) {\n  .branches-container {\n    padding: 1rem;\n  }\n  .pagination-container {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .page-size-selector {\n    justify-content: center;\n  }\n  .stats-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.search-filters {\n  background: #f8f9fa;\n  border: 1px solid #dee2e6;\n  border-radius: 0.375rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n.filter-row {\n  display: flex;\n  gap: 1rem;\n  align-items: end;\n  flex-wrap: wrap;\n}\n@media (max-width: 576px) {\n  .filter-row {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .filter-row > div {\n    flex: 1;\n  }\n}\n/*# sourceMappingURL=branches.component.css.map */\n"] }]
  }], null, { branchFormModal: [{
    type: ViewChild,
    args: [BranchFormModalComponent]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BranchesComponent, { className: "BranchesComponent", filePath: "src/app/pages/branches/branches.component.ts", lineNumber: 28 });
})();
export {
  BranchesComponent
};
//# sourceMappingURL=chunk-U477T4HC.js.map
