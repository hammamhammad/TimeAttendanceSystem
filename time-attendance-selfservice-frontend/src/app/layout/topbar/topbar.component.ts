import { Component, Input, signal, computed, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { I18nService, Locale } from '../../core/i18n/i18n.service';
import { NotificationBellComponent } from '../../shared/components/notification-bell/notification-bell.component';

interface Crumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, NotificationBellComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  @Input() sidenavCollapsed = signal(false);

  private authService = inject(AuthService);
  public i18n = inject(I18nService);
  private router = inject(Router);
  private host = inject(ElementRef<HTMLElement>);

  currentUser = computed(() => this.authService.currentUser());
  currentLocale = computed(() => this.i18n.locale());
  isRtl = computed(() => this.i18n.isRtl());

  displayName = computed(() => {
    const user = this.currentUser();
    if (!user) return '';
    if (this.currentLocale() === 'ar' && user.fullNameAr) {
      return user.fullNameAr;
    }
    return user.fullName || user.username;
  });

  private pageTitleKey = signal<string>('');
  showUserMenu = signal(false);

  pageTitle = computed(() => {
    const key = this.pageTitleKey();
    this.i18n.locale();
    return key ? this.t(key) : this.t('portal.employee_dashboard');
  });

  breadcrumb = computed<Crumb[]>(() => {
    this.i18n.locale();
    const home: Crumb = { label: this.t('portal.employee_dashboard'), url: '/dashboard' };
    const titleKey = this.pageTitleKey();
    if (!titleKey || titleKey === 'portal.employee_dashboard') {
      return [{ label: home.label }];
    }
    return [home, { label: this.t(titleKey) }];
  });

  userInitials = computed(() => {
    const name = this.displayName();
    if (!name) return '?';
    const parts = name.split(/[\s._-]+/).filter(Boolean);
    if (parts.length === 0) return name.charAt(0).toUpperCase();
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  });

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.router.routerState.root;
        while (route.firstChild) route = route.firstChild;
        this.pageTitleKey.set(route.snapshot.data?.['title'] || '');
      });
  }

  t(key: string): string {
    return this.i18n.t(key);
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
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.showUserMenu()) this.showUserMenu.set(false);
  }
}
