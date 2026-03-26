import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class ShiftsPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/shifts');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/shifts/);
  }

  async clickCreate() {
    await this.page.getByRole('button', { name: /create|add|new/i }).or(this.page.getByRole('link', { name: /create|add|new/i })).first().click();
  }

  async viewShift(rowIndex: number) {
    await this.table.clickView(rowIndex);
  }

  async editShift(rowIndex: number) {
    await this.table.clickEdit(rowIndex);
  }

  async viewShiftById(id: number) {
    await this.page.goto(`/#/shifts/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }

  async searchShift(query: string) {
    await this.table.search(query);
  }
}
