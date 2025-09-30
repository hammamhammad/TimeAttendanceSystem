import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metric-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metric-row.component.html',
  styleUrls: ['./metric-row.component.css']
})
export class MetricRowComponent {
  @Input() label = '';
  @Input() value: any = '';
  @Input() icon?: string;
  @Input() iconColor?: string;
  @Input() valueColor?: string;
  @Input() valueBold = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
  @Input() suffix?: string;
  @Input() prefix?: string;
  @Input() badge?: string;
  @Input() badgeVariant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  @Input() clickable = false;
  @Input() bordered = false;

  getLabelClasses(): string {
    const classes = ['metric-label'];

    if (this.size === 'sm') {
      classes.push('small');
    } else if (this.size === 'lg') {
      classes.push('fs-5');
    }

    return classes.join(' ');
  }

  getValueClasses(): string {
    const classes = ['metric-value'];

    if (this.valueBold) {
      classes.push('fw-bold');
    } else {
      classes.push('fw-medium');
    }

    if (this.size === 'sm') {
      classes.push('small');
    } else if (this.size === 'lg') {
      classes.push('fs-4');
    }

    if (this.valueColor) {
      classes.push(`text-${this.valueColor}`);
    }

    return classes.join(' ');
  }

  getRowClasses(): string {
    const classes = ['metric-row'];

    if (this.layout === 'vertical') {
      classes.push('metric-row-vertical');
    } else {
      classes.push('metric-row-horizontal');
    }

    if (this.clickable) {
      classes.push('metric-row-clickable');
    }

    if (this.bordered) {
      classes.push('metric-row-bordered');
    }

    return classes.join(' ');
  }

  getBadgeClasses(): string {
    return `badge bg-${this.badgeVariant}`;
  }

  getIconClasses(): string {
    const classes = [];

    if (this.icon) {
      classes.push(this.icon);
    }

    if (this.iconColor) {
      classes.push(`text-${this.iconColor}`);
    } else {
      classes.push('text-muted');
    }

    return classes.join(' ');
  }
}