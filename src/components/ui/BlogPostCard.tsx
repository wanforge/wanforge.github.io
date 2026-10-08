import * as React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
  HoverableCard,
} from './Card';
import { Badge } from './Badge';
import { Link } from './Link';
import type { BlogPost } from '@/data/blog';
import { ROUTES } from '@/config/paths';

/**
 * BlogPostCard Props Interface
 */
export interface BlogPostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The blog post data */
  post: BlogPost;
  /** Whether this is a featured post (affects styling) */
  featured?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * BlogPostCard Component
 *
 * A specialized card component for displaying blog post previews in lists and grids.
 * Features a thumbnail image, category badge, title, excerpt, and metadata (author, date, reading time).
 *
 * @example
 * ```tsx
 * <BlogPostCard post={blogPosts[0]} />
 * ```
 */
export const BlogPostCard = React.forwardRef<HTMLDivElement, BlogPostCardProps>(
  ({ post, featured = false, className, ...props }, ref) => {
    const { title, excerpt, category, author, publishedAt, readingTime, coverImage, slug } = post;

    // Format date for display
    const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    // Generate initials for author avatar fallback
    const initials = author.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <HoverableCard
        ref={ref}
        variant="default"
        padding="none"
        radius="xl"
        data-testid="blog-post-card"
        className={cn(
          'group flex flex-col h-full bg-bg-primary overflow-hidden border border-border-default hover:border-primary-500/30 transition-all duration-300',
          featured && 'md:flex-row md:items-stretch',
          className,
        )}
        {...props}
      >
        {/* Cover Image */}
        <div className={cn('relative overflow-hidden', featured ? 'md:w-2/5' : 'aspect-video')}>
          <CardImage
            src={coverImage}
            alt={title}
            aspectRatio={featured ? 'auto' : 'video'}
            className="w-full h-full"
          />
          {/* Category Badge - Overlay on image */}
          <div className="absolute top-4 left-4 z-10">
            <Badge
              variant="info"
              className="bg-bg-primary/90 backdrop-blur-sm border-none shadow-sm"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className={cn('flex flex-col flex-grow p-5 md:p-6', featured && 'md:w-3/5')}>
          <CardHeader className="p-0 border-none space-y-2 pb-3">
            <div className="flex items-center gap-3 text-xs text-text-muted mb-1">
              <span className="flex items-center gap-1">
                <Calendar size={12} aria-hidden="true" />
                <time dateTime={publishedAt}>{formattedDate}</time>
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} aria-hidden="true" />
                <span>{readingTime} min read</span>
              </span>
            </div>
            <Link href={ROUTES.BLOG_POST(slug)} className="group/title">
              <CardTitle className="text-xl md:text-2xl font-bold group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400 transition-colors line-clamp-2">
                {title}
              </CardTitle>
            </Link>
          </CardHeader>

          <CardContent className="p-0 pt-1 flex-grow">
            <CardDescription className="text-text-secondary line-clamp-3 leading-relaxed">
              {excerpt}
            </CardDescription>
          </CardContent>

          <CardFooter className="p-0 pt-6 mt-6 border-t border-border-default flex items-center justify-between">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-bg-secondary border border-border-default flex items-center justify-center text-[10px] font-bold text-primary-600 dark:text-primary-400 shrink-0">
                {author.avatar ? (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-text-primary truncate">
                  {author.name}
                </span>
              </div>
            </div>

            {/* Read More Link */}
            <Link
              href={ROUTES.BLOG_POST(slug)}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors inline-flex items-center gap-1"
            >
              Read More
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </CardFooter>
        </div>
      </HoverableCard>
    );
  },
);

BlogPostCard.displayName = 'BlogPostCard';

export default BlogPostCard;
