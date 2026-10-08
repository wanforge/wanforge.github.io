import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button, ButtonGroup } from '@/components/ui/Button';
import { FadeInUp, StaggerContainer } from '@/components/animation/AnimatedElement';
import { ArrowRight, Rocket } from 'lucide-react';
import { ROUTES } from '@/config/paths';
import { company } from '@/config/site';
import { cn } from '@/utils/cn';

/**
 * Props for the FinalCTA component
 */
export interface FinalCTAProps {
  /** Section title override */
  title?: React.ReactNode;
  /** Section description override */
  description?: string;
  /** Primary button configuration */
  primaryButton?: {
    text: string;
    href: string;
  };
  /** Secondary button configuration */
  secondaryButton?: {
    text: string;
    href: string;
  };
  /** Additional CSS classes */
  className?: string;
}

/**
 * FinalCTA Section Component
 *
 * A high-impact call-to-action section that appears at the end of the homepage.
 * Features a gradient mesh background, attention-grabbing animations, and
 * clear primary/secondary CTAs.
 */
export const FinalCTA: React.FC<FinalCTAProps> = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  className,
}) => {
  return (
    <Section
      id="final-cta"
      background="gradient"
      padding="xl"
      className={cn('overflow-hidden', className)}
      aria-label="Final Call to Action"
    >
      <Container size="narrow" className="text-center relative z-10">
        <StaggerContainer
          childPreset="fadeInUp"
          staggerDelay={0.15}
          triggerOnView
          className="flex flex-col items-center"
        >
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6 border border-primary-200 dark:border-primary-800">
              <Rocket size={16} />
              <span>Ready to transform your workflow?</span>
            </div>
          </FadeInUp>

          <FadeInUp>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight mb-6">
              {title || (
                <>
                  Stop settling for slow. <br className="hidden md:block" />
                  Start building with{' '}
                  <span className="text-primary-600 dark:text-primary-400">
                    {company.name}
                  </span>{' '}
                  today.
                </>
              )}
            </h2>
          </FadeInUp>

          <FadeInUp>
            <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              {description ||
                `Join 5,000+ teams who have already optimized their processes and shipped products faster with our intelligent automation platform.`}
            </p>
          </FadeInUp>

          <FadeInUp>
            <ButtonGroup stackOnMobile fullWidthMobile className="justify-center">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={20} />}
                onClick={() => (window.location.href = primaryButton?.href || ROUTES.SIGNUP)}
              >
                {primaryButton?.text || 'Get Started for Free'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = secondaryButton?.href || ROUTES.CONTACT)}
                className="bg-bg-primary/50 backdrop-blur-sm"
              >
                {secondaryButton?.text || 'Contact Sales'}
              </Button>
            </ButtonGroup>
          </FadeInUp>

          <FadeInUp>
            <p className="mt-8 text-sm text-text-muted">
              No credit card required. 14-day free trial on all Pro features.
            </p>
          </FadeInUp>
        </StaggerContainer>
      </Container>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
    </Section>
  );
};

export default FinalCTA;
