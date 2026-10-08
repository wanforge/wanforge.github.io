import { expect, test } from '@playwright/test';
import { testRoutes } from '../fixtures/test-data';

/**
 * Cross-Browser Compatibility Tests
 *
 * Verifies that critical page elements are visible and functional
 * across different browser engines (Chromium, Firefox, WebKit).
 */

test.describe('Cross-Browser Compatibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testRoutes.home);
    await page.waitForLoadState('networkidle');
    // Ensure fonts are loaded to prevent layout shifts
    await page.evaluate(() => document.fonts.ready);
  });

  test('homepage renders correctly on all browsers', async ({ page }) => {
    // Verify main headline is visible
    const headline = page.locator('h1').first();
    await expect(headline).toBeVisible();

    // Verify navigation is present
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    // Verify footer is present
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('theme switching works on all browsers', async ({ page }) => {
    // Initial theme check
    const initialTheme = await page.evaluate(
      () => document.documentElement.getAttribute('data-theme') || 'light',
    );

    // Find theme toggle in Header
    const themeToggle = page
      .locator('header button[aria-label*="theme"], header button[aria-label*="mode"]')
      .first();

    await expect(themeToggle).toBeVisible();

    // Use force click to ensure it triggers even if there are overlapping elements
    await themeToggle.click({ force: true });

    // Wait for the theme to change in the DOM
    await expect(async () => {
      const newTheme = await page.evaluate(() =>
        document.documentElement.getAttribute('data-theme'),
      );
      expect(newTheme).not.toBe(initialTheme);
    }).toPass({
      intervals: [500, 1000],
      timeout: 5000,
    });
  });

  test('responsive layout adapts on all browsers', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(500);
    await expect(page.locator('h1').first()).toBeVisible();

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await expect(page.locator('h1').first()).toBeVisible();

    // Check for no horizontal overflow (allow small tolerance for scrollbars or subpixel rendering)
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 5;
    });
    expect(hasOverflow).toBe(false);
  });

  test('visual baseline comparison (Hero Section)', async ({ page }) => {
    // Emulate reduced motion to disable JS-based animations (Framer Motion)
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto(testRoutes.home);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.fonts.ready);

    // Disable CSS animations for stable screenshots
    await page.addStyleTag({
      content: `
      *, *::before, *::after { 
        animation: none !important; 
        transition: none !important; 
        transition-duration: 0ms !important;
        animation-duration: 0ms !important;
      }
      /* Hide the animated mesh gradient which is usually the source of flakiness */
      [class*="gradient"], canvas { visibility: hidden !important; }
    `,
    });

    // Wait a bit more for everything to be static
    await page.waitForTimeout(2000);

    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    // Take screenshot of just the Hero section for better stability
    await expect(hero).toHaveScreenshot('hero-cross-browser.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    });
  });
});
