import * as React from 'react';
import { type Variants, motion } from 'motion/react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Section,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { useCases } from '@/data/features';
import { PRESETS } from '@/config/animation';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

/**
 * Props for the UseCases component
 */
export interface UseCasesProps {
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * UseCases Component
 *
 * Displays different user personas and their specific use cases for the product.
 * Features:
 * - Persona-based navigation using Tabs
 * - Detailed card with title, description, and key benefits
 * - Smooth entrance and transition animations
 * - Responsive layout with mobile optimizations
 * - Theme-aware styling
 */
export const UseCases: React.FC<UseCasesProps> = ({ className }) => {
  if (!useCases || useCases.length === 0) return null;

  return (
    <Section
      id="use-cases"
      className={cn('py-20 lg:py-32', className)}
      background="muted"
      aria-label="Use Cases"
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
              Solutions for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                every team
              </span>
            </h2>
            <p className="text-lg md:text-xl text-text-muted max-w-[800px] mx-auto leading-relaxed">
              Explore how ModernSaaS empowers different teams to achieve their goals with tailored
              solutions and specialized features.
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue={useCases[0]?.id || ''} className="w-full">
          {/* Persona Selection */}
          <motion.div
            initial={false}
            whileInView="animate"
            viewport={{ once: true }}
            variants={PRESETS.fadeInUp as unknown as Variants}
            className="flex justify-center mb-12 will-change-transform"
          >
            <TabsList className="flex flex-wrap justify-center h-auto p-1 bg-bg-secondary/50 backdrop-blur-sm border border-border-muted rounded-full overflow-hidden">
              {useCases.map((useCase) => (
                <TabsTrigger
                  key={useCase.id}
                  value={useCase.id}
                  className="px-6 py-2 rounded-full text-sm font-medium transition-all"
                >
                  {useCase.persona}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {/* Use Case Content */}
          {useCases.map((useCase) => (
            <TabsContent
              key={useCase.id}
              value={useCase.id}
              className="mt-0 focus-visible:outline-none"
            >
              <motion.div
                initial={false}
                animate="animate"
                variants={PRESETS.fadeIn as unknown as Variants}
                className="will-change-transform"
              >
                <Card className="max-w-4xl mx-auto border-none shadow-xl bg-bg-primary/80 backdrop-blur-md overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Main Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border-muted">
                      <CardHeader className="p-0 mb-6 border-none">
                        <CardTitle className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                          {useCase.title}
                        </CardTitle>
                        <CardDescription className="text-lg text-text-muted leading-relaxed">
                          {useCase.description}
                        </CardDescription>
                      </CardHeader>
                    </div>

                    {/* Benefits List */}
                    <div className="p-8 md:p-12 bg-primary-500/5 dark:bg-primary-500/10">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-6">
                        Key Benefits
                      </h4>
                      <ul className="space-y-4">
                        {useCase.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3 text-text-primary">
                            <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                            </div>
                            <span className="text-sm md:text-base">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  );
};

UseCases.displayName = 'UseCases';

export default UseCases;
