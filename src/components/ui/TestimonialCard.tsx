import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Card, CardContent, CardFooter, CardHeader } from './Card';
import { LazyImage } from './LazyImage';

/**
 * TestimonialCard Props Interface
 */
export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The testimonial quote text */
  quote: string;
  /** Information about the author */
  author: {
    /** Full name of the author */
    name: string;
    /** Job title/role of the author */
    role: string;
    /** Company name of the author */
    company: string;
    /** Optional URL for the author's avatar image */
    avatar?: string | undefined;
  };
  /** Optional star rating (1-5) */
  rating?: number | undefined;
  /** Optional URL for the company logo image */
  companyLogo?: string | undefined;
  /** Additional CSS classes for the card */
  className?: string | undefined;
}

/**
 * TestimonialCard Component
 *
 * A specialized card component for displaying customer testimonials and social proof.
 * Features a quote, author information (name, role, company, avatar), star rating,
 * and an optional company logo.
 *
 * @example
 * ```tsx
 * <TestimonialCard
 *   quote="This platform has transformed our workflow completely."
 *   author={{
 *     name: "Sarah Chen",
 *     role: "VP of Engineering",
 *     company: "TechCorp",
 *     avatar: "/images/avatars/sarah.jpg"
 *   }}
 *   rating={5}
 * />
 * ```
 */
export const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ quote, author, rating = 5, companyLogo, className, ...props }, ref) => {
    // Generate initials for avatar fallback
    const initials = author.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <Card
        ref={ref}
        variant="outlined"
        padding="lg"
        radius="xl"
        className={cn(
          'flex flex-col h-full bg-bg-primary transition-all duration-300 hover:shadow-lg hover:border-primary-500/30',
          className,
        )}
        {...props}
      >
        <CardHeader className="border-none pb-4 flex flex-row items-center justify-between space-y-0">
          {/* Star Rating */}
          <div className="flex gap-0.5" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={cn(
                  'fill-current',
                  i < rating ? 'text-accent-500' : 'text-text-muted opacity-30',
                )}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Optional Company Logo */}
          {companyLogo && (
            <div className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              <LazyImage
                src={companyLogo}
                alt={`${author.company} logo`}
                containerClassName="h-full w-auto"
                className="h-full w-auto object-contain"
                loading="lazy"
              />
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-grow pt-2">
          {/* Quote */}
          <blockquote className="relative">
            <span
              className="absolute -top-4 -left-2 text-6xl text-primary-500/10 font-serif leading-none select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="text-text-primary text-lg leading-relaxed relative z-10 italic">
              {quote}
            </p>
          </blockquote>
        </CardContent>

        <CardFooter className="border-none pt-8 flex items-center gap-4">
          {/* Author Avatar */}
          <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-border-default bg-bg-secondary flex items-center justify-center text-primary-600 font-bold text-sm shadow-sm">
            {author.avatar ? (
              <LazyImage
                src={author.avatar}
                alt={author.name}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
                loading="lazy"
                placeholder={<span>{initials}</span>}
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          {/* Author Info */}
          <div className="flex flex-col min-w-0">
            <span className="text-text-primary font-bold truncate">{author.name}</span>
            <span className="text-text-muted text-sm truncate">
              {author.role} at{' '}
              <span className="text-primary-600 dark:text-primary-400">{author.company}</span>
            </span>
          </div>
        </CardFooter>
      </Card>
    );
  },
);

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;
