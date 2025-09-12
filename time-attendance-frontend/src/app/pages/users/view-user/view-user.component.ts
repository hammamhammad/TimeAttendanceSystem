import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { UsersService } from '../users.service';
import { User } from '../../../shared/models/user.model';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [CommonModule, RouterLink, HasPermissionDirective],
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

  onEdit() {
    this.router.navigate(['/users', this.userId, 'edit']);
  }

  onBack() {
    this.router.navigate(['/users']);
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
}