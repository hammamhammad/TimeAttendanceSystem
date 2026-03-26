import { test, expect } from '../../fixtures/base.fixture';
import { UsersPage } from '../../pages/admin/users.page';
import { UserFormPage } from '../../pages/admin/user-form.page';
import { uniqueName } from '../../fixtures/test-data';

test.describe('User CRUD Operations', () => {
  let usersPage: UsersPage;

  test.beforeEach(async ({ page }) => {
    usersPage = new UsersPage(page);
  });

  test('should display users list', async () => {
    await usersPage.goto();
    await usersPage.expectLoaded();
    await usersPage.table.expectMinRows(1);
  });

  test('should search for a user', async () => {
    await usersPage.goto();
    await usersPage.searchUser('systemadmin');
    await usersPage.table.expectMinRows(1);
  });

  test('should navigate to create user form', async ({ page }) => {
    await usersPage.goto();
    await usersPage.clickCreate();
    await expect(page).toHaveURL(/\/#\/users\/create/);
  });

  test('should create a new user', async ({ page }) => {
    const formPage = new UserFormPage(page);
    await formPage.gotoCreate();
    const username = uniqueName('testuser');
    await formPage.fillUsername(username);
    await formPage.fillEmail(`${username}@test.com`);
    await formPage.fillPassword('TestP@ss123!');
    await formPage.submit();
    await formPage.expectSuccess();
  });

  test('should view user details', async ({ page }) => {
    await usersPage.goto();
    if (await usersPage.table.hasData()) {
      await usersPage.viewUser(0);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.card').first()).toBeVisible();
    }
  });

  test('should edit a user', async ({ page }) => {
    await usersPage.goto();
    if (await usersPage.table.hasData()) {
      await usersPage.editUser(0);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/#\/users\/\d+\/edit/);
    }
  });
});
