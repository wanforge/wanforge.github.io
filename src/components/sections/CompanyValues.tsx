import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Heart, type LucideIcon, Shield, Sparkles, Users, Zap } from 'lucide-react';
import { Container, FeatureCard, Section } from '@/components/ui';
import { companyValues } from '@/data/team';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';

/**
 * Icon Map for Lucide icons
 */
const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Zap,
  Shield,
  Sparkles,
  Heart,
};

/**
 * Props for the CompanyValues component
 */
export interface CompanyValuesProps {
  /**
   * The title displayed above the values grid
   * @default "Our Core Values"
   */
  title?: string;
  /**
   * The subtitle displayed above the values grid
   * @default "The principles that guide everything we do, from building products to supporting our customers."
   */
  subtitle?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * HTML ID for the section
   * @default "values"
   */
  id?: string;
}

/**
 * CompanyValues Component
 *
 * A section displaying company core values in a responsive grid.
 * Features:
 * - Responsive grid layout
 * - Staggered entrance animations
 * - Theme-aware styling using FeatureCard
 */
export const CompanyValues: React.FC<CompanyValuesProps> = ({
  title = 'Our Core Values',
  subtitle = 'The principles that guide everything we do, from building products to supporting our customers.',
  className,
  id = 'values',
}) => {
  return (
    <Section
      className={cn('bg-bg-secondary', className)}
      padding="lg"
      id={id}
      heading={title}
      subheading={subtitle}
      aria-label="Our Core Values"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {companyValues.map((value, index) => {
            const IconComponent = ICON_MAP[value.icon] || Sparkles;

            return (
              <motion.div
                key={value.id}
                initial={false}
                whileInView="animate"
                viewport={{ once: true, margin: '-50px' }}
                className="will-change-transform"
                variants={
                  {
                    initial: PRESETS.fadeInUp?.initial,
                    animate: {
                      ...PRESETS.fadeInUp?.animate,
                      transition: {
                        delay: index * 0.1,
                        duration: 0.5,
                      },
                    },
                  } as unknown as Variants
                }
              >
                <FeatureCard
                  icon={<IconComponent className="w-6 h-6" />}
                  title={value.title}
                  description={value.description}
                  hover
                  className="bg-bg-primary h-full"
                />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

CompanyValues.displayName = 'CompanyValues';

export default CompanyValues;
