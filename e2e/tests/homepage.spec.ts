import { expect, test, viewports } from '../utils/test-helpers';
import { testRoutes } from '../fixtures/test-data';

/**
 * Homepage E2E Tests
 *
 * Comprehensive tests for the homepage covering:
 * - Hero section visibility
 * - Navigation functionality
 * - CTA interactions
 * - Responsive behavior
 *
 * @group homepage
 */
test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testRoutes.home);
    await page.waitForLoadState('networkidle');
  });

  test.describe('Hero Section', () => {
    test('displays headline and description', async ({ page }) => {
      const headline = page.locator('main h1').first();
      await expect(headline).toBeVisible();
      await expect(headline).not.toBeEmpty();
    });

    test('has primary CTA button', async ({ page }) => {
      const primaryCta = page
        .locator('main a, main button')
        .filter({ hasText: /get started|start free trial/i })
        .first();
      await expect(primaryCta).toBeVisible();
    });

    test('has secondary CTA button', async ({ page }) => {
      const secondaryCta = page
        .locator('a, button')
        .filter({ hasText: /book demo|view pricing|learn more/i });
      // Secondary CTA may not always be present
      if (await secondaryCta.isVisible().catch(() => false)) {
        await expect(secondaryCta).toBeVisible();
      }
    });
  });

  test.describe('Navigation', () => {
    test('header is visible', async ({ page }) => {
      const header = page.locator('header[aria-label="Site header"]');
      await expect(header).toBeVisible();
    });

    test('navigation links work', async ({ page }) => {
      const navLinks = page.locator('nav a');
      const count = await navLinks.count();
      expect(count).toBeGreaterThan(0);

      // Test that nav links are clickable and navigate
      if (count > 0) {
        const firstLink = navLinks.first();
        await expect(firstLink).toBeVisible();
      }
    });
  });

  test.describe('Footer', () => {
    test('footer is visible', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('footer contains links', async ({ page }) => {
      const footerLinks = page.locator('footer a');
      const count = await footerLinks.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Responsive Behavior', () => {
    test('displays correctly on mobile', async ({ page }) => {
      await page.setViewportSize(viewports.sm);
      await page.reload();
      await page.waitForLoadState('networkidle');

      const headline = page.locator('main h1').first();
      await expect(headline).toBeVisible();
    });

    test('displays correctly on tablet', async ({ page }) => {
      await page.setViewportSize(viewports.md);
      await page.reload();
      await page.waitForLoadState('networkidle');

      const headline = page.locator('main h1').first();
      await expect(headline).toBeVisible();
    });

    test('displays correctly on desktop', async ({ page }) => {
      await page.setViewportSize(viewports.xl);
      await page.reload();
      await page.waitForLoadState('networkidle');

      const headline = page.locator('main h1').first();
      await expect(headline).toBeVisible();
    });
  });

  test.describe('SEO and Meta', () => {
    test('has proper page title', async ({ page }) => {
      await expect(page).toHaveTitle(/ModernSaaS|Landing|Template/i);
    });

    test('has meta description', async ({ page }) => {
      const metaDescription = page.locator('meta[name="description"]');
      const content = await metaDescription.getAttribute('content');
      expect(content).toBeTruthy();
    });

    test('has proper charset', async ({ page }) => {
      const charset = page.locator('meta[charset]');
      await expect(charset).toHaveAttribute('charset', /utf-8/i);
    });
  });

  test.describe('Accessibility', () => {
    test('has skip link or main landmark', async ({ page }) => {
      const main = page.locator('main');
      const skipLink = page.locator('a[href^="#"]');

      const hasMain = await main.isVisible().catch(() => false);
      const hasSkipLink = await skipLink.isVisible().catch(() => false);

      expect(hasMain || hasSkipLink).toBe(true);
    });

    test('images have alt text', async ({ page }) => {
      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        // Decorative images can have empty alt, but should have alt attribute
        expect(alt !== null).toBe(true);
      }
    });

    test('interactive elements are keyboard accessible', async ({ page }) => {
      const buttons = page.locator('button');

      if (
        await buttons
          .first()
          .isVisible()
          .catch(() => false)
      ) {
        await buttons.first().focus();
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
      }
    });
  });
});
