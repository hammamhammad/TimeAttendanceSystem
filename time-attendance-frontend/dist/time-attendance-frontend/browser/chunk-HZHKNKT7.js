import {
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
import {
  PermissionService
} from "./chunk-DWXA666M.js";
import "./chunk-EVMJ7ILG.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import {
  AuthService
} from "./chunk-O2IS3HK2.js";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import {
  environment
} from "./chunk-TNEZPYQG.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  HttpClient,
  Injectable,
  Input,
  NgClass,
  Output,
  Subject,
  computed,
  effect,
  filter,
  fromEvent,
  inject,
  map,
  setClassMetadata,
  signal,
  takeUntil,
  tap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵinterpolate2,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __async,
  __name,
  __publicField,
  __require,
  __spreadProps,
  __spreadValues
} from "./chunk-26Y7QVDB.js";

// src/app/core/menu/menu.service.ts
var _MenuService = class _MenuService {
  menuItems = signal([
    {
      path: "/dashboard",
      titleKey: "nav.dashboard",
      icon: "fa-solid fa-chart-line",
      permission: void 0
      // Dashboard accessible to all authenticated users
    },
    {
      path: "/users",
      titleKey: "nav.users",
      icon: "fa-solid fa-users",
      permission: "user.read"
    },
    {
      path: "/employees",
      titleKey: "nav.employees",
      icon: "fa-solid fa-id-card",
      permission: "employee.read"
    },
    {
      path: "/roles",
      titleKey: "nav.roles",
      icon: "fa-solid fa-user-shield",
      permission: "role.read"
    },
    {
      path: "/branches",
      titleKey: "nav.branches",
      icon: "fa-solid fa-code-branch",
      permission: "branch.read"
    },
    {
      path: "/departments",
      titleKey: "nav.departments",
      icon: "fa-solid fa-sitemap",
      permission: "department.read"
    },
    {
      path: "/shifts",
      titleKey: "nav.shifts",
      icon: "fa-solid fa-clock",
      permission: void 0,
      // Special handling in sidenav component
      children: [
        {
          path: "/shifts",
          titleKey: "shifts.title",
          icon: "fa-solid fa-clock",
          permission: "shift.read"
        },
        {
          path: "/shifts/assign",
          titleKey: "shifts.assignments.title",
          icon: "fa-solid fa-user-clock",
          permission: "shift.assign"
        }
      ]
    },
    {
      path: "/attendance",
      titleKey: "nav.attendance",
      icon: "fa-solid fa-calendar-check",
      permission: void 0,
      // Special handling in sidenav component
      children: [
        {
          path: "/attendance",
          titleKey: "attendance.dashboard_title",
          icon: "fa-solid fa-chart-line",
          permission: "attendance.read"
        },
        {
          path: "/attendance/daily",
          titleKey: "attendance.daily_view",
          icon: "fa-solid fa-calendar-day",
          permission: "attendance.read"
        },
        {
          path: "/attendance/monthly-report",
          titleKey: "attendance.monthly_report",
          icon: "fa-solid fa-calendar-alt",
          permission: "attendance.read"
        }
      ]
    },
    {
      path: "/reports",
      titleKey: "nav.reports",
      icon: "fa-solid fa-chart-bar",
      permission: void 0,
      // Show if user has any report access
      children: [
        {
          path: "/reports/attendance",
          titleKey: "reports.attendance",
          icon: "fa-solid fa-list-check",
          permission: "attendance.read"
        },
        {
          path: "/reports/leaves",
          titleKey: "reports.leaves",
          icon: "fa-solid fa-calendar-minus",
          permission: "vacation.read"
        },
        {
          path: "/reports/sessions",
          titleKey: "sessions.title",
          icon: "fa-solid fa-wifi",
          permission: "session.read"
        },
        {
          path: "/reports/audit-logs",
          titleKey: "audit_logs.title",
          icon: "fa-solid fa-history",
          permission: "audit.read"
        }
      ]
    },
    {
      path: "/settings",
      titleKey: "nav.settings",
      icon: "fa-solid fa-cog",
      permission: void 0,
      // Settings accessible to all authenticated users
      children: [
        {
          path: "/settings",
          titleKey: "settings.dashboard",
          icon: "fa-solid fa-cog",
          permission: void 0
        },
        {
          path: "/settings/overtime",
          titleKey: "settings.overtime.title",
          icon: "fa-solid fa-clock",
          permission: "settings.overtime.read"
        },
        {
          path: "/settings/public-holidays",
          titleKey: "settings.holidays.title",
          icon: "fa-solid fa-calendar-check",
          permission: "publicHoliday.read"
        },
        {
          path: "/vacation-types",
          titleKey: "vacation_types.title",
          icon: "fa-solid fa-calendar-alt",
          permission: "vacationType.read"
        },
        {
          path: "/settings/excuse-policies",
          titleKey: "excuse_policies.title",
          icon: "fa-solid fa-user-clock",
          permission: "settings.excusePolicy.read"
        },
        {
          path: "/settings/remote-work-policy",
          titleKey: "remoteWork.policy.title",
          icon: "fa-solid fa-laptop-house",
          permission: "remoteWork.policy.read"
        },
        {
          path: "/settings/workflows",
          titleKey: "workflows.title",
          icon: "fa-solid fa-project-diagram",
          permission: "workflow.read"
        },
        {
          path: "/settings/leave-entitlements",
          titleKey: "leaveBalance.leaveEntitlements",
          icon: "fa-solid fa-calendar-check",
          permission: "leaveBalance.read"
        }
      ]
    },
    {
      path: "/approvals",
      titleKey: "approvals.title",
      icon: "fa-solid fa-tasks",
      permission: void 0,
      // Show if user has any approval access
      children: [
        {
          path: "/approvals",
          titleKey: "approvals.pending_title",
          icon: "fa-solid fa-clock",
          permission: "approval.read"
        },
        {
          path: "/approvals/history",
          titleKey: "approvals.history_title",
          icon: "fa-solid fa-history",
          permission: "approval.read"
        }
      ]
    },
    {
      path: "/employee-vacations",
      titleKey: "nav.employeeVacations",
      icon: "fa-solid fa-calendar-week",
      permission: "vacation.read"
    },
    {
      path: "/employee-excuses",
      titleKey: "employee_excuses.title",
      icon: "fa-solid fa-clipboard-check",
      permission: "excuse.read"
    },
    {
      path: "/remote-work",
      titleKey: "remoteWork.request.title",
      icon: "fa-solid fa-laptop-house",
      permission: "remoteWork.request.read"
    }
  ], ...ngDevMode ? [{ debugName: "menuItems" }] : []);
  /**
   * Get all menu items
   */
  getMenuItems() {
    return this.menuItems();
  }
  /**
   * Get menu items as a signal
   */
  getMenuItems$() {
    return this.menuItems;
  }
  /**
   * Add a new menu item
   */
  addMenuItem(item) {
    this.menuItems.update((items) => [...items, item]);
  }
  /**
   * Remove a menu item by path
   */
  removeMenuItem(path) {
    this.menuItems.update((items) => items.filter((item) => item.path !== path));
  }
  /**
   * Update a menu item
   */
  updateMenuItem(path, updatedItem) {
    this.menuItems.update((items) => items.map((item) => item.path === path ? __spreadValues(__spreadValues({}, item), updatedItem) : item));
  }
  /**
   * Find a menu item by path
   */
  findMenuItem(path) {
    return this.menuItems().find((item) => item.path === path);
  }
};
__name(_MenuService, "MenuService");
__publicField(_MenuService, "\u0275fac", /* @__PURE__ */ __name(function MenuService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MenuService)();
}, "MenuService_Factory"));
__publicField(_MenuService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MenuService, factory: _MenuService.\u0275fac, providedIn: "root" }));
var MenuService = _MenuService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/layout/sidenav/sidenav.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.path, "_forTrack0");
function SidenavComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h5", 2);
    \u0275\u0275text(1, "Time Attendance");
    \u0275\u0275elementEnd();
  }
}
__name(SidenavComponent_Conditional_2_Template, "SidenavComponent_Conditional_2_Template");
function SidenavComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 3);
  }
}
__name(SidenavComponent_Conditional_3_Template, "SidenavComponent_Conditional_3_Template");
function SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.t(item_r2.titleKey));
  }
}
__name(SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_3_Template, "SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_3_Template");
function SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 12);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("rotate-180", ctx_r2.isSubmenuOpen(item_r2.path));
  }
}
__name(SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_4_Template, "SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_4_Template");
function SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_5_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 5)(1, "a", 6);
    \u0275\u0275element(2, "i");
    \u0275\u0275elementStart(3, "span", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const child_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", child_r4.path)("title", ctx_r2.t(child_r4.titleKey));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", child_r4.icon, " me-2"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.t(child_r4.titleKey));
  }
}
__name(SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_5_For_2_Conditional_0_Template, "SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_5_For_2_Conditional_0_Template");
function SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_5_For_2_Conditional_0_Template, 5, 6, "li", 5);
  }
  if (rf & 2) {
    const child_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275conditional(ctx_r2.hasChildMenuPermission(child_r4) ? 0 : -1);
  }
}
__name(SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_5_For_2_Template, "SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_5_For_2_Template");
function SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 11);
    \u0275\u0275repeaterCreate(1, SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_5_For_2_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(item_r2.children);
  }
}
__name(SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_5_Template, "SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_5_Template");
function SidenavComponent_For_6_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 7);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function SidenavComponent_For_6_Conditional_0_Conditional_1_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const item_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSubmenu(item_r2.path));
    }, "SidenavComponent_For_6_Conditional_0_Conditional_1_Template_a_click_0_listener"));
    \u0275\u0275elementStart(1, "div", 8);
    \u0275\u0275element(2, "i");
    \u0275\u0275conditionalCreate(3, SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_3_Template, 2, 1, "span", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_4_Template, 1, 2, "i", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, SidenavComponent_For_6_Conditional_0_Conditional_1_Conditional_5_Template, 3, 0, "ul", 11);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.isParentActive(item_r2));
    \u0275\u0275property("title", ctx_r2.collapsed() ? ctx_r2.t(item_r2.titleKey) : "");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", item_r2.icon, " me-2"));
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.collapsed() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.collapsed() && ctx_r2.hasVisibleChildren(item_r2) ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.collapsed() && ctx_r2.isSubmenuOpen(item_r2.path) && ctx_r2.hasVisibleChildren(item_r2) ? 5 : -1);
  }
}
__name(SidenavComponent_For_6_Conditional_0_Conditional_1_Template, "SidenavComponent_For_6_Conditional_0_Conditional_1_Template");
function SidenavComponent_For_6_Conditional_0_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.t(item_r2.titleKey));
  }
}
__name(SidenavComponent_For_6_Conditional_0_Conditional_2_Conditional_2_Template, "SidenavComponent_For_6_Conditional_0_Conditional_2_Conditional_2_Template");
function SidenavComponent_For_6_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 6);
    \u0275\u0275element(1, "i");
    \u0275\u0275conditionalCreate(2, SidenavComponent_For_6_Conditional_0_Conditional_2_Conditional_2_Template, 2, 1, "span", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", item_r2.path)("title", ctx_r2.collapsed() ? ctx_r2.t(item_r2.titleKey) : "");
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", item_r2.icon, " me-2"));
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.collapsed() ? 2 : -1);
  }
}
__name(SidenavComponent_For_6_Conditional_0_Conditional_2_Template, "SidenavComponent_For_6_Conditional_0_Conditional_2_Template");
function SidenavComponent_For_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 5);
    \u0275\u0275conditionalCreate(1, SidenavComponent_For_6_Conditional_0_Conditional_1_Template, 6, 9)(2, SidenavComponent_For_6_Conditional_0_Conditional_2_Template, 3, 6, "a", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r2.children && item_r2.children.length > 0 ? 1 : 2);
  }
}
__name(SidenavComponent_For_6_Conditional_0_Template, "SidenavComponent_For_6_Conditional_0_Template");
function SidenavComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, SidenavComponent_For_6_Conditional_0_Template, 3, 1, "li", 5);
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.hasParentMenuPermission(item_r2) ? 0 : -1);
  }
}
__name(SidenavComponent_For_6_Template, "SidenavComponent_For_6_Template");
var _SidenavComponent = class _SidenavComponent {
  collapsed = signal(false, ...ngDevMode ? [{ debugName: "collapsed" }] : []);
  menuService = inject(MenuService);
  router = inject(Router);
  i18n = inject(I18nService);
  permissionService = inject(PermissionService);
  menuItems = this.menuService.getMenuItems$();
  // Track which submenus are open - updated for debugging
  openSubmenus = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "openSubmenus" }] : []);
  t(key) {
    return this.i18n.t(key);
  }
  hasPerm(permission) {
    return !permission || this.permissionService.has(permission);
  }
  // Check permissions for child menu items with special handling
  hasChildMenuPermission(child) {
    if (child.path === "/settings/public-holidays") {
      return this.permissionService.canReadPublicHolidays();
    }
    return !child.permission || this.hasPerm(child.permission);
  }
  // Special permission check for parent menus that should show with any related permission
  hasParentMenuPermission(item) {
    if (item.path === "/shifts") {
      return this.permissionService.canAccessShifts();
    }
    if (item.path === "/attendance") {
      return this.permissionService.has("attendance.manage") || this.permissionService.has("attendance.read") || this.permissionService.has("attendance.calculate");
    }
    if (item.path === "/reports") {
      return this.hasVisibleChildren(item);
    }
    if (!item.permission)
      return true;
    return this.hasPerm(item.permission);
  }
  // Check if a parent menu item should be marked as active
  isParentActive(item) {
    if (!item.children)
      return false;
    const currentPath = this.router.url;
    return item.children.some((child) => currentPath.startsWith(child.path));
  }
  // Check if submenu is open
  isSubmenuOpen(itemPath) {
    return this.openSubmenus().has(itemPath);
  }
  // Toggle submenu open/closed
  toggleSubmenu(itemPath) {
    const openMenus = new Set(this.openSubmenus());
    if (openMenus.has(itemPath)) {
      openMenus.delete(itemPath);
    } else {
      openMenus.add(itemPath);
    }
    this.openSubmenus.set(openMenus);
  }
  // Check if menu item has any visible children
  hasVisibleChildren(item) {
    return !!(item.children && item.children.some((child) => this.hasChildMenuPermission(child)));
  }
};
__name(_SidenavComponent, "SidenavComponent");
__publicField(_SidenavComponent, "\u0275fac", /* @__PURE__ */ __name(function SidenavComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SidenavComponent)();
}, "SidenavComponent_Factory"));
__publicField(_SidenavComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidenavComponent, selectors: [["app-sidenav"]], inputs: { collapsed: "collapsed" }, decls: 7, vars: 4, consts: [[1, "sidenav"], [1, "sidenav-header", "p-3"], [1, "text-truncate", "mb-0"], [1, "fa-solid", "fa-clock", "fa-lg"], [1, "nav", "flex-column", "mt-2"], [1, "nav-item"], ["routerLinkActive", "active", 1, "nav-link", "d-flex", "align-items-center", 3, "routerLink", "title"], [1, "nav-link", "d-flex", "align-items-center", "justify-content-between", 2, "cursor", "pointer", 3, "click", "title"], [1, "d-flex", "align-items-center"], [1, "text-truncate"], [1, "fas", "fa-chevron-down", 2, "transition", "transform 0.2s ease", 3, "rotate-180"], [1, "nav", "flex-column", "submenu", "ms-3"], [1, "fas", "fa-chevron-down", 2, "transition", "transform 0.2s ease"]], template: /* @__PURE__ */ __name(function SidenavComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 0)(1, "div", 1);
    \u0275\u0275conditionalCreate(2, SidenavComponent_Conditional_2_Template, 2, 0, "h5", 2)(3, SidenavComponent_Conditional_3_Template, 1, 0, "i", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ul", 4);
    \u0275\u0275repeaterCreate(5, SidenavComponent_For_6_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275classProp("collapsed", ctx.collapsed());
    \u0275\u0275attribute("aria-expanded", !ctx.collapsed());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx.collapsed() ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx.menuItems());
  }
}, "SidenavComponent_Template"), dependencies: [RouterModule, RouterLink, RouterLinkActive], styles: ["\n\n.sidenav[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100vh;\n  width: 250px;\n  background-color: var(--bs-dark);\n  color: var(--bs-light);\n  transition: width 0.3s ease;\n  z-index: 1000;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.sidenav.collapsed[_ngcontent-%COMP%] {\n  width: 72px;\n}\n.sidenav-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  min-height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.sidenav-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  color: var(--bs-light);\n  font-weight: 600;\n}\n.nav-link[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n  padding: 0.75rem 1rem;\n  border-radius: 0;\n  transition: all 0.2s ease;\n  border-left: 3px solid transparent;\n}\n.nav-link[_ngcontent-%COMP%]:hover {\n  color: var(--bs-light);\n  background-color: rgba(255, 255, 255, 0.1);\n}\n.nav-link.active[_ngcontent-%COMP%] {\n  color: var(--bs-light);\n  background-color: rgba(255, 255, 255, 0.1);\n  border-left-color: var(--bs-primary);\n}\n.nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 20px;\n  text-align: center;\n  flex-shrink: 0;\n}\n.collapsed[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.collapsed[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 0 !important;\n}\n.submenu[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.1);\n  border-radius: 0.25rem;\n  margin-top: 0.25rem;\n  margin-bottom: 0.25rem;\n}\n.submenu[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem 0.5rem 2.5rem;\n  font-size: 0.875rem;\n  border-left: none;\n}\n.submenu[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.submenu[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%] {\n  background-color: rgba(255, 255, 255, 0.15);\n  border-left: 3px solid var(--bs-primary);\n}\n.rotate-180[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .submenu[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  padding-left: 1rem;\n  padding-right: 2.5rem;\n  border-left: none;\n  border-right: none;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .submenu[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%] {\n  border-right: 3px solid var(--bs-primary);\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .sidenav[_ngcontent-%COMP%] {\n  left: auto !important;\n  right: 0 !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .nav-link[_ngcontent-%COMP%] {\n  border-left: none;\n  border-right: 3px solid transparent;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .nav-link.active[_ngcontent-%COMP%] {\n  border-right-color: var(--bs-primary);\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .me-2[_ngcontent-%COMP%] {\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n}\n@media (max-width: 767.98px) {\n  .sidenav[_ngcontent-%COMP%] {\n    transform: translateX(-100%);\n    transition: transform 0.3s ease;\n  }\n  .sidenav.show[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n  [_ngcontent-%COMP%]:root[dir=rtl]   .sidenav[_ngcontent-%COMP%] {\n    transform: translateX(100%) !important;\n  }\n  [_ngcontent-%COMP%]:root[dir=rtl]   .sidenav.show[_ngcontent-%COMP%] {\n    transform: translateX(0) !important;\n  }\n}\n/*# sourceMappingURL=sidenav.component.css.map */"] }));
var SidenavComponent = _SidenavComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidenavComponent, [{
    type: Component,
    args: [{ selector: "app-sidenav", standalone: true, imports: [RouterModule], template: `<nav class="sidenav"\r
     [class.collapsed]="collapsed()"\r
     [attr.aria-expanded]="!collapsed()">\r
\r
  <div class="sidenav-header p-3">\r
    @if (!collapsed()) {\r
      <h5 class="text-truncate mb-0">Time Attendance</h5>\r
    } @else {\r
      <i class="fa-solid fa-clock fa-lg"></i>\r
    }\r
  </div>\r
\r
  <ul class="nav flex-column mt-2">\r
    @for (item of menuItems(); track item.path) {\r
      @if (hasParentMenuPermission(item)) {\r
        <li class="nav-item">\r
          <!-- Parent menu item -->\r
          @if (item.children && item.children.length > 0) {\r
            <!-- Menu item with children -->\r
            <a class="nav-link d-flex align-items-center justify-content-between"\r
               [class.active]="isParentActive(item)"\r
               (click)="toggleSubmenu(item.path)"\r
               style="cursor: pointer"\r
               [title]="collapsed() ? t(item.titleKey) : ''">\r
              <div class="d-flex align-items-center">\r
                <i class="{{ item.icon }} me-2"></i>\r
                @if (!collapsed()) {\r
                  <span class="text-truncate">{{ t(item.titleKey) }}</span>\r
                }\r
              </div>\r
              @if (!collapsed() && hasVisibleChildren(item)) {\r
                <i class="fas fa-chevron-down"\r
                   [class.rotate-180]="isSubmenuOpen(item.path)"\r
                   style="transition: transform 0.2s ease;"></i>\r
              }\r
            </a>\r
            <!-- Submenu -->\r
            @if (!collapsed() && isSubmenuOpen(item.path) && hasVisibleChildren(item)) {\r
              <ul class="nav flex-column submenu ms-3">\r
                @for (child of item.children; track child.path) {\r
                  @if (hasChildMenuPermission(child)) {\r
                    <li class="nav-item">\r
                      <a class="nav-link d-flex align-items-center"\r
                         [routerLink]="child.path"\r
                         routerLinkActive="active"\r
                         [title]="t(child.titleKey)">\r
                        <i class="{{ child.icon }} me-2"></i>\r
                        <span class="text-truncate">{{ t(child.titleKey) }}</span>\r
                      </a>\r
                    </li>\r
                  }\r
                }\r
              </ul>\r
            }\r
          } @else {\r
            <!-- Simple menu item without children -->\r
            <a class="nav-link d-flex align-items-center"\r
               [routerLink]="item.path"\r
               routerLinkActive="active"\r
               [title]="collapsed() ? t(item.titleKey) : ''">\r
              <i class="{{ item.icon }} me-2"></i>\r
              @if (!collapsed()) {\r
                <span class="text-truncate">{{ t(item.titleKey) }}</span>\r
              }\r
            </a>\r
          }\r
        </li>\r
      }\r
    }\r
  </ul>\r
</nav>`, styles: ["/* src/app/layout/sidenav/sidenav.component.css */\n.sidenav {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100vh;\n  width: 250px;\n  background-color: var(--bs-dark);\n  color: var(--bs-light);\n  transition: width 0.3s ease;\n  z-index: 1000;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.sidenav.collapsed {\n  width: 72px;\n}\n.sidenav-header {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  min-height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.sidenav-header h5 {\n  color: var(--bs-light);\n  font-weight: 600;\n}\n.nav-link {\n  color: rgba(255, 255, 255, 0.8);\n  padding: 0.75rem 1rem;\n  border-radius: 0;\n  transition: all 0.2s ease;\n  border-left: 3px solid transparent;\n}\n.nav-link:hover {\n  color: var(--bs-light);\n  background-color: rgba(255, 255, 255, 0.1);\n}\n.nav-link.active {\n  color: var(--bs-light);\n  background-color: rgba(255, 255, 255, 0.1);\n  border-left-color: var(--bs-primary);\n}\n.nav-link i {\n  width: 20px;\n  text-align: center;\n  flex-shrink: 0;\n}\n.collapsed .nav-link {\n  justify-content: center;\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.collapsed .nav-link i {\n  margin-right: 0 !important;\n}\n.submenu {\n  background-color: rgba(0, 0, 0, 0.1);\n  border-radius: 0.25rem;\n  margin-top: 0.25rem;\n  margin-bottom: 0.25rem;\n}\n.submenu .nav-link {\n  padding: 0.5rem 1rem 0.5rem 2.5rem;\n  font-size: 0.875rem;\n  border-left: none;\n}\n.submenu .nav-link:hover {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.submenu .nav-link.active {\n  background-color: rgba(255, 255, 255, 0.15);\n  border-left: 3px solid var(--bs-primary);\n}\n.rotate-180 {\n  transform: rotate(180deg);\n}\n:root[dir=rtl] .submenu .nav-link {\n  padding-left: 1rem;\n  padding-right: 2.5rem;\n  border-left: none;\n  border-right: none;\n}\n:root[dir=rtl] .submenu .nav-link.active {\n  border-right: 3px solid var(--bs-primary);\n}\n:root[dir=rtl] .sidenav {\n  left: auto !important;\n  right: 0 !important;\n}\n:root[dir=rtl] .nav-link {\n  border-left: none;\n  border-right: 3px solid transparent;\n}\n:root[dir=rtl] .nav-link.active {\n  border-right-color: var(--bs-primary);\n}\n:root[dir=rtl] .me-2 {\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n}\n@media (max-width: 767.98px) {\n  .sidenav {\n    transform: translateX(-100%);\n    transition: transform 0.3s ease;\n  }\n  .sidenav.show {\n    transform: translateX(0);\n  }\n  :root[dir=rtl] .sidenav {\n    transform: translateX(100%) !important;\n  }\n  :root[dir=rtl] .sidenav.show {\n    transform: translateX(0) !important;\n  }\n}\n/*# sourceMappingURL=sidenav.component.css.map */\n"] }]
  }], null, { collapsed: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidenavComponent, { className: "SidenavComponent", filePath: "src/app/layout/sidenav/sidenav.component.ts", lineNumber: 15 });
})();

