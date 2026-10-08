/**
 * Integration data types and placeholder data
 * Used for Integrations section and Features page
 */

import { ROUTES } from '../config/paths';

/** Integration category */
export type IntegrationCategory =
  | 'communication'
  | 'development'
  | 'design'
  | 'productivity'
  | 'analytics'
  | 'storage'
  | 'marketing'
  | 'security';

/** Individual integration */
export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  logo: string;
  popular?: boolean;
  comingSoon?: boolean;
  setupTime: string;
  features: string[];
  website: string;
}

/** Integration category metadata */
export interface IntegrationCategoryMeta {
  id: IntegrationCategory;
  label: string;
  description: string;
  icon: string;
}

// ============================================
// Placeholder Data
// ============================================

/** Integration categories with metadata */
export const integrationCategories: IntegrationCategoryMeta[] = [
  {
    id: 'communication',
    label: 'Communication',
    description: 'Connect with your team and customers',
    icon: 'MessageSquare',
  },
  {
    id: 'development',
    label: 'Development',
    description: 'Streamline your development workflow',
    icon: 'Code',
  },
  {
    id: 'design',
    label: 'Design',
    description: 'Collaborate on creative projects',
    icon: 'Palette',
  },
  {
    id: 'productivity',
    label: 'Productivity',
    description: "Boost your team's efficiency",
    icon: 'Zap',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'Track and analyze your data',
    icon: 'BarChart',
  },
  {
    id: 'storage',
    label: 'Storage',
    description: 'Sync with cloud storage providers',
    icon: 'Cloud',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Automate your marketing and lead generation',
    icon: 'Megaphone',
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Keep your data and users safe',
    icon: 'ShieldCheck',
  },
];

