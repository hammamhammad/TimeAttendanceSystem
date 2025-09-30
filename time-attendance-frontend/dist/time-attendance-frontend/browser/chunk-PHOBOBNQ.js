import {
  ConfirmationService
} from "./chunk-OJL2NUV4.js";
import {
  PermissionService
} from "./chunk-DKGIYIS4.js";
import {
  NotificationService
} from "./chunk-TDD355PI.js";
import {
  AuthService
} from "./chunk-IL4NCC2P.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  Injectable,
  Input,
  NavigationEnd,
  NgClass,
  Output,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  Subject,
  computed,
  filter,
  fromEvent,
  inject,
  map,
  setClassMetadata,
  signal,
  takeUntil,
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
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField,
  __spreadValues
} from "./chunk-EUAPD56R.js";

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
      permission: "employee.read"
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
          icon: "fa-solid fa-cogs",
          permission: "settings.excusePolicy.read"
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
}, "SidenavComponent_Template"), dependencies: [CommonModule, RouterModule, RouterLink, RouterLinkActive], styles: ["\n\n.sidenav[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100vh;\n  width: 250px;\n  background-color: var(--bs-dark);\n  color: var(--bs-light);\n  transition: width 0.3s ease;\n  z-index: 1000;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.sidenav.collapsed[_ngcontent-%COMP%] {\n  width: 72px;\n}\n.sidenav-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  min-height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.sidenav-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  color: var(--bs-light);\n  font-weight: 600;\n}\n.nav-link[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n  padding: 0.75rem 1rem;\n  border-radius: 0;\n  transition: all 0.2s ease;\n  border-left: 3px solid transparent;\n}\n.nav-link[_ngcontent-%COMP%]:hover {\n  color: var(--bs-light);\n  background-color: rgba(255, 255, 255, 0.1);\n}\n.nav-link.active[_ngcontent-%COMP%] {\n  color: var(--bs-light);\n  background-color: rgba(255, 255, 255, 0.1);\n  border-left-color: var(--bs-primary);\n}\n.nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 20px;\n  text-align: center;\n  flex-shrink: 0;\n}\n.collapsed[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.collapsed[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 0 !important;\n}\n.submenu[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.1);\n  border-radius: 0.25rem;\n  margin-top: 0.25rem;\n  margin-bottom: 0.25rem;\n}\n.submenu[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem 0.5rem 2.5rem;\n  font-size: 0.875rem;\n  border-left: none;\n}\n.submenu[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.submenu[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%] {\n  background-color: rgba(255, 255, 255, 0.15);\n  border-left: 3px solid var(--bs-primary);\n}\n.rotate-180[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .submenu[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  padding-left: 1rem;\n  padding-right: 2.5rem;\n  border-left: none;\n  border-right: none;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .submenu[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%] {\n  border-right: 3px solid var(--bs-primary);\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .sidenav[_ngcontent-%COMP%] {\n  left: auto !important;\n  right: 0 !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .nav-link[_ngcontent-%COMP%] {\n  border-left: none;\n  border-right: 3px solid transparent;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .nav-link.active[_ngcontent-%COMP%] {\n  border-right-color: var(--bs-primary);\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .me-2[_ngcontent-%COMP%] {\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n}\n@media (max-width: 767.98px) {\n  .sidenav[_ngcontent-%COMP%] {\n    transform: translateX(-100%);\n    transition: transform 0.3s ease;\n  }\n  .sidenav.show[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n  [_ngcontent-%COMP%]:root[dir=rtl]   .sidenav[_ngcontent-%COMP%] {\n    transform: translateX(100%) !important;\n  }\n  [_ngcontent-%COMP%]:root[dir=rtl]   .sidenav.show[_ngcontent-%COMP%] {\n    transform: translateX(0) !important;\n  }\n}\n/*# sourceMappingURL=sidenav.component.css.map */"] }));
var SidenavComponent = _SidenavComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidenavComponent, [{
    type: Component,
    args: [{ selector: "app-sidenav", standalone: true, imports: [CommonModule, RouterModule], template: `<nav class="sidenav"
     [class.collapsed]="collapsed()"
     [attr.aria-expanded]="!collapsed()">

  <div class="sidenav-header p-3">
    @if (!collapsed()) {
      <h5 class="text-truncate mb-0">Time Attendance</h5>
    } @else {
      <i class="fa-solid fa-clock fa-lg"></i>
    }
  </div>

  <ul class="nav flex-column mt-2">
    @for (item of menuItems(); track item.path) {
      @if (hasParentMenuPermission(item)) {
        <li class="nav-item">
          <!-- Parent menu item -->
          @if (item.children && item.children.length > 0) {
            <!-- Menu item with children -->
            <a class="nav-link d-flex align-items-center justify-content-between"
               [class.active]="isParentActive(item)"
               (click)="toggleSubmenu(item.path)"
               style="cursor: pointer"
               [title]="collapsed() ? t(item.titleKey) : ''">
              <div class="d-flex align-items-center">
                <i class="{{ item.icon }} me-2"></i>
                @if (!collapsed()) {
                  <span class="text-truncate">{{ t(item.titleKey) }}</span>
                }
              </div>
              @if (!collapsed() && hasVisibleChildren(item)) {
                <i class="fas fa-chevron-down"
                   [class.rotate-180]="isSubmenuOpen(item.path)"
                   style="transition: transform 0.2s ease;"></i>
              }
            </a>
            <!-- Submenu -->
            @if (!collapsed() && isSubmenuOpen(item.path) && hasVisibleChildren(item)) {
              <ul class="nav flex-column submenu ms-3">
                @for (child of item.children; track child.path) {
                  @if (hasChildMenuPermission(child)) {
                    <li class="nav-item">
                      <a class="nav-link d-flex align-items-center"
                         [routerLink]="child.path"
                         routerLinkActive="active"
                         [title]="t(child.titleKey)">
                        <i class="{{ child.icon }} me-2"></i>
                        <span class="text-truncate">{{ t(child.titleKey) }}</span>
                      </a>
                    </li>
                  }
                }
              </ul>
            }
          } @else {
            <!-- Simple menu item without children -->
            <a class="nav-link d-flex align-items-center"
               [routerLink]="item.path"
               routerLinkActive="active"
               [title]="collapsed() ? t(item.titleKey) : ''">
              <i class="{{ item.icon }} me-2"></i>
              @if (!collapsed()) {
                <span class="text-truncate">{{ t(item.titleKey) }}</span>
              }
            </a>
          }
        </li>
      }
    }
  </ul>
</nav>`, styles: ["/* src/app/layout/sidenav/sidenav.component.css */\n.sidenav {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100vh;\n  width: 250px;\n  background-color: var(--bs-dark);\n  color: var(--bs-light);\n  transition: width 0.3s ease;\n  z-index: 1000;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.sidenav.collapsed {\n  width: 72px;\n}\n.sidenav-header {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  min-height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.sidenav-header h5 {\n  color: var(--bs-light);\n  font-weight: 600;\n}\n.nav-link {\n  color: rgba(255, 255, 255, 0.8);\n  padding: 0.75rem 1rem;\n  border-radius: 0;\n  transition: all 0.2s ease;\n  border-left: 3px solid transparent;\n}\n.nav-link:hover {\n  color: var(--bs-light);\n  background-color: rgba(255, 255, 255, 0.1);\n}\n.nav-link.active {\n  color: var(--bs-light);\n  background-color: rgba(255, 255, 255, 0.1);\n  border-left-color: var(--bs-primary);\n}\n.nav-link i {\n  width: 20px;\n  text-align: center;\n  flex-shrink: 0;\n}\n.collapsed .nav-link {\n  justify-content: center;\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.collapsed .nav-link i {\n  margin-right: 0 !important;\n}\n.submenu {\n  background-color: rgba(0, 0, 0, 0.1);\n  border-radius: 0.25rem;\n  margin-top: 0.25rem;\n  margin-bottom: 0.25rem;\n}\n.submenu .nav-link {\n  padding: 0.5rem 1rem 0.5rem 2.5rem;\n  font-size: 0.875rem;\n  border-left: none;\n}\n.submenu .nav-link:hover {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.submenu .nav-link.active {\n  background-color: rgba(255, 255, 255, 0.15);\n  border-left: 3px solid var(--bs-primary);\n}\n.rotate-180 {\n  transform: rotate(180deg);\n}\n:root[dir=rtl] .submenu .nav-link {\n  padding-left: 1rem;\n  padding-right: 2.5rem;\n  border-left: none;\n  border-right: none;\n}\n:root[dir=rtl] .submenu .nav-link.active {\n  border-right: 3px solid var(--bs-primary);\n}\n:root[dir=rtl] .sidenav {\n  left: auto !important;\n  right: 0 !important;\n}\n:root[dir=rtl] .nav-link {\n  border-left: none;\n  border-right: 3px solid transparent;\n}\n:root[dir=rtl] .nav-link.active {\n  border-right-color: var(--bs-primary);\n}\n:root[dir=rtl] .me-2 {\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n}\n@media (max-width: 767.98px) {\n  .sidenav {\n    transform: translateX(-100%);\n    transition: transform 0.3s ease;\n  }\n  .sidenav.show {\n    transform: translateX(0);\n  }\n  :root[dir=rtl] .sidenav {\n    transform: translateX(100%) !important;\n  }\n  :root[dir=rtl] .sidenav.show {\n    transform: translateX(0) !important;\n  }\n}\n/*# sourceMappingURL=sidenav.component.css.map */\n"] }]
  }], null, { collapsed: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidenavComponent, { className: "SidenavComponent", filePath: "src/app/layout/sidenav/sidenav.component.ts", lineNumber: 15 });
})();

