import { Page, Locator, expect } from '@playwright/test';

export class DataTableHelper {
  private container: Locator;

  constructor(private page: Page, containerSelector = 'app-data-table, .table-responsive, table') {
    this.container = page.locator(containerSelector).first();
  }

  /** Get all visible rows in the table body */
  get rows(): Locator {
    return this.container.locator('tbody tr');
  }

  /** Get row count */
  async getRowCount(): Promise<number> {
    return this.rows.count();
  }

  /** Get cell value by row index and column index */
  async getCellText(rowIndex: number, colIndex: number): Promise<string> {
    return (await this.rows.nth(rowIndex).locator('td').nth(colIndex).textContent()) ?? '';
  }

  /** Click action button on a specific row */
  async clickRowAction(rowIndex: number, actionName: string): Promise<void> {
    const row = this.rows.nth(rowIndex);
    const actionsCell = row.locator('td').last();
    // Try button with title or aria-label
    const actionBtn = actionsCell.locator(`button[title="${actionName}"], a[title="${actionName}"], button:has-text("${actionName}"), a:has-text("${actionName}")`).first();
    await actionBtn.click();
  }

  /** Click the view action on a row */
  async clickView(rowIndex: number): Promise<void> {
    const row = this.rows.nth(rowIndex);
    await row.getByRole('button', { name: 'View' }).or(row.getByRole('link', { name: 'View' })).first().click();
  }

  /** Click the edit action on a row */
  async clickEdit(rowIndex: number): Promise<void> {
    const row = this.rows.nth(rowIndex);
    await row.getByRole('button', { name: 'Edit' }).or(row.getByRole('link', { name: 'Edit' })).first().click();
  }

  /** Click the delete action on a row */
  async clickDelete(rowIndex: number): Promise<void> {
    const row = this.rows.nth(rowIndex);
    await row.getByRole('button', { name: 'Delete' }).first().click();
  }

  /** Sort by column header */
  async sortByColumn(columnName: string): Promise<void> {
    await this.container.locator(`th:has-text("${columnName}")`).click();
  }

  /** Check if table has data */
  async hasData(): Promise<boolean> {
    return (await this.getRowCount()) > 0;
  }

  /** Assert table has at least N rows */
  async expectMinRows(min: number): Promise<void> {
    await expect.poll(() => this.rows.count(), { timeout: 10000 }).toBeGreaterThanOrEqual(min);
  }

  /** Assert row contains text */
  async expectRowContains(rowIndex: number, text: string): Promise<void> {
    await expect(this.rows.nth(rowIndex)).toContainText(text);
  }

  /** Search/filter the table */
  async search(searchText: string): Promise<void> {
    const searchInput = this.page.locator('input[type="search"], input[placeholder*="Search"], input[placeholder*="search"], .search-input input').first();
    await searchInput.clear();
    await searchInput.fill(searchText);
    await this.page.waitForTimeout(500); // debounce
  }

  /** Navigate to a specific page */
  async goToPage(pageNumber: number): Promise<void> {
    await this.page.locator(`app-pagination a:has-text("${pageNumber}"), .pagination a:has-text("${pageNumber}")`).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  /** Select row checkbox */
  async selectRow(rowIndex: number): Promise<void> {
    await this.rows.nth(rowIndex).locator('input[type="checkbox"]').check();
  }

  /** Select all rows */
  async selectAll(): Promise<void> {
    await this.container.locator('thead input[type="checkbox"]').check();
  }

  /** Find row containing specific text and return its index */
  async findRowByText(text: string): Promise<number> {
    const count = await this.getRowCount();
    for (let i = 0; i < count; i++) {
      const rowText = await this.rows.nth(i).textContent();
      if (rowText?.includes(text)) return i;
    }
    return -1;
  }
}
