import {
  CommonModule,
  Component,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵtext
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/unauthorized/unauthorized.component.ts
var _UnauthorizedComponent = class _UnauthorizedComponent {
  router;
  constructor(router) {
    this.router = router;
  }
  goBack() {
    this.router.navigate(["/dashboard"]);
  }
};
__name(_UnauthorizedComponent, "UnauthorizedComponent");
__publicField(_UnauthorizedComponent, "\u0275fac", /* @__PURE__ */ __name(function UnauthorizedComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UnauthorizedComponent)(\u0275\u0275directiveInject(Router));
}, "UnauthorizedComponent_Factory"));
__publicField(_UnauthorizedComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnauthorizedComponent, selectors: [["app-unauthorized"]], decls: 11, vars: 0, consts: [[1, "text-center", "py-5"], [1, "fa-solid", "fa-lock", "fa-5x", "text-danger", "mb-4"], [1, "display-4", "fw-bold", "text-danger"], [1, "mb-3"], [1, "lead", "mb-4"], [1, "btn", "btn-primary", 3, "click"], [1, "fa-solid", "fa-arrow-left", "me-2"]], template: /* @__PURE__ */ __name(function UnauthorizedComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 0);
    \u0275\u0275domElement(1, "i", 1);
    \u0275\u0275domElementStart(2, "h1", 2);
    \u0275\u0275text(3, "403");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "h2", 3);
    \u0275\u0275text(5, "Unauthorized Access");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p", 4);
    \u0275\u0275text(7, " You don't have permission to access this resource. ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "button", 5);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function UnauthorizedComponent_Template_button_click_8_listener() {
      return ctx.goBack();
    }, "UnauthorizedComponent_Template_button_click_8_listener"));
    \u0275\u0275domElement(9, "i", 6);
    \u0275\u0275text(10, " Go Back ");
    \u0275\u0275domElementEnd()();
  }
}, "UnauthorizedComponent_Template"), dependencies: [CommonModule], encapsulation: 2 }));
var UnauthorizedComponent = _UnauthorizedComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnauthorizedComponent, [{
    type: Component,
    args: [{ selector: "app-unauthorized", standalone: true, imports: [CommonModule], template: `
    <div class="text-center py-5">
      <i class="fa-solid fa-lock fa-5x text-danger mb-4"></i>
      <h1 class="display-4 fw-bold text-danger">403</h1>
      <h2 class="mb-3">Unauthorized Access</h2>
      <p class="lead mb-4">
        You don't have permission to access this resource.
      </p>
      <button class="btn btn-primary" (click)="goBack()">
        <i class="fa-solid fa-arrow-left me-2"></i>
        Go Back
      </button>
    </div>
  ` }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnauthorizedComponent, { className: "UnauthorizedComponent", filePath: "src/app/pages/unauthorized/unauthorized.component.ts", lineNumber: 25 });
})();
export {
  UnauthorizedComponent
};
//# sourceMappingURL=chunk-JQ34FTXB.js.map
