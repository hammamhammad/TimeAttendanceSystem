import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from '../roles.service';
import { Role } from '../../../shared/models/role.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('roles.edit_role') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/roles">{{ i18n.t('roles.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('roles.edit_role') }}</li>
            </ol>
          </nav>
        </div>
        <button 
          type="button" 
          class="btn btn-outline-secondary"
          (click)="onCancel()"
          [disabled]="saving()">
          <i class="fa-solid fa-arrow-left me-2"></i>
          {{ i18n.t('common.back') }}
        </button>
      </div>

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>
          </div>
        </div>
      } @else if (role()) {
        <!-- Main Form Card -->
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="fa-solid fa-user-shield me-2"></i>
              {{ i18n.t('roles.role_information') }}
            </h5>
          </div>
          <div class="card-body">
            <form [formGroup]="roleForm" (ngSubmit)="onSubmit()">
              @if (error()) {
                <div class="alert alert-danger" role="alert">
                  <i class="fa-solid fa-exclamation-triangle me-2"></i>
                  {{ error() }}
                </div>
              }

              <!-- Role Name -->
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">
                    {{ i18n.t('roles.name') }}
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    formControlName="name"
                    [class.is-invalid]="isFieldInvalid('name')"
                    [placeholder]="i18n.t('roles.name_placeholder')"
                    [disabled]="role()?.isSystem || false"
                  />
                  @if (isFieldInvalid('name')) {
                    <div class="invalid-feedback">{{ getFieldError('name') }}</div>
                  }
                  @if (role()?.isSystem) {
                    <div class="form-text text-warning">
                      <i class="fa-solid fa-shield-alt me-1"></i>
                      {{ i18n.t('roles.system_role_name_readonly') }}
                    </div>
                  }
                </div>

                <div class="col-md-6">
                  <label class="form-label">{{ i18n.t('roles.type') }}</label>
                  <div class="form-control-plaintext">
                    @if (role()?.isSystem) {
                      <span class="badge bg-warning-subtle text-warning">
                        <i class="fa-solid fa-shield-alt me-1"></i>
                        {{ i18n.t('roles.system') }}
                      </span>
                    } @else {
                      <span class="badge bg-success-subtle text-success">
                        <i class="fa-solid fa-user-cog me-1"></i>
                        {{ i18n.t('roles.custom') }}
                      </span>
                    }
                  </div>
                </div>
              </div>

              <!-- Permissions Section -->
              <div class="mt-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 class="mb-0">
                    <i class="fa-solid fa-key me-2"></i>
                    {{ i18n.t('roles.permissions') }}
                  </h6>
                  <div class="btn-group btn-group-sm" role="group">
                    <button 
                      type="button" 
                      class="btn btn-outline-primary"
                      (click)="selectAllPermissions()"
                      [disabled]="saving()"
                    >
                      <i class="fa-solid fa-check-double me-1"></i>
                      {{ i18n.t('roles.select_all') }}
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-outline-secondary"
                      (click)="clearAllPermissions()"
                      [disabled]="saving()"
                    >
                      <i class="fa-solid fa-times me-1"></i>
                      {{ i18n.t('roles.clear_all') }}
                    </button>
                  </div>
                </div>

                <!-- Selected permissions summary -->
                <div class="alert alert-info py-2 px-3 mb-3">
                  <small>
                    <i class="fa-solid fa-info-circle me-2"></i>
                    {{ selectedPermissions().size }} {{ i18n.t('roles.permissions_selected') }} {{ i18n.t('common.of') }} {{ allPermissions().length }}
                  </small>
                </div>
                
                <!-- Permissions search -->
                <div class="mb-3">
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa-solid fa-search"></i>
                    </span>
                    <input 
                      type="text" 
                      class="form-control" 
                      [(ngModel)]="permissionSearchTerm"
                      [ngModelOptions]="{standalone: true}"
                      [placeholder]="i18n.t('roles.search_permissions_placeholder')"
                      [disabled]="saving()"
                    />
                  </div>
                </div>
                
                <!-- Permissions List -->
                <div class="permissions-list border rounded p-3" style="max-height: 400px; overflow-y: auto;">
                  @for (group of getFilteredGroupedPermissions(); track group.group) {
                    <div class="permission-group mb-4">
                      <!-- Group Header with Actions -->
                      <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                        <div class="d-flex align-items-center">
                          <!-- Collapse/Expand Button -->
                          <button
                            type="button"
                            class="btn btn-sm btn-link text-decoration-none p-0 me-2"
                            (click)="toggleGroupCollapse(group.group)"
                            [disabled]="saving()"
                            [title]="isGroupCollapsed(group.group) ? i18n.t('common.expand') : i18n.t('common.collapse')">
                            <i class="fas" [ngClass]="isGroupCollapsed(group.group) ? 'fa-chevron-right' : 'fa-chevron-down'"></i>
                          </button>

                          <h6 class="fw-bold text-primary mb-0">
                            <i class="fas fa-layer-group me-2"></i>
                            {{ group.group }}
                            <small class="text-muted fw-normal">({{ group.permissions.length }} {{ i18n.t('roles.permissions') }})</small>
                          </h6>
                        </div>

                        <!-- Group Actions -->
                        <div class="btn-group btn-group-sm" role="group">
                          <button
                            type="button"
                            class="btn"
                            [class.btn-primary]="areAllGroupPermissionsSelected(group)"
                            [class.btn-outline-primary]="!areAllGroupPermissionsSelected(group)"
                            (click)="toggleGroupSelection(group)"
                            [disabled]="saving()"
                            [title]="areAllGroupPermissionsSelected(group) ? i18n.t('roles.deselect_all_group') : i18n.t('roles.select_all_group')">
                            <i class="fas"
                               [ngClass]="areAllGroupPermissionsSelected(group) ? 'fa-check-square' : (areSomeGroupPermissionsSelected(group) ? 'fa-minus-square' : 'fa-square')"></i>
                            {{ areAllGroupPermissionsSelected(group) ? i18n.t('roles.deselect_all') : i18n.t('roles.select_all') }}
                          </button>
                        </div>
                      </div>

                      <!-- Permissions Grid (Collapsible) -->
                      @if (!isGroupCollapsed(group.group)) {
                        <div class="row g-2">
                        @for (permission of group.permissions; track permission.id) {
                          <div class="col-md-6 col-lg-4">
                            <div class="permission-item border rounded p-2" 
                                 [class.bg-light]="isPermissionSelected(permission.id)">
                              <div class="form-check d-flex align-items-start">
                                <input
                                  class="form-check-input mt-1"
                                  type="checkbox"
                                  [id]="'permission-' + permission.id"
                                  [checked]="isPermissionSelected(permission.id)"
                                  [disabled]="saving()"
                                  (change)="onTogglePermission(permission)"
                                />
                                <div class="form-check-content ms-2 flex-grow-1">
                                  <div class="d-flex align-items-center mb-1">
                                    <i class="fas me-1 text-muted" [ngClass]="getPermissionIcon(permission.key)" style="font-size: 0.75rem;"></i>
                                    <label class="form-check-label fw-medium me-2" [for]="'permission-' + permission.id">
                                      <small>{{ getPermissionResource(permission.key) }}</small>
                                    </label>
                                    <span class="badge" [ngClass]="getActionBadgeClass(permission.key)" style="font-size: 0.65rem;">
                                      {{ getPermissionAction(permission.key) }}
                                    </span>
                                  </div>
                                  <p class="text-muted small mb-0" style="font-size: 0.7rem; margin-left: 1.25rem;">
                                    {{ getPermissionDescription(permission) }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                        </div>
                      }
                    </div>
                  }
                  
                  @if (getFilteredGroupedPermissions().length === 0) {
                    <div class="text-center py-4">
                      <i class="fa-solid fa-key fa-2x text-muted mb-2"></i>
                      <p class="text-muted mb-0">{{ i18n.t('roles.no_permissions_available') }}</p>
                    </div>
                  }
                </div>
              </div>

              <!-- Form Actions -->
              <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-outline-secondary" (click)="onCancel()" [disabled]="saving()">
                  <i class="fa-solid fa-times me-2"></i>
                  {{ i18n.t('common.cancel') }}
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary" 
                  [disabled]="roleForm.invalid || saving()"
                >
                  @if (saving()) {
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  } @else {
                    <i class="fa-solid fa-save me-2"></i>
                  }
                  {{ saving() ? i18n.t('common.saving') : i18n.t('roles.update_role') }}
                </button>
              </div>
            </form>
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
export class EditRoleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private rolesService = inject(RolesService);
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  role = signal<Role | null>(null);
  allPermissions = signal<any[]>([]);
  selectedPermissions = signal<Set<string>>(new Set());
  loading = signal(true);
  saving = signal(false);
  error = signal('');
  permissionSearchTerm = '';

  // Collapse state for permission groups
  collapsedGroups = new Set<string>();

  roleForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
    
    const roleId = this.route.snapshot.paramMap.get('id');
    if (roleId) {
      // Load permissions and role concurrently
      this.loadPermissions();
      this.loadRole(roleId);
    } else {
      this.error.set(this.i18n.t('roles.invalid_role_id'));
      this.loading.set(false);
    }
  }

  initializeForm(): void {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  loadRole(roleId: string): void {
    this.rolesService.getRoleById(+roleId).subscribe({
      next: (role) => {
        this.role.set(role);
        this.populateForm(role);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }
    });
  }

  loadPermissions(): void {
    this.rolesService.getPermissions().subscribe({
      next: (permissions) => {
        this.allPermissions.set(permissions);
      },
      error: (error) => {
        console.error('Failed to load permissions:', error);
        this.allPermissions.set([]);
        this.notificationService.error(
          this.i18n.t('app.error'),
          this.i18n.t('roles.failed_to_load_permissions')
        );
      }
    });
  }

  populateForm(role: Role): void {
    this.roleForm.patchValue({
      name: role.name
    });

    // Set selected permissions
    const permissionIds = new Set(role.permissions.map(p => p.id.toString()));
    this.selectedPermissions.set(permissionIds);
  }

  onSubmit(): void {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set('');

    const formValue = this.roleForm.value;
    const updateRequest = {
      name: formValue.name,
      permissionIds: Array.from(this.selectedPermissions()).map(id => +id)
    };

    this.rolesService.updateRole(this.role()!.id, updateRequest).subscribe({
      next: () => {
        this.saving.set(false);
        this.notificationService.success(
          this.i18n.t('app.success'),
          this.i18n.t('roles.role_updated_successfully')
        );
        this.router.navigate(['/roles', this.role()!.id, 'view']);
      },
      error: (error) => {
        this.saving.set(false);
        this.error.set(this.getErrorMessage(error));
        this.notificationService.error(
          this.i18n.t('app.error'),
          this.getErrorMessage(error)
        );
      }
    });
  }

  onTogglePermission(permission: any): void {
    const selected = new Set(this.selectedPermissions());
    const permissionId = permission.id.toString();
    if (selected.has(permissionId)) {
      selected.delete(permissionId);
    } else {
      selected.add(permissionId);
    }
    this.selectedPermissions.set(selected);
  }

  selectAllPermissions(): void {
    const allIds = new Set(this.allPermissions().map(p => p.id.toString()));
    this.selectedPermissions.set(allIds);
  }

  clearAllPermissions(): void {
    this.selectedPermissions.set(new Set());
  }

  isPermissionSelected(permissionId: number | string): boolean {
    return this.selectedPermissions().has(permissionId.toString());
  }

  getFilteredGroupedPermissions(): any[] {
    const filtered = this.allPermissions().filter(p => 
      !this.permissionSearchTerm || 
      p.key.toLowerCase().includes(this.permissionSearchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(this.permissionSearchTerm.toLowerCase())
    );

    const grouped = new Map();
    filtered.forEach(permission => {
      const group = permission.key.split('.')[0];
      if (!grouped.has(group)) {
        grouped.set(group, []);
      }
      grouped.get(group).push(permission);
    });

    return Array.from(grouped.entries()).map(([group, permissions]) => ({
      group,
      permissions
    }));
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
    return permission.description || this.i18n.t('roles.no_description');
  }

  onCancel(): void {
    if (this.role()) {
      this.router.navigate(['/roles', this.role()!.id, 'view']);
    } else {
      this.router.navigate(['/roles']);
    }
  }

  // Form field helpers
  getFieldError(fieldName: string): string {
    const field = this.roleForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return this.i18n.t('validation.required');
      }
      if (field.errors['minlength']) {
        return this.i18n.t('validation.minlength').replace('{{min}}', field.errors['minlength'].requiredLength);
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.roleForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }

  // Group management methods
  toggleGroupCollapse(groupName: string): void {
    if (this.collapsedGroups.has(groupName)) {
      this.collapsedGroups.delete(groupName);
    } else {
      this.collapsedGroups.add(groupName);
    }
  }

  isGroupCollapsed(groupName: string): boolean {
    return this.collapsedGroups.has(groupName);
  }

  selectAllGroupPermissions(group: any): void {
    const selected = new Set(this.selectedPermissions());
    group.permissions.forEach((permission: any) => {
      selected.add(permission.id.toString());
    });
    this.selectedPermissions.set(selected);
  }

  deselectAllGroupPermissions(group: any): void {
    const selected = new Set(this.selectedPermissions());
    group.permissions.forEach((permission: any) => {
      selected.delete(permission.id.toString());
    });
    this.selectedPermissions.set(selected);
  }

  areAllGroupPermissionsSelected(group: any): boolean {
    return group.permissions.every((permission: any) =>
      this.selectedPermissions().has(permission.id.toString())
    );
  }

  areSomeGroupPermissionsSelected(group: any): boolean {
    const selectedCount = group.permissions.filter((permission: any) =>
      this.selectedPermissions().has(permission.id.toString())
    ).length;
    return selectedCount > 0 && selectedCount < group.permissions.length;
  }

  toggleGroupSelection(group: any): void {
    if (this.areAllGroupPermissionsSelected(group)) {
      this.deselectAllGroupPermissions(group);
    } else {
      this.selectAllGroupPermissions(group);
    }
  }

  private getErrorMessage(error: any): string {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t('errors.unknown');
  }
}