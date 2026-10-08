import { type Page, expect, test } from '@playwright/test';
import { selectors, testRoutes, timeouts } from '../fixtures/test-data';

/**
 * Visual Regression E2E Tests
 *
 * Baseline screenshot tests for visual regression testing.
 * Creates reference screenshots for key components and layouts.
 *
 * Workflow:
 * 1. First run: Generates baseline screenshots (stored in e2e/snapshots/)
 * 2. Subsequent runs: Compares against baseline, fails if differences exceed threshold
 * 3. To update baselines: Run with --update-snapshots flag
 *
 * @group visual-regression
 * @group baseline
 */

test.describe('Visual Regression - Baseline Screenshots', () => {
  /**
   * Helper: Wait for animations to complete before taking screenshot
   */
  async function waitForAnimations(page: Page): Promise<void> {
    // Wait for initial page load and any entrance animations
    await page.waitForTimeout(timeouts.animation);

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    // Ensure layout is stable
    await page.waitForLoadState('networkidle');
  }

  /**
   * Helper: Set theme by clicking toggle or via localStorage
   */
  async function setTheme(page: Page, theme: 'light' | 'dark'): Promise<void> {
    await page.evaluate((targetTheme: string) => {
      localStorage.setItem('theme', targetTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(targetTheme);
      document.documentElement.setAttribute('data-theme', targetTheme);
    }, theme);

    // Wait for theme transition
    await page.waitForTimeout(timeouts.animation);
  }

  test.beforeEach(async ({ page }) => {
    await page.goto(testRoutes.home);
    await waitForAnimations(page);
  });

  // ============================================
  // HEADER BASELINE SCREENSHOTS
  // ============================================

  test.describe('Header Component', () => {
    test('header - light mode - desktop', async ({ page }) => {
      // Set viewport to desktop
      await page.setViewportSize({ width: 1280, height: 720 });
      await setTheme(page, 'light');
      await page.reload();
      await waitForAnimations(page);

      const header = page.locator(selectors.navigation.header).first();
      await expect(header).toBeVisible();

      // Screenshot the header element using locator screenshot
      await expect(header).toHaveScreenshot('header-light-desktop.png');
    });

    test('header - dark mode - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await setTheme(page, 'dark');
      await page.reload();
      await waitForAnimations(page);

      const header = page.locator(selectors.navigation.header).first();
      await expect(header).toBeVisible();

      await expect(header).toHaveScreenshot('header-dark-desktop.png');
    });

    test('header - light mode - tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await setTheme(page, 'light');
      await page.reload();
      await waitForAnimations(page);

      const header = page.locator(selectors.navigation.header).first();
      await expect(header).toBeVisible();

      await expect(header).toHaveScreenshot('header-light-tablet.png');
    });

    test('header - dark mode - tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await setTheme(page, 'dark');
      await page.reload();
      await waitForAnimations(page);

      const header = page.locator(selectors.navigation.header).first();
      await expect(header).toBeVisible();

      await expect(header).toHaveScreenshot('header-dark-tablet.png');
    });

    test('header - light mode - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await setTheme(page, 'light');
      await page.reload();
      await waitForAnimations(page);

      const header = page.locator(selectors.navigation.header).first();
      await expect(header).toBeVisible();

      await expect(header).toHaveScreenshot('header-light-mobile.png');
    });

    test('header - dark mode - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await setTheme(page, 'dark');
      await page.reload();
      await waitForAnimations(page);

      const header = page.locator(selectors.navigation.header).first();
      await expect(header).toBeVisible();

      await expect(header).toHaveScreenshot('header-dark-mobile.png');
    });
  });

  // ============================================
  // FOOTER BASELINE SCREENSHOTS
  // ============================================

  test.describe('Footer Component', () => {
    test('footer - light mode - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await setTheme(page, 'light');

      // Scroll to footer
      const footer = page.locator(selectors.footer.section).first();
      await footer.scrollIntoViewIfNeeded();
      await waitForAnimations(page);

      await expect(footer).toBeVisible();

      await expect(footer).toHaveScreenshot('footer-light-desktop.png');
    });

    test('footer - dark mode - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await setTheme(page, 'dark');

      const footer = page.locator(selectors.footer.section).first();
      await footer.scrollIntoViewIfNeeded();
      await waitForAnimations(page);

      await expect(footer).toBeVisible();

      await expect(footer).toHaveScreenshot('footer-dark-desktop.png');
    });

    test('footer - light mode - tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await setTheme(page, 'light');

      const footer = page.locator(selectors.footer.section).first();
      await footer.scrollIntoViewIfNeeded();
      await waitForAnimations(page);

      await expect(footer).toBeVisible();

      await expect(footer).toHaveScreenshot('footer-light-tablet.png');
    });

    test('footer - dark mode - tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await setTheme(page, 'dark');

      const footer = page.locator(selectors.footer.section).first();
      await footer.scrollIntoViewIfNeeded();
      await waitForAnimations(page);

      await expect(footer).toBeVisible();

      await expect(footer).toHaveScreenshot('footer-dark-tablet.png');
    });

    test('footer - light mode - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await setTheme(page, 'light');

      const footer = page.locator(selectors.footer.section).first();
      await footer.scrollIntoViewIfNeeded();
      await waitForAnimations(page);

      await expect(footer).toBeVisible();

      await expect(footer).toHaveScreenshot('footer-light-mobile.png');
    });

    test('footer - dark mode - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await setTheme(page, 'dark');

      const footer = page.locator(selectors.footer.section).first();
      await footer.scrollIntoViewIfNeeded();
      await waitForAnimations(page);

      await expect(footer).toBeVisible();

      await expect(footer).toHaveScreenshot('footer-dark-mobile.png');
    });
  });

  // ============================================
  // FULL PAGE BASELINE SCREENSHOTS
  // ============================================

  test.describe('Full Page Screenshots', () => {
    test('full page - light mode - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await setTheme(page, 'light');
      await page.reload();
      await waitForAnimations(page);

      // Full page screenshot
      await expect(page).toHaveScreenshot('fullpage-light-desktop.png', {
        fullPage: true,
      });
    });

    test('full page - dark mode - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await setTheme(page, 'dark');
      await page.reload();
      await waitForAnimations(page);

      await expect(page).toHaveScreenshot('fullpage-dark-desktop.png', {
        fullPage: true,
      });
    });

    test('full page - light mode - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await setTheme(page, 'light');
      await page.reload();
      await waitForAnimations(page);

      await expect(page).toHaveScreenshot('fullpage-light-mobile.png', {
        fullPage: true,
      });
    });

    test('full page - dark mode - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await setTheme(page, 'dark');
      await page.reload();
      await waitForAnimations(page);

      await expect(page).toHaveScreenshot('fullpage-dark-mobile.png', {
        fullPage: true,
      });
    });
  });

  // ============================================
  // KEY BREAKPOINT BASELINE SCREENSHOTS
  // ============================================

  test.describe('Key Breakpoints', () => {
    const breakpoints = [
      { name: 'mobile-xs', width: 320, height: 568 },
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop-sm', width: 1024, height: 768 },
      { name: 'desktop', width: 1280, height: 720 },
      { name: 'desktop-lg', width: 1920, height: 1080 },
    ];

    for (const breakpoint of breakpoints) {
      test(`breakpoint - ${breakpoint.name} - light mode`, async ({ page }) => {
        await page.setViewportSize({
          width: breakpoint.width,
          height: breakpoint.height,
        });
        await setTheme(page, 'light');
        await page.reload();
        await waitForAnimations(page);

        await expect(page).toHaveScreenshot(`breakpoint-${breakpoint.name}-light.png`, {
          fullPage: true,
        });
      });

      test(`breakpoint - ${breakpoint.name} - dark mode`, async ({ page }) => {
        await page.setViewportSize({
          width: breakpoint.width,
          height: breakpoint.height,
        });
        await setTheme(page, 'dark');
        await page.reload();
        await waitForAnimations(page);

        await expect(page).toHaveScreenshot(`breakpoint-${breakpoint.name}-dark.png`, {
          fullPage: true,
        });
      });
    }
  });

  // ============================================
  // HERO SECTION BASELINE SCREENSHOTS
  // ============================================

  test.describe('Hero Section', () => {
    test('hero section - light mode - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await setTheme(page, 'light');
      await page.reload();
      await waitForAnimations(page);

      const hero = page.locator(selectors.hero.section).first();
      await expect(hero).toBeVisible();

      await expect(hero).toHaveScreenshot('hero-light-desktop.png');
    });

    test('hero section - dark mode - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await setTheme(page, 'dark');
      await page.reload();
      await waitForAnimations(page);

      const hero = page.locator(selectors.hero.section).first();
      await expect(hero).toBeVisible();

      await expect(hero).toHaveScreenshot('hero-dark-desktop.png');
    });

    test('hero section - light mode - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await setTheme(page, 'light');
      await page.reload();
      await waitForAnimations(page);

      const hero = page.locator(selectors.hero.section).first();
      await expect(hero).toBeVisible();

      await expect(hero).toHaveScreenshot('hero-light-mobile.png');
    });

    test('hero section - dark mode - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await setTheme(page, 'dark');
      await page.reload();
      await waitForAnimations(page);

      const hero = page.locator(selectors.hero.section).first();
      await expect(hero).toBeVisible();

      await expect(hero).toHaveScreenshot('hero-dark-mobile.png');
    });
  });

  // ============================================
  // MOBILE NAVIGATION BASELINE
  // ============================================

  test.describe('Mobile Navigation', () => {
    test('mobile menu - open - light mode', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await setTheme(page, 'light');
      await page.reload();
      await waitForAnimations(page);

      // Open mobile menu
      const menuButton = page.locator(selectors.navigation.mobileMenuButton).first();
      if (await menuButton.isVisible().catch(() => false)) {
        await menuButton.click();
        await page.waitForTimeout(timeouts.animation);

        // Screenshot the open menu
        await expect(page).toHaveScreenshot('mobile-menu-open-light.png');
      } else {
        test.skip();
      }
    });

    test('mobile menu - open - dark mode', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await setTheme(page, 'dark');
      await page.reload();
      await waitForAnimations(page);

      // Open mobile menu
      const menuButton = page.locator(selectors.navigation.mobileMenuButton).first();
      if (await menuButton.isVisible().catch(() => false)) {
        await menuButton.click();
        await page.waitForTimeout(timeouts.animation);

        await expect(page).toHaveScreenshot('mobile-menu-open-dark.png');
      } else {
        test.skip();
      }
    });
  });

  // ============================================
  // DEMO MODAL BASELINE SCREENSHOTS
  // ============================================

  test.describe('Demo Modal', () => {
    test('demo modal - light mode', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await setTheme(page, 'light');
      await page.reload();
      await waitForAnimations(page);

      // Find a demo link (social link in footer typically triggers modal)
      const socialLink = page.locator(selectors.footer.socialLinks).first();
      if (await socialLink.isVisible().catch(() => false)) {
        await socialLink.click();
        await page.waitForTimeout(timeouts.animation);

        const modal = page.locator(selectors.modal.overlay).first();
        if (await modal.isVisible().catch(() => false)) {
          await expect(page).toHaveScreenshot('demo-modal-light.png');
        } else {
          test.skip();
        }
      } else {
        test.skip();
      }
    });

    test('demo modal - dark mode', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await setTheme(page, 'dark');
      await page.reload();
      await waitForAnimations(page);

      const socialLink = page.locator(selectors.footer.socialLinks).first();
      if (await socialLink.isVisible().catch(() => false)) {
        await socialLink.click();
        await page.waitForTimeout(timeouts.animation);

        const modal = page.locator(selectors.modal.overlay).first();
        if (await modal.isVisible().catch(() => false)) {
          await expect(page).toHaveScreenshot('demo-modal-dark.png');
        } else {
          test.skip();
        }
      } else {
        test.skip();
      }
    });
  });
});
