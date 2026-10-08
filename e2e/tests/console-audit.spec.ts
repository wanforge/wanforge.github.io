import { expect, test } from '@playwright/test';
import { testRoutes } from '../fixtures/test-data';

/**
 * Console Audit Tests
 *
 * Verifies that all pages have zero console errors and minimal warnings
 * in both light and dark modes.
 *
 * Satisfies Task 19.1.3: Verify Zero Console Errors
 */
test.describe('Console Audit', () => {
  const pagesToTest = Object.entries(testRoutes).filter(
    ([key]) => !['dashboard', 'settings'].includes(key), // Skip placeholder routes
  );

  const themes: ('light' | 'dark')[] = ['light', 'dark'];

  for (const theme of themes) {
    test.describe(`${theme.toUpperCase()} Mode`, () => {
      for (const [name, path] of pagesToTest) {
        test(`Page "${name}" (${path}) should have no console errors or CSS warnings`, async ({
          page,
        }) => {
          const consoleErrors: string[] = [];
          const consoleWarnings: string[] = [];

          // Monitor console for errors and warnings
          page.on('console', (msg) => {
            const text = msg.text();
            const type = msg.type();

            // Ignore HMR and dev server noise
            if (
              text.includes('WebSocket') ||
              text.includes('ERR_CONNECTION_REFUSED') ||
              text.includes('localhost:4321') ||
              text.includes('hmr') ||
              text.includes('[Astro] hot module replacement')
            ) {
              return;
            }

            if (type === 'error') {
              consoleErrors.push(text);
            } else if (type === 'warning') {
              // We capture warnings but might filter them if they are unavoidable (e.g. from 3rd party)
              // The task specifically mentioned CSS warnings.
              consoleWarnings.push(text);
            }
          });

          // Set theme before navigation using localStorage
          await page.addInitScript((t) => {
            window.localStorage.setItem('theme', t);
          }, theme);

          // Navigate to the page
          const response = await page.goto(path, { waitUntil: 'networkidle' });

          // Verify response status
          expect(response?.status()).toBe(200);

          // Wait a bit for any late-loading hydration errors
          await page.waitForTimeout(1000);

          // Trigger some interactions to check for runtime errors
          // Scroll down to trigger lazy loading and intersection observers
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await page.waitForTimeout(500);
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(500);

          // Verify no critical errors in console
          expect(
            consoleErrors,
            `Found console errors on ${name} [${theme}]:\n${consoleErrors.join('\n')}`,
          ).toHaveLength(0);

          // Verify no CSS warnings or other critical warnings
          // Some warnings might be acceptable in dev, but for "audit" we want a clean slate.
          // Filtering common non-critical warnings if necessary.
          const criticalWarnings = consoleWarnings.filter(
            (w) =>
              w.toLowerCase().includes('css') ||
              w.toLowerCase().includes('invalid') ||
              w.toLowerCase().includes('failed'),
          );

          expect(
            criticalWarnings,
            `Found critical console warnings on ${name} [${theme}]:\n${criticalWarnings.join('\n')}`,
          ).toHaveLength(0);
        });
      }
    });
  }
});
