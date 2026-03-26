import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class MyAttendancePage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/my-attendance');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/my-attendance/);
  }

  async setDateRange(startDate: string, endDate: string) {
    await this.page.locator('input[type="date"]').first().fill(startDate);
    await this.page.locator('input[type="date"]').last().fill(endDate);
    await this.page.waitForLoadState('networkidle');
  }

  async applyFilter() {
    await this.page.getByRole('button', { name: /apply|filter|search/i }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectRecordsVisible() {
    await expect(this.table.rows.first()).toBeVisible({ timeout: 10000 });
  }

  async getStatusForDate(date: string): Promise<string> {
    const rowIdx = await this.table.findRowByText(date);
    if (rowIdx < 0) return '';
    return (await this.table.rows.nth(rowIdx).locator('.badge, app-status-badge').first().textContent())?.trim() ?? '';
  }
}
