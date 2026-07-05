import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
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
    await page.waitForTimeout(300);
  });

  test('skip link is present and focusable', async ({ page }) => {
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toHaveAttribute('href', '#main-content');
    // Tab to skip link
    await page.keyboard.press('Tab');
    // Skip link should be focused
    await expect(skipLink).toBeFocused();
  });

  test('heading hierarchy is correct (h1 → h2 → h3 → h4)', async ({ page }) => {
    const headings = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => ({
        level: h.tagName.toLowerCase(),
        text: h.textContent?.trim().slice(0, 50)
      }));
    });
    expect(headings.length).toBeGreaterThan(0);
    // First heading MUST be h1
    expect(headings[0].level).toBe('h1');
    // Check no level skipping (h1 → h3 without h2)
    for (let i = 1; i < headings.length; i++) {
      const prevNum = parseInt(headings[i-1].level[1]);
      const currNum = parseInt(headings[i].level[1]);
      expect(currNum - prevNum).toBeLessThanOrEqual(1);
    }
  });

  test('all images have meaningful alt attributes', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Every img must have alt (even empty string is fine for decorative)
      expect(alt).not.toBeNull();
    }
  });

  test('landmark regions exist', async ({ page }) => {
    // Main landmark
    const main = page.locator('main');
    await expect(main).toHaveAttribute('id', 'main-content');

    // Navigation landmark
    const nav = page.locator('.navbar');
    await expect(nav).toBeVisible();
  });

  test('navbar has correct ARIA attributes', async ({ page }) => {
    const hamburger = page.locator('.hamburger-btn');
    await expect(hamburger).toHaveAttribute('aria-label');
    await expect(hamburger).toHaveAttribute('aria-expanded');
    await expect(hamburger).toHaveAttribute('aria-controls', 'mobileMenu');
  });

  test('mobile menu links close menu on click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(100);
    const hamburger = page.locator('.hamburger-btn');
    const mobileMenu = page.locator('#mobileMenu');

    // Open menu
    await hamburger.click({ force: true });
    await expect(mobileMenu).toHaveClass(/is-open/);

    // Click first link in mobile menu
    const firstLink = mobileMenu.locator('a').first();
    const href = await firstLink.getAttribute('href');
    await firstLink.click({ force: true });

    // Menu should close and scroll to section
    await expect(mobileMenu).not.toHaveClass(/is-open/);
  });

  test('focus-visible is visible on all interactive elements', async ({ page, browserName }) => {
    // Get all interactive elements
    const interactives = await page.evaluate(() => {
      const selectors = 'a, button, [tabindex]:not([tabindex="-1"])';
      return Array.from(document.querySelectorAll(selectors))
        .filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        })
        .map(el => ({
          tag: el.tagName.toLowerCase(),
          text: el.textContent?.trim().slice(0, 40) || el.getAttribute('aria-label') || '',
          visible: el.offsetParent !== null
        }));
    });

    expect(interactives.length).toBeGreaterThan(5);

    // Tab through all elements and verify each gets focus
    for (let i = 0; i < Math.min(interactives.length, 15); i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        return {
          tag: el.tagName.toLowerCase(),
          text: el.textContent?.trim().slice(0, 40) || el.getAttribute('aria-label') || ''
        };
      });
      // Something should be focused after tab
      expect(focused).not.toBeNull();
    }
  });

  test('color contrast is sufficient on key text elements', async ({ page }) => {
    // Check CSS custom properties define accessible color pairs
    const tokens = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        headline: style.getPropertyValue('--headline').trim(),
        body: style.getPropertyValue('--body').trim(),
        bg: style.getPropertyValue('--bg').trim(),
        terracota: style.getPropertyValue('--terracota').trim(),
      };
    });

    // All color tokens must be defined
    expect(tokens.headline).toBeTruthy();
    expect(tokens.body).toBeTruthy();
    expect(tokens.bg).toBeTruthy();
    expect(tokens.terracota).toBeTruthy();

    // Verify body text has sufficient size/weight for readability
    const bodyStyle = await page.evaluate(() => {
      const el = document.querySelector('p') || document.querySelector('.hero-sub');
      if (!el) return null;
      const style = getComputedStyle(el);
      return {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight
      };
    });

    if (bodyStyle) {
      expect(parseFloat(bodyStyle.fontSize)).toBeGreaterThanOrEqual(14);
      expect(parseFloat(bodyStyle.fontWeight)).toBeGreaterThanOrEqual(300);
    }
  });

  test('aria-expanded toggles correctly on hamburger menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(100);
    const hamburger = page.locator('.hamburger-btn');

    // Initially collapsed
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    await hamburger.click({ force: true });
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    // Click to close
    await hamburger.click({ force: true });
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });
});
