import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { I18nService } from '../../core/i18n/i18n.service';
import { MenuService, NavAreaKey, MenuGroup, MenuItem } from '../../core/menu/menu.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

interface QuickLink {
  path: string;
  title: string;
  icon: string;
}

interface QuickLinkSection {
  groupTitle: string;
  items: QuickLink[];
}

interface HighlightCard {
  labelKey: string;
  value: string;
  icon: string;
  accent: string;     // tailwind-ish color slot used by template (info | success | warning | danger | primary)
  caption?: string;
  route?: string;
}

interface AreaConfig {
  introKey: string;
  accentColor: string;
  highlights: HighlightCard[];
}

@Component({
  selector: 'app-area-dashboard',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './area-dashboard.component.html',
  styleUrl: './area-dashboard.component.css'
})
export class AreaDashboardComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public i18n = inject(I18nService);
  public menu = inject(MenuService);

  private routeData = toSignal(this.route.data, { initialValue: {} as any });

  area = computed<NavAreaKey>(() => (this.routeData()?.['area'] as NavAreaKey) ?? 'people');

  config = computed<AreaConfig>(() => AREA_CONFIG[this.area()] ?? AREA_CONFIG.people);

  title = computed(() => {
    this.i18n.locale();
    return this.t(this.menu.areaTitleKey(this.area()));
  });

  intro = computed(() => {
    this.i18n.locale();
    return this.t(this.config().introKey);
  });

  highlights = computed(() => {
    this.i18n.locale();
    return this.config().highlights;
  });

  groups = computed<MenuGroup[]>(() => {
    this.i18n.locale();
    return this.menu.groupsForArea(this.area()).filter(g => !g.groupKey.startsWith('main'));
  });

  quickLinks = computed<QuickLinkSection[]>(() => {
    this.i18n.locale();
    return this.groups().map(group => ({
      groupTitle: this.t(group.titleKey),
      items: this.flatten(group.items)
    })).filter(g => g.items.length > 0);
  });

  private flatten(items: MenuItem[]): QuickLink[] {
    const out: QuickLink[] = [];
    for (const item of items) {
      if (item.children?.length) {
        for (const child of item.children) {
          out.push({ path: child.path, title: this.t(child.titleKey), icon: child.icon });
        }
      } else {
        out.push({ path: item.path, title: this.t(item.titleKey), icon: item.icon });
      }
    }
    return out;
  }

  go(path: string): void {
    this.router.navigateByUrl(path);
  }

  t(key: string): string {
    return this.i18n.t(key);
  }
}

// Static, area-specific dashboard configuration. Highlight values are placeholders
// until each area's KPI service is wired — labels and structure are area-correct.
const AREA_CONFIG: Record<NavAreaKey, AreaConfig> = {
  people: {
    introKey: 'dashboard.area.people.intro',
    accentColor: '#4F6BF6',
    highlights: [
      { labelKey: 'dashboard.area.people.kpi.headcount',     value: '—', icon: 'fa-solid fa-users',          accent: 'primary', route: '/employees' },
      { labelKey: 'dashboard.area.people.kpi.openRoles',     value: '—', icon: 'fa-solid fa-briefcase',      accent: 'info',    route: '/recruitment/postings' },
      { labelKey: 'dashboard.area.people.kpi.onboarding',    value: '—', icon: 'fa-solid fa-user-plus',      accent: 'success', route: '/onboarding/processes' },
      { labelKey: 'dashboard.area.people.kpi.contractsExp',  value: '—', icon: 'fa-solid fa-file-contract',  accent: 'warning', route: '/employee-contracts' }
    ]
  },
  workforce: {
    introKey: 'dashboard.area.workforce.intro',
    accentColor: '#22C55E',
    highlights: [
      { labelKey: 'dashboard.area.workforce.kpi.presentToday', value: '—', icon: 'fa-solid fa-user-check',     accent: 'success', route: '/attendance/daily' },
      { labelKey: 'dashboard.area.workforce.kpi.lateToday',    value: '—', icon: 'fa-solid fa-clock',          accent: 'warning', route: '/attendance/daily' },
      { labelKey: 'dashboard.area.workforce.kpi.onLeave',      value: '—', icon: 'fa-solid fa-calendar-week',  accent: 'info',    route: '/employee-vacations' },
      { labelKey: 'dashboard.area.workforce.kpi.pendingLeaves',value: '—', icon: 'fa-solid fa-hourglass-half', accent: 'primary', route: '/employee-vacations' }
    ]
  },
  payroll: {
    introKey: 'dashboard.area.payroll.intro',
    accentColor: '#F59E0B',
    highlights: [
      { labelKey: 'dashboard.area.payroll.kpi.activePeriod',   value: '—', icon: 'fa-solid fa-calendar-alt',     accent: 'primary', route: '/payroll/periods' },
      { labelKey: 'dashboard.area.payroll.kpi.monthlyPayroll', value: '—', icon: 'fa-solid fa-money-bill-wave',  accent: 'success', route: '/payroll/periods' },
      { labelKey: 'dashboard.area.payroll.kpi.pendingClaims',  value: '—', icon: 'fa-solid fa-file-invoice-dollar', accent: 'warning', route: '/benefits/claims' },
      { labelKey: 'dashboard.area.payroll.kpi.allowanceReqs',  value: '—', icon: 'fa-solid fa-coins',            accent: 'info',    route: '/allowance-requests' }
    ]
  },
  operations: {
    introKey: 'dashboard.area.operations.intro',
    accentColor: '#EF4444',
    highlights: [
      { labelKey: 'dashboard.area.operations.kpi.pendingApprovals', value: '—', icon: 'fa-solid fa-tasks',                 accent: 'primary', route: '/approvals' },
      { labelKey: 'dashboard.area.operations.kpi.openAlerts',       value: '—', icon: 'fa-solid fa-triangle-exclamation',  accent: 'danger',  route: '/operational-alerts' },
      { labelKey: 'dashboard.area.operations.kpi.notExecuted',      value: '—', icon: 'fa-solid fa-circle-exclamation',    accent: 'warning', route: '/approved-not-executed' },
      { labelKey: 'dashboard.area.operations.kpi.workQueues',       value: '—', icon: 'fa-solid fa-list-check',            accent: 'info',    route: '/work-queues/overdue-approvals' }
    ]
  }
};
