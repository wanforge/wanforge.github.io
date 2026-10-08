import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RoadmapHero } from '../components/sections/RoadmapHero';
import { RoadmapTimeline } from '../components/sections/RoadmapTimeline';
import { roadmapData, roadmapMetadata } from '../data/roadmap';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props}>{children}</p>
    ),
  },
}));

describe('Roadmap Components', () => {
  describe('RoadmapHero', () => {
    it('renders the title and subheading', () => {
      render(<RoadmapHero title={roadmapMetadata.title} subheading={roadmapMetadata.subheading} />);

      expect(screen.getByText(roadmapMetadata.title)).toBeInTheDocument();
      expect(screen.getByText(roadmapMetadata.subheading)).toBeInTheDocument();
    });
  });

  describe('RoadmapTimeline', () => {
    it('renders all quarters from the data', () => {
      render(<RoadmapTimeline quarters={roadmapData} />);

      roadmapData.forEach((quarter) => {
        expect(screen.getByText(quarter.quarter)).toBeInTheDocument();
      });
    });

    it('renders all roadmap items with titles and descriptions', () => {
      render(<RoadmapTimeline quarters={roadmapData} />);

      roadmapData.forEach((quarter) => {
        quarter.items.forEach((item) => {
          expect(screen.getByText(item.title)).toBeInTheDocument();
          expect(screen.getByText(item.description)).toBeInTheDocument();
          // Categories might be duplicated, so we check if at least one exists
          expect(screen.getAllByText(item.category).length).toBeGreaterThan(0);
        });
      });
    });

    it('renders status indicators/badges for items', () => {
      render(<RoadmapTimeline quarters={roadmapData} />);

      // Check for some expected status badges
      expect(screen.getAllByText(/Completed/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/In Progress/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Planned/i).length).toBeGreaterThan(0);
    });
  });
});
