import { test, expect } from '../../fixtures/base.fixture';
import { EmployeeVacationsPage } from '../../pages/admin/employee-vacations.page';
import { VacationFormPage } from '../../pages/admin/vacation-form.page';
import { futureDate } from '../../fixtures/test-data';

test.describe('Vacation CRUD Operations', () => {
  let vacationsPage: EmployeeVacationsPage;

  test.beforeEach(async ({ page }) => {
    vacationsPage = new EmployeeVacationsPage(page);
  });

  test('should display vacations list', async () => {
    await vacationsPage.goto();
    await vacationsPage.expectLoaded();
  });

  test('should navigate to create vacation form', async ({ page }) => {
    await vacationsPage.goto();
    await vacationsPage.clickCreate();
    await expect(page).toHaveURL(/\/#\/employee-vacations\/create/);
  });

  test('should create a vacation request', async ({ page }) => {
    const formPage = new VacationFormPage(page);
    await formPage.gotoCreate();
    await formPage.selectEmployee('Ahmed');
    await formPage.selectVacationType('Annual');
    await formPage.fillStartDate(futureDate(14));
    await formPage.fillEndDate(futureDate(16));
    await formPage.fillReason('E2E test vacation request');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should view vacation details', async ({ page }) => {
    await vacationsPage.goto();
    if (await vacationsPage.table.hasData()) {
      await vacationsPage.viewVacation(0);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card').first()).toBeVisible();
    }
  });

  test('should filter vacations by status', async () => {
    await vacationsPage.goto();
    await vacationsPage.filterByStatus('Pending');
  });

  test('should show vacation status badge', async ({ page }) => {
    await vacationsPage.goto();
    if (await vacationsPage.table.hasData()) {
      await expect(page.locator('tbody .badge, tbody app-status-badge').first()).toBeVisible();
    }
  });

  test('should validate start date before end date', async ({ page }) => {
    const formPage = new VacationFormPage(page);
    await formPage.gotoCreate();
    await formPage.selectEmployee('Ahmed');
    await formPage.selectVacationType('Annual');
    await formPage.fillStartDate(futureDate(16));
    await formPage.fillEndDate(futureDate(14)); // End before start
    await formPage.submit();
    await formPage.expectValidationError();
  });
});
