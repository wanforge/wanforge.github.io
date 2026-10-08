/**
 * Testimonial data types and placeholder data
 * Used for Testimonials section and social proof
 */

/** Star rating (1-5) */
export type StarRating = 1 | 2 | 3 | 4 | 5;

/** Individual testimonial */
export interface Testimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
  };
  rating: StarRating;
  companyLogo?: string;
  featured?: boolean;
}

/** Social proof statistics */
export interface SocialProofStats {
  companies: number;
  users: string;
  rating: number;
  reviews: number;
}

/** Trust badge item */
export interface TrustBadge {
  id: string;
  type: 'rating' | 'recognition' | 'security';
  name: string;
  value: string;
  icon?: string;
}

/** Customer logo for logo cloud */
export interface CustomerLogo {
  id: string;
  name: string;
  logo: string;
}

// ============================================
// Placeholder Data
// ============================================

/** Featured testimonials for homepage */
export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      "ModernSaaS has completely transformed how our team collaborates. We've seen a 40% increase in productivity since switching. The interface is intuitive and the support team is incredibly responsive.",
    author: {
      name: 'Sarah Chen',
      role: 'VP of Engineering',
      company: 'TechCorp Inc.',
      avatar: '/images/team/person-11.jpg',
    },
    rating: 5,
    companyLogo: '/images/integrations/vercel.svg',
    featured: true,
  },
  {
    id: '2',
    quote:
      'The best investment we made this year. The ROI was visible within the first month. Our developers love the API, and our managers love the reporting.',
    author: {
      name: 'Michael Rodriguez',
      role: 'CTO',
      company: 'StartupXYZ',
      avatar: '/images/team/person-12.jpg',
    },
    rating: 5,
    companyLogo: '/images/integrations/stripe.svg',
    featured: true,
  },
  {
    id: '3',
    quote:
      'We evaluated 12 different solutions before choosing ModernSaaS. The combination of features, pricing, and support made it an easy choice. Highly recommended!',
    author: {
      name: 'Emily Watson',
      role: 'Product Manager',
      company: 'InnovateCo',
      avatar: '/images/team/person-13.jpg',
    },
    rating: 5,
    companyLogo: '/images/integrations/notion.svg',
    featured: false,
  },
  {
    id: '4',
    quote:
      'The enterprise features and security compliance were exactly what we needed. Our InfoSec team approved it immediately. The dedicated support is worth every penny.',
    author: {
      name: 'David Kim',
      role: 'Director of IT',
      company: 'Enterprise Solutions',
      avatar: '/images/team/person-14.jpg',
    },
    rating: 5,
    companyLogo: '/images/integrations/slack.svg',
    featured: false,
  },
  {
    id: '5',
    quote:
      'Switching to ModernSaaS was seamless. The migration tools handled everything automatically, and we were up and running in less than a day.',
    author: {
      name: 'Lisa Thompson',
      role: 'Operations Lead',
      company: 'GrowthLabs',
      avatar: '/images/team/person-15.jpg',
    },
    rating: 4,
    companyLogo: '/images/integrations/github.svg',
    featured: false,
  },
  {
    id: '6',
    quote:
      'As a non-technical founder, I needed something powerful yet easy to use. ModernSaaS strikes that perfect balance. I can manage everything without bothering my dev team.',
    author: {
      name: 'James Wilson',
      role: 'CEO',
      company: 'FounderHub',
      avatar: '/images/team/person-16.jpg',
    },
    rating: 5,
    companyLogo: '/images/integrations/figma.svg',
    featured: true,
  },
  {
    id: '7',
    quote:
      "The analytics dashboard is a game-changer. We can finally see exactly where our bottlenecks are and address them in real-time. It's saved us hundreds of hours.",
    author: {
      name: 'Rachel Adams',
      role: 'Data Analyst',
      company: 'DataStream',
      avatar: '/images/team/person-17.jpg',
    },
    rating: 5,
    companyLogo: '/images/integrations/linear.svg',
    featured: false,
  },
  {
    id: '8',
    quote:
      "The automation workflows are incredibly flexible. We've automated our entire onboarding process using ModernSaaS, reducing manual effort by 90%.",
    author: {
      name: 'Kevin Park',
      role: 'Head of Growth',
      company: 'ScaleForce',
      avatar: '/images/team/person-18.jpg',
    },
    rating: 5,
    companyLogo: '/images/integrations/discord.svg',
    featured: false,
  },
];

/** Social proof statistics */
export const socialProofStats: SocialProofStats = {
  companies: 5000,
  users: '100K+',
  rating: 4.9,
  reviews: 2847,
} as const;

/** Trust badges for social proof section */
export const trustBadges: TrustBadge[] = [
  {
    id: '1',
    type: 'rating',
    name: 'G2 Rating',
    value: '4.9/5',
    icon: 'Star',
  },
  {
    id: '2',
    type: 'recognition',
    name: 'G2 Leader',
    value: 'Winter 2026',
    icon: 'Award',
  },
  {
    id: '3',
    type: 'security',
    name: 'SOC 2 Type II',
    value: 'Certified',
    icon: 'Shield',
  },
  {
    id: '4',
    type: 'recognition',
    name: 'Product Hunt',
    value: '#1 Product of the Day',
    icon: 'Trophy',
  },
  {
    id: '5',
    type: 'security',
    name: 'GDPR',
    value: 'Compliant',
    icon: 'Lock',
  },
];

/** Customer logos for logo cloud */
export const customerLogos: CustomerLogo[] = [
  { id: '1', name: 'Vercel', logo: '/images/integrations/vercel.svg' },
  { id: '2', name: 'Stripe', logo: '/images/integrations/stripe.svg' },
  { id: '3', name: 'Notion', logo: '/images/integrations/notion.svg' },
  { id: '4', name: 'Slack', logo: '/images/integrations/slack.svg' },
  { id: '5', name: 'GitHub', logo: '/images/integrations/github.svg' },
  { id: '6', name: 'Figma', logo: '/images/integrations/figma.svg' },
  { id: '7', name: 'Linear', logo: '/images/integrations/linear.svg' },
  { id: '8', name: 'Discord', logo: '/images/integrations/discord.svg' },
];

/** Testimonial categories for filtering */
export const testimonialCategories = [
  { id: 'all', label: 'All Reviews' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'startup', label: 'Startups' },
  { id: 'agency', label: 'Agencies' },
] as const;

/** Featured testimonial for hero section */
export const featuredTestimonial: Testimonial = {
  id: 'featured',
  quote:
    'ModernSaaS helped us scale from 10 to 100 employees without missing a beat. The platform grows with you.',
  author: {
    name: 'Amanda Foster',
    role: 'CEO',
    company: 'ScaleUp Inc.',
    avatar: '/images/team/person-19.jpg',
  },
  rating: 5,
  featured: true,
} as const;

/** Video testimonial placeholder */
export const videoTestimonial = {
  id: 'video-1',
  thumbnail: '/images/office-01.jpg',
  title: 'How TechCorp scaled with ModernSaaS',
  duration: '2:34',
  author: {
    name: 'Robert Chang',
    role: 'Head of Engineering',
    company: 'TechCorp',
  },
} as const;
