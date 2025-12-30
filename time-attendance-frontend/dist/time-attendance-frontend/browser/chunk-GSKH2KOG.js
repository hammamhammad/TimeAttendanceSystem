import {
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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

// src/app/shared/components/loading-spinner/loading-spinner.component.ts
var _c0 = ["*"];
function LoadingSpinnerComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.message);
  }
}
__name(LoadingSpinnerComponent_Conditional_4_Template, "LoadingSpinnerComponent_Conditional_4_Template");
var _LoadingSpinnerComponent = class _LoadingSpinnerComponent {
  message = "Loading...";
  size = "md";
  variant = "primary";
  centered = true;
  fullHeight = false;
  overlay = false;
  showMessage = true;
  getSpinnerClasses() {
    const classes = ["spinner-border"];
    if (this.size === "sm") {
      classes.push("spinner-border-sm");
    }
    classes.push(`text-${this.variant}`);
    return classes.join(" ");
  }
  getContainerClasses() {
    const classes = [];
    if (this.centered) {
      classes.push("text-center");
    }
    if (this.fullHeight) {
      classes.push("loading-spinner-full-height");
    } else {
      classes.push("py-4");
    }
    if (this.overlay) {
      classes.push("loading-spinner-overlay");
    }
    return classes.join(" ");
  }
};
__name(_LoadingSpinnerComponent, "LoadingSpinnerComponent");
__publicField(_LoadingSpinnerComponent, "\u0275fac", /* @__PURE__ */ __name(function LoadingSpinnerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoadingSpinnerComponent)();
}, "LoadingSpinnerComponent_Factory"));
__publicField(_LoadingSpinnerComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoadingSpinnerComponent, selectors: [["app-loading-spinner"]], inputs: { message: "message", size: "size", variant: "variant", centered: "centered", fullHeight: "fullHeight", overlay: "overlay", showMessage: "showMessage" }, ngContentSelectors: _c0, decls: 7, vars: 6, consts: [["role", "status"], [1, "visually-hidden"], [1, "mt-2", "text-muted", "mb-0"], [1, "loading-custom-content", "mt-2"]], template: /* @__PURE__ */ __name(function LoadingSpinnerComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projectionDef();
    \u0275\u0275domElementStart(0, "div")(1, "div", 0)(2, "span", 1);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(4, LoadingSpinnerComponent_Conditional_4_Template, 2, 1, "p", 2);
    \u0275\u0275domElementStart(5, "div", 3);
    \u0275\u0275projection(6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275classMap(ctx.getContainerClasses());
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx.getSpinnerClasses());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.message);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showMessage ? 4 : -1);
  }
}, "LoadingSpinnerComponent_Template"), styles: ["\n\n.loading-spinner-full-height[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 300px;\n  height: 100%;\n}\n.loading-spinner-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(255, 255, 255, 0.8);\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n/*# sourceMappingURL=loading-spinner.component.css.map */"] }));
var LoadingSpinnerComponent = _LoadingSpinnerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingSpinnerComponent, [{
    type: Component,
    args: [{ selector: "app-loading-spinner", standalone: true, imports: [], template: '<div [class]="getContainerClasses()">\r\n  <div [class]="getSpinnerClasses()" role="status">\r\n    <span class="visually-hidden">{{ message }}</span>\r\n  </div>\r\n\r\n  @if (showMessage) {\r\n    <p class="mt-2 text-muted mb-0">{{ message }}</p>\r\n  }\r\n\r\n  <!-- Custom content slot -->\r\n  <div class="loading-custom-content mt-2">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>', styles: ["/* src/app/shared/components/loading-spinner/loading-spinner.component.css */\n.loading-spinner-full-height {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 300px;\n  height: 100%;\n}\n.loading-spinner-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(255, 255, 255, 0.8);\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n/*# sourceMappingURL=loading-spinner.component.css.map */\n"] }]
  }], null, { message: [{
    type: Input
  }], size: [{
    type: Input
  }], variant: [{
    type: Input
  }], centered: [{
    type: Input
  }], fullHeight: [{
    type: Input
  }], overlay: [{
    type: Input
  }], showMessage: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoadingSpinnerComponent, { className: "LoadingSpinnerComponent", filePath: "src/app/shared/components/loading-spinner/loading-spinner.component.ts", lineNumber: 11 });
})();

export {
  LoadingSpinnerComponent
};
//# sourceMappingURL=chunk-GSKH2KOG.js.map
