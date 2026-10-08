import * as React from 'react';
import { Check, X } from 'lucide-react';
import { Container, Link, Section } from '@/components/ui';
import { comparisonFeatures } from '@/data/pricing';
import { FadeInUp } from '@/components/animation/AnimatedElement';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/config/paths';

/**
 * Props for the PricingComparison component
 */
export interface PricingComparisonProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Section title
   */
  title?: string;
  /**
   * Section subtitle
   */
  subtitle?: string;
}

/**
 * PricingComparison Section Component
 *
 * Displays a detailed feature comparison table across different pricing tiers.
 *
 * Features:
 * - Responsive table with horizontal scroll on mobile
 * - Sticky header for desktop navigation
 * - Categorized features for organized reading
 * - Visual indicators (check/X) for clear comparison
 * - Theme-aware styling for light and dark modes
 */
export const PricingComparison: React.FC<PricingComparisonProps> = ({
  className,
  title = 'Compare Our Plans',
  subtitle = 'Find the perfect plan for your needs with our detailed feature breakdown.',
}) => {
  return (
    <Section
      id="pricing-comparison"
      className={cn('bg-bg-primary', className)}
      aria-labelledby="pricing-comparison-title"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeInUp triggerOnView>
            <h2
              id="pricing-comparison-title"
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-4"
            >
              {title}
            </h2>
            <p className="text-lg text-text-muted">{subtitle}</p>
          </FadeInUp>
        </div>

        <FadeInUp triggerOnView delay={0.2}>
          <div className="relative overflow-hidden rounded-2xl border border-border-default bg-bg-secondary/20 shadow-sm">
            <div
              className="overflow-x-auto scrollbar-hide focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-2xl"
              tabIndex={0}
              role="region"
              aria-label="Feature comparison table"
            >
              <table className="w-full border-collapse text-left min-w-[800px]">
                <thead className="sticky top-0 z-10 bg-bg-secondary/95 backdrop-blur-sm border-b border-border-default">
                  <tr>
                    <th className="py-6 px-6 text-sm font-semibold text-text-muted uppercase tracking-wider w-1/4">
                      Features
                    </th>
                    <th className="py-6 px-6 text-center w-1/4" role="columnheader">
                      <span className="text-lg font-bold text-text-primary">Starter</span>
                    </th>
                    <th className="py-6 px-6 text-center w-1/4" role="columnheader">
                      <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                        Pro
                      </span>
                      <div className="text-[10px] uppercase font-bold text-primary-600 dark:text-primary-400 mt-1">
                        Most Popular
                      </div>
                    </th>
                    <th className="py-6 px-6 text-center w-1/4" role="columnheader">
                      <span className="text-lg font-bold text-text-primary">Enterprise</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {comparisonFeatures.map((category) => (
                    <React.Fragment key={category.category}>
                      <tr className="bg-bg-secondary/50">
                        <th
                          colSpan={4}
                          className="py-4 px-6 text-sm font-bold text-text-primary uppercase tracking-wide bg-primary-50/20 dark:bg-primary-900/10"
                        >
                          {category.category}
                        </th>
                      </tr>
                      {category.items.map((feature) => (
                        <tr
                          key={feature.name}
                          className="hover:bg-bg-secondary/30 transition-colors group"
                        >
                          <td className="py-5 px-6">
                            <span className="font-medium text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {feature.name}
                            </span>
                          </td>
                          <td className="py-5 px-6 text-center">
                            <ValueDisplay value={feature.starter} />
                          </td>
                          <td className="py-5 px-6 text-center bg-primary-50/5 dark:bg-primary-900/5">
                            <ValueDisplay value={feature.pro} isHighlighted />
                          </td>
                          <td className="py-5 px-6 text-center">
                            <ValueDisplay value={feature.enterprise} />
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeInUp>

        <div className="mt-12 text-center">
          <p className="text-sm text-text-muted">
            All prices are in USD. Custom plans available for large organizations.{' '}
            <Link
              href={ROUTES.CONTACT}
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              Contact sales
            </Link>{' '}
            for more information.
          </p>
        </div>
      </Container>
    </Section>
  );
};

/**
 * Component to display values in the comparison table
 */
const ValueDisplay: React.FC<{ value: boolean | string; isHighlighted?: boolean }> = ({
  value,
  isHighlighted = false,
}) => {
  if (typeof value === 'boolean') {
    return value ? (
      <div
        className={cn(
          'inline-flex items-center justify-center w-8 h-8 rounded-full',
          isHighlighted
            ? 'bg-primary-100 dark:bg-primary-900/30'
            : 'bg-success-50 dark:bg-success-900/20',
        )}
      >
        <Check
          className={cn(
            'w-5 h-5',
            isHighlighted
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-success-600 dark:text-success-400',
          )}
          aria-hidden="true"
        />
        <span className="sr-only">Included</span>
      </div>
    ) : (
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-error-50 dark:bg-error-900/20">
        <X className="w-5 h-5 text-error-600 dark:text-error-400" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </div>
    );
  }

  return (
    <span
      className={cn(
        'text-sm font-semibold px-3 py-1 rounded-full',
        isHighlighted
          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
          : 'bg-bg-secondary text-text-secondary border border-border-default',
      )}
    >
      {value}
    </span>
  );
};

PricingComparison.displayName = 'PricingComparison';

export default PricingComparison;
