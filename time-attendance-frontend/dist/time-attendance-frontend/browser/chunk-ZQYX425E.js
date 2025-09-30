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

// src/app/pages/not-found/not-found.component.ts
var _NotFoundComponent = class _NotFoundComponent {
  router;
  constructor(router) {
    this.router = router;
  }
  goHome() {
    this.router.navigate(["/dashboard"]);
  }
};
__name(_NotFoundComponent, "NotFoundComponent");
__publicField(_NotFoundComponent, "\u0275fac", /* @__PURE__ */ __name(function NotFoundComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NotFoundComponent)(\u0275\u0275directiveInject(Router));
}, "NotFoundComponent_Factory"));
__publicField(_NotFoundComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotFoundComponent, selectors: [["app-not-found"]], decls: 11, vars: 0, consts: [[1, "text-center", "py-5"], [1, "fa-solid", "fa-question-circle", "fa-5x", "text-warning", "mb-4"], [1, "display-4", "fw-bold", "text-dark"], [1, "mb-3"], [1, "lead", "mb-4"], [1, "btn", "btn-primary", 3, "click"], [1, "fa-solid", "fa-home", "me-2"]], template: /* @__PURE__ */ __name(function NotFoundComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 0);
    \u0275\u0275domElement(1, "i", 1);
    \u0275\u0275domElementStart(2, "h1", 2);
    \u0275\u0275text(3, "404");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "h2", 3);
    \u0275\u0275text(5, "Page Not Found");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p", 4);
    \u0275\u0275text(7, " The page you are looking for doesn't exist or has been moved. ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "button", 5);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function NotFoundComponent_Template_button_click_8_listener() {
      return ctx.goHome();
    }, "NotFoundComponent_Template_button_click_8_listener"));
    \u0275\u0275domElement(9, "i", 6);
    \u0275\u0275text(10, " Go Home ");
    \u0275\u0275domElementEnd()();
  }
}, "NotFoundComponent_Template"), dependencies: [CommonModule], encapsulation: 2 }));
var NotFoundComponent = _NotFoundComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotFoundComponent, [{
    type: Component,
    args: [{ selector: "app-not-found", standalone: true, imports: [CommonModule], template: `
    <div class="text-center py-5">
      <i class="fa-solid fa-question-circle fa-5x text-warning mb-4"></i>
      <h1 class="display-4 fw-bold text-dark">404</h1>
      <h2 class="mb-3">Page Not Found</h2>
      <p class="lead mb-4">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button class="btn btn-primary" (click)="goHome()">
        <i class="fa-solid fa-home me-2"></i>
        Go Home
      </button>
    </div>
  ` }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotFoundComponent, { className: "NotFoundComponent", filePath: "src/app/pages/not-found/not-found.component.ts", lineNumber: 25 });
})();
export {
  NotFoundComponent
};
//# sourceMappingURL=chunk-ZQYX425E.js.map
