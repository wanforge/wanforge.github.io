import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Container, GradientBackground, Section } from '@/components/ui';
import { BillingToggle } from '@/components/ui/BillingToggle';
import { type BillingPeriod } from '@/data/pricing';
import { PRESETS } from '@/config/animation';
import { pageSEO } from '@/config/site';
import { cn } from '@/utils/cn';

/**
 * Props for the PricingHero component
 */
export interface PricingHeroProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Current billing period
   * @default 'annual'
   */
  billingPeriod: BillingPeriod;
  /**
   * Callback for billing period change
   */
  onBillingPeriodChange: (period: BillingPeriod) => void;
}

/**
 * PricingHero Section Component
 *
 * The hero section for the Pricing page, providing a clear value proposition
 * and the primary billing toggle to control pricing presentation.
 *
 * Features:
 * - High-impact typography with gradient accents
 * - Responsive container with centered alignment
 * - Subtle animated mesh gradient background
 * - Integrated billing toggle for annual/monthly switching
 * - Entrance animations using shared presets
 * - Theme-aware styling for light and dark modes
 */
export const PricingHero: React.FC<PricingHeroProps> = ({
  className,
  billingPeriod,
  onBillingPeriodChange,
}) => {
  const { description } = pageSEO.pricing;

  return (
    <Section
      id="pricing-hero"
      className={cn(
        'relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden min-h-[40vh] flex items-center',
        className,
      )}
      background="transparent"
      aria-label="Pricing Hero Section"
    >
      {/* Background with minimal gradient */}
      <GradientBackground
        id="pricing-hero-gradient"
        variant="minimal"
        intensity={0.3}
        className="opacity-40 dark:opacity-20"
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={false}
            animate="animate"
            variants={PRESETS.fadeInUp as unknown as Variants}
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6 leading-[1.1]"
              data-testid="pricing-hero-title"
            >
              Simple, transparent{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                pricing for everyone
              </span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted mb-12 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>

            <div className="flex justify-center">
              <BillingToggle
                value={billingPeriod}
                onChange={onBillingPeriodChange}
                discountLabel="Save 20%"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

PricingHero.displayName = 'PricingHero';

export default PricingHero;
