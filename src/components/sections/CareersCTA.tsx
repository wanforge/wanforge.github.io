import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { DemoLinkButton } from '@/components/ui/DemoLink';
import { FadeInUp, StaggerContainer } from '@/components/animation/AnimatedElement';
import { Globe, Rocket, TrendingUp, Users } from 'lucide-react';
import { ROUTES } from '@/config/paths';
import { cn } from '@/utils/cn';

/**
 * Props for the CareersCTA component
 */
export interface CareersCTAProps {
  /** Section title override */
  title?: string;
  /** Section description override */
  description?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Benefit item for the careers section
 */
interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefits: BenefitItem[] = [
  {
    icon: Globe,
    title: 'Remote First',
    description: 'Work from anywhere in the world. We believe in results, not clock-ins.',
  },
  {
    icon: TrendingUp,
    title: 'Competitive Equity',
    description: 'Everyone is an owner. We offer generous equity packages to all employees.',
  },
  {
    icon: Rocket,
    title: 'Growth Opportunities',
    description: 'Fast-track your career with clear paths for advancement and learning.',
  },
];

/**
 * CareersCTA Section Component
 *
 * A highlighted call-to-action section for recruitment.
 * Displays company culture benefits and a link to open positions.
 */
export const CareersCTA: React.FC<CareersCTAProps> = ({
  title = 'Join Our Team',
  description = "We're always looking for passionate people to join us on our mission to transform how teams work together.",
  className,
}) => {
  return (
    <Section
      id="careers-cta"
      background="primary"
      padding="xl"
      className={cn('relative overflow-hidden', className)}
      aria-label="Careers Call to Action"
    >
      <Container size="narrow" className="relative z-10 text-center">
        <StaggerContainer
          childPreset="fadeInUp"
          staggerDelay={0.15}
          triggerOnView
          className="flex flex-col items-center"
        >
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6 border border-primary-200 dark:border-primary-800">
              <Users size={16} />
              <span>We're Hiring!</span>
            </div>
          </FadeInUp>

          <FadeInUp>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-6">
              {title}
            </h2>
          </FadeInUp>

          <FadeInUp>
            <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">{description}</p>
          </FadeInUp>

          <FadeInUp className="w-full max-w-4xl mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 rounded-2xl bg-bg-primary/50 backdrop-blur-sm border border-border-default shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mb-4">
                    <benefit.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{benefit.title}</h3>
                  <p className="text-sm text-text-secondary">{benefit.description}</p>
                </div>
              ))}
            </div>
          </FadeInUp>

          <FadeInUp>
            <DemoLinkButton href={ROUTES.CAREERS} size="lg" className="min-w-[200px]">
              View Open Positions
            </DemoLinkButton>
          </FadeInUp>
        </StaggerContainer>
      </Container>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
    </Section>
  );
};

export default CareersCTA;
