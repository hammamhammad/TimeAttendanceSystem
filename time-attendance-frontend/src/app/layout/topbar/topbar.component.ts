import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { I18nService, Locale } from '../../core/i18n/i18n.service';
import { NotificationBellComponent } from '../../shared/components/notification-bell/notification-bell.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NotificationBellComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  @Input() sidenavCollapsed = signal(false);
  @Output() toggleSidenav = new EventEmitter<void>();

  currentUser = computed(() => this.authService.currentUser());
  currentLocale = computed(() => this.i18n.locale());
  isRtl = computed(() => this.i18n.isRtl());
  
  pageTitle = signal('');
  showUserMenu = signal(false);

  constructor(
    private authService: AuthService,
    public i18n: I18nService,
    private router: Router
  ) {
    // Listen to route changes to update page title
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.data?.['title'] || '';
        })
      )
      .subscribe(title => {
        this.pageTitle.set(this.t(title) || 'Dashboard');
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
}