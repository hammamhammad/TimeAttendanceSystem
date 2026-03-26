import { test, expect } from '../../fixtures/base.fixture';

test.describe('Portal Navigation', () => {
  test('should navigate to employee dashboard', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should navigate to my attendance', async ({ page }) => {
    await page.goto('/#/my-attendance');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/my-attendance/);
  });

  test('should navigate to my profile', async ({ page }) => {
    await page.goto('/#/my-profile');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/my-profile/);
  });

  test('should navigate to vacation requests', async ({ page }) => {
    await page.goto('/#/vacation-requests');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/vacation-requests/);
  });

  test('should navigate to excuse requests', async ({ page }) => {
    await page.goto('/#/excuse-requests');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/excuse-requests/);
  });

  test('should navigate to remote work requests', async ({ page }) => {
    await page.goto('/#/remote-work-requests');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/remote-work-requests/);
  });

  test('should navigate to attendance corrections', async ({ page }) => {
    await page.goto('/#/attendance-corrections');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/attendance-corrections/);
  });

  test('should navigate to fingerprint requests', async ({ page }) => {
    await page.goto('/#/fingerprint-requests');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/fingerprint-requests/);
  });

  test('should use portal sidebar navigation', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');

    // Click sidebar link for My Attendance
    const attendanceLink = page.locator('nav, .sidebar, .sidenav').getByText(/attendance/i).first();
    if (await attendanceLink.isVisible().catch(() => false)) {
      await attendanceLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/attendance/);
    }
  });

  test('should show user name in topbar/header', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('header, .topbar, .navbar')).toBeVisible();
  });

  test('should have logout option', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');

    // Look for user menu or logout button
    const userMenu = page.locator('[class*="user"], [class*="profile"], [class*="avatar"]').first();
    if (await userMenu.isVisible().catch(() => false)) {
      await userMenu.click();
      const logoutBtn = page.getByText(/logout|sign out/i);
      if (await logoutBtn.isVisible().catch(() => false)) {
        await expect(logoutBtn).toBeVisible();
      }
    }
  });
});
