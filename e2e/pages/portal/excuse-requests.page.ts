import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class ExcuseRequestsPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/excuse-requests');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/excuse-requests/);
  }

  async clickNew() {
    await this.page.getByRole('link', { name: /new|create|request/i }).first().click();
  }

  async viewRequest(rowIndex: number) {
    await this.table.clickView(rowIndex);
  }

  async viewById(id: number) {
    await this.page.goto(`/#/excuse-requests/${id}`);
    await this.page.waitForLoadState('networkidle');
  }
}
