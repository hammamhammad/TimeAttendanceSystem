import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class RemoteWorkPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/remote-work');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/remote-work/);
  }

  async clickCreate() {
    await this.page.getByRole('link', { name: /create|add|assign|new/i }).first().click();
  }

  async viewById(id: number) {
    await this.page.goto(`/#/remote-work/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }

  async editById(id: number) {
    await this.page.goto(`/#/remote-work/edit/${id}`);
    await this.page.waitForLoadState('networkidle');
  }

  async filterByStatus(status: string) {
    await this.page.locator('select').filter({ hasText: /status/i }).first().selectOption({ label: status });
    await this.page.waitForLoadState('networkidle');
  }
}
