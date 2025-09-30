import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-alert.component.html',
  styleUrls: ['./info-alert.component.css']
})
export class InfoAlertComponent {
  @Input() message = '';
  @Input() title?: string;
  @Input() icon?: string;
  @Input() variant: 'info' | 'success' | 'warning' | 'primary' | 'secondary' = 'info';
  @Input() dismissible = false;
  @Input() list?: string[]; // Optional list of items
  @Input() bordered = true;
  @Input() light = false; // Use light variant

  @Output() dismiss = new EventEmitter<void>();

  onDismiss(): void {
    this.dismiss.emit();
  }

  getAlertClasses(): string {
    const classes = ['alert'];

    if (this.light) {
      classes.push(`alert-${this.variant}`);
    } else {
      classes.push(`alert-${this.variant}`);
    }

    if (this.dismissible) {
      classes.push('alert-dismissible');
    }

    if (this.bordered) {
      classes.push('border');
    }

    return classes.join(' ');
  }

  getDefaultIcon(): string {
    switch (this.variant) {
      case 'info':
        return 'fa-solid fa-info-circle';
      case 'success':
        return 'fa-solid fa-check-circle';
      case 'warning':
        return 'fa-solid fa-exclamation-triangle';
      case 'primary':
        return 'fa-solid fa-lightbulb';
      case 'secondary':
        return 'fa-solid fa-comment';
      default:
        return 'fa-solid fa-info-circle';
    }
  }

  getIconClass(): string {
    return this.icon || this.getDefaultIcon();
  }
}