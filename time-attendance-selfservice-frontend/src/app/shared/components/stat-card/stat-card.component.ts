import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StatChange {
  value: number;
  type: 'increase' | 'decrease' | 'neutral';
  period?: string;
  isPercentage?: boolean;
}

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app-stat-card card" [class]="getCardClasses()">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div class="app-stat-content">
            <div class="app-stat-label">{{ label }}</div>
            <div class="app-stat-number" [class]="getNumberClasses()">
              @if (prefix) {
                <span class="app-stat-prefix">{{ prefix }}</span>
              }
              {{ formatValue(value) }}
              @if (suffix) {
                <span class="app-stat-suffix">{{ suffix }}</span>
              }
            </div>
            @if (change) {
              <div class="app-stat-change" [class]="getChangeClasses()">
                <i [class]="getChangeIcon()" class="me-1"></i>
                {{ formatChange(change) }}
                @if (change.period) {
                  <span class="ms-1 text-muted">{{ change.period }}</span>
                }
              </div>
            }
            @if (subtitle) {
              <div class="app-stat-subtitle text-muted">{{ subtitle }}</div>
            }
          </div>

          @if (icon) {
            <div class="app-stat-icon">
              <div [class]="'icon-circle ' + getIconCircleClasses()">
                <i [class]="icon + ' ' + getIconClasses()"></i>
              </div>
            </div>
          }
        </div>

        @if (showProgress && progressValue !== undefined) {
          <div class="app-stat-progress mt-3">
            <div class="app-progress-bar">
              <div class="app-progress-fill"
                   [class]="'app-progress-fill-' + (variant || 'primary')"
                   [style.width.%]="progressValue">
              </div>
            </div>
            @if (progressLabel) {
              <small class="text-muted mt-1 d-block">{{ progressLabel }}</small>
            }
          </div>
        }
      </div>

      @if (clickable) {
        <div class="card-footer bg-transparent border-0 pt-0">
          <div class="d-flex align-items-center text-muted">
            <small>{{ clickableText || 'View details' }}</small>
            <i class="fas fa-arrow-right ms-auto"></i>
          </div>
        </div>
      }
    </div>
  `
})
export class StatCardComponent {
  @Input() label!: string;
  @Input() value!: number | string;
  @Input() prefix?: string;
  @Input() suffix?: string;
  @Input() subtitle?: string;
  @Input() icon?: string;
  @Input() variant: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() change?: StatChange;
  @Input() showProgress = false;
  @Input() progressValue?: number;
  @Input() progressLabel?: string;
  @Input() clickable = false;
  @Input() clickableText?: string;
  @Input() loading = false;
  @Input() borderAccent = false;
  @Input() formatAsNumber = true;

  getCardClasses(): string {
    const classes = ['h-100'];

    if (this.borderAccent) {
      classes.push(`border-start border-${this.variant} border-4`);
    }

    if (this.clickable) {
      classes.push('app-clickable app-hover-lift');
    }

    return classes.join(' ');
  }

  getNumberClasses(): string {
    const classes = [];

    if (this.size === 'sm') {
      classes.push('fs-4');
    } else if (this.size === 'lg') {
      classes.push('fs-1');
    }

    return classes.join(' ');
  }

  getIconCircleClasses(): string {
    return `bg-${this.variant} bg-opacity-10`;
  }

  getIconClasses(): string {
    return `text-${this.variant}`;
  }

  getChangeClasses(): string {
    if (!this.change) return '';

    switch (this.change.type) {
      case 'increase':
        return 'app-stat-change-positive';
      case 'decrease':
        return 'app-stat-change-negative';
      default:
        return 'app-stat-change-neutral';
    }
  }

  getChangeIcon(): string {
    if (!this.change) return '';

    switch (this.change.type) {
      case 'increase':
        return 'fas fa-arrow-up';
      case 'decrease':
        return 'fas fa-arrow-down';
      default:
        return 'fas fa-minus';
    }
  }

  formatValue(value: number | string): string {
    if (typeof value === 'string') return value;

    if (!this.formatAsNumber) return value.toString();

    // Format large numbers with appropriate suffixes
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }

    return value.toLocaleString();
  }

  formatChange(change: StatChange): string {
    const sign = change.type === 'increase' ? '+' : change.type === 'decrease' ? '-' : '';
    const formattedValue = change.isPercentage ?
      `${Math.abs(change.value)}%` :
      Math.abs(change.value).toLocaleString();

    return `${sign}${formattedValue}`;
  }
}