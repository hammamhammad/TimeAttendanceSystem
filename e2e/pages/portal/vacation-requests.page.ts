import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class VacationRequestsPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/vacation-requests');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/vacation-requests/);
  }

  async clickNew() {
    await this.page.getByRole('link', { name: /new|create|request/i }).first().click();
  }

  async viewRequest(rowIndex: number) {
    await this.table.clickView(rowIndex);
  }

  async editRequest(rowIndex: number) {
    await this.table.clickEdit(rowIndex);
  }

  async filterByStatus(status: string) {
    await this.page.locator('select').filter({ hasText: /status/i }).first().selectOption({ label: status });
    await this.page.waitForLoadState('networkidle');
  }

  async getRequestStatus(rowIndex: number): Promise<string> {
    return (await this.table.rows.nth(rowIndex).locator('.badge, app-status-badge').first().textContent())?.trim() ?? '';
  }

  async viewById(id: number) {
    await this.page.goto(`/#/vacation-requests/${id}`);
    await this.page.waitForLoadState('networkidle');
  }
}
