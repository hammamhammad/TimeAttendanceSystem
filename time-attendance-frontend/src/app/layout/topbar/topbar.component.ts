import { Component, Input, signal, computed, HostListener, ElementRef, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { I18nService, Locale } from '../../core/i18n/i18n.service';
import { MenuService } from '../../core/menu/menu.service';
import { NotificationBellComponent } from '../../shared/components/notification-bell/notification-bell.component';

interface Crumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NotificationBellComponent, FormsModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  @Input() sidenavCollapsed = signal(false);

  private authService = inject(AuthService);
  public i18n = inject(I18nService);
  private router = inject(Router);
  private menu = inject(MenuService);
  private host = inject(ElementRef<HTMLElement>);

  currentUser = computed(() => this.authService.currentUser());
  currentLocale = computed(() => this.i18n.locale());
  isRtl = computed(() => this.i18n.isRtl());

  private pageTitleKey = signal<string>('nav.dashboard');
  showUserMenu = signal(false);
  showSearch = signal(false);

  searchQuery = signal('');

  pageTitle = computed(() => {
    // Reading locale() makes this recompute on language switch
    this.i18n.locale();
    return this.t(this.pageTitleKey()) || this.t('nav.dashboard');
  });

  breadcrumb = computed<Crumb[]>(() => {
    this.i18n.locale();
    const titleKey = this.pageTitleKey();
    const title = this.t(titleKey) || this.t('nav.dashboard');
    const area = this.menu.activeArea();
    const areaLabel = this.t(this.menu.areaTitleKey(area));
    const areaUrl = this.menu.dashboardPathForArea(area);

    // On the area's dashboard itself, just show the area as the current crumb.
    const onAreaDashboard = titleKey === 'dashboard.title'
      || titleKey === this.menu.areaTitleKey(area);
    if (onAreaDashboard) {
      return [{ label: areaLabel }];
    }
    return [{ label: areaLabel, url: areaUrl }, { label: title }];
  });

  userInitials = computed(() => {
    const name = this.currentUser()?.username ?? '';
    if (!name) return '?';
    const parts = name.split(/[\s._-]+/).filter(Boolean);
    if (parts.length === 0) return name.charAt(0).toUpperCase();
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  });

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        let route = this.router.routerState.root;
        while (route.firstChild) route = route.firstChild;
        const titleKey = route.snapshot.data?.['title'] || 'nav.dashboard';
        this.pageTitleKey.set(titleKey);

        if (event.urlAfterRedirects.startsWith('/global-search')) {
          const q = route.snapshot.queryParamMap.get('q') ?? '';
          if (q !== this.searchQuery()) this.searchQuery.set(q);
        }
      });

    // Focus the search input when the popover opens.
    effect(() => {
      if (this.showSearch()) {
        queueMicrotask(() => {
          const el = document.getElementById('topbar-omnibox') as HTMLInputElement | null;
          el?.focus();
          el?.select();
        });
      }
    });
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  onToggleUserMenu(): void {
    this.showUserMenu.update(show => !show);
    if (this.showUserMenu()) this.showSearch.set(false);
  }

  onToggleSearch(): void {
    this.showSearch.update(v => !v);
    if (this.showSearch()) this.showUserMenu.set(false);
  }

  onSwitchLanguage(): void {
    const newLocale: Locale = this.currentLocale() === 'en' ? 'ar' : 'en';
    this.i18n.setLocale(newLocale);
    this.showUserMenu.set(false);
  }

  onLogout(): void {
    this.authService.logout();
    this.showUserMenu.set(false);
  }

  onSearchSubmit(): void {
    const q = this.searchQuery().trim();
    if (q.length < 2) return;
    this.router.navigate(['/global-search'], { queryParams: { q } });
    this.showSearch.set(false);
  }

  goCrumb(crumb: Crumb, event: MouseEvent): void {
    if (!crumb.url) return;
    event.preventDefault();
    this.router.navigateByUrl(crumb.url);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    const target = e.target as Node;
    if (!this.host.nativeElement.contains(target)) {
      this.showUserMenu.set(false);
      this.showSearch.set(false);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.showSearch.set(true);
    } else if (e.key === 'Escape') {
      if (this.showSearch()) this.showSearch.set(false);
      if (this.showUserMenu()) this.showUserMenu.set(false);
    }
  }
}
