import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center py-5">
      <i class="fa-solid fa-lock fa-5x text-danger mb-4"></i>
      <h1 class="display-4 fw-bold text-danger">403</h1>
      <h2 class="mb-3">Unauthorized Access</h2>
      <p class="lead mb-4">
        You don't have permission to access this resource.
      </p>
      <button class="btn btn-primary" (click)="goBack()">
        <i class="fa-solid fa-arrow-left me-2"></i>
        Go Back
      </button>
    </div>
  `,
  styles: []
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}