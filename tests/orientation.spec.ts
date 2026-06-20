import { test, expect } from '@playwright/test';

test.describe('Mobile Orientation Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Dismiss preloader
    await page.evaluate(() => {
      const pw = document.getElementById('preloader-wrapper');
      if (pw && !pw.classList.contains('is-dismissed')) {
        pw.classList.add('is-dismissed');
        pw.style.display = 'none';
      }
    });
  });

  test('hero section adapts to landscape orientation', async ({ page }) => {
    // Test in portrait first
    await page.setViewportSize({ width: 375, height: 667 });
    const heroPortrait = page.locator('.hero');
    await expect(heroPortrait).toBeVisible();

    // Switch to landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await page.waitForTimeout(300); // Allow layout to settle

    const heroLandscape = page.locator('.hero');
    await expect(heroLandscape).toBeVisible();
    
    // Verify hero content is still accessible
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();
    
    const heroCTA = page.locator('.hero .btn-empecemos').first();
    await expect(heroCTA).toBeVisible();
  });

  test('mobile menu works in landscape orientation', async ({ page }) => {
    // Set landscape viewport
    await page.setViewportSize({ width: 667, height: 375 });
    await page.waitForTimeout(100);
    
    const hamburger = page.locator('.hamburger-btn');
    const mobileMenu = page.locator('#mobileMenu');

    // Open menu
    await hamburger.click({ force: true });
    await expect(mobileMenu).toHaveClass(/is-open/);
    
    // Verify all links are visible
    const links = page.locator('.mobile-menu a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);
    
    // Check first link is visible
    await expect(links.first()).toBeVisible();
    
    // Close menu
    await hamburger.click({ force: true });
    await expect(mobileMenu).not.toHaveClass(/is-open/);
  });

  test('no horizontal overflow in landscape', async ({ page }) => {
    // Test common landscape sizes
    const landscapeSizes = [
      { width: 667, height: 375 }, // iPhone 6/7/8 landscape
      { width: 844, height: 390 }, // iPhone 12 Pro landscape
      { width: 568, height: 320 }, // iPhone SE landscape
    ];

    for (const size of landscapeSizes) {
      await page.setViewportSize(size);
      await page.waitForTimeout(200);

      // Check for horizontal overflow
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // +1 for rounding
    }
  });

  test('sections are scrollable in short landscape', async ({ page }) => {
    // Test very short landscape (e.g., iPhone SE landscape)
    await page.setViewportSize({ width: 568, height: 320 });
    await page.waitForTimeout(200);

    // Verify page is scrollable
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    
    expect(bodyHeight).toBeGreaterThan(viewportHeight);
    
    // Scroll to different sections
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(100);
    
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(400);
  });

  test('typography remains legible in landscape', async ({ page }) => {
    await page.setViewportSize({ width: 568, height: 320 });
    await page.waitForTimeout(200);

    // Check hero title font size
    const titleSize = await page.locator('.hero-title').evaluate((el) => {
      return parseFloat(window.getComputedStyle(el).fontSize);
    });
    expect(titleSize).toBeGreaterThanOrEqual(18); // Minimum legible size for headings

    // Check body text
    const bodyText = page.locator('.hero-sub');
    if (await bodyText.isVisible()) {
      const bodySize = await bodyText.evaluate((el) => {
        return parseFloat(window.getComputedStyle(el).fontSize);
      });
      expect(bodySize).toBeGreaterThanOrEqual(12); // Minimum for body text
    }
  });
});
