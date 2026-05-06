import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export interface MenuItem {
  path: string;
  titleKey: string;
  icon: string;
  permission?: string;
  isManagerOnly?: boolean;
  children?: MenuItem[];
}

export type NavAreaKey = 'me' | 'pay' | 'services' | 'approvals';

export interface MenuGroup {
  groupKey: string;
  titleKey: string;
  area: NavAreaKey;
  items: MenuItem[];
  isManagerOnly?: boolean;
}

export interface NavArea {
  key: NavAreaKey;
  titleKey: string;
  icon: string;
}

export type AppModuleKey = 'hr' | 'crm' | 'sales' | 'inventory';

export interface AppModule {
  key: AppModuleKey;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  gradient: string;
  active: boolean;
  comingSoon: boolean;
}

const AREA_STORAGE_KEY = 'nav.activeArea';

/**
 * Menu service for Self-Service Portal. Groups are rendered flat in the order
 * declared; the module launcher lets users switch to other ERP modules
 * (placeholders until those surfaces exist).
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly authService = inject(AuthService);

  private readonly menuGroups = signal<MenuGroup[]>([
    {
      groupKey: 'portalMain',
      titleKey: 'portal.nav_group.main',
      area: 'me',
      items: [
        { path: '/dashboard', titleKey: 'portal.employee_dashboard', icon: 'bi bi-house-door' },
        { path: '/my-profile', titleKey: 'portal.my_profile', icon: 'bi bi-person' }
      ]
    },
    {
      groupKey: 'timeAttendance',
      titleKey: 'portal.nav_group.time_attendance',
      area: 'me',
      items: [
        { path: '/my-attendance', titleKey: 'portal.my_attendance', icon: 'bi bi-calendar-check' },
        { path: '/attendance-corrections', titleKey: 'portal.attendance_corrections', icon: 'bi bi-pencil-square' },
        { path: '/shift-swap-requests', titleKey: 'portal.shift_swaps.title', icon: 'bi bi-arrow-left-right' },
        { path: '/my-on-call', titleKey: 'portal.on_call.title', icon: 'bi bi-telephone' },
        { path: '/my-timesheets', titleKey: 'portal.timesheets.title', icon: 'bi bi-clock-history' }
      ]
    },
    {
      groupKey: 'leaveRequests',
      titleKey: 'portal.nav_group.leave_requests',
      area: 'me',
      items: [
        { path: '/vacation-requests', titleKey: 'portal.vacation_requests', icon: 'bi bi-calendar-heart' },
        { path: '/excuse-requests', titleKey: 'portal.excuse_requests', icon: 'bi bi-clock-history' },
        { path: '/remote-work-requests', titleKey: 'portal.remote_work_requests', icon: 'bi bi-laptop' },
        { path: '/my-compensatory-offs', titleKey: 'portal.compensatory_offs.title', icon: 'bi bi-calendar-plus' },
        { path: '/my-leave-encashments', titleKey: 'portal.leave_encashments.title', icon: 'bi bi-cash-coin' }
      ]
    },
    {
      groupKey: 'compensation',
      titleKey: 'portal.nav_group.compensation',
      area: 'pay',
      items: [
        { path: '/my-payslips', titleKey: 'portal.payslips.title', icon: 'bi bi-receipt' },
        { path: '/my-salary', titleKey: 'portal.salary.title', icon: 'bi bi-wallet2' },
        { path: '/my-allowances', titleKey: 'portal.allowances.title', icon: 'bi bi-cash-coin' },
        { path: '/my-benefits', titleKey: 'portal.benefits.title', icon: 'bi bi-heart-pulse' }
      ]
    },
    {
      groupKey: 'hrServices',
      titleKey: 'portal.nav_group.hr_services',
      area: 'services',
      items: [
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
    {
      groupKey: 'development',
      titleKey: 'portal.nav_group.development',
      area: 'services',
      items: [
        { path: '/my-training', titleKey: 'portal.training.my_training', icon: 'bi bi-book' },
        { path: '/training-catalog', titleKey: 'portal.training.catalog', icon: 'bi bi-grid' },
        { path: '/my-certifications', titleKey: 'portal.training.my_certifications', icon: 'bi bi-patch-check' },
        { path: '/my-career', titleKey: 'portal.my_career.title', icon: 'bi bi-compass' }
      ]
    },
    {
      groupKey: 'engagement',
      titleKey: 'portal.nav_group.engagement',
      area: 'services',
      items: [
        { path: '/announcements', titleKey: 'portal.announcements.title', icon: 'bi bi-megaphone' },
        { path: '/my-surveys', titleKey: 'portal.surveys.title', icon: 'bi bi-clipboard2-check' }
      ]
    },
    {
      groupKey: 'approvals',
      titleKey: 'portal.nav_group.approvals',
      area: 'approvals',
      items: [
        { path: '/pending-approvals', titleKey: 'portal.pending_approvals', icon: 'bi bi-clipboard-check' }
      ]
    },
    {
      groupKey: 'managerSection',
      titleKey: 'portal.manager_section',
      area: 'approvals',
      isManagerOnly: true,
      items: [
        { path: '/manager-dashboard', titleKey: 'portal.manager_dashboard', icon: 'bi bi-speedometer2', isManagerOnly: true },
        { path: '/team-members', titleKey: 'portal.team_members', icon: 'bi bi-people', isManagerOnly: true }
      ]
    }
  ]);

  private readonly modules: AppModule[] = [
    {
      key: 'hr',
      nameKey: 'nav.modules.hr.name',
      descriptionKey: 'nav.modules.hr.description',
      icon: 'bi bi-person-badge',
      gradient: 'linear-gradient(135deg, #6384FF, #3B51D4)',
      active: true,
      comingSoon: false
    },
    {
      key: 'crm',
      nameKey: 'nav.modules.crm.name',
      descriptionKey: 'nav.modules.crm.description',
      icon: 'bi bi-people',
      gradient: 'linear-gradient(135deg, #A78BFA, #7C3AED)',
      active: false,
      comingSoon: true
    },
    {
      key: 'sales',
      nameKey: 'nav.modules.sales.name',
      descriptionKey: 'nav.modules.sales.description',
      icon: 'bi bi-graph-up',
      gradient: 'linear-gradient(135deg, #6EE7B7, #10B981)',
      active: false,
      comingSoon: true
    },
    {
      key: 'inventory',
      nameKey: 'nav.modules.inventory.name',
      descriptionKey: 'nav.modules.inventory.description',
      icon: 'bi bi-boxes',
      gradient: 'linear-gradient(135deg, #FCD34D, #D97706)',
      active: false,
      comingSoon: true
    }
  ];

  private readonly navAreas: NavArea[] = [
    { key: 'me',         titleKey: 'nav.areas.me',         icon: 'bi bi-person' },
    { key: 'pay',        titleKey: 'nav.areas.pay',        icon: 'bi bi-wallet2' },
    { key: 'services',   titleKey: 'nav.areas.services',   icon: 'bi bi-briefcase' },
    { key: 'approvals',  titleKey: 'nav.areas.approvals',  icon: 'bi bi-check-circle' }
  ];

  private readonly _activeArea = signal<NavAreaKey>(this.readPersistedArea());

  readonly menuItems = computed(() => {
    const isManager = this.authService.isManager();
    return this.menuGroups()
      .filter(g => !g.isManagerOnly || isManager)
      .flatMap(g => g.items);
  });

  constructor() {
    effect(() => {
      try { localStorage.setItem(AREA_STORAGE_KEY, this._activeArea()); } catch { /* ignore */ }
    });
  }

  private readPersistedArea(): NavAreaKey {
    try {
      const saved = localStorage.getItem(AREA_STORAGE_KEY) as NavAreaKey | null;
      if (saved && ['me', 'pay', 'services', 'approvals'].includes(saved)) return saved;
    } catch { /* ignore */ }
    return 'me';
  }

  getMenuGroups(): MenuGroup[] {
    const isManager = this.authService.isManager();
    return this.menuGroups().filter(g => !g.isManagerOnly || isManager);
  }

  getMenuGroups$() {
    return this.menuGroups;
  }

  getNavAreas(): NavArea[] {
    return this.navAreas;
  }

  activeArea() {
    return this._activeArea();
  }

  activeArea$() {
    return this._activeArea;
  }

  setActiveArea(key: NavAreaKey): void {
    this._activeArea.set(key);
  }

  groupsForArea(areaKey: NavAreaKey): MenuGroup[] {
    const isManager = this.authService.isManager();
    return this.menuGroups()
      .filter(g => g.area === areaKey && (!g.isManagerOnly || isManager));
  }

  findAreaForPath(path: string): NavAreaKey | undefined {
    for (const group of this.menuGroups()) {
      for (const item of group.items) {
        if (item.path === path) return group.area;
        if (item.children?.some(c => c.path === path)) return group.area;
      }
    }
    return undefined;
  }

  getMenuItems() {
    return this.menuItems();
  }

  getMenuItems$() {
    return this.menuItems;
  }

  hasVisibleChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  isManager(): boolean {
    return this.authService.isManager();
  }

  getModules(): AppModule[] {
    return this.modules;
  }

  activeModule(): AppModule {
    return this.modules.find(m => m.active) ?? this.modules[0];
  }
}
