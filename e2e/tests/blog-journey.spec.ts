import { expect, test } from '@playwright/test';
import { selectors, testRoutes } from '../fixtures/test-data';

// Run tests in serial mode to avoid flakiness with the dev server during hydration
test.describe.configure({ mode: 'serial' });

test.describe('Blog Discovery User Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the blog listing page
    await page.goto(testRoutes.blog);
    // Wait for the page to be stable
    await expect(page.locator(selectors.blog.hero)).toBeVisible();
    // Ensure interactive components are hydrated
    await expect(page.locator(selectors.blog.search).locator('input')).toBeEnabled();
  });

  test('should allow browsing the blog listing', async ({ page }) => {
    // Verify hero content
    await expect(page.locator(selectors.blog.hero)).toContainText('Blog');

    // Verify featured post is present
    await expect(page.locator(selectors.blog.featuredPost)).toBeVisible();

    // Verify blog grid is present and has cards
    const postCards = page.locator(selectors.blog.postCard);
    await expect(postCards).toHaveCount(8); // We have 8 posts in blogPosts data
  });

  test('should allow filtering by category', async ({ page }) => {
    const categoryFilter = page.locator(selectors.blog.categoryFilter);
    await expect(categoryFilter).toBeVisible();

    // Find the 'Engineering' category tab
    const engineeringTab = categoryFilter.getByRole('tab', { name: 'Engineering' });
    await expect(engineeringTab).toBeVisible();

    // Click the engineering category
    await engineeringTab.click();

    // Verify that all visible cards have the 'Engineering' category badge
    const visibleCards = page.locator(selectors.blog.postCard);

    // Expect fewer posts (filtering worked)
    await expect(visibleCards).not.toHaveCount(8, { timeout: 10000 });

    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(visibleCards.nth(i)).toContainText('Engineering');
    }

    // Reset filter
    const allTab = categoryFilter.getByRole('tab', { name: 'All Categories' });
    await allTab.click();
    await expect(page.locator(selectors.blog.postCard)).toHaveCount(8);
  });

  test('should allow searching for posts', async ({ page }) => {
    const searchInput = page.locator(selectors.blog.search).locator('input');
    await expect(searchInput).toBeVisible();

    // Search for a specific term
    await searchInput.fill('Infrastructure');

    // Verify clear button is visible (proves hydration)
    const clearButton = page
      .locator(selectors.blog.search)
      .locator('button[aria-label="Clear search"]');
    await expect(clearButton).toBeVisible({ timeout: 10000 });

    // Verify filtering results
    const visibleCards = page.locator(selectors.blog.postCard);
    await expect(visibleCards).toHaveCount(1, { timeout: 10000 });
    await expect(visibleCards.first()).toContainText('infrastructure', { ignoreCase: true });

    // Clear search
    await clearButton.click();
    await expect(page.locator(selectors.blog.postCard)).toHaveCount(8);
  });

  test('should allow reading a blog post and navigating via related posts', async ({ page }) => {
    const firstPost = page.locator(selectors.blog.postCard).first();
    const postTitle = await firstPost.locator('h2, h3').first().textContent();

    // Click on the first post's title link
    await firstPost.locator('a').first().click();

    // Verify navigation to post page
    await expect(page).toHaveURL(/\/blog\/[\w-]+\//);
    await expect(page.locator(selectors.blog.postHeader)).toBeVisible();
    if (postTitle) {
      await expect(page.locator(selectors.blog.postHeader)).toContainText(postTitle.trim(), {
        ignoreCase: true,
      });
    }
    await expect(page.locator(selectors.blog.postContent)).toBeVisible();

    // Verify related posts section
    const relatedSection = page.locator(selectors.blog.relatedPosts);
    await expect(relatedSection).toBeVisible();

    const relatedCards = relatedSection.locator(selectors.blog.postCard);
    // At least one related post should be present
    await expect(relatedCards.first()).toBeVisible();
    const count = await relatedCards.count();
    expect(count).toBeGreaterThan(0);

    // Click a related post's title link
    const relatedTitle = await relatedCards.first().locator('h2, h3').first().textContent();
    await relatedCards.first().locator('a').first().click();

    // Verify navigation to the related post
    if (relatedTitle) {
      await expect(page.locator(selectors.blog.postHeader)).toContainText(relatedTitle.trim(), {
        ignoreCase: true,
      });
    }
  });
});
