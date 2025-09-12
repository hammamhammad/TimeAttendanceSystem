import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from './confirmation.service';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (confirmationService.isVisible$()) {
      <!-- Modal Backdrop -->
      <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);" (click)="onBackdropClick($event)">
        <div class="modal-dialog modal-dialog-centered" (click)="$event.stopPropagation()">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h5 class="modal-title d-flex align-items-center">
                @if (config()?.icon) {
                  <i class="fa-solid {{ config()!.icon }} me-2 {{ config()!.iconClass }}"></i>
                }
                {{ config()?.title }}
              </h5>
              <button 
                type="button" 
                class="btn-close" 
                (click)="onCancel()"
                [attr.aria-label]="t('common.close')"
              ></button>
            </div>
            
            <!-- Modal Body -->
            <div class="modal-body">
              <p class="mb-0">{{ config()?.message }}</p>
            </div>
            
            <!-- Modal Footer -->
            <div class="modal-footer">
              <button 
                type="button" 
                class="btn {{ config()?.cancelButtonClass }}" 
                (click)="onCancel()"
              >
                {{ config()?.cancelText }}
              </button>
              <button 
                type="button" 
                class="btn {{ config()?.confirmButtonClass }}" 
                (click)="onConfirm()"
              >
                {{ config()?.confirmText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal {
      z-index: 1055;
    }
    
    .modal-dialog {
      max-width: 500px;
    }
    
    .modal-content {
      border: none;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .modal-header {
      border-bottom: 1px solid #dee2e6;
      padding: 1rem 1.5rem;
    }
    
    .modal-body {
      padding: 1.5rem;
    }
    
    .modal-footer {
      border-top: 1px solid #dee2e6;
      padding: 1rem 1.5rem;
      gap: 0.5rem;
    }
    
    .btn {
      min-width: 80px;
    }
    
    .modal-title {
      font-weight: 600;
      color: #333;
    }
    
    /* Animation */
    .modal.show .modal-dialog {
      animation: modalSlideIn 0.2s ease-out;
    }
    
    @keyframes modalSlideIn {
      from {
        transform: translateY(-50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `]
})
export class ConfirmationComponent {
  public confirmationService = inject(ConfirmationService);
  private i18n = inject(I18nService);

  config = this.confirmationService.config$;

  t(key: string): string {
    return this.i18n.t(key);
  }

  onConfirm(): void {
    this.confirmationService.onConfirm();
  }

  onCancel(): void {
    this.confirmationService.onCancel();
  }

  onBackdropClick(event: Event): void {
    // Close modal when clicking on backdrop
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}