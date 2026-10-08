import * as React from 'react';
import { cn } from '@/utils/cn';
import { type CardPadding, type CardRadius } from './Card';

/**
 * GlassmorphicCard Props Interface
 */
export interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Padding size */
  padding?: CardPadding;
  /** Border radius size */
  radius?: CardRadius;
  /** Enable hover lift animation */
  hover?: boolean;
  /** Full width card */
  fullWidth?: boolean;
  /** Show subtle border glow */
  glow?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

/**
 * GlassmorphicCard Component
 *
 * A modern, theme-aware card component with backdrop blur and semi-transparent
 * background effects. Adapts its appearance for light and dark modes.
 *
 * Features:
 * - Backdrop blur (xl)
 * - Semi-transparent background (bg-bg-primary/80 light, bg-bg-primary/60 dark)
 * - Subtle border glow (shadow effect)
 * - Consistent card props (padding, radius, hover, fullWidth)
 */
export const GlassmorphicCard = React.forwardRef<HTMLDivElement, GlassmorphicCardProps>(
  (
    {
      padding = 'md',
      radius = 'md',
      hover = false,
      fullWidth = false,
      glow = true,
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    // Padding styles
    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    };

    // Border radius styles
    const radiusStyles = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
      full: 'rounded-3xl',
    };

    // Hover animation styles
    const hoverStyles = hover
      ? `
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:shadow-lg
        hover:shadow-shadow-default
        cursor-pointer
      `
      : '';

    // Full width style
    const widthStyles = fullWidth ? 'w-full' : '';

    // Glow effect styles
    // Uses a subtle primary-colored shadow to create a glow effect
    const glowStyles = glow
      ? 'shadow-[0_0_15px_rgba(var(--color-primary-500),0.1)] dark:shadow-[0_0_20px_rgba(var(--color-primary-400),0.05)]'
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden',
          'glass', // Use the glass utility from globals.css
          glowStyles,
          paddingStyles[padding],
          radiusStyles[radius],
          hoverStyles,
          widthStyles,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GlassmorphicCard.displayName = 'GlassmorphicCard';

export default GlassmorphicCard;
