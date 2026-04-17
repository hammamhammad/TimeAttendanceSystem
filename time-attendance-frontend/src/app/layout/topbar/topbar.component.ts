import { Component, Input, Output, EventEmitter, signal, computed, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { I18nService, Locale } from '../../core/i18n/i18n.service';
import { NotificationBellComponent } from '../../shared/components/notification-bell/notification-bell.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NotificationBellComponent, FormsModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  @Input() sidenavCollapsed = signal(false);
  @Output() toggleSidenav = new EventEmitter<void>();

  currentUser = computed(() => this.authService.currentUser());
  currentLocale = computed(() => this.i18n.locale());
  isRtl = computed(() => this.i18n.isRtl());

  private pageTitleKey = signal('nav.dashboard');
  showUserMenu = signal(false);

  // Phase 6: top-nav omnibox. Pressing Enter navigates to the dedicated global-search
  // page with the query pre-filled; Ctrl/Cmd+K focuses the input from anywhere.
  searchQuery = signal('');

  // Reactive page title - re-translates when locale changes
  pageTitle = computed(() => {
    // Reading locale() makes this recompute on language switch
    this.i18n.locale();
    return this.t(this.pageTitleKey()) || this.t('nav.dashboard');
  });

  constructor(
    private authService: AuthService,
    public i18n: I18nService,
    private router: Router
  ) {
    // Listen to route changes to update page title key and — when the active
    // route is the global-search page — mirror its `?q=` into the omnibox so
    // the search value stays visible when the user navigates there directly.
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map((event: NavigationEnd) => {
          let route = this.router.routerState.root;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return {
            titleKey: route.snapshot.data?.['title'] || 'nav.dashboard',
            queryParams: route.snapshot.queryParamMap,
            urlPath: event.urlAfterRedirects
          };
        })
      )
      .subscribe(({ titleKey, queryParams, urlPath }) => {
        this.pageTitleKey.set(titleKey);
        // Only sync the omnibox when the user is on the search page itself;
        // every other route leaves the current query untouched.
        if (urlPath.startsWith('/global-search')) {
          const q = queryParams.get('q') ?? '';
          if (q !== this.searchQuery()) this.searchQuery.set(q);
        }
      });
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onToggleUserMenu(): void {
    this.showUserMenu.update(show => !show);
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

  onClickOutside(): void {
    this.showUserMenu.set(false);
  }

  onSearchSubmit(): void {
    const q = this.searchQuery().trim();
    if (q.length < 2) return; // mirror backend min-length
    this.router.navigate(['/global-search'], { queryParams: { q } });
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    // Ctrl/Cmd+K → focus the omnibox from anywhere in the admin app.
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      const el = document.getElementById('topbar-omnibox') as HTMLInputElement | null;
      if (el) { e.preventDefault(); el.focus(); el.select(); }
    }
  }
}