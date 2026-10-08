import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ChevronRight, FileText } from 'lucide-react';
import { type SupportArticle, popularArticles } from '@/data/support';

export interface SupportArticlesProps {
  articles?: SupportArticle[];
  title?: string;
}

export const SupportArticles: React.FC<SupportArticlesProps> = ({
  articles = popularArticles,
  title = 'Popular Articles',
}) => {
  return (
    <Section background="muted" padding="lg">
      <Container size="narrow">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <div className="space-y-4">
          {articles.map((article) => (
            <a
              key={article.id}
              id={`article-${article.id}`}
              href={`#article-${article.id}`}
              className="flex items-center justify-between p-5 rounded-xl border border-border-default bg-bg-primary hover:border-primary-500/50 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-bg-secondary text-text-tertiary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Updated{' '}
                    {new Date(article.updatedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-text-muted group-hover:text-primary-500 transform group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
};
