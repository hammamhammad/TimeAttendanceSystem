import { Page, expect } from '@playwright/test';

export class AdminDashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/#/dashboard');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/dashboard/);
    // Dashboard should have stat cards or widgets
    await expect(this.page.locator('.card, .stat-card, app-stat-card').first()).toBeVisible({ timeout: 10000 });
  }

  async getStatCardValue(cardTitle: string): Promise<string> {
    const card = this.page.locator('.card, app-stat-card').filter({ hasText: cardTitle }).first();
    return (await card.locator('.stat-value, .card-text, h2, h3').first().textContent()) ?? '';
  }

  async expectStatsVisible() {
    const cards = this.page.locator('.card, app-stat-card, .stats-grid');
    await expect(cards.first()).toBeVisible();
  }

  async navigateToSection(sectionName: string) {
    await this.page.locator(`a:has-text("${sectionName}"), button:has-text("${sectionName}")`).first().click();
    await this.page.waitForLoadState('networkidle');
  }
}
