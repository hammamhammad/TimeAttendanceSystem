import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.css']
})
export class SectionCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon?: string;
  @Input() showHeader = true;
  @Input() showFooter = false;
  @Input() headerClass = '';
  @Input() bodyClass = '';
  @Input() footerClass = '';
  @Input() bordered = true;
  @Input() shadow = false;
  @Input() loading = false;
  @Input() collapsible = false;
  @Input() collapsed = false;
  @Input() headerActions?: TemplateRef<any>;
  @Input() footerContent?: TemplateRef<any>;

  toggleCollapse(): void {
    if (this.collapsible) {
      this.collapsed = !this.collapsed;
    }
  }

  getCardClasses(): string {
    const classes = ['card'];

    if (this.bordered) {
      classes.push('border');
    }

    if (this.shadow) {
      classes.push('shadow-sm');
    }

    return classes.join(' ');
  }

  getHeaderClasses(): string {
    const classes = ['card-header'];

    if (this.headerClass) {
      classes.push(this.headerClass);
    }

    if (this.collapsible) {
      classes.push('cursor-pointer');
    }

    return classes.join(' ');
  }

  getBodyClasses(): string {
    const classes = ['card-body'];

    if (this.bodyClass) {
      classes.push(this.bodyClass);
    }

    return classes.join(' ');
  }

  getFooterClasses(): string {
    const classes = ['card-footer'];

    if (this.footerClass) {
      classes.push(this.footerClass);
    }

    return classes.join(' ');
  }
}