import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { featureStats } from '@/data';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';
import { type Locale } from '@/data/wanforge';

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
  /**
   * Optional locale for WanForge mode
   */
  locale?: Locale;
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
  title,
  subtitle,
  className,
  id = 'stats',
  locale,
}) => {
  const isWanforge = locale !== undefined;

  const displayTitle =
    title ??
    (isWanforge
      ? locale === 'id'
        ? 'Metrik Keandalan Operasional'
        : 'Operational Reliability by the Numbers'
      : 'By the numbers');

  const displaySubtitle =
    subtitle ??
    (isWanforge
      ? locale === 'id'
        ? 'Kinerja sistem yang terukur untuk mendukung stabilitas dan ketersediaan proses bisnis.'
        : 'Measurable engineering performance designed for stability and business continuity.'
      : 'Trusted by thousands of developers and teams worldwide to power their mission-critical applications.');

  const stats = isWanforge
    ? locale === 'id'
      ? [
          {
            value: 99.99,
            suffix: '%',
            label: 'Uptime SLA',
            prefix: '',
            desc: 'Ketersediaan layanan cloud dan server produksi.',
          },
          {
            value: 15,
            suffix: '+',
            label: 'Sistem Produksi',
            prefix: '',
            desc: 'Portal, EMR, dan aplikasi aktif beroperasi.',
          },
          {
            value: 50,
            suffix: 'ms',
            label: 'Latensi Respons',
            prefix: '<',
            desc: 'Waktu eksekusi query dan render antarmuka.',
          },
          {
            value: 24,
            suffix: '/7',
            label: 'Telemetri Aktif',
            prefix: '',
            desc: 'Pengawasan daemon dan integritas basis data.',
          },
        ]
      : [
          {
            value: 99.99,
            suffix: '%',
            label: 'Uptime SLA',
            prefix: '',
            desc: 'Production server availability and service uptime.',
          },
          {
            value: 15,
            suffix: '+',
            label: 'Active Systems',
            prefix: '',
            desc: 'Portals, EMRs, and ERPs deployed in production.',
          },
          {
            value: 50,
            suffix: 'ms',
            label: 'Avg Response',
            prefix: '<',
            desc: 'Optimized queries and fast edge response times.',
          },
          {
            value: 24,
            suffix: '/7',
            label: 'Active Telemetry',
            prefix: '',
            desc: 'Automated monitoring of services and database integrity.',
          },
        ]
    : featureStats.map((s) => ({
        ...s,
        desc: 'Delivering consistent value and reliability to our global user base.',
      }));

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
            {displayTitle}
          </h2>
          <p className="text-lg text-text-secondary">{displaySubtitle}</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={false}
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={PRESETS.stagger as unknown as Variants}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 will-change-transform"
        >
          {stats.map((stat, index) => (
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
                <p className="mt-2 text-sm text-text-secondary">{stat.desc}</p>
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
