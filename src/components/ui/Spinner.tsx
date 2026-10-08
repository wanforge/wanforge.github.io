import React from 'react';
import { Loader2 } from 'lucide-react';
import { useReducedMotion } from '@/utils/reducedMotion';
import { cn } from '@/utils/cn';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Color of the spinner */
  variant?: 'primary' | 'secondary' | 'current';
}

/**
 * A standard spinner component for loading states.
 */
export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', variant = 'primary', ...props }, ref) => {
    const { prefersReducedMotion } = useReducedMotion();

    const sizeMap = {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    };

    const variantMap = {
      primary: 'text-primary-600 dark:text-primary-500',
      secondary: 'text-secondary-600 dark:text-secondary-500',
      current: 'text-current',
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn('inline-flex items-center justify-center', className)}
        {...props}
      >
        <Loader2
          className={cn(
            'animate-spin',
            sizeMap[size],
            variantMap[variant],
            prefersReducedMotion && 'animate-none',
          )}
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  },
);

Spinner.displayName = 'Spinner';
