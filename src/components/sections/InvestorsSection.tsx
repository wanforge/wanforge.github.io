import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Container, LogoCloud, Section } from '@/components/ui';
import { investors } from '@/data';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';

/**
 * Props for the InvestorsSection component
 */
export interface InvestorsSectionProps {
  /**
   * The title displayed above the logo cloud
   * @default "Backed by the world's leading investors"
   */
  title?: string;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * HTML ID for the section
   * @default "investors"
   */
  id?: string;
}

/**
 * InvestorsSection Component
 *
 * A section for the About page showcasing company investors.
 * Features:
 * - Credibility-building heading
 * - Responsive logo cloud of VC firms and partners
 * - Theme-aware styling and animations
 * - Integration with DemoLinkModal for interactions
 */
export const InvestorsSection: React.FC<InvestorsSectionProps> = ({
  title = "Backed by the world's leading investors",
  className,
  id = 'investors',
}) => {
  return (
    <Section
      className={cn('bg-bg-primary', className)}
      padding="lg"
      id={id}
      aria-label="Our Investors"
    >
      <Container>
        <motion.div
          initial={false}
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={PRESETS.fadeInUp as unknown as Variants}
          className="will-change-transform"
        >
          <LogoCloud title={title} logos={investors} marquee={false} cols={3} className="py-0" />
        </motion.div>
      </Container>
    </Section>
  );
};

InvestorsSection.displayName = 'InvestorsSection';

export default InvestorsSection;
