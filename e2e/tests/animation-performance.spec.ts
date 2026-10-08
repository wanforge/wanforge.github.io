/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, test } from '../utils/test-helpers';
import { selectors, testRoutes } from '../fixtures/test-data';

/**
 * Animation Performance E2E Tests

 *
 * Verifies that animations are performant, use GPU acceleration,
 * and do not cause significant layout shifts.
 *
 * @group performance
 */
test.describe('Animation Performance', () => {
  test.beforeEach(async ({ page, browserName }) => {
    // Reset CPU throttling for each test (Chromium only)
    if (browserName === 'chromium') {
      const client = await page.context().newCDPSession(page);
      await client.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    }
  });

  test('hero entrance achieves high frame rate', async ({ page, isMobile, browserName }) => {
    // FPS measurement can be unreliable on emulated mobile and non-chromium browsers in CI
    if (isMobile || browserName !== 'chromium') {
      test.skip(true, 'FPS measurement is unreliable in this environment');
    }

    // Start FPS measurement using an init script that runs before the page loads
    await page.addInitScript(() => {
      (window as any).fpsCount = 0;
      (window as any).fpsStart = performance.now();

      const countFrame = () => {
        (window as any).fpsCount++;
        requestAnimationFrame(countFrame);
      };
      requestAnimationFrame(countFrame);
    });

    await page.goto(testRoutes.home);
    await page.waitForLoadState('networkidle');

    // Wait for entrance animations to finish (approx 1s)
    await page.waitForTimeout(1500);

    const fps = await page.evaluate(() => {
      const elapsed = performance.now() - (window as any).fpsStart;
      return ((window as any).fpsCount / elapsed) * 1000;
    });

    console.log(`Measured Hero Entrance FPS: ${fps.toFixed(2)}`);

    // On CI/Virtual environments, 60fps is ideal but 30fps is the minimum acceptable for smoothness
    expect(fps).toBeGreaterThanOrEqual(30);
  });

  test('animated elements use GPU acceleration', async ({ page }) => {
    await page.goto(testRoutes.home);
    await page.waitForLoadState('networkidle');

    const heroHeadline = page.locator(selectors.hero.headline);
    await expect(heroHeadline).toBeVisible();

    // Check computed styles for GPU-friendly properties or will-change hints
    const gpuMetrics = await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;

      const style = window.getComputedStyle(el);
      return {
        transform: style.transform,
        willChange: style.willChange,
        transitionProperty: style.transitionProperty,
        opacity: style.opacity,
      };
    }, selectors.hero.headline);

    // Verify it has GPU hints
    const hasGpuHints =
      gpuMetrics?.willChange.includes('transform') ||
      gpuMetrics?.willChange.includes('opacity') ||
      (gpuMetrics?.transform && gpuMetrics.transform !== 'none');

    expect(hasGpuHints).toBeTruthy();
  });

  test('animations minimize layout thrashing (CLS)', async ({ page }) => {
    await page.goto(testRoutes.home);

    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let cumulativeLayoutShift = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              cumulativeLayoutShift += (entry as any).value;
            }
          }
        });
        observer.observe({ type: 'layout-shift', buffered: true });

        setTimeout(() => {
          observer.disconnect();
          resolve(cumulativeLayoutShift);
        }, 2000);
      });
    });

    console.log(`Measured Cumulative Layout Shift: ${cls.toFixed(4)}`);
    expect(cls).toBeLessThan(0.1);
  });

  test('performance on simulated lower-end device', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'CDP session is only available in Chromium');
    const client = await page.context().newCDPSession(page);
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    await page.addInitScript(() => {
      (window as any).fpsCount = 0;
      (window as any).fpsStart = performance.now();

      const countFrame = () => {
        (window as any).fpsCount++;
        requestAnimationFrame(countFrame);
      };
      requestAnimationFrame(countFrame);
    });

    await page.goto(testRoutes.home);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    const fps = await page.evaluate(() => {
      const elapsed = performance.now() - (window as any).fpsStart;
      return ((window as any).fpsCount / elapsed) * 1000;
    });

    console.log(`Throttled (4x) Hero Entrance FPS: ${fps.toFixed(2)}`);
    // Lowered threshold for CI/Virtual environments with CPU throttling
    expect(fps).toBeGreaterThanOrEqual(15);

    await client.send('Emulation.setCPUThrottlingRate', { rate: 1 });
  });

  test('scrolling remains smooth during reveals', async ({ page, isMobile, browserName }) => {
    if (isMobile || browserName !== 'chromium') {
      test.skip(true, 'Scroll performance measurement is unreliable in this environment');
    }

    await page.goto(testRoutes.home);
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => {
      (window as any).fpsCount = 0;
      (window as any).fpsStart = performance.now();

      const countFrame = () => {
        (window as any).fpsCount++;
        if ((window as any).scrolling) {
          requestAnimationFrame(countFrame);
        }
      };
      (window as any).scrolling = true;
      requestAnimationFrame(countFrame);
    });

    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(150);
    }

    await page.evaluate(() => {
      (window as any).scrolling = false;
    });

    const fps = await page.evaluate(() => {
      const elapsed = performance.now() - (window as any).fpsStart;
      return ((window as any).fpsCount / elapsed) * 1000;
    });

    console.log(`Scroll Performance FPS: ${fps.toFixed(2)}`);
    // Lowered threshold for CI stability
    expect(fps).toBeGreaterThanOrEqual(25);
  });
});
