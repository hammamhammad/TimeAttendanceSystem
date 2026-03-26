import { test, expect } from '../../fixtures/base.fixture';
import { RolesPage } from '../../pages/admin/roles.page';
import { RoleFormPage } from '../../pages/admin/role-form.page';
import { uniqueName } from '../../fixtures/test-data';

test.describe('Role CRUD Operations', () => {
  let rolesPage: RolesPage;

  test.beforeEach(async ({ page }) => {
    rolesPage = new RolesPage(page);
  });

  test('should display roles list', async () => {
    await rolesPage.goto();
    await rolesPage.expectLoaded();
    await rolesPage.table.expectMinRows(1);
  });

  test('should show SystemAdmin role', async ({ page }) => {
    await rolesPage.goto();
    await expect(page.locator('body')).toContainText('SystemAdmin');
  });

  test('should navigate to create role', async ({ page }) => {
    await rolesPage.goto();
    await rolesPage.clickCreate();
    await expect(page).toHaveURL(/\/#\/roles\/create/);
  });

  test('should create a new role with permissions', async ({ page }) => {
    const formPage = new RoleFormPage(page);
    await formPage.gotoCreate();
    await formPage.fillName(uniqueName('TestRole'));
    await formPage.fillDescription('E2E test role');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should view role details with permissions', async ({ page }) => {
    await rolesPage.goto();
    await rolesPage.viewRole(0);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.card').first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/permission/i);
  });

  test('should edit role', async ({ page }) => {
    await rolesPage.goto();
    await rolesPage.editRole(0);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/#\/roles\/\d+\/edit/);
  });
});
