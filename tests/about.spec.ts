import { test, expect } from '@playwright/test';

// Contratos de la página /nosotros (ES) y /en/about (EN):
// jerarquía de encabezados, nav, hreflang, JSON-LD de entidad y el bloque
// de prueba social (CTA al Google Business Profile, sin testimonios inventados).

test.describe('About page (/nosotros + /en/about)', () => {
  test('ES page renders with a single h1 and no skipped heading levels', async ({ page }) => {
    await page.goto('/nosotros');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es-AR');
    await expect(page.locator('h1')).toHaveCount(1);

    const headings = await page.evaluate(() =>
      Array.from(document.querySelectorAll('h1, h2, h3, h4')).map((h) => h.tagName.toLowerCase())
    );
    expect(headings[0]).toBe('h1');
    for (let i = 1; i < headings.length; i++) {
      const prev = parseInt(headings[i - 1][1]);
      const curr = parseInt(headings[i][1]);
      expect(curr - prev).toBeLessThanOrEqual(1);
    }
  });

  test('EN page exists and mirrors the structure', async ({ page }) => {
    await page.goto('/en/about');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#resenas')).toHaveCount(1);
  });

  test('nav "Nosotros / About" points to the new page on both languages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav-links a').last()).toHaveAttribute('href', '/nosotros');

    await page.goto('/en');
    await expect(page.locator('.nav-links a').last()).toHaveAttribute('href', '/en/about');
  });

  test('mobile menu about link points to the new page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.locator('.mobile-menu .mobile-link').last()).toHaveAttribute('href', '/nosotros');
  });

  test('hreflang alternates pair ES and EN correctly', async ({ page }) => {
    await page.goto('/nosotros');
    await expect(page.locator('link[rel="alternate"][hreflang="es"]'))
      .toHaveAttribute('href', 'https://thebrandcrew.lat/nosotros');
    await expect(page.locator('link[rel="alternate"][hreflang="en"]'))
      .toHaveAttribute('href', 'https://thebrandcrew.lat/en/about');
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]'))
      .toHaveAttribute('href', 'https://thebrandcrew.lat/nosotros');

    await page.goto('/en/about');
    await expect(page.locator('link[rel="alternate"][hreflang="en"]'))
      .toHaveAttribute('href', 'https://thebrandcrew.lat/en/about');
    await expect(page.locator('link[rel="alternate"][hreflang="es"]'))
      .toHaveAttribute('href', 'https://thebrandcrew.lat/nosotros');
  });

  test('social proof links the Google Business Profile placeholder, no fake testimonials', async ({ page }) => {
    await page.goto('/nosotros');
    const cta = page.locator('#resenas a.btn').first();
    await expect(cta).toBeVisible();
    // TODO(GBP): placeholder '#' hasta que el cliente pase el link real.
    await expect(cta).toHaveAttribute('href', '#');
    // Decisión documentada: la prueba social es un CTA al perfil de Google,
    // nunca testimonios inventados (ni ratings fake).
    await expect(page.locator('#resenas blockquote')).toHaveCount(0);
    await expect(page.locator('#resenas [itemprop="reviewRating"]')).toHaveCount(0);
  });

  test('page references the canonical LocalBusiness entity without redeclaring it', async ({ page }) => {
    await page.goto('/nosotros');
    const ld = await page.evaluate(() =>
      Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .map((s) => s.textContent ?? '')
        .join('\n')
    );
    expect(ld).toContain('"@type":"WebSite"');
    expect(ld).toContain('"@id":"https://thebrandcrew.lat/#business"');
    expect(ld).toContain('"@type":"BreadcrumbList"');
    // Los offers viven solo en la home (entidad completa una sola vez).
    expect(ld).not.toContain('"@type":"Offer"');
  });
});
