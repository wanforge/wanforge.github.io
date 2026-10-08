import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Plug, Rocket, Sparkles, Workflow, Zap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { howItWorksSteps } from '@/data/how-it-works';
import { PRESETS, STAGGER } from '@/config/animation';
import { cn } from '@/utils/cn';
import { type Locale } from '@/data/wanforge';

/**
 * Map of icon names to Lucide components
 */
const IconMap = {
  Plug,
  Sparkles,
  Workflow,
  Rocket,
  Zap,
};

/**
 * Props for the HowItWorks component
 */
export interface HowItWorksProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Optional locale for WanForge mode
   */
  locale?: Locale;
}

/**
 * HowItWorks Section Component
 *
 * Explains the product onboarding/process in 3-4 simple steps.
 * Features:
 * - Numbered steps with icons
 * - Connecting line between steps (responsive)
 * - Sequential entrance animations
 * - Theme-aware styling
 */
export const HowItWorks: React.FC<HowItWorksProps> = ({ className, locale }) => {
  const isWanforge = locale !== undefined;

  const heading = isWanforge ? (
    locale === 'id' ? (
      <>
        Alur Kerja Rekayasa yang{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
          Disiplin & Terukur
        </span>
      </>
    ) : (
      <>
        Disciplined Engineering{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
          From Concept to Production
        </span>
      </>
    )
  ) : (
    <>
      Get started in{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
        minutes
      </span>
    </>
  );

  const subheading = isWanforge
    ? locale === 'id'
      ? 'Dari telaah kebutuhan operasional nyata hingga sistem beroperasi stabil di infrastruktur tim Anda.'
      : 'From real operational requirements to systems running reliably on your infrastructure.'
    : "We've designed our process to be as simple as possible. No steep learning curves or complex onboarding—just results.";

  const steps = isWanforge
    ? locale === 'id'
      ? [
          {
            number: '01',
            title: 'Analisis & Spesifikasi',
            description: 'Memahami proses operasional, model data, regulasi, dan batasan teknis secara mendalam.',
            icon: 'Plug',
          },
          {
            number: '02',
            title: 'Arsitektur & Prototipe',
            description: 'Merancang skema database, desain antarmuka responsif, dan purwarupa fungsional.',
            icon: 'Sparkles',
          },
          {
            number: '03',
            title: 'Implementasi & Validasi',
            description: 'Pengembangan terarah dengan pengujian otomatis, linting ketat, dan review performa.',
            icon: 'Workflow',
          },
          {
            number: '04',
            title: 'Deployment & SLA',
            description: 'Rilis produksi nir-downtime, backup terjadwal, dan pemeliharaan operasional berkelanjutan.',
            icon: 'Rocket',
          },
        ]
      : [
          {
            number: '01',
            title: 'Discovery & Spec',
            description: 'Deep understanding of real operational flows, data constraints, and technical goals.',
            icon: 'Plug',
          },
          {
            number: '02',
            title: 'Architecture & Prototype',
            description: 'Designing normalized schemas, responsive tactile interfaces, and workable prototypes.',
            icon: 'Sparkles',
          },
          {
            number: '03',
            title: 'Execution & Testing',
            description: 'Disciplined development backed by automated tests, strict linting, and performance checks.',
            icon: 'Workflow',
          },
          {
            number: '04',
            title: 'Deployment & SLA',
            description: 'Zero-downtime static/container release, automated backups, and long-term stability support.',
            icon: 'Rocket',
          },
        ]
    : howItWorksSteps;

  return (
    <Section
      id={isWanforge ? 'capabilities' : 'how-it-works'}
      className={cn('py-20 lg:py-32', className)}
      background="default"
      aria-label="How It Works"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <motion.div
            initial={false}
            whileInView="animate"
            viewport={{ once: true }}
            variants={PRESETS.fadeInUp as unknown as Variants}
            className="will-change-transform"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mb-4">
              {heading}
            </h2>
            <p className="text-lg md:text-xl text-text-muted max-w-[800px] mx-auto leading-relaxed">
              {subheading}
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting line for desktop */}
          <div
            className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-border-default/50 -z-0"
            aria-hidden="true"
          />

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 will-change-transform"
            initial={false}
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={
              {
                initial: PRESETS.stagger?.initial,
                animate: {
                  ...PRESETS.stagger?.animate,
                  transition: STAGGER.default,
                },
              } as unknown as Variants
            }
          >
            {steps.map((step, index) => {
              const IconComponent = IconMap[step.icon as keyof typeof IconMap] || Zap;

              return (
                <motion.div
                  key={step.id ?? step.number ?? index}
                  className="relative flex flex-col items-center text-center group"
                  variants={PRESETS.fadeInUp as unknown as Variants}
                >
                  {/* Step Number & Icon Container */}
                  <div className="relative mb-8">
                    {/* Circle Background */}
                    <div className="w-24 h-24 rounded-full bg-bg-secondary border-2 border-border-default flex items-center justify-center text-primary-600 dark:text-primary-400 transition-colors duration-300 group-hover:border-primary-500/50 group-hover:bg-bg-primary shadow-sm relative z-10">
                      <IconComponent size={32} strokeWidth={1.5} />
                    </div>

                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm shadow-md z-20 border-4 border-bg-primary">
                      {step.number}
                    </div>

                    {/* Connecting line for mobile/tablet (vertical) */}
                    {index < howItWorksSteps.length - 1 && (
                      <div
                        className="lg:hidden absolute top-24 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-border-default/50"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="px-4">
                    <h3 className="text-xl font-bold text-text-primary mb-3">{step.title}</h3>
                    <p className="text-text-muted leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

HowItWorks.displayName = 'HowItWorks';

export default HowItWorks;
