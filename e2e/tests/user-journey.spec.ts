import { expect, test } from '../utils/test-helpers';
import { selectors, testRoutes } from '../fixtures/test-data';

/**
 * User Journey E2E Tests
 *
 * Verifies critical conversion paths:
 * 1. Homepage -> Features -> Pricing -> Signup
 * 2. Homepage -> Pricing -> Signup
 *
 * @group e2e
 * @group journey
 */
test.describe('User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    // Start from homepage
    await page.goto(testRoutes.home);
    await page.waitForLoadState('networkidle');
  });

  test('Primary Journey: Homepage -> Features -> Pricing -> Signup', async ({ page }) => {
    // 1. Homepage to Features
    const featuresNavLink = page
      .locator(selectors.navigation.navLinks)
      .filter({ hasText: /Features/i })
      .first();
    await expect(featuresNavLink).toBeVisible();
    await featuresNavLink.click();

    await expect(page).toHaveURL(new RegExp(testRoutes.features));
    // Use more specific selector to avoid Dev Toolbar interference
    await expect(page.locator('main h1').first()).toContainText(/Everything you need/i);

    // 2. Features to Pricing
    const pricingNavLink = page
      .locator(selectors.navigation.navLinks)
      .filter({ hasText: /Pricing/i })
      .first();
    await expect(pricingNavLink).toBeVisible();
    await pricingNavLink.click();

    await expect(page).toHaveURL(new RegExp(testRoutes.pricing));
    await expect(page.locator('main h1').first()).toContainText(/Simple, transparent pricing/i);

    // 3. Pricing to Signup
    const starterTier = page.locator(selectors.pricing.tiers).first();
    const starterCta = starterTier
      .locator('a, button')
      .filter({ hasText: /Get Started|Start Free Trial/i });

    await expect(starterCta).toBeVisible();
    await starterCta.click();

    await expect(page).toHaveURL(new RegExp(testRoutes.signup));
    // Signup page uses H2 for the main form title in the mockup
    await expect(page.locator('main h2').first()).toContainText(/Create an account/i);
  });

  test('Secondary Journey: Homepage Hero CTA -> Signup', async ({ page }) => {
    // Click the main primary CTA in the hero
    const heroPrimaryCta = page.locator(selectors.hero.primaryCta);
    await expect(heroPrimaryCta).toBeVisible();
    await heroPrimaryCta.click();

    await expect(page).toHaveURL(new RegExp(testRoutes.signup));
    await expect(page.locator('main h2').first()).toContainText(/Create an account/i);
  });

  test('Navigation CTA Journey: Header CTA -> Signup', async ({ page }) => {
    // Click the "Get Started" button in the header
    const header = page.locator(selectors.navigation.header);
    const headerCta = header
      .locator('a, button')
      .filter({ hasText: /Get Started/i })
      .first();

    await expect(headerCta).toBeVisible();
    await headerCta.click();

    await expect(page).toHaveURL(new RegExp(testRoutes.signup));
    await expect(page.locator('main h2').first()).toContainText(/Create an account/i);
  });

  test('Verify all main navigation links', async ({ page }) => {
    const mainLinks = ['Features', 'Pricing', 'About', 'Blog', 'Contact'];

    for (const linkText of mainLinks) {
      const link = page
        .locator(selectors.navigation.navLinks)
        .filter({ hasText: linkText })
        .first();
      await expect(link).toBeVisible();

      // Navigate to the page
      await link.click();

      // Verify URL (roughly)
      const expectedPath = linkText.toLowerCase();
      await expect(page).toHaveURL(new RegExp(expectedPath));

      // Go back to home for next iteration
      await page.goto(testRoutes.home);
      await page.waitForLoadState('networkidle');
    }
  });
});
