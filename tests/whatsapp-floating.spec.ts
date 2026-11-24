import { test, expect } from '@playwright/test';

const WHATSAPP_BASE = 'https://wa.me/5491169080533';
const ES_MESSAGE = 'Hola, vi su sitio y quiero saber más sobre sus servicios.';
const EN_MESSAGE = "Hi, I saw your site and I'd like to know more about your services.";

function textFromHref(href: string | null): string | null {
  if (!href) return null;
  return new URL(href).searchParams.get('text');
}

test.describe('WhatsApp floating button', () => {
  test('ES: visible, default message and composited ring animation', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('.whatsapp-floating');

    await expect(button).toBeVisible();
    await expect(button).toHaveCSS('opacity', '1');

    const href = await button.getAttribute('href');
    expect(href).not.toBeNull();
    expect(href!.startsWith(`${WHATSAPP_BASE}?text=`)).toBe(true);
    expect(textFromHref(href)).toBe(ES_MESSAGE);

    // Performance guard: no box-shadow pulse. The float-in stays on the
    // button; the pulse is a composited transform/opacity ring on ::after.
    const styles = await button.evaluate(el => ({
      animationName: getComputedStyle(el).animationName,
      ringAnimationName: getComputedStyle(el, '::after').animationName,
      ringContent: getComputedStyle(el, '::after').content,
    }));

    expect(styles.animationName).toContain('wa-float-in');
    expect(styles.animationName).not.toContain('wa-pulse');
    expect(styles.ringAnimationName).toBe('wa-ring');
    expect(styles.ringContent).not.toBe('none');

    // scale(1.5) grows 25% per side; the button sits 20px from the right
    // edge, so the ring must stay inside the viewport (no horizontal scroll).
    const fitsHorizontally = await button.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return rect.right + rect.width * 0.25 <= window.innerWidth;
    });
    expect(fitsHorizontally).toBe(true);
  });

  test('EN: default message', async ({ page }) => {
    await page.goto('/en');
    const button = page.locator('.whatsapp-floating');

    await expect(button).toBeVisible();

    const href = await button.getAttribute('href');
    expect(href).not.toBeNull();
    expect(href!.startsWith(`${WHATSAPP_BASE}?text=`)).toBe(true);
    expect(textFromHref(href)).toBe(EN_MESSAGE);
  });

  test('ring stays hidden during the wa-ring delay', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const button = page.locator('.whatsapp-floating');
    const ringOpacity = () => button.evaluate(el => getComputedStyle(el, '::after').opacity);

    const timing = await button.evaluate(el => {
      const ring = document
        .getAnimations()
        .find(
          (animation): animation is CSSAnimation =>
            animation instanceof CSSAnimation && animation.animationName === 'wa-ring'
        );

      return {
        opacity: getComputedStyle(el, '::after').opacity,
        now: Number(document.timeline.currentTime ?? 0),
        start: ring && ring.startTime !== null ? Number(ring.startTime) : null,
        delay: ring ? Number(ring.effect?.getTiming().delay ?? 0) : null,
      };
    });

    if (timing.start === null || timing.delay === null) {
      test.skip(true, 'wa-ring animation not available in this browser');
      return;
    }

    const elapsed = timing.now - timing.start;
    if (elapsed >= timing.delay) {
      test.skip(true, 'page loaded slower than the 2s delay');
      return;
    }

    // Still inside the delay: the base opacity must keep the ring invisible.
    expect(timing.opacity).toBe('0');

    // Observe only while safely inside the delay window (200ms margin).
    const remaining = Math.floor(timing.delay - elapsed - 200);
    if (remaining > 0) {
      await expect
        .poll(ringOpacity, {
          timeout: Math.min(1000, remaining),
          intervals: [100, 200],
          message: 'the ring must stay hidden until wa-ring begins',
        })
        .toBe('0');
    }
  });

  test.describe('with prefers-reduced-motion', () => {
    // Context-level emulation: applied before navigation.
    test.use({ contextOptions: { reducedMotion: 'reduce' } });

    test('disables the float-in and ring animations', async ({ page }) => {
      await page.goto('/');
      const button = page.locator('.whatsapp-floating');

      const reducedMotion = await page.evaluate(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
      expect(reducedMotion).toBe(true);

      await expect(button).toBeVisible();
      await expect(button).toHaveCSS('opacity', '1');

      const styles = await button.evaluate(el => ({
        animationName: getComputedStyle(el).animationName,
        ringAnimationName: getComputedStyle(el, '::after').animationName,
        ringOpacity: getComputedStyle(el, '::after').opacity,
      }));

      expect(styles.animationName).toBe('none');
      expect(styles.ringAnimationName).toBe('none');
      expect(styles.ringOpacity).toBe('0');
    });
  });
});
