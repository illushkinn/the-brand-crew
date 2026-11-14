import { test, expect } from '@playwright/test';

// The switcher must never emit a 404. EN pages used to lose the leading slash
// (/enpricing) and ES-only pages linked to a nonexistent EN twin.
const cases = [
  { path: '/', es: '/', en: '/en' },
  { path: '/en', es: '/', en: '/en' },
  { path: '/pricing', es: '/pricing', en: '/en/pricing' },
  { path: '/en/pricing', es: '/pricing', en: '/en/pricing' },
  { path: '/en/pricing/growth-partner', es: '/pricing/growth-partner', en: '/en/pricing/growth-partner' },
  { path: '/servicios/diseno-web', es: '/servicios/diseno-web', en: '/en/services/web-design' },
  { path: '/en/services/web-design', es: '/servicios/diseno-web', en: '/en/services/web-design' },
  { path: '/guias/cuanto-cuesta-una-pagina-web-en-argentina', es: '/guias/cuanto-cuesta-una-pagina-web-en-argentina', en: '/en' },
  { path: '/diseno-web-mar-del-plata', es: '/diseno-web-mar-del-plata', en: '/en' },
];

for (const { path, es, en } of cases) {
  test(`switcher links on ${path}`, async ({ page }) => {
    await page.goto(path);
    const links = page.locator('.lang-switcher a');
    await expect(links.nth(0)).toHaveAttribute('href', es);
    await expect(links.nth(1)).toHaveAttribute('href', en);
  });
}
