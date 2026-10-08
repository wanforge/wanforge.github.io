/**
 * Lighthouse CI Configuration
 *
 * Configured for:
 * - Static build output auditing
 * - Core Web Vitals verification
 * - Accessibility and SEO compliance
 * - GitHub Pages subdirectory support
 */

module.exports = {
  ci: {
    collect: {
      // Audit the production build directory
      staticDistDir: './dist',
      // Base path for GitHub Pages (must match astro.config.mjs)
      // Note: lhci staticDistDir handles the subdirectory mapping automatically
      // if the file structure in dist matches the URLs.
      url: ['/', '/features/', '/pricing/'],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--headless --no-sandbox --disable-gpu',
      },
    },
    assert: {
      // Performance budgets and assertions
      assertions: {
        // Core Web Vitals Targets
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        // Specific audits
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
      },
    },
    upload: {
      // Upload results to temporary storage for review in PRs
      target: 'temporary-public-storage',
    },
  },
};
