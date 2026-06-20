import { test, expect } from '@playwright/test';

test.describe('Scroll to Top', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const pw = document.getElementById('preloader-wrapper');
      if (pw && !pw.classList.contains('is-dismissed')) {
        pw.classList.add('is-dismissed');
        pw.style.display = 'none';
      }
    });
  });

  test('gains is-visible after scrolling past 450, loses it scrolling above 300', async ({ page }) => {
    const btn = page.locator('.scroll-to-top');

    // Initially not visible
    let hasClass = await btn.evaluate((el) => el.classList.contains('is-visible'));
    expect(hasClass).toBe(false);

    // Scroll to trigger visibility (> 450)
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    hasClass = await btn.evaluate((el) => el.classList.contains('is-visible'));
    expect(hasClass).toBe(true);

    // Scroll back to top (< 300)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    hasClass = await btn.evaluate((el) => el.classList.contains('is-visible'));
    expect(hasClass).toBe(false);
  });
});
