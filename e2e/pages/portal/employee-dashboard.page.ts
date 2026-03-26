import { Page, expect } from '@playwright/test';

export class EmployeeDashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/#/dashboard');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/dashboard/);
    await expect(this.page.locator('.card, .stat-card, app-stats-card').first()).toBeVisible({ timeout: 10000 });
  }

  async expectStatsCardsVisible() {
    await expect(this.page.locator('.card, app-stat-card').first()).toBeVisible();
  }

  async getStatValue(label: string): Promise<string> {
    const card = this.page.locator('.card, app-stat-card').filter({ hasText: label }).first();
    return (await card.locator('h2, h3, .stat-value, .card-text').first().textContent())?.trim() ?? '';
  }

  async clickQuickAction(actionName: string) {
    await this.page.locator('a, button').filter({ hasText: actionName }).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectRecentActivity() {
    await expect(this.page.locator('.activity, .timeline, .recent').first()).toBeVisible();
  }
}
