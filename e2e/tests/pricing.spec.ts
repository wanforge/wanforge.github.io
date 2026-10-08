import { expect, test, viewports } from '../utils/test-helpers';
import { testRoutes } from '../fixtures/test-data';

/**
 * Pricing Page E2E Tests
 *
 * Comprehensive tests for the Pricing page covering:
 * - Section visibility
 * - Billing toggle functionality
 * - Pricing tiers display
 * - Comparison table visibility
 * - FAQ accordion interaction
 * - Theme switching consistency
 * - Responsive behavior
 *
 * @group pricing
 */
test.describe('Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testRoutes.pricing);
    await page.waitForLoadState('networkidle');
  });

  test.describe('Section Visibility', () => {
    test('displays hero section with correct title', async ({ page }) => {
      const headline = page.locator('main h1').first();
      await expect(headline).toBeVisible();
      await expect(headline).toContainText(/Simple, transparent/i);
    });

    test('displays pricing tiers grid', async ({ page }) => {
      const tiersSection = page.locator('section#pricing-tiers');
      await expect(tiersSection).toBeVisible();

      const pricingCards = tiersSection.locator('[data-testid="pricing-card"]');
      await expect(pricingCards).toHaveCount(3);
    });

    test('displays money-back guarantee callout', async ({ page }) => {
      const guarantee = page.locator('text=30-Day Money-Back Guarantee');
      await expect(guarantee).toBeVisible();
    });

    test('displays comparison table', async ({ page }) => {
      const comparisonTable = page.locator('section#pricing-comparison table');
      await expect(comparisonTable).toBeVisible();
    });

    test('displays FAQ section', async ({ page }) => {
      const faqSection = page.locator('section:has-text("Frequently Asked Questions")');
      await expect(faqSection).toBeVisible();
    });

    test('displays enterprise contact section', async ({ page }) => {
      const enterpriseSection = page.locator('section:has-text("Need something more?")');
      await expect(enterpriseSection).toBeVisible();
    });
  });

  test.describe('Billing Toggle Functionality', () => {
    test('toggles between monthly and annual pricing', async ({ page }) => {
      const starterCard = page.locator('[data-testid="pricing-card"]:has-text("Starter")');

      // Annual is default - price is $15
      await expect(starterCard.locator('text=$15')).toBeVisible();

      // Click Monthly
      await page.click('button:text("Monthly")');
      await expect(starterCard.locator('text=$19')).toBeVisible();

      // Click Annual back
      await page.click('button:text("Annual")');
      await expect(starterCard.locator('text=$15')).toBeVisible();
    });
  });

  test.describe('FAQ Interaction', () => {
    test('expands FAQ item on click', async ({ page }) => {
      const faqSection = page.locator('section:has-text("Frequently Asked Questions")');
      const firstFaqTrigger = faqSection.locator('button[data-state]').first();

      await expect(firstFaqTrigger).toHaveAttribute('aria-expanded', 'false');

      await firstFaqTrigger.click();
      await expect(firstFaqTrigger).toHaveAttribute('aria-expanded', 'true');

      // Check that some content is now visible (it's in a motion.div)
      const answer = faqSection.locator('div[data-state="open"]');
      await expect(answer).toBeVisible();
    });
  });

  test.describe('Responsive Behavior', () => {
    test('displays correctly on mobile', async ({ page }) => {
      await page.setViewportSize(viewports.sm);
      await page.reload();
      await page.waitForLoadState('networkidle');

      const headline = page.locator('main h1').first();
      await expect(headline).toBeVisible();

      // Tiers should stack (checked by visibility of all cards)
      const pricingCards = page.locator('section#pricing-tiers [data-testid="pricing-card"]');
      await expect(pricingCards).toHaveCount(3);
      for (let i = 0; i < 3; i++) {
        await expect(pricingCards.nth(i)).toBeVisible();
      }
    });

    test('comparison table is scrollable on mobile', async ({ page }) => {
      await page.setViewportSize(viewports.sm);

      const tableContainer = page.locator('section#pricing-comparison .overflow-x-auto');
      await expect(tableContainer).toBeVisible();

      const className = await tableContainer.getAttribute('class');
      expect(className).toContain('overflow-x-auto');
    });
  });

  test.describe('SEO and Meta', () => {
    test('has proper page title', async ({ page }) => {
      await expect(page).toHaveTitle(/Simple, Transparent Pricing | ModernSaaS/i);
    });

    test('has meta description', async ({ page }) => {
      const metaDescription = page.locator('meta[name="description"]');
      const content = await metaDescription.getAttribute('content');
      expect(content).toContain("Choose the plan that's right for you");
    });
  });
});
