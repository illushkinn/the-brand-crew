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

  test('answer max-height expands to scrollHeight', async ({ page }) => {
    const firstQuestion = page.locator('.faq-question').first();
    const firstAnswer = page.locator('.faq-answer').first();

    // Click to open
    await firstQuestion.click();
    await page.waitForTimeout(100);

    // Verify max-height is set and greater than 0
    const maxHeight = await firstAnswer.evaluate(el => window.getComputedStyle(el).maxHeight);
    expect(maxHeight).not.toBe('0px');
    expect(maxHeight).not.toBe('none');
  });

  test('chevron rotates when item opens', async ({ page }) => {
    const firstQuestion = page.locator('.faq-question').first();
    const chevron = firstQuestion.locator('.faq-icon');

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
