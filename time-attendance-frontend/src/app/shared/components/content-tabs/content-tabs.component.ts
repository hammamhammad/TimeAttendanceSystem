import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  badgeVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  disabled?: boolean;
  hidden?: boolean;
}

@Component({
  selector: 'app-content-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-tabs.component.html',
  styleUrls: ['./content-tabs.component.css']
})
export class ContentTabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTabId?: string;
  @Input() variant: 'tabs' | 'pills' = 'tabs';
  @Input() justified = false;
  @Input() fill = false;
  @Input() vertical = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() tabChange = new EventEmitter<TabItem>();

  ngOnInit(): void {
    // Set first visible tab as active if none specified
    if (!this.activeTabId) {
      const firstVisibleTab = this.getVisibleTabs()[0];
      if (firstVisibleTab) {
        this.activeTabId = firstVisibleTab.id;
      }
    }
  }

  onTabClick(tab: TabItem): void {
    if (!tab.disabled) {
      this.activeTabId = tab.id;
      this.tabChange.emit(tab);
    }
  }

  isTabActive(tabId: string): boolean {
    return this.activeTabId === tabId;
  }

  getVisibleTabs(): TabItem[] {
    return this.tabs.filter(tab => !tab.hidden);
  }

  getNavClasses(): string {
    const classes = ['nav'];

    if (this.variant === 'pills') {
      classes.push('nav-pills');
    } else {
      classes.push('nav-tabs');
    }

    if (this.justified) {
      classes.push('nav-justified');
    }

    if (this.fill) {
      classes.push('nav-fill');
    }

    if (this.vertical) {
      classes.push('flex-column');
    }

    if (this.size === 'sm') {
      classes.push('nav-sm');
    } else if (this.size === 'lg') {
      classes.push('nav-lg');
    }

    return classes.join(' ');
  }

  getTabClasses(tab: TabItem): string {
    const classes = ['nav-link'];

    if (this.isTabActive(tab.id)) {
      classes.push('active');
    }

    if (tab.disabled) {
      classes.push('disabled');
    }

    return classes.join(' ');
  }

  getBadgeClasses(tab: TabItem): string {
    const variant = tab.badgeVariant || 'primary';
    return `badge bg-${variant} ms-2`;
  }
}