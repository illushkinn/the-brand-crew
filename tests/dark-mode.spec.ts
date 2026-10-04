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

test.describe('Dark mode (prefers-color-scheme)', () => {
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

  test('dark mode flips page tokens', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

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

  test('dark mode CTA keeps black text on white plate', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const color = await channels(page, '.hero-actions .btn-premium', 'color');
    expect(
      allAtMost(color, 60),
      `btn-premium text should be dark, got ${color.value} -> rgb(${color.r},${color.g},${color.b})`
    ).toBe(true);

    const bg = await channels(page, '.hero-actions .btn-premium', 'background-color');
    expect(
      allAtLeast(bg, 250),
      `btn-premium plate should be white, got ${bg.value} -> rgb(${bg.r},${bg.g},${bg.b})`
    ).toBe(true);
  });

  test('dark mode hero isotype turns white', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const filter = await page
      .locator('.hero-isotype .logo-isotype')
      .first()
      .evaluate((el) => getComputedStyle(el).filter);
    expect(filter).toContain('invert(1)');
  });

  test('dark mode sets theme-color meta', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const meta = page.locator('meta[name="theme-color"][media*="prefers-color-scheme: dark"]');
    await expect(meta).toHaveCount(1);
    await expect(meta).toHaveAttribute('content', '#0e0f15');
  });

  test('no JS theme mechanism exists', async () => {
    const failures: string[] = [];

    const themeLocalStorage =
      /localStorage\s*\.\s*(?:getItem|setItem|removeItem)\s*\(\s*['"`][^'"`]*theme/i;
    const dataTheme = /data-theme\s*=/;
    const themeToggle = /theme-toggle|classList\s*\.\s*.*\b(?:dark|light)\b\s*['"]/;

    for (const file of walk(SRC)) {
      const lines = readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, i) => {
        if (themeLocalStorage.test(line) || dataTheme.test(line) || themeToggle.test(line)) {
          failures.push(`${file}:${i + 1}: ${line.trim()}`);
        }
      });
    }

    expect(failures, `JS theming found:\n${failures.join('\n')}`).toEqual([]);
  });

  test('dark: navbar logo is white', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const filter = await page
      .locator('.navbar-brand .logo-isotype')
      .first()
      .evaluate((el) => getComputedStyle(el).filter);
    expect(filter).toContain('invert(1)');
  });

  test('dark: navbar logo plate removed', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const bg = await page
      .locator('.navbar-brand .logo-wrap')
      .first()
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgba(0, 0, 0, 0)');
  });

  test('dark: CTA section button black on white', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/#contacto');
    await page.locator('.cta-btn').first().waitFor();

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
