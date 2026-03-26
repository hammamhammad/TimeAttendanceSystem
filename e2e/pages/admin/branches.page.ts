import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';

export class BranchesPage {
  readonly table: DataTableHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
  }

  async goto() {
    await this.page.goto('/#/branches');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/branches/);
  }

  async viewBranch(rowIndex: number) {
    await this.table.clickView(rowIndex);
  }

  async editBranch(rowIndex: number) {
    await this.table.clickEdit(rowIndex);
  }

  async searchBranch(query: string) {
    await this.table.search(query);
  }

  async expectBranchInTable(name: string) {
    const idx = await this.table.findRowByText(name);
    expect(idx).toBeGreaterThanOrEqual(0);
  }

  async viewBranchById(id: number) {
    await this.page.goto(`/#/branches/${id}/view`);
    await this.page.waitForLoadState('networkidle');
  }

  async editBranchById(id: number) {
    await this.page.goto(`/#/branches/${id}/edit`);
    await this.page.waitForLoadState('networkidle');
  }
}
