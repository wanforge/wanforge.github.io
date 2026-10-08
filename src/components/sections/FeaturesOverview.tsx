import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import {
  BarChart,
  Clock,
  Cloud,
  Code,
  Database,
  Globe,
  Layers,
  LineChart,
  Lock,
  Plug,
  Rocket,
  Settings,
  Shield,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import { BentoGrid, BentoGridItem, Container, Section } from '@/components/ui';
import { featuresOverview } from '@/data/features';
import { PRESETS, STAGGER } from '@/config/animation';
import { cn } from '@/utils/cn';

/**
 * Map of icon names to Lucide components
 */
const IconMap = {
  Zap,
  Shield,
  BarChart,
  Globe,
  Layers,
  Lock,
  Sparkles,
  Workflow,
  Code,
  Database,
  Cloud,
  Smartphone,
  Users,
  Plug,
  Clock,
  LineChart,
  Settings,
  Rocket,
};

/**
 * Props for the FeaturesOverview component
 */
export interface FeaturesOverviewProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * FeaturesOverview Section Component
 *
 * Displays key product features in a modern bento grid layout.
 * Features:
 * - Responsive 3-column grid (staggered on mobile)
 * - Staggered entrance animations
 * - Theme-aware styling
 * - Integrated with placeholder feature data
 */
export const FeaturesOverview: React.FC<FeaturesOverviewProps> = ({ className }) => {
  return (
    <Section
      id="features"
      className={cn('py-20 lg:py-32', className)}
      background="muted"
      aria-label="Features Overview"
      data-testid="features-section"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <motion.div
            initial={false}
            whileInView="animate"
            viewport={{ once: true }}
            variants={PRESETS.fadeInUp as unknown as Variants}
            className="will-change-transform"
            style={{ opacity: 1 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mb-4">
              Everything you need to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                scale your business
              </span>
            </h2>
            <p className="text-lg md:text-xl text-text-muted max-w-[800px] mx-auto leading-relaxed">
              Our comprehensive suite of tools is designed to help you automate workflows, secure
              your data, and gain actionable insights at every step.
            </p>
          </motion.div>
        </div>

        {/* Features Bento Grid */}
        <motion.div
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
          className="will-change-transform"
          style={{ opacity: 1 }}
        >
          <BentoGrid cols={3} gap={6}>
            {featuresOverview.map((feature, index) => {
              const IconComponent = IconMap[feature.icon as keyof typeof IconMap] || Zap;

              // Assign different colSpans for a more dynamic bento look
              // 1st and 6th items span 2 columns on large screens
              const colSpan = index === 0 || index === 5 ? 2 : 1;

              return (
                <motion.div
                  key={feature.id}
                  variants={PRESETS.fadeInUp as unknown as Variants}
                  className={cn(colSpan === 2 ? 'lg:col-span-2' : 'lg:col-span-1')}
                >
                  <BentoGridItem
                    title={feature.title}
                    description={feature.description}
                    icon={<IconComponent size={24} />}
                    className="h-full"
                    // We manually apply colSpan class to the motion.div wrapper
                    // since BentoGridItem's colSpan prop might conflict with our motion wrapper
                  />
                </motion.div>
              );
            })}
          </BentoGrid>
        </motion.div>
      </Container>
    </Section>
  );
};

FeaturesOverview.displayName = 'FeaturesOverview';

export default FeaturesOverview;
