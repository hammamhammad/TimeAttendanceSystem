import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StatCardComponent } from '../stat-card/stat-card.component';

export interface StatGridItem {
  label: string;
  value: number | string;
  icon?: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
  prefix?: string;
  suffix?: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period?: string;
    isPercentage?: boolean;
  };
  subtitle?: string;
  borderAccent?: boolean;
  clickable?: boolean;
  clickableText?: string;
  route?: string | any[];
}

@Component({
  selector: 'app-stats-grid',
  standalone: true,
  imports: [StatCardComponent],
  templateUrl: './stats-grid.component.html',
  styleUrls: ['./stats-grid.component.css']
})
export class StatsGridComponent {
  private router = inject(Router);

  @Input() stats: StatGridItem[] = [];
  @Input() columns: 2 | 3 | 4 = 4;
  @Input() loading = false;
  @Input() gap: 'sm' | 'md' | 'lg' = 'md';
  @Input() cardSize: 'sm' | 'md' | 'lg' = 'md';

  getGridClasses(): string {
    const classes = ['stats-grid', 'row'];

    switch (this.gap) {
      case 'sm':
        classes.push('g-2');
        break;
      case 'lg':
        classes.push('g-4');
        break;
      default:
        classes.push('g-3');
    }

    return classes.join(' ');
  }

  getColumnClasses(): string {
    const classes = ['stats-grid-item'];

    switch (this.columns) {
      case 2:
        classes.push('col-md-6');
        break;
      case 3:
        classes.push('col-md-4');
        break;
      case 4:
        classes.push('col-md-6', 'col-lg-3');
        break;
    }

    return classes.join(' ');
  }

  getSkeletonItems(): number[] {
    return Array(this.columns).fill(0);
  }

  onCardClick(item: StatGridItem): void {
    if (item.route) {
      this.router.navigate(Array.isArray(item.route) ? item.route : [item.route]);
    }
  }
}
