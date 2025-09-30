import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>{{ title }}</h2>
    </div>
  `
})
export class PageHeaderComponent {
  @Input() title!: string;
}