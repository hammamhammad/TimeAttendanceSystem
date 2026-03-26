import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../../shared/data-table.component';

export class AuditLogsPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/reports/audit-logs');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/reports\/audit-logs/);
  }

  async filterByEntity(entity: string) {
    await this.page.locator('select').filter({ hasText: /entity/i }).first().selectOption({ label: entity });
    await this.page.waitForLoadState('networkidle');
  }

  async filterByAction(action: string) {
    await this.page.locator('select').filter({ hasText: /action/i }).first().selectOption({ label: action });
    await this.page.waitForLoadState('networkidle');
  }

  async setDateRange(startDate: string, endDate: string) {
    await this.page.locator('input[type="date"]').first().fill(startDate);
    await this.page.locator('input[type="date"]').last().fill(endDate);
    await this.page.waitForLoadState('networkidle');
  }

  async viewDetail(rowIndex: number) {
    await this.table.clickView(rowIndex);
  }

  async expectDetailModalOpen() {
    await expect(this.page.locator('.modal.show')).toBeVisible({ timeout: 5000 });
  }
}
