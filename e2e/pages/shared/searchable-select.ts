import { Page, Locator, expect } from '@playwright/test';

export class SearchableSelect {
  private container: Locator;

  constructor(page: Page, labelOrSelector: string) {
    // Try to find by label text first, then by selector
    this.container = page.locator('app-searchable-select').filter({ hasText: labelOrSelector }).first();
  }

  /** Open the dropdown */
  async open(): Promise<void> {
    await this.container.locator('.dropdown-toggle, .form-select, .select-trigger, input').first().click();
  }

  /** Search for an option */
  async search(text: string): Promise<void> {
    const searchInput = this.container.locator('input[type="text"], input[type="search"]').first();
    await searchInput.clear();
    await searchInput.fill(text);
    // Wait for search debounce
    await this.container.page().waitForTimeout(300);
  }

  /** Select the first matching option */
  async selectFirst(): Promise<void> {
    await this.container.locator('.dropdown-item, .list-group-item, .option').first().click();
  }

  /** Select option by visible text */
  async selectOption(text: string): Promise<void> {
    await this.container.locator(`.dropdown-item:has-text("${text}"), .list-group-item:has-text("${text}")`).first().click();
  }

  /** Open, search, and select in one step */
  async searchAndSelect(searchText: string): Promise<void> {
    await this.open();
    await this.search(searchText);
    await this.selectFirst();
  }

  /** Clear the selection */
  async clear(): Promise<void> {
    const clearBtn = this.container.locator('.clear-btn, .btn-close, .fa-times').first();
    if (await clearBtn.isVisible()) {
      await clearBtn.click();
    }
  }

  /** Get the current selected value text */
  async getSelectedText(): Promise<string> {
    return (await this.container.locator('.selected-value, .dropdown-toggle, .form-select').first().textContent()) ?? '';
  }

  /** Assert a specific value is selected */
  async expectSelected(text: string): Promise<void> {
    await expect(this.container).toContainText(text);
  }
}
