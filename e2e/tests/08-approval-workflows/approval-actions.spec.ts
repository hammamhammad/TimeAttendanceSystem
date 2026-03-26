import { test, expect } from '../../fixtures/base.fixture';
import { ApprovalsPage } from '../../pages/admin/approvals.page';

test.describe('Approval Actions', () => {
  let approvalsPage: ApprovalsPage;

  test.beforeEach(async ({ page }) => {
    approvalsPage = new ApprovalsPage(page);
  });

  test('should display pending approvals list', async () => {
    await approvalsPage.gotoPending();
    await approvalsPage.expectLoaded();
  });

  test('should display approval history', async () => {
    await approvalsPage.gotoHistory();
    await approvalsPage.expectLoaded();
  });

  test('should filter approvals by type', async () => {
    await approvalsPage.gotoPending();
    await approvalsPage.filterByType('Vacation');
  });

  test('should show approve and reject buttons on pending items', async ({ page }) => {
    await approvalsPage.gotoPending();
    if (await approvalsPage.table.hasData()) {
      const row = page.locator('tbody tr').first();
      const hasApprove = await row.locator('button:has-text("Approve"), button[title="Approve"]').isVisible().catch(() => false);
      const hasReject = await row.locator('button:has-text("Reject"), button[title="Reject"]').isVisible().catch(() => false);
      // At least one action should be visible
      expect(hasApprove || hasReject).toBeTruthy();
    }
  });

  test('should show request details on view', async ({ page }) => {
    await approvalsPage.gotoPending();
    if (await approvalsPage.table.hasData()) {
      await approvalsPage.viewRequest(0);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card, .modal')).toBeVisible();
    }
  });
});
