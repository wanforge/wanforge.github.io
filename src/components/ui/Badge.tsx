import * as React from 'react';

/**
 * Badge Variants
 *
 * - default: Neutral badge for general labels and tags
 * - success: Green badge for positive states (completed, active, success)
 * - warning: Amber badge for caution states (pending, warning)
 * - error: Red badge for negative states (error, failed, critical)
 * - info: Blue badge for informational states (info, new, beta)
 */
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

/**
 * Badge Sizes
 *
 * - sm: Small badge for compact layouts, inline text
 * - md: Default size for most use cases
 */
export type BadgeSize = 'sm' | 'md';

/**
 * Badge Props Interface
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Remove default border radius for a more subtle look */
  rounded?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

/**
 * Badge Component
 *
 * A versatile badge component for displaying labels, tags, status indicators,
 * and counts. Supports multiple semantic variants and sizes with full
 * light/dark theme support.
 *
 * @example
 * ```tsx
 * // Default badge
 * <Badge>New</Badge>
 *
 * // Success badge
 * <Badge variant="success">Active</Badge>
 *
 * // Warning badge
 * <Badge variant="warning">Pending</Badge>
 *
 * // Error badge
 * <Badge variant="error">Failed</Badge>
 *
 * // Info badge
 * <Badge variant="info">Beta</Badge>
 *
 * // Small size
 * <Badge size="sm">Tag</Badge>
 *
 * // Without rounded corners
 * <Badge rounded={false}>Label</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = 'default', size = 'md', rounded = true, className = '', children, ...props },
    ref,
  ) => {
    // Base styles shared across all variants
    const baseStyles = `
      inline-flex
      items-center
      justify-center
      font-medium
      transition-colors
      duration-200
      whitespace-nowrap
      shrink-0
    `;

    // Variant-specific styles with light and dark mode support
    const variantStyles: Record<BadgeVariant, string> = {
      default: `
        bg-bg-secondary
        text-text-secondary
        border
        border-border-default
        dark:bg-bg-secondary
        dark:text-text-secondary
        dark:border-border-default
      `,
      success: `
        bg-success-100
        text-success-800
        border
        border-success-200
        dark:bg-success-900/30
        dark:text-success-300
        dark:border-success-800
      `,
      warning: `
        bg-warning-100
        text-warning-800
        border
        border-warning-200
        dark:bg-warning-900/30
        dark:text-warning-300
        dark:border-warning-800
      `,
      error: `
        bg-error-100
        text-error-800
        border
        border-error-200
        dark:bg-error-900/30
        dark:text-error-300
        dark:border-error-800
      `,
      info: `
        bg-info-100
        text-info-800
        border
        border-info-200
        dark:bg-info-900/30
        dark:text-info-300
        dark:border-info-800
      `,
    };

    // Size-specific styles
    const sizeStyles: Record<BadgeSize, string> = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-2.5 py-1 text-sm gap-1.5',
    };

    // Border radius styles
    const radiusStyles = rounded ? 'rounded-full' : 'rounded';

    // Combine all classes
    const classes = [baseStyles, variantStyles[variant], sizeStyles[size], radiusStyles, className]
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;

/**
 * Status Badge Component
 *
 * A specialized badge variant for displaying status indicators with a dot.
 * Commonly used for showing online/offline status, task states, etc.
 */
export interface StatusBadgeProps extends Omit<BadgeProps, 'children'> {
  /** Status text to display */
  status: string;
  /** Whether to show the status dot */
  showDot?: boolean;
  /** Pulse animation for the dot */
  pulse?: boolean;
}

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    {
      status,
      showDot = true,
      pulse = false,
      variant = 'default',
      size = 'md',
      className = '',
      ...props
    },
    ref,
  ) => {
    // Dot color based on variant
    const dotColors: Record<BadgeVariant, string> = {
      default: 'bg-text-muted',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      info: 'bg-info-500',
    };

    // Dot size based on badge size
    const dotSizes: Record<BadgeSize, string> = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
    };

    return (
      <Badge ref={ref} variant={variant} size={size} className={className} {...props}>
        {showDot && (
          <span
            className={`inline-block rounded-full ${dotSizes[size]} ${dotColors[variant]} ${pulse ? 'animate-pulse' : ''}`}
            aria-hidden="true"
          />
        )}
        {status}
      </Badge>
    );
  },
);

StatusBadge.displayName = 'StatusBadge';

/**
 * Counter Badge Component
 *
 * A compact badge variant designed for displaying counts and numbers.
 * Commonly used for notification counts, item counts, etc.
 */
export interface CounterBadgeProps extends Omit<BadgeProps, 'children' | 'rounded'> {
  /** The count to display */
  count: number;
  /** Maximum count before showing "99+" */
  max?: number;
  /** Hide badge when count is 0 */
  hideZero?: boolean;
}

export const CounterBadge = React.forwardRef<HTMLSpanElement, CounterBadgeProps>(
  (
    {
      count,
      max = 99,
      hideZero = true,
      variant = 'default',
      size = 'sm',
      className = '',
      ...props
    },
    ref,
  ) => {
    // Don't render if count is 0 and hideZero is true
    if (count === 0 && hideZero) {
      return null;
    }

    // Format count if it exceeds max
    const displayCount = count > max ? `${max}+` : count.toString();

    return (
      <Badge
        ref={ref}
        variant={variant}
        size={size}
        rounded
        className={`min-w-[1.25rem] tabular-nums ${className}`}
        {...props}
      >
        {displayCount}
      </Badge>
    );
  },
);

CounterBadge.displayName = 'CounterBadge';
