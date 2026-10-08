/**
 * Changelog Data
 *
 * Placeholder data for the product changelog.
 */

export type ChangelogType = 'feature' | 'improvement' | 'fix';

export interface ChangelogItem {
  type: ChangelogType;
  description: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  title?: string;
  items: ChangelogItem[];
}

export const changelogEntries: ChangelogEntry[] = [
  {
    version: '1.2.0',
    date: '2026-02-05',
    title: 'Advanced Analytics & Team Collaboration',
    items: [
      {
        type: 'feature',
        description:
          'New Real-time Analytics Dashboard with customizable widgets and export capabilities.',
      },
      {
        type: 'feature',
        description: 'Multi-player editing for shared automation flows with presence indicators.',
      },
      {
        type: 'improvement',
        description:
          'Enhanced search performance in the dashboard by 40% using new indexing strategy.',
      },
      {
        type: 'fix',
        description:
          'Resolved a bug where some dark mode icons were low contrast in high-intensity light environments.',
      },
    ],
  },
  {
    version: '1.1.5',
    date: '2026-01-20',
    items: [
      {
        type: 'improvement',
        description:
          'Upgraded all internal AI models to GPT-5 Turbo for faster and more accurate text generation.',
      },
      {
        type: 'improvement',
        description:
          'Streamlined the onboarding flow for new team members with a guided interactive tour.',
      },
      {
        type: 'fix',
        description:
          'Fixed an issue with stripe checkout redirection for certain European bank accounts.',
      },
    ],
  },
  {
    version: '1.1.0',
    date: '2025-12-15',
    title: 'The Automation Update',
    items: [
      {
        type: 'feature',
        description:
          'New workflow automation engine with over 50 pre-built templates for common tasks.',
      },
      {
        type: 'feature',
        description: 'Native Discord and Slack integrations for real-time notification alerts.',
      },
      {
        type: 'fix',
        description:
          'Corrected typography alignment issues in the pricing table on tablet devices.',
      },
    ],
  },
  {
    version: '1.0.0',
    date: '2025-11-01',
    title: 'Public Launch',
    items: [
      {
        type: 'feature',
        description:
          'Initial public release of ModernSaaS with core dashboard, user auth, and basic analytics.',
      },
      {
        type: 'feature',
        description: 'Dark mode support implemented across the entire application.',
      },
    ],
  },
];

export const changelogMetadata = {
  title: 'Changelog',
  subheading: 'Stay up to date with the latest features, improvements, and fixes to ModernSaaS.',
} as const;
