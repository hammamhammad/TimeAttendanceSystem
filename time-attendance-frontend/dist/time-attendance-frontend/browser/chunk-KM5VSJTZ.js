import {
  PermissionService
} from "./chunk-HT4DZZW3.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/shared/components/form-header/form-header.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.label, "_forTrack0");
function FormHeaderComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle);
  }
}
__name(FormHeaderComponent_Conditional_5_Template, "FormHeaderComponent_Conditional_5_Template");
function FormHeaderComponent_For_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const breadcrumb_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", breadcrumb_r2.route);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(breadcrumb_r2.label);
  }
}
__name(FormHeaderComponent_For_9_Conditional_1_Template, "FormHeaderComponent_For_9_Conditional_1_Template");
function FormHeaderComponent_For_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const breadcrumb_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", breadcrumb_r2.label, " ");
  }
}
__name(FormHeaderComponent_For_9_Conditional_2_Template, "FormHeaderComponent_For_9_Conditional_2_Template");
function FormHeaderComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 9);
    \u0275\u0275conditionalCreate(1, FormHeaderComponent_For_9_Conditional_1_Template, 2, 2, "a", 10)(2, FormHeaderComponent_For_9_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const breadcrumb_r2 = ctx.$implicit;
    const \u0275$index_18_r3 = ctx.$index;
    const \u0275$count_18_r4 = ctx.$count;
    \u0275\u0275classProp("active", \u0275$index_18_r3 === \u0275$count_18_r4 - 1);
    \u0275\u0275advance();
    \u0275\u0275conditional(breadcrumb_r2.route && !(\u0275$index_18_r3 === \u0275$count_18_r4 - 1) ? 1 : 2);
  }
}
__name(FormHeaderComponent_For_9_Template, "FormHeaderComponent_For_9_Template");
function FormHeaderComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 11)(2, "span", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 13);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.t("common.loading"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.loading"));
  }
}
__name(FormHeaderComponent_Conditional_11_Template, "FormHeaderComponent_Conditional_11_Template");
function FormHeaderComponent_Conditional_12_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function FormHeaderComponent_Conditional_12_For_2_Conditional_0_Template_a_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const action_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onActionClick(action_r6, $event));
    }, "FormHeaderComponent_Conditional_12_For_2_Conditional_0_Template_a_click_0_listener"));
    \u0275\u0275element(1, "i");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.getButtonClass(action_r6));
    \u0275\u0275property("routerLink", action_r6.route)("queryParams", action_r6.routeParams);
    \u0275\u0275attribute("disabled", action_r6.disabled || ctx_r0.loading ? true : null);
    \u0275\u0275advance();
    \u0275\u0275classMap(action_r6.icon + " me-2");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", action_r6.label, " ");
  }
}
__name(FormHeaderComponent_Conditional_12_For_2_Conditional_0_Template, "FormHeaderComponent_Conditional_12_For_2_Conditional_0_Template");
function FormHeaderComponent_Conditional_12_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function FormHeaderComponent_Conditional_12_For_2_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const action_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onActionClick(action_r6));
    }, "FormHeaderComponent_Conditional_12_For_2_Conditional_1_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.getButtonClass(action_r6));
    \u0275\u0275property("disabled", action_r6.disabled || ctx_r0.loading);
    \u0275\u0275advance();
    \u0275\u0275classMap(action_r6.icon + " me-2");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", action_r6.label, " ");
  }
}
__name(FormHeaderComponent_Conditional_12_For_2_Conditional_1_Template, "FormHeaderComponent_Conditional_12_For_2_Conditional_1_Template");
function FormHeaderComponent_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, FormHeaderComponent_Conditional_12_For_2_Conditional_0_Template, 3, 8, "a", 14)(1, FormHeaderComponent_Conditional_12_For_2_Conditional_1_Template, 3, 6, "button", 15);
  }
  if (rf & 2) {
    const action_r6 = ctx.$implicit;
    \u0275\u0275conditional(action_r6.route ? 0 : 1);
  }
}
__name(FormHeaderComponent_Conditional_12_For_2_Template, "FormHeaderComponent_Conditional_12_For_2_Template");
function FormHeaderComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275repeaterCreate(1, FormHeaderComponent_Conditional_12_For_2_Template, 2, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.allActions);
  }
}
__name(FormHeaderComponent_Conditional_12_Template, "FormHeaderComponent_Conditional_12_Template");
var _FormHeaderComponent = class _FormHeaderComponent {
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  mode = "create";
  title;
  subtitle;
  breadcrumbs = [];
  actions = [];
  loading = false;
  entityId;
  moduleName;
  moduleRoute;
  actionClicked = new EventEmitter();
  get t() {
    return this.i18n.t.bind(this.i18n);
  }
  get visibleActions() {
    return this.actions.filter((action) => {
      if (action.permission) {
        return this.permissionService.has(action.permission);
      }
      return true;
    });
  }
  get defaultActions() {
    const actions = [];
    if (this.mode === "edit" && this.entityId) {
      actions.push({
        label: this.t("common.view_details"),
        icon: "fa-solid fa-eye",
        type: "outline-info",
        route: `/${this.moduleRoute}/${this.entityId}/view`,
        action: /* @__PURE__ */ __name(() => {
        }, "action")
      });
    }
    if (this.mode === "view" && this.entityId) {
      const editPermission = this.getEditPermission();
      if (!editPermission || this.permissionService.has(editPermission)) {
        actions.push({
          label: this.t("common.edit"),
          icon: "fa-solid fa-edit",
          type: "primary",
          route: `/${this.moduleRoute}/${this.entityId}/edit`,
          action: /* @__PURE__ */ __name(() => {
          }, "action")
        });
      }
    }
    actions.push({
      label: this.t("common.back"),
      icon: "fa-solid fa-arrow-left",
      type: "outline-secondary",
      route: `/${this.moduleRoute}`,
      action: /* @__PURE__ */ __name(() => {
      }, "action")
    });
    return actions;
  }
  get allActions() {
    return [...this.visibleActions, ...this.defaultActions];
  }
  get defaultBreadcrumbs() {
    const breadcrumbs = [
      { label: this.t("dashboard.title"), route: "/dashboard" }
    ];
    if (this.moduleName && this.moduleRoute) {
      breadcrumbs.push({
        label: this.t(`${this.moduleName}.title`),
        route: `/${this.moduleRoute}`
      });
    }
    let currentLabel = "";
    switch (this.mode) {
      case "create":
        currentLabel = this.t(`${this.moduleName}.create`);
        break;
      case "edit":
        currentLabel = this.t(`${this.moduleName}.edit`);
        break;
      case "view":
        currentLabel = this.t(`${this.moduleName}.view_details`);
        break;
    }
    if (currentLabel) {
      breadcrumbs.push({ label: currentLabel });
    }
    return breadcrumbs;
  }
  get allBreadcrumbs() {
    return this.breadcrumbs.length > 0 ? this.breadcrumbs : this.defaultBreadcrumbs;
  }
  onActionClick(action, event) {
    if (event) {
      event.preventDefault();
    }
    if (action.disabled || this.loading) {
      return;
    }
    if (action.action) {
      action.action();
    }
    this.actionClicked.emit(action.label);
  }
  getButtonClass(action) {
    const baseClass = "btn";
    const typeClass = action.type ? `btn-${action.type}` : "btn-secondary";
    const disabledClass = action.disabled || this.loading ? "disabled" : "";
    return `${baseClass} ${typeClass} ${disabledClass}`.trim();
  }
  getEditPermission() {
    const permissionMap = {
      "employees": "employee.update",
      "users": "user.update",
      "roles": "role.update",
      "branches": "branch.update",
      "departments": "department.update",
      "shifts": "shift.update",
      "vacation-types": "vacationType.update",
      "public-holidays": "publicHoliday.update",
      "overtime-configurations": "settings.update",
      "employee-vacations": "vacation.update",
      "employee-excuses": "excuse.update"
    };
    return permissionMap[this.moduleRoute] || null;
  }
};
__name(_FormHeaderComponent, "FormHeaderComponent");
__publicField(_FormHeaderComponent, "\u0275fac", /* @__PURE__ */ __name(function FormHeaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FormHeaderComponent)();
}, "FormHeaderComponent_Factory"));
__publicField(_FormHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormHeaderComponent, selectors: [["app-form-header"]], inputs: { mode: "mode", title: "title", subtitle: "subtitle", breadcrumbs: "breadcrumbs", actions: "actions", loading: "loading", entityId: "entityId", moduleName: "moduleName", moduleRoute: "moduleRoute" }, outputs: { actionClicked: "actionClicked" }, decls: 13, vars: 3, consts: [[1, "app-page-header"], [1, "app-page-header-content"], [1, "text-muted", "mb-0"], ["aria-label", "breadcrumb", 1, "app-breadcrumb-wrapper"], [1, "breadcrumb", "app-breadcrumb"], [1, "breadcrumb-item", 3, "active"], [1, "app-page-header-actions"], [1, "d-flex", "align-items-center"], [1, "app-action-buttons"], [1, "breadcrumb-item"], [3, "routerLink"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "visually-hidden"], [1, "text-muted"], [3, "routerLink", "queryParams", "class"], ["type", "button", 3, "class", "disabled"], [3, "click", "routerLink", "queryParams"], ["type", "button", 3, "click", "disabled"]], template: /* @__PURE__ */ __name(function FormHeaderComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, FormHeaderComponent_Conditional_5_Template, 2, 1, "p", 2);
    \u0275\u0275elementStart(6, "nav", 3)(7, "ol", 4);
    \u0275\u0275repeaterCreate(8, FormHeaderComponent_For_9_Template, 3, 3, "li", 5, _forTrack0);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "div", 6);
    \u0275\u0275conditionalCreate(11, FormHeaderComponent_Conditional_11_Template, 6, 2, "div", 7)(12, FormHeaderComponent_Conditional_12_Template, 3, 0, "div", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.subtitle ? 5 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx.allBreadcrumbs);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.loading ? 11 : 12);
  }
}, "FormHeaderComponent_Template"), dependencies: [RouterModule, RouterLink], styles: ["\n\n@media (max-width: 768px) {\n  .app-page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: var(--app-spacing-md, 1rem);\n  }\n  .app-page-header-actions[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .app-action-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: var(--app-spacing-xs, 0.5rem);\n  }\n  .app-action-buttons[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], \n   .app-action-buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n@media (max-width: 576px) {\n  .app-page-header-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .app-breadcrumb[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .app-action-buttons[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], \n   .app-action-buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n    padding: 0.5rem 1rem;\n  }\n}\n.app-page-header-actions[_ngcontent-%COMP%]   .spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.app-action-buttons[_ngcontent-%COMP%]   .btn[disabled][_ngcontent-%COMP%], \n.app-action-buttons[_ngcontent-%COMP%]   a[disabled][_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.app-action-buttons[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n}\n/*# sourceMappingURL=form-header.component.css.map */"] }));
var FormHeaderComponent = _FormHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormHeaderComponent, [{
    type: Component,
    args: [{ selector: "app-form-header", standalone: true, imports: [RouterModule], template: `<div class="app-page-header">\r
  <div class="app-page-header-content">\r
    <div>\r
      <h2>{{ title }}</h2>\r
      @if (subtitle) {\r
        <p class="text-muted mb-0">{{ subtitle }}</p>\r
      }\r
      <nav aria-label="breadcrumb" class="app-breadcrumb-wrapper">\r
        <ol class="breadcrumb app-breadcrumb">\r
          @for (breadcrumb of allBreadcrumbs; track breadcrumb.label; let isLast = $last) {\r
            <li class="breadcrumb-item" [class.active]="isLast">\r
              @if (breadcrumb.route && !isLast) {\r
                <a [routerLink]="breadcrumb.route">{{ breadcrumb.label }}</a>\r
              } @else {\r
                {{ breadcrumb.label }}\r
              }\r
            </li>\r
          }\r
        </ol>\r
      </nav>\r
    </div>\r
  </div>\r
\r
  <div class="app-page-header-actions">\r
    @if (loading) {\r
      <div class="d-flex align-items-center">\r
        <div class="spinner-border spinner-border-sm me-2" role="status">\r
          <span class="visually-hidden">{{ t('common.loading') }}</span>\r
        </div>\r
        <span class="text-muted">{{ t('common.loading') }}</span>\r
      </div>\r
    } @else {\r
      <div class="app-action-buttons">\r
        @for (action of allActions; track action.label) {\r
          @if (action.route) {\r
            <a\r
              [routerLink]="action.route"\r
              [queryParams]="action.routeParams"\r
              [class]="getButtonClass(action)"\r
              [attr.disabled]="action.disabled || loading ? true : null"\r
              (click)="onActionClick(action, $event)">\r
              <i [class]="action.icon + ' me-2'"></i>\r
              {{ action.label }}\r
            </a>\r
          } @else {\r
            <button\r
              type="button"\r
              [class]="getButtonClass(action)"\r
              [disabled]="action.disabled || loading"\r
              (click)="onActionClick(action)">\r
              <i [class]="action.icon + ' me-2'"></i>\r
              {{ action.label }}\r
            </button>\r
          }\r
        }\r
      </div>\r
    }\r
  </div>\r
</div>`, styles: ["/* src/app/shared/components/form-header/form-header.component.css */\n@media (max-width: 768px) {\n  .app-page-header {\n    flex-direction: column;\n    align-items: stretch;\n    gap: var(--app-spacing-md, 1rem);\n  }\n  .app-page-header-actions {\n    justify-content: flex-start;\n  }\n  .app-action-buttons {\n    flex-direction: column;\n    gap: var(--app-spacing-xs, 0.5rem);\n  }\n  .app-action-buttons .btn,\n  .app-action-buttons a {\n    width: 100%;\n    justify-content: center;\n  }\n}\n@media (max-width: 576px) {\n  .app-page-header-content h2 {\n    font-size: 1.5rem;\n  }\n  .app-breadcrumb {\n    font-size: 0.875rem;\n  }\n  .app-action-buttons .btn,\n  .app-action-buttons a {\n    font-size: 0.875rem;\n    padding: 0.5rem 1rem;\n  }\n}\n.app-page-header-actions .spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.app-action-buttons .btn[disabled],\n.app-action-buttons a[disabled] {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.app-action-buttons {\n  flex-wrap: wrap;\n}\n/*# sourceMappingURL=form-header.component.css.map */\n"] }]
  }], null, { mode: [{
    type: Input
  }], title: [{
    type: Input
  }], subtitle: [{
    type: Input
  }], breadcrumbs: [{
    type: Input
  }], actions: [{
    type: Input
  }], loading: [{
    type: Input
  }], entityId: [{
    type: Input
  }], moduleName: [{
    type: Input
  }], moduleRoute: [{
    type: Input
  }], actionClicked: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormHeaderComponent, { className: "FormHeaderComponent", filePath: "src/app/shared/components/form-header/form-header.component.ts", lineNumber: 32 });
})();

export {
  FormHeaderComponent
};
//# sourceMappingURL=chunk-KM5VSJTZ.js.map
