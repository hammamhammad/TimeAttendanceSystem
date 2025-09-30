import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { UsersService } from '../users.service';
import { UpdateUserRequest, User } from '../../../shared/models/user.model';
import { Role } from '../../../shared/models/role.model';
import { Branch } from '../../../shared/models/branch.model';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);
  public i18n = inject(I18nService);

  userForm: FormGroup;
  loading = signal(false);
  submitting = signal(false);
  error = signal<string | null>(null);
  user = signal<User | null>(null);
  availableRoles = signal<Role[]>([]);
  availableBranches = signal<Branch[]>([]);
  selectedRoleIds = signal<number[]>([]);
  selectedBranchIds = signal<number[]>([]);
  userId: number = 0;

  constructor() {
    this.userForm = this.createForm();
  }

  ngOnInit() {
    this.userId = +this.route.snapshot.params['id'];
    if (this.userId) {
      // Load roles first, then user data to properly map role names to IDs
      this.loadRoles().then(() => {
        this.loadUser();
      });
      this.loadBranches();
    } else {
      this.router.navigate(['/users']);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      preferredLanguage: ['en', Validators.required],
      isActive: [true],
      roleIds: [[], Validators.required],
      branchIds: [[]]
    });
  }

  private loadUser() {
    this.loading.set(true);
    this.usersService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user.set(user);
        this.populateForm(user);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load user');
        this.loading.set(false);
        console.error('Error loading user:', error);
      }
    });
  }

  private loadRoles(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usersService.getRoles().subscribe({
        next: (roles) => {
          this.availableRoles.set(roles);
          resolve();
        },
        error: (error) => {
          console.error('Error loading roles:', error);
          reject(error);
        }
      });
    });
  }

  private loadBranches() {
    this.usersService.getBranches().subscribe({
      next: (branches) => {
        this.availableBranches.set(branches);
      },
      error: (error) => {
        console.error('Error loading branches:', error);
      }
    });
  }

  private populateForm(user: User) {
    this.userForm.patchValue({
      email: user.email,
      phone: user.phone || '',
      preferredLanguage: user.preferredLanguage,
      isActive: user.isActive
    });

    // Map role names to role IDs
    const roleIds: number[] = [];
    if (user.roles && this.availableRoles().length > 0) {
      user.roles.forEach(roleName => {
        const role = this.availableRoles().find(r => r.name === roleName);
        if (role) {
          roleIds.push(role.id);
        }
      });
    }

    this.selectedRoleIds.set(roleIds);
    this.selectedBranchIds.set(user.branches?.map(b => b.id) || []);

    this.userForm.patchValue({
      roleIds: this.selectedRoleIds(),
      branchIds: this.selectedBranchIds()
    });
  }

  onRoleToggle(roleId: number) {
    const currentRoles = this.selectedRoleIds();
    if (currentRoles.includes(roleId)) {
      this.selectedRoleIds.set(currentRoles.filter(id => id !== roleId));
    } else {
      this.selectedRoleIds.set([...currentRoles, roleId]);
    }
    this.userForm.patchValue({ roleIds: this.selectedRoleIds() });
  }

  onBranchToggle(branchId: number) {
    const currentBranches = this.selectedBranchIds();
    if (currentBranches.includes(branchId)) {
      this.selectedBranchIds.set(currentBranches.filter(id => id !== branchId));
    } else {
      this.selectedBranchIds.set([...currentBranches, branchId]);
    }
    this.userForm.patchValue({ branchIds: this.selectedBranchIds() });
  }

  isRoleSelected(roleId: number): boolean {
    return this.selectedRoleIds().includes(roleId);
  }

  isBranchSelected(branchId: number): boolean {
    return this.selectedBranchIds().includes(branchId);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.submitting.set(true);
      this.error.set(null);

      const formValue = this.userForm.value;
      const request: UpdateUserRequest = {
        email: formValue.email,
        phone: formValue.phone || null,
        preferredLanguage: formValue.preferredLanguage,
        isActive: formValue.isActive,
        roleIds: this.selectedRoleIds(),
        branchIds: this.selectedBranchIds()
      };

      this.usersService.updateUser(this.userId, request).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.error.set(error.error?.message || 'An error occurred while updating the user');
          this.submitting.set(false);
          console.error('Error updating user:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/users']);
  }

  private markFormGroupTouched() {
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    if (errors['required']) return this.i18n.t('validation.required');
    if (errors['email']) return this.i18n.t('validation.invalid_email');
    if (errors['minlength']) return this.i18n.t('validation.min_length') + ': ' + errors['minlength'].requiredLength;
    if (errors['maxlength']) return this.i18n.t('validation.max_length') + ': ' + errors['maxlength'].requiredLength;
    
    return this.i18n.t('validation.invalid');
  }

  t(key: string): string {
    return this.i18n.t(key);
  }
}