import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class RemoteWorkRequestsPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/remote-work-requests');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/remote-work-requests/);
  }

  async clickNew() {
    await this.page.getByRole('link', { name: /new|create|request/i }).first().click();
  }

  async viewRequest(rowIndex: number) {
    await this.table.clickView(rowIndex);
  }

  async viewById(id: number) {
    await this.page.goto(`/#/remote-work-requests/${id}`);
    await this.page.waitForLoadState('networkidle');
  }
}
