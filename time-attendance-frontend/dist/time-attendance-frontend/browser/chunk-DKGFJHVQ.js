import {
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/shared/components/page-header/page-header.component.ts
var _c0 = [[["", "actions", ""]]];
var _c1 = ["[actions]"];
function PageHeaderComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle);
  }
}
__name(PageHeaderComponent_Conditional_4_Template, "PageHeaderComponent_Conditional_4_Template");
var _PageHeaderComponent = class _PageHeaderComponent {
  title;
  subtitle;
};
__name(_PageHeaderComponent, "PageHeaderComponent");
__publicField(_PageHeaderComponent, "\u0275fac", /* @__PURE__ */ __name(function PageHeaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PageHeaderComponent)();
}, "PageHeaderComponent_Factory"));
__publicField(_PageHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PageHeaderComponent, selectors: [["app-page-header"]], inputs: { title: "title", subtitle: "subtitle" }, ngContentSelectors: _c1, decls: 7, vars: 4, consts: [[1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "mb-0"], [1, "text-muted", "mb-0"], [1, "d-flex", "gap-2"]], template: /* @__PURE__ */ __name(function PageHeaderComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projectionDef(_c0);
    \u0275\u0275domElementStart(0, "div", 0)(1, "div")(2, "h2", 1);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(4, PageHeaderComponent_Conditional_4_Template, 2, 1, "p", 2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 3);
    \u0275\u0275projection(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275classProp("mb-1", ctx.subtitle);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.subtitle ? 4 : -1);
  }
}, "PageHeaderComponent_Template"), styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=page-header.component.css.map */"] }));
var PageHeaderComponent = _PageHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PageHeaderComponent, [{
    type: Component,
    args: [{ selector: "app-page-header", standalone: true, imports: [], template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-0" [class.mb-1]="subtitle">{{ title }}</h2>
        @if (subtitle) {
          <p class="text-muted mb-0">{{ subtitle }}</p>
        }
      </div>
      <div class="d-flex gap-2">
        <ng-content select="[actions]"></ng-content>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;219558ef63f119a92210704329b58a3cdceaa4fb296db559e672f74512827dc7;D:/Work/AI Code/TimeAttendanceSystem/time-attendance-frontend/src/app/shared/components/page-header/page-header.component.ts */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=page-header.component.css.map */\n"] }]
  }], null, { title: [{
    type: Input
  }], subtitle: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PageHeaderComponent, { className: "PageHeaderComponent", filePath: "src/app/shared/components/page-header/page-header.component.ts", lineNumber: 27 });
})();

export {
  PageHeaderComponent
};
//# sourceMappingURL=chunk-DKGFJHVQ.js.map
