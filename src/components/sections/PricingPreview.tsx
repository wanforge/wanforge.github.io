import * as React from 'react';
import { type BillingPeriod, pricingTiers } from '@/data/pricing';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { BillingToggle } from '@/components/ui/BillingToggle';
import { PricingCard } from '@/components/ui/PricingCard';
import { Link } from '@/components/ui/Link';
import { ROUTES } from '@/config/paths';
import { type Variants, motion } from 'motion/react';
import { PRESETS } from '@/config/animation';

/**
 * Props for the PricingPreview component
 */
export interface PricingPreviewProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Section heading
   * @default 'Simple, transparent pricing'
   */
  heading?: string;
  /**
   * Section subheading
   * @default 'Choose the plan that best fits your needs. All plans include a 14-day free trial.'
   */
  subheading?: string;
  /**
   * Whether to show the billing toggle
   * @default true
   */
  showToggle?: boolean;
}

/**
 * PricingPreview Section Component
 *
 * Displays a simplified pricing overview on the homepage with a monthly/annual
 * billing toggle and cards for each tier. Includes a link to the full pricing page.
 */
export const PricingPreview: React.FC<PricingPreviewProps> = ({
  heading = 'Simple, transparent pricing',
  subheading = 'Choose the plan that best fits your needs. All plans include a 14-day free trial.',
  showToggle = true,
  className,
}) => {
  const [billingPeriod, setBillingPeriod] = React.useState<BillingPeriod>('annual');

  return (
    <Section
      id="pricing"
      heading={heading}
      subheading={subheading}
      className={className || ''}
      background="default"
    >
      <Container>
        {showToggle && (
          <motion.div
            initial={false}
            whileInView="animate"
            viewport={{ once: true }}
            variants={PRESETS.fadeInUp as unknown as Variants}
            className="mb-12 flex justify-center will-change-transform"
          >
            <BillingToggle
              value={billingPeriod}
              onChange={setBillingPeriod}
              discountLabel="Save 20%"
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, index) => {
            const price =
              billingPeriod === 'annual'
                ? tier.annualPrice !== null
                  ? `$${tier.annualPrice}`
                  : 'Custom'
                : tier.monthlyPrice !== null
                  ? `$${tier.monthlyPrice}`
                  : 'Custom';

            const periodLabel = tier.monthlyPrice === null ? '' : '/mo';

            return (
              <motion.div
                key={tier.id}
                initial={false}
                whileInView="animate"
                viewport={{ once: true }}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.1 },
                  },
                }}
                className="h-full will-change-transform"
              >
                <PricingCard
                  tier={tier.name}
                  description={tier.description}
                  price={price}
                  billingPeriod={periodLabel}
                  isPopular={tier.isPopular}
                  ctaText={tier.cta.text}
                  ctaHref={tier.cta.href}
                  features={tier.features.slice(0, 5).map((f) => ({
                    text: f.name,
                    included: f.included,
                  }))}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={false}
          whileInView="animate"
          viewport={{ once: true }}
          variants={PRESETS.fadeInUp as unknown as Variants}
          className="mt-16 text-center will-change-transform"
        >
          <Link
            href={ROUTES.PRICING}
            variant="underline"
            className="text-primary-600 dark:text-primary-400 font-medium"
          >
            View all features and full comparison
          </Link>
          <p className="mt-4 text-sm text-text-muted">
            Looking for something else?{' '}
            <Link href={ROUTES.CONTACT} variant="underline">
              Contact our sales team
            </Link>{' '}
            for custom requirements.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
};

PricingPreview.displayName = 'PricingPreview';

export default PricingPreview;
