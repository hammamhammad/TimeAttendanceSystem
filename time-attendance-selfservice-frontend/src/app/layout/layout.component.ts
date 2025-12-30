import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NotificationComponent } from '../core/notifications/notification.component';
import { ConfirmationComponent } from '../core/confirmation/confirmation.component';
import { AuthService } from '../core/auth/auth.service';

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

  sidenavCollapsed = signal(false);
  showMobileSidenav = signal(false);
  isMobile = signal(false);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Check if user must change password
    if (this.authService.getMustChangePassword()) {
      this.router.navigate(['/auth/change-password']);
      return;
    }

    this.checkScreenSize();

    // Listen for window resize
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

  private checkScreenSize(): void {
    const isMobile = window.innerWidth < 768;
    this.isMobile.set(isMobile);
    
    if (isMobile) {
      this.sidenavCollapsed.set(false);
      this.showMobileSidenav.set(false);
    } else {
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