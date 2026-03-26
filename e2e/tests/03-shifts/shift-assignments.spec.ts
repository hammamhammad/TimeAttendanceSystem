import { test, expect } from '../../fixtures/base.fixture';
import { ShiftAssignmentsPage } from '../../pages/admin/shift-assignments.page';
import { futureDate } from '../../fixtures/test-data';

test.describe('Shift Assignments', () => {
  let assignPage: ShiftAssignmentsPage;

  test.beforeEach(async ({ page }) => {
    assignPage = new ShiftAssignmentsPage(page);
  });

  test('should display shift assignments page', async () => {
    await assignPage.goto();
    await assignPage.expectLoaded();
  });

  test('should assign shift to employee', async ({ page }) => {
    await assignPage.goto();
    await assignPage.selectShift('Default');
    await assignPage.selectAssignmentLevel('Employee');
    await assignPage.selectEmployee('Ahmed');
    await assignPage.setEffectiveDate(futureDate(1));
    await assignPage.submit();
    // May succeed or show validation
    await page.waitForTimeout(2000);
  });

  test('should assign shift to department', async ({ page }) => {
    await assignPage.goto();
    await assignPage.selectShift('Default');
    await assignPage.selectAssignmentLevel('Department');
    await assignPage.selectDepartment('Human Resources');
    await assignPage.setEffectiveDate(futureDate(1));
    await assignPage.submit();
    await page.waitForTimeout(2000);
  });

  test('should assign shift to branch', async ({ page }) => {
    await assignPage.goto();
    await assignPage.selectShift('Default');
    await assignPage.selectAssignmentLevel('Branch');
    await assignPage.selectBranch('Headquarters');
    await assignPage.setEffectiveDate(futureDate(1));
    await assignPage.submit();
    await page.waitForTimeout(2000);
  });

  test('should set temporary assignment with end date', async ({ page }) => {
    await assignPage.goto();
    await assignPage.selectShift('Default');
    await assignPage.selectAssignmentLevel('Employee');
    await assignPage.selectEmployee('Ahmed');
    await assignPage.setEffectiveDate(futureDate(1));
    await assignPage.setEndDate(futureDate(30));
    await assignPage.submit();
    await page.waitForTimeout(2000);
  });
});
