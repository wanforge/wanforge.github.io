import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { featureStats } from '@/data';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';

/**
 * Props for the StatsSection component
 */
export interface StatsSectionProps {
  /**
   * The heading displayed above the stats grid
   */
  title?: string;
  /**
   * The subheading displayed above the stats grid
   */
  subtitle?: string;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * HTML ID for the section
   * @default "stats"
   */
  id?: string;
}

/**
 * StatsSection Component
 *
 * A full-page section displaying key product metrics and statistics.
 * Features:
 * - Animated count-up effects using AnimatedCounter
 * - Responsive 4-column grid layout
 * - Scroll-triggered entrance animations for cards
 * - Theme-aware design with subtle glassmorphism
 */
export const StatsSection: React.FC<StatsSectionProps> = ({
  title = 'By the numbers',
  subtitle = 'Trusted by thousands of developers and teams worldwide to power their mission-critical applications.',
  className,
  id = 'stats',
}) => {
  return (
    <Section
      className={cn('bg-bg-primary', className)}
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
          {featureStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={PRESETS.fadeInUp as unknown as Variants}
              className="group relative overflow-hidden rounded-2xl border border-border-default bg-bg-secondary p-8 transition-colors hover:border-brand-primary/50"
            >
              {/* Decorative Background Blur */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-primary/5 blur-2xl transition-all group-hover:bg-brand-primary/10" />

              <div className="relative z-10">
                <div className="mb-2 flex items-baseline gap-1">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.value % 1 !== 0 ? 2 : 0}
                    className="text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl"
                  />
                </div>
                <div className="text-lg font-semibold text-text-primary">{stat.label}</div>
                {/* Add a generic description since featureStats doesn't have one, or just keep it clean */}
                <p className="mt-2 text-sm text-text-secondary">
                  Delivering consistent value and reliability to our global user base.
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};

StatsSection.displayName = 'StatsSection';

export default StatsSection;
