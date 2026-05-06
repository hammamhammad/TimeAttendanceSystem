import { Component, signal, OnInit, OnDestroy, effect } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NotificationComponent } from '../core/notifications/notification.component';
import { ConfirmationComponent } from '../core/confirmation/confirmation.component';

const SIDENAV_STORAGE_KEY = 'nav.sidebarCollapsed';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, TopbarComponent, NotificationComponent, ConfirmationComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit, OnDestroy {
  sidenavCollapsed = signal<boolean>(this.readPersistedCollapsed());
  showMobileSidenav = signal(false);
  isMobile = signal(false);

  private destroy$ = new Subject<void>();

  constructor() {
    // Mirror the collapsed state onto :root so topbar + main-content both read
    // --sidebar-width live. Keeps component margins in sync with CSS transitions.
    effect(() => {
      const root = document.documentElement;
      if (this.isMobile()) {
        root.style.setProperty('--sidebar-width', '0px');
      } else if (this.sidenavCollapsed()) {
        root.style.setProperty('--sidebar-width', 'var(--sidebar-width-collapsed, 56px)');
      } else {
        root.style.setProperty('--sidebar-width', '180px');
      }
      try { localStorage.setItem(SIDENAV_STORAGE_KEY, String(this.sidenavCollapsed())); } catch { /* ignore */ }
    });
  }

  ngOnInit(): void {
    this.checkScreenSize();

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.checkScreenSize();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private readPersistedCollapsed(): boolean {
    try {
      return localStorage.getItem(SIDENAV_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }

  private checkScreenSize(): void {
    const isMobile = window.innerWidth < 768;
    this.isMobile.set(isMobile);

    if (isMobile) {
      this.showMobileSidenav.set(false);
    }
  }

  onToggleSidenav(): void {
    if (this.isMobile()) {
      this.showMobileSidenav.update(show => !show);
    } else {
      this.sidenavCollapsed.update(collapsed => !collapsed);
    }
  }

  onCloseMobileSidenav(): void {
    if (this.isMobile()) {
      this.showMobileSidenav.set(false);
    }
  }
}
