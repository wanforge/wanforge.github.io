import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { PricingCard } from '@/components/ui/PricingCard';
import { type BillingPeriod, pricingTiers } from '@/data/pricing';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';

/**
 * Props for the PricingTiers component
 */
export interface PricingTiersProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Current billing period
   * @default 'annual'
   */
  billingPeriod: BillingPeriod;
}

/**
 * PricingTiers Section Component
 *
 * Displays the main pricing plans in a responsive grid. Each plan is
 * presented as a PricingCard with specific features, pricing based on
 * the current billing period, and a call-to-action.
 *
 * Features:
 * - Responsive 3-column grid layout
 * - Dynamic price switching based on billingPeriod prop
 * - Highlighted 'Pro' tier as most popular
 * - Staggered entrance animations
 * - Consistent styling for both light and dark modes
 */
export const PricingTiers: React.FC<PricingTiersProps> = ({ className, billingPeriod }) => {
  return (
    <Section
      id="pricing-tiers"
      className={cn('py-16 lg:py-24', className)}
      background="default"
      aria-labelledby="pricing-tiers-title"
      data-testid="pricing-section"
    >
      <Container>
        <h2 id="pricing-tiers-title" className="sr-only">
          Pricing Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, index) => {
            const isAnnual = billingPeriod === 'annual';
            const price = isAnnual
              ? tier.annualPrice !== null
                ? `$${tier.annualPrice}`
                : 'Custom'
              : tier.monthlyPrice !== null
                ? `$${tier.monthlyPrice}`
                : 'Custom';

            const billingLabel = tier.monthlyPrice === null ? '' : '/mo';

            return (
              <motion.div
                key={tier.id}
                initial={false}
                whileInView="animate"
                viewport={{ once: true, margin: '-100px' }}
                variants={
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                      },
                    },
                  } as Variants
                }
                className="h-full will-change-transform"
                style={{ opacity: 1 }}
              >
                <PricingCard
                  tier={tier.name}
                  description={tier.description}
                  price={price}
                  billingPeriod={billingLabel}
                  isPopular={tier.isPopular}
                  ctaText={tier.cta.text}
                  ctaHref={tier.cta.href}
                  useDemoModal={false}
                  features={tier.features.map((f) => ({
                    text: f.name,
                    included: f.included,
                  }))}
                  className="h-full"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Note about prices */}
        <motion.p
          initial={false}
          whileInView="animate"
          viewport={{ once: true }}
          variants={PRESETS.fadeInUp as unknown as Variants}
          className="mt-12 text-center text-sm text-text-muted max-w-2xl mx-auto will-change-transform"
          style={{ opacity: 1 }}
        >
          Prices are shown in USD. Annual billing saves you up to 20% on Pro and Starter plans. All
          plans include a 14-day free trial. No credit card required to start.
        </motion.p>
      </Container>
    </Section>
  );
};

PricingTiers.displayName = 'PricingTiers';

export default PricingTiers;
