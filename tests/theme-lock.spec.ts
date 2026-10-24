import { test, expect, type Page } from '@playwright/test';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = join(process.cwd(), 'src');

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

// Chromium serializes computed oklch() colors as oklch(), so we resolve them
// to sRGB through the browser's own paint pipeline (1x1 canvas readback).
async function channels(page: Page, selector: string, prop: 'color' | 'background-color') {
  return page
    .locator(selector)
    .first()
    .evaluate((el, p) => {
      const value = getComputedStyle(el).getPropertyValue(p).trim();
      if (!CSS.supports('color', value)) throw new Error(`Unsupported color for ${p}: ${value}`);
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = '#000';
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return { value, r, g, b };
    }, prop);
}

const allAtMost = (c: { r: number; g: number; b: number }, n: number) =>
  c.r <= n && c.g <= n && c.b <= n;
const allAtLeast = (c: { r: number; g: number; b: number }, n: number) =>
  c.r >= n && c.g >= n && c.b >= n;

// Opción A (brand decision): the site is locked to LIGHT. System dark
// preference must never change it (Chrome auto-dark, force-dark, Dark Reader).
// The audited dark palette ships DORMANT: it activates only via a manual
// [data-theme="dark"] attribute on <html> (groundwork for Option B).
const setDark = (page: Page) =>
  page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));