// node_modules/@microsoft/signalr/dist/esm/Errors.js
var _HttpError = class _HttpError extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
   *
   * @param {string} errorMessage A descriptive error message.
   * @param {number} statusCode The HTTP status code represented by this error.
   */
  constructor(errorMessage, statusCode) {
    const trueProto = new.target.prototype;
    super(`${errorMessage}: Status code '${statusCode}'`);
    this.statusCode = statusCode;
    this.__proto__ = trueProto;
  }
};
__name(_HttpError, "HttpError");
var HttpError = _HttpError;
var _TimeoutError = class _TimeoutError extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
   *
   * @param {string} errorMessage A descriptive error message.
   */
  constructor(errorMessage = "A timeout occurred.") {
    const trueProto = new.target.prototype;
    super(errorMessage);
    this.__proto__ = trueProto;
  }
};
__name(_TimeoutError, "TimeoutError");
var TimeoutError = _TimeoutError;
var _AbortError = class _AbortError extends Error {
  /** Constructs a new instance of {@link AbortError}.
   *
   * @param {string} errorMessage A descriptive error message.
   */
  constructor(errorMessage = "An abort occurred.") {
    const trueProto = new.target.prototype;
    super(errorMessage);
    this.__proto__ = trueProto;
  }
};
__name(_AbortError, "AbortError");
var AbortError = _AbortError;
var _UnsupportedTransportError = class _UnsupportedTransportError extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.UnsupportedTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(message, transport) {
    const trueProto = new.target.prototype;
    super(message);
    this.transport = transport;
    this.errorType = "UnsupportedTransportError";
    this.__proto__ = trueProto;
  }
};
__name(_UnsupportedTransportError, "UnsupportedTransportError");
var UnsupportedTransportError = _UnsupportedTransportError;
var _DisabledTransportError = class _DisabledTransportError extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.DisabledTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(message, transport) {
    const trueProto = new.target.prototype;
    super(message);
    this.transport = transport;
    this.errorType = "DisabledTransportError";
    this.__proto__ = trueProto;
  }
};
__name(_DisabledTransportError, "DisabledTransportError");
var DisabledTransportError = _DisabledTransportError;
var _FailedToStartTransportError = class _FailedToStartTransportError extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.FailedToStartTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(message, transport) {
    const trueProto = new.target.prototype;
    super(message);
    this.transport = transport;
    this.errorType = "FailedToStartTransportError";
    this.__proto__ = trueProto;
  }
};
__name(_FailedToStartTransportError, "FailedToStartTransportError");
var FailedToStartTransportError = _FailedToStartTransportError;
var _FailedToNegotiateWithServerError = class _FailedToNegotiateWithServerError extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.FailedToNegotiateWithServerError}.
   *
   * @param {string} message A descriptive error message.
   */
  constructor(message) {
    const trueProto = new.target.prototype;
    super(message);
    this.errorType = "FailedToNegotiateWithServerError";
    this.__proto__ = trueProto;
  }
};
__name(_FailedToNegotiateWithServerError, "FailedToNegotiateWithServerError");
var FailedToNegotiateWithServerError = _FailedToNegotiateWithServerError;
var _AggregateErrors = class _AggregateErrors extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.AggregateErrors}.
   *
   * @param {string} message A descriptive error message.
   * @param {Error[]} innerErrors The collection of errors this error is aggregating.
   */
  constructor(message, innerErrors) {
    const trueProto = new.target.prototype;
    super(message);
    this.innerErrors = innerErrors;
    this.__proto__ = trueProto;
  }
};
__name(_AggregateErrors, "AggregateErrors");
var AggregateErrors = _AggregateErrors;

// node_modules/@microsoft/signalr/dist/esm/HttpClient.js
var _HttpResponse = class _HttpResponse {
  constructor(statusCode, statusText, content) {
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.content = content;
  }
};
__name(_HttpResponse, "HttpResponse");
var HttpResponse = _HttpResponse;
var _HttpClient = class _HttpClient {
  get(url, options) {
    return this.send(__spreadProps(__spreadValues({}, options), {
      method: "GET",
      url
    }));
  }
  post(url, options) {
    return this.send(__spreadProps(__spreadValues({}, options), {
      method: "POST",
      url
    }));
  }
  delete(url, options) {
    return this.send(__spreadProps(__spreadValues({}, options), {
      method: "DELETE",
      url
    }));
  }
  /** Gets all cookies that apply to the specified URL.
   *
   * @param url The URL that the cookies are valid for.
   * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
   */
  // @ts-ignore
  getCookieString(url) {
    return "";
  }
};
__name(_HttpClient, "HttpClient");
var HttpClient2 = _HttpClient;

// node_modules/@microsoft/signalr/dist/esm/ILogger.js
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["Trace"] = 0] = "Trace";
  LogLevel2[LogLevel2["Debug"] = 1] = "Debug";
  LogLevel2[LogLevel2["Information"] = 2] = "Information";
  LogLevel2[LogLevel2["Warning"] = 3] = "Warning";
  LogLevel2[LogLevel2["Error"] = 4] = "Error";
  LogLevel2[LogLevel2["Critical"] = 5] = "Critical";
  LogLevel2[LogLevel2["None"] = 6] = "None";
})(LogLevel || (LogLevel = {}));

// node_modules/@microsoft/signalr/dist/esm/Loggers.js
var _NullLogger = class _NullLogger {
  constructor() {
  }
  /** @inheritDoc */
  // eslint-disable-next-line
  log(_logLevel, _message) {
  }
};
__name(_NullLogger, "NullLogger");
var NullLogger = _NullLogger;
NullLogger.instance = new NullLogger();

// node_modules/@microsoft/signalr/dist/esm/pkg-version.js
var VERSION = "10.0.0";

// node_modules/@microsoft/signalr/dist/esm/Utils.js
var _Arg = class _Arg {
  static isRequired(val, name) {
    if (val === null || val === void 0) {
      throw new Error(`The '${name}' argument is required.`);
    }
  }
  static isNotEmpty(val, name) {
    if (!val || val.match(/^\s*$/)) {
      throw new Error(`The '${name}' argument should not be empty.`);
    }
  }
  static isIn(val, values, name) {
    if (!(val in values)) {
      throw new Error(`Unknown ${name} value: ${val}.`);
    }
  }
};
__name(_Arg, "Arg");
var Arg = _Arg;
var _Platform = class _Platform {
  // react-native has a window but no document so we should check both
  static get isBrowser() {
    return !_Platform.isNode && typeof window === "object" && typeof window.document === "object";
  }
  // WebWorkers don't have a window object so the isBrowser check would fail
  static get isWebWorker() {
    return !_Platform.isNode && typeof self === "object" && "importScripts" in self;
  }
  // react-native has a window but no document
  static get isReactNative() {
    return !_Platform.isNode && typeof window === "object" && typeof window.document === "undefined";
  }
  // Node apps shouldn't have a window object, but WebWorkers don't either
  // so we need to check for both WebWorker and window
  static get isNode() {
    return typeof process !== "undefined" && process.release && process.release.name === "node";
  }
};
__name(_Platform, "Platform");
var Platform = _Platform;
function getDataDetail(data, includeContent) {
  let detail = "";
  if (isArrayBuffer(data)) {
    detail = `Binary data of length ${data.byteLength}`;
    if (includeContent) {
      detail += `. Content: '${formatArrayBuffer(data)}'`;
    }
  } else if (typeof data === "string") {
    detail = `String data of length ${data.length}`;
    if (includeContent) {
      detail += `. Content: '${data}'`;
    }
  }
  return detail;
}
__name(getDataDetail, "getDataDetail");
function formatArrayBuffer(data) {
  const view = new Uint8Array(data);
  let str = "";
  view.forEach((num) => {
    const pad = num < 16 ? "0" : "";
    str += `0x${pad}${num.toString(16)} `;
  });
  return str.substring(0, str.length - 1);
}
__name(formatArrayBuffer, "formatArrayBuffer");
function isArrayBuffer(val) {
  return val && typeof ArrayBuffer !== "undefined" && (val instanceof ArrayBuffer || // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
  val.constructor && val.constructor.name === "ArrayBuffer");
}
__name(isArrayBuffer, "isArrayBuffer");
function sendMessage(logger, transportName, httpClient, url, content, options) {
  return __async(this, null, function* () {
    const headers = {};
    const [name, value] = getUserAgentHeader();
    headers[name] = value;
    logger.log(LogLevel.Trace, `(${transportName} transport) sending data. ${getDataDetail(content, options.logMessageContent)}.`);
    const responseType = isArrayBuffer(content) ? "arraybuffer" : "text";
    const response = yield httpClient.post(url, {
      content,
      headers: __spreadValues(__spreadValues({}, headers), options.headers),
      responseType,
      timeout: options.timeout,
      withCredentials: options.withCredentials
    });
    logger.log(LogLevel.Trace, `(${transportName} transport) request complete. Response status: ${response.statusCode}.`);
  });
}
__name(sendMessage, "sendMessage");
function createLogger(logger) {
  if (logger === void 0) {
    return new ConsoleLogger(LogLevel.Information);
  }
  if (logger === null) {
    return NullLogger.instance;
  }
  if (logger.log !== void 0) {
    return logger;
  }
  return new ConsoleLogger(logger);
}
__name(createLogger, "createLogger");
var _SubjectSubscription = class _SubjectSubscription {
  constructor(subject, observer) {
    this._subject = subject;
    this._observer = observer;
  }
  dispose() {
    const index = this._subject.observers.indexOf(this._observer);
    if (index > -1) {
      this._subject.observers.splice(index, 1);
    }
    if (this._subject.observers.length === 0 && this._subject.cancelCallback) {
      this._subject.cancelCallback().catch((_) => {
      });
    }
  }
};
__name(_SubjectSubscription, "SubjectSubscription");
var SubjectSubscription = _SubjectSubscription;
var _ConsoleLogger = class _ConsoleLogger {
  constructor(minimumLogLevel) {
    this._minLevel = minimumLogLevel;
    this.out = console;
  }
  log(logLevel, message) {
    if (logLevel >= this._minLevel) {
      const msg = `[${(/* @__PURE__ */ new Date()).toISOString()}] ${LogLevel[logLevel]}: ${message}`;
      switch (logLevel) {
        case LogLevel.Critical:
        case LogLevel.Error:
          this.out.error(msg);
          break;
        case LogLevel.Warning:
          this.out.warn(msg);
          break;
        case LogLevel.Information:
          this.out.info(msg);
          break;
        default:
          this.out.log(msg);
          break;
      }
    }
  }
};
__name(_ConsoleLogger, "ConsoleLogger");
var ConsoleLogger = _ConsoleLogger;
function getUserAgentHeader() {
  let userAgentHeaderName = "X-SignalR-User-Agent";
  if (Platform.isNode) {
    userAgentHeaderName = "User-Agent";
  }
  return [userAgentHeaderName, constructUserAgent(VERSION, getOsName(), getRuntime(), getRuntimeVersion())];
}
__name(getUserAgentHeader, "getUserAgentHeader");
function constructUserAgent(version, os, runtime, runtimeVersion) {
  let userAgent = "Microsoft SignalR/";
  const majorAndMinor = version.split(".");
  userAgent += `${majorAndMinor[0]}.${majorAndMinor[1]}`;
  userAgent += ` (${version}; `;
  if (os && os !== "") {
    userAgent += `${os}; `;
  } else {
    userAgent += "Unknown OS; ";
  }
  userAgent += `${runtime}`;
  if (runtimeVersion) {
    userAgent += `; ${runtimeVersion}`;
  } else {
    userAgent += "; Unknown Runtime Version";
  }
  userAgent += ")";
  return userAgent;
}
__name(constructUserAgent, "constructUserAgent");
function getOsName() {
  if (Platform.isNode) {
    switch (process.platform) {
      case "win32":
        return "Windows NT";
      case "darwin":
        return "macOS";
      case "linux":
        return "Linux";
      default:
        return process.platform;
    }
  } else {
    return "";
  }
}
__name(getOsName, "getOsName");
function getRuntimeVersion() {
  if (Platform.isNode) {
    return process.versions.node;
  }
  return void 0;
}
__name(getRuntimeVersion, "getRuntimeVersion");
function getRuntime() {
  if (Platform.isNode) {
    return "NodeJS";
  } else {
    return "Browser";
  }
}
__name(getRuntime, "getRuntime");
function getErrorString(e) {
  if (e.stack) {
    return e.stack;
  } else if (e.message) {
    return e.message;
  }
  return `${e}`;
}
__name(getErrorString, "getErrorString");
function getGlobalThis() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("could not find global");
}
__name(getGlobalThis, "getGlobalThis");

// node_modules/@microsoft/signalr/dist/esm/FetchHttpClient.js
var _FetchHttpClient = class _FetchHttpClient extends HttpClient2 {
  constructor(logger) {
    super();
    this._logger = logger;
    if (typeof fetch === "undefined" || Platform.isNode) {
      const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : __require;
      this._jar = new (requireFunc("tough-cookie")).CookieJar();
      if (typeof fetch === "undefined") {
        this._fetchType = requireFunc("node-fetch");
      } else {
        this._fetchType = fetch;
      }
      this._fetchType = requireFunc("fetch-cookie")(this._fetchType, this._jar);
    } else {
      this._fetchType = fetch.bind(getGlobalThis());
    }
    if (typeof AbortController === "undefined") {
      const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : __require;
      this._abortControllerType = requireFunc("abort-controller");
    } else {
      this._abortControllerType = AbortController;
    }
  }
  /** @inheritDoc */
  send(request) {
    return __async(this, null, function* () {
      if (request.abortSignal && request.abortSignal.aborted) {
        throw new AbortError();
      }
      if (!request.method) {
        throw new Error("No method defined.");
      }
      if (!request.url) {
        throw new Error("No url defined.");
      }
      const abortController = new this._abortControllerType();
      let error;
      if (request.abortSignal) {
        request.abortSignal.onabort = () => {
          abortController.abort();
          error = new AbortError();
        };
      }
      let timeoutId = null;
      if (request.timeout) {
        const msTimeout = request.timeout;
        timeoutId = setTimeout(() => {
          abortController.abort();
          this._logger.log(LogLevel.Warning, `Timeout from HTTP request.`);
          error = new TimeoutError();
        }, msTimeout);
      }
      if (request.content === "") {
        request.content = void 0;
      }
      if (request.content) {
        request.headers = request.headers || {};
        if (isArrayBuffer(request.content)) {
          request.headers["Content-Type"] = "application/octet-stream";
        } else {
          request.headers["Content-Type"] = "text/plain;charset=UTF-8";
        }
      }
      let response;
      try {
        response = yield this._fetchType(request.url, {
          body: request.content,
          cache: "no-cache",
          credentials: request.withCredentials === true ? "include" : "same-origin",
          headers: __spreadValues({
            "X-Requested-With": "XMLHttpRequest"
          }, request.headers),
          method: request.method,
          mode: "cors",
          redirect: "follow",
          signal: abortController.signal
        });
      } catch (e) {
        if (error) {
          throw error;
        }
        this._logger.log(LogLevel.Warning, `Error from HTTP request. ${e}.`);
        throw e;
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (request.abortSignal) {
          request.abortSignal.onabort = null;
        }
      }
      if (!response.ok) {
        const errorMessage = yield deserializeContent(response, "text");
        throw new HttpError(errorMessage || response.statusText, response.status);
      }
      const content = deserializeContent(response, request.responseType);
      const payload = yield content;
      return new HttpResponse(response.status, response.statusText, payload);
    });
  }
  getCookieString(url) {
    let cookies = "";
    if (Platform.isNode && this._jar) {
      this._jar.getCookies(url, (e, c) => cookies = c.join("; "));
    }
    return cookies;
  }
};
__name(_FetchHttpClient, "FetchHttpClient");
var FetchHttpClient = _FetchHttpClient;
function deserializeContent(response, responseType) {
  let content;
  switch (responseType) {
    case "arraybuffer":
      content = response.arrayBuffer();
      break;
    case "text":
      content = response.text();
      break;
    case "blob":
    case "document":
    case "json":
      throw new Error(`${responseType} is not supported.`);
    default:
      content = response.text();
      break;
  }
  return content;
}
__name(deserializeContent, "deserializeContent");

// node_modules/@microsoft/signalr/dist/esm/XhrHttpClient.js
var _XhrHttpClient = class _XhrHttpClient extends HttpClient2 {
  constructor(logger) {
    super();
    this._logger = logger;
  }
  /** @inheritDoc */
  send(request) {
    if (request.abortSignal && request.abortSignal.aborted) {
      return Promise.reject(new AbortError());
    }
    if (!request.method) {
      return Promise.reject(new Error("No method defined."));
    }
    if (!request.url) {
      return Promise.reject(new Error("No url defined."));
    }
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(request.method, request.url, true);
      xhr.withCredentials = request.withCredentials === void 0 ? true : request.withCredentials;
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      if (request.content === "") {
        request.content = void 0;
      }
      if (request.content) {
        if (isArrayBuffer(request.content)) {
          xhr.setRequestHeader("Content-Type", "application/octet-stream");
        } else {
          xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        }
      }
      const headers = request.headers;
      if (headers) {
        Object.keys(headers).forEach((header) => {
          xhr.setRequestHeader(header, headers[header]);
        });
      }
      if (request.responseType) {
        xhr.responseType = request.responseType;
      }
      if (request.abortSignal) {
        request.abortSignal.onabort = () => {
          xhr.abort();
          reject(new AbortError());
        };
      }
      if (request.timeout) {
        xhr.timeout = request.timeout;
      }
      xhr.onload = () => {
        if (request.abortSignal) {
          request.abortSignal.onabort = null;
        }
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(new HttpResponse(xhr.status, xhr.statusText, xhr.response || xhr.responseText));
        } else {
          reject(new HttpError(xhr.response || xhr.responseText || xhr.statusText, xhr.status));
        }
      };
      xhr.onerror = () => {
        this._logger.log(LogLevel.Warning, `Error from HTTP request. ${xhr.status}: ${xhr.statusText}.`);
        reject(new HttpError(xhr.statusText, xhr.status));
      };
      xhr.ontimeout = () => {
        this._logger.log(LogLevel.Warning, `Timeout from HTTP request.`);
        reject(new TimeoutError());
      };
      xhr.send(request.content);
    });
  }
};
__name(_XhrHttpClient, "XhrHttpClient");
var XhrHttpClient = _XhrHttpClient;

// node_modules/@microsoft/signalr/dist/esm/DefaultHttpClient.js
var _DefaultHttpClient = class _DefaultHttpClient extends HttpClient2 {
  /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
  constructor(logger) {
    super();
    if (typeof fetch !== "undefined" || Platform.isNode) {
      this._httpClient = new FetchHttpClient(logger);
    } else if (typeof XMLHttpRequest !== "undefined") {
      this._httpClient = new XhrHttpClient(logger);
    } else {
      throw new Error("No usable HttpClient found.");
    }
  }
  /** @inheritDoc */
  send(request) {
    if (request.abortSignal && request.abortSignal.aborted) {
      return Promise.reject(new AbortError());
    }
    if (!request.method) {
      return Promise.reject(new Error("No method defined."));
    }
    if (!request.url) {
      return Promise.reject(new Error("No url defined."));
    }
    return this._httpClient.send(request);
  }
  getCookieString(url) {
    return this._httpClient.getCookieString(url);
  }
};
__name(_DefaultHttpClient, "DefaultHttpClient");
var DefaultHttpClient = _DefaultHttpClient;

// node_modules/@microsoft/signalr/dist/esm/TextMessageFormat.js
var _TextMessageFormat = class _TextMessageFormat {
  static write(output) {
    return `${output}${_TextMessageFormat.RecordSeparator}`;
  }
  static parse(input) {
    if (input[input.length - 1] !== _TextMessageFormat.RecordSeparator) {
      throw new Error("Message is incomplete.");
    }
    const messages = input.split(_TextMessageFormat.RecordSeparator);
    messages.pop();
    return messages;
  }
};
__name(_TextMessageFormat, "TextMessageFormat");
var TextMessageFormat = _TextMessageFormat;
TextMessageFormat.RecordSeparatorCode = 30;
TextMessageFormat.RecordSeparator = String.fromCharCode(TextMessageFormat.RecordSeparatorCode);

// node_modules/@microsoft/signalr/dist/esm/HandshakeProtocol.js
var _HandshakeProtocol = class _HandshakeProtocol {
  // Handshake request is always JSON
  writeHandshakeRequest(handshakeRequest) {
    return TextMessageFormat.write(JSON.stringify(handshakeRequest));
  }
  parseHandshakeResponse(data) {
    let messageData;
    let remainingData;
    if (isArrayBuffer(data)) {
      const binaryData = new Uint8Array(data);
      const separatorIndex = binaryData.indexOf(TextMessageFormat.RecordSeparatorCode);
      if (separatorIndex === -1) {
        throw new Error("Message is incomplete.");
      }
      const responseLength = separatorIndex + 1;
      messageData = String.fromCharCode.apply(null, Array.prototype.slice.call(binaryData.slice(0, responseLength)));
      remainingData = binaryData.byteLength > responseLength ? binaryData.slice(responseLength).buffer : null;
    } else {
      const textData = data;
      const separatorIndex = textData.indexOf(TextMessageFormat.RecordSeparator);
      if (separatorIndex === -1) {
        throw new Error("Message is incomplete.");
      }
      const responseLength = separatorIndex + 1;
      messageData = textData.substring(0, responseLength);
      remainingData = textData.length > responseLength ? textData.substring(responseLength) : null;
    }
    const messages = TextMessageFormat.parse(messageData);
    const response = JSON.parse(messages[0]);
    if (response.type) {
      throw new Error("Expected a handshake response from the server.");
    }
    const responseMessage = response;
    return [remainingData, responseMessage];
  }
};
__name(_HandshakeProtocol, "HandshakeProtocol");
var HandshakeProtocol = _HandshakeProtocol;

// node_modules/@microsoft/signalr/dist/esm/IHubProtocol.js
var MessageType;
(function(MessageType2) {
  MessageType2[MessageType2["Invocation"] = 1] = "Invocation";
  MessageType2[MessageType2["StreamItem"] = 2] = "StreamItem";
  MessageType2[MessageType2["Completion"] = 3] = "Completion";
  MessageType2[MessageType2["StreamInvocation"] = 4] = "StreamInvocation";
  MessageType2[MessageType2["CancelInvocation"] = 5] = "CancelInvocation";
  MessageType2[MessageType2["Ping"] = 6] = "Ping";
  MessageType2[MessageType2["Close"] = 7] = "Close";
  MessageType2[MessageType2["Ack"] = 8] = "Ack";
  MessageType2[MessageType2["Sequence"] = 9] = "Sequence";
})(MessageType || (MessageType = {}));

