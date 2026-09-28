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
  test('footnote shows shared terms and scarcity', async ({ page }) => {
    await gotoPricing(page);
    await expect(page.locator('.plan-footnote')).toContainText('Solo 3 proyectos por mes');
  });

  test('renders 3 plan cards with exactly 4 features each', async ({ page }) => {
    await gotoPricing(page);
    const cards = page.locator('#precios .plan-card');
    await expect(cards).toHaveCount(3);
    for (const card of await cards.all()) {
      await expect(card.locator('.plan-features li')).toHaveCount(4);
    }
  });

  test('each plan CTA opens WhatsApp with the plan name', async ({ page }) => {
    await gotoPricing(page);
    const href = await page.locator('#precios .plan-card.is-star .plan-cta').getAttribute('href');
    expect(href).toContain('wa.me/');
    expect(decodeURIComponent(href ?? '')).toContain('Crecé');
  });

  test('ref param is appended to the WhatsApp message on /socios', async ({ page }) => {
    await gotoPricing(page, '/socios?ref=Juan');
    const href = await page.locator('.plan-card.is-star .plan-cta').getAttribute('href');
    expect(decodeURIComponent((href ?? '').replace(/\+/g, ' '))).toContain('(ref: Juan)');
  });
});
