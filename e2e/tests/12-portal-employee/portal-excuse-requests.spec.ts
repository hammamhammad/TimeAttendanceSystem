import { test, expect } from '../../fixtures/base.fixture';
import { ExcuseRequestsPage } from '../../pages/portal/excuse-requests.page';
import { ExcuseRequestFormPage } from '../../pages/portal/excuse-request-form.page';
import { pastDate } from '../../fixtures/test-data';

test.describe('Portal Excuse Requests', () => {
  let requestsPage: ExcuseRequestsPage;

  test.beforeEach(async ({ page }) => {
    requestsPage = new ExcuseRequestsPage(page);
  });

  test('should display excuse requests list', async () => {
    await requestsPage.goto();
    await requestsPage.expectLoaded();
  });

  test('should navigate to new excuse form', async ({ page }) => {
    await requestsPage.goto();
    await requestsPage.clickNew();
    await expect(page).toHaveURL(/\/#\/excuse-requests\/new/);
  });

  test('should create an excuse request', async ({ page }) => {
    const formPage = new ExcuseRequestFormPage(page);
    await formPage.gotoNew();
    await formPage.fillDate(pastDate(1));
    await formPage.fillStartTime('10:00');
    await formPage.fillEndTime('12:00');
    await formPage.fillReason('E2E test excuse from portal');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should view excuse details', async ({ page }) => {
    await requestsPage.goto();
    if (await requestsPage.table.hasData()) {
      await requestsPage.viewRequest(0);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card').first()).toBeVisible();
    }
  });
});
