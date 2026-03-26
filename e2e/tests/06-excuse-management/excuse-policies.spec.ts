import { test, expect } from '../../fixtures/base.fixture';
import { ExcusePoliciesPage } from '../../pages/admin/settings/excuse-policies.page';
import { uniqueName } from '../../fixtures/test-data';

test.describe('Excuse Policies', () => {
  let policiesPage: ExcusePoliciesPage;

  test.beforeEach(async ({ page }) => {
    policiesPage = new ExcusePoliciesPage(page);
  });

  test('should display excuse policies list', async () => {
    await policiesPage.goto();
    await policiesPage.table.expectMinRows(1);
  });

  test('should navigate to create policy', async ({ page }) => {
    await policiesPage.goto();
    await policiesPage.clickCreate();
    await expect(page).toHaveURL(/\/#\/settings\/excuse-policies\/create/);
  });

  test('should view policy details', async ({ page }) => {
    await policiesPage.gotoView(1);
    await expect(page.locator('.card').first()).toBeVisible();
  });

  test('should create a new excuse policy', async ({ page }) => {
    await policiesPage.gotoCreate();
    await policiesPage.fillName(uniqueName('TestPolicy'));
    await policiesPage.submit();
    await policiesPage.expectSuccess();
  });

  test('should edit an existing policy', async ({ page }) => {
    await policiesPage.gotoEdit(1);
    await expect(page).toHaveURL(/\/#\/settings\/excuse-policies\/\d+\/edit/);
  });
});
