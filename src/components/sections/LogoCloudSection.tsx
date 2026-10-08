import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { LogoCloud } from '@/components/ui/LogoCloud';
import { Section } from '@/components/ui/Section';
import { integrations } from '@/data';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';

/**
 * Props for the LogoCloudSection component
 */
export interface LogoCloudSectionProps {
  /**
   * The title displayed above the logo cloud
   * @default "Trusted by 10,000+ companies worldwide"
   */
  title?: string;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Whether to use the marquee (infinite scroll) animation
   * @default true
   */
  marquee?: boolean;
  /**
   * HTML ID for the section
   * @default "partners"
   */
  id?: string;
}

/**
 * LogoCloudSection Component
 *
 * A full-page section displaying a cloud of partner or customer logos.
 * Features:
 * - "Trusted by" heading to build social proof
 * - Responsive logo cloud with optional marquee animation
 * - Smooth entrance animations using framer-motion
 * - Full light/dark mode support
 * - Integration with DemoLinkModal for logo clicks
 */
export const LogoCloudSection: React.FC<LogoCloudSectionProps> = ({
  title = 'Trusted by 10,000+ companies worldwide',
  className,
  marquee = true,
  id = 'partners',
}) => {
  // Use a subset of integrations for the homepage logo cloud (popular ones)
  const homeLogos = integrations
    .filter((i) => i.popular)
    .slice(0, 10)
    .map((i) => ({
      name: i.name,
      logo: i.logo,
      href: i.website,
    }));

  return (
    <Section
      className={cn('border-b border-border-default bg-bg-primary/50', className)}
      padding="md"
      id={id}
      aria-label="Partner Logos"
    >
      <Container>
        <motion.div
          initial={false}
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={PRESETS.fadeInUp as unknown as Variants}
          className="will-change-transform"
          style={{ opacity: 1 }}
        >
          <LogoCloud
            title={title}
            logos={homeLogos}
            marquee={marquee}
            duration={40}
            className="py-0"
          />
        </motion.div>
      </Container>
    </Section>
  );
};

LogoCloudSection.displayName = 'LogoCloudSection';

export default LogoCloudSection;
