/**
 * Section Component
 *
 * A layout component that provides consistent vertical spacing and
 * background styling for page sections.
 *
 * @module components/ui
 */

import React from 'react';

/**
 * Background variant options for the Section component
 */
export type SectionBackground =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'gradient'
  | 'transparent';

/**
 * Vertical padding size options
 */
export type SectionPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Props for the Section component
 */
export interface SectionProps {
  /**
   * The content to be rendered inside the section
   */
  children: React.ReactNode;

  /**
   * The background variant of the section
   * @default 'default'
   */
  background?: SectionBackground;

  /**
   * The vertical padding size
   * @default 'lg'
   */
  padding?: SectionPadding;

  /**
   * Optional section heading/title
   */
  heading?: React.ReactNode;

  /**
   * Optional section subheading/description
   */
  subheading?: React.ReactNode;

  /**
   * HTML id attribute for anchor linking
   */
  id?: string;

  /**
   * Additional CSS classes to apply
   */
  className?: string | undefined;

  /**
   * The HTML element to render as
   * @default 'section'
   */
  as?: React.ElementType;

  /**
   * Accessible label for the section
   */
  'aria-label'?: string;

  /**
   * ARIA role for the section
   */
  role?: string;

  /**
   * Whether to add horizontal padding for contained content
   * @default false
   */
  contained?: boolean;

  /**
   * Whether to add a top border
   * @default false
   */
  borderTop?: boolean;

  /**
   * Whether to add a bottom border
   * @default false
   */
  borderBottom?: boolean;
}

/**
 * Background class mapping for each variant
 */
const backgroundClasses: Record<SectionBackground, string> = {
  default: 'bg-bg-primary',
  primary: 'bg-primary-50 dark:bg-primary-950/30',
  secondary: 'bg-secondary-50 dark:bg-secondary-950/30',
  muted: 'bg-bg-secondary',
  gradient: 'gradient-mesh',
  transparent: 'bg-transparent',
};

/**
 * Vertical padding class mapping for each size
 */
const paddingClasses: Record<SectionPadding, string> = {
  none: '',
  sm: 'py-8',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-20 md:py-32',
  '2xl': 'py-24 md:py-40',
};

/**
 * Section component for consistent page section layouts
 *
 * Features:
 * - Consistent vertical padding with responsive scaling
 * - Multiple background color variants (default, primary, secondary, muted, gradient)
 * - Theme-aware styling for light and dark modes
 * - Optional section heading and subheading slots
 * - Support for contained content with horizontal padding
 * - Border options for visual separation
 * - Polymorphic rendering support via `as` prop
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * // Default section with large padding
 * <Section>
 *   <h2>Features</h2>
 *   <p>Content here</p>
 * </Section>
 *
 * // Section with heading and subheading
 * <Section
 *   heading="Our Features"
 *   subheading="Everything you need to build amazing products"
 * >
 *   <FeatureGrid />
 * </Section>
 *
 * // Section with custom background
 * <Section background="muted" padding="xl">
 *   <Testimonials />
 * </Section>
 *
 * // Gradient background for hero areas
 * <Section background="gradient" padding="2xl">
 *   <HeroContent />
 * </Section>
 *
 * // Section with contained content
 * <Section contained padding="lg">
 *   <div className="max-w-4xl mx-auto">
 *     <ContactForm />
 *   </div>
 * </Section>
 *
 * // Section with border for separation
 * <Section borderTop borderBottom background="secondary">
 *   <CTAContent />
 * </Section>
 *
 * // Render as different element
 * <Section as="article" aria-label="Blog post">
 *   <ArticleContent />
 * </Section>
 * ```
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      background = 'default',
      padding = 'lg',
      heading,
      subheading,
      id,
      className = '',
      as: Component = 'section',
      contained = false,
      borderTop = false,
      borderBottom = false,
      ...props
    },
    ref,
  ) => {
    // Background styling
    const bgClass = backgroundClasses[background];

    // Vertical padding
    const paddingClass = paddingClasses[padding];

    // Horizontal containment
    const containedClass = contained ? 'px-4 sm:px-6 lg:px-8' : '';

    // Border classes
    const borderTopClass = borderTop ? 'border-t border-border-default' : '';
    const borderBottomClass = borderBottom ? 'border-b border-border-default' : '';

    // Combine all classes
    const combinedClasses = [
      bgClass,
      paddingClass,
      containedClass,
      borderTopClass,
      borderBottomClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return React.createElement(
      Component,
      {
        ref,
        id,
        className: combinedClasses,
        ...props,
      },
      <>
        {/* Section Heading */}
        {(heading || subheading) && (
          <div className="container-wide mb-12 md:mb-16">
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary text-center">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-4 text-lg md:text-xl text-text-secondary text-center max-w-3xl mx-auto">
                {subheading}
              </p>
            )}
          </div>
        )}
        {/* Main Content */}
        {children}
      </>,
    );
  },
);

Section.displayName = 'Section';

/**
 * Convenience variant: HeroSection
 * Optimized for hero areas with extra-large padding and gradient background
 */
export const HeroSection: React.FC<Omit<SectionProps, 'background' | 'padding'>> = (props) => (
  <Section background="gradient" padding="2xl" {...props} />
);

HeroSection.displayName = 'HeroSection';

/**
 * Convenience variant: FeatureSection
 * Optimized for feature showcases with muted background
 */
export const FeatureSection: React.FC<Omit<SectionProps, 'background'>> = (props) => (
  <Section background="muted" {...props} />
);

FeatureSection.displayName = 'FeatureSection';

/**
 * Convenience variant: CTASection
 * Optimized for call-to-action areas with primary accent background
 */
export const CTASection: React.FC<Omit<SectionProps, 'background'>> = (props) => (
  <Section background="primary" {...props} />
);

CTASection.displayName = 'CTASection';

/**
 * Convenience variant: ContentSection
 * Optimized for content areas with default background and contained layout
 */
export const ContentSection: React.FC<Omit<SectionProps, 'contained'>> = (props) => (
  <Section contained {...props} />
);

ContentSection.displayName = 'ContentSection';

export default Section;
