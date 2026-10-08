import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { testRoutes } from '../fixtures/test-data';

/**
 * Color Contrast Verification Tests
 *
 * Specifically validates that all text meets WCAG contrast requirements:
 * - Normal text: 4.5:1 ratio
 * - Large text: 3:1 ratio
 *
 * These tests run in both Light and Dark modes across all major pages.
 */
test.describe('Color Contrast Verification', () => {
  // Key pages to verify
  const routes = [
    testRoutes.home,
    testRoutes.features,
    testRoutes.pricing,
    testRoutes.about,
    testRoutes.blog,
    testRoutes.contact,
    testRoutes.support,
    testRoutes.changelog,
    testRoutes.roadmap,
    testRoutes.privacy,
    testRoutes.terms,
  ];

  for (const route of routes) {
    test.describe(`Page: ${route}`, () => {
      test('should pass contrast checks in light mode', async ({ page }) => {
        await page.goto(route);
        await page.waitForLoadState('networkidle');

        // Force light mode via class
        await page.evaluate(() => {
          document.documentElement.classList.remove('dark');
          document.documentElement.setAttribute('data-theme', 'light');
          document.documentElement.style.colorScheme = 'light';
        });

        // Scroll to make header solid
        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(500);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withRules(['color-contrast'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });

      test('should pass contrast checks in dark mode', async ({ page }) => {
        await page.goto(route);
        await page.waitForLoadState('networkidle');

        // Force dark mode via class
        await page.evaluate(() => {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
          document.documentElement.style.colorScheme = 'dark';
        });

        // Scroll to make header solid and ensure all elements are visible
        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(500);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withRules(['color-contrast'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
  }
});
