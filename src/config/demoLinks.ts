/**
 * Demo Link Configuration
 *
 * Centralized configuration for demo/placeholder links that trigger
 * informational modals when clicked. This provides clear UX for
 * template users to understand placeholder functionality.
 *
 * @module config/demoLinks
 */

import { company } from './site';

/**
 * Categories of demo links with different messaging strategies
 */
export type DemoLinkCategory =
  | 'auth' // Authentication links (signup, login, OAuth)
  | 'dashboard' // Dashboard/app functional links
  | 'integration' // External integration links
  | 'social' // Social media links
  | 'external' // Generic external links
  | 'feature'; // Feature-specific placeholder links

/**
 * Configuration for a specific demo link pattern
 */
export interface DemoLinkPattern {
  /** URL pattern to match (string or RegExp) */
  pattern: string | RegExp;
  /** Category for messaging selection */
  category: DemoLinkCategory;
  /** Optional custom title override */
  title?: string;
  /** Optional custom message override */
  message?: string;
  /** Optional custom action text */
  actionText?: string;
}

/**
 * Modal content configuration for each category
 */
export interface DemoLinkModalContent {
  /** Modal title */
  title: string;
  /** Main informational message */
  message: string;
  /** Secondary descriptive text */
  description?: string;
  /** Primary action button text */
  actionText: string;
  /** Icon name from lucide-react */
  icon: string;
}

/**
 * Demo link modal content by category
 */
export const demoLinkContent: Record<DemoLinkCategory, DemoLinkModalContent> = {
  auth: {
    title: 'Authentication Required',
    message: `This is a demo link. ${company.name} authentication is not fully configured in this template.`,
    description:
      'In a production environment, this would redirect to a secure authentication flow. To implement authentication, you can integrate services like Auth0, Clerk, or NextAuth.',
    actionText: 'Copy Link URL',
    icon: 'Lock',
  },
  dashboard: {
    title: 'Dashboard Feature',
    message: `This dashboard feature is a placeholder in the demo template.`,
    description:
      'The full dashboard functionality would display user data, analytics, and application controls. Customize this area with your actual application features.',
    actionText: 'Copy Link URL',
    icon: 'LayoutDashboard',
  },
  integration: {
    title: 'External Integration',
    message: `This integration link would connect to an external service.`,
    description:
      'In production, this would redirect to the integration provider for OAuth authorization or API setup. Configure your API keys and OAuth credentials to enable this feature.',
    actionText: 'Copy Link URL',
    icon: 'Plug',
  },
  social: {
    title: 'Social Media Link',
    message: `This would navigate to ${company.name}'s social media profile.`,
    description:
      'Update the social media URLs in src/config/site.ts to link to your actual profiles. These links help build trust and provide additional channels for user engagement.',
    actionText: 'Copy Link URL',
    icon: 'Share2',
  },
  external: {
    title: 'External Link',
    message: `This link would navigate to an external website.`,
    description:
      'External links should open in a new tab and include appropriate security attributes (rel="noopener noreferrer"). Update the URL to point to your desired destination.',
    actionText: 'Copy Link URL',
    icon: 'ExternalLink',
  },
  feature: {
    title: 'Feature Placeholder',
    message: `This feature is available as a template placeholder.`,
    description:
      'Implement this feature by connecting it to your backend services or third-party APIs. The UI is ready—just add your business logic.',
    actionText: 'Copy Link URL',
    icon: 'Sparkles',
  },
};

/**
 * URL patterns that trigger the demo modal
 * These patterns are checked against link hrefs
 */
export const demoLinkPatterns: DemoLinkPattern[] = [
  // Authentication routes
  { pattern: '/signup', category: 'auth' },
  { pattern: '/login', category: 'auth' },
  { pattern: '/auth/', category: 'auth' },
  { pattern: '/oauth/', category: 'auth' },
  { pattern: '/signin', category: 'auth' },

  // Dashboard/app routes
  { pattern: '/dashboard', category: 'dashboard' },
  { pattern: '/app/', category: 'dashboard' },
  { pattern: '/admin/', category: 'dashboard' },
  { pattern: '/settings', category: 'dashboard' },
  { pattern: '/account', category: 'dashboard' },
  { pattern: '/profile', category: 'dashboard' },

  // Integration patterns
  { pattern: '/integrations/', category: 'integration' },
  { pattern: '/connect/', category: 'integration' },
  { pattern: '/api/setup', category: 'integration' },

  // Social media URLs (external)
  { pattern: 'twitter.com', category: 'social' },
  { pattern: 'x.com', category: 'social' },
  { pattern: 'github.com', category: 'social' },
  { pattern: 'linkedin.com', category: 'social' },
  { pattern: 'discord.com', category: 'social' },
  { pattern: 'discord.gg', category: 'social' },
  { pattern: 'youtube.com', category: 'social' },
  { pattern: 'youtu.be', category: 'social' },

  // Generic external patterns
  { pattern: /^https?:\/\//, category: 'external' },
];

/**
 * Check if a URL matches any demo link pattern
 * @param url - The URL to check
 * @returns The matching pattern or null
 */
export function getDemoLinkCategory(url: string): DemoLinkCategory | null {
  for (const { pattern, category } of demoLinkPatterns) {
    if (typeof pattern === 'string') {
      if (url.includes(pattern)) {
        return category;
      }
    } else if (pattern instanceof RegExp) {
      if (pattern.test(url)) {
        return category;
      }
    }
  }
  return null;
}

/**
 * Check if a URL should trigger the demo modal
 * @param url - The URL to check
 * @returns True if the link should show the demo modal
 */
export function isDemoLink(url: string): boolean {
  return getDemoLinkCategory(url) !== null;
}

/**
 * Get modal content for a specific URL
 * @param url - The URL to get content for
 * @returns Modal content configuration
 */
export function getDemoLinkContent(url: string): DemoLinkModalContent {
  const category = getDemoLinkCategory(url);

  if (category) {
    return demoLinkContent[category];
  }

  // Default content for unmatched URLs
  return demoLinkContent.external;
}

/**
 * Get all demo link patterns for a specific category
 * @param category - The category to filter by
 * @returns Array of matching patterns
 */
export function getPatternsByCategory(category: DemoLinkCategory): DemoLinkPattern[] {
  return demoLinkPatterns.filter((pattern) => pattern.category === category);
}

/**
 * Add a custom demo link pattern at runtime
 * @param pattern - The pattern configuration to add
 */
export function addDemoLinkPattern(pattern: DemoLinkPattern): void {
  demoLinkPatterns.push(pattern);
}

/**
 * Demo link configuration object
 */
export const demoLinks = {
  content: demoLinkContent,
  patterns: demoLinkPatterns,
  isDemoLink,
  getDemoLinkCategory,
  getDemoLinkContent,
  getPatternsByCategory,
  addDemoLinkPattern,
} as const;

export default demoLinks;
