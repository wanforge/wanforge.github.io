/**
 * Team data types and placeholder data
 * Used for About page team section
 */

/** Social media platform */
export type SocialPlatform = 'twitter' | 'linkedin' | 'github' | 'website';

/** Team member social link */
export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

/** Individual team member */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: SocialLink[];
  department: 'leadership' | 'engineering' | 'design' | 'marketing';
  joinedAt: string;
}

/** Company value/vision item */
export interface CompanyValue {
  id: string;
  icon: string;
  title: string;
  description: string;
}

/** Company milestone for timeline */
export interface Milestone {
  year: number;
  month: string;
  title: string;
  description: string;
}

/** Investor information */
export interface Investor {
  id: string;
  name: string;
  type: 'vc' | 'angel' | 'strategic';
  logo: string;
}

// ============================================
// Placeholder Data
// ============================================

/** Leadership and team members */
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alexandra Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former VP of Product at TechGiant. Built and scaled products used by millions. Passionate about creating tools that empower teams.',
    avatar: '/images/team/person-01.jpg',
    social: [
      { platform: 'twitter', url: 'https://twitter.com/alexchen' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/alexchen' },
    ],
    department: 'leadership',
    joinedAt: '2019-01-15',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Google engineer with 15+ years building distributed systems. Open source contributor and conference speaker.',
    avatar: '/images/team/person-02.jpg',
    social: [
      { platform: 'twitter', url: 'https://twitter.com/marcusj' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/marcusj' },
      { platform: 'github', url: 'https://github.com/marcusj' },
    ],
    department: 'leadership',
    joinedAt: '2019-01-15',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Head of Design',
    bio: 'Award-winning designer previously at Apple and Airbnb. Believes great design is invisible and intuitive.',
    avatar: '/images/team/person-03.jpg',
    social: [
      { platform: 'twitter', url: 'https://twitter.com/priyas' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/priyas' },
      { platform: 'website', url: 'https://priyasharma.design' },
    ],
    department: 'design',
    joinedAt: '2020-03-10',
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'VP of Engineering',
    bio: 'Led engineering teams at multiple unicorn startups. Expert in scaling engineering organizations and technical architecture.',
    avatar: '/images/team/person-04.jpg',
    social: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/davidkim' },
      { platform: 'github', url: 'https://github.com/davidkim' },
    ],
    department: 'engineering',
    joinedAt: '2020-06-22',
  },
  {
    id: '5',
    name: 'Emily Rodriguez',
    role: 'Head of Marketing',
    bio: 'Growth marketer with experience taking B2B SaaS companies from $0 to $100M ARR. Data-driven and creative.',
    avatar: '/images/team/person-05.jpg',
    social: [
      { platform: 'twitter', url: 'https://twitter.com/emilyr' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/emilyr' },
    ],
    department: 'marketing',
    joinedAt: '2021-01-08',
  },
  {
    id: '6',
    name: 'Thomas Anderson',
    role: 'Senior Product Manager',
    bio: 'Product leader focused on user experience and market fit. Previously shipped products at Microsoft and Shopify.',
    avatar: '/images/team/person-06.jpg',
    social: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/thomasanderson' },
      { platform: 'twitter', url: 'https://twitter.com/thomasanderson' },
    ],
    department: 'leadership',
    joinedAt: '2021-04-15',
  },
  {
    id: '7',
    name: 'Sarah Mitchell',
    role: 'Lead Engineer',
    bio: 'Full-stack engineer specializing in performance and scalability. Open source maintainer and tech blogger.',
    avatar: '/images/team/person-07.jpg',
    social: [
      { platform: 'github', url: 'https://github.com/sarahmitchell' },
      { platform: 'twitter', url: 'https://twitter.com/sarahcodes' },
    ],
    department: 'engineering',
    joinedAt: '2021-09-01',
  },
  {
    id: '8',
    name: 'Jordan Lee',
    role: 'Senior Designer',
    bio: 'UI/UX designer with a background in psychology. Focuses on creating accessible and inclusive digital experiences.',
    avatar: '/images/team/person-08.jpg',
    social: [
      { platform: 'website', url: 'https://jordanlee.design' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/jordanlee' },
    ],
    department: 'design',
    joinedAt: '2022-02-14',
  },
  {
    id: '9',
    name: 'Nathan Wright',
    role: 'Senior DevOps Engineer',
    bio: 'Cloud infrastructure expert with a focus on automation and security. Former SRE at high-traffic fintech platforms.',
    avatar: '/images/team/person-09.jpg',
    social: [
      { platform: 'github', url: 'https://github.com/nathanwright' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/nathanwright' },
    ],
    department: 'engineering',
    joinedAt: '2022-05-20',
  },
  {
    id: '10',
    name: 'Sophia Lopez',
    role: 'Customer Success Lead',
    bio: 'Dedicated to helping customers achieve their goals. Background in communications and relationship management.',
    avatar: '/images/team/person-10.jpg',
    social: [
      { platform: 'twitter', url: 'https://twitter.com/sophial' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/sophial' },
    ],
    department: 'marketing',
    joinedAt: '2022-08-12',
  },
];

/** Company values for About page */
export const companyValues: CompanyValue[] = [
  {
    id: '1',
    icon: 'Users',
    title: 'Customer First',
    description:
      'Every decision we make starts with our customers. We listen, learn, and build solutions that truly solve their problems.',
  },
  {
    id: '2',
    icon: 'Zap',
    title: 'Move Fast',
    description:
      'Speed is a competitive advantage. We iterate quickly, ship often, and learn from real user feedback.',
  },
  {
    id: '3',
    icon: 'Shield',
    title: 'Build Trust',
    description:
      "Trust is earned through transparency, reliability, and doing what's right—even when no one is watching.",
  },
  {
    id: '4',
    icon: 'Sparkles',
    title: 'Think Big',
    description:
      "We're not just building a product; we're shaping the future of how teams work together.",
  },
  {
    id: '5',
    icon: 'Heart',
    title: 'Care Deeply',
    description:
      'We care about our customers, our craft, and each other. Passion drives excellence.',
  },
];

/** Company milestones for timeline */
export const milestones: Milestone[] = [
  {
    year: 2019,
    month: 'March',
    title: 'Founded',
    description: 'ModernSaaS founded in San Francisco by Alexandra Chen and Marcus Johnson.',
  },
  {
    year: 2019,
    month: 'November',
    title: 'Seed Funding',
    description: 'Raised $2.5M seed round led by top-tier VC firms.',
  },
  {
    year: 2020,
    month: 'June',
    title: 'Public Launch',
    description: 'Official product launch with 500+ early access customers.',
  },
  {
    year: 2021,
    month: 'January',
    title: 'Series A',
    description: 'Raised $15M Series A to accelerate growth and expand team.',
  },
  {
    year: 2022,
    month: 'April',
    title: '10,000 Customers',
    description: 'Reached 10,000 paying customers across 50+ countries.',
  },
  {
    year: 2023,
    month: 'September',
    title: 'Enterprise Launch',
    description: 'Launched Enterprise tier with advanced security and compliance features.',
  },
  {
    year: 2024,
    month: 'December',
    title: 'Series B',
    description: 'Raised $50M Series B to fuel international expansion.',
  },
  {
    year: 2026,
    month: 'February',
    title: '100K Users',
    description: 'Celebrated 100,000 active users and 5,000+ enterprise customers.',
  },
];

/** Investors for About page - Leading SaaS venture capital firms */
export const investors: Investor[] = [
  {
    id: '1',
    name: 'Bessemer Venture Partners',
    type: 'vc',
    logo: '/images/integrations/bessemer.svg',
  },
  { id: '2', name: 'Insight Partners', type: 'vc', logo: '/images/integrations/insight.svg' },
  {
    id: '3',
    name: 'Lightspeed Venture Partners',
    type: 'vc',
    logo: '/images/integrations/lightspeed.svg',
  },
  { id: '4', name: 'Battery Ventures', type: 'vc', logo: '/images/integrations/battery.svg' },
  { id: '5', name: 'Craft Ventures', type: 'vc', logo: '/images/integrations/craft.svg' },
  { id: '6', name: 'BoxGroup', type: 'vc', logo: '/images/integrations/boxgroup.svg' },
];

/** Company statistics for About page */
export const companyStats = [
  { value: 120, suffix: '+', label: 'Team Members', prefix: '' },
  { value: 50, suffix: '+', label: 'Countries', prefix: '' },
  { value: 5000, suffix: '+', label: 'Customers', prefix: '' },
  { value: 100, suffix: 'M+', label: 'Requests Processed', prefix: '' },
] as const;

/** Office locations */
export const offices = [
  {
    city: 'San Francisco',
    country: 'USA',
    address: '123 Market Street, Suite 400',
    isHQ: true,
  },
  {
    city: 'New York',
    country: 'USA',
    address: '456 Broadway, Floor 12',
    isHQ: false,
  },
  {
    city: 'London',
    country: 'UK',
    address: '78 Shoreditch High Street',
    isHQ: false,
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    address: '12 Marina Boulevard',
    isHQ: false,
  },
] as const;

/** Open positions for careers section */
export const openPositions = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco / Remote',
    type: 'Full-time',
  },
  {
    id: '2',
    title: 'Product Designer',
    department: 'Design',
    location: 'New York / Remote',
    type: 'Full-time',
  },
  {
    id: '3',
    title: 'Customer Success Manager',
    department: 'Success',
    location: 'London',
    type: 'Full-time',
  },
  {
    id: '4',
    title: 'Senior Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    id: '5',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'San Francisco',
    type: 'Full-time',
  },
] as const;
