/**
 * Pricing data types and placeholder data
 * Used for Pricing page and Pricing Preview section
 */

/**
 * Pricing data types and placeholder data
 * Used for Pricing page and Pricing Preview section
 */

/** Billing period options */

export type BillingPeriod = 'monthly' | 'annual';

/** Pricing tier types */
export type TierType = 'starter' | 'pro' | 'enterprise';

import { ROUTES } from '../config/paths';

/** Individual pricing tier */
export interface PricingTier {
  id: string;
  type: TierType;
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  annualDiscountPercent: number;
  isPopular: boolean;
  cta: {
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  };
  features: PricingFeature[];
  limits: TierLimits;
}

/** Feature with availability status */
export interface PricingFeature {
  name: string;
  description?: string;
  included: boolean;
  highlight?: boolean;
}

/** Usage limits for a tier */
export interface TierLimits {
  users: number | string;
  storage: string;
  projects: number | string;
  apiCalls: string;
  support: string;
}

/** Enterprise feature highlight */
export interface EnterpriseFeature {
  icon: string;
  title: string;
  description: string;
}

// ============================================
// Placeholder Data
// ============================================

/** Pricing tiers configuration */
export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    type: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small teams getting started.',
    monthlyPrice: 19,
    annualPrice: 15,
    annualDiscountPercent: 20,
    isPopular: false,
    cta: {
      text: 'Start Free Trial',
      href: ROUTES.SIGNUP,
      variant: 'secondary',
    },
    features: [
      { name: 'Up to 5 team members', included: true },
      { name: '10 GB storage', included: true },
      { name: 'Unlimited projects', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Email support', included: true },
      { name: 'API access', included: false },
      { name: 'Advanced security', included: false },
      { name: 'Custom integrations', included: false },
      { name: 'Dedicated account manager', included: false },
    ],
    limits: {
      users: 5,
      storage: '10 GB',
      projects: 'Unlimited',
      apiCalls: '1,000/mo',
      support: 'Email',
    },
  },
  {
    id: 'pro',
    type: 'pro',
    name: 'Pro',
    description: 'Best for growing teams that need advanced features.',
    monthlyPrice: 49,
    annualPrice: 39,
    annualDiscountPercent: 20,
    isPopular: true,
    cta: {
      text: 'Start Free Trial',
      href: ROUTES.SIGNUP,
      variant: 'primary',
    },
    features: [
      { name: 'Up to 25 team members', included: true },
      { name: '100 GB storage', included: true },
      { name: 'Unlimited projects', included: true },
      { name: 'Advanced analytics', included: true, highlight: true },
      { name: 'Priority support', included: true, highlight: true },
      { name: 'API access', included: true },
      { name: 'Advanced security', included: true },
      { name: 'Custom integrations', included: false },
      { name: 'Dedicated account manager', included: false },
    ],
    limits: {
      users: 25,
      storage: '100 GB',
      projects: 'Unlimited',
      apiCalls: '50,000/mo',
      support: 'Priority',
    },
  },
  {
    id: 'enterprise',
    type: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with custom requirements.',
    monthlyPrice: null,
    annualPrice: null,
    annualDiscountPercent: 0,
    isPopular: false,
    cta: {
      text: 'Contact Sales',
      href: ROUTES.CONTACT,
      variant: 'secondary',
    },
    features: [
      { name: 'Unlimited team members', included: true },
      { name: 'Unlimited storage', included: true },
      { name: 'Unlimited projects', included: true },
      { name: 'Custom analytics', included: true },
      { name: '24/7 phone support', included: true, highlight: true },
      { name: 'Full API access', included: true, highlight: true },
      { name: 'Enterprise security', included: true, highlight: true },
      { name: 'Custom integrations', included: true, highlight: true },
      { name: 'Dedicated account manager', included: true, highlight: true },
    ],
    limits: {
      users: 'Unlimited',
      storage: 'Unlimited',
      projects: 'Unlimited',
      apiCalls: 'Unlimited',
      support: '24/7 Dedicated',
    },
  },
];

/** Enterprise features highlights */
export const enterpriseFeatures: EnterpriseFeature[] = [
  {
    icon: 'Shield',
    title: 'Advanced Security',
    description:
      'Custom security policies, SSO with any SAML 2.0 provider, and advanced audit logging.',
  },
  {
    icon: 'Headphones',
    title: 'Dedicated Support',
    description: '24/7 phone support with a dedicated account manager and priority response times.',
  },
  {
    icon: 'Settings',
    title: 'Custom Deployment',
    description: 'Private cloud deployment options with custom infrastructure configurations.',
  },
  {
    icon: 'FileText',
    title: 'Custom Contracts',
    description: 'Flexible billing terms, custom SLAs, and procurement-friendly contracts.',
  },
];

/** Feature comparison table data */
export const comparisonFeatures = [
  {
    category: 'Features',
    items: [
      { name: 'Team members', starter: '5', pro: '25', enterprise: 'Unlimited' },
      { name: 'Storage', starter: '10 GB', pro: '100 GB', enterprise: 'Unlimited' },
      { name: 'Projects', starter: 'Unlimited', pro: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'API calls/month', starter: '1,000', pro: '50,000', enterprise: 'Unlimited' },
    ],
  },
  {
    category: 'Support',
    items: [
      { name: 'Email support', starter: true, pro: true, enterprise: true },
      { name: 'Live chat', starter: false, pro: true, enterprise: true },
      { name: 'Phone support', starter: false, pro: false, enterprise: true },
      { name: 'Dedicated manager', starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: 'Security',
    items: [
      { name: 'SSL encryption', starter: true, pro: true, enterprise: true },
      { name: 'Two-factor auth', starter: true, pro: true, enterprise: true },
      { name: 'SSO / SAML', starter: false, pro: true, enterprise: true },
      { name: 'Advanced audit logs', starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: 'Integrations',
    items: [
      { name: 'Basic integrations', starter: true, pro: true, enterprise: true },
      { name: 'Premium integrations', starter: false, pro: true, enterprise: true },
      { name: 'Custom integrations', starter: false, pro: false, enterprise: true },
      { name: 'API access', starter: false, pro: true, enterprise: true },
    ],
  },
  {
    category: 'Analytics',
    items: [
      { name: 'Real-time dashboard', starter: true, pro: true, enterprise: true },
      { name: 'Custom reports', starter: false, pro: true, enterprise: true },
      { name: 'Export data (CSV/PDF)', starter: false, pro: true, enterprise: true },
      { name: 'Advanced filtering', starter: false, pro: true, enterprise: true },
      { name: 'Predictive insights', starter: false, pro: false, enterprise: true },
      { name: 'Custom dashboards', starter: false, pro: false, enterprise: true },
    ],
  },
] as const;

/** Money back guarantee info */
export const moneyBackGuarantee = {
  days: 30,
  title: '30-Day Money-Back Guarantee',
  description:
    'Try any plan risk-free. Not completely satisfied? Get a full refund within 30 days, no questions asked.',
} as const;

/** Pricing page metadata */
export const pricingMetadata = {
  title: 'Simple, Transparent Pricing',
  description:
    "Choose the plan that's right for you. Start with a 14-day free trial. No credit card required.",
  keywords: ['pricing', 'plans', 'subscription', 'SaaS pricing', 'enterprise'],
} as const;
