import { Page, expect } from '@playwright/test';

export class EmployeeViewPage {
  constructor(private page: Page) {}

  async goto(id: number) {
    await this.page.goto(`/#/employees/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page.locator('.card, .app-modern-view').first()).toBeVisible({ timeout: 10000 });
  }

  async getFieldValue(label: string): Promise<string> {
    const row = this.page.locator('dt, .definition-label').filter({ hasText: label }).first();
    const value = row.locator('~ dd, + dd, ~ .definition-value').first();
    return (await value.textContent())?.trim() ?? '';
  }

  async expectName(name: string) {
    await expect(this.page.locator('body')).toContainText(name);
  }

  async expectStatus(status: string) {
    await expect(this.page.locator('app-status-badge, .badge').first()).toContainText(status);
  }

  async clickEdit() {
    await this.page.getByRole('link', { name: /edit/i }).first().click();
  }

  async clickChangeShift() {
    await this.page.getByRole('link', { name: /change shift/i }).first().click();
  }

  async switchTab(tabName: string) {
    await this.page.locator(`.nav-link, .tab-link`).filter({ hasText: tabName }).first().click();
  }
}
