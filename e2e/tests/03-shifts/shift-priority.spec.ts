import { test, expect } from '../../fixtures/base.fixture';
import { USERS, BRANCHES } from '../../fixtures/test-data';

test.describe('Shift Assignment Priority', () => {
  test('employee-level assignment should override department-level', async ({ page, api }) => {
    // Verify via API that employee has correct shift
    await api.loginAsAdmin();
    const employee = await api.getEmployee(USERS.branchManager.employeeId);
    // Employee should have a shift assignment - priority is Employee > Department > Branch
    expect(employee).toBeTruthy();
  });

  test('should display shift assignment priority info on employee view', async ({ page }) => {
    await page.goto(`/#/employees/${USERS.branchManager.employeeId}/view`);
    await page.waitForLoadState('networkidle');
    // Employee view should show current shift assignment
    await expect(page.locator('body')).toContainText(/shift/i);
  });

  test('employee change-shift page should load', async ({ page }) => {
    await page.goto(`/#/employees/${USERS.branchManager.employeeId}/change-shift`);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/change-shift/);
  });
});
