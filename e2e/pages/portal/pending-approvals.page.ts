import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';
import { ModalHelper } from '../shared/modal.component';

export class PendingApprovalsPage {
  readonly table: DataTableHelper;
  readonly modal: ModalHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
    this.modal = new ModalHelper(page);
  }

  async goto() {
    await this.page.goto('/#/pending-approvals');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/pending-approvals/);
  }

  async switchTab(tab: string) {
    await this.page.locator('.nav-link, .tab').filter({ hasText: new RegExp(tab, 'i') }).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchRequest(query: string) {
    await this.table.search(query);
  }

  async approveRequest(rowIndex: number, comment = 'Approved via E2E test') {
    await this.page.locator('tbody tr').nth(rowIndex).getByRole('button', { name: /approve/i }).click();
    await this.modal.waitForOpen();
    await this.modal.fillTextarea('comment', comment);
    await this.modal.confirm();
  }

  async rejectRequest(rowIndex: number, comment = 'Rejected via E2E test') {
    await this.page.locator('tbody tr').nth(rowIndex).getByRole('button', { name: /reject/i }).click();
    await this.modal.waitForOpen();
    await this.modal.fillTextarea('comment', comment);
    await this.modal.confirm();
  }

  async delegateRequest(rowIndex: number, delegateTo: string) {
    await this.page.locator('tbody tr').nth(rowIndex).getByRole('button', { name: /delegate/i }).click();
    await this.modal.waitForOpen();
    await this.modal.fillInput('delegate', delegateTo);
    await this.modal.confirm();
  }

  async getApprovalCount(): Promise<number> {
    return this.table.getRowCount();
  }
}
