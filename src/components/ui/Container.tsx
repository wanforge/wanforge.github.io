/**
 * Container Component
 *
 * A layout component that provides consistent max-width constraints
 * and responsive padding for content areas.
 *
 * @module components/ui
 */

import React from 'react';

/**
 * Container size variants
 */
export type ContainerSize = 'default' | 'narrow' | 'wide' | 'full';

/**
 * Props for the Container component
 */
export interface ContainerProps {
  /**
   * The content to be rendered inside the container
   */
  children: React.ReactNode;

  /**
   * The maximum width variant of the container
   * @default 'default'
   */
  size?: ContainerSize;

  /**
   * Whether to center the container horizontally
   * @default true
   */
  center?: boolean;

  /**
   * Whether to add vertical padding (py-8 md:py-12 lg:py-16)
   * @default false
   */
  verticalPadding?: boolean;

  /**
   * Additional CSS classes to apply
   */
  className?: string;

  /**
   * The HTML element to render as
   * @default 'div'
   */
  as?: React.ElementType;

  /**
   * Accessible label for the container (for semantic elements like section, article)
   */
  'aria-label'?: string;

  /**
   * ARIA role for the container
   */
  role?: string;

  /**
   * HTML id attribute
   */
  id?: string;
}

/**
 * Max-width class mapping for each size variant
 */
const sizeClasses: Record<ContainerSize, string> = {
  narrow: 'max-w-3xl', // 768px - good for reading content
  default: 'max-w-7xl', // 1280px - standard content width
  wide: 'max-w-[1440px]', // 1440px - wider for large screens
  full: 'max-w-none', // No max-width constraint
};

/**
 * Container component for consistent content width and padding
 *
 * Features:
 * - Responsive horizontal padding (px-4 sm:px-6 lg:px-8)
 * - Configurable max-width via size variants
 * - Optional vertical padding
 * - Centered by default
 * - Supports polymorphic rendering via `as` prop
 * - Full TypeScript support
 *
 * @example
 * ```tsx
 * // Default container (max-w-7xl)
 * <Container>
 *   <p>Content here</p>
 * </Container>
 *
 * // Narrow container for reading content
 * <Container size="narrow">
 *   <article>Article content</article>
 * </Container>
 *
 * // Wide container for full-width layouts
 * <Container size="wide" verticalPadding>
 *   <HeroSection />
 * </Container>
 *
 * // Full-width container with custom padding
 * <Container size="full" className="px-8">
 *   <FullWidthBanner />
 * </Container>
 *
 * // Render as semantic element
 * <Container as="section" aria-label="Features">
 *   <FeaturesList />
 * </Container>
 * ```
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = 'default',
      center = true,
      verticalPadding = false,
      className = '',
      as: Component = 'div',
      ...props
    },
    ref,
  ) => {
    // Base classes that are always applied
    const baseClasses = 'w-full';

    // Responsive horizontal padding
    const paddingClasses = 'px-4 sm:px-6 lg:px-8';

    // Size-based max-width
    const maxWidthClass = sizeClasses[size];

    // Center horizontally
    const centerClass = center ? 'mx-auto' : '';

    // Optional vertical padding
    const verticalPaddingClass = verticalPadding ? 'py-8 md:py-12 lg:py-16' : '';

    // Combine all classes
    const combinedClasses = [
      baseClasses,
      paddingClasses,
      maxWidthClass,
      centerClass,
      verticalPaddingClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return React.createElement(
      Component,
      {
        ref,
        className: combinedClasses,
        ...props,
      },
      children,
    );
  },
);

Container.displayName = 'Container';

/**
 * Convenience variant: NarrowContainer
 * Optimized for reading content (blog posts, articles)
 */
export const NarrowContainer: React.FC<Omit<ContainerProps, 'size'>> = (props) => (
  <Container size="narrow" {...props} />
);

NarrowContainer.displayName = 'NarrowContainer';

/**
 * Convenience variant: WideContainer
 * For layouts that need more horizontal space
 */
export const WideContainer: React.FC<Omit<ContainerProps, 'size'>> = (props) => (
  <Container size="wide" {...props} />
);

WideContainer.displayName = 'WideContainer';

/**
 * Convenience variant: FullContainer
 * For full-width layouts without max-width constraint
 */
export const FullContainer: React.FC<Omit<ContainerProps, 'size'>> = (props) => (
  <Container size="full" {...props} />
);

FullContainer.displayName = 'FullContainer';

export default Container;
