import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { AnimatedCounter, Container, Section } from '@/components/ui';
import { companyStats } from '@/data';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';

/**
 * Props for the AboutStats component
 */
export interface AboutStatsProps {
  /**
   * The heading displayed above the stats grid
   * @default "Company by the numbers"
   */
  title?: string;
  /**
   * The subheading displayed above the stats grid
   * @default "A look at our growth and impact as we build the future of work."
   */
  subtitle?: string;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * HTML ID for the section
   * @default "about-stats"
   */
  id?: string;
}

/**
 * AboutStats Component
 *
 * A specialized stats section for the About page.
 * Displays key company metrics with animated count-up effects.
 */
export const AboutStats: React.FC<AboutStatsProps> = ({
  title = 'Company by the numbers',
  subtitle = 'A look at our growth and impact as we build the future of work.',
  className,
  id = 'about-stats',
}) => {
  return (
    <Section
      className={cn('bg-bg-secondary/50', className)}
      padding="lg"
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        {/* Section Header */}
        <motion.div
          initial={false}
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={PRESETS.fadeInUp as unknown as Variants}
          className="mx-auto mb-16 max-w-2xl text-center will-change-transform"
        >
          <h2
            id={`${id}-heading`}
            className="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
          >
            {title}
          </h2>
          <p className="text-lg text-text-secondary">{subtitle}</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={false}
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={PRESETS.stagger as unknown as Variants}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 will-change-transform"
        >
          {companyStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={PRESETS.fadeInUp as unknown as Variants}
              className="group relative overflow-hidden rounded-2xl border border-border-default bg-bg-primary p-8 transition-all hover:border-brand-primary/50 hover:shadow-lg"
            >
              {/* Decorative background element */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-primary/5 blur-2xl transition-all group-hover:bg-brand-primary/10" />

              <div className="relative z-10">
                <div className="mb-2 flex items-baseline gap-1">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                    className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl"
                  />
                </div>
                <div className="text-lg font-semibold text-text-primary">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};

AboutStats.displayName = 'AboutStats';

export default AboutStats;