// node_modules/@microsoft/signalr/dist/esm/Subject.js
var _Subject = class _Subject {
  constructor() {
    this.observers = [];
  }
  next(item) {
    for (const observer of this.observers) {
      observer.next(item);
    }
  }
  error(err) {
    for (const observer of this.observers) {
      if (observer.error) {
        observer.error(err);
      }
    }
  }
  complete() {
    for (const observer of this.observers) {
      if (observer.complete) {
        observer.complete();
      }
    }
  }
  subscribe(observer) {
    this.observers.push(observer);
    return new SubjectSubscription(this, observer);
  }
};
__name(_Subject, "Subject");
var Subject2 = _Subject;

// node_modules/@microsoft/signalr/dist/esm/MessageBuffer.js
var _MessageBuffer = class _MessageBuffer {
  constructor(protocol, connection, bufferSize) {
    this._bufferSize = 1e5;
    this._messages = [];
    this._totalMessageCount = 0;
    this._waitForSequenceMessage = false;
    this._nextReceivingSequenceId = 1;
    this._latestReceivedSequenceId = 0;
    this._bufferedByteCount = 0;
    this._reconnectInProgress = false;
    this._protocol = protocol;
    this._connection = connection;
    this._bufferSize = bufferSize;
  }
  _send(message) {
    return __async(this, null, function* () {
      const serializedMessage = this._protocol.writeMessage(message);
      let backpressurePromise = Promise.resolve();
      if (this._isInvocationMessage(message)) {
        this._totalMessageCount++;
        let backpressurePromiseResolver = /* @__PURE__ */ __name(() => {
        }, "backpressurePromiseResolver");
        let backpressurePromiseRejector = /* @__PURE__ */ __name(() => {
        }, "backpressurePromiseRejector");
        if (isArrayBuffer(serializedMessage)) {
          this._bufferedByteCount += serializedMessage.byteLength;
        } else {
          this._bufferedByteCount += serializedMessage.length;
        }
        if (this._bufferedByteCount >= this._bufferSize) {
          backpressurePromise = new Promise((resolve, reject) => {
            backpressurePromiseResolver = resolve;
            backpressurePromiseRejector = reject;
          });
        }
        this._messages.push(new BufferedItem(serializedMessage, this._totalMessageCount, backpressurePromiseResolver, backpressurePromiseRejector));
      }
      try {
        if (!this._reconnectInProgress) {
          yield this._connection.send(serializedMessage);
        }
      } catch {
        this._disconnected();
      }
      yield backpressurePromise;
    });
  }
  _ack(ackMessage) {
    let newestAckedMessage = -1;
    for (let index = 0; index < this._messages.length; index++) {
      const element = this._messages[index];
      if (element._id <= ackMessage.sequenceId) {
        newestAckedMessage = index;
        if (isArrayBuffer(element._message)) {
          this._bufferedByteCount -= element._message.byteLength;
        } else {
          this._bufferedByteCount -= element._message.length;
        }
        element._resolver();
      } else if (this._bufferedByteCount < this._bufferSize) {
        element._resolver();
      } else {
        break;
      }
    }
    if (newestAckedMessage !== -1) {
      this._messages = this._messages.slice(newestAckedMessage + 1);
    }
  }
  _shouldProcessMessage(message) {
    if (this._waitForSequenceMessage) {
      if (message.type !== MessageType.Sequence) {
        return false;
      } else {
        this._waitForSequenceMessage = false;
        return true;
      }
    }
    if (!this._isInvocationMessage(message)) {
      return true;
    }
    const currentId = this._nextReceivingSequenceId;
    this._nextReceivingSequenceId++;
    if (currentId <= this._latestReceivedSequenceId) {
      if (currentId === this._latestReceivedSequenceId) {
        this._ackTimer();
      }
      return false;
    }
    this._latestReceivedSequenceId = currentId;
    this._ackTimer();
    return true;
  }
  _resetSequence(message) {
    if (message.sequenceId > this._nextReceivingSequenceId) {
      this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));
      return;
    }
    this._nextReceivingSequenceId = message.sequenceId;
  }
  _disconnected() {
    this._reconnectInProgress = true;
    this._waitForSequenceMessage = true;
  }
  _resend() {
    return __async(this, null, function* () {
      const sequenceId = this._messages.length !== 0 ? this._messages[0]._id : this._totalMessageCount + 1;
      yield this._connection.send(this._protocol.writeMessage({ type: MessageType.Sequence, sequenceId }));
      const messages = this._messages;
      for (const element of messages) {
        yield this._connection.send(element._message);
      }
      this._reconnectInProgress = false;
    });
  }
  _dispose(error) {
    error !== null && error !== void 0 ? error : error = new Error("Unable to reconnect to server.");
    for (const element of this._messages) {
      element._rejector(error);
    }
  }
  _isInvocationMessage(message) {
    switch (message.type) {
      case MessageType.Invocation:
      case MessageType.StreamItem:
      case MessageType.Completion:
      case MessageType.StreamInvocation:
      case MessageType.CancelInvocation:
        return true;
      case MessageType.Close:
      case MessageType.Sequence:
      case MessageType.Ping:
      case MessageType.Ack:
        return false;
    }
  }
  _ackTimer() {
    if (this._ackTimerHandle === void 0) {
      this._ackTimerHandle = setTimeout(() => __async(this, null, function* () {
        try {
          if (!this._reconnectInProgress) {
            yield this._connection.send(this._protocol.writeMessage({ type: MessageType.Ack, sequenceId: this._latestReceivedSequenceId }));
          }
        } catch {
        }
        clearTimeout(this._ackTimerHandle);
        this._ackTimerHandle = void 0;
      }), 1e3);
    }
  }
};
__name(_MessageBuffer, "MessageBuffer");
var MessageBuffer = _MessageBuffer;
var _BufferedItem = class _BufferedItem {
  constructor(message, id, resolver, rejector) {
    this._message = message;
    this._id = id;
    this._resolver = resolver;
    this._rejector = rejector;
  }
};
__name(_BufferedItem, "BufferedItem");
var BufferedItem = _BufferedItem;

// node_modules/@microsoft/signalr/dist/esm/HubConnection.js
var DEFAULT_TIMEOUT_IN_MS = 30 * 1e3;
var DEFAULT_PING_INTERVAL_IN_MS = 15 * 1e3;
var DEFAULT_STATEFUL_RECONNECT_BUFFER_SIZE = 1e5;
var HubConnectionState;
(function(HubConnectionState2) {
  HubConnectionState2["Disconnected"] = "Disconnected";
  HubConnectionState2["Connecting"] = "Connecting";
  HubConnectionState2["Connected"] = "Connected";
  HubConnectionState2["Disconnecting"] = "Disconnecting";
  HubConnectionState2["Reconnecting"] = "Reconnecting";
})(HubConnectionState || (HubConnectionState = {}));
var _HubConnection = class _HubConnection {
  /** @internal */
  // Using a public static factory method means we can have a private constructor and an _internal_
  // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
  // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
  // public parameter-less constructor.
  static create(connection, logger, protocol, reconnectPolicy, serverTimeoutInMilliseconds, keepAliveIntervalInMilliseconds, statefulReconnectBufferSize) {
    return new _HubConnection(connection, logger, protocol, reconnectPolicy, serverTimeoutInMilliseconds, keepAliveIntervalInMilliseconds, statefulReconnectBufferSize);
  }
  constructor(connection, logger, protocol, reconnectPolicy, serverTimeoutInMilliseconds, keepAliveIntervalInMilliseconds, statefulReconnectBufferSize) {
    this._nextKeepAlive = 0;
    this._freezeEventListener = () => {
      this._logger.log(LogLevel.Warning, "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep");
    };
    Arg.isRequired(connection, "connection");
    Arg.isRequired(logger, "logger");
    Arg.isRequired(protocol, "protocol");
    this.serverTimeoutInMilliseconds = serverTimeoutInMilliseconds !== null && serverTimeoutInMilliseconds !== void 0 ? serverTimeoutInMilliseconds : DEFAULT_TIMEOUT_IN_MS;
    this.keepAliveIntervalInMilliseconds = keepAliveIntervalInMilliseconds !== null && keepAliveIntervalInMilliseconds !== void 0 ? keepAliveIntervalInMilliseconds : DEFAULT_PING_INTERVAL_IN_MS;
    this._statefulReconnectBufferSize = statefulReconnectBufferSize !== null && statefulReconnectBufferSize !== void 0 ? statefulReconnectBufferSize : DEFAULT_STATEFUL_RECONNECT_BUFFER_SIZE;
    this._logger = logger;
    this._protocol = protocol;
    this.connection = connection;
    this._reconnectPolicy = reconnectPolicy;
    this._handshakeProtocol = new HandshakeProtocol();
    this.connection.onreceive = (data) => this._processIncomingData(data);
    this.connection.onclose = (error) => this._connectionClosed(error);
    this._callbacks = {};
    this._methods = {};
    this._closedCallbacks = [];
    this._reconnectingCallbacks = [];
    this._reconnectedCallbacks = [];
    this._invocationId = 0;
    this._receivedHandshakeResponse = false;
    this._connectionState = HubConnectionState.Disconnected;
    this._connectionStarted = false;
    this._cachedPingMessage = this._protocol.writeMessage({ type: MessageType.Ping });
  }
  /** Indicates the state of the {@link HubConnection} to the server. */
  get state() {
    return this._connectionState;
  }
  /** Represents the connection id of the {@link HubConnection} on the server. The connection id will be null when the connection is either
   *  in the disconnected state or if the negotiation step was skipped.
   */
  get connectionId() {
    return this.connection ? this.connection.connectionId || null : null;
  }
  /** Indicates the url of the {@link HubConnection} to the server. */
  get baseUrl() {
    return this.connection.baseUrl || "";
  }
  /**
   * Sets a new url for the HubConnection. Note that the url can only be changed when the connection is in either the Disconnected or
   * Reconnecting states.
   * @param {string} url The url to connect to.
   */
  set baseUrl(url) {
    if (this._connectionState !== HubConnectionState.Disconnected && this._connectionState !== HubConnectionState.Reconnecting) {
      throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");
    }
    if (!url) {
      throw new Error("The HubConnection url must be a valid url.");
    }
    this.connection.baseUrl = url;
  }
  /** Starts the connection.
   *
   * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
   */
  start() {
    this._startPromise = this._startWithStateTransitions();
    return this._startPromise;
  }
  _startWithStateTransitions() {
    return __async(this, null, function* () {
      if (this._connectionState !== HubConnectionState.Disconnected) {
        return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));
      }
      this._connectionState = HubConnectionState.Connecting;
      this._logger.log(LogLevel.Debug, "Starting HubConnection.");
      try {
        yield this._startInternal();
        if (Platform.isBrowser) {
          window.document.addEventListener("freeze", this._freezeEventListener);
        }
        this._connectionState = HubConnectionState.Connected;
        this._connectionStarted = true;
        this._logger.log(LogLevel.Debug, "HubConnection connected successfully.");
      } catch (e) {
        this._connectionState = HubConnectionState.Disconnected;
        this._logger.log(LogLevel.Debug, `HubConnection failed to start successfully because of error '${e}'.`);
        return Promise.reject(e);
      }
    });
  }
  _startInternal() {
    return __async(this, null, function* () {
      this._stopDuringStartError = void 0;
      this._receivedHandshakeResponse = false;
      const handshakePromise = new Promise((resolve, reject) => {
        this._handshakeResolver = resolve;
        this._handshakeRejecter = reject;
      });
      yield this.connection.start(this._protocol.transferFormat);
      try {
        let version = this._protocol.version;
        if (!this.connection.features.reconnect) {
          version = 1;
        }
        const handshakeRequest = {
          protocol: this._protocol.name,
          version
        };
        this._logger.log(LogLevel.Debug, "Sending handshake request.");
        yield this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(handshakeRequest));
        this._logger.log(LogLevel.Information, `Using HubProtocol '${this._protocol.name}'.`);
        this._cleanupTimeout();
        this._resetTimeoutPeriod();
        this._resetKeepAliveInterval();
        yield handshakePromise;
        if (this._stopDuringStartError) {
          throw this._stopDuringStartError;
        }
        const useStatefulReconnect = this.connection.features.reconnect || false;
        if (useStatefulReconnect) {
          this._messageBuffer = new MessageBuffer(this._protocol, this.connection, this._statefulReconnectBufferSize);
          this.connection.features.disconnected = this._messageBuffer._disconnected.bind(this._messageBuffer);
          this.connection.features.resend = () => {
            if (this._messageBuffer) {
              return this._messageBuffer._resend();
            }
          };
        }
        if (!this.connection.features.inherentKeepAlive) {
          yield this._sendMessage(this._cachedPingMessage);
        }
      } catch (e) {
        this._logger.log(LogLevel.Debug, `Hub handshake failed with error '${e}' during start(). Stopping HubConnection.`);
        this._cleanupTimeout();
        this._cleanupPingTimer();
        yield this.connection.stop(e);
        throw e;
      }
    });
  }
  /** Stops the connection.
   *
   * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
   */
  stop() {
    return __async(this, null, function* () {
      const startPromise = this._startPromise;
      this.connection.features.reconnect = false;
      this._stopPromise = this._stopInternal();
      yield this._stopPromise;
      try {
        yield startPromise;
      } catch (e) {
      }
    });
  }
  _stopInternal(error) {
    if (this._connectionState === HubConnectionState.Disconnected) {
      this._logger.log(LogLevel.Debug, `Call to HubConnection.stop(${error}) ignored because it is already in the disconnected state.`);
      return Promise.resolve();
    }
    if (this._connectionState === HubConnectionState.Disconnecting) {
      this._logger.log(LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnecting state.`);
      return this._stopPromise;
    }
    const state = this._connectionState;
    this._connectionState = HubConnectionState.Disconnecting;
    this._logger.log(LogLevel.Debug, "Stopping HubConnection.");
    if (this._reconnectDelayHandle) {
      this._logger.log(LogLevel.Debug, "Connection stopped during reconnect delay. Done reconnecting.");
      clearTimeout(this._reconnectDelayHandle);
      this._reconnectDelayHandle = void 0;
      this._completeClose();
      return Promise.resolve();
    }
    if (state === HubConnectionState.Connected) {
      this._sendCloseMessage();
    }
    this._cleanupTimeout();
    this._cleanupPingTimer();
    this._stopDuringStartError = error || new AbortError("The connection was stopped before the hub handshake could complete.");
    return this.connection.stop(error);
  }
  _sendCloseMessage() {
    return __async(this, null, function* () {
      try {
        yield this._sendWithProtocol(this._createCloseMessage());
      } catch {
      }
    });
  }
  /** Invokes a streaming hub method on the server using the specified name and arguments.
   *
   * @typeparam T The type of the items returned by the server.
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
   */
  stream(methodName, ...args) {
    const [streams, streamIds] = this._replaceStreamingParams(args);
    const invocationDescriptor = this._createStreamInvocation(methodName, args, streamIds);
    let promiseQueue;
    const subject = new Subject2();
    subject.cancelCallback = () => {
      const cancelInvocation = this._createCancelInvocation(invocationDescriptor.invocationId);
      delete this._callbacks[invocationDescriptor.invocationId];
      return promiseQueue.then(() => {
        return this._sendWithProtocol(cancelInvocation);
      });
    };
    this._callbacks[invocationDescriptor.invocationId] = (invocationEvent, error) => {
      if (error) {
        subject.error(error);
        return;
      } else if (invocationEvent) {
        if (invocationEvent.type === MessageType.Completion) {
          if (invocationEvent.error) {
            subject.error(new Error(invocationEvent.error));
          } else {
            subject.complete();
          }
        } else {
          subject.next(invocationEvent.item);
        }
      }
    };
    promiseQueue = this._sendWithProtocol(invocationDescriptor).catch((e) => {
      subject.error(e);
      delete this._callbacks[invocationDescriptor.invocationId];
    });
    this._launchStreams(streams, promiseQueue);
    return subject;
  }
  _sendMessage(message) {
    this._resetKeepAliveInterval();
    return this.connection.send(message);
  }
  /**
   * Sends a js object to the server.
   * @param message The js object to serialize and send.
   */
  _sendWithProtocol(message) {
    if (this._messageBuffer) {
      return this._messageBuffer._send(message);
    } else {
      return this._sendMessage(this._protocol.writeMessage(message));
    }
  }
  /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
   *
   * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
   * be processing the invocation.
   *
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
   */
  send(methodName, ...args) {
    const [streams, streamIds] = this._replaceStreamingParams(args);
    const sendPromise = this._sendWithProtocol(this._createInvocation(methodName, args, true, streamIds));
    this._launchStreams(streams, sendPromise);
    return sendPromise;
  }
  /** Invokes a hub method on the server using the specified name and arguments.
   *
   * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
   * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
   * resolving the Promise.
   *
   * @typeparam T The expected return type.
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
   */
  invoke(methodName, ...args) {
    const [streams, streamIds] = this._replaceStreamingParams(args);
    const invocationDescriptor = this._createInvocation(methodName, args, false, streamIds);
    const p = new Promise((resolve, reject) => {
      this._callbacks[invocationDescriptor.invocationId] = (invocationEvent, error) => {
        if (error) {
          reject(error);
          return;
        } else if (invocationEvent) {
          if (invocationEvent.type === MessageType.Completion) {
            if (invocationEvent.error) {
              reject(new Error(invocationEvent.error));
            } else {
              resolve(invocationEvent.result);
            }
          } else {
            reject(new Error(`Unexpected message type: ${invocationEvent.type}`));
          }
        }
      };
      const promiseQueue = this._sendWithProtocol(invocationDescriptor).catch((e) => {
        reject(e);
        delete this._callbacks[invocationDescriptor.invocationId];
      });
      this._launchStreams(streams, promiseQueue);
    });
    return p;
  }
  on(methodName, newMethod) {
    if (!methodName || !newMethod) {
      return;
    }
    methodName = methodName.toLowerCase();
    if (!this._methods[methodName]) {
      this._methods[methodName] = [];
    }
    if (this._methods[methodName].indexOf(newMethod) !== -1) {
      return;
    }
    this._methods[methodName].push(newMethod);
  }
  off(methodName, method) {
    if (!methodName) {
      return;
    }
    methodName = methodName.toLowerCase();
    const handlers = this._methods[methodName];
    if (!handlers) {
      return;
    }
    if (method) {
      const removeIdx = handlers.indexOf(method);
      if (removeIdx !== -1) {
        handlers.splice(removeIdx, 1);
        if (handlers.length === 0) {
          delete this._methods[methodName];
        }
      }
    } else {
      delete this._methods[methodName];
    }
  }
  /** Registers a handler that will be invoked when the connection is closed.
   *
   * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
   */
  onclose(callback) {
    if (callback) {
      this._closedCallbacks.push(callback);
    }
  }
  /** Registers a handler that will be invoked when the connection starts reconnecting.
   *
   * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
   */
  onreconnecting(callback) {
    if (callback) {
      this._reconnectingCallbacks.push(callback);
    }
  }
  /** Registers a handler that will be invoked when the connection successfully reconnects.
   *
   * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
   */
  onreconnected(callback) {
    if (callback) {
      this._reconnectedCallbacks.push(callback);
    }
  }
  _processIncomingData(data) {
    this._cleanupTimeout();
    if (!this._receivedHandshakeResponse) {
      data = this._processHandshakeResponse(data);
      this._receivedHandshakeResponse = true;
    }
    if (data) {
      const messages = this._protocol.parseMessages(data, this._logger);
      for (const message of messages) {
        if (this._messageBuffer && !this._messageBuffer._shouldProcessMessage(message)) {
          continue;
        }
        switch (message.type) {
          case MessageType.Invocation:
            this._invokeClientMethod(message).catch((e) => {
              this._logger.log(LogLevel.Error, `Invoke client method threw error: ${getErrorString(e)}`);
            });
            break;
          case MessageType.StreamItem:
          case MessageType.Completion: {
            const callback = this._callbacks[message.invocationId];
            if (callback) {
              if (message.type === MessageType.Completion) {
                delete this._callbacks[message.invocationId];
              }
              try {
                callback(message);
              } catch (e) {
                this._logger.log(LogLevel.Error, `Stream callback threw error: ${getErrorString(e)}`);
              }
            }
            break;
          }
          case MessageType.Ping:
            break;
          case MessageType.Close: {
            this._logger.log(LogLevel.Information, "Close message received from server.");
            const error = message.error ? new Error("Server returned an error on close: " + message.error) : void 0;
            if (message.allowReconnect === true) {
              this.connection.stop(error);
            } else {
              this._stopPromise = this._stopInternal(error);
            }
            break;
          }
          case MessageType.Ack:
            if (this._messageBuffer) {
              this._messageBuffer._ack(message);
            }
            break;
          case MessageType.Sequence:
            if (this._messageBuffer) {
              this._messageBuffer._resetSequence(message);
            }
            break;
          default:
            this._logger.log(LogLevel.Warning, `Invalid message type: ${message.type}.`);
            break;
        }
      }
    }
    this._resetTimeoutPeriod();
  }
  _processHandshakeResponse(data) {
    let responseMessage;
    let remainingData;
    try {
      [remainingData, responseMessage] = this._handshakeProtocol.parseHandshakeResponse(data);
    } catch (e) {
      const message = "Error parsing handshake response: " + e;
      this._logger.log(LogLevel.Error, message);
      const error = new Error(message);
      this._handshakeRejecter(error);
      throw error;
    }
    if (responseMessage.error) {
      const message = "Server returned handshake error: " + responseMessage.error;
      this._logger.log(LogLevel.Error, message);
      const error = new Error(message);
      this._handshakeRejecter(error);
      throw error;
    } else {
      this._logger.log(LogLevel.Debug, "Server handshake complete.");
    }
    this._handshakeResolver();
    return remainingData;
  }
  _resetKeepAliveInterval() {
    if (this.connection.features.inherentKeepAlive) {
      return;
    }
    this._nextKeepAlive = (/* @__PURE__ */ new Date()).getTime() + this.keepAliveIntervalInMilliseconds;
    this._cleanupPingTimer();
  }
  _resetTimeoutPeriod() {
    if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
      this._timeoutHandle = setTimeout(() => this.serverTimeout(), this.serverTimeoutInMilliseconds);
      let nextPing = this._nextKeepAlive - (/* @__PURE__ */ new Date()).getTime();
      if (nextPing < 0) {
        if (this._connectionState === HubConnectionState.Connected) {
          this._trySendPingMessage();
        }
        return;
      }
      if (this._pingServerHandle === void 0) {
        if (nextPing < 0) {
          nextPing = 0;
        }
        this._pingServerHandle = setTimeout(() => __async(this, null, function* () {
          if (this._connectionState === HubConnectionState.Connected) {
            yield this._trySendPingMessage();
          }
        }), nextPing);
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  serverTimeout() {
    this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
  }
  _invokeClientMethod(invocationMessage) {
    return __async(this, null, function* () {
      const methodName = invocationMessage.target.toLowerCase();
      const methods = this._methods[methodName];
      if (!methods) {
        this._logger.log(LogLevel.Warning, `No client method with the name '${methodName}' found.`);
        if (invocationMessage.invocationId) {
          this._logger.log(LogLevel.Warning, `No result given for '${methodName}' method and invocation ID '${invocationMessage.invocationId}'.`);
          yield this._sendWithProtocol(this._createCompletionMessage(invocationMessage.invocationId, "Client didn't provide a result.", null));
        }
        return;
      }
      const methodsCopy = methods.slice();
      const expectsResponse = invocationMessage.invocationId ? true : false;
      let res;
      let exception;
      let completionMessage;
      for (const m of methodsCopy) {
        try {
          const prevRes = res;
          res = yield m.apply(this, invocationMessage.arguments);
          if (expectsResponse && res && prevRes) {
            this._logger.log(LogLevel.Error, `Multiple results provided for '${methodName}'. Sending error to server.`);
            completionMessage = this._createCompletionMessage(invocationMessage.invocationId, `Client provided multiple results.`, null);
          }
          exception = void 0;
        } catch (e) {
          exception = e;
          this._logger.log(LogLevel.Error, `A callback for the method '${methodName}' threw error '${e}'.`);
        }
      }
      if (completionMessage) {
        yield this._sendWithProtocol(completionMessage);
      } else if (expectsResponse) {
        if (exception) {
          completionMessage = this._createCompletionMessage(invocationMessage.invocationId, `${exception}`, null);
        } else if (res !== void 0) {
          completionMessage = this._createCompletionMessage(invocationMessage.invocationId, null, res);
        } else {
          this._logger.log(LogLevel.Warning, `No result given for '${methodName}' method and invocation ID '${invocationMessage.invocationId}'.`);
          completionMessage = this._createCompletionMessage(invocationMessage.invocationId, "Client didn't provide a result.", null);
        }
        yield this._sendWithProtocol(completionMessage);
      } else {
        if (res) {
          this._logger.log(LogLevel.Error, `Result given for '${methodName}' method but server is not expecting a result.`);
        }
      }
    });
  }
  _connectionClosed(error) {
    this._logger.log(LogLevel.Debug, `HubConnection.connectionClosed(${error}) called while in state ${this._connectionState}.`);
    this._stopDuringStartError = this._stopDuringStartError || error || new AbortError("The underlying connection was closed before the hub handshake could complete.");
    if (this._handshakeResolver) {
      this._handshakeResolver();
    }
    this._cancelCallbacksWithError(error || new Error("Invocation canceled due to the underlying connection being closed."));
    this._cleanupTimeout();
    this._cleanupPingTimer();
    if (this._connectionState === HubConnectionState.Disconnecting) {
      this._completeClose(error);
    } else if (this._connectionState === HubConnectionState.Connected && this._reconnectPolicy) {
      this._reconnect(error);
    } else if (this._connectionState === HubConnectionState.Connected) {
      this._completeClose(error);
    }
  }
  _completeClose(error) {
    if (this._connectionStarted) {
      this._connectionState = HubConnectionState.Disconnected;
      this._connectionStarted = false;
      if (this._messageBuffer) {
        this._messageBuffer._dispose(error !== null && error !== void 0 ? error : new Error("Connection closed."));
        this._messageBuffer = void 0;
      }
      if (Platform.isBrowser) {
        window.document.removeEventListener("freeze", this._freezeEventListener);
      }
      try {
        this._closedCallbacks.forEach((c) => c.apply(this, [error]));
      } catch (e) {
        this._logger.log(LogLevel.Error, `An onclose callback called with error '${error}' threw error '${e}'.`);
      }
    }
  }
  _reconnect(error) {
    return __async(this, null, function* () {
      const reconnectStartTime = Date.now();
      let previousReconnectAttempts = 0;
      let retryError = error !== void 0 ? error : new Error("Attempting to reconnect due to a unknown error.");
      let nextRetryDelay = this._getNextRetryDelay(previousReconnectAttempts, 0, retryError);
      if (nextRetryDelay === null) {
        this._logger.log(LogLevel.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt.");
        this._completeClose(error);
        return;
      }
      this._connectionState = HubConnectionState.Reconnecting;
      if (error) {
        this._logger.log(LogLevel.Information, `Connection reconnecting because of error '${error}'.`);
      } else {
        this._logger.log(LogLevel.Information, "Connection reconnecting.");
      }
      if (this._reconnectingCallbacks.length !== 0) {
        try {
          this._reconnectingCallbacks.forEach((c) => c.apply(this, [error]));
        } catch (e) {
          this._logger.log(LogLevel.Error, `An onreconnecting callback called with error '${error}' threw error '${e}'.`);
        }
        if (this._connectionState !== HubConnectionState.Reconnecting) {
          this._logger.log(LogLevel.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
          return;
        }
      }
      while (nextRetryDelay !== null) {
        this._logger.log(LogLevel.Information, `Reconnect attempt number ${previousReconnectAttempts + 1} will start in ${nextRetryDelay} ms.`);
        yield new Promise((resolve) => {
          this._reconnectDelayHandle = setTimeout(resolve, nextRetryDelay);
        });
        this._reconnectDelayHandle = void 0;
        if (this._connectionState !== HubConnectionState.Reconnecting) {
          this._logger.log(LogLevel.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
          return;
        }
        try {
          yield this._startInternal();
          this._connectionState = HubConnectionState.Connected;
          this._logger.log(LogLevel.Information, "HubConnection reconnected successfully.");
          if (this._reconnectedCallbacks.length !== 0) {
            try {
              this._reconnectedCallbacks.forEach((c) => c.apply(this, [this.connection.connectionId]));
            } catch (e) {
              this._logger.log(LogLevel.Error, `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${e}'.`);
            }
          }
          return;
        } catch (e) {
          this._logger.log(LogLevel.Information, `Reconnect attempt failed because of error '${e}'.`);
          if (this._connectionState !== HubConnectionState.Reconnecting) {
            this._logger.log(LogLevel.Debug, `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`);
            if (this._connectionState === HubConnectionState.Disconnecting) {
              this._completeClose();
            }
            return;
          }
          previousReconnectAttempts++;
          retryError = e instanceof Error ? e : new Error(e.toString());
          nextRetryDelay = this._getNextRetryDelay(previousReconnectAttempts, Date.now() - reconnectStartTime, retryError);
        }
      }
      this._logger.log(LogLevel.Information, `Reconnect retries have been exhausted after ${Date.now() - reconnectStartTime} ms and ${previousReconnectAttempts} failed attempts. Connection disconnecting.`);
      this._completeClose();
    });
  }
  _getNextRetryDelay(previousRetryCount, elapsedMilliseconds, retryReason) {
    try {
      return this._reconnectPolicy.nextRetryDelayInMilliseconds({
        elapsedMilliseconds,
        previousRetryCount,
        retryReason
      });
    } catch (e) {
      this._logger.log(LogLevel.Error, `IRetryPolicy.nextRetryDelayInMilliseconds(${previousRetryCount}, ${elapsedMilliseconds}) threw error '${e}'.`);
      return null;
    }
  }
  _cancelCallbacksWithError(error) {
    const callbacks = this._callbacks;
    this._callbacks = {};
    Object.keys(callbacks).forEach((key) => {
      const callback = callbacks[key];
      try {
        callback(null, error);
      } catch (e) {
        this._logger.log(LogLevel.Error, `Stream 'error' callback called with '${error}' threw error: ${getErrorString(e)}`);
      }
    });
  }
  _cleanupPingTimer() {
    if (this._pingServerHandle) {
      clearTimeout(this._pingServerHandle);
      this._pingServerHandle = void 0;
    }
  }
  _cleanupTimeout() {
    if (this._timeoutHandle) {
      clearTimeout(this._timeoutHandle);
    }
  }
  _createInvocation(methodName, args, nonblocking, streamIds) {
    if (nonblocking) {
      if (streamIds.length !== 0) {
        return {
          target: methodName,
          arguments: args,
          streamIds,
          type: MessageType.Invocation
        };
      } else {
        return {
          target: methodName,
          arguments: args,
          type: MessageType.Invocation
        };
      }
    } else {
      const invocationId = this._invocationId;
      this._invocationId++;
      if (streamIds.length !== 0) {
        return {
          target: methodName,
          arguments: args,
          invocationId: invocationId.toString(),
          streamIds,
          type: MessageType.Invocation
        };
      } else {
        return {
          target: methodName,
          arguments: args,
          invocationId: invocationId.toString(),
          type: MessageType.Invocation
        };
      }
    }
  }
  _launchStreams(streams, promiseQueue) {
    if (streams.length === 0) {
      return;
    }
    if (!promiseQueue) {
      promiseQueue = Promise.resolve();
    }
    for (const streamId in streams) {
      streams[streamId].subscribe({
        complete: /* @__PURE__ */ __name(() => {
          promiseQueue = promiseQueue.then(() => this._sendWithProtocol(this._createCompletionMessage(streamId)));
        }, "complete"),
        error: /* @__PURE__ */ __name((err) => {
          let message;
          if (err instanceof Error) {
            message = err.message;
          } else if (err && err.toString) {
            message = err.toString();
          } else {
            message = "Unknown error";
          }
          promiseQueue = promiseQueue.then(() => this._sendWithProtocol(this._createCompletionMessage(streamId, message)));
        }, "error"),
        next: /* @__PURE__ */ __name((item) => {
          promiseQueue = promiseQueue.then(() => this._sendWithProtocol(this._createStreamItemMessage(streamId, item)));
        }, "next")
      });
    }
  }
  _replaceStreamingParams(args) {
    const streams = [];
    const streamIds = [];
    for (let i = 0; i < args.length; i++) {
      const argument = args[i];
      if (this._isObservable(argument)) {
        const streamId = this._invocationId;
        this._invocationId++;
        streams[streamId] = argument;
        streamIds.push(streamId.toString());
        args.splice(i, 1);
      }
    }
    return [streams, streamIds];
  }
  _isObservable(arg) {
    return arg && arg.subscribe && typeof arg.subscribe === "function";
  }
  _createStreamInvocation(methodName, args, streamIds) {
    const invocationId = this._invocationId;
    this._invocationId++;
    if (streamIds.length !== 0) {
      return {
        target: methodName,
        arguments: args,
        invocationId: invocationId.toString(),
        streamIds,
        type: MessageType.StreamInvocation
      };
    } else {
      return {
        target: methodName,
        arguments: args,
        invocationId: invocationId.toString(),
        type: MessageType.StreamInvocation
      };
    }
  }
  _createCancelInvocation(id) {
    return {
      invocationId: id,
      type: MessageType.CancelInvocation
    };
  }
  _createStreamItemMessage(id, item) {
    return {
      invocationId: id,
      item,
      type: MessageType.StreamItem
    };
  }
  _createCompletionMessage(id, error, result) {
    if (error) {
      return {
        error,
        invocationId: id,
        type: MessageType.Completion
      };
    }
    return {
      invocationId: id,
      result,
      type: MessageType.Completion
    };
  }
  _createCloseMessage() {
    return { type: MessageType.Close };
  }
  _trySendPingMessage() {
    return __async(this, null, function* () {
      try {
        yield this._sendMessage(this._cachedPingMessage);
      } catch {
        this._cleanupPingTimer();
      }
    });
  }
};
__name(_HubConnection, "HubConnection");
var HubConnection = _HubConnection;

