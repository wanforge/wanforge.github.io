import * as React from 'react';
import {
  BarChart,
  Check,
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
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { featureDetails } from '@/data/features';
import { FadeInUp } from '@/components/animation/AnimatedElement';
import { cn } from '@/utils/cn';
import { getAssetPath } from '@/config/paths';

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
 * Props for the FeatureDetail component
 */
export interface FeatureDetailProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * FeatureDetail Section Component
 *
 * Displays detailed information about product features using alternating
 * left/right layouts for visual rhythm.
 *
 * Features:
 * - Alternating image/text layouts
 * - Scroll-triggered entrance animations
 * - Bulleted sub-features with icons
 * - Placeholder support for missing images
 * - Theme-aware styling for both light and dark modes
 */
export const FeatureDetail: React.FC<FeatureDetailProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-col', className)}>
      {featureDetails.map((feature, index) => {
        const isEven = index % 2 === 0;
        const IconComponent = IconMap[feature.icon as keyof typeof IconMap] || Zap;

        return (
          <Section
            key={feature.id}
            id={feature.id}
            background={isEven ? 'default' : 'muted'}
            className="py-16 lg:py-24 overflow-hidden"
            aria-label={`Detailed feature: ${feature.title}`}
          >
            <Container>
              <div
                className={cn(
                  'flex flex-col lg:flex-row items-center gap-12 lg:gap-20',
                  !isEven && 'lg:flex-row-reverse',
                )}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <FadeInUp triggerOnView threshold={0.2}>
                    <div className="inline-flex p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-2 shadow-sm">
                      <IconComponent size={24} aria-hidden="true" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-4">
                      {feature.title}
                    </h2>
                    <p className="text-lg text-text-muted leading-relaxed mb-6 max-w-2xl mx-auto lg:max-w-none lg:mx-0">
                      {feature.description}
                    </p>

                    {feature.subFeatures && (
                      <ul className="space-y-4 max-w-xl mx-auto lg:max-w-none lg:mx-0" role="list">
                        {feature.subFeatures.map((sub, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 justify-center lg:justify-start text-left"
                          >
                            <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                              <Check
                                size={12}
                                className="text-primary-600 dark:text-primary-400"
                                aria-hidden="true"
                              />
                            </div>
                            <span className="text-text-secondary leading-tight">{sub}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </FadeInUp>
                </div>

                {/* Illustration/Image */}
                <div className="flex-1 w-full max-w-2xl">
                  <FadeInUp triggerOnView delay={0.2} threshold={0.2}>
                    <div className="relative group">
                      {/* Decorative gradient blur background */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-2xl group-hover:opacity-100 transition-opacity opacity-0 duration-500" />

                      <div className="relative rounded-2xl border border-border-default bg-bg-secondary overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-primary-500/10 group-hover:border-primary-500/20 aspect-video">
                        {feature.image ? (
                          <img
                            src={getAssetPath(feature.image)}
                            alt={feature.imageAlt || feature.title}
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="w-full h-full bg-primary-50 dark:bg-primary-900/10 flex items-center justify-center p-8"
                            role="img"
                            aria-label={`Placeholder for ${feature.title}`}
                          >
                            <div className="w-full h-full border-2 border-dashed border-primary-200 dark:border-primary-800 rounded-xl flex items-center justify-center bg-white/50 dark:bg-black/20">
                              <IconComponent
                                size={64}
                                className="text-primary-300 dark:text-primary-700 animate-pulse opacity-50"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </FadeInUp>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}
    </div>
  );
};

FeatureDetail.displayName = 'FeatureDetail';

export default FeatureDetail;
