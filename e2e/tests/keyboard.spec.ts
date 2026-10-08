import { expect, test } from '../utils/test-helpers';

/**
 * Keyboard Navigation and Accessibility E2E Tests
 *
 * Verifies that the site is fully navigable via keyboard,
 * focus visibility is maintained, and focus traps work correctly.
 */

test.describe('Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations for stability
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('.');
    await page.waitForLoadState('networkidle');
  });

  test('skip to content link works', async ({ page }) => {
    // Tab to the skip link
    await page.keyboard.press('Tab');

    const skipLink = page.getByRole('link', { name: /skip to content/i });

    // We try up to 3 tabs to find the skip link (some browsers focus address bar first)
    for (let i = 0; i < 2 && (await skipLink.isHidden()); i++) {
      await page.keyboard.press('Tab');
    }

    await expect(skipLink).toBeVisible();

    // Press Enter to skip
    await page.keyboard.press('Enter');

    // Verify focus is now on the main content
    const mainContent = page.locator('main#main-content');
    await expect(async () => {
      const isFocused = await mainContent.evaluate((el) => document.activeElement === el);
      expect(isFocused).toBeTruthy();
    }).toPass({ timeout: 5000 });
  });

  test('tab navigation through header links', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: /Main/i });
    // Check if desktop nav is visible
    if (await nav.isHidden()) {
      test.skip(true, 'Desktop navigation is hidden');
    }

    // Start from the top
    await page.keyboard.press('Tab'); // Skip to content
    await page.keyboard.press('Tab'); // Logo

    const logo = page.locator('header').getByLabel(/Home/i);
    await expect(async () => {
      const isFocused = await logo.evaluate((el) => document.activeElement === el);
      if (!isFocused) await page.keyboard.press('Tab');
      expect(await logo.evaluate((el) => document.activeElement === el)).toBeTruthy();
    }).toPass();

    // Theme toggle
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });

    // Tab until we reach the theme toggle
    await expect(async () => {
      await page.keyboard.press('Tab');
      const isFocused = await themeToggle.evaluate((el) => document.activeElement === el);
      expect(isFocused).toBeTruthy();
    }).toPass({ intervals: [100, 200, 500], timeout: 5000 });

    // CTA button
    await page.keyboard.press('Tab');
    const ctaButton = page.locator('header').getByRole('link', { name: /Get Started/i });
    await expect(ctaButton).toBeFocused();
  });

  test('demo link modal focus trap', async ({ page }) => {
    // Use a footer social link which we know triggers the modal
    const githubLink = page.locator('footer').getByLabel(/GitHub/i);
    await githubLink.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // Wait for hydration
    await githubLink.click();

    const modal = page.getByTestId('modal-content');
    await expect(modal).toBeVisible({ timeout: 10000 });

    // Wait for animation
    await page.waitForTimeout(300);

    // Verify focus is trapped inside modal
    await expect(async () => {
      const isInside = await modal.evaluate((el) => el.contains(document.activeElement));
      expect(isInside).toBeTruthy();
    }).toPass();

    // Tab around and ensure it stays inside
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const isInside = await modal.evaluate((el) => el.contains(document.activeElement));
      expect(isInside).toBeTruthy();
    }

    // Escape to close
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();

    // Focus should return to trigger
    await expect(async () => {
      const isFocused = await githubLink.evaluate((el) => document.activeElement === el);
      expect(isFocused).toBeTruthy();
    }).toPass();
  });

  test('mobile navigation focus trap', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /Open menu/i });
    if (await menuButton.isHidden()) {
      test.skip(true, 'Mobile menu is hidden');
    }

    await menuButton.click();

    const navDrawer = page.locator('#mobile-navigation');
    await expect(navDrawer).toBeVisible();

    // Wait for animation
    await page.waitForTimeout(500);

    // Check if something inside is focused
    await expect(async () => {
      const isInside = await navDrawer.evaluate((el) => el.contains(document.activeElement));
      expect(isInside).toBeTruthy();
    }).toPass();

    // Tab around
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const isStillInside = await navDrawer.evaluate((el) => el.contains(document.activeElement));
      expect(isStillInside).toBeTruthy();
    }

    // Escape to close
    await page.keyboard.press('Escape');
    await expect(navDrawer).not.toBeVisible();

    // Focus should return to menu button
    await expect(async () => {
      const isFocused = await menuButton.evaluate((el) => document.activeElement === el);
      expect(isFocused).toBeTruthy();
    }).toPass();
  });

  test('contact form keyboard interaction', async ({ page }) => {
    await page.goto('contact/');
    await page.waitForLoadState('networkidle');

    const form = page.getByTestId('contact-form');
    await expect(form).toBeVisible();

    // Focus the first field directly to avoid header tabbing complexity
    const nameInput = page.getByLabel(/Full Name/i);
    await nameInput.focus();

    // Start filling form via keyboard
    await page.keyboard.type('Test User');

    await page.keyboard.press('Tab'); // Email field
    await page.keyboard.type('test@example.com');

    await page.keyboard.press('Tab'); // Company field
    await page.keyboard.type('Test Co');

    await page.keyboard.press('Tab'); // Inquiry Type select
    await page.keyboard.press('ArrowDown'); // Select first real option

    await page.keyboard.press('Tab'); // Message field
    await page.keyboard.type('This is a test message from keyboard.');

    await page.keyboard.press('Tab'); // Submit button
    const submitBtn = page.getByTestId('contact-submit');
    await expect(submitBtn).toBeFocused();

    // Press Enter to submit
    await page.keyboard.press('Enter');

    // Verify success state or loading
    await expect(page.locator('text=Thank you!')).toBeVisible({ timeout: 10000 });
  });
});
