/**
 * Roadmap Data
 *
 * Placeholder data for the product roadmap.
 */

export type RoadmapStatus = 'completed' | 'in-progress' | 'planned';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  category: string;
}

export interface RoadmapQuarter {
  quarter: string;
  items: RoadmapItem[];
}

export const roadmapData: RoadmapQuarter[] = [
  {
    quarter: 'Q4 2025',
    items: [
      {
        id: 'r1',
        title: 'Public Beta Launch',
        description: 'Initial release of the core platform to our early access waitlist.',
        status: 'completed',
        category: 'Infrastructure',
      },
      {
        id: 'r2',
        title: 'Mobile App (iOS & Android)',
        description: 'Native mobile applications for on-the-go management and notifications.',
        status: 'completed',
        category: 'Mobile',
      },
      {
        id: 'r3',
        title: 'Stripe Integration',
        description: 'Full subscription management and billing system integration.',
        status: 'completed',
        category: 'Payments',
      },
    ],
  },
  {
    quarter: 'Q1 2026',
    items: [
      {
        id: 'r4',
        title: 'AI Automation Engine',
        description: 'Advanced rule-based workflows powered by our proprietary AI models.',
        status: 'in-progress',
        category: 'AI/ML',
      },
      {
        id: 'r5',
        title: 'Team Collaboration Hub',
        description: 'Real-time multi-user editing and presence indicators for shared projects.',
        status: 'in-progress',
        category: 'Collaboration',
      },
      {
        id: 'r6',
        title: 'Advanced Analytics Dashboard',
        description: 'Deep-dive metrics and custom reporting tools for power users.',
        status: 'in-progress',
        category: 'Analytics',
      },
    ],
  },
  {
    quarter: 'Q2 2026',
    items: [
      {
        id: 'r7',
        title: 'API Developer Portal',
        description: 'Comprehensive documentation and tools for third-party integrations.',
        status: 'planned',
        category: 'Ecosystem',
      },
      {
        id: 'r8',
        title: 'SSO & Enterprise Security',
        description: 'SAML, SCIM, and advanced security controls for larger organizations.',
        status: 'planned',
        category: 'Security',
      },
      {
        id: 'r9',
        title: 'Marketplace Launch',
        description: 'Third-party extensions and community-built templates.',
        status: 'planned',
        category: 'Ecosystem',
      },
    ],
  },
  {
    quarter: 'Q3 2026',
    items: [
      {
        id: 'r10',
        title: 'Custom Domain Support',
        description: 'Ability to map your own domains to your generated projects.',
        status: 'planned',
        category: 'Platform',
      },
      {
        id: 'r11',
        title: 'Global Edge Network',
        description: 'Deploying our infrastructure to 50+ regions for ultra-low latency.',
        status: 'planned',
        category: 'Infrastructure',
      },
    ],
  },
];

export const roadmapMetadata = {
  title: 'Product Roadmap',
  subheading:
    'A transparent look at where we are and where we are going. Subject to change as we learn from our users.',
} as const;
