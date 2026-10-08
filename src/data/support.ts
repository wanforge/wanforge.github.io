/**
 * Support Data
 *
 * Placeholder data for the Support/Help Center page.
 */

export interface SupportCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  articleCount: number;
}

export interface SupportArticle {
  id: string;
  title: string;
  category: string;
  isPopular?: boolean;
  updatedAt: string;
}

export const supportCategories: SupportCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics and get up and running in minutes.',
    icon: 'rocket',
    articleCount: 12,
  },
  {
    id: 'account-billing',
    title: 'Account & Billing',
    description: 'Manage your subscription, invoices, and account settings.',
    icon: 'credit-card',
    articleCount: 8,
  },
  {
    id: 'features-tools',
    title: 'Features & Tools',
    description: 'Deep dives into our powerful automation and AI features.',
    icon: 'zap',
    articleCount: 24,
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect with your favorite tools and platforms.',
    icon: 'layers',
    articleCount: 15,
  },
  {
    id: 'security-privacy',
    title: 'Security & Privacy',
    description: 'How we protect your data and stay compliant.',
    icon: 'shield',
    articleCount: 6,
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Fix common issues and learn about our status page.',
    icon: 'help-circle',
    articleCount: 10,
  },
];

export const popularArticles: SupportArticle[] = [
  {
    id: '1',
    title: 'How to set up your first automation',
    category: 'getting-started',
    isPopular: true,
    updatedAt: '2025-12-01',
  },
  {
    id: '2',
    title: 'Connecting with Slack and Discord',
    category: 'integrations',
    isPopular: true,
    updatedAt: '2025-11-20',
  },
  {
    id: '3',
    title: 'Managing team permissions and roles',
    category: 'account-billing',
    isPopular: true,
    updatedAt: '2025-10-15',
  },
  {
    id: '4',
    title: 'Understanding AI credit usage',
    category: 'features-tools',
    isPopular: true,
    updatedAt: '2025-12-05',
  },
  {
    id: '5',
    title: 'Data encryption and security protocols',
    category: 'security-privacy',
    isPopular: true,
    updatedAt: '2025-09-28',
  },
];
