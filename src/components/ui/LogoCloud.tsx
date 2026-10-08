/**
 * Logo Cloud Component
 *
 * Displays a grid or a scrolling marquee of partner/integration logos.
 * Supports responsive layouts, light/dark modes, and optional scrolling animation.
 *
 * @module components/ui
 */

import React from 'react';
import { IntegrationLogo, type IntegrationLogoProps } from './IntegrationLogo';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Props for the LogoCloud component
 */
export interface LogoCloudProps {
  /** Array of logo items to display */
  logos: IntegrationLogoProps[];
  /** Optional title for the logo cloud */
  title?: string | undefined;
  /** Whether to use marquee (infinite scrolling) animation */
  marquee?: boolean | undefined;
  /** Speed of marquee animation in seconds (defaults to 30) */
  duration?: number | undefined;
  /** Direction of marquee animation */
  direction?: 'left' | 'right' | undefined;
  /** Size variant for the logos */
  logoSize?: IntegrationLogoProps['size'] | undefined;
  /** Number of columns in grid mode (defaults to responsive grid) */
  cols?: 2 | 3 | 4 | 5 | 6 | undefined;
  /** Additional CSS classes for the container */
  className?: string | undefined;
}

/**
 * LogoCloud Component
 *
 * Features:
 * - Responsive grid layout for static display
 * - Infinite marquee scroll for dynamic display
 * - Staggered entrance animation (TODO: implement when needed)
 * - Support for variable number of logos
 * - Full light/dark mode support
 */
export const LogoCloud: React.FC<LogoCloudProps> = ({
  logos,
  title,
  marquee = false,
  duration = 30,
  direction = 'left',
  logoSize = 'md',
  cols,
  className = '',
}) => {
  if (!logos || logos.length === 0) return null;

  // Grid column classes
  const colClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6',
  };

  const gridClass = cols
    ? colClasses[cols]
    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';

  if (marquee) {
    // We double the logos to create the infinite scroll effect
    const marqueeLogos = [...logos, ...logos];

    return (
      <div className={cn('w-full overflow-hidden py-4', className)}>
        {title && (
          <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-text-tertiary">
            {title}
          </h2>
        )}

        <div className="relative flex w-full">
          <div
            className={cn(
              'flex min-w-full shrink-0 items-center justify-around gap-8 py-4',
              direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse',
            )}
            style={{
              animationDuration: `${duration}s`,
            }}
          >
            {marqueeLogos.map((logo, index) => (
              <IntegrationLogo
                key={`${logo.name}-${index}`}
                {...logo}
                size={logoSize}
                className="shrink-0"
              />
            ))}
          </div>

          {/* Duplicated set for seamless loop */}
          <div
            aria-hidden="true"
            className={cn(
              'flex min-w-full shrink-0 items-center justify-around gap-8 py-4',
              direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse',
            )}
            style={{
              animationDuration: `${duration}s`,
            }}
          >
            {marqueeLogos.map((logo, index) => (
              <IntegrationLogo
                key={`${logo.name}-clone-${index}`}
                {...logo}
                size={logoSize}
                className="shrink-0"
                tabIndex={-1}
              />
            ))}
          </div>
        </div>

        {/* Scoped styles for marquee animation */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          @keyframes marquee-reverse {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee {
            animation: marquee linear infinite;
          }
          .animate-marquee-reverse {
            animation: marquee-reverse linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-marquee, .animate-marquee-reverse {
              animation: none !important;
              flex-wrap: wrap;
              justify-content: center;
            }
          }
        `,
          }}
        />
      </div>
    );
  }

  return (
    <div className={cn('w-full py-8', className)}>
      {title && (
        <h3 className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-text-tertiary">
          {title}
        </h3>
      )}

      <div className={cn('grid items-center justify-items-center gap-8 md:gap-12', gridClass)}>
        {logos.map((logo) => (
          <IntegrationLogo key={logo.name} {...logo} size={logoSize} />
        ))}
      </div>
    </div>
  );
};

export default LogoCloud;
