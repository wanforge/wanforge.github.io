import React from 'react';
import type { BlogPost } from '../../data/blog/types';
import site from '../../config/site';
import { getAssetPath, getPathConfig } from '../../config/paths';

/**
 * Props for the ArticleSchema component
 */
export interface ArticleSchemaProps {
  /** The blog post data */
  post: BlogPost;
}

/**
 * ArticleSchema Component
 *
 * Renders JSON-LD BlogPosting schema for search engines.
 * This helps search engines understand the content, author, and metadata of blog posts.
 *
 * @see https://schema.org/BlogPosting
 */
export const ArticleSchema: React.FC<ArticleSchemaProps> = ({ post }) => {
  const { company } = site;
  const { siteUrl } = getPathConfig();

  // Ensure cover image is a full URL
  const coverImageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${siteUrl}${getAssetPath(post.coverImage)}`;

  const schema = {
    '@context': 'https://schema.org' as const,
    '@type': 'BlogPosting' as const,
    headline: post.title,
    description: post.excerpt,
    image: [coverImageUrl],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person' as const,
      name: post.author.name,
      jobTitle: post.author.role,
      image: post.author.avatar.startsWith('http')
        ? post.author.avatar
        : `${siteUrl}${getAssetPath(post.author.avatar)}`,
      url: post.author.social?.twitter || post.author.social?.linkedin || siteUrl,
    },
    publisher: {
      '@type': 'Organization' as const,
      name: company.name,
      logo: {
        '@type': 'ImageObject' as const,
        url: `${siteUrl}${getAssetPath('logo.png')}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage' as const,
      '@id': `${siteUrl}/blog/${post.slug}/`,
    },
    keywords: post.tags.join(', '),
    articleBody: post.content || post.excerpt,
    wordCount: post.content ? post.content.split(/\s+/).length : post.excerpt.split(/\s+/).length,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ArticleSchema;
