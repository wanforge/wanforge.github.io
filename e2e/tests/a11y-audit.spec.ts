import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { selectors } from '../fixtures/test-data';

/**
 * Accessibility E2E Tests
 *
 * Performs automated accessibility audits using axe-core on all major pages
 * in both light and dark themes to ensure WCAG AA compliance.
 */

// Define routes to audit
const routesToAudit = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features/' },
  { name: 'Pricing', path: '/pricing/' },
  { name: 'About', path: '/about/' },
  { name: 'Blog', path: '/blog/' },
  { name: 'Contact', path: '/contact/' },
  { name: 'Support', path: '/support/' },
  { name: 'Changelog', path: '/changelog/' },
  { name: 'Roadmap', path: '/roadmap/' },
  { name: 'Privacy', path: '/privacy/' },
  { name: 'Terms', path: '/terms/' },
  { name: 'Signup', path: '/signup/' },
  { name: 'Login', path: '/login/' },
  { name: 'Dashboard', path: '/dashboard/' },
  { name: 'Settings', path: '/settings/' },
  { name: 'Blog Post', path: '/blog/introducing-modern-saas-2-0/' },
  { name: '404', path: '/404-non-existent-page' },
];

test.describe('Accessibility Audit', () => {
  for (const { name, path } of routesToAudit) {
    test.describe(`Page: ${name}`, () => {
      test('should have no automatically detectable accessibility violations in light mode', async ({
        page,
      }) => {
        // Ensure light mode via media emulation
        await page.emulateMedia({ colorScheme: 'light' });
        await page.goto(path);

        // Wait for hydration and stability
        await page.waitForLoadState('networkidle');

        // Ensure light mode is applied to the document (force if necessary)
        const themeToggle = page.locator(selectors.navigation.themeToggle);
        if (await themeToggle.isVisible()) {
          const theme = await page.evaluate(() =>
            document.documentElement.getAttribute('data-theme'),
          );
          if (theme === 'dark') {
            await themeToggle.click();
            await page.waitForTimeout(500); // Wait for transition
          }
        }

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        // Print violations for debugging if they exist
        if (accessibilityScanResults.violations.length > 0) {
          console.error(
            `A11y Violations on ${name} (Light Mode):`,
            JSON.stringify(accessibilityScanResults.violations, null, 2),
          );
        }

        expect(accessibilityScanResults.violations).toEqual([]);
      });

      test('should have no automatically detectable accessibility violations in dark mode', async ({
        page,
      }) => {
        // Ensure dark mode via media emulation
        await page.emulateMedia({ colorScheme: 'dark' });
        await page.goto(path);

        // Wait for hydration and stability
        await page.waitForLoadState('networkidle');

        // Ensure dark mode is applied to the document
        const themeToggle = page.locator(selectors.navigation.themeToggle);
        if (await themeToggle.isVisible()) {
          const theme = await page.evaluate(() =>
            document.documentElement.getAttribute('data-theme'),
          );
          if (theme !== 'dark') {
            await themeToggle.click();
            await page.waitForTimeout(500); // Wait for transition
          }
        }

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        // Print violations for debugging if they exist
        if (accessibilityScanResults.violations.length > 0) {
          console.error(
            `A11y Violations on ${name} (Dark Mode):`,
            JSON.stringify(accessibilityScanResults.violations, null, 2),
          );
        }

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
  }
});
