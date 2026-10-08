import { expect, test, viewports } from '../utils/test-helpers';
import { selectors, testRoutes } from '../fixtures/test-data';

/**
 * Responsive Layout E2E Tests
 *
 * Comprehensive responsive testing covering:
 * - Multiple viewport sizes (320px, 768px, 1024px, 1440px)
 * - Page layout rendering at all breakpoints
 * - Content visibility across viewports
 * - Layout consistency and overflow prevention
 *
 * @group responsive
 * @group layout
 */
test.describe('Responsive Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testRoutes.home);
    await page.waitForLoadState('networkidle');
  });

  test.describe('Mobile Small Viewport (320px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(viewports.xs);
      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    test('renders page content correctly at 320px', async ({ page }) => {
      const headline = page.locator('h1.text-gradient');
      await expect(headline).toBeVisible();

      // Content should be visible and contained within viewport
      const headlineBox = await headline.boundingBox();
      expect(headlineBox?.width).toBeLessThanOrEqual(320);
    });

    test('content does not overflow horizontally at 320px', async ({ page }) => {
      // Check for horizontal overflow using scrollWidth comparison on document
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5;
      });

      expect(hasOverflow).toBe(false);
    });

    test('CTA buttons are visible and accessible at 320px', async ({ page }) => {
      const buttons = page.locator('button');
      const count = await buttons.count();
      expect(count).toBeGreaterThan(0);

      // Verify at least one button is visible
      const firstButton = buttons.first();
      await expect(firstButton).toBeVisible();
    });
  });

  test.describe('Tablet Viewport (768px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(viewports.md);
      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    test('renders page content correctly at 768px', async ({ page }) => {
      const headline = page.locator('h1.text-gradient');
      await expect(headline).toBeVisible();

      const headlineBox = await headline.boundingBox();
      expect(headlineBox?.width).toBeLessThanOrEqual(768);
    });

    test('layout adapts to tablet size at 768px', async ({ page }) => {
      const main = page.locator('main');
      await expect(main).toBeVisible();

      const mainBox = await main.boundingBox();
      expect(mainBox?.width).toBeGreaterThan(700);
    });
  });

  test.describe('Desktop Small Viewport (1024px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(viewports.lg);
      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    test('renders page content correctly at 1024px', async ({ page }) => {
      const headline = page.locator('h1.text-gradient');
      await expect(headline).toBeVisible();

      const headlineBox = await headline.boundingBox();
      expect(headlineBox?.width).toBeGreaterThan(0);
      expect(headlineBox?.width).toBeLessThanOrEqual(1200);
    });

    test('layout is properly constrained at 1024px', async ({ page }) => {
      const main = page.locator('main');
      await expect(main).toBeVisible();

      const mainBox = await main.boundingBox();
      expect(mainBox?.width).toBeGreaterThan(900);
    });
  });

  test.describe('Desktop Large Viewport (1440px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.reload();
      await page.waitForLoadState('networkidle');
    });

    test('renders page content correctly at 1440px', async ({ page }) => {
      const headline = page.locator('h1.text-gradient');
      await expect(headline).toBeVisible();

      const headlineBox = await headline.boundingBox();
      expect(headlineBox?.width).toBeLessThanOrEqual(1440);
    });

    test('large desktop layout takes full width at 1440px', async ({ page }) => {
      const body = page.locator('body');
      const bodyBox = await body.boundingBox();

      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyBox?.width).toBeGreaterThanOrEqual(viewportWidth - 30); // Allow for scrollbar
    });
  });

  test.describe('Mobile Navigation Breakpoint Behavior', () => {
    test('mobile breakpoint is at or below 768px', async ({ page }) => {
      await page.setViewportSize({ width: 767, height: 1024 });
      await page.reload();
      await page.waitForLoadState('networkidle');

      const headline = page.locator('h1.text-gradient');
      await expect(headline).toBeVisible();
    });

    test('desktop breakpoint is at or above 1024px', async ({ page }) => {
      await page.setViewportSize(viewports.lg);
      await page.reload();
      await page.waitForLoadState('networkidle');

      const main = page.locator('main');
      await expect(main).toBeVisible();

      const mainBox = await main.boundingBox();
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(mainBox?.width).toBeGreaterThanOrEqual(viewportWidth - 30); // Allow for scrollbar
    });
  });

  test.describe('Layout Consistency Across Viewports', () => {
    test('no horizontal overflow at core breakpoints', async ({ page }) => {
      const breakpoints = [
        viewports.xs,
        viewports.sm,
        viewports.md,
        viewports.lg,
        viewports.xl,
        { width: 1440, height: 900 },
      ];

      for (const size of breakpoints) {
        await test.step(`Testing overflow at ${size.width}px`, async () => {
          await page.setViewportSize(size);
          await page.reload();
          await page.waitForLoadState('networkidle');

          const hasOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5;
          });
          expect(hasOverflow, `Overflow detected at ${size.width}px`).toBe(false);
        });
      }
    });
  });

  test.describe('Mobile Navigation Visibility', () => {
    test('shows mobile menu button on mobile', async ({ page }) => {
      await page.setViewportSize(viewports.xs);
      await page.reload();
      await page.waitForLoadState('networkidle');

      const mobileMenuButton = page.locator(selectors.navigation.mobileMenuButton);
      await expect(mobileMenuButton).toBeVisible();

      const desktopNav = page.locator('nav[aria-label="Main navigation"]');
      await expect(desktopNav).toBeHidden();
    });

    test('hides mobile menu button on desktop', async ({ page }) => {
      await page.setViewportSize(viewports.lg);
      await page.reload();
      await page.waitForLoadState('networkidle');

      const mobileMenuButton = page.locator(selectors.navigation.mobileMenuButton);
      await expect(mobileMenuButton).toBeHidden();

      const desktopNav = page.locator('nav[aria-label="Main navigation"]');
      await expect(desktopNav).toBeVisible();
    });
  });

  test.describe('Responsive Pages Suite', () => {
    const pages = [
      { name: 'Home', route: testRoutes.home },
      { name: 'Features', route: testRoutes.features },
      { name: 'Pricing', route: testRoutes.pricing },
      { name: 'About', route: testRoutes.about },
      { name: 'Blog', route: testRoutes.blog },
      { name: 'Contact', route: testRoutes.contact },
      { name: 'Support', route: testRoutes.support },
      { name: 'Changelog', route: testRoutes.changelog },
      { name: 'Roadmap', route: testRoutes.roadmap },
      { name: 'Privacy', route: testRoutes.privacy },
      { name: 'Terms', route: testRoutes.terms },
      { name: 'Login', route: testRoutes.login },
      { name: 'Signup', route: testRoutes.signup },
      { name: '404', route: '404/' },
    ];

    for (const { name, route } of pages) {
      test(`page "${name}" maintains layout integrity across breakpoints`, async ({ page }) => {
        const breakpoints = [
          viewports.xs,
          viewports.md,
          viewports.lg,
          { width: 1440, height: 900 },
        ];

        for (const size of breakpoints) {
          await test.step(`Testing ${name} at ${size.width}px`, async () => {
            await page.setViewportSize(size);
            await page.goto(route);
            await page.waitForLoadState('networkidle');

            // Page-level visibility checks
            await expect(page.locator(selectors.navigation.header)).toBeVisible();
            await expect(page.locator(selectors.footer.section)).toBeVisible();

            // Check for horizontal overflow
            // Allow small buffer for sub-pixel rendering and scrollbars
            const hasOverflow = await page.evaluate(() => {
              const root = document.documentElement;
              return root.scrollWidth > root.clientWidth + 5;
            });
            expect(hasOverflow, `${name} has page overflow at ${size.width}px`).toBe(false);
          });
        }
      });
    }
  });
});
