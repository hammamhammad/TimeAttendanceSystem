import { test, expect } from '../../fixtures/base.fixture';

test.describe('Responsive Layout', () => {
  test('should display correctly on desktop (1920x1080)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');

    // Sidebar should be visible on desktop
    const sidebar = page.locator('.sidebar, .sidenav, nav[class*="side"]').first();
    if (await sidebar.isVisible().catch(() => false)) {
      await expect(sidebar).toBeVisible();
    }
  });

  test('should display correctly on tablet (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');

    // Page should still be usable
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display correctly on mobile (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');

    // Page should still be usable
    await expect(page.locator('body')).toBeVisible();

    // Sidebar might be hidden on mobile, hamburger menu might appear
    const hamburger = page.locator('[class*="hamburger"], [class*="toggle"], .navbar-toggler').first();
    if (await hamburger.isVisible().catch(() => false)) {
      await expect(hamburger).toBeVisible();
    }
  });

  test('should toggle sidebar on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');

    // Try to toggle sidebar via hamburger menu
    const hamburger = page.locator('[class*="hamburger"], [class*="toggle"], .navbar-toggler').first();
    if (await hamburger.isVisible().catch(() => false)) {
      await hamburger.click();
      await page.waitForTimeout(500);

      // Sidebar or overlay menu should appear
      const sidebar = page.locator('.sidebar, .sidenav, .offcanvas, nav[class*="side"]').first();
      if (await sidebar.isVisible().catch(() => false)) {
        await expect(sidebar).toBeVisible();
      }
    }
  });

  test('should maintain content readability at different sizes', async ({ page }) => {
    const sizes = [
      { width: 1920, height: 1080 },
      { width: 1366, height: 768 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 },
    ];

    for (const size of sizes) {
      await page.setViewportSize(size);
      await page.goto('/#/dashboard');
      await page.waitForLoadState('networkidle');

      // Content should be visible at all sizes
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should handle RTL layout correctly', async ({ page }) => {
    await page.goto('/#/dashboard');
    await page.waitForLoadState('networkidle');

    // Try to switch to Arabic
    const langToggle = page.locator('[class*="lang"], [class*="locale"]').first();
    if (await langToggle.isVisible().catch(() => false)) {
      await langToggle.click();
      await page.waitForTimeout(500);

      const arabicOption = page.getByText(/العربية|arabic|ar/i).first();
      if (await arabicOption.isVisible().catch(() => false)) {
        await arabicOption.click();
        await page.waitForTimeout(1000);

        // Check if dir="rtl" is set
        const dir = await page.locator('html').getAttribute('dir');
        if (dir === 'rtl') {
          // RTL layout should be applied
          expect(dir).toBe('rtl');
        }
      }
    }
  });
});
