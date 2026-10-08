/**
 * Site Configuration
 *
 * Centralized configuration for branding, navigation, social links,
 * contact information, footer content, and SEO defaults.
 * All values are customizable for easy template adaptation.
 */

import { ROUTES } from './paths';

/**
 * Company branding configuration
 */
export interface CompanyConfig {
  /** Company/product name */
  name: string;
  /** Tagline displayed in hero and meta descriptions */
  tagline: string;
  /** Short description for cards and previews */
  shortDescription: string;
  /** Full description for about pages */
  fullDescription: string;
  /** Year founded */
  foundedYear: number;
  /** Company mission statement */
  mission: string;
  /** Company vision statement */
  vision: string;
}

/**
 * Social media links configuration
 */
export interface SocialLinksConfig {
  /** Twitter/X handle (without @) */
  twitter: string;
  /** Twitter/X profile URL */
  twitterUrl: string;
  /** GitHub organization/username */
  github: string;
  /** GitHub profile URL */
  githubUrl: string;
  /** LinkedIn company URL */
  linkedinUrl: string;
  /** Discord invite URL */
  discordUrl: string;
  /** YouTube channel URL */
  youtubeUrl: string;
}

/**
 * Contact information configuration
 */
export interface ContactConfig {
  /** Primary support email */
  email: string;
  /** Sales inquiry email */
  salesEmail: string;
  /** Support email */
  supportEmail: string;
  /** Phone number (optional) */
  phone: string;
  /** Office address */
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  /** Business hours */
  businessHours: string;
  /** Live chat availability */
  liveChatHours: string;
}

/**
 * Footer content configuration
 */
export interface FooterConfig {
  /** Newsletter CTA headline */
  newsletterHeadline: string;
  /** Newsletter CTA description */
  newsletterDescription: string;
  /** Newsletter privacy text */
  newsletterPrivacy: string;
  /** Copyright notice template (use {year} placeholder) */
  copyright: string;
  /** Company registration number */
  registrationNumber: string;
  /** Status page URL */
  statusPageUrl: string;
  /** Template attribution text */
  attributionText: string;
  /** Template attribution URL */
  attributionUrl: string;
}

/**
 * SEO metadata configuration
 */
export interface SEOConfig {
  /** Default page title template (use {title} placeholder) */
  titleTemplate: string;
  /** Site title suffix */
  titleSuffix: string;
  /** Default meta description */
  defaultDescription: string;
  /** Default OG image path */
  defaultOgImage: string;
  /** Twitter card type */
  twitterCardType: 'summary' | 'summary_large_image';
  /** Twitter site handle (with @) */
  twitterSite: string;
  /** Theme color for browser */
  themeColor: string;
  /** Keywords for meta tags */
  defaultKeywords: string[];
  /** Author name for meta tags */
  author: string;
  /** Site locale */
  locale: string;
  /** Language code */
  language: string;
}

/**
 * Analytics and tracking configuration
 */
export interface AnalyticsConfig {
  /** Google Analytics measurement ID */
  googleAnalyticsId: string | undefined;
  /** Plausible analytics domain */
  plausibleDomain: string | undefined;
  /** PostHog project API key */
  posthogKey: string | undefined;
  /** Enable analytics in development */
  enableInDev: boolean;
}

/**
 * Feature flags for enabling/disabling site features
 */
export interface FeatureFlagsConfig {
  /** Enable newsletter signup */
  newsletter: boolean;
  /** Enable live chat widget */
  liveChat: boolean;
  /** Enable search functionality */
  search: boolean;
  /** Enable dark mode toggle */
  darkMode: boolean;
  /** Enable multi-language support */
  i18n: boolean;
  /** Enable demo mode (modals for placeholder features) */
  demoMode: boolean;
}

// =============================================================================
// CONFIGURATION VALUES
// =============================================================================

/**
 * Company branding
 * Update these values to customize the template for your product
 */
export const company: CompanyConfig = {
  name: 'ModernSaaS',
  tagline: 'Build faster with intelligent automation',
  shortDescription:
    'ModernSaaS helps teams streamline workflows, automate repetitive tasks, and ship products faster with AI-powered tools.',
  fullDescription: `ModernSaaS is a comprehensive platform designed to help modern teams build, deploy, and scale 
    their products with unprecedented speed. Our intelligent automation tools eliminate repetitive tasks, 
    allowing your team to focus on what matters most: creating exceptional products and experiences.
    
    Founded in 2023, we've helped over 5,000 companies transform their workflows and reduce 
    time-to-market by an average of 40%. From startups to enterprise organizations, ModernSaaS 
    provides the tools and infrastructure needed to compete in today's fast-paced digital landscape.`,
  foundedYear: 2023,
  mission:
    'Empower teams to build exceptional products by eliminating friction and automating the mundane.',
  vision:
    'A world where every team has access to intelligent tools that amplify their creativity and productivity.',
} as const;

