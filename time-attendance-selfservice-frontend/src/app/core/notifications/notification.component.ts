import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="erp-toast-container" aria-live="polite" aria-atomic="false">
      @for (notification of notificationService.notifications$(); track notification.id) {
        <div
          class="erp-toast"
          [ngClass]="'erp-toast-' + notification.type"
          role="alert"
          aria-atomic="true"
        >
          <div class="erp-toast-icon">
            <i class="fa-solid" [ngClass]="getIcon(notification.type)"></i>
          </div>
          <div class="erp-toast-body">
            <div class="erp-toast-title">{{ notification.title }}</div>
            @if (notification.message) {
              <div class="erp-toast-message">{{ notification.message }}</div>
            }
          </div>
          <button
            type="button"
            class="erp-toast-close"
            (click)="notificationService.remove(notification.id)"
            aria-label="Close"
          >
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .erp-toast-container {
      position: fixed;
      top: calc(var(--topbar-height, 44px) + 12px);
      right: 16px;
      z-index: 1080;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
      max-width: 400px;
    }

    .erp-toast {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      border-radius: var(--app-border-radius-md, 8px);
      box-shadow: var(--app-shadow-lg);
      border: 1px solid;
      background: #ffffff;
      pointer-events: auto;
      min-width: 300px;
      max-width: 400px;
      animation: erp-toast-slide-in 0.2s ease-out;
    }

    .erp-toast-success {
      background: var(--app-success-50, #F0FDF4);
      border-color: var(--app-success-200, #BBF7D0);
      color: var(--app-success-600, #16A34A);
    }
    .erp-toast-error {
      background: var(--app-danger-50, #FEF2F2);
      border-color: var(--app-danger-100, #FEE2E2);
      color: var(--app-danger-600, #DC2626);
    }
    .erp-toast-warning {
      background: var(--app-warning-50, #FFFBEB);
      border-color: var(--app-warning-100, #FEF3C7);
      color: var(--app-warning-600, #D97706);
    }
    .erp-toast-info {
      background: var(--app-info-50, #EFF6FF);
      border-color: var(--app-info-100, #DBEAFE);
      color: var(--app-info-600, #2563EB);
    }

    .erp-toast-icon {
      font-size: 18px;
      line-height: 1;
      margin-top: 1px;
      flex-shrink: 0;
    }

    .erp-toast-body {
      flex: 1;
      min-width: 0;
    }

    .erp-toast-title {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.35;
      word-wrap: break-word;
    }

    .erp-toast-message {
      font-size: 13px;
      opacity: 0.85;
      margin-top: 2px;
      line-height: 1.45;
      word-wrap: break-word;
    }

    .erp-toast-close {
      flex-shrink: 0;
      width: 22px;
      height: 22px;
      padding: 0;
      border: none;
      background: transparent;
      color: currentColor;
      opacity: 0.55;
      cursor: pointer;
      border-radius: var(--app-border-radius-sm, 6px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: opacity 0.15s ease, background-color 0.15s ease;
    }

    .erp-toast-close:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.05);
    }

    :host-context([dir="rtl"]) .erp-toast-container {
      right: auto;
      left: 16px;
    }

    @keyframes erp-toast-slide-in {
      from {
        opacity: 0;
        transform: translateX(16px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    :host-context([dir="rtl"]) .erp-toast {
      animation-name: erp-toast-slide-in-rtl;
    }

    @keyframes erp-toast-slide-in-rtl {
      from {
        opacity: 0;
        transform: translateX(-16px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `]
})
export class NotificationComponent {
  notificationService = inject(NotificationService);

  getIcon(type: string): string {
    switch (type) {
      case 'success': return 'fa-check-circle';
      case 'error': return 'fa-exclamation-circle';
      case 'warning': return 'fa-exclamation-triangle';
      case 'info': return 'fa-info-circle';
      default: return 'fa-info-circle';
    }
  }
}
