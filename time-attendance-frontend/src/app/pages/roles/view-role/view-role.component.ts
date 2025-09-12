import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RolesService } from '../roles.service';
import { Role } from '../../../shared/models/role.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';

@Component({
  selector: 'app-view-role',
  standalone: true,
  imports: [CommonModule, RouterModule, HasPermissionDirective],
  template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('roles.view_details') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/roles">{{ i18n.t('roles.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('roles.view_details') }}</li>
            </ol>
          </nav>
        </div>
        <div class="btn-group">
          <button 
            *appHasPermission="PERMISSIONS.ROLE_UPDATE"
            type="button" 
            class="btn btn-primary"
            (click)="onEdit()">
            <i class="fa-solid fa-edit me-2"></i>
            {{ i18n.t('roles.edit') }}
          </button>
          <button 
            type="button" 
            class="btn btn-outline-secondary"
            (click)="onBack()">
            <i class="fa-solid fa-arrow-left me-2"></i>
            {{ i18n.t('common.back') }}
          </button>
        </div>
      </div>

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>
          </div>
        </div>
      } @else if (role()) {
        <!-- Role Details -->
        <div class="row">
          <!-- Main Information Card -->
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">
                  <div class="d-flex align-items-center">
                    <div class="avatar-sm me-3">
                      <div class="avatar-title bg-info-subtle text-info rounded-circle">
                        <i class="fa-solid fa-user-shield"></i>
                      </div>
                    </div>
                    <div>
                      <div class="fw-medium">
                        {{ role()?.name }}
                        @if (role()?.isSystem) {
                          <i class="fa-solid fa-shield-alt text-primary ms-2" [title]="i18n.t('roles.system_role')"></i>
                        }
                      </div>
                      <small class="text-muted">{{ role()?.permissions?.length || 0 }} {{ i18n.t('roles.permissions_assigned') }}</small>
                    </div>
                  </div>
                </h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <!-- Basic Information -->
                  <div class="col-md-6">
                    <dl class="row">
                      <dt class="col-sm-5">{{ i18n.t('roles.name') }}:</dt>
                      <dd class="col-sm-7">{{ role()?.name }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('roles.type') }}:</dt>
                      <dd class="col-sm-7">
                        @if (role()?.isSystem) {
                          <span class="badge bg-warning-subtle text-warning">{{ i18n.t('roles.system') }}</span>
                        } @else {
                          <span class="badge bg-success-subtle text-success">{{ i18n.t('roles.custom') }}</span>
                        }
                      </dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('roles.user_count') }}:</dt>
                      <dd class="col-sm-7">
                        <span class="badge bg-primary-subtle text-primary">{{ role()?.userCount || 0 }}</span>
                      </dd>
                    </dl>
                  </div>

                  <!-- Status Information -->
                  <div class="col-md-6">
                    <dl class="row">
                      <dt class="col-sm-5">{{ i18n.t('roles.created_at') }}:</dt>
                      <dd class="col-sm-7">{{ formatDate(role()!.createdAtUtc) }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('roles.permissions') }}:</dt>
                      <dd class="col-sm-7">{{ role()?.permissions?.length || 0 }}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions Card -->
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <h6 class="card-title mb-0">{{ i18n.t('common.actions') }}</h6>
              </div>
              <div class="card-body">
                <div class="d-grid gap-2">
                  <button 
                    *appHasPermission="PERMISSIONS.ROLE_UPDATE"
                    type="button" 
                    class="btn btn-outline-primary"
                    (click)="onEdit()">
                    <i class="fa-solid fa-edit me-2"></i>
                    {{ i18n.t('roles.edit') }}
                  </button>
                  <button 
                    *appHasPermission="PERMISSIONS.ROLE_ASSIGN_PERMISSIONS"
                    type="button" 
                    class="btn btn-outline-info"
                    (click)="onManagePermissions()">
                    <i class="fa-solid fa-key me-2"></i>
                    {{ i18n.t('roles.manage_permissions') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Permissions Card -->
        <div class="card mt-4">
          <div class="card-header">
            <h6 class="card-title mb-0">
              <i class="fa-solid fa-key me-2"></i>
              {{ i18n.t('roles.permissions') }}
            </h6>
          </div>
          <div class="card-body">
            @if (role()?.permissions && role()!.permissions.length > 0) {
              <div class="row g-2">
                @for (permission of role()?.permissions; track permission.key || permission.id) {
                  <div class="col-md-6 col-lg-4">
                    <div class="permission-item border rounded p-2">
                      <div class="d-flex align-items-start">
                        <i class="fas me-2 text-muted mt-1" [ngClass]="getPermissionIcon(permission.key)"></i>
                        <div class="flex-grow-1">
                          <div class="d-flex align-items-center mb-1">
                            <small class="fw-medium me-2">{{ getPermissionResource(permission.key) }}</small>
                            <span class="badge" [ngClass]="getActionBadgeClass(permission.key)">
                              {{ getPermissionAction(permission.key) }}
                            </span>
                          </div>
                          <p class="text-muted small mb-0">
                            {{ getPermissionDescription(permission) }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <div class="text-center py-4">
                <i class="fa-solid fa-key fa-2x text-muted mb-2"></i>
                <p class="text-muted mb-0">{{ i18n.t('roles.no_permissions') }}</p>
              </div>
            }
          </div>
        </div>
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('roles.role_not_found') }}
        </div>
      }
    </div>
  `
})
export class ViewRoleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private rolesService = inject(RolesService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Permission constants for use in template
  readonly PERMISSIONS = {
    ROLE_UPDATE: `${PermissionResources.ROLE}.${PermissionActions.UPDATE}`,
    ROLE_ASSIGN_PERMISSIONS: `${PermissionResources.ROLE}.${PermissionActions.ASSIGN_PERMISSION}`
  };

  role = signal<Role | null>(null);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    const roleId = this.route.snapshot.paramMap.get('id');
    if (roleId) {
      this.loadRole(roleId);
    } else {
      this.error.set('Invalid role ID');
      this.loading.set(false);
    }
  }

  loadRole(roleId: string): void {
    this.rolesService.getRoleById(+roleId).subscribe({
      next: (role) => {
        this.role.set(role);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }
    });
  }

  onEdit(): void {
    if (this.role()) {
      this.router.navigate(['/roles', this.role()!.id, 'edit']);
    }
  }

  onManagePermissions(): void {
    if (this.role()) {
      this.router.navigate(['/roles', this.role()!.id, 'edit']);
    }
  }

  onBack(): void {
    this.router.navigate(['/roles']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getPermissionIcon(key: string): string {
    if (key.includes('read')) return 'fa-eye';
    if (key.includes('create')) return 'fa-plus';
    if (key.includes('update')) return 'fa-edit';
    if (key.includes('delete')) return 'fa-trash';
    return 'fa-key';
  }

  getPermissionResource(key: string): string {
    const parts = key.split('.');
    return parts[0] || key;
  }

  getPermissionAction(key: string): string {
    const parts = key.split('.');
    return parts[1] || 'unknown';
  }

  getActionBadgeClass(key: string): string {
    if (key.includes('read')) return 'bg-info-subtle text-info';
    if (key.includes('create')) return 'bg-success-subtle text-success';
    if (key.includes('update')) return 'bg-warning-subtle text-warning';
    if (key.includes('delete')) return 'bg-danger-subtle text-danger';
    return 'bg-secondary-subtle text-secondary';
  }

  getPermissionDescription(permission: any): string {
    return permission.description || `${permission.key} permission`;
  }

  private getErrorMessage(error: any): string {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t('errors.unknown');
  }
}