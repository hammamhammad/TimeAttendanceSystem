import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../core/menu/menu.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { PermissionService } from '../../core/auth/permission.service';

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
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);
  
  menuItems = this.menuService.getMenuItems$();

  t(key: string): string {
    return this.i18n.t(key);
  }

  hasPerm(permission?: string): boolean {
    return !permission || this.permissionService.has(permission);
  }
}