import * as React from 'react';
import {
  EnterpriseContact,
  FAQSection,
  FinalCTA,
  MoneyBackGuarantee,
  PricingComparison,
  PricingHero,
  PricingTiers,
} from '@/components/sections';
import { type BillingPeriod } from '@/data/pricing';

/**
 * PricingPageContent Component
 *
 * Manages the shared state for the Pricing page and assembles all sections.
 * This is an island component that handles the billing period toggle and
 * ensures consistency across hero and pricing tiers.
 */
export const PricingPageContent: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = React.useState<BillingPeriod>('annual');

  const handleBillingChange = (period: BillingPeriod) => {
    setBillingPeriod(period);
  };

  return (
    <>
      {/* 1. Pricing Hero with Toggle */}
      <PricingHero billingPeriod={billingPeriod} onBillingPeriodChange={handleBillingChange} />

      {/* 2. Main Pricing Tiers Grid */}
      <PricingTiers billingPeriod={billingPeriod} />

      {/* 3. Money-Back Guarantee Callout */}
      <MoneyBackGuarantee />

      {/* 4. Detailed Feature Comparison Table */}
      <PricingComparison />

      {/* 5. Pricing-specific FAQ Section */}
      <FAQSection />

      {/* 6. Enterprise Contact Section */}
      <EnterpriseContact />

      {/* 7. Final Conversion Point */}
      <FinalCTA
        title="Ready to scale your business?"
        description="Join thousands of teams already growing with our platform."
        primaryButton={{ text: 'Start Free Trial', href: '/signup' }}
        secondaryButton={{ text: 'Book Demo', href: '/contact' }}
      />
    </>
  );
};

export default PricingPageContent;
