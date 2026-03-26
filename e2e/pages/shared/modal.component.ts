import { Page, Locator, expect } from '@playwright/test';

export class ModalHelper {
  private modal: Locator;

  constructor(private page: Page) {
    this.modal = page.locator('.modal.show, .modal.d-block').first();
  }

  /** Wait for modal to appear */
  async waitForOpen(): Promise<void> {
    await this.modal.waitFor({ state: 'visible', timeout: 10000 });
  }

  /** Wait for modal to close */
  async waitForClose(): Promise<void> {
    await this.page.locator('.modal.show').waitFor({ state: 'hidden', timeout: 10000 });
  }

  /** Get modal title text */
  async getTitle(): Promise<string> {
    return (await this.modal.locator('.modal-title').textContent()) ?? '';
  }

  /** Get modal body text */
  async getBodyText(): Promise<string> {
    return (await this.modal.locator('.modal-body').textContent()) ?? '';
  }

  /** Click confirm/primary button */
  async confirm(): Promise<void> {
    await this.modal.locator('.modal-footer .btn-primary, .modal-footer .btn-danger, .modal-footer .btn-success').first().click();
  }

  /** Click cancel/close button */
  async cancel(): Promise<void> {
    await this.modal.locator('.modal-footer .btn-secondary, .modal-footer .btn-outline-secondary, .btn-close').first().click();
  }

  /** Click button in modal by text */
  async clickButton(text: string): Promise<void> {
    await this.modal.getByRole('button', { name: new RegExp(text, 'i') }).click();
  }

  /** Assert modal is visible */
  async expectVisible(): Promise<void> {
    await expect(this.modal).toBeVisible();
  }

  /** Assert modal title */
  async expectTitle(title: string | RegExp): Promise<void> {
    await expect(this.modal.locator('.modal-title')).toContainText(title instanceof RegExp ? title : title);
  }

  /** Fill input inside modal */
  async fillInput(label: string, value: string): Promise<void> {
    const input = this.modal.getByLabel(label, { exact: false }).first();
    await input.clear();
    await input.fill(value);
  }

  /** Fill textarea inside modal */
  async fillTextarea(placeholder: string, value: string): Promise<void> {
    const textarea = this.modal.locator(`textarea`).first();
    await textarea.clear();
    await textarea.fill(value);
  }
}
