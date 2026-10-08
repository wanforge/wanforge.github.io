import React from 'react';
import { Section } from '../ui/Section';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import type { RoadmapQuarter, RoadmapStatus } from '../../data/roadmap';

export interface RoadmapTimelineProps {
  quarters: RoadmapQuarter[];
}

const StatusIcon: React.FC<{ status: RoadmapStatus }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-success-500" />;
    case 'in-progress':
      return <Clock className="h-5 w-5 text-info-500 animate-pulse" />;
    case 'planned':
      return <Circle className="h-5 w-5 text-text-muted" />;
    default:
      return null;
  }
};

const StatusBadge: React.FC<{ status: RoadmapStatus }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return (
        <Badge variant="success" size="sm" className="capitalize">
          Completed
        </Badge>
      );
    case 'in-progress':
      return (
        <Badge variant="info" size="sm" className="capitalize">
          In Progress
        </Badge>
      );
    case 'planned':
      return (
        <Badge variant="default" size="sm" className="capitalize">
          Planned
        </Badge>
      );
    default:
      return null;
  }
};

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ quarters }) => {
  return (
    <Section padding="lg">
      <Container size="narrow">
        <div className="space-y-16">
          {quarters.map((quarter) => (
            <div key={quarter.quarter} className="relative">
              {/* Quarter Header */}
              <motion.div
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-8 will-change-transform"
              >
                <div className="h-px flex-1 bg-border-default hidden md:block" />
                <h2 className="text-2xl font-bold text-text-primary px-4 py-2 rounded-full border border-border-default bg-bg-secondary shrink-0">
                  {quarter.quarter}
                </h2>
                <div className="h-px flex-1 bg-border-default" />
              </motion.div>

              {/* Items Grid */}
              <div className="grid gap-6">
                {quarter.items.map((item, iIndex) => (
                  <motion.div
                    key={item.id}
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: iIndex * 0.1 }}
                    className="group relative bg-bg-primary border border-border-default rounded-2xl p-6 hover:shadow-lg hover:border-primary-500/30 transition-all duration-300 will-change-transform"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="mt-1 shrink-0">
                          <StatusIcon status={item.status} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-text-primary">
                              {item.title}
                            </h3>
                            <span className="text-xs font-medium text-text-muted px-2 py-0.5 rounded-full bg-bg-secondary border border-border-default">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-text-secondary leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                      <div className="shrink-0 pt-1">
                        <StatusBadge status={item.status} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
