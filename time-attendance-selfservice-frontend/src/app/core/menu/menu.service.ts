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
 * Contains employee self-service navigation items grouped by functional area
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly authService = inject(AuthService);

  // Standalone items (always visible, no grouping needed)
  private readonly standaloneItems: MenuItem[] = [
    {
      path: '/dashboard',
      titleKey: 'portal.employee_dashboard',
      icon: 'bi bi-house-door'
    },
    {
      path: '/my-profile',
      titleKey: 'portal.my_profile',
      icon: 'bi bi-person'
    }
  ];

  // Grouped employee menu items
  private readonly groupedItems: MenuItem[] = [
    // Time & Attendance group
    {
      path: '/time-attendance',
      titleKey: 'portal.nav_group.time_attendance',
      icon: 'bi bi-calendar-check',
      children: [
        { path: '/my-attendance', titleKey: 'portal.my_attendance', icon: 'bi bi-calendar-check' },
        { path: '/attendance-corrections', titleKey: 'portal.attendance_corrections', icon: 'bi bi-pencil-square' },
        { path: '/shift-swap-requests', titleKey: 'portal.shift_swaps.title', icon: 'bi bi-arrow-left-right' },
        { path: '/my-on-call', titleKey: 'portal.on_call.title', icon: 'bi bi-telephone' },
        { path: '/my-timesheets', titleKey: 'portal.timesheets.title', icon: 'bi bi-clock-history' }
      ]
    },
    // Leave & Requests group
    {
      path: '/leave-requests',
      titleKey: 'portal.nav_group.leave_requests',
      icon: 'bi bi-calendar-heart',
      children: [
        { path: '/vacation-requests', titleKey: 'portal.vacation_requests', icon: 'bi bi-calendar-heart' },
        { path: '/excuse-requests', titleKey: 'portal.excuse_requests', icon: 'bi bi-clock-history' },
        { path: '/remote-work-requests', titleKey: 'portal.remote_work_requests', icon: 'bi bi-laptop' },
        { path: '/my-compensatory-offs', titleKey: 'portal.compensatory_offs.title', icon: 'bi bi-calendar-plus' },
        { path: '/my-leave-encashments', titleKey: 'portal.leave_encashments.title', icon: 'bi bi-cash-coin' }
      ]
    },
    // Compensation group
    {
      path: '/compensation',
      titleKey: 'portal.nav_group.compensation',
      icon: 'bi bi-wallet2',
      children: [
        { path: '/my-payslips', titleKey: 'portal.payslips.title', icon: 'bi bi-receipt' },
        { path: '/my-salary', titleKey: 'portal.salary.title', icon: 'bi bi-wallet2' },
        { path: '/my-allowances', titleKey: 'portal.allowances.title', icon: 'bi bi-cash-coin' },
        { path: '/my-benefits', titleKey: 'portal.benefits.title', icon: 'bi bi-heart-pulse' }
      ]
    },
    // HR Services group
    {
      path: '/hr-services',
      titleKey: 'portal.nav_group.hr_services',
      icon: 'bi bi-building',
      children: [
        { path: '/my-resignation', titleKey: 'portal.resignation.title', icon: 'bi bi-box-arrow-right' },
        { path: '/my-documents', titleKey: 'portal.documents.title', icon: 'bi bi-folder' },
        { path: '/my-letters', titleKey: 'portal.letters.title', icon: 'bi bi-envelope' },
        { path: '/my-expenses', titleKey: 'portal.expenses.title', icon: 'bi bi-receipt' },
        { path: '/my-loans', titleKey: 'portal.loans.title', icon: 'bi bi-cash-stack' },
        { path: '/my-assets', titleKey: 'portal.assets.title', icon: 'bi bi-box-seam' },
        { path: '/my-grievances', titleKey: 'portal.grievances.title', icon: 'bi bi-exclamation-triangle' },
        { path: '/my-disciplinary', titleKey: 'portal.disciplinary.title', icon: 'bi bi-shield-exclamation' }
      ]
    },
    // Development group
    {
      path: '/development',
      titleKey: 'portal.nav_group.development',
      icon: 'bi bi-book',
      children: [
        { path: '/my-training', titleKey: 'portal.training.my_training', icon: 'bi bi-book' },
        { path: '/training-catalog', titleKey: 'portal.training.catalog', icon: 'bi bi-grid' },
        { path: '/my-certifications', titleKey: 'portal.training.my_certifications', icon: 'bi bi-patch-check' },
        { path: '/my-career', titleKey: 'portal.my_career.title', icon: 'bi bi-compass' }
      ]
    },
    // Engagement group
    {
      path: '/engagement',
      titleKey: 'portal.nav_group.engagement',
      icon: 'bi bi-megaphone',
      children: [
        { path: '/announcements', titleKey: 'portal.announcements.title', icon: 'bi bi-megaphone' },
        { path: '/my-surveys', titleKey: 'portal.surveys.title', icon: 'bi bi-clipboard2-check' }
      ]
    }
  ];

  // Approval menu items (visible to all users - anyone can receive delegated approvals)
  private readonly approvalItems: MenuItem[] = [
    {
      path: '/pending-approvals',
      titleKey: 'portal.pending_approvals',
      icon: 'bi bi-clipboard-check'
    }
  ];

  // Manager menu items (visible only to managers)
  private readonly managerItems: MenuItem[] = [
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

  /**
   * Check if a grouped menu item has any visible children.
   */
  hasVisibleChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  readonly menuItems = computed(() => {
    const isManager = this.authService.isManager();
    const items: MenuItem[] = [...this.standaloneItems];

    for (const group of this.groupedItems) {
      if (this.hasVisibleChildren(group)) {
        items.push(group);
      }
    }

    // Pending Approvals is visible to all users (anyone can receive delegated approvals)
    items.push(...this.approvalItems);

    // Manager-specific items only visible to managers
    if (isManager) {
      items.push(...this.managerItems);
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
