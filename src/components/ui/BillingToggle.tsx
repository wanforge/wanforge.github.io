import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/utils/cn';

export interface BillingToggleProps {
  /** The current billing period ('monthly' or 'annual') */
  value: 'monthly' | 'annual';
  /** Callback fired when the billing period changes */
  onChange: (value: 'monthly' | 'annual') => void;
  /** Optional discount label for the annual plan */
  discountLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * BillingToggle Component
 *
 * A specialized toggle for switching between monthly and annual billing periods.
 * Features a smooth animated indicator and a discount badge.
 */
export const BillingToggle: React.FC<BillingToggleProps> = ({
  value,
  onChange,
  discountLabel = 'Save 20%',
  className,
}) => {
  const isAnnual = value === 'annual';

  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <button
        type="button"
        onClick={() => onChange('monthly')}
        className={cn(
          'text-sm font-medium transition-colors',
          !isAnnual ? 'text-text-primary' : 'text-text-muted hover:text-text-primary',
        )}
      >
        Monthly
      </button>

      <div
        className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-bg-secondary p-1 ring-offset-bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        onClick={() => onChange(isAnnual ? 'monthly' : 'annual')}
        role="switch"
        aria-checked={isAnnual}
        aria-label="Toggle annual billing"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange(isAnnual ? 'monthly' : 'annual');
          }
        }}
      >
        <motion.div
          className="h-6 w-6 rounded-full bg-primary-600 shadow-sm"
          animate={{ x: isAnnual ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange('annual')}
          className={cn(
            'text-sm font-medium transition-colors',
            isAnnual ? 'text-text-primary' : 'text-text-muted hover:text-text-primary',
          )}
        >
          Annual
        </button>
        {discountLabel && (
          <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
            {discountLabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default BillingToggle;
