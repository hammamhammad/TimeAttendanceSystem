import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  NgTemplateOutlet,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/shared/components/modal-wrapper/modal-wrapper.component.ts
var _c0 = ["*", [["", "modal-footer", ""]]];
var _c1 = ["*", "[modal-footer]"];
function ModalWrapperComponent_Conditional_0_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ModalWrapperComponent_Conditional_0_Conditional_3_Conditional_3_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.onCloseClick();
      return \u0275\u0275resetView($event.stopPropagation());
    }, "ModalWrapperComponent_Conditional_0_Conditional_3_Conditional_3_Template_button_click_0_listener"));
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.loading);
  }
}
__name(ModalWrapperComponent_Conditional_0_Conditional_3_Conditional_3_Template, "ModalWrapperComponent_Conditional_0_Conditional_3_Conditional_3_Template");
function ModalWrapperComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "h5", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, ModalWrapperComponent_Conditional_0_Conditional_3_Conditional_3_Template, 1, 1, "button", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showCloseButton ? 3 : -1);
  }
}
__name(ModalWrapperComponent_Conditional_0_Conditional_3_Template, "ModalWrapperComponent_Conditional_0_Conditional_3_Template");
function ModalWrapperComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 11)(2, "span", 12);
    \u0275\u0275text(3, "Loading...");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 13);
    \u0275\u0275text(5, "Loading...");
    \u0275\u0275elementEnd()();
  }
}
__name(ModalWrapperComponent_Conditional_0_Conditional_5_Template, "ModalWrapperComponent_Conditional_0_Conditional_5_Template");
function ModalWrapperComponent_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
__name(ModalWrapperComponent_Conditional_0_Conditional_6_Template, "ModalWrapperComponent_Conditional_0_Conditional_6_Template");
function ModalWrapperComponent_Conditional_0_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 14);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.footerTemplate);
  }
}
__name(ModalWrapperComponent_Conditional_0_Conditional_7_Conditional_1_Template, "ModalWrapperComponent_Conditional_0_Conditional_7_Conditional_1_Template");
function ModalWrapperComponent_Conditional_0_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 1);
  }
}
__name(ModalWrapperComponent_Conditional_0_Conditional_7_Conditional_2_Template, "ModalWrapperComponent_Conditional_0_Conditional_7_Conditional_2_Template");
function ModalWrapperComponent_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275conditionalCreate(1, ModalWrapperComponent_Conditional_0_Conditional_7_Conditional_1_Template, 1, 1, "ng-container", 14)(2, ModalWrapperComponent_Conditional_0_Conditional_7_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.footerTemplate ? 1 : 2);
  }
}
__name(ModalWrapperComponent_Conditional_0_Conditional_7_Template, "ModalWrapperComponent_Conditional_0_Conditional_7_Template");
function ModalWrapperComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ModalWrapperComponent_Conditional_0_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackdropClick($event));
    }, "ModalWrapperComponent_Conditional_0_Template_div_click_0_listener"));
    \u0275\u0275elementStart(1, "div", 1)(2, "div", 2);
    \u0275\u0275conditionalCreate(3, ModalWrapperComponent_Conditional_0_Conditional_3_Template, 4, 2, "div", 3);
    \u0275\u0275elementStart(4, "div", 4);
    \u0275\u0275conditionalCreate(5, ModalWrapperComponent_Conditional_0_Conditional_5_Template, 6, 0, "div", 5)(6, ModalWrapperComponent_Conditional_0_Conditional_6_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ModalWrapperComponent_Conditional_0_Conditional_7_Template, 3, 1, "div", 6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(8, "div", 7);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getModalDialogClasses());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showHeader ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.loading ? 5 : 6);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showFooter ? 7 : -1);
  }
}
__name(ModalWrapperComponent_Conditional_0_Template, "ModalWrapperComponent_Conditional_0_Template");
var _ModalWrapperComponent = class _ModalWrapperComponent {
  show = false;
  title = "";
  size = "md";
  showHeader = true;
  showFooter = true;
  showCloseButton = true;
  closeOnBackdropClick = true;
  centered = false;
  scrollable = false;
  loading = false;
  footerTemplate;
  close = new EventEmitter();
  onBackdropClick(event) {
    if (this.closeOnBackdropClick && event.target === event.currentTarget) {
      this.close.emit();
    }
  }
  onCloseClick() {
    this.close.emit();
  }
  getModalDialogClasses() {
    const classes = ["modal-dialog"];
    if (this.size !== "md") {
      classes.push(`modal-${this.size}`);
    }
    if (this.centered) {
      classes.push("modal-dialog-centered");
    }
    if (this.scrollable) {
      classes.push("modal-dialog-scrollable");
    }
    return classes.join(" ");
  }
};
__name(_ModalWrapperComponent, "ModalWrapperComponent");
__publicField(_ModalWrapperComponent, "\u0275fac", /* @__PURE__ */ __name(function ModalWrapperComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ModalWrapperComponent)();
}, "ModalWrapperComponent_Factory"));
__publicField(_ModalWrapperComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ModalWrapperComponent, selectors: [["app-modal-wrapper"]], inputs: { show: "show", title: "title", size: "size", showHeader: "showHeader", showFooter: "showFooter", showCloseButton: "showCloseButton", closeOnBackdropClick: "closeOnBackdropClick", centered: "centered", scrollable: "scrollable", loading: "loading", footerTemplate: "footerTemplate" }, outputs: { close: "close" }, ngContentSelectors: _c1, decls: 1, vars: 1, consts: [["tabindex", "-1", "role", "dialog", 1, "modal", "fade", "show", "d-block", 3, "click"], ["role", "document"], [1, "modal-content"], [1, "modal-header"], [1, "modal-body"], [1, "text-center", "py-4"], [1, "modal-footer"], [1, "modal-backdrop", "fade", "show"], [1, "modal-title"], ["type", "button", "aria-label", "Close", 1, "btn-close", 3, "disabled"], ["type", "button", "aria-label", "Close", 1, "btn-close", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mt-2", "text-muted"], [3, "ngTemplateOutlet"]], template: /* @__PURE__ */ __name(function ModalWrapperComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projectionDef(_c0);
    \u0275\u0275conditionalCreate(0, ModalWrapperComponent_Conditional_0_Template, 9, 5);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.show ? 0 : -1);
  }
}, "ModalWrapperComponent_Template"), dependencies: [CommonModule, NgTemplateOutlet], styles: ["\n\n.modal[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  z-index: 1040;\n}\n.modal[_ngcontent-%COMP%] {\n  z-index: 1050;\n}\n/*# sourceMappingURL=modal-wrapper.component.css.map */"] }));
var ModalWrapperComponent = _ModalWrapperComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModalWrapperComponent, [{
    type: Component,
    args: [{ selector: "app-modal-wrapper", standalone: true, imports: [CommonModule], template: '@if (show) {\r\n  <!-- Modal -->\r\n  <div class="modal fade show d-block"\r\n       tabindex="-1"\r\n       role="dialog"\r\n       (click)="onBackdropClick($event)">\r\n    <div [class]="getModalDialogClasses()" role="document">\r\n      <div class="modal-content">\r\n        <!-- Header -->\r\n        @if (showHeader) {\r\n          <div class="modal-header">\r\n            <h5 class="modal-title">{{ title }}</h5>\r\n            @if (showCloseButton) {\r\n              <button type="button"\r\n                      class="btn-close"\r\n                      [disabled]="loading"\r\n                      (click)="onCloseClick(); $event.stopPropagation()"\r\n                      aria-label="Close">\r\n              </button>\r\n            }\r\n          </div>\r\n        }\r\n\r\n        <!-- Body -->\r\n        <div class="modal-body">\r\n          @if (loading) {\r\n            <div class="text-center py-4">\r\n              <div class="spinner-border text-primary" role="status">\r\n                <span class="visually-hidden">Loading...</span>\r\n              </div>\r\n              <p class="mt-2 text-muted">Loading...</p>\r\n            </div>\r\n          } @else {\r\n            <ng-content></ng-content>\r\n          }\r\n        </div>\r\n\r\n        <!-- Footer -->\r\n        @if (showFooter) {\r\n          <div class="modal-footer">\r\n            @if (footerTemplate) {\r\n              <ng-container [ngTemplateOutlet]="footerTemplate"></ng-container>\r\n            } @else {\r\n              <ng-content select="[modal-footer]"></ng-content>\r\n            }\r\n          </div>\r\n        }\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Backdrop -->\r\n  <div class="modal-backdrop fade show"></div>\r\n}', styles: ["/* src/app/shared/components/modal-wrapper/modal-wrapper.component.css */\n.modal {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.modal-backdrop {\n  z-index: 1040;\n}\n.modal {\n  z-index: 1050;\n}\n/*# sourceMappingURL=modal-wrapper.component.css.map */\n"] }]
  }], null, { show: [{
    type: Input
  }], title: [{
    type: Input
  }], size: [{
    type: Input
  }], showHeader: [{
    type: Input
  }], showFooter: [{
    type: Input
  }], showCloseButton: [{
    type: Input
  }], closeOnBackdropClick: [{
    type: Input
  }], centered: [{
    type: Input
  }], scrollable: [{
    type: Input
  }], loading: [{
    type: Input
  }], footerTemplate: [{
    type: Input
  }], close: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ModalWrapperComponent, { className: "ModalWrapperComponent", filePath: "src/app/shared/components/modal-wrapper/modal-wrapper.component.ts", lineNumber: 11 });
})();

export {
  ModalWrapperComponent
};
//# sourceMappingURL=chunk-EDTHBJ53.js.map
