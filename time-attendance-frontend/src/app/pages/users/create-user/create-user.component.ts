import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { UsersService } from '../users.service';
import { CreateUserRequest } from '../../../shared/models/user.model';
import { Role } from '../../../shared/models/role.model';
import { Branch } from '../../../shared/models/branch.model';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private usersService = inject(UsersService);
  public i18n = inject(I18nService);

  userForm: FormGroup;
  loading = signal(false);
  submitting = signal(false);
  error = signal<string | null>(null);
  availableRoles = signal<Role[]>([]);
  availableBranches = signal<Branch[]>([]);
  selectedRoleIds = signal<number[]>([]);
  selectedBranchIds = signal<number[]>([]);

  constructor() {
    this.userForm = this.createForm();
  }

  ngOnInit() {
    this.loadRoles();
    this.loadBranches();
  }

  private createForm(): FormGroup {
    const form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      preferredLanguage: ['en', Validators.required],
      roleIds: [[], Validators.required],
      branchIds: [[]]
    });

    // Add password confirmation validator
    form.get('confirmPassword')?.setValidators([
      Validators.required,
      this.passwordMatchValidator.bind(this)
    ]);

    return form;
  }

  passwordMatchValidator(control: any) {
    const password = this.userForm?.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  private loadRoles() {
    this.loading.set(true);
    this.usersService.getRoles().subscribe({
      next: (roles) => {
        this.availableRoles.set(roles);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load roles');
        this.loading.set(false);
        console.error('Error loading roles:', error);
      }
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
      const request: CreateUserRequest = {
        username: formValue.username,
        email: formValue.email,
        phone: formValue.phone || null,
        password: formValue.password,
        preferredLanguage: formValue.preferredLanguage,
        roleIds: this.selectedRoleIds(),
        branchIds: this.selectedBranchIds()
      };

      this.usersService.createUser(request).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.error.set(error.error?.message || 'An error occurred while creating the user');
          this.submitting.set(false);
          console.error('Error creating user:', error);
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
    if (errors['pattern'] && fieldName === 'password') {
      return 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.';
    }
    if (errors['passwordMismatch']) {
      return 'Passwords do not match.';
    }
    
    return this.i18n.t('validation.invalid');
  }

  t(key: string): string {
    return this.i18n.t(key);
  }
}