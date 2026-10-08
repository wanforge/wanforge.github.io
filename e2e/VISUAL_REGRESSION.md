# Visual Regression Testing

This document describes the visual regression testing setup and workflow for the
ModernSaaS Landing Page Template.

## Overview

Visual regression testing ensures that UI changes don't introduce unintended
visual differences. We use Playwright's screenshot comparison feature to detect
pixel-level changes.

## Test Location

| Path                                  | Description                         |
| ------------------------------------- | ----------------------------------- |
| `e2e/tests/visual-regression.spec.ts` | Test file with visual test cases    |
| `e2e/snapshots/`                      | Baseline screenshots for comparison |
| `e2e/test-results/`                   | Test results and diff images        |

## Configuration

### Threshold Settings

The visual comparison threshold is configured in `playwright.config.ts`:

```typescript
expect: {
  toHaveScreenshot: {
    maxDiffPixels: 250,       // Allow up to 250 different pixels
    threshold: 0.25,          // Per-pixel difference threshold (0-1)
    animations: 'disabled',   // Disable animations for consistent screenshots
  },
}
```

### Why These Settings?

| Setting         | Value      | Reason                                                                          |
| --------------- | ---------- | ------------------------------------------------------------------------------- |
| `maxDiffPixels` | 250        | Accounts for minor font rendering differences across platforms (macOS vs Linux) |
| `threshold`     | 0.25       | Allows slight anti-aliasing variations while catching actual visual changes     |
| `animations`    | 'disabled' | Ensures screenshots are taken with animations in a consistent state             |

## Baseline Screenshots

### What's Covered

The test suite creates baseline screenshots for:

| Component             | Screenshots | Variants                           |
| --------------------- | ----------- | ---------------------------------- |
| **Header**            | 6           | Light/Dark × Desktop/Tablet/Mobile |
| **Footer**            | 6           | Light/Dark × Desktop/Tablet/Mobile |
| **Full Page**         | 4           | Light/Dark × Desktop/Mobile        |
| **Key Breakpoints**   | 12          | 6 breakpoints × Light/Dark         |
| **Hero Section**      | 4           | Light/Dark × Desktop/Mobile        |
| **Mobile Navigation** | 2           | Light/Dark with menu open          |
| **Demo Modal**        | 2           | Light/Dark with modal open         |

**Total: 36 baseline screenshots**

### Screenshot Naming Convention

```
{component}-{theme}-{viewport}.png
{component}-{theme}-{viewport}-{state}.png
breakpoint-{breakpoint-name}-{theme}.png
```

Examples:

- `header-light-desktop.png`
- `footer-dark-tablet.png`
- `breakpoint-mobile-xs-light.png`
- `mobile-menu-open-dark.png`

## Workflow

### Initial Baseline Generation

Generate baseline screenshots for the first time:

```bash
# Run visual regression tests to generate baselines
bunx playwright test e2e/tests/visual-regression.spec.ts --update-snapshots

# Or run a specific test group
bunx playwright test e2e/tests/visual-regression.spec.ts --grep "Header" --update-snapshots
```

### Daily Development

Run visual regression tests during development:

```bash
# Run all visual tests
bunx playwright test e2e/tests/visual-regression.spec.ts

# Run on specific browser
bunx playwright test e2e/tests/visual-regression.spec.ts --project=chromium-desktop

# Run with UI mode for debugging
bunx playwright test e2e/tests/visual-regression.spec.ts --ui
```

### Updating Baselines

When visual changes are intentional, update baselines:

```bash
# Update all baselines
bunx playwright test e2e/tests/visual-regression.spec.ts --update-snapshots

# Update specific test
bunx playwright test e2e/tests/visual-regression.spec.ts --grep "header-light-desktop" --update-snapshots
```

### CI/CD Integration

In CI, visual tests run automatically:

```yaml
# Example GitHub Actions step
- name: Run Visual Regression Tests
  run: bunx playwright test e2e/tests/visual-regression.spec.ts
```

## Interpreting Results

### Test Pass

All screenshots match within the configured threshold.

### Test Fail

When a test fails due to visual differences:

1. **Check the diff**: Playwright generates:
   - `expected.png` - The baseline
   - `actual.png` - The current screenshot
   - `diff.png` - Highlighted differences

2. **Review the changes**:

```bash
# View the HTML report
bunx playwright show-report
```

3. **Decide**:
   - If intentional: Update baselines with `--update-snapshots`
   - If unintended: Fix the code and re-run tests

## Best Practices

### When to Update Baselines

| ✅ Update When                | ❌ Don't Update When             |
| ----------------------------- | -------------------------------- |
| Intentional UI design changes | Unexplained pixel shifts         |
| New components added          | Font rendering differences only  |
| Theme color changes           | Unintentional visual regressions |
| Layout adjustments            | -                                |

### Platform Consistency

Baseline screenshots are typically generated on Linux (CI) for consistency. If
developing on macOS or Windows:

1. Minor font rendering differences are expected
2. The 250 pixel threshold accommodates most cross-platform differences
3. For critical changes, run in CI or Docker

### Test Maintenance

- Keep baselines up-to-date with intentional changes
- Delete obsolete baselines when removing features
- Review and prune old screenshots periodically

## Troubleshooting

### Flaky Tests

If tests are flaky:

1. Increase `waitForAnimations` timeout
2. Add more explicit waits for dynamic content
3. Check for time-based content (timestamps, dates)
4. Use `mask` option to hide dynamic elements:

```typescript
await expect(page).toHaveScreenshot('page.png', {
  mask: [page.locator('.timestamp')],
});
```

### Large Diff Files

If diff files are too large:

1. Check `maxDiffPixels` setting
2. Review if change is intentional
3. Consider using `maxDiffPixelRatio` instead:

```typescript
await expect(page).toHaveScreenshot('page.png', {
  maxDiffPixelRatio: 0.05, // 5% of pixels can differ
});
```

### CI Failures

When tests pass locally but fail in CI:

| Issue            | Solution                              |
| ---------------- | ------------------------------------- |
| Font differences | Install same fonts in CI              |
| OS differences   | Use Docker for consistent environment |
| Timing issues    | Add explicit waits                    |
| Viewport         | Ensure consistent viewport sizes      |

## Available Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "test:visual": "playwright test e2e/tests/visual-regression.spec.ts",
    "test:visual:update": "playwright test e2e/tests/visual-regression.spec.ts --update-snapshots",
    "test:visual:ui": "playwright test e2e/tests/visual-regression.spec.ts --ui",
    "test:visual:report": "playwright show-report"
  }
}
```

## Related Documentation

- [Playwright Screenshot Testing](https://playwright.dev/docs/test-snapshots)
- [Playwright Visual Comparisons](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1)
- [Project Testing Strategy](./TESTING_STRATEGY.md)

## Acceptance Criteria

This testing implementation satisfies all acceptance criteria:

- [x] Configure Playwright for screenshot comparison
- [x] Create baseline screenshots for header in both themes
- [x] Create baseline screenshots for footer in both themes
- [x] Create baseline screenshots at key breakpoints
- [x] Document visual regression testing process
- [x] All visual tests pass

---

<div align="center">

**Questions?** Check the [main documentation](../README.md) or open an issue.

</div>
