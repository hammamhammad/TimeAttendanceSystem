import { test, expect } from '../../fixtures/base.fixture';
import { EmployeeExcusesPage } from '../../pages/admin/employee-excuses.page';
import { ExcuseFormPage } from '../../pages/admin/excuse-form.page';
import { pastDate } from '../../fixtures/test-data';

test.describe('Excuse CRUD Operations', () => {
  let excusesPage: EmployeeExcusesPage;

  test.beforeEach(async ({ page }) => {
    excusesPage = new EmployeeExcusesPage(page);
  });

  test('should display excuses list', async () => {
    await excusesPage.goto();
    await excusesPage.expectLoaded();
  });

  test('should navigate to create excuse form', async ({ page }) => {
    await excusesPage.goto();
    await excusesPage.clickCreate();
    await expect(page).toHaveURL(/\/#\/employee-excuses\/create/);
  });

  test('should create an excuse request', async ({ page }) => {
    const formPage = new ExcuseFormPage(page);
    await formPage.gotoCreate();
    await formPage.selectEmployee('Ahmed');
    await formPage.fillDate(pastDate(1));
    await formPage.fillStartTime('09:00');
    await formPage.fillEndTime('11:00');
    await formPage.fillReason('E2E test excuse request');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should view excuse details', async ({ page }) => {
    await excusesPage.goto();
    if (await excusesPage.table.hasData()) {
      await excusesPage.viewExcuse(0);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card').first()).toBeVisible();
    }
  });

  test('should filter excuses by status', async () => {
    await excusesPage.goto();
    await excusesPage.filterByStatus('Pending');
  });
});
