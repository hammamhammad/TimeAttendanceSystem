import { test, expect } from '../../fixtures/base.fixture';
import { RemoteWorkPolicyPage } from '../../pages/admin/settings/remote-work-policy.page';

test.describe('Remote Work Policies', () => {
  let policyPage: RemoteWorkPolicyPage;

  test.beforeEach(async ({ page }) => {
    policyPage = new RemoteWorkPolicyPage(page);
  });

  test('should display remote work policies list', async () => {
    await policyPage.goto();
    await policyPage.table.expectMinRows(1);
  });

  test('should view policy details', async ({ page }) => {
    await policyPage.gotoView(1);
    await expect(page.locator('.card').first()).toBeVisible();
  });

  test('should show max days and notice period configuration', async ({ page }) => {
    await policyPage.gotoView(1);
    await expect(page.locator('body')).toContainText(/max|days|notice|period/i);
  });

  test('should edit policy', async ({ page }) => {
    await policyPage.gotoEdit(1);
    await expect(page).toHaveURL(/\/#\/settings\/remote-work-policy\/\d+\/edit/);
  });
});
