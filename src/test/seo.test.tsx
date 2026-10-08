import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MetaTags } from '../components/seo/MetaTags';
import { OrganizationSchema } from '../components/seo/OrganizationSchema';
import { WebSiteSchema } from '../components/seo/WebSiteSchema';
import { ProductSchema } from '../components/seo/ProductSchema';
import { FAQSchema } from '../components/seo/FAQSchema';
import { ArticleSchema } from '../components/seo/ArticleSchema';
import { PersonSchema, PersonSchemaList } from '../components/seo/PersonSchema';
import { BreadcrumbSchema } from '../components/seo/BreadcrumbSchema';
import type { TeamMember } from '../data/team';
import type { BlogPost } from '../data/blog/types';

describe('SEO Components', () => {
  afterEach(() => {
    cleanup();
    // Clear document head to prevent test pollution from hoisted tags
    document.head.innerHTML = '';
    document.title = '';
  });

  describe('MetaTags', () => {
    it('should render basic meta tags correctly', () => {
      render(
        <MetaTags title="Custom Title" description="Custom Description" pathname="/custom-page" />,
      );

      // Title
      expect(document.title).toContain('Custom Title');

      // Meta description
      const description = document.querySelector('meta[name="description"]');
      expect(description?.getAttribute('content')).toBe('Custom Description');

      // Canonical
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute('href')).toContain('/custom-page');

      // Robots
      const robots = document.querySelector('meta[name="robots"]');
      expect(robots?.getAttribute('content')).toBe('index, follow');
    });

    it('should render Open Graph tags correctly', () => {
      render(
        <MetaTags
          title="OG Title"
          description="OG Description"
          ogType="article"
          pathname="/article-page"
        />,
      );

      expect(
        document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
      ).toContain('OG Title');
      expect(
        document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
      ).toBe('OG Description');
      expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe(
        'article',
      );
      expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toContain(
        '/article-page',
      );
    });

    it('should render Twitter tags correctly', () => {
      render(<MetaTags title="Twitter Title" twitterCard="summary_large_image" />);

      expect(
        document.querySelector('meta[name="twitter:title"]')?.getAttribute('content'),
      ).toContain('Twitter Title');
      expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe(
        'summary_large_image',
      );
    });
  });

  describe('OrganizationSchema', () => {
    it('should render organization schema', () => {
      const { container } = render(<OrganizationSchema />);
      const script = container.querySelector('script[type="application/ld+json"]');
      expect(script).toBeTruthy();
      const schema = JSON.parse(script?.innerHTML || '{}');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBeTruthy();
      expect(schema.logo).toBeTruthy();
    });
  });

  describe('WebSiteSchema', () => {
    it('should render website schema with search action', () => {
      const { container } = render(<WebSiteSchema />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const schema = JSON.parse(script?.innerHTML || '{}');
      expect(schema['@type']).toBe('WebSite');
      expect(schema.potentialAction['@type']).toBe('SearchAction');
    });
  });

  describe('ProductSchema', () => {
    it('should render product schema', () => {
      const { container } = render(<ProductSchema />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const schema = JSON.parse(script?.innerHTML || '{}');
      expect(schema['@type']).toBe('Product');
      expect(schema.offers).toBeDefined();
    });
  });

  describe('FAQSchema', () => {
    it('should render FAQ schema correctly', () => {
      const faqs = [
        { question: 'Q1', answer: 'A1' },
        { question: 'Q2', answer: 'A2' },
      ];
      const { container } = render(<FAQSchema faqs={faqs} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const schema = JSON.parse(script?.innerHTML || '{}');
      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity).toHaveLength(2);
      expect(schema.mainEntity[0].name).toBe('Q1');
      expect(schema.mainEntity[0].acceptedAnswer.text).toBe('A1');
    });

    it('should return null if no FAQs are provided', () => {
      const { container } = render(<FAQSchema faqs={[]} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('ArticleSchema', () => {
    it('should render article schema', () => {
      const post: BlogPost = {
        id: '1',
        title: 'Blog Post',
        excerpt: 'Post Description',
        publishedAt: '2026-02-11',
        author: {
          id: 'author-1',
          name: 'Author Name',
          role: 'Engineer',
          avatar: '/team/author.jpg',
          bio: 'Author bio',
        },
        category: 'engineering',
        readingTime: 5,
        featured: false,
        coverImage: '/blog/image.jpg',
        slug: 'blog-post',
        tags: ['tech'],
        content: 'Article body content',
      };
      const { container } = render(<ArticleSchema post={post} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const schema = JSON.parse(script?.innerHTML || '{}');
      expect(schema['@type']).toBe('BlogPosting');
      expect(schema.headline).toBe('Blog Post');
      expect(schema.author.name).toBe('Author Name');
    });
  });

  describe('PersonSchema', () => {
    it('should render person schema', () => {
      const member: TeamMember = {
        id: '1',
        name: 'John Doe',
        role: 'Founder',
        bio: 'Bio text',
        avatar: '/team/john.jpg',
        social: [{ platform: 'twitter', url: 'https://twitter.com/johndoe' }],
        department: 'leadership',
        joinedAt: '2026-01-01',
      };
      const { container } = render(<PersonSchema member={member} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const schema = JSON.parse(script?.innerHTML || '{}');
      expect(schema['@type']).toBe('Person');
      expect(schema.name).toBe('John Doe');
      expect(schema.jobTitle).toBe('Founder');
    });

    it('should render list of persons', () => {
      const members: TeamMember[] = [
        {
          id: '1',
          name: 'John Doe',
          role: 'Founder',
          bio: 'Bio text',
          avatar: '/team/john.jpg',
          social: [],
          department: 'leadership',
          joinedAt: '2026-01-01',
        },
        {
          id: '2',
          name: 'Jane Smith',
          role: 'Designer',
          bio: 'Bio text',
          avatar: '/team/jane.jpg',
          social: [],
          department: 'design',
          joinedAt: '2026-01-01',
        },
      ];
      const { container } = render(<PersonSchemaList members={members} />);
      const scripts = container.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts).toHaveLength(2);
    });
  });

  describe('BreadcrumbSchema', () => {
    it('should render breadcrumb schema correctly', () => {
      const crumbs = [
        { name: 'Home', item: '/' },
        { name: 'Blog', item: '/blog/' },
      ];
      const { container } = render(<BreadcrumbSchema crumbs={crumbs} />);
      const script = container.querySelector('script[type="application/ld+json"]');
      const schema = JSON.parse(script?.innerHTML || '{}');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(2);
    });

    it('should return null if no crumbs are provided', () => {
      const { container } = render(<BreadcrumbSchema crumbs={[]} />);
      expect(container.firstChild).toBeNull();
    });
  });
});
