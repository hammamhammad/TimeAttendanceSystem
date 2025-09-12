import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserDto } from '../../../shared/models/user.model';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-create-user-page',
  standalone: true,
  imports: [CommonModule, RouterModule, UserFormComponent],
  template: `
    <app-user-form 
      [user]="null" 
      [show]="true"
      (userCreated)="onUserCreated($event)">
    </app-user-form>
  `
})
export class CreateUserPageComponent {
  private router = inject(Router);
  public i18n = inject(I18nService);

  onUserCreated(user: UserDto): void {
    this.router.navigate(['/users', user.id, 'view']);
  }
}