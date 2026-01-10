import {
  CommonModule,
  Component,
  Input,
  NgTemplateOutlet,
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
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/shared/components/section-card/section-card.component.ts
var _c0 = ["*", [["", "card-footer", ""]]];
var _c1 = ["*", "[card-footer]"];
function SectionCardComponent_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.icon + " me-2");
  }
}
__name(SectionCardComponent_Conditional_1_Conditional_4_Template, "SectionCardComponent_Conditional_1_Conditional_4_Template");
function SectionCardComponent_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.subtitle);
  }
}
__name(SectionCardComponent_Conditional_1_Conditional_6_Template, "SectionCardComponent_Conditional_1_Conditional_6_Template");
function SectionCardComponent_Conditional_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 7);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.headerActions);
  }
}
__name(SectionCardComponent_Conditional_1_Conditional_8_Template, "SectionCardComponent_Conditional_1_Conditional_8_Template");
function SectionCardComponent_Conditional_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275element(1, "i");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("title", ctx_r1.collapsed ? "Expand" : "Collapse");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.collapsed ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-up");
  }
}
__name(SectionCardComponent_Conditional_1_Conditional_9_Template, "SectionCardComponent_Conditional_1_Conditional_9_Template");
function SectionCardComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function SectionCardComponent_Conditional_1_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleCollapse());
    }, "SectionCardComponent_Conditional_1_Template_div_click_0_listener"));
    \u0275\u0275elementStart(1, "div", 2)(2, "div", 3)(3, "h5", 4);
    \u0275\u0275conditionalCreate(4, SectionCardComponent_Conditional_1_Conditional_4_Template, 1, 2, "i", 0);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, SectionCardComponent_Conditional_1_Conditional_6_Template, 2, 1, "small", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 6);
    \u0275\u0275conditionalCreate(8, SectionCardComponent_Conditional_1_Conditional_8_Template, 1, 1, "ng-container", 7);
    \u0275\u0275conditionalCreate(9, SectionCardComponent_Conditional_1_Conditional_9_Template, 2, 3, "button", 8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.getHeaderClasses());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.icon ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.title, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.subtitle ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.headerActions ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.collapsible ? 9 : -1);
  }
}
__name(SectionCardComponent_Conditional_1_Template, "SectionCardComponent_Conditional_1_Template");
function SectionCardComponent_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3, "Loading...");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 12);
    \u0275\u0275text(5, "Loading...");
    \u0275\u0275elementEnd()();
  }
}
__name(SectionCardComponent_Conditional_2_Conditional_1_Template, "SectionCardComponent_Conditional_2_Conditional_1_Template");
function SectionCardComponent_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
__name(SectionCardComponent_Conditional_2_Conditional_2_Template, "SectionCardComponent_Conditional_2_Conditional_2_Template");
function SectionCardComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, SectionCardComponent_Conditional_2_Conditional_1_Template, 6, 0, "div", 9)(2, SectionCardComponent_Conditional_2_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.getBodyClasses());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.loading ? 1 : 2);
  }
}
__name(SectionCardComponent_Conditional_2_Template, "SectionCardComponent_Conditional_2_Template");
function SectionCardComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 7);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.footerContent);
  }
}
__name(SectionCardComponent_Conditional_3_Conditional_1_Template, "SectionCardComponent_Conditional_3_Conditional_1_Template");
function SectionCardComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 1);
  }
}
__name(SectionCardComponent_Conditional_3_Conditional_2_Template, "SectionCardComponent_Conditional_3_Conditional_2_Template");
function SectionCardComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, SectionCardComponent_Conditional_3_Conditional_1_Template, 1, 1, "ng-container", 7)(2, SectionCardComponent_Conditional_3_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.getFooterClasses());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.footerContent ? 1 : 2);
  }
}
__name(SectionCardComponent_Conditional_3_Template, "SectionCardComponent_Conditional_3_Template");
var _SectionCardComponent = class _SectionCardComponent {
  title = "";
  subtitle = "";
  icon;
  showHeader = true;
  showFooter = false;
  headerClass = "";
  bodyClass = "";
  footerClass = "";
  bordered = true;
  shadow = false;
  loading = false;
  collapsible = false;
  collapsed = false;
  headerActions;
  footerContent;
  toggleCollapse() {
    if (this.collapsible) {
      this.collapsed = !this.collapsed;
    }
  }
  getCardClasses() {
    const classes = ["card"];
    if (this.bordered) {
      classes.push("border");
    }
    if (this.shadow) {
      classes.push("shadow-sm");
    }
    return classes.join(" ");
  }
  getHeaderClasses() {
    const classes = ["card-header"];
    if (this.headerClass) {
      classes.push(this.headerClass);
    }
    if (this.collapsible) {
      classes.push("cursor-pointer");
    }
    return classes.join(" ");
  }
  getBodyClasses() {
    const classes = ["card-body"];
    if (this.bodyClass) {
      classes.push(this.bodyClass);
    }
    return classes.join(" ");
  }
  getFooterClasses() {
    const classes = ["card-footer"];
    if (this.footerClass) {
      classes.push(this.footerClass);
    }
    return classes.join(" ");
  }
};
__name(_SectionCardComponent, "SectionCardComponent");
__publicField(_SectionCardComponent, "\u0275fac", /* @__PURE__ */ __name(function SectionCardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SectionCardComponent)();
}, "SectionCardComponent_Factory"));
__publicField(_SectionCardComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SectionCardComponent, selectors: [["app-section-card"]], inputs: { title: "title", subtitle: "subtitle", icon: "icon", showHeader: "showHeader", showFooter: "showFooter", headerClass: "headerClass", bodyClass: "bodyClass", footerClass: "footerClass", bordered: "bordered", shadow: "shadow", loading: "loading", collapsible: "collapsible", collapsed: "collapsed", headerActions: "headerActions", footerContent: "footerContent" }, ngContentSelectors: _c1, decls: 4, vars: 5, consts: [[3, "class"], [3, "click"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "section-card-title-wrapper"], [1, "card-title", "mb-0"], [1, "text-muted", "d-block", "mt-1"], [1, "section-card-actions", "d-flex", "align-items-center", "gap-2"], [3, "ngTemplateOutlet"], ["type", "button", 1, "btn", "btn-sm", "btn-ghost", 3, "title"], [1, "text-center", "py-4"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mt-2", "text-muted", "mb-0"]], template: /* @__PURE__ */ __name(function SectionCardComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projectionDef(_c0);
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, SectionCardComponent_Conditional_1_Template, 10, 7, "div", 0);
    \u0275\u0275conditionalCreate(2, SectionCardComponent_Conditional_2_Template, 3, 3, "div", 0);
    \u0275\u0275conditionalCreate(3, SectionCardComponent_Conditional_3_Template, 3, 3, "div", 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275classMap(ctx.getCardClasses());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showHeader ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.collapsed ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showFooter && !ctx.collapsed ? 3 : -1);
  }
}, "SectionCardComponent_Template"), dependencies: [CommonModule, NgTemplateOutlet], styles: ["\n\n.card[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  font-size: 1.125rem;\n  font-weight: 600;\n}\n.section-card-title-wrapper[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.section-card-actions[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.cursor-pointer[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.cursor-pointer[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.02);\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #6c757d;\n  padding: 0.25rem 0.5rem;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n  color: #495057;\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n  padding: 1rem 1.25rem;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n}\n.card-footer[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-top: 1px solid rgba(0, 0, 0, 0.125);\n  padding: 0.75rem 1.25rem;\n}\n/*# sourceMappingURL=section-card.component.css.map */"] }));
var SectionCardComponent = _SectionCardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SectionCardComponent, [{
    type: Component,
    args: [{ selector: "app-section-card", standalone: true, imports: [CommonModule], template: `<div [class]="getCardClasses()">\r
  <!-- Header -->\r
  @if (showHeader) {\r
    <div [class]="getHeaderClasses()" (click)="toggleCollapse()">\r
      <div class="d-flex justify-content-between align-items-center">\r
        <div class="section-card-title-wrapper">\r
          <h5 class="card-title mb-0">\r
            @if (icon) {\r
              <i [class]="icon + ' me-2'"></i>\r
            }\r
            {{ title }}\r
          </h5>\r
          @if (subtitle) {\r
            <small class="text-muted d-block mt-1">{{ subtitle }}</small>\r
          }\r
        </div>\r
\r
        <div class="section-card-actions d-flex align-items-center gap-2">\r
          <!-- Custom header actions -->\r
          @if (headerActions) {\r
            <ng-container [ngTemplateOutlet]="headerActions"></ng-container>\r
          }\r
\r
          <!-- Collapse button -->\r
          @if (collapsible) {\r
            <button type="button" class="btn btn-sm btn-ghost" [title]="collapsed ? 'Expand' : 'Collapse'">\r
              <i [class]="collapsed ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up'"></i>\r
            </button>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Body -->\r
  @if (!collapsed) {\r
    <div [class]="getBodyClasses()">\r
      @if (loading) {\r
        <div class="text-center py-4">\r
          <div class="spinner-border text-primary" role="status">\r
            <span class="visually-hidden">Loading...</span>\r
          </div>\r
          <p class="mt-2 text-muted mb-0">Loading...</p>\r
        </div>\r
      } @else {\r
        <ng-content></ng-content>\r
      }\r
    </div>\r
  }\r
\r
  <!-- Footer -->\r
  @if (showFooter && !collapsed) {\r
    <div [class]="getFooterClasses()">\r
      @if (footerContent) {\r
        <ng-container [ngTemplateOutlet]="footerContent"></ng-container>\r
      } @else {\r
        <ng-content select="[card-footer]"></ng-content>\r
      }\r
    </div>\r
  }\r
</div>`, styles: ["/* src/app/shared/components/section-card/section-card.component.css */\n.card {\n  margin-bottom: 1.5rem;\n}\n.card-title {\n  display: flex;\n  align-items: center;\n  font-size: 1.125rem;\n  font-weight: 600;\n}\n.section-card-title-wrapper {\n  flex: 1;\n}\n.section-card-actions {\n  margin-left: auto;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.cursor-pointer:hover {\n  background-color: rgba(0, 0, 0, 0.02);\n}\n.btn-ghost {\n  background: transparent;\n  border: none;\n  color: #6c757d;\n  padding: 0.25rem 0.5rem;\n}\n.btn-ghost:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n  color: #495057;\n}\n.card-header {\n  background-color: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n  padding: 1rem 1.25rem;\n}\n.card-body {\n  padding: 1.25rem;\n}\n.card-footer {\n  background-color: #f8f9fa;\n  border-top: 1px solid rgba(0, 0, 0, 0.125);\n  padding: 0.75rem 1.25rem;\n}\n/*# sourceMappingURL=section-card.component.css.map */\n"] }]
  }], null, { title: [{
    type: Input
  }], subtitle: [{
    type: Input
  }], icon: [{
    type: Input
  }], showHeader: [{
    type: Input
  }], showFooter: [{
    type: Input
  }], headerClass: [{
    type: Input
  }], bodyClass: [{
    type: Input
  }], footerClass: [{
    type: Input
  }], bordered: [{
    type: Input
  }], shadow: [{
    type: Input
  }], loading: [{
    type: Input
  }], collapsible: [{
    type: Input
  }], collapsed: [{
    type: Input
  }], headerActions: [{
    type: Input
  }], footerContent: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SectionCardComponent, { className: "SectionCardComponent", filePath: "src/app/shared/components/section-card/section-card.component.ts", lineNumber: 11 });
})();

export {
  SectionCardComponent
};
//# sourceMappingURL=chunk-HMI65T4K.js.map