/**
 * Social media links
 * Update with your actual social media profiles
 */
export const social: SocialLinksConfig = {
  twitter: 'modernsaas',
  twitterUrl: 'https://twitter.com/modernsaas',
  github: 'modernsaas',
  githubUrl: 'https://github.com/modernsaas',
  linkedinUrl: 'https://linkedin.com/company/modernsaas',
  discordUrl: 'https://discord.gg/modernsaas',
  youtubeUrl: 'https://youtube.com/@modernsaas',
} as const;

/**
 * Contact information
 * Update with your actual contact details
 */
export const contact: ContactConfig = {
  email: 'hello@modernsaas.dev',
  salesEmail: 'sales@modernsaas.dev',
  supportEmail: 'support@modernsaas.dev',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Innovation Drive, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'USA',
  },
  businessHours: 'Monday - Friday: 9:00 AM - 6:00 PM PST',
  liveChatHours: '24/7 for Pro and Enterprise plans',
} as const;

/**
 * Footer content configuration
 */
export const footer: FooterConfig = {
  newsletterHeadline: 'Stay ahead of the curve',
  newsletterDescription:
    'Get the latest updates on product features, industry insights, and automation tips delivered to your inbox.',
  newsletterPrivacy: 'We respect your privacy. Unsubscribe at any time.',
  copyright: '© {year} ModernSaaS Inc. All rights reserved.',
  registrationNumber: 'Registered in Delaware, USA',
  statusPageUrl: '/status/',
  attributionText: 'Template created by MasuRii',
  attributionUrl: 'https://github.com/MasuRii',
} as const;

/**
 * SEO default metadata
 * These values are used when page-specific metadata is not provided
 */
export const seo: SEOConfig = {
  titleTemplate: '{title} | ModernSaaS',
  titleSuffix: ' | ModernSaaS',
  defaultDescription: `${company.name} - ${company.tagline}. ${company.shortDescription}`,
  defaultOgImage: '/images/og-default.jpg',
  twitterCardType: 'summary_large_image',
  twitterSite: '@modernsaas',
  themeColor: '#1d4ed8',
  defaultKeywords: [
    'SaaS',
    'automation',
    'workflow',
    'productivity',
    'AI tools',
    'developer tools',
    'business automation',
    'no-code',
    'low-code',
  ],
  author: company.name,
  locale: 'en_US',
  language: 'en',
} as const;

/**
 * Analytics configuration
 * Add your tracking IDs to enable analytics
 */
export const analytics: AnalyticsConfig = {
  // Add your Google Analytics 4 measurement ID (G-XXXXXXXXXX)
  googleAnalyticsId: undefined,
  // Add your Plausible domain (e.g., 'modernsaas.dev')
  plausibleDomain: undefined,
  // Add your PostHog project API key
  posthogKey: undefined,
  // Set to true to enable analytics in development
  enableInDev: false,
} as const;

/**
 * Feature flags
 * Enable or disable site features
 */
export const featureFlags: FeatureFlagsConfig = {
  // Enable newsletter signup form
  newsletter: true,
  // Enable live chat widget (placeholder in demo mode)
  liveChat: true,
  // Enable search functionality
  search: true,
  // Enable dark mode toggle
  darkMode: true,
  // Enable multi-language support (future feature)
  i18n: false,
  // Enable demo mode - shows modals for placeholder features
  demoMode: true,
} as const;

// =============================================================================
// DERIVED CONFIGURATION
// =============================================================================

/**
 * Navigation links that use site configuration
 * These combine the base routes with labels from site config
 */
