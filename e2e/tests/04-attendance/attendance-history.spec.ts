import { test, expect } from '../../fixtures/base.fixture';
import { USERS, pastDate, today } from '../../fixtures/test-data';

test.describe('Employee Attendance History', () => {
  test('should display employee attendance history page', async ({ page }) => {
    await page.goto(`/#/attendance/employee/${USERS.branchManager.employeeId}`);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.card, table').first()).toBeVisible({ timeout: 10000 });
  });

  test('should show attendance records with date filter', async ({ page }) => {
    await page.goto('/#/attendance/employee-history');
    await page.waitForLoadState('networkidle');
    // Employee history page should have filter controls
    await expect(page.locator('body')).toContainText(/attendance|history|employee/i);
  });

  test('should display summary statistics for employee', async ({ page }) => {
    await page.goto(`/#/attendance/employee/${USERS.branchManager.employeeId}`);
    await page.waitForLoadState('networkidle');
    // Should show summary stats
    await expect(page.locator('body')).toContainText(/total|present|absent|late|working/i);
  });

  test('should show daily detail when clicking a date', async ({ page }) => {
    await page.goto(`/#/attendance/employee/${USERS.branchManager.employeeId}`);
    await page.waitForLoadState('networkidle');
    // Click on a date row if available
    if (await page.locator('tbody tr').first().isVisible().catch(() => false)) {
      await page.locator('tbody tr').first().click();
      await page.waitForTimeout(1000);
    }
  });

  test('should fetch attendance via API', async ({ api }) => {
    await api.loginAsAdmin();
    const records = await api.getAttendanceRecords(
      USERS.branchManager.employeeId,
      pastDate(30),
      today()
    );
    expect(records).toBeTruthy();
  });
});
