import * as React from 'react';
import { cn } from '@/utils/cn';
import { Card, type CardPadding, type CardRadius, type CardVariant } from './Card';
import { Link } from './Link';
import { ArrowRight } from 'lucide-react';

/**
 * FeatureCard Props Interface
 */
export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon element to display */
  icon: React.ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional link href for CTA */
  href?: string;
  /** Optional link text (defaults to 'Learn more') */
  linkText?: string;
  /** Visual style variant of the underlying card */
  variant?: CardVariant;
  /** Padding size of the card */
  padding?: CardPadding;
  /** Border radius of the card */
  radius?: CardRadius;
  /** Enable hover lift animation */
  hover?: boolean;
  /** Custom background for the icon container */
  iconClassName?: string;
  /** Additional CSS classes for the card */
  className?: string;
}

/**
 * FeatureCard Component
 *
 * A specialized card component for presenting product features with an icon,
 * title, description, and optional call-to-action link.
 *
 * @example
 * ```tsx
 * <FeatureCard
 *   icon={<Zap className="w-6 h-6" />}
 *   title="Lightning Fast"
 *   description="Our platform is optimized for maximum speed and performance."
 *   href="/features/speed"
 *   hover
 * />
 * ```
 */
export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      icon,
      title,
      description,
      href,
      linkText = 'Learn more',
      variant = 'default',
      padding = 'lg',
      radius = 'lg',
      hover = true,
      iconClassName = '',
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <Card
        ref={ref}
        variant={variant}
        padding={padding}
        radius={radius}
        hover={hover}
        className={cn('flex flex-col h-full group', className)}
        {...props}
      >
        {/* Icon Container */}
        <div
          className={cn(
            'flex items-center justify-center w-12 h-12 mb-6 rounded-xl transition-colors duration-300',
            'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
            'group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50',
            iconClassName,
          )}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <h3 className="mb-2 text-xl font-bold text-text-primary tracking-tight">{title}</h3>
          <p className="text-text-secondary leading-relaxed mb-6">{description}</p>
        </div>

        {/* Optional Link */}
        {href && (
          <div className="mt-auto">
            <Link
              href={href}
              variant="subtle"
              className="group/link inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold p-0 hover:no-underline"
            >
              {linkText}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </div>
        )}
      </Card>
    );
  },
);

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
