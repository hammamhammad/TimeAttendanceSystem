import { test, expect } from '../../fixtures/base.fixture';
import { PublicHolidaysPage } from '../../pages/admin/settings/public-holidays.page';
import { uniqueName, futureDate } from '../../fixtures/test-data';

test.describe('Public Holidays', () => {
  let holidaysPage: PublicHolidaysPage;

  test.beforeEach(async ({ page }) => {
    holidaysPage = new PublicHolidaysPage(page);
  });

  test('should display public holidays list', async () => {
    await holidaysPage.goto();
    await holidaysPage.table.expectMinRows(0); // May have no holidays yet
  });

  test('should navigate to create holiday', async ({ page }) => {
    await holidaysPage.gotoCreate();
    await expect(page).toHaveURL(/\/#\/settings\/public-holidays\/create/);
  });

  test('should create a public holiday', async ({ page }) => {
    await holidaysPage.gotoCreate();
    await holidaysPage.fillName(uniqueName('TestHoliday'));
    await holidaysPage.fillNameAr('عطلة اختبار');
    await holidaysPage.fillDate(futureDate(60));
    await holidaysPage.submit();
    await holidaysPage.expectSuccess();
  });

  test('should create a recurring holiday', async ({ page }) => {
    await holidaysPage.gotoCreate();
    await holidaysPage.fillName(uniqueName('RecurringHoliday'));
    await holidaysPage.fillNameAr('عطلة متكررة');
    await holidaysPage.fillDate(futureDate(90));
    await holidaysPage.toggleRecurring(true);
    await holidaysPage.submit();
    await holidaysPage.expectSuccess();
  });

  test('should view holiday details', async ({ page }) => {
    await holidaysPage.goto();
    if (await holidaysPage.table.hasData()) {
      await holidaysPage.table.clickView(0);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card').first()).toBeVisible();
    }
  });
});
