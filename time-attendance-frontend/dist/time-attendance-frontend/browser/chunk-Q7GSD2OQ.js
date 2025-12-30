import {
  PermissionService
} from "./chunk-HT4DZZW3.js";
import {
  AuthService
} from "./chunk-HZ2IZU2F.js";
import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdirectiveInject
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/shared/directives/has-permission.directive.ts
var _HasPermissionDirective = class _HasPermissionDirective {
  templateRef;
  viewContainer;
  permissionService;
  authService;
  permission = "";
  hasView = false;
  /**
   * Sets the required permission for template visibility.
   * Updates the view immediately when permission changes to ensure reactive UI updates.
   *
   * @param permission - The permission string to check (e.g., 'users:create', 'employees:read')
   */
  set appHasPermission(permission) {
    this.permission = permission;
    this.updateView();
  }
  /**
   * Initializes the HasPermissionDirective with required Angular dependencies and reactive permission monitoring.
   * Sets up automatic view updates based on user authentication state changes using Angular Signals.
   *
   * @param templateRef - Template reference for conditional rendering
   * @param viewContainer - View container for DOM manipulation
   * @param permissionService - Service for permission checking and validation
   * @param authService - Authentication service providing user state and permissions
   */
  constructor(templateRef, viewContainer, permissionService, authService) {
    this.templateRef = templateRef;
    this.viewContainer = viewContainer;
    this.permissionService = permissionService;
    this.authService = authService;
    effect(() => {
      this.authService.currentUser();
      this.updateView();
    });
  }
  /**
   * Updates the template visibility based on current user permissions.
   * Efficiently manages view creation and destruction to minimize DOM manipulation overhead.
   * Called automatically when permission or user state changes through reactive effects.
   */
  updateView() {
    if (!this.permission)
      return;
    const hasPermission = this.permissionService.has(this.permission);
    if (hasPermission && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasPermission && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
};
__name(_HasPermissionDirective, "HasPermissionDirective");
__publicField(_HasPermissionDirective, "\u0275fac", /* @__PURE__ */ __name(function HasPermissionDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HasPermissionDirective)(\u0275\u0275directiveInject(TemplateRef), \u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(PermissionService), \u0275\u0275directiveInject(AuthService));
}, "HasPermissionDirective_Factory"));
__publicField(_HasPermissionDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({ type: _HasPermissionDirective, selectors: [["", "appHasPermission", ""]], inputs: { appHasPermission: "appHasPermission" } }));
var HasPermissionDirective = _HasPermissionDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HasPermissionDirective, [{
    type: Directive,
    args: [{
      selector: "[appHasPermission]",
      standalone: true
    }]
  }], () => [{ type: TemplateRef }, { type: ViewContainerRef }, { type: PermissionService }, { type: AuthService }], { appHasPermission: [{
    type: Input
  }] });
})();

export {
  HasPermissionDirective
};
//# sourceMappingURL=chunk-Q7GSD2OQ.js.map
