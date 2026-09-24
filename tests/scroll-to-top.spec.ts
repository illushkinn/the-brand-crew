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

  test('gains is-visible after hero leaves viewport, loses it scrolling above 300', async ({ page }) => {
    const btn = page.locator('.scroll-to-top');

    // Initially not visible (hero in view)
    let hasClass = await btn.evaluate((el) => el.classList.contains('is-visible'));
    expect(hasClass).toBe(false);

    // Scroll until the hero is fully out of view (IO threshold behavior)
    await page.evaluate(() => {
      const hero = document.getElementById('inicio');
      const target = hero ? hero.offsetTop + hero.offsetHeight + 10 : document.body.scrollHeight;
      window.scrollTo({ top: target, behavior: 'instant' });
    });
    await page.waitForTimeout(300);

    hasClass = await btn.evaluate((el) => el.classList.contains('is-visible'));
    expect(hasClass).toBe(true);

    // Scroll back to top (< 200 safety threshold)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(200);

    hasClass = await btn.evaluate((el) => el.classList.contains('is-visible'));
    expect(hasClass).toBe(false);
  });
});
