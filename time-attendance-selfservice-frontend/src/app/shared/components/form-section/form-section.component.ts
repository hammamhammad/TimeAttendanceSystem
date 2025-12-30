import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app-form-section">
      @if (title || description) {
        <div class="app-form-section-header">
          @if (title) {
            <h3 [class]="titleClass">
              @if (icon) {
                <i [class]="icon + ' me-2'"></i>
              }
              {{ title }}
              @if (required) {
                <span class="text-danger">*</span>
              }
            </h3>
          }
          @if (description) {
            <p class="app-form-section-description text-muted">{{ description }}</p>
          }
        </div>
      }

      <div class="app-form-section-content">
        @if (layout === 'two-column') {
          <div class="row">
            <div class="col-md-6">
              <ng-content select="[slot=left]"></ng-content>
            </div>
            <div class="col-md-6">
              <ng-content select="[slot=right]"></ng-content>
            </div>
          </div>
        } @else if (layout === 'three-column') {
          <div class="row">
            <div class="col-md-4">
              <ng-content select="[slot=left]"></ng-content>
            </div>
            <div class="col-md-4">
              <ng-content select="[slot=center]"></ng-content>
            </div>
            <div class="col-md-4">
              <ng-content select="[slot=right]"></ng-content>
            </div>
          </div>
        } @else if (layout === 'sidebar') {
          <div class="row">
            <div class="col-lg-8">
              <ng-content select="[slot=main]"></ng-content>
            </div>
            <div class="col-lg-4">
              <ng-content select="[slot=sidebar]"></ng-content>
            </div>
          </div>
        } @else {
          <!-- Single column layout -->
          <ng-content></ng-content>
        }
      </div>

      @if (actions && actions.length > 0) {
        <div class="app-form-section-actions">
          @for (action of actions; track action.label) {
            <button
              type="button"
              [class]="'btn btn-' + (action.variant || 'outline-secondary')"
              [disabled]="action.disabled || action.loading"
              (click)="action.action()">
              @if (action.loading) {
                <span class="spinner-border spinner-border-sm me-2" role="status"></span>
              } @else if (action.icon) {
                <i [class]="action.icon + ' me-2'"></i>
              }
              {{ action.label }}
            </button>
          }
        </div>
      }

      @if (customFooter) {
        <div class="app-form-section-footer">
          <ng-container [ngTemplateOutlet]="customFooter"></ng-container>
        </div>
      }
    </div>
  `
})
export class FormSectionComponent {
  @Input() title?: string;
  @Input() description?: string;
  @Input() icon?: string;
  @Input() required = false;
  @Input() layout: 'single' | 'two-column' | 'three-column' | 'sidebar' = 'single';
  @Input() variant: 'default' | 'card' | 'bordered' = 'default';
  @Input() collapsible = false;
  @Input() collapsed = false;
  @Input() disabled = false;
  @Input() titleClass = 'app-section-primary';
  @Input() customFooter?: TemplateRef<any>;
  @Input() actions?: Array<{
    label: string;
    icon?: string;
    variant?: string;
    action: () => void;
    disabled?: boolean;
    loading?: boolean;
  }>;
}