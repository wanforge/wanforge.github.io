import * as React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/utils/reducedMotion';
import { cn } from '@/utils/cn';
import { LazyImage } from './LazyImage';

/**
 * Card Variants
 *
 * - default: Standard card with subtle shadow
 * - outlined: Card with border only, no shadow
 * - elevated: Card with prominent shadow
 * - flat: Card with no shadow or border
 */
export type CardVariant = 'default' | 'outlined' | 'elevated' | 'flat';

/**
 * Card Padding Sizes
 *
 * - none: No padding
 * - sm: Small padding (12px / p-3)
 * - md: Medium padding (16px / p-4) - default
 * - lg: Large padding (24px / p-6)
 * - xl: Extra large padding (32px / p-8)
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Card Border Radius Sizes
 *
 * - none: No border radius
 * - sm: Small radius (4px / rounded-sm)
 * - md: Medium radius (8px / rounded-lg) - default
 * - lg: Large radius (12px / rounded-xl)
 * - xl: Extra large radius (16px / rounded-2xl)
 * - full: Full radius for circular/pill shape (9999px / rounded-3xl)
 */
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Card Props Interface
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style variant */
  variant?: CardVariant;
  /** Padding size */
  padding?: CardPadding;
  /** Border radius size */
  radius?: CardRadius;
  /** Enable hover lift animation */
  hover?: boolean;
  /** Enable subtle glow effect on hover */
  glow?: boolean;
  /** Full width card */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

/**
 * Card Component
 *
 * A versatile, theme-aware card component with multiple variants, padding sizes,
 * border radius options, and optional hover lift animation.
 *
 * @example
 * ```tsx
 * // Default card
 * <Card>
 *   <h3>Card Title</h3>
 *   <p>Card content here</p>
 * </Card>
 *
 * // Elevated card with large padding
 * <Card variant="elevated" padding="lg">
 *   <h3>Prominent Card</h3>
 * </Card>
 *
 * // Outlined card with hover effect
 * <Card variant="outlined" hover>
 *   <p>Hover over me!</p>
 * </Card>
 *
 * // Flat card with custom radius
 * <Card variant="flat" radius="xl">
 *   <p>Flat design card</p>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      radius = 'md',
      hover = false,
      glow = false,
      fullWidth = false,
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    const { prefersReducedMotion } = useReducedMotion();

    // Variant styles
    const variantStyles = {
      default: cn(
        'bg-bg-primary border border-border-default shadow-md shadow-shadow-default',
        hover && 'hover:border-border-strong',
      ),
      outlined: 'bg-bg-primary border-2 border-border-strong shadow-none',
      elevated: 'bg-bg-primary border border-border-default shadow-xl shadow-shadow-default',
      flat: 'bg-bg-secondary border-none shadow-none',
    };

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

    // Hover effect classes
    const hoverClasses = hover
      ? cn(
          'cursor-pointer transition-all duration-300 ease-out',
          !prefersReducedMotion && 'hover:-translate-y-1',
          variant === 'default' && 'hover:shadow-lg',
          variant === 'elevated' && 'hover:shadow-2xl',
          (glow || variant === 'default') &&
            !prefersReducedMotion &&
            'hover:shadow-primary/10 hover:border-primary-500/30',
        )
      : '';

    // Full width style
    const widthStyles = fullWidth ? 'w-full' : '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionDiv = motion.div as any;

    return (
      <MotionDiv
        ref={ref}
        className={cn(
          // Base styles
          'relative overflow-hidden',
          // Variant styles
          variantStyles[variant],
          // Padding styles
          paddingStyles[padding],
          // Radius styles
          radiusStyles[radius],
          // Hover styles
          hoverClasses,
          // Width styles
          widthStyles,
          // Custom classes
          className,
        )}
        {...props}
      >
        {children}
      </MotionDiv>
    );
  },
);

Card.displayName = 'Card';

/**
 * Card Header Component
 *
 * Header section for cards with consistent spacing and styling.
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col space-y-1.5',
          'pb-4',
          'border-b border-border-default',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Title Component
 *
 * Title styling for card headers.
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** The semantic heading level */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = 'h3', className = '', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'text-lg font-semibold',
          'text-text-primary',
          'leading-none tracking-tight',
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

CardTitle.displayName = 'CardTitle';

/**
 * Card Description Component
 *
 * Description/subtitle styling for card headers.
 */
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-sm text-text-secondary', className)} {...props}>
        {children}
      </p>
    );
  },
);

CardDescription.displayName = 'CardDescription';

/**
 * Card Content Component
 *
 * Main content area for cards with consistent spacing.
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('pt-4', className)} {...props}>
        {children}
      </div>
    );
  },
);

CardContent.displayName = 'CardContent';

/**
 * Card Footer Component
 *
 * Footer section for cards with consistent spacing and border.
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          'pt-4 mt-4',
          'border-t border-border-default',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = 'CardFooter';

/**
 * Card Image Component
 *
 * Image container for cards with proper aspect ratio and overflow handling.
 */
export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Aspect ratio: 'video' (16:9), 'square' (1:1), 'portrait' (3:4), 'auto' */
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
  /** Object fit style */
  objectFit?: 'cover' | 'contain' | 'fill';
  /** Additional CSS classes */
  className?: string;
}

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ src, alt, aspectRatio = 'video', objectFit = 'cover', className = '', ...props }, ref) => {
    const aspectRatioStyles = {
      video: 'aspect-video',
      square: 'aspect-square',
      portrait: 'aspect-[3/4]',
      auto: '',
    };

    const objectFitStyles = {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
    };

    return (
      <LazyImage
        ref={ref}
        src={src}
        alt={alt}
        containerClassName={cn('relative overflow-hidden', aspectRatioStyles[aspectRatio])}
        className={cn(
          'w-full h-full',
          objectFitStyles[objectFit],
          'transition-transform duration-300 ease-out',
          'group-hover:scale-105',
          className,
        )}
        aspectRatio={
          aspectRatio === 'auto'
            ? undefined
            : aspectRatio === 'video'
              ? '16/9'
              : aspectRatio === 'square'
                ? '1/1'
                : '3/4'
        }
        {...props}
      />
    );
  },
);

CardImage.displayName = 'CardImage';

/**
 * HoverableCard Component
 *
 * Pre-configured card with hover effect enabled.
 * Convenience wrapper around Card with hover=true.
 */
export interface HoverableCardProps extends Omit<CardProps, 'hover'> {
  /** Additional CSS classes */
  className?: string;
}

export const HoverableCard = React.forwardRef<HTMLDivElement, HoverableCardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <Card ref={ref} hover className={className} {...props}>
        {children}
      </Card>
    );
  },
);

HoverableCard.displayName = 'HoverableCard';

export default Card;
