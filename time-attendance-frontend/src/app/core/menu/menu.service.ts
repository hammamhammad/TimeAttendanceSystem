import { Injectable, signal } from '@angular/core';

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
  private readonly menuItems = signal<MenuItem[]>([
    {
      path: '/dashboard',
      titleKey: 'nav.dashboard',
      icon: 'fa-solid fa-chart-line',
      permission: undefined // Dashboard accessible to all authenticated users
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
      icon: 'fa-solid fa-id-card',
      permission: 'employee.read'
    },
    {
      path: '/roles',
      titleKey: 'nav.roles',
      icon: 'fa-solid fa-user-shield',
      permission: 'role.read'
    },
    {
      path: '/branches',
      titleKey: 'nav.branches',
      icon: 'fa-solid fa-code-branch',
      permission: 'branch.read'
    },
    {
      path: '/departments',
      titleKey: 'nav.departments',
      icon: 'fa-solid fa-sitemap',
      permission: 'department.read'
    },
    {
      path: '/shifts',
      titleKey: 'nav.shifts',
      icon: 'fa-solid fa-clock',
      permission: undefined, // Special handling in sidenav component
      children: [
        {
          path: '/shifts',
          titleKey: 'shifts.title',
          icon: 'fa-solid fa-clock',
          permission: 'shift.read'
        },
        {
          path: '/shifts/assign',
          titleKey: 'shifts.assignments.title',
          icon: 'fa-solid fa-user-clock',
          permission: 'shift.assign'
        }
      ]
    },
    {
      path: '/attendance',
      titleKey: 'nav.attendance',
      icon: 'fa-solid fa-calendar-check',
      permission: undefined, // Special handling in sidenav component
      children: [
        {
          path: '/attendance',
          titleKey: 'attendance.dashboard_title',
          icon: 'fa-solid fa-chart-line',
          permission: 'attendance.read'
        },
        {
          path: '/attendance/daily',
          titleKey: 'attendance.daily_view',
          icon: 'fa-solid fa-calendar-day',
          permission: 'attendance.read'
        },
        {
          path: '/attendance/monthly-report',
          titleKey: 'attendance.monthly_report',
          icon: 'fa-solid fa-calendar-alt',
          permission: 'attendance.read'
        }
      ]
    },
    {
      path: '/reports',
      titleKey: 'nav.reports',
      icon: 'fa-solid fa-chart-bar',
      permission: 'employee.read'
    },
    {
      path: '/settings',
      titleKey: 'nav.settings',
      icon: 'fa-solid fa-cog',
      permission: undefined, // Settings accessible to all authenticated users
      children: [
        {
          path: '/settings',
          titleKey: 'settings.dashboard',
          icon: 'fa-solid fa-cog',
          permission: undefined
        },
        {
          path: '/settings/overtime',
          titleKey: 'settings.overtime.title',
          icon: 'fa-solid fa-clock',
          permission: 'settings.overtime.read'
        },
        {
          path: '/settings/public-holidays',
          titleKey: 'settings.holidays.title',
          icon: 'fa-solid fa-calendar-check',
          permission: 'publicHoliday.read'
        },
        {
          path: '/vacation-types',
          titleKey: 'vacation_types.title',
          icon: 'fa-solid fa-calendar-alt',
          permission: 'vacationType.read'
        },
        {
          path: '/settings/excuse-policies',
          titleKey: 'excuse_policies.title',
          icon: 'fa-solid fa-cogs',
          permission: 'settings.excusePolicy.read'
        }
      ]
    },
    {
      path: '/employee-vacations',
      titleKey: 'nav.employeeVacations',
      icon: 'fa-solid fa-calendar-week',
      permission: 'vacation.read'
    },
    {
      path: '/employee-excuses',
      titleKey: 'employee_excuses.title',
      icon: 'fa-solid fa-clipboard-check',
      permission: 'excuse.read'
    }
  ]);

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
  addMenuItem(item: MenuItem) {
    this.menuItems.update(items => [...items, item]);
  }

  /**
   * Remove a menu item by path
   */
  removeMenuItem(path: string) {
    this.menuItems.update(items => items.filter(item => item.path !== path));
  }

  /**
   * Update a menu item
   */
  updateMenuItem(path: string, updatedItem: Partial<MenuItem>) {
    this.menuItems.update(items => 
      items.map(item => 
        item.path === path ? { ...item, ...updatedItem } : item
      )
    );
  }

  /**
   * Find a menu item by path
   */
  findMenuItem(path: string): MenuItem | undefined {
    return this.menuItems().find(item => item.path === path);
  }
}