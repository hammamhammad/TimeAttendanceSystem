import { Component, Input, Output, EventEmitter, signal, inject, computed, ElementRef, HostListener } from '@angular/core';

import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { MenuService, MenuItem, MenuGroup, AppModule, NavAreaKey } from '../../core/menu/menu.service';
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
  @Output() toggleCollapsed = new EventEmitter<void>();

  private menuService = inject(MenuService);
  private router = inject(Router);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);
  private host = inject(ElementRef<HTMLElement>);

  areas = this.menuService.getNavAreas();
  activeArea = this.menuService.activeArea$();

  // Groups restricted to the currently active area.
  menuGroups = computed<MenuGroup[]>(() => this.menuService.groupsForArea(this.activeArea()));

  activeAreaInfo = computed(() =>
    this.areas.find(a => a.key === this.activeArea()) ?? this.areas[0]
  );

  areaMenuOpen = signal(false);

  modules: AppModule[] = this.menuService.getModules();
  activeModule: AppModule = this.menuService.activeModule();
  moduleLauncherOpen = signal(false);

  private openSubmenus = signal<Set<string>>(new Set());

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => {
        // Prefer route.data.area when set on the matched route — more reliable
        // than path-string matching for parameterised routes and area dashboards.
        let route = this.router.routerState.root;
        while (route.firstChild) route = route.firstChild;
        const dataArea = route.snapshot.data?.['area'] as NavAreaKey | undefined;
        const area = dataArea
          ?? this.menuService.findAreaForPath(event.urlAfterRedirects.split('?')[0]);
        if (area && area !== this.activeArea()) {
          this.menuService.setActiveArea(area);
        }
      });
  }

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

  areaHasAnyVisibleGroup(areaKey: NavAreaKey): boolean {
    return this.menuService.groupsForArea(areaKey).some(g => this.hasVisibleGroup(g));
  }

  toggleAreaMenu(event?: Event): void {
    event?.stopPropagation();
    this.areaMenuOpen.update(v => !v);
  }

  selectArea(key: NavAreaKey, event?: Event): void {
    event?.stopPropagation();
    this.menuService.setActiveArea(key);
    this.areaMenuOpen.set(false);
    // Navigate to that area's dashboard so the page reflects the switch.
    this.router.navigateByUrl(this.menuService.dashboardPathForArea(key));
  }

  toggleModuleLauncher(event?: Event): void {
    event?.stopPropagation();
    this.moduleLauncherOpen.update(v => !v);
  }

  closeModuleLauncher(): void {
    this.moduleLauncherOpen.set(false);
  }

  selectModule(module: AppModule, event?: Event): void {
    event?.stopPropagation();
    if (module.comingSoon) return;
    this.closeModuleLauncher();
  }

  onToggleCollapsed(): void {
    this.toggleCollapsed.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    const target = e.target as Node;
    if (!this.host.nativeElement.contains(target)) {
      if (this.moduleLauncherOpen()) this.closeModuleLauncher();
      if (this.areaMenuOpen()) this.areaMenuOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.moduleLauncherOpen()) this.closeModuleLauncher();
    if (this.areaMenuOpen()) this.areaMenuOpen.set(false);
  }
}
