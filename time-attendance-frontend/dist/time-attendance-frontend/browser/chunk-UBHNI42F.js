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
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
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

// src/app/shared/components/badge-list/badge-list.component.ts
var _c0 = ["*"];
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.id || $item.label, "_forTrack0");
function BadgeListComponent_Conditional_0_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "i");
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap(item_r2.icon + " me-1");
  }
}
__name(BadgeListComponent_Conditional_0_For_2_Conditional_1_Template, "BadgeListComponent_Conditional_0_For_2_Conditional_1_Template");
function BadgeListComponent_Conditional_0_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function BadgeListComponent_Conditional_0_For_2_Conditional_3_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const item_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onRemoveClick(item_r2, $event));
    }, "BadgeListComponent_Conditional_0_For_2_Conditional_3_Template_button_click_0_listener"));
    \u0275\u0275domElement(1, "i", 7);
    \u0275\u0275domElementEnd();
  }
}
__name(BadgeListComponent_Conditional_0_For_2_Conditional_3_Template, "BadgeListComponent_Conditional_0_For_2_Conditional_3_Template");
function BadgeListComponent_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "span", 4);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function BadgeListComponent_Conditional_0_For_2_Template_span_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onBadgeClick(item_r2));
    }, "BadgeListComponent_Conditional_0_For_2_Template_span_click_0_listener"));
    \u0275\u0275conditionalCreate(1, BadgeListComponent_Conditional_0_For_2_Conditional_1_Template, 1, 2, "i", 0);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, BadgeListComponent_Conditional_0_For_2_Conditional_3_Template, 2, 0, "button", 5);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r2.getBadgeClasses(item_r2));
    \u0275\u0275domProperty("title", item_r2.tooltip);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r2.icon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r2.removable ? 3 : -1);
  }
}
__name(BadgeListComponent_Conditional_0_For_2_Template, "BadgeListComponent_Conditional_0_For_2_Template");
function BadgeListComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 3);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getShowMoreText(), " ");
  }
}
__name(BadgeListComponent_Conditional_0_Conditional_3_Template, "BadgeListComponent_Conditional_0_Conditional_3_Template");
function BadgeListComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div");
    \u0275\u0275repeaterCreate(1, BadgeListComponent_Conditional_0_For_2_Template, 4, 6, "span", 2, _forTrack0);
    \u0275\u0275conditionalCreate(3, BadgeListComponent_Conditional_0_Conditional_3_Template, 2, 1, "span", 3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r2.getContainerClasses());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.getVisibleItems());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.getHiddenCount() > 0 ? 3 : -1);
  }
}
__name(BadgeListComponent_Conditional_0_Template, "BadgeListComponent_Conditional_0_Template");
function BadgeListComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 1);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.emptyMessage);
  }
}
__name(BadgeListComponent_Conditional_1_Template, "BadgeListComponent_Conditional_1_Template");
var _BadgeListComponent = class _BadgeListComponent {
  items = [];
  variant = "primary";
  size = "md";
  gap = "md";
  wrap = true;
  emptyMessage = "No items";
  showEmptyMessage = true;
  maxItems;
  // Show only first N items
  showMoreText = "+ {count} more";
  badgeClick = new EventEmitter();
  badgeRemove = new EventEmitter();
  onBadgeClick(item) {
    if (item.clickable) {
      this.badgeClick.emit(item);
    }
  }
  onRemoveClick(item, event) {
    event.stopPropagation();
    this.badgeRemove.emit(item);
  }
  getContainerClasses() {
    const classes = ["badge-list", "d-flex"];
    if (this.wrap) {
      classes.push("flex-wrap");
    }
    switch (this.gap) {
      case "sm":
        classes.push("gap-1");
        break;
      case "lg":
        classes.push("gap-3");
        break;
      default:
        classes.push("gap-2");
    }
    return classes.join(" ");
  }
  getBadgeClasses(item) {
    const classes = ["badge"];
    const badgeVariant = item.variant || this.variant;
    classes.push(`bg-${badgeVariant}`);
    if (item.clickable) {
      classes.push("badge-clickable");
    }
    if (item.removable) {
      classes.push("badge-removable");
    }
    switch (this.size) {
      case "sm":
        classes.push("badge-sm");
        break;
      case "lg":
        classes.push("badge-lg");
        break;
    }
    return classes.join(" ");
  }
  getVisibleItems() {
    if (this.maxItems && this.items.length > this.maxItems) {
      return this.items.slice(0, this.maxItems);
    }
    return this.items;
  }
  getHiddenCount() {
    if (this.maxItems && this.items.length > this.maxItems) {
      return this.items.length - this.maxItems;
    }
    return 0;
  }
  getShowMoreText() {
    return this.showMoreText.replace("{count}", this.getHiddenCount().toString());
  }
};
__name(_BadgeListComponent, "BadgeListComponent");
__publicField(_BadgeListComponent, "\u0275fac", /* @__PURE__ */ __name(function BadgeListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BadgeListComponent)();
}, "BadgeListComponent_Factory"));
__publicField(_BadgeListComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BadgeListComponent, selectors: [["app-badge-list"]], inputs: { items: "items", variant: "variant", size: "size", gap: "gap", wrap: "wrap", emptyMessage: "emptyMessage", showEmptyMessage: "showEmptyMessage", maxItems: "maxItems", showMoreText: "showMoreText" }, outputs: { badgeClick: "badgeClick", badgeRemove: "badgeRemove" }, ngContentSelectors: _c0, decls: 3, vars: 1, consts: [[3, "class"], [1, "text-muted", "mb-0"], [3, "class", "title"], [1, "badge", "bg-secondary", "badge-more"], [3, "click", "title"], ["type", "button", "aria-label", "Remove", 1, "badge-remove-btn"], ["type", "button", "aria-label", "Remove", 1, "badge-remove-btn", 3, "click"], [1, "fa-solid", "fa-times"]], template: /* @__PURE__ */ __name(function BadgeListComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projectionDef();
    \u0275\u0275conditionalCreate(0, BadgeListComponent_Conditional_0_Template, 4, 3, "div", 0)(1, BadgeListComponent_Conditional_1_Template, 2, 1, "p", 1);
    \u0275\u0275projection(2);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.items.length > 0 ? 0 : ctx.showEmptyMessage ? 1 : -1);
  }
}, "BadgeListComponent_Template"), dependencies: [CommonModule], styles: ["\n\n.badge-list[_ngcontent-%COMP%] {\n  align-items: center;\n}\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n}\n.badge-sm[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  padding: 0.2rem 0.5rem;\n}\n.badge-lg[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  padding: 0.5rem 0.75rem;\n}\n.badge-clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: opacity 0.2s, transform 0.1s;\n}\n.badge-clickable[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n  transform: translateY(-1px);\n}\n.badge-clickable[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.badge-removable[_ngcontent-%COMP%] {\n  padding-right: 0.3rem;\n}\n.badge-remove-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: inherit;\n  padding: 0 0.3rem;\n  margin-left: 0.3rem;\n  cursor: pointer;\n  font-size: 0.9em;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n  line-height: 1;\n}\n.badge-remove-btn[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.badge-remove-btn[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.badge-more[_ngcontent-%COMP%] {\n  font-style: italic;\n  opacity: 0.8;\n}\n/*# sourceMappingURL=badge-list.component.css.map */"] }));
var BadgeListComponent = _BadgeListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BadgeListComponent, [{
    type: Component,
    args: [{ selector: "app-badge-list", standalone: true, imports: [CommonModule], template: `@if (items.length > 0) {\r
  <div [class]="getContainerClasses()">\r
    @for (item of getVisibleItems(); track item.id || item.label) {\r
      <span\r
        [class]="getBadgeClasses(item)"\r
        [title]="item.tooltip"\r
        (click)="onBadgeClick(item)">\r
        @if (item.icon) {\r
          <i [class]="item.icon + ' me-1'"></i>\r
        }\r
        {{ item.label }}\r
        @if (item.removable) {\r
          <button\r
            type="button"\r
            class="badge-remove-btn"\r
            (click)="onRemoveClick(item, $event)"\r
            aria-label="Remove">\r
            <i class="fa-solid fa-times"></i>\r
          </button>\r
        }\r
      </span>\r
    }\r
\r
    <!-- Show more indicator -->\r
    @if (getHiddenCount() > 0) {\r
      <span class="badge bg-secondary badge-more">\r
        {{ getShowMoreText() }}\r
      </span>\r
    }\r
  </div>\r
} @else if (showEmptyMessage) {\r
  <p class="text-muted mb-0">{{ emptyMessage }}</p>\r
}\r
\r
<!-- Custom content slot -->\r
<ng-content></ng-content>`, styles: ["/* src/app/shared/components/badge-list/badge-list.component.css */\n.badge-list {\n  align-items: center;\n}\n.badge {\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n}\n.badge-sm {\n  font-size: 0.7rem;\n  padding: 0.2rem 0.5rem;\n}\n.badge-lg {\n  font-size: 0.95rem;\n  padding: 0.5rem 0.75rem;\n}\n.badge-clickable {\n  cursor: pointer;\n  transition: opacity 0.2s, transform 0.1s;\n}\n.badge-clickable:hover {\n  opacity: 0.85;\n  transform: translateY(-1px);\n}\n.badge-clickable:active {\n  transform: translateY(0);\n}\n.badge-removable {\n  padding-right: 0.3rem;\n}\n.badge-remove-btn {\n  background: none;\n  border: none;\n  color: inherit;\n  padding: 0 0.3rem;\n  margin-left: 0.3rem;\n  cursor: pointer;\n  font-size: 0.9em;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n  line-height: 1;\n}\n.badge-remove-btn:hover {\n  opacity: 1;\n}\n.badge-remove-btn:focus {\n  outline: none;\n}\n.badge-more {\n  font-style: italic;\n  opacity: 0.8;\n}\n/*# sourceMappingURL=badge-list.component.css.map */\n"] }]
  }], null, { items: [{
    type: Input
  }], variant: [{
    type: Input
  }], size: [{
    type: Input
  }], gap: [{
    type: Input
  }], wrap: [{
    type: Input
  }], emptyMessage: [{
    type: Input
  }], showEmptyMessage: [{
    type: Input
  }], maxItems: [{
    type: Input
  }], showMoreText: [{
    type: Input
  }], badgeClick: [{
    type: Output
  }], badgeRemove: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BadgeListComponent, { className: "BadgeListComponent", filePath: "src/app/shared/components/badge-list/badge-list.component.ts", lineNumber: 21 });
})();

export {
  BadgeListComponent
};
//# sourceMappingURL=chunk-UBHNI42F.js.map
