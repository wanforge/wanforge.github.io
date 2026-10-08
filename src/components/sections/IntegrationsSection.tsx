import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { IntegrationLogo } from '@/components/ui/IntegrationLogo';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/ui/Section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { integrationCategories, integrations } from '@/data/integrations';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/config/paths';

/**
 * Props for the IntegrationsSection component
 */
export interface IntegrationsSectionProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Whether to show category filters
   * @default true
   */
  showFilters?: boolean;
  /**
   * Maximum number of integrations to show initially
   * @default 12
   */
  limit?: number;
}

/**
 * IntegrationsSection Component
 *
 * Displays a grid of integration logos with category filtering.
 * Features:
 * - Category-based filtering using Tabs
 * - Smooth entrance and filter animations
 * - Integration with DemoLinkModal for each logo
 * - Responsive grid layout
 * - Theme-aware styling
 */
export const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({
  className,
  showFilters = true,
  limit = 12,
}) => {
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  // Filter function for integrations
  const getFilteredIntegrations = (category: string) => {
    const filtered =
      category === 'all' ? integrations : integrations.filter((item) => item.category === category);

    return filtered.slice(0, limit);
  };

  return (
    <Section
      id="integrations"
      className={cn('py-20 lg:py-32 overflow-hidden', className)}
      background="default"
      aria-label="Integrations"
      data-testid="integrations-section"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <motion.div
            initial={false}
            whileInView="animate"
            viewport={{ once: true }}
            variants={PRESETS.fadeInUp as unknown as Variants}
            className="will-change-transform"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mb-4">
              Works with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                your stack
              </span>
            </h2>
            <p className="text-lg md:text-xl text-text-muted max-w-[800px] mx-auto leading-relaxed">
              ModernSaaS seamlessly integrates with the tools you already use. Connect your workflow
              and automate your processes in minutes.
            </p>
          </motion.div>
        </div>

        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          {/* Category Filters */}
          {showFilters && (
            <motion.div
              initial={false}
              whileInView="animate"
              viewport={{ once: true }}
              variants={PRESETS.fadeInUp as unknown as Variants}
              className="flex justify-center mb-12 will-change-transform"
            >
              <TabsList className="flex flex-wrap justify-center h-auto p-1 bg-bg-secondary/50 backdrop-blur-sm border border-border-muted rounded-full">
                <TabsTrigger
                  value="all"
                  className="px-6 py-2 rounded-full text-sm font-medium transition-all"
                >
                  All
                </TabsTrigger>
                {integrationCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="px-6 py-2 rounded-full text-sm font-medium transition-all"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>
          )}

          {/* Integrations Content */}
          <div className="min-h-[400px]">
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
                {getFilteredIntegrations('all').map((integration) => (
                  <IntegrationLogo
                    key={integration.id}
                    name={integration.name}
                    logo={integration.logo}
                    href={integration.website}
                    size="md"
                    colored={true}
                    className="w-full aspect-square max-w-[160px] bg-bg-secondary/30 border border-border-muted/50 hover:border-primary-500/30 transition-colors"
                  />
                ))}
              </div>
            </TabsContent>

            {integrationCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
                  {getFilteredIntegrations(category.id).map((integration) => (
                    <IntegrationLogo
                      key={integration.id}
                      name={integration.name}
                      logo={integration.logo}
                      href={integration.website}
                      size="md"
                      colored={true}
                      className="w-full aspect-square max-w-[160px] bg-bg-secondary/30 border border-border-muted/50 hover:border-primary-500/30 transition-colors"
                    />
                  ))}
                </div>
                {getFilteredIntegrations(category.id).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-text-muted">No integrations found in this category.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </div>
        </Tabs>

        {/* View All Button (Optional) */}
        {integrations.length > limit && activeCategory === 'all' && (
          <motion.div
            initial={false}
            whileInView="animate"
            viewport={{ once: true }}
            variants={PRESETS.fadeInUp as unknown as Variants}
            className="flex justify-center mt-12 will-change-transform"
          >
            <Link
              href={ROUTES.INTEGRATIONS}
              className="text-primary-600 dark:text-primary-400 font-semibold hover:underline flex items-center gap-2"
            >
              View all 100+ integrations
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </Container>
    </Section>
  );
};

IntegrationsSection.displayName = 'IntegrationsSection';

export default IntegrationsSection;
