import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-tenant-configuration',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tenant-configuration.component.html',
  styleUrl: './tenant-configuration.component.css'
})
export class TenantConfigurationComponent {
  i18n = inject(I18nService);
  private permissionService = inject(PermissionService);
  private authService = inject(AuthService);

  t(key: string): string {
    return this.i18n.t(key);
  }

  /** Check if user has admin-level access (Admin or SystemAdmin role) */
  get isAdmin(): boolean {
    return this.authService.isAdmin() || this.authService.isSystemAdmin();
  }

  hasPermission(permission: string): boolean {
    return this.isAdmin || this.permissionService.has(permission);
  }

  navItems = [
    { route: 'general', icon: 'fa-solid fa-gear', labelKey: 'tenant_configuration.general.title' },
    { route: 'attendance', icon: 'fa-solid fa-clock', labelKey: 'tenant_configuration.attendance.title' },
    { route: 'leave', icon: 'fa-solid fa-calendar-alt', labelKey: 'tenant_configuration.leave.title' },
    { route: 'approval', icon: 'fa-solid fa-check-double', labelKey: 'tenant_configuration.approval.title' },
    { route: 'notification', icon: 'fa-solid fa-bell', labelKey: 'tenant_configuration.notification.title' },
    { route: 'mobile', icon: 'fa-solid fa-mobile-alt', labelKey: 'tenant_configuration.mobile.title' },
    { route: 'security', icon: 'fa-solid fa-shield-alt', labelKey: 'tenant_configuration.security.title' }
  ];
}
