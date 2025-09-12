import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from './notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Toast Container -->
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999;">
      @for (notification of notificationService.notifications$(); track notification.id) {
        <div 
          class="toast show"
          [ngClass]="getToastClass(notification.type)"
          role="alert" 
          aria-live="assertive" 
          aria-atomic="true"
        >
          <div class="toast-header">
            <div 
              class="rounded me-2"
              [ngClass]="getIconClass(notification.type)"
              style="width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;"
            >
              <i class="fas" [ngClass]="getIcon(notification.type)" style="font-size: 12px;"></i>
            </div>
            <strong class="me-auto">{{ notification.title }}</strong>
            <small class="text-muted">now</small>
            <button 
              type="button" 
              class="btn-close" 
              (click)="notificationService.remove(notification.id)"
              aria-label="Close"
            ></button>
          </div>
          @if (notification.message) {
            <div class="toast-body">
              {{ notification.message }}
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .toast {
      min-width: 300px;
      margin-bottom: 0.5rem;
    }
    
    .toast-success .toast-header {
      background-color: #d1e7dd;
      border-color: #badbcc;
    }
    
    .toast-error .toast-header {
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }
    
    .toast-warning .toast-header {
      background-color: #fff3cd;
      border-color: #ffecb5;
    }
    
    .toast-info .toast-header {
      background-color: #d1ecf1;
      border-color: #bee5eb;
    }
  `]
})
export class NotificationComponent {
  notificationService = inject(NotificationService);

  getToastClass(type: string): string {
    switch (type) {
      case 'success':
        return 'toast-success';
      case 'error':
        return 'toast-error';
      case 'warning':
        return 'toast-warning';
      case 'info':
        return 'toast-info';
      default:
        return 'toast-info';
    }
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-success';
      case 'error':
        return 'bg-danger';
      case 'warning':
        return 'bg-warning';
      case 'info':
        return 'bg-info';
      default:
        return 'bg-info';
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'fa-check';
      case 'error':
        return 'fa-times';
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'info':
        return 'fa-info';
      default:
        return 'fa-info';
    }
  }
}