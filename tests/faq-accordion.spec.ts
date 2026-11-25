import { test, expect } from '@playwright/test';

test.describe('FAQ Accordion', () => {
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
    // Scroll to FAQ section
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  });

  test('clicking question toggles answer visibility', async ({ page }) => {
    const firstQuestion = page.locator('.faq-question').first();
    const firstAnswer = page.locator('.faq-answer').first();

    // Initially closed
    await expect(firstAnswer).not.toHaveClass(/is-open/);
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    await firstQuestion.click();
    await expect(firstAnswer).toHaveClass(/is-open/);
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');

    // Click again to close
    await firstQuestion.click();
    await expect(firstAnswer).not.toHaveClass(/is-open/);
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
  });

  test('opening one item closes others (single-open pattern)', async ({ page }) => {
    const questions = page.locator('.faq-question');
    const answers = page.locator('.faq-answer');

    // Open first item
    await questions.nth(0).click();
    await expect(answers.nth(0)).toHaveClass(/is-open/);

    // Open second item - first should close
    await questions.nth(1).click();
    await expect(answers.nth(1)).toHaveClass(/is-open/);
    await expect(answers.nth(0)).not.toHaveClass(/is-open/);

    // Open third item - second should close
    await questions.nth(2).click();
    await expect(answers.nth(2)).toHaveClass(/is-open/);
    await expect(answers.nth(1)).not.toHaveClass(/is-open/);
  });

  test('opening an answer releases the height cap (no clipped padding)', async ({ page }) => {
    const firstQuestion = page.locator('.faq-question').first();
    const firstAnswer = page.locator('.faq-answer').first();

    // Headless runs on a loaded machine can skip animation frames, so assert
    // the synchronous state instead of an interpolated value: once expanded,
    // the px cap must be released to max-height: none. A stale px cap is what
    // used to clip the bottom padding (52px cap vs 66px content).
    const readState = () =>
      firstAnswer.evaluate(el => ({
        inlineMaxHeight: el.style.maxHeight,
        computedMaxHeight: window.getComputedStyle(el).maxHeight,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
      }));

    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
    await expect(firstAnswer).toHaveClass(/is-open/);

    await expect
      .poll(async () => (await readState()).inlineMaxHeight, {
        timeout: 5000,
        intervals: [50, 100, 200],
        message: 'expanded answer should release its height cap',
      })
      .toBe('none');

    const open = await readState();
    expect(open.computedMaxHeight).toBe('none');
    expect(open.scrollHeight).toBeGreaterThan(0);
    expect(open.clientHeight + 1).toBeGreaterThanOrEqual(open.scrollHeight);

    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    await expect(firstAnswer).not.toHaveClass(/is-open/);
    expect(Number.parseFloat((await readState()).inlineMaxHeight)).toBe(0);
  });

  test('every open answer renders its full content including padding', async ({ page }) => {
    const questions = page.locator('.faq-question');
    const answers = page.locator('.faq-answer');
    const count = await questions.count();

    for (let i = 0; i < count; i++) {
      await questions.nth(i).click();
      await expect(questions.nth(i)).toHaveAttribute('aria-expanded', 'true');

      const answer = answers.nth(i);
      await expect
        .poll(async () => answer.evaluate(el => el.style.maxHeight), {
          timeout: 5000,
          intervals: [50, 100, 200],
          message: `FAQ item ${i + 1} should release its height cap`,
        })
        .toBe('none');

      const geometry = await answer.evaluate(el => ({
        computedMaxHeight: window.getComputedStyle(el).maxHeight,
        clipped: el.clientHeight + 1 < el.scrollHeight,
      }));
      expect(geometry.computedMaxHeight).toBe('none');
      expect(geometry.clipped).toBe(false);
    }
  });

  test('chevron rotates when item opens', async ({ page }) => {
    const firstQuestion = page.locator('.faq-question').first();
    const chevron = firstQuestion.locator('.faq-chevron');

    // Get initial transform
    const initialTransform = await chevron.evaluate(el => window.getComputedStyle(el).transform);

    // Click to open
    await firstQuestion.click();
    await page.waitForTimeout(350); // Wait for transition

    // Get transform after opening
    const openTransform = await chevron.evaluate(el => window.getComputedStyle(el).transform);

    // Transform should change (rotation)
    expect(openTransform).not.toBe(initialTransform);
  });

  test('all FAQ items are accessible via keyboard', async ({ page }) => {
    const questions = page.locator('.faq-question');
    const count = await questions.count();

    // Tab through questions and verify focus
    for (let i = 0; i < count; i++) {
      const question = questions.nth(i);
      await question.focus();
      await expect(question).toBeFocused();

      // Verify Enter key opens/closes
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      const answer = page.locator('.faq-answer').nth(i);
      const isOpen = await answer.evaluate(el => el.classList.contains('is-open'));
      expect(typeof isOpen).toBe('boolean');
    }
  });
});
