import { expect, test } from '../utils/test-helpers';
import { testRoutes } from '../fixtures/test-data';

/**
 * Reduced Motion Support E2E Tests
 *
 * Verifies that the application correctly respects the prefers-reduced-motion
 * media query by disabling or reducing animations.
 *
 * @group accessibility
 */
test.describe('Reduced Motion Support', () => {
  test.use({
    contextOptions: {
      reducedMotion: 'reduce',
    },
  });

  test('global styles disable animations when reduced motion is preferred', async ({ page }) => {
    await page.goto(testRoutes.home);
    await page.waitForLoadState('networkidle');

    // Check if the global reset for reduced motion is applied
    const bodyStyles = await page.evaluate(() => {
      const el = document.createElement('div');
      el.style.animationName = 'test-animation';
      el.style.animationDuration = '1s';
      document.body.appendChild(el);

      const style = window.getComputedStyle(el);
      const result = {
        animationDuration: style.animationDuration,
        transitionDuration: style.transitionDuration,
      };

      document.body.removeChild(el);
      return result;
    });

    // Our global reset uses 0.01ms !important
    // Most browsers will report this as 0s or 0.00001s
    expect(parseFloat(bodyStyles.animationDuration)).toBeLessThan(0.01);
    expect(parseFloat(bodyStyles.transitionDuration)).toBeLessThan(0.01);
  });

  test('hero entrance animations are skipped or fast-forwarded', async ({ page }) => {
    await page.goto(testRoutes.home);
    await page.waitForLoadState('networkidle');

    // Hero headline should be visible immediately
    const heroHeadline = page.getByTestId('hero-headline');
    await expect(heroHeadline).toBeVisible();

    const transform = await heroHeadline.evaluate((el) => window.getComputedStyle(el).transform);
    // If animations are disabled, it should be in its final state (none or identity matrix)
    const isIdentity =
      transform === 'none' ||
      transform === 'matrix(1, 0, 0, 1, 0, 0)' ||
      transform.replace(/\s/g, '').includes('1,0,0,1,0,0');
    expect(isIdentity).toBeTruthy();
  });

  test('logo cloud marquee is disabled', async ({ page }) => {
    await page.goto(testRoutes.home);

    // Find the logo cloud marquee container
    const marquee = page.locator('.animate-marquee, .animate-marquee-reverse').first();

    const count = await marquee.count();
    if (count > 0) {
      const animation = await marquee.evaluate((el) => window.getComputedStyle(el).animationName);
      expect(animation === 'none' || animation === '').toBeTruthy();
    }
  });

  test('animated counters display final value immediately', async ({ page }) => {
    await page.goto(testRoutes.about);
    await page.waitForLoadState('networkidle');

    // Find a counter in the statistics section
    const counter = page.getByTestId('animated-counter').first();
    await counter.scrollIntoViewIfNeeded();
    await expect(counter).toBeVisible();

    // The text content should be a number (not 0) almost immediately
    const textContent = await counter.textContent();
    expect(textContent).not.toBe('0');
    expect(textContent).not.toBe('0%');
  });

  test('modals open without slide/fade animations', async ({ page }) => {
    await page.goto(testRoutes.home);
    await page.waitForLoadState('networkidle');

    // Use a social link in the footer which definitely opens a demo modal
    const socialLink = page.getByTestId('social-link').first();
    await socialLink.scrollIntoViewIfNeeded();
    await expect(socialLink).toBeVisible();
    await socialLink.click();

    // Wait for modal content
    const modal = page.getByTestId('modal-content');
    await expect(modal).toBeVisible();

    // Check opacity/transform
    const styles = await modal.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        opacity: style.opacity,
        transform: style.transform,
      };
    });

    expect(styles.opacity).toBe('1');
    const isIdentity =
      styles.transform === 'none' ||
      styles.transform === 'matrix(1, 0, 0, 1, 0, 0)' ||
      styles.transform.replace(/\s/g, '').includes('1,0,0,1,0,0');
    expect(isIdentity).toBeTruthy();
  });

  test('page functionality remains intact with reduced motion', async ({ page }) => {
    await page.goto(testRoutes.pricing);
    await page.waitForLoadState('networkidle');

    // Billing toggle should still work
    const billingToggle = page
      .locator('[role="switch"], button:has-text("Annual"), button:has-text("Monthly")')
      .first();
    await expect(billingToggle).toBeVisible();
    await billingToggle.click();

    // Theme toggle should still work
    const themeToggle = page.getByTestId('theme-toggle');
    await themeToggle.click();

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark|light/);
  });
});
