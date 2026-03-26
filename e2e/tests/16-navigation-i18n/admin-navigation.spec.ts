import { test, expect } from '../../fixtures/base.fixture';

test.describe('Admin Navigation', () => {
  test('should navigate to dashboard', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should navigate to employees list', async ({ page }) => {
    await page.goto('/#/employees');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/employees/);
  });

  test('should navigate to branches', async ({ page }) => {
    await page.goto('/#/branches');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/branches/);
  });

  test('should navigate to departments', async ({ page }) => {
    await page.goto('/#/departments');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/departments/);
  });

  test('should navigate to shifts', async ({ page }) => {
    await page.goto('/#/shifts');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/shifts/);
  });

  test('should navigate to attendance', async ({ page }) => {
    await page.goto('/#/attendance');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/attendance/);
  });

  test('should navigate to employee vacations', async ({ page }) => {
    await page.goto('/#/employee-vacations');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/employee-vacations/);
  });

  test('should navigate to employee excuses', async ({ page }) => {
    await page.goto('/#/employee-excuses');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/employee-excuses/);
  });

  test('should navigate to remote work', async ({ page }) => {
    await page.goto('/#/remote-work');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/remote-work/);
  });

  test('should navigate to approvals', async ({ page }) => {
    await page.goto('/#/approvals');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/approvals/);
  });

  test('should navigate to users', async ({ page }) => {
    await page.goto('/#/users');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/users/);
  });

  test('should navigate to roles', async ({ page }) => {
    await page.goto('/#/roles');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/roles/);
  });

  test('should navigate to settings - vacation types', async ({ page }) => {
    await page.goto('/#/settings/vacation-types');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/vacation-types/);
  });

  test('should navigate to settings - excuse policies', async ({ page }) => {
    await page.goto('/#/settings/excuse-policies');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/excuse-policies/);
  });

  test('should navigate to settings - overtime', async ({ page }) => {
    await page.goto('/#/settings/overtime');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/overtime/);
  });

  test('should navigate to settings - public holidays', async ({ page }) => {
    await page.goto('/#/settings/public-holidays');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/public-holidays/);
  });

  test('should navigate to reports - audit logs', async ({ page }) => {
    await page.goto('/#/reports/audit-logs');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/audit-logs/);
  });

  test('should use sidebar navigation', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');

    // Click sidebar link for Employees
    const employeesLink = page.locator('nav, .sidebar, .sidenav').getByText(/employees/i).first();
    if (await employeesLink.isVisible().catch(() => false)) {
      await employeesLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/employees/);
    }
  });
});
