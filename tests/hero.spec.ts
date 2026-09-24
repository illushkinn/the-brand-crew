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
    await expect(page.locator('h1.hero-title')).toContainText('Growth partner');
  });

  test('has subtitle', async ({ page }) => {
    await expect(page.locator('.hero-sub')).toBeVisible();
  });

  test('hero CTA button has correct text', async ({ page }) => {
    const cta = page.locator('.hero-actions .btn-premium').first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveText(/Contacto/i);
  });

  test('pricing shows current price', async ({ page }) => {
    const current = page.locator('.current-price').first();
    await expect(current).toBeVisible();
    await expect(current).toContainText(/300/);
  });
});
