import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DetailField {
  label: string;
  value: any;
  type?: 'text' | 'badge' | 'date' | 'time' | 'datetime' | 'currency' | 'percentage' | 'custom';
  badgeVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  customTemplate?: TemplateRef<any>;
  visible?: boolean;
  onClick?: () => void;
  copyable?: boolean;
}

@Component({
  selector: 'app-detail-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app-detail-card card">
      @if (title) {
        <div class="card-header">
          <h5 class="card-title mb-0">
            @if (icon) {
              <i [class]="icon + ' me-2'"></i>
            }
            {{ title }}
          </h5>
          @if (subtitle) {
            <small class="text-muted">{{ subtitle }}</small>
          }
        </div>
      }

      <div class="card-body">
        @if (layout === 'two-column') {
          <!-- Two-column layout for forms -->
          <div class="row">
            <div class="col-md-6">
              <dl class="app-definition-list">
                @for (field of getLeftColumnFields(); track field.label) {
                  @if (field.visible !== false) {
                    <div class="app-definition-item">
                      <dt class="app-data-label">{{ field.label }}:</dt>
                      <dd class="app-data-value">
                        <ng-container [ngSwitch]="field.type || 'text'">
                          <!-- Badge type -->
                          <span *ngSwitchCase="'badge'"
                                [class]="'badge bg-' + (field.badgeVariant || 'primary')">
                            {{ field.value }}
                          </span>

                          <!-- Date type -->
                          <span *ngSwitchCase="'date'">
                            {{ formatDate(field.value) }}
                          </span>

                          <!-- Time type -->
                          <span *ngSwitchCase="'time'">
                            {{ formatTime(field.value) }}
                          </span>

                          <!-- DateTime type -->
                          <span *ngSwitchCase="'datetime'">
                            {{ formatDateTime(field.value) }}
                          </span>

                          <!-- Currency type -->
                          <span *ngSwitchCase="'currency'">
                            {{ formatCurrency(field.value) }}
                          </span>

                          <!-- Percentage type -->
                          <span *ngSwitchCase="'percentage'">
                            {{ field.value }}%
                          </span>

                          <!-- Custom template -->
                          <ng-container *ngSwitchCase="'custom'">
                            @if (field.customTemplate) {
                              <ng-container [ngTemplateOutlet]="field.customTemplate"
                                          [ngTemplateOutletContext]="{ $implicit: field.value, field: field }"></ng-container>
                            }
                          </ng-container>

                          <!-- Default text -->
                          <span *ngSwitchDefault
                                [class.text-muted]="!field.value || field.value === '-'"
                                [class.app-clickable]="field.onClick"
                                (click)="field.onClick && field.onClick()">
                            {{ field.value || '-' }}
                            @if (field.copyable && field.value) {
                              <i class="fas fa-copy ms-2 text-muted app-clickable"
                                 (click)="copyToClipboard(field.value)"
                                 title="Copy to clipboard"></i>
                            }
                          </span>
                        </ng-container>
                      </dd>
                    </div>
                  }
                }
              </dl>
            </div>

            <div class="col-md-6">
              <dl class="app-definition-list">
                @for (field of getRightColumnFields(); track field.label) {
                  @if (field.visible !== false) {
                    <div class="app-definition-item">
                      <dt class="app-data-label">{{ field.label }}:</dt>
                      <dd class="app-data-value">
                        <ng-container [ngSwitch]="field.type || 'text'">
                          <!-- Badge type -->
                          <span *ngSwitchCase="'badge'"
                                [class]="'badge bg-' + (field.badgeVariant || 'primary')">
                            {{ field.value }}
                          </span>

                          <!-- Date type -->
                          <span *ngSwitchCase="'date'">
                            {{ formatDate(field.value) }}
                          </span>

                          <!-- Time type -->
                          <span *ngSwitchCase="'time'">
                            {{ formatTime(field.value) }}
                          </span>

                          <!-- DateTime type -->
                          <span *ngSwitchCase="'datetime'">
                            {{ formatDateTime(field.value) }}
                          </span>

                          <!-- Currency type -->
                          <span *ngSwitchCase="'currency'">
                            {{ formatCurrency(field.value) }}
                          </span>

                          <!-- Percentage type -->
                          <span *ngSwitchCase="'percentage'">
                            {{ field.value }}%
                          </span>

                          <!-- Custom template -->
                          <ng-container *ngSwitchCase="'custom'">
                            @if (field.customTemplate) {
                              <ng-container [ngTemplateOutlet]="field.customTemplate"
                                          [ngTemplateOutletContext]="{ $implicit: field.value, field: field }"></ng-container>
                            }
                          </ng-container>

                          <!-- Default text -->
                          <span *ngSwitchDefault
                                [class.text-muted]="!field.value || field.value === '-'"
                                [class.app-clickable]="field.onClick"
                                (click)="field.onClick && field.onClick()">
                            {{ field.value || '-' }}
                            @if (field.copyable && field.value) {
                              <i class="fas fa-copy ms-2 text-muted app-clickable"
                                 (click)="copyToClipboard(field.value)"
                                 title="Copy to clipboard"></i>
                            }
                          </span>
                        </ng-container>
                      </dd>
                    </div>
                  }
                }
              </dl>
            </div>
          </div>
        } @else {
          <!-- Single column layout -->
          <dl class="app-definition-list">
            @for (field of fields; track field.label) {
              @if (field.visible !== false) {
                <div class="app-definition-item">
                  <dt class="app-data-label">{{ field.label }}:</dt>
                  <dd class="app-data-value">
                    <ng-container [ngSwitch]="field.type || 'text'">
                      <!-- Badge type -->
                      <span *ngSwitchCase="'badge'"
                            [class]="'badge bg-' + (field.badgeVariant || 'primary')">
                        {{ field.value }}
                      </span>

                      <!-- Date type -->
                      <span *ngSwitchCase="'date'">
                        {{ formatDate(field.value) }}
                      </span>

                      <!-- Time type -->
                      <span *ngSwitchCase="'time'">
                        {{ formatTime(field.value) }}
                      </span>

                      <!-- DateTime type -->
                      <span *ngSwitchCase="'datetime'">
                        {{ formatDateTime(field.value) }}
                      </span>

                      <!-- Currency type -->
                      <span *ngSwitchCase="'currency'">
                        {{ formatCurrency(field.value) }}
                      </span>

                      <!-- Percentage type -->
                      <span *ngSwitchCase="'percentage'">
                        {{ field.value }}%
                      </span>

                      <!-- Custom template -->
                      <ng-container *ngSwitchCase="'custom'">
                        @if (field.customTemplate) {
                          <ng-container [ngTemplateOutlet]="field.customTemplate"
                                      [ngTemplateOutletContext]="{ $implicit: field.value, field: field }"></ng-container>
                        }
                      </ng-container>

                      <!-- Default text -->
                      <span *ngSwitchDefault
                            [class.text-muted]="!field.value || field.value === '-'"
                            [class.app-clickable]="field.onClick"
                            (click)="field.onClick && field.onClick()">
                        {{ field.value || '-' }}
                        @if (field.copyable && field.value) {
                          <i class="fas fa-copy ms-2 text-muted app-clickable"
                             (click)="copyToClipboard(field.value)"
                             title="Copy to clipboard"></i>
                        }
                      </span>
                    </ng-container>
                  </dd>
                </div>
              }
            }
          </dl>
        }

        @if (customContent) {
          <div class="mt-3">
            <ng-container [ngTemplateOutlet]="customContent"></ng-container>
          </div>
        }

        <!-- Content projection for nested components -->
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class DetailCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() icon?: string;
  @Input() fields: DetailField[] = [];
  @Input() layout: 'single' | 'two-column' = 'single';
  @Input() customContent?: TemplateRef<any>;

  getLeftColumnFields(): DetailField[] {
    return this.fields.filter((_, index) => index % 2 === 0);
  }

  getRightColumnFields(): DetailField[] {
    return this.fields.filter((_, index) => index % 2 === 1);
  }

  formatDate(dateString: string | Date): string {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString.toString();
    }
  }

  formatTime(timeString: string | Date): string {
    if (!timeString) return '-';
    try {
      return new Date(timeString).toLocaleTimeString();
    } catch {
      return timeString.toString();
    }
  }

  formatDateTime(dateTimeString: string | Date): string {
    if (!dateTimeString) return '-';
    try {
      return new Date(dateTimeString).toLocaleString();
    } catch {
      return dateTimeString.toString();
    }
  }

  formatCurrency(amount: number): string {
    if (amount == null) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  copyToClipboard(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        // You can add a toast notification here
        console.log('Copied to clipboard:', text);
      });
    }
  }
}