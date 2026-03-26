import { Page, Locator, expect } from '@playwright/test';

export class FormHelpers {
  constructor(private page: Page) {}

  /** Fill a text/number/date input by label text */
  async fillByLabel(label: string, value: string): Promise<void> {
    const input = this.page.getByLabel(label, { exact: false }).first();
    await input.clear();
    await input.fill(value);
  }

  /** Fill a floating label input by placeholder */
  async fillByPlaceholder(placeholder: string, value: string): Promise<void> {
    const input = this.page.getByPlaceholder(placeholder, { exact: false }).first();
    await input.clear();
    await input.fill(value);
  }

  /** Fill an input by its formControlName attribute */
  async fillByFormControl(controlName: string, value: string): Promise<void> {
    const input = this.page.locator(`[formControlName="${controlName}"], [formcontrolname="${controlName}"]`).first();
    await input.clear();
    await input.fill(value);
  }

  /** Select a native <select> option by visible text */
  async selectByLabel(label: string, optionText: string): Promise<void> {
    const select = this.page.getByLabel(label, { exact: false }).first();
    await select.selectOption({ label: optionText });
  }

  /** Select a native <select> option by value */
  async selectByValue(label: string, value: string): Promise<void> {
    const select = this.page.getByLabel(label, { exact: false }).first();
    await select.selectOption(value);
  }

  /** Select from SearchableSelectComponent */
  async selectSearchable(label: string, searchText: string): Promise<void> {
    // The SearchableSelect input has accessible name "Select {label}" (from placeholder)
    // The label text (e.g., "Branch *") is a sibling, not inside app-searchable-select
    const input = this.page.getByRole('textbox', { name: new RegExp(`select.*${label}|${label}`, 'i') }).first();
    await input.click();
    await input.clear();
    await input.fill(searchText);
    await this.page.waitForTimeout(500);

    // Select first matching option from the visible dropdown
    await this.page.locator('.dropdown-menu.show .dropdown-item').first().click();
  }

  /** Fill a date input (HTML5 date) */
  async fillDate(label: string, dateStr: string): Promise<void> {
    const input = this.page.getByLabel(label, { exact: false }).first();
    await input.fill(dateStr); // format: YYYY-MM-DD
  }

  /** Fill a time input */
  async fillTime(label: string, timeStr: string): Promise<void> {
    const input = this.page.getByLabel(label, { exact: false }).first();
    await input.fill(timeStr); // format: HH:MM
  }

  /** Toggle a checkbox */
  async toggleCheckbox(label: string, checked: boolean): Promise<void> {
    const checkbox = this.page.getByLabel(label, { exact: false }).first();
    if (checked) {
      await checkbox.check();
    } else {
      await checkbox.uncheck();
    }
  }

  /** Fill a textarea */
  async fillTextarea(label: string, text: string): Promise<void> {
    const textarea = this.page.getByLabel(label, { exact: false }).first();
    await textarea.clear();
    await textarea.fill(text);
  }

  /** Click submit button (waits for it to be enabled first) */
  async submit(buttonText = 'Save'): Promise<void> {
    const btn = this.page.getByRole('button', { name: new RegExp(buttonText, 'i') }).first();
    await expect(btn).toBeEnabled({ timeout: 10000 });
    await btn.click();
  }

  /** Click cancel button */
  async cancel(): Promise<void> {
    await this.page.getByRole('button', { name: /cancel|back/i }).first().click();
  }

  /** Fill a modern form floating input (input before label) */
  async fillFloating(inputId: string, value: string): Promise<void> {
    const input = this.page.locator(`#${inputId}`);
    await input.clear();
    await input.fill(value);
  }

  /** Wait for form to be ready (no loading spinners) */
  async waitForReady(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('.spinner-border, app-loading-spinner').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
  }
}
