import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import type { LegalSection } from '../../data/legal';

export interface LegalContentProps {
  sections: LegalSection[];
}

export const LegalContent: React.FC<LegalContentProps> = ({ sections }) => {
  return (
    <Section background="default" padding="xl">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents - Sticky on Desktop */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-24">
              <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
                Table of Contents
              </h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-text-secondary hover:text-primary-600 transition-colors text-sm"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Legal Content */}
          <div className="lg:col-span-3 prose prose-blue dark:prose-invert max-w-none">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-text-primary mb-4">{section.title}</h2>
                <div className="text-text-secondary leading-relaxed space-y-4">
                  {section.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
