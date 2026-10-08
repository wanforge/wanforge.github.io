import * as React from 'react';
import { Check, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { featureComparison } from '@/data/features';
import { FadeInUp } from '@/components/animation/AnimatedElement';
import { cn } from '@/utils/cn';

/**
 * Props for the FeatureComparison component
 */
export interface FeatureComparisonProps {
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
 * FeatureComparison Section Component
 *
 * Displays a comprehensive comparison table between our product and typical competitors.
 *
 * Features:
 * - Responsive table with horizontal scroll on mobile
 * - Categorized features for organized reading
 * - Visual indicators (check/X) for clear comparison
 * - Theme-aware styling for light and dark modes
 * - Staggered entrance animations
 */
export const FeatureComparison: React.FC<FeatureComparisonProps> = ({
  className,
  title = 'Compare Our Features',
  subtitle = 'See how we stack up against the competition with our transparent feature comparison.',
}) => {
  return (
    <Section
      id="comparison"
      className={cn('bg-bg-primary overflow-hidden', className)}
      aria-labelledby="comparison-title"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeInUp triggerOnView>
            <h2
              id="comparison-title"
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-4"
            >
              {title}
            </h2>
            <p className="text-lg text-text-muted">{subtitle}</p>
          </FadeInUp>
        </div>

        <FadeInUp triggerOnView delay={0.2} className="w-full max-w-full overflow-hidden">
          <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <table className="w-full border-collapse text-left min-w-[640px]">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="py-6 px-4 text-sm font-semibold text-text-muted uppercase tracking-wider w-1/3">
                    Features
                  </th>
                  <th className="py-6 px-4 text-center w-1/3">
                    <div className="inline-flex flex-col items-center">
                      <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                        Our Product
                      </span>
                      <span className="text-xs text-text-muted mt-1 font-medium">
                        Industry Leading
                      </span>
                    </div>
                  </th>
                  <th className="py-6 px-4 text-center w-1/3">
                    <div className="inline-flex flex-col items-center">
                      <span className="text-lg font-bold text-text-secondary">
                        Typical Competitor
                      </span>
                      <span className="text-xs text-text-muted mt-1 font-medium">
                        Standard Approach
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {featureComparison.map((category) => (
                  <React.Fragment key={category.category}>
                    <tr className="bg-bg-secondary/30">
                      <th
                        colSpan={3}
                        className="py-4 px-4 text-sm font-bold text-text-primary uppercase tracking-wide bg-primary-50/30 dark:bg-primary-900/10"
                      >
                        {category.category}
                      </th>
                    </tr>
                    {category.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="hover:bg-bg-secondary/20 transition-colors group"
                      >
                        <td className="py-5 px-4">
                          <div className="font-medium text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {feature.name}
                          </div>
                          {feature.description && (
                            <div className="text-xs text-text-muted mt-0.5">
                              {feature.description}
                            </div>
                          )}
                        </td>
                        <td className="py-5 px-4 text-center">
                          <ValueDisplay value={feature.productValue} isPrimary />
                        </td>
                        <td className="py-5 px-4 text-center">
                          <ValueDisplay value={feature.competitorValue} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInUp>

        <div className="mt-12 text-center">
          <p className="text-sm text-text-muted italic">
            * Comparison based on standard market offerings as of February 2026.
          </p>
        </div>
      </Container>
    </Section>
  );
};

/**
 * Component to display values in the comparison table
 */
const ValueDisplay: React.FC<{ value: boolean | string; isPrimary?: boolean }> = ({
  value,
  isPrimary = false,
}) => {
  if (typeof value === 'boolean') {
    return value ? (
      <div
        className={cn(
          'inline-flex items-center justify-center w-8 h-8 rounded-full',
          isPrimary
            ? 'bg-primary-100 dark:bg-primary-900/30'
            : 'bg-success-50 dark:bg-success-900/20',
        )}
      >
        <Check
          className={cn(
            'w-5 h-5',
            isPrimary
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
        isPrimary
          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
          : 'bg-bg-secondary text-text-secondary border border-border-default',
      )}
    >
      {value}
    </span>
  );
};

FeatureComparison.displayName = 'FeatureComparison';

export default FeatureComparison;
