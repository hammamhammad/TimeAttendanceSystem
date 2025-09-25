import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MenuService, MenuItem } from '../../core/menu/menu.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { PermissionService } from '../../core/auth/permission.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Input() collapsed = signal(false);

  private menuService = inject(MenuService);
  private router = inject(Router);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  menuItems = this.menuService.getMenuItems$();

  // Track which submenus are open - updated for debugging
  private openSubmenus = signal<Set<string>>(new Set());

  t(key: string): string {
    return this.i18n.t(key);
  }

  hasPerm(permission?: string): boolean {
    return !permission || this.permissionService.has(permission);
  }

  // Check permissions for child menu items with special handling
  hasChildMenuPermission(child: MenuItem): boolean {
    // Special case for public holidays - use the proper permission service method
    if (child.path === '/settings/public-holidays') {
      return this.permissionService.canReadPublicHolidays();
    }

    // Default permission check
    return !child.permission || this.hasPerm(child.permission);
  }

  // Special permission check for parent menus that should show with any related permission
  hasParentMenuPermission(item: MenuItem): boolean {
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
}