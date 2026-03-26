import { test, expect } from '../../fixtures/base.fixture';
import { ShiftsPage } from '../../pages/admin/shifts.page';
import { ShiftFormPage } from '../../pages/admin/shift-form.page';
import { uniqueName } from '../../fixtures/test-data';

test.describe('Shift CRUD Operations', () => {
  let shiftsPage: ShiftsPage;

  test.beforeEach(async ({ page }) => {
    shiftsPage = new ShiftsPage(page);
  });

  test('should display shifts list', async () => {
    await shiftsPage.goto();
    await shiftsPage.expectLoaded();
    await shiftsPage.table.expectMinRows(1);
  });

  test('should navigate to create shift form', async ({ page }) => {
    await shiftsPage.goto();
    await shiftsPage.clickCreate();
    await expect(page).toHaveURL(/\/#\/shifts\/create/);
  });

  test('should create a TimeBased shift with single period', async ({ page }) => {
    const formPage = new ShiftFormPage(page);
    await formPage.gotoCreate();
    await formPage.fillName(uniqueName('Morning'));
    await formPage.fillNameAr('صباحي');
    await formPage.selectShiftType('TimeBased');
    await formPage.addShiftPeriod('08:00', '16:00');
    await formPage.fillGracePeriod('10');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should create a TimeBased shift with multiple periods', async ({ page }) => {
    const formPage = new ShiftFormPage(page);
    await formPage.gotoCreate();
    await formPage.fillName(uniqueName('Split'));
    await formPage.fillNameAr('مقسم');
    await formPage.selectShiftType('TimeBased');
    await formPage.addShiftPeriod('08:00', '12:00');
    await formPage.addShiftPeriod('13:00', '17:00');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should create an HoursOnly shift', async ({ page }) => {
    const formPage = new ShiftFormPage(page);
    await formPage.gotoCreate();
    await formPage.fillName(uniqueName('Flexible'));
    await formPage.fillNameAr('مرن');
    await formPage.selectShiftType('HoursOnly');
    await formPage.fillRequiredHours('8');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should view shift details', async ({ page }) => {
    await shiftsPage.goto();
    await shiftsPage.viewShift(0);
    await expect(page.locator('.card').first()).toBeVisible();
  });

  test('should edit a shift', async ({ page }) => {
    await shiftsPage.goto();
    await shiftsPage.editShift(0);
    await expect(page).toHaveURL(/\/#\/shifts\/\d+\/edit/);
  });

  test('should show shift configuration details in view', async ({ page }) => {
    await shiftsPage.viewShiftById(1);
    // Should show shift type, periods, grace period etc.
    await expect(page.locator('body')).toContainText(/type|period|hours/i);
  });

  test('should validate shift type requires correct fields', async ({ page }) => {
    const formPage = new ShiftFormPage(page);
    await formPage.gotoCreate();
    await formPage.fillName('InvalidShift');
    // Try to submit without required fields
    await formPage.submit();
    await formPage.expectValidationError();
  });
});
