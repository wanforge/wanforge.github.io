import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ArrowRight, CreditCard, HelpCircle, Layers, Rocket, Shield, Zap } from 'lucide-react';
import { type SupportCategory, supportCategories } from '@/data/support';
import { cn } from '@/utils/cn';

const IconMap: Record<string, React.ElementType> = {
  rocket: Rocket,
  'credit-card': CreditCard,
  zap: Zap,
  layers: Layers,
  shield: Shield,
  'help-circle': HelpCircle,
};

export interface SupportCategoriesProps {
  categories?: SupportCategory[];
}

export const SupportCategories: React.FC<SupportCategoriesProps> = ({
  categories = supportCategories,
}) => {
  return (
    <Section padding="lg">
      <Container>
        <h2 className="sr-only">Support Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = IconMap[category.icon] || HelpCircle;
            return (
              <a
                key={category.id}
                id={category.id}
                href={`#${category.id}`}
                className={cn(
                  'group p-6 rounded-2xl border border-border-default bg-bg-secondary',
                  'hover:border-primary-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary-500/10 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-text-secondary mb-4">{category.description}</p>
                    <div className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
                      <span>{category.articleCount} articles</span>
                      <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
