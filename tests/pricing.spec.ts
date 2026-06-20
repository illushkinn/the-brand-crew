import { test, expect } from '@playwright/test';

test.describe('Pricing Section', () => {
  test('A steal section has correct prices', async ({ page }) => {
    await page.goto('/');
    const pricingTitle = page.locator('.section-title').filter({ hasText: 'A steal' });
    await expect(pricingTitle).toBeVisible();

    const pricingCurrent = page.locator('.pricing-current').first();
    await expect(pricingCurrent).toContainText(/140.000/);
  });

  test('strike prices are visible in pricing section', async ({ page }) => {
    await page.goto('/');
    const strikes = page.locator('.pricing-strike');
    const count = await strikes.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('pricing includes list has items', async ({ page }) => {
    await page.goto('/');
    const includes = page.locator('.pricing-includes ul li');
    const count = await includes.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });
});
