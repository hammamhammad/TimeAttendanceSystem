import { Page, expect } from '@playwright/test';

export class VacationViewPage {
  constructor(private page: Page) {}

  async goto(id: number) {
    await this.page.goto(`/#/employee-vacations/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page.locator('.card, .app-modern-view').first()).toBeVisible({ timeout: 10000 });
  }

  async getStatus(): Promise<string> {
    return (await this.page.locator('app-status-badge, .badge').first().textContent())?.trim() ?? '';
  }

  async expectStatus(status: string) {
    await expect(this.page.locator('app-status-badge, .badge').first()).toContainText(status);
  }

  async getEmployeeName(): Promise<string> {
    return (await this.page.locator('body')).textContent().then(t => t ?? '');
  }

  async getDateRange(): Promise<string> {
    return (await this.page.locator('dd').filter({ hasText: /\d{4}/ }).first().textContent())?.trim() ?? '';
  }

  async clickApprove() {
    await this.page.getByRole('button', { name: /approve/i }).click();
  }

  async clickReject() {
    await this.page.getByRole('button', { name: /reject/i }).click();
  }

  async clickEdit() {
    await this.page.getByRole('link', { name: /edit/i }).first().click();
  }
}
