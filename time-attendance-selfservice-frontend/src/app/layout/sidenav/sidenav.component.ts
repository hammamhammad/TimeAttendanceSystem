import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MenuService, MenuItem } from '../../core/menu/menu.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { EntitlementService } from '../../core/services/entitlement.service';

/**
 * Sidenav component for Self-Service Portal
 * Supports collapsible grouped navigation with module entitlement filtering
 */
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Input() collapsed = signal(false);
  @Input() show = signal(false);

  private menuService = inject(MenuService);
  private router = inject(Router);
  private entitlementService = inject(EntitlementService);
  public i18n = inject(I18nService);

  menuItems = this.menuService.getMenuItems$();

  // Track which submenus are open
  private openSubmenus = signal<Set<string>>(new Set());

  t(key: string): string {
    return this.i18n.t(key);
  }

  isRtl(): boolean {
    return this.i18n.isRtl();
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  /**
   * Check if a parent menu item should be marked as active
   * (any of its children's routes match the current URL)
   */
  isParentActive(item: MenuItem): boolean {
    if (!item.children) return false;
    const currentPath = this.router.url;
    return item.children.some(child => currentPath.startsWith(child.path));
  }

  /**
   * Check if submenu is open
   */
  isSubmenuOpen(itemPath: string): boolean {
    return this.openSubmenus().has(itemPath);
  }

  /**
   * Toggle submenu open/closed
   */
  toggleSubmenu(itemPath: string): void {
    const openMenus = new Set(this.openSubmenus());
    if (openMenus.has(itemPath)) {
      openMenus.delete(itemPath);
    } else {
      openMenus.add(itemPath);
    }
    this.openSubmenus.set(openMenus);
  }

  /**
   * Check if a child menu item's module is enabled
   */
  isChildVisible(child: MenuItem): boolean {
    return !child.module || this.entitlementService.isModuleEnabled(child.module);
  }

  /**
   * Check if a grouped menu item has any visible children
   */
  hasVisibleChildren(item: MenuItem): boolean {
    if (!item.children) return false;
    return item.children.some(child => this.isChildVisible(child));
  }
}
