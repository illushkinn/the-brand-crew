import { test, expect } from '@playwright/test';

test.describe('Carousel Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Dismiss preloader and cookie banner
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
    // Scroll to case studies section
    await page.locator('#casos').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  });

  test('prev arrow disabled at start', async ({ page }) => {
    const prevArrow = page.locator('#resultadosPrev');

    // At start, prev arrow should be disabled (low opacity, pointer-events none)
    const opacity = await prevArrow.evaluate(el => window.getComputedStyle(el).opacity);
    const pointerEvents = await prevArrow.evaluate(el => window.getComputedStyle(el).pointerEvents);

    expect(parseFloat(opacity)).toBeLessThan(0.5);
    expect(pointerEvents).toBe('none');
  });

  test('next arrow works and scrolls carousel', async ({ page }) => {
    const grid = page.locator('.resultados-grid');
    const nextArrow = page.locator('#resultadosNext');

    // Get initial scroll position
    const initialScroll = await grid.evaluate(el => el.scrollLeft);

    // Click next arrow
    await nextArrow.click();
    await page.waitForTimeout(400); // Wait for smooth scroll

    // Scroll position should have increased
    const newScroll = await grid.evaluate(el => el.scrollLeft);
    expect(newScroll).toBeGreaterThan(initialScroll);
  });

  test('prev arrow works after scrolling right', async ({ page }) => {
    const grid = page.locator('.resultados-grid');
    const nextArrow = page.locator('#resultadosNext');
    const prevArrow = page.locator('#resultadosPrev');

    // Click next to scroll right
    await nextArrow.click();
    await page.waitForTimeout(400);

    // Get scroll position after next click
    const scrollAfterNext = await grid.evaluate(el => el.scrollLeft);

    // Click prev to scroll left
    await prevArrow.click();
    await page.waitForTimeout(400);

    // Scroll should have decreased
    const scrollAfterPrev = await grid.evaluate(el => el.scrollLeft);
    expect(scrollAfterPrev).toBeLessThan(scrollAfterNext);
  });

  test('next arrow disabled at end', async ({ page }) => {
    const grid = page.locator('.resultados-grid');
    const nextArrow = page.locator('#resultadosNext');

    // Click next until the carousel reaches the end. The arrow disables itself
    // (pointer-events: none) once there, so it can't be clicked a fixed number
    // of times: with two cards per view on desktop, one click is enough.
    for (let i = 0; i < 5; i++) {
      const pe = await nextArrow.evaluate(el => window.getComputedStyle(el).pointerEvents);
      if (pe === 'none') break;
      await nextArrow.click();
      await page.waitForTimeout(400);
    }

    // The grid should be scrolled to its end (smooth scroll may still be settling)
    await expect
      .poll(() => grid.evaluate(el => el.scrollWidth - el.clientWidth - el.scrollLeft))
      .toBeLessThanOrEqual(10);

    // At end, next arrow should be disabled (opacity animates over 0.2s)
    await expect
      .poll(() => nextArrow.evaluate(el => parseFloat(window.getComputedStyle(el).opacity)))
      .toBeLessThan(0.5);
    const pointerEvents = await nextArrow.evaluate(el => window.getComputedStyle(el).pointerEvents);
    expect(pointerEvents).toBe('none');
  });

  test('arrow states update dynamically on manual scroll', async ({ page }) => {
    const grid = page.locator('.resultados-grid');
    const prevArrow = page.locator('#resultadosPrev');
    const nextArrow = page.locator('#resultadosNext');

    const opacity = (el: Element) => parseFloat(window.getComputedStyle(el).opacity);
    const scrollGridTo = (pos: 'end' | 'start') =>
      grid.evaluate((el, p) => {
        el.scrollTo({ left: p === 'end' ? el.scrollWidth - el.clientWidth : 0, behavior: 'instant' });
      }, pos);

    // Scroll snapping only rests on card edges, and with few cards those are
    // the carousel's ends, so check both ends rather than a midpoint.
    // Opacity animates over 0.2s, hence the polling.
    await scrollGridTo('end');
    await expect.poll(() => prevArrow.evaluate(opacity)).toBeGreaterThanOrEqual(0.9);
    await expect.poll(() => nextArrow.evaluate(opacity)).toBeLessThan(0.5);

    await scrollGridTo('start');
    await expect.poll(() => prevArrow.evaluate(opacity)).toBeLessThan(0.5);
    await expect.poll(() => nextArrow.evaluate(opacity)).toBeGreaterThanOrEqual(0.9);
  });

  test('carousel uses smooth scroll behavior', async ({ page }) => {
    const grid = page.locator('.resultados-grid');

    // Verify scrollBehavior is smooth
    const scrollBehavior = await grid.evaluate(el => window.getComputedStyle(el).scrollBehavior);
    expect(scrollBehavior).toBe('smooth');
  });

  test('boundary check prevents scroll past edges', async ({ page }) => {
    const grid = page.locator('.resultados-grid');
    const prevArrow = page.locator('#resultadosPrev');

    // Try clicking prev when already at start. The arrow has pointer-events: none
    // there, so a real mouse click never reaches it; dispatch the click directly
    // (as keyboard activation would) to exercise the handler at the boundary.
    const initialScroll = await grid.evaluate(el => el.scrollLeft);
    await prevArrow.dispatchEvent('click');
    await page.waitForTimeout(400);

    const newScroll = await grid.evaluate(el => el.scrollLeft);

    // Scroll should not go negative
    expect(newScroll).toBeGreaterThanOrEqual(0);
    expect(newScroll).toBe(initialScroll); // Should not have moved
  });

  test('all case study cards are visible in carousel', async ({ page }) => {
    const cards = page.locator('.resultado-card');
    const count = await cards.count();

    // Should have at least 3 cards (Luisito, Hoco, Pragma)
    expect(count).toBeGreaterThanOrEqual(3);

    // Each card should have required elements
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('.resultado-avatar')).toBeVisible();
      await expect(card.locator('.resultado-nombre')).toBeVisible();
      await expect(card.locator('.resultado-link')).toBeVisible();
    }
  });
});
