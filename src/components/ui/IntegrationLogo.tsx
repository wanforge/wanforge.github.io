/**
 * Integration Logo Component
 *
 * Displays a partner/integration logo with hover effects and demo modal integration.
 * Supports grayscale-to-color transition and scaling on hover.
 * Fully supports dark mode using CSS filter inversion for optimal visibility.
 *
 * @module components/ui
 */

import React from 'react';
import { getAssetPath, resolveHref } from '../../config/paths';
import { DemoLink } from './DemoLink';
import { LazyImage } from './LazyImage';

/**
 * Props for the IntegrationLogo component
 */
export interface IntegrationLogoProps {
  /** The name of the integration/partner */
  name: string;
  /** Path to the logo image file */
  logo: string;
  /** Optional URL for the integration (defaults to # which triggers demo modal if configured) */
  href?: string | undefined;
  /** Size variant of the logo */
  size?: 'sm' | 'md' | 'lg' | undefined;
  /** Whether to apply grayscale effect by default (toggles on hover) */
  grayscale?: boolean | undefined;
  /** Whether to show full brand colors (disables grayscale filter) */
  colored?: boolean | undefined;
  /** Whether to show a background on hover */
  showHoverBg?: boolean | undefined;
  /** Additional CSS classes for the container */
  className?: string | undefined;
  /** Whether to resolve the href using path configuration */
  resolvePath?: boolean | undefined;
  /** tabIndex for accessibility */
  tabIndex?: number | undefined;
}

/**
 * IntegrationLogo Component
 *
 * A specialized component for displaying third-party logos (integrations, customers, partners).
 *
 * Features:
 * - Theme-aware grayscale-to-color hover transition
 * - Automatic dark mode support using CSS filter inversion
 * - Scale-up animation on hover
 * - Responsive sizing variants
 * - Automatic path resolution via centralized path config
 * - Seamless integration with DemoLinkModal
 * - Lazy loading for performance
 *
 * Dark Mode Support:
 * - Dark logos are automatically inverted to white using CSS filter
 * - Colored logos maintain their colors with increased brightness
 * - Ensures all logos are visible on dark backgrounds
 */
export const IntegrationLogo: React.FC<IntegrationLogoProps> = ({
  name,
  logo,
  href = '#',
  size = 'md',
  grayscale = true,
  colored = false,
  showHoverBg = true,
  className = '',
  resolvePath = true,
  tabIndex,
}) => {
  // Resolve the href
  const resolvedHref = React.useMemo(() => {
    return resolvePath ? resolveHref(href) : href;
  }, [href, resolvePath]);

  // Size-specific height classes
  const sizeClasses = {
    sm: 'h-6 md:h-8',
    md: 'h-8 md:h-12',
    lg: 'h-10 md:h-16',
  };

  // Container styles with hover effects
  const containerClasses = `
    group relative flex items-center justify-center 
    px-4 py-3 rounded-xl transition-all duration-300
    ${showHoverBg ? 'hover:bg-bg-secondary/50 dark:hover:bg-bg-secondary/30' : ''}
    ${className}
  `;

  // Image styles with theme-aware filters
  // Light Mode: Grayscale logos start desaturated, become colored on hover
  // Dark Mode: Use CSS filter:invert to make dark logos white for visibility
  // Reference: https://jeffbridgforth.com/handling-logos-in-dark-mode/
  const imageClasses = React.useMemo(() => {
    const baseClasses = `${sizeClasses[size]} w-auto max-w-full transition-all duration-500 ease-out group-hover:scale-110`;

    // Colored logos: Show full colors, no inversion in dark mode
    if (colored) {
      return `${baseClasses} opacity-100 dark:brightness-125 dark:invert-0`;
    }

    // Grayscale logos: Apply grayscale filter
    if (grayscale) {
      return `${baseClasses} grayscale opacity-60 contrast-[0.9] group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100 dark:invert`;
    }

    // Default: No grayscale, but invert in dark mode
    return `${baseClasses} opacity-100 dark:invert`;
  }, [size, sizeClasses, colored, grayscale]);

  return (
    <DemoLink
      href={resolvedHref}
      className={containerClasses}
      title={name}
      tabIndex={tabIndex}
      data-testid="integration-logo"
      _category="integration"
    >
      <LazyImage
        src={getAssetPath(logo)}
        alt={`${name} logo`}
        className={imageClasses}
        loading="lazy"
        containerClassName="bg-transparent"
        placeholder={false}
      />
    </DemoLink>
  );
};

export default IntegrationLogo;
