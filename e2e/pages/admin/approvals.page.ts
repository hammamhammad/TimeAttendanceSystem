import { Page, expect } from '@playwright/test';
import { DataTableHelper } from '../shared/data-table.component';
import { ModalHelper } from '../shared/modal.component';

export class ApprovalsPage {
  readonly table: DataTableHelper;
  readonly modal: ModalHelper;

  constructor(private page: Page) {
    this.table = new DataTableHelper(page);
    this.modal = new ModalHelper(page);
  }

  async gotoPending() {
    await this.page.goto('/#/approvals');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoHistory() {
    await this.page.goto('/#/approvals/history');
    await this.page.waitForLoadState('networkidle');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/#\/approvals/);
  }

  async filterByType(type: string) {
    await this.page.locator('select, .nav-link, button').filter({ hasText: type }).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async approveRequest(rowIndex: number, comment = 'Approved via E2E test') {
    await this.table.clickRowAction(rowIndex, 'Approve');
    await this.modal.waitForOpen();
    await this.modal.fillTextarea('comment', comment);
    await this.modal.confirm();
  }

  async rejectRequest(rowIndex: number, comment = 'Rejected via E2E test') {
    await this.table.clickRowAction(rowIndex, 'Reject');
    await this.modal.waitForOpen();
    await this.modal.fillTextarea('comment', comment);
    await this.modal.confirm();
  }

  async viewRequest(rowIndex: number) {
    await this.table.clickView(rowIndex);
  }

  async getRequestCount(): Promise<number> {
    return this.table.getRowCount();
  }
}