test.describe('Theme lock (Opción A: light fijo de marca)', () => {
  test('light mode is default', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    const bodyBg = await channels(page, 'body', 'background-color');
    expect(
      allAtLeast(bodyBg, 230),
      `body background should be light, got ${bodyBg.value} -> rgb(${bodyBg.r},${bodyBg.g},${bodyBg.b})`
    ).toBe(true);

    const h1 = await channels(page, 'h1.hero-title', 'color');
    expect(
      allAtMost(h1, 80),
      `h1.hero-title should be dark, got ${h1.value} -> rgb(${h1.r},${h1.g},${h1.b})`
    ).toBe(true);
  });

  test('system dark preference does NOT change the site', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const bodyBg = await channels(page, 'body', 'background-color');
    expect(
      allAtLeast(bodyBg, 230),
      `body background must stay LIGHT on dark system pref, got ${bodyBg.value} -> rgb(${bodyBg.r},${bodyBg.g},${bodyBg.b})`
    ).toBe(true);

    const h1 = await channels(page, 'h1.hero-title', 'color');
    expect(
      allAtMost(h1, 80),
      `h1.hero-title must stay dark, got ${h1.value} -> rgb(${h1.r},${h1.g},${h1.b})`
    ).toBe(true);

    const sub = await channels(page, 'p.hero-sub', 'color');
    expect(
      allAtMost(sub, 80),
      `p.hero-sub must stay dark, got ${sub.value} -> rgb(${sub.r},${sub.g},${sub.b})`
    ).toBe(true);
  });

  test('head meta locks the theme to light', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute('content', 'only light');
    await expect(page.locator('meta[name="darkreader-lock"]')).toHaveCount(1);
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#ffffff');
    await expect(page.locator('meta[name="theme-color"][media]')).toHaveCount(0);
  });

  test('no prefers-color-scheme anywhere in src (lock invariant)', async () => {
    const failures: string[] = [];
    for (const file of walk(SRC)) {
      readFileSync(file, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          if (line.includes('prefers-color-scheme')) failures.push(`${file}:${i + 1}: ${line.trim()}`);
        });
    }
    expect(failures, `prefers-color-scheme must not exist in src:\n${failures.join('\n')}`).toEqual([]);
  });

  test('no JS theme mechanism exists', async () => {
    // localStorage/theme-toggle stay forbidden. `data-theme` lives ONLY in
    // CSS selectors (the dormant Option B palette) — flag any JS usage of it.
    const failures: string[] = [];

    const themeLocalStorage =
      /localStorage\s*\.\s*(?:getItem|setItem|removeItem)\s*\(\s*['"`][^'"`]*theme/i;
    const themeToggle = /theme-toggle|classList\s*\.\s*.*\b(?:dark|light)\b\s*['"]/;
    const jsDataTheme = /dataset\s*\.\s*theme|setAttribute\s*\(\s*['"`]data-theme/;

    for (const file of walk(SRC)) {
      if (file.endsWith('.css')) continue; // CSS selectors are the intended home
      const lines = readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, i) => {
        if (themeLocalStorage.test(line) || themeToggle.test(line) || jsDataTheme.test(line)) {
          failures.push(`${file}:${i + 1}: ${line.trim()}`);
        }
      });
    }

    expect(failures, `JS theming found:\n${failures.join('\n')}`).toEqual([]);
  });
});

test.describe('Dormant dark palette (Option B readiness)', () => {
  test('tokens flip with [data-theme="dark"]', async ({ page }) => {
    await page.goto('/');
    await setDark(page);

    const bodyBg = await channels(page, 'body', 'background-color');
    expect(
      allAtMost(bodyBg, 40),
      `body background should be dark, got ${bodyBg.value} -> rgb(${bodyBg.r},${bodyBg.g},${bodyBg.b})`
    ).toBe(true);

    const h1 = await channels(page, 'h1.hero-title', 'color');
    expect(
      allAtLeast(h1, 200),
      `h1.hero-title should be light, got ${h1.value} -> rgb(${h1.r},${h1.g},${h1.b})`
    ).toBe(true);

    const sub = await channels(page, 'p.hero-sub', 'color');
    expect(
      allAtLeast(sub, 200),
      `p.hero-sub should be light, got ${sub.value} -> rgb(${sub.r},${sub.g},${sub.b})`
    ).toBe(true);
  });

  test('hero isotype turns white', async ({ page }) => {
    await page.goto('/');
    await setDark(page);

    const filter = await page
      .locator('.hero-isotype .logo-isotype')
      .first()
      .evaluate((el) => getComputedStyle(el).filter);
    expect(filter).toContain('invert(1)');
  });

  test('navbar logo is white', async ({ page }) => {
    await page.goto('/');
    await setDark(page);

    const filter = await page
      .locator('.navbar-brand .logo-isotype')
      .first()
      .evaluate((el) => getComputedStyle(el).filter);
    expect(filter).toContain('invert(1)');
  });

  test('navbar logo plate removed', async ({ page }) => {
    await page.goto('/');
    await setDark(page);

    const bg = await page
      .locator('.navbar-brand .logo-wrap')
      .first()
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgba(0, 0, 0, 0)');
  });

  test('CTA keeps black text on white plate', async ({ page }) => {
    await page.goto('/');
    await setDark(page);

    const color = await channels(page, '.hero-actions .btn-premium', 'color');
    expect(
      allAtMost(color, 60),
      `.btn-premium text should be dark, got ${color.value} -> rgb(${color.r},${color.g},${color.b})`
    ).toBe(true);

    const bg = await channels(page, '.hero-actions .btn-premium', 'background-color');
    expect(
      allAtLeast(bg, 250),
      `.btn-premium plate should be white, got ${bg.value} -> rgb(${bg.r},${bg.g},${bg.b})`
    ).toBe(true);
  });

  test('CTA section button black on white', async ({ page }) => {
    await page.goto('/#contacto');
    await page.locator('.cta-btn').first().waitFor();
    await setDark(page);

    const color = await channels(page, '.cta-btn', 'color');
    expect(
      allAtMost(color, 60),
      `.cta-btn text should be dark, got ${color.value} -> rgb(${color.r},${color.g},${color.b})`
    ).toBe(true);

    const bg = await channels(page, '.cta-btn', 'background-color');
    expect(
      allAtLeast(bg, 250),
      `.cta-btn plate should be white, got ${bg.value} -> rgb(${bg.r},${bg.g},${bg.b})`
    ).toBe(true);
  });

  test('light: navbar logo NOT inverted', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    const filter = await page
      .locator('.navbar-brand .logo-isotype')
      .first()
      .evaluate((el) => getComputedStyle(el).filter);
    expect(filter).not.toContain('invert(1)');
    expect(filter).toBe('brightness(0)');
  });
});
