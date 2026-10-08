import * as React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './Input';
import { cn } from '../../utils/cn';
import type { BlogPost } from '../../data/blog';

/**
 * BlogSearch Props Interface
 */
export interface BlogSearchProps {
  /** Current search query */
  query: string;
  /** Callback when query changes */
  onQueryChange: (query: string) => void;
  /** Optional placeholder text */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether the search should take up full width */
  fullWidth?: boolean;
}

/**
 * BlogSearch Component
 *
 * A search input component for filtering blog posts.
 * features:
 * - Controlled input
 * - Clear button
 * - Search icon
 * - Theme-aware styling
 */
export const BlogSearch: React.FC<BlogSearchProps> = ({
  query,
  onQueryChange,
  placeholder = 'Search posts...',
  className,
  fullWidth = true,
}) => {
  const handleClear = React.useCallback(() => {
    onQueryChange('');
  }, [onQueryChange]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onQueryChange(e.target.value);
    },
    [onQueryChange],
  );

  return (
    <div
      className={cn('relative', fullWidth ? 'w-full' : 'w-auto', className)}
      data-testid="blog-search"
    >
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        fullWidth={fullWidth}
        leftIcon={<Search className="w-4 h-4" aria-hidden="true" />}
        rightIcon={
          query ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-md hover:bg-bg-secondary text-text-muted hover:text-text-primary transition-colors duration-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : undefined
        }
        aria-label="Search blog posts"
      />
    </div>
  );
};

/**
 * Client-side post filtering logic
 *
 * @param posts Array of blog posts to filter
 * @param query Search query string
 * @returns Filtered array of blog posts
 */
export const filterBlogPosts = (posts: BlogPost[], query: string): BlogPost[] => {
  if (!query.trim()) return posts;

  const normalizedQuery = query.toLowerCase().trim();

  return posts.filter((post) => {
    const inTitle = post.title.toLowerCase().includes(normalizedQuery);
    const inExcerpt = post.excerpt.toLowerCase().includes(normalizedQuery);
    const inTags = post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
    const inAuthor = post.author.name.toLowerCase().includes(normalizedQuery);
    const inCategory = post.category.toLowerCase().includes(normalizedQuery);

    return inTitle || inExcerpt || inTags || inAuthor || inCategory;
  });
};

export default BlogSearch;
