import * as React from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
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
import { LazyImage } from './LazyImage';
import type { BlogPost } from '@/data/blog';
import { ROUTES } from '@/config/paths';

/**
 * FeaturedPost Props Interface
 */
export interface FeaturedPostProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The blog post data */
  post: BlogPost;
  /** Additional CSS classes */
  className?: string;
}

/**
 * FeaturedPost Component
 *
 * A prominent card component for displaying the featured blog post at the top of the blog page.
 * Features a large thumbnail, category badge, prominent title, excerpt, and metadata.
 *
 * @example
 * ```tsx
 * <FeaturedPost post={featuredBlogPost} />
 * ```
 */
export const FeaturedPost = React.forwardRef<HTMLDivElement, FeaturedPostProps>(
  ({ post, className, ...props }, ref) => {
    const { title, excerpt, category, author, publishedAt, readingTime, coverImage, slug } = post;

    // Format date for display
    const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
        data-testid="featured-post"
        className={cn(
          'group flex flex-col md:flex-row bg-bg-primary overflow-hidden border border-border-default hover:border-primary-500/30 transition-all duration-300 min-h-[400px]',
          className,
        )}
        {...props}
      >
        {/* Large Thumbnail Display */}
        <div className="relative w-full md:w-1/2 lg:w-3/5 overflow-hidden">
          <CardImage
            src={coverImage}
            alt={title}
            aspectRatio="auto"
            className="w-full h-full min-h-[300px] object-cover"
            loading="eager"
          />
          {/* Featured Badge */}
          <div className="absolute top-6 left-6 z-10">
            <Badge
              variant="info"
              className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary-600 text-white border-none shadow-lg"
            >
              Featured Post
            </Badge>
          </div>
          {/* Category Badge */}
          <div className="absolute bottom-6 left-6 z-10">
            <Badge
              variant="default"
              className="bg-bg-primary/90 backdrop-blur-sm border-none shadow-sm text-primary-700 font-semibold"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Prominent Content Area */}
        <div className="flex flex-col flex-grow p-8 md:p-10 lg:p-12 md:w-1/2 lg:w-2/5 justify-center">
          <CardHeader className="p-0 border-none space-y-4 pb-6">
            <div className="flex items-center gap-4 text-sm text-text-muted mb-2">
              <span className="flex items-center gap-1.5">
                <Calendar size={16} aria-hidden="true" className="text-primary-500" />
                <time dateTime={publishedAt}>{formattedDate}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} aria-hidden="true" className="text-primary-500" />
                <span>{readingTime} min read</span>
              </span>
            </div>
            <Link href={ROUTES.BLOG_POST(slug)} className="group/title">
              <CardTitle
                as="h2"
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400 transition-colors leading-tight"
              >
                {title}
              </CardTitle>
            </Link>
          </CardHeader>

          <CardContent className="p-0 pt-2 flex-grow">
            <CardDescription className="text-lg text-text-secondary leading-relaxed line-clamp-4">
              {excerpt}
            </CardDescription>
          </CardContent>

          <CardFooter className="p-0 pt-8 mt-8 border-t border-border-default flex items-center justify-between">
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-bg-secondary border border-border-default flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400 shrink-0">
                {author.avatar ? (
                  <LazyImage
                    src={author.avatar}
                    alt={author.name}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                    loading="eager"
                    placeholder={<span>{initials}</span>}
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base font-bold text-text-primary truncate">
                  {author.name}
                </span>
                <span className="text-sm text-text-muted truncate">{author.role}</span>
              </div>
            </div>

            {/* Read More Link */}
            <Link
              href={ROUTES.BLOG_POST(slug)}
              className="hidden sm:inline-flex items-center gap-2 text-base font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              Read Article
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </CardFooter>
        </div>
      </HoverableCard>
    );
  },
);

FeaturedPost.displayName = 'FeaturedPost';

export default FeaturedPost;
