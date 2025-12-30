import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MenuService } from '../../core/menu/menu.service';
import { I18nService } from '../../core/i18n/i18n.service';

/**
 * Sidenav component for Self-Service Portal
 * Simplified navigation without admin permission checks
 */
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Input() collapsed = signal(false);

  private menuService = inject(MenuService);
  private router = inject(Router);
  public i18n = inject(I18nService);

  menuItems = this.menuService.getMenuItems$();

  t(key: string): string {
    return this.i18n.t(key);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