/** Available integrations */
export const integrations: Integration[] = [
  // Communication
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get real-time notifications and updates directly in your Slack channels.',
    category: 'communication',
    logo: '/images/integrations/slack.svg',
    popular: true,
    setupTime: '2 min',
    features: ['Real-time notifications', 'Slash commands', 'Channel sync'],
    website: 'https://slack.com',
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Connect your community and team communications with Discord integration.',
    category: 'communication',
    logo: '/images/integrations/discord.svg',
    popular: true,
    setupTime: '3 min',
    features: ['Bot integration', 'Webhook support', 'Role sync'],
    website: 'https://discord.com',
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Seamlessly integrate with Microsoft Teams for enterprise collaboration.',
    category: 'communication',
    logo: '/images/integrations/teams.svg',
    setupTime: '5 min',
    features: ['Teams notifications', 'Channel integration', 'File sharing'],
    website: 'https://microsoft.com/teams',
  },
  // Development
  {
    id: 'github',
    name: 'GitHub',
    description: 'Sync your repositories, track issues, and automate workflows with GitHub.',
    category: 'development',
    logo: '/images/integrations/github.svg',
    popular: true,
    setupTime: '3 min',
    features: ['Repo sync', 'Issue tracking', 'Pull request notifications'],
    website: 'https://github.com',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Full GitLab integration for CI/CD pipelines and repository management.',
    category: 'development',
    logo: '/images/integrations/gitlab.svg',
    setupTime: '3 min',
    features: ['CI/CD integration', 'Repository sync', 'Merge request tracking'],
    website: 'https://gitlab.com',
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Connect your project management with Jira for complete visibility.',
    category: 'development',
    logo: '/images/integrations/jira.svg',
    popular: true,
    setupTime: '5 min',
    features: ['Issue sync', 'Sprint tracking', 'Epic management'],
    website: 'https://atlassian.com/software/jira',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy and preview your applications directly from ModernSaaS.',
    category: 'development',
    logo: '/images/integrations/vercel.svg',
    popular: true,
    setupTime: '2 min',
    features: ['Auto-deployment', 'Preview links', 'Analytics sync'],
    website: 'https://vercel.com',
  },
  // Design
  {
    id: 'figma',
    name: 'Figma',
    description: 'Embed Figma designs and collaborate on UI/UX projects.',
    category: 'design',
    logo: '/images/integrations/figma.svg',
    popular: true,
    setupTime: '2 min',
    features: ['Design embedding', 'Comment sync', 'Version control'],
    website: 'https://figma.com',
  },
  {
    id: 'sketch',
    name: 'Sketch',
    description: 'Import and sync your Sketch files for design collaboration.',
    category: 'design',
    logo: '/images/integrations/sketch.svg',
    setupTime: '4 min',
    features: ['File import', 'Asset sync', 'Handoff tools'],
    website: 'https://sketch.com',
  },
  // Productivity
  {
    id: 'notion',
    name: 'Notion',
    description: 'Sync documentation and knowledge base with Notion.',
    category: 'productivity',
    logo: '/images/integrations/notion.svg',
    popular: true,
    setupTime: '3 min',
    features: ['Page sync', 'Database integration', 'Wiki connection'],
    website: 'https://notion.so',
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Streamlined issue tracking and project management with Linear.',
    category: 'productivity',
    logo: '/images/integrations/linear.svg',
    popular: true,
    setupTime: '2 min',
    features: ['Issue sync', 'Cycle tracking', 'Roadmap view'],
    website: 'https://linear.app',
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Project management integration for tracking tasks and milestones.',
    category: 'productivity',
    logo: '/images/integrations/asana.svg',
    setupTime: '4 min',
    features: ['Task sync', 'Project mapping', 'Timeline view'],
    website: 'https://asana.com',
  },
  // Analytics
  {
    id: 'segment',
    name: 'Segment',
    description: 'Unified customer data platform integration.',
    category: 'analytics',
    logo: '/images/integrations/segment.svg',
    setupTime: '5 min',
    features: ['Event tracking', 'User identification', 'Data routing'],
    website: 'https://segment.com',
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    description: 'Advanced product analytics and user behavior tracking.',
    category: 'analytics',
    logo: '/images/integrations/mixpanel.svg',
    setupTime: '4 min',
    features: ['Event analytics', 'Funnel tracking', 'Cohort analysis'],
    website: 'https://mixpanel.com',
  },
  // Storage
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Seamless file storage and sharing with Google Drive.',
    category: 'storage',
    logo: '/images/integrations/google-drive.svg',
    popular: true,
    setupTime: '2 min',
    features: ['File sync', 'Shared drives', 'Document embedding'],
    website: 'https://google.com/drive',
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Connect your Dropbox for easy file access and sharing.',
    category: 'storage',
    logo: '/images/integrations/dropbox.svg',
    setupTime: '3 min',
    features: ['File sync', 'Paper integration', 'Team folders'],
    website: 'https://dropbox.com',
  },
  {
    id: 'aws-s3',
    name: 'AWS S3',
    description: 'Enterprise-grade storage integration with Amazon S3.',
    category: 'storage',
    logo: '/images/integrations/aws.svg',
    setupTime: '10 min',
    features: ['Bucket sync', 'Access control', 'CDN integration'],
    website: 'https://aws.amazon.com/s3',
  },
  // Marketing
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Automate your email marketing and manage your audience.',
    category: 'marketing',
    logo: '/images/integrations/mailchimp.svg',
    popular: true,
    setupTime: '5 min',
    features: ['Audience sync', 'Email automation', 'Campaign tracking'],
    website: 'https://mailchimp.com',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Powerful CRM and marketing automation platform.',
    category: 'marketing',
    logo: '/images/integrations/hubspot.svg',
    popular: true,
    setupTime: '5 min',
    features: ['CRM sync', 'Lead tracking', 'Form integration'],
    website: 'https://hubspot.com',
  },
  // Security
  {
    id: 'okta',
    name: 'Okta',
    description: 'Identity and access management for your organization.',
    category: 'security',
    logo: '/images/integrations/okta.svg',
    popular: true,
    setupTime: '10 min',
    features: ['SSO integration', 'User provisioning', 'Adaptive MFA'],
    website: 'https://okta.com',
  },
  {
    id: 'auth0',
    name: 'Auth0',
    description: 'Adaptable authentication and authorization platform.',
    category: 'security',
    logo: '/images/integrations/auth0.svg',
    setupTime: '5 min',
    features: ['Login sync', 'User management', 'Custom rules'],
    website: 'https://auth0.com',
  },
];

/** Featured integrations for hero section */
export const featuredIntegrations = [
  'slack',
  'github',
  'figma',
  'notion',
  'vercel',
  'linear',
  'jira',
  'discord',
] as const;

/** Integration statistics */
export const integrationStats = {
  total: 150,
  categories: 8,
  popular: 12,
  comingSoon: 8,
} as const;

/** Integration benefits for features page */
export const integrationBenefits = [
  {
    title: 'Quick Setup',
    description: 'Most integrations connect in under 3 minutes with our guided setup process.',
    icon: 'Clock',
  },
  {
    title: 'Two-Way Sync',
    description: 'Data flows both ways, keeping all your tools in perfect harmony.',
    icon: 'ArrowLeftRight',
  },
  {
    title: 'Custom Webhooks',
    description: 'Build custom workflows with our flexible webhook system.',
    icon: 'Webhook',
  },
  {
    title: 'Enterprise Security',
    description: 'OAuth 2.0 and API key authentication with enterprise-grade security.',
    icon: 'Shield',
  },
] as const;

/** API integration info */
export const apiIntegration = {
  title: 'Build Your Own Integration',
  description:
    "Can't find what you need? Our comprehensive REST and GraphQL APIs let you build custom integrations.",
  features: [
    'Comprehensive REST API',
    'GraphQL endpoint',
    'Webhook support',
    'SDKs for popular languages',
    'Detailed documentation',
    'Developer community',
  ],
  cta: {
    text: 'View API Docs',
    href: ROUTES.DOCS_API,
  },
} as const;
