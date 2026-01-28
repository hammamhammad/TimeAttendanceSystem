import { Injectable, signal, computed, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export interface MenuItem {
  path: string;
  titleKey: string;
  icon: string;
  permission?: string;
  isManagerOnly?: boolean;
  isSeparator?: boolean;
  children?: MenuItem[];
}

/**
 * Menu service for Self-Service Portal
 * Contains employee self-service navigation items and manager-specific items
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly authService = inject(AuthService);

  // Employee menu items (visible to all employees)
  private readonly employeeMenuItems: MenuItem[] = [
    {
      path: '/dashboard',
      titleKey: 'portal.employee_dashboard',
      icon: 'bi bi-house-door'
    },
    {
      path: '/my-attendance',
      titleKey: 'portal.my_attendance',
      icon: 'bi bi-calendar-check'
    },
    {
      path: '/my-profile',
      titleKey: 'portal.my_profile',
      icon: 'bi bi-person'
    },
    {
      path: '/vacation-requests',
      titleKey: 'portal.vacation_requests',
      icon: 'bi bi-calendar-heart'
    },
    {
      path: '/excuse-requests',
      titleKey: 'portal.excuse_requests',
      icon: 'bi bi-clock-history'
    },
    {
      path: '/remote-work-requests',
      titleKey: 'portal.remote_work_requests',
      icon: 'bi bi-laptop'
    },
    {
      path: '/attendance-corrections',
      titleKey: 'portal.attendance_corrections',
      icon: 'bi bi-clock-history'
    }
  ];

  // Approval menu items (visible to all users - anyone can receive delegated approvals)
  private readonly approvalMenuItems: MenuItem[] = [
    {
      path: '/pending-approvals',
      titleKey: 'portal.pending_approvals',
      icon: 'bi bi-clipboard-check',
      isManagerOnly: false
    }
  ];

  // Manager menu items (visible only to managers)
  private readonly managerMenuItems: MenuItem[] = [
    {
      path: '',
      titleKey: 'portal.manager_section',
      icon: '',
      isSeparator: true,
      isManagerOnly: true
    },
    {
      path: '/manager-dashboard',
      titleKey: 'portal.manager_dashboard',
      icon: 'bi bi-speedometer2',
      isManagerOnly: true
    },
    {
      path: '/team-members',
      titleKey: 'portal.team_members',
      icon: 'bi bi-people',
      isManagerOnly: true
    }
  ];

  // Computed menu items based on user role
  readonly menuItems = computed(() => {
    const isManager = this.authService.isManager();
    const items = [...this.employeeMenuItems];

    // Pending Approvals is visible to all users (anyone can receive delegated approvals)
    items.push(...this.approvalMenuItems);

    // Manager-specific items only visible to managers
    if (isManager) {
      items.push(...this.managerMenuItems);
    }

    return items;
  });

  /**
   * Get all menu items (filtered by role)
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
   * Check if user is a manager
   */
  isManager(): boolean {
    return this.authService.isManager();
  }
}
