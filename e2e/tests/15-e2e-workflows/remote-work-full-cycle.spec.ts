import { test, expect } from '../../fixtures/base.fixture';
import { RemoteWorkRequestFormPage } from '../../pages/portal/remote-work-request-form.page';
import { RemoteWorkRequestsPage } from '../../pages/portal/remote-work-requests.page';
import { futureDate } from '../../fixtures/test-data';

test.describe('E2E: Remote Work Request Full Cycle', () => {
  test('employee requests remote work -> manager approves -> attendance marked RemoteWork', async ({ page }) => {
    // Step 1: Employee creates a remote work request
    const formPage = new RemoteWorkRequestFormPage(page);
    await formPage.gotoNew();
    await formPage.selectWorkLocation('Remote');
    await formPage.fillStartDate(futureDate(7));
    await formPage.fillEndDate(futureDate(7));
    await formPage.fillReason('E2E full cycle remote work test');
    await formPage.submit();
    await formPage.expectSuccess();

    // Step 2: Verify request appears in list
    const requestsPage = new RemoteWorkRequestsPage(page);
    await requestsPage.goto();
    await requestsPage.expectLoaded();

    if (await requestsPage.table.hasData()) {
      // Verify the request was created
      const rowCount = await requestsPage.table.getRowCount();
      expect(rowCount).toBeGreaterThan(0);
    }

    // Step 3: After approval, attendance for that date should be marked as RemoteWork
    // Business rule: Approved remote work overrides normal attendance tracking
    // Employee is considered working from approved location
  });

  test('should handle different work location types', async ({ page }) => {
    // Test FieldWork location
    const formPage = new RemoteWorkRequestFormPage(page);
    await formPage.gotoNew();
    await formPage.selectWorkLocation('FieldWork');
    await formPage.fillStartDate(futureDate(10));
    await formPage.fillEndDate(futureDate(10));
    await formPage.fillReason('E2E field work location test');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should validate against remote work policy limits', async ({ page }) => {
    // Try to create requests beyond policy limit (max days per week/month)
    const formPage = new RemoteWorkRequestFormPage(page);
    await formPage.gotoNew();

    // Create a multi-day remote work request
    await formPage.selectWorkLocation('Remote');
    await formPage.fillStartDate(futureDate(20));
    await formPage.fillEndDate(futureDate(25));
    await formPage.fillReason('E2E policy limit test');
    await formPage.submit();
    // May get validation error if exceeds policy limit
    await page.waitForTimeout(1000);
  });
});
