import { test, expect } from '../../fixtures/base.fixture';
import { USERS } from '../../fixtures/test-data';

test.describe('Leave Balance', () => {
  test('should display leave balance page', async ({ page }) => {
    await page.goto('/#/settings/leave-entitlements');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toContainText(/leave|balance|entitlement/i);
  });

  test('should fetch leave balances via API', async ({ api }) => {
    await api.loginAsAdmin();
    const balances = await api.getLeaveBalances(USERS.branchManager.employeeId);
    expect(balances).toBeTruthy();
  });

  test('balance formula: Available = Accrued + Adjusted - Used - Pending', async ({ api }) => {
    await api.loginAsAdmin();
    const balances = await api.getLeaveBalances(USERS.branchManager.employeeId);
    if (balances?.items?.length > 0 || Array.isArray(balances)) {
      const balanceList = balances.items || balances;
      balanceList.forEach((b: any) => {
        if (b.accruedDays !== undefined) {
          const expected = (b.accruedDays || 0) + (b.adjustedDays || 0) - (b.usedDays || 0) - (b.pendingDays || 0);
          if (b.currentBalance !== undefined) {
            expect(b.currentBalance).toBeCloseTo(expected, 1);
          }
        }
      });
    }
  });

  test('should show leave balance on employee view', async ({ page }) => {
    await page.goto(`/#/employees/${USERS.branchManager.employeeId}/view`);
    await page.waitForLoadState('networkidle');
    // Employee view may have leave balance tab
    const leaveTab = page.locator('.nav-link, button').filter({ hasText: /leave|balance/i }).first();
    if (await leaveTab.isVisible().catch(() => false)) {
      await leaveTab.click();
      await page.waitForLoadState('networkidle');
      await expect(page.locator('body')).toContainText(/balance|entitled|used/i);
    }
  });
});
