import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  @Input() message = 'Loading...';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  @Input() centered = true;
  @Input() fullHeight = false;
  @Input() overlay = false;
  @Input() showMessage = true;

  getSpinnerClasses(): string {
    const classes = ['spinner-border'];

    if (this.size === 'sm') {
      classes.push('spinner-border-sm');
    }

    classes.push(`text-${this.variant}`);

    return classes.join(' ');
  }

  getContainerClasses(): string {
    const classes = [];

    if (this.centered) {
      classes.push('text-center');
    }

    if (this.fullHeight) {
      classes.push('loading-spinner-full-height');
    } else {
      classes.push('py-4');
    }

    if (this.overlay) {
      classes.push('loading-spinner-overlay');
    }

    return classes.join(' ');
  }
}