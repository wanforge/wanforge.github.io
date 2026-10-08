import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Container, GradientBackground, LazyImage, Section } from '@/components/ui';
import { PRESETS } from '@/config/animation';
import { company } from '@/config/site';
import { getAssetPath } from '@/config/paths';
import { cn } from '@/utils/cn';

/**
 * Props for the CompanyStory component
 */
export interface CompanyStoryProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * CompanyStory Section Component
 *
 * This component implements both the About Hero (Mission) and the
 * Company Story (Origin & Vision) sections as defined in the
 * about page wireframes.
 *
 * Features:
 * - High-impact mission statement with animated background
 * - Split-layout origin story with image placeholder
 * - Vision and current state subsections
 * - Responsive design (stacked on mobile, side-by-side on desktop)
 * - Theme-aware styling for light and dark modes
 */
export const CompanyStory: React.FC<CompanyStoryProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* About Hero Section (Mission) */}
      <Section
        id="about-hero"
        className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
        background="transparent"
        aria-label="About Hero - Our Mission"
      >
        <GradientBackground
          id="about-hero-gradient"
          variant="minimal"
          intensity={0.3}
          className="opacity-40 dark:opacity-20"
        />

        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={false}
              animate="animate"
              variants={PRESETS.fadeInUp as unknown as Variants}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">
                Our Mission
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-8 leading-[1.1]">
                Empowering teams to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                  achieve more
                </span>
              </h1>
              <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-3xl mx-auto">
                {company.fullDescription}
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Company Story Section (Origin, Today, Future) */}
      <Section
        id="company-story"
        className="py-16 lg:py-24 overflow-hidden"
        background="default"
        aria-label="Company Story - Our Journey"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left Column: Image */}
            <motion.div
              initial={false}
              whileInView="animate"
              viewport={{ once: true, margin: '-100px' }}
              variants={PRESETS.fadeInRight as unknown as Variants}
              className="relative aspect-[5/6] w-full max-w-[500px] mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-bg-secondary border border-border-default shadow-lg will-change-transform"
              style={{ opacity: 1 }}
            >
              <LazyImage
                src={getAssetPath('images/team/person-01.jpg')}
                alt="Our team working together"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
                loading="lazy"
                aspectRatio="5/6"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>

            {/* Right Column: Text Content */}
            <motion.div
              initial={false}
              whileInView="animate"
              viewport={{ once: true, margin: '-100px' }}
              variants={PRESETS.fadeInLeft as unknown as Variants}
              className="flex flex-col items-center text-center lg:items-start lg:text-left will-change-transform"
              style={{ opacity: 1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
                Where We Started
              </h2>

              <div className="space-y-6 text-text-muted leading-relaxed max-w-2xl lg:max-w-none">
                <p>
                  Founded in {company.foundedYear}, we set out to solve a simple problem: making
                  collaboration effortless for remote teams. What started as a weekend project
                  between two friends has grown into a platform used by thousands of companies
                  worldwide.
                </p>
                <p>
                  Our journey began with a focus on simplicity and accessibility. We believed that
                  enterprise-grade tools shouldn&apos;t be restricted to large corporations with
                  massive budgets.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">Today</h3>
                  <p className="text-text-muted leading-relaxed">
                    We&apos;re a team of passionate individuals across 12 countries, united by a
                    shared vision of democratizing access to intelligent automation tools.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">The Future</h3>
                  <p className="text-text-muted leading-relaxed">{company.vision}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

CompanyStory.displayName = 'CompanyStory';

export default CompanyStory;
