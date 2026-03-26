import { test, expect } from '../../fixtures/base.fixture';
import { RemoteWorkRequestsPage } from '../../pages/portal/remote-work-requests.page';
import { RemoteWorkRequestFormPage } from '../../pages/portal/remote-work-request-form.page';
import { futureDate } from '../../fixtures/test-data';

test.describe('Portal Remote Work Requests', () => {
  let requestsPage: RemoteWorkRequestsPage;

  test.beforeEach(async ({ page }) => {
    requestsPage = new RemoteWorkRequestsPage(page);
  });

  test('should display remote work requests list', async () => {
    await requestsPage.goto();
    await requestsPage.expectLoaded();
  });

  test('should navigate to new request form', async ({ page }) => {
    await requestsPage.goto();
    await requestsPage.clickNew();
    await expect(page).toHaveURL(/\/#\/remote-work-requests\/new/);
  });

  test('should create a remote work request', async ({ page }) => {
    const formPage = new RemoteWorkRequestFormPage(page);
    await formPage.gotoNew();
    await formPage.selectWorkLocation('Remote');
    await formPage.fillStartDate(futureDate(14));
    await formPage.fillEndDate(futureDate(14));
    await formPage.fillReason('E2E test remote work from portal');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should view request details', async ({ page }) => {
    await requestsPage.goto();
    if (await requestsPage.table.hasData()) {
      await requestsPage.viewRequest(0);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card').first()).toBeVisible();
    }
  });
});
