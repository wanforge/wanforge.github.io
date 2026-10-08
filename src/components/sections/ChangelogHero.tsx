import React from 'react';
import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { FileText } from 'lucide-react';

export interface ChangelogHeroProps {
  title?: string;
  description?: string;
}

/**
 * ChangelogHero Component
 *
 * A stable, production-grade hero section for the Changelog page.
 * Uses CSS animations instead of JS animations to ensure content is always
 * visible even if JavaScript fails to load or hydrate.
 *
 * Key Design Decisions:
 * - Content is visible by default (no opacity: 0 initial state)
 * - CSS animations with animation-delay for staggered reveal
 * - Graceful degradation: if animations fail, content remains visible
 * - No Framer Motion initial states that could hide content
 * - Added FileText icon for visual consistency with other hero sections
 */
export const ChangelogHero: React.FC<ChangelogHeroProps> = ({
  title = 'Changelog',
  description = 'Stay up to date with the latest features, improvements, and fixes to ModernSaaS.',
}) => {
  return (
    <Section background="gradient" padding="xl" className="relative overflow-hidden">
      <Container size="narrow" className="text-center relative z-10">
        {/* Changelog Icon Badge - CSS animated, always visible */}
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6 changelog-fade-in"
          style={{ animationDelay: '0ms' }}
        >
          <FileText className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>

        {/* Title - CSS animated, always visible */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-primary changelog-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          Product{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
            {title}
          </span>
        </h1>

        {/* Description - CSS animated, always visible */}
        <p
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto changelog-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          {description}
        </p>
      </Container>

      {/* CSS Animations - injected inline for component encapsulation */}
      <style>{`
        @keyframes changelogFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes changelogFadeInUp {
          from {
            opacity: 0.5;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .changelog-fade-in {
          opacity: 1;
          animation: changelogFadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--animation-delay, 0ms);
        }

        .changelog-fade-in-up {
          opacity: 1;
          animation: changelogFadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--animation-delay, 0ms);
        }

        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .changelog-fade-in,
          .changelog-fade-in-up {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </Section>
  );
};

export default ChangelogHero;
