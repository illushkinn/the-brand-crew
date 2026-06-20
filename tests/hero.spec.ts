import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Dismiss preloader if present
    await page.evaluate(() => {
      const pw = document.getElementById('preloader-wrapper');
      if (pw && !pw.classList.contains('is-dismissed')) {
        pw.classList.add('is-dismissed');
        pw.style.display = 'none';
      }
    });
  });

  test('has correct title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('actually work');
  });

  test('has subtitle', async ({ page }) => {
    await expect(page.locator('.hero-sub')).toBeVisible();
  });

  test('hero CTA button has correct text', async ({ page }) => {
    const cta = page.locator('.btn-empecemos').first();
    await expect(cta).toHaveText(/Let's go online/i);
  });

  test('pricing shows current and strike prices', async ({ page }) => {
    const strike = page.locator('.strike-price').first();
    await expect(strike).toBeVisible();
    const current = page.locator('.current-price').first();
    await expect(current).toContainText(/140.000/);
  });
});
