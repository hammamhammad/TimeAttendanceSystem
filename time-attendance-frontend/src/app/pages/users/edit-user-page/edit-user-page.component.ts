import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { UsersService } from '../users.service';
import { UserDto } from '../../../shared/models/user.model';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-edit-user-page',
  standalone: true,
  imports: [CommonModule, RouterModule, UserFormComponent],
  template: `
    @if (loading()) {
      <div class="d-flex justify-content-center py-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>
        </div>
      </div>
    } @else if (user()) {
      @if (isSystemAdmin(user()!)) {
        <div class="container-fluid">
          <div class="alert alert-warning">
            <i class="fa-solid fa-shield-alt me-2"></i>
            {{ i18n.t('users.system_admin_cannot_be_edited') }}
          </div>
          <div class="d-flex justify-content-start">
            <button type="button" class="btn btn-outline-secondary" routerLink="/users">
              <i class="fa-solid fa-arrow-left me-2"></i>
              {{ i18n.t('common.back') }}
            </button>
          </div>
        </div>
      } @else {
        <app-user-form 
          [user]="user()" 
          [show]="true"
          (userSaved)="onUserSaved($event)">
        </app-user-form>
      }
    } @else {
      <div class="alert alert-danger">
        <i class="fa-solid fa-exclamation-triangle me-2"></i>
        {{ error() || i18n.t('users.user_not_found') }}
      </div>
    }
  `
})
export class EditUserPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersService = inject(UsersService);
  public i18n = inject(I18nService);

  user = signal<UserDto | null>(null);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(userId);
    } else {
      this.error.set('Invalid user ID');
      this.loading.set(false);
    }
  }

  isSystemAdmin(user: UserDto): boolean {
    return user.username.toLowerCase() === 'systemadmin';
  }

  loadUser(userId: string): void {
    this.usersService.getUserById(+userId).subscribe({
      next: (user) => {
        this.user.set(user);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }
    });
  }

  onUserSaved(user: UserDto): void {
    this.router.navigate(['/users', user.id, 'view']);
  }

  private getErrorMessage(error: any): string {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t('errors.unknown');
  }
}