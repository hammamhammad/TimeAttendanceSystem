import {
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵnextContext,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/shared/components/status-badge/status-badge.component.ts
function StatusBadgeComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "i");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.icon + " me-1");
    \u0275\u0275classProp("app-pulse", ctx_r0.pulse);
  }
}
__name(StatusBadgeComponent_Conditional_1_Template, "StatusBadgeComponent_Conditional_1_Template");
var _StatusBadgeComponent = class _StatusBadgeComponent {
  status;
  label;
  variant;
  icon;
  pulse = false;
  showIcon = true;
  size = "md";
  title;
  customConfig;
  defaultStatusConfig = {
    "active": { label: "Active", variant: "success", icon: "fas fa-check-circle" },
    "inactive": { label: "Inactive", variant: "danger", icon: "fas fa-times-circle" },
    "pending": { label: "Pending", variant: "warning", icon: "fas fa-hourglass-half" },
    "approved": { label: "Approved", variant: "success", icon: "fas fa-check-circle" },
    "rejected": { label: "Rejected", variant: "danger", icon: "fas fa-times-circle" },
    "cancelled": { label: "Cancelled", variant: "secondary", icon: "fas fa-ban" },
    "processing": { label: "Processing", variant: "info", icon: "fas fa-spinner", pulse: true },
    "draft": { label: "Draft", variant: "light", icon: "fas fa-edit" },
    "published": { label: "Published", variant: "primary", icon: "fas fa-eye" },
    "archived": { label: "Archived", variant: "secondary", icon: "fas fa-archive" },
    "online": { label: "Online", variant: "success", icon: "fas fa-circle" },
    "offline": { label: "Offline", variant: "danger", icon: "fas fa-circle" },
    "present": { label: "Present", variant: "success", icon: "fas fa-user-check" },
    "absent": { label: "Absent", variant: "danger", icon: "fas fa-user-times" },
    "late": { label: "Late", variant: "warning", icon: "fas fa-clock" },
    "early": { label: "Early", variant: "info", icon: "fas fa-clock" },
    "overtime": { label: "Overtime", variant: "primary", icon: "fas fa-business-time" },
    "full_time": { label: "Full Time", variant: "primary", icon: "fas fa-user-tie" },
    "part_time": { label: "Part Time", variant: "info", icon: "fas fa-user-clock" },
    "contract": { label: "Contract", variant: "warning", icon: "fas fa-file-contract" },
    "intern": { label: "Intern", variant: "light", icon: "fas fa-graduation-cap" },
    "male": { label: "Male", variant: "info", icon: "fas fa-mars" },
    "female": { label: "Female", variant: "info", icon: "fas fa-venus" },
    "office": { label: "Office", variant: "primary", icon: "fas fa-building" },
    "remote": { label: "Remote", variant: "success", icon: "fas fa-home" },
    "hybrid": { label: "Hybrid", variant: "info", icon: "fas fa-laptop-house" }
  };
  get effectiveConfig() {
    if (this.status) {
      const config = this.customConfig?.[this.status] || this.defaultStatusConfig[this.status.toLowerCase()];
      if (config) {
        return __spreadProps(__spreadValues({}, config), {
          pulse: this.pulse || config.pulse || false
        });
      }
    }
    if (this.label && this.variant) {
      return {
        label: this.label,
        variant: this.variant,
        icon: this.icon,
        pulse: this.pulse
      };
    }
    return null;
  }
  get resolvedLabel() {
    return this.effectiveConfig?.label || this.label || this.status || "";
  }
  get resolvedVariant() {
    return this.effectiveConfig?.variant || this.variant || "secondary";
  }
  get resolvedIcon() {
    return this.effectiveConfig?.icon || this.icon;
  }
  get resolvedPulse() {
    return this.effectiveConfig?.pulse || this.pulse;
  }
  getBadgeClasses() {
    const variant = this.resolvedVariant;
    const sizeClass = this.size === "sm" ? "badge-sm" : this.size === "lg" ? "badge-lg" : "";
    const variantClass = this.getBootstrapVariant(variant);
    return `badge ${variantClass} ${sizeClass}`.trim();
  }
  getBootstrapVariant(variant) {
    switch (variant) {
      case "active":
      case "success":
      case "approved":
        return "bg-success";
      case "inactive":
      case "danger":
      case "rejected":
        return "bg-danger";
      case "pending":
      case "warning":
        return "bg-warning";
      case "processing":
      case "info":
        return "bg-info";
      case "cancelled":
      case "secondary":
        return "bg-secondary";
      case "primary":
        return "bg-primary";
      case "light":
        return "bg-light text-dark";
      case "dark":
        return "bg-dark";
      default:
        return "bg-secondary";
    }
  }
};
__name(_StatusBadgeComponent, "StatusBadgeComponent");
__publicField(_StatusBadgeComponent, "\u0275fac", /* @__PURE__ */ __name(function StatusBadgeComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _StatusBadgeComponent)();
}, "StatusBadgeComponent_Factory"));
__publicField(_StatusBadgeComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StatusBadgeComponent, selectors: [["app-status-badge"]], inputs: { status: "status", label: "label", variant: "variant", icon: "icon", pulse: "pulse", showIcon: "showIcon", size: "size", title: "title", customConfig: "customConfig" }, decls: 3, vars: 5, consts: [[3, "class", "app-pulse"]], template: /* @__PURE__ */ __name(function StatusBadgeComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275conditionalCreate(1, StatusBadgeComponent_Conditional_1_Template, 1, 4, "i", 0);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275classMap(ctx.getBadgeClasses());
    \u0275\u0275attribute("title", ctx.title || ctx.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showIcon && ctx.icon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.label, " ");
  }
}, "StatusBadgeComponent_Template"), encapsulation: 2 }));
var StatusBadgeComponent = _StatusBadgeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StatusBadgeComponent, [{
    type: Component,
    args: [{
      selector: "app-status-badge",
      standalone: true,
      imports: [],
      template: `
    <span [class]="getBadgeClasses()"
          [attr.title]="title || label">
      @if (showIcon && icon) {
        <i [class]="icon + ' me-1'" [class.app-pulse]="pulse"></i>
      }
      {{ label }}
    </span>
  `
    }]
  }], null, { status: [{
    type: Input
  }], label: [{
    type: Input
  }], variant: [{
    type: Input
  }], icon: [{
    type: Input
  }], pulse: [{
    type: Input
  }], showIcon: [{
    type: Input
  }], size: [{
    type: Input
  }], title: [{
    type: Input
  }], customConfig: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StatusBadgeComponent, { className: "StatusBadgeComponent", filePath: "src/app/shared/components/status-badge/status-badge.component.ts", lineNumber: 27 });
})();

export {
  StatusBadgeComponent
};
//# sourceMappingURL=chunk-TT5VOWGP.js.map
