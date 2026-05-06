import { Component, signal, OnInit, OnDestroy, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NotificationComponent } from '../core/notifications/notification.component';
import { ConfirmationComponent } from '../core/confirmation/confirmation.component';
import { AuthService } from '../core/auth/auth.service';

const SIDENAV_STORAGE_KEY = 'nav.sidebarCollapsed';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidenavComponent, TopbarComponent, NotificationComponent, ConfirmationComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);

  sidenavCollapsed = signal<boolean>(this.readPersistedCollapsed());
  showMobileSidenav = signal(false);
  isMobile = signal(false);

  private destroy$ = new Subject<void>();

  constructor() {
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
    if (this.authService.getMustChangePassword()) {
      this.router.navigate(['/auth/change-password']);
      return;
    }

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
