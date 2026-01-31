import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center gap-3">
        @if (showBackButton && backRoute) {
          <a [routerLink]="backRoute" class="btn btn-outline-secondary btn-sm">
            <i class="fa-solid fa-arrow-left"></i>
          </a>
        }
        <div>
          <h2 class="mb-0" [class.mb-1]="subtitle">{{ title }}</h2>
          @if (subtitle) {
            <p class="text-muted mb-0">{{ subtitle }}</p>
          }
        </div>
      </div>
      <div class="d-flex gap-2">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() showBackButton = false;
  @Input() backRoute?: string;
}