import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [],
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent {
  @Input() message = 'An error occurred';
  @Input() title?: string;
  @Input() icon = 'fa-solid fa-exclamation-triangle';
  @Input() dismissible = true;
  @Input() showRetry = false;
  @Input() retryText = 'Retry';
  @Input() details?: string; // Additional error details
  @Input() showDetails = false; // Show/hide details toggle
  @Input() variant: 'danger' | 'warning' = 'danger';

  @Output() dismiss = new EventEmitter<void>();
  @Output() retry = new EventEmitter<void>();

  detailsExpanded = false;

  onDismiss(): void {
    this.dismiss.emit();
  }

  onRetry(): void {
    this.retry.emit();
  }

  toggleDetails(): void {
    this.detailsExpanded = !this.detailsExpanded;
  }

  getAlertClasses(): string {
    const classes = ['alert'];

    classes.push(`alert-${this.variant}`);

    if (this.dismissible) {
      classes.push('alert-dismissible');
    }

    return classes.join(' ');
  }
}