// src/app/layout/topbar/topbar.component.ts
function TopbarComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "ul", 15)(1, "li")(2, "a", 17);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function TopbarComponent_Conditional_18_Template_a_click_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.preventDefault());
    }, "TopbarComponent_Conditional_18_Template_a_click_2_listener"));
    \u0275\u0275domElement(3, "i", 18);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(5, "li")(6, "a", 17);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function TopbarComponent_Conditional_18_Template_a_click_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.preventDefault());
    }, "TopbarComponent_Conditional_18_Template_a_click_6_listener"));
    \u0275\u0275domElement(7, "i", 19);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "li");
    \u0275\u0275domElement(10, "hr", 20);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "li")(12, "a", 21);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function TopbarComponent_Conditional_18_Template_a_click_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.onLogout());
    }, "TopbarComponent_Conditional_18_Template_a_click_12_listener"));
    \u0275\u0275domElement(13, "i", 22);
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd()()();
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
__name(TopbarComponent_Conditional_18_Template, "TopbarComponent_Conditional_18_Template");
function TopbarComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 23);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function TopbarComponent_Conditional_19_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClickOutside());
    }, "TopbarComponent_Conditional_19_Template_div_click_0_listener"));
    \u0275\u0275domElementEnd();
  }
}
__name(TopbarComponent_Conditional_19_Template, "TopbarComponent_Conditional_19_Template");
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
__publicField(_TopbarComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TopbarComponent, selectors: [["app-topbar"]], inputs: { sidenavCollapsed: "sidenavCollapsed" }, outputs: { toggleSidenav: "toggleSidenav" }, decls: 20, vars: 13, consts: [[1, "topbar"], [1, "topbar-content"], [1, "topbar-left"], ["type", "button", 1, "btn", "btn-link", "topbar-btn", 3, "click"], [1, "fa-solid", "fa-bars"], [1, "topbar-center"], [1, "page-title", "mb-0"], [1, "topbar-right"], ["type", "button", 1, "btn", "btn-link", "topbar-btn", "me-2", 3, "click"], [1, "fa-solid", "fa-globe"], [1, "d-none", "d-md-inline", "ms-1"], [1, "dropdown"], ["type", "button", 1, "btn", "btn-link", "topbar-btn", "dropdown-toggle", 3, "click"], [1, "fa-solid", "fa-user", "me-1"], [1, "d-none", "d-md-inline"], [1, "dropdown-menu", "dropdown-menu-end", "show"], [1, "dropdown-backdrop"], ["href", "#", 1, "dropdown-item", 3, "click"], [1, "fa-solid", "fa-user", "me-2"], [1, "fa-solid", "fa-cog", "me-2"], [1, "dropdown-divider"], ["href", "#", 1, "dropdown-item", "text-danger", 3, "click"], [1, "fa-solid", "fa-sign-out-alt", "me-2"], [1, "dropdown-backdrop", 3, "click"]], template: /* @__PURE__ */ __name(function TopbarComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function TopbarComponent_Template_button_click_3_listener() {
      return ctx.onToggleSidenav();
    }, "TopbarComponent_Template_button_click_3_listener"));
    \u0275\u0275domElement(4, "i", 4);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(5, "div", 5)(6, "h1", 6);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 7)(9, "button", 8);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function TopbarComponent_Template_button_click_9_listener() {
      return ctx.onSwitchLanguage();
    }, "TopbarComponent_Template_button_click_9_listener"));
    \u0275\u0275domElement(10, "i", 9);
    \u0275\u0275domElementStart(11, "span", 10);
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(13, "div", 11)(14, "button", 12);
    \u0275\u0275domListener("click", /* @__PURE__ */ __name(function TopbarComponent_Template_button_click_14_listener() {
      return ctx.onToggleUserMenu();
    }, "TopbarComponent_Template_button_click_14_listener"));
    \u0275\u0275domElement(15, "i", 13);
    \u0275\u0275domElementStart(16, "span", 14);
    \u0275\u0275text(17);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(18, TopbarComponent_Conditional_18_Template, 15, 3, "ul", 15);
    \u0275\u0275domElementEnd()()()();
    \u0275\u0275conditionalCreate(19, TopbarComponent_Conditional_19_Template, 1, 0, "div", 16);
  }
  if (rf & 2) {
    let tmp_8_0;
    \u0275\u0275classProp("sidenav-collapsed", ctx.sidenavCollapsed());
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-label", ctx.t("nav.toggle_menu"))("aria-expanded", !ctx.sidenavCollapsed());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.pageTitle());
    \u0275\u0275advance(2);
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
    \u0275\u0275conditional(ctx.showUserMenu() ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showUserMenu() ? 19 : -1);
  }
}, "TopbarComponent_Template"), dependencies: [CommonModule], styles: ["\n\n.topbar[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 250px;\n  right: 0;\n  height: 60px;\n  background-color: var(--bs-white);\n  border-bottom: 1px solid var(--bs-border-color);\n  z-index: 999;\n  transition: left 0.3s ease;\n}\n.topbar.sidenav-collapsed[_ngcontent-%COMP%] {\n  left: 72px;\n}\n.topbar-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 100%;\n  padding: 0 1rem;\n}\n.topbar-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  min-width: 60px;\n}\n.topbar-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  min-width: 200px;\n}\n.topbar-center[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n  margin: 0 1rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--bs-dark);\n}\n.topbar-btn[_ngcontent-%COMP%] {\n  color: var(--bs-secondary);\n  padding: 0.5rem;\n  border: none;\n  background: none;\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\n.topbar-btn[_ngcontent-%COMP%]:hover, \n.topbar-btn[_ngcontent-%COMP%]:focus {\n  color: var(--bs-primary);\n  text-decoration: none;\n}\n.dropdown[_ngcontent-%COMP%] {\n  position: relative;\n}\n.dropdown-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  z-index: 1000;\n  min-width: 200px;\n  margin-top: 0.5rem;\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.375rem;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.dropdown-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 998;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .topbar[_ngcontent-%COMP%] {\n  left: 0 !important;\n  right: 250px !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .topbar.sidenav-collapsed[_ngcontent-%COMP%] {\n  right: 72px !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .topbar-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .dropdown-menu[_ngcontent-%COMP%] {\n  left: 0;\n  right: auto;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .me-1[_ngcontent-%COMP%] {\n  margin-left: 0.25rem !important;\n  margin-right: 0 !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .me-2[_ngcontent-%COMP%] {\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .ms-1[_ngcontent-%COMP%] {\n  margin-right: 0.25rem !important;\n  margin-left: 0 !important;\n}\n@media (max-width: 767.98px) {\n  .topbar[_ngcontent-%COMP%] {\n    left: 0 !important;\n    right: 0 !important;\n  }\n  [_ngcontent-%COMP%]:root[dir=rtl]   .topbar[_ngcontent-%COMP%] {\n    left: 0 !important;\n    right: 0 !important;\n  }\n  .topbar-left[_ngcontent-%COMP%] {\n    display: flex;\n  }\n  .page-title[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n}\n/*# sourceMappingURL=topbar.component.css.map */"] }));
var TopbarComponent = _TopbarComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TopbarComponent, [{
    type: Component,
    args: [{ selector: "app-topbar", standalone: true, imports: [CommonModule], template: `<header class="topbar" [class.sidenav-collapsed]="sidenavCollapsed()">
  <div class="topbar-content">
    <!-- Left section: Menu toggle -->
    <div class="topbar-left">
      <button class="btn btn-link topbar-btn" 
              type="button"
              (click)="onToggleSidenav()"
              [attr.aria-label]="t('nav.toggle_menu')"
              [attr.aria-expanded]="!sidenavCollapsed()">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>

    <!-- Center section: Page title -->
    <div class="topbar-center">
      <h1 class="page-title mb-0">{{ pageTitle() }}</h1>
    </div>

    <!-- Right section: User menu and language switch -->
    <div class="topbar-right">
      <!-- Language switch -->
      <button class="btn btn-link topbar-btn me-2" 
              type="button"
              (click)="onSwitchLanguage()"
              [attr.aria-label]="t('settings.language')">
        <i class="fa-solid fa-globe"></i>
        <span class="d-none d-md-inline ms-1">
          {{ currentLocale() === 'en' ? '\u0639\u0631\u0628\u064A' : 'English' }}
        </span>
      </button>

      <!-- User menu -->
      <div class="dropdown" 
           [class.show]="showUserMenu()">
        <button class="btn btn-link topbar-btn dropdown-toggle" 
                type="button"
                (click)="onToggleUserMenu()"
                [attr.aria-expanded]="showUserMenu()">
          <i class="fa-solid fa-user me-1"></i>
          <span class="d-none d-md-inline">{{ currentUser()?.username }}</span>
        </button>
        
        @if (showUserMenu()) {
          <ul class="dropdown-menu dropdown-menu-end show">
            <li>
              <a class="dropdown-item" href="#" (click)="$event.preventDefault()">
                <i class="fa-solid fa-user me-2"></i>
                {{ t('settings.profile') }}
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#" (click)="$event.preventDefault()">
                <i class="fa-solid fa-cog me-2"></i>
                {{ t('nav.settings') }}
              </a>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <a class="dropdown-item text-danger" 
                 href="#" 
                 (click)="$event.preventDefault(); onLogout()">
                <i class="fa-solid fa-sign-out-alt me-2"></i>
                {{ t('nav.logout') }}
              </a>
            </li>
          </ul>
        }
      </div>
    </div>
  </div>
</header>

<!-- Backdrop for mobile menu -->
@if (showUserMenu()) {
  <div class="dropdown-backdrop" (click)="onClickOutside()"></div>
}`, styles: ["/* src/app/layout/topbar/topbar.component.css */\n.topbar {\n  position: fixed;\n  top: 0;\n  left: 250px;\n  right: 0;\n  height: 60px;\n  background-color: var(--bs-white);\n  border-bottom: 1px solid var(--bs-border-color);\n  z-index: 999;\n  transition: left 0.3s ease;\n}\n.topbar.sidenav-collapsed {\n  left: 72px;\n}\n.topbar-content {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 100%;\n  padding: 0 1rem;\n}\n.topbar-left {\n  display: flex;\n  align-items: center;\n  min-width: 60px;\n}\n.topbar-right {\n  display: flex;\n  align-items: center;\n  min-width: 200px;\n}\n.topbar-center {\n  flex: 1;\n  text-align: center;\n  margin: 0 1rem;\n}\n.page-title {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--bs-dark);\n}\n.topbar-btn {\n  color: var(--bs-secondary);\n  padding: 0.5rem;\n  border: none;\n  background: none;\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\n.topbar-btn:hover,\n.topbar-btn:focus {\n  color: var(--bs-primary);\n  text-decoration: none;\n}\n.dropdown {\n  position: relative;\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  z-index: 1000;\n  min-width: 200px;\n  margin-top: 0.5rem;\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.375rem;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n}\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 998;\n}\n:root[dir=rtl] .topbar {\n  left: 0 !important;\n  right: 250px !important;\n}\n:root[dir=rtl] .topbar.sidenav-collapsed {\n  right: 72px !important;\n}\n:root[dir=rtl] .topbar-center {\n  text-align: center;\n}\n:root[dir=rtl] .dropdown-menu {\n  left: 0;\n  right: auto;\n}\n:root[dir=rtl] .me-1 {\n  margin-left: 0.25rem !important;\n  margin-right: 0 !important;\n}\n:root[dir=rtl] .me-2 {\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n}\n:root[dir=rtl] .ms-1 {\n  margin-right: 0.25rem !important;\n  margin-left: 0 !important;\n}\n@media (max-width: 767.98px) {\n  .topbar {\n    left: 0 !important;\n    right: 0 !important;\n  }\n  :root[dir=rtl] .topbar {\n    left: 0 !important;\n    right: 0 !important;\n  }\n  .topbar-left {\n    display: flex;\n  }\n  .page-title {\n    font-size: 1.1rem;\n  }\n}\n/*# sourceMappingURL=topbar.component.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: I18nService }, { type: Router }], { sidenavCollapsed: [{
    type: Input
  }], toggleSidenav: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TopbarComponent, { className: "TopbarComponent", filePath: "src/app/layout/topbar/topbar.component.ts", lineNumber: 15 });
})();

