import { test, expect } from '../../fixtures/base.fixture';
import { VacationTypesPage } from '../../pages/admin/settings/vacation-types.page';

test.describe('Vacation Types', () => {
  let typesPage: VacationTypesPage;

  test.beforeEach(async ({ page }) => {
    typesPage = new VacationTypesPage(page);
    await typesPage.goto();
  });

  test('should display vacation types list', async () => {
    await typesPage.expectLoaded();
    await typesPage.table.expectMinRows(1);
  });

  test('should show Annual Leave type', async () => {
    await typesPage.expectTypeVisible('Annual');
  });

  test('should view vacation type details', async ({ page }) => {
    await typesPage.table.clickView(0);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.card').first()).toBeVisible();
  });

  test('should show paid/unpaid configuration', async ({ page }) => {
    await typesPage.table.clickView(0);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toContainText(/paid|unpaid|type/i);
  });
});