// node_modules/@microsoft/signalr/dist/esm/DefaultReconnectPolicy.js
var DEFAULT_RETRY_DELAYS_IN_MILLISECONDS = [0, 2e3, 1e4, 3e4, null];
var _DefaultReconnectPolicy = class _DefaultReconnectPolicy {
  constructor(retryDelays) {
    this._retryDelays = retryDelays !== void 0 ? [...retryDelays, null] : DEFAULT_RETRY_DELAYS_IN_MILLISECONDS;
  }
  nextRetryDelayInMilliseconds(retryContext) {
    return this._retryDelays[retryContext.previousRetryCount];
  }
};
__name(_DefaultReconnectPolicy, "DefaultReconnectPolicy");
var DefaultReconnectPolicy = _DefaultReconnectPolicy;

// node_modules/@microsoft/signalr/dist/esm/HeaderNames.js
var _HeaderNames = class _HeaderNames {
};
__name(_HeaderNames, "HeaderNames");
var HeaderNames = _HeaderNames;
HeaderNames.Authorization = "Authorization";
HeaderNames.Cookie = "Cookie";

// node_modules/@microsoft/signalr/dist/esm/AccessTokenHttpClient.js
var _AccessTokenHttpClient = class _AccessTokenHttpClient extends HttpClient2 {
  constructor(innerClient, accessTokenFactory) {
    super();
    this._innerClient = innerClient;
    this._accessTokenFactory = accessTokenFactory;
  }
  send(request) {
    return __async(this, null, function* () {
      let allowRetry = true;
      if (this._accessTokenFactory && (!this._accessToken || request.url && request.url.indexOf("/negotiate?") > 0)) {
        allowRetry = false;
        this._accessToken = yield this._accessTokenFactory();
      }
      this._setAuthorizationHeader(request);
      const response = yield this._innerClient.send(request);
      if (allowRetry && response.statusCode === 401 && this._accessTokenFactory) {
        this._accessToken = yield this._accessTokenFactory();
        this._setAuthorizationHeader(request);
        return yield this._innerClient.send(request);
      }
      return response;
    });
  }
  _setAuthorizationHeader(request) {
    if (!request.headers) {
      request.headers = {};
    }
    if (this._accessToken) {
      request.headers[HeaderNames.Authorization] = `Bearer ${this._accessToken}`;
    } else if (this._accessTokenFactory) {
      if (request.headers[HeaderNames.Authorization]) {
        delete request.headers[HeaderNames.Authorization];
      }
    }
  }
  getCookieString(url) {
    return this._innerClient.getCookieString(url);
  }
};
__name(_AccessTokenHttpClient, "AccessTokenHttpClient");
var AccessTokenHttpClient = _AccessTokenHttpClient;

// node_modules/@microsoft/signalr/dist/esm/ITransport.js
var HttpTransportType;
(function(HttpTransportType2) {
  HttpTransportType2[HttpTransportType2["None"] = 0] = "None";
  HttpTransportType2[HttpTransportType2["WebSockets"] = 1] = "WebSockets";
  HttpTransportType2[HttpTransportType2["ServerSentEvents"] = 2] = "ServerSentEvents";
  HttpTransportType2[HttpTransportType2["LongPolling"] = 4] = "LongPolling";
})(HttpTransportType || (HttpTransportType = {}));
var TransferFormat;
(function(TransferFormat2) {
  TransferFormat2[TransferFormat2["Text"] = 1] = "Text";
  TransferFormat2[TransferFormat2["Binary"] = 2] = "Binary";
})(TransferFormat || (TransferFormat = {}));

// node_modules/@microsoft/signalr/dist/esm/AbortController.js
var _AbortController = class _AbortController {
  constructor() {
    this._isAborted = false;
    this.onabort = null;
  }
  abort() {
    if (!this._isAborted) {
      this._isAborted = true;
      if (this.onabort) {
        this.onabort();
      }
    }
  }
  get signal() {
    return this;
  }
  get aborted() {
    return this._isAborted;
  }
};
__name(_AbortController, "AbortController");
var AbortController2 = _AbortController;

// node_modules/@microsoft/signalr/dist/esm/LongPollingTransport.js
var _LongPollingTransport = class _LongPollingTransport {
  // This is an internal type, not exported from 'index' so this is really just internal.
  get pollAborted() {
    return this._pollAbort.aborted;
  }
  constructor(httpClient, logger, options) {
    this._httpClient = httpClient;
    this._logger = logger;
    this._pollAbort = new AbortController2();
    this._options = options;
    this._running = false;
    this.onreceive = null;
    this.onclose = null;
  }
  connect(url, transferFormat) {
    return __async(this, null, function* () {
      Arg.isRequired(url, "url");
      Arg.isRequired(transferFormat, "transferFormat");
      Arg.isIn(transferFormat, TransferFormat, "transferFormat");
      this._url = url;
      this._logger.log(LogLevel.Trace, "(LongPolling transport) Connecting.");
      if (transferFormat === TransferFormat.Binary && (typeof XMLHttpRequest !== "undefined" && typeof new XMLHttpRequest().responseType !== "string")) {
        throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
      }
      const [name, value] = getUserAgentHeader();
      const headers = __spreadValues({ [name]: value }, this._options.headers);
      const pollOptions = {
        abortSignal: this._pollAbort.signal,
        headers,
        timeout: 1e5,
        withCredentials: this._options.withCredentials
      };
      if (transferFormat === TransferFormat.Binary) {
        pollOptions.responseType = "arraybuffer";
      }
      const pollUrl = `${url}&_=${Date.now()}`;
      this._logger.log(LogLevel.Trace, `(LongPolling transport) polling: ${pollUrl}.`);
      const response = yield this._httpClient.get(pollUrl, pollOptions);
      if (response.statusCode !== 200) {
        this._logger.log(LogLevel.Error, `(LongPolling transport) Unexpected response code: ${response.statusCode}.`);
        this._closeError = new HttpError(response.statusText || "", response.statusCode);
        this._running = false;
      } else {
        this._running = true;
      }
      this._receiving = this._poll(this._url, pollOptions);
    });
  }
  _poll(url, pollOptions) {
    return __async(this, null, function* () {
      try {
        while (this._running) {
          try {
            const pollUrl = `${url}&_=${Date.now()}`;
            this._logger.log(LogLevel.Trace, `(LongPolling transport) polling: ${pollUrl}.`);
            const response = yield this._httpClient.get(pollUrl, pollOptions);
            if (response.statusCode === 204) {
              this._logger.log(LogLevel.Information, "(LongPolling transport) Poll terminated by server.");
              this._running = false;
            } else if (response.statusCode !== 200) {
              this._logger.log(LogLevel.Error, `(LongPolling transport) Unexpected response code: ${response.statusCode}.`);
              this._closeError = new HttpError(response.statusText || "", response.statusCode);
              this._running = false;
            } else {
              if (response.content) {
                this._logger.log(LogLevel.Trace, `(LongPolling transport) data received. ${getDataDetail(response.content, this._options.logMessageContent)}.`);
                if (this.onreceive) {
                  this.onreceive(response.content);
                }
              } else {
                this._logger.log(LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
              }
            }
          } catch (e) {
            if (!this._running) {
              this._logger.log(LogLevel.Trace, `(LongPolling transport) Poll errored after shutdown: ${e.message}`);
            } else {
              if (e instanceof TimeoutError) {
                this._logger.log(LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
              } else {
                this._closeError = e;
                this._running = false;
              }
            }
          }
        }
      } finally {
        this._logger.log(LogLevel.Trace, "(LongPolling transport) Polling complete.");
        if (!this.pollAborted) {
          this._raiseOnClose();
        }
      }
    });
  }
  send(data) {
    return __async(this, null, function* () {
      if (!this._running) {
        return Promise.reject(new Error("Cannot send until the transport is connected"));
      }
      return sendMessage(this._logger, "LongPolling", this._httpClient, this._url, data, this._options);
    });
  }
  stop() {
    return __async(this, null, function* () {
      this._logger.log(LogLevel.Trace, "(LongPolling transport) Stopping polling.");
      this._running = false;
      this._pollAbort.abort();
      try {
        yield this._receiving;
        this._logger.log(LogLevel.Trace, `(LongPolling transport) sending DELETE request to ${this._url}.`);
        const headers = {};
        const [name, value] = getUserAgentHeader();
        headers[name] = value;
        const deleteOptions = {
          headers: __spreadValues(__spreadValues({}, headers), this._options.headers),
          timeout: this._options.timeout,
          withCredentials: this._options.withCredentials
        };
        let error;
        try {
          yield this._httpClient.delete(this._url, deleteOptions);
        } catch (err) {
          error = err;
        }
        if (error) {
          if (error instanceof HttpError) {
            if (error.statusCode === 404) {
              this._logger.log(LogLevel.Trace, "(LongPolling transport) A 404 response was returned from sending a DELETE request.");
            } else {
              this._logger.log(LogLevel.Trace, `(LongPolling transport) Error sending a DELETE request: ${error}`);
            }
          }
        } else {
          this._logger.log(LogLevel.Trace, "(LongPolling transport) DELETE request accepted.");
        }
      } finally {
        this._logger.log(LogLevel.Trace, "(LongPolling transport) Stop finished.");
        this._raiseOnClose();
      }
    });
  }
  _raiseOnClose() {
    if (this.onclose) {
      let logMessage = "(LongPolling transport) Firing onclose event.";
      if (this._closeError) {
        logMessage += " Error: " + this._closeError;
      }
      this._logger.log(LogLevel.Trace, logMessage);
      this.onclose(this._closeError);
    }
  }
};
__name(_LongPollingTransport, "LongPollingTransport");
var LongPollingTransport = _LongPollingTransport;

// node_modules/@microsoft/signalr/dist/esm/ServerSentEventsTransport.js
var _ServerSentEventsTransport = class _ServerSentEventsTransport {
  constructor(httpClient, accessToken, logger, options) {
    this._httpClient = httpClient;
    this._accessToken = accessToken;
    this._logger = logger;
    this._options = options;
    this.onreceive = null;
    this.onclose = null;
  }
  connect(url, transferFormat) {
    return __async(this, null, function* () {
      Arg.isRequired(url, "url");
      Arg.isRequired(transferFormat, "transferFormat");
      Arg.isIn(transferFormat, TransferFormat, "transferFormat");
      this._logger.log(LogLevel.Trace, "(SSE transport) Connecting.");
      this._url = url;
      if (this._accessToken) {
        url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(this._accessToken)}`;
      }
      return new Promise((resolve, reject) => {
        let opened = false;
        if (transferFormat !== TransferFormat.Text) {
          reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
          return;
        }
        let eventSource;
        if (Platform.isBrowser || Platform.isWebWorker) {
          eventSource = new this._options.EventSource(url, { withCredentials: this._options.withCredentials });
        } else {
          const cookies = this._httpClient.getCookieString(url);
          const headers = {};
          headers.Cookie = cookies;
          const [name, value] = getUserAgentHeader();
          headers[name] = value;
          eventSource = new this._options.EventSource(url, { withCredentials: this._options.withCredentials, headers: __spreadValues(__spreadValues({}, headers), this._options.headers) });
        }
        try {
          eventSource.onmessage = (e) => {
            if (this.onreceive) {
              try {
                this._logger.log(LogLevel.Trace, `(SSE transport) data received. ${getDataDetail(e.data, this._options.logMessageContent)}.`);
                this.onreceive(e.data);
              } catch (error) {
                this._close(error);
                return;
              }
            }
          };
          eventSource.onerror = (e) => {
            if (opened) {
              this._close();
            } else {
              reject(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."));
            }
          };
          eventSource.onopen = () => {
            this._logger.log(LogLevel.Information, `SSE connected to ${this._url}`);
            this._eventSource = eventSource;
            opened = true;
            resolve();
          };
        } catch (e) {
          reject(e);
          return;
        }
      });
    });
  }
  send(data) {
    return __async(this, null, function* () {
      if (!this._eventSource) {
        return Promise.reject(new Error("Cannot send until the transport is connected"));
      }
      return sendMessage(this._logger, "SSE", this._httpClient, this._url, data, this._options);
    });
  }
  stop() {
    this._close();
    return Promise.resolve();
  }
  _close(e) {
    if (this._eventSource) {
      this._eventSource.close();
      this._eventSource = void 0;
      if (this.onclose) {
        this.onclose(e);
      }
    }
  }
};
__name(_ServerSentEventsTransport, "ServerSentEventsTransport");
var ServerSentEventsTransport = _ServerSentEventsTransport;

// node_modules/@microsoft/signalr/dist/esm/WebSocketTransport.js
var _WebSocketTransport = class _WebSocketTransport {
  constructor(httpClient, accessTokenFactory, logger, logMessageContent, webSocketConstructor, headers) {
    this._logger = logger;
    this._accessTokenFactory = accessTokenFactory;
    this._logMessageContent = logMessageContent;
    this._webSocketConstructor = webSocketConstructor;
    this._httpClient = httpClient;
    this.onreceive = null;
    this.onclose = null;
    this._headers = headers;
  }
  connect(url, transferFormat) {
    return __async(this, null, function* () {
      Arg.isRequired(url, "url");
      Arg.isRequired(transferFormat, "transferFormat");
      Arg.isIn(transferFormat, TransferFormat, "transferFormat");
      this._logger.log(LogLevel.Trace, "(WebSockets transport) Connecting.");
      let token;
      if (this._accessTokenFactory) {
        token = yield this._accessTokenFactory();
      }
      return new Promise((resolve, reject) => {
        url = url.replace(/^http/, "ws");
        let webSocket;
        const cookies = this._httpClient.getCookieString(url);
        let opened = false;
        if (Platform.isNode || Platform.isReactNative) {
          const headers = {};
          const [name, value] = getUserAgentHeader();
          headers[name] = value;
          if (token) {
            headers[HeaderNames.Authorization] = `Bearer ${token}`;
          }
          if (cookies) {
            headers[HeaderNames.Cookie] = cookies;
          }
          webSocket = new this._webSocketConstructor(url, void 0, {
            headers: __spreadValues(__spreadValues({}, headers), this._headers)
          });
        } else {
          if (token) {
            url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(token)}`;
          }
        }
        if (!webSocket) {
          webSocket = new this._webSocketConstructor(url);
        }
        if (transferFormat === TransferFormat.Binary) {
          webSocket.binaryType = "arraybuffer";
        }
        webSocket.onopen = (_event) => {
          this._logger.log(LogLevel.Information, `WebSocket connected to ${url}.`);
          this._webSocket = webSocket;
          opened = true;
          resolve();
        };
        webSocket.onerror = (event) => {
          let error = null;
          if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
            error = event.error;
          } else {
            error = "There was an error with the transport";
          }
          this._logger.log(LogLevel.Information, `(WebSockets transport) ${error}.`);
        };
        webSocket.onmessage = (message) => {
          this._logger.log(LogLevel.Trace, `(WebSockets transport) data received. ${getDataDetail(message.data, this._logMessageContent)}.`);
          if (this.onreceive) {
            try {
              this.onreceive(message.data);
            } catch (error) {
              this._close(error);
              return;
            }
          }
        };
        webSocket.onclose = (event) => {
          if (opened) {
            this._close(event);
          } else {
            let error = null;
            if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
              error = event.error;
            } else {
              error = "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.";
            }
            reject(new Error(error));
          }
        };
      });
    });
  }
  send(data) {
    if (this._webSocket && this._webSocket.readyState === this._webSocketConstructor.OPEN) {
      this._logger.log(LogLevel.Trace, `(WebSockets transport) sending data. ${getDataDetail(data, this._logMessageContent)}.`);
      this._webSocket.send(data);
      return Promise.resolve();
    }
    return Promise.reject("WebSocket is not in the OPEN state");
  }
  stop() {
    if (this._webSocket) {
      this._close(void 0);
    }
    return Promise.resolve();
  }
  _close(event) {
    if (this._webSocket) {
      this._webSocket.onclose = () => {
      };
      this._webSocket.onmessage = () => {
      };
      this._webSocket.onerror = () => {
      };
      this._webSocket.close();
      this._webSocket = void 0;
    }
    this._logger.log(LogLevel.Trace, "(WebSockets transport) socket closed.");
    if (this.onclose) {
      if (this._isCloseEvent(event) && (event.wasClean === false || event.code !== 1e3)) {
        this.onclose(new Error(`WebSocket closed with status code: ${event.code} (${event.reason || "no reason given"}).`));
      } else if (event instanceof Error) {
        this.onclose(event);
      } else {
        this.onclose();
      }
    }
  }
  _isCloseEvent(event) {
    return event && typeof event.wasClean === "boolean" && typeof event.code === "number";
  }
};
__name(_WebSocketTransport, "WebSocketTransport");
var WebSocketTransport = _WebSocketTransport;