export const siteNavigation = {
  /** Main navigation items */
  main: [
    { label: 'Features', href: ROUTES.FEATURES },
    { label: 'Pricing', href: ROUTES.PRICING },
    { label: 'About', href: ROUTES.ABOUT },
    { label: 'Blog', href: ROUTES.BLOG },
    { label: 'Contact', href: ROUTES.CONTACT },
  ],

  /** Footer navigation sections */
  footer: {
    product: {
      title: 'Product',
      links: [
        { label: 'Features', href: ROUTES.FEATURES },
        { label: 'Pricing', href: ROUTES.PRICING },
        { label: 'Changelog', href: ROUTES.CHANGELOG },
        { label: 'Roadmap', href: ROUTES.ROADMAP },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { label: 'About', href: ROUTES.ABOUT },
        { label: 'Blog', href: ROUTES.BLOG },
        { label: 'Contact', href: ROUTES.CONTACT },
        { label: 'Careers', href: ROUTES.CAREERS },
      ],
    },
    resources: {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: ROUTES.DOCS },
        { label: 'Help Center', href: ROUTES.SUPPORT },
        { label: 'API Reference', href: ROUTES.DOCS_API },
        { label: 'Status', href: ROUTES.STATUS },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: ROUTES.PRIVACY },
        { label: 'Terms of Service', href: ROUTES.TERMS },
      ],
    },
  },

  /** Social media links for footer */
  social: [
    { label: 'Twitter', href: social.twitterUrl, icon: 'twitter' },
    { label: 'GitHub', href: social.githubUrl, icon: 'github' },
    { label: 'LinkedIn', href: social.linkedinUrl, icon: 'linkedin' },
    { label: 'Discord', href: social.discordUrl, icon: 'discord' },
    { label: 'YouTube', href: social.youtubeUrl, icon: 'youtube' },
  ],

  /** Contact methods for footer */
  contact: [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, icon: 'mail' },
    {
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, '')}`,
      icon: 'phone',
    },
  ],
} as const;

/**
 * Page-specific SEO metadata
 * Override defaults for specific pages
 */
export const pageSEO = {
  home: {
    title: 'Build Faster with Intelligent Automation',
    description: `${company.tagline}. ${company.shortDescription}`,
  },
  features: {
    title: 'Features',
    description:
      'Discover powerful automation tools, AI-powered workflows, and integrations that help your team ship faster.',
  },
  pricing: {
    title: 'Pricing',
    description:
      'Simple, transparent pricing. Start free and scale as you grow. Enterprise plans available for larger teams.',
  },
  about: {
    title: 'About',
    description: `Learn about ${company.name}'s mission, values, and the team behind the platform.`,
  },
  contact: {
    title: 'Contact',
    description: `Get in touch with the ${company.name} team. We're here to help with any questions.`,
  },
  support: {
    title: 'Support',
    description: `Find help resources, documentation, and common answers in the ${company.name} Help Center.`,
  },
  blog: {
    title: 'Blog',
    description: `Insights, tutorials, and updates from the ${company.name} team.`,
  },
  changelog: {
    title: 'Changelog',
    description: `See what's new in ${company.name}. Latest updates, features, and improvements.`,
  },
  roadmap: {
    title: 'Roadmap',
    description: `See what's coming next for ${company.name}. Vote on features and help shape our future.`,
  },
  privacy: {
    title: 'Privacy Policy',
    description: `Learn how ${company.name} collects, uses, and protects your personal information.`,
  },
  terms: {
    title: 'Terms of Service',
    description: `Read the terms and conditions for using ${company.name}.`,
  },
  login: {
    title: 'Log In',
    description: `Sign in to your ${company.name} account.`,
    robots: 'noindex, nofollow',
  },
  signup: {
    title: 'Sign Up',
    description: `Create your ${company.name} account and start building today.`,
    robots: 'noindex, nofollow',
  },
  notFound: {
    title: 'Page Not Found',
    description: `Sorry, we couldn't find the page you're looking for.`,
    robots: 'noindex, nofollow',
  },
  careers: {
    title: 'Careers',
    description: `Join the ${company.name} team. We're hiring passionate people who want to build the future of work.`,
  },
  docs: {
    title: 'Documentation',
    description: `Get started with ${company.name}. Explore our guides, API reference, and tutorials.`,
  },
  docsApi: {
    title: 'API Reference',
    description: `Complete API documentation for ${company.name}. REST endpoints, authentication, and code examples.`,
  },
  status: {
    title: 'Status',
    description: `Check the current status of ${company.name} services, uptime, and incident history.`,
  },
} as const;

/**
 * Utility to generate full page title
 * @param pageTitle - The page-specific title
 * @returns Full title with suffix
 */
export const getPageTitle = (pageTitle?: string): string => {
  if (!pageTitle) {
    return `${company.name} - ${company.tagline}`;
  }
  return seo.titleTemplate.replace('{title}', pageTitle);
};

/**
 * Utility to generate copyright text with current year
 * @returns Copyright string with current year
 */
export const getCopyright = (): string => {
  const year = new Date().getFullYear();
  return footer.copyright.replace('{year}', String(year));
};

/**
 * Site configuration object (combined exports)
 */
export const site = {
  company,
  social,
  contact,
  footer,
  seo,
  analytics,
  featureFlags,
  navigation: siteNavigation,
  pageSEO,
  getPageTitle,
  getCopyright,
} as const;

// Default export for convenience
export default site;
