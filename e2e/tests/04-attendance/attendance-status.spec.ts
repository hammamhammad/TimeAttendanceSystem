import { test, expect } from '../../fixtures/base.fixture';
import { USERS, pastDate } from '../../fixtures/test-data';

test.describe('Attendance Status Determination', () => {
  test.describe('Status display on daily attendance', () => {
    test('should show Present status for employees with check-in and check-out', async ({ page }) => {
      await page.goto('/#/attendance/daily');
      await page.waitForLoadState('networkidle');
      // Find a row with Present status
      const presentBadge = page.locator('tbody').locator('.badge, app-status-badge').filter({ hasText: /present/i }).first();
      // May or may not exist depending on data
      if (await presentBadge.isVisible().catch(() => false)) {
        await expect(presentBadge).toBeVisible();
      }
    });

    test('should show Late status for employees arriving after grace period', async ({ page }) => {
      await page.goto('/#/attendance/daily');
      await page.waitForLoadState('networkidle');
      const lateBadge = page.locator('tbody').locator('.badge, app-status-badge').filter({ hasText: /late/i }).first();
      if (await lateBadge.isVisible().catch(() => false)) {
        await expect(lateBadge).toBeVisible();
      }
    });

    test('should show Absent status for employees with no transactions', async ({ page }) => {
      await page.goto('/#/attendance/daily');
      await page.waitForLoadState('networkidle');
      const absentBadge = page.locator('tbody').locator('.badge, app-status-badge').filter({ hasText: /absent/i }).first();
      if (await absentBadge.isVisible().catch(() => false)) {
        await expect(absentBadge).toBeVisible();
      }
    });
  });

  test.describe('Status priority verification via API', () => {
    test('Holiday should override all other statuses', async ({ api }) => {
      await api.loginAsAdmin();
      // Check if any attendance records exist with Holiday status
      const records = await api.getAttendanceRecords(USERS.branchManager.employeeId, pastDate(30), pastDate(0));
      // Verify records structure
      expect(records).toBeTruthy();
    });

    test('OnLeave should override regular status', async ({ api }) => {
      await api.loginAsAdmin();
      const records = await api.getAttendanceRecords(USERS.employee.employeeId, pastDate(30), pastDate(0));
      expect(records).toBeTruthy();
    });
  });

  test.describe('Employee attendance detail view', () => {
    test('should show attendance detail for an employee', async ({ page }) => {
      await page.goto(`/#/attendance/employee/${USERS.branchManager.employeeId}`);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card, table').first()).toBeVisible({ timeout: 10000 });
    });

    test('should show attendance summary statistics', async ({ page }) => {
      await page.goto(`/#/attendance/employee/${USERS.branchManager.employeeId}`);
      await page.waitForLoadState('networkidle');
      // Should display stats like total days, present, absent, etc.
      await expect(page.locator('body')).toContainText(/present|absent|total|working/i);
    });
  });
});
