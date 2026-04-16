import { Component, Input, signal, inject } from '@angular/core';

import { RouterModule, Router } from '@angular/router';
import { MenuService, MenuItem, MenuGroup } from '../../core/menu/menu.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { PermissionService } from '../../core/auth/permission.service';

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
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  menuGroups = this.menuService.getMenuGroups$();

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

  hasChildMenuPermission(child: MenuItem): boolean {
    if (child.path === '/settings/public-holidays') {
      return this.permissionService.canReadPublicHolidays();
    }
    return !child.permission || this.hasPerm(child.permission);
  }

  hasParentMenuPermission(item: MenuItem): boolean {
    if (item.path === '/shifts') {
      return this.permissionService.canAccessShifts();
    }

    if (item.path === '/attendance') {
      return this.permissionService.has('attendance.manage') ||
             this.permissionService.has('attendance.read') ||
             this.permissionService.has('attendance.calculate');
    }

    if (item.children && item.children.length > 0) {
      return this.hasVisibleChildren(item);
    }

    if (!item.permission) return true;
    return this.hasPerm(item.permission);
  }

  isParentActive(item: MenuItem): boolean {
    if (!item.children) return false;
    const currentPath = this.router.url;
    return item.children.some(child => currentPath.startsWith(child.path));
  }

  isSubmenuOpen(itemPath: string): boolean {
    return this.openSubmenus().has(itemPath);
  }

  toggleSubmenu(itemPath: string): void {
    const openMenus = new Set(this.openSubmenus());
    if (openMenus.has(itemPath)) {
      openMenus.delete(itemPath);
    } else {
      openMenus.add(itemPath);
    }
    this.openSubmenus.set(openMenus);
  }

  hasVisibleChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.some(child =>
      this.hasChildMenuPermission(child)
    ));
  }

  hasVisibleGroup(group: MenuGroup): boolean {
    return group.items.some(item => this.hasParentMenuPermission(item));
  }
}
