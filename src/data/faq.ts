/**
 * FAQ Data
 *
 * Centralized data for frequently asked questions across the site.
 */

/** FAQ category types */
export type FAQCategory = 'general' | 'billing' | 'plans' | 'technical' | 'support' | 'roadmap';

/** Individual FAQ item */
export interface FAQItem {
  question: string;
  answer: string;
  category: FAQCategory;
}

/**
 * General FAQs
 */
export const generalFAQs: FAQItem[] = [
  {
    question: 'What is ModernSaaS?',
    answer:
      'ModernSaaS is a comprehensive landing page template designed for high-growth SaaS startups. It features modern design trends, robust components, and optimized performance to help you launch faster.',
    category: 'general',
  },
  {
    question: 'How do I get started?',
    answer:
      'Getting started is easy! Simply choose a plan that fits your needs, sign up for an account, and follow our quick setup guide to integrate ModernSaaS with your existing workflow.',
    category: 'general',
  },
  {
    question: 'Is there a free version?',
    answer:
      "While we don't have a permanent free version, we offer a 14-day free trial on all our paid plans so you can explore the full power of ModernSaaS without any risk.",
    category: 'general',
  },
  {
    question: 'Can I use this for client projects?',
    answer:
      'Yes! Our Enterprise and Pro plans include licenses that allow you to use the template for client projects. Please check our licensing page for more specific details.',
    category: 'general',
  },
];

/**
 * Pricing and Billing FAQs
 * Moved from src/data/pricing.ts
 */
export const pricingFAQs: FAQItem[] = [
  {
    question: 'Can I change my plan at any time?',
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, your new rate will apply at the next billing cycle.",
    category: 'billing',
  },
  {
    question: 'Do you offer a free trial?',
    answer:
      "Yes! Every paid plan comes with a 14-day free trial. No credit card required to start. You'll only be charged if you decide to continue after the trial period.",
    category: 'billing',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual Enterprise plans.',
    category: 'billing',
  },
  {
    question: 'Is there a discount for annual billing?',
    answer:
      'Yes! You can save 20% by choosing annual billing instead of monthly. This discount is automatically applied when you select the annual option.',
    category: 'billing',
  },
  {
    question: 'Do you offer student or non-profit discounts?',
    answer:
      "Yes! We're committed to supporting education and social impact. Eligible students and non-profit organizations can receive an additional 30% discount on any plan. Contact our support team with your credentials to apply.",
    category: 'billing',
  },
  {
    question: 'What happens when I reach my plan limits?',
    answer:
      "We'll notify you when you're approaching your limits. You can upgrade your plan at any time, or contact us for custom options if you need temporary increases.",
    category: 'plans',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team within 30 days for a full refund.",
    category: 'billing',
  },
  {
    question: 'Can I invite external collaborators?',
    answer:
      "Yes! You can invite external collaborators to specific projects. They won't count against your team member limit unless they need full account access.",
    category: 'plans',
  },
  {
    question: 'Do you have an API?',
    answer:
      'Yes, our REST and GraphQL APIs are available on Pro and Enterprise plans. Enterprise customers also get access to advanced webhooks and custom integrations.',
    category: 'technical',
  },
];

/**
 * Support and Contact FAQs
 */
export const supportFAQs: FAQItem[] = [
  {
    question: 'How quickly will I receive a response?',
    answer:
      'Our team typically responds to all inquiries within 24 business hours. For urgent technical support, Pro and Enterprise customers can expect a response within 2-4 hours.',
    category: 'support',
  },
  {
    question: 'Do you offer custom enterprise solutions?',
    answer:
      'Yes, we provide custom enterprise plans tailored to your specific needs, including custom integrations, dedicated support, and specialized security requirements.',
    category: 'support',
  },
  {
    question: 'What are your support hours?',
    answer:
      'Our standard support hours are Monday through Friday, 9:00 AM to 6:00 PM PST. Live chat is available 24/7 for Pro and Enterprise plan subscribers.',
    category: 'support',
  },
  {
    question: 'Can I schedule a live product demo?',
    answer:
      'Absolutely! You can reach out through our contact form, and our sales team will be happy to schedule a personalized demo at your convenience.',
    category: 'support',
  },
  {
    question: 'How do I reset my password?',
    answer:
      'You can reset your password by clicking the "Forgot Password" link on the login page. We will send you an email with instructions to create a new password.',
    category: 'technical',
  },
  {
    question: 'Where can I find my invoices?',
    answer:
      'Invoices are available in your account settings under the "Billing" tab. You can download them as PDF files for your records.',
    category: 'billing',
  },
  {
    question: 'How do I cancel my subscription?',
    answer:
      'You can cancel your subscription at any time from the "Billing" section of your account settings. Your access will continue until the end of your current billing period.',
    category: 'billing',
  },
];

/**
 * Roadmap and Product Direction FAQs
 */
export const roadmapFAQs: FAQItem[] = [
  {
    question: 'How often is the roadmap updated?',
    answer:
      'We update our roadmap at the beginning of every quarter, or more frequently when major milestones are reached.',
    category: 'roadmap',
  },
  {
    question: 'Can I request a feature?',
    answer:
      'Absolutely! We love hearing from our users. You can submit feature requests through our support portal or by contacting our team directly.',
    category: 'roadmap',
  },
  {
    question: 'Are these dates guaranteed?',
    answer:
      'While we strive to meet our planned timelines, the roadmap is a dynamic document and subject to change based on user feedback and technical requirements.',
    category: 'roadmap',
  },
];

/**
 * Combined FAQs for homepage
 */
export const homeFAQs: FAQItem[] = [
  ...generalFAQs,
  ...pricingFAQs.slice(0, 4),
  ...supportFAQs.slice(0, 2),
];
