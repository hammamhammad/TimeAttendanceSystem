import { Page, expect } from '@playwright/test';

export class VacationRequestDetailsPage {
  constructor(private page: Page) {}

  async goto(id: number) {
    await this.page.goto(`/#/vacation-requests/${id}`);
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page.locator('.card').first()).toBeVisible({ timeout: 10000 });
  }

  async getStatus(): Promise<string> {
    return (await this.page.locator('app-status-badge, .badge').first().textContent())?.trim() ?? '';
  }

  async expectStatus(status: string) {
    await expect(this.page.locator('app-status-badge, .badge').first()).toContainText(status);
  }

  async clickCancel() {
    await this.page.getByRole('button', { name: /cancel/i }).click();
  }

  async clickEdit() {
    await this.page.getByRole('link', { name: /edit/i }).first().click();
  }

  async getApprovalHistory(): Promise<string> {
    return (await this.page.locator('.approval-history, .timeline, .workflow').first().textContent())?.trim() ?? '';
  }
}