// node_modules/@microsoft/signalr/dist/esm/HttpConnection.js
var MAX_REDIRECTS = 100;
var _HttpConnection = class _HttpConnection {
  constructor(url, options = {}) {
    this._stopPromiseResolver = () => {
    };
    this.features = {};
    this._negotiateVersion = 1;
    Arg.isRequired(url, "url");
    this._logger = createLogger(options.logger);
    this.baseUrl = this._resolveUrl(url);
    options = options || {};
    options.logMessageContent = options.logMessageContent === void 0 ? false : options.logMessageContent;
    if (typeof options.withCredentials === "boolean" || options.withCredentials === void 0) {
      options.withCredentials = options.withCredentials === void 0 ? true : options.withCredentials;
    } else {
      throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
    }
    options.timeout = options.timeout === void 0 ? 100 * 1e3 : options.timeout;
    let webSocketModule = null;
    let eventSourceModule = null;
    if (Platform.isNode && typeof __require !== "undefined") {
      const requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : __require;
      webSocketModule = requireFunc("ws");
      eventSourceModule = requireFunc("eventsource");
    }
    if (!Platform.isNode && typeof WebSocket !== "undefined" && !options.WebSocket) {
      options.WebSocket = WebSocket;
    } else if (Platform.isNode && !options.WebSocket) {
      if (webSocketModule) {
        options.WebSocket = webSocketModule;
      }
    }
    if (!Platform.isNode && typeof EventSource !== "undefined" && !options.EventSource) {
      options.EventSource = EventSource;
    } else if (Platform.isNode && !options.EventSource) {
      if (typeof eventSourceModule !== "undefined") {
        options.EventSource = eventSourceModule;
      }
    }
    this._httpClient = new AccessTokenHttpClient(options.httpClient || new DefaultHttpClient(this._logger), options.accessTokenFactory);
    this._connectionState = "Disconnected";
    this._connectionStarted = false;
    this._options = options;
    this.onreceive = null;
    this.onclose = null;
  }
  start(transferFormat) {
    return __async(this, null, function* () {
      transferFormat = transferFormat || TransferFormat.Binary;
      Arg.isIn(transferFormat, TransferFormat, "transferFormat");
      this._logger.log(LogLevel.Debug, `Starting connection with transfer format '${TransferFormat[transferFormat]}'.`);
      if (this._connectionState !== "Disconnected") {
        return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));
      }
      this._connectionState = "Connecting";
      this._startInternalPromise = this._startInternal(transferFormat);
      yield this._startInternalPromise;
      if (this._connectionState === "Disconnecting") {
        const message = "Failed to start the HttpConnection before stop() was called.";
        this._logger.log(LogLevel.Error, message);
        yield this._stopPromise;
        return Promise.reject(new AbortError(message));
      } else if (this._connectionState !== "Connected") {
        const message = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
        this._logger.log(LogLevel.Error, message);
        return Promise.reject(new AbortError(message));
      }
      this._connectionStarted = true;
    });
  }
  send(data) {
    if (this._connectionState !== "Connected") {
      return Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State."));
    }
    if (!this._sendQueue) {
      this._sendQueue = new TransportSendQueue(this.transport);
    }
    return this._sendQueue.send(data);
  }
  stop(error) {
    return __async(this, null, function* () {
      if (this._connectionState === "Disconnected") {
        this._logger.log(LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnected state.`);
        return Promise.resolve();
      }
      if (this._connectionState === "Disconnecting") {
        this._logger.log(LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnecting state.`);
        return this._stopPromise;
      }
      this._connectionState = "Disconnecting";
      this._stopPromise = new Promise((resolve) => {
        this._stopPromiseResolver = resolve;
      });
      yield this._stopInternal(error);
      yield this._stopPromise;
    });
  }
  _stopInternal(error) {
    return __async(this, null, function* () {
      this._stopError = error;
      try {
        yield this._startInternalPromise;
      } catch (e) {
      }
      if (this.transport) {
        try {
          yield this.transport.stop();
        } catch (e) {
          this._logger.log(LogLevel.Error, `HttpConnection.transport.stop() threw error '${e}'.`);
          this._stopConnection();
        }
        this.transport = void 0;
      } else {
        this._logger.log(LogLevel.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
      }
    });
  }
  _startInternal(transferFormat) {
    return __async(this, null, function* () {
      let url = this.baseUrl;
      this._accessTokenFactory = this._options.accessTokenFactory;
      this._httpClient._accessTokenFactory = this._accessTokenFactory;
      try {
        if (this._options.skipNegotiation) {
          if (this._options.transport === HttpTransportType.WebSockets) {
            this.transport = this._constructTransport(HttpTransportType.WebSockets);
            yield this._startTransport(url, transferFormat);
          } else {
            throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
          }
        } else {
          let negotiateResponse = null;
          let redirects = 0;
          do {
            negotiateResponse = yield this._getNegotiationResponse(url);
            if (this._connectionState === "Disconnecting" || this._connectionState === "Disconnected") {
              throw new AbortError("The connection was stopped during negotiation.");
            }
            if (negotiateResponse.error) {
              throw new Error(negotiateResponse.error);
            }
            if (negotiateResponse.ProtocolVersion) {
              throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
            }
            if (negotiateResponse.url) {
              url = negotiateResponse.url;
            }
            if (negotiateResponse.accessToken) {
              const accessToken = negotiateResponse.accessToken;
              this._accessTokenFactory = () => accessToken;
              this._httpClient._accessToken = accessToken;
              this._httpClient._accessTokenFactory = void 0;
            }
            redirects++;
          } while (negotiateResponse.url && redirects < MAX_REDIRECTS);
          if (redirects === MAX_REDIRECTS && negotiateResponse.url) {
            throw new Error("Negotiate redirection limit exceeded.");
          }
          yield this._createTransport(url, this._options.transport, negotiateResponse, transferFormat);
        }
        if (this.transport instanceof LongPollingTransport) {
          this.features.inherentKeepAlive = true;
        }
        if (this._connectionState === "Connecting") {
          this._logger.log(LogLevel.Debug, "The HttpConnection connected successfully.");
          this._connectionState = "Connected";
        }
      } catch (e) {
        this._logger.log(LogLevel.Error, "Failed to start the connection: " + e);
        this._connectionState = "Disconnected";
        this.transport = void 0;
        this._stopPromiseResolver();
        return Promise.reject(e);
      }
    });
  }
  _getNegotiationResponse(url) {
    return __async(this, null, function* () {
      const headers = {};
      const [name, value] = getUserAgentHeader();
      headers[name] = value;
      const negotiateUrl = this._resolveNegotiateUrl(url);
      this._logger.log(LogLevel.Debug, `Sending negotiation request: ${negotiateUrl}.`);
      try {
        const response = yield this._httpClient.post(negotiateUrl, {
          content: "",
          headers: __spreadValues(__spreadValues({}, headers), this._options.headers),
          timeout: this._options.timeout,
          withCredentials: this._options.withCredentials
        });
        if (response.statusCode !== 200) {
          return Promise.reject(new Error(`Unexpected status code returned from negotiate '${response.statusCode}'`));
        }
        const negotiateResponse = JSON.parse(response.content);
        if (!negotiateResponse.negotiateVersion || negotiateResponse.negotiateVersion < 1) {
          negotiateResponse.connectionToken = negotiateResponse.connectionId;
        }
        if (negotiateResponse.useStatefulReconnect && this._options._useStatefulReconnect !== true) {
          return Promise.reject(new FailedToNegotiateWithServerError("Client didn't negotiate Stateful Reconnect but the server did."));
        }
        return negotiateResponse;
      } catch (e) {
        let errorMessage = "Failed to complete negotiation with the server: " + e;
        if (e instanceof HttpError) {
          if (e.statusCode === 404) {
            errorMessage = errorMessage + " Either this is not a SignalR endpoint or there is a proxy blocking the connection.";
          }
        }
        this._logger.log(LogLevel.Error, errorMessage);
        return Promise.reject(new FailedToNegotiateWithServerError(errorMessage));
      }
    });
  }
  _createConnectUrl(url, connectionToken) {
    if (!connectionToken) {
      return url;
    }
    return url + (url.indexOf("?") === -1 ? "?" : "&") + `id=${connectionToken}`;
  }
  _createTransport(url, requestedTransport, negotiateResponse, requestedTransferFormat) {
    return __async(this, null, function* () {
      let connectUrl = this._createConnectUrl(url, negotiateResponse.connectionToken);
      if (this._isITransport(requestedTransport)) {
        this._logger.log(LogLevel.Debug, "Connection was provided an instance of ITransport, using that directly.");
        this.transport = requestedTransport;
        yield this._startTransport(connectUrl, requestedTransferFormat);
        this.connectionId = negotiateResponse.connectionId;
        return;
      }
      const transportExceptions = [];
      const transports = negotiateResponse.availableTransports || [];
      let negotiate = negotiateResponse;
      for (const endpoint of transports) {
        const transportOrError = this._resolveTransportOrError(endpoint, requestedTransport, requestedTransferFormat, (negotiate === null || negotiate === void 0 ? void 0 : negotiate.useStatefulReconnect) === true);
        if (transportOrError instanceof Error) {
          transportExceptions.push(`${endpoint.transport} failed:`);
          transportExceptions.push(transportOrError);
        } else if (this._isITransport(transportOrError)) {
          this.transport = transportOrError;
          if (!negotiate) {
            try {
              negotiate = yield this._getNegotiationResponse(url);
            } catch (ex) {
              return Promise.reject(ex);
            }
            connectUrl = this._createConnectUrl(url, negotiate.connectionToken);
          }
          try {
            yield this._startTransport(connectUrl, requestedTransferFormat);
            this.connectionId = negotiate.connectionId;
            return;
          } catch (ex) {
            this._logger.log(LogLevel.Error, `Failed to start the transport '${endpoint.transport}': ${ex}`);
            negotiate = void 0;
            transportExceptions.push(new FailedToStartTransportError(`${endpoint.transport} failed: ${ex}`, HttpTransportType[endpoint.transport]));
            if (this._connectionState !== "Connecting") {
              const message = "Failed to select transport before stop() was called.";
              this._logger.log(LogLevel.Debug, message);
              return Promise.reject(new AbortError(message));
            }
          }
        }
      }
      if (transportExceptions.length > 0) {
        return Promise.reject(new AggregateErrors(`Unable to connect to the server with any of the available transports. ${transportExceptions.join(" ")}`, transportExceptions));
      }
      return Promise.reject(new Error("None of the transports supported by the client are supported by the server."));
    });
  }
  _constructTransport(transport) {
    switch (transport) {
      case HttpTransportType.WebSockets:
        if (!this._options.WebSocket) {
          throw new Error("'WebSocket' is not supported in your environment.");
        }
        return new WebSocketTransport(this._httpClient, this._accessTokenFactory, this._logger, this._options.logMessageContent, this._options.WebSocket, this._options.headers || {});
      case HttpTransportType.ServerSentEvents:
        if (!this._options.EventSource) {
          throw new Error("'EventSource' is not supported in your environment.");
        }
        return new ServerSentEventsTransport(this._httpClient, this._httpClient._accessToken, this._logger, this._options);
      case HttpTransportType.LongPolling:
        return new LongPollingTransport(this._httpClient, this._logger, this._options);
      default:
        throw new Error(`Unknown transport: ${transport}.`);
    }
  }
  _startTransport(url, transferFormat) {
    this.transport.onreceive = this.onreceive;
    if (this.features.reconnect) {
      this.transport.onclose = (e) => __async(this, null, function* () {
        let callStop = false;
        if (this.features.reconnect) {
          try {
            this.features.disconnected();
            yield this.transport.connect(url, transferFormat);
            yield this.features.resend();
          } catch {
            callStop = true;
          }
        } else {
          this._stopConnection(e);
          return;
        }
        if (callStop) {
          this._stopConnection(e);
        }
      });
    } else {
      this.transport.onclose = (e) => this._stopConnection(e);
    }
    return this.transport.connect(url, transferFormat);
  }
  _resolveTransportOrError(endpoint, requestedTransport, requestedTransferFormat, useStatefulReconnect) {
    const transport = HttpTransportType[endpoint.transport];
    if (transport === null || transport === void 0) {
      this._logger.log(LogLevel.Debug, `Skipping transport '${endpoint.transport}' because it is not supported by this client.`);
      return new Error(`Skipping transport '${endpoint.transport}' because it is not supported by this client.`);
    } else {
      if (transportMatches(requestedTransport, transport)) {
        const transferFormats = endpoint.transferFormats.map((s) => TransferFormat[s]);
        if (transferFormats.indexOf(requestedTransferFormat) >= 0) {
          if (transport === HttpTransportType.WebSockets && !this._options.WebSocket || transport === HttpTransportType.ServerSentEvents && !this._options.EventSource) {
            this._logger.log(LogLevel.Debug, `Skipping transport '${HttpTransportType[transport]}' because it is not supported in your environment.'`);
            return new UnsupportedTransportError(`'${HttpTransportType[transport]}' is not supported in your environment.`, transport);
          } else {
            this._logger.log(LogLevel.Debug, `Selecting transport '${HttpTransportType[transport]}'.`);
            try {
              this.features.reconnect = transport === HttpTransportType.WebSockets ? useStatefulReconnect : void 0;
              return this._constructTransport(transport);
            } catch (ex) {
              return ex;
            }
          }
        } else {
          this._logger.log(LogLevel.Debug, `Skipping transport '${HttpTransportType[transport]}' because it does not support the requested transfer format '${TransferFormat[requestedTransferFormat]}'.`);
          return new Error(`'${HttpTransportType[transport]}' does not support ${TransferFormat[requestedTransferFormat]}.`);
        }
      } else {
        this._logger.log(LogLevel.Debug, `Skipping transport '${HttpTransportType[transport]}' because it was disabled by the client.`);
        return new DisabledTransportError(`'${HttpTransportType[transport]}' is disabled by the client.`, transport);
      }
    }
  }
  _isITransport(transport) {
    return transport && typeof transport === "object" && "connect" in transport;
  }
  _stopConnection(error) {
    this._logger.log(LogLevel.Debug, `HttpConnection.stopConnection(${error}) called while in state ${this._connectionState}.`);
    this.transport = void 0;
    error = this._stopError || error;
    this._stopError = void 0;
    if (this._connectionState === "Disconnected") {
      this._logger.log(LogLevel.Debug, `Call to HttpConnection.stopConnection(${error}) was ignored because the connection is already in the disconnected state.`);
      return;
    }
    if (this._connectionState === "Connecting") {
      this._logger.log(LogLevel.Warning, `Call to HttpConnection.stopConnection(${error}) was ignored because the connection is still in the connecting state.`);
      throw new Error(`HttpConnection.stopConnection(${error}) was called while the connection is still in the connecting state.`);
    }
    if (this._connectionState === "Disconnecting") {
      this._stopPromiseResolver();
    }
    if (error) {
      this._logger.log(LogLevel.Error, `Connection disconnected with error '${error}'.`);
    } else {
      this._logger.log(LogLevel.Information, "Connection disconnected.");
    }
    if (this._sendQueue) {
      this._sendQueue.stop().catch((e) => {
        this._logger.log(LogLevel.Error, `TransportSendQueue.stop() threw error '${e}'.`);
      });
      this._sendQueue = void 0;
    }
    this.connectionId = void 0;
    this._connectionState = "Disconnected";
    if (this._connectionStarted) {
      this._connectionStarted = false;
      try {
        if (this.onclose) {
          this.onclose(error);
        }
      } catch (e) {
        this._logger.log(LogLevel.Error, `HttpConnection.onclose(${error}) threw error '${e}'.`);
      }
    }
  }
  _resolveUrl(url) {
    if (url.lastIndexOf("https://", 0) === 0 || url.lastIndexOf("http://", 0) === 0) {
      return url;
    }
    if (!Platform.isBrowser) {
      throw new Error(`Cannot resolve '${url}'.`);
    }
    const aTag = window.document.createElement("a");
    aTag.href = url;
    this._logger.log(LogLevel.Information, `Normalizing '${url}' to '${aTag.href}'.`);
    return aTag.href;
  }
  _resolveNegotiateUrl(url) {
    const negotiateUrl = new URL(url);
    if (negotiateUrl.pathname.endsWith("/")) {
      negotiateUrl.pathname += "negotiate";
    } else {
      negotiateUrl.pathname += "/negotiate";
    }
    const searchParams = new URLSearchParams(negotiateUrl.searchParams);
    if (!searchParams.has("negotiateVersion")) {
      searchParams.append("negotiateVersion", this._negotiateVersion.toString());
    }
    if (searchParams.has("useStatefulReconnect")) {
      if (searchParams.get("useStatefulReconnect") === "true") {
        this._options._useStatefulReconnect = true;
      }
    } else if (this._options._useStatefulReconnect === true) {
      searchParams.append("useStatefulReconnect", "true");
    }
    negotiateUrl.search = searchParams.toString();
    return negotiateUrl.toString();
  }
};
__name(_HttpConnection, "HttpConnection");
var HttpConnection = _HttpConnection;
function transportMatches(requestedTransport, actualTransport) {
  return !requestedTransport || (actualTransport & requestedTransport) !== 0;
}
__name(transportMatches, "transportMatches");
var _TransportSendQueue = class _TransportSendQueue {
  constructor(_transport) {
    this._transport = _transport;
    this._buffer = [];
    this._executing = true;
    this._sendBufferedData = new PromiseSource();
    this._transportResult = new PromiseSource();
    this._sendLoopPromise = this._sendLoop();
  }
  send(data) {
    this._bufferData(data);
    if (!this._transportResult) {
      this._transportResult = new PromiseSource();
    }
    return this._transportResult.promise;
  }
  stop() {
    this._executing = false;
    this._sendBufferedData.resolve();
    return this._sendLoopPromise;
  }
  _bufferData(data) {
    if (this._buffer.length && typeof this._buffer[0] !== typeof data) {
      throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof data}`);
    }
    this._buffer.push(data);
    this._sendBufferedData.resolve();
  }
  _sendLoop() {
    return __async(this, null, function* () {
      while (true) {
        yield this._sendBufferedData.promise;
        if (!this._executing) {
          if (this._transportResult) {
            this._transportResult.reject("Connection stopped.");
          }
          break;
        }
        this._sendBufferedData = new PromiseSource();
        const transportResult = this._transportResult;
        this._transportResult = void 0;
        const data = typeof this._buffer[0] === "string" ? this._buffer.join("") : _TransportSendQueue._concatBuffers(this._buffer);
        this._buffer.length = 0;
        try {
          yield this._transport.send(data);
          transportResult.resolve();
        } catch (error) {
          transportResult.reject(error);
        }
      }
    });
  }
  static _concatBuffers(arrayBuffers) {
    const totalLength = arrayBuffers.map((b) => b.byteLength).reduce((a, b) => a + b);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const item of arrayBuffers) {
      result.set(new Uint8Array(item), offset);
      offset += item.byteLength;
    }
    return result.buffer;
  }
};
__name(_TransportSendQueue, "TransportSendQueue");
var TransportSendQueue = _TransportSendQueue;
var _PromiseSource = class _PromiseSource {
  constructor() {
    this.promise = new Promise((resolve, reject) => [this._resolver, this._rejecter] = [resolve, reject]);
  }
  resolve() {
    this._resolver();
  }
  reject(reason) {
    this._rejecter(reason);
  }
};
__name(_PromiseSource, "PromiseSource");
var PromiseSource = _PromiseSource;

// node_modules/@microsoft/signalr/dist/esm/JsonHubProtocol.js
var JSON_HUB_PROTOCOL_NAME = "json";
var _JsonHubProtocol = class _JsonHubProtocol {
  constructor() {
    this.name = JSON_HUB_PROTOCOL_NAME;
    this.version = 2;
    this.transferFormat = TransferFormat.Text;
  }
  /** Creates an array of {@link @microsoft/signalr.HubMessage} objects from the specified serialized representation.
   *
   * @param {string} input A string containing the serialized representation.
   * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
   */
  parseMessages(input, logger) {
    if (typeof input !== "string") {
      throw new Error("Invalid input for JSON hub protocol. Expected a string.");
    }
    if (!input) {
      return [];
    }
    if (logger === null) {
      logger = NullLogger.instance;
    }
    const messages = TextMessageFormat.parse(input);
    const hubMessages = [];
    for (const message of messages) {
      const parsedMessage = JSON.parse(message);
      if (typeof parsedMessage.type !== "number") {
        throw new Error("Invalid payload.");
      }
      switch (parsedMessage.type) {
        case MessageType.Invocation:
          this._isInvocationMessage(parsedMessage);
          break;
        case MessageType.StreamItem:
          this._isStreamItemMessage(parsedMessage);
          break;
        case MessageType.Completion:
          this._isCompletionMessage(parsedMessage);
          break;
        case MessageType.Ping:
          break;
        case MessageType.Close:
          break;
        case MessageType.Ack:
          this._isAckMessage(parsedMessage);
          break;
        case MessageType.Sequence:
          this._isSequenceMessage(parsedMessage);
          break;
        default:
          logger.log(LogLevel.Information, "Unknown message type '" + parsedMessage.type + "' ignored.");
          continue;
      }
      hubMessages.push(parsedMessage);
    }
    return hubMessages;
  }
  /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
   *
   * @param {HubMessage} message The message to write.
   * @returns {string} A string containing the serialized representation of the message.
   */
  writeMessage(message) {
    return TextMessageFormat.write(JSON.stringify(message));
  }
  _isInvocationMessage(message) {
    this._assertNotEmptyString(message.target, "Invalid payload for Invocation message.");
    if (message.invocationId !== void 0) {
      this._assertNotEmptyString(message.invocationId, "Invalid payload for Invocation message.");
    }
  }
  _isStreamItemMessage(message) {
    this._assertNotEmptyString(message.invocationId, "Invalid payload for StreamItem message.");
    if (message.item === void 0) {
      throw new Error("Invalid payload for StreamItem message.");
    }
  }
  _isCompletionMessage(message) {
    if (message.result && message.error) {
      throw new Error("Invalid payload for Completion message.");
    }
    if (!message.result && message.error) {
      this._assertNotEmptyString(message.error, "Invalid payload for Completion message.");
    }
    this._assertNotEmptyString(message.invocationId, "Invalid payload for Completion message.");
  }
  _isAckMessage(message) {
    if (typeof message.sequenceId !== "number") {
      throw new Error("Invalid SequenceId for Ack message.");
    }
  }
  _isSequenceMessage(message) {
    if (typeof message.sequenceId !== "number") {
      throw new Error("Invalid SequenceId for Sequence message.");
    }
  }
  _assertNotEmptyString(value, errorMessage) {
    if (typeof value !== "string" || value === "") {
      throw new Error(errorMessage);
    }
  }
};
__name(_JsonHubProtocol, "JsonHubProtocol");
var JsonHubProtocol = _JsonHubProtocol;

// node_modules/@microsoft/signalr/dist/esm/HubConnectionBuilder.js
var LogLevelNameMapping = {
  trace: LogLevel.Trace,
  debug: LogLevel.Debug,
  info: LogLevel.Information,
  information: LogLevel.Information,
  warn: LogLevel.Warning,
  warning: LogLevel.Warning,
  error: LogLevel.Error,
  critical: LogLevel.Critical,
  none: LogLevel.None
};
function parseLogLevel(name) {
  const mapping = LogLevelNameMapping[name.toLowerCase()];
  if (typeof mapping !== "undefined") {
    return mapping;
  } else {
    throw new Error(`Unknown log level: ${name}`);
  }
}
__name(parseLogLevel, "parseLogLevel");
var _HubConnectionBuilder = class _HubConnectionBuilder {
  configureLogging(logging) {
    Arg.isRequired(logging, "logging");
    if (isLogger(logging)) {
      this.logger = logging;
    } else if (typeof logging === "string") {
      const logLevel = parseLogLevel(logging);
      this.logger = new ConsoleLogger(logLevel);
    } else {
      this.logger = new ConsoleLogger(logging);
    }
    return this;
  }
  withUrl(url, transportTypeOrOptions) {
    Arg.isRequired(url, "url");
    Arg.isNotEmpty(url, "url");
    this.url = url;
    if (typeof transportTypeOrOptions === "object") {
      this.httpConnectionOptions = __spreadValues(__spreadValues({}, this.httpConnectionOptions), transportTypeOrOptions);
    } else {
      this.httpConnectionOptions = __spreadProps(__spreadValues({}, this.httpConnectionOptions), {
        transport: transportTypeOrOptions
      });
    }
    return this;
  }
  /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
   *
   * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
   */
  withHubProtocol(protocol) {
    Arg.isRequired(protocol, "protocol");
    this.protocol = protocol;
    return this;
  }
  withAutomaticReconnect(retryDelaysOrReconnectPolicy) {
    if (this.reconnectPolicy) {
      throw new Error("A reconnectPolicy has already been set.");
    }
    if (!retryDelaysOrReconnectPolicy) {
      this.reconnectPolicy = new DefaultReconnectPolicy();
    } else if (Array.isArray(retryDelaysOrReconnectPolicy)) {
      this.reconnectPolicy = new DefaultReconnectPolicy(retryDelaysOrReconnectPolicy);
    } else {
      this.reconnectPolicy = retryDelaysOrReconnectPolicy;
    }
    return this;
  }
  /** Configures {@link @microsoft/signalr.HubConnection.serverTimeoutInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withServerTimeout(milliseconds) {
    Arg.isRequired(milliseconds, "milliseconds");
    this._serverTimeoutInMilliseconds = milliseconds;
    return this;
  }
  /** Configures {@link @microsoft/signalr.HubConnection.keepAliveIntervalInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withKeepAliveInterval(milliseconds) {
    Arg.isRequired(milliseconds, "milliseconds");
    this._keepAliveIntervalInMilliseconds = milliseconds;
    return this;
  }
  /** Enables and configures options for the Stateful Reconnect feature.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withStatefulReconnect(options) {
    if (this.httpConnectionOptions === void 0) {
      this.httpConnectionOptions = {};
    }
    this.httpConnectionOptions._useStatefulReconnect = true;
    this._statefulReconnectBufferSize = options === null || options === void 0 ? void 0 : options.bufferSize;
    return this;
  }
  /** Creates a {@link @microsoft/signalr.HubConnection} from the configuration options specified in this builder.
   *
   * @returns {HubConnection} The configured {@link @microsoft/signalr.HubConnection}.
   */
  build() {
    const httpConnectionOptions = this.httpConnectionOptions || {};
    if (httpConnectionOptions.logger === void 0) {
      httpConnectionOptions.logger = this.logger;
    }
    if (!this.url) {
      throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
    }
    const connection = new HttpConnection(this.url, httpConnectionOptions);
    return HubConnection.create(connection, this.logger || NullLogger.instance, this.protocol || new JsonHubProtocol(), this.reconnectPolicy, this._serverTimeoutInMilliseconds, this._keepAliveIntervalInMilliseconds, this._statefulReconnectBufferSize);
  }
};
__name(_HubConnectionBuilder, "HubConnectionBuilder");
var HubConnectionBuilder = _HubConnectionBuilder;
function isLogger(logger) {
  return logger.log !== void 0;
}
__name(isLogger, "isLogger");

// src/app/core/services/signalr.service.ts
var _SignalRService = class _SignalRService {
  hubConnection = null;
  authService = inject(AuthService);
  /** Signal indicating connection status */
  isConnected = signal(false, ...ngDevMode ? [{ debugName: "isConnected" }] : []);
  /** Signal for received notifications */
  newNotification = signal(null, ...ngDevMode ? [{ debugName: "newNotification" }] : []);
  /** Signal for unread count updates */
  unreadCount = signal(0, ...ngDevMode ? [{ debugName: "unreadCount" }] : []);
  /**
   * Starts the SignalR connection.
   * Should be called after user authentication.
   */
  startConnection() {
    return __async(this, null, function* () {
      if (this.hubConnection?.state === HubConnectionState.Connected) {
        return;
      }
      const token = this.authService.getAccessToken();
      if (!token) {
        console.warn("Cannot start SignalR connection: No access token");
        return;
      }
      this.hubConnection = new HubConnectionBuilder().withUrl(`${environment.apiUrl}/hubs/notifications`, {
        accessTokenFactory: /* @__PURE__ */ __name(() => token, "accessTokenFactory")
      }).withAutomaticReconnect([0, 2e3, 5e3, 1e4, 3e4]).configureLogging(LogLevel.Information).build();
      this.registerHandlers();
      try {
        yield this.hubConnection.start();
        this.isConnected.set(true);
        console.log("SignalR connected");
      } catch (error) {
        console.error("SignalR connection error:", error);
        this.isConnected.set(false);
      }
    });
  }
  /**
   * Stops the SignalR connection.
   */
  stopConnection() {
    return __async(this, null, function* () {
      if (this.hubConnection) {
        try {
          yield this.hubConnection.stop();
          this.isConnected.set(false);
          console.log("SignalR disconnected");
        } catch (error) {
          console.error("SignalR disconnection error:", error);
        }
      }
    });
  }
  /**
   * Registers event handlers for SignalR messages.
   */
  registerHandlers() {
    if (!this.hubConnection)
      return;
    this.hubConnection.on("ReceiveNotification", (notification) => {
      this.newNotification.set(notification);
    });
    this.hubConnection.on("UnreadCountUpdated", (count) => {
      this.unreadCount.set(count);
    });
    this.hubConnection.onreconnecting((error) => {
      this.isConnected.set(false);
      console.log("SignalR reconnecting...", error);
    });
    this.hubConnection.onreconnected((connectionId) => {
      this.isConnected.set(true);
      console.log("SignalR reconnected:", connectionId);
    });
    this.hubConnection.onclose((error) => {
      this.isConnected.set(false);
      console.log("SignalR connection closed:", error);
    });
  }
};
__name(_SignalRService, "SignalRService");
__publicField(_SignalRService, "\u0275fac", /* @__PURE__ */ __name(function SignalRService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SignalRService)();
}, "SignalRService_Factory"));
__publicField(_SignalRService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SignalRService, factory: _SignalRService.\u0275fac, providedIn: "root" }));
var SignalRService = _SignalRService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SignalRService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/services/notification-bell.service.ts
var _NotificationBellService = class _NotificationBellService {
  apiUrl = `${environment.apiUrl}/api/v1/notifications`;
  http = inject(HttpClient);
  signalRService = inject(SignalRService);
  toastService = inject(NotificationService);
  i18n = inject(I18nService);
  /** List of notifications */
  notifications = signal([], ...ngDevMode ? [{ debugName: "notifications" }] : []);
  /** Unread notification count */
  unreadCount = signal(0, ...ngDevMode ? [{ debugName: "unreadCount" }] : []);
  /** Loading state */
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  /** Computed signal for checking if there are unread notifications */
  hasUnread = computed(() => this.unreadCount() > 0, ...ngDevMode ? [{ debugName: "hasUnread" }] : []);
  /** Track if we've initialized (to avoid showing toast for initial load) */
  initialized = false;
  constructor() {
    effect(() => {
      const count = this.signalRService.unreadCount();
      this.unreadCount.set(count);
    });
    effect(() => {
      const notification = this.signalRService.newNotification();
      if (notification) {
        this.notifications.update((current) => [notification, ...current]);
        if (this.initialized) {
          this.showToastForNotification(notification);
        }
      }
    });
  }
  /**
   * Shows a toast notification for a new notification.
   */
  showToastForNotification(notification) {
    const isArabic = this.i18n.locale() === "ar";
    const title = isArabic ? notification.titleAr : notification.titleEn;
    const message = isArabic ? notification.messageAr : notification.messageEn;
    const notificationType = notification.type;
    switch (notificationType) {
      case "RequestApproved":
        this.toastService.success(title, message);
        break;
      case "RequestRejected":
        this.toastService.error(title, message);
        break;
      case "ApprovalPending":
      case "DelegationReceived":
      case "ApprovalReminder":
        this.toastService.warning(title, message);
        break;
      default:
        this.toastService.info(title, message);
        break;
    }
  }
  /**
   * Loads notifications from the API.
   */
  loadNotifications(unreadOnly = false, limit = 50) {
    this.isLoading.set(true);
    return this.http.get(`${this.apiUrl}`, {
      params: { unreadOnly: unreadOnly.toString(), limit: limit.toString() }
    }).pipe(tap((notifications) => {
      this.notifications.set(notifications);
      this.isLoading.set(false);
    }));
  }
  /**
   * Loads the unread count from the API.
   */
  loadUnreadCount() {
    return this.http.get(`${this.apiUrl}/unread-count`).pipe(tap((response) => {
      this.unreadCount.set(response.count);
    }));
  }
  /**
   * Marks a notification as read.
   */
  markAsRead(notificationId) {
    return this.http.post(`${this.apiUrl}/${notificationId}/mark-read`, {}).pipe(tap(() => {
      this.notifications.update((notifications) => notifications.map((n) => n.id === notificationId ? __spreadProps(__spreadValues({}, n), { isRead: true, readAt: (/* @__PURE__ */ new Date()).toISOString() }) : n));
      this.unreadCount.update((count) => Math.max(0, count - 1));
    }));
  }
  /**
   * Marks all notifications as read.
   */
  markAllAsRead() {
    return this.http.post(`${this.apiUrl}/mark-all-read`, {}).pipe(tap(() => {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      this.notifications.update((notifications) => notifications.map((n) => __spreadProps(__spreadValues({}, n), { isRead: true, readAt: now })));
      this.unreadCount.set(0);
    }));
  }
  /**
   * Deletes a notification.
   */
  deleteNotification(notificationId) {
    return this.http.delete(`${this.apiUrl}/${notificationId}`).pipe(tap(() => {
      const notification = this.notifications().find((n) => n.id === notificationId);
      this.notifications.update((notifications) => notifications.filter((n) => n.id !== notificationId));
      if (notification && !notification.isRead) {
        this.unreadCount.update((count) => Math.max(0, count - 1));
      }
    }));
  }
  /**
   * Initializes the notification service.
   * Should be called after user authentication.
   */
  initialize() {
    return __async(this, null, function* () {
      yield this.signalRService.startConnection();
      this.loadUnreadCount().subscribe();
      this.loadNotifications().subscribe({
        complete: /* @__PURE__ */ __name(() => {
          this.initialized = true;
        }, "complete")
      });
    });
  }
  /**
   * Cleans up the notification service.
   * Should be called on logout.
   */
  cleanup() {
    return __async(this, null, function* () {
      yield this.signalRService.stopConnection();
      this.notifications.set([]);
      this.unreadCount.set(0);
    });
  }
};
__name(_NotificationBellService, "NotificationBellService");
__publicField(_NotificationBellService, "\u0275fac", /* @__PURE__ */ __name(function NotificationBellService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NotificationBellService)();
}, "NotificationBellService_Factory"));
__publicField(_NotificationBellService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationBellService, factory: _NotificationBellService.\u0275fac, providedIn: "root" }));
var NotificationBellService = _NotificationBellService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationBellService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/shared/models/notification.model.ts
var NotificationType;
(function(NotificationType2) {
  NotificationType2["RequestSubmitted"] = "RequestSubmitted";
  NotificationType2["RequestApproved"] = "RequestApproved";
  NotificationType2["RequestRejected"] = "RequestRejected";
  NotificationType2["RequestDelegated"] = "RequestDelegated";
  NotificationType2["RequestEscalated"] = "RequestEscalated";
  NotificationType2["ApprovalPending"] = "ApprovalPending";
  NotificationType2["DelegationReceived"] = "DelegationReceived";
  NotificationType2["ApprovalReminder"] = "ApprovalReminder";
})(NotificationType || (NotificationType = {}));

// src/app/shared/components/notification-bell/notification-bell.component.ts
var _forTrack02 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function NotificationBellComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.unreadCount() > 99 ? "99+" : ctx_r0.unreadCount());
  }
}
__name(NotificationBellComponent_Conditional_3_Template, "NotificationBellComponent_Conditional_3_Template");
function NotificationBellComponent_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function NotificationBellComponent_Conditional_4_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.markAllAsRead());
    }, "NotificationBellComponent_Conditional_4_Conditional_4_Template_button_click_0_listener"));
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("notifications.markAllRead"), " ");
  }
}
__name(NotificationBellComponent_Conditional_4_Conditional_4_Template, "NotificationBellComponent_Conditional_4_Conditional_4_Template");
function NotificationBellComponent_Conditional_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 14)(2, "span", 15);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
  }
}
__name(NotificationBellComponent_Conditional_4_Conditional_6_Template, "NotificationBellComponent_Conditional_4_Conditional_6_Template");
function NotificationBellComponent_Conditional_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "i", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("notifications.empty"), " ");
  }
}
__name(NotificationBellComponent_Conditional_4_Conditional_7_Template, "NotificationBellComponent_Conditional_4_Conditional_7_Template");
function NotificationBellComponent_Conditional_4_Conditional_8_For_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 24);
  }
}
__name(NotificationBellComponent_Conditional_4_Conditional_8_For_1_Conditional_10_Template, "NotificationBellComponent_Conditional_4_Conditional_8_For_1_Conditional_10_Template");
function NotificationBellComponent_Conditional_4_Conditional_8_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function NotificationBellComponent_Conditional_4_Conditional_8_For_1_Template_div_click_0_listener() {
      const notification_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onNotificationClick(notification_r4));
    }, "NotificationBellComponent_Conditional_4_Conditional_8_For_1_Template_div_click_0_listener"))("keypress.enter", /* @__PURE__ */ __name(function NotificationBellComponent_Conditional_4_Conditional_8_For_1_Template_div_keypress_enter_0_listener() {
      const notification_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onNotificationClick(notification_r4));
    }, "NotificationBellComponent_Conditional_4_Conditional_8_For_1_Template_div_keypress_enter_0_listener"));
    \u0275\u0275elementStart(1, "div", 19);
    \u0275\u0275element(2, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20)(4, "div", 21);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 22);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 23);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, NotificationBellComponent_Conditional_4_Conditional_8_For_1_Conditional_10_Template, 1, 0, "div", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notification_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("unread", !notification_r4.isRead);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("bi " + ctx_r0.getIconClass(notification_r4.type));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.getTitle(notification_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getMessage(notification_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getTimeAgo(notification_r4.createdAtUtc));
    \u0275\u0275advance();
    \u0275\u0275conditional(!notification_r4.isRead ? 10 : -1);
  }
}
__name(NotificationBellComponent_Conditional_4_Conditional_8_For_1_Template, "NotificationBellComponent_Conditional_4_Conditional_8_For_1_Template");
function NotificationBellComponent_Conditional_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, NotificationBellComponent_Conditional_4_Conditional_8_For_1_Template, 11, 8, "div", 17, _forTrack02);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r0.notifications());
  }
}
__name(NotificationBellComponent_Conditional_4_Conditional_8_Template, "NotificationBellComponent_Conditional_4_Conditional_8_Template");
function NotificationBellComponent_Conditional_4_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "a", 25);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function NotificationBellComponent_Conditional_4_Conditional_9_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.closeDropdown());
    }, "NotificationBellComponent_Conditional_4_Conditional_9_Template_a_click_1_listener"));
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("notifications.viewAll"), " ");
  }
}
__name(NotificationBellComponent_Conditional_4_Conditional_9_Template, "NotificationBellComponent_Conditional_4_Conditional_9_Template");
function NotificationBellComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "span", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, NotificationBellComponent_Conditional_4_Conditional_4_Template, 2, 1, "button", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 9);
    \u0275\u0275conditionalCreate(6, NotificationBellComponent_Conditional_4_Conditional_6_Template, 4, 1, "div", 10)(7, NotificationBellComponent_Conditional_4_Conditional_7_Template, 3, 1, "div", 11)(8, NotificationBellComponent_Conditional_4_Conditional_8_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, NotificationBellComponent_Conditional_4_Conditional_9_Template, 3, 1, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("dropdown-rtl", ctx_r0.currentLang() === "ar");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("notifications.title"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasUnread() ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isLoading() ? 6 : ctx_r0.notifications().length === 0 ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.notifications().length > 0 ? 9 : -1);
  }
}
__name(NotificationBellComponent_Conditional_4_Template, "NotificationBellComponent_Conditional_4_Template");
var _NotificationBellComponent = class _NotificationBellComponent {
  notificationService = inject(NotificationBellService);
  router = inject(Router);
  i18n = inject(I18nService);
  /** Whether the dropdown is open */
  isDropdownOpen = false;
  /** Notifications list */
  notifications = this.notificationService.notifications;
  /** Unread count */
  unreadCount = this.notificationService.unreadCount;
  /** Loading state */
  isLoading = this.notificationService.isLoading;
  /** Has unread notifications */
  hasUnread = this.notificationService.hasUnread;
  /** Current language */
  currentLang = computed(() => this.i18n.locale(), ...ngDevMode ? [{ debugName: "currentLang" }] : []);
  ngOnInit() {
    this.notificationService.initialize();
  }
  ngOnDestroy() {
    this.notificationService.cleanup();
  }
  /**
   * Toggles the dropdown visibility.
   */
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.notificationService.loadNotifications().subscribe();
    }
  }
  /**
   * Closes the dropdown.
   */
  closeDropdown() {
    this.isDropdownOpen = false;
  }
  /**
   * Gets the notification title based on current language.
   */
  getTitle(notification) {
    return this.currentLang() === "ar" ? notification.titleAr : notification.titleEn;
  }
  /**
   * Gets the notification message based on current language.
   */
  getMessage(notification) {
    return this.currentLang() === "ar" ? notification.messageAr : notification.messageEn;
  }
  /**
   * Gets the icon class for a notification type.
   */
  getIconClass(type) {
    switch (type) {
      case NotificationType.RequestApproved:
        return "bi-check-circle-fill text-success";
      case NotificationType.RequestRejected:
        return "bi-x-circle-fill text-danger";
      case NotificationType.ApprovalPending:
      case NotificationType.DelegationReceived:
        return "bi-hourglass-split text-warning";
      case NotificationType.RequestSubmitted:
        return "bi-send-fill text-primary";
      case NotificationType.RequestDelegated:
        return "bi-arrow-left-right text-info";
      case NotificationType.RequestEscalated:
        return "bi-arrow-up-circle-fill text-warning";
      case NotificationType.ApprovalReminder:
        return "bi-alarm-fill text-warning";
      default:
        return "bi-bell-fill text-secondary";
    }
  }
  /**
   * Formats the time ago string.
   */
  getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 6e4);
    const diffHours = Math.floor(diffMs / 36e5);
    const diffDays = Math.floor(diffMs / 864e5);
    if (diffMins < 1) {
      return this.i18n.t("notifications.justNow");
    } else if (diffMins < 60) {
      return this.i18n.t("notifications.minutesAgo", { count: diffMins });
    } else if (diffHours < 24) {
      return this.i18n.t("notifications.hoursAgo", { count: diffHours });
    } else {
      return this.i18n.t("notifications.daysAgo", { count: diffDays });
    }
  }
  /**
   * Handles notification click - marks as read and navigates.
   */
  onNotificationClick(notification) {
    if (!notification.isRead) {
      this.notificationService.markAsRead(notification.id).subscribe();
    }
    this.closeDropdown();
    if (notification.actionUrl) {
      this.router.navigateByUrl(notification.actionUrl);
    }
  }
  /**
   * Marks all notifications as read.
   */
  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe();
  }
  /**
   * Handles click outside the dropdown to close it.
   */
  onClickOutside(event) {
    const target = event.target;
    if (!target.closest(".notification-bell-container")) {
      this.closeDropdown();
    }
  }
};
__name(_NotificationBellComponent, "NotificationBellComponent");
__publicField(_NotificationBellComponent, "\u0275fac", /* @__PURE__ */ __name(function NotificationBellComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NotificationBellComponent)();
}, "NotificationBellComponent_Factory"));
__publicField(_NotificationBellComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationBellComponent, selectors: [["app-notification-bell"]], decls: 5, vars: 4, consts: [[1, "notification-bell-container", 3, "click"], ["type", "button", 1, "btn", "btn-link", "notification-bell-btn", 3, "click"], [1, "bi", "bi-bell", "fs-5"], [1, "notification-badge"], [1, "notification-dropdown", 3, "dropdown-rtl"], [1, "notification-dropdown"], [1, "dropdown-header", "d-flex", "justify-content-between", "align-items-center"], [1, "fw-bold"], ["type", "button", 1, "btn", "btn-link", "btn-sm", "p-0", "text-decoration-none"], [1, "notification-list"], [1, "text-center", "py-4"], [1, "text-center", "py-4", "text-muted"], [1, "dropdown-footer", "text-center"], ["type", "button", 1, "btn", "btn-link", "btn-sm", "p-0", "text-decoration-none", 3, "click"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "text-primary"], [1, "visually-hidden"], [1, "bi", "bi-bell-slash", "fs-2", "d-block", "mb-2"], ["role", "button", "tabindex", "0", 1, "notification-item", 3, "unread"], ["role", "button", "tabindex", "0", 1, "notification-item", 3, "click", "keypress.enter"], [1, "notification-icon"], [1, "notification-content"], [1, "notification-title"], [1, "notification-message"], [1, "notification-time"], [1, "unread-indicator"], ["routerLink", "/notifications", 1, "text-decoration-none", 3, "click"]], template: /* @__PURE__ */ __name(function NotificationBellComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function NotificationBellComponent_Template_div_click_0_listener($event) {
      return ctx.onClickOutside($event);
    }, "NotificationBellComponent_Template_div_click_0_listener"), \u0275\u0275resolveDocument);
    \u0275\u0275elementStart(1, "button", 1);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function NotificationBellComponent_Template_button_click_1_listener() {
      return ctx.toggleDropdown();
    }, "NotificationBellComponent_Template_button_click_1_listener"));
    \u0275\u0275element(2, "i", 2);
    \u0275\u0275conditionalCreate(3, NotificationBellComponent_Conditional_3_Template, 2, 1, "span", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, NotificationBellComponent_Conditional_4_Template, 10, 6, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx.i18n.t("notifications.title"))("aria-expanded", ctx.isDropdownOpen);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.hasUnread() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isDropdownOpen ? 4 : -1);
  }
}, "NotificationBellComponent_Template"), dependencies: [CommonModule, RouterModule, RouterLink], styles: ["\n\n.notification-bell-container[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n.notification-bell-btn[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 0.5rem;\n  color: var(--bs-navbar-color, #6c757d);\n  text-decoration: none;\n}\n.notification-bell-btn[_ngcontent-%COMP%]:hover {\n  color: var(--bs-navbar-hover-color, #212529);\n}\n.notification-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  transform: translate(25%, -25%);\n  padding: 0.25rem 0.4rem;\n  font-size: 0.65rem;\n  font-weight: 600;\n  line-height: 1;\n  color: #fff;\n  background-color: #dc3545;\n  border-radius: 10rem;\n  min-width: 1.2rem;\n  text-align: center;\n}\n.notification-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  width: 360px;\n  max-height: 480px;\n  background-color: #fff;\n  border-radius: 0.5rem;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  z-index: 1050;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.notification-dropdown.dropdown-rtl[_ngcontent-%COMP%] {\n  right: auto;\n  left: 0;\n}\n.dropdown-header[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid #dee2e6;\n  background-color: #f8f9fa;\n}\n.notification-list[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  max-height: 360px;\n}\n.notification-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid #f1f3f5;\n  cursor: pointer;\n  transition: background-color 0.15s ease-in-out;\n  position: relative;\n}\n.notification-item[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n}\n.notification-item.unread[_ngcontent-%COMP%] {\n  background-color: #e7f5ff;\n}\n.notification-item.unread[_ngcontent-%COMP%]:hover {\n  background-color: #d0ebff;\n}\n.notification-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 2.5rem;\n  height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background-color: #f1f3f5;\n  margin-right: 0.75rem;\n}\n[dir=rtl][_ngcontent-%COMP%]   .notification-icon[_ngcontent-%COMP%], \n.dropdown-rtl[_ngcontent-%COMP%]   .notification-icon[_ngcontent-%COMP%] {\n  margin-right: 0;\n  margin-left: 0.75rem;\n}\n.notification-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.notification-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.notification-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: #212529;\n  margin-bottom: 0.25rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.notification-message[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: #6c757d;\n  margin-bottom: 0.25rem;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.notification-time[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #adb5bd;\n}\n.unread-indicator[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: #0d6efd;\n  flex-shrink: 0;\n  margin-left: 0.5rem;\n  align-self: center;\n}\n[dir=rtl][_ngcontent-%COMP%]   .unread-indicator[_ngcontent-%COMP%], \n.dropdown-rtl[_ngcontent-%COMP%]   .unread-indicator[_ngcontent-%COMP%] {\n  margin-left: 0;\n  margin-right: 0.5rem;\n}\n.dropdown-footer[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border-top: 1px solid #dee2e6;\n  background-color: #f8f9fa;\n}\n.dropdown-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #0d6efd;\n}\n.dropdown-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #0a58ca;\n}\n@media (max-width: 576px) {\n  .notification-dropdown[_ngcontent-%COMP%] {\n    width: 100vw;\n    right: -1rem;\n    border-radius: 0;\n  }\n  .notification-dropdown.dropdown-rtl[_ngcontent-%COMP%] {\n    right: auto;\n    left: -1rem;\n  }\n}\n/*# sourceMappingURL=notification-bell.component.css.map */"] }));
var NotificationBellComponent = _NotificationBellComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationBellComponent, [{
    type: Component,
    args: [{ selector: "app-notification-bell", standalone: true, imports: [CommonModule, RouterModule], template: `<div class="notification-bell-container" (document:click)="onClickOutside($event)">\r
  <!-- Bell Button -->\r
  <button\r
    type="button"\r
    class="btn btn-link notification-bell-btn"\r
    (click)="toggleDropdown()"\r
    [attr.aria-label]="i18n.t('notifications.title')"\r
    [attr.aria-expanded]="isDropdownOpen">\r
    <i class="bi bi-bell fs-5"></i>\r
    @if (hasUnread()) {\r
      <span class="notification-badge">{{ unreadCount() > 99 ? '99+' : unreadCount() }}</span>\r
    }\r
  </button>\r
\r
  <!-- Dropdown -->\r
  @if (isDropdownOpen) {\r
    <div class="notification-dropdown" [class.dropdown-rtl]="currentLang() === 'ar'">\r
      <!-- Header -->\r
      <div class="dropdown-header d-flex justify-content-between align-items-center">\r
        <span class="fw-bold">{{ i18n.t('notifications.title') }}</span>\r
        @if (hasUnread()) {\r
          <button\r
            type="button"\r
            class="btn btn-link btn-sm p-0 text-decoration-none"\r
            (click)="markAllAsRead()">\r
            {{ i18n.t('notifications.markAllRead') }}\r
          </button>\r
        }\r
      </div>\r
\r
      <!-- Notifications List -->\r
      <div class="notification-list">\r
        @if (isLoading()) {\r
          <div class="text-center py-4">\r
            <div class="spinner-border spinner-border-sm text-primary" role="status">\r
              <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>\r
            </div>\r
          </div>\r
        } @else if (notifications().length === 0) {\r
          <div class="text-center py-4 text-muted">\r
            <i class="bi bi-bell-slash fs-2 d-block mb-2"></i>\r
            {{ i18n.t('notifications.empty') }}\r
          </div>\r
        } @else {\r
          @for (notification of notifications(); track notification.id) {\r
            <div\r
              class="notification-item"\r
              [class.unread]="!notification.isRead"\r
              (click)="onNotificationClick(notification)"\r
              role="button"\r
              tabindex="0"\r
              (keypress.enter)="onNotificationClick(notification)">\r
              <div class="notification-icon">\r
                <i [class]="'bi ' + getIconClass(notification.type)"></i>\r
              </div>\r
              <div class="notification-content">\r
                <div class="notification-title">{{ getTitle(notification) }}</div>\r
                <div class="notification-message">{{ getMessage(notification) }}</div>\r
                <div class="notification-time">{{ getTimeAgo(notification.createdAtUtc) }}</div>\r
              </div>\r
              @if (!notification.isRead) {\r
                <div class="unread-indicator"></div>\r
              }\r
            </div>\r
          }\r
        }\r
      </div>\r
\r
      <!-- Footer -->\r
      @if (notifications().length > 0) {\r
        <div class="dropdown-footer text-center">\r
          <a routerLink="/notifications" class="text-decoration-none" (click)="closeDropdown()">\r
            {{ i18n.t('notifications.viewAll') }}\r
          </a>\r
        </div>\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/shared/components/notification-bell/notification-bell.component.css */\n.notification-bell-container {\n  position: relative;\n  display: inline-block;\n}\n.notification-bell-btn {\n  position: relative;\n  padding: 0.5rem;\n  color: var(--bs-navbar-color, #6c757d);\n  text-decoration: none;\n}\n.notification-bell-btn:hover {\n  color: var(--bs-navbar-hover-color, #212529);\n}\n.notification-badge {\n  position: absolute;\n  top: 0;\n  right: 0;\n  transform: translate(25%, -25%);\n  padding: 0.25rem 0.4rem;\n  font-size: 0.65rem;\n  font-weight: 600;\n  line-height: 1;\n  color: #fff;\n  background-color: #dc3545;\n  border-radius: 10rem;\n  min-width: 1.2rem;\n  text-align: center;\n}\n.notification-dropdown {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  width: 360px;\n  max-height: 480px;\n  background-color: #fff;\n  border-radius: 0.5rem;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  z-index: 1050;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.notification-dropdown.dropdown-rtl {\n  right: auto;\n  left: 0;\n}\n.dropdown-header {\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid #dee2e6;\n  background-color: #f8f9fa;\n}\n.notification-list {\n  flex: 1;\n  overflow-y: auto;\n  max-height: 360px;\n}\n.notification-item {\n  display: flex;\n  align-items: flex-start;\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid #f1f3f5;\n  cursor: pointer;\n  transition: background-color 0.15s ease-in-out;\n  position: relative;\n}\n.notification-item:hover {\n  background-color: #f8f9fa;\n}\n.notification-item.unread {\n  background-color: #e7f5ff;\n}\n.notification-item.unread:hover {\n  background-color: #d0ebff;\n}\n.notification-icon {\n  flex-shrink: 0;\n  width: 2.5rem;\n  height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background-color: #f1f3f5;\n  margin-right: 0.75rem;\n}\n[dir=rtl] .notification-icon,\n.dropdown-rtl .notification-icon {\n  margin-right: 0;\n  margin-left: 0.75rem;\n}\n.notification-icon i {\n  font-size: 1rem;\n}\n.notification-content {\n  flex: 1;\n  min-width: 0;\n}\n.notification-title {\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: #212529;\n  margin-bottom: 0.25rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.notification-message {\n  font-size: 0.8125rem;\n  color: #6c757d;\n  margin-bottom: 0.25rem;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.notification-time {\n  font-size: 0.75rem;\n  color: #adb5bd;\n}\n.unread-indicator {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: #0d6efd;\n  flex-shrink: 0;\n  margin-left: 0.5rem;\n  align-self: center;\n}\n[dir=rtl] .unread-indicator,\n.dropdown-rtl .unread-indicator {\n  margin-left: 0;\n  margin-right: 0.5rem;\n}\n.dropdown-footer {\n  padding: 0.75rem 1rem;\n  border-top: 1px solid #dee2e6;\n  background-color: #f8f9fa;\n}\n.dropdown-footer a {\n  font-size: 0.875rem;\n  color: #0d6efd;\n}\n.dropdown-footer a:hover {\n  color: #0a58ca;\n}\n@media (max-width: 576px) {\n  .notification-dropdown {\n    width: 100vw;\n    right: -1rem;\n    border-radius: 0;\n  }\n  .notification-dropdown.dropdown-rtl {\n    right: auto;\n    left: -1rem;\n  }\n}\n/*# sourceMappingURL=notification-bell.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationBellComponent, { className: "NotificationBellComponent", filePath: "src/app/shared/components/notification-bell/notification-bell.component.ts", lineNumber: 15 });
})();

// src/app/layout/topbar/topbar.component.ts
function TopbarComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ul", 15)(1, "li")(2, "a", 17);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function TopbarComponent_Conditional_19_Template_a_click_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.preventDefault());
    }, "TopbarComponent_Conditional_19_Template_a_click_2_listener"));
    \u0275\u0275element(3, "i", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "li")(6, "a", 17);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function TopbarComponent_Conditional_19_Template_a_click_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.preventDefault());
    }, "TopbarComponent_Conditional_19_Template_a_click_6_listener"));
    \u0275\u0275element(7, "i", 19);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "li");
    \u0275\u0275element(10, "hr", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "li")(12, "a", 21);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function TopbarComponent_Conditional_19_Template_a_click_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.onLogout());
    }, "TopbarComponent_Conditional_19_Template_a_click_12_listener"));
    \u0275\u0275element(13, "i", 22);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("settings.profile"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("nav.settings"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.t("nav.logout"), " ");
  }
}
__name(TopbarComponent_Conditional_19_Template, "TopbarComponent_Conditional_19_Template");
function TopbarComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function TopbarComponent_Conditional_20_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClickOutside());
    }, "TopbarComponent_Conditional_20_Template_div_click_0_listener"));
    \u0275\u0275elementEnd();
  }
}
__name(TopbarComponent_Conditional_20_Template, "TopbarComponent_Conditional_20_Template");
var _TopbarComponent = class _TopbarComponent {
  authService;
  i18n;
  router;
  sidenavCollapsed = signal(false, ...ngDevMode ? [{ debugName: "sidenavCollapsed" }] : []);
  toggleSidenav = new EventEmitter();
  currentUser = computed(() => this.authService.currentUser(), ...ngDevMode ? [{ debugName: "currentUser" }] : []);
  currentLocale = computed(() => this.i18n.locale(), ...ngDevMode ? [{ debugName: "currentLocale" }] : []);
  isRtl = computed(() => this.i18n.isRtl(), ...ngDevMode ? [{ debugName: "isRtl" }] : []);
  pageTitle = signal("", ...ngDevMode ? [{ debugName: "pageTitle" }] : []);
  showUserMenu = signal(false, ...ngDevMode ? [{ debugName: "showUserMenu" }] : []);
  constructor(authService, i18n, router) {
    this.authService = authService;
    this.i18n = i18n;
    this.router = router;
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => {
      let route = this.router.routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route.snapshot.data?.["title"] || "";
    })).subscribe((title) => {
      this.pageTitle.set(this.t(title) || "Dashboard");
    });
  }
  t(key) {
    return this.i18n.t(key);
  }
  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
  onToggleUserMenu() {
    this.showUserMenu.update((show) => !show);
  }
  onSwitchLanguage() {
    const newLocale = this.currentLocale() === "en" ? "ar" : "en";
    this.i18n.setLocale(newLocale);
    this.showUserMenu.set(false);
  }
  onLogout() {
    this.authService.logout();
    this.showUserMenu.set(false);
  }
  onClickOutside() {
    this.showUserMenu.set(false);
  }
};
__name(_TopbarComponent, "TopbarComponent");
__publicField(_TopbarComponent, "\u0275fac", /* @__PURE__ */ __name(function TopbarComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TopbarComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(I18nService), \u0275\u0275directiveInject(Router));
}, "TopbarComponent_Factory"));
__publicField(_TopbarComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TopbarComponent, selectors: [["app-topbar"]], inputs: { sidenavCollapsed: "sidenavCollapsed" }, outputs: { toggleSidenav: "toggleSidenav" }, decls: 21, vars: 13, consts: [[1, "topbar"], [1, "topbar-content"], [1, "topbar-left"], ["type", "button", 1, "btn", "btn-link", "topbar-btn", 3, "click"], [1, "fa-solid", "fa-bars"], [1, "topbar-center"], [1, "page-title", "mb-0"], [1, "topbar-right"], ["type", "button", 1, "btn", "btn-link", "topbar-btn", "me-2", 3, "click"], [1, "fa-solid", "fa-globe"], [1, "d-none", "d-md-inline", "ms-1"], [1, "dropdown"], ["type", "button", 1, "btn", "btn-link", "topbar-btn", "dropdown-toggle", 3, "click"], [1, "fa-solid", "fa-user", "me-1"], [1, "d-none", "d-md-inline"], [1, "dropdown-menu", "dropdown-menu-end", "show"], [1, "dropdown-backdrop"], ["href", "#", 1, "dropdown-item", 3, "click"], [1, "fa-solid", "fa-user", "me-2"], [1, "fa-solid", "fa-cog", "me-2"], [1, "dropdown-divider"], ["href", "#", 1, "dropdown-item", "text-danger", 3, "click"], [1, "fa-solid", "fa-sign-out-alt", "me-2"], [1, "dropdown-backdrop", 3, "click"]], template: /* @__PURE__ */ __name(function TopbarComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function TopbarComponent_Template_button_click_3_listener() {
      return ctx.onToggleSidenav();
    }, "TopbarComponent_Template_button_click_3_listener"));
    \u0275\u0275element(4, "i", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 5)(6, "h1", 6);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 7);
    \u0275\u0275element(9, "app-notification-bell");
    \u0275\u0275elementStart(10, "button", 8);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function TopbarComponent_Template_button_click_10_listener() {
      return ctx.onSwitchLanguage();
    }, "TopbarComponent_Template_button_click_10_listener"));
    \u0275\u0275element(11, "i", 9);
    \u0275\u0275elementStart(12, "span", 10);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 11)(15, "button", 12);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function TopbarComponent_Template_button_click_15_listener() {
      return ctx.onToggleUserMenu();
    }, "TopbarComponent_Template_button_click_15_listener"));
    \u0275\u0275element(16, "i", 13);
    \u0275\u0275elementStart(17, "span", 14);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, TopbarComponent_Conditional_19_Template, 15, 3, "ul", 15);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(20, TopbarComponent_Conditional_20_Template, 1, 0, "div", 16);
  }
  if (rf & 2) {
    let tmp_8_0;
    \u0275\u0275classProp("sidenav-collapsed", ctx.sidenavCollapsed());
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-label", ctx.t("nav.toggle_menu"))("aria-expanded", !ctx.sidenavCollapsed());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.pageTitle());
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-label", ctx.t("settings.language"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.currentLocale() === "en" ? "\u0639\u0631\u0628\u064A" : "English", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("show", ctx.showUserMenu());
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx.showUserMenu());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_8_0 = ctx.currentUser()) == null ? null : tmp_8_0.username);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showUserMenu() ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showUserMenu() ? 20 : -1);
  }
}, "TopbarComponent_Template"), dependencies: [NotificationBellComponent], styles: ["\n\n.topbar[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 250px;\n  right: 0;\n  height: 60px;\n  background-color: var(--bs-white);\n  border-bottom: 1px solid var(--bs-border-color);\n  z-index: 999;\n  transition: left 0.3s ease;\n}\n.topbar.sidenav-collapsed[_ngcontent-%COMP%] {\n  left: 72px;\n}\n.topbar-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 100%;\n  padding: 0 1rem;\n}\n.topbar-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  min-width: 60px;\n}\n.topbar-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  min-width: 200px;\n}\n.topbar-center[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n  margin: 0 1rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--bs-dark);\n}\n.topbar-btn[_ngcontent-%COMP%] {\n  color: var(--bs-secondary);\n  padding: 0.5rem;\n  border: none;\n  background: none;\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\n.topbar-btn[_ngcontent-%COMP%]:hover, \n.topbar-btn[_ngcontent-%COMP%]:focus {\n  color: var(--bs-primary);\n  text-decoration: none;\n}\n.dropdown[_ngcontent-%COMP%] {\n  position: relative;\n}\n.dropdown-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  z-index: 1000;\n  min-width: 200px;\n  margin-top: 0.5rem;\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.375rem;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.dropdown-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 998;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .topbar[_ngcontent-%COMP%] {\n  left: 0 !important;\n  right: 250px !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .topbar.sidenav-collapsed[_ngcontent-%COMP%] {\n  right: 72px !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .topbar-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .dropdown-menu[_ngcontent-%COMP%] {\n  left: 0;\n  right: auto;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .me-1[_ngcontent-%COMP%] {\n  margin-left: 0.25rem !important;\n  margin-right: 0 !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .me-2[_ngcontent-%COMP%] {\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .ms-1[_ngcontent-%COMP%] {\n  margin-right: 0.25rem !important;\n  margin-left: 0 !important;\n}\n@media (max-width: 767.98px) {\n  .topbar[_ngcontent-%COMP%] {\n    left: 0 !important;\n    right: 0 !important;\n  }\n  [_ngcontent-%COMP%]:root[dir=rtl]   .topbar[_ngcontent-%COMP%] {\n    left: 0 !important;\n    right: 0 !important;\n  }\n  .topbar-left[_ngcontent-%COMP%] {\n    display: flex;\n  }\n  .page-title[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n}\n/*# sourceMappingURL=topbar.component.css.map */"] }));
var TopbarComponent = _TopbarComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TopbarComponent, [{
    type: Component,
    args: [{ selector: "app-topbar", standalone: true, imports: [NotificationBellComponent], template: `<header class="topbar" [class.sidenav-collapsed]="sidenavCollapsed()">\r
  <div class="topbar-content">\r
    <!-- Left section: Menu toggle -->\r
    <div class="topbar-left">\r
      <button class="btn btn-link topbar-btn" \r
              type="button"\r
              (click)="onToggleSidenav()"\r
              [attr.aria-label]="t('nav.toggle_menu')"\r
              [attr.aria-expanded]="!sidenavCollapsed()">\r
        <i class="fa-solid fa-bars"></i>\r
      </button>\r
    </div>\r
\r
    <!-- Center section: Page title -->\r
    <div class="topbar-center">\r
      <h1 class="page-title mb-0">{{ pageTitle() }}</h1>\r
    </div>\r
\r
    <!-- Right section: User menu and language switch -->\r
    <div class="topbar-right">\r
      <!-- Notification bell -->\r
      <app-notification-bell></app-notification-bell>\r
\r
      <!-- Language switch -->\r
      <button class="btn btn-link topbar-btn me-2"\r
              type="button"\r
              (click)="onSwitchLanguage()"\r
              [attr.aria-label]="t('settings.language')">\r
        <i class="fa-solid fa-globe"></i>\r
        <span class="d-none d-md-inline ms-1">\r
          {{ currentLocale() === 'en' ? '\u0639\u0631\u0628\u064A' : 'English' }}\r
        </span>\r
      </button>\r
\r
      <!-- User menu -->\r
      <div class="dropdown" \r
           [class.show]="showUserMenu()">\r
        <button class="btn btn-link topbar-btn dropdown-toggle" \r
                type="button"\r
                (click)="onToggleUserMenu()"\r
                [attr.aria-expanded]="showUserMenu()">\r
          <i class="fa-solid fa-user me-1"></i>\r
          <span class="d-none d-md-inline">{{ currentUser()?.username }}</span>\r
        </button>\r
        \r
        @if (showUserMenu()) {\r
          <ul class="dropdown-menu dropdown-menu-end show">\r
            <li>\r
              <a class="dropdown-item" href="#" (click)="$event.preventDefault()">\r
                <i class="fa-solid fa-user me-2"></i>\r
                {{ t('settings.profile') }}\r
              </a>\r
            </li>\r
            <li>\r
              <a class="dropdown-item" href="#" (click)="$event.preventDefault()">\r
                <i class="fa-solid fa-cog me-2"></i>\r
                {{ t('nav.settings') }}\r
              </a>\r
            </li>\r
            <li><hr class="dropdown-divider"></li>\r
            <li>\r
              <a class="dropdown-item text-danger" \r
                 href="#" \r
                 (click)="$event.preventDefault(); onLogout()">\r
                <i class="fa-solid fa-sign-out-alt me-2"></i>\r
                {{ t('nav.logout') }}\r
              </a>\r
            </li>\r
          </ul>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
</header>\r
\r
<!-- Backdrop for mobile menu -->\r
@if (showUserMenu()) {\r
  <div class="dropdown-backdrop" (click)="onClickOutside()"></div>\r
}`, styles: ["/* src/app/layout/topbar/topbar.component.css */\n.topbar {\n  position: fixed;\n  top: 0;\n  left: 250px;\n  right: 0;\n  height: 60px;\n  background-color: var(--bs-white);\n  border-bottom: 1px solid var(--bs-border-color);\n  z-index: 999;\n  transition: left 0.3s ease;\n}\n.topbar.sidenav-collapsed {\n  left: 72px;\n}\n.topbar-content {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 100%;\n  padding: 0 1rem;\n}\n.topbar-left {\n  display: flex;\n  align-items: center;\n  min-width: 60px;\n}\n.topbar-right {\n  display: flex;\n  align-items: center;\n  min-width: 200px;\n}\n.topbar-center {\n  flex: 1;\n  text-align: center;\n  margin: 0 1rem;\n}\n.page-title {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--bs-dark);\n}\n.topbar-btn {\n  color: var(--bs-secondary);\n  padding: 0.5rem;\n  border: none;\n  background: none;\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\n.topbar-btn:hover,\n.topbar-btn:focus {\n  color: var(--bs-primary);\n  text-decoration: none;\n}\n.dropdown {\n  position: relative;\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  z-index: 1000;\n  min-width: 200px;\n  margin-top: 0.5rem;\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.375rem;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 998;\n}\n:root[dir=rtl] .topbar {\n  left: 0 !important;\n  right: 250px !important;\n}\n:root[dir=rtl] .topbar.sidenav-collapsed {\n  right: 72px !important;\n}\n:root[dir=rtl] .topbar-center {\n  text-align: center;\n}\n:root[dir=rtl] .dropdown-menu {\n  left: 0;\n  right: auto;\n}\n:root[dir=rtl] .me-1 {\n  margin-left: 0.25rem !important;\n  margin-right: 0 !important;\n}\n:root[dir=rtl] .me-2 {\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n}\n:root[dir=rtl] .ms-1 {\n  margin-right: 0.25rem !important;\n  margin-left: 0 !important;\n}\n@media (max-width: 767.98px) {\n  .topbar {\n    left: 0 !important;\n    right: 0 !important;\n  }\n  :root[dir=rtl] .topbar {\n    left: 0 !important;\n    right: 0 !important;\n  }\n  .topbar-left {\n    display: flex;\n  }\n  .page-title {\n    font-size: 1.1rem;\n  }\n}\n/*# sourceMappingURL=topbar.component.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: I18nService }, { type: Router }], { sidenavCollapsed: [{
    type: Input
  }], toggleSidenav: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TopbarComponent, { className: "TopbarComponent", filePath: "src/app/layout/topbar/topbar.component.ts", lineNumber: 16 });
})();

