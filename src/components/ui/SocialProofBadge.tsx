import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Star } from 'lucide-react';
import { cn } from '@/utils/cn';
import { PRESETS } from '@/config/animation';
import { LazyImage } from './LazyImage';

/**
 * Props for the SocialProofBadge component
 */
export interface SocialProofBadgeProps {
  /**
   * The style variant of the badge
   * @default 'rated'
   */
  variant?: 'rated' | 'trusted';
  /**
   * The rating value (out of 5)
   */
  rating?: number;
  /**
   * The count of users or companies
   */
  count?: string | number;
  /**
   * Array of avatar image URLs for the 'rated' variant
   */
  avatars?: string[];
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to animate the entrance
   * @default true
   */
  animate?: boolean;
  /**
   * Animation variants for framer-motion stagger
   */
  variants?: Variants;
}

/**
 * SocialProofBadge Component
 *
 * A compact badge used to display social proof indicators like ratings or trust signals.
 * Designed for use in Hero sections and other high-visibility areas.
 */
export const SocialProofBadge: React.FC<SocialProofBadgeProps> = ({
  variant = 'rated',
  rating = 4.9,
  count,
  avatars = [],
  className,
  animate = true,
  variants,
}) => {
  const content = (
    <>
      {variant === 'rated' ? (
        <>
          {/* Avatar Stack */}
          {avatars.length > 0 && (
            <div className="flex -space-x-2 mr-1 shrink-0">
              {avatars.slice(0, 3).map((avatar, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-bg-secondary bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center overflow-hidden"
                >
                  {avatar ? (
                    <LazyImage
                      src={avatar}
                      alt="User profile"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                      loading="eager"
                      placeholder={
                        <span className="text-[10px] text-primary-600 dark:text-primary-400 font-bold uppercase">
                          {String.fromCharCode(65 + i)}
                        </span>
                      }
                    />
                  ) : (
                    <span className="text-[10px] text-primary-600 dark:text-primary-400 font-bold uppercase">
                      {String.fromCharCode(65 + i)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-1.5 ml-1">
            <div className="flex items-center">
              <Star size={14} className="fill-accent-500 text-accent-500" />
            </div>
            <span className="text-text-primary font-bold">{rating}/5</span>
            <span className="hidden sm:inline border-l border-border-default h-3 mx-1" />
            <span className="truncate max-w-[120px] sm:max-w-none">
              {count ? `by ${count} teams` : 'rating'}
            </span>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-success-500 animate-pulse" />
          <span>
            Trusted by <span className="text-text-primary font-bold">{count || '500+'}</span>{' '}
            startups
          </span>
        </div>
      )}
    </>
  );

  const containerClasses = cn(
    'inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-secondary/80 backdrop-blur-sm border border-border-default text-sm font-medium text-text-muted transition-colors hover:border-border-hover',
    className,
  );

  if (!animate && !variants) {
    return <div className={containerClasses}>{content}</div>;
  }

  return (
    <motion.div
      variants={(variants || (animate ? PRESETS.fadeInUp : undefined)) as unknown as Variants}
      className={containerClasses}
    >
      {content}
    </motion.div>
  );
};

SocialProofBadge.displayName = 'SocialProofBadge';
