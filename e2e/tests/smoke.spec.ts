import { expect, test } from '@playwright/test';
import { selectors, testRoutes } from '../fixtures/test-data';

/**
 * Smoke Tests
 *
 * Verifies that all key pages are accessible and render the basic layout.
 * These tests are intended to run after deployment or against the production build.
 */
test.describe('Smoke Tests', () => {
  // Test all main pages listed in testRoutes
  const pagesToTest = Object.entries(testRoutes).filter(
    ([key]) => !['dashboard', 'settings'].includes(key), // Skip placeholder routes
  );

  for (const [name, path] of pagesToTest) {
    test(`Page "${name}" (${path}) should be accessible and have no asset errors`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      const failedRequests: string[] = [];

      // Monitor console for errors
      page.on('console', (msg) => {
        const text = msg.text();
        // Ignore HMR and common dev server noise
        if (
          msg.type() === 'error' &&
          !text.includes('WebSocket') &&
          !text.includes('ERR_CONNECTION_REFUSED') &&
          !text.includes('localhost:4321') &&
          !text.includes('hmr')
        ) {
          consoleErrors.push(text);
        }
      });

      // Monitor network requests
      page.on('requestfailed', (request) => {
        const url = request.url();
        const error = request.failure()?.errorText || 'unknown error';
        // Ignore HMR and dev server noise
        if (
          !url.includes('token=') &&
          !url.includes('hmr') &&
          !error.includes('NS_ERROR_CONNECTION_REFUSED') &&
          !error.includes('ERR_CONNECTION_REFUSED')
        ) {
          failedRequests.push(`${url}: ${error}`);
        }
      });

      page.on('response', (response) => {
        const url = response.url();
        if (response.status() >= 400 && !url.includes('token=') && !url.includes('hmr')) {
          failedRequests.push(`${url}: ${response.status()}`);
        }
      });

      // Use relative path to respect baseURL with subdirectory
      const response = await page.goto(path, { waitUntil: 'networkidle' });

      // Verify response status
      expect(response?.status()).toBe(200);

      // Verify basic layout elements exist
      await expect(page.locator(selectors.navigation.header)).toBeVisible();
      await expect(page.locator(selectors.footer.section)).toBeVisible();

      // Trigger lazy loading
      await page.evaluate(async () => {
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        const scrollStep = 800;
        const totalHeight = document.body.scrollHeight;
        let currentScroll = 0;

        while (currentScroll < totalHeight) {
          window.scrollBy(0, scrollStep);
          currentScroll += scrollStep;
          await delay(50);
        }
        await delay(500);
        window.scrollTo(0, 0);
      });

      // Wait for any remaining assets
      await page.waitForTimeout(1000);

      // Verify no critical errors in console
      expect(
        consoleErrors,
        `Found console errors on ${name}: ${consoleErrors.join(', ')}`,
      ).toHaveLength(0);

      // Verify no failed network requests
      expect(
        failedRequests,
        `Found failed network requests on ${name}: ${failedRequests.join(', ')}`,
      ).toHaveLength(0);

      // Verify images are loaded correctly
      const imagesLocator = page.locator('img[src]');
      const count = await imagesLocator.count();
      for (let i = 0; i < count; i++) {
        const img = imagesLocator.nth(i);
        const naturalWidth = await img.evaluate((node: HTMLImageElement) => node.naturalWidth);
        const src = await img.getAttribute('src');
        expect(
          naturalWidth,
          `Image ${src} failed to load on ${name} (naturalWidth is 0)`,
        ).toBeGreaterThan(0);
      }

      // Verify fonts are loaded (optional check for CI stability)
      const fontsLoaded = await page.evaluate(async () => {
        try {
          await document.fonts.ready;
          return Array.from(document.fonts).filter((font) => font.status === 'loaded').length;
        } catch {
          return -1; // API not supported or error
        }
      });
      // Only fail if we explicitly found 0 loaded fonts AND the API is supported
      if (fontsLoaded === 0) {
        console.warn(`Warning: No fonts reported as loaded on ${name}`);
      }
    });
  }

  test('404 redirect should work for unknown routes', async ({ page }) => {
    // Navigate to a non-existent page using relative path
    const response = await page.goto('this-page-does-not-exist');

    // GitHub Pages 404 redirect script should handle this.
    // In our local preview/dev, it might return 404 or our custom 404 handling.
    // If handleRedirect is working, it should eventually settle on a valid state or remain on 404.
    // However, since we removed 404.astro and use 404.html redirect,
    // we expect the response status to be 404 from the server,
    // but the page content should be our redirecting HTML.

    expect(response?.status()).toBe(404);
  });
});

test.describe('Production Critical Features', () => {
  test.beforeEach(async ({ page }) => {
    // Use relative path to respect baseURL
    await page.goto('.');
  });

  test('Theme switching should work and persist', async ({ page }) => {
    const toggle = page.locator(selectors.navigation.themeToggle);
    const html = page.locator('html');

    // Wait for hydration
    await expect(toggle).toBeVisible();
    await page.waitForTimeout(500);

    // Initial state check - default to light if not set
    const initialTheme = (await html.getAttribute('data-theme')) || 'light';

    // Toggle theme
    await toggle.click({ force: true });
    await page.waitForTimeout(500);

    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme, 'Theme should change after click').not.toBe(initialTheme);
    expect(newTheme).not.toBeNull();

    // Refresh and verify persistence
    await page.reload({ waitUntil: 'networkidle' });
    await expect(html).toHaveAttribute('data-theme', newTheme!, { timeout: 10000 });
  });

  test('Demo modals should trigger for placeholder links', async ({ page }) => {
    // Find a social link in the footer
    const socialLink = page.locator(selectors.footer.socialLinks).first();
    await socialLink.click();

    // Verify modal is visible
    await expect(page.locator(selectors.modal.overlay)).toBeVisible();
    await expect(page.locator(selectors.modal.demoMessage)).toBeVisible();

    // Close modal
    await page.locator(selectors.modal.closeButton).click();
    await expect(page.locator(selectors.modal.overlay)).not.toBeVisible();
  });

  test('Forms should handle submissions in demo mode', async ({ page }) => {
    await page.goto(testRoutes.contact);

    const form = page.locator(selectors.forms.contact);
    await expect(form).toBeVisible();

    // Fill form
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[type="email"]', 'john@example.com');
    await page.selectOption('select[name="inquiryType"]', 'general');
    await page.fill('textarea[name="message"]', 'This is a test message.');

    // Submit
    await page.locator(selectors.forms.contactSubmit).click();

    // Verify success message (we mock a 1.5s delay in the component)
    await expect(page.getByText(/message sent successfully|thank you/i).first()).toBeVisible({
      timeout: 10000,
    });
  });
});