// src/app/core/notifications/notification.component.ts
var _forTrack03 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
function NotificationComponent_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notification_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", notification_r2.message, " ");
  }
}
__name(NotificationComponent_For_2_Conditional_9_Template, "NotificationComponent_For_2_Conditional_9_Template");
function NotificationComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
    \u0275\u0275element(3, "i", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong", 5);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small", 6);
    \u0275\u0275text(7, "now");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 7);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function NotificationComponent_For_2_Template_button_click_8_listener() {
      const notification_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.notificationService.remove(notification_r2.id));
    }, "NotificationComponent_For_2_Template_button_click_8_listener"));
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, NotificationComponent_For_2_Conditional_9_Template, 2, 1, "div", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notification_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r2.getToastClass(notification_r2.type));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getIconClass(notification_r2.type));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.getIcon(notification_r2.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(notification_r2.title);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(notification_r2.message ? 9 : -1);
  }
}
__name(NotificationComponent_For_2_Template, "NotificationComponent_For_2_Template");
var _NotificationComponent = class _NotificationComponent {
  notificationService = inject(NotificationService);
  getToastClass(type) {
    switch (type) {
      case "success":
        return "toast-success";
      case "error":
        return "toast-error";
      case "warning":
        return "toast-warning";
      case "info":
        return "toast-info";
      default:
        return "toast-info";
    }
  }
  getIconClass(type) {
    switch (type) {
      case "success":
        return "bg-success";
      case "error":
        return "bg-danger";
      case "warning":
        return "bg-warning";
      case "info":
        return "bg-info";
      default:
        return "bg-info";
    }
  }
  getIcon(type) {
    switch (type) {
      case "success":
        return "fa-check";
      case "error":
        return "fa-times";
      case "warning":
        return "fa-exclamation-triangle";
      case "info":
        return "fa-info";
      default:
        return "fa-info";
    }
  }
};
__name(_NotificationComponent, "NotificationComponent");
__publicField(_NotificationComponent, "\u0275fac", /* @__PURE__ */ __name(function NotificationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NotificationComponent)();
}, "NotificationComponent_Factory"));
__publicField(_NotificationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationComponent, selectors: [["app-notifications"]], decls: 3, vars: 0, consts: [[1, "toast-container", "position-fixed", "top-0", "end-0", "p-3", 2, "z-index", "9999"], ["role", "alert", "aria-live", "assertive", "aria-atomic", "true", 1, "toast", "show", 3, "ngClass"], [1, "toast-header"], [1, "rounded", "me-2", 2, "width", "20px", "height", "20px", "display", "flex", "align-items", "center", "justify-content", "center", 3, "ngClass"], [1, "fas", 2, "font-size", "12px", 3, "ngClass"], [1, "me-auto"], [1, "text-muted"], ["type", "button", "aria-label", "Close", 1, "btn-close", 3, "click"], [1, "toast-body"]], template: /* @__PURE__ */ __name(function NotificationComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275repeaterCreate(1, NotificationComponent_For_2_Template, 10, 5, "div", 1, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.notificationService.notifications$());
  }
}, "NotificationComponent_Template"), dependencies: [CommonModule, NgClass], styles: ["\n\n.toast[_ngcontent-%COMP%] {\n  min-width: 300px;\n  margin-bottom: 0.5rem;\n}\n.toast-success[_ngcontent-%COMP%]   .toast-header[_ngcontent-%COMP%] {\n  background-color: #d1e7dd;\n  border-color: #badbcc;\n}\n.toast-error[_ngcontent-%COMP%]   .toast-header[_ngcontent-%COMP%] {\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n}\n.toast-warning[_ngcontent-%COMP%]   .toast-header[_ngcontent-%COMP%] {\n  background-color: #fff3cd;\n  border-color: #ffecb5;\n}\n.toast-info[_ngcontent-%COMP%]   .toast-header[_ngcontent-%COMP%] {\n  background-color: #d1ecf1;\n  border-color: #bee5eb;\n}\n/*# sourceMappingURL=notification.component.css.map */"] }));
var NotificationComponent = _NotificationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationComponent, [{
    type: Component,
    args: [{ selector: "app-notifications", standalone: true, imports: [CommonModule], template: `
    <!-- Toast Container -->
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999;">
      @for (notification of notificationService.notifications$(); track notification.id) {
        <div 
          class="toast show"
          [ngClass]="getToastClass(notification.type)"
          role="alert" 
          aria-live="assertive" 
          aria-atomic="true"
        >
          <div class="toast-header">
            <div 
              class="rounded me-2"
              [ngClass]="getIconClass(notification.type)"
              style="width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;"
            >
              <i class="fas" [ngClass]="getIcon(notification.type)" style="font-size: 12px;"></i>
            </div>
            <strong class="me-auto">{{ notification.title }}</strong>
            <small class="text-muted">now</small>
            <button 
              type="button" 
              class="btn-close" 
              (click)="notificationService.remove(notification.id)"
              aria-label="Close"
            ></button>
          </div>
          @if (notification.message) {
            <div class="toast-body">
              {{ notification.message }}
            </div>
          }
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;dc0a349979398d6fe43a9decb2c6eb58f8884b7a6b2c8ddac56f5a2b8478c5b4;D:/Work/TimeAttendanceSystem/time-attendance-frontend/src/app/core/notifications/notification.component.ts */\n.toast {\n  min-width: 300px;\n  margin-bottom: 0.5rem;\n}\n.toast-success .toast-header {\n  background-color: #d1e7dd;\n  border-color: #badbcc;\n}\n.toast-error .toast-header {\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n}\n.toast-warning .toast-header {\n  background-color: #fff3cd;\n  border-color: #ffecb5;\n}\n.toast-info .toast-header {\n  background-color: #d1ecf1;\n  border-color: #bee5eb;\n}\n/*# sourceMappingURL=notification.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationComponent, { className: "NotificationComponent", filePath: "src/app/core/notifications/notification.component.ts", lineNumber: 73 });
})();

// src/app/core/confirmation/confirmation.component.ts
function ConfirmationComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "i");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate2("fa-solid ", ctx_r1.config().icon, " me-2 ", ctx_r1.config().iconClass));
  }
}
__name(ConfirmationComponent_Conditional_0_Conditional_5_Template, "ConfirmationComponent_Conditional_0_Conditional_5_Template");
function ConfirmationComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 1);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function ConfirmationComponent_Conditional_0_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackdropClick($event));
    }, "ConfirmationComponent_Conditional_0_Template_div_click_0_listener"));
    \u0275\u0275domElementStart(1, "div", 2);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function ConfirmationComponent_Conditional_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    }, "ConfirmationComponent_Conditional_0_Template_div_click_1_listener"));
    \u0275\u0275domElementStart(2, "div", 3)(3, "div", 4)(4, "h5", 5);
    \u0275\u0275conditionalCreate(5, ConfirmationComponent_Conditional_0_Conditional_5_Template, 1, 4, "i", 6);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "button", 7);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function ConfirmationComponent_Conditional_0_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCancel());
    }, "ConfirmationComponent_Conditional_0_Template_button_click_7_listener"));
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 8)(9, "p", 9);
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(11, "div", 10)(12, "button", 11);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function ConfirmationComponent_Conditional_0_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCancel());
    }, "ConfirmationComponent_Conditional_0_Template_button_click_12_listener"));
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "button", 11);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function ConfirmationComponent_Conditional_0_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onConfirm());
    }, "ConfirmationComponent_Conditional_0_Template_button_click_14_listener"));
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_1_0 = ctx_r1.config()) == null ? null : tmp_1_0.icon) ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx_r1.config()) == null ? null : tmp_2_0.title, " ");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.t("common.close"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_4_0 = ctx_r1.config()) == null ? null : tmp_4_0.message);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("btn ", (tmp_5_0 = ctx_r1.config()) == null ? null : tmp_5_0.cancelButtonClass));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_6_0 = ctx_r1.config()) == null ? null : tmp_6_0.cancelText, " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("btn ", (tmp_7_0 = ctx_r1.config()) == null ? null : tmp_7_0.confirmButtonClass));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_8_0 = ctx_r1.config()) == null ? null : tmp_8_0.confirmText, " ");
  }
}
__name(ConfirmationComponent_Conditional_0_Template, "ConfirmationComponent_Conditional_0_Template");
var _ConfirmationComponent = class _ConfirmationComponent {
  confirmationService = inject(ConfirmationService);
  i18n = inject(I18nService);
  config = this.confirmationService.config$;
  t(key) {
    return this.i18n.t(key);
  }
  onConfirm() {
    this.confirmationService.onConfirm();
  }
  onCancel() {
    this.confirmationService.onCancel();
  }
  onBackdropClick(event) {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
};
__name(_ConfirmationComponent, "ConfirmationComponent");
__publicField(_ConfirmationComponent, "\u0275fac", /* @__PURE__ */ __name(function ConfirmationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ConfirmationComponent)();
}, "ConfirmationComponent_Factory"));
__publicField(_ConfirmationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmationComponent, selectors: [["app-confirmation"]], decls: 1, vars: 1, consts: [["tabindex", "-1", 1, "modal", "fade", "show", "d-block", 2, "background-color", "rgba(0,0,0,0.5)"], ["tabindex", "-1", 1, "modal", "fade", "show", "d-block", 2, "background-color", "rgba(0,0,0,0.5)", 3, "click"], [1, "modal-dialog", "modal-dialog-centered", 3, "click"], [1, "modal-content"], [1, "modal-header"], [1, "modal-title", "d-flex", "align-items-center"], [3, "class"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], [1, "mb-0"], [1, "modal-footer"], ["type", "button", 3, "click"]], template: /* @__PURE__ */ __name(function ConfirmationComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ConfirmationComponent_Conditional_0_Template, 16, 12, "div", 0);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.confirmationService.isVisible$() ? 0 : -1);
  }
}, "ConfirmationComponent_Template"), styles: ["\n\n.modal[_ngcontent-%COMP%] {\n  z-index: 1055;\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  max-width: 500px;\n}\n.modal-content[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n}\n.modal-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #dee2e6;\n  padding: 1rem 1.5rem;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  border-top: 1px solid #dee2e6;\n  padding: 1rem 1.5rem;\n  gap: 0.5rem;\n}\n.btn[_ngcontent-%COMP%] {\n  min-width: 80px;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n}\n.modal.show[_ngcontent-%COMP%]   .modal-dialog[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_modalSlideIn 0.2s ease-out;\n}\n@keyframes _ngcontent-%COMP%_modalSlideIn {\n  from {\n    transform: translateY(-50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=confirmation.component.css.map */"] }));
var ConfirmationComponent = _ConfirmationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmationComponent, [{
    type: Component,
    args: [{ selector: "app-confirmation", standalone: true, imports: [], template: `
    @if (confirmationService.isVisible$()) {
      <!-- Modal Backdrop -->
      <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);" (click)="onBackdropClick($event)">
        <div class="modal-dialog modal-dialog-centered" (click)="$event.stopPropagation()">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h5 class="modal-title d-flex align-items-center">
                @if (config()?.icon) {
                  <i class="fa-solid {{ config()!.icon }} me-2 {{ config()!.iconClass }}"></i>
                }
                {{ config()?.title }}
              </h5>
              <button 
                type="button" 
                class="btn-close" 
                (click)="onCancel()"
                [attr.aria-label]="t('common.close')"
              ></button>
            </div>
            
            <!-- Modal Body -->
            <div class="modal-body">
              <p class="mb-0">{{ config()?.message }}</p>
            </div>
            
            <!-- Modal Footer -->
            <div class="modal-footer">
              <button 
                type="button" 
                class="btn {{ config()?.cancelButtonClass }}" 
                (click)="onCancel()"
              >
                {{ config()?.cancelText }}
              </button>
              <button 
                type="button" 
                class="btn {{ config()?.confirmButtonClass }}" 
                (click)="onConfirm()"
              >
                {{ config()?.confirmText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `, styles: ["/* angular:styles/component:css;7e28eb86a8dfc30e04c006fdd5115121caa68146d4aae8c4a96c8e82f4696d0a;D:/Work/TimeAttendanceSystem/time-attendance-frontend/src/app/core/confirmation/confirmation.component.ts */\n.modal {\n  z-index: 1055;\n}\n.modal-dialog {\n  max-width: 500px;\n}\n.modal-content {\n  border: none;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n}\n.modal-header {\n  border-bottom: 1px solid #dee2e6;\n  padding: 1rem 1.5rem;\n}\n.modal-body {\n  padding: 1.5rem;\n}\n.modal-footer {\n  border-top: 1px solid #dee2e6;\n  padding: 1rem 1.5rem;\n  gap: 0.5rem;\n}\n.btn {\n  min-width: 80px;\n}\n.modal-title {\n  font-weight: 600;\n  color: #333;\n}\n.modal.show .modal-dialog {\n  animation: modalSlideIn 0.2s ease-out;\n}\n@keyframes modalSlideIn {\n  from {\n    transform: translateY(-50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=confirmation.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmationComponent, { className: "ConfirmationComponent", filePath: "src/app/core/confirmation/confirmation.component.ts", lineNumber: 114 });
})();

// src/app/layout/layout.component.ts
function LayoutComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function LayoutComponent_Conditional_7_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCloseMobileSidenav());
    }, "LayoutComponent_Conditional_7_Template_div_click_0_listener"));
    \u0275\u0275elementEnd();
  }
}
__name(LayoutComponent_Conditional_7_Template, "LayoutComponent_Conditional_7_Template");
var _LayoutComponent = class _LayoutComponent {
  sidenavCollapsed = signal(false, ...ngDevMode ? [{ debugName: "sidenavCollapsed" }] : []);
  showMobileSidenav = signal(false, ...ngDevMode ? [{ debugName: "showMobileSidenav" }] : []);
  isMobile = signal(false, ...ngDevMode ? [{ debugName: "isMobile" }] : []);
  destroy$ = new Subject();
  ngOnInit() {
    this.checkScreenSize();
    fromEvent(window, "resize").pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.checkScreenSize();
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  checkScreenSize() {
    const isMobile = window.innerWidth < 768;
    this.isMobile.set(isMobile);
    if (isMobile) {
      this.sidenavCollapsed.set(false);
      this.showMobileSidenav.set(false);
    } else {
      this.showMobileSidenav.set(false);
    }
  }
  onToggleSidenav() {
    if (this.isMobile()) {
      this.showMobileSidenav.update((show) => !show);
    } else {
      this.sidenavCollapsed.update((collapsed) => !collapsed);
    }
  }
  onCloseMobileSidenav() {
    if (this.isMobile()) {
      this.showMobileSidenav.set(false);
    }
  }
};
__name(_LayoutComponent, "LayoutComponent");
__publicField(_LayoutComponent, "\u0275fac", /* @__PURE__ */ __name(function LayoutComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LayoutComponent)();
}, "LayoutComponent_Factory"));
__publicField(_LayoutComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LayoutComponent, selectors: [["app-layout"]], decls: 10, vars: 11, consts: [[1, "layout-container"], [3, "collapsed"], [1, "main-content"], [3, "toggleSidenav", "sidenavCollapsed"], [1, "page-content"], [1, "container-fluid"], [1, "mobile-backdrop"], [1, "mobile-backdrop", 3, "click"]], template: /* @__PURE__ */ __name(function LayoutComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-sidenav", 1);
    \u0275\u0275elementStart(2, "div", 2)(3, "app-topbar", 3);
    \u0275\u0275listener("toggleSidenav", /* @__PURE__ */ __name(function LayoutComponent_Template_app_topbar_toggleSidenav_3_listener() {
      return ctx.onToggleSidenav();
    }, "LayoutComponent_Template_app_topbar_toggleSidenav_3_listener"));
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "main", 4)(5, "div", 5);
    \u0275\u0275element(6, "router-outlet");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(7, LayoutComponent_Conditional_7_Template, 1, 0, "div", 6);
    \u0275\u0275element(8, "app-notifications")(9, "app-confirmation");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275classProp("show", ctx.showMobileSidenav())("mobile", ctx.isMobile());
    \u0275\u0275property("collapsed", ctx.sidenavCollapsed);
    \u0275\u0275advance();
    \u0275\u0275classProp("sidenav-collapsed", ctx.sidenavCollapsed() && !ctx.isMobile())("mobile", ctx.isMobile());
    \u0275\u0275advance();
    \u0275\u0275property("sidenavCollapsed", ctx.sidenavCollapsed);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx.isMobile() && ctx.showMobileSidenav() ? 7 : -1);
  }
}, "LayoutComponent_Template"), dependencies: [RouterOutlet, SidenavComponent, TopbarComponent, NotificationComponent, ConfirmationComponent], styles: ["\n\n.layout-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n}\n.main-content[_ngcontent-%COMP%] {\n  margin-left: 250px;\n  min-height: 100vh;\n  transition: margin-left 0.3s ease;\n}\n.main-content.sidenav-collapsed[_ngcontent-%COMP%] {\n  margin-left: 72px;\n}\n.main-content.mobile[_ngcontent-%COMP%] {\n  margin-left: 0;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding-top: 60px;\n  padding-bottom: 2rem;\n  min-height: calc(100vh - 60px);\n}\n.page-content[_ngcontent-%COMP%]   .container-fluid[_ngcontent-%COMP%] {\n  padding: 2rem 1rem;\n}\n.mobile-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .main-content[_ngcontent-%COMP%] {\n  margin-left: 0 !important;\n  margin-right: 250px !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .main-content.sidenav-collapsed[_ngcontent-%COMP%] {\n  margin-right: 72px !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .main-content.mobile[_ngcontent-%COMP%] {\n  margin-right: 0 !important;\n}\n@media (max-width: 767.98px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  [_ngcontent-%COMP%]:root[dir=rtl]   .main-content[_ngcontent-%COMP%] {\n    margin-right: 0 !important;\n  }\n  .page-content[_ngcontent-%COMP%]   .container-fluid[_ngcontent-%COMP%] {\n    padding: 1rem 0.75rem;\n  }\n}\n/*# sourceMappingURL=layout.component.css.map */"] }));
var LayoutComponent = _LayoutComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutComponent, [{
    type: Component,
    args: [{ selector: "app-layout", standalone: true, imports: [RouterOutlet, SidenavComponent, TopbarComponent, NotificationComponent, ConfirmationComponent], template: '<div class="layout-container">\r\n  <!-- Sidenav -->\r\n  <app-sidenav \r\n    [collapsed]="sidenavCollapsed"\r\n    [class.show]="showMobileSidenav()"\r\n    [class.mobile]="isMobile()">\r\n  </app-sidenav>\r\n\r\n  <!-- Main content area -->\r\n  <div class="main-content" \r\n       [class.sidenav-collapsed]="sidenavCollapsed() && !isMobile()"\r\n       [class.mobile]="isMobile()">\r\n    \r\n    <!-- Topbar -->\r\n    <app-topbar \r\n      [sidenavCollapsed]="sidenavCollapsed"\r\n      (toggleSidenav)="onToggleSidenav()">\r\n    </app-topbar>\r\n\r\n    <!-- Page content -->\r\n    <main class="page-content">\r\n      <div class="container-fluid">\r\n        <router-outlet></router-outlet>\r\n      </div>\r\n    </main>\r\n  </div>\r\n\r\n  <!-- Mobile backdrop -->\r\n  @if (isMobile() && showMobileSidenav()) {\r\n    <div class="mobile-backdrop" (click)="onCloseMobileSidenav()"></div>\r\n  }\r\n\r\n  <!-- Notifications -->\r\n  <app-notifications></app-notifications>\r\n\r\n  <!-- Confirmation Modal -->\r\n  <app-confirmation></app-confirmation>\r\n</div>', styles: ["/* src/app/layout/layout.component.css */\n.layout-container {\n  position: relative;\n  min-height: 100vh;\n}\n.main-content {\n  margin-left: 250px;\n  min-height: 100vh;\n  transition: margin-left 0.3s ease;\n}\n.main-content.sidenav-collapsed {\n  margin-left: 72px;\n}\n.main-content.mobile {\n  margin-left: 0;\n}\n.page-content {\n  padding-top: 60px;\n  padding-bottom: 2rem;\n  min-height: calc(100vh - 60px);\n}\n.page-content .container-fluid {\n  padding: 2rem 1rem;\n}\n.mobile-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n:root[dir=rtl] .main-content {\n  margin-left: 0 !important;\n  margin-right: 250px !important;\n}\n:root[dir=rtl] .main-content.sidenav-collapsed {\n  margin-right: 72px !important;\n}\n:root[dir=rtl] .main-content.mobile {\n  margin-right: 0 !important;\n}\n@media (max-width: 767.98px) {\n  .main-content {\n    margin-left: 0;\n  }\n  :root[dir=rtl] .main-content {\n    margin-right: 0 !important;\n  }\n  .page-content .container-fluid {\n    padding: 1rem 0.75rem;\n  }\n}\n/*# sourceMappingURL=layout.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LayoutComponent, { className: "LayoutComponent", filePath: "src/app/layout/layout.component.ts", lineNumber: 17 });
})();
export {
  LayoutComponent
};
//# sourceMappingURL=chunk-HZHKNKT7.js.map
