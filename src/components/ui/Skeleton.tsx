import React from 'react';
import { useReducedMotion } from '@/utils/reducedMotion';
import { cn } from '@/utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to enable the pulse animation.
   * @default true
   */
  pulse?: boolean;
}

/**
 * Base Skeleton component with pulse animation.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, pulse = true, ...props }, ref) => {
    const { prefersReducedMotion } = useReducedMotion();

    return (
      <div
        ref={ref}
        className={cn(
          'bg-bg-tertiary rounded-md',
          pulse && !prefersReducedMotion && 'animate-pulse',
          className,
        )}
        {...props}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

/**
 * Skeleton variant for text lines.
 */
export interface SkeletonTextProps extends SkeletonProps {
  /**
   * Number of lines to render.
   * @default 1
   */
  lines?: number;
  /**
   * Gap between lines.
   * @default '2' (0.5rem)
   */
  gap?: string;
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 1, gap = '2', className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col w-full', `gap-${gap}`, className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              'h-4 w-full',
              i === lines - 1 && lines > 1 && 'w-3/4', // Last line is shorter if multiple lines
            )}
            {...props}
          />
        ))}
      </div>
    );
  },
);

SkeletonText.displayName = 'SkeletonText';

/**
 * Skeleton variant for circular avatars.
 */
export interface SkeletonAvatarProps extends SkeletonProps {
  /**
   * Size of the avatar.
   * @default '10' (2.5rem)
   */
  size?: string;
}

export const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = '10', className, ...props }, ref) => {
    return (
      <Skeleton
        ref={ref}
        className={cn('rounded-full shrink-0', `h-${size} w-${size}`, className)}
        {...props}
      />
    );
  },
);

SkeletonAvatar.displayName = 'SkeletonAvatar';

/**
 * Skeleton variant for cards.
 */
export interface SkeletonCardProps extends SkeletonProps {
  /**
   * Whether to include an image placeholder.
   * @default true
   */
  hasImage?: boolean;
}

export const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ hasImage = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden rounded-xl border border-border-default bg-bg-elevated p-4',
          className,
        )}
      >
        {hasImage && <Skeleton className="aspect-video w-full mb-4" {...props} />}
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/2" {...props} />
          <SkeletonText lines={3} {...props} />
        </div>
      </div>
    );
  },
);

SkeletonCard.displayName = 'SkeletonCard';
