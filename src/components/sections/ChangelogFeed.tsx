import React from 'react';
import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { motion } from 'motion/react';
import { Bug, Calendar, TrendingUp, Zap } from 'lucide-react';
import type { ChangelogEntry, ChangelogType } from '../../data/changelog';

export interface ChangelogFeedProps {
  entries: ChangelogEntry[];
}

const TypeIcon: React.FC<{ type: ChangelogType }> = ({ type }) => {
  switch (type) {
    case 'feature':
      return <Zap className="h-4 w-4 text-info-600 dark:text-info-400" />;
    case 'improvement':
      return <TrendingUp className="h-4 w-4 text-success-600 dark:text-success-400" />;
    case 'fix':
      return <Bug className="h-4 w-4 text-error-600 dark:text-error-400" />;
    default:
      return null;
  }
};

const TypeBadge: React.FC<{ type: ChangelogType }> = ({ type }) => {
  switch (type) {
    case 'feature':
      return (
        <Badge variant="info" size="sm" className="capitalize">
          Feature
        </Badge>
      );
    case 'improvement':
      return (
        <Badge variant="success" size="sm" className="capitalize">
          Improvement
        </Badge>
      );
    case 'fix':
      return (
        <Badge variant="error" size="sm" className="capitalize">
          Fix
        </Badge>
      );
    default:
      return null;
  }
};

export const ChangelogFeed: React.FC<ChangelogFeedProps> = ({ entries }) => {
  return (
    <Section padding="lg">
      <Container size="narrow">
        <div className="space-y-16">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.version}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-0 will-change-transform"
            >
              {/* Timeline Connector */}
              {index !== entries.length - 1 && (
                <div className="absolute left-[11px] md:left-1/2 top-8 bottom-[-4rem] w-px bg-border-default md:-ml-px hidden md:block" />
              )}

              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Version & Date (Left on Desktop) */}
                <div className="md:text-right md:pr-12 pt-1">
                  <div className="flex items-center md:justify-end gap-3 mb-2">
                    <span className="text-2xl font-bold text-text-primary">v{entry.version}</span>
                    <div className="h-6 w-px bg-border-default md:hidden" />
                    <div className="flex items-center gap-1.5 text-text-muted text-sm md:hidden">
                      <Calendar className="h-4 w-4" />
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-end gap-2 text-text-muted">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={entry.date}>
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </div>

                {/* Timeline Dot (Center on Desktop) */}
                <div className="absolute left-0 md:left-1/2 top-2 md:-ml-[11px] flex items-center justify-center">
                  <div className="h-[22px] w-[22px] rounded-full border-4 border-bg-primary bg-primary-600 z-10" />
                </div>

                {/* Content (Right on Desktop) */}
                <div className="md:pl-12">
                  {entry.title && (
                    <h2 className="text-xl font-semibold mb-4 text-text-primary">{entry.title}</h2>
                  )}
                  <div className="space-y-6">
                    {entry.items.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="mt-1 shrink-0">
                          <TypeIcon type={item.type} />
                        </div>
                        <div>
                          <div className="mb-1">
                            <TypeBadge type={item.type} />
                          </div>
                          <p className="text-text-secondary leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
