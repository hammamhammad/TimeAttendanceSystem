import {
  FILTER_CONFIGURATIONS
} from "./chunk-SKLP6OYI.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-GYSVNBR7.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/shared/components/unified-filter/unified-filter.component.ts
function UnifiedFilterComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function UnifiedFilterComponent_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    }, "UnifiedFilterComponent_Conditional_7_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 13);
    \u0275\u0275elementEnd();
  }
}
__name(UnifiedFilterComponent_Conditional_7_Template, "UnifiedFilterComponent_Conditional_7_Template");
function UnifiedFilterComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function UnifiedFilterComponent_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onRefresh());
    }, "UnifiedFilterComponent_Conditional_10_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.refreshing);
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-spin", ctx_r1.refreshing);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.displayRefreshButtonText(), " ");
  }
}
__name(UnifiedFilterComponent_Conditional_10_Template, "UnifiedFilterComponent_Conditional_10_Template");
function UnifiedFilterComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function UnifiedFilterComponent_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAdd());
    }, "UnifiedFilterComponent_Conditional_11_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.displayAddButtonText(), " ");
  }
}
__name(UnifiedFilterComponent_Conditional_11_Template, "UnifiedFilterComponent_Conditional_11_Template");
var _UnifiedFilterComponent = class _UnifiedFilterComponent {
  i18n = inject(I18nService);
  // Simple mode inputs
  searchPlaceholder;
  showAddButton = true;
  // Changed default to true
  addButtonText;
  showRefreshButton = true;
  refreshButtonText;
  refreshing = false;
  // Advanced mode inputs (for moduleName-based pages)
  moduleName;
  // Outputs
  searchChange = new EventEmitter();
  add = new EventEmitter();
  refresh = new EventEmitter();
  filtersChange = new EventEmitter();
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  searchTimeout;
  // Computed properties for dynamic translation
  displaySearchPlaceholder = computed(() => {
    if (this.searchPlaceholder) {
      return this.searchPlaceholder;
    }
    if (this.moduleName && FILTER_CONFIGURATIONS[this.moduleName]) {
      return this.i18n.t(FILTER_CONFIGURATIONS[this.moduleName].searchPlaceholder);
    }
    return this.i18n.t("common.search");
  }, ...ngDevMode ? [{ debugName: "displaySearchPlaceholder" }] : []);
  displayAddButtonText = computed(() => {
    if (this.addButtonText) {
      return this.addButtonText;
    }
    if (this.moduleName && FILTER_CONFIGURATIONS[this.moduleName]) {
      return this.i18n.t(FILTER_CONFIGURATIONS[this.moduleName].addButtonText);
    }
    return this.i18n.t("common.create");
  }, ...ngDevMode ? [{ debugName: "displayAddButtonText" }] : []);
  displayRefreshButtonText = computed(() => {
    if (this.refreshButtonText) {
      return this.refreshButtonText;
    }
    return this.i18n.t("common.refresh");
  }, ...ngDevMode ? [{ debugName: "displayRefreshButtonText" }] : []);
  ngOnInit() {
  }
  onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.onSearch();
    }, 300);
  }
  onSearch() {
    this.searchChange.emit(this.searchTerm());
  }
  clearSearch() {
    this.searchTerm.set("");
    this.onSearch();
  }
  onAdd() {
    this.add.emit();
  }
  onRefresh() {
    this.refresh.emit();
  }
};
__name(_UnifiedFilterComponent, "UnifiedFilterComponent");
__publicField(_UnifiedFilterComponent, "\u0275fac", /* @__PURE__ */ __name(function UnifiedFilterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UnifiedFilterComponent)();
}, "UnifiedFilterComponent_Factory"));
__publicField(_UnifiedFilterComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnifiedFilterComponent, selectors: [["app-unified-filter"]], inputs: { searchPlaceholder: "searchPlaceholder", showAddButton: "showAddButton", addButtonText: "addButtonText", showRefreshButton: "showRefreshButton", refreshButtonText: "refreshButtonText", refreshing: "refreshing", moduleName: "moduleName" }, outputs: { searchChange: "searchChange", add: "add", refresh: "refresh", filtersChange: "filtersChange" }, decls: 12, vars: 5, consts: [[1, "search-filter"], [1, "row", "g-3", "align-items-center"], [1, "col-12", "col-md-4"], [1, "input-group"], [1, "input-group-text"], [1, "fas", "fa-search"], ["type", "text", 1, "form-control", 3, "ngModelChange", "keyup.enter", "placeholder", "ngModel"], ["type", "button", 1, "btn", "btn-outline-secondary"], [1, "col-12", "col-md-8", "text-md-end", "text-center", "mt-2", "mt-md-0"], [1, "d-flex", "justify-content-md-end", "justify-content-center", "gap-2", "flex-wrap"], ["type", "button", 1, "btn", "btn-outline-info", 3, "disabled"], ["type", "button", 1, "btn", "btn-success"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], [1, "fas", "fa-times"], ["type", "button", 1, "btn", "btn-outline-info", 3, "click", "disabled"], [1, "fas", "fa-sync-alt", "me-2"], ["type", "button", 1, "btn", "btn-success", 3, "click"], [1, "fas", "fa-plus", "me-2"]], template: /* @__PURE__ */ __name(function UnifiedFilterComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
    \u0275\u0275element(5, "i", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 6);
    \u0275\u0275twoWayListener("ngModelChange", /* @__PURE__ */ __name(function UnifiedFilterComponent_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
      return $event;
    }, "UnifiedFilterComponent_Template_input_ngModelChange_6_listener"));
    \u0275\u0275listener("ngModelChange", /* @__PURE__ */ __name(function UnifiedFilterComponent_Template_input_ngModelChange_6_listener() {
      return ctx.onSearchChange();
    }, "UnifiedFilterComponent_Template_input_ngModelChange_6_listener"))("keyup.enter", /* @__PURE__ */ __name(function UnifiedFilterComponent_Template_input_keyup_enter_6_listener() {
      return ctx.onSearch();
    }, "UnifiedFilterComponent_Template_input_keyup_enter_6_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, UnifiedFilterComponent_Conditional_7_Template, 2, 0, "button", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 8)(9, "div", 9);
    \u0275\u0275conditionalCreate(10, UnifiedFilterComponent_Conditional_10_Template, 3, 4, "button", 10);
    \u0275\u0275conditionalCreate(11, UnifiedFilterComponent_Conditional_11_Template, 3, 1, "button", 11);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(6);
    \u0275\u0275property("placeholder", ctx.displaySearchPlaceholder());
    \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.searchTerm() ? 7 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.showRefreshButton ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showAddButton ? 11 : -1);
  }
}, "UnifiedFilterComponent_Template"), dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.search-filter[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n/*# sourceMappingURL=unified-filter.component.css.map */"] }));
var UnifiedFilterComponent = _UnifiedFilterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnifiedFilterComponent, [{
    type: Component,
    args: [{ selector: "app-unified-filter", standalone: true, imports: [FormsModule], template: `
    <div class="search-filter">
      <div class="row g-3 align-items-center">
        <!-- Search input -->
        <div class="col-12 col-md-4">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-search"></i>
            </span>
            <input
              type="text"
              class="form-control"
              [placeholder]="displaySearchPlaceholder()"
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange()"
              (keyup.enter)="onSearch()">
            @if (searchTerm()) {
              <button
                class="btn btn-outline-secondary"
                type="button"
                (click)="clearSearch()">
                <i class="fas fa-times"></i>
              </button>
            }
          </div>
        </div>

        <!-- Action buttons -->
        <div class="col-12 col-md-8 text-md-end text-center mt-2 mt-md-0">
          <div class="d-flex justify-content-md-end justify-content-center gap-2 flex-wrap">
            @if (showRefreshButton) {
              <button
                class="btn btn-outline-info"
                type="button"
                [disabled]="refreshing"
                (click)="onRefresh()">
                <i class="fas fa-sync-alt me-2" [class.fa-spin]="refreshing"></i>
                {{ displayRefreshButtonText() }}
              </button>
            }
            @if (showAddButton) {
              <button
                class="btn btn-success"
                type="button"
                (click)="onAdd()">
                <i class="fas fa-plus me-2"></i>
                {{ displayAddButtonText() }}
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;fe06c7071c1d6323e13e13971f52c6bd5aead0dd48314d689c7dbb0af9174055;D:/Work/TimeAttendanceSystem/time-attendance-frontend/src/app/shared/components/unified-filter/unified-filter.component.ts */\n.search-filter {\n  margin-bottom: 1rem;\n}\n/*# sourceMappingURL=unified-filter.component.css.map */\n"] }]
  }], null, { searchPlaceholder: [{
    type: Input
  }], showAddButton: [{
    type: Input
  }], addButtonText: [{
    type: Input
  }], showRefreshButton: [{
    type: Input
  }], refreshButtonText: [{
    type: Input
  }], refreshing: [{
    type: Input
  }], moduleName: [{
    type: Input
  }], searchChange: [{
    type: Output
  }], add: [{
    type: Output
  }], refresh: [{
    type: Output
  }], filtersChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnifiedFilterComponent, { className: "UnifiedFilterComponent", filePath: "src/app/shared/components/unified-filter/unified-filter.component.ts", lineNumber: 71 });
})();

export {
  UnifiedFilterComponent
};
//# sourceMappingURL=chunk-KEVORF3C.js.map
