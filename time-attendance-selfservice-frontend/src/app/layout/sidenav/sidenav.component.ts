import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MenuService, MenuItem } from '../../core/menu/menu.service';
import { I18nService } from '../../core/i18n/i18n.service';

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
  public i18n = inject(I18nService);

  menuItems = this.menuService.getMenuItems$();

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

  isChildVisible(_child: MenuItem): boolean {
    return true;
  }

  hasVisibleChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.length > 0);
  }
}
