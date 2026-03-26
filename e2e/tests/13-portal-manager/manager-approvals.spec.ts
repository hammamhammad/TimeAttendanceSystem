import { test, expect } from '../../fixtures/base.fixture';
import { PendingApprovalsPage } from '../../pages/portal/pending-approvals.page';

test.describe('Manager Approvals (Portal)', () => {
  let approvalsPage: PendingApprovalsPage;

  test.beforeEach(async ({ page }) => {
    approvalsPage = new PendingApprovalsPage(page);
    await approvalsPage.goto();
  });

  test('should display pending approvals list', async () => {
    await approvalsPage.expectLoaded();
  });

  test('should show approval tabs by request type', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/vacation|excuse|remote|all/i);
  });

  test('should switch approval tabs', async () => {
    await approvalsPage.switchTab('Vacation');
  });

  test('should approve a pending request with comment', async ({ page }) => {
    const approvalCount = await approvalsPage.getApprovalCount();
    if (approvalCount > 0) {
      await approvalsPage.approveRequest(0, 'Approved via E2E test');
      await page.waitForTimeout(1000);
    }
  });

  test('should reject a pending request with comment', async ({ page }) => {
    const approvalCount = await approvalsPage.getApprovalCount();
    if (approvalCount > 0) {
      await approvalsPage.rejectRequest(0, 'Rejected via E2E test');
      await page.waitForTimeout(1000);
    }
  });

  test('should view request details before approving', async ({ page }) => {
    const approvalCount = await approvalsPage.getApprovalCount();
    if (approvalCount > 0) {
      await approvalsPage.table.clickView(0);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card, .modal')).toBeVisible();
    }
  });

  test('should delegate approval to another user', async ({ page }) => {
    const approvalCount = await approvalsPage.getApprovalCount();
    if (approvalCount > 0) {
      await approvalsPage.delegateRequest(0, 'sara.fahad');
      await page.waitForTimeout(1000);
    }
  });
});
