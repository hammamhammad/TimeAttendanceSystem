import {
  CommonModule,
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/shared/components/page-header/page-header.component.ts
var _PageHeaderComponent = class _PageHeaderComponent {
  title;
};
__name(_PageHeaderComponent, "PageHeaderComponent");
__publicField(_PageHeaderComponent, "\u0275fac", /* @__PURE__ */ __name(function PageHeaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PageHeaderComponent)();
}, "PageHeaderComponent_Factory"));
__publicField(_PageHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PageHeaderComponent, selectors: [["app-page-header"]], inputs: { title: "title" }, decls: 3, vars: 1, consts: [[1, "d-flex", "justify-content-between", "align-items-center", "mb-4"]], template: /* @__PURE__ */ __name(function PageHeaderComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 0)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.title);
  }
}, "PageHeaderComponent_Template"), dependencies: [CommonModule], encapsulation: 2 }));
var PageHeaderComponent = _PageHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PageHeaderComponent, [{
    type: Component,
    args: [{
      selector: "app-page-header",
      standalone: true,
      imports: [CommonModule],
      template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>{{ title }}</h2>
    </div>
  `
    }]
  }], null, { title: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PageHeaderComponent, { className: "PageHeaderComponent", filePath: "src/app/shared/components/page-header/page-header.component.ts", lineNumber: 14 });
})();

export {
  PageHeaderComponent
};
//# sourceMappingURL=chunk-G7MX4ADH.js.map