// src/app/core/notifications/notification.component.ts
var _forTrack02 = /* @__PURE__ */ __name(($index, $item) => $item.id, "_forTrack0");
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
    \u0275\u0275repeaterCreate(1, NotificationComponent_For_2_Template, 10, 5, "div", 1, _forTrack02);
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
  `, styles: ["/* angular:styles/component:css;dc0a349979398d6fe43a9decb2c6eb58f8884b7a6b2c8ddac56f5a2b8478c5b4;D:/Work/AI Code/TimeAttendanceSystem/time-attendance-frontend/src/app/core/notifications/notification.component.ts */\n.toast {\n  min-width: 300px;\n  margin-bottom: 0.5rem;\n}\n.toast-success .toast-header {\n  background-color: #d1e7dd;\n  border-color: #badbcc;\n}\n.toast-error .toast-header {\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n}\n.toast-warning .toast-header {\n  background-color: #fff3cd;\n  border-color: #ffecb5;\n}\n.toast-info .toast-header {\n  background-color: #d1ecf1;\n  border-color: #bee5eb;\n}\n/*# sourceMappingURL=notification.component.css.map */\n"] }]
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
}, "ConfirmationComponent_Template"), dependencies: [CommonModule], styles: ["\n\n.modal[_ngcontent-%COMP%] {\n  z-index: 1055;\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  max-width: 500px;\n}\n.modal-content[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n}\n.modal-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #dee2e6;\n  padding: 1rem 1.5rem;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  border-top: 1px solid #dee2e6;\n  padding: 1rem 1.5rem;\n  gap: 0.5rem;\n}\n.btn[_ngcontent-%COMP%] {\n  min-width: 80px;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n}\n.modal.show[_ngcontent-%COMP%]   .modal-dialog[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_modalSlideIn 0.2s ease-out;\n}\n@keyframes _ngcontent-%COMP%_modalSlideIn {\n  from {\n    transform: translateY(-50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=confirmation.component.css.map */"] }));
var ConfirmationComponent = _ConfirmationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmationComponent, [{
    type: Component,
    args: [{ selector: "app-confirmation", standalone: true, imports: [CommonModule], template: `
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
  `, styles: ["/* angular:styles/component:css;7e28eb86a8dfc30e04c006fdd5115121caa68146d4aae8c4a96c8e82f4696d0a;D:/Work/AI Code/TimeAttendanceSystem/time-attendance-frontend/src/app/core/confirmation/confirmation.component.ts */\n.modal {\n  z-index: 1055;\n}\n.modal-dialog {\n  max-width: 500px;\n}\n.modal-content {\n  border: none;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n}\n.modal-header {\n  border-bottom: 1px solid #dee2e6;\n  padding: 1rem 1.5rem;\n}\n.modal-body {\n  padding: 1.5rem;\n}\n.modal-footer {\n  border-top: 1px solid #dee2e6;\n  padding: 1rem 1.5rem;\n  gap: 0.5rem;\n}\n.btn {\n  min-width: 80px;\n}\n.modal-title {\n  font-weight: 600;\n  color: #333;\n}\n.modal.show .modal-dialog {\n  animation: modalSlideIn 0.2s ease-out;\n}\n@keyframes modalSlideIn {\n  from {\n    transform: translateY(-50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=confirmation.component.css.map */\n"] }]
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
}, "LayoutComponent_Template"), dependencies: [CommonModule, RouterOutlet, SidenavComponent, TopbarComponent, NotificationComponent, ConfirmationComponent], styles: ["\n\n.layout-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n}\n.main-content[_ngcontent-%COMP%] {\n  margin-left: 250px;\n  min-height: 100vh;\n  transition: margin-left 0.3s ease;\n}\n.main-content.sidenav-collapsed[_ngcontent-%COMP%] {\n  margin-left: 72px;\n}\n.main-content.mobile[_ngcontent-%COMP%] {\n  margin-left: 0;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding-top: 60px;\n  padding-bottom: 2rem;\n  min-height: calc(100vh - 60px);\n}\n.page-content[_ngcontent-%COMP%]   .container-fluid[_ngcontent-%COMP%] {\n  padding: 2rem 1rem;\n}\n.mobile-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .main-content[_ngcontent-%COMP%] {\n  margin-left: 0 !important;\n  margin-right: 250px !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .main-content.sidenav-collapsed[_ngcontent-%COMP%] {\n  margin-right: 72px !important;\n}\n[_ngcontent-%COMP%]:root[dir=rtl]   .main-content.mobile[_ngcontent-%COMP%] {\n  margin-right: 0 !important;\n}\n@media (max-width: 767.98px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n  [_ngcontent-%COMP%]:root[dir=rtl]   .main-content[_ngcontent-%COMP%] {\n    margin-right: 0 !important;\n  }\n  .page-content[_ngcontent-%COMP%]   .container-fluid[_ngcontent-%COMP%] {\n    padding: 1rem 0.75rem;\n  }\n}\n/*# sourceMappingURL=layout.component.css.map */"] }));
var LayoutComponent = _LayoutComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutComponent, [{
    type: Component,
    args: [{ selector: "app-layout", standalone: true, imports: [CommonModule, RouterOutlet, SidenavComponent, TopbarComponent, NotificationComponent, ConfirmationComponent], template: '<div class="layout-container">\n  <!-- Sidenav -->\n  <app-sidenav \n    [collapsed]="sidenavCollapsed"\n    [class.show]="showMobileSidenav()"\n    [class.mobile]="isMobile()">\n  </app-sidenav>\n\n  <!-- Main content area -->\n  <div class="main-content" \n       [class.sidenav-collapsed]="sidenavCollapsed() && !isMobile()"\n       [class.mobile]="isMobile()">\n    \n    <!-- Topbar -->\n    <app-topbar \n      [sidenavCollapsed]="sidenavCollapsed"\n      (toggleSidenav)="onToggleSidenav()">\n    </app-topbar>\n\n    <!-- Page content -->\n    <main class="page-content">\n      <div class="container-fluid">\n        <router-outlet></router-outlet>\n      </div>\n    </main>\n  </div>\n\n  <!-- Mobile backdrop -->\n  @if (isMobile() && showMobileSidenav()) {\n    <div class="mobile-backdrop" (click)="onCloseMobileSidenav()"></div>\n  }\n\n  <!-- Notifications -->\n  <app-notifications></app-notifications>\n\n  <!-- Confirmation Modal -->\n  <app-confirmation></app-confirmation>\n</div>', styles: ["/* src/app/layout/layout.component.css */\n.layout-container {\n  position: relative;\n  min-height: 100vh;\n}\n.main-content {\n  margin-left: 250px;\n  min-height: 100vh;\n  transition: margin-left 0.3s ease;\n}\n.main-content.sidenav-collapsed {\n  margin-left: 72px;\n}\n.main-content.mobile {\n  margin-left: 0;\n}\n.page-content {\n  padding-top: 60px;\n  padding-bottom: 2rem;\n  min-height: calc(100vh - 60px);\n}\n.page-content .container-fluid {\n  padding: 2rem 1rem;\n}\n.mobile-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n:root[dir=rtl] .main-content {\n  margin-left: 0 !important;\n  margin-right: 250px !important;\n}\n:root[dir=rtl] .main-content.sidenav-collapsed {\n  margin-right: 72px !important;\n}\n:root[dir=rtl] .main-content.mobile {\n  margin-right: 0 !important;\n}\n@media (max-width: 767.98px) {\n  .main-content {\n    margin-left: 0;\n  }\n  :root[dir=rtl] .main-content {\n    margin-right: 0 !important;\n  }\n  .page-content .container-fluid {\n    padding: 1rem 0.75rem;\n  }\n}\n/*# sourceMappingURL=layout.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LayoutComponent, { className: "LayoutComponent", filePath: "src/app/layout/layout.component.ts", lineNumber: 17 });
})();
export {
  LayoutComponent
};
//# sourceMappingURL=chunk-PHOBOBNQ.js.map
