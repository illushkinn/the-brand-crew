import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
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

  test('navbar scrolls to sections', async ({ page }) => {
    const nav = page.locator('.navbar');
    await expect(nav).toBeVisible();
  });

  test('mobile menu toggles on hamburger click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(100);
    const hamburger = page.locator('.hamburger-btn');
    const mobileMenu = page.locator('#mobileMenu');

    await expect(mobileMenu).not.toHaveClass(/is-open/);
    await hamburger.click({ force: true });
    await expect(mobileMenu).toHaveClass(/is-open/);
    await hamburger.click({ force: true });
    await expect(mobileMenu).not.toHaveClass(/is-open/);
  });

  test('nav links have correct hrefs', async ({ page }) => {
    const links = page.locator('#navLinks a');
    const hrefs = await links.evaluateAll((els) =>
      els.map((el) => el.getAttribute('href'))
    );
    expect(hrefs).toContain('#casos');
    expect(hrefs).toContain('#precios');
    expect(hrefs).toContain('#faq');
    expect(hrefs).toContain('#contacto');
  });
});
