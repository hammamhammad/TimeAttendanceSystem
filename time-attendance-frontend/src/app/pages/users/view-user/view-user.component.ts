import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { UsersService } from '../users.service';
import { User } from '../../../shared/models/user.model';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { BadgeListComponent, BadgeItem } from '../../../shared/components/badge-list/badge-list.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [CommonModule, HasPermissionDirective, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, BadgeListComponent, DefinitionListComponent],
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  error = signal<string | null>(null);
  user = signal<User | null>(null);
  userId: number = 0;

  // Permission constants for use in template
  readonly PERMISSIONS = {
    USER_UPDATE: `${PermissionResources.USER}.${PermissionActions.UPDATE}`,
    USER_DELETE: `${PermissionResources.USER}.${PermissionActions.DELETE}`,
    USER_LOCK: `${PermissionResources.USER}.${PermissionActions.LOCK}`,
    USER_UNLOCK: `${PermissionResources.USER}.${PermissionActions.UNLOCK}`,
    USER_ASSIGN_ROLE: `${PermissionResources.USER}.${PermissionActions.ASSIGN_ROLE}`,
    USER_REMOVE_ROLE: `${PermissionResources.USER}.${PermissionActions.REMOVE_ROLE}`,
    USER_MANAGE: `${PermissionResources.USER}.${PermissionActions.MANAGE}`
  };

  ngOnInit() {
    this.userId = +this.route.snapshot.params['id'];
    if (this.userId) {
      this.loadUser();
    } else {
      this.router.navigate(['/users']);
    }
  }

  private loadUser() {
    this.loading.set(true);
    this.usersService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user.set(user);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load user');
        this.loading.set(false);
        console.error('Error loading user:', error);
      }
    });
  }


  onManageRoles() {
    // Navigate to role management page or modal
    // This could be implemented later
    console.log('Manage roles for user:', this.userId);
  }

  isUserLocked(lockoutEndUtc: string | undefined): boolean {
    if (!lockoutEndUtc) return false;
    return new Date(lockoutEndUtc) > new Date();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  getRoleName(role: any): string {
    if (typeof role === 'string') {
      return role;
    } else if (role && typeof role === 'object' && role.name) {
      return role.name;
    } else if (role && typeof role === 'object' && role.roleName) {
      return role.roleName;
    }
    return String(role) || 'Unknown Role';
  }

  getBranchName(branch: any): string {
    if (typeof branch === 'string') {
      return branch;
    } else if (branch && typeof branch === 'object' && branch.name) {
      return branch.name;
    } else if (branch && typeof branch === 'object' && branch.branchName) {
      return branch.branchName;
    }
    return String(branch) || 'Unknown Branch';
  }

  // Computed properties for badge lists
  roleBadges = computed<BadgeItem[]>(() => {
    const user = this.user();
    if (!user?.roles || user.roles.length === 0) return [];

    return user.roles.map((role, index) => ({
      id: index,
      label: this.getRoleName(role),
      variant: 'info' as const
    }));
  });

  branchBadges = computed<BadgeItem[]>(() => {
    const user = this.user();
    if (!user?.branches || user.branches.length === 0) return [];

    return user.branches.map((branch, index) => ({
      id: index,
      label: this.getBranchName(branch),
      variant: 'light' as const
    }));
  });

  // Computed properties for status badges
  userStatusBadge = computed<{ label: string; variant: 'success' | 'danger' | 'light' }>(() => {
    const user = this.user();
    if (this.isUserLocked(user?.lockoutEndUtc)) {
      return { label: this.t('users.locked'), variant: 'danger' };
    } else if (user?.isActive) {
      return { label: this.t('common.active'), variant: 'success' };
    } else {
      return { label: this.t('common.inactive'), variant: 'light' };
    }
  });

  twoFactorBadge = computed<{ label: string; variant: 'success' | 'light' }>(() => {
    const user = this.user();
    if (user?.twoFactorEnabled) {
      return { label: this.t('common.enabled'), variant: 'success' };
    } else {
      return { label: this.t('common.disabled'), variant: 'light' };
    }
  });

  // Computed properties for definition lists
  basicInfoItems = computed<DefinitionItem[]>(() => {
    const user = this.user();
    if (!user) return [];

    const language = user.preferredLanguage === 'ar'
      ? this.t('common.language_arabic')
      : this.t('common.language_english');

    return [
      { label: this.t('users.username'), value: user.username },
      { label: this.t('users.email'), value: user.email },
      { label: this.t('users.phone'), value: user.phone || '-' },
      { label: this.t('users.language'), value: language }
    ];
  });

  statusInfoItems = computed<DefinitionItem[]>(() => {
    const user = this.user();
    if (!user) return [];

    return [
      {
        label: this.t('common.status'),
        value: this.userStatusBadge().label,
        type: 'badge' as const,
        badgeVariant: this.userStatusBadge().variant
      },
      {
        label: this.t('users.created_at'),
        value: user.createdAtUtc!,
        type: 'date' as const
      },
      {
        label: this.t('users.two_factor'),
        value: this.twoFactorBadge().label,
        type: 'badge' as const,
        badgeVariant: this.twoFactorBadge().variant
      },
      { label: this.t('users.login_attempts'), value: String(user.accessFailedCount || 0) }
    ];
  });
}