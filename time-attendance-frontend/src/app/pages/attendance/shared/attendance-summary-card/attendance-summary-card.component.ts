import { Component, Input, Output, EventEmitter } from '@angular/core';

import { RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';

export interface AttendanceSummaryData {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: string;
  color: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'secondary';
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  percentage?: number;
  maxValue?: number;
  link?: string;
  actionLabel?: string;
}

@Component({
  selector: 'app-attendance-summary-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './attendance-summary-card.component.html',
  styleUrls: ['./attendance-summary-card.component.css']
})
export class AttendanceSummaryCardComponent {
  @Input() data!: AttendanceSummaryData;
  @Input() loading = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showProgress = false;
  @Input() clickable = false;

  @Output() cardClick = new EventEmitter<void>();

  constructor(public readonly i18nService: I18nService) {}

  get progressPercentage(): number {
    if (!this.data.percentage && this.data.maxValue) {
      const numValue = typeof this.data.value === 'number' ? this.data.value : 0;
      return Math.min((numValue / this.data.maxValue) * 100, 100);
    }
    return this.data.percentage || 0;
  }

  get cardClasses(): string {
    const baseClasses = 'h-100';
    const sizeClass = `card-${this.size}`;
    const colorClass = `border-${this.data.color}`;
    const clickableClass = this.clickable ? 'clickable-card' : '';

    return `${baseClasses} ${sizeClass} ${colorClass} ${clickableClass}`.trim();
  }

  get iconClasses(): string {
    return `fa-solid ${this.data.icon} text-${this.data.color}`;
  }

  get trendClasses(): string {
    if (!this.data.trend) return '';
    return this.data.trend.isPositive ? 'text-success' : 'text-danger';
  }

  get trendIcon(): string {
    if (!this.data.trend) return '';
    return this.data.trend.isPositive ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down';
  }

  onCardClick(): void {
    if (this.clickable) {
      this.cardClick.emit();
    }
  }

  formatValue(value: number | string): string {
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
      } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
      }
      return value.toString();
    }
    return value;
  }
}