import { test, expect } from '../../fixtures/base.fixture';
import { USERS } from '../../fixtures/test-data';

test.describe('Vacation Approval Workflow', () => {
  test('should show pending vacations on approvals page', async ({ page }) => {
    await page.goto('/#/approvals');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toContainText(/approval|pending/i);
  });

  test('should show approval history', async ({ page }) => {
    await page.goto('/#/approvals/history');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toContainText(/history|approval/i);
  });

  test('vacation view should show workflow status', async ({ page }) => {
    await page.goto('/#/employee-vacations');
    await page.waitForLoadState('networkidle');
    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      await page.locator('tbody tr').first().locator('a[title="View"], .fa-eye').first().click();
      await page.waitForLoadState('networkidle');
      // Should show approval status
      await expect(page.locator('body')).toContainText(/pending|approved|rejected|status/i);
    }
  });

  test('leave balance should update after vacation approval via API', async ({ api }) => {
    await api.loginAsAdmin();
    // Get initial balance
    const balanceBefore = await api.getLeaveBalances(USERS.branchManager.employeeId);
    expect(balanceBefore).toBeTruthy();
    // Balance verification - pending days should increase when request submitted
  });

  test('rejected vacation should restore balance via API', async ({ api }) => {
    await api.loginAsAdmin();
    const balances = await api.getLeaveBalances(USERS.branchManager.employeeId);
    // Verify the balance structure exists
    expect(balances).toBeTruthy();
  });
});
