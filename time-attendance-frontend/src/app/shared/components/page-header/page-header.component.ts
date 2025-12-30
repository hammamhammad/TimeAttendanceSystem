import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-0" [class.mb-1]="subtitle">{{ title }}</h2>
        @if (subtitle) {
          <p class="text-muted mb-0">{{ subtitle }}</p>
        }
      </div>
      <div class="d-flex gap-2">
        <ng-content select="[actions]"></ng-content>
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
}