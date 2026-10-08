import { expect, test } from '@playwright/test';

/**
 * E2E Setup Verification Test
 *
 * This test verifies that Playwright is configured correctly
 * and the local dev server is accessible.
 *
 * @group setup
 */
test.describe('E2E Setup Verification', () => {
  test('dev server is accessible', async ({ page }) => {
    await page.goto('.');
    await expect(page).toHaveTitle(/ModernSaaS|Astro/);
  });

  test('page loads without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('.');
    await page.waitForLoadState('networkidle');

    expect(consoleErrors).toHaveLength(0);
  });

  test('responsive meta tags are present', async ({ page }) => {
    await page.goto('.');

    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toBeTruthy();
  });
});
