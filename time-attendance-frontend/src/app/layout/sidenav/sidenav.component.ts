import { Component, Input, signal, inject } from '@angular/core';

import { RouterModule, Router } from '@angular/router';
import { MenuService, MenuItem, MenuGroup } from '../../core/menu/menu.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { AuthService } from '../../core/auth/auth.service';
import { PermissionService } from '../../core/auth/permission.service';
import { EntitlementService } from '../../core/services/entitlement.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Input() collapsed = signal(false);
  @Input() show = signal(false);

  private menuService = inject(MenuService);
  private router = inject(Router);
  private authService = inject(AuthService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);
  private entitlementService = inject(EntitlementService);

  menuGroups = this.menuService.getMenuGroups$();

  // Platform-only paths — only these are shown when logged in as platform admin
  private platformPaths = new Set(['/platform', '/tenants', '/subscription-plans']);

  // Platform-only group keys
  private platformGroupKeys = new Set(['platform']);

  // Track which submenus are open
  private openSubmenus = signal<Set<string>>(new Set());

  isRtl(): boolean {
    return this.i18n.isRtl();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  hasPerm(permission?: string): boolean {
    return !permission || this.permissionService.has(permission);
  }

  // Check permissions for child menu items with special handling
  hasChildMenuPermission(child: MenuItem): boolean {
    // Check module entitlement first
    if (child.module && !this.entitlementService.isModuleEnabled(child.module)) {
      return false;
    }

    // Special case for public holidays - use the proper permission service method
    if (child.path === '/settings/public-holidays') {
      return this.permissionService.canReadPublicHolidays();
    }

    // Default permission check
    return !child.permission || this.hasPerm(child.permission);
  }

  // Special permission check for parent menus that should show with any related permission
  hasParentMenuPermission(item: MenuItem): boolean {
    // Platform admin: only show platform-level menu items
    if (this.authService.isPlatformUser()) {
      return this.platformPaths.has(item.path);
    }

    // Tenant users must NOT see platform-only paths
    if (this.platformPaths.has(item.path)) {
      return false;
    }

    // Check module entitlement first
    if (item.module && !this.entitlementService.isModuleEnabled(item.module)) {
      return false;
    }

    // Special case for shift menu - show if user has any shift-related permission
    if (item.path === '/shifts') {
      return this.permissionService.canAccessShifts();
    }

    // Special case for attendance menu - show if user has any attendance-related permission
    if (item.path === '/attendance') {
      return this.permissionService.has('attendance.manage') ||
             this.permissionService.has('attendance.read') ||
             this.permissionService.has('attendance.calculate');
    }

    // For any item with children, only show if at least one child is accessible
    if (item.children && item.children.length > 0) {
      return this.hasVisibleChildren(item);
    }

    if (!item.permission) return true;

    return this.hasPerm(item.permission);
  }

  // Check if a parent menu item should be marked as active
  isParentActive(item: MenuItem): boolean {
    if (!item.children) return false;

    const currentPath = this.router.url;
    return item.children.some(child => currentPath.startsWith(child.path));
  }

  // Check if submenu is open
  isSubmenuOpen(itemPath: string): boolean {
    return this.openSubmenus().has(itemPath);
  }

  // Toggle submenu open/closed
  toggleSubmenu(itemPath: string): void {
    const openMenus = new Set(this.openSubmenus());

    if (openMenus.has(itemPath)) {
      openMenus.delete(itemPath);
    } else {
      openMenus.add(itemPath);
    }

    this.openSubmenus.set(openMenus);
  }

  // Check if menu item has any visible children
  hasVisibleChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.some(child =>
      this.hasChildMenuPermission(child)
    ));
  }

  // Check if a group has any visible items
  hasVisibleGroup(group: MenuGroup): boolean {
    // Platform admin: only show platform group
    if (this.authService.isPlatformUser()) {
      return this.platformGroupKeys.has(group.groupKey);
    }

    // Tenant users: hide platform group
    if (this.platformGroupKeys.has(group.groupKey)) {
      return false;
    }

    return group.items.some(item => this.hasParentMenuPermission(item));
  }
}