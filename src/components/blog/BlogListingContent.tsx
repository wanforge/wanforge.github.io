import * as React from 'react';
import { BlogPostCard } from '../ui/BlogPostCard';
import { FeaturedPost } from '../ui/FeaturedPost';
import { CategoryFilter } from '../ui/CategoryFilter';
import { BlogSearch, filterBlogPosts } from '../ui/BlogSearch';
import { Pagination } from '../ui/Pagination';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { type BlogCategory, blogPosts, featuredBlogPost } from '@/data/blog';

const POSTS_PER_PAGE = 9;

/**
 * BlogListingContent Component
 *
 * Manages the interactive state for the blog listing page, including
 * filtering by category, search functionality, and pagination.
 */
export const BlogListingContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState<BlogCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);

  // Filter posts based on category and search query
  const filteredPosts = React.useMemo(() => {
    let result = blogPosts;

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter((post) => post.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      result = filterBlogPosts(result, searchQuery);
    }

    return result;
  }, [activeCategory, searchQuery]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Paginate results
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  // Determine if we should show the hero featured post
  // Only show if we're on the first page, no search query, and 'all' categories
  const showHeroFeatured = currentPage === 1 && !searchQuery && activeCategory === 'all';

  return (
    <div className="flex flex-col" data-testid="blog-listing">
      {/* Category and Search Controls */}
      <Section background="default" padding="sm" className="pb-0">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              className="md:w-2/3"
            />
            <BlogSearch query={searchQuery} onQueryChange={setSearchQuery} className="md:w-1/3" />
          </div>
        </Container>
      </Section>

      {/* Featured Post (Hero) */}
      {showHeroFeatured && featuredBlogPost && (
        <Section background="default" padding="sm" className="pt-0">
          <Container>
            <FeaturedPost post={featuredBlogPost} className="mb-16" />
            <div className="h-px w-full bg-border-muted mb-16" />
          </Container>
        </Section>
      )}

      {/* Blog Grid */}
      <Section background="default" padding="sm" className="pt-0 min-h-[400px] pb-24">
        <Container>
          {showHeroFeatured && (
            <h2 className="text-2xl font-bold text-text-primary mb-8">Latest Articles</h2>
          )}
          {!showHeroFeatured && !searchQuery && activeCategory === 'all' && (
            <h2 className="text-2xl font-bold text-text-primary mb-8">All Articles</h2>
          )}

          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-xl text-text-secondary">
                Found <span className="font-bold text-text-primary">{filteredPosts.length}</span>{' '}
                {filteredPosts.length === 1 ? 'article' : 'articles'} for "{searchQuery}"
              </h2>
            </div>
          )}

          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-bg-secondary/50 rounded-2xl border border-dashed border-border-muted">
              <h3 className="text-2xl font-bold text-text-primary mb-2">No posts found</h3>
              <p className="text-text-muted">
                Try adjusting your search or category filter to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-6 text-primary-600 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-20">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};

export default BlogListingContent;
