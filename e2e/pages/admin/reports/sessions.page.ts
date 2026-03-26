import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../../shared/data-table.component';

export class SessionsPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/reports/sessions');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/reports\/sessions/);
  }

  async switchTab(tab: 'active' | 'history') {
    await this.page.locator('.nav-link').filter({ hasText: new RegExp(tab, 'i') }).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectActiveSession(username: string) {
    await expect(this.page.locator('tbody')).toContainText(username);
  }
}
