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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
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

// src/app/shared/components/form-section/form-section.component.ts
var _c0 = [[["", "slot", "left"]], [["", "slot", "right"]], [["", "slot", "left"]], [["", "slot", "center"]], [["", "slot", "right"]], [["", "slot", "main"]], [["", "slot", "sidebar"]], "*"];
var _c1 = ["[slot=left]", "[slot=right]", "[slot=left]", "[slot=center]", "[slot=right]", "[slot=main]", "[slot=sidebar]", "*"];
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.label, "_forTrack0");
function FormSectionComponent_Conditional_1_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r0.icon + " me-2");
  }
}
__name(FormSectionComponent_Conditional_1_Conditional_1_Conditional_1_Template, "FormSectionComponent_Conditional_1_Conditional_1_Conditional_1_Template");
function FormSectionComponent_Conditional_1_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
__name(FormSectionComponent_Conditional_1_Conditional_1_Conditional_3_Template, "FormSectionComponent_Conditional_1_Conditional_1_Conditional_3_Template");
function FormSectionComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275conditionalCreate(1, FormSectionComponent_Conditional_1_Conditional_1_Conditional_1_Template, 1, 2, "i", 6);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, FormSectionComponent_Conditional_1_Conditional_1_Conditional_3_Template, 2, 0, "span", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.titleClass);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.icon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.title, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.required ? 3 : -1);
  }
}
__name(FormSectionComponent_Conditional_1_Conditional_1_Template, "FormSectionComponent_Conditional_1_Conditional_1_Template");
function FormSectionComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.description);
  }
}
__name(FormSectionComponent_Conditional_1_Conditional_2_Template, "FormSectionComponent_Conditional_1_Conditional_2_Template");
function FormSectionComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275conditionalCreate(1, FormSectionComponent_Conditional_1_Conditional_1_Template, 4, 5, "h3", 6);
    \u0275\u0275conditionalCreate(2, FormSectionComponent_Conditional_1_Conditional_2_Template, 2, 1, "p", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.title ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.description ? 2 : -1);
  }
}
__name(FormSectionComponent_Conditional_1_Template, "FormSectionComponent_Conditional_1_Template");
function FormSectionComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 9);
    \u0275\u0275projection(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 9);
    \u0275\u0275projection(4, 1);
    \u0275\u0275elementEnd()();
  }
}
__name(FormSectionComponent_Conditional_3_Template, "FormSectionComponent_Conditional_3_Template");
function FormSectionComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 10);
    \u0275\u0275projection(2, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 10);
    \u0275\u0275projection(4, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 10);
    \u0275\u0275projection(6, 4);
    \u0275\u0275elementEnd()();
  }
}
__name(FormSectionComponent_Conditional_4_Template, "FormSectionComponent_Conditional_4_Template");
function FormSectionComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 11);
    \u0275\u0275projection(2, 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 12);
    \u0275\u0275projection(4, 6);
    \u0275\u0275elementEnd()();
  }
}
__name(FormSectionComponent_Conditional_5_Template, "FormSectionComponent_Conditional_5_Template");
function FormSectionComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 7);
  }
}
__name(FormSectionComponent_Conditional_6_Template, "FormSectionComponent_Conditional_6_Template");
function FormSectionComponent_Conditional_7_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 15);
  }
}
__name(FormSectionComponent_Conditional_7_For_2_Conditional_1_Template, "FormSectionComponent_Conditional_7_For_2_Conditional_1_Template");
function FormSectionComponent_Conditional_7_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const action_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap(action_r3.icon + " me-2");
  }
}
__name(FormSectionComponent_Conditional_7_For_2_Conditional_2_Template, "FormSectionComponent_Conditional_7_For_2_Conditional_2_Template");
function FormSectionComponent_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function FormSectionComponent_Conditional_7_For_2_Template_button_click_0_listener() {
      const action_r3 = \u0275\u0275restoreView(_r2).$implicit;
      return \u0275\u0275resetView(action_r3.action());
    }, "FormSectionComponent_Conditional_7_For_2_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, FormSectionComponent_Conditional_7_For_2_Conditional_1_Template, 1, 0, "span", 15)(2, FormSectionComponent_Conditional_7_For_2_Conditional_2_Template, 1, 2, "i", 6);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r3 = ctx.$implicit;
    \u0275\u0275classMap("btn btn-" + (action_r3.variant || "outline-secondary"));
    \u0275\u0275property("disabled", action_r3.disabled || action_r3.loading);
    \u0275\u0275advance();
    \u0275\u0275conditional(action_r3.loading ? 1 : action_r3.icon ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", action_r3.label, " ");
  }
}
__name(FormSectionComponent_Conditional_7_For_2_Template, "FormSectionComponent_Conditional_7_For_2_Template");
function FormSectionComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275repeaterCreate(1, FormSectionComponent_Conditional_7_For_2_Template, 4, 5, "button", 13, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.actions);
  }
}
__name(FormSectionComponent_Conditional_7_Template, "FormSectionComponent_Conditional_7_Template");
function FormSectionComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275elementContainer(1, 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.customFooter);
  }
}
__name(FormSectionComponent_Conditional_8_Template, "FormSectionComponent_Conditional_8_Template");
var _FormSectionComponent = class _FormSectionComponent {
  title;
  description;
  icon;
  required = false;
  layout = "single";
  variant = "default";
  collapsible = false;
  collapsed = false;
  disabled = false;
  titleClass = "app-section-primary";
  customFooter;
  actions;
};
__name(_FormSectionComponent, "FormSectionComponent");
__publicField(_FormSectionComponent, "\u0275fac", /* @__PURE__ */ __name(function FormSectionComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FormSectionComponent)();
}, "FormSectionComponent_Factory"));
__publicField(_FormSectionComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormSectionComponent, selectors: [["app-form-section"]], inputs: { title: "title", description: "description", icon: "icon", required: "required", layout: "layout", variant: "variant", collapsible: "collapsible", collapsed: "collapsed", disabled: "disabled", titleClass: "titleClass", customFooter: "customFooter", actions: "actions" }, ngContentSelectors: _c1, decls: 9, vars: 4, consts: [[1, "app-form-section"], [1, "app-form-section-header"], [1, "app-form-section-content"], [1, "row"], [1, "app-form-section-actions"], [1, "app-form-section-footer"], [3, "class"], [1, "app-form-section-description", "text-muted"], [1, "text-danger"], [1, "col-md-6"], [1, "col-md-4"], [1, "col-lg-8"], [1, "col-lg-4"], ["type", "button", 3, "class", "disabled"], ["type", "button", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [3, "ngTemplateOutlet"]], template: /* @__PURE__ */ __name(function FormSectionComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projectionDef(_c0);
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, FormSectionComponent_Conditional_1_Template, 3, 2, "div", 1);
    \u0275\u0275elementStart(2, "div", 2);
    \u0275\u0275conditionalCreate(3, FormSectionComponent_Conditional_3_Template, 5, 0, "div", 3)(4, FormSectionComponent_Conditional_4_Template, 7, 0, "div", 3)(5, FormSectionComponent_Conditional_5_Template, 5, 0, "div", 3)(6, FormSectionComponent_Conditional_6_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, FormSectionComponent_Conditional_7_Template, 3, 0, "div", 4);
    \u0275\u0275conditionalCreate(8, FormSectionComponent_Conditional_8_Template, 2, 1, "div", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.title || ctx.description ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.layout === "two-column" ? 3 : ctx.layout === "three-column" ? 4 : ctx.layout === "sidebar" ? 5 : 6);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx.actions && ctx.actions.length > 0 ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.customFooter ? 8 : -1);
  }
}, "FormSectionComponent_Template"), dependencies: [CommonModule, NgTemplateOutlet], encapsulation: 2 }));
var FormSectionComponent = _FormSectionComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormSectionComponent, [{
    type: Component,
    args: [{
      selector: "app-form-section",
      standalone: true,
      imports: [CommonModule],
      template: `
    <div class="app-form-section">
      @if (title || description) {
        <div class="app-form-section-header">
          @if (title) {
            <h3 [class]="titleClass">
              @if (icon) {
                <i [class]="icon + ' me-2'"></i>
              }
              {{ title }}
              @if (required) {
                <span class="text-danger">*</span>
              }
            </h3>
          }
          @if (description) {
            <p class="app-form-section-description text-muted">{{ description }}</p>
          }
        </div>
      }

      <div class="app-form-section-content">
        @if (layout === 'two-column') {
          <div class="row">
            <div class="col-md-6">
              <ng-content select="[slot=left]"></ng-content>
            </div>
            <div class="col-md-6">
              <ng-content select="[slot=right]"></ng-content>
            </div>
          </div>
        } @else if (layout === 'three-column') {
          <div class="row">
            <div class="col-md-4">
              <ng-content select="[slot=left]"></ng-content>
            </div>
            <div class="col-md-4">
              <ng-content select="[slot=center]"></ng-content>
            </div>
            <div class="col-md-4">
              <ng-content select="[slot=right]"></ng-content>
            </div>
          </div>
        } @else if (layout === 'sidebar') {
          <div class="row">
            <div class="col-lg-8">
              <ng-content select="[slot=main]"></ng-content>
            </div>
            <div class="col-lg-4">
              <ng-content select="[slot=sidebar]"></ng-content>
            </div>
          </div>
        } @else {
          <!-- Single column layout -->
          <ng-content></ng-content>
        }
      </div>

      @if (actions && actions.length > 0) {
        <div class="app-form-section-actions">
          @for (action of actions; track action.label) {
            <button
              type="button"
              [class]="'btn btn-' + (action.variant || 'outline-secondary')"
              [disabled]="action.disabled || action.loading"
              (click)="action.action()">
              @if (action.loading) {
                <span class="spinner-border spinner-border-sm me-2" role="status"></span>
              } @else if (action.icon) {
                <i [class]="action.icon + ' me-2'"></i>
              }
              {{ action.label }}
            </button>
          }
        </div>
      }

      @if (customFooter) {
        <div class="app-form-section-footer">
          <ng-container [ngTemplateOutlet]="customFooter"></ng-container>
        </div>
      }
    </div>
  `
    }]
  }], null, { title: [{
    type: Input
  }], description: [{
    type: Input
  }], icon: [{
    type: Input
  }], required: [{
    type: Input
  }], layout: [{
    type: Input
  }], variant: [{
    type: Input
  }], collapsible: [{
    type: Input
  }], collapsed: [{
    type: Input
  }], disabled: [{
    type: Input
  }], titleClass: [{
    type: Input
  }], customFooter: [{
    type: Input
  }], actions: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormSectionComponent, { className: "FormSectionComponent", filePath: "src/app/shared/components/form-section/form-section.component.ts", lineNumber: 93 });
})();

export {
  FormSectionComponent
};
//# sourceMappingURL=chunk-JTLHOQFH.js.map
