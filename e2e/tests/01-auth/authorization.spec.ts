import { test, expect } from '../../fixtures/base.fixture';

test.describe('Authorization & Access Control', () => {
  test('should redirect unauthenticated user to login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:4200/#/dashboard');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/\/#\/login/);
    await context.close();
  });

  test('should redirect unauthenticated portal user to login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:4201/#/dashboard');
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/\/#\/login/);
    await context.close();
  });

  test('admin dashboard should be accessible with admin auth', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/#\/dashboard/);
  });

  test('admin should access user management', async ({ page }) => {
    await page.goto('/#/users');
    await page.waitForLoadState('networkidle');
    await expect(page).not.toHaveURL(/\/#\/unauthorized/);
  });

  test('admin should access employee management', async ({ page }) => {
    await page.goto('/#/employees');
    await page.waitForLoadState('networkidle');
    await expect(page).not.toHaveURL(/\/#\/unauthorized/);
  });

  test('admin should access role management', async ({ page }) => {
    await page.goto('/#/roles');
    await page.waitForLoadState('networkidle');
    await expect(page).not.toHaveURL(/\/#\/unauthorized/);
  });

  test('admin should access settings', async ({ page }) => {
    await page.goto('/#/settings/overtime');
    await page.waitForLoadState('networkidle');
    await expect(page).not.toHaveURL(/\/#\/unauthorized/);
  });
});
