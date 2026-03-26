import { Page, expect } from '@playwright/test';

export class ManagerDashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/#/manager-dashboard');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/manager-dashboard/);
    await expect(this.page.locator('.card').first()).toBeVisible({ timeout: 10000 });
  }

  async getTeamSize(): Promise<string> {
    const card = this.page.locator('.card').filter({ hasText: /team|members/i }).first();
    return (await card.locator('h2, h3, .stat-value').first().textContent())?.trim() ?? '';
  }

  async getPendingApprovalsCount(): Promise<string> {
    const card = this.page.locator('.card').filter({ hasText: /pending|approval/i }).first();
    return (await card.locator('h2, h3, .stat-value').first().textContent())?.trim() ?? '';
  }

  async clickViewTeam() {
    await this.page.locator('a, button').filter({ hasText: /team|members/i }).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickViewApprovals() {
    await this.page.locator('a, button').filter({ hasText: /approval/i }).first().click();
    await this.page.waitForLoadState('networkidle');
  }
}
