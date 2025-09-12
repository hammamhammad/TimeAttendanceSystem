import { Component, OnInit, signal, computed, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { UsersService } from '../users.service';
import { UserDto, CreateUserRequest, UpdateUserRequest } from '../../../shared/models/user.model';

interface Role {
  id: number;
  name: string;
}

interface Branch {
  id: number;
  name: string;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() user: UserDto | null = null;
  @Input() show = false;
  @Output() showChange = new EventEmitter<boolean>();
  @Output() userSaved = new EventEmitter<UserDto>();
  @Output() userCreated = new EventEmitter<UserDto>();

  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private router = inject(Router);
  public i18n = inject(I18nService);

  userForm!: FormGroup;
  loading = signal(false);
  error = signal('');
  
  availableRoles = signal<Role[]>([]);
  availableBranches = signal<Branch[]>([]);

  isEditMode = computed(() => !!this.user);
  isSystemAdmin = computed(() => {
    return this.user?.username?.toLowerCase() === 'systemadmin';
  });
  modalTitle = computed(() => 
    this.isEditMode() ? this.t('users.edit_user') : this.t('users.create_user')
  );

  ngOnInit(): void {
    this.initializeForm();
    this.loadRoles();
    this.loadBranches();
  }

  ngOnChanges(): void {
    if (this.userForm && this.user) {
      this.populateForm();
    }
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  initializeForm(): void {
    const isSystemAdminUser = this.isSystemAdmin();
    const isCreateMode = !this.isEditMode();
    
    this.userForm = this.fb.group({
      username: [
        { value: '', disabled: this.isEditMode() || isSystemAdminUser }, 
        [Validators.required, Validators.minLength(3)]
      ],
      email: [
        { value: '', disabled: isSystemAdminUser },
        [Validators.required, Validators.email]
      ],
      phone: [{ value: '', disabled: isSystemAdminUser }],
      password: [
        { value: '', disabled: !isCreateMode || isSystemAdminUser },
        isCreateMode ? [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
        ] : []
      ],
      confirmPassword: [
        { value: '', disabled: !isCreateMode || isSystemAdminUser },
        isCreateMode ? [Validators.required] : []
      ],
      preferredLanguage: [
        { value: 'en', disabled: isSystemAdminUser },
        Validators.required
      ],
      roleIds: [
        { value: [], disabled: isSystemAdminUser },
        Validators.required
      ],
      branchIds: [{ value: [], disabled: isSystemAdminUser }]
    });

    // Add password confirmation validator
    if (isCreateMode) {
      this.userForm.get('confirmPassword')?.setValidators([
        Validators.required,
        this.passwordMatchValidator.bind(this)
      ]);
    }

    // Add isActive control only for edit mode
    if (this.isEditMode()) {
      this.userForm.addControl('isActive', this.fb.control({ value: true, disabled: isSystemAdminUser }));
    }

    if (this.user) {
      this.populateForm();
    }
  }

  populateForm(): void {
    if (!this.user || !this.userForm) return;

    // Map role names to IDs (in real app, roles would have IDs)
    const roleIds = (this.user.roles || []).map(roleName => {
      const role = this.availableRoles().find(r => r.name === roleName);
      return role?.id || 0;
    }).filter(id => id > 0);

    // Map branch names to IDs (in real app, branches would have IDs)
    const branchIds = (this.user.branches || []).map(branchName => {
      const branch = this.availableBranches().find(b => b.name === branchName);
      return branch?.id || 0;
    }).filter(id => id > 0);

    this.userForm.patchValue({
      username: this.user.username,
      email: this.user.email,
      phone: this.user.phone || '',
      preferredLanguage: this.user.preferredLanguage,
      roleIds: roleIds,
      branchIds: branchIds,
      isActive: this.user.isActive
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    // Prevent editing system admin user
    if (this.isSystemAdmin()) {
      this.error.set(this.t('users.cannot_edit_system_admin'));
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const formValue = this.userForm.value;

    if (this.isEditMode()) {
      this.updateUser(formValue);
    } else {
      this.createUser(formValue);
    }
  }

  createUser(formValue: any): void {
    const request: CreateUserRequest = {
      username: formValue.username,
      email: formValue.email,
      phone: formValue.phone || undefined,
      password: formValue.password,
      preferredLanguage: formValue.preferredLanguage,
      roleIds: formValue.roleIds,
      branchIds: formValue.branchIds
    };

    this.usersService.createUser(request).subscribe({
      next: (response) => {
        this.loading.set(false);
        // Fetch the created user to emit complete data
        this.usersService.getUserById(response.id).subscribe({
          next: (user) => {
            this.userCreated.emit(user);
            this.closeModal();
          }
        });
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(this.getErrorMessage(error));
      }
    });
  }

  updateUser(formValue: any): void {
    if (!this.user) return;

    const request: UpdateUserRequest = {
      email: formValue.email,
      phone: formValue.phone || undefined,
      preferredLanguage: formValue.preferredLanguage,
      isActive: formValue.isActive
    };

    this.usersService.updateUser(this.user.id, request).subscribe({
      next: () => {
        this.loading.set(false);
        // Fetch updated user data
        this.usersService.getUserById(this.user!.id).subscribe({
          next: (user) => {
            this.userSaved.emit(user);
            this.closeModal();
          }
        });
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(this.getErrorMessage(error));
      }
    });
  }

  onRoleToggle(roleId: number): void {
    const currentRoles = this.userForm.get('roleIds')?.value || [];
    const index = currentRoles.indexOf(roleId);
    
    if (index > -1) {
      currentRoles.splice(index, 1);
    } else {
      currentRoles.push(roleId);
    }
    
    this.userForm.get('roleIds')?.setValue([...currentRoles]);
    this.userForm.get('roleIds')?.markAsTouched();
  }

  onBranchToggle(branchId: number): void {
    const currentBranches = this.userForm.get('branchIds')?.value || [];
    const index = currentBranches.indexOf(branchId);
    
    if (index > -1) {
      currentBranches.splice(index, 1);
    } else {
      currentBranches.push(branchId);
    }
    
    this.userForm.get('branchIds')?.setValue([...currentBranches]);
  }

  isRoleSelected(roleId: number): boolean {
    const roles = this.userForm.get('roleIds')?.value || [];
    return roles.includes(roleId);
  }

  isBranchSelected(branchId: number): boolean {
    const branches = this.userForm.get('branchIds')?.value || [];
    return branches.includes(branchId);
  }

  closeModal(): void {
    this.router.navigate(['/users']);
  }

  getErrorMessage(error: any): string {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.t('errors.unknown');
  }

  // Form field helpers
  getFieldError(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return this.t('validation.required');
      }
      if (field.errors['email']) {
        return this.t('validation.email');
      }
      if (field.errors['minlength']) {
        return this.t('validation.minlength').replace('{{min}}', field.errors['minlength'].requiredLength);
      }
      if (field.errors['pattern'] && fieldName === 'password') {
        return 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.';
      }
      if (field.errors['passwordMismatch']) {
        return 'Passwords do not match.';
      }
    }
    return '';
  }

  passwordMatchValidator(control: any) {
    const password = this.userForm?.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  private loadRoles(): void {
    this.usersService.getRoles().subscribe({
      next: (roles) => {
        this.availableRoles.set(roles);
      },
      error: (error) => {
        console.error('Failed to load roles:', error);
      }
    });
  }

  private loadBranches(): void {
    this.usersService.getBranches().subscribe({
      next: (branches) => {
        this.availableBranches.set(branches);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }
}