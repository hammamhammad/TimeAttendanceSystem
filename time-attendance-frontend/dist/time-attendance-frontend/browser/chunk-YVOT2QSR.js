import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "./chunk-JBVPS774.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵcomponentInstance,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/shared/components/searchable-select/searchable-select.component.ts
function SearchableSelectComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 3)(1, "div", 8)(2, "span", 9);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.loadingMessage, "...");
  }
}
__name(SearchableSelectComponent_Conditional_3_Template, "SearchableSelectComponent_Conditional_3_Template");
function SearchableSelectComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 10);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function SearchableSelectComponent_Conditional_4_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onClear($event));
    }, "SearchableSelectComponent_Conditional_4_Template_button_click_0_listener"));
    \u0275\u0275domElement(1, "i", 11);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("title", ctx_r0.i18n.t("common.clear"));
  }
}
__name(SearchableSelectComponent_Conditional_4_Template, "SearchableSelectComponent_Conditional_4_Template");
function SearchableSelectComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 12);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function SearchableSelectComponent_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onToggleDropdown());
    }, "SearchableSelectComponent_Conditional_5_Template_button_click_0_listener"));
    \u0275\u0275domElementStart(1, "span", 9);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r0.disabled);
    \u0275\u0275attribute("aria-expanded", ctx_r0.showDropdown());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.select"));
  }
}
__name(SearchableSelectComponent_Conditional_5_Template, "SearchableSelectComponent_Conditional_5_Template");
function SearchableSelectComponent_Conditional_6_Conditional_1_For_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "small", 20);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const option_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r5.subLabel, " ");
  }
}
__name(SearchableSelectComponent_Conditional_6_Conditional_1_For_1_Conditional_4_Template, "SearchableSelectComponent_Conditional_6_Conditional_1_For_1_Conditional_4_Template");
function SearchableSelectComponent_Conditional_6_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 17);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function SearchableSelectComponent_Conditional_6_Conditional_1_For_1_Template_button_click_0_listener() {
      const option_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onSelectOption(option_r5));
    }, "SearchableSelectComponent_Conditional_6_Conditional_1_For_1_Template_button_click_0_listener"));
    \u0275\u0275domElementStart(1, "div", 18)(2, "span", 19);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(4, SearchableSelectComponent_Conditional_6_Conditional_1_For_1_Conditional_4_Template, 2, 1, "small", 20);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const option_r5 = ctx.$implicit;
    \u0275\u0275classProp("disabled", option_r5.disabled);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-muted", option_r5.disabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r5.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(option_r5.subLabel ? 4 : -1);
  }
}
__name(SearchableSelectComponent_Conditional_6_Conditional_1_For_1_Template, "SearchableSelectComponent_Conditional_6_Conditional_1_For_1_Template");
function SearchableSelectComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, SearchableSelectComponent_Conditional_6_Conditional_1_For_1_Template, 5, 6, "button", 16, \u0275\u0275componentInstance().trackByValue, true);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r0.filteredOptions());
  }
}
__name(SearchableSelectComponent_Conditional_6_Conditional_1_Template, "SearchableSelectComponent_Conditional_6_Conditional_1_Template");
function SearchableSelectComponent_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 17);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function SearchableSelectComponent_Conditional_6_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onSelectCustomValue());
    }, "SearchableSelectComponent_Conditional_6_Conditional_2_Template_button_click_0_listener"));
    \u0275\u0275domElementStart(1, "div", 21);
    \u0275\u0275domElement(2, "i", 22);
    \u0275\u0275domElementStart(3, "span", 23);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r0.customValueMessage, ': "', ctx_r0.searchTerm(), '" ');
  }
}
__name(SearchableSelectComponent_Conditional_6_Conditional_2_Template, "SearchableSelectComponent_Conditional_6_Conditional_2_Template");
function SearchableSelectComponent_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.noResultsMessage, " ");
  }
}
__name(SearchableSelectComponent_Conditional_6_Conditional_3_Template, "SearchableSelectComponent_Conditional_6_Conditional_3_Template");
function SearchableSelectComponent_Conditional_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.emptyMessage, " ");
  }
}
__name(SearchableSelectComponent_Conditional_6_Conditional_4_Template, "SearchableSelectComponent_Conditional_6_Conditional_4_Template");
function SearchableSelectComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 13);
    \u0275\u0275conditionalCreate(1, SearchableSelectComponent_Conditional_6_Conditional_1_Template, 2, 0);
    \u0275\u0275conditionalCreate(2, SearchableSelectComponent_Conditional_6_Conditional_2_Template, 5, 2, "button", 14);
    \u0275\u0275conditionalCreate(3, SearchableSelectComponent_Conditional_6_Conditional_3_Template, 2, 1, "div", 15);
    \u0275\u0275conditionalCreate(4, SearchableSelectComponent_Conditional_6_Conditional_4_Template, 2, 1, "div", 15);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("max-height", ctx_r0.maxDropdownHeight)("overflow-y", "auto")("position", "absolute")("z-index", "1050");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasResults() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shouldShowCustomValueOption() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shouldShowNoResults() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.shouldShowEmptyMessage() ? 4 : -1);
  }
}
__name(SearchableSelectComponent_Conditional_6_Template, "SearchableSelectComponent_Conditional_6_Template");
function SearchableSelectComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 7)(1, "div", 24)(2, "div", 25)(3, "span", 9);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(5, "span", 20);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.loadingMessage, "...");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.loadingMessage, "...");
  }
}
__name(SearchableSelectComponent_Conditional_7_Template, "SearchableSelectComponent_Conditional_7_Template");
var _SearchableSelectComponent = class _SearchableSelectComponent {
  i18n = inject(I18nService);
  // Input properties
  options = [];
  placeholder = "";
  loading = false;
  disabled = false;
  clearable = true;
  required = false;
  searchable = true;
  maxDropdownHeight = "200px";
  noResultsMessage = "";
  loadingMessage = "";
  emptyMessage = "";
  allowCustomValue = false;
  customValueMessage = "";
  value = null;
  isInvalid = false;
  // Output events
  selectionChange = new EventEmitter();
  searchChange = new EventEmitter();
  focus = new EventEmitter();
  blur = new EventEmitter();
  // Signals for reactive state management
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  showDropdown = signal(false, ...ngDevMode ? [{ debugName: "showDropdown" }] : []);
  selectedValue = signal(null, ...ngDevMode ? [{ debugName: "selectedValue" }] : []);
  selectedOption = signal(null, ...ngDevMode ? [{ debugName: "selectedOption" }] : []);
  // Computed properties
  filteredOptions = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) {
      return this.options;
    }
    return this.options.filter((option) => option.label.toLowerCase().includes(term) || option.subLabel && option.subLabel.toLowerCase().includes(term) || String(option.value).toLowerCase().includes(term));
  }, ...ngDevMode ? [{ debugName: "filteredOptions" }] : []);
  displayValue = computed(() => {
    if (this.searchTerm() && this.showDropdown()) {
      return this.searchTerm();
    }
    return this.selectedOption()?.label || "";
  }, ...ngDevMode ? [{ debugName: "displayValue" }] : []);
  hasResults = computed(() => this.filteredOptions().length > 0, ...ngDevMode ? [{ debugName: "hasResults" }] : []);
  shouldShowNoResults = computed(() => this.showDropdown() && !this.loading && this.searchTerm().trim().length > 0 && !this.hasResults() && !this.allowCustomValue, ...ngDevMode ? [{ debugName: "shouldShowNoResults" }] : []);
  shouldShowEmptyMessage = computed(() => this.showDropdown() && !this.loading && this.options.length === 0 && this.searchTerm().trim().length === 0, ...ngDevMode ? [{ debugName: "shouldShowEmptyMessage" }] : []);
  shouldShowCustomValueOption = computed(() => this.allowCustomValue && this.searchTerm().trim().length > 0 && !this.hasResults() && !this.loading, ...ngDevMode ? [{ debugName: "shouldShowCustomValueOption" }] : []);
  // ControlValueAccessor implementation
  onChange = /* @__PURE__ */ __name((value) => {
  }, "onChange");
  onTouched = /* @__PURE__ */ __name(() => {
  }, "onTouched");
  writeValue(value) {
    this.selectedValue.set(value);
    const option = this.options.find((opt) => opt.value === value) || null;
    this.selectedOption.set(option);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  ngOnInit() {
    if (!this.noResultsMessage) {
      this.noResultsMessage = this.i18n.t("common.noResultsFound");
    }
    if (!this.loadingMessage) {
      this.loadingMessage = this.i18n.t("common.loading");
    }
    if (!this.emptyMessage) {
      this.emptyMessage = this.i18n.t("common.no_data");
    }
    if (!this.customValueMessage) {
      this.customValueMessage = this.i18n.t("common.create");
    }
    if (this.value !== null && this.value !== void 0) {
      this.writeValue(this.value);
    }
  }
  ngOnChanges(changes) {
    if (changes["value"] && !changes["value"].firstChange) {
      this.writeValue(changes["value"].currentValue);
    }
    if (changes["options"] && !changes["options"].firstChange) {
      const currentValue = this.selectedValue();
      if (currentValue !== null && currentValue !== void 0) {
        const option = this.options.find((opt) => opt.value === currentValue) || null;
        this.selectedOption.set(option);
      }
    }
  }
  ngOnDestroy() {
  }
  onInputFocus() {
    if (this.disabled)
      return;
    this.showDropdown.set(true);
    this.focus.emit();
    if (this.selectedOption()) {
      this.searchTerm.set("");
    }
  }
  onInputBlur() {
    setTimeout(() => {
      this.showDropdown.set(false);
      this.onTouched();
      this.blur.emit();
    }, 200);
  }
  onSearchInput(event) {
    const target = event.target;
    const value = target.value;
    this.searchTerm.set(value);
    this.showDropdown.set(true);
    this.searchChange.emit(value);
  }
  onSelectOption(option) {
    if (option.disabled)
      return;
    this.selectedValue.set(option.value);
    this.selectedOption.set(option);
    this.searchTerm.set("");
    this.showDropdown.set(false);
    this.onChange(option.value);
    this.selectionChange.emit(option.value);
  }
  onSelectCustomValue() {
    if (!this.allowCustomValue || !this.searchTerm().trim())
      return;
    const customValue = this.searchTerm().trim();
    this.selectedValue.set(customValue);
    this.selectedOption.set({
      value: customValue,
      label: customValue
    });
    this.searchTerm.set("");
    this.showDropdown.set(false);
    this.onChange(customValue);
    this.selectionChange.emit(customValue);
  }
  onClear(event) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedValue.set(null);
    this.selectedOption.set(null);
    this.searchTerm.set("");
    this.onChange(null);
    this.selectionChange.emit(null);
  }
  onToggleDropdown() {
    if (this.disabled)
      return;
    if (this.showDropdown()) {
      this.showDropdown.set(false);
    } else {
      this.onInputFocus();
    }
  }
  trackByValue(index, option) {
    return option.value;
  }
  // Public methods for external control
  focusInput() {
    this.onInputFocus();
  }
  clear() {
    this.onClear(new Event("clear"));
  }
  search(term) {
    this.searchTerm.set(term);
    this.showDropdown.set(true);
  }
};
__name(_SearchableSelectComponent, "SearchableSelectComponent");
__publicField(_SearchableSelectComponent, "\u0275fac", /* @__PURE__ */ __name(function SearchableSelectComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SearchableSelectComponent)();
}, "SearchableSelectComponent_Factory"));
__publicField(_SearchableSelectComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SearchableSelectComponent, selectors: [["app-searchable-select"]], inputs: { options: "options", placeholder: "placeholder", loading: "loading", disabled: "disabled", clearable: "clearable", required: "required", searchable: "searchable", maxDropdownHeight: "maxDropdownHeight", noResultsMessage: "noResultsMessage", loadingMessage: "loadingMessage", emptyMessage: "emptyMessage", allowCustomValue: "allowCustomValue", customValueMessage: "customValueMessage", value: "value", isInvalid: "isInvalid" }, outputs: { selectionChange: "selectionChange", searchChange: "searchChange", focus: "focus", blur: "blur" }, features: [\u0275\u0275ProvidersFeature([
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: _SearchableSelectComponent,
    multi: true
  }
]), \u0275\u0275NgOnChangesFeature], decls: 8, vars: 11, consts: [[1, "searchable-select", "position-relative"], [1, "input-group"], ["type", "text", "autocomplete", "off", 1, "form-control", 3, "input", "focus", "blur", "click", "value", "placeholder", "disabled", "readonly"], [1, "input-group-text"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "title"], ["type", "button", 1, "btn", "btn-outline-secondary", "dropdown-toggle", 3, "disabled"], [1, "dropdown-menu", "show", "w-100", "mt-1", "shadow", 3, "max-height", "overflow-y", "position", "z-index"], [1, "dropdown-menu", "show", "w-100", "mt-1", "shadow", "text-center", "py-3", 2, "position", "absolute", "z-index", "1050"], ["role", "status", 1, "spinner-border", "spinner-border-sm"], [1, "visually-hidden"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "title"], [1, "fas", "fa-times"], ["type", "button", 1, "btn", "btn-outline-secondary", "dropdown-toggle", 3, "click", "disabled"], [1, "dropdown-menu", "show", "w-100", "mt-1", "shadow"], ["type", "button", 1, "dropdown-item"], [1, "dropdown-item-text", "text-center", "py-3", "text-muted"], ["type", "button", 1, "dropdown-item", 3, "disabled"], ["type", "button", 1, "dropdown-item", 3, "click"], [1, "d-flex", "flex-column"], [1, "fw-medium"], [1, "text-muted"], [1, "d-flex", "align-items-center"], [1, "fas", "fa-plus", "me-2", "text-primary"], [1, "text-primary"], [1, "d-flex", "align-items-center", "justify-content-center"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: /* @__PURE__ */ __name(function SearchableSelectComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "input", 2);
    \u0275\u0275domListener("input", /* @__PURE__ */ __name(function SearchableSelectComponent_Template_input_input_2_listener($event) {
      return ctx.searchable ? ctx.onSearchInput($event) : null;
    }, "SearchableSelectComponent_Template_input_input_2_listener"))("focus", /* @__PURE__ */ __name(function SearchableSelectComponent_Template_input_focus_2_listener() {
      return ctx.onInputFocus();
    }, "SearchableSelectComponent_Template_input_focus_2_listener"))("blur", /* @__PURE__ */ __name(function SearchableSelectComponent_Template_input_blur_2_listener() {
      return ctx.onInputBlur();
    }, "SearchableSelectComponent_Template_input_blur_2_listener"))("click", /* @__PURE__ */ __name(function SearchableSelectComponent_Template_input_click_2_listener() {
      return !ctx.searchable ? ctx.onToggleDropdown() : null;
    }, "SearchableSelectComponent_Template_input_click_2_listener"));
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(3, SearchableSelectComponent_Conditional_3_Template, 4, 1, "div", 3);
    \u0275\u0275conditionalCreate(4, SearchableSelectComponent_Conditional_4_Template, 2, 1, "button", 4);
    \u0275\u0275conditionalCreate(5, SearchableSelectComponent_Conditional_5_Template, 3, 3, "button", 5);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(6, SearchableSelectComponent_Conditional_6_Template, 5, 12, "div", 6);
    \u0275\u0275conditionalCreate(7, SearchableSelectComponent_Conditional_7_Template, 7, 2, "div", 7);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-invalid", ctx.isInvalid || ctx.required && !ctx.selectedValue() && ctx.searchTerm().trim() === "");
    \u0275\u0275domProperty("value", ctx.displayValue())("placeholder", ctx.placeholder)("disabled", ctx.disabled)("readOnly", !ctx.searchable);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.clearable && ctx.selectedValue() && !ctx.loading && !ctx.disabled ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showDropdown() && !ctx.loading ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showDropdown() && ctx.loading ? 7 : -1);
  }
}, "SearchableSelectComponent_Template"), dependencies: [CommonModule, FormsModule, ReactiveFormsModule], styles: ["\n\n.searchable-select[_ngcontent-%COMP%] {\n  position: relative;\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%] {\n  border: 1px solid #dee2e6;\n  border-radius: 0.375rem;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border: none;\n  background: none;\n  text-align: left;\n  width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:hover:not(.disabled) {\n  background-color: #f8f9fa;\n  color: #495057;\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:focus:not(.disabled) {\n  background-color: #e9ecef;\n  color: #495057;\n  outline: 0;\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-item.disabled[_ngcontent-%COMP%] {\n  color: #6c757d;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]   .fw-medium[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  opacity: 0.8;\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-item-text[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n}\n.searchable-select[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-color: #ced4da;\n}\n.searchable-select[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover {\n  border-color: #adb5bd;\n  background-color: #e9ecef;\n}\n.searchable-select[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n  border-color: #80bdff;\n}\n.searchable-select[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:focus {\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.searchable-select[_ngcontent-%COMP%]   .form-control[readonly][_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.searchable-select[_ngcontent-%COMP%]   .spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 3px;\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #a1a1a1;\n}\n[dir=rtl][_ngcontent-%COMP%]   .searchable-select[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {\n  text-align: right;\n}\n[dir=rtl][_ngcontent-%COMP%]   .searchable-select[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-right: 1px solid #ced4da;\n  border-left: none;\n}\n@media (max-width: 576px) {\n  .searchable-select[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%] {\n    max-height: 150px !important;\n  }\n  .searchable-select[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {\n    padding: 0.75rem 1rem;\n  }\n}\n.searchable-select[_ngcontent-%COMP%]   .dropdown-menu.show[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_dropdown-fade-in 0.15s ease-out;\n}\n@keyframes _ngcontent-%COMP%_dropdown-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(-5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.searchable-select[_ngcontent-%COMP%]   .loading[_ngcontent-%COMP%]   .input-group-text[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: none;\n}\n.searchable-select[_ngcontent-%COMP%]:focus-within   .input-group[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n/*# sourceMappingURL=searchable-select.component.css.map */"] }));
var SearchableSelectComponent = _SearchableSelectComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SearchableSelectComponent, [{
    type: Component,
    args: [{ selector: "app-searchable-select", standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: SearchableSelectComponent,
        multi: true
      }
    ], template: `<div class="searchable-select position-relative">
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      [class.is-invalid]="isInvalid || (required && !selectedValue() && searchTerm().trim() === '')"
      [value]="displayValue()"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [readonly]="!searchable"
      (input)="searchable ? onSearchInput($event) : null"
      (focus)="onInputFocus()"
      (blur)="onInputBlur()"
      (click)="!searchable ? onToggleDropdown() : null"
      autocomplete="off"
    />

    @if (loading) {
      <div class="input-group-text">
        <div class="spinner-border spinner-border-sm" role="status">
          <span class="visually-hidden">{{ loadingMessage }}...</span>
        </div>
      </div>
    }

    @if (clearable && selectedValue() && !loading && !disabled) {
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="onClear($event)"
        [title]="i18n.t('common.clear')"
      >
        <i class="fas fa-times"></i>
      </button>
    }

    @if (!loading) {
      <button
        type="button"
        class="btn btn-outline-secondary dropdown-toggle"
        [disabled]="disabled"
        (click)="onToggleDropdown()"
        [attr.aria-expanded]="showDropdown()"
      >
        <span class="visually-hidden">{{ i18n.t('common.select') }}</span>
      </button>
    }
  </div>

  @if (showDropdown() && !loading) {
    <div
      class="dropdown-menu show w-100 mt-1 shadow"
      [style.max-height]="maxDropdownHeight"
      [style.overflow-y]="'auto'"
      [style.position]="'absolute'"
      [style.z-index]="'1050'"
    >
      @if (hasResults()) {
        @for (option of filteredOptions(); track trackByValue($index, option)) {
          <button
            type="button"
            class="dropdown-item"
            [class.disabled]="option.disabled"
            (click)="onSelectOption(option)"
          >
            <div class="d-flex flex-column">
              <span class="fw-medium" [class.text-muted]="option.disabled">
                {{ option.label }}
              </span>
              @if (option.subLabel) {
                <small class="text-muted">
                  {{ option.subLabel }}
                </small>
              }
            </div>
          </button>
        }
      }

      @if (shouldShowCustomValueOption()) {
        <button
          type="button"
          class="dropdown-item"
          (click)="onSelectCustomValue()"
        >
          <div class="d-flex align-items-center">
            <i class="fas fa-plus me-2 text-primary"></i>
            <span class="text-primary">
              {{ customValueMessage }}: "{{ searchTerm() }}"
            </span>
          </div>
        </button>
      }

      @if (shouldShowNoResults()) {
        <div class="dropdown-item-text text-center py-3 text-muted">
          {{ noResultsMessage }}
        </div>
      }

      @if (shouldShowEmptyMessage()) {
        <div class="dropdown-item-text text-center py-3 text-muted">
          {{ emptyMessage }}
        </div>
      }
    </div>
  }

  @if (showDropdown() && loading) {
    <div
      class="dropdown-menu show w-100 mt-1 shadow text-center py-3"
      style="position: absolute; z-index: 1050;"
    >
      <div class="d-flex align-items-center justify-content-center">
        <div class="spinner-border spinner-border-sm me-2" role="status">
          <span class="visually-hidden">{{ loadingMessage }}...</span>
        </div>
        <span class="text-muted">{{ loadingMessage }}...</span>
      </div>
    </div>
  }
</div>`, styles: ["/* src/app/shared/components/searchable-select/searchable-select.component.css */\n.searchable-select {\n  position: relative;\n}\n.searchable-select .dropdown-menu {\n  border: 1px solid #dee2e6;\n  border-radius: 0.375rem;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.searchable-select .dropdown-item {\n  padding: 0.5rem 1rem;\n  border: none;\n  background: none;\n  text-align: left;\n  width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.searchable-select .dropdown-item:hover:not(.disabled) {\n  background-color: #f8f9fa;\n  color: #495057;\n}\n.searchable-select .dropdown-item:focus:not(.disabled) {\n  background-color: #e9ecef;\n  color: #495057;\n  outline: 0;\n}\n.searchable-select .dropdown-item.disabled {\n  color: #6c757d;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.searchable-select .dropdown-item .fw-medium {\n  font-weight: 500;\n}\n.searchable-select .dropdown-item small {\n  font-size: 0.875rem;\n  opacity: 0.8;\n}\n.searchable-select .dropdown-item-text {\n  padding: 0.5rem 1rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n}\n.searchable-select .input-group .btn {\n  border-color: #ced4da;\n}\n.searchable-select .input-group .btn:hover {\n  border-color: #adb5bd;\n  background-color: #e9ecef;\n}\n.searchable-select .input-group .btn:focus {\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n  border-color: #80bdff;\n}\n.searchable-select .form-control:focus {\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.searchable-select .form-control[readonly] {\n  cursor: pointer;\n}\n.searchable-select .spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.searchable-select .dropdown-menu::-webkit-scrollbar {\n  width: 6px;\n}\n.searchable-select .dropdown-menu::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\n.searchable-select .dropdown-menu::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 3px;\n}\n.searchable-select .dropdown-menu::-webkit-scrollbar-thumb:hover {\n  background: #a1a1a1;\n}\n[dir=rtl] .searchable-select .dropdown-item {\n  text-align: right;\n}\n[dir=rtl] .searchable-select .input-group .btn {\n  border-right: 1px solid #ced4da;\n  border-left: none;\n}\n@media (max-width: 576px) {\n  .searchable-select .dropdown-menu {\n    max-height: 150px !important;\n  }\n  .searchable-select .dropdown-item {\n    padding: 0.75rem 1rem;\n  }\n}\n.searchable-select .dropdown-menu.show {\n  animation: dropdown-fade-in 0.15s ease-out;\n}\n@keyframes dropdown-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(-5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.searchable-select .loading .input-group-text {\n  background-color: transparent;\n  border: none;\n}\n.searchable-select:focus-within .input-group .form-control {\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n/*# sourceMappingURL=searchable-select.component.css.map */\n"] }]
  }], null, { options: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], loading: [{
    type: Input
  }], disabled: [{
    type: Input
  }], clearable: [{
    type: Input
  }], required: [{
    type: Input
  }], searchable: [{
    type: Input
  }], maxDropdownHeight: [{
    type: Input
  }], noResultsMessage: [{
    type: Input
  }], loadingMessage: [{
    type: Input
  }], emptyMessage: [{
    type: Input
  }], allowCustomValue: [{
    type: Input
  }], customValueMessage: [{
    type: Input
  }], value: [{
    type: Input
  }], isInvalid: [{
    type: Input
  }], selectionChange: [{
    type: Output
  }], searchChange: [{
    type: Output
  }], focus: [{
    type: Output
  }], blur: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SearchableSelectComponent, { className: "SearchableSelectComponent", filePath: "src/app/shared/components/searchable-select/searchable-select.component.ts", lineNumber: 27 });
})();

export {
  SearchableSelectComponent
};
//# sourceMappingURL=chunk-YVOT2QSR.js.map
