import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/shared/components/empty-state/empty-state.component.ts
var _c0 = ["*"];
function EmptyStateComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h5", 1);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title);
  }
}
__name(EmptyStateComponent_Conditional_2_Template, "EmptyStateComponent_Conditional_2_Template");
function EmptyStateComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "i");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.actionIcon + " me-2");
  }
}
__name(EmptyStateComponent_Conditional_6_Conditional_1_Template, "EmptyStateComponent_Conditional_6_Conditional_1_Template");
function EmptyStateComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 7);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function EmptyStateComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onActionClick());
    }, "EmptyStateComponent_Conditional_6_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, EmptyStateComponent_Conditional_6_Conditional_1_Template, 1, 2, "i", 8);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.actionIcon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.actionText, " ");
  }
}
__name(EmptyStateComponent_Conditional_6_Template, "EmptyStateComponent_Conditional_6_Template");
function EmptyStateComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 9);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function EmptyStateComponent_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onClearFiltersClick());
    }, "EmptyStateComponent_Conditional_7_Template_button_click_0_listener"));
    \u0275\u0275domElement(1, "i", 10);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("ms-2", ctx_r0.actionText);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.clearFiltersText, " ");
  }
}
__name(EmptyStateComponent_Conditional_7_Template, "EmptyStateComponent_Conditional_7_Template");
var _EmptyStateComponent = class _EmptyStateComponent {
  icon = "fa-solid fa-inbox";
  title;
  message = "No data available";
  actionText;
  actionIcon;
  showClearFilters = false;
  clearFiltersText = "Clear Filters";
  size = "md";
  action = new EventEmitter();
  clearFilters = new EventEmitter();
  onActionClick() {
    this.action.emit();
  }
  onClearFiltersClick() {
    this.clearFilters.emit();
  }
  getIconSize() {
    switch (this.size) {
      case "sm":
        return "fa-2x";
      case "lg":
        return "fa-4x";
      default:
        return "fa-3x";
    }
  }
  getPaddingClass() {
    switch (this.size) {
      case "sm":
        return "py-3";
      case "lg":
        return "py-5";
      default:
        return "py-4";
    }
  }
};
__name(_EmptyStateComponent, "EmptyStateComponent");
__publicField(_EmptyStateComponent, "\u0275fac", /* @__PURE__ */ __name(function EmptyStateComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EmptyStateComponent)();
}, "EmptyStateComponent_Factory"));
__publicField(_EmptyStateComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmptyStateComponent, selectors: [["app-empty-state"]], inputs: { icon: "icon", title: "title", message: "message", actionText: "actionText", actionIcon: "actionIcon", showClearFilters: "showClearFilters", clearFiltersText: "clearFiltersText", size: "size" }, outputs: { action: "action", clearFilters: "clearFilters" }, ngContentSelectors: _c0, decls: 10, vars: 8, consts: [[1, "empty-state", "text-center"], [1, "empty-state-title", "mb-2"], [1, "text-muted", "mb-3"], [1, "empty-state-actions"], ["type", "button", 1, "btn", "btn-primary"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "ms-2"], [1, "empty-state-custom", "mt-3"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [3, "class"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fa-solid", "fa-filter-circle-xmark", "me-2"]], template: /* @__PURE__ */ __name(function EmptyStateComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projectionDef();
    \u0275\u0275domElementStart(0, "div", 0);
    \u0275\u0275domElement(1, "i");
    \u0275\u0275conditionalCreate(2, EmptyStateComponent_Conditional_2_Template, 2, 1, "h5", 1);
    \u0275\u0275domElementStart(3, "p", 2);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 3);
    \u0275\u0275conditionalCreate(6, EmptyStateComponent_Conditional_6_Template, 3, 2, "button", 4);
    \u0275\u0275conditionalCreate(7, EmptyStateComponent_Conditional_7_Template, 3, 3, "button", 5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "div", 6);
    \u0275\u0275projection(9);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275classMap(ctx.getPaddingClass());
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx.icon + " " + ctx.getIconSize() + " text-muted mb-3");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.title ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.message);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.actionText ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showClearFilters ? 7 : -1);
  }
}, "EmptyStateComponent_Template"), dependencies: [CommonModule], styles: ["\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.empty-state-title[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-weight: 600;\n}\n.empty-state-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n/*# sourceMappingURL=empty-state.component.css.map */"] }));
var EmptyStateComponent = _EmptyStateComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmptyStateComponent, [{
    type: Component,
    args: [{ selector: "app-empty-state", standalone: true, imports: [CommonModule], template: `<div class="empty-state text-center" [class]="getPaddingClass()">\r
  <!-- Icon -->\r
  <i [class]="icon + ' ' + getIconSize() + ' text-muted mb-3'"></i>\r
\r
  <!-- Title -->\r
  @if (title) {\r
    <h5 class="empty-state-title mb-2">{{ title }}</h5>\r
  }\r
\r
  <!-- Message -->\r
  <p class="text-muted mb-3">{{ message }}</p>\r
\r
  <!-- Actions -->\r
  <div class="empty-state-actions">\r
    @if (actionText) {\r
      <button\r
        type="button"\r
        class="btn btn-primary"\r
        (click)="onActionClick()">\r
        @if (actionIcon) {\r
          <i [class]="actionIcon + ' me-2'"></i>\r
        }\r
        {{ actionText }}\r
      </button>\r
    }\r
\r
    @if (showClearFilters) {\r
      <button\r
        type="button"\r
        class="btn btn-outline-secondary"\r
        [class.ms-2]="actionText"\r
        (click)="onClearFiltersClick()">\r
        <i class="fa-solid fa-filter-circle-xmark me-2"></i>\r
        {{ clearFiltersText }}\r
      </button>\r
    }\r
  </div>\r
\r
  <!-- Custom content slot -->\r
  <div class="empty-state-custom mt-3">\r
    <ng-content></ng-content>\r
  </div>\r
</div>`, styles: ["/* src/app/shared/components/empty-state/empty-state.component.css */\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.empty-state-title {\n  color: #6c757d;\n  font-weight: 600;\n}\n.empty-state-actions {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n/*# sourceMappingURL=empty-state.component.css.map */\n"] }]
  }], null, { icon: [{
    type: Input
  }], title: [{
    type: Input
  }], message: [{
    type: Input
  }], actionText: [{
    type: Input
  }], actionIcon: [{
    type: Input
  }], showClearFilters: [{
    type: Input
  }], clearFiltersText: [{
    type: Input
  }], size: [{
    type: Input
  }], action: [{
    type: Output
  }], clearFilters: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmptyStateComponent, { className: "EmptyStateComponent", filePath: "src/app/shared/components/empty-state/empty-state.component.ts", lineNumber: 11 });
})();

export {
  EmptyStateComponent
};
//# sourceMappingURL=chunk-A4RQO434.js.map
