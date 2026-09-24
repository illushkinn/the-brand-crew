import { test, expect, type Page } from '@playwright/test';

// Navigate and dismiss the preloader (same pattern as navigation.spec.ts)
async function gotoPricing(page: Page, path = '/pricing') {
  await page.goto(path);
  await page.evaluate(() => {
    const pw = document.getElementById('preloader-wrapper');
    if (pw && !pw.classList.contains('is-dismissed')) {
      pw.classList.add('is-dismissed');
      pw.style.display = 'none';
    }
  });
}

test.describe('Pricing smoke', () => {
  test('scarcity banner is visible', async ({ page }) => {
    await gotoPricing(page);
    await expect(page.locator('.pricing-scarcity')).toContainText(
      'Solo tomamos 3 proyectos por mes'
    );
  });

  test('renders 3 cards with exactly 7 features each', async ({ page }) => {
    await gotoPricing(page);
    const cards = page.locator('.pricing-card-v2');
    await expect(cards).toHaveCount(3);
    for (const card of await cards.all()) {
      await expect(card.locator('.pricing-card-features li')).toHaveCount(7);
    }
  });

  test('star card shows the "Más elegido" badge', async ({ page }) => {
    await gotoPricing(page);
    const badge = page.locator('.pricing-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('Más elegido');
  });
});
