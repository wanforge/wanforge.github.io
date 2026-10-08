import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Container, GradientBackground, Section } from '@/components/ui';
import { PRESETS } from '@/config/animation';
import { pageSEO } from '@/config/site';
import { cn } from '@/utils/cn';

/**
 * Props for the FeaturesHero component
 */
export interface FeaturesHeroProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * FeaturesHero Section Component
 *
 * The hero section for the Features page, providing a high-level overview
 * of the product's capabilities and value proposition.
 *
 * Features:
 * - High-impact typography with gradient accents
 * - Responsive container with centered alignment
 * - Subtle animated mesh gradient background
 * - Entrance animations using shared presets
 * - Theme-aware styling for light and dark modes
 */
export const FeaturesHero: React.FC<FeaturesHeroProps> = ({ className }) => {
  const { description } = pageSEO.features;

  return (
    <Section
      id="features-hero"
      className={cn(
        'relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden min-h-[40vh] flex items-center',
        className,
      )}
      background="transparent"
      aria-label="Features Hero Section"
    >
      {/* Background with soft gradient */}
      <GradientBackground
        id="features-hero-gradient"
        variant="soft"
        intensity={0.45}
        className="opacity-60 dark:opacity-40"
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={false}
            animate="animate"
            variants={PRESETS.fadeInUp as unknown as Variants}
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6 leading-[1.1]"
              data-testid="features-hero-title"
            >
              Everything you need to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                scale with confidence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted mb-8 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

FeaturesHero.displayName = 'FeaturesHero';

export default FeaturesHero;
