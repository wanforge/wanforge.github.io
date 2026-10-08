import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Search } from 'lucide-react';

export interface SupportHeroProps {
  description?: string;
}

export const SupportHero: React.FC<SupportHeroProps> = ({
  description = 'Search our knowledge base or browse categories below to find answers to your questions.',
}) => {
  return (
    <Section background="gradient" padding="xl" className="relative overflow-hidden">
      <Container size="narrow" className="text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-primary">
          How can we{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
            help
          </span>{' '}
          you?
        </h1>
        <p className="text-lg md:text-xl mb-10 text-text-secondary max-w-2xl mx-auto">
          {description}
        </p>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for articles (e.g. billing, setup, api)"
            className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white dark:bg-gray-900 shadow-lg focus:ring-2 focus:ring-primary-500 text-lg"
          />
        </div>
      </Container>
    </Section>
  );
};
