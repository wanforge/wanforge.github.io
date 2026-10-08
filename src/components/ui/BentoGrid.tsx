import * as React from 'react';
import { cn } from '@/utils/cn';

/**
 * BentoGrid Props Interface
 */
export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grid items */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Number of columns on desktop (default: 3) */
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Gap size between items (default: 4) */
  gap?: number | string;
}

/**
 * BentoGrid Component
 *
 * A responsive grid container for bento-style layouts.
 * Automatically stacks on mobile and uses CSS grid on desktop.
 */
export const BentoGrid = ({
  children,
  className = '',
  cols = 3,
  gap = 4,
  ...props
}: BentoGridProps) => {
  // Column configurations
  const colConfigs = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
  };

  // Gap configurations (mapping to Tailwind spacing)
  const gapConfigs: Record<string | number, string> = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  const gapClass = typeof gap === 'number' ? gapConfigs[gap] || `gap-${gap}` : gap;

  return (
    <div
      className={cn('grid grid-cols-1 w-full', colConfigs[cols], gapClass, className)}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * BentoGridItem Props Interface
 */
export interface BentoGridItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Title of the item */
  title?: string | React.ReactNode;
  /** Description or subtext */
  description?: string | React.ReactNode;
  /** Header content (e.g., image, illustration, or placeholder) */
  header?: React.ReactNode;
  /** Icon component or element */
  icon?: React.ReactNode;
  /** Number of columns to span on desktop */
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of rows to span on desktop */
  rowSpan?: 1 | 2 | 3;
  /** Additional CSS classes */
  className?: string;
}

/**
 * BentoGridItem Component
 *
 * An individual cell within a BentoGrid.
 * Supports spanning multiple columns and rows on desktop viewports.
 */
export const BentoGridItem = ({
  title,
  description,
  header,
  icon,
  colSpan = 1,
  rowSpan = 1,
  className = '',
  ...props
}: BentoGridItemProps) => {
  // Column span configurations
  const colSpans = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
  };

  // Row span configurations
  const rowSpans = {
    1: 'md:row-span-1',
    2: 'md:row-span-2',
    3: 'md:row-span-3',
  };

  return (
    <div
      className={cn(
        'group/bento relative overflow-hidden flex flex-col justify-between p-4',
        'bg-bg-primary border border-border-default rounded-xl',
        'transition-all duration-300 ease-out',
        'hover:shadow-xl hover:shadow-shadow-default/10',
        'hover:border-border-strong',
        colSpans[colSpan],
        rowSpans[rowSpan],
        className,
      )}
      {...props}
    >
      {header && (
        <div className="flex flex-1 w-full min-h-[6rem] rounded-lg overflow-hidden bg-bg-secondary mb-4 transition-transform duration-500 group-hover/bento:scale-[1.02]">
          {header}
        </div>
      )}
      <div className="transition-all duration-300 group-hover/bento:translate-x-1">
        {icon && (
          <div className="mb-2 text-primary-500 dark:text-primary-400 transition-colors duration-300 group-hover/bento:text-primary-600">
            {icon}
          </div>
        )}
        <div className="font-bold text-text-primary mb-1 mt-2 text-lg tracking-tight">{title}</div>
        <div className="font-normal text-text-secondary text-sm leading-relaxed">{description}</div>
      </div>

      {/* Subtle overlay effect on hover */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary-500/0 via-transparent to-primary-500/0 opacity-0 group-hover/bento:opacity-5 transition-opacity duration-500" />
    </div>
  );
};

export default BentoGrid;
