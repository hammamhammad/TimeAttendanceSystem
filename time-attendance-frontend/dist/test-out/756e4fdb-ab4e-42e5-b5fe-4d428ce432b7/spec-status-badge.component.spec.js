import {
  CommonModule,
  Component,
  Input,
  TestBed,
  __decorate,
  init_common,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-6Y5GACT3.js";
import {
  __async,
  __commonJS,
  __esm,
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-FJAJPUQN.js";

// src/app/shared/components/status-badge/status-badge.component.ts
var _a, StatusBadgeComponent;
var init_status_badge_component = __esm({
  "src/app/shared/components/status-badge/status-badge.component.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_common();
    StatusBadgeComponent = (_a = class {
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
    }, __name(_a, "StatusBadgeComponent"), __publicField(_a, "propDecorators", {
      status: [{ type: Input }],
      label: [{ type: Input }],
      variant: [{ type: Input }],
      icon: [{ type: Input }],
      pulse: [{ type: Input }],
      showIcon: [{ type: Input }],
      size: [{ type: Input }],
      title: [{ type: Input }],
      customConfig: [{ type: Input }]
    }), _a);
    StatusBadgeComponent = __decorate([
      Component({
        selector: "app-status-badge",
        standalone: true,
        imports: [CommonModule],
        template: `
    <span [class]="getBadgeClasses()"
          [attr.title]="title || label">
      @if (showIcon && icon) {
        <i [class]="icon + ' me-1'" [class.app-pulse]="pulse"></i>
      }
      {{ label }}
    </span>
  `
      })
    ], StatusBadgeComponent);
  }
});

// src/app/shared/components/status-badge/status-badge.component.spec.ts
var require_status_badge_component_spec = __commonJS({
  "src/app/shared/components/status-badge/status-badge.component.spec.ts"(exports) {
    init_testing();
    init_status_badge_component();
    describe("StatusBadgeComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [StatusBadgeComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(StatusBadgeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
      it("should render default status", () => {
        component.status = "Approved";
        fixture.detectChanges();
        const badge = fixture.nativeElement.querySelector(".badge");
        expect(badge).toBeTruthy();
        expect(badge.textContent).toContain("Approved");
      });
    });
  }
});
export default require_status_badge_component_spec();
//# sourceMappingURL=spec-status-badge.component.spec.js.map
