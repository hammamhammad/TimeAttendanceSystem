import { Injectable, computed } from '@angular/core';
import { PermissionService } from '../core/auth/permission.service';

export interface MenuItem {
  path: string;
  titleKey: string;
  icon: string;
  permission?: string;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems: MenuItem[] = [
    {
      path: '/dashboard',
      titleKey: 'nav.dashboard',
      icon: 'fa-solid fa-chart-line'
    },
    {
      path: '/users',
      titleKey: 'nav.users',
      icon: 'fa-solid fa-users',
      permission: 'user.read'
    },
    {
      path: '/employees',
      titleKey: 'nav.employees',
      icon: 'fa-solid fa-user-tie',
      permission: 'employee.read'
    },
    {
      path: '/settings',
      titleKey: 'nav.settings',
      icon: 'fa-solid fa-cog'
    }
  ];

  public visibleMenuItems = computed(() => {
    return this.filterMenuItems(this.menuItems);
  });

  constructor(private permissionService: PermissionService) {}

  private filterMenuItems(items: MenuItem[]): MenuItem[] {
    return items.filter(item => {
      if (item.permission && !this.permissionService.has(item.permission)) {
        return false;
      }
      
      if (item.children) {
        item.children = this.filterMenuItems(item.children);
      }
      
      return true;
    });
  }

  getMenuItems(): MenuItem[] {
    return this.visibleMenuItems();
  }
}