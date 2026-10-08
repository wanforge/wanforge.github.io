/**
 * Blog data types
 */

/** Blog post category */
export type BlogCategory =
  | 'product'
  | 'engineering'
  | 'company'
  | 'tutorials'
  | 'tips'
  | 'industry'
  | 'announcements';

/** Blog post author */
export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

/** Individual blog post */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: BlogCategory;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
  coverImage: string;
  tags: string[];
  relatedPosts?: string[];
}

/** Blog category metadata */
export interface BlogCategoryMeta {
  id: BlogCategory;
  label: string;
  description: string;
  color: string;
}
