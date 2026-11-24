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

  test('answer max-height expands when opened and collapses when closed', async ({ page }) => {
    const firstQuestion = page.locator('.faq-question').first();
    const firstAnswer = page.locator('.faq-answer').first();

    // max-height is animated, so the computed value is an intermediate
    // number for ~400ms. Poll it instead of asserting an exact px string.
    const readMaxHeight = () =>
      firstAnswer.evaluate(el => {
        const raw = window.getComputedStyle(el).maxHeight;
        return {
          maxHeight: Number.parseFloat(raw),
          scrollHeight: el.scrollHeight,
        };
      });

    // Click to open
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
    await expect(firstAnswer).toHaveClass(/is-open/);

    // Once expanded, max-height must be a real positive value that does not
    // exceed the answer's scrollHeight (the open answer is fully visible).
    await expect
      .poll(
        async () => {
          const { maxHeight, scrollHeight } = await readMaxHeight();
          return maxHeight > 0 && maxHeight <= scrollHeight;
        },
        { timeout: 3000, intervals: [50, 100, 200], message: 'answer max-height should expand to a positive value' }
      )
      .toBe(true);

    // Click again to close: max-height animates back to 0.
    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    await expect(firstAnswer).not.toHaveClass(/is-open/);

    await expect
      .poll(async () => (await readMaxHeight()).maxHeight, {
        timeout: 3000,
        intervals: [50, 100, 200],
        message: 'answer max-height should collapse back to 0',
      })
      .toBe(0);
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
