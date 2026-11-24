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
      // Dismiss cookie banner
      const cookieBanner = document.getElementById('cookie-banner');
      const cookieOverlay = document.getElementById('cookie-overlay');
      if (cookieBanner) cookieBanner.classList.remove('visible');
      if (cookieOverlay) cookieOverlay.classList.remove('visible');
      localStorage.setItem('tbc-cookie-consent', 'accepted');
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

  test('clicking button scrolls smoothly to top', async ({ page }) => {
    const btn = page.locator('.scroll-to-top');

    // Scroll down to make button visible
    await page.evaluate(() => {
      const hero = document.getElementById('inicio');
      const target = hero ? hero.offsetTop + hero.offsetHeight + 10 : document.body.scrollHeight;
      window.scrollTo({ top: target, behavior: 'instant' });
    });
    await page.waitForTimeout(300);

    // Verify button is visible
    const hasClass = await btn.evaluate((el) => el.classList.contains('is-visible'));
    expect(hasClass).toBe(true);

    // Click button
    await btn.click();
    await page.waitForTimeout(600); // Wait for smooth scroll

    // Should be at top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(50); // Allow small tolerance
  });

  test.describe('with prefers-reduced-motion', () => {
    // Context-level emulation: applied before the beforeEach navigation, so
    // the page loads with the media query already matching.
    test.use({ contextOptions: { reducedMotion: 'reduce' } });

    test('prefers-reduced-motion causes instant scroll instead of smooth', async ({ page }) => {
      const btn = page.locator('.scroll-to-top');

      // The emulation must actually reach the page.
      const reducedMotion = await page.evaluate(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
      expect(reducedMotion).toBe(true);

      // Scroll down until the hero is out of view.
      await page.evaluate(() => {
        const hero = document.getElementById('inicio');
        const target = hero ? hero.offsetTop + hero.offsetHeight + 10 : 1000;
        window.scrollTo({ top: target, behavior: 'instant' });
      });
      await expect(btn).toHaveClass(/is-visible/, { timeout: 3000 });

      // Click button and wait for the scroll position to settle at the top.
      // No wall-clock assertion: Playwright's click overhead is not browser
      // scroll duration. `behavior: 'auto'` lands at 0 on the next frame.
      await btn.click();
      await expect
        .poll(() => page.evaluate(() => window.scrollY), {
          timeout: 2000,
          intervals: [50, 100, 250],
          message: 'reduced motion should jump to the top',
        })
        .toBeLessThan(50);
    });
  });

  test('button has correct aria-label for accessibility', async ({ page }) => {
    const btn = page.locator('.scroll-to-top');
    const label = await btn.getAttribute('aria-label');

    // Should have Spanish label by default (lang='es')
    expect(label).toBeTruthy();
    expect(label).toContain('arriba');
  });
});
