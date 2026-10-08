/**
 * Blog data main entry point
 */

export * from './types';
export * from './categories';
export * from './authors';

import { post1 } from './posts/post-1';
import { post2 } from './posts/post-2';
import { post3 } from './posts/post-3';
import { post4 } from './posts/post-4';
import { post5 } from './posts/post-5';
import { post6 } from './posts/post-6';
import { post7 } from './posts/post-7';
import { post8 } from './posts/post-8';

import type { BlogPost } from './types';

/** Blog posts */
export const blogPosts: BlogPost[] = [post1, post2, post3, post4, post5, post6, post7, post8];

/** Featured blog post (hero section) */
export const featuredBlogPost = blogPosts[0]!;

/** Blog page metadata */
export const blogMetadata = {
  title: 'Blog | ModernSaaS',
  description: 'Insights, tutorials, and updates from the ModernSaaS team.',
  keywords: ['blog', 'SaaS', 'productivity', 'engineering', 'tutorials'],
} as const;

/** Newsletter CTA for blog */
export const blogNewsletter = {
  title: 'Stay Updated',
  description: 'Get the latest articles, tutorials, and product updates delivered to your inbox.',
  placeholder: 'Enter your email',
  buttonText: 'Subscribe',
  successMessage: 'Thanks for subscribing! Check your inbox for a confirmation email.',
} as const;

/** Popular tags for blog filtering */
export const popularTags = [
  'product',
  'engineering',
  'AI',
  'tutorial',
  'scalability',
  'growth',
  'security',
  'design',
] as const;
