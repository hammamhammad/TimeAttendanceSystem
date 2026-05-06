import { Component, Input, Output, EventEmitter, signal, inject, computed, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { MenuService, MenuItem, MenuGroup, AppModule, NavAreaKey } from '../../core/menu/menu.service';
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
  @Output() toggleCollapsed = new EventEmitter<void>();

  private menuService = inject(MenuService);
  private router = inject(Router);
  public i18n = inject(I18nService);
  private host = inject(ElementRef<HTMLElement>);

  areas = this.menuService.getNavAreas();
  activeArea = this.menuService.activeArea$();

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
        const area = this.menuService.findAreaForPath(event.urlAfterRedirects.split('?')[0]);
        if (area && area !== this.activeArea()) {
          this.menuService.setActiveArea(area);
        }
      });
  }

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

  areaHasAnyVisibleGroup(areaKey: NavAreaKey): boolean {
    return this.menuService.groupsForArea(areaKey).length > 0;
  }

  toggleAreaMenu(event?: Event): void {
    event?.stopPropagation();
    this.areaMenuOpen.update(v => !v);
  }

  selectArea(key: NavAreaKey, event?: Event): void {
    event?.stopPropagation();
    this.menuService.setActiveArea(key);
    this.areaMenuOpen.set(false);
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
