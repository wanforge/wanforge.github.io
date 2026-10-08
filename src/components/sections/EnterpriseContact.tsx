import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Check, FileText, Headphones, Settings, Shield } from 'lucide-react';
import { ButtonGroup, Container, DemoLinkButton, Section } from '@/components/ui';
import { enterpriseFeatures } from '@/data/pricing';
import { ROUTES } from '@/config/paths';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';

/**
 * Icon map for enterprise features
 */
const ICON_MAP = {
  Shield,
  Headphones,
  Settings,
  FileText,
};

/**
 * Props for the EnterpriseContact component
 */
export interface EnterpriseContactProps {
  /**
   * Section title
   * @default "Need something more?"
   */
  title?: string;
  /**
   * Section description
   * @default "Our enterprise-ready features and dedicated support team are here to help your large organization scale with confidence."
   */
  description?: string;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * HTML ID for the section
   * @default "enterprise"
   */
  id?: string;
}

/**
 * EnterpriseContact Section Component
 *
 * A specialized section for the Pricing page that highlights enterprise capabilities
 * and provides a clear call-to-action for high-volume customers.
 *
 * Features:
 * - Dynamic enterprise feature highlights from pricing data
 * - "Contact Sales" primary CTA with DemoLink integration
 * - Staggered entrance animations
 * - Responsive layout for features grid
 * - Theme-aware styling with distinct background
 */
export const EnterpriseContact: React.FC<EnterpriseContactProps> = ({
  title = 'Need something more?',
  description = 'Our enterprise-ready features and dedicated support team are here to help your large organization scale with confidence.',
  className,
  id = 'enterprise',
}) => {
  return (
    <Section
      id={id}
      className={cn('bg-bg-secondary overflow-hidden', className)}
      padding="lg"
      aria-labelledby={`${id}-heading`}
    >
      <Container className="relative">
        {/* Background Decorative Element */}
        <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-brand-secondary/5 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Content & CTA */}
          <motion.div
            initial={false}
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={PRESETS.fadeInUp as unknown as Variants}
            className="will-change-transform"
          >
            <h2
              id={`${id}-heading`}
              className="mb-6 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
            >
              {title}
            </h2>
            <p className="mb-8 text-lg text-text-secondary leading-relaxed max-w-xl">
              {description}
            </p>

            <ButtonGroup stackOnMobile className="mt-8">
              <DemoLinkButton href={ROUTES.CONTACT} forceDemo size="lg">
                Contact Sales
              </DemoLinkButton>
              <DemoLinkButton href={ROUTES.CONTACT} forceDemo variant="outline" size="lg">
                Schedule a Demo
              </DemoLinkButton>
            </ButtonGroup>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                <Check className="h-5 w-5 text-brand-primary" />
                <span>Custom SLAs</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                <Check className="h-5 w-5 text-brand-primary" />
                <span>On-premise Options</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                <Check className="h-5 w-5 text-brand-primary" />
                <span>Compliance Certs</span>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={false}
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={PRESETS.stagger as unknown as Variants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 will-change-transform"
          >
            {enterpriseFeatures.map((feature, index) => {
              const IconComponent = ICON_MAP[feature.icon as keyof typeof ICON_MAP] || Settings;
              return (
                <motion.div
                  key={index}
                  variants={PRESETS.fadeInUp as unknown as Variants}
                  className="rounded-2xl border border-border-default bg-bg-primary p-6 transition-all hover:border-brand-primary/50 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-bold text-text-primary">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

EnterpriseContact.displayName = 'EnterpriseContact';

export default EnterpriseContact;
