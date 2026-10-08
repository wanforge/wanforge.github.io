import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { Container } from '@/components/ui/Container';
import { DemoLink } from '@/components/ui/DemoLink';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { ProductMockup } from '@/components/ui/ProductMockup';
import { Section } from '@/components/ui/Section';
import { Skeleton } from '@/components/ui/Skeleton';
import { SocialProofBadge } from '@/components/ui/SocialProofBadge';
import { socialProofStats, testimonials } from '@/data';
import { company } from '@/config/site';
import { ROUTES } from '@/config/paths';
import { PRESETS, STAGGER } from '@/config/animation';
import { cn } from '@/utils/cn';
import { useReducedMotion } from '@/utils/reducedMotion';

/**
 * Props for the Hero component
 */
export interface HeroProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * Hero Section Component
 *
 * The primary entrance section of the homepage designed to make a strong first impression.
 * Features:
 * - Compelling headline and subheadline from site config
 * - Dual CTAs (Primary + Demo)
 * - Animated mesh gradient background
 * - Product mockup placeholder using Skeleton loaders
 * - Integrated social proof indicators
 * - Entrance animations for all elements
 */
export const Hero: React.FC<HeroProps> = ({ className }) => {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <Section
      className={cn(
        'relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24',
        className,
      )}
      background="transparent"
      id="hero"
      aria-label="Hero Section"
      data-testid="hero-section"
    >
      {/* Background with elegant gradient */}
      <GradientBackground
        id="hero-gradient"
        variant="deep"
        intensity={0.5}
        className="opacity-50 dark:opacity-30"
        aria-label="Animated gradient background"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <motion.div
            initial={false}
            animate="animate"
            variants={
              {
                initial: PRESETS.stagger?.initial,
                animate: {
                  ...PRESETS.stagger?.animate,
                  transition: {
                    ...STAGGER.hero,
                  },
                },
              } as unknown as Variants
            }
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Social Proof Badge */}
            <SocialProofBadge
              className="mb-6"
              variant="rated"
              rating={socialProofStats.rating}
              count={socialProofStats.users}
              avatars={testimonials.slice(0, 3).map((t) => t.author.avatar || '')}
              variants={PRESETS.fadeInUp as unknown as Variants}
            />

            {/* Headline */}
            <motion.h1
              initial={false}
              animate="animate"
              variants={PRESETS.heroEntrance as unknown as Variants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6 max-w-[600px] leading-[1.1] text-gradient will-change-transform mx-auto lg:mx-0"
              data-testid="hero-headline"
            >
              Build Faster with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                {company.name}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={false}
              animate="animate"
              variants={PRESETS.fadeInUp as unknown as Variants}
              className="text-lg md:text-xl text-text-muted mb-10 max-w-[520px] leading-relaxed will-change-transform mx-auto lg:mx-0"
              data-testid="hero-description"
            >
              {company.tagline}. The all-in-one platform for scaling your business with powerful
              automation tools.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={PRESETS.fadeInUp as unknown as Variants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start"
            >
              <Link
                href={ROUTES.SIGNUP}
                variant="button"
                size="lg"
                className="px-8"
                data-testid="hero-cta-primary"
                useDemoModal={false}
              >
                Get Started
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <DemoLink href={ROUTES.FEATURES}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 bg-bg-primary/50 backdrop-blur-sm"
                  leftIcon={<Play size={18} className="fill-current" />}
                  data-testid="hero-cta-secondary"
                >
                  View Demo
                </Button>
              </DemoLink>
            </motion.div>

            {/* Secondary Social Proof */}
            <motion.div
              variants={PRESETS.fadeInUp as unknown as Variants}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Featured In
              </div>
              <div className="flex gap-6 items-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                <img
                  src="/images/publications/techcrunch.svg"
                  alt="TechCrunch"
                  className="h-6 w-auto dark:invert"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="low"
                />
                <img
                  src="/images/publications/forbes.svg"
                  alt="Forbes"
                  className="h-5 w-auto dark:invert"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="low"
                />
                <img
                  src="/images/publications/producthunt.svg"
                  alt="Product Hunt"
                  className="h-6 w-auto dark:invert"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="low"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Column - Product Mockup */}
          <div className="relative">
            <ProductMockup
              src="/images/dashboard-mockup.svg"
              alt="Platform Dashboard"
              variant="laptop"
              loading="eager"
              fetchPriority="high"
              variants={PRESETS.mockupEntrance as unknown as Variants}
              className="z-10 will-change-transform"
              initial={false}
              animate="animate"
            />

            {/* Decorative background effects - optimized for performance */}
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-primary-500/10 rounded-full -z-10 opacity-60" />
            <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-secondary-500/10 rounded-full -z-10 opacity-60" />

            {/* Floating visual elements (decorations) - optimized */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, 12, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              style={{ willChange: prefersReducedMotion ? 'auto' : 'transform' }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-bg-primary border border-border-default rounded-xl shadow-xl z-20 flex items-center justify-center p-4 hidden md:flex"
            >
              <div className="space-y-2 w-full">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-1/2 rounded" />
                  <div className="h-3 w-3 rounded-full bg-success-500" />
                </div>
                <Skeleton className="h-2 w-full rounded" />
                <Skeleton className="h-2 w-3/4 rounded" />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

Hero.displayName = 'Hero';

export default Hero;
