import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center py-5">
      <i class="fa-solid fa-question-circle fa-5x text-warning mb-4"></i>
      <h1 class="display-4 fw-bold text-dark">404</h1>
      <h2 class="mb-3">Page Not Found</h2>
      <p class="lead mb-4">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button class="btn btn-primary" (click)="goHome()">
        <i class="fa-solid fa-home me-2"></i>
        Go Home
      </button>
    </div>
  `,
  styles: []
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/dashboard']);
  }
